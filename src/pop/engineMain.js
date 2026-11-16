/* eslint-disable */
// @ts-nocheck
// トップページの動き(スクロールに合わせた線・てんとう虫・オープニング)
export function bootMain(root) {
    var self = {};
    root.classList.add('js');
    var doc = root.querySelector('.doc');
    var fx = root.querySelector('.fx'), cx = fx.getContext('2d');
    var W = 0, H = 0, DP = 1, st = 0, maxS = 1, docH = 0;
    var motion = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!motion) root.classList.add('nomo');
    var t0 = performance.now(), opT = t0;
    /* 同じ訪問中の2回目以降は、オープニングを省く */
    try { if (sessionStorage.getItem('jotto-op') === '1') { root.classList.add('seen'); opT = t0 - 6000; } sessionStorage.setItem('jotto-op', '1'); } catch (e) {}

    /* ---- 画面に入ったら表示 ---- */
    var ios = root.querySelectorAll('.io');
    if ('IntersectionObserver' in window) {
      self._io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); self._io.unobserve(e.target); } });
      }, { root: null, threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      ios.forEach(function (el) { self._io.observe(el); });
    } else { ios.forEach(function (el) { el.classList.add('in'); }); }

    /* ---- 位置の取得(本文の中での座標) ---- */
    function P(name, ax, ay) {
      var e = doc.querySelector('[data-a="' + name + '"]'); if (!e) return null;
      var r = e.getBoundingClientRect(), d = doc.getBoundingClientRect();
      return { x: r.left - d.left + r.width * (ax == null ? .5 : ax), y: r.top - d.top + r.height * (ay == null ? .5 : ay), w: r.width, h: r.height, el: e };
    }

    /* ---- 線(光の筋)を作る ---- */
    var TH = [], LITS = [], TZ = [];
    function thAt(y, x) { for (var q = TZ.length - 1; q >= 0; q--) if (y >= TZ[q].a && y < TZ[q].b && (TZ[q].x0 == null || (x >= TZ[q].x0 && x < TZ[q].x1))) return TZ[q].t; return 'd'; }
    function mk(vs, main) {
      var X = [], Y = [], S = [], n = vs.length, i, k;
      for (i = 0; i < n - 1; i++) {
        var a = vs[Math.max(i - 1, 0)], b = vs[i], c = vs[i + 1], d = vs[Math.min(i + 2, n - 1)];
        var seg = Math.max(3, Math.ceil(Math.hypot(c[0] - b[0], c[1] - b[1]) / 12));
        for (k = 0; k < seg; k++) {
          var t = k / seg, t2 = t * t, t3 = t2 * t;
          X.push(.5 * (2 * b[0] + (-a[0] + c[0]) * t + (2 * a[0] - 5 * b[0] + 4 * c[0] - d[0]) * t2 + (-a[0] + 3 * b[0] - 3 * c[0] + d[0]) * t3));
          Y.push(.5 * (2 * b[1] + (-a[1] + c[1]) * t + (2 * a[1] - 5 * b[1] + 4 * c[1] - d[1]) * t2 + (-a[1] + 3 * b[1] - 3 * c[1] + d[1]) * t3));
          S.push(b[2] + (c[2] - b[2]) * t);
        }
      }
      X.push(vs[n - 1][0]); Y.push(vs[n - 1][1]); S.push(vs[n - 1][2]);
      for (i = 1; i < S.length; i++) if (S[i] < S[i - 1]) S[i] = S[i - 1];
      var L = [0]; for (i = 1; i < X.length; i++) L.push(L[i - 1] + Math.hypot(X[i] - X[i - 1], Y[i] - Y[i - 1]));
      return { X: X, Y: Y, S: S, L: L, n: X.length, p: 0, tp: 0, main: main, ang: 0, en: 0 };
    }
    function ring(vs, cxx, cyy, R, turns, sy0, sy1, dir) {
      var steps = Math.round(turns * 20), i;
      for (i = 0; i <= steps; i++) {
        var a = -Math.PI / 2 + dir * (i / steps) * turns * Math.PI * 2;
        vs.push([cxx + Math.cos(a) * R, cyy + Math.sin(a) * R, sy0 + (sy1 - sy0) * (i / steps)]);
      }
    }
    function build() {
      W = root.clientWidth; H = window.innerHeight;
      DP = Math.min(window.devicePixelRatio || 1, 1.5);
      if (fx.width !== Math.round(W * DP) || fx.height !== Math.round(H * DP)) { fx.width = Math.round(W * DP); fx.height = Math.round(H * DP); }
      docH = doc.scrollHeight; maxS = Math.max(1, docH - H);
      TZ = Array.prototype.slice.call(doc.querySelectorAll('[data-th]')).map(function (el) { return { a: el.offsetTop, b: el.offsetTop + el.offsetHeight, t: el.getAttribute('data-th') }; });
      var old = TH.map(function (t) { return t.S[Math.min(t.n - 1, Math.round(t.p))]; }), oldA = TH.map(function (t) { return [t.ang, t.en]; });
      TH = []; LITS = [];
      var a0 = P('start', .5, .78), ob = P('obj'), sp = P('split'), mg = P('merge'), inf = P('inf'), n1 = P('n1'), n2 = P('n2'), ct = P('cta'), ld = P('land');
      var c = [P('c1'), P('c2'), P('c3'), P('c4')].filter(function (q) { return !!q; });
      if (!a0 || !ob || !sp || !mg || !inf || !ct || !ld || !c[0]) return;
      /* 選んでいる事業(触っているパネル。なければ1つ目)に、てんとう虫の線を通す */
      var sel = 0, cO = c.slice();
      cO.forEach(function (q, qi) { var pe = q.el.parentNode; if (pe.matches && pe.matches(':hover')) sel = qi; });
      c = [cO[sel]].concat(cO.filter(function (q, qi) { return qi !== sel; }));
      var spr = c[0].el.parentNode.getBoundingClientRect(), sdr = doc.getBoundingClientRect();
      TZ.push({ a: spr.top - sdr.top, b: spr.bottom - sdr.top, t: 'r', x0: spr.left - sdr.left, x1: spr.right - sdr.left });
      var cap = maxS + H * .6 - 6, v = [], i;
      v.push([a0.x + 6, a0.y - 16, H * .6 + 26]);
      v.push([a0.x + 70, a0.y + H * .2, a0.y + H * .2]);
      var R = Math.min(ob.w, ob.h) * .47;
      v.push([ob.x + R * .9, ob.y - R - 170, ob.y - R - 170]);
      ring(v, ob.x, ob.y, R, 1.5, ob.y - R, ob.y + R, 1);
      LITS.push({ el: ob.el.parentNode, th: 0, s: ob.y - R + 40, x: ob.x, y: ob.y });
      v.push([ob.x + 40, ob.y + R + 150, ob.y + R + 150]);
      v.push([W * .5, sp.y - sp.h * .5 - 40, sp.y - sp.h * .5 - 40]);
      v.push([W * .5, sp.y - sp.h * .2, sp.y - sp.h * .2]);
      var vS = [W * .5, sp.y - sp.h * .2, sp.y - sp.h * .2];
      var mid = (sp.y + c[0].y) / 2 + 10;
      v.push([c[0].x, mid, mid]);
      v.push([c[0].x, c[0].y, c[0].y]);
      LITS.push({ el: c[0].el.parentNode, th: 0, s: c[0].y - 6, x: c[0].x, y: c[0].y });
      var cbs = c.map(function (q) { return q.y - q.h / 2 + q.el.parentNode.getBoundingClientRect().height + 24; });
      var cb = cbs[0], vM = [W * .5, mg.y + mg.h * .3, Math.max(mg.y + mg.h * .3, Math.max.apply(null, cbs) + 60)];
      v.push([c[0].x, cb, cb]);
      v.push(vM.slice());
      var a = inf.w * .47, ic = inf.y;
      v.push([inf.x, ic - a * .62 - 60, ic - a * .62 - 60]);
      v.push([inf.x, ic - a * .38, ic - a * .5]);
      for (i = 0; i <= 44; i++) {
        var t = Math.PI / 2 + (i / 44) * Math.PI * 2, s2 = Math.sin(t), dn = 1 + s2 * s2;
        v.push([inf.x + a * Math.cos(t) / dn, ic + a * s2 * Math.cos(t) / dn, ic - a * .44 + (i / 44) * a * .88]);
      }
      v.push([inf.x, ic + a * .62, ic + a * .6]);
      if (n1 && n2) {
        v.push([n1.x - 60, n1.y - 130, n1.y - 130]);
        v.push([n1.x, n1.y, n1.y]); LITS.push({ el: n1.el.parentNode, th: 0, s: n1.y - 4, x: n1.x, y: n1.y });
        v.push([n1.x - 34, (n1.y + n2.y) / 2, (n1.y + n2.y) / 2]);
        v.push([n2.x, n2.y, n2.y]); LITS.push({ el: n2.el.parentNode, th: 0, s: n2.y - 4, x: n2.x, y: n2.y });
        v.push([n2.x + 90, n2.y + 150, n2.y + 150]);
      }
      var cr = ct.w / 2 + 22;
      v.push([ct.x - cr * 1.6, ct.y - cr - 200, ct.y - cr - 200]);
      ring(v, ct.x, ct.y, cr, 1.5, ct.y - cr, ct.y + cr, -1);
      LITS.push({ el: ct.el, th: 0, s: ct.y - cr + 30, x: ct.x, y: ct.y });
      v.push([ct.x - 60, ct.y + cr + 90, ct.y + cr + 90]);
      v.push([ld.x - 120, ld.y - 150, Math.max(ld.y - 150, ct.y + cr + 120)]);
      v.push([ld.x, ld.y, ld.y + 400]);
      /* 最後まで行けるように、終盤のタイミングを画面下端に合わせて詰める */
      var raw = v[v.length - 1][2], cs = Math.min(cap - 320, ct.y + cr + 60);
      if (raw > cs) for (i = 0; i < v.length; i++) if (v[i][2] > cs) v[i][2] = cs + (v[i][2] - cs) / (raw - cs) * (cap - cs);
      TH.push(mk(v, true));
      LITS.push({ el: ld.el.parentNode, th: 0, s: cap - 2, x: ld.x, y: ld.y, land: true });
      /* ほかの事業パネルは、てんとう虫の線が事業の列に着いたときに一緒に点灯する(線は1本だけ) */
      for (i = 1; i < c.length; i++) LITS.push({ el: c[i].el.parentNode, th: 0, s: c[0].y - 6 + i * 26, x: c[i].x, y: c[i].y });
      TH.forEach(function (t, k) { if (old[k] != null) { t.p = t.tp = find(t, old[k]); t.ang = oldA[k][0]; t.en = oldA[k][1]; } });
      LITS.forEach(function (l) { l.on = l.el.classList.contains('lit'); });
      if (self._sel != null && self._sel !== sel && TH[0]) {
        var m0 = TH[0], ps = find(m0, vS[2]), pm = find(m0, vM[2]);
        if (m0.p > ps && m0.p <= pm + 2) m0.p = ps;
      }
      self._sel = sel;
      land = { x: ld.x, y: ld.y, size: (ld.el.parentNode.clientWidth || 500) / 500 * 30 };
      /* ヘッダーの目盛り */
      root.querySelectorAll('[data-tk]').forEach(function (el) {
        var s = doc.querySelector('[data-sec="' + el.getAttribute('data-tk') + '"]');
        if (s) el.style.left = Math.min(100, (s.offsetTop - 40) / maxS * 100) + '%';
      });
    }
    var land = { x: 0, y: 0, size: 30 };
    function find(t, ref) {
      var S = t.S, lo = 0, hi = t.n - 1;
      if (ref <= S[0]) return 0; if (ref >= S[hi]) return hi;
      while (hi - lo > 1) { var m = (lo + hi) >> 1; if (S[m] <= ref) lo = m; else hi = m; }
      var d = S[hi] - S[lo]; return lo + (d > 0 ? (ref - S[lo]) / d : 0);
    }
    function at(t, p) {
      var i = Math.max(0, Math.min(t.n - 2, Math.floor(p))), f = Math.max(0, Math.min(1, p - i));
      return [t.X[i] + (t.X[i + 1] - t.X[i]) * f, t.Y[i] + (t.Y[i + 1] - t.Y[i]) * f, t.L[i] + (t.L[i + 1] - t.L[i]) * f];
    }

    /* ---- 火花・ちり ---- */
    var SP = [], DU = [], i;
    for (i = 0; i < 90; i++) DU.push({ x: Math.random(), y: Math.random(), z: .3 + Math.random() * .7, ph: Math.random() * 6.28 });
    function spark(x, y, n, pw, red) {
      var z = thAt(y, x);
      for (var k = 0; k < n; k++) {
        var a = Math.random() * 6.283, s = Math.random() * pw, r = Math.random();
        var c = z === 'd' ? (red && r < .6 ? '255,110,90' : '255,246,236') : (z === 'l' ? (r < .65 ? '192,57,43' : '10,10,10') : (r < .7 ? '255,255,255' : '10,10,10'));
        SP.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - .3, l: 0, m: 30 + Math.random() * 40, c: c, z: 1.4 + Math.random() * 2.6 });
      }
      if (SP.length > 600) SP.splice(0, SP.length - 600);
    }

    /* ---- てんとう虫を描く ---- */
    function bug(x, y, ang, s, flap, glow, zn) {
      cx.save(); cx.translate(x, y); cx.rotate(ang);
      if (false) {
        cx.globalCompositeOperation = 'lighter';
        var g = cx.createRadialGradient(0, 0, 0, 0, 0, s * 3.4);
        g.addColorStop(0, 'rgba(255,120,96,' + (.55 * glow) + ')'); g.addColorStop(.35, 'rgba(192,57,43,' + (.28 * glow) + ')'); g.addColorStop(1, 'rgba(192,57,43,0)');
        cx.fillStyle = g; cx.beginPath(); cx.arc(0, 0, s * 3.4, 0, 6.283); cx.fill();
      }
      cx.globalCompositeOperation = 'source-over';
      if (flap > .02) {
        var wa = Math.sin(performance.now() * .03) * .16 + .5;
        cx.fillStyle = (zn === 'l' ? 'rgba(10,10,10,' + (.14 * flap) + ')' : 'rgba(255,255,255,' + (.32 * flap) + ')');
        cx.save(); cx.rotate(-wa); cx.beginPath(); cx.ellipse(-s * .4, s * .05, s * .4, s * .15, 0, 0, 6.283); cx.fill(); cx.restore();
        cx.save(); cx.rotate(wa); cx.beginPath(); cx.ellipse(s * .4, s * .05, s * .4, s * .15, 0, 0, 6.283); cx.fill(); cx.restore();
      }
      cx.fillStyle = '#1c1c1c'; cx.beginPath(); cx.arc(0, -s * .42, s * .15, 0, 6.283); cx.fill();
      cx.fillStyle = zn === 'r' ? '#f0ede8' : '#c0392b'; cx.beginPath(); cx.ellipse(0, 0, s * .33, s * .4, 0, 0, 6.283); cx.fill();
      cx.strokeStyle = '#0a0a0a'; cx.lineWidth = Math.max(1, s * .06); cx.beginPath(); cx.moveTo(0, -s * .38); cx.lineTo(0, s * .4); cx.stroke();
      cx.fillStyle = '#0a0a0a';
      var d = [[-.17, -.17, .065], [-.2, .1, .08], [-.13, .3, .05], [.17, -.17, .065], [.2, .1, .08], [.13, .3, .05]];
      for (var k = 0; k < 6; k++) { cx.beginPath(); cx.arc(d[k][0] * s, d[k][1] * s, d[k][2] * s, 0, 6.283); cx.fill(); }
      cx.restore();
    }

    /* ---- ヒーローの背景(赤い光がゆっくり流れる) ---- */
    var glc = root.querySelector('.gl'), gl = null, uR, uT;
    try { gl = glc.getContext('webgl', { antialias: false, alpha: false }); } catch (e) { gl = null; }
    if (gl) {
      var fs = ['precision highp float;uniform vec2 r;uniform float t;',
        'float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
        'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
        'float fb(vec2 p){float a=.5,s=0.;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){s+=a*n(p);p=R*p*2.03;a*=.5;}return s;}',
        'void main(){vec2 uv=(gl_FragCoord.xy-.5*r)/r.y;vec2 p=uv*1.2;float tt=t*.04;',
        'vec2 q=vec2(fb(p+vec2(0.,tt)),fb(p+vec2(5.2,1.3-tt)));',
        'vec2 w=vec2(fb(p+3.2*q+vec2(1.7,9.2)+.6*tt),fb(p+3.2*q+vec2(8.3,2.8)-.5*tt));',
        'float f=fb(p+3.4*w);float rd=pow(1.-abs(2.*f-1.),7.);',
        'vec3 red=vec3(.753,.224,.169);vec3 c=vec3(.035);',
        'c+=red*smoothstep(.3,.95,f)*length(w)*.6;c+=red*rd*.5;c+=vec3(.96,.9,.86)*pow(rd,3.)*.14;',
        'c*=smoothstep(1.7,.3,length(uv*vec2(.62,1.)));gl_FragColor=vec4(c,1.);}'].join('\n');
      var mkS = function (ty, src) { var s = gl.createShader(ty); gl.shaderSource(s, src); gl.compileShader(s); return s; };
      var pr = gl.createProgram();
      gl.attachShader(pr, mkS(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
      gl.attachShader(pr, mkS(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) gl = null;
      else {
        gl.useProgram(pr); var bf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        var lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
        uR = gl.getUniformLocation(pr, 'r'); uT = gl.getUniformLocation(pr, 't');
      }
    }

    /* ---- 立体の∞(粒でできたロゴの輪) ---- */
    var oc = root.querySelector('.obj'), ox = oc.getContext('2d'), OP = [];
    for (i = 0; i < 1500; i++) OP.push({ u: Math.random() * 6.283, v: Math.random() * 6.283, r: Math.pow(Math.random(), .6), s: .5 + Math.random() });
    function drawObj(t) {
      var cw = oc.clientWidth, ch = oc.clientHeight; if (!cw || !ch) return;
      var d = Math.min(window.devicePixelRatio || 1, 1.5);
      if (oc.width !== Math.round(cw * d)) { oc.width = Math.round(cw * d); oc.height = Math.round(ch * d); }
      ox.setTransform(d, 0, 0, d, 0, 0); ox.clearRect(0, 0, cw, ch);
      var lit = oc.parentNode.classList.contains('lit') ? 1 : .42;
      var A = Math.min(cw, ch) * .46, ry = t * .22, rx = .5 + Math.sin(t * .17) * .12, cyv = Math.cos(ry), syv = Math.sin(ry), cxv = Math.cos(rx), sxv = Math.sin(rx);
      for (var k = 0; k < OP.length; k++) {
        var o = OP[k], su = Math.sin(o.u), dn = 1 + su * su;
        var x = A * Math.cos(o.u) / dn, y = A * su * Math.cos(o.u) / dn, z = 0;
        var tr = A * .075 * o.r; x += Math.cos(o.v) * tr * .7; y += Math.cos(o.v + 1.7) * tr * .7; z += Math.sin(o.v) * tr * 1.6;
        var x1 = x * cyv + z * syv, z1 = -x * syv + z * cyv, y1 = y * cxv - z1 * sxv, z2 = y * sxv + z1 * cxv;
        var pz = 1 / (1 + z2 / (A * 3.2)), px = cw / 2 + x1 * pz, py = ch / 2 + y1 * pz;
        var run = (o.u - t * .9) % 6.283; if (run < 0) run += 6.283;
        var hot = run < .5 ? (1 - run / .5) : 0;
        var al = (.25 + .5 * pz * pz - .25) * o.s * lit;
        if (hot > 0 && lit > .9) { ox.fillStyle = 'rgba(192,57,43,' + Math.min(1, al + hot) + ')'; ox.beginPath(); ox.arc(px, py, 2.4, 0, 6.283); ox.fill(); }
        else { ox.fillStyle = 'rgba(10,10,10,' + Math.max(0, Math.min(1, al * 1.25)) + ')'; ox.beginPath(); ox.arc(px, py, 1.25 * pz, 0, 6.283); ox.fill(); }
      }
    }

    /* ---- 事業カードの絵 ---- */
    var arts = Array.prototype.slice.call(root.querySelectorAll('.art')).map(function (c) { return { c: c, x: c.getContext('2d'), k: +c.getAttribute('data-art') }; });
    function hs(a, b) { var s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); }
    var FG = '240,237,232', RD = '192,57,43';
    function drawArt(a, t) {
      var c = a.c, x = a.x, cw = c.clientWidth, ch = c.clientHeight; if (!cw || !ch) return;
      var d = Math.min(window.devicePixelRatio || 1, 1.5);
      if (c.width !== Math.round(cw * d) || c.height !== Math.round(ch * d)) { c.width = Math.round(cw * d); c.height = Math.round(ch * d); }
      x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, cw, ch);
      var i, j, k;
      if (a.k === 1) {
        var n = Math.max(3, Math.floor(cw / 62)), bw = (cw - 24) / n;
        for (k = 0; k < n; k++) {
          var bh = ch * (.45 + hs(k, 3) * .45), bx = 12 + k * bw, top = ch - bh;
          x.strokeStyle = 'rgba(' + FG + ',.2)'; x.lineWidth = 1; x.strokeRect(bx + 3.5, top + .5, bw - 7, bh + 4);
          for (i = 0; bx + 10 + i * 11 < bx + bw - 10; i++) for (j = 0; top + 10 + j * 14 < ch - 4; j++) {
            var ph = hs(k * 31 + i, j * 7 + k), v = .5 + .5 * Math.sin(t * (.25 + hs(i + k, j) * .7) + ph * 40), al = Math.max(0, (v - .42) / .58);
            if (al <= 0) continue;
            x.fillStyle = (ph > .92) ? 'rgba(' + RD + ',' + al + ')' : 'rgba(' + FG + ',' + (al * .7) + ')';
            x.fillRect(bx + 10 + i * 11, top + 10 + j * 14, 5, 8);
          }
        }
      } else if (a.k === 2) {
        for (i = 0; i < 15; i++) {
          var y0 = ch * .3 + i * (ch * .05); x.beginPath();
          for (var px = -6; px <= cw + 6; px += 5) {
            var e = Math.exp(-Math.pow((px - cw * .5 - cw * .12 * Math.sin(t * .2 + i * .2)) / (cw * .3), 2));
            var yy = y0 - e * ch * .26 * (0.55 + 0.45 * Math.sin(px * .03 + t * .7 + i * .5)) * (0.7 + 0.3 * Math.sin(px * .07 - t * .45 + i));
            if (px === -6) x.moveTo(px, yy); else x.lineTo(px, yy);
          }
          x.strokeStyle = (i === 6) ? 'rgba(' + RD + ',1)' : 'rgba(' + FG + ',' + (.22 + .4 * (i / 15)) + ')'; x.lineWidth = (i === 6) ? 1.8 : 1; x.stroke();
        }
      } else if (a.k === 3) {
        var N = 16, Q = [];
        for (i = 0; i < N; i++) Q.push([cw * (.1 + hs(i, 1) * .8) + Math.sin(t * (.2 + hs(i, 3) * .3) + i) * 14, ch * (.14 + hs(i, 2) * .72) + Math.cos(t * (.18 + hs(i, 4) * .3) + i * 2) * 12]);
        var md = Math.max(80, cw * .34);
        for (i = 0; i < N; i++) for (j = i + 1; j < N; j++) {
          var ds = Math.hypot(Q[i][0] - Q[j][0], Q[i][1] - Q[j][1]);
          if (ds < md) { x.strokeStyle = 'rgba(' + FG + ',' + ((1 - ds / md) * .5) + ')'; x.lineWidth = 1; x.beginPath(); x.moveTo(Q[i][0], Q[i][1]); x.lineTo(Q[j][0], Q[j][1]); x.stroke(); }
        }
        for (i = 0; i < N; i++) {
          var rdn = (i % 7 === 0); x.fillStyle = rdn ? 'rgba(' + RD + ',1)' : 'rgba(' + FG + ',.9)';
          x.beginPath(); x.arc(Q[i][0], Q[i][1], rdn ? 4 : 2, 0, 6.283); x.fill();
          if (rdn) { var prr = 7 + ((t * 12 + i * 5) % 20); x.strokeStyle = 'rgba(' + RD + ',' + (1 - (prr - 7) / 20) * .8 + ')'; x.beginPath(); x.arc(Q[i][0], Q[i][1], prr, 0, 6.283); x.stroke(); }
        }
      } else {
        var cs = 16, cols = Math.ceil(cw / cs), rows = Math.ceil(ch / cs);
        for (i = 0; i < cols; i++) for (j = 1; j < rows; j++) {
          var vv = Math.sin(i * .38 + t * .8) + Math.cos(j * .45 - t * .55) + Math.sin((i + j) * .21 + t * .35), aa = Math.max(0, Math.min(1, (vv - .35) / 1.9));
          if (aa <= .02) { x.fillStyle = 'rgba(' + FG + ',.08)'; x.fillRect(i * cs + 7, j * cs + 7, 2, 2); continue; }
          x.fillStyle = 'rgba(' + FG + ',' + (aa * .75) + ')'; var sz = 3 + aa * 8; x.fillRect(i * cs + 8 - sz / 2, j * cs + 8 - sz / 2, sz, sz);
        }
        var sq = Math.floor(t * 3.2); x.fillStyle = 'rgba(' + RD + ',1)'; x.fillRect((sq % cols) * cs + 2, (Math.floor(rows * .5) + (Math.floor(sq / cols) % 3)) * cs + 2, 12, 12);
      }
    }

    /* ---- 操作 ---- */
    function go(id) {
      var el = id === 'top' ? null : doc.querySelector('#' + id);
      var y = el ? Math.max(0, el.offsetTop - 60) : 0;
      root.classList.remove('mop');
      window.scrollTo({ top: y, behavior: motion ? 'smooth' : 'auto' });
    }
    function onClick(e) {
      var g = e.target.closest ? e.target.closest('[data-go]') : null;
      if (g) { e.preventDefault(); go(g.getAttribute('data-go')); return; }
      var a = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!a) return;
      var k = a.getAttribute('data-act');
      if (k === 'menu') root.classList.toggle('mop');
      else if (k === 'motion') {
        motion = !motion; root.classList.toggle('nomo', !motion);
        a.setAttribute('aria-pressed', motion ? 'true' : 'false');
        var lb = a.querySelector('[data-mlabel]'); if (lb) lb.textContent = motion ? '動きを止める' : '動きを再開する';
      } else if (k === 'replay') {
        if (!motion) return;
        window.scrollTo(0, 0); root.classList.remove('seen'); root.classList.remove('mop');
        var op = root.querySelector('.op'), cl = op.cloneNode(true); op.parentNode.replaceChild(cl, op);
        cnt = cl.querySelector('[data-count]'); opT = performance.now(); self._b2 = false;
        TH.forEach(function (t) { t.p = t.tp = 0; });
        root.querySelectorAll('.lit').forEach(function (el) { el.classList.remove('lit'); });
        LITS.forEach(function (l) { l.on = false; });
      }
    }
    root.addEventListener('click', onClick);
    var cdsEl = root.querySelector('.cds');
    function onCard() { self._rb = performance.now() + 1100; }
    if (cdsEl) { cdsEl.addEventListener('mouseover', onCard); cdsEl.addEventListener('mouseleave', onCard); }
    function onResize() { build(); }
    window.addEventListener('resize', onResize);
    self._off = function () { root.removeEventListener('click', onClick); window.removeEventListener('resize', onResize); };

    var cnt = root.querySelector('[data-count]'), navs = root.querySelectorAll('.nl'), tks = root.querySelectorAll('[data-tk]'), secs = doc.querySelectorAll('[data-sec]');
    var hero = root.querySelector('.hero'), fr = 0, lastSt = -1, curSec = -1;
    build();

    function loop(now) {
      if (self._dead) return;
      self._raf = requestAnimationFrame(loop);
      var t = (now - t0) / 1000, k, j; fr++;
      var ff = Math.max(.5, Math.min(4, (now - (self._ln || now)) / 16.7)); self._ln = now;
      var kp = 1 - Math.pow(1 - .085, ff), ke = 1 - Math.pow(1 - .05, ff);
      if (fr % 45 === 0 && (doc.scrollHeight !== docH || root.clientWidth !== W || window.innerHeight !== H)) build();
      if (!self._b2 && now - opT > 5800) { self._b2 = true; build(); }
      if (self._rb && now < self._rb) build();
      st = window.scrollY || 0;
      if (cnt && now - opT < 4300) {
        var q = Math.min(1, (now - opT) / 3300); q = 1 - Math.pow(1 - q, 2.2);
        var vv = Math.round(q * 100); cnt.textContent = (vv < 10 ? '00' : vv < 100 ? '0' : '') + vv;
      }
      if (st !== lastSt) {
        lastSt = st;
        root.style.setProperty('--pg', (Math.min(1, st / maxS) * 100).toFixed(2) + '%');
        root.classList.toggle('scd', st > 60);
        var cs = 0; for (k = 0; k < secs.length; k++) if (secs[k].offsetTop - H * .45 <= st) cs = k;
        if (cs !== curSec) {
          curSec = cs;
          navs.forEach(function (n) { n.classList.toggle('cur', +n.getAttribute('data-n') === cs); });
          tks.forEach(function (n) { n.classList.toggle('on', +n.getAttribute('data-tk') <= cs); });
        }
      }
      /* 背景・立体・カードの絵 */
      if (gl && motion && st < H) {
        var gw = Math.max(2, Math.round(glc.clientWidth * .5)), gh = Math.max(2, Math.round(glc.clientHeight * .5));
        if (glc.width !== gw || glc.height !== gh) { glc.width = gw; glc.height = gh; gl.viewport(0, 0, gw, gh); }
        gl.uniform2f(uR, gw, gh); gl.uniform1f(uT, t + 20); gl.drawArrays(gl.TRIANGLES, 0, 3);
      } else if (gl && fr < 3) { glc.width = 64; glc.height = 40; gl.viewport(0, 0, 64, 40); gl.uniform2f(uR, 64, 40); gl.uniform1f(uT, 20); gl.drawArrays(gl.TRIANGLES, 0, 3); }
      var orr = oc.getBoundingClientRect(), rr = root.getBoundingClientRect();
      if (orr.bottom > rr.top - 50 && orr.top < rr.bottom + 50 && (motion || fr < 4 || fr % 30 === 0)) drawObj(motion ? t : 3);
      if ((fr & 1) === 0 || !motion) for (k = 0; k < arts.length; k++) {
        var ar = arts[k].c.getBoundingClientRect();
        if (ar.bottom > rr.top - 40 && ar.top < rr.bottom + 40 && (motion || fr < 4 || fr % 30 === 0)) drawArt(arts[k], motion ? t : 4);
      }

      /* 光の線 */
      cx.setTransform(DP, 0, 0, DP, 0, 0); cx.clearRect(0, 0, W, H);
      if (!TH.length) return;
      var ref = st + H * .6;
      for (k = 0; k < TH.length; k++) {
        var th = TH[k];
        th.tp = find(th, ref);
        var dp = th.tp - th.p; th.p = motion ? th.p + dp * kp : th.tp;
        if (Math.abs(dp) < .01) th.p = th.tp;
        th.en = (th.en || 0) + ((Math.abs(dp) > .12 ? 1 : 0) - (th.en || 0)) * ke; var en = motion ? (.12 + .88 * th.en) : .12;
        if (th.p <= .01 && !th.main) continue;
        var hp = at(th, th.p), hx = hp[0], hy = hp[1] - st, hl = hp[2], pi = Math.floor(th.p);
        var ended = !th.main && th.p >= th.n - 1.5;
        /* 通った跡(点線で残る) */
        cx.globalCompositeOperation = 'source-over'; cx.lineCap = 'round'; cx.setLineDash([.1, 11]); cx.lineWidth = th.main ? 3.6 : 3;
        var curz = null, open = false;
        for (j = 0; j <= pi; j++) {
          var yy = th.Y[j] - st;
          if (yy < -60 || yy > H + 60) { if (open) { cx.stroke(); open = false; } continue; }
          var z = thAt(th.Y[j], th.X[j]);
          if (!open || z !== curz) {
            if (open) { cx.lineTo(th.X[j], yy); cx.stroke(); }
            curz = z; cx.beginPath(); cx.lineDashOffset = th.L[j] % 11.1;
            cx.strokeStyle = z === 'r' ? 'rgba(255,255,255,.85)' : 'rgba(192,57,43,.9)';
            cx.moveTo(th.X[j], yy); open = true;
          } else cx.lineTo(th.X[j], yy);
        }
        if (open) { cx.lineTo(hx, hy); cx.stroke(); }
        cx.setLineDash([]); cx.lineDashOffset = 0;
        if (ended) continue;
        /* 先頭の尾 */
        var CL = 520, px0 = hx, py0 = hy, hz = thAt(hp[1], hx);
        for (j = pi; j >= 0; j--) {
          var dl = hl - th.L[j]; if (dl > CL) break;
          var x1 = th.X[j], y1 = th.Y[j] - st, al = Math.pow(1 - dl / CL, 1.6) * en;
          if (!(y1 < -200 && py0 < -200) && !(y1 > H + 200 && py0 > H + 200)) {
            var z2 = thAt(th.Y[j], th.X[j]);
            if (false) {
            } else {
              cx.globalCompositeOperation = 'source-over';
              cx.strokeStyle = z2 === 'r' ? 'rgba(255,255,255,' + al + ')' : 'rgba(192,57,43,' + al + ')';
              cx.lineWidth = 1.5 + 6 * al; cx.beginPath(); cx.moveTo(px0, py0); cx.lineTo(x1, y1); cx.stroke();
            }
          }
          px0 = x1; py0 = y1;
        }
        cx.globalCompositeOperation = 'source-over';
        var spd = Math.abs(dp);
        if (motion && spd > .25 && fr % 2 === 0) spark(hx, hy + st, Math.min(3, 1 + Math.floor(spd / 6)), 1.3, th.main);
        if (th.main) {
          var pb = at(th, Math.max(0, th.p - 1.2)), ta = Math.atan2(hp[1] - pb[1], hx - pb[0]) + Math.PI / 2;
          var atEnd = th.p >= th.n - 1.2, atStart = th.p < .6;
          if (atEnd || atStart) ta = .436;
          var da = ta - th.ang; while (da > Math.PI) da -= 6.283; while (da < -Math.PI) da += 6.283;
          th.ang += da * (motion ? .16 : 1);
          var near = Math.max(0, 1 - Math.hypot(hx - land.x, hy + st - land.y) / 260), bs = 36 + (land.size - 36) * near;
          bug(hx, hy, th.ang, bs, Math.min(1, spd / 3), atEnd ? .2 : (.35 + .65 * en), hz);
        } else if (hz === 'd') {
          cx.globalCompositeOperation = 'lighter';
          var g2 = cx.createRadialGradient(hx, hy, 0, hx, hy, 26);
          g2.addColorStop(0, 'rgba(255,255,255,.95)'); g2.addColorStop(.25, 'rgba(240,237,232,.4)'); g2.addColorStop(1, 'rgba(240,237,232,0)');
          cx.fillStyle = g2; cx.beginPath(); cx.arc(hx, hy, 26, 0, 6.283); cx.fill();
          cx.globalCompositeOperation = 'source-over';
        } else { cx.fillStyle = hz === 'l' ? '#0a0a0a' : '#fff'; cx.beginPath(); cx.arc(hx, hy, 6, 0, 6.283); cx.fill(); }
      }
      /* たどり着いたら明かりを灯す */
      for (k = 0; k < LITS.length; k++) {
        var li = LITS[k]; if (li.on) continue;
        var tt = TH[li.th]; if (!tt) continue;
        var sp = tt.S[Math.min(tt.n - 1, Math.round(tt.p))];
        if (sp >= li.s) { li.on = true; li.el.classList.add('lit'); if (motion) spark(li.x, li.y, li.land ? 26 : 46, 3.4, true); }
      }
      /* 火花(小さな丸がはじける) */
      for (k = SP.length - 1; k >= 0; k--) {
        var s = SP[k]; s.l++; if (s.l > s.m) { SP.splice(k, 1); continue; }
        s.x += s.vx; s.y += s.vy; s.vx *= .96; s.vy = s.vy * .96 + .02;
        var sa = 1 - s.l / s.m, sy2 = s.y - st; if (sy2 < -20 || sy2 > H + 20) continue;
        cx.fillStyle = 'rgba(' + s.c + ',' + sa + ')'; cx.beginPath(); cx.arc(s.x, sy2, s.z * (.4 + .6 * sa), 0, 6.283); cx.fill();
      }
    }
    self._raf = requestAnimationFrame(loop);
    return function () { self._dead = true; if (self._raf) cancelAnimationFrame(self._raf); if (self._io) self._io.disconnect(); if (self._off) self._off(); root.classList.remove('mop'); };
}
