/* ==========================================================================
   探索太阳系 · Explore the Solar System — behaviour
   TDLL6329 prototype. Comments name the theory each block implements.
     L1 = Lesson 1 multimodality      L2 = Lesson 2 MDA
     L3 = Lesson 3 Mayer's CTML
   Bilingual rule of thumb: every piece of generated HTML carries BOTH
   languages in span.lang-zh / span.lang-en, so switching language is only a
   class change on <body> — no re-render, no lost state.
   ========================================================================== */

/* ---------- 1. Content data ----------
   [L2-Conceptual] 八大行星按“分类属性”组织成数据：顺序、成分类型、
   关键特征 —— 概念模式（conceptual）而不是叙事模式的呈现。 */
const PLANETS = [
  {
    key: 'mercury', zh: '水星', en: 'Mercury', order: 1, module: 2, r: 7, period: 9,
    factZh: '离太阳最近，白天很热，晚上很冷。',
    factEn: 'Closest to the Sun. Scorching days, freezing nights.',
    kwZh: '离太阳最近 · 最小', kwEn: 'Closest · smallest'
  },
  {
    key: 'venus', zh: '金星', en: 'Venus', order: 2, module: 2, r: 9, period: 13,
    factZh: '最热的行星，厚厚的云把热包住了。',
    factEn: 'The hottest planet — thick clouds trap the heat.',
    kwZh: '最热的行星', kwEn: 'Hottest planet'
  },
  {
    key: 'earth', zh: '地球', en: 'Earth', order: 3, module: 2, r: 10, period: 18,
    factZh: '我们的家，有水、空气和生命。',
    factEn: 'Our home: water, air and life.',
    kwZh: '有水、有空气、有生命', kwEn: 'Water, air, life'
  },
  {
    key: 'mars', zh: '火星', en: 'Mars', order: 4, module: 2, r: 8, period: 24,
    factZh: '红色的行星，表面有很多沙和尘。',
    factEn: 'The red planet, covered in dust and sand.',
    kwZh: '红色、有沙尘', kwEn: 'Red and dusty'
  },
  {
    key: 'jupiter', zh: '木星', en: 'Jupiter', order: 5, module: 2, r: 16, period: 36,
    factZh: '最大的行星，有一个很大的红斑风暴。',
    factEn: 'The biggest planet, with a giant red storm.',
    kwZh: '最大 · 大红斑', kwEn: 'Biggest · red spot'
  },
  {
    key: 'saturn', zh: '土星', en: 'Saturn', order: 6, module: 2, r: 14, period: 46,
    factZh: '有又亮又漂亮的环，由冰块和石头组成。',
    factEn: 'Bright, beautiful rings of ice and rock.',
    kwZh: '漂亮的环', kwEn: 'Famous rings'
  },
  {
    key: 'uranus', zh: '天王星', en: 'Uranus', order: 7, module: 2, r: 11, period: 60,
    factZh: '淡蓝色，几乎是躺着自转的。',
    factEn: 'Pale blue, and it spins lying on its side.',
    kwZh: '躺着自转', kwEn: 'Spins on its side'
  },
  {
    key: 'neptune', zh: '海王星', en: 'Neptune', order: 8, module: 2, r: 11, period: 72,
    factZh: '深蓝色，风是太阳系里最快的。',
    factEn: 'Deep blue, with the fastest winds of all.',
    kwZh: '风最快 · 深蓝', kwEn: 'Fastest winds'
  }
];

const SUN = { key: 'sun', zh: '太阳', en: 'Sun', module: 2 };

/* [L3-Modality] + [L3-Redundancy] 旁白只讲屏幕上“没有”的那一半。
   规则：屏幕说“是什么”（名称、分类、数字），旁白说“为什么/还有呢”。
   改文案时不要回头把屏幕上的要点再念一遍 —— 那是冗余原则明令避免的。 */
const NARRATION = {
  home: {
    /* 首页向导的开场白：屏幕上只写「你好！我是地小球」这一句，
       完整邀请交给这段声音（冗余原则——旁白不是屏幕文字的逐字稿，两边各说一部分）。 */
    zh: '你好，我是地小球！我住在太阳旁边。今天我想带你认识八颗行星：你可以按顺序一颗一颗看，也可以直接点你最想认识的那一颗。每颗行星都有一张小卡片，点一下就知道它的事。',
    en: 'Hi, I’m Earthie! I live next to the Sun. Today I want to show you the eight planets: you can go through them one by one, or tap the one you are most curious about. Every planet has a little card — tap it and you will hear its story.'
  },
  m1: {
    zh: '这里只有太阳能自己发光。每颗行星跑一圈用的时间都不一样。',
    en: 'Nothing out here makes its own light — only the Sun. Every planet runs a different-length lap.'
  },
  m2: {
    zh: '太阳是离我们最近的恒星。第二近的那颗要远得多得多。',
    en: 'The Sun is the nearest star to us. The next one is much, much farther away.'
  },
  m3: {
    zh: '金星是全部行星里最热的——比离太阳更近的水星还热。',
    en: 'Venus is the hottest planet of all — hotter even than Mercury, which is closer to the Sun.'
  },
  m4: {
    zh: '木星和土星是太阳系里的大块头。木星最大，土星的环是很多冰块和石头转出来的。',
    en: 'Jupiter and Saturn are the giants. Jupiter is the biggest, and Saturn’s rings are made of countless pieces of ice and rock.'
  },
  m5: {
    zh: '天王星和海王星在最外面，非常冷。海王星是深蓝色，那里的风比地球上的台风快得多。',
    en: 'Uranus and Neptune live at the far edge and it is freezing there. Neptune is deep blue and its winds are much faster than any storm on Earth.'
  },
  't-star': { zh: '恒星会自己发光发热，太阳就是一颗恒星。', en: 'A star makes its own light and heat. The Sun is a star.' },
  't-planet': { zh: '行星自己不会发光，它绕着恒星转。地球是一颗行星。', en: 'A planet does not make its own light; it travels around a star. Earth is a planet.' },
  't-orbit': { zh: '行星绕太阳走的那条路叫轨道，走完一圈叫公转。', en: 'The path a planet takes around the Sun is its orbit. One lap is one revolution.' },
  't-moon': { zh: '绕着行星转的小天体叫卫星。月亮是地球的卫星。', en: 'A small body that travels around a planet is a moon. Our Moon belongs to Earth.' }
};

/* 预习卡片：[L3-Pre-training] 先教 4 个术语。 */
const TERMS = [
  { key: 'star', zh: '恒星', en: 'Star', py: 'héngxīng',
    defZh: '自己会发光发热的大火球，比如太阳。', defEn: 'A huge ball that makes its own light and heat — like the Sun.' },
  { key: 'planet', zh: '行星', en: 'Planet', py: 'xíngxīng',
    defZh: '自己不会发光，绕着恒星转的大球，比如地球。', defEn: 'A big ball that does not shine by itself and travels around a star — like Earth.' },
  { key: 'orbit', zh: '公转', en: 'Revolution / Orbit', py: 'gōngzhuàn',
    defZh: '行星绕着太阳走一圈，就叫公转一次。', defEn: 'When a planet goes all the way around the Sun, that is one revolution.' },
  { key: 'moon', zh: '卫星', en: 'Moon', py: 'wèixīng',
    defZh: '绕着行星转的小天体，比如地球的月亮。', defEn: 'A small body that travels around a planet — like our Moon around Earth.' }
];

/* 自我解释的可选理由：固定在儿童已有知识范围内 [L3-Boundary]。 */
const REASONS = [
  { zh: '地球上有水', en: 'Earth has water' },
  { zh: '地球上有空气', en: 'Earth has air' },
  { zh: '地球不太热也不太冷', en: 'Earth is not too hot or too cold' },
  { zh: '地球有阳光', en: 'Earth gets sunlight' },
  { zh: '地球离太阳很远', en: 'Earth is very far from the Sun' }
];

/* [L3-Generative] 小测：前 3 题偏记忆（retention），
   后 2 题偏分类与推理（transfer）。每题都配一句解释性反馈。 */
const QUIZ_MAIN = [
  {
    tag: { zh: '记忆', en: 'Remember' },
    q: { zh: '哪一颗行星离太阳最近？', en: 'Which planet is closest to the Sun?' },
    options: [{ zh: '水星', en: 'Mercury' }, { zh: '地球', en: 'Earth' }, { zh: '海王星', en: 'Neptune' }],
    correct: 0,
    explain: { zh: '水星离太阳最近，所以它最热的时候也最热、最冷的时候最冷。', en: 'Mercury is closest to the Sun, so its days are the most scorching and its nights the most freezing.' }
  },
  {
    tag: { zh: '记忆', en: 'Remember' },
    q: { zh: '我们住在哪一颗行星上？', en: 'Which planet do we live on?' },
    options: [{ zh: '火星', en: 'Mars' }, { zh: '地球', en: 'Earth' }, { zh: '金星', en: 'Venus' }],
    correct: 1,
    explain: { zh: '地球是我们的家，它有水、空气和生命。', en: 'Earth is our home — it has water, air and living things.' }
  },
  {
    tag: { zh: '记忆', en: 'Remember' },
    q: { zh: '哪一颗行星有又亮又漂亮的环？', en: 'Which planet has bright, beautiful rings?' },
    options: [{ zh: '土星', en: 'Saturn' }, { zh: '金星', en: 'Venus' }, { zh: '水星', en: 'Mercury' }],
    correct: 0,
    explain: { zh: '土星的环由很多冰块和石头组成。', en: 'Saturn’s rings are made of countless chunks of ice and rock.' }
  },
  {
    tag: { zh: '分类', en: 'Sort it' },
    q: { zh: '下面哪一组全是“岩石行星”？', en: 'Which group is made up only of rocky planets?' },
    options: [
      { zh: '木星、土星', en: 'Jupiter, Saturn' },
      { zh: '水星、金星、地球、火星', en: 'Mercury, Venus, Earth, Mars' },
      { zh: '天王星、海王星', en: 'Uranus, Neptune' }
    ],
    correct: 1,
    explain: { zh: '水星、金星、地球、火星离太阳近、由石头组成，叫岩石行星；外面四颗是巨行星。', en: 'Mercury, Venus, Earth and Mars are close to the Sun and made of rock — the rocky planets. The four outside are giants.' }
  },
  {
    tag: { zh: '推理', en: 'Reason it out' },
    q: { zh: '为什么天王星和海王星那么冷？', en: 'Why are Uranus and Neptune so cold?' },
    options: [
      { zh: '因为它们离太阳很远', en: 'Because they are very far from the Sun' },
      { zh: '因为它们比地球小', en: 'Because they are smaller than Earth' },
      { zh: '因为它们有很多卫星', en: 'Because they have many moons' }
    ],
    correct: 0,
    explain: { zh: '离太阳越远，得到的光和热越少，所以越冷。', en: 'The farther from the Sun, the less light and heat they receive — so the colder they are.' }
  }
];

