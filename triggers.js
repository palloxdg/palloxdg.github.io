/**
 * Fluxee v5.1 — Trigger Configuration UI Logic
 */

const RELAY_URL = 'http://127.0.0.1:3745/trigger';
let relayToken = '';

async function fetchRelayToken() {
    try {
        const r = await fetch('http://127.0.0.1:3745/status');
        const d = await r.json();
        if (d.token) relayToken = d.token;
    } catch (e) { }
}
fetchRelayToken();

const HT_BAR_FRAME_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 44' width='100%' height='44' preserveAspectRatio='none'><defs><filter id='htglow' x='-5%' y='-20%' width='110%' height='140%'><feGaussianBlur stdDeviation='2.5' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter><linearGradient id='htrim' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='white' stop-opacity='0.3'/><stop offset='60%' stop-color='white' stop-opacity='0'/></linearGradient></defs><rect x='2' y='6' width='396' height='32' rx='16' ry='16' fill='none' stroke='currentColor' stroke-width='2' filter='url(#htglow)' opacity='0.75'/><rect x='3' y='7' width='394' height='30' rx='15' ry='15' fill='none' stroke='currentColor' stroke-width='1.5'/><rect x='6' y='10' width='388' height='24' rx='12' ry='12' fill='url(#htrim)'/></svg>`;

function getBarFrameSvg(barStyle) {
    switch (barStyle) {
        case 'glow': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 44' width='100%' height='44' preserveAspectRatio='none'><defs><filter id='htglow-outer' x='-15%' y='-80%' width='130%' height='260%'><feGaussianBlur stdDeviation='4' result='blur'/><feMerge><feMergeNode in='blur'/><feMergeNode in='blur'/><feMergeNode in='SourceGraphic'/></feMerge></filter><filter id='htglow-inner' x='-5%' y='-20%' width='110%' height='140%'><feGaussianBlur stdDeviation='1.5' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter><linearGradient id='htrim-glow' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='white' stop-opacity='0.4'/><stop offset='60%' stop-color='white' stop-opacity='0'/></linearGradient></defs><rect x='1' y='5' width='398' height='34' rx='17' ry='17' fill='none' stroke='currentColor' stroke-width='3' filter='url(#htglow-outer)' opacity='0.5'/><rect x='2' y='6' width='396' height='32' rx='16' ry='16' fill='none' stroke='currentColor' stroke-width='2' filter='url(#htglow-inner)' opacity='0.9'/><rect x='3' y='7' width='394' height='30' rx='15' ry='15' fill='none' stroke='currentColor' stroke-width='1'/><rect x='6' y='10' width='388' height='24' rx='12' ry='12' fill='url(#htrim-glow)'/></svg>`;
        case 'pulse': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 44' width='100%' height='44' preserveAspectRatio='none'><defs><filter id='htglow-pulse' x='-5%' y='-20%' width='110%' height='140%'><feGaussianBlur stdDeviation='2' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter><linearGradient id='htrim-pulse' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='white' stop-opacity='0.25'/><stop offset='60%' stop-color='white' stop-opacity='0'/></linearGradient></defs><rect x='1' y='4' width='398' height='36' rx='18' ry='18' fill='none' stroke='currentColor' stroke-width='1.5' stroke-dasharray='6 4' opacity='0.5'/><rect x='3' y='7' width='394' height='30' rx='15' ry='15' fill='none' stroke='currentColor' stroke-width='2' filter='url(#htglow-pulse)' opacity='0.85'/><path d='M18 7 L8 7 L8 17' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><path d='M382 7 L392 7 L392 17' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><path d='M18 37 L8 37 L8 27' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><path d='M382 37 L392 37 L392 27' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round'/><rect x='6' y='10' width='388' height='24' rx='12' ry='12' fill='url(#htrim-pulse)'/></svg>`;
        case 'segmented': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 44' width='100%' height='44' preserveAspectRatio='none'><defs><filter id='htglow-seg' x='-5%' y='-20%' width='110%' height='140%'><feGaussianBlur stdDeviation='1.5' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter><linearGradient id='htrim-seg' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='white' stop-opacity='0.2'/><stop offset='70%' stop-color='white' stop-opacity='0'/></linearGradient><clipPath id='pill-clip'><rect x='3' y='7' width='394' height='30' rx='15' ry='15'/></clipPath></defs><rect x='2' y='6' width='396' height='32' rx='16' ry='16' fill='none' stroke='currentColor' stroke-width='2' filter='url(#htglow-seg)' opacity='0.8'/><rect x='3' y='7' width='394' height='30' rx='15' ry='15' fill='none' stroke='currentColor' stroke-width='1'/><g clip-path='url(#pill-clip)' stroke='currentColor' stroke-width='1.8' opacity='0.55'><line x1='43' y1='7' x2='43' y2='37'/><line x1='83' y1='7' x2='83' y2='37'/><line x1='123' y1='7' x2='123' y2='37'/><line x1='163' y1='7' x2='163' y2='37'/><line x1='200' y1='7' x2='200' y2='37'/><line x1='237' y1='7' x2='237' y2='37'/><line x1='277' y1='7' x2='277' y2='37'/><line x1='317' y1='7' x2='317' y2='37'/><line x1='357' y1='7' x2='357' y2='37'/></g><rect x='6' y='10' width='388' height='24' rx='12' ry='12' fill='url(#htrim-seg)'/></svg>`;
        default: return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 44' width='100%' height='44' preserveAspectRatio='none'><defs><filter id='htglow' x='-5%' y='-20%' width='110%' height='140%'><feGaussianBlur stdDeviation='2.5' result='b'/><feMerge><feMergeNode in='b'/><feMergeNode in='SourceGraphic'/></feMerge></filter><linearGradient id='htrim' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='white' stop-opacity='0.3'/><stop offset='60%' stop-color='white' stop-opacity='0'/></linearGradient></defs><rect x='2' y='6' width='396' height='32' rx='16' ry='16' fill='none' stroke='currentColor' stroke-width='2' filter='url(#htglow)' opacity='0.75'/><rect x='3' y='7' width='394' height='30' rx='15' ry='15' fill='none' stroke='currentColor' stroke-width='1.5'/><rect x='6' y='10' width='388' height='24' rx='12' ry='12' fill='url(#htrim)'/></svg>`;
    }
}

let rules = [];
let customTypes = [];
let editingRuleId = null;
let amountSteps = [];
let currentLang = 'en';
let activeCustomThemeName = null;
let currentThemeAssets = { bgImage: '', iconImage: '', barFrame: '' };
let loadingTheme = false;

const themePresets = {
    classic: { theme:'classic', font:'Orbitron', background:'image', bgImage:'/assets/hypetrain/themes/classic/background.png', primaryColor:'#1E88E5', secondaryColor:'#FFD54F', barColor:'#4FC3F7', icon:'image', iconImage:'/assets/hypetrain/themes/classic/trainIcon.svg', barStyle:'glow', barFrame:'/assets/hypetrain/themes/classic/progressBar.png', animStart:'/assets/hypetrain/themes/classic/trainStart.webm', animLevelUp:'/assets/hypetrain/themes/classic/levelUp.webm', animDanger:'/assets/hypetrain/themes/classic/dangerFlash.webm', animEnd:'/assets/hypetrain/themes/classic/trainEnd.webm', position:'bottom_right', scale:100 },
    neon: { theme:'neon', font:'Rajdhani', background:'image', bgImage:'/assets/hypetrain/themes/neon/background_neon.png', primaryColor:'#00FFFF', secondaryColor:'#FF00FF', barColor:'#00FFFF', icon:'image', iconImage:'/assets/hypetrain/themes/neon/trainIcon_neon.svg', barStyle:'pulse', barFrame:'/assets/hypetrain/themes/neon/progressBar_neon.png', animStart:'/assets/hypetrain/themes/neon/trainStart_neon.webm', animLevelUp:'/assets/hypetrain/themes/neon/levelUp_neon.webm', animDanger:'/assets/hypetrain/themes/neon/dangerFlash_neon.webm', animEnd:'/assets/hypetrain/themes/neon/trainEnd_neon.webm', position:'bottom_right', scale:100 },
    cyberpunk: { theme:'cyberpunk', font:'Audiowide', background:'image', bgImage:'/assets/hypetrain/themes/cyberpunk/background_cyberpunk.png', primaryColor:'#FF00FF', secondaryColor:'#00FFFF', barColor:'#FF00FF', icon:'image', iconImage:'/assets/hypetrain/themes/cyberpunk/trainIcon_cyberpunk.png', barStyle:'glow', barFrame:'/assets/hypetrain/themes/cyberpunk/progressBar_cyberpunk.png', animStart:'/assets/hypetrain/themes/cyberpunk/trainStart_cyberpunk.webm', animLevelUp:'/assets/hypetrain/themes/cyberpunk/levelUp_cyberpunk.webm', animDanger:'/assets/hypetrain/themes/cyberpunk/danger_glitch.webm', animEnd:'/assets/hypetrain/themes/cyberpunk/trainEnd_cyberpunk.webm', position:'bottom_right', scale:100 },
    minimal: { theme:'minimal', font:'Inter', background:'transparent', primaryColor:'#FFFFFF', secondaryColor:'#AAAAAA', barColor:'#4FC3F7', icon:'default', barStyle:'solid', animStart:'/assets/hypetrain/themes/minimal/trainStart_minimal.webm', animLevelUp:'/assets/hypetrain/themes/minimal/levelUp_minimal.webm', animDanger:'/assets/hypetrain/themes/minimal/dangerFlash_minimal.webm', animEnd:'/assets/hypetrain/themes/minimal/trainEnd_minimal.webm', position:'bottom_right', scale:100 },
    retroarcade: { theme:'retroarcade', font:'Press Start 2P', background:'image', bgImage:'/assets/hypetrain/themes/retroarcade/background_arcade.png', primaryColor:'#00FF00', secondaryColor:'#FF00FF', barColor:'#00FF00', icon:'image', iconImage:'/assets/hypetrain/themes/retroarcade/trainIcon_arcade.svg', barStyle:'segmented', barFrame:'/assets/hypetrain/themes/retroarcade/progressBar_arcade.png', animStart:'/assets/hypetrain/themes/retroarcade/trainStart_arcade.webm', animLevelUp:'/assets/hypetrain/themes/retroarcade/levelUp_arcade.webm', animDanger:'/assets/hypetrain/themes/retroarcade/dangerFlash_arcade.webm', animEnd:'/assets/hypetrain/themes/retroarcade/trainEnd_arcade.webm', position:'bottom_right', scale:100 },
    spacetrain: { theme:'spacetrain', font:'Orbitron', background:'image', bgImage:'/assets/hypetrain/themes/spacetrain/background_space.png', primaryColor:'#4FC3F7', secondaryColor:'#FFFFFF', barColor:'#00E5FF', icon:'image', iconImage:'/assets/hypetrain/themes/spacetrain/trainIcon_space.svg', barStyle:'glow', barFrame:'/assets/hypetrain/themes/spacetrain/progressBar_space.png', animStart:'/assets/hypetrain/themes/spacetrain/trainStart_space.webm', animLevelUp:'/assets/hypetrain/themes/spacetrain/levelUp_space.webm', animDanger:'/assets/hypetrain/themes/spacetrain/dangerFlash_space.webm', animEnd:'/assets/hypetrain/themes/spacetrain/trainEnd_space.webm', position:'bottom_right', scale:100 }
};

const htMode = document.getElementById('htMode');
const htLevels = document.getElementById('htLevels');
const htBaseGoal = document.getElementById('htBaseGoal');
const htDifficulty = document.getElementById('htDifficulty');
const htSingleGoal = document.getElementById('htSingleGoal');
const htDurationPreset = document.getElementById('htDurationPreset');
const htDuration = document.getElementById('htDuration');
const htAutoStart = document.getElementById('htAutoStart');
const htFinalAnimation = document.getElementById('htFinalAnimation');
const htTheme = document.getElementById('htTheme');
const htFont = document.getElementById('htFont');
const htBackground = document.getElementById('htBackground');
const htPrimaryColor = document.getElementById('htPrimaryColor');
const htSecondaryColor = document.getElementById('htSecondaryColor');
const htBarColor = document.getElementById('htBarColor');
const htIcon = document.getElementById('htIcon');
const htBarStyle = document.getElementById('htBarStyle');
const htAnimStart = document.getElementById('htAnimStart');
const htAnimLevelUp = document.getElementById('htAnimLevelUp');
const htAnimDanger = document.getElementById('htAnimDanger');
const htAnimEnd = document.getElementById('htAnimEnd');
const htPosition = document.getElementById('htPosition');
const htScale = document.getElementById('htScale');
const htEnabled = document.getElementById('htEnabled');
const htScaleVal = document.getElementById('htScaleVal');
const startHTBtn = document.getElementById('startHTBtn');
const stopHTBtn = document.getElementById('stopHTBtn');
let htCustomBgData = '';
const htCustomBgFile = document.getElementById('htCustomBgFile');

function toggleHTMode() {
    const multi = document.getElementById('htMultiOnly');
    const single = document.getElementById('htSingleOnly');
    if (!htMode || !multi || !single) return;
    if (htMode.value === 'multi') { multi.style.display = ''; single.style.display = 'none'; }
    else { multi.style.display = 'none'; single.style.display = ''; }
}

function updateHTLevelPreview() {
    const list = document.getElementById('htPreviewList');
    if (!list) return;
    list.innerHTML = '';
    if (htMode.value === 'single') { if (list.parentElement) list.parentElement.style.display = 'none'; return; }
    if (list.parentElement) list.parentElement.style.display = '';
    const levels = parseInt(htLevels.value) || 5;
    const base = parseInt(htBaseGoal.value) || 5;
    const diff = htDifficulty.value;
    for (let i = 1; i <= levels; i++) {
        const item = document.createElement('div');
        item.className = 'level-preview-item';
        let goal = base;
        if (diff === 'balanced') goal = base + (i - 1) * 3;
        else if (diff === 'hard') goal = Math.round(base * Math.pow(1.5, i - 1));
        item.innerHTML = `<span class="lvl-num">LVL ${i}</span> <span class="lvl-goal">${goal} Tips</span>`;
        list.appendChild(item);
    }
}

function updateHTLivePreview() {
    if (loadingTheme) return;
    const miniTrain = document.getElementById('mini-hype-train');
    if (!miniTrain) return;
    miniTrain.style.setProperty('--ht-primary', htPrimaryColor.value);
    miniTrain.style.setProperty('--ht-secondary', htSecondaryColor.value);
    miniTrain.style.setProperty('--ht-bar', htBarColor.value);
    miniTrain.style.setProperty('--ht-font', htFont.value);
    let bgValue = 'rgba(15, 15, 20, 0.95)';
    let isImage = false;
    if (htBackground.value === 'solid') { bgValue = htPrimaryColor.value; }
    else if (htBackground.value === 'gradient') { bgValue = `linear-gradient(135deg, ${htPrimaryColor.value}, ${htSecondaryColor.value})`; }
    else if (htBackground.value === 'image') {
        if (htCustomBgData) { bgValue = `url("${htCustomBgData}")`; isImage = true; }
        else if (currentThemeAssets.bgImage) { bgValue = `url("${currentThemeAssets.bgImage}")`; isImage = true; }
    } else if (htBackground.value === 'preset') {
        if (currentThemeAssets.bgImage) { bgValue = `url("${currentThemeAssets.bgImage}")`; isImage = true; }
    } else if (htBackground.value === 'transparent') { bgValue = 'transparent'; }
    if (isImage || bgValue.includes('gradient')) {
        miniTrain.style.setProperty('background-image', bgValue, 'important');
        miniTrain.style.setProperty('background-color', 'transparent', 'important');
    } else {
        miniTrain.style.setProperty('background-image', 'none', 'important');
        miniTrain.style.setProperty('background-color', bgValue, 'important');
    }
    miniTrain.style.setProperty('background-size', 'cover', 'important');
    miniTrain.style.setProperty('background-position', 'center', 'important');
    miniTrain.style.setProperty('background-repeat', 'no-repeat', 'important');
    const miniIcon = document.getElementById('miniIcon');
    if (miniIcon) {
        miniIcon.innerHTML = '🚂';
        if (htIcon.value === 'none') { miniIcon.innerHTML = ''; miniIcon.style.backgroundImage = 'none'; miniIcon.style.width = '0'; miniIcon.style.minWidth = '0'; }
        else if (htIcon.value === 'image' && currentThemeAssets.iconImage) { miniIcon.innerHTML = ''; miniIcon.style.backgroundImage = `url("${currentThemeAssets.iconImage}")`; miniIcon.style.backgroundSize = 'contain'; miniIcon.style.backgroundPosition = 'center'; miniIcon.style.backgroundRepeat = 'no-repeat'; miniIcon.style.width = '32px'; miniIcon.style.height = '32px'; miniIcon.style.display = 'flex'; miniIcon.style.flexShrink = '0'; }
        else if (htIcon.value === 'default') { miniIcon.innerHTML = '🚂'; miniIcon.style.width = ''; miniIcon.style.minWidth = ''; }
        else if (htIcon.value === 'custom') { miniIcon.innerHTML = '✨'; miniIcon.style.width = ''; miniIcon.style.minWidth = ''; }
    }
    const miniBar = document.getElementById('miniBar');
    if (miniBar) {
        miniBar.className = 'mini-progress-bar ' + htBarStyle.value;
        const track = miniBar.parentElement;
        if (track) {
            const useFrame = ['image', 'glow', 'pulse', 'segmented'].includes(htBarStyle.value);
            if (useFrame) {
                let frameSvg = track.querySelector('.bar-frame-svg');
                if (!frameSvg) { frameSvg = document.createElement('div'); frameSvg.className = 'bar-frame-svg'; frameSvg.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2;'; track.appendChild(frameSvg); }
                frameSvg.innerHTML = getBarFrameSvg(htBarStyle ? htBarStyle.value : 'glow');
                frameSvg.style.color = htSecondaryColor ? htSecondaryColor.value : '#bb86fc';
                track.style.overflow = 'visible'; track.style.background = 'none'; track.style.backgroundColor = 'transparent'; track.style.border = 'none'; track.style.borderRadius = '0'; track.style.boxShadow = 'none'; track.style.position = 'relative'; track.style.height = '44px';
                miniBar.style.position = 'absolute'; miniBar.style.top = '50%'; miniBar.style.transform = 'translateY(-50%)'; miniBar.style.left = '6px'; miniBar.style.height = '16px'; miniBar.style.borderRadius = '10px'; miniBar.style.zIndex = '1'; miniBar.style.maxWidth = 'calc(100% - 12px)';
                if (!miniBar.style.width) miniBar.style.width = 'calc(70% - 12px)';
            } else {
                const oldFrame = track.querySelector('.bar-frame-svg');
                if (oldFrame) oldFrame.remove();
                track.style.overflow = 'hidden'; track.style.height = '12px'; track.style.border = ''; track.style.background = ''; track.style.backgroundColor = ''; track.style.borderRadius = ''; track.style.boxShadow = '';
                miniBar.style.height = '100%'; miniBar.style.position = 'relative'; miniBar.style.top = '0'; miniBar.style.transform = 'none'; miniBar.style.left = '0'; miniBar.style.borderRadius = ''; miniBar.style.zIndex = ''; miniBar.style.maxWidth = '';
            }
        }
    }
}

function applyHypeTrainConfigUI(config) {
    if (htMode) htMode.value = config.mode || 'multi';
    if (htLevels) htLevels.value = config.levels || 5;
    if (htBaseGoal) htBaseGoal.value = config.baseGoal || 5;
    if (htDifficulty) htDifficulty.value = config.difficulty || 'balanced';
    if (htSingleGoal) htSingleGoal.value = config.singleGoal || 50;
    if (htDuration) htDuration.value = config.duration || 30;
    if (htDurationPreset) {
        const presets = ['15', '30', '45', '60', '90', '120'];
        if (presets.includes(String(config.duration))) { htDurationPreset.value = String(config.duration); const cr = document.getElementById('htCustomDurationRow'); if (cr) cr.style.display = 'none'; }
        else { htDurationPreset.value = 'custom'; const cr = document.getElementById('htCustomDurationRow'); if (cr) cr.style.display = ''; }
    }
    if (htAutoStart) htAutoStart.value = config.autoStartThreshold || 10.00;
    if (htEnabled) htEnabled.checked = config.enabled === true;
    updateHtEnabledState();
    if (htFinalAnimation) htFinalAnimation.value = config.finalAnimation || '';
    if (htTheme) htTheme.value = config.theme || 'classic';
    currentThemeAssets.bgImage = config.bgImage || '';
    currentThemeAssets.iconImage = config.iconImage || '';
    currentThemeAssets.barFrame = config.barFrame || '';
    if (!currentThemeAssets.bgImage && config.theme && themePresets[config.theme]) {
        const p = themePresets[config.theme];
        const host = 'http://127.0.0.1:3745';
        currentThemeAssets.bgImage = p.bgImage ? (p.bgImage.startsWith('http') ? p.bgImage : host + p.bgImage) : '';
        currentThemeAssets.iconImage = p.iconImage ? (p.iconImage.startsWith('http') ? p.iconImage : host + p.iconImage) : '';
        currentThemeAssets.barFrame = p.barFrame ? (p.barFrame.startsWith('http') ? p.barFrame : host + p.barFrame) : '';
    }
    if (htFont) htFont.value = config.font || 'Inter';
    if (htBackground) htBackground.value = config.background || 'transparent';
    if (htPrimaryColor) htPrimaryColor.value = config.primaryColor || '#00e5ff';
    if (htSecondaryColor) htSecondaryColor.value = config.secondaryColor || '#bb86fc';
    if (htBarColor) htBarColor.value = config.barColor || '#00e5ff';
    if (htIcon) htIcon.value = config.icon || 'default';
    if (htBarStyle) htBarStyle.value = config.barStyle || 'solid';
    htCustomBgData = config.bgCustomImage || '';
    if (htAnimStart) htAnimStart.value = config.animStart || '';
    if (htAnimLevelUp) htAnimLevelUp.value = config.animLevelUp || '';
    if (htAnimDanger) htAnimDanger.value = config.animDanger || '';
    if (htAnimEnd) htAnimEnd.value = config.animEnd || '';
    if (htPosition) htPosition.value = config.position || 'bottom_right';
    if (htScale) { htScale.value = config.scale || 100; if (htScaleVal) htScaleVal.innerText = htScale.value; }
    toggleHTMode();
    updateHTLevelPreview();
    updateHTLivePreview();
}

function saveHypeTrainConfig() {
    if (!htMode || loadingTheme) return;
    const config = {
        mode: htMode.value, levels: parseInt(htLevels.value) || 5, baseGoal: parseInt(htBaseGoal.value) || 5,
        difficulty: htDifficulty.value, singleGoal: parseInt(htSingleGoal.value) || 50,
        duration: htDurationPreset.value === 'custom' ? (parseInt(htDuration.value) || 30) : parseInt(htDurationPreset.value),
        autoStartThreshold: parseFloat(htAutoStart.value) || 10.00, enabled: htEnabled ? htEnabled.checked : true,
        finalAnimation: htFinalAnimation.value, theme: htTheme.value, font: htFont.value, background: htBackground.value,
        primaryColor: htPrimaryColor.value, secondaryColor: htSecondaryColor.value, barColor: htBarColor.value,
        icon: htIcon.value, barStyle: htBarStyle.value,
        animStart: htAnimStart.value, animLevelUp: htAnimLevelUp.value, animDanger: htAnimDanger.value, animEnd: htAnimEnd.value,
        position: htPosition.value, scale: parseInt(htScale.value) || 100, bgCustomImage: htCustomBgData,
        bgImage: currentThemeAssets.bgImage, iconImage: currentThemeAssets.iconImage, barFrame: currentThemeAssets.barFrame
    };
    try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ hypeTrainConfig: config }, () => {
                if (chrome.runtime.lastError) console.error('Storage Error:', chrome.runtime.lastError);
            });
        }
    } catch (e) { console.error('Failed to save config:', e); }
    updateHTLivePreview();
}

[htPrimaryColor, htSecondaryColor, htBarColor, htFont, htBackground, htIcon, htBarStyle].forEach(el => {
    if (el) el.addEventListener('input', updateHTLivePreview);
    if (el) el.addEventListener('change', updateHTLivePreview);
});
[htLevels, htBaseGoal, htDifficulty, htMode].forEach(el => {
    if (el) el.addEventListener('change', updateHTLevelPreview);
});

const previewAnimStartBtn = document.getElementById('previewAnimStartBtn');
const previewAnimLevelBtn = document.getElementById('previewAnimLevelBtn');
if (previewAnimStartBtn) previewAnimStartBtn.onclick = () => {
    const miniTrain = document.getElementById('mini-hype-train');
    if (miniTrain) { miniTrain.style.transform = 'scale(1.1)'; setTimeout(() => miniTrain.style.transform = 'scale(0.9)', 300); }
    if (typeof showToast === 'function') showToast("Previewing Train Start Animation");
};
if (previewAnimLevelBtn) previewAnimLevelBtn.onclick = () => {
    const miniBar = document.getElementById('miniBar');
    if (miniBar) {
        miniBar.style.width = '100%';
        setTimeout(() => { miniBar.style.width = '0%'; const lvlEl = document.getElementById('miniLevel'); if (lvlEl) lvlEl.innerText = "LEVEL 2"; setTimeout(() => miniBar.style.width = '30%', 100); }, 500);
    }
    if (typeof showToast === 'function') showToast("Previewing Level Up");
};

function applyLanguage(lang) {
    currentLang = lang;
    const trans = uiTranslations[lang];
    if (!trans) return;
    document.querySelectorAll('.lang-flag').forEach(flag => { flag.classList.toggle('active', flag.dataset.lang === lang); });
    document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (trans[key]) el.innerText = trans[key]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.dataset.i18nPlaceholder; if (trans[key]) el.placeholder = trans[key]; });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { const key = el.dataset.i18nTitle; if (trans[key]) el.title = trans[key]; });
}

