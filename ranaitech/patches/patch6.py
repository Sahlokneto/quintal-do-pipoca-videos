S=open('ep5.html').read()
def cut(s,a,b,new):
    i=s.index(a); j=s.index(b,i); return s[:i]+new+s[j:]

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula seis: os objetos! Objeto é um grupo de informações sobre uma coisa só, cada uma com um nome.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo uma pizza, com sabor e preço?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Isso! A pizza tem sabor: calabresa, preço: quarenta, e tamanho: grande. Cada informação tem um nome, chamado chave.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Então é igual a lista! A calabresa é a posição zero, né?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Errado, meu querido! Na lista você usa a posição. No objeto você usa o nome da chave. Pra pegar o preço, é pizza ponto preço.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Ahh, então eu pergunto pelo nome, e não pelo número!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Isso! E dá pra mudar também: pizza ponto preço igual a cinquenta, e pronto, ficou mais cara.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Eita, isso é inflação!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Viu? Você não é burrinho, só estava confundindo lista com objeto. Comemora com um pulinho! Na próxima aula: percorrendo listas. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau, professor!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Gostou? Curte, compartilha com um amigo e segue pra não perder as próximas aulas!' }
  ];
  var NAMES = { P: 'Professor', C: 'Cubinho' };
  var BYID = {}, END = 0, EV = {};

  function clamp(x, a, b) { return Math.min(b, Math.max(a, x)); }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function S(x, a, b) { var u = clamp((x - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); }
  function lin(x, a, b) { return clamp((x - a) / (b - a), 0, 1); }
  function easeOutBack(u) { var c1 = 1.70158, c3 = c1 + 1; u = clamp(u, 0, 1); return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); }
  function pad(x) { return (x < 10 ? '0' : '') + x.toFixed(1); }
  function wordsOf(s) { return s.split(/\s+/).filter(function (w) { return /[A-Za-zÀ-ÿ0-9]/.test(w); }).length; }
  function ev(id, frac) { var l = BYID[id]; return l.t0 + frac * l.dur; }

  var EXPR_KF = { P: [], C: [] }, GEST_KF = { P: [], C: [] };
  var SPEC = {
    P1: ['happy', 'happy'], C1: ['neutral', 'curious'], P2: ['happy', 'curious'], C2: ['neutral', 'proud'],
    P3: ['smirk', 'worried'], C3: ['smirk', 'eureka'], P4: ['happy', 'curious'], C4: ['smirk', 'happy'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'ptBoard'], ['P2', 0.5, 'ptBox'], ['C2', 0, 'rest'],
    ['P3', 0, 'palms'], ['P3', 0.5, 'ptBoard'], ['C3', 0, 'rest'], ['P4', 0, 'palms'], ['P4', 0.5, 'ptBoard'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'hand'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['P3', 0, 'droop'], ['C3', 0, 'eureka'], ['P4', 0, 'chin'],
    ['C4', 0, 'hand'], ['P5', 0, 'rest'], ['P5', 0.5, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

  function rebuild() {
    var t = 0;
    SCRIPT.forEach(function (l) {
      l.words = wordsOf(l.text);
      l.est = Math.max(1.2, l.words / WPS + 0.3);
      l.dur = l.userDur || l.est;
      t += l.gap; l.t0 = t; t += l.dur;
      BYID[l.id] = l;
    });
    END = t + 1.8;
    EV = {
      w0: BYID.P1.t0 + 0.5,
      L: [ev('P2', 0.04), ev('P2', 0.2), ev('P2', 0.38), ev('P2', 0.53), ev('P2', 0.6)],
      slot: [ev('P2', 0.22), ev('P2', 0.4), ev('P2', 0.55)],
      dot: ev('P3', 0.78), chg: ev('P4', 0.5), hop: ev('C4', 0.3), jump: ev('P5', 0.5),
      okA: ev('P2', 0.02), bulbA: ev('C1', 0.55), noI: ev('P3', 0.03), bulbB: ev('C3', 0.4), okB: ev('P4', 0.0), upI: ev('C4', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
    var P = [{ t: -9, k: 'happy' }], C = [{ t: -9, k: 'neutral' }];
    SCRIPT.forEach(function (l) { var s = SPEC[l.id]; P.push({ t: l.t0 - 0.15, k: s[0] }); C.push({ t: l.t0 - 0.15, k: s[1] }); });
    P.sort(function (a, b) { return a.t - b.t; }); C.sort(function (a, b) { return a.t - b.t; });
    EXPR_KF.P = P; EXPR_KF.C = C;
    var gp = [{ t: -9, k: 'rest' }], gc = [{ t: -9, k: 'rest' }];
    GP.forEach(function (g) { gp.push({ t: ev(g[0], g[1]), k: g[2] }); });
    GC.forEach(function (g) { gc.push({ t: ev(g[0], g[1]), k: g[2] }); });
    gp.sort(function (a, b) { return a.t - b.t; }); gc.sort(function (a, b) { return a.t - b.t; });
    GEST_KF.P = gp; GEST_KF.C = gc;
    scrub.max = String(Math.ceil(END * 100));
  }
  rebuild();

'''
S=cut(S,"  var WPS = 3.0;","  /* ======================= interface do roteiro",HEAD)

SCENE=r'''  var boardKey = '';
  function eraseF(tt, w) { return lin(tt, w, w + 0.7); }
  var BL = ['pizza = {', '   sabor: "calabresa",', '   preco: 40,', '   tamanho: "grande"', '}'];
  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0);
    var lN = EV.L.map(function (t0) { return Math.round(lin(tt, t0, t0 + 0.7) * 24); });
    var chg = tt >= EV.chg;
    var n5 = chg ? 11 + Math.ceil(5 * lin(tt, EV.chg, EV.chg + 0.5)) : Math.ceil(11 * lin(tt, EV.dot, EV.dot + 0.7));
    var key = [Math.round(e0 * 30), chg ? 1 : 0, lN.join('.'), n5, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('OBJETO', 512, 200);
      bx.fillStyle = '#ffffff'; bx.font = '700 70px ' + FD; bx.fillText('= dados com nome', 512, 395);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 54px ' + FM;
      for (var i = 0; i < 5; i++) {
        var txt = (i === 2 && chg) ? '   preco: 50,' : BL[i];
        bx.fillStyle = (i === 0 || i === 4) ? '#ffe69a' : '#9af2c8';
        bx.fillText(txt.slice(0, lN[i]), 90, 75 + i * 82);
      }
      var t5 = 'pizza.preco = 50';
      bx.fillStyle = '#7fd4ff'; bx.fillText(t5.slice(0, n5), 90, 75 + 5 * 82);
    }
    boardTex.needsUpdate = true;
  }

  var woodM = mat(0xe6b184, { roughness: 0.7 });
  var tableTop = mk(roundedBox(1.55, 0.1, 0.9, 0.04, 8), woodM, true, true); tableTop.position.set(0, 0.5, 0.45); scene.add(tableTop);
  [-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) {
    var lg = mk(new THREE.CylinderGeometry(0.05, 0.04, 0.46, 12), woodM, true, true); lg.position.set(sx * 0.64, 0.23, 0.45 + sz * 0.32); scene.add(lg);
  }); });

  /* ---------- decoração da sala ---------- */
  var SWAY = [];
  function makePlant(x, z, sc, potHex, leafHex) {
    var g = new THREE.Group();
    var pot = mk(new THREE.CylinderGeometry(0.34, 0.26, 0.5, 20), mat(potHex, { roughness: 0.8 }), true, true); pot.position.y = 0.25; g.add(pot);
    var rim = mk(new THREE.CylinderGeometry(0.37, 0.34, 0.1, 20), mat(potHex, { roughness: 0.8 }), true, true); rim.position.y = 0.53; g.add(rim);
    var soil = mk(new THREE.CylinderGeometry(0.31, 0.31, 0.04, 20), mat(0x5a3b28), false, false); soil.position.y = 0.55; g.add(soil);
    for (var i = 0; i < 9; i++) {
      var a = i / 9 * Math.PI * 2, lf = new THREE.Group();
      var blade = mk(new THREE.SphereGeometry(0.2, 12, 10), mat(i % 2 ? leafHex : leafHex + 0x0a1408, { roughness: 0.7 }), true, false);
      blade.scale.set(0.45, 1.7, 0.18); blade.position.y = 0.42; lf.add(blade);
      lf.position.set(Math.cos(a) * 0.1, 0.58, Math.sin(a) * 0.1); lf.rotation.y = -a; lf.rotation.z = 0.35 + (i % 3) * 0.14; lf.rotation.x = 0;
      g.add(lf); SWAY.push({ g: lf, b: lf.rotation.z, ph: i * 0.9 });
    }
    g.position.set(x, 0, z); g.scale.setScalar(sc); scene.add(g); return g;
  }
  makePlant(2.5, -0.95, 1.25, 0xd9794a, 0x2f9e5b);
  makePlant(-0.35, -1.25, 0.8, 0xf2f0e6, 0x3aa86a);

  // estante com livros, atrás do Professor
  (function () {
    var g = new THREE.Group(), wd = mat(0xb27a4a, { roughness: 0.75 });
    var H = 2.5, W = 0.78, D = 0.38;
    [-1, 1].forEach(function (s) { var side = mk(new THREE.BoxGeometry(0.05, H, D), wd, true, true); side.position.set(s * (W / 2), H / 2, 0); g.add(side); });
    var back = mk(new THREE.BoxGeometry(W, H, 0.03), mat(0x8e5d36), false, true); back.position.set(0, H / 2, -D / 2); g.add(back);
    for (var r = 0; r < 4; r++) { var sh = mk(new THREE.BoxGeometry(W, 0.05, D), wd, true, true); sh.position.set(0, 0.03 + r * 0.8, 0); g.add(sh); }
    var BC = [0xe0484f, 0x4a90e2, 0xffc247, 0x2fae7a, 0x9b6bd6, 0xf08a4b, 0x3bb5c9];
    for (var row = 0; row < 3; row++) {
      var xx = -W / 2 + 0.08;
      for (var k = 0; k < 6; k++) {
        var bw = 0.07 + ((row * 7 + k * 3) % 4) * 0.015, bh = 0.46 + ((row * 5 + k * 2) % 4) * 0.06;
        if (xx + bw > W / 2 - 0.05) break;
        var bk = mk(new THREE.BoxGeometry(bw, bh, D - 0.1), mat(BC[(row * 3 + k) % 7], { roughness: 0.6 }), true, false);
        bk.position.set(xx + bw / 2, 0.06 + row * 0.8 + bh / 2 + 0.02, 0); g.add(bk); xx += bw + 0.012;
      }
    }
    g.position.set(-2.4, 0, -1.2); scene.add(g);
  })();

  // relógio de parede
  var clockG = new THREE.Group(), handM = new THREE.Group(), handH = new THREE.Group();
  (function () {
    var rim = mk(new THREE.CylinderGeometry(0.44, 0.44, 0.07, 36), frameM, true, true); rim.rotation.x = Math.PI / 2; clockG.add(rim);
    var face = mk(new THREE.CylinderGeometry(0.38, 0.38, 0.08, 36), mat(0xfffdf5), false, true); face.rotation.x = Math.PI / 2; face.position.z = 0.01; clockG.add(face);
    for (var i = 0; i < 12; i++) { var a = i / 12 * Math.PI * 2, d = mk(new THREE.BoxGeometry(0.03, i % 3 ? 0.04 : 0.08, 0.02), mat(0x3a3a55), false, false); d.position.set(Math.sin(a) * 0.31, Math.cos(a) * 0.31, 0.06); d.rotation.z = -a; clockG.add(d); }
    var mh = mk(new THREE.BoxGeometry(0.03, 0.3, 0.02), mat(0x3a3a55), false, false); mh.position.y = 0.13; handM.add(mh); handM.position.z = 0.07; clockG.add(handM);
    var hh = mk(new THREE.BoxGeometry(0.04, 0.2, 0.02), mat(0xe0484f), false, false); hh.position.y = 0.09; handH.add(hh); handH.position.z = 0.08; clockG.add(handH);
    clockG.position.set(2.0, 5.85, -1.52); scene.add(clockG);
  })();

  // quadro com </>
  (function () {
    var fr = mk(roundedBox(0.95, 0.95, 0.08, 0.03, 4), frameM, true, true); fr.position.set(-2.0, 5.85, -1.54); scene.add(fr);
    var tex = labelTex(function (x, w, h) {
      x.fillStyle = '#233a45'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffe69a'; x.font = '700 120px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('</>', w / 2, h / 2 + 6);
    }, 256, 256);
    var pl = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), new THREE.MeshBasicMaterial({ map: tex })); pl.position.set(-2.0, 5.85, -1.49); scene.add(pl);
  })();

  // bandeirinhas
  (function () {
    var GC2 = [0xff6b8a, 0xffd166, 0x5bd6a4, 0x7aa7ff, 0xc39bff];
    for (var i = 0; i < 12; i++) {
      var u = i / 11 * 2 - 1, tri = new THREE.Mesh(new THREE.CircleGeometry(0.17, 3), new THREE.MeshBasicMaterial({ color: col(GC2[i % 5]), side: THREE.DoubleSide }));
      tri.rotation.z = Math.PI / 2 * 1 + Math.PI / 6 * 0 + Math.PI; tri.position.set(u * 2.7, 6.55 - 0.2 * (1 - u * u), -1.55); scene.add(tri);
    }
  })();

  // itens na mesa: celular, xícara, livros, cacto
  (function () {
    var ph = new THREE.Group();
    var body = mk(roundedBox(0.17, 0.32, 0.025, 0.012, 4), mat(0x2b2b3a), true, false); ph.add(body);
    var scr = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.28), new THREE.MeshBasicMaterial({ color: col(0x6ec8ff) })); scr.position.z = 0.014; ph.add(scr);
    ph.position.set(-0.42, 0.7, 0.6); ph.rotation.x = -0.3; scene.add(ph);
    var cup = mk(new THREE.CylinderGeometry(0.07, 0.06, 0.12, 16), mat(0xffffff), true, false); cup.position.set(0.55, 0.61, 0.62); scene.add(cup);
    var cof = mk(new THREE.CylinderGeometry(0.06, 0.06, 0.01, 16), mat(0x6b3f26), false, false); cof.position.set(0.55, 0.665, 0.62); scene.add(cof);
    var BKC = [0x4a90e2, 0xe0484f, 0x2fae7a];
    for (var i = 0; i < 3; i++) { var bk = mk(roundedBox(0.34 - i * 0.03, 0.06, 0.24, 0.01, 3), mat(BKC[i]), true, false); bk.position.set(0.2 + i * 0.01, 0.58 + i * 0.062, 0.3); bk.rotation.y = 0.15 * (i - 1); scene.add(bk); }
    var cp = mk(new THREE.CylinderGeometry(0.07, 0.055, 0.09, 14), mat(0xd9794a), true, false); cp.position.set(-0.05, 0.6, 0.3); scene.add(cp);
    var cc = mk(new THREE.CylinderGeometry(0.045, 0.05, 0.2, 12), mat(0x3aa86a), true, false); cc.position.set(-0.05, 0.74, 0.3); scene.add(cc);
    var ca = mk(new THREE.CylinderGeometry(0.025, 0.025, 0.09, 10), mat(0x3aa86a), true, false); ca.position.set(0.02, 0.76, 0.3); ca.rotation.z = -0.9; scene.add(ca);
  })();

  /* ---------- cartões do objeto e ícones ---------- */
  function cardTex(key, val, hl) {
    return labelTex(function (x, w, h) {
      x.fillStyle = hl ? '#e6fff0' : '#fff7e0'; rr(x, 6, 6, w - 12, h - 12, 36); x.fill();
      x.lineWidth = 12; x.strokeStyle = hl ? '#2fae7a' : '#c98f5b'; rr(x, 6, 6, w - 12, h - 12, 36); x.stroke();
      x.fillStyle = '#e8c27a'; rr(x, 6, 6, w - 12, 96, 36); x.fill(); x.fillRect(6, 60, w - 12, 42);
      x.fillStyle = '#7a4a12'; x.font = '700 56px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(key, w / 2, 58);
      x.fillStyle = '#2b2b3a'; x.font = '700 ' + (val.length > 6 ? 78 : 110) + 'px ' + FD; x.fillText(val, w / 2, 212);
    }, 512, 300);
  }
  function mkCard(key, val, hl) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(1.02, 0.6), new THREE.MeshBasicMaterial({ map: cardTex(key, val, hl), transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var cardS = mkCard('sabor', 'calabresa', false), cardP = mkCard('preco', '40', false), cardT = mkCard('tamanho', 'grande', false), cardP2 = mkCard('preco', '50', true);

  function iconTex(kind, label) {
    return labelTex(function (x, w, h) {
      var C = { ok: '#2fae7a', no: '#e0484f', bulb: '#ffb703', up: '#e0484f', heart: '#ff4d7d', share: '#4a90e2', plus: '#2fae7a' }[kind];
      x.fillStyle = C; x.beginPath(); x.arc(128, 128, 118, 0, 6.3); x.fill();
      x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
      x.strokeStyle = '#fff'; x.fillStyle = '#fff'; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = 28;
      if (kind === 'ok') { x.beginPath(); x.moveTo(72, 132); x.lineTo(112, 172); x.lineTo(188, 86); x.stroke(); }
      if (kind === 'no') { x.beginPath(); x.moveTo(84, 84); x.lineTo(172, 172); x.moveTo(172, 84); x.lineTo(84, 172); x.stroke(); }
      if (kind === 'bulb') {
        x.beginPath(); x.arc(128, 108, 46, 0, 6.3); x.fill(); x.fillRect(108, 146, 40, 14); x.fillRect(112, 166, 32, 12);
        x.lineWidth = 12; [[128, 36, 128, 22], [60, 70, 48, 62], [196, 70, 208, 62], [48, 116, 34, 116], [208, 116, 222, 116]].forEach(function (q) { x.beginPath(); x.moveTo(q[0], q[1]); x.lineTo(q[2], q[3]); x.stroke(); });
      }
      if (kind === 'up') { x.beginPath(); x.moveTo(128, 186); x.lineTo(128, 96); x.stroke(); x.beginPath(); x.moveTo(128, 60); x.lineTo(84, 112); x.lineTo(172, 112); x.closePath(); x.fill(); }
      if (kind === 'heart') { x.beginPath(); x.moveTo(128, 188); x.bezierCurveTo(52, 132, 74, 66, 128, 102); x.bezierCurveTo(182, 66, 204, 132, 128, 188); x.fill(); }
      if (kind === 'share') {
        x.lineWidth = 12; x.beginPath(); x.moveTo(90, 128); x.lineTo(166, 90); x.moveTo(90, 128); x.lineTo(166, 168); x.stroke();
        [[90, 128], [166, 90], [166, 168]].forEach(function (q) { x.beginPath(); x.arc(q[0], q[1], 24, 0, 6.3); x.fill(); });
      }
      if (kind === 'plus') { x.lineWidth = 30; x.beginPath(); x.moveTo(128, 70); x.lineTo(128, 186); x.moveTo(70, 128); x.lineTo(186, 128); x.stroke(); }
      if (label) {
        x.fillStyle = '#2b2b3a'; rr(x, 10, 262, 236, 62, 28); x.fill();
        x.fillStyle = '#fff'; x.font = '700 33px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 128, 295);
      }
    }, 256, label ? 336 : 256);
  }
  function mkIcon(kind, label, size) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(size, label ? size * 336 / 256 : size), new THREE.MeshBasicMaterial({ map: iconTex(kind, label), transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var icOkA = mkIcon('ok', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icBulbA = mkIcon('bulb', '', 0.52), icBulbB = mkIcon('bulb', '', 0.52),
      icNo = mkIcon('no', '', 0.5), icUp = mkIcon('up', '', 0.42),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);

  var CONF = [], CC = ['#ff6b8a', '#ffd166', '#5bd6a4', '#7aa7ff', '#c39bff'];
  for (var ci = 0; ci < 44; ci++) {
    var cm = mk(new THREE.BoxGeometry(0.09, 0.05, 0.012), new THREE.MeshBasicMaterial({ color: col(CC[ci % 5]) }), false, false);
    cm.visible = false; scene.add(cm); CONF.push(cm);
  }

'''
S=cut(S,"  var boardKey = '';","  /* ---------- expressões e gestos ---------- */",SCENE)

FRAME=r'''  /* ---------- quadro a quadro ---------- */
  var camW = { p: [0, 2.0, 19.8], t: [0, 1.7, 0] }, camP = { p: [-0.5, 2.0, 18.4], t: [-0.45, 1.7, 0] }, camC = { p: [0.5, 2.0, 18.4], t: [0.45, 1.7, 0] };
  var camPos = new THREE.Vector3(), camTgt = new THREE.Vector3();
  function hopY(tt) { var u = (tt - EV.hop) / 0.55; return (u > 0 && u < 1) ? 0.45 * 4 * u * (1 - u) : 0; }
  function glitchF(tt) { return 0; }
  function eraserUpdate(tt) {
    var w = EV.w0;
    if (tt < w - 0.15 || tt > w + 0.85) { eraser.visible = false; return; }
    var e = lin(tt, w, w + 0.7), appear = pop(tt, w - 0.15, 0.25) * (1 - S(tt, w + 0.7, w + 0.85));
    eraser.visible = appear > 0.02; eraser.scale.setScalar(Math.max(appear, 0.001));
    eraser.position.set(lerp(-2.0, 2.0, e), BY + 0.1 * Math.sin(e * 25), -1.3);
    eraser.rotation.z = 0.25 * Math.sin(e * 25);
  }
  function put(m, tt, t0, x, y, bob, k) {
    var s = pop(tt, t0, 0.45) * (k || 1);
    m.visible = s > 0.01; m.scale.setScalar(Math.max(s, 0.001));
    m.position.set(x, y + 0.04 * Math.sin(tt * 2.6 + bob), 0.7);
  }
  function showIcon(m, tt, t0, d, x, y) {
    var s = pop(tt, t0, 0.35) * (1 - S(tt, t0 + d, t0 + d + 0.25));
    m.visible = s > 0.02; m.scale.setScalar(Math.max(s, 0.001));
    m.position.set(x, y + 0.05 * Math.sin(tt * 3.2 + x), 0.85);
  }
  function frame(tt) {
    updateChar(prof, tt, 'P'); updateChar(cube, tt, 'C');
    var hide = 1 - S(tt, BYID.P6.t0 - 0.1, BYID.P6.t0 + 0.25);
    put(cardS, tt, EV.slot[0], -1.1, 2.3, 0); put(cardP, tt, EV.slot[1], 0, 2.3, 1); put(cardT, tt, EV.slot[2], 1.1, 2.3, 2);
    put(cardP2, tt, EV.chg, 0, 2.3, 1, 1);
    if (tt >= EV.chg) cardP.visible = false;
    [cardS, cardP, cardT, cardP2].forEach(function (m, i) {
      if (!m.visible) return;
      m.scale.setScalar(Math.max(m.scale.x * hide, 0.001)); m.visible = hide > 0.02;
      m.rotation.z = 0.03 * Math.sin(tt * 1.9 + i);
    });
    showIcon(icOkA, tt, EV.okA, 1.6, -2.15, 2.6);
    showIcon(icBulbA, tt, EV.bulbA, 1.8, 2.15, 2.55);
    showIcon(icNo, tt, EV.noI, 2.4, 2.15, 2.55);
    showIcon(icBulbB, tt, EV.bulbB, 1.8, 2.15, 2.55);
    showIcon(icOkB, tt, EV.okB, 1.4, -2.15, 2.6);
    showIcon(icUp, tt, EV.upI, 1.5, 0.6, 2.72);
    showIcon(icHeart, tt, EV.heart, 99, -1.0, 2.5);
    showIcon(icShare, tt, EV.share, 99, 0, 2.5);
    showIcon(icPlus, tt, EV.plus, 99, 1.0, 2.5);
    SWAY.forEach(function (s) { s.g.rotation.z = s.b + 0.05 * Math.sin(tt * 1.4 + s.ph); });
    handM.rotation.z = -tt * 0.9; handH.rotation.z = -tt * 0.075 - 0.6;
    eraserUpdate(tt);

    var ct = tt - (EV.jump + 0.3);
    CONF.forEach(function (m, i) {
      if (ct < 0 || ct > 2.8) { m.visible = false; return; }
      var a = i * 2.399, v = 0.9 + (i % 5) * 0.3, vy = 2.2 + (i % 7) * 0.25;
      var x = 1.5 + Math.cos(a) * v * ct * 0.8, y = 2.4 + vy * ct - 2.6 * ct * ct, z = 0.8 + Math.sin(a) * 0.5 * ct;
      var s = clamp((y - 0.1) / 0.3, 0, 1) * (1 - S(ct, 2.2, 2.8));
      m.visible = s > 0.02; m.position.set(x, y, z); m.rotation.set(ct * (3 + i % 4), ct * (4 + i % 3), ct * 5); m.scale.setScalar(Math.max(s, 0.001));
    });

    drawBoard(tt);

    var wP = spkW('P', tt, 3), wC = spkW('C', tt, 3), sum = wP + wC;
    if (sum > 1) { wP /= sum; wC /= sum; }
    var k = 0.55;
    for (var q = 0; q < 3; q++) {
      camPos.setComponent(q, camW.p[q] + k * (wP * (camP.p[q] - camW.p[q]) + wC * (camC.p[q] - camW.p[q])));
      camTgt.setComponent(q, camW.t[q] + k * (wP * (camP.t[q] - camW.t[q]) + wC * (camC.t[q] - camW.t[q])));
    }
    camPos.x += 0.08 * Math.sin(tt * 0.25);
    camera.position.copy(camPos); camera.lookAt(camTgt);
    renderer.render(scene, camera);
  }

'''
S=cut(S,"  /* ---------- quadro a quadro ---------- */","  function resize() {",FRAME)
open('ep6.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test6.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re,json
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check7.js','w').write(m[-1])
L=re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}",S)
json.dump({i:t.replace("\\'","'") for i,w,t in L},open('script6.json','w'),ensure_ascii=False)
