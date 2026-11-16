S=open('ep7.html').read()
def cut(s,a,b,new):
    i=s.index(a); j=s.index(b,i); return s[:i]+new+s[j:]

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula oito: funções com retorno! Retorno é o valor que a função devolve pra você, como o troco de uma compra.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo pedir uma pizza e receber a pizza?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Isso! Veja: a função dobrar recebe um número e devolve o dobro. Dobrar de quatro devolve oito.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Então ela mostra o oito na tela, né?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Errado, meu querido! Mostrar na tela é uma coisa, devolver é outra. O return entrega o valor, e você guarda numa variável.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Ahh, então ela devolve, e eu guardo pra usar depois!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Isso! Resultado igual a dobrar de quatro, e agora o resultado vale oito. Dá pra usar em qualquer lugar.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Igual o troco, sempre volta pra mim!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Viu? Você não é burrinho, só estava confundindo mostrar com devolver. Comemora com um pulinho! Na próxima aula: operadores lógicos. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau, professor!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Valeu por assistir! Curte, compartilha com um amigo e segue pra mais aulas!' }
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
    P3: ['smirk', 'worried'], C3: ['smirk', 'eureka'], P4: ['happy', 'happy'], C4: ['smirk', 'happy'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'ptBoard'], ['P2', 0.5, 'ptBox'], ['C2', 0, 'rest'],
    ['P3', 0, 'palms'], ['P3', 0.5, 'ptBox'], ['C3', 0, 'rest'], ['P4', 0, 'palms'], ['P4', 0.5, 'ptBoard'], ['C4', 0, 'rest'],
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
      L0: ev('P2', 0.1), L1: ev('P2', 0.3), L2: ev('P4', 0.12), L3: ev('P4', 0.55),
      mach: ev('P2', 0.12), in4: ev('P2', 0.5), out8: ev('P2', 0.82),
      resC: ev('P3', 0.45), fly8: ev('P3', 0.78), flash: ev('P4', 0.55),
      hop: ev('C3', 0.2), jump: ev('P5', 0.5),
      okA: ev('P2', 0.02), bulbA: ev('C1', 0.55), tvI: ev('C2', 0.45), noI: ev('P3', 0.03), bulbB: ev('C3', 0.35), okB: ev('P4', 0.0), coinI: ev('C4', 0.3),
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

BOARD=r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.7) * k); }
    var a0 = n(EV.L0, 20), a1 = n(EV.L1, 20), a2 = n(EV.L2, 26), a3 = n(EV.L3, 20);
    var key = [Math.round(e0 * 30), a0, a1, a2, a3, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('RETORNO', 512, 200);
      bx.fillStyle = '#ffffff'; bx.font = '700 58px ' + FD; bx.fillText('= a função devolve um valor', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 52px ' + FM;
      bx.fillStyle = '#ffe69a'; bx.fillText('def dobrar(n):'.slice(0, a0), 80, 90);
      bx.fillStyle = '#9af2c8'; bx.fillText('   return n * 2'.slice(0, a1), 80, 175);
      bx.fillStyle = '#7fd4ff'; bx.fillText('resultado = dobrar(4)'.slice(0, a2), 80, 300);
      bx.fillStyle = '#ffd6a0'; bx.fillText('# resultado vale 8'.slice(0, a3), 80, 385);
    }
    boardTex.needsUpdate = true;
  }