function loadRules() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['triggerRules', 'customTriggerTypes', 'currentLang', 'hypeTrainConfig'], (res) => {
            rules = Array.isArray(res.triggerRules) ? res.triggerRules : [];
            customTypes = Array.isArray(res.customTriggerTypes) ? res.customTriggerTypes : [];
            currentLang = res.currentLang || 'en';
            if (res.hypeTrainConfig) applyHypeTrainConfigUI(res.hypeTrainConfig);
            if (typeof renderRules === 'function') renderRules();
            if (typeof renderCustomTypes === 'function') renderCustomTypes();
            if (typeof updateRuleTypeDropdown === 'function') updateRuleTypeDropdown();
            applyLanguage(currentLang);
        });
    }
}

function initHTTabs() {
    const tabs = document.querySelectorAll('.ht-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.ht-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

function initChatTab() {
    if (document.getElementById('chatTabContent')?.dataset.tabInit) return;
    document.getElementById('chatTabContent').dataset.tabInit = '1';
    const KEYS = ['chatOverlayEnabled','chatOverlayFilter','chatOverlayMaxMessages','chatOverlayFadeSecs','chatOverlayFont','chatOverlayScale','chatOverlayUsernameColor','chatOverlayMessageColor','chatOverlayBg','chatOverlayBgColor','chatOverlayPosition','chatOverlayBorderStyle','chatOverlayBorderColor','chatOverlayBgImage'];
    chrome.storage.local.get(KEYS, (res) => {
        if (res.chatOverlayEnabled !== undefined) document.getElementById('chatOverlayEnabled').checked = res.chatOverlayEnabled;
        if (res.chatOverlayFilter) document.getElementById('chatOverlayFilter').value = res.chatOverlayFilter;
        if (res.chatOverlayMaxMessages) document.getElementById('chatOverlayMaxMessages').value = res.chatOverlayMaxMessages;
        if (res.chatOverlayFadeSecs !== undefined) document.getElementById('chatOverlayFadeSecs').value = res.chatOverlayFadeSecs;
        if (res.chatOverlayFont) document.getElementById('chatOverlayFont').value = res.chatOverlayFont;
        if (res.chatOverlayUsernameColor) document.getElementById('chatOverlayUsernameColor').value = res.chatOverlayUsernameColor;
        if (res.chatOverlayMessageColor) document.getElementById('chatOverlayMessageColor').value = res.chatOverlayMessageColor;
        if (res.chatOverlayBg) { document.getElementById('chatOverlayBg').value = res.chatOverlayBg; document.getElementById('chatBgColorRow').style.display = res.chatOverlayBg === 'solid' ? '' : 'none'; }
        if (res.chatOverlayBgColor) document.getElementById('chatOverlayBgColor').value = res.chatOverlayBgColor;
        if (res.chatOverlayBgImage) document.getElementById('chatOverlayBgImage').value = res.chatOverlayBgImage;
        if (res.chatOverlayBorderStyle) { document.getElementById('chatOverlayBorderStyle').value = res.chatOverlayBorderStyle; document.getElementById('chatBorderColorRow').style.display = res.chatOverlayBorderStyle !== 'none' ? '' : 'none'; }
        if (res.chatOverlayBorderColor) document.getElementById('chatOverlayBorderColor').value = res.chatOverlayBorderColor;
        if (res.chatOverlayPosition) { document.querySelectorAll('#chatPosGrid .pos-btn').forEach(b => { b.classList.toggle('active', b.dataset.pos === res.chatOverlayPosition); }); }
        const scale = res.chatOverlayScale || 100;
        document.getElementById('chatScale').value = scale;
        document.getElementById('chatScaleVal').textContent = scale;
    });
    document.querySelectorAll('#chatTabContent .overlay-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.overlay-card');
            card.querySelectorAll('.overlay-tab').forEach(b => b.classList.remove('active'));
            card.querySelectorAll('.overlay-tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = card.querySelector(`#chat-${btn.dataset.tab}`);
            if (target) target.classList.add('active');
        });
    });
    document.getElementById('chatScale')?.addEventListener('input', function () { document.getElementById('chatScaleVal').textContent = this.value; });
    document.getElementById('chatOverlayBg')?.addEventListener('change', function () {
        document.getElementById('chatBgColorRow').style.display = this.value === 'solid' ? '' : 'none';
        document.getElementById('chatBgImageRow').style.display = this.value === 'image' ? '' : 'none';
        if (this.value === 'image') loadChatThemeImages();
    });
    document.getElementById('chatOverlayBorderStyle')?.addEventListener('change', function () { document.getElementById('chatBorderColorRow').style.display = this.value !== 'none' ? '' : 'none'; });
    document.getElementById('chatPosGrid')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.pos-btn');
        if (!btn) return;
        document.querySelectorAll('#chatPosGrid .pos-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
    function loadChatThemeImages() {
        fetch('http://localhost:3745/assets/chatThemes').then(r => r.ok ? r.json() : null).then(data => {
            const sel = document.getElementById('chatOverlayBgImage');
            if (!sel) return;
            const current = sel.value;
            sel.innerHTML = '<option value="">— none —</option>';
            if (data?.images?.length) { data.images.forEach(img => { const opt = document.createElement('option'); opt.value = img; opt.textContent = img; sel.appendChild(opt); }); if (current) sel.value = current; }
            else sel.innerHTML = '<option value="">— no images in chatThemes/ —</option>';
        }).catch(() => { const sel = document.getElementById('chatOverlayBgImage'); if (sel) sel.innerHTML = '<option value="">— relay offline —</option>'; });
    }
    chrome.storage.local.get(['chatOverlayBg'], (r) => {
        if (r.chatOverlayBg === 'image') { document.getElementById('chatBgImageRow').style.display = ''; loadChatThemeImages(); }
    });
    document.querySelectorAll('#chatTabContent .obs-copyable').forEach(el => {
        if (el.dataset.copyBound) return;
        el.dataset.copyBound = '1';
        el.addEventListener('click', () => {
            const url = el.dataset.url;
            if (!url) return;
            navigator.clipboard.writeText(url).then(() => { el.classList.add('copied'); const icon = el.querySelector('.obs-copy-icon'); const prev = icon ? icon.textContent : ''; if (icon) icon.textContent = '✓'; setTimeout(() => { el.classList.remove('copied'); if (icon) icon.textContent = prev; }, 1800); }).catch(() => {});
        });
    });
    function renderPreviewChat() {
        const container = document.getElementById('chatPreviewContainer');
        if (!container) return;
        const previewKeys = ['chatOverlayFont','chatOverlayUsernameColor','chatOverlayMessageColor','chatOverlayBg','chatOverlayBgColor','chatOverlayScale','chatOverlayBorderStyle','chatOverlayBorderColor','chatOverlayBgImage'];
        chrome.storage.local.get(previewKeys, (res) => {
            const font = res.chatOverlayFont || 'Inter';
            const scale = (res.chatOverlayScale || 100) / 100;
            const fontSize = Math.round(20 * scale);
            const usernameColor = res.chatOverlayUsernameColor || '#00e5ff';
            const messageColor = res.chatOverlayMessageColor || '#ffffff';
            const bg = res.chatOverlayBg || 'transparent';
            const bgColor = res.chatOverlayBgColor || '#0d0d1a';
            const bgImage = res.chatOverlayBgImage || '';
            const msgBg = bg === 'transparent' ? 'transparent' : bg === 'solid' ? bgColor : bg === 'image' && bgImage ? `url('http://localhost:3745/assets/chatThemes/${bgImage}') center/cover no-repeat` : 'rgba(0,0,0,0.65)';
            const borderStyle = res.chatOverlayBorderStyle || 'none';
            const borderColor = res.chatOverlayBorderColor || '#00e5ff';
            const borderCss = borderStyle === 'none' ? 'none' : borderStyle === 'glow' ? `1px solid ${borderColor}` : `1px ${borderStyle} ${borderColor}`;
            const boxShadow = borderStyle === 'glow' ? `0 0 8px ${borderColor}88` : 'none';
            const demoMessages = [
                { username: 'SubFan', message: 'omg this stream is amazing!! 🔥', isSubscriber: true },
                { username: 'RegularViewer', message: 'lmao same', isSubscriber: false },
                { username: 'LoyalFan99', message: 'when are you doing the spicy menu 👀', isSubscriber: true },
            ];
            container.innerHTML = demoMessages.map(m => `<div style="font-family:'${font}',sans-serif;font-size:${fontSize}px;padding:8px 12px;border-radius:8px;background:${msgBg};background-size:cover;border:${borderCss};box-shadow:${boxShadow};word-break:break-word;line-height:1.4"><div style="font-weight:700;font-size:${Math.round(fontSize*0.82)}px;color:${usernameColor};margin-bottom:2px">${m.username}${m.isSubscriber?`<span style="font-size:${Math.round(fontSize*0.65)}px;background:rgba(0,229,255,0.15);color:${usernameColor};border-radius:4px;padding:1px 5px;margin-left:5px;font-weight:600">★ sub</span>`:''}</div><div style="color:${messageColor};text-shadow:0 1px 3px rgba(0,0,0,0.8)">${m.message}</div></div>`).join('');
        });
    }
    renderPreviewChat();
    document.getElementById('chatPreviewBtn')?.addEventListener('click', renderPreviewChat);
    document.getElementById('saveChatSettingsBtn')?.addEventListener('click', () => {
        const pos = document.querySelector('#chatPosGrid .pos-btn.active')?.dataset.pos || 'bottom-left';
        chrome.storage.local.set({
            chatOverlayEnabled: document.getElementById('chatOverlayEnabled').checked,
            chatOverlayFilter: document.getElementById('chatOverlayFilter').value,
            chatOverlayMaxMessages: parseInt(document.getElementById('chatOverlayMaxMessages').value),
            chatOverlayFadeSecs: parseInt(document.getElementById('chatOverlayFadeSecs').value),
            chatOverlayFont: document.getElementById('chatOverlayFont').value,
            chatOverlayUsernameColor: document.getElementById('chatOverlayUsernameColor').value,
            chatOverlayMessageColor: document.getElementById('chatOverlayMessageColor').value,
            chatOverlayBg: document.getElementById('chatOverlayBg').value,
            chatOverlayBgColor: document.getElementById('chatOverlayBgColor').value,
            chatOverlayPosition: pos,
            chatOverlayScale: parseInt(document.getElementById('chatScale').value),
            chatOverlayBorderStyle: document.getElementById('chatOverlayBorderStyle').value,
            chatOverlayBorderColor: document.getElementById('chatOverlayBorderColor').value,
            chatOverlayBgImage: document.getElementById('chatOverlayBgImage').value,
        }, () => {
            showToast('✓ Chat overlay saved');
            setTimeout(renderPreviewChat, 150);
            chrome.runtime.sendMessage({ type: 'EVENT', name: 'CHAT_CONFIG_UPDATED', payload: {
                font: document.getElementById('chatOverlayFont').value, usernameColor: document.getElementById('chatOverlayUsernameColor').value,
                messageColor: document.getElementById('chatOverlayMessageColor').value, bg: document.getElementById('chatOverlayBg').value,
                bgColor: document.getElementById('chatOverlayBgColor').value, borderStyle: document.getElementById('chatOverlayBorderStyle').value,
                borderColor: document.getElementById('chatOverlayBorderColor').value, bgImage: document.getElementById('chatOverlayBgImage').value,
                scale: parseInt(document.getElementById('chatScale').value), position: pos,
                maxMessages: parseInt(document.getElementById('chatOverlayMaxMessages').value), fadeSecs: parseInt(document.getElementById('chatOverlayFadeSecs').value),
            }});
        });
    });
}