const QUIZ_PRETRAIN = [
  {
    tag: { zh: '预习', en: 'Pre-training' },
    q: { zh: '太阳是什么？', en: 'What is the Sun?' },
    options: [{ zh: '一颗恒星', en: 'A star' }, { zh: '一颗行星', en: 'A planet' }],
    correct: 0,
    explain: { zh: '太阳自己会发光发热，所以它是恒星。', en: 'The Sun makes its own light and heat, so it is a star.' }
  },
  {
    tag: { zh: '预习', en: 'Pre-training' },
    q: { zh: '月亮绕着地球转，那月亮是……？', en: 'The Moon travels around Earth, so the Moon is…?' },
    options: [{ zh: '地球的卫星', en: 'A moon of Earth' }, { zh: '一颗恒星', en: 'A star' }],
    correct: 0,
    explain: { zh: '绕着行星转的小天体叫卫星，月亮就是地球的卫星。', en: 'A small body going around a planet is a moon — the Moon belongs to Earth.' }
  }
];

/* [L3-Generative] 总结页自评清单：让“我学会了”变成可勾选、可自我监控的动作。 */
const CHECKLIST = [
  { zh: '我能按顺序说出 8 颗行星（水金地火木土天海）。', en: 'I can name the 8 planets in order.' },
  { zh: '我能说出“公转”和“卫星”是什么意思。', en: 'I can explain “revolution” and “moon”.' },
  { zh: '我能说出 3 个“地球适合生命”的理由。', en: 'I can give 3 reasons why Earth is good for life.' },
  { zh: '我能把行星分成岩石行星和巨行星。', en: 'I can sort planets into rocky and giant.' }
];

/* 分段学习的模块清单：模块选择条和“学习路径”里的 2/2 共用这一份。
   （原来有 5 个模块，用户要求把“太阳 + 八大行星”合成一段之后只剩两段。） */
const MODULES = [
  { zh: '太阳系简介', en: 'Solar System' },
  { zh: '太阳与八大行星', en: 'Sun & planets' }
];

/* [L3-Progress] 学习路径的 5 站：key 与页面上的 view 同名，total = 做完这一站要凑满几格。
   每一格都对应页面上真实发生过的动作，不是计时器：
     home     离开首页、进入过别的环节
     pretrain 两道预习小题都答对
     learn    2 个模块都看过
     practice 拖拽 8/8 ＋ 写过（或看过）参考想法 ＋ 小测 5/5
     summary  自评清单 4 项全勾
   环节名与状态词的文案都在 index.html 里（页面关掉 JS 也读得到），
   这里只管顺序和进度，所以名字不重复写第二遍。 */
const STATIONS = [
  { key: 'home',         total: 1 },
  { key: 'pretrain',     total: QUIZ_PRETRAIN.length },
  { key: 'learn',        total: MODULES.length },
  { key: 'practice',     total: 3 },
  { key: 'summary',      total: CHECKLIST.length }
];

/* ---------- 2. Tiny helpers ---------- */
/* 生成双语行内片段：语言切换只靠 CSS，不丢失页面状态。 */
function L(zh, en) {
  return '<span class="lang-zh">' + zh + '</span><span class="lang-en">' + en + '</span>';
}
/* 无障碍名称用当前语言单语呈现：屏幕阅读器不会把两种语言都念一遍。 */
function t(zh, en) { return state.lang === 'zh' ? zh : en; }
function setBiAria(el, zh, en) {
  if (!el) return;
  el.dataset.ariaZh = zh;
  el.dataset.ariaEn = en;
  el.setAttribute('aria-label', t(zh, en));
}
function refreshAriaLabels() {
  $$('[data-aria-zh]').forEach(el => el.setAttribute('aria-label', t(el.dataset.ariaZh, el.dataset.ariaEn)));
}
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

const state = {
  /* 默认英文。中文版本通过右上角按钮或地址栏 ?lang=zh 进入。 */
  lang: 'en',
  sound: true,
  theory: false,
  view: 'home',
  module: 1,
  viewed: {},          // 已浏览的模块（进度条）
  /* 学习路径：5 站各完成了几个小格。只增不减 —— 中途重做小测、
     重摆轨道、切换语言，都不会把已经拿到的小格抹掉。 */
  progress: { home: 0, pretrain: 0, learn: 0, practice: 0, summary: 0 },
  visitedOther: false, // 是否离开过首页（首页这一站的完成标准）
  thinkDone: false,    // 练习②：写过或看过参考想法
  checked: {},         // 总结页自评清单的勾选（切语言重画清单时用来恢复）
  placed: {},          // 拖拽游戏：slotIndex -> planetKey
  used: {},            // 拖拽游戏：已放好的行星
  selectedChip: null,
  hintStep: 0,
  quizAnswered: {},
  quizCorrect: {}
};

/* ---------- 3-4. Artwork & orbit map
   All drawing helpers (icons, PALETTE, planetSVG, guideSVG, termIconSVG,
   orbitMapSVG) now live in art.js so the visual language can be tuned in one
   place. This file keeps the content data and the interaction logic.
   ------------------------------------------------------------------------- */
/* ---------- 5. Audio: narration + soft cues ----------
   [L3-Voice] 使用系统里最接近“人声”的自然语音；原型阶段用语音合成，
   正式课堂可用真人录音替换（见设计说明）。
   [L3-Coherence] 只有两种短音效：正确 / 再试一次，都是反馈信号，不是装饰。 */
let audioCtx = null;
function cue(kind) {
  if (!state.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = kind === 'ok' ? [660, 880] : kind === 'try' ? [320] : [520];
    notes.forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      const t0 = audioCtx.currentTime + i * 0.11;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.09, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.20);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(t0); osc.stop(t0 + 0.22);
    });
  } catch (e) { /* 音效失败不影响学习流程 */ }
}

let voiceCache = [];
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  voiceCache = window.speechSynthesis.getVoices() || [];
}
if ('speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice() {
  const want = state.lang === 'zh' ? ['Xiaoxiao', 'Xiaoyi', 'Huihui', 'Yaoyao', 'Tingting', 'Meijia', 'zh-CN', 'zh'] : ['Aria', 'Jenny', 'Samantha', 'Zira', 'Google US English', 'en-US', 'en'];
  for (let i = 0; i < want.length; i++) {
    const hit = voiceCache.find(v => (v.name || '').indexOf(want[i]) >= 0 || (v.lang || '').indexOf(want[i]) === 0);
    if (hit) return hit;
  }
  return null;
}

function stopSpeak() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (recordedAudio) { try { recordedAudio.pause(); recordedAudio.currentTime = 0; } catch (e) {} }
}

/* ---------- 真人录音优先（人声原则） ----------
   老师自己录好的音频放在 voice/ 里。有录音就播录音，没有（或播放失败）就退回浏览器语音合成。
   录音目前只有英文版：中文界面仍用合成音，等你录了中文版把它加进这张表即可。 */
const VOICE_FILES = { home: { en: 'voice/earthie-home.mp3' } };
let recordedAudio = null;

function speakWithTTS(item) {
  if (!('speechSynthesis' in window)) { flash(L('这个浏览器不支持语音朗读。', 'This browser has no speech support.')); return; }
  const u = new SpeechSynthesisUtterance(item[state.lang]);
  u.lang = state.lang === 'zh' ? 'zh-CN' : 'en-US';
  const v = pickVoice();
  if (v) u.voice = v;
  u.rate = 0.92;   // 放慢：8–10 岁听众的加工速度
  u.pitch = 1.06;
  window.speechSynthesis.speak(u);
}

function speak(id) {
  const item = NARRATION[id];
  if (!item) return;
  if (!state.sound) {
    flash(L('请先打开右上角的“声音”。', 'Please switch Sound on (top right) first.'));
    return;
  }
  stopSpeak();
  const rec = VOICE_FILES[id] && VOICE_FILES[id][state.lang];
  if (rec) {
    recordedAudio = new Audio(rec);
    recordedAudio.play().catch(function () { speakWithTTS(item); });   // 加载/播放失败 → 退回合成音
    return;
  }
  speakWithTTS(item);
}

/* 顶部/行内短暂提示（aria-live 会朗读出来） */
function flash(html, isOk) {
  const box = $('#live');
  box.innerHTML = html;
  if (isOk) cue('ok');
}

/* ---------- 6. Views & navigation ---------- */
/* 地址栏统一由 setHash 维护：语言参数 + 当前页/模块，两者都方便分享。
   （用 replaceState，不产生历史记录，也不会让浏览器跳动。） */
function setHash(h) {
  try {
    const q = state.lang === 'zh' ? '?lang=zh' : '';   // 默认英文，所以只标中文
    window.history.replaceState(null, '', window.location.pathname + q + '#' + h);
  } catch (e) {}
}

