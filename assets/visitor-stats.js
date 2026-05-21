/* LiteRaceSegNet-V13 visitor statistics counter
   Static GitHub Pages friendly: site page views, rough unique visitors, and GitHub-link clicks.
   Uses CounterAPI v1 public counters; if the external API is blocked, the UI falls back gracefully.
*/
(function(){
  'use strict';
  const CONFIG = {
    namespace: 'literacesegnet-v13-portal-jcicaaa3-cloud',
    endpoint: 'https://api.counterapi.dev/v1',
    repoUrl: 'https://github.com/jcicaaa3-cloud/LiteRaceSegNet-V13-Portal',
    storagePrefix: 'lrs-v13-traffic-counter-v1'
  };
  const LABELS = {
    ko: {
      chip: '방문 통계', title: '방문 통계', close: '닫기', open: '열기',
      site: '사이트 누적 방문', unique: '방문자 수', page: '현재 페이지', github: 'GitHub 이동',
      loading: '집계 중', failed: '카운터 연결 대기',
      note: '사이트 방문과 GitHub 링크 클릭을 집계합니다. GitHub 저장소 자체의 views/clones 최종 수치는 Repository Insights → Traffic에서 확인합니다.',
      repo: 'GitHub 저장소 열기', today: '정적 Pages용 간단 통계', unit: '회'
    },
    ja: {
      chip: '訪問統計', title: '訪問統計', close: '閉じる', open: '開く',
      site: 'サイト累計訪問', unique: '訪問者数', page: '現在ページ', github: 'GitHub 遷移',
      loading: '集計中', failed: 'カウンター接続待ち',
      note: 'サイト訪問と GitHub リンククリックを集計します。GitHub リポジトリ自体の views/clones は Repository Insights → Traffic で確認します。',
      repo: 'GitHub リポジトリを開く', today: 'Static Pages 用の簡易統計', unit: '回'
    },
    en: {
      chip: 'Visit stats', title: 'Visit stats', close: 'Close', open: 'Open',
      site: 'Total site views', unique: 'Visitors', page: 'Current page', github: 'GitHub exits',
      loading: 'Counting', failed: 'Counter connection pending',
      note: 'Counts site visits and GitHub-link clicks. Final GitHub repository views/clones are checked in Repository Insights → Traffic.',
      repo: 'Open GitHub repository', today: 'Lightweight static-page stats', unit: 'views'
    }
  };
  const STATE = { expanded: false, ready: false, values: {}, error: false };
  function lang(){
    const value = (document.documentElement.lang || 'ja').toLowerCase();
    if(value.startsWith('ko')) return 'ko';
    if(value.startsWith('en')) return 'en';
    return 'ja';
  }
  function t(key){ return (LABELS[lang()] || LABELS.ja)[key] || LABELS.en[key] || key; }
  function fmt(value){
    if(typeof value !== 'number' || !Number.isFinite(value)) return '—';
    return new Intl.NumberFormat(lang()==='ja' ? 'ja-JP' : lang()==='ko' ? 'ko-KR' : 'en-US').format(value);
  }
  function normalizeCounterName(value){
    return String(value || 'index')
      .replace(/^\/+|\/+$/g,'')
      .replace(/index\.html$/,'index')
      .replace(/\.html$/,'')
      .replace(/[^a-zA-Z0-9_-]+/g,'-')
      .replace(/^-+|-+$/g,'')
      .toLowerCase() || 'index';
  }
  function currentPageKey(){
    const path = location.pathname.split('/').pop() || 'index.html';
    const parent = location.pathname.includes('/pages/') ? 'pages-' : '';
    return 'page-' + parent + normalizeCounterName(path);
  }
  function extractCount(data){
    if(typeof data === 'number') return data;
    if(!data || typeof data !== 'object') return NaN;
    for(const key of ['value','count','data','result','total']){
      if(typeof data[key] === 'number') return data[key];
      if(typeof data[key] === 'string' && data[key].trim() !== '' && !Number.isNaN(Number(data[key]))) return Number(data[key]);
      if(data[key] && typeof data[key] === 'object'){
        const nested = extractCount(data[key]);
        if(Number.isFinite(nested)) return nested;
      }
    }
    return NaN;
  }
  async function counter(name, action){
    const clean = normalizeCounterName(name);
    const suffix = action === 'up' ? '/up' : '';
    const url = `${CONFIG.endpoint}/${encodeURIComponent(CONFIG.namespace)}/${encodeURIComponent(clean)}${suffix}`;
    const res = await fetch(url, { cache:'no-store', mode:'cors', credentials:'omit' });
    if(!res.ok) throw new Error('counter api status ' + res.status);
    const json = await res.json();
    return extractCount(json);
  }
  async function getCount(name){ return counter(name, 'get'); }
  async function upCount(name){ return counter(name, 'up'); }
  function storeGet(key){ try { return localStorage.getItem(CONFIG.storagePrefix + ':' + key); } catch(_) { return null; } }
  function storeSet(key, value){ try { localStorage.setItem(CONFIG.storagePrefix + ':' + key, value); } catch(_) {} }
  function injectStyle(){
    if(document.getElementById('lrs-visitor-stats-style')) return;
    const css = `
      .lrs-visitor-stats{position:fixed;right:18px;bottom:18px;z-index:9998;font-family:inherit;color:#0f172a}.lrs-visitor-stats *{box-sizing:border-box}.lrs-visitor-toggle{display:flex;align-items:center;gap:10px;border:1px solid rgba(37,99,235,.22);background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(239,246,255,.94));border-radius:999px;padding:10px 14px;box-shadow:0 18px 48px rgba(15,23,42,.18);cursor:pointer;color:#0f172a;font-weight:950;backdrop-filter:blur(14px)}.lrs-visitor-toggle span{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#2563eb}.lrs-visitor-toggle strong{font-size:15px;min-width:34px;text-align:right}.lrs-visitor-toggle i{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 6px rgba(34,197,94,.13);display:block}.lrs-visitor-stats[data-error="true"] .lrs-visitor-toggle i{background:#f59e0b;box-shadow:0 0 0 6px rgba(245,158,11,.15)}.lrs-visitor-panel{position:absolute;right:0;bottom:58px;width:min(360px,calc(100vw - 32px));background:linear-gradient(180deg,#fff,#f7fbff);border:1px solid rgba(148,163,184,.28);border-radius:22px;padding:16px;box-shadow:0 26px 74px rgba(15,23,42,.24)}.lrs-visitor-panel[hidden]{display:none}.lrs-visitor-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}.lrs-visitor-head b{display:block;font-size:17px;color:#0f172a}.lrs-visitor-head small{display:block;margin-top:3px;color:#64748b;font-weight:800}.lrs-visitor-close{border:0;background:#eaf2ff;color:#1d4ed8;border-radius:999px;padding:7px 10px;font-weight:900;cursor:pointer}.lrs-visitor-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.lrs-visitor-card{border:1px solid #dbe7f4;background:#fff;border-radius:16px;padding:12px}.lrs-visitor-card span{display:block;color:#64748b;font-size:12px;font-weight:900;line-height:1.25}.lrs-visitor-card strong{display:block;margin-top:5px;font-size:22px;letter-spacing:-.03em;color:#0b1d34}.lrs-visitor-note{margin:12px 0 0;color:#64748b;font-size:12px;line-height:1.5;font-weight:750}.lrs-visitor-actions{display:flex;justify-content:flex-end;margin-top:12px}.lrs-visitor-actions a{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:#0f172a;color:#fff;text-decoration:none;font-size:12px;font-weight:950;padding:9px 12px}.theme-dark .lrs-visitor-panel,.qa-chat-ui .lrs-visitor-panel{background:linear-gradient(180deg,#102035,#071426);border-color:rgba(255,255,255,.16);color:#e8f2ff}.theme-dark .lrs-visitor-head b,.qa-chat-ui .lrs-visitor-head b{color:#fff}.theme-dark .lrs-visitor-head small,.theme-dark .lrs-visitor-note,.qa-chat-ui .lrs-visitor-head small,.qa-chat-ui .lrs-visitor-note{color:#aac0d8}.theme-dark .lrs-visitor-card,.qa-chat-ui .lrs-visitor-card{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14)}.theme-dark .lrs-visitor-card strong,.qa-chat-ui .lrs-visitor-card strong{color:#fff}.theme-dark .lrs-visitor-card span,.qa-chat-ui .lrs-visitor-card span{color:#aac0d8}@media(max-width:620px){.lrs-visitor-stats{right:12px;bottom:12px}.lrs-visitor-toggle{padding:9px 12px}.lrs-visitor-panel{bottom:54px}.lrs-visitor-grid{grid-template-columns:1fr}}`;
    const style = document.createElement('style');
    style.id = 'lrs-visitor-stats-style';
    style.textContent = css;
    document.head.appendChild(style);
  }
  function ensureUI(){
    if(document.querySelector('[data-lrs-visitor-stats]')) return;
    injectStyle();
    const wrap = document.createElement('aside');
    wrap.className = 'lrs-visitor-stats no-translate';
    wrap.setAttribute('data-lrs-visitor-stats','');
    wrap.setAttribute('data-error','false');
    wrap.innerHTML = `
      <button class="lrs-visitor-toggle" type="button" data-lrs-visitor-toggle aria-expanded="false"><i aria-hidden="true"></i><span data-lrs-visitor-chip></span><strong data-lrs-visitor-total>—</strong></button>
      <section class="lrs-visitor-panel" data-lrs-visitor-panel hidden>
        <div class="lrs-visitor-head"><div><b data-lrs-visitor-title></b><small data-lrs-visitor-sub></small></div><button class="lrs-visitor-close" type="button" data-lrs-visitor-close></button></div>
        <div class="lrs-visitor-grid">
          <div class="lrs-visitor-card"><span data-lrs-label="site"></span><strong data-lrs-value="site">—</strong></div>
          <div class="lrs-visitor-card"><span data-lrs-label="unique"></span><strong data-lrs-value="unique">—</strong></div>
          <div class="lrs-visitor-card"><span data-lrs-label="page"></span><strong data-lrs-value="page">—</strong></div>
          <div class="lrs-visitor-card"><span data-lrs-label="github"></span><strong data-lrs-value="github">—</strong></div>
        </div>
        <p class="lrs-visitor-note" data-lrs-visitor-note></p>
        <div class="lrs-visitor-actions"><a href="${CONFIG.repoUrl}" target="_blank" rel="noreferrer" data-lrs-visitor-repo></a></div>
      </section>`;
    document.body.appendChild(wrap);
    wrap.querySelector('[data-lrs-visitor-toggle]').addEventListener('click', function(){ STATE.expanded = !STATE.expanded; render(); });
    wrap.querySelector('[data-lrs-visitor-close]').addEventListener('click', function(){ STATE.expanded = false; render(); });
  }
  function render(){
    const wrap = document.querySelector('[data-lrs-visitor-stats]');
    if(!wrap) return;
    wrap.setAttribute('data-error', STATE.error ? 'true' : 'false');
    const panel = wrap.querySelector('[data-lrs-visitor-panel]');
    const toggle = wrap.querySelector('[data-lrs-visitor-toggle]');
    if(panel) panel.hidden = !STATE.expanded;
    if(toggle) toggle.setAttribute('aria-expanded', String(STATE.expanded));
    const setText = (sel, value) => { const el = wrap.querySelector(sel); if(el) el.textContent = value; };
    setText('[data-lrs-visitor-chip]', t('chip'));
    setText('[data-lrs-visitor-title]', t('title'));
    setText('[data-lrs-visitor-sub]', STATE.error ? t('failed') : t('today'));
    setText('[data-lrs-visitor-close]', STATE.expanded ? t('close') : t('open'));
    setText('[data-lrs-visitor-note]', t('note'));
    setText('[data-lrs-visitor-repo]', t('repo'));
    setText('[data-lrs-visitor-total]', STATE.ready ? fmt(STATE.values.site) : '…');
    ['site','unique','page','github'].forEach(key => {
      setText(`[data-lrs-label="${key}"]`, t(key));
      setText(`[data-lrs-value="${key}"]`, STATE.ready ? fmt(STATE.values[key]) : '…');
    });
  }
  async function loadCounters(){
    ensureUI(); render();
    const pageKey = currentPageKey();
    try{
      const site = await upCount('site-views');
      const page = await upCount(pageKey);
      let unique;
      if(!storeGet('unique-counted')){
        unique = await upCount('unique-visitors');
        storeSet('unique-counted','1');
      } else {
        unique = await getCount('unique-visitors');
      }
      const github = await getCount('github-clicks').catch(() => 0);
      STATE.values = { site, page, unique, github };
      STATE.ready = true; STATE.error = false; render();
    } catch(err){
      STATE.error = true; STATE.ready = false; render();
      if(window.console) console.warn('[LiteRaceSegNet stats] counter unavailable:', err && err.message ? err.message : err);
    }
  }
  function watchGithubLinks(){
    document.addEventListener('click', function(event){
      const link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if(!link) return;
      let href = '';
      try{ href = new URL(link.getAttribute('href'), location.href).href; }catch(_){ return; }
      if(!/https?:\/\/github\.com\//i.test(href)) return;
      upCount('github-clicks').then(value => {
        STATE.values.github = value;
        if(STATE.ready) render();
      }).catch(err => {
        if(window.console) console.warn('[LiteRaceSegNet stats] github click not counted:', err && err.message ? err.message : err);
      });
    }, true);
  }
  function watchLanguage(){
    if(!window.MutationObserver) return;
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
  }
  function init(){
    loadCounters();
    watchGithubLinks();
    watchLanguage();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