function initSecondaryTabs() {
    const tabs = [
        { btn: document.getElementById('triggersTabBtn'), content: document.getElementById('triggersTabContent'), onActivate: null },
        { btn: document.getElementById('uploadsTabBtn'), content: document.getElementById('uploadsTabContent'), onActivate: loadAssets },
        { btn: document.getElementById('overlaysTabBtn'), content: document.getElementById('overlaysTabContent'), onActivate: initOverlaysTab },
        { btn: document.getElementById('chatTabBtn'), content: document.getElementById('chatTabContent'), onActivate: initChatTab },
    ];
    if (!tabs[0].btn) return;
    tabs.forEach(tab => {
        if (!tab.btn) return;
        tab.btn.addEventListener('click', () => {
            tabs.forEach(t => { if (!t.btn) return; t.btn.classList.remove('active'); if (t.content) t.content.classList.remove('active'); });
            tab.btn.classList.add('active');
            if (tab.content) tab.content.classList.add('active');
            if (tab.onActivate) tab.onActivate();
        });
    });
}

function initPosScale(prefix, defaultPos = 'bottom-right') {
    const grid = document.getElementById(`${prefix}PosGrid`);
    const slider = document.getElementById(`${prefix}Scale`);
    const label = document.getElementById(`${prefix}ScaleVal`);
    if (!grid || !slider) return;
    grid.querySelectorAll('.pos-btn').forEach(btn => {
        btn.addEventListener('click', () => { grid.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); });
    });
    slider.addEventListener('input', () => { if (label) label.textContent = slider.value; });
    const firstBtn = grid.querySelector(`.pos-btn[data-pos="${defaultPos}"]`);
    if (firstBtn) firstBtn.classList.add('active');
}