function showView(name) {
  stopSpeak();
  state.view = name;
  /* 首页这一站没有题目可做：离开首页、开始别的环节，就算走过它了。 */
  if (name !== 'home') state.visitedOther = true;
  $$('.view').forEach(v => { v.hidden = (v.id !== 'view-' + name); });
  $$('.nav-btn').forEach(function (b) {
    const on = b.dataset.view === name;
    b.classList.toggle('is-active', on);
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  /* 常驻导航里标出当前位置；跳到别处后收起“跳到”菜单 */
  $$('.jump-item').forEach(function (b) {
    const view = b.dataset.goto, mod = b.dataset.jumpModule;
    const current = (view === name) || (view === 'learn' && name === 'learn' && Number(mod) === state.module);
    b.classList.toggle('is-current', !!current);
  });
  const jumpMenu = $('#jump-menu');
  if (jumpMenu && !jumpMenu.hidden) {
    jumpMenu.hidden = true;
    const jb = $('#btn-jump');
    if (jb) jb.setAttribute('aria-expanded', 'false');
  }
  /* 学习区显示浮动的「上一段 / 下一段」，其他区收起 */
  const dock = $('#module-dock');
  if (dock) dock.hidden = (name !== 'learn');
  if (name === 'learn') showModule(state.module);
  /* 学习路径条：当前位置 + 每一站的完成状态一起刷新 */
  renderJourney();
  /* 地址栏记录当前位置：方便老师把某个模块直接发给学生（深链接/可分享）。 */
  setHash(name);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showModule(n) {
  state.module = n;
  state.viewed[n] = true;
  $$('.module').forEach(m => { m.hidden = (Number(m.dataset.module) !== n); });
  $$('.mod-chip').forEach(c => {
    const num = Number(c.dataset.module);
    c.classList.toggle('is-active', num === n);
    c.classList.toggle('is-done', !!state.viewed[num]);
  });
  const done = Object.keys(state.viewed).filter(k => state.viewed[k]).length;
  $('#progress-bar').style.width = Math.round(done / 2 * 100) + '%';
  const dockNow = $('#dock-now');
  if (dockNow) dockNow.textContent = String(n);
  const dockPrev = $('.module-dock .dock-btn[data-module-prev]');
  if (dockPrev) dockPrev.disabled = (n === 1);
  if (state.view === 'learn') setHash('learn-' + n);
  renderJourney();
  stopSpeak();
}

/* 练习区三个活动的切换（也支持 #practice-quiz 之类的深链接）。 */
function showTab(name) {
  $$('.tab').forEach(tab => {
    const on = tab.dataset.tab === name;
    tab.classList.toggle('is-active', on);
    tab.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  $$('.tab-panel').forEach(p => { p.hidden = (p.dataset.tabPanel !== name); });
  if (state.view === 'practice') setHash('practice-' + name);
  stopSpeak();
}

/* ---------- 6b. 学习路径：每一站现在是什么状态 ----------
   [L3-Progress] 学习者随时看得到自己走到哪、还差什么。三句话就能说清每一站：
   已完成 / 正在学习 / 未开始；做了一半的会带上分数（继续 2/5）。
   顶部横排路径条与窄屏“跳到”菜单共用这一个判断，所以两处永远不会互相矛盾。 */

/* 把页面上真实发生过的动作翻译成“这一站完成了几格”。只增不减：
   重做小测、重摆轨道、切换语言，都不会把已经拿到的小格抹掉。 */
function syncStationProgress() {
  const p = state.progress;
  const bump = function (key, n) {
    if (n > (p[key] || 0)) p[key] = n;
  };
  const correctIn = function (id) {
    return Object.keys(state.quizCorrect).filter(function (k) { return k.indexOf(id) === 0; }).length;
  };
  const wrote = function () {
    const box = $('#think-input');
    return state.thinkDone || !!(box && box.value && box.value.trim());
  };
  const ticked = function () {
    return Object.keys(state.checked).filter(function (k) { return state.checked[k]; }).length;
  };

  bump('home', state.visitedOther ? 1 : 0);
  bump('pretrain', correctIn('pretrain-quiz'));
  bump('learn', Object.keys(state.viewed).filter(function (k) { return state.viewed[k]; }).length);
  bump('practice', (Object.keys(state.placed).length >= PLANETS.length ? 1 : 0) +
                   (wrote() ? 1 : 0) +
                   (correctIn('main-quiz') >= QUIZ_MAIN.length ? 1 : 0));
  bump('summary', ticked());
}

/* 环节名直接从页面上读（index.html 里已经写了中英两份），不再重复一份文案 */
function stationLabel(key) {
  const el = $('.nav-btn[data-step="' + key + '"]');
  const zh = el ? $('.step-label .lang-zh', el) : null;
  const en = el ? $('.step-label .lang-en', el) : null;
  return { zh: zh ? zh.textContent : key, en: en ? en.textContent : key };
}

/* 第一次渲染只对齐状态，之后每完成一站才报一次喜（避免刚打开就道贺）。
   首页不算“完成了一站”，所以不报喜。 */
let journeyRendered = false;
const journeyCheers = {};
function celebrateStation(key, num) {
  const el = $('.nav-btn[data-step="' + key + '"]');
  if (el) {
    el.classList.add('is-just-done');
    setTimeout(function () { el.classList.remove('is-just-done'); }, 1600);
  }
  const n = stationLabel(key);
  flash(L('第 ' + num + ' 站「' + n.zh + '」完成！继续下一站吧。',
          'Stop ' + num + ' “' + n.en + '” complete — on to the next one!'), true);
}

function renderJourney() {
  syncStationProgress();
  STATIONS.forEach(function (st, i) {
    const total = st.total;
    const got = Math.min(total, state.progress[st.key] || 0);
    const done = got >= total;
    const here = state.view === st.key;
    const stateName = done ? 'done' : here ? 'current' : (got > 0 ? 'partial' : 'todo');
    const text = done ? L('已完成', 'Done')
      : here ? L('正在学习', 'Learning now')
      : got > 0 ? L('继续 ' + got + '/' + total, got + '/' + total + ' done')
      : L('未开始', 'Not yet');

    $$('[data-step="' + st.key + '"]').forEach(function (el) {
      el.dataset.state = stateName;
      const step = el.closest ? el.closest('.journey-step') : null;
      if (step) step.dataset.state = stateName;
      const box = $('.step-state', el);
      if (box) box.innerHTML = text;
    });

    if (done && journeyRendered && !journeyCheers[st.key] && st.key !== 'home') {
      journeyCheers[st.key] = true;
      celebrateStation(st.key, i + 1);
    }
  });
  journeyRendered = true;
}

/* 与“学习路径”有关的几处绑定：勾选清单、写字、以及第一次渲染。 */
function setupJourney() {
  const list = $('#summary-checklist');
  if (list) {
    list.addEventListener('change', function (ev) {
      const box = ev.target.closest ? ev.target.closest('input[type="checkbox"]') : null;
      if (!box) return;
      state.checked[box.id] = box.checked;
      renderJourney();
    });
  }
  /* 练习②：写下句子就算做到了（不必一定按保存） */
  const input = $('#think-input');
  if (input) input.addEventListener('input', renderJourney);
  renderJourney();
}

/* ---------- 7. Builders ---------- */
/* 地小球在不同板块的情绪：首页打招呼用普通形态，预习/学习好奇，练习开心，总结庆祝 */
var GUIDE_MOOD_BY_VIEW = { home: 'normal', pretrain: 'curious', learn: 'curious', practice: 'happy', summary: 'celebrate' };
function buildGuideFigures() {
  $$('.guide-figure').forEach(function (el) {
    const view = el.closest ? el.closest('.view') : null;
    const key = view ? view.id.replace('view-', '') : 'home';
    el.innerHTML = guideSVG(GUIDE_MOOD_BY_VIEW[key] || 'normal');
  });
}

/* 静态 HTML 里的插图占位（太阳、木星、土星、天王星、海王星）在这里被画出来。
   [尺寸] 分段学习里同一组行星按真实直径等比（solarArtPair），
   组的参考行星与可见直径写在 FIG_GROUP 里，改这里就能整体放大/缩小。
   data-size 只在没有 data-group 时作为兜底。 */
const FIG_GROUP = {
  sun: ['sun', 200],          /* 太阳单独一屏：以"太阳自己"为参考，200px 可见 → 画布约 333px */
  rocky: ['earth', 96],       /* 模块 3：水金地火 */
  giants: ['jupiter', 120],   /* 模块 4：木星土星 */
  far: ['uranus', 120]        /* 模块 5：天王星海王星 */
};
function buildPlanetFigures() {
  $$('.planet-figure[data-planet]').forEach(el => {
    const g = FIG_GROUP[el.dataset.group];
    const size = g ? solarArtPair(g[0], g[1])[el.dataset.planet] : Number(el.dataset.size || 120);
    el.innerHTML = planetSVG(el.dataset.planet, size || 120);
  });
}

/* 首页原来的“九颗星球直达按钮”（planetJumpMarkup）已删除：
   它与左边动画图里可点的行星是同一个入口，重复且占高度。 */
function buildModuleNav() {
  $('#module-nav').innerHTML = MODULES.map((n, i) =>
    '<button class="mod-chip" type="button" data-module="' + (i + 1) + '">' +
      '<span class="mod-num">' + (i + 1) + '</span>' + L(n.zh, n.en) +
    '</button>'
  ).join('');
}

function buildTermCards() {
  $('#term-grid').innerHTML = TERMS.map(t =>
    '<article class="term-card">' +
      termIconSVG(t.key) +
      '<h3 class="term-name">' + L(t.zh, t.en) + ' <small>' + t.py + '</small></h3>' +
      '<p class="term-def">' + L(t.defZh, t.defEn) + '</p>' +
      '<button class="btn btn-speak" type="button" data-narrate="t-' + t.key + '">' +
        '<span class="ico" aria-hidden="true" data-icon="speaker"></span>' + L('听一听', 'Listen') + '</button>' +
    '</article>'
  ).join('');
}

function buildInnerPlanetGrid() {
  /* 四页合并后，原来放"四颗内行星肖像卡"的容器已随模块 3 删除；
     这里做个保护，缺容器就直接跳过（内容已由横排图的资料卡承担）。 */
  const host = $('#inner-planet-grid');
  if (!host) return;
  const keys = ['mercury', 'venus', 'earth', 'mars'];
  /* 按真实直径等比（水星最小、金星与地球几乎一样大——这是事实，不再人为拉大差异）；
     地球的"重点"改用金色描边和角标表示，而不是把它的尺寸画错。 */
  const sizes = solarArtPair('earth', 96);
  host.innerHTML = keys.map(k => {
    const p = PLANETS.find(x => x.key === k);
    const size = sizes[k];
    return '<figure class="planet-card' + (k === 'earth' ? ' planet-card-big' : '') + '">' +
      '<div class="planet-figure">' + planetSVG(k, size, { face: true }) + '</div>' +
      '<figcaption>' +
        '<strong>' + L(p.zh, p.en) + '</strong>' +
        '<span class="kw">' + L(p.kwZh, p.kwEn) + '</span>' +
      '</figcaption>' +
    '</figure>';
  }).join('');
}

function buildSummary() {
  /* 勾选状态存在 state.checked 里：切换语言会把清单重画一次，
     从这里把勾恢复回来，学生不用重勾。 */
  $('#summary-checklist').innerHTML = CHECKLIST.map((c, i) =>
    '<li><input type="checkbox" id="chk-' + i + '"' + (state.checked['chk-' + i] ? ' checked' : '') + '>' +
    '<label for="chk-' + i + '">' + L(c.zh, c.en) + '</label></li>'
  ).join('');

  const cards = [{ key: 'sun', zh: '太阳', en: 'Sun', module: 2, order: 0, factZh: '一颗恒星，自己发光发热，在太阳系中央。', factEn: 'A star that makes its own light and heat, in the middle of the Solar System.' }].concat(PLANETS);
  /* [用户要求] 总结页改成"先回忆、再核对"：卡片上**不写星球的名字和说明**，
     只看图，想好了点一下回到知识页面（分段学习那段）对答案。
     名字只写进 aria-label 给读屏软件（纯图标按钮对读屏没法用），
     用 data-aria-* + refreshAriaLabels() 跟着语言切换走。 */
  $('#summary-grid').innerHTML = cards.map(p =>
    '<button class="summary-card" type="button" data-jump-module="' + p.module + '"' +
      ' data-aria-zh="' + (p.order ? '第 ' + p.order + ' 颗行星，点一下回到知识页面对答案' : '太阳，点一下回到知识页面对答案') + '"' +
      ' data-aria-en="' + (p.order ? 'Planet number ' + p.order + ' — tap to go back to the lesson and check' : 'The Sun — tap to go back to the lesson and check') + '">' +
      /* 大小按真实比例（走 solarBodyR 那套压缩模型，与首页动画/拖拽游戏一致）：
         木星 77px、水星 34px；planetArtBox 把"可见直径"换算成画布尺寸。 */
      planetSVG(p.key, planetArtBox(summaryArtDia(p.key))) +
      '<span class="summary-text">' +
        '<span class="order-num">' + (p.order ? (state.lang === 'zh' ? '第 ' + p.order + ' 颗' : 'no. ' + p.order) : (state.lang === 'zh' ? '中心' : 'centre')) + '</span>' +
      '</span>' +
    '</button>'
  ).join('');
  refreshAriaLabels();
}

/* ---------- 7b. The animated Solar System ----------
   [L1-Gesture/Behaviour] [L2-Narrative] The hero art is the site's only moving
   element and it carries the science: eight planets on elliptical orbits, the
   Sun at one focus, all travelling the same (prograde) direction, inner planets
   faster than outer ones. Clicking a planet opens a short card right next to it
   — [L3-Contiguity] the words appear where the learner is looking.
   Motion stops for prefers-reduced-motion and for the ⏸ control. */

/* 学习页资料卡里的"核心知识"：比首页的一句话更重要、更值得记住。
   每颗天体一条，用儿童能懂的说法给出最关键的事实。 */
/* 首页动画的资料卡只做"见面"：一句好玩的绰号 + 一个"去看它的事"按钮。
   核心知识（大小/距离/年份等）只留在分段学习页，避免两页重复。 */
const MEET = {
  sun: { zh: '太阳系的大火炉 —— 自己会发光发热。', en: 'The Solar System’s furnace — it makes its own light and heat.' },
  mercury: { zh: '跑得最快的邻居，离太阳最近。', en: 'The fastest neighbour, closest to the Sun.' },
  venus: { zh: '热得像烤箱的邻居。', en: 'The neighbour that is hot as an oven.' },
  earth: { zh: '我们的家，有水也有空气。', en: 'Our home — it has water and air.' },
  mars: { zh: '红色的邻居，土里含铁锈。', en: 'The red neighbour, with rusty soil.' },
  jupiter: { zh: '最大的大块头，有个大红斑。', en: 'The biggest one — with a Great Red Spot.' },
  saturn: { zh: '戴着漂亮环"帽子"的一位。', en: 'The one wearing rings like a hat.' },
  uranus: { zh: '躺着打滚的淡蓝色星球。', en: 'The pale blue one that rolls on its side.' },
  neptune: { zh: '最远的邻居，风最快。', en: 'The farthest neighbour, with the fastest winds.' }
};

const CORE = {
  sun: { zh: '太阳系里唯一的恒星，自己发光发热。地球收到的阳光只用 8 分钟就到了。', en: 'The only star in the Solar System — it makes its own light. Its light reaches Earth in just 8 minutes.' },
  mercury: { zh: '最小的行星，离太阳最近，跑得也最快：绕太阳一圈只要 88 天。', en: 'The smallest planet, closest to the Sun, and the fastest: one year lasts only 88 days.' },
  venus: { zh: '最热的行星（约 460℃）：厚厚的云把热包在里面；它还是反向自转的。', en: 'The hottest planet (about 460°C): thick clouds trap the heat. It also spins backwards.' },
  earth: { zh: '我们的家：有水、有空气、温度合适——八颗行星里唯一有生命的。', en: 'Our home: water, air and the right temperature — the only planet with life.' },
  mars: { zh: '红色的行星，土里含铁锈；它有两颗很小的卫星。', en: 'The red planet, rusty soil, and two tiny moons.' },
  jupiter: { zh: '最大的行星，能装下 1300 多个地球；大红斑是转了几百年的风暴。', en: 'The biggest planet — over 1,300 Earths would fit inside. The Great Red Spot is a storm centuries old.' },
  saturn: { zh: '环最漂亮，由无数冰块和石头组成；它比水还轻。', en: 'The best-known rings, made of countless chunks of ice and rock — and it is less dense than water.' },
  uranus: { zh: '几乎躺着自转（轴倾斜 98°），所以一个季节能长达 21 年。', en: 'It spins almost on its side (98° tilt), so one season can last 21 years.' },
  neptune: { zh: '最远、风最快（超过 2000 公里/小时）：一年要 165 个地球年。', en: 'The farthest, with the fastest winds (over 2,000 km/h): one year takes 165 Earth years.' }
};

/* one spoken sentence per planet: shorter than the card text, never identical
   to it — that keeps narration complementary rather than redundant [L3] */
const PLANET_SAY = {
  sun: { zh: '太阳是一颗恒星，它自己会发光发热。地球收到的阳光只要八分钟就到了。', en: 'The Sun is a star — it makes its own light and heat. Its light reaches Earth in eight minutes.' },
  mercury: { zh: '水星离太阳最近，跑得最快，一年只有 88 天。', en: 'Mercury is closest to the Sun and the fastest — its year is only 88 days.' },
  venus: { zh: '金星是最热的行星，它自转的方向和其他多数行星相反。', en: 'Venus is the hottest planet, and it spins the opposite way to most of the others.' },
  earth: { zh: '地球绕太阳一圈要 365 天，八颗行星里只有地球有生命。', en: 'Earth takes 365 days to go round the Sun, and it is the only planet with life.' },
  mars: { zh: '火星是红色的，绕太阳一圈大约 687 天。', en: 'Mars is the red planet, and its year is about 687 days.' },
  jupiter: { zh: '木星最大，公转很慢，一年差不多是地球的 12 年。', en: 'Jupiter is the biggest planet, and one of its years is nearly 12 Earth years.' },
  saturn: { zh: '土星戴着漂亮的环，一年差不多 29 年半。', en: 'Saturn wears the famous rings, and its year is about 29 and a half Earth years.' },
  uranus: { zh: '天王星几乎是躺着自转的，一年要 84 年。', en: 'Uranus spins almost on its side, and its year takes 84 Earth years.' },
  neptune: { zh: '海王星最远，风最快，一年要差不多 165 年。', en: 'Neptune is the farthest planet with the fastest winds — its year takes about 165 Earth years.' }
};

const SOLAR_T0 = SOLAR_DATA.map(function (p, i) { return 0.9 + i * 0.93; });
/* held：学生点开某颗行星的简介卡片时把公转动画按停，读完关掉卡片再继续。
   这样卡片里的数字不会一边读一边跟着行星跑，也不必和顶部的“暂停动画”按钮抢状态
   （两者是独立的：手动暂停只是暂停，关卡片不会把它解开）。 */
const solarSys = { hosts: [], t: 0, last: 0, raf: null, open: null, held: false };
/* make each planet's one-liner playable through the existing speak() pipeline */
Object.keys(PLANET_SAY).forEach(function (k) { NARRATION['say-' + k] = PLANET_SAY[k]; });

function solarYearText(p) {
  if (p.yearDays < 400) return t(p.yearDays.toFixed(0) + ' 天', p.yearDays.toFixed(0) + ' days');
  return t('约 ' + (p.yearDays / 365.25).toFixed(1) + ' 年', 'about ' + (p.yearDays / 365.25).toFixed(1) + ' years');
}
function solarDayText(p) {
  const hours = p.dayHours;
  const base = hours < 48 ? t(hours.toFixed(1) + ' 小时', hours.toFixed(1) + ' hours')
                          : t((hours / 24).toFixed(0) + ' 天', (hours / 24).toFixed(0) + ' days');
  let note = '';
  if (p.key === 'venus') note = t('（反向自转）', ' (spins backwards)');
  if (p.key === 'uranus') note = t('（躺着自转）', ' (tipped on its side)');
  return base + note;
}
/* [L3-Coherence 一致性 / L3-Redundancy 冗余] 卡片里原来排着 4 行原始数字
   （直径 km、AU、公转天数、自转小时），念出来像一串参数，对 8–10 岁孩子
   只是额外负担。现在只留一句"和地球比"的口语概括：数字还在，但变成能读的
   一句话，且只留最有对比感的两项（一圈多久、一天多久）。 */
function solarCompare(p) {
  if (p.key === 'earth') {
    return t('我们就在这儿：绕太阳一圈 365 天，自转一圈 23.9 小时。',
             'This is us: one lap around the Sun takes 365 days, one spin takes 23.9 hours.');
  }
  return t('和地球比：绕太阳一圈 ' + solarYearText(p) + '，自转一圈 ' + solarDayText(p) + '。',
           'Compared with Earth: a year takes ' + solarYearText(p) + ', a day takes ' + solarDayText(p) + '.');
}
function solarCardHTML(key, hostKind) {
  const facts = PLANETS.find(d => d.key === key);
  /* 首页的卡片保持"见面语"的轻量：数据只在学习页出现，避免两页讲同一件事
     [L3-Redundancy + 用户要求：home 页不重复分段学习的内容] */
  const compare = hostKind === 'lineup';

  /* 太阳不在 SOLAR_DATA（那是八颗行星的表），所以单独给一张卡片。
     数据同样来自 NASA 公开资料，也只留一句像样子的概括。 */
  if (key === 'sun') {
    return '<button class="pop-close" type="button" data-pop-close aria-label="' + t('关闭', 'Close') + '">' +
        '<span class="ico" aria-hidden="true" data-icon="close"></span></button>' +
      '<p class="pop-order">' + t('太阳系的中心 · 唯一的一颗恒星', 'Centre of the system · the only star') + '</p>' +
      '<h4 class="pop-name">' + L('太阳', 'Sun') + '</h4>' +
      '<p class="pop-core">' + L(CORE.sun.zh, CORE.sun.en) + '</p>' +
      (compare ? '<p class="pop-compare">' + t('和地球比：它大约有 109 个地球那么宽；它的光跑到地球要 8 分 20 秒。',
        'Compared with Earth: about 109 Earths wide — and its light takes 8 min 20 s to reach us.') + '</p>' : '') +
      '<div class="pop-actions">' +
        '<button class="btn btn-speak" type="button" data-say="sun">' +
          '<span class="ico" aria-hidden="true" data-icon="speaker"></span>' + t('听一句', 'Listen') + '</button>' +
        '<button class="btn btn-ghost" type="button" data-pop-more="sun">' + t('更多', 'More') + '</button>' +
      '</div>';
  }

  const p = SOLAR_DATA.find(d => d.key === key);
  if (!p) return '';
  const order = SOLAR_DATA.indexOf(p) + 1;
  return '<button class="pop-close" type="button" data-pop-close aria-label="' +
      t('关闭', 'Close') + '"><span class="ico" aria-hidden="true" data-icon="close"></span></button>' +
    '<p class="pop-order">' + t('第 ' + order + ' 颗 · 共 8 颗', 'planet ' + order + ' of 8') + '</p>' +
    '<h4 class="pop-name">' + L(p.zh, p.en) + '</h4>' +
    (hostKind === 'lineup'
      ? '<p class="pop-core">' + (CORE[key] ? L(CORE[key].zh, CORE[key].en) : '') + '</p>'
      : '<p class="pop-meet">' + (MEET[key] ? L(MEET[key].zh, MEET[key].en) : '') + '</p>') +
    '<p class="pop-fact">' + (facts ? L(facts.factZh, facts.factEn) : '') + '</p>' +
    (compare ? '<p class="pop-compare">' + solarCompare(p) + '</p>' : '') +
    '<div class="pop-more" hidden></div>' +
    '<div class="pop-actions">' +
      '<button class="btn btn-speak" type="button" data-say="' + key + '">' +
        '<span class="ico" aria-hidden="true" data-icon="speaker"></span>' + t('听一句', 'Listen') + '</button>' +
      (hostKind === 'lineup' ? '' :
        '<button class="btn btn-ghost" type="button" data-meet="' + key + '">' + t('去看它的事', 'Learn about it') + '</button>') +
      '<button class="btn btn-ghost" type="button" data-pop-more="' + key + '">' +
        t('更多', 'More') + '</button>' +
    '</div>';
}

function solarDraw(host, force) {
  /* 横排图（learn 页）是静止的：不跑公转，只让资料卡跟着被点的天体走。 */
  if (host.dataset.solar === 'lineup') {
    if (solarSys.open && solarSys.open.host === host) {
      const el = host.querySelector('.solar-body[data-planet="' + solarSys.open.key + '"]');
      const m = el && (el.getAttribute('transform') || '').match(/translate\(([-\d.]+) ([-\d.]+)\)/);
      const sc = host.clientWidth / 1360;
      if (m) solarPlacePop(host, parseFloat(m[1]) * sc, parseFloat(m[2]) * sc, parseFloat(el.dataset.r || 20) * sc);
    }
    return;
  }
  const scale = host.clientWidth / SOLAR_VIEW.w || 1;
  const sys = solarSys;
  SOLAR_DATA.forEach(function (p, i) {
    const el = host.querySelector('.solar-body[data-planet="' + p.key + '"]');
    if (!el) return;
    const period = solarPeriodSec(p.a);
    const ang = SOLAR_T0[i] + (sys.t / period) * Math.PI * 2;
    const pt = solarPoint(p, ang);
    el.setAttribute('transform', 'translate(' + pt.x.toFixed(2) + ' ' + pt.y.toFixed(2) + ')');
    /* trajectory: a short tail behind the planet, sampled so it always follows
       the drawn ellipse (no arc-flag guesswork) */
    const trail = el.querySelector('.solar-trail');
    if (trail) {
      const N = 9, span = 0.62, pts = [];
      for (let k = N; k >= 0; k--) {
        const q = solarPoint(p, ang - span * (k / N));
        pts.push((q.x - pt.x).toFixed(1) + ',' + (q.y - pt.y).toFixed(1));
      }
      trail.setAttribute('points', pts.join(' '));
    }
  });
  /* keep an open card glued to its planet */
  if (sys.open && sys.open.host === host) {
    const p = SOLAR_DATA.find(d => d.key === sys.open.key);
    const i = SOLAR_DATA.indexOf(p);
    const ang = SOLAR_T0[i] + (sys.t / solarPeriodSec(p.a)) * Math.PI * 2;
    const pt = solarPoint(p, ang);
    solarPlacePop(host, pt.x * scale, pt.y * scale, solarBodyR(p.diaKm) * scale);
  }
}

function solarPlacePop(host, px, py, pr) {
  const pop = host.querySelector('.planet-pop');
  if (!pop || pop.hidden) return;
  const lead = host.querySelector('.pop-leader');
  const svgEl = host.querySelector('svg');
  const hostRect = host.getBoundingClientRect();
  /* SVG 相对 host 顶部的偏移：横排图的卡片改到整行上方之后，host 顶部会先留出
     卡片那么高的一块空白，行星因此被推下来 —— 算坐标时要把它加回去。 */
  const svgOffY = svgEl ? (svgEl.getBoundingClientRect().top - hostRect.top) : 0;
  const W = host.clientWidth, H = host.clientHeight;
  const pw = pop.offsetWidth, ph = pop.offsetHeight;
  const isLineup = host.dataset.solar === 'lineup';
  const staticPop = getComputedStyle(pop).position === 'static';
  let left, top, atLineup = false;

  if (isLineup && !staticPop) {
    /* [用户要求] 横排全家福是一整行静止的星球，卡片就别挤在中间盖住邻居了：
       放在整行的上方（上方不够高就放下方），横向对准被点的那一颗。 */
    const pyHost = py + svgOffY;
    /* 卡片下缘的上限要用**整行的上沿**，而不是被点那一颗的上沿：
       太阳在内行星旁边是最高的一颗，用被点那颗算会让水星的卡片压到太阳身上。 */
    let rowTop = Infinity;
    Array.prototype.forEach.call(host.querySelectorAll('.solar-body svg'), function (s) {
      const b = s.getBoundingClientRect();
      const t = (b.top + b.bottom) / 2 - b.width * 0.3 - hostRect.top;   /* 可见球体占画布 60% */
      if (t < rowTop) rowTop = t;
    });
    if (!isFinite(rowTop)) rowTop = pyHost - pr;
    const gap = 18;                                  /* 卡片和行星之间留出的净空 */
    const above = (Math.min(pyHost - pr, rowTop) - gap) >= ph;
    atLineup = true;
    left = Math.max(6, Math.min(W - pw - 6, px - pw / 2));
    top = above ? Math.max(4, Math.min(pyHost - pr, rowTop) - gap - ph) : (pyHost + pr + gap);

    /* 细箭头：从卡片靠行星的那条边垂直指到那颗星球 */
    if (lead) {
      const ln = lead.querySelector('line'), dot = lead.querySelector('circle');
      const ax = Math.max(left + 18, Math.min(left + pw - 18, px));
      ln.setAttribute('x1', px); ln.setAttribute('y1', pyHost);
      ln.setAttribute('x2', ax); ln.setAttribute('y2', above ? top + ph : top);
      dot.setAttribute('cx', px); dot.setAttribute('cy', pyHost);
      lead.hidden = false;
    }
    pop.classList.remove('pop-left');
  } else {
    left = px + pr + 14;
    const flipped = left + pw > W - 6;
    if (flipped) left = px - pr - 14 - pw;
    pop.classList.toggle('pop-left', flipped);
    top = py - ph / 2 + svgOffY;
    left = Math.max(6, Math.min(W - pw - 6, left));
    top = Math.max(6, Math.min(H - ph - 6, top));
    if (lead) {
      const ln = lead.querySelector('line'), dot = lead.querySelector('circle');
      if (staticPop) {
        /* 窄容器里卡片回到文档流（排在动画下方），这时箭头没有意义 */
        lead.hidden = true;
      } else {
        const fromX = flipped ? left + pw : left;
        const fromY = top + Math.min(ph / 2, 46);
        ln.setAttribute('x1', px); ln.setAttribute('y1', py + svgOffY);
        ln.setAttribute('x2', fromX); ln.setAttribute('y2', fromY);
        dot.setAttribute('cx', px); dot.setAttribute('cy', py + svgOffY);
        lead.hidden = false;
      }
    }
  }
  pop.style.left = Math.round(left) + 'px';
  pop.style.top = Math.round(top) + 'px';
  return atLineup;
}

/* 横排图开卡片时，先在 host 顶部留出卡片那么高的一条空白，
   行星不会被卡片压住，卡片也能稳稳地待在整行上方 [用户要求]。
   卡片不是绝对定位（窄屏回到文档流）时不用留。 */
function solarReservePop(host) {
  const pop = host.querySelector('.planet-pop');
  if (!pop) return;
  if (host.dataset.solar !== 'lineup' || getComputedStyle(pop).position === 'static') {
    host.style.paddingTop = '';
    return;
  }
  host.style.paddingTop = (pop.offsetHeight + 22) + 'px';
}

function solarOpen(host, key) {
  const pop = host.querySelector('.planet-pop');
  if (!pop) return;
  pop.innerHTML = solarCardHTML(key, host.dataset.solar);
  pop.hidden = false;
  pop.setAttribute('aria-label', t('行星简介', 'Planet card'));
  solarReservePop(host);
  solarSys.open = { host: host, key: key };
  solarSys.held = true;          /* 点行星 → 动画暂停 */
  /* 太阳不在 SOLAR_DATA 里，这里要做空值保护（否则点太阳会抛异常） */
  const p = SOLAR_DATA.find(function (d) { return d.key === key; });
  if (p) {
    flash(L(p.zh + '：' + (p.yearDays < 400 ? p.yearDays.toFixed(0) + ' 天绕太阳一圈' : '约 ' + (p.yearDays / 365.25).toFixed(1) + ' 年绕太阳一圈'),
            p.en + ': ' + (p.yearDays < 400 ? p.yearDays.toFixed(0) + ' days' : 'about ' + (p.yearDays / 365.25).toFixed(1) + ' years') + ' for one orbit'));
  } else {
    flash(L('太阳：太阳系的中心，唯一自己发光发热的恒星。', 'The Sun: the centre of the Solar System, the only star that makes its own light.'));
  }
  solarDraw(host, true);
  /* 卡片待在整行上方，横排图这一段会临时变高：把「卡片 + 行星行」一起滚进视野，
     学生不用自己往下拽（[L3-分段原则] 一次只看一颗的事，顺手把这段送上来）。 */
  if (host.dataset.solar === 'lineup' && getComputedStyle(pop).position !== 'static') {
    const hr = host.getBoundingClientRect();
    if (hr.top < 8 || hr.bottom > window.innerHeight - 8) {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      host.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    }
  }
}

function solarClose() {
  solarSys.hosts.forEach(function (host) {
    const pop = host.querySelector('.planet-pop');
    if (pop) { pop.hidden = true; pop.innerHTML = ''; }
    const lead = host.querySelector('.pop-leader');
    if (lead) lead.hidden = true;
    host.style.paddingTop = '';   /* 关掉卡片 → 顶部预留的空白也收回去 */
  });
  solarSys.open = null;
  solarSys.held = false;         /* 关掉卡片 → 动画继续 */
}

function initSolarSystems() {
  solarSys.hosts = [];
  solarClose();
  $$('[data-solar]').forEach(function (host) {
    const kind = host.dataset.solar;
    const mode = kind === 'diagram' ? 'diagram' : 'hero';
    /* lineup：横排全家福（learn 页），不公转，但每颗天体都能点开资料卡 */
    host.innerHTML = (kind === 'lineup' ? solarLineupSVG() : solarSystemSVG(mode)) +
      '<svg class="pop-leader" hidden aria-hidden="true"><line/><circle r="3"/></svg>' +
      '<div class="planet-pop" role="dialog" hidden></div>';
    solarSys.hosts.push(host);
    if (mode === 'diagram' && host.dataset.solarBound !== '1') host.dataset.solarBound = '1';
  });
  solarDrawAll();
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!solarSys.raf) {
    solarSys.last = 0;
    solarSys.raf = requestAnimationFrame(function step(now) {
      const dt = solarSys.last ? Math.min(0.05, (now - solarSys.last) / 1000) : 0;
      solarSys.last = now;
      if (!document.body.classList.contains('motion-paused') && !solarSys.held) solarSys.t += dt;
      solarDrawAll();
      solarSys.raf = requestAnimationFrame(step);
    });
  }
}

function solarDrawAll() { solarSys.hosts.forEach(function (h) { solarDraw(h); }); }

/* one delegated handler for every solar system on the page */
function setupSolarInteraction() {
  document.addEventListener('click', function (ev) {
    const body = ev.target.closest && ev.target.closest('.solar-body');
    if (body) {
      const host = body.closest('[data-solar]');
      if (host) {
        if (solarSys.open && solarSys.open.host === host && solarSys.open.key === body.dataset.planet) solarClose();
        else solarOpen(host, body.dataset.planet);
      }
      return;
    }
    /* 资料卡里的“更多”：展开该天体的补充说明（分组 + 长一点的介绍） */
    const meet = ev.target.closest && ev.target.closest('[data-meet]');
    if (meet) {
      const lh = document.querySelector('[data-solar="lineup"]');
      showView('learn'); showModule(2);
      if (lh) solarOpen(lh, meet.dataset.meet);
      return;
    }
    const moreBtn = ev.target.closest && ev.target.closest('[data-pop-more]');
    if (moreBtn) {
      const pop = moreBtn.closest('.planet-pop');
      const box = pop && pop.querySelector('.pop-more');
      if (box) {
        if (box.hidden) {
          const key = moreBtn.dataset.popMore;
          const groups = { rocky: ['岩石行星', 'Rocky planet'], giant: ['巨行星', 'Giant planet'], ice: ['冰巨行星', 'Ice giant'], sun: ['恒星', 'Star'] };
          const g = key === 'sun' ? groups.sun : (['mercury','venus','earth','mars'].indexOf(key) >= 0 ? groups.rocky : (['jupiter','saturn'].indexOf(key) >= 0 ? groups.giant : groups.ice));
          const p = PLANETS.find(function (x) { return x.key === key; });
          const extra = p ? p.factZh : '太阳是太阳系里唯一的恒星，其它天体都绕着它转。';
          const extraEn = p ? p.factEn : 'The Sun is the only star in the Solar System; everything else revolves around it.';
          box.innerHTML = '<p>' + L('它属于：' + g[0], 'It belongs to: ' + g[1]) + '</p><p>' + L(extra, extraEn) + '</p>';
          box.hidden = false;
          moreBtn.textContent = t('收起', 'Less');
        } else { box.hidden = true; moreBtn.textContent = t('更多', 'More'); }
      }
      return;
    }
    const say = ev.target.closest && ev.target.closest('[data-say]');
    if (say) { speak('say-' + say.dataset.say); return; }
    const jump = ev.target.closest && ev.target.closest('[data-jump-planet]');
    if (jump) {
      const p = PLANETS.find(d => d.key === jump.dataset.jumpPlanet);
      solarClose();
      if (p) { showView('learn'); showModule(p.module); }
      return;
    }
    if (ev.target.closest && ev.target.closest('[data-pop-close]')) { solarClose(); return; }
    /* clicking anywhere else inside a solar host (e.g. empty space) closes the card */
    if (ev.target.closest && ev.target.closest('[data-solar]') && !ev.target.closest('.planet-pop')) solarClose();
  });
  document.addEventListener('keydown', function (ev) {
    const body = ev.target.closest && ev.target.closest('.solar-body');
    if (body && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      const host = body.closest('[data-solar]');
      if (host) solarOpen(host, body.dataset.planet);
      return;
    }
    if (ev.key === 'Escape') solarClose();
  });
  window.addEventListener('resize', solarDrawAll);
}

/* ---------- 8. Quiz ----------
   [L3-Feedback] 答对：绿色 + 一句解释；答错：不判定失败，只提示“再想想”，
   允许无限重试 —— 保持生成性加工的动力。 */
/* 每道题旁边都站着地小球：答对换庆祝形态，答错换困惑形态，并说一句话。 */
function setQuizBuddy(item, mood, zh, en) {
  const fig = $('.q-buddy-fig', item), line = $('.q-buddy-line', item);
  if (fig) fig.innerHTML = guideSVG(mood);
  if (line) line.innerHTML = L(zh, en);
}
function buildQuiz(containerId, items, scoreId, onScore) {
  const box = $('#' + containerId);
  box.innerHTML = items.map((q, qi) =>
    '<div class="q-item" data-q="' + qi + '">' +
      '<div class="q-buddy">' +
        '<div class="guide-figure q-buddy-fig">' + guideSVG('curious') + '</div>' +
        '<p class="q-buddy-line">' + L('慢慢来，我陪你一起想。', 'Take your time — I am here with you.') + '</p>' +
      '</div>' +
      '<p class="q-text"><span class="q-tag">' + L(q.tag.zh, q.tag.en) + '</span>' + L(q.q.zh, q.q.en) + '</p>' +
      '<div class="q-options">' +
        q.options.map((o, oi) =>
          '<button class="opt" type="button" data-q="' + qi + '" data-opt="' + oi + '">' + L(o.zh, o.en) + '</button>'
        ).join('') +
      '</div>' +
      '<p class="q-explain" hidden>' + L(q.explain.zh, q.explain.en) + '</p>' +
    '</div>'
  ).join('');

  box.onclick = function (ev) {
    const btn = ev.target.closest('.opt');
    if (!btn || btn.disabled) return;
    const qi = Number(btn.dataset.q), oi = Number(btn.dataset.opt);
    const item = box.querySelector('.q-item[data-q="' + qi + '"]');
    if (oi === items[qi].correct) {
      cue('ok');
      btn.classList.add('is-correct');
      $$('.opt', item).forEach(b => { b.disabled = true; });
      $('.q-explain', item).hidden = false;
      setQuizBuddy(item, 'celebrate', '正确！你真棒！', 'Correct! Well done!');
      if (!state.quizCorrect[containerId + qi]) {
        state.quizCorrect[containerId + qi] = true;
        if (onScore) onScore();
      }
    } else {
      cue('try');
      btn.classList.add('is-wrong');
      btn.disabled = true;
      setQuizBuddy(item, 'confused', '再想想！', 'Think again!');
      flash(L('再想想～你可以再选一次，不扣分。', 'Not quite — look again and try another one. No penalty.'));
    }
  };
}

function renderQuizzes() {
  state.quizCorrect = {};
  state.quizAnswered = {};
  /* 每答对一道，路径条上“预习卡片”这一站就往前走一格 */
  buildQuiz('pretrain-quiz', QUIZ_PRETRAIN, null, renderJourney);
  buildQuiz('main-quiz', QUIZ_MAIN, 'quiz-score', function () {
    const score = Object.keys(state.quizCorrect).filter(k => k.indexOf('main-quiz') === 0).length;
    $('#quiz-score').textContent = score;
    if (score === QUIZ_MAIN.length) {
      flash(L('5 题全对！你已经能记住并且会用这些知识了。', '5 out of 5! You can remember it and use it.'), true);
    }
    renderJourney();
  });
  $('#quiz-score').textContent = '0';
  $('#quiz-total').textContent = String(QUIZ_MAIN.length);
}

/* ---------- 9. Drag game ----------
   [L1-Embodiment] 抓—搬—放的身体动作，让抽象顺序变成手上经验。
   [L3-Boundary] 无限重试 + 三级提示（说法口诀 → 指出下一颗 → 高亮空位）。 */
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function buildDragGame() {
  state.placed = {}; state.used = {}; state.selectedChip = null; state.hintStep = 0;
  const track = $('#orbit-track');
  /* 虚线圆圈的大小＝该行星的显示直径（与首页动画同一套压缩比例），
     所以"圆圈大小"本身就在讲"谁大谁小"。放进正确位置后行星也正好填满圆圈。 */
  track.innerHTML =
    '<div class="sun-slot" style="width:' + solarGameDia('sun') + 'px;height:' + solarGameDia('sun') + 'px">' +
      L('太阳', 'Sun') + '</div>' +
    PLANETS.map(function (p) {
      const dia = solarGameDia(p.key);
      return '<div class="orbit-slot" data-slot="' + p.order + '" data-dia="' + dia + '" tabindex="0" role="button" style="width:' + dia + 'px;height:' + dia + 'px">' +
        '<span class="slot-index">' + p.order + '</span>' +
      '</div>';
    }).join('');

  /* 卡盘里的行星也按相对大小显示（木星的圆片明显比水星大），拖着走时能先看出来。
     卡盘用 0.75 的系数：既保持比例，又不至于让木星的药丸高得离谱。 */
  $('#chip-tray').innerHTML = shuffled(PLANETS).map(function (p) {
    const box = Math.max(28, Math.round(solarGameDia(p.key) * 0.75));
    return '<button class="planet-chip" type="button" data-key="' + p.key + '">' +
      planetSVG(p.key, box) + '<span>' + L(p.zh, p.en) + '</span></button>';
  }).join('');

  /* 无障碍名称：单语 + 说明“可以拖也可以点”。 */
  $$('#chip-tray .planet-chip').forEach(function (chip) {
    const p = planetByKey(chip.dataset.key);
    setBiAria(chip, '拖动或点选' + p.zh, 'Drag or select ' + p.en);
  });
  $$('#orbit-track .orbit-slot').forEach(function (slot) {
    const n = slot.dataset.slot;
    setBiAria(slot, '第 ' + n + ' 条轨道，从太阳数起', 'Orbit ' + n + ', counting out from the Sun');
  });

  $('#drag-count').textContent = '0';
  $('#drag-feedback').textContent = '';
  $('#drag-feedback').className = 'feedback';
  $('#drag-hint-text').innerHTML = '';
  buildDragBuddy();
}

function planetByKey(k) { return PLANETS.find(p => p.key === k); }

/* 拖拽区旁边也站着地小球：放对庆祝，放错困惑，和题目那边一样。 */
function buildDragBuddy() {
  const fb = $('#drag-feedback');
  if (!fb) return;
  let row = $('#drag-buddy');
  if (!row) {
    row = document.createElement('div');
    row.className = 'q-buddy drag-buddy';
    row.id = 'drag-buddy';
    fb.parentNode.insertBefore(row, fb);
  }
  row.innerHTML = '<div class="guide-figure q-buddy-fig">' + guideSVG('curious') + '</div>' +
    '<p class="q-buddy-line">' + L('把行星拖到轨道上，我来帮你看看对不对。', 'Drag a planet onto an orbit — I will tell you how you did.') + '</p>';
}

function setDragBuddy(mood, zh, en) {
  const row = $('#drag-buddy');
  if (!row) return;
  const fig = $('.q-buddy-fig', row), line = $('.q-buddy-line', row);
  if (fig) fig.innerHTML = guideSVG(mood);
  if (line) line.innerHTML = L(zh, en);
}

function placePlanet(key, slotIndex, chip) {
  const p = planetByKey(key);
  const slot = $('.orbit-slot[data-slot="' + slotIndex + '"]');
  if (!slot) return;

  if (state.placed[slotIndex]) {
    cue('try');
    /* 提示同时出现在屏幕上（可视反馈）和 aria-live（听觉反馈）。 */
    $('#drag-feedback').className = 'feedback try';
    $('#drag-feedback').innerHTML = L(
      '这条轨道已经有行星啦，换一条虚线圆圈试试。',
      'That orbit already has a planet — try another dotted circle.'
    );
    flash(L('这条轨道已经有行星啦。', 'That orbit already has a planet.'));
    return;
  }

  if (p.order === slotIndex) {
    /* 正确：[L3-Feedback] 立刻肯定，并给出一句“为什么”，把行为连回科学概念。 */
    cue('ok');
    state.placed[slotIndex] = key;
    state.used[key] = true;
    slot.classList.add('is-filled', 'is-correct');
    /* 放对后行星变成"正确位置对应的显示直径"，刚好落在虚线圆圈内、并居中。
       两处换算：① 画布 × 200/120（planetSVG 的球体只占画布 60%）；
                 ② 用内径（外径 − 2px 虚线边框），球体才不会压住虚线。 */
    const dia = solarGameDia(key);
    slot.style.width = dia + 'px';
    slot.style.height = dia + 'px';
    slot.innerHTML = '<span class="slot-index">' + slotIndex + '</span>' + planetSVG(key, planetArtBox(dia - 2)) +
      '<span class="slot-name">' + L(p.zh, p.en) + '</span>';
    if (chip) { chip.classList.add('is-placed'); chip.setAttribute('aria-pressed', 'true'); }
    const n = Object.keys(state.placed).length;
    $('#drag-count').textContent = String(n);
    renderJourney();          // 8/8 摆好 → 练习这一站的第一格拿到
    $('#drag-feedback').className = 'feedback ok';
    $('#drag-feedback').innerHTML = L(
      '对啦！' + p.zh + '是第 ' + p.order + ' 颗。' + p.factZh,
      'Yes! ' + p.en + ' is number ' + p.order + '. ' + p.factEn
    );
    setDragBuddy('celebrate', '正确！你真棒！', 'Correct! Well done!');
    if (n === PLANETS.length) {
      flash(L('8 颗全部放好了！水金地火木土天海 —— 你已经记住顺序了。', 'All 8 placed! You know the order now.'), true);
      $('#drag-feedback').innerHTML = L(
        '全部正确！你的口诀是：水金地火木土天海。要不要去“想一想”那里说说地球为什么适合生命？',
        'All correct! Your order is: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Now try the “Think and explain” activity.'
      );
      setDragBuddy('celebrate', '8 颗全对！你真棒！', 'All 8 correct! Well done!');
    }
  } else {
    /* 错误：温和提示 + 给出可以思考的线索，不显示“错误”大字。 */
    cue('try');
    slot.classList.add('is-wrong');
    setTimeout(() => slot.classList.remove('is-wrong'), 700);
    $('#drag-feedback').className = 'feedback try';
    $('#drag-feedback').innerHTML = L(
      '再想一想：第 ' + slotIndex + ' 条轨道还没有配对。提示：离太阳越近的行星，数字越小。',
      'Think again: orbit ' + slotIndex + ' is still empty. Hint: the closer to the Sun, the smaller the number.'
    );
    setDragBuddy('confused', '再想想！', 'Think again!');
  }
}

function setupDragGame() {
  const tray = $('#chip-tray');
  let ghost = null, dragKey = null;

  tray.addEventListener('pointerdown', function (ev) {
    const chip = ev.target.closest('.planet-chip');
    if (!chip || chip.classList.contains('is-placed')) return;
    dragKey = chip.dataset.key;
    chip.classList.add('is-dragging');
    ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    /* 拖动时就显示"到了应该的大小"——与最终结果完全一致（内径 + 200/120 画布） */
    ghost.innerHTML = planetSVG(dragKey, planetArtBox(solarGameDia(dragKey) - 2));
    ghost.style.left = ev.clientX + 'px';
    ghost.style.top = ev.clientY + 'px';
    document.body.appendChild(ghost);
    chip.setPointerCapture && chip.setPointerCapture(ev.pointerId);
    chip._ghostSrc = ev.target;
  });

  document.addEventListener('pointermove', function (ev) {
    if (!ghost) return;
    ghost.style.left = ev.clientX + 'px';
    ghost.style.top = ev.clientY + 'px';
    const over = document.elementFromPoint(ev.clientX, ev.clientY);
    $$('.orbit-slot').forEach(s => s.classList.remove('is-over'));
    const slot = over && over.closest ? over.closest('.orbit-slot') : null;
    if (slot) slot.classList.add('is-over');
  });

  document.addEventListener('pointerup', function (ev) {
    if (!ghost) return;
    const over = document.elementFromPoint(ev.clientX, ev.clientY);
    const slot = over && over.closest ? over.closest('.orbit-slot') : null;
    const chip = $('.planet-chip[data-key="' + dragKey + '"]');
    if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
    ghost = null;
    $$('.orbit-slot').forEach(s => s.classList.remove('is-over'));
    if (chip) chip.classList.remove('is-dragging');
    if (slot) { placePlanet(dragKey, Number(slot.dataset.slot), chip); dragKey = null; return; }
    /* 没有拖到轨道上：视作“点选”，等待学生再点一个轨道（触屏/键盘友好）。 */
    if (chip) {
      $$('.planet-chip').forEach(c => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
      state.selectedChip = dragKey;
      $('#drag-feedback').className = 'feedback';
      $('#drag-feedback').innerHTML = L('已选中，请再点一条轨道把它放上去。', 'Selected — now tap an orbit to place it.');
      setDragBuddy('curious', '已选中，请再点一条轨道把它放上去。', 'Selected — now tap an orbit to place it.');
    }
    dragKey = null;
  });

  /* 点选 + 点轨道：给不方便拖拽的学生留出等价路径 [L3-Boundary]。 */
  tray.addEventListener('click', function (ev) {
    const chip = ev.target.closest('.planet-chip');
    if (!chip || chip.classList.contains('is-placed')) return;
    $$('.planet-chip').forEach(c => c.classList.remove('is-selected'));
    chip.classList.add('is-selected');
    state.selectedChip = chip.dataset.key;
  });

  $('#orbit-track').addEventListener('click', function (ev) {
    const slot = ev.target.closest('.orbit-slot');
    if (!slot || !state.selectedChip) return;
    const chip = $('.planet-chip[data-key="' + state.selectedChip + '"]');
    placePlanet(state.selectedChip, Number(slot.dataset.slot), chip);
    if (state.used[state.selectedChip]) state.selectedChip = null;
  });

  $('#orbit-track').addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    const slot = ev.target.closest('.orbit-slot');
    if (!slot || !state.selectedChip) return;
    ev.preventDefault();
    const chip = $('.planet-chip[data-key="' + state.selectedChip + '"]');
    placePlanet(state.selectedChip, Number(slot.dataset.slot), chip);
  });

  $('#drag-hint').addEventListener('click', function () {
    state.hintStep = Math.min(state.hintStep + 1, 3);
    let html;
    if (state.hintStep === 1) {
      html = L('小口诀：水金地火木土天海，从里到外就是这个顺序。', 'Say it like this: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.');
    } else if (state.hintStep === 2) {
      const next = PLANETS.find(p => !state.used[p.key]);
      html = next
        ? L('下一颗要找的是' + next.zh + '：' + next.factZh, 'Next one to find is ' + next.en + ': ' + next.factEn)
        : L('你已经全部放好了！', 'You have placed them all!');
    } else {
      const next = PLANETS.find(p => !state.used[p.key]);
      if (next) {
        const slot = $('.orbit-slot[data-slot="' + next.order + '"]');
        if (slot) {
          slot.classList.add('is-over');
          setTimeout(() => slot.classList.remove('is-over'), 1600);
          slot.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        }
        html = L('看！闪一下的就是' + next.zh + '的位置。', 'Look! The flashing circle is where ' + next.en + ' goes.');
      } else {
        html = L('全部完成！', 'All done!');
      }
    }
    $('#drag-hint-text').innerHTML = html;
  });

  $('#drag-reset').addEventListener('click', function () {
    buildDragGame();
    $('#drag-feedback').className = 'feedback';
    $('#drag-feedback').innerHTML = L('重新开始，慢慢来。', 'Fresh start — take your time.');
  });
}

/* ---------- 10. Self-explanation ----------
   [L3-Generative] 自我解释提示：先选理由（低门槛），再用自己的话写一句（生成性）。
   [L3-Boundary] 写作长度不限，答案没有“错”，参考想法在主动请求后才出现。 */
function setupThink() {
  $('#reason-chips').innerHTML = REASONS.map((r, i) =>
    '<button class="reason-chip" type="button" aria-pressed="false" data-reason="' + i + '">' + L(r.zh, r.en) + '</button>'
  ).join('');

  $('#reason-chips').addEventListener('click', function (ev) {
    const chip = ev.target.closest('.reason-chip');
    if (!chip) return;
    const on = chip.getAttribute('aria-pressed') === 'true';
    chip.setAttribute('aria-pressed', on ? 'false' : 'true');
    cue('tap');
  });

  try {
    const saved = window.localStorage.getItem('solar.think');
    if (saved) $('#think-input').value = saved;
  } catch (e) {}

  $('#think-save').addEventListener('click', function () {
    try { window.localStorage.setItem('solar.think', $('#think-input').value); } catch (e) {}
    state.thinkDone = true;
    $('#think-feedback').className = 'feedback ok';
    $('#think-feedback').innerHTML = L('已保存你的想法。可以读给同桌听一听！', 'Saved. Try reading it to the person next to you!');
    cue('ok');
    renderJourney();
  });

  $('#think-reveal').addEventListener('click', function () {
    const box = $('#think-model');
    box.hidden = false;
    state.thinkDone = true;   // 看过参考想法也算这一项做到了
    box.innerHTML =
      '<h4>' + L('参考想法（不是标准答案）', 'A model answer (not the only answer)') + '</h4>' +
      '<ul>' +
        '<li>' + L('地球离太阳不远也不近，所以不太热也不太冷。', 'Earth is neither too close nor too far from the Sun, so it is not too hot or too cold.') + '</li>' +
        '<li>' + L('地球上有液态的水，动物和植物都需要水。', 'Earth has liquid water — animals and plants need water.') + '</li>' +
        '<li>' + L('地球有空气，我们可以呼吸。', 'Earth has air, so we can breathe.') + '</li>' +
        '<li>' + L('地球有阳光，植物用阳光制造食物。', 'Earth gets sunlight, and plants use it to make food.') + '</li>' +
      '</ul>' +
      '<p>' + L('再想一想：如果地球离太阳再近一点，会怎样？', 'Now think: what if Earth were a little closer to the Sun?') + '</p>';
    cue('tap');
    renderJourney();
  });
}

/* ---------- 11. Controls ---------- */
/* 语言应用 + 地址栏记录（默认英文；?lang=zh 可以分享一个中文链接给同学）。 */
function applyLanguage(keepQuery) {
  const zh = state.lang === 'zh';
  document.body.classList.toggle('lang-zh', zh);
  document.body.classList.toggle('lang-en', !zh);
  document.documentElement.lang = zh ? 'zh-CN' : 'en';
  if (keepQuery) {
    setHash((window.location.hash || '#home').replace('#', ''));
  }
}

/* 顶部按钮的文案/状态集中同步：避免各处理函数里各自拼字符串出错。 */
function syncControlButtons() {
  const s = $('#btn-sound');
  s.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
  s.innerHTML = '<span class="ico' + (state.sound ? '' : ' ico-off') + '" aria-hidden="true" data-icon="speaker"></span>' +
    (state.sound ? L('声音：开', 'Sound: on') : L('声音：关', 'Sound: off'));

  const m = $('#btn-motion');
  const paused = document.body.classList.contains('motion-paused');
  m.setAttribute('aria-pressed', paused ? 'true' : 'false');
  m.innerHTML = '<span class="ico" aria-hidden="true" data-icon="' + (paused ? 'play' : 'pause') + '"></span>' +
    (paused ? L('动画：已暂停', 'Motion: paused') : L('动画：播放中', 'Motion: playing'));
}

function setupControls() {
  $('#btn-lang').addEventListener('click', function () {
    state.lang = state.lang === 'zh' ? 'en' : 'zh';
    applyLanguage(true);   // 顺带把 ?lang=zh 写回地址栏，方便复制分享
    /* 少数带语言“写死”的插图/标签需要重画：轨道图方向文字与总结卡编号。 */
    rebuildLangDependent();
    refreshAriaLabels();
    syncControlButtons();
    renderJourney();
    stopSpeak();
  });

  $('#btn-sound').addEventListener('click', function () {
    state.sound = !state.sound;
    if (!state.sound) stopSpeak();
    syncControlButtons();
  });

  $('#btn-motion').addEventListener('click', function () {
    const paused = !document.body.classList.contains('motion-paused');
    document.body.classList.toggle('motion-paused', paused);
    syncControlButtons();
  });

  $('#btn-theory').addEventListener('click', function () {
    state.theory = !state.theory;
    document.body.classList.toggle('show-theory', state.theory);
    this.setAttribute('aria-pressed', state.theory ? 'true' : 'false');
  });

  /* ---------- 常驻导航：窄屏“跳到”菜单 + 回到顶部 ----------
     [L3-Boundary] 学习者随时能离开当前页面，不必先滚回顶部。 */
  const jumpBtn = $('#btn-jump');
  const jumpMenu = $('#jump-menu');
  function closeJump() {
    if (!jumpMenu) return;
    jumpMenu.hidden = true;
    jumpBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleJump() {
    const open = jumpMenu.hidden;
    jumpMenu.hidden = !open;
    jumpBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      const first = jumpMenu.querySelector('.jump-item');
      if (first) first.focus();
    }
  }
  if (jumpBtn && jumpMenu) {
    jumpBtn.addEventListener('click', function (ev) { ev.stopPropagation(); toggleJump(); });
    jumpMenu.addEventListener('click', function (ev) {
      if (ev.target.closest('.jump-item')) closeJump();   /* 选完就收起 */
    });
    document.addEventListener('click', function (ev) {
      if (!jumpMenu.hidden && !ev.target.closest('#jump-menu') && !ev.target.closest('#btn-jump')) closeJump();
    });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeJump(); });
    /* 模块快捷入口：与学习区的 5 个模块同步 */
    const modWrap = $('#jump-modules');
    if (modWrap) {
      const names = ['Solar System', 'The Sun', 'Mercury → Mars', 'Jupiter & Saturn', 'Uranus & Neptune'];
      modWrap.innerHTML = names.map(function (n, i) {
        return '<button class="jump-item" type="button" data-jump-module="' + (i + 1) + '">' +
          '<span class="ico" aria-hidden="true" data-icon="planet"></span>' + (i + 1) + ' · ' + n + '</button>';
      }).join('');
      renderIcons(modWrap);
    }
  }

  /* 回到顶部：滚过约一屏后出现 */
  const toTop = $('#to-top');
  if (toTop) {
    let raf = null;
    const sync = function () {
      toTop.hidden = window.scrollY < 420;
      raf = null;
    };
    window.addEventListener('scroll', function () {
      if (raf === null) raf = requestAnimationFrame(sync);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const active = $('.nav-btn.is-active') || $('#btn-jump');
      if (active) active.focus();
    });
    sync();
  }

  /* 事件委托：所有“去某站/去某模块/听旁白”的按钮统一处理。 */
  document.addEventListener('click', function (ev) {
    /* 顶部常驻导航：单击即换页（之前这组按钮没有绑定任何处理，点了没反应） */
    const navBtn = ev.target.closest('.nav-btn[data-view]');
    if (navBtn) { showView(navBtn.dataset.view); return; }
    const go = ev.target.closest('[data-goto]');
    if (go) { showView(go.dataset.goto); return; }
    const jump = ev.target.closest('[data-jump-module]');
    if (jump) { showView('learn'); showModule(Number(jump.dataset.jumpModule)); return; }
    const chip = ev.target.closest('.mod-chip');
    if (chip) { showModule(Number(chip.dataset.module)); return; }
    const next = ev.target.closest('[data-module-next]');
    if (next) {
      if (state.module < 2) { showModule(state.module + 1); }
      else { showView('practice'); }
      return;
    }
    const prev = ev.target.closest('[data-module-prev]');
    if (prev) { if (state.module > 1) showModule(state.module - 1); return; }
    const say = ev.target.closest('[data-narrate]');
    if (say) { speak(say.dataset.narrate); return; }
    const node = ev.target.closest('.planet-node');
    if (node) {
      const p = planetByKey(node.dataset.planet);
      if (p) { showView('learn'); showModule(p.module); }
      return;
    }
    const tab = ev.target.closest('.tab');
    if (tab) {
      showTab(tab.dataset.tab);
      return;
    }
  });

  /* 轨道图上的行星也可以用键盘“跳转”。 */
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    const node = ev.target.closest && ev.target.closest('.planet-node');
    if (node) {
      ev.preventDefault();
      const p = planetByKey(node.dataset.planet);
      if (p) { showView('learn'); showModule(p.module); }
    }
  });
}