'''
S=cut(S,"  var BL = [","  var woodM",BOARD)

BLOCK=r'''  /* ---------- máquina da função, resultado e ícones ---------- */
  var mach = new THREE.Group(), machLight;
  (function () {
    var body = mk(roundedBox(1.35, 0.8, 0.5, 0.08, 6), mat(0x4a90e2, { roughness: 0.5 }), true); mach.add(body);
    var ci = mk(roundedBox(0.22, 0.3, 0.34, 0.04, 4), mat(0x2f5fa8), true); ci.position.set(-0.76, 0, 0); mach.add(ci);
    var co = mk(roundedBox(0.22, 0.3, 0.34, 0.04, 4), mat(0x2f5fa8), true); co.position.set(0.76, 0, 0); mach.add(co);
    var tex = labelTex(function (x, w, h) {
      x.fillStyle = '#1f3d6e'; rr(x, 4, 4, w - 8, h - 8, 30); x.fill();
      x.fillStyle = '#fff'; x.font = '700 80px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('dobrar()', w / 2, h / 2 + 4);
    }, 512, 160);
    var lb = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.34), new THREE.MeshBasicMaterial({ map: tex })); lb.position.set(0, -0.05, 0.26); mach.add(lb);
    machLight = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 10), new THREE.MeshBasicMaterial({ color: col(0xe0484f) })); machLight.position.set(0.5, 0.25, 0.27); mach.add(machLight);
    mach.scale.setScalar(0.001); mach.visible = false; scene.add(mach);
  })();
  var colG = col(0x2fdc7a), colR = col(0xe0484f);

  function tokTex(txt, hex) {
    return labelTex(function (x, w, h) {
      x.fillStyle = hex; x.beginPath(); x.arc(w / 2, h / 2, 118, 0, 6.3); x.fill();
      x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
      x.fillStyle = '#fff'; x.font = '700 160px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 8);
    }, 256, 256);
  }
  function mkTok(txt, hex) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: tokTex(txt, hex), transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var tok4 = mkTok('4', '#e8913a'), tok8 = mkTok('8', '#2fae7a');

  function cardTex(key, val, hl) {
    return labelTex(function (x, w, h) {
      x.fillStyle = hl ? '#e6fff0' : '#fff7e0'; rr(x, 6, 6, w - 12, h - 12, 36); x.fill();
      x.lineWidth = 12; x.strokeStyle = hl ? '#2fae7a' : '#c98f5b'; rr(x, 6, 6, w - 12, h - 12, 36); x.stroke();
      x.fillStyle = '#e8c27a'; rr(x, 6, 6, w - 12, 96, 36); x.fill(); x.fillRect(6, 60, w - 12, 42);
      x.fillStyle = '#7a4a12'; x.font = '700 54px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(key, w / 2, 58);
      x.fillStyle = '#2b2b3a'; x.font = '700 120px ' + FD; x.fillText(val, w / 2, 212);
    }, 512, 300);
  }
  function mkCard(key, val, hl) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(1.02, 0.6), new THREE.MeshBasicMaterial({ map: cardTex(key, val, hl), transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var cardR = mkCard('resultado', '?', false), cardR8 = mkCard('resultado', '8', true);

  function iconTex(kind, label) {
    return labelTex(function (x, w, h) {
      var C = { ok: '#2fae7a', no: '#e0484f', bulb: '#ffb703', tv: '#4a90e2', coin: '#e8a317', heart: '#ff4d7d', share: '#4a90e2', plus: '#2fae7a' }[kind];
      x.fillStyle = C; x.beginPath(); x.arc(128, 128, 118, 0, 6.3); x.fill();
      x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
      x.strokeStyle = '#fff'; x.fillStyle = '#fff'; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = 28;
      if (kind === 'ok') { x.beginPath(); x.moveTo(72, 132); x.lineTo(112, 172); x.lineTo(188, 86); x.stroke(); }
      if (kind === 'no') { x.beginPath(); x.moveTo(84, 84); x.lineTo(172, 172); x.moveTo(172, 84); x.lineTo(84, 172); x.stroke(); }
      if (kind === 'coin') { x.font = '700 140px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('$', 128, 136); }
      if (kind === 'tv') {
        rr(x, 52, 72, 152, 106, 16); x.fill(); x.fillStyle = '#2b2b3a'; rr(x, 64, 84, 128, 82, 10); x.fill();
        x.fillStyle = '#6ef0a6'; x.font = '700 76px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('8', 128, 128);
        x.fillStyle = '#fff'; x.fillRect(112, 182, 32, 12); x.fillRect(92, 194, 72, 10);
      }
      if (kind === 'bulb') {
        x.beginPath(); x.arc(128, 108, 46, 0, 6.3); x.fill(); x.fillRect(108, 146, 40, 14); x.fillRect(112, 166, 32, 12);
        x.lineWidth = 12; [[128, 36, 128, 22], [60, 70, 48, 62], [196, 70, 208, 62], [48, 116, 34, 116], [208, 116, 222, 116]].forEach(function (q) { x.beginPath(); x.moveTo(q[0], q[1]); x.lineTo(q[2], q[3]); x.stroke(); });
      }
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
      icNo = mkIcon('no', '', 0.5), icTv = mkIcon('tv', '', 0.5), icCoin = mkIcon('coin', '', 0.5),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);

'''
S=cut(S,"  /* ---------- pizzas, nomes, anel e ícones ---------- */","  var CONF = [], CC",BLOCK)

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
    // máquina
    put(mach, tt, EV.mach, -0.75, 2.2, 0, hide);
    var sh = (tt > EV.in4 + 0.5 && tt < EV.out8 + 0.05) ? 0.025 * Math.sin(tt * 45) : 0;
    mach.position.x += sh;
    machLight.material.color.copy(sh !== 0 ? colG : colR);
    if (hide < 0.02) mach.visible = false;
    // token 4 entra
    var t4 = tt - EV.in4, s4 = pop(t4 + 0.0, 0, 0.3) * (1 - S(t4, 0.5, 0.68));
    tok4.visible = t4 > 0 && s4 > 0.02; tok4.scale.setScalar(Math.max(s4, 0.001) * hide);
    tok4.position.set(lerp(-2.1, -1.3, S(t4, 0, 0.55)), 2.2, 0.9);
    // token 8 sai e voa para o resultado
    var t8 = tt - EV.out8, tf = tt - EV.fly8;
    var s8 = pop(t8, 0, 0.35) * (1 - S(tf, 0.5, 0.65)) * hide;
    tok8.visible = t8 > 0 && s8 > 0.02; tok8.scale.setScalar(Math.max(s8, 0.001));
    var px = lerp(-0.06, 0.42, S(t8, 0, 0.5)), py = 2.2;
    if (tf > 0) { var uu = lin(tf, 0, 0.6); px = lerp(0.42, 1.1, S(uu, 0, 1)); py = 2.2 + 0.3 * 4 * uu * (1 - uu); }
    tok8.position.set(px, py, 0.9);
    // cartão resultado
    put(cardR, tt, EV.resC, 1.2, 2.3, 1, hide);
    if (tt >= EV.fly8 + 0.55) cardR.visible = false;
    put(cardR8, tt, EV.fly8 + 0.55, 1.2, 2.3, 1, hide);
    var fl = lin(tt, EV.flash, EV.flash + 0.5);
    if (cardR8.visible && fl > 0 && fl < 1) cardR8.scale.setScalar(cardR8.scale.x * (1 + 0.2 * Math.sin(Math.PI * fl)));
    [cardR, cardR8].forEach(function (m) { if (hide < 0.02) m.visible = false; });

    showIcon(icOkA, tt, EV.okA, 1.6, -2.15, 2.6);
    showIcon(icBulbA, tt, EV.bulbA, 1.8, 2.15, 2.55);
    showIcon(icTv, tt, EV.tvI, 1.5, 2.15, 2.55);
    showIcon(icNo, tt, EV.noI, 2.4, 2.15, 2.55);
    showIcon(icBulbB, tt, EV.bulbB, 1.8, 2.15, 2.55);
    showIcon(icOkB, tt, EV.okB, 1.4, -2.15, 2.6);
    showIcon(icCoin, tt, EV.coinI, 1.6, 2.15, 2.55);
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
open('ep8.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test8.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re,json
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check9.js','w').write(m[-1])
L=re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}",S)
json.dump({i:t.replace("\\'","'") for i,w,t in L},open('script8.json','w'),ensure_ascii=False)