function getPosScale(prefix) {
    const grid = document.getElementById(`${prefix}PosGrid`);
    const slider = document.getElementById(`${prefix}Scale`);
    const active = grid?.querySelector('.pos-btn.active');
    return { position: active?.dataset.pos || 'bottom-right', scale: parseInt(slider?.value) || 100 };
}

function setPosScale(prefix, position, scale) {
    const grid = document.getElementById(`${prefix}PosGrid`);
    const slider = document.getElementById(`${prefix}Scale`);
    const label = document.getElementById(`${prefix}ScaleVal`);
    if (grid && position) { grid.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active')); const btn = grid.querySelector(`.pos-btn[data-pos="${position}"]`); if (btn) btn.classList.add('active'); }
    if (slider && scale) { slider.value = scale; if (label) label.textContent = scale; }
}

let overlaysTabInitialised = false;
function initOverlaysTab() {
    loadLbConfig();
    loadGoalConfig();
    loadEndCardConfig();
    loadStartCardConfig();
    if (overlaysTabInitialised) return;
    overlaysTabInitialised = true;
    initPosScale('lb', 'top-right');
    initPosScale('goal', 'top-left');
    initPosScale('sc', 'bottom-center');
    initPosScale('ec', 'bottom-center');

    document.querySelectorAll('.sc-ec-outer-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const panelId = btn.dataset.panel;
            document.querySelectorAll('.sc-ec-outer-tab').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.sc-ec-outer-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const panel = document.getElementById(panelId);
            if (panel) panel.classList.add('active');
        });
    });

    document.querySelectorAll('#overlaysTabContent .overlay-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.dataset.card;
            const tab = btn.dataset.tab;
            btn.closest('.overlay-card').querySelectorAll('.overlay-tab').forEach(b => b.classList.remove('active'));
            btn.closest('.overlay-card').querySelectorAll('.overlay-tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const content = document.getElementById(`${card}-${tab}`);
            if (content) content.classList.add('active');
        });
    });

    ['lb', 'goal', 'sc', 'ec'].forEach(prefix => {
        const bgSel = document.getElementById(`${prefix}Background`);
        const bgRow = document.getElementById(`${prefix}BgColorRow`);
        if (bgSel && bgRow) bgSel.addEventListener('change', () => { bgRow.style.display = bgSel.value === 'solid' ? '' : 'none'; });
    });

    const lbShowAmount = document.getElementById('lbShowAmount');
    const lbShowAmountText = document.getElementById('lbShowAmountText');
    if (lbShowAmount && lbShowAmountText) lbShowAmount.addEventListener('change', () => { lbShowAmountText.textContent = lbShowAmount.checked ? 'On' : 'Off'; });

    const overlayLabels = { lb: 'Leaderboard', goal: 'Stream Goal', sc: 'Start Card', ec: 'End Card' };

    // ── Preview renderers ─────────────────────────────────────────────────────
    // Each renderer reads from Chrome storage (single source of truth) and builds
    // the exact same HTML structure as the real overlay files. Zero divergence.

    function escHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    function applyOverlayBackground(el, cfg) {
        if (cfg.background === 'transparent') { el.style.background = 'transparent'; el.style.backdropFilter = 'none'; el.style.border = 'none'; }
        else if (cfg.background === 'solid' && cfg.bgColor) { el.style.background = cfg.bgColor; }
    }

    function renderPreviewLb(container) {
        chrome.storage.local.get(['lbConfig', 'lbData'], (res) => {
            const cfg = res.lbConfig || {};
            const demoEntries = [{ username:'SubFan', total:150.00 }, { username:'RegularFan', total:35.00 }, { username:'LoyalViewer', total:20.00 }, { username:'NewFan', total:8.00 }, { username:'OldFan', total:5.00 }];
            const entries = ((res.lbData && res.lbData.length > 0) ? res.lbData : demoEntries).slice(0, cfg.count || 5);
            container.innerHTML = `
              <div id="lb-wrap" style="padding:14px 18px 16px;background:rgba(0,0,0,0.72);border:1px solid rgba(0,229,255,0.25);border-radius:14px;backdrop-filter:blur(8px);box-shadow:0 0 24px rgba(0,229,255,0.12);font-family:'Segoe UI',sans-serif;display:inline-block;min-width:200px;max-width:100%;box-sizing:border-box">
                <div id="lb-title" style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#00e5ff;text-shadow:0 0 8px rgba(0,229,255,0.6);margin-bottom:12px;text-align:center">${escHtml(cfg.icon ? cfg.icon + ' ' + (cfg.title || 'Top Tippers') : (cfg.title || '🏆 Top Tippers'))}</div>
                <div id="lb-list">${entries.map((e, i) => {
                    const rankBg = i===0?'#ffd700':i===1?'#c0c0c0':i===2?'#cd7f32':'rgba(255,255,255,0.1)';
                    const rankClr = i < 3 ? '#000' : '#aaa';
                    return `<div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06)"><div style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;background:${rankBg};color:${rankClr}">${i+1}</div><div style="flex:1;font-size:14px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(e.username)}</div>${cfg.showAmount !== false ? `<div style="font-size:14px;font-weight:700;color:#00e5ff;white-space:nowrap">$${e.total.toFixed(2)}</div>` : ''}</div>`;
                }).join('')}</div>
              </div>`;
            const wrap = container.querySelector('#lb-wrap');
            if (cfg.font) wrap.style.fontFamily = `'${cfg.font}', sans-serif`;
            if (cfg.fontColor) wrap.style.color = cfg.fontColor;
            if (cfg.borderColor) wrap.style.borderColor = cfg.borderColor;
            applyOverlayBackground(wrap, cfg);
        });
    }

    function renderPreviewGoal(container) {
        chrome.storage.local.get(['streamGoalConfig', 'streamGoalProgress'], (res) => {
            const cfg = res.streamGoalConfig || {};
            const progress = res.streamGoalProgress || 0;
            const target = cfg.target || 0;
            const pct = target > 0 ? Math.min((progress / target) * 100, 100) : 0;
            const barColor = cfg.barColor || '#00e5ff';
            const barBg = cfg.barStyle === 'gradient' ? `linear-gradient(90deg,${barColor},#00e5ff)` : barColor;
            if (!cfg.desc && !target) {
                container.innerHTML = `<div style="color:#666;font-size:12px;text-align:center;padding:20px">No goal configured yet — set a description and target above and click Save.</div>`;
                return;
            }
            container.innerHTML = `
              <div id="goal-wrap" style="width:420px;padding:14px 18px 16px;background:rgba(0,0,0,0.72);border:1px solid rgba(0,229,255,0.2);border-radius:14px;backdrop-filter:blur(8px);box-shadow:0 0 24px rgba(0,229,255,0.1);font-family:'Segoe UI',sans-serif;box-sizing:border-box">
                <div style="font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;margin-bottom:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(cfg.desc || '🎯 Stream Goal')}</div>
                <div style="width:100%;height:16px;background:rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;position:relative;border:1px solid rgba(0,229,255,0.15)">
                  <div style="height:100%;width:${pct}%;background:${barBg};border-radius:8px;box-shadow:0 0 10px rgba(0,229,255,0.5);transition:width 0.6s ease"></div>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px">
                  <span style="color:#00e5ff;font-weight:700">$${(+progress).toFixed(2)}</span>
                  <span style="color:#aaa">Goal: $${(+target).toFixed(2)}</span>
                </div>
                ${(cfg.reward && progress >= target && target > 0) ? `<div style="margin-top:10px;font-size:13px;color:#ffd700;font-weight:600;text-align:center">${escHtml(cfg.reward)}</div>` : ''}
              </div>`;
            const wrap = container.querySelector('#goal-wrap');
            if (cfg.font) wrap.style.fontFamily = `'${cfg.font}', sans-serif`;
            if (cfg.fontColor) wrap.style.color = cfg.fontColor;
            if (cfg.borderColor) wrap.style.borderColor = cfg.borderColor;
            applyOverlayBackground(wrap, cfg);
        });
    }

    function renderPreviewEc(container) {
        chrome.storage.local.get(['endCardConfig', 'tipAnalytics'], (res) => {
            const cfg = res.endCardConfig || {};
            const tips = res.tipAnalytics || [];
            const total = tips.reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
            const totalsMap = tips.reduce((m, t) => { m[t.username] = (m[t.username]||0) + (parseFloat(t.amount)||0); return m; }, {});
            const topEntry = Object.entries(totalsMap).sort((a,b) => b[1]-a[1])[0];
            const tipCount = tips.length > 0 ? tips.length : 0;
            const grossAmt = total > 0 ? total.toFixed(2) : '0.00';
            const topName = topEntry ? topEntry[0] : '—';
            const topAmt = topEntry ? topEntry[1].toFixed(2) : null;
            container.innerHTML = `
              <div id="ec-wrap" style="width:480px;padding:22px 24px 24px;background:rgba(0,0,0,0.82);border:1px solid rgba(0,229,255,0.3);border-radius:16px;backdrop-filter:blur(12px);box-shadow:0 0 40px rgba(0,229,255,0.15);font-family:'Segoe UI',sans-serif;box-sizing:border-box">
                <div style="font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#00e5ff;text-shadow:0 0 10px rgba(0,229,255,0.6);text-align:center;margin-bottom:18px">📊 Stream Recap</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
                  ${cfg.showTips !== false ? `<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;text-align:center"><div style="font-size:22px;font-weight:800;color:#fff;line-height:1;margin-bottom:4px">${tipCount}</div><div style="font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#666">Tip Count</div></div>` : ''}
                  ${cfg.showAmount !== false ? `<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;text-align:center"><div style="font-size:22px;font-weight:800;color:#00e5ff;line-height:1;margin-bottom:4px">$${grossAmt}</div><div style="font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#666">Total Tips</div></div>` : ''}
                </div>
                ${cfg.showTopTipper !== false ? `<div style="background:rgba(255,215,0,0.06);border:1px solid rgba(255,215,0,0.2);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:10px;margin-bottom:12px"><div style="font-size:20px">👑</div><div style="flex:1"><div style="font-size:15px;font-weight:700;color:#ffd700">${escHtml(topName)}</div><div style="font-size:12px;color:#aaa">${topAmt ? '$' + topAmt : 'Top Tipper'}</div></div></div>` : ''}
                ${cfg.showHypeTrain !== false ? `<div style="background:rgba(0,229,255,0.04);border:1px solid rgba(0,229,255,0.12);border-radius:10px;padding:10px 14px;font-size:12px;color:#aaa;margin-bottom:12px">🚂 Hype Train data will appear here after stream</div>` : ''}
                <div id="ec-footer" style="margin-top:14px;text-align:center;font-size:13px;font-weight:600;color:#ccc">${escHtml(cfg.thankYou || 'Thank you for watching! 💙')}</div>
              </div>`;
            const wrap = container.querySelector('#ec-wrap');
            if (cfg.font) wrap.style.fontFamily = `'${cfg.font}', sans-serif`;
            if (cfg.fontColor) { wrap.style.color = cfg.fontColor; const footer = wrap.querySelector('#ec-footer'); if (footer) footer.style.color = cfg.fontColor; }
            if (cfg.borderColor) wrap.style.borderColor = cfg.borderColor;
            applyOverlayBackground(wrap, cfg);
        });
    }

    function renderPreviewSc(container) {
        chrome.storage.local.get(['startCardConfig'], (res) => {
            const cfg = res.startCardConfig || {};
            const accent = cfg.accentColor || '#00e5ff';
            container.innerHTML = `
              <div id="sc-wrap" style="width:480px;padding:24px 28px 26px;background:rgba(0,0,0,0.82);border:1px solid rgba(0,229,255,0.3);border-radius:16px;backdrop-filter:blur(12px);box-shadow:0 0 40px rgba(0,229,255,0.15);font-family:'Segoe UI',sans-serif;box-sizing:border-box">
                ${cfg.showLiveDot !== false ? `<div style="display:flex;align-items:center;justify-content:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accent};margin-bottom:16px"><span style="width:8px;height:8px;border-radius:50%;background:${accent};box-shadow:0 0 8px ${accent};display:inline-block"></span> LIVE SOON</div>` : ''}
                <div id="sc-headline" style="font-size:22px;font-weight:800;color:#fff;text-align:center;line-height:1.2;margin-bottom:10px">${escHtml(cfg.headline || '🎬 Starting Soon…')}</div>
                ${cfg.subtitle ? `<div style="font-size:14px;font-weight:500;color:#aaa;text-align:center;line-height:1.5">${escHtml(cfg.subtitle)}</div>` : ''}
                <div style="margin-top:18px;text-align:center;font-size:11px;color:#444;letter-spacing:1px">fluxee.stream</div>
              </div>`;
            const wrap = container.querySelector('#sc-wrap');
            if (cfg.font) wrap.style.fontFamily = `'${cfg.font}', sans-serif`;
            if (cfg.fontColor) { wrap.style.color = cfg.fontColor; const hl = wrap.querySelector('#sc-headline'); if (hl) hl.style.color = cfg.fontColor; }
            if (cfg.borderColor) wrap.style.borderColor = cfg.borderColor;
            applyOverlayBackground(wrap, cfg);
        });
    }

    const previewRenderers = { lb: renderPreviewLb, goal: renderPreviewGoal, sc: renderPreviewSc, ec: renderPreviewEc };
    let currentPreviewOverlay = null;

    function loadOverlayPreview(overlay) {
        const container = document.getElementById('overlayPreviewInner');
        const label = document.getElementById('overlayPreviewLabel');
        if (!container) return;
        currentPreviewOverlay = overlay;
        if (label) label.textContent = overlayLabels[overlay] || '';
        document.querySelectorAll('.overlay-preview-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`.overlay-preview-btn[data-overlay="${overlay}"]`).forEach(b => b.classList.add('active'));
        container.innerHTML = '';
        const renderer = previewRenderers[overlay];
        if (renderer) renderer(container);
    }

    ['saveLbConfigBtn', 'saveGoalConfigBtn', 'saveStartCardBtn', 'saveEndCardBtn'].forEach(id => {
        document.getElementById(id)?.addEventListener('click', () => {
            if (currentPreviewOverlay) setTimeout(() => loadOverlayPreview(currentPreviewOverlay), 150);
        });
    });

    document.querySelectorAll('.overlay-preview-btn').forEach(btn => {
        btn.addEventListener('click', () => loadOverlayPreview(btn.dataset.overlay));
    });

    document.querySelectorAll('.overlay-preview-load').forEach(btn => {
        btn.addEventListener('click', () => loadOverlayPreview(btn.dataset.overlay));
    });

    document.querySelectorAll('#overlaysTabContent .obs-copyable').forEach(el => {
        el.addEventListener('click', () => {
            const url = el.dataset.url;
            if (!url) return;
            navigator.clipboard.writeText(url).then(() => { el.classList.add('copied'); const icon = el.querySelector('.obs-copy-icon'); const prev = icon ? icon.textContent : ''; if (icon) icon.textContent = '✓'; setTimeout(() => { el.classList.remove('copied'); if (icon) icon.textContent = prev; }, 1800); }).catch(() => {});
        });
    });

    document.getElementById('saveLbConfigBtn')?.addEventListener('click', () => {
        const ps = getPosScale('lb');
        const cfg = { count: parseInt(document.getElementById('lbCount')?.value)||5, reset: document.getElementById('lbReset')?.value||'session', title: document.getElementById('lbTitle')?.value||'🏆 Top Tippers', showAmount: document.getElementById('lbShowAmount')?.checked !== false, position: ps.position, scale: ps.scale, font: document.getElementById('lbFont')?.value||'Inter', fontColor: document.getElementById('lbFontColor')?.value||'#ffffff', background: document.getElementById('lbBackground')?.value||'dark', bgColor: document.getElementById('lbBgColor')?.value||'#0d0d1a', borderColor: document.getElementById('lbBorderColor')?.value||'#00e5ff', accentColor: document.getElementById('lbAccentColor')?.value||'#f5a623', icon: document.getElementById('lbIcon')?.value||'🏆' };
        chrome.storage.local.set({ lbConfig: cfg }, () => { showToast('Leaderboard config saved.'); notifyRelay('leaderboard_config_updated', cfg); });
    });

    document.getElementById('resetLbBtn')?.addEventListener('click', () => {
        showConfirm('Reset the leaderboard? This clears all current tip totals.', () => { chrome.storage.local.set({ lbData: [] }, () => { showToast('Leaderboard reset.'); notifyRelay('leaderboard_reset', {}); }); });
    });

    document.getElementById('saveGoalConfigBtn')?.addEventListener('click', () => {
        const ps = getPosScale('goal');
        const cfg = { desc: document.getElementById('goalDesc')?.value||'', target: parseFloat(document.getElementById('goalTarget')?.value)||0, reward: document.getElementById('goalReward')?.value||'', reset: document.getElementById('goalReset')?.value||'session', position: ps.position, scale: ps.scale, font: document.getElementById('goalFont')?.value||'Inter', fontColor: document.getElementById('goalFontColor')?.value||'#ffffff', background: document.getElementById('goalBackground')?.value||'dark', bgColor: document.getElementById('goalBgColor')?.value||'#0d0d1a', borderColor: document.getElementById('goalBorderColor')?.value||'#00e5ff', barColor: document.getElementById('goalBarColor')?.value||'#00e5ff', barStyle: document.getElementById('goalBarStyle')?.value||'solid' };
        chrome.storage.local.set({ streamGoalConfig: cfg }, () => { showToast('Stream goal saved.'); notifyRelay('stream_goal_config_updated', cfg); });
    });

    document.getElementById('resetGoalBtn')?.addEventListener('click', () => {
        showConfirm('Reset goal progress to $0?', () => { chrome.storage.local.set({ streamGoalProgress: 0 }, () => { showToast('Goal progress reset.'); notifyRelay('stream_goal_reset', {}); }); });
    });

    document.getElementById('saveStartCardBtn')?.addEventListener('click', () => {
        const ps = getPosScale('sc');
        const cfg = { headline: document.getElementById('scHeadline')?.value||'', subtitle: document.getElementById('scSubtitle')?.value||'', showLiveDot: document.getElementById('scShowLiveDot')?.checked !== false, position: ps.position, scale: ps.scale, font: document.getElementById('scFont')?.value||'Inter', fontColor: document.getElementById('scFontColor')?.value||'#ffffff', background: document.getElementById('scBackground')?.value||'dark', bgColor: document.getElementById('scBgColor')?.value||'#0d0d1a', borderColor: document.getElementById('scBorderColor')?.value||'#00e5ff', accentColor: document.getElementById('scAccentColor')?.value||'#00e5ff' };
        chrome.storage.local.set({ startCardConfig: cfg }, () => { showToast('Start card config saved.'); notifyRelay('start_card_config_updated', cfg); });
    });

    document.getElementById('saveEndCardBtn')?.addEventListener('click', () => {
        const ps = getPosScale('ec');
        const cfg = { thankYou: document.getElementById('endCardThankYou')?.value||'', showTips: document.getElementById('ecShowTips')?.checked !== false, showAmount: document.getElementById('ecShowAmount')?.checked !== false, showTopTipper: document.getElementById('ecShowTopTipper')?.checked !== false, showHypeTrain: document.getElementById('endCardHypeTrain')?.checked !== false, position: ps.position, scale: ps.scale, font: document.getElementById('ecFont')?.value||'Inter', fontColor: document.getElementById('ecFontColor')?.value||'#ffffff', background: document.getElementById('ecBackground')?.value||'dark', bgColor: document.getElementById('ecBgColor')?.value||'#0d0d1a', borderColor: document.getElementById('ecBorderColor')?.value||'#00e5ff', accentColor: document.getElementById('ecAccentColor')?.value||'#f5a623' };
        chrome.storage.local.set({ endCardConfig: cfg }, () => { showToast('End card config saved.'); notifyRelay('end_card_config_updated', cfg); });
    });
}

function loadLbConfig() {
    chrome.storage.local.get(['lbConfig'], (res) => {
        const cfg = res.lbConfig || {};
        if (document.getElementById('lbCount') && cfg.count) document.getElementById('lbCount').value = cfg.count;
        if (document.getElementById('lbReset') && cfg.reset) document.getElementById('lbReset').value = cfg.reset;
        if (document.getElementById('lbTitle') && cfg.title) document.getElementById('lbTitle').value = cfg.title;
        if (document.getElementById('lbShowAmount') && cfg.showAmount !== undefined) document.getElementById('lbShowAmount').checked = cfg.showAmount;
        if (document.getElementById('lbFont') && cfg.font) document.getElementById('lbFont').value = cfg.font;
        if (document.getElementById('lbFontColor') && cfg.fontColor) document.getElementById('lbFontColor').value = cfg.fontColor;
        if (document.getElementById('lbBackground') && cfg.background) document.getElementById('lbBackground').value = cfg.background;
        if (document.getElementById('lbBgColor') && cfg.bgColor) document.getElementById('lbBgColor').value = cfg.bgColor;
        if (document.getElementById('lbBorderColor') && cfg.borderColor) document.getElementById('lbBorderColor').value = cfg.borderColor;
        if (document.getElementById('lbAccentColor') && cfg.accentColor) document.getElementById('lbAccentColor').value = cfg.accentColor;
        if (document.getElementById('lbIcon') && cfg.icon) document.getElementById('lbIcon').value = cfg.icon;
        const bgRow = document.getElementById('lbBgColorRow');
        if (bgRow) bgRow.style.display = cfg.background === 'solid' ? '' : 'none';
        if (cfg.position || cfg.scale) setPosScale('lb', cfg.position, cfg.scale);
    });
}

function loadGoalConfig() {
    chrome.storage.local.get(['streamGoalConfig'], (res) => {
        const cfg = res.streamGoalConfig || {};
        if (document.getElementById('goalDesc') && cfg.desc) document.getElementById('goalDesc').value = cfg.desc;
        if (document.getElementById('goalTarget') && cfg.target) document.getElementById('goalTarget').value = cfg.target;
        if (document.getElementById('goalReward') && cfg.reward) document.getElementById('goalReward').value = cfg.reward;
        if (document.getElementById('goalReset') && cfg.reset) document.getElementById('goalReset').value = cfg.reset;
        if (document.getElementById('goalFont') && cfg.font) document.getElementById('goalFont').value = cfg.font;
        if (document.getElementById('goalFontColor') && cfg.fontColor) document.getElementById('goalFontColor').value = cfg.fontColor;
        if (document.getElementById('goalBackground') && cfg.background) document.getElementById('goalBackground').value = cfg.background;
        if (document.getElementById('goalBgColor') && cfg.bgColor) document.getElementById('goalBgColor').value = cfg.bgColor;
        if (document.getElementById('goalBorderColor') && cfg.borderColor) document.getElementById('goalBorderColor').value = cfg.borderColor;
        if (document.getElementById('goalBarColor') && cfg.barColor) document.getElementById('goalBarColor').value = cfg.barColor;
        if (document.getElementById('goalBarStyle') && cfg.barStyle) document.getElementById('goalBarStyle').value = cfg.barStyle;
        const bgRow = document.getElementById('goalBgColorRow');
        if (bgRow) bgRow.style.display = cfg.background === 'solid' ? '' : 'none';
        if (cfg.position || cfg.scale) setPosScale('goal', cfg.position, cfg.scale);
    });
}

function loadEndCardConfig() {
    chrome.storage.local.get(['endCardConfig'], (res) => {
        const cfg = res.endCardConfig || {};
        if (document.getElementById('endCardThankYou') && cfg.thankYou !== undefined) document.getElementById('endCardThankYou').value = cfg.thankYou;
        if (document.getElementById('ecShowTips') && cfg.showTips !== undefined) document.getElementById('ecShowTips').checked = cfg.showTips;
        if (document.getElementById('ecShowAmount') && cfg.showAmount !== undefined) document.getElementById('ecShowAmount').checked = cfg.showAmount;
        if (document.getElementById('ecShowTopTipper') && cfg.showTopTipper !== undefined) document.getElementById('ecShowTopTipper').checked = cfg.showTopTipper;
        if (document.getElementById('endCardHypeTrain') && cfg.showHypeTrain !== undefined) document.getElementById('endCardHypeTrain').checked = cfg.showHypeTrain;
        if (document.getElementById('ecFont') && cfg.font) document.getElementById('ecFont').value = cfg.font;
        if (document.getElementById('ecFontColor') && cfg.fontColor) document.getElementById('ecFontColor').value = cfg.fontColor;
        if (document.getElementById('ecBackground') && cfg.background) document.getElementById('ecBackground').value = cfg.background;
        if (document.getElementById('ecBgColor') && cfg.bgColor) document.getElementById('ecBgColor').value = cfg.bgColor;
        if (document.getElementById('ecBorderColor') && cfg.borderColor) document.getElementById('ecBorderColor').value = cfg.borderColor;
        if (document.getElementById('ecAccentColor') && cfg.accentColor) document.getElementById('ecAccentColor').value = cfg.accentColor;
        const bgRow = document.getElementById('ecBgColorRow');
        if (bgRow) bgRow.style.display = cfg.background === 'solid' ? '' : 'none';
        if (cfg.position || cfg.scale) setPosScale('ec', cfg.position, cfg.scale);
    });
}

function loadStartCardConfig() {
    chrome.storage.local.get(['startCardConfig'], (res) => {
        const cfg = res.startCardConfig || {};
        if (document.getElementById('scHeadline') && cfg.headline !== undefined) document.getElementById('scHeadline').value = cfg.headline;
        if (document.getElementById('scSubtitle') && cfg.subtitle !== undefined) document.getElementById('scSubtitle').value = cfg.subtitle;
        if (document.getElementById('scShowLiveDot') && cfg.showLiveDot !== undefined) document.getElementById('scShowLiveDot').checked = cfg.showLiveDot;
        if (document.getElementById('scFont') && cfg.font) document.getElementById('scFont').value = cfg.font;
        if (document.getElementById('scFontColor') && cfg.fontColor) document.getElementById('scFontColor').value = cfg.fontColor;
        if (document.getElementById('scBackground') && cfg.background) document.getElementById('scBackground').value = cfg.background;
        if (document.getElementById('scBgColor') && cfg.bgColor) document.getElementById('scBgColor').value = cfg.bgColor;
        if (document.getElementById('scBorderColor') && cfg.borderColor) document.getElementById('scBorderColor').value = cfg.borderColor;
        if (document.getElementById('scAccentColor') && cfg.accentColor) document.getElementById('scAccentColor').value = cfg.accentColor;
        const bgRow = document.getElementById('scBgColorRow');
        if (bgRow) bgRow.style.display = cfg.background === 'solid' ? '' : 'none';
        if (cfg.position || cfg.scale) setPosScale('sc', cfg.position, cfg.scale);
    });
}

function notifyRelay(type, payload) {
    fetch('http://127.0.0.1:3745/trigger', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: relayToken, type, ...payload })
    }).catch(() => {});
}

function saveRules() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ triggerRules: rules, customTriggerTypes: customTypes });
    }
}

const ruleType = document.getElementById('ruleType');
const textFields = document.getElementById('textFields');
const comboFields = document.getElementById('comboFields');
const rapidFields = document.getElementById('rapidFields');
ruleType.addEventListener('change', showTypeFields);

function showTypeFields() {
    const val = ruleType.value;
    textFields.style.display = val === 'text' ? '' : 'none';
    comboFields.style.display = val === 'combo' ? '' : 'none';
    rapidFields.style.display = val === 'rapid' ? '' : 'none';
    const isCustom = customTypes.some(t => t.id === val);
    document.getElementById('customFields').style.display = isCustom ? '' : 'none';
}

const addStepBtn = document.getElementById('addStepBtn');
const stepsContainer = document.getElementById('amountSteps');
addStepBtn.addEventListener('click', () => { amountSteps.push(''); renderAmountSteps(); });

function renderAmountSteps() {
    stepsContainer.innerHTML = '';
    amountSteps.forEach((val, i) => {
        const row = document.createElement('div');
        row.className = 'step-row';
        if (i > 0) { const arrow = document.createElement('span'); arrow.className = 'step-arrow'; arrow.textContent = '→'; row.appendChild(arrow); }
        const input = document.createElement('input');
        input.type = 'number'; input.step = '0.01'; input.min = '0.01'; input.placeholder = '$0.00'; input.value = val || ''; input.className = 'input-field narrow';
        input.addEventListener('input', () => { amountSteps[i] = parseFloat(input.value) || 0; });
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn small queue-remove-btn'; removeBtn.textContent = '✕';
        removeBtn.onclick = () => { amountSteps.splice(i, 1); renderAmountSteps(); };
        row.appendChild(input); row.appendChild(removeBtn); stepsContainer.appendChild(row);
    });
}

document.getElementById('saveRuleBtn').addEventListener('click', () => {
    const name = document.getElementById('ruleName').value.trim();
    const type = ruleType.value;
    const animation = document.getElementById('ruleAnimation').value;
    const chatMessage = document.getElementById('ruleChatMessage').value.trim();
    if (!name) { showToast('Please enter a rule name.'); return; }
    const cooldownSeconds = parseInt(document.getElementById('ruleCooldown')?.value) || 0;
    const fireOnce = document.getElementById('ruleFireOnce')?.checked || false;
    let ruleData = { name, type, animation, chatMessage, enabled: true, cooldownSeconds, fireOnce };
    if (type === 'text') {
        const keyword = document.getElementById('textKeyword').value.trim();
        if (!keyword) { showToast('Please enter a keyword.'); return; }
        ruleData.keyword = keyword;
    } else if (type === 'combo') {
        const validAmounts = amountSteps.filter(a => a > 0);
        if (validAmounts.length < 2) { showToast('Add at least 2 amounts to the sequence.'); return; }
        ruleData.amounts = validAmounts;
        ruleData.windowSeconds = parseInt(document.getElementById('comboWindow').value) || 60;
    } else if (type === 'rapid') {
        ruleData.count = parseInt(document.getElementById('rapidCount').value) || 5;
        ruleData.windowSeconds = parseInt(document.getElementById('rapidWindow').value) || 30;
    } else if (type === 'goal_start' || type === 'goal_complete') {
    } else {
        ruleData.targetValue = parseFloat(document.getElementById('customTargetValue').value) || 0;
    }
    if (editingRuleId) {
        const idx = rules.findIndex(r => r.id === editingRuleId);
        if (idx > -1) rules[idx] = { ...ruleData, id: editingRuleId };
        stopEditing();
    } else {
        ruleData.id = Math.random().toString(36).substr(2, 9);
        rules.push(ruleData);
    }
    saveRules(); renderRules(); resetForm(); showToast('Rule saved!');
});

document.getElementById('cancelEditBtn').addEventListener('click', () => { stopEditing(); resetForm(); });

function stopEditing() {
    editingRuleId = null;
    document.getElementById('saveRuleBtn').textContent = '💾 Save Rule';
    document.getElementById('cancelEditBtn').style.display = 'none';
}

function resetForm() {
    document.getElementById('ruleName').value = '';
    document.getElementById('textKeyword').value = '';
    document.getElementById('comboWindow').value = 60;
    document.getElementById('rapidCount').value = 5;
    document.getElementById('rapidWindow').value = 30;
    document.getElementById('ruleChatMessage').value = '';
    const cooldownResetEl = document.getElementById('ruleCooldown');
    const fireOnceResetEl = document.getElementById('ruleFireOnce');
    if (cooldownResetEl) cooldownResetEl.value = 0;
    if (fireOnceResetEl) fireOnceResetEl.checked = false;
    ruleType.value = 'text';
    amountSteps = [];
    document.getElementById('customTargetValue').value = 0.01;
    renderAmountSteps();
    showTypeFields();
}

function renderRules() {
    const container = document.getElementById('rulesList');
    if (rules.length === 0) { container.innerHTML = '<div class="empty-state">No rules yet — add one above.</div>'; return; }
    container.innerHTML = '';
    rules.forEach(rule => {
        const card = document.createElement('div');
        card.className = 'rule-card';
        card.innerHTML = `
            <div class="rule-left">
                <span class="rule-type-badge ${rule.type}">${ruleBadge(rule.type)}</span>
                <div class="rule-info"><span class="rule-name">${rule.name}</span><span class="rule-summary">${ruleSummary(rule)}</span></div>
            </div>
            <div class="rule-right">
                <span class="rule-anim">${rule.animation}</span>
                <label class="toggle-label" title="Enable/disable"><input type="checkbox" class="rule-toggle" data-id="${rule.id}" ${rule.enabled ? 'checked' : ''}><span class="toggle-track"></span></label>
                <button class="btn secondary small" data-edit="${rule.id}">✏️</button>
                <button class="btn small queue-remove-btn" data-delete="${rule.id}">🗑️</button>
                <button class="btn secondary small" data-test="${rule.id}">▶ Test</button>
            </div>`;
        card.querySelector('[data-edit]').onclick = () => editRule(rule.id);
        card.querySelector('[data-delete]').onclick = () => deleteRule(rule.id);
        card.querySelector('[data-test]').onclick = () => testFire(rule);
        card.querySelector('.rule-toggle').onchange = (e) => { rule.enabled = e.target.checked; saveRules(); };
        container.appendChild(card);
    });
}

function ruleBadge(type) {
    const builtin = { text:'📝 Text', combo:'💰 Combo', rapid:'⚡ Rapid', goal_start:'🎯 Goal Start', goal_complete:'🏆 Goal Done' }[type];
    if (builtin) return builtin;
    const custom = customTypes.find(t => t.id === type);
    return custom ? `🛠️ ${custom.name}` : type;
}

function ruleSummary(rule) {
    let summary = '';
    if (rule.type === 'text') summary = `keyword: "${rule.keyword}"`;
    else if (rule.type === 'combo') summary = `${(rule.amounts || []).map(a => '$' + a.toFixed(2)).join(' → ')} within ${rule.windowSeconds}s`;
    else if (rule.type === 'rapid') summary = `${rule.count} tips within ${rule.windowSeconds}s`;
    else if (rule.type === 'goal_start') summary = 'Triggers when a new goal is set';
    if (rule.cooldownSeconds > 0) summary += ` · ⏱ ${rule.cooldownSeconds}s cooldown`;
    if (rule.fireOnce) summary += ' · 🔒 fire once';
    else if (rule.type === 'goal_complete') summary = 'Triggers when a goal reaches target';
    else if (rule.targetValue !== undefined) summary = `Target: ${rule.targetValue}`;
    if (rule.chatMessage) summary += ` | 💬 Chat: "${rule.chatMessage.substring(0, 15)}${rule.chatMessage.length > 15 ? '...' : ''}"`;
    return summary;
}

function editRule(id) {
    const rule = rules.find(r => r.id === id);
    if (!rule) return;
    editingRuleId = id;
    document.getElementById('ruleName').value = rule.name;
    ruleType.value = rule.type;
    document.getElementById('ruleAnimation').value = rule.animation;
    document.getElementById('ruleChatMessage').value = rule.chatMessage || '';
    const cooldownEl = document.getElementById('ruleCooldown');
    const fireOnceEl = document.getElementById('ruleFireOnce');
    if (cooldownEl) cooldownEl.value = rule.cooldownSeconds || 0;
    if (fireOnceEl) fireOnceEl.checked = !!rule.fireOnce;
    showTypeFields();
    if (rule.type === 'text') document.getElementById('textKeyword').value = rule.keyword || '';
    else if (rule.type === 'combo') { amountSteps = [...(rule.amounts || [])]; renderAmountSteps(); document.getElementById('comboWindow').value = rule.windowSeconds || 60; }
    else if (rule.type === 'rapid') { document.getElementById('rapidCount').value = rule.count || 5; document.getElementById('rapidWindow').value = rule.windowSeconds || 30; }
    else if (rule.type === 'goal_start' || rule.type === 'goal_complete') {}
    else document.getElementById('customTargetValue').value = rule.targetValue || 0;
    document.getElementById('saveRuleBtn').textContent = '💾 Update Rule';
    document.getElementById('cancelEditBtn').style.display = '';
    document.querySelector('.trigger-form-card').scrollIntoView({ behavior: 'smooth' });
}

function deleteRule(id) {
    showConfirm('Delete this trigger rule?', () => { rules = rules.filter(r => r.id !== id); saveRules(); renderRules(); showToast('🗑️ Rule deleted'); });
}

function testFire(rule) {
    let firedChat = false;
    if (rule.chatMessage && typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.sendMessage({ type: 'EVENT', name: 'CHAT_MESSAGE_REQUESTED', payload: { message: rule.chatMessage.replace(/{user}/gi, 'TestUser').replace(/{amount}/gi, '$10.00'), ruleName: rule.name + ' (TEST)' } }).catch(() => {});
        firedChat = true;
    }
    fetch(RELAY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ animation: rule.animation, ruleName: rule.name + ' (TEST)', ruleType: rule.type, time: Date.now() }) })
        .then(r => r.json()).then(res => { if (res.ok) showToast(`✅ Fired ${rule.animation} (Overlay) ${firedChat ? '+ Chat' : ''}`); else showToast('❌ Relay error: ' + res.error); })
        .catch(() => { if (firedChat) showToast('💬 Chat Trigger tested! (Overlay relay is offline)'); else showToast('❌ Cannot reach relay. Is Fluxee Bridge running?'); });
}

async function checkRelayStatus() {
    try {
        const res = await fetch('http://127.0.0.1:3745/status');
        const data = await res.json();
        if (data.token) relayToken = data.token;
        const n = data.clients;
        const label = n === 0 ? '● Relay online — no OBS sources connected' : `● Relay online — ${n} OBS source${n === 1 ? '' : 's'} connected`;
        setRelayStatus(true, label);
    } catch { setRelayStatus(false, '○ Relay offline'); }
}

function setRelayStatus(online, text) {
    const el = document.getElementById('relayStatus');
    const textEl = document.getElementById('relayStatusText');
    if (el && textEl) { el.className = `relay-status ${online ? 'online' : 'offline'}`; textEl.textContent = text; }
}

document.getElementById('testRelayBtn').addEventListener('click', checkRelayStatus);

async function loadAssets() {
    try {
        const res = await fetch('http://127.0.0.1:3745/assets');
        const data = await res.json();
        if (data.ok) populateAllAssetDropdowns(data);
    } catch (e) { console.error('[Triggers] Asset load failed:', e); populateAllAssetDropdowns({ animations: [], icons: [], backgrounds: [] }); }
}

function populateAllAssetDropdowns(data) {
    populateAnimationDropdown(data.animations || []);
    renderMyThemesPanel();
    const htThemeSelect = document.getElementById('htTheme');
    if (htThemeSelect) {
        const builtInIds = Object.keys(themePresets);
        const customThemes = (data.themes || []).filter(t => !builtInIds.includes(t));
        const currentVal = htThemeSelect.value;
        const existingGroup = htThemeSelect.querySelector('optgroup[label="My Themes"]');
        if (existingGroup) existingGroup.remove();
        if (customThemes.length > 0) {
            const group = document.createElement('optgroup');
            group.label = 'My Themes';
            customThemes.forEach(name => { const opt = document.createElement('option'); opt.value = name; opt.textContent = name; group.appendChild(opt); });
            htThemeSelect.appendChild(group);
        }
        if (currentVal && htThemeSelect.querySelector(`option[value="${currentVal}"]`)) htThemeSelect.value = currentVal;
    }
    document.querySelectorAll('.ht-asset-select').forEach(select => {
        const assetType = select.dataset.assetType;
        const currentVal = select.value;
        const defaults = [];
        Array.from(select.options).forEach(opt => { if (['','none','default','image','custom'].includes(opt.value)) defaults.push({ value: opt.value, text: opt.textContent }); });
        select.innerHTML = '';
        defaults.forEach(d => { const opt = document.createElement('option'); opt.value = d.value; opt.textContent = d.text; select.appendChild(opt); });
        (data[assetType] || []).forEach(file => { const opt = document.createElement('option'); opt.value = file; opt.textContent = file; select.appendChild(opt); });
        if (currentVal) select.value = currentVal;
    });
}

function populateAnimationDropdown(animations) {
    const select = document.getElementById('ruleAnimation');
    const assetList = document.getElementById('assetList');
    if (!select) return;
    if (animations.length === 0) {
        select.innerHTML = '<option value="">(No .webm files found in /assets)</option>';
        if (assetList) assetList.innerHTML = '<div class="empty-state" style="font-size:11px">No animations uploaded yet.</div>';
        return;
    }
    select.innerHTML = '';
    animations.forEach(file => { const opt = document.createElement('option'); opt.value = file; opt.textContent = file; select.appendChild(opt); });
    if (assetList) {
        assetList.innerHTML = '';
        animations.forEach(file => {
            const item = document.createElement('div');
            item.className = 'rule-card'; item.style.padding = '8px'; item.style.marginBottom = '5px'; item.style.fontSize = '12px';
            item.innerHTML = `<div class="rule-left"><span>🎬 ${file}</span></div><button class="btn secondary small" style="padding:2px 8px" onclick="testFire({animation:'${file}', name:'Test Fire'})">▶</button>`;
            assetList.appendChild(item);
        });
    }
}

const dropZone = document.getElementById('dropZone');
const animFileInput = document.getElementById('animFileInput');
if (dropZone && animFileInput) {
    dropZone.addEventListener('click', () => animFileInput.click());
    ['dragenter','dragover','dragleave','drop'].forEach(eventName => { dropZone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false); });
    dropZone.addEventListener('dragover', () => dropZone.classList.add('dragover'));
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => { dropZone.classList.remove('dragover'); const files = e.dataTransfer.files; if (files.length > 0) handleFileUpload(files[0]); });
    animFileInput.addEventListener('change', () => { if (animFileInput.files.length > 0) handleFileUpload(animFileInput.files[0]); });
}

async function handleFileUpload(file) {
    if (!file.name.toLowerCase().endsWith('.webm')) { showToast('❌ Only .webm files are supported'); return; }
    showToast('⏳ Uploading ' + file.name + '...');
    try {
        const res = await fetch('http://127.0.0.1:3745/upload', { method: 'POST', headers: { 'X-File-Name': file.name }, body: file });
        const data = await res.json();
        if (data.ok) { showToast('✅ Upload successful!'); loadAssets(); } else showToast('❌ Upload failed: ' + data.error);
    } catch (e) { showToast('❌ Upload error. Is relay server running?'); }
    if (animFileInput) animFileInput.value = '';
}

document.getElementById('saveCustomTypeBtn').addEventListener('click', () => {
    const name = document.getElementById('customTypeName').value.trim();
    const metric = document.getElementById('customTypeMetric').value;
    const operator = document.getElementById('customTypeOperator').value;
    const persistence = document.getElementById('customTypePersistence').value;
    if (!name) { showToast('Please enter a type name.'); return; }
    const id = 'custom_' + Math.random().toString(36).substr(2, 5);
    customTypes.push({ id, name, metric, operator, persistence });
    saveRules(); renderCustomTypes(); updateRuleTypeDropdown();
    document.getElementById('customTypeName').value = '';
    showToast('Trigger Type created!');
});

function renderCustomTypes() {
    const list = document.getElementById('customTypesList');
    list.innerHTML = '';
    customTypes.forEach((type, i) => {
        const item = document.createElement('div');
        item.className = 'rule-card'; item.style.padding = '10px'; item.style.marginBottom = '8px';
        item.innerHTML = `<div class="rule-left"><div class="rule-info"><span class="rule-name" style="font-size:13px">${type.name}</span><span class="rule-summary" style="font-size:11px">${type.metric} ${type.operator} (${type.persistence})</span></div></div><button class="btn small queue-remove-btn" data-delete-type="${i}">🗑️</button>`;
        item.querySelector('[data-delete-type]').onclick = () => deleteCustomType(i);
        list.appendChild(item);
    });
}

function deleteCustomType(index) {
    showConfirm('Delete this trigger type? Rules using it will stop working.', () => { customTypes.splice(index, 1); saveRules(); renderCustomTypes(); updateRuleTypeDropdown(); showToast('🗑️ Custom Type deleted'); });
}

function updateRuleTypeDropdown() {
    const select = document.getElementById('ruleType');
    select.innerHTML = `
        <option value="text">📝 Text Match — tip contains a keyword</option>
        <option value="combo">💰 Dollar Sequence — ordered amounts in a time window</option>
        <option value="rapid">⚡ Rapid-Fire — N tips within a time window</option>
        <option value="goal_start">🎯 Goal Started — a new goal is set on stream</option>
        <option value="goal_complete">🏆 Goal Completed — a goal reaches its target</option>`;
    customTypes.forEach(type => { const opt = document.createElement('option'); opt.value = type.id; opt.textContent = `🛠️ ${type.name} — Custom Logic`; select.appendChild(opt); });
}

const toastContainer = document.getElementById('toast-container');
function showToast(msg, duration = 3000) {
    const t = document.createElement('div');
    t.className = 'toast'; t.innerHTML = `<span>${msg}</span>`;
    toastContainer.appendChild(t);
    setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, duration);
}

function showConfirm(msg, onConfirm) {
    const overlay = document.getElementById('confirm-modal-overlay');
    document.getElementById('confirm-modal-message').textContent = msg;
    overlay.style.display = 'flex';
    const cleanup = () => { overlay.style.display = 'none'; };
    document.getElementById('confirm-modal-yes').onclick = () => { cleanup(); onConfirm(); };
    document.getElementById('confirm-modal-no').onclick = cleanup;
}

const navTabs = { 'openAnalyticsBtn': 'analytics.html', 'openDesignerBtn': 'designer.html', 'openAutoModBtn': 'automod.html' };
Object.entries(navTabs).forEach(([id, url]) => { const el = document.getElementById(id); if (el) el.onclick = () => { window.location.href = url; }; });

showTypeFields();
loadRules();
loadAssets();
checkRelayStatus();
setInterval(checkRelayStatus, 10000);

if (htMode) htMode.addEventListener('change', () => { toggleHTMode(); saveHypeTrainConfig(); updateHTLevelPreview(); });
if (htLevels) htLevels.addEventListener('input', () => { updateHTLevelPreview(); saveHypeTrainConfig(); });
if (htBaseGoal) htBaseGoal.addEventListener('input', () => { updateHTLevelPreview(); saveHypeTrainConfig(); });
if (htDifficulty) htDifficulty.addEventListener('change', () => { updateHTLevelPreview(); saveHypeTrainConfig(); });
if (htSingleGoal) htSingleGoal.addEventListener('input', saveHypeTrainConfig);
if (htDurationPreset) htDurationPreset.addEventListener('change', () => { const row = document.getElementById('htCustomDurationRow'); if (htDurationPreset.value === 'custom') row.style.display = ''; else row.style.display = 'none'; saveHypeTrainConfig(); });
if (htDuration) htDuration.addEventListener('input', saveHypeTrainConfig);
if (htAutoStart) htAutoStart.addEventListener('input', saveHypeTrainConfig);
if (htFinalAnimation) htFinalAnimation.addEventListener('change', saveHypeTrainConfig);
if (htFont) htFont.addEventListener('change', saveHypeTrainConfig);
if (htBackground) htBackground.addEventListener('change', () => { if (htBackground.value === 'image' && !loadingTheme) htCustomBgFile.click(); saveHypeTrainConfig(); });
if (htCustomBgFile) {
    htCustomBgFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 3.5 * 1024 * 1024) { showToast('Image too large! Please use a file under 3.5MB.', 5000); return; }
            const reader = new FileReader();
            reader.onload = (event) => { htCustomBgData = event.target.result; updateHTLivePreview(); saveHypeTrainConfig(); showToast('Custom background image applied!'); e.target.value = ''; };
            reader.readAsDataURL(file);
        }
    });
}
if (htPrimaryColor) htPrimaryColor.addEventListener('input', saveHypeTrainConfig);
if (htSecondaryColor) htSecondaryColor.addEventListener('input', saveHypeTrainConfig);
if (htBarColor) htBarColor.addEventListener('input', saveHypeTrainConfig);
if (htIcon) htIcon.addEventListener('change', saveHypeTrainConfig);
if (htBarStyle) htBarStyle.addEventListener('change', saveHypeTrainConfig);

async function loadThemeConfig(themeId) {
    if (loadingTheme) return;
    htCustomBgData = '';
    loadingTheme = true;
    try {
        const isBuiltIn = themePresets[themeId];
        let config = isBuiltIn ? { ...isBuiltIn } : null;
        if (isBuiltIn) activeCustomThemeName = null;
        currentThemeAssets = { bgImage: '', iconImage: '', barFrame: '' };
        if (isBuiltIn) {
            const host = 'http://127.0.0.1:3745';
            const resolve = (p) => { if (!p) return ''; if (p.startsWith('http') || p.startsWith('data:')) return p; return p.startsWith('/') ? host + p : host + '/' + p; };
            currentThemeAssets.bgImage = resolve(isBuiltIn.bgImage);
            currentThemeAssets.iconImage = resolve(isBuiltIn.iconImage);
            currentThemeAssets.barFrame = resolve(isBuiltIn.barFrame);
        }
        try {
            const themeJsonUrl = `http://127.0.0.1:3745/assets/hypetrain/themes/${themeId}/${themeId}.json`;
            const res = await fetch(themeJsonUrl);
            if (res.ok) {
                const data = await res.json();
                const host = 'http://127.0.0.1:3745';
                const prefix = `${host}/assets/hypetrain/themes/${themeId}/`;
                const mappedData = {
                    font: data.font?.family, primaryColor: data.colors?.primary, secondaryColor: data.colors?.secondary, barColor: data.colors?.progressBar,
                    animStart: data.animations?.trainStart, animLevelUp: data.animations?.levelUp, animDanger: data.animations?.danger, animEnd: data.animations?.trainEnd,
                    background: (() => { const t = data.background?.type; if (t==='preset') return 'preset'; if (t==='solid') return 'solid'; if (t==='gradient') return 'gradient'; if (t==='transparent') return 'transparent'; return data.background?.image ? 'preset' : 'transparent'; })(),
                    bgImage: data.background?.image || '', icon: data.icons?.train === 'none' ? 'none' : data.icons?.train ? 'image' : 'default',
                    iconImage: data.icons?.train || '', barStyle: data.progressBar?.fillStyle || (data.progressBar?.frame ? 'glow' : 'solid'), barFrame: data.progressBar?.frame || ''
                };
                if (mappedData.bgImage) currentThemeAssets.bgImage = prefix + mappedData.bgImage;
                if (mappedData.iconImage) currentThemeAssets.iconImage = prefix + mappedData.iconImage;
                if (mappedData.barFrame) currentThemeAssets.barFrame = prefix + mappedData.barFrame;
                config = { ...(config || {}), ...mappedData };
                if (!isBuiltIn) activeCustomThemeName = themeId;
            } else { if (!isBuiltIn) activeCustomThemeName = null; }
        } catch (e) { console.warn(`[Triggers] Dynamic theme load failed for "${themeId}"`, e); }
        if (config) {
            if (htFont) htFont.value = config.font || 'Inter';
            if (htBackground) { if (isBuiltIn && currentThemeAssets.bgImage) htBackground.value = 'preset'; else htBackground.value = config.background || 'transparent'; }
            if (htPrimaryColor) htPrimaryColor.value = config.primaryColor || '#00e5ff';
            if (htSecondaryColor) htSecondaryColor.value = config.secondaryColor || '#bb86fc';
            if (htBarColor) htBarColor.value = config.barColor || '#00e5ff';
            if (htIcon) htIcon.value = config.icon || 'default';
            if (htBarStyle) htBarStyle.value = config.barStyle || 'solid';
            if (htAnimStart) htAnimStart.value = config.animStart || '';
            if (htAnimLevelUp) htAnimLevelUp.value = config.animLevelUp || '';
            if (htAnimDanger) htAnimDanger.value = config.animDanger || '';
            if (htAnimEnd) htAnimEnd.value = config.animEnd || '';
            loadingTheme = false;
            updateHTLivePreview();
            saveHypeTrainConfig();
        }
    } catch (err) { console.error('Error in loadThemeConfig:', err); }
    finally { loadingTheme = false; }
}