/* 语言切换后需要重画的部分（插图里的文字 + 总结编号） */
function rebuildLangDependent() {
  initSolarSystems();          /* 重建太阳系图：图内文字与无障碍名称随语言更新 */
  buildSummary();
}

/* ---------- 12. Init ---------- */
function init() {
  loadVoices();
  /* 初始语言：默认英文；?lang=zh 直接进中文界面（方便分享与演示）。 */
  if (/[?&]lang=zh/.test(window.location.search)) state.lang = 'zh';
  applyLanguage(false);
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('motion-paused');
  }

  buildGuideFigures();
  buildPlanetFigures();
  buildModuleNav();
  buildTermCards();
  buildInnerPlanetGrid();
  buildSummary();
  renderQuizzes();
  buildDragGame();
  setupDragGame();
  setupThink();
  setupJourney();
  setupControls();
  setupSolarInteraction();
  /* Icons are inline SVG: fill every [data-icon] slot now, and keep filling the
     ones that later appear in generated markup (term cards, chips, buttons). */
  renderIcons();
  if (window.MutationObserver) {
    new MutationObserver(function () { renderIcons(); })
      .observe(document.body, { childList: true, subtree: true });
  }

  initSolarSystems();

  /* 首页不再额外加“听地小球打招呼”按钮：向导本人就是那个按钮（点它说话），
     屏幕上只留一句招呼，完整内容交给声音。 */
  syncControlButtons();

  $('#quiz-reset').addEventListener('click', function () {
    renderQuizzes();
    $('#quiz-score').textContent = '0';
    flash(L('小测已重置，再来一次吧。', 'Quiz reset — go again.'));
  });

  try {
    const t = window.localStorage.getItem('solar.transfer');
    if (t) $('#transfer-input').value = t;
    $('#transfer-input').addEventListener('input', function () {
      try { window.localStorage.setItem('solar.transfer', this.value); } catch (e) {}
    });
  } catch (e) {}

  /* 深链接：允许老师/学生用 #pretrain、#learn-3、#practice、#summary 直接进入某一页。 */
  const hash = (window.location.hash || '').replace('#', '');
  const VIEWS = ['home', 'pretrain', 'learn', 'practice', 'summary', 'about'];
  if (VIEWS.indexOf(hash) >= 0) {
    showView(hash);
  } else {
    const m = hash.match(/^learn-([1-5])$/);
    const p = hash.match(/^practice-(drag|think|quiz)$/);
    if (m) { showView('learn'); showModule(Number(m[1])); }
    else if (p) { showView('practice'); showTab(p[1]); }
    else { showView('home'); }
  }
  /* ?menu=1 展开“跳到”菜单（截图/演示窄屏导航用；必须放在 showView 之后，
     因为 showView 会收起菜单） */
  if (/[?&]menu=1/.test(window.location.search)) {
    const jb = $('#btn-jump');
    if (jb && jb.offsetParent !== null) jb.click();
  }
}

document.addEventListener('DOMContentLoaded', init);
