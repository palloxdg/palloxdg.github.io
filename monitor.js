'use strict';

const https    = require('https');
const http     = require('http');
const fs       = require('fs');
const path     = require('path');
const { exec } = require('child_process');

const CHECK_INTERVAL_MS = 12 * 60 * 60 * 1000;
const MONITOR_PAGE_URL  = 'https://palloxdg.github.io/monitor.html';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

const BASE      = process.pkg ? path.dirname(process.execPath) : __dirname;
const ICON_OK   = path.join(BASE, 'monitor_ok.ico');
const ICON_WARN = path.join(BASE, 'monitor_warn.ico');
const ICON_ERR  = path.join(BASE, 'monitor_err.ico');

const IDX_STATUS    = 0;
const IDX_CHECK_NOW = 2;
const IDX_OPEN_PAGE = 3;
const IDX_EXIT      = 5;

let lastOverall = null;
let lastChecked = null;
let tray        = null;

function checkUrl(name, url) {
    return new Promise(resolve => {
        const start = Date.now();
        const lib   = url.startsWith('https') ? https : http;
        try {
            const req = lib.request(url, {
                method: 'GET',
                headers: { 'User-Agent': UA },
                timeout: 10000,
            }, res => {
                res.resume();
                resolve({ name, status: res.statusCode >= 200 && res.statusCode < 500 ? 'ok' : 'error', code: res.statusCode, ms: Date.now() - start });
            });
            req.on('timeout', () => { req.destroy(); resolve({ name, status: 'error', code: 0, ms: 10000 }); });
            req.on('error',   () => resolve({ name, status: 'error', code: 0, ms: Date.now() - start }));
            req.end();
        } catch { resolve({ name, status: 'error', code: 0, ms: 0 }); }
    });
}

async function runChecks() {
    console.log('[Monitor] Running checks...');
    sendUpdate(IDX_STATUS, 'Checking...');

    const checks = await Promise.all([
        checkUrl('Fansly Website', 'https://fansly.com'),
        checkUrl('Fansly API',     'https://apiv3.fansly.com/api/v1/account/notificationscount'),
        checkUrl('GitHub Status',  'https://palloxdg.github.io/status.json'),
    ]);

    lastOverall = checks.some(c => c.status === 'error') ? 'error' : 'ok';
    lastChecked = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    console.log('[Monitor] Overall: ' + lastOverall);
    checks.forEach(c => console.log('  ' + c.name + ': ' + c.status + ' (' + c.code + ', ' + c.ms + 'ms)'));

    const statusText = lastOverall === 'ok' ? 'All OK - ' + lastChecked : 'Issue detected - ' + lastChecked;
    sendUpdate(IDX_STATUS, statusText);
    updateIcon(lastOverall);

    if (lastOverall === 'error') {
        const broken = checks.filter(c => c.status === 'error').map(c => c.name).join(', ');
        showNotification('Fluxee Monitor', 'Issue detected: ' + broken);
    }
}

function iconBase64(filePath) {
    try { return fs.readFileSync(filePath).toString('base64'); }
    catch { return ''; }
}

function updateIcon(overall) {
    if (!tray) return;
    const iconPath = overall === 'ok' ? ICON_OK : ICON_ERR;
    const tooltip  = 'Fluxee Monitor - ' + (overall === 'ok' ? 'All OK' : 'Issue detected');
    try {
        // update-menu requires the full menu object including items
        tray.sendAction({
            type: 'update-menu',
            menu: {
                icon:    iconBase64(iconPath),
                title:   '',
                tooltip: tooltip,
                items:   tray._conf.menu.items,
            },
        });
    } catch (e) { console.warn('[Monitor] updateIcon error:', e.message); }
}

function sendUpdate(seqId, title) {
    if (!tray) return;
    try {
        tray.sendAction({ type: 'update-item', item: { title, enabled: false, tooltip: title }, seq_id: seqId });
    } catch (e) { console.warn('[Monitor] sendAction error:', e.message); }
}

function openBrowser(url) {
    exec('start "" "' + url + '"', err => { if (err) console.warn('[Monitor] Browser:', err.message); });
}

function showNotification(title, body) {
    const ps = "Add-Type -AssemblyName System.Windows.Forms; " +
        "$n = New-Object System.Windows.Forms.NotifyIcon; " +
        "$n.Icon = [System.Drawing.SystemIcons]::Information; " +
        "$n.Visible = $true; " +
        "$n.ShowBalloonTip(5000, '" + title.replace(/'/g, "''") + "', '" + body.replace(/'/g, "''") + "', [System.Windows.Forms.ToolTipIcon]::Info); " +
        "Start-Sleep -Seconds 6; $n.Dispose()";
    exec('powershell -WindowStyle Hidden -Command "' + ps + '"', () => {});
}

const SEP = { title: '<SEPARATOR>', tooltip: '', enabled: true };

async function main() {
    const SysTray = require('systray2').default;

    tray = new SysTray({
        menu: {
            icon:    iconBase64(ICON_WARN),
            title:   '',
            tooltip: 'Fluxee Monitor',
            items: [
                { title: 'Starting...',      tooltip: '', enabled: false },
                SEP,
                { title: 'Check Now',        tooltip: 'Run checks now',          enabled: true },
                { title: 'Open Status Page', tooltip: 'Open monitor in browser', enabled: true },
                SEP,
                { title: 'Exit',             tooltip: 'Quit FluxeeMonitor',      enabled: true },
            ],
        },
        debug:   false,
        copyDir: false,
    });

    await tray._ready;

    tray.onClick(action => {
        switch (action.seq_id) {
            case IDX_CHECK_NOW: runChecks(); break;
            case IDX_OPEN_PAGE: openBrowser(MONITOR_PAGE_URL); break;
            case IDX_EXIT:      tray.kill(); process.exit(0); break;
        }
    });

    console.log('[Monitor] Tray ready');
    await runChecks();
    setInterval(runChecks, CHECK_INTERVAL_MS);
}

main().catch(e => { console.error('[Monitor] Fatal:', e); process.exit(1); });