const htPresetLoadBtn = document.getElementById('htPresetLoadBtn');
if (htPresetLoadBtn) htPresetLoadBtn.onclick = () => {
    const presetId = htTheme.value;
    if (!presetId) return;
    const label = htTheme.options[htTheme.selectedIndex]?.text || presetId;
    showConfirm(`Load "${label}"?\nThis will overwrite your current visual settings.`, async () => { if (themePresets[presetId]) activeCustomThemeName = null; await loadThemeConfig(presetId); updateSaveThemeUI(); });
};

if (htAnimStart) htAnimStart.addEventListener('change', saveHypeTrainConfig);
if (htAnimLevelUp) htAnimLevelUp.addEventListener('change', saveHypeTrainConfig);
if (htAnimDanger) htAnimDanger.addEventListener('change', saveHypeTrainConfig);
if (htAnimEnd) htAnimEnd.addEventListener('change', saveHypeTrainConfig);
if (htPosition) htPosition.addEventListener('change', saveHypeTrainConfig);
if (htScale) htScale.addEventListener('input', () => { if (htScaleVal) htScaleVal.innerText = htScale.value; saveHypeTrainConfig(); });
if (htEnabled) htEnabled.addEventListener('change', () => { saveHypeTrainConfig(); updateHtEnabledState(); });

