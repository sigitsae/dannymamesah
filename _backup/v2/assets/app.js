(function () {
  'use strict';

  const SITE = window.SITE;
  const REGIONS = window.REGIONS;
  const ARTICLES = window.ARTICLES.slice().sort((a, b) => b.date.localeCompare(a.date));

  /* ---------- helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const thumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  const thumbFallback = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const fmtDate = (iso) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const articleUrl = (a) => `article.html?a=${encodeURIComponent(a.slug)}`;
  const regionLabel = (a) => (REGIONS[a.region] && REGIONS[a.region].label) || '';

  const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_YT = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg>';

  // Thumbnail with graceful fallback if maxres is missing
  function img(id, alt, eager) {
    return `<img src="${thumb(id)}" alt="${esc(alt)}" ${eager ? '' : 'loading="lazy"'} decoding="async" onerror="this.onerror=null;this.src='${thumbFallback(id)}'">`;
  }

  /* ---------- shared: nav, footer year, reveal ---------- */
  function initChrome() {
    const toggle = $('.nav-toggle');
    const links = $('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      links.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  let io;
  function observeReveal(root = document) {
    const items = $$('.reveal:not(.in)', root);
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('in')); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- video facade (loads iframe on click) ---------- */
  function videoFacade(id, title) {
    return `<button class="video-facade" type="button" data-video="${esc(id)}" aria-label="Putar video: ${esc(title)}">
      ${img(id, title, true)}<span class="play">${ICON_PLAY}</span></button>`;
  }
  function bindFacades(root = document) {
    $$('.video-facade', root).forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.video;
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
        frame.title = btn.getAttribute('aria-label').replace('Putar video: ', '');
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        frame.allowFullscreen = true;
        btn.replaceWith(frame);
      }, { once: true });
    });
  }

  /* ---------- card ---------- */
  function card(a) {
    return `<a class="card reveal" href="${articleUrl(a)}">
      <div class="card-thumb">${img(a.id, a.title)}<span class="play">${ICON_PLAY}</span></div>
      <div class="card-body">
        <div class="card-meta"><span class="tag">${esc(a.category)}</span><span>${esc(regionLabel(a))}</span><span>·</span><time datetime="${a.date}">${fmtDate(a.date)}</time></div>
        <h3 class="card-title">${esc(a.title)}</h3>
        <p class="card-excerpt">${esc(a.excerpt)}</p>
        <span class="card-more">Baca &amp; tonton →</span>
      </div>
    </a>`;
  }

  /* ============ HOME ============ */
  function initHome() {
    const latest = ARTICLES[0];

    // hero card
    $('#hero-card').innerHTML = `
      <a class="hero-card" href="${articleUrl(latest)}">
        <div class="hero-card-img">${img(latest.id, latest.title, true)}</div>
        <span class="play">${ICON_PLAY}</span>
        <div class="hero-card-body">
          <span class="tag">Terbaru · ${esc(latest.category)}</span>
          <h2 class="hero-card-title">${esc(latest.title)}</h2>
          <div class="hero-card-meta">${esc(regionLabel(latest))} · ${fmtDate(latest.date)}</div>
        </div>
      </a>`;

    // marquee of places
    const places = Object.values(REGIONS).map((r) => r.places).filter(Boolean).join(' & ').split(/\s*&\s*/);
    const row = places.map((p) => `<span>${esc(p)}</span>`).join('');
    $('#marquee').innerHTML = `<div class="marquee-track" aria-hidden="true">${row.repeat(4)}</div>`;

    // routes
    const regionKeys = ['uea', 'amerika', 'inggris', 'skotlandia'];
    // landscape (non-Shorts) thumbnail used as each route's cover
    const covers = { uea: '6wctwf3QuKw', amerika: 'FsMv1sCmmRk', inggris: 'WeMu4cvsrJA', skotlandia: '-Hg09FwQbS4' };
    $('#routes').innerHTML = regionKeys.map((k) => {
      const list = ARTICLES.filter((a) => a.region === k);
      const r = REGIONS[k];
      return `<button class="route reveal" type="button" data-region="${k}">
        ${img(covers[k], r.label)}
        <div class="route-body">
          <div class="route-count">${list.length} cerita</div>
          <div class="route-name">${esc(r.label)}</div>
          <div class="route-places">${esc(r.places)}</div>
          <div class="route-blurb">${esc(r.blurb)}</div>
        </div></button>`;
    }).join('');

    // filters
    const categories = ['Semua'].concat(Array.from(new Set(ARTICLES.map((a) => a.category))));
    const state = { cat: 'Semua', region: null };
    const filters = $('#filters');
    const grid = $('#article-grid');

    function renderFilters() {
      let html = categories.map((c) => `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${state.cat === c}">${esc(c)}</button>`).join('');
      if (state.region) {
        html += `<button class="chip" type="button" data-clear="1" aria-pressed="true">${esc(REGIONS[state.region].label)} ✕</button>`;
      }
      filters.innerHTML = html;
    }
    function renderGrid() {
      const list = ARTICLES.filter((a) =>
        (state.cat === 'Semua' || a.category === state.cat) && (!state.region || a.region === state.region));
      grid.innerHTML = list.length ? list.map(card).join('') : '<p class="empty" style="grid-column:1/-1">Belum ada cerita untuk filter ini.</p>';
      observeReveal(grid);
    }
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      if (btn.dataset.clear) state.region = null;
      else state.cat = btn.dataset.cat;
      renderFilters(); renderGrid();
    });
    $('#routes').addEventListener('click', (e) => {
      const btn = e.target.closest('.route');
      if (!btn) return;
      state.region = btn.dataset.region;
      state.cat = 'Semua';
      renderFilters(); renderGrid();
      $('#cerita').scrollIntoView({ behavior: 'smooth' });
    });
    renderFilters(); renderGrid();

    // youtube band
    $('#yt-video').innerHTML = `<div class="video-wrap">${videoFacade(latest.id, latest.title)}</div>`;
    bindFacades($('#yt-video'));

    // about
    $('#topics').innerHTML = SITE.topics.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    $('#about-text').textContent = SITE.about;

    // og image
    const og = $('meta[property="og:image"]');
    if (og) og.content = thumb(latest.id);
  }

  /* ============ ARTICLE ============ */
  function initArticle() {
    const slug = new URLSearchParams(location.search).get('a');
    const idx = ARTICLES.findIndex((a) => a.slug === slug);
    const root = $('#article-root');

    if (idx < 0) {
      document.title = 'Artikel tidak ditemukan — ' + SITE.name;
      root.innerHTML = `<div class="wrap-narrow" style="padding:6rem 0;text-align:center">
        <p class="eyebrow">404</p><h1 class="h-section" style="margin:1rem 0">Artikel tidak ditemukan</h1>
        <p class="lead" style="margin:0 auto 2rem">Mungkin tautannya salah atau artikelnya sudah dipindahkan.</p>
        <a class="btn btn-primary" href="index.html#cerita">Lihat semua cerita</a></div>`;
      return;
    }

    const a = ARTICLES[idx];
    const newer = ARTICLES[idx - 1];
    const older = ARTICLES[idx + 1];
    const related = ARTICLES.filter((x) => x.slug !== a.slug && x.region === a.region).slice(0, 3);
    const ytLink = `https://www.youtube.com/watch?v=${encodeURIComponent(a.id)}`;

    document.title = `${a.title} — ${SITE.name}`;
    const setMeta = (sel, val) => { const m = $(sel); if (m) m.content = val; };
    setMeta('meta[name="description"]', a.excerpt);
    setMeta('meta[property="og:title"]', a.title);
    setMeta('meta[property="og:description"]', a.excerpt);
    setMeta('meta[property="og:image"]', thumb(a.id));

    root.innerHTML = `
      <header class="article-head wrap-narrow">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Beranda</a> / <a href="index.html#cerita">Cerita</a> / ${esc(regionLabel(a))}</nav>
        <span class="tag">${esc(a.category)}</span>
        <h1>${esc(a.title)}</h1>
        <div class="article-meta">
          <span>${esc(regionLabel(a))}</span><span>·</span>
          <time datetime="${a.date}">${fmtDate(a.date)}</time><span>·</span>
          <span>oleh Danny Mamesah</span>
        </div>
      </header>
      <div class="article-video"><div class="video-wrap">${videoFacade(a.id, a.title)}</div></div>
      <div class="article-body wrap-narrow">
        ${a.body.map((p) => `<p>${esc(p)}</p>`).join('')}
        <div class="article-cta">
          <div><strong>Suka ceritanya?</strong><span>Tonton video lengkap dan video lainnya di YouTube.</span></div>
          <a class="btn btn-primary" href="${ytLink}" target="_blank" rel="noopener">${ICON_YT} Buka di YouTube</a>
        </div>
        <nav class="pager" aria-label="Artikel lain">
          ${older ? `<a class="prev" href="${articleUrl(older)}"><small>← Sebelumnya</small><strong>${esc(older.title)}</strong></a>` : '<span></span>'}
          ${newer ? `<a class="next" href="${articleUrl(newer)}"><small>Berikutnya →</small><strong>${esc(newer.title)}</strong></a>` : ''}
        </nav>
      </div>
      ${related.length ? `<section class="wrap" style="padding-top:2rem">
        <div class="section-head"><div><p class="eyebrow">Masih di ${esc(regionLabel(a))}</p><h2 class="h-section">Cerita terkait</h2></div></div>
        <div class="grid">${related.map(card).join('')}</div></section>` : ''}`;

    bindFacades(root);
    observeReveal(root);
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initChrome();
    const page = document.body.dataset.page;
    if (page === 'home') initHome();
    if (page === 'article') initArticle();
    observeReveal();
  });
})();
