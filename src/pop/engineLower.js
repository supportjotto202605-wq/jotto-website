/* eslint-disable */
// @ts-nocheck
// 下層ページの動き(てんとう虫の線・表示アニメ・メニュー・お問い合わせフォーム)
export function bootLower(root) {
    var self = {};
    root.classList.add('js');
    var doc = root.querySelector('.doc'), ln = root.querySelector('.ln');
    var W = 0, H = 0, st = 0, maxS = 1, docH = 0;
    var motion = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!motion) root.classList.add('nomo');

    /* ---- 画面に入ったら表示 ---- */
    var ios = root.querySelectorAll('.io');
    if ('IntersectionObserver' in window) {
      self._io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); self._io.unobserve(e.target); } });
      }, { root: null, threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      ios.forEach(function (el) { self._io.observe(el); });
    } else { ios.forEach(function (el) { el.classList.add('in'); }); }

    /* ---- てんとう虫の線(スクロールに合わせて進む) ---- */
    var NS = 'http://www.w3.org/2000/svg';
    var pd = ln.querySelectorAll('.ln-d'), pt = ln.querySelectorAll('.ln-t'), pm = ln.querySelector('.ln-m'), mask = ln.querySelector('mask'), clip = ln.querySelector('clipPath');
    var bugG = ln.querySelector('.ln-b'), bugU = bugG.querySelector('use'), probe = ln.querySelector('.ln-p');
    var LEN = 0, YS = [], STEP = 6, LITS = [], RZ = [], cur = 0, ang = 25, last = 0, landS = 22;
    function pos(el) { var x = 0, y = 0, e = el; while (e && e !== doc) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; } return { x: x, y: y, w: el.offsetWidth, h: el.offsetHeight }; }
    function seg(p0, p1, p2, p3) {
      return 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    function build() {
      W = doc.offsetWidth; H = window.innerHeight; docH = doc.scrollHeight; maxS = Math.max(1, docH - H);
      ln.setAttribute('viewBox', '0 0 ' + W + ' ' + docH); ln.style.height = docH + 'px';
      mask.setAttribute('x', 0); mask.setAttribute('y', 0); mask.setAttribute('width', W); mask.setAttribute('height', docH);
      var els = Array.prototype.slice.call(doc.querySelectorAll('[data-a]')).filter(function (e) { return e.offsetParent !== null; });
      var pts = els.map(function (e) {
        var q = pos(e), ax = e.getAttribute('data-ax'), ay = e.getAttribute('data-ay');
        return [q.x + q.w * (ax == null ? .5 : +ax), q.y + q.h * (ay == null ? .5 : +ay)];
      });
      if (pts.length < 2) return;
      var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1), n = pts.length, i;
      var was = LITS.filter(function (l) { return l.on; }).map(function (l) { return l.el; });
      LITS = [];
      for (i = 0; i < n - 1; i++) {
        d += seg(pts[Math.max(i - 1, 0)], pts[i], pts[i + 1], pts[Math.min(i + 2, n - 1)]);
        var le = els[i + 1];
        if (le.hasAttribute('data-lit')) { probe.setAttribute('d', d); var t = le.closest('[data-lt]') || le; LITS.push({ el: t, l: probe.getTotalLength(), on: was.indexOf(t) >= 0 }); }
      }
      Array.prototype.forEach.call(pd, function (p) { p.setAttribute('d', d); });
      Array.prototype.forEach.call(pt, function (p) { p.setAttribute('d', d); });
      pm.setAttribute('d', d);
      var old = LEN ? cur / LEN : 0;
      LEN = pm.getTotalLength(); cur = old * LEN;
      YS = []; var m = -1e9;
      for (i = 0; i * STEP <= LEN; i++) { var y = pm.getPointAtLength(i * STEP).y; if (y > m) m = y; YS.push(m); }
      pm.setAttribute('stroke-dasharray', LEN + ' ' + (LEN + 40));
      while (clip.firstChild) clip.removeChild(clip.firstChild);
      RZ = [];
      Array.prototype.forEach.call(doc.querySelectorAll('[data-th="r"]'), function (z) {
        var q = pos(z), r = document.createElementNS(NS, 'rect');
        r.setAttribute('x', 0); r.setAttribute('y', q.y + 56); r.setAttribute('width', W); r.setAttribute('height', Math.max(0, q.h - 56));
        clip.appendChild(r); RZ.push([q.y + 56, q.y + q.h]);
      });
      var lg = doc.querySelector('.ft-lg'); if (lg) landS = lg.offsetWidth / 500 * 32 * .8;
    }
    function target() {
      var pr = Math.min(1, st / maxS), ref = st + H * (.6 + .4 * pr * pr * pr);
      var lo = 0, hi = YS.length - 1;
      if (!YS.length || YS[0] >= ref) return 0;
      if (YS[hi] <= ref) return LEN;
      while (hi - lo > 1) { var md = (lo + hi) >> 1; if (YS[md] < ref) lo = md; else hi = md; }
      return hi * STEP;
    }
    function loop(now) {
      if (self._dead) return;
      self._raf = requestAnimationFrame(loop);
      var dt = Math.min(.1, (now - (last || now)) / 1000); last = now;
      if (self._tick) self._tick(now / 1000);
      if (!LEN) return;
      var tg = target(), k = motion ? 1 - Math.exp(-dt * 5.5) : 1;
      cur += (tg - cur) * k; if (Math.abs(tg - cur) < .3) cur = tg;
      pm.setAttribute('stroke-dashoffset', LEN - cur);
      var tl = Math.min(110, cur);
      Array.prototype.forEach.call(pt, function (p) { p.setAttribute('stroke-dasharray', tl + ' ' + (LEN + 200)); p.setAttribute('stroke-dashoffset', -(cur - tl)); });
      var p1 = pm.getPointAtLength(cur), p0 = pm.getPointAtLength(Math.max(0, cur - 3));
      var end = cur >= LEN - 1.5, ta = (end || cur < 2) ? 25 : Math.atan2(p1.y - p0.y, p1.x - p0.x) * 57.2958 + 90;
      var da = ta - ang; while (da > 180) da -= 360; while (da < -180) da += 360; ang += da * (motion ? Math.min(1, dt * 9) : 1);
      var near = Math.max(0, 1 - (LEN - cur) / 240), sz = 34 + (landS - 34) * near, red = false;
      for (var q = 0; q < RZ.length; q++) if (p1.y >= RZ[q][0] && p1.y < RZ[q][1]) red = true;
      bugU.setAttribute('href', red ? '#jbugw' : '#jbug');
      bugG.setAttribute('transform', 'translate(' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ') scale(' + (sz / 34).toFixed(3) + ')');
      var landed = end && Math.abs(da) < 2;
      if (landed !== self._ld) { self._ld = landed; root.classList.toggle('landed', landed); bugG.style.opacity = landed ? 0 : 1; }
      for (q = 0; q < LITS.length; q++) { var li = LITS[q]; if (!li.on && cur >= li.l - 2) { li.on = true; li.el.classList.add('lit'); } }
    }
    function onScroll() {
      st = window.scrollY || 0;
      root.style.setProperty('--pg', (Math.min(1, st / maxS) * 100).toFixed(2) + '%');
      root.classList.toggle('scd', st > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    var rbT = 0;
    function rebuild() { clearTimeout(rbT); rbT = setTimeout(function () { build(); onScroll(); }, 60); }
    if ('ResizeObserver' in window) { self._ro = new ResizeObserver(rebuild); self._ro.observe(doc); }
    window.addEventListener('resize', rebuild);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(rebuild);
    build(); onScroll();
    self._rebuild = rebuild;

    /* ---- メニュー・動きの切り替え ---- */
    root.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-act]') : null; if (!b || !root.contains(b)) return;
      var a = b.getAttribute('data-act');
      if (a === 'menu') root.classList.toggle('mop');
      else if (a === 'motion') {
        motion = !motion; root.classList.toggle('nomo', !motion); b.setAttribute('aria-pressed', motion ? 'true' : 'false');
        var ml = b.querySelector('[data-mlabel]'); if (ml) ml.textContent = motion ? '動きを止める' : '動きを再開する';
      } else if (self._act) self._act(a, b, e);
    });
    root.addEventListener('click', function (e) {
      var g = e.target.closest ? e.target.closest('a[href^="#"]') : null; if (!g || !root.contains(g)) return;
      e.preventDefault(); root.classList.remove('mop');
      if (g.getAttribute('href') === '#top') window.scrollTo({ top: 0, behavior: motion ? 'smooth' : 'auto' });
    });

    /* ---- 見出し横の模様(ドットの波) ---- */
    var pa = root.querySelector('.pa'), pc = pa ? pa.getContext('2d') : null;
    self._tick = function (t) {
      if (!pc) return;
      var w = pa.clientWidth, h = pa.clientHeight, dp = Math.min(2, window.devicePixelRatio || 1);
      if (pa.width !== Math.round(w * dp)) { pa.width = Math.round(w * dp); pa.height = Math.round(h * dp); }
      pc.setTransform(dp, 0, 0, dp, 0, 0); pc.clearRect(0, 0, w, h);
      var K = +pa.getAttribute('data-art'), tt = motion ? t : 2, i, j;
      if (K === 1) {
        var cols = 8, g1 = w / (cols + 1.5);
        for (i = 0; i < cols; i++) {
          var rows = 3 + Math.round(5 * Math.abs(Math.sin(i * 1.7 + .6))), bw = g1 * .74, x0 = g1 * (i + .9);
          pc.fillStyle = 'rgba(10,10,10,.16)'; pc.fillRect(x0, h - 26 - rows * g1 * .62, bw, rows * g1 * .62);
          for (j = 0; j < rows; j++) for (var c2 = 0; c2 < 2; c2++) {
            var on = Math.sin(tt * .9 + i * 2.1 + j * 1.3 + c2 * 4) > -.1;
            pc.fillStyle = on ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.22)';
            pc.fillRect(x0 + bw * (.16 + c2 * .46), h - 26 - (j + .78) * g1 * .62, bw * .24, g1 * .3);
          }
        }
      } else if (K === 2) {
        pc.lineWidth = 2;
        for (i = 0; i < 12; i++) {
          pc.strokeStyle = i === 7 ? 'rgba(10,10,10,.9)' : 'rgba(255,255,255,' + (.25 + i * .06) + ')'; pc.beginPath();
          for (var x2 = -10; x2 <= w + 10; x2 += 8) {
            var y2 = h * (.3 + i * .05) + Math.sin(x2 * .013 + tt * .9 + i * .55) * (10 + i * 2.2) + Math.sin(x2 * .031 - tt * .6 + i) * 6;
            x2 === -10 ? pc.moveTo(x2, y2) : pc.lineTo(x2, y2);
          }
          pc.stroke();
        }
      } else if (K === 3) {
        var N = [], m = 10;
        for (i = 0; i < m; i++) { var rr = .2 + .17 * Math.sin(i * 2.3 + tt * .3), aa = i * .628 + tt * .18; N.push([w * (.52 + rr * Math.cos(aa)), h * (.56 + rr * 1.05 * Math.sin(aa))]); }
        pc.lineWidth = 1.5;
        for (i = 0; i < m; i++) for (j = i + 1; j < m; j++) {
          var dd = Math.hypot(N[i][0] - N[j][0], N[i][1] - N[j][1]); if (dd > w * .42) continue;
          pc.strokeStyle = 'rgba(255,255,255,' + (.75 * (1 - dd / (w * .42))) + ')'; pc.beginPath(); pc.moveTo(N[i][0], N[i][1]); pc.lineTo(N[j][0], N[j][1]); pc.stroke();
        }
        for (i = 0; i < m; i++) { pc.fillStyle = i % 4 === 0 ? '#0a0a0a' : '#fff'; pc.beginPath(); pc.arc(N[i][0], N[i][1], i % 4 === 0 ? 9 : 6, 0, 6.283); pc.fill(); }
      } else {
      var n = 13, g = w / (n + 1);
      for (i = 0; i < n; i++) for (j = 0; j < n; j++) {
        var x = g * (i + 1), y = h - g * (j + .8), v = Math.sin(i * .55 + tt * 1.1) + Math.cos(j * .6 - tt * .8) + Math.sin((i + j) * .35 + tt * .5);
        var a = Math.max(0, (v + 1.2) / 4.2) * Math.max(0, 1 - Math.hypot(i - 9, j - 4) / 10.5), s = g * (.3 + .5 * a);
        if (a < .04) continue;
        pc.fillStyle = (i * 7 + j * 3) % 23 === 0 ? 'rgba(10,10,10,' + Math.min(1, a * 2.2) + ')' : 'rgba(255,255,255,' + Math.min(1, a * 1.5) + ')';
        var r = s * .28; pc.beginPath(); pc.roundRect ? pc.roundRect(x - s / 2, y - s / 2, s, s, r) : pc.rect(x - s / 2, y - s / 2, s, s); pc.fill();
      }
      }
    };

    /* ---- フォーム(入力 → 確認 → 完了。見本のため実際の送信はしません) ---- */
    var fw = root.querySelector('.fw'), kind = 'general', lastRows = [], sending = false, ctToken = '';
    if (fw) {
    /* 迷惑送信対策:フォームを開いた時点で送信用トークンを受け取る */
    function getToken() { return fetch('/api/contact', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) { ctToken = (j && j.token) || ''; }).catch(function () {}); }
    getToken();
    /* ボット判定(Cloudflare Turnstile)。サイトキーが設定されているときだけ、確認画面に表示する */
    var tsBox = fw.querySelector('[data-ts]'), tsKey = tsBox ? tsBox.getAttribute('data-ts-key') : '', tsToken = '', tsId = null;
    function tsRender() {
      if (!tsKey || tsId !== null || !window.turnstile) return;
      tsId = window.turnstile.render(tsBox, { sitekey: tsKey, language: 'ja', theme: 'light',
        callback: function (t) { tsToken = t; var e3 = fw.querySelector('[data-em3]'); if (e3) e3.hidden = true; },
        'expired-callback': function () { tsToken = ''; }, 'error-callback': function () { tsToken = ''; } });
    }
    function tsLoad() {
      if (!tsKey) return;
      if (window.turnstile) { tsRender(); return; }
      if (document.querySelector('script[data-ts-script]')) return;
      var sc = document.createElement('script'); sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; sc.async = true; sc.defer = true;
      sc.setAttribute('data-ts-script', ''); sc.onload = function () { tsRender(); self._rebuild(); }; document.head.appendChild(sc);
    }
    function tsReset() { tsToken = ''; if (tsId !== null && window.turnstile) { try { window.turnstile.reset(tsId); } catch (e) {} } }
    function vis(el) { return el.offsetParent !== null; }
    function setKind(k) {
      kind = k;
      Array.prototype.forEach.call(fw.querySelectorAll('[data-k]'), function (b) { b.classList.toggle('on', b.getAttribute('data-k') === k); });
      Array.prototype.forEach.call(fw.querySelectorAll('[data-for]'), function (r) { r.hidden = r.getAttribute('data-for').split(' ').indexOf(k) < 0; });
    }
    function step(n) {
      fw.setAttribute('data-step', n);
      Array.prototype.forEach.call(fw.querySelectorAll('[data-v]'), function (v) { v.hidden = v.getAttribute('data-v') !== String(n); });
      window.scrollTo({ top: Math.max(0, pos(fw).y - 130), behavior: motion ? 'smooth' : 'auto' });
      if (String(n) === '2') tsLoad();
      self._rebuild();
    }
    setKind('general');
    /* 事業ページ・採用ページから来たときは、あらかじめ選んでおく */
    try {
      var qs = new URLSearchParams(window.location.search), qk = qs.get('kind'), qsv = qs.get('service'), qp = qs.get('position');
      if (qk === 'partner' || qk === 'apply') setKind(qk);
      if (qsv) { var chp = fw.querySelector('.chips [data-s="' + qsv.replace(/[^a-z-]/g, '') + '"]'); if (chp) chp.classList.add('on'); }
      if (qp) { var sel = fw.querySelector('#f-pos'); if (sel) Array.prototype.forEach.call(sel.options, function (o) { if (o.value === qp || o.text === qp) sel.value = o.value; }); }
    } catch (e) {}
    fw.addEventListener('input', function (e) { var r = e.target.closest('.fr'); if (r) r.classList.remove('err'); });
    self._act = function (a, b) {
      if (a === 'kind') { setKind(b.getAttribute('data-k')); self._rebuild(); }
      else if (a === 'chip') b.classList.toggle('on');
      else if (a === 'back') step(1);
      else if (a === 'send') {
        if (sending) return;
        var em2 = fw.querySelector('[data-em2]'), em3 = fw.querySelector('[data-em3]'); em2.hidden = true; em3.hidden = true;
        if (tsKey && !tsToken) { em3.hidden = false; tsLoad(); self._rebuild(); return; }
        sending = true; b.disabled = true;
        var data = {}; lastRows.forEach(function (rw) { data[rw[0]] = rw[1]; if (rw[0] === 'メールアドレス') data.email = rw[1]; });
        fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: kind, data: data, token: ctToken, turnstile: tsToken, website: (fw.querySelector('[data-hp]') || {}).value || '' }) })
          .then(function (r) { if (!r.ok) throw new Error('send'); step(3); })
          .catch(function () { em2.hidden = false; getToken(); tsReset(); })
          .then(function () { sending = false; b.disabled = false; });
      }
      else if (a === 'confirm') {
        var ok = true, rowsOut = [];
        var kb = fw.querySelector('[data-k].on'); rowsOut.push(['お問い合わせの種類', kb ? kb.textContent : '']);
        var chips = Array.prototype.filter.call(fw.querySelectorAll('.chips button.on'), vis).map(function (c) { return c.textContent; });
        if (chips.length) rowsOut.push(['ご相談の事業', chips.join('、')]);
        Array.prototype.forEach.call(fw.querySelectorAll('[data-fr]'), function (r) {
          if (!vis(r)) return;
          var f = r.querySelector('.ip'), bad = false;
          if (f) { var v = (f.value || '').trim(); bad = f.hasAttribute('data-req') && !v; if (v) rowsOut.push([r.querySelector('.lb').firstChild.textContent, v]); }
          else { var c = r.querySelector('input[type="checkbox"]'); bad = c && !c.checked; }
          r.classList.toggle('err', !!bad); if (bad) ok = false;
        });
        fw.querySelector('[data-em]').hidden = ok;
        if (!ok) { self._rebuild(); return; }
        var cf = fw.querySelector('[data-cf]'); while (cf.firstChild) cf.removeChild(cf.firstChild);
        rowsOut.forEach(function (rw) {
          var d = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
          dt.textContent = rw[0]; dd.textContent = rw[1]; d.appendChild(dt); d.appendChild(dd); cf.appendChild(d);
        });
        lastRows = rowsOut; step(2);
      }
    };
    }

    self._raf = requestAnimationFrame(loop);
    return function () { self._dead = true; if (self._raf) cancelAnimationFrame(self._raf); if (self._io) self._io.disconnect(); if (self._ro) self._ro.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', rebuild); };
}