function updateHtEnabledState() {
    const enabled = htEnabled ? htEnabled.checked : false;
    const textEl = document.getElementById('htEnabledText');
    if (textEl) textEl.textContent = enabled ? 'Enabled' : 'Disabled';
}

const saveHTThemeBtn = document.getElementById('saveHTThemeBtn');
const importHTThemeBtn = document.getElementById('importHTThemeBtn');
const resetHTVisualsBtn = document.getElementById('resetHTVisualsBtn');
const htNewThemeName = document.getElementById('htNewThemeName');

if (saveHTThemeBtn) saveHTThemeBtn.onclick = async () => {
    let name, safeName;
    if (activeCustomThemeName) { safeName = activeCustomThemeName; name = safeName; }
    else {
        name = htNewThemeName.value.trim();
        if (!name) { showToast('Enter a theme name'); return; }
        safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        try { const check = await fetch(`http://127.0.0.1:3745/assets/hypetrain/themes/${safeName}/${safeName}.json`); if (check.ok) { const proceed = await new Promise(resolve => showConfirm(`Theme "${safeName}" already exists. Overwrite?`, () => resolve(true), () => resolve(false))); if (!proceed) return; } } catch (e) {}
    }
    const prefix = `hypetrain/themes/${safeName}/`;
    const themeJson = { name, font: { family: htFont.value, weight: 'bold' }, colors: { primary: htPrimaryColor.value, secondary: htSecondaryColor.value, progressBar: htBarColor.value, danger: '#FF0033' }, background: { type: htBackground.value, image: (htBackground.value === 'image' || htBackground.value === 'preset') ? 'background.png' : '', solidColor: htBackground.value === 'solid' ? htPrimaryColor.value : '', opacity: 0.9 }, progressBar: { frame: '', fillStyle: htBarStyle.value, glow: htBarStyle.value === 'glow' }, icons: { train: htIcon.value === 'none' ? 'none' : htIcon.value === 'image' ? 'trainIcon.png' : '' }, animations: { trainStart: htAnimStart.value, levelUp: htAnimLevelUp.value, danger: htAnimDanger.value, trainEnd: htAnimEnd.value } };
    try {
        showToast('Saving theme to server...', 2000);
        await uploadToRelay(`${prefix}${safeName}.json`, new Blob([JSON.stringify(themeJson, null, 2)], { type: 'application/json' }));
        if (htBackground.value === 'image' || htBackground.value === 'preset') { const bgUrl = htCustomBgData || currentThemeAssets.bgImage; if (bgUrl) await copyAssetToTheme(bgUrl, `${prefix}background.png`); }
        if (htBarStyle.value === 'image' && currentThemeAssets.barFrame) await copyAssetToTheme(currentThemeAssets.barFrame, `${prefix}progressBar.png`);
        if (htIcon.value === 'image' && currentThemeAssets.iconImage) await copyAssetToTheme(currentThemeAssets.iconImage, `${prefix}trainIcon.png`);
        activeCustomThemeName = safeName;
        if (htBackground.value === 'image' || htBackground.value === 'preset') currentThemeAssets.bgImage = `http://127.0.0.1:3745/assets/hypetrain/themes/${safeName}/background.png`;
        if (htBarStyle.value === 'image' && currentThemeAssets.barFrame) currentThemeAssets.barFrame = `http://127.0.0.1:3745/assets/hypetrain/themes/${safeName}/progressBar.png`;
        if (htIcon.value === 'image' && currentThemeAssets.iconImage) currentThemeAssets.iconImage = `http://127.0.0.1:3745/assets/hypetrain/themes/${safeName}/trainIcon.png`;
        showToast(`Theme "${name}" saved!`);
        htNewThemeName.value = '';
        await loadAssets();
        htTheme.value = safeName;
        saveHypeTrainConfig(); updateHTLivePreview(); renderMyThemesPanel(); updateSaveThemeUI();
    } catch (err) { console.error('[Triggers] Theme save failed:', err); showToast('❌ Failed to save theme to server.'); }
};

