(function () {
  'use strict';

  /* =====================================================================
     DATA
     ===================================================================== */
  const SITE = window.SITE;
  const COUNTRIES = window.COUNTRIES;
  const CATEGORIES = window.CATEGORIES;
  const byDate = (a, b) => b.date.localeCompare(a.date);
  const ARTICLES = window.ARTICLES.slice().sort(byDate);
  const SHORTS = window.SHORTS.slice().sort(byDate);
  const SUB_URL = SITE.channelUrl + '?sub_confirmation=1';
  const IG_URL = SITE.instagramUrl;
  const IG_HANDLE = SITE.instagramHandle || 'Instagram';

  /* =====================================================================
     HELPERS
     ===================================================================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const yt = (id, still) => `https://i.ytimg.com/vi/${id}/${still}.jpg`;
  const isShort = (item) => SHORTS.includes(item);
  const imageOf = (item) => item.image || yt(item.id, item.still || (isShort(item) ? 'oardefault' : 'maxres1'));
  const fallbackOf = (item) => yt(item.id, 'hqdefault');

  const fmtDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const fmtClock = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = String(s % 60).padStart(2, '0');
    return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
  };
  const fmtMinutes = (s) => `${Math.max(1, Math.round(s / 60))} menit`;

  const countryName = (k) => (COUNTRIES[k] && COUNTRIES[k].name) || '';
  const catName = (k) => (CATEGORIES[k] && CATEGORIES[k].name) || '';
  const placeOf = (item) => [item.city, countryName(item.country)].filter(Boolean).join(', ');
  const articleUrl = (a) => `article.html?a=${encodeURIComponent(a.slug)}`;
  const archiveUrl = (params = {}) => {
    const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString();
    return 'cerita.html' + (q ? '?' + q : '');
  };
  const countFor = (key) => ARTICLES.filter((a) => a.country === key).length + SHORTS.filter((s) => s.country === key).length;

  /* ---------- icons ---------- */
  const svg = (d, extra = '') => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const I = {
    play: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
    arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    arrowUR: svg('<path d="M7 17 17 7M8 7h9v9"/>'),
    left: svg('<path d="m15 18-6-6 6-6"/>'),
    right: svg('<path d="m9 18 6-6-6-6"/>'),
    down: svg('<path d="m6 9 6 6 6-6"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    menu: svg('<path d="M4 7h16M4 12h16M4 17h10"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    link: svg('<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>'),
    yt: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg>',
    ig: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".6" fill="currentColor"/>'),
    wa: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>',
    fb: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3a22 22 0 0 0-2.4-.1C12.2 2.2 10.6 3.6 10.6 6.3v2.2H8V12h2.6v9.8H14V12h2.7l.4-3.5H14z"/></svg>',
    x: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg>',
  };

  /* ---------- building blocks ---------- */
  function img(src, fallback, opts = {}) {
    const load = opts.eager ? 'fetchpriority="high"' : opts.lazy === false ? '' : 'loading="lazy"';
    return `<img class="${opts.cls || ''}" src="${esc(src)}" alt="${esc(opts.alt || '')}" ${load} decoding="async" onerror="this.onerror=null;this.src='${esc(fallback)}'">`;
  }

  // YouTube video stills carry the channel watermark in the top-right corner;
  // images marked "is-still" are cropped slightly so it falls outside the frame.
  const isStill = (still, custom) => !custom && /^maxres\d$/.test(still || '');

  function media(item, opts = {}) {
    const src = imageOf(item), fb = fallbackOf(item);
    const vertical = item.vertical && !item.image;
    const still = !vertical && !isShort(item) && isStill(item.still || 'maxres1', item.image);
    const badge = opts.badge && item.duration ? `<span class="badge-time">${I.play}${fmtClock(item.duration)}</span>` : '';
    return `<div class="media${vertical ? ' is-v' : ''}${still ? ' is-still' : ''}">${vertical ? img(src, fb, { cls: 'media-bg' }) : ''}${img(src, fb, { cls: 'media-img', eager: opts.eager })}${badge}</div>`;
  }

  function storyCard(a, variant = 'card') {
    const dek = variant === 'row' ? '' : `<p class="card-dek">${esc(a.excerpt)}</p>`;
    return `<a class="${variant === 'lead' ? 'story-lead' : variant === 'row' ? 'story-row' : 'card'} reveal" href="${articleUrl(a)}">
      ${media(a, { badge: true })}
      <div class="card-body">
        <span class="kicker">${esc(catName(a.category))}</span>
        <h3 class="card-title"><span>${esc(a.title)}</span></h3>
        ${dek}
        <div class="meta"><span>${esc(placeOf(a))}</span><span class="dot"></span><time datetime="${a.date}">${fmtDate(a.date)}</time></div>
      </div>
    </a>`;
  }

  function shortCard(s) {
    return `<button class="short" type="button" data-video="${esc(s.id)}" data-portrait="1" data-title="${esc(s.title)}">
      ${img(imageOf(s), fallbackOf(s))}
      <span class="short-top"><span class="short-tag">Shorts</span><span class="badge-time">${I.play}${fmtClock(s.duration)}</span></span>
      <span class="short-play">${I.play}</span>
      <span class="short-body"><span class="short-title">${esc(s.title)}</span>${placeOf(s) ? `<span class="short-place">${esc(placeOf(s))}</span>` : ''}</span>
    </button>`;
  }

  function railControls(target) {
    return `<div class="rail-controls">
      <button class="rail-btn" type="button" data-rail="${target}" data-dir="-1" aria-label="Geser ke kiri">${I.left}</button>
      <button class="rail-btn" type="button" data-rail="${target}" data-dir="1" aria-label="Geser ke kanan">${I.right}</button>
    </div>`;
  }

  function facade(item, label = 'Tonton video') {
    return `<button class="facade" type="button" data-inline-video="${esc(item.id)}"${item.playlist ? ` data-list="${esc(item.playlist)}"` : ''} aria-label="Putar video: ${esc(item.title)}">
      ${media(item)}
      <span class="facade-play">${I.play}</span>
      <span class="facade-label">${label}${item.duration ? ` <span>${fmtClock(item.duration)}</span>` : ''}</span>
    </button>`;
  }

  const embedSrc = (id, list) => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1${list ? `&list=${encodeURIComponent(list)}` : ''}`;
  const watchUrl = (id, list) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}${list ? `&list=${encodeURIComponent(list)}` : ''}`;
  function iframe(id, title, list) {
    return `<iframe src="${embedSrc(id, list)}" title="${esc(title || 'Video YouTube')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }

  /* =====================================================================
     SHARED CHROME: header, drawer, search, video modal, footer
     ===================================================================== */
  function renderHeader(overlay) {
    const header = $('#site-header');
    if (!header) return;
    header.className = 'site-header' + (overlay ? ' is-overlay' : '');
    const megaItems = Object.entries(COUNTRIES).map(([k, c]) => `
      <a class="mega-item" href="${archiveUrl({ d: k })}">
        ${img(yt(c.cover.id, c.cover.still), yt(c.cover.id, 'hqdefault'))}
        <span><strong>${esc(c.name)}</strong><span>${countFor(k)} video</span></span>
      </a>`).join('');

    header.innerHTML = `
      <a class="skip-link" href="#main">Langsung ke konten</a>
      <div class="wrap header-inner">
        <a class="wordmark" href="index.html" aria-label="${esc(SITE.name)}, beranda">
          <span class="wordmark-name">${esc(SITE.name)}</span><span class="wordmark-tag">Project<br>Studio</span>
        </a>
        <nav class="main-nav" aria-label="Navigasi utama">
          <ul>
            <li class="has-menu">
              <button class="nav-link" type="button" aria-expanded="false" aria-controls="mega">Destinasi ${I.down}</button>
              <div class="mega" id="mega">${megaItems}
                <div class="mega-foot"><span>${Object.keys(COUNTRIES).length} negara, ${ARTICLES.length + SHORTS.length} video</span><a class="link-arrow" href="cerita.html">Semua cerita ${I.arrow}</a></div>
              </div>
            </li>
            <li><a class="nav-link" href="cerita.html">Cerita</a></li>
            <li><a class="nav-link" href="index.html#video">Video</a></li>
            <li><a class="nav-link" href="index.html#tentang">Tentang</a></li>
          </ul>
        </nav>
        <div class="header-actions">
          <button class="icon-btn" type="button" data-open-search aria-label="Cari cerita">${I.search}</button>
          ${IG_URL ? `<a class="icon-btn ig-link" href="${IG_URL}" target="_blank" rel="noopener" aria-label="Instagram ${esc(IG_HANDLE)}">${I.ig}</a>` : ''}
          <a class="btn btn-sm btn-dark btn-sub" href="${SUB_URL}" target="_blank" rel="noopener">${I.yt} Subscribe</a>
          <button class="icon-btn menu-btn" type="button" data-open-drawer aria-label="Buka menu">${I.menu}</button>
        </div>
      </div>`;

    // mega menu (hover on desktop, click/keyboard everywhere)
    const item = $('.has-menu', header);
    const btn = $('button', item);
    const setOpen = (open) => { item.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
    let hoverTimer;
    item.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); setOpen(true); });
    item.addEventListener('mouseleave', () => { hoverTimer = setTimeout(() => setOpen(false), 120); });
    btn.addEventListener('click', () => setOpen(!item.classList.contains('open')));
    document.addEventListener('click', (e) => { if (!item.contains(e.target)) setOpen(false); });
    item.addEventListener('keydown', (e) => { if (e.key === 'Escape') { setOpen(false); btn.focus(); } });

    if (overlay) {
      const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 40);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  function renderFooter() {
    const footer = $('#site-footer');
    if (!footer) return;
    footer.className = 'site-footer';
    const dest = Object.entries(COUNTRIES).map(([k, c]) => `<li><a href="${archiveUrl({ d: k })}">${esc(c.name)}</a></li>`).join('');
    const cats = Object.entries(CATEGORIES).map(([k, c]) => `<li><a href="${archiveUrl({ k })}">${esc(c.name)}</a></li>`).join('');
    // "follow" band shown above the footer on every page
    if (IG_URL) {
      const band = document.createElement('section');
      band.className = 'follow-band';
      band.innerHTML = `
        <div class="wrap follow-inner">
          <div class="follow-text">
            <span class="follow-icon">${I.ig}</span>
            <div>
              <span class="kicker kicker-dot">Instagram</span>
              <h2 class="follow-title">Ikuti perjalanan harian di <a href="${IG_URL}" target="_blank" rel="noopener">${esc(IG_HANDLE)}</a></h2>
              <p>Foto, cerita singkat, dan kabar terbaru langsung dari jalan.</p>
            </div>
          </div>
          <div class="follow-actions">
            <a class="btn btn-ig" href="${IG_URL}" target="_blank" rel="noopener">${I.ig} Ikuti di Instagram</a>
            <a class="btn btn-outline" href="${SUB_URL}" target="_blank" rel="noopener">${I.yt} Subscribe YouTube</a>
          </div>
        </div>`;
      footer.before(band);
    }

    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-top">
          <div class="footer-brand">
            <a class="wordmark" href="index.html"><span class="wordmark-name">${esc(SITE.name)}</span><span class="wordmark-tag">Project<br>Studio</span></a>
            <p>${esc(SITE.tagline)}. Setiap cerita di situs ini punya versi videonya di YouTube.</p>
            <div class="social-row">
              <a href="${SITE.channelUrl}" target="_blank" rel="noopener" aria-label="YouTube ${esc(SITE.studio)}">${I.yt}</a>
              ${IG_URL ? `<a href="${IG_URL}" target="_blank" rel="noopener" aria-label="Instagram ${esc(IG_HANDLE)}">${I.ig}</a>` : ''}
            </div>
          </div>
          <div class="footer-col"><h2>Destinasi</h2><ul>${dest}</ul></div>
          <div class="footer-col"><h2>Kategori</h2><ul>${cats}</ul></div>
          <div class="footer-col"><h2>Ikuti</h2><ul>
            <li><a href="${SITE.channelUrl}" target="_blank" rel="noopener">YouTube</a></li>
            <li><a href="${SITE.channelUrl}/shorts" target="_blank" rel="noopener">YouTube Shorts</a></li>
            ${IG_URL ? `<li><a href="${IG_URL}" target="_blank" rel="noopener">Instagram</a></li>` : ''}
            <li><a href="cerita.html">Semua cerita</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${esc(SITE.studio)}. Video dan foto milik ${esc(SITE.studio)}.</span>
          <a href="#top">Kembali ke atas ↑</a>
        </div>
      </div>`;
  }

  function renderDrawer() {
    const d = document.createElement('dialog');
    d.className = 'drawer';
    d.setAttribute('aria-label', 'Menu');
    const dest = Object.entries(COUNTRIES).map(([k, c]) => `<a href="${archiveUrl({ d: k })}">${img(yt(c.cover.id, c.cover.still), yt(c.cover.id, 'hqdefault'))}${esc(c.name)}</a>`).join('');
    d.innerHTML = `
      <div class="drawer-head">
        <a class="wordmark" href="index.html"><span class="wordmark-name">${esc(SITE.name)}</span></a>
        <button class="icon-btn" type="button" data-close aria-label="Tutup menu">${I.close}</button>
      </div>
      <div class="drawer-body">
        <nav class="drawer-nav" aria-label="Menu utama">
          <a href="index.html">Beranda ${I.arrow}</a>
          <a href="cerita.html">Semua cerita ${I.arrow}</a>
          <a href="index.html#video">Video ${I.arrow}</a>
          <a href="index.html#tentang">Tentang ${I.arrow}</a>
        </nav>
        <p class="drawer-label">Destinasi</p>
        <div class="drawer-dest">${dest}</div>
      </div>
      <div class="drawer-foot">
        <a class="btn btn-yt btn-block" href="${SUB_URL}" target="_blank" rel="noopener">${I.yt} Subscribe di YouTube</a>
        ${IG_URL ? `<a class="btn btn-ig btn-block" href="${IG_URL}" target="_blank" rel="noopener">${I.ig} Ikuti ${esc(IG_HANDLE)}</a>` : ''}
      </div>`;
    document.body.appendChild(d);
    $('[data-close]', d).addEventListener('click', () => d.close());
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('a')) d.close(); });
    document.addEventListener('click', (e) => { if (e.target.closest('[data-open-drawer]')) d.showModal(); });
  }

  function renderSearch() {
    const d = document.createElement('dialog');
    d.className = 'search';
    d.setAttribute('aria-label', 'Cari');
    d.innerHTML = `
      <form class="search-field" action="cerita.html" method="get" role="search">
        ${I.search}
        <input type="search" name="q" placeholder="Cari kota, negara, atau cerita…" autocomplete="off" aria-label="Kata kunci">
        <button class="icon-btn" type="button" data-close aria-label="Tutup pencarian">${I.close}</button>
      </form>
      <div class="search-results"></div>
      <div class="search-foot"><span>Tekan Enter untuk melihat semua hasil</span><span>Esc untuk menutup</span></div>`;
    document.body.appendChild(d);
    const input = $('input', d), results = $('.search-results', d);

    const haystack = (it) => norm([it.title, it.city, countryName(it.country), catName(it.category), it.excerpt].join(' '));
    function suggestions() {
      const pick = ARTICLES.slice(0, 5);
      return `<p class="search-group">Cerita terbaru</p>` + pick.map(articleItem).join('');
    }
    function articleItem(a) {
      return `<a class="search-item" href="${articleUrl(a)}">${img(imageOf(a), fallbackOf(a), { lazy: false })}<span><strong>${esc(a.title)}</strong><span>${esc(placeOf(a))} · ${esc(catName(a.category))}</span></span></a>`;
    }
    function shortItem(s) {
      return `<button class="search-item" type="button" data-video="${esc(s.id)}" data-portrait="1" data-title="${esc(s.title)}">${img(imageOf(s), fallbackOf(s), { lazy: false })}<span><strong>${esc(s.title)}</strong><span>Shorts ·${esc(placeOf(s))}</span></span></button>`;
    }
    function update() {
      const q = norm(input.value.trim());
      if (!q) { results.innerHTML = suggestions(); return; }
      const terms = q.split(/\s+/);
      const match = (it) => { const h = haystack(it); return terms.every((t) => h.includes(t)); };
      const a = ARTICLES.filter(match).slice(0, 6);
      const s = SHORTS.filter(match).slice(0, 4);
      if (!a.length && !s.length) { results.innerHTML = `<p class="search-empty">Tidak ada hasil untuk “${esc(input.value)}”.</p>`; return; }
      results.innerHTML = (a.length ? `<p class="search-group">Cerita</p>${a.map(articleItem).join('')}` : '') +
        (s.length ? `<p class="search-group">Video singkat</p>${s.map(shortItem).join('')}` : '') +
        `<div class="search-foot" style="border:0;padding:.9rem .6rem .3rem"><a href="${archiveUrl({ q: input.value.trim() })}">Lihat semua hasil →</a></div>`;
    }
    input.addEventListener('input', update);
    $('[data-close]', d).addEventListener('click', () => d.close());
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); if (e.target.closest('[data-video]')) d.close(); });
    function open() { input.value = ''; update(); d.showModal(); input.focus(); }
    document.addEventListener('click', (e) => { if (e.target.closest('[data-open-search]')) open(); });
    document.addEventListener('keydown', (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement.tagName);
      if (((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && !d.open) { e.preventDefault(); open(); }
    });
  }

  function renderVideoModal() {
    const d = document.createElement('dialog');
    d.className = 'video-modal';
    d.setAttribute('aria-label', 'Pemutar video');
    d.innerHTML = `
      <button class="icon-btn vm-close" type="button" aria-label="Tutup video">${I.close}</button>
      <div class="vm-inner"><div class="vm-frame"></div><div class="vm-caption"></div></div>`;
    document.body.appendChild(d);
    const frame = $('.vm-frame', d), caption = $('.vm-caption', d);
    const close = () => d.close();
    d.addEventListener('close', () => { frame.innerHTML = ''; });
    $('.vm-close', d).addEventListener('click', close);
    d.addEventListener('click', (e) => { if (e.target === d || e.target.classList.contains('vm-inner')) close(); });

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-video]');
      if (!t) return;
      e.preventDefault();
      const id = t.dataset.video, portrait = t.dataset.portrait === '1', title = t.dataset.title || '';
      frame.className = 'vm-frame ' + (portrait ? 'is-portrait' : 'is-landscape');
      const list = t.dataset.list || '';
      frame.innerHTML = iframe(id, title, list);
      const watch = portrait ? `https://www.youtube.com/shorts/${encodeURIComponent(id)}` : watchUrl(id, list);
      caption.innerHTML = `<strong>${esc(title)}</strong><a href="${watch}" target="_blank" rel="noopener">Buka di YouTube ↗</a>`;
      d.showModal();
    });
  }

  // inline players (facade -> iframe)
  document.addEventListener('click', (e) => {
    const f = e.target.closest('[data-inline-video]');
    if (!f) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = iframe(f.dataset.inlineVideo, f.getAttribute('aria-label'), f.dataset.list);
    f.replaceWith(wrap.firstElementChild);
  });

  // rails
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-rail]');
    if (!b) return;
    const rail = document.getElementById(b.dataset.rail);
    if (rail) rail.scrollBy({ left: Number(b.dataset.dir) * rail.clientWidth * 0.8, behavior: 'smooth' });
  });
  function bindRail(rail) {
    if (!rail) return;
    const btns = $$(`[data-rail="${rail.id}"]`);
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      btns.forEach((b) => { b.disabled = b.dataset.dir === '-1' ? rail.scrollLeft <= 2 : rail.scrollLeft >= max; });
    };
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // toast
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  }

  // reveal on scroll
  let io;
  function reveal(root = document) {
    const els = $$('.reveal:not(.in)', root);
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    io = io || new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -6% 0px' });
    els.forEach((el) => io.observe(el));
  }

  function setMeta(title, desc, image) {
    document.title = title;
    const set = (sel, v) => { const m = $(sel); if (m && v) m.setAttribute('content', v); };
    set('meta[name="description"]', desc);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', desc);
    set('meta[property="og:image"]', image);
  }

  /* =====================================================================
     PAGE: HOME
     ===================================================================== */
  /* ---------- hero slider ---------- */
  function heroSlides() {
    const list = (window.HERO || [])
      .map((h) => ({ ...h, a: ARTICLES.find((x) => x.slug === h.slug) }))
      .filter((s) => s.a);
    return list.length ? list : [{ a: ARTICLES[0] }];
  }

  // resolves the picture for a slide; portrait pictures get a framed layout
  function slidePicture(s) {
    const a = s.a;
    if (typeof s.image === 'string') return { src: s.image, fb: s.image, portrait: !!s.portrait, still: false, pillar: false };
    if (s.image) {
      return { src: yt(s.image.id, s.image.still), fb: yt(s.image.id, 'hqdefault'), portrait: /^oar/.test(s.image.still) || !!s.portrait, still: isStill(s.image.still), pillar: false };
    }
    const vertical = !!a.vertical && !a.image;
    return { src: imageOf(a), fb: fallbackOf(a), portrait: vertical, still: !vertical && isStill(a.still || 'maxres1', a.image), pillar: vertical };
  }

  function heroHtml(slides) {
    const n = slides.length;
    const slideHtml = slides.map((s, i) => {
      const a = s.a, p = slidePicture(s);
      const load = i === 0 ? { eager: true } : { lazy: false };
      const Tag = i === 0 ? 'h1' : 'h2';
      return `
        <div class="hero-slide${i === 0 ? ' is-active' : ''}${p.portrait ? ' is-portrait' : ''}${p.pillar ? ' is-pillar' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} dari ${n}: ${esc(s.label || a.title)}"${i ? ' aria-hidden="true" inert' : ''}>
          <div class="hero-media${p.still ? ' is-still' : ''}">${img(p.src, p.fb, { ...load, cls: 'hero-img' })}</div>
          ${p.portrait ? `<figure class="hero-portrait">${img(p.src, p.fb, { lazy: false })}</figure>` : ''}
          <div class="wrap hero-content">
            <div class="hero-inner">
              <span class="kicker kicker-dot">${esc(s.label || 'Pilihan editor')} · ${esc(placeOf(a))}</span>
              <${Tag} class="hero-title${a.title.length > 58 ? ' is-long' : ''}">${esc(a.title)}</${Tag}>
              <p class="hero-dek">${esc(a.excerpt)}</p>
              <div class="hero-meta"><span>${fmtDate(a.date)}</span><span>·</span><span>Video ${fmtMinutes(a.duration)}</span><span>·</span><span>${esc(catName(a.category))}</span></div>
              <div class="hero-actions">
                <a class="btn btn-light" href="${articleUrl(a)}">Baca cerita ${I.arrow}</a>
                <button class="btn btn-outline-light" type="button" data-video="${esc(a.id)}"${a.playlist ? ` data-list="${esc(a.playlist)}"` : ''} data-title="${esc(a.title)}">${I.play} Tonton video</button>
              </div>
            </div>
          </div>
        </div>`;
    }).join('');

    const nav = n > 1 ? `
      <div class="wrap hero-nav">
        <div class="hero-tabs" style="--n:${n}">
          ${slides.map((s, i) => `<button class="hero-tab${i === 0 ? ' is-active' : ''}" type="button" data-slide="${i}" aria-label="Slide ${i + 1}: ${esc(s.label || s.a.title)}"${i === 0 ? ' aria-current="true"' : ''}><span class="bar"></span><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="lbl">${esc(s.label || s.a.city || '')}</span></button>`).join('')}
        </div>
        <div class="hero-ctrl">
          <button class="hero-btn" type="button" data-hero="prev" aria-label="Slide sebelumnya">${I.left}</button>
          <button class="hero-btn" type="button" data-hero="pause" aria-label="Jeda slide" aria-pressed="false">
            <svg class="icon i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>${I.play.replace('class="icon"', 'class="icon i-play"')}
          </button>
          <button class="hero-btn" type="button" data-hero="next" aria-label="Slide berikutnya">${I.right}</button>
        </div>
      </div>` : '';

    return `<section class="hero" aria-roledescription="carousel" aria-label="Sorotan perjalanan">
      <div class="hero-slides">${slideHtml}</div>${nav}</section>`;
  }

  function bindHero(hero) {
    const slides = $$('.hero-slide', hero), tabs = $$('.hero-tab', hero);
    if (slides.length < 2) return;
    let current = 0, userPaused = false;
    const pauseBtn = $('[data-hero="pause"]', hero);

    function go(i) {
      i = (i + slides.length) % slides.length;
      if (i === current) return;
      [slides[current], slides[i]].forEach((s, k) => {
        s.classList.toggle('is-active', k === 1);
        if (k === 1) { s.removeAttribute('aria-hidden'); s.inert = false; } else { s.setAttribute('aria-hidden', 'true'); s.inert = true; }
      });
      tabs.forEach((t, k) => { t.classList.toggle('is-active', k === i); k === i ? t.setAttribute('aria-current', 'true') : t.removeAttribute('aria-current'); });
      current = i;
    }
    const setPaused = (p) => hero.classList.toggle('is-paused', p);

    // the active tab's progress bar is the timer: when it fills, advance
    tabs.forEach((t) => $('.bar', t).addEventListener('animationend', () => go(current + 1)));
    hero.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-slide]');
      if (tab) go(Number(tab.dataset.slide));
      const b = e.target.closest('[data-hero]');
      if (!b) return;
      if (b.dataset.hero === 'prev') go(current - 1);
      if (b.dataset.hero === 'next') go(current + 1);
      if (b.dataset.hero === 'pause') {
        userPaused = !userPaused;
        b.setAttribute('aria-pressed', String(userPaused));
        b.setAttribute('aria-label', userPaused ? 'Lanjutkan slide' : 'Jeda slide');
        hero.classList.toggle('is-stopped', userPaused);
        setPaused(userPaused);
      }
    });
    // pause while the visitor is reading or interacting
    hero.addEventListener('mouseenter', () => setPaused(true));
    hero.addEventListener('mouseleave', () => setPaused(userPaused));
    hero.addEventListener('focusin', () => setPaused(true));
    hero.addEventListener('focusout', (e) => { if (!hero.contains(e.relatedTarget)) setPaused(userPaused); });
    hero.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') go(current + 1);
      if (e.key === 'ArrowLeft') go(current - 1);
    });
    // swipe on touch screens
    let x0 = null;
    hero.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') x0 = e.clientX; });
    hero.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
    });
    if (pauseBtn && matchMedia('(prefers-reduced-motion: reduce)').matches) { userPaused = true; hero.classList.add('is-stopped'); setPaused(true); pauseBtn.setAttribute('aria-pressed', 'true'); }
  }

  function pageHome(main) {
    const slides = heroSlides();
    const heroArticles = slides.map((s) => s.a);
    const latest = ARTICLES.filter((a) => !heroArticles.includes(a)).slice(0, 5);
    const theme = ARTICLES.filter((a) => a.category === 'otomotif').slice(0, 4);
    const themeShorts = SHORTS.filter((s) => s.category === 'otomotif').slice(0, 8);
    const playlist = ARTICLES.slice(0, 6);
    const cities = new Set([...ARTICLES, ...SHORTS].filter((i) => i.country && i.city).map((i) => i.city));
    const collage = [SHORTS.find((s) => s.id === 'Baf9E1ri1wQ'), SHORTS.find((s) => s.id === 'iIHHy2HZvl4'), SHORTS.find((s) => s.id === 'Zuw_kMHmZSk')].filter(Boolean);

    main.innerHTML = `
      ${heroHtml(slides)}

      <section class="section" id="terbaru">
        <div class="wrap">
          <div class="section-head">
            <div><span class="kicker kicker-dot">Terbaru</span><h2 class="section-title">Cerita dari <em>perjalanan</em> terakhir</h2></div>
            <a class="link-arrow" href="cerita.html">Semua cerita ${I.arrow}</a>
          </div>
          <div class="latest">
            ${storyCard(latest[0], 'lead')}
            <div class="story-list">${latest.slice(1).map((a) => storyCard(a, 'row')).join('')}</div>
          </div>
        </div>
      </section>

      <section class="section section-alt" id="destinasi">
        <div class="wrap">
          <div class="section-head">
            <div><span class="kicker kicker-dot">Destinasi</span><h2 class="section-title">Jelajahi dunia, satu negara sekaligus</h2></div>
            <p class="lede">Pilih negara untuk membaca semua cerita dan menonton videonya.</p>
          </div>
          <div class="dest-grid${(Object.keys(COUNTRIES).length + 3) % 4 === 0 ? ' has-feature' : ''}">
            ${Object.entries(COUNTRIES).map(([k, c]) => `
              <a class="dest reveal" href="${archiveUrl({ d: k })}">
                ${img(yt(c.cover.id, c.cover.still), yt(c.cover.id, 'hqdefault'))}
                <span class="dest-arrow">${I.arrowUR}</span>
                <span class="dest-body">
                  <span class="dest-count">${countFor(k)} video</span>
                  <span class="dest-name">${esc(c.name)}</span>
                  <span class="dest-blurb">${esc(c.blurb)}</span>
                </span>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="section band-dark" id="otomotif">
        <div class="wrap theme">
          <div class="theme-intro">
            <span class="kicker kicker-dot">Tema pilihan</span>
            <h2 class="section-title">Roda dua, parka, dan <em>Union Jack</em></h2>
            <p class="lede">${esc(CATEGORIES.otomotif.blurb)}</p>
            <a class="btn btn-outline" href="${archiveUrl({ k: 'otomotif' })}">Semua cerita otomotif ${I.arrow}</a>
          </div>
          <div>
            <div class="theme-grid">${theme.map((a) => storyCard(a)).join('')}</div>
            ${themeShorts.length ? `
              <div class="section-head" style="margin:3.5rem 0 1.25rem">
                <span class="kicker">Juga di Shorts</span>${railControls('rail-theme')}
              </div>
              <div class="rail rail-sm" id="rail-theme">${themeShorts.map(shortCard).join('')}</div>` : ''}
          </div>
        </div>
      </section>

      <section class="section" id="shorts">
        <div class="wrap section-head">
          <div><span class="kicker kicker-dot">Video singkat</span><h2 class="section-title">Sekilas dari jalan</h2></div>
          <div class="section-head-side">
            <a class="link-arrow" href="${SITE.channelUrl}/shorts" target="_blank" rel="noopener">Semua Shorts ${I.arrowUR}</a>
            ${railControls('rail-shorts')}
          </div>
        </div>
        <div class="rail" id="rail-shorts">${SHORTS.slice(0, 16).map(shortCard).join('')}</div>
      </section>

      <section class="section band-dark" id="video">
        <div class="wrap">
          <div class="section-head">
            <div><span class="kicker kicker-dot">Tonton</span><h2 class="section-title">Video terbaru dari channel</h2></div>
            <a class="btn btn-yt" href="${SUB_URL}" target="_blank" rel="noopener">${I.yt} Subscribe</a>
          </div>
          <div class="watch">
            <div class="player">
              <div class="player-frame" id="player-frame">${facade(playlist[0])}</div>
              <div class="player-info" id="player-info"></div>
            </div>
            <div>
              <div class="playlist-head"><strong>Daftar putar</strong><span>${playlist.length} video</span></div>
              <div class="playlist" id="playlist">
                ${playlist.map((a, i) => `
                  <button class="pl-item" type="button" data-index="${i}" aria-current="${i === 0}">
                    ${media(a, { badge: true })}
                    <span><span class="pl-title">${esc(a.title)}</span><span class="pl-meta">${esc(placeOf(a))}</span></span>
                  </button>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="tentang">
        <div class="wrap about">
          <div class="collage reveal">${collage.map((s) => `<figure>${img(imageOf(s), fallbackOf(s))}</figure>`).join('')}</div>
          <div class="about-text">
            <span class="kicker kicker-dot">Tentang</span>
            <h2 class="section-title">Dokumentasi perjalanan, dari Flores sampai St Andrews</h2>
            <p>${esc(SITE.about)}</p>
            <div class="stats">
              <div class="stat"><div class="stat-num">${ARTICLES.length + SHORTS.length}</div><div class="stat-label">Video</div></div>
              <div class="stat"><div class="stat-num">${Object.keys(COUNTRIES).length}</div><div class="stat-label">Negara</div></div>
              <div class="stat"><div class="stat-num">${cities.size}</div><div class="stat-label">Kota</div></div>
            </div>
            <div class="chips">${SITE.topics.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
            <div class="about-actions">
              <a class="btn btn-dark" href="${SITE.channelUrl}" target="_blank" rel="noopener">${I.yt} Kunjungi channel</a>
              ${IG_URL ? `<a class="btn btn-outline" href="${IG_URL}" target="_blank" rel="noopener">${I.ig} ${esc(IG_HANDLE)}</a>` : ''}
            </div>
          </div>
        </div>
      </section>`;

    // playlist behaviour
    const frame = $('#player-frame'), info = $('#player-info');
    const showInfo = (a) => {
      info.innerHTML = `<div><span class="kicker">${esc(catName(a.category))} · ${esc(placeOf(a))}</span><h3 class="player-title">${esc(a.title)}</h3></div>
        <a class="btn btn-sm btn-outline" href="${articleUrl(a)}">Baca ceritanya ${I.arrow}</a>`;
    };
    showInfo(playlist[0]);
    $('#playlist').addEventListener('click', (e) => {
      const b = e.target.closest('.pl-item');
      if (!b) return;
      const a = playlist[Number(b.dataset.index)];
      $$('.pl-item').forEach((x) => x.setAttribute('aria-current', String(x === b)));
      frame.innerHTML = iframe(a.id, a.title, a.playlist);
      showInfo(a);
    });

    bindRail($('#rail-shorts'));
    bindRail($('#rail-theme'));
    bindHero($('.hero', main));
    setMeta(`${SITE.name} · Catatan Perjalanan & Video Travel`, `${SITE.tagline}. ${SITE.about}`, slidePicture(slides[0]).src);
  }

  /* =====================================================================
     PAGE: ARCHIVE (cerita.html)
     ===================================================================== */
  function pageArchive(main) {
    const params = new URLSearchParams(location.search);
    const state = {
      d: COUNTRIES[params.get('d')] ? params.get('d') : '',
      k: CATEGORIES[params.get('k')] ? params.get('k') : '',
      q: params.get('q') || '',
      s: params.get('s') === 'old' ? 'old' : 'new',
      limit: 9,
    };
    const c = COUNTRIES[state.d];
    let head;
    if (c) {
      const pic = (p, cls) => `<figure class="${cls}${isStill(p.still) ? ' is-still' : ''}">${img(yt(p.id, p.still), yt(p.id, 'hqdefault'), { eager: true })}</figure>`;
      const nA = ARTICLES.filter((i) => i.country === state.d).length;
      const nS = SHORTS.filter((i) => i.country === state.d).length;
      const cityList = [...new Set([...ARTICLES, ...SHORTS].filter((i) => i.country === state.d && i.city).map((i) => i.city))];
      head = `
      <section class="dest-head">
        <div class="wrap dest-head-grid">
          <div>
            <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Beranda</a><span class="sep">/</span><a href="index.html#destinasi">Destinasi</a><span class="sep">/</span><span>${esc(c.name)}</span></nav>
            <span class="kicker kicker-dot">Destinasi</span>
            <h1 class="page-title">${esc(c.name)}</h1>
            <p class="lede">${esc(c.blurb)}</p>
            <div class="chips">${cityList.map((city) => `<span class="chip">${esc(city)}</span>`).join('')}</div>
            <div class="dest-stats">
              ${nA ? `<div><strong>${nA}</strong><span>Cerita</span></div>` : ''}
              ${nS ? `<div><strong>${nS}</strong><span>Video singkat</span></div>` : ''}
              <div><strong>${cityList.length}</strong><span>Kota</span></div>
            </div>
          </div>
          <div class="dest-collage${c.banner ? '' : ' single'}">
            ${c.banner ? pic(c.banner, 'dc-main') : ''}${pic(c.cover, 'dc-side')}
          </div>
        </div>
      </section>`;
    } else head = `
      <header class="page-head">
        <div class="wrap">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Beranda</a><span class="sep">/</span><span>Cerita</span></nav>
          <span class="kicker kicker-dot">Arsip</span>
          <h1 class="page-title">Semua cerita</h1>
          <p class="lede">${ARTICLES.length} cerita perjalanan dari ${Object.keys(COUNTRIES).length} negara, masing-masing dengan videonya.</p>
        </div>
      </header>`;

    main.innerHTML = `${head}
      <div class="toolbar">
        <div class="wrap toolbar-inner">
          <div class="tabs" role="group" aria-label="Kategori">
            <button class="tab" type="button" data-k="">Semua</button>
            ${Object.entries(CATEGORIES).map(([k, cat]) => `<button class="tab" type="button" data-k="${k}">${esc(cat.name)}</button>`).join('')}
          </div>
          <div class="filters">
            <label class="field">${I.search}<span class="sr-only">Cari</span><input class="input" type="search" id="f-q" placeholder="Cari cerita…" value="${esc(state.q)}"></label>
            <label><span class="sr-only">Negara</span><select class="select" id="f-d">
              <option value="">Semua negara</option>
              ${Object.entries(COUNTRIES).map(([k, co]) => `<option value="${k}">${esc(co.name)}</option>`).join('')}
            </select></label>
            <label><span class="sr-only">Urutkan</span><select class="select" id="f-s"><option value="new">Terbaru</option><option value="old">Terlama</option></select></label>
          </div>
        </div>
      </div>
      <section class="wrap" style="padding-bottom:clamp(4rem,8vw,6rem)">
        <div class="result-bar" id="result-bar"></div>
        <div class="grid-3" id="grid"></div>
        <div class="load-more" id="more"></div>
      </section>
      <section class="section section-alt" id="shorts-section" hidden>
        <div class="wrap section-head">
          <div><span class="kicker kicker-dot">Video singkat</span><h2 class="section-title" id="shorts-title">Shorts</h2></div>
          ${railControls('rail-archive')}
        </div>
        <div class="rail" id="rail-archive"></div>
      </section>`;

    $('#f-d').value = state.d;
    $('#f-s').value = state.s;

    const filtered = () => {
      const terms = norm(state.q).split(/\s+/).filter(Boolean);
      const match = (it) => {
        const h = norm([it.title, it.city, countryName(it.country), catName(it.category), it.excerpt].join(' '));
        return (!state.d || it.country === state.d) && (!state.k || it.category === state.k) && terms.every((t) => h.includes(t));
      };
      const a = ARTICLES.filter(match);
      if (state.s === 'old') a.reverse();
      return { articles: a, shorts: SHORTS.filter(match) };
    };

    function syncUrl() {
      const p = { d: state.d, k: state.k, q: state.q.trim(), s: state.s === 'old' ? 'old' : '' };
      history.replaceState(null, '', archiveUrl(p));
    }

    function render() {
      $$('.tab').forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.k === state.k)));
      const { articles, shorts } = filtered();
      const active = [state.k && catName(state.k), state.d && !c && countryName(state.d), state.q && `“${state.q}”`].filter(Boolean);
      $('#result-bar').innerHTML = `<span>${articles.length} cerita${active.length ? ' · ' + esc(active.join(' · ')) : ''}</span>${active.length ? '<button type="button" id="reset">Hapus filter</button>' : ''}`;
      $('#grid').innerHTML = articles.length
        ? articles.slice(0, state.limit).map((a) => storyCard(a)).join('')
        : shorts.length && !state.k && !state.q
          ? `<div class="empty" style="grid-column:1/-1"><h2>Cerita tertulis segera hadir</h2><p>Sementara itu, tonton video singkatnya di bawah.</p></div>`
          : `<div class="empty" style="grid-column:1/-1"><h2>Belum ada cerita di sini</h2><p>Coba kata kunci lain atau hapus filter.</p></div>`;
      $('#more').innerHTML = articles.length > state.limit ? `<button class="btn btn-outline" type="button" id="more-btn">Tampilkan lebih banyak (${articles.length - state.limit})</button>` : '';
      const sec = $('#shorts-section');
      sec.hidden = !shorts.length;
      if (shorts.length) {
        $('#shorts-title').textContent = c ? `Sekilas dari ${c.name}` : 'Sekilas dari jalan';
        $('#rail-archive').innerHTML = shorts.slice(0, 20).map(shortCard).join('');
        $('#rail-archive').scrollLeft = 0;
        bindRail($('#rail-archive'));
      }
      reveal(main);
      syncUrl();
    }

    $('.tabs').addEventListener('click', (e) => { const t = e.target.closest('.tab'); if (!t) return; state.k = t.dataset.k; state.limit = 9; render(); });
    let qTimer;
    $('#f-q').addEventListener('input', (e) => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.q = e.target.value; state.limit = 9; render(); }, 160); });
    $('#f-d').addEventListener('change', (e) => {
      // destination pages have their own header: navigate so the banner matches
      location.href = archiveUrl({ d: e.target.value, k: state.k, q: state.q.trim(), s: state.s === 'old' ? 'old' : '' });
    });
    $('#f-s').addEventListener('change', (e) => { state.s = e.target.value; render(); });
    main.addEventListener('click', (e) => {
      if (e.target.id === 'more-btn') { state.limit += 9; render(); }
      if (e.target.id === 'reset') {
        if (c) { location.href = 'cerita.html'; return; }
        state.k = ''; state.q = ''; $('#f-q').value = ''; state.limit = 9; render();
      }
    });

    render();
    const title = c ? `${c.name} · Cerita Perjalanan` : 'Semua Cerita';
    setMeta(`${title} · ${SITE.name}`, c ? c.blurb : `${ARTICLES.length} cerita perjalanan dari ${Object.keys(COUNTRIES).length} negara.`, c ? yt(c.cover.id, c.cover.still) : imageOf(ARTICLES[0]));
  }

  /* =====================================================================
     PAGE: ARTICLE
     ===================================================================== */
  function renderBody(blocks) {
    return blocks.map((b) => {
      if (typeof b === 'string') return `<p>${esc(b)}</p>`;
      if (b.h) return `<h2>${esc(b.h)}</h2>`;
      if (b.list) return `<ul>${b.list.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`;
      if (b.quote) return `<blockquote>${esc(b.quote)}</blockquote>`;
      if (b.img) return `<figure><img src="${esc(b.img)}" alt="${esc(b.caption || '')}" loading="lazy">${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}</figure>`;
      return '';
    }).join('');
  }

  function pageArticle(main) {
    const slug = new URLSearchParams(location.search).get('a');
    const idx = ARTICLES.findIndex((a) => a.slug === slug);

    if (idx < 0) {
      main.innerHTML = `<div class="wrap empty" style="padding:8rem 0">
        <span class="kicker">404</span><h1 class="page-title">Cerita tidak ditemukan</h1>
        <p class="lede" style="margin:0 auto 2rem;max-width:30rem">Tautannya mungkin salah, atau cerita ini sudah dipindahkan.</p>
        <a class="btn btn-dark" href="cerita.html">Lihat semua cerita</a></div>`;
      setMeta(`Cerita tidak ditemukan · ${SITE.name}`);
      return;
    }

    const a = ARTICLES[idx];
    const newer = ARTICLES[idx - 1], older = ARTICLES[idx + 1];
    let related = ARTICLES.filter((x) => x !== a && a.country && x.country === a.country);
    const sameCountry = related.length >= 3;
    if (!sameCountry) related = related.concat(ARTICLES.filter((x) => x !== a && !related.includes(x) && x.category === a.category));
    related = related.slice(0, 3);
    const nearShorts = a.country ? SHORTS.filter((s) => s.country === a.country).slice(0, 12) : [];
    const url = location.href;
    const ytUrl = watchUrl(a.id, a.playlist);
    const shareText = encodeURIComponent(`${a.title} — ${SITE.name}`);

    const crumbs = [`<a href="index.html">Beranda</a>`];
    if (a.country) crumbs.push(`<a href="${archiveUrl({ d: a.country })}">${esc(countryName(a.country))}</a>`);
    if (a.city) crumbs.push(`<span>${esc(a.city)}</span>`);

    const facts = [
      a.country && ['Negara', `<a href="${archiveUrl({ d: a.country })}">${esc(countryName(a.country))}</a>`],
      a.city && ['Lokasi', esc(a.city)],
      ['Kategori', `<a href="${archiveUrl({ k: a.category })}">${esc(catName(a.category))}</a>`],
      a.duration && ['Durasi video', fmtClock(a.duration)],
      ['Tayang', fmtDate(a.date)],
    ].filter(Boolean);

    main.innerHTML = `
      <div class="progress" id="progress"></div>
      <article>
        <header class="article-head wrap">
          <nav class="crumbs" aria-label="Breadcrumb">${crumbs.join('<span class="sep">/</span>')}</nav>
          <a class="kicker" href="${archiveUrl({ k: a.category })}">${esc(catName(a.category))}</a>
          <h1 class="article-title">${esc(a.title)}</h1>
          <p class="article-dek">${esc(a.excerpt)}</p>
          <div class="byline">
            <span class="avatar" aria-hidden="true">DM</span>
            <span class="byline-text"><strong>${esc(SITE.name)}</strong><time datetime="${a.date}">${fmtDate(a.date)}</time>${a.duration ? ` · Video ${fmtMinutes(a.duration)}` : ''}</span>
          </div>
        </header>

        <div class="article-media"><div class="player-frame">${facade(a)}</div></div>

        <div class="article-layout">
          <div class="prose">
            ${a.body && a.body.length ? renderBody(a.body) : `<div class="prose-note"><strong>Catatan perjalanan lengkap sedang ditulis.</strong> Sementara itu, tonton videonya di atas untuk mengikuti ceritanya.</div>`}
          </div>
          <aside>
            <div class="aside-card">
              <h2>Detail perjalanan</h2>
              <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
              <a class="btn btn-yt btn-block" href="${ytUrl}" target="_blank" rel="noopener">${I.yt} Tonton di YouTube</a>
              ${a.playlist ? `<a class="btn btn-dark btn-block" style="margin-top:.6rem" href="https://www.youtube.com/playlist?list=${encodeURIComponent(a.playlist)}" target="_blank" rel="noopener">${I.menu} Tonton playlist lengkap</a>` : ''}
              ${IG_URL ? `<a class="btn btn-outline btn-block" style="margin-top:.6rem" href="${IG_URL}" target="_blank" rel="noopener">${I.ig} Ikuti di Instagram</a>` : ''}
              <div class="share">
                <h2>Bagikan</h2>
                <div class="share-row">
                  <a href="https://wa.me/?text=${shareText}%20${encodeURIComponent(url)}" target="_blank" rel="noopener" aria-label="Bagikan ke WhatsApp">${I.wa}</a>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" rel="noopener" aria-label="Bagikan ke Facebook">${I.fb}</a>
                  <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}" target="_blank" rel="noopener" aria-label="Bagikan ke X">${I.x}</a>
                  <button type="button" id="copy-link" aria-label="Salin tautan">${I.link}</button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer class="article-foot">
          <div class="tags">
            ${a.country ? `<a class="chip" href="${archiveUrl({ d: a.country })}">${esc(countryName(a.country))}</a>` : ''}
            <a class="chip" href="${archiveUrl({ k: a.category })}">${esc(catName(a.category))}</a>
            ${a.city ? `<span class="chip">${esc(a.city)}</span>` : ''}
          </div>
          <nav class="pager" aria-label="Cerita lain">
            ${older ? `<a class="prev" href="${articleUrl(older)}">${media(older)}<span><small>← Sebelumnya</small><strong>${esc(older.title)}</strong></span></a>` : '<span></span>'}
            ${newer ? `<a class="next" href="${articleUrl(newer)}">${media(newer)}<span><small>Berikutnya →</small><strong>${esc(newer.title)}</strong></span></a>` : ''}
          </nav>
        </footer>
      </article>

      ${related.length ? `
      <section class="section section-alt" style="margin-top:clamp(3rem,6vw,5rem)">
        <div class="wrap">
          <div class="section-head">
            <div><span class="kicker kicker-dot">Baca juga</span><h2 class="section-title">${sameCountry ? `Cerita lain dari ${esc(countryName(a.country))}` : 'Cerita lain yang mungkin Anda suka'}</h2></div>
            <a class="link-arrow" href="${sameCountry ? archiveUrl({ d: a.country }) : archiveUrl({ k: a.category })}">${sameCountry ? `Semua cerita ${esc(countryName(a.country))}` : `Semua ${esc(catName(a.category))}`} ${I.arrow}</a>
          </div>
          <div class="grid-3">${related.map((r) => storyCard(r)).join('')}</div>
        </div>
      </section>` : ''}

      ${nearShorts.length ? `
      <section class="section">
        <div class="wrap section-head">
          <div><span class="kicker kicker-dot">Video singkat</span><h2 class="section-title">Sekilas dari ${esc(countryName(a.country))}</h2></div>
          ${railControls('rail-near')}
        </div>
        <div class="rail" id="rail-near">${nearShorts.map(shortCard).join('')}</div>
      </section>` : ''}`;

    $('#copy-link').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(url); toast('Tautan disalin'); }
      catch (e) { toast('Tidak bisa menyalin tautan'); }
    });

    const bar = $('#progress'), art = $('article', main);
    const onScroll = () => {
      const r = art.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    bindRail($('#rail-near'));
    setMeta(`${a.title} · ${SITE.name}`, a.excerpt, imageOf(a));
  }

  /* =====================================================================
     BOOT
     ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    const main = $('#main');
    renderHeader(page === 'home');
    renderFooter();
    renderDrawer();
    renderSearch();
    renderVideoModal();
    if (page === 'home') pageHome(main);
    if (page === 'archive') pageArchive(main);
    if (page === 'article') pageArticle(main);
    reveal();
  });
})();