async function uploadToRelay(fileName, blob) {
    const res = await fetch('http://127.0.0.1:3745/upload', { method: 'POST', headers: { 'X-File-Name': fileName }, body: blob });
    if (!res.ok) throw new Error('Upload failed');
    return await res.json();
}

async function copyAssetToTheme(sourceUrl, destPath) {
    try {
        let blob;
        if (sourceUrl.startsWith('data:')) {
            const [header, b64] = sourceUrl.split(',');
            const mime = header.match(/:(.*?);/)[1];
            const binary = atob(b64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            blob = new Blob([bytes], { type: mime });
        } else { const res = await fetch(sourceUrl); blob = await res.blob(); }
        await uploadToRelay(destPath, blob);
    } catch (e) { console.warn(`[Triggers] Failed to copy asset ${sourceUrl} to ${destPath}`, e); }
}

if (resetHTVisualsBtn) resetHTVisualsBtn.onclick = () => {
    showConfirm('Reset visual settings to defaults?', () => {
        applyHypeTrainConfigUI({ font:'Inter', background:'transparent', primaryColor:'#00e5ff', barColor:'#00e5ff', icon:'default', barStyle:'solid', animStart:'', animLevelUp:'', animDanger:'', animEnd:'', position:'bottom_right', scale:100, theme: htTheme.value });
        saveHypeTrainConfig(); showToast('Visuals reset');
    });
};

async function renderMyThemesPanel() {
    const container = document.getElementById('myThemesList');
    if (!container) return;
    let remoteThemes = [];
    try { const res = await fetch('http://127.0.0.1:3745/assets'); const data = await res.json(); if (data.ok) { const builtInIds = Object.keys(themePresets); remoteThemes = (data.themes || []).filter(t => !builtInIds.includes(t)); } } catch (e) {}
    container.innerHTML = '';
    if (remoteThemes.length === 0) { container.innerHTML = '<div style="color:#666;font-size:11px;text-align:center;padding:12px 0;">No custom themes saved yet</div>'; return; }
    remoteThemes.forEach(name => {
        const row = document.createElement('div');
        row.className = 'my-theme-row' + (name === activeCustomThemeName ? ' active' : '');
        row.innerHTML = `<span class="my-theme-name" title="${name}">${name}</span><div class="my-theme-actions"><button class="my-theme-btn load" title="Load theme">Load</button><button class="my-theme-btn export" title="Export as ZIP">Export</button><button class="my-theme-btn del" title="Delete theme">Del</button></div>`;
        row.querySelector('.load').onclick = async () => { htTheme.value = name; await loadThemeConfig(name); renderMyThemesPanel(); updateSaveThemeUI(); };
        row.querySelector('.export').onclick = () => { const a = document.createElement('a'); a.href = `http://127.0.0.1:3745/theme-export/${name}`; a.download = `${name}.zip`; a.click(); };
        row.querySelector('.del').onclick = () => { showConfirm(`Delete theme "${name}"? This cannot be undone.`, async () => { try { const res = await fetch(`http://127.0.0.1:3745/theme/${name}`, { method: 'DELETE' }); if ((await res.json()).ok) { if (activeCustomThemeName === name) { activeCustomThemeName = null; updateSaveThemeUI(); } showToast(`Theme "${name}" deleted.`); await loadAssets(); } } catch (e) { showToast('❌ Delete failed'); } }); };
        container.appendChild(row);
    });
}

function updateSaveThemeUI() {
    const saveBtn = document.getElementById('saveHTThemeBtn');
    const nameInput = document.getElementById('htNewThemeName');
    const saveLabel = document.getElementById('saveThemeLabel');
    if (!saveBtn || !nameInput) return;
    if (activeCustomThemeName) { saveBtn.textContent = '💾 Update'; saveBtn.title = `Overwrite "${activeCustomThemeName}"`; nameInput.style.display = 'none'; if (saveLabel) saveLabel.textContent = `Theme: ${activeCustomThemeName}`; }
    else { saveBtn.textContent = '💾 Save New'; saveBtn.title = 'Save current settings as a new theme'; nameInput.style.display = ''; if (saveLabel) saveLabel.textContent = 'Save Theme'; }
}

if (importHTThemeBtn) importHTThemeBtn.onclick = () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.zip';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        showToast('Importing theme...', 2000);
        try {
            const res = await fetch('http://127.0.0.1:3745/theme-import', { method: 'POST', body: file });
            const data = await res.json();
            if (data.ok) { showToast(`✅ Imported: ${data.themes.join(', ')}`); await loadAssets(); renderMyThemesPanel(); }
            else showToast('❌ Import failed: ' + data.error);
        } catch (err) { showToast('❌ Import error: ' + err.message); }
    };
    input.click();
};

function updateHTThemeDropdown() {}

if (startHTBtn) startHTBtn.addEventListener('click', () => {
    const config = { mode: htMode.value, levels: parseInt(htLevels.value)||5, baseGoal: parseInt(htBaseGoal.value)||5, difficulty: htDifficulty.value, singleGoal: parseInt(htSingleGoal.value)||50, duration: htDurationPreset.value === 'custom' ? (parseInt(htDuration.value)||30) : parseInt(htDurationPreset.value), autoStartThreshold: parseFloat(htAutoStart.value)||10.00, theme: htTheme ? htTheme.value : 'classic', font: htFont ? htFont.value : 'Inter', background: htBackground ? htBackground.value : 'default', primaryColor: htPrimaryColor ? htPrimaryColor.value : '#5b3fd1', secondaryColor: htSecondaryColor ? htSecondaryColor.value : '#bb86fc', barColor: htBarColor ? htBarColor.value : 'linear-gradient(90deg, #5b3fd1, #bb86fc)', icon: htIcon ? htIcon.value : 'default', barStyle: htBarStyle ? htBarStyle.value : 'glow', animStart: htAnimStart ? htAnimStart.value : '', animLevelUp: htAnimLevelUp ? htAnimLevelUp.value : '', animDanger: htAnimDanger ? htAnimDanger.value : '', animEnd: htAnimEnd ? htAnimEnd.value : '', finalAnimation: htFinalAnimation.value, position: htPosition.value, scale: parseInt(htScale.value)||100, bgCustomImage: htCustomBgData, bgImage: currentThemeAssets.bgImage, iconImage: currentThemeAssets.iconImage, barFrame: currentThemeAssets.barFrame };
    if (typeof chrome !== 'undefined' && chrome.runtime) { chrome.runtime.sendMessage({ type: 'EVENT', name: 'HYPE_TRAIN_START_REQUESTED', payload: { config } }); showToast('🚂 Manual Start Signal Sent!'); }
});

if (stopHTBtn) stopHTBtn.addEventListener('click', () => {
    if (typeof chrome !== 'undefined' && chrome.runtime) { chrome.runtime.sendMessage({ type: 'EVENT', name: 'HYPE_TRAIN_STOP_REQUESTED' }); showToast('⏹ Stop Signal Sent!'); }
});

window.addEventListener('dragenter', (e) => e.preventDefault(), false);
window.addEventListener('dragover', (e) => e.preventDefault(), false);
window.addEventListener('drop', (e) => e.preventDefault(), false);

document.addEventListener('DOMContentLoaded', () => {
    loadAssets();
    loadRules();
    initSecondaryTabs();
    initHTTabs();
    updateSaveThemeUI();
    document.querySelectorAll('.lang-flag').forEach(flag => {
        flag.addEventListener('click', () => {
            const lang = flag.dataset.lang;
            applyLanguage(lang);
            if (typeof chrome !== 'undefined' && chrome.storage) chrome.storage.local.set({ currentLang: lang });
        });
    });
    document.getElementById('openAnalyticsBtn').addEventListener('click', () => { window.location.href = 'analytics.html'; });
    document.getElementById('openDesignerBtn').addEventListener('click', () => { window.location.href = 'designer.html'; });
    document.getElementById('openAutoModBtn').addEventListener('click', () => { window.location.href = 'automod.html'; });
});
