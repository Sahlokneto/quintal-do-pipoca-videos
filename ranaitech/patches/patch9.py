S=open('ep8.html').read()
def cut(s,a,b,new):
    i=s.index(a); j=s.index(b,i); return s[:i]+new+s[j:]

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula nove: operadores lógicos! Eles juntam condições, como o E e o OU.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Hoje eu quero ir na montanha-russa!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Boa! Pra entrar, precisa ter ingresso E ter altura mínima. Com o E, as duas condições têm que ser verdadeiras.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Eu tenho o ingresso, mas sou baixinho. Posso entrar?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Tem ingresso, então pode entrar. Pronto, liberado!' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Calma, professor! O E exige as duas, e a altura falhou. Eu não entro!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Opa, quem errou fui eu! Com o E, se uma condição falha, tudo falha. Já com o OU, basta uma ser verdadeira, tipo ingresso OU passe de aniversariante.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Então com o OU, o aniversariante entra mesmo sem ingresso!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Isso! Hoje o aluno ensinou o professor. Cubinho, comemora do seu jeito! Na próxima aula: como achar erros no código. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau, professor! E não esquece o ingresso!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Se essa aula valeu a pena, deixa o like, chama um amigo pra aprender junto e segue o canal!' }
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
    P1: ['happy', 'happy'], C1: ['happy', 'joy'], P2: ['happy', 'curious'], C2: ['neutral', 'worried'],
    P3: ['proud', 'curious'], C3: ['worried', 'proud'], P4: ['worried', 'smirk'], C4: ['happy', 'eureka'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'ptBoard'], ['P2', 0.5, 'ptBox'], ['C2', 0, 'rest'],
    ['P3', 0, 'open'], ['C3', 0, 'rest'], ['P4', 0, 'palms'], ['P4', 0.5, 'ptBoard'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'up2'], ['P2', 0, 'chin'], ['C2', 0, 'hand'], ['P3', 0, 'rest'], ['C3', 0, 'up2'], ['P4', 0, 'chin'],
    ['C4', 0, 'eureka'], ['P5', 0, 'rest'], ['P5', 0.4, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

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
      A0: ev('P2', 0.3), A1: ev('C3', 0.5), A2: ev('P4', 0.5), A3: ev('C4', 0.3),
      p1: ev('P2', 0.3), p2: ev('P2', 0.5), op: ev('P2', 0.62),
      l1On: ev('C2', 0.3), l2Fail: ev('C2', 0.65),
      resYes: ev('P3', 0.55), resNo: ev('C3', 0.75), orMode: ev('P4', 0.5), l2Bday: ev('C4', 0.2), resYes2: ev('C4', 0.55),
      hop: ev('P5', 0.42), jump: ev('P5', 0.42),
      okA: ev('P2', 0.02), tickA: ev('C1', 0.5), alertI: ev('C3', 0.02), noI: ev('P4', 0.0), giftI: ev('C4', 0.25), okB: ev('P5', 0.0), tickB: ev('C5', 0.4),
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
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    var a0 = n(EV.A0, 24), a1 = n(EV.A1, 26), a2 = n(EV.A2, 26), a3 = n(EV.A3, 26);
    var key = [Math.round(e0 * 30), a0, a1, a2, a3, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('E  /  OU', 512, 200);
      bx.fillStyle = '#ffffff'; bx.font = '700 66px ' + FD; bx.fillText('= juntar condições', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 52px ' + FM;
      bx.fillStyle = '#7fd4ff'; bx.fillText('ingresso and altura'.slice(0, a0), 80, 90);
      bx.fillStyle = '#ff9a9a'; bx.fillText('# True and False = False'.slice(0, a1), 80, 175);
      bx.fillStyle = '#ffd6a0'; bx.fillText('ingresso or aniversario'.slice(0, a2), 80, 300);
      bx.fillStyle = '#9af2c8'; bx.fillText('# False or True = True'.slice(0, a3), 80, 385);
    }
    boardTex.needsUpdate = true;
  }

'''
S=cut(S,"  function drawBoard(tt) {","  var woodM",BOARD)

BLOCK=r'''  /* ---------- portão do parque, lâmpadas e ícones ---------- */
  var cGray = col(0x6b7280), cGreen = col(0x2fdc7a), cRed = col(0xe0484f);
  function panelTex(label) {
    return labelTex(function (x, w, h) {
      x.fillStyle = '#fff7e0'; rr(x, 6, 6, w - 12, h - 12, 36); x.fill();
      x.lineWidth = 12; x.strokeStyle = '#c98f5b'; rr(x, 6, 6, w - 12, h - 12, 36); x.stroke();
      x.fillStyle = '#e8c27a'; rr(x, 6, 6, w - 12, 96, 36); x.fill(); x.fillRect(6, 60, w - 12, 42);
      x.fillStyle = '#7a4a12'; x.font = '700 54px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, w / 2, 58);
    }, 512, 300);
  }
  function resTex(txt, hex) {
    return labelTex(function (x, w, h) {
      x.fillStyle = hex; rr(x, 6, 6, w - 12, h - 12, 40); x.fill();
      x.lineWidth = 12; x.strokeStyle = 'rgba(255,255,255,0.9)'; rr(x, 6, 6, w - 12, h - 12, 40); x.stroke();
      x.fillStyle = '#fff'; x.font = '700 ' + (txt.length > 6 ? 82 : 112) + 'px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 6);
    }, 512, 300);
  }
  function mkPlane(tex, w, h) {
    var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var pn1 = mkPlane(panelTex('ingresso'), 0.9, 0.53), pn2a = mkPlane(panelTex('altura'), 0.9, 0.53), pn2b = mkPlane(panelTex('aniversário'), 0.9, 0.53);
  var rYes = mkPlane(resTex('ENTRA', '#2fae7a'), 0.9, 0.53), rNo = mkPlane(resTex('NÃO ENTRA', '#e0484f'), 0.9, 0.53);
  function mkDisc() {
    var d = new THREE.Mesh(new THREE.CircleGeometry(0.14, 28), new THREE.MeshBasicMaterial({ color: cGray.clone() }));
    d.scale.setScalar(0.001); d.visible = false; scene.add(d); return d;
  }
  var disc1 = mkDisc(), disc2 = mkDisc();
  function opTex(txt, hex, fs) {
    return labelTex(function (x, w, h) {
      x.fillStyle = hex; x.beginPath(); x.arc(w / 2, h / 2, 118, 0, 6.3); x.fill();
      x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
      x.fillStyle = '#fff'; x.font = '700 ' + fs + 'px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 8);
    }, 256, 256);
  }
  var opE = mkPlane(opTex('E', '#4a90e2', 170), 0.34, 0.34), opO = mkPlane(opTex('OU', '#f08a4b', 120), 0.34, 0.34);

  function iconTex(kind, label) {
    return labelTex(function (x, w, h) {
      var C = { ok: '#2fae7a', no: '#e0484f', ticket: '#e8a317', gift: '#ff6fa5', alert: '#f59e0b', heart: '#ff4d7d', share: '#4a90e2', plus: '#2fae7a' }[kind];
      x.fillStyle = C; x.beginPath(); x.arc(128, 128, 118, 0, 6.3); x.fill();
      x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
      x.strokeStyle = '#fff'; x.fillStyle = '#fff'; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = 28;
      if (kind === 'ok') { x.beginPath(); x.moveTo(72, 132); x.lineTo(112, 172); x.lineTo(188, 86); x.stroke(); }
      if (kind === 'no') { x.beginPath(); x.moveTo(84, 84); x.lineTo(172, 172); x.moveTo(172, 84); x.lineTo(84, 172); x.stroke(); }
      if (kind === 'alert') { x.font = '700 170px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('!', 128, 138); }
      if (kind === 'ticket') {
        rr(x, 40, 86, 176, 84, 14); x.fill();
        x.fillStyle = C; x.beginPath(); x.arc(40, 128, 15, 0, 6.3); x.fill(); x.beginPath(); x.arc(216, 128, 15, 0, 6.3); x.fill();
        x.strokeStyle = C; x.lineWidth = 6; x.setLineDash([9, 9]); x.beginPath(); x.moveTo(150, 96); x.lineTo(150, 162); x.stroke(); x.setLineDash([]);
        x.fillStyle = C; x.font = '700 40px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VIP', 95, 130);
      }
      if (kind === 'gift') {
        rr(x, 62, 124, 132, 80, 10); x.fill(); rr(x, 52, 100, 152, 34, 8); x.fill();
        x.fillStyle = C; x.fillRect(116, 100, 24, 104);
        x.fillStyle = '#fff'; x.beginPath(); x.arc(104, 82, 19, 0, 6.3); x.fill(); x.beginPath(); x.arc(152, 82, 19, 0, 6.3); x.fill();
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
  var icOkA = mkIcon('ok', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icTickA = mkIcon('ticket', '', 0.52), icTickB = mkIcon('ticket', '', 0.52),
      icAlert = mkIcon('alert', '', 0.5), icNo = mkIcon('no', '', 0.5), icGift = mkIcon('gift', '', 0.52),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);

'''
S=cut(S,"  /* ---------- máquina da função, resultado e ícones ---------- */","  var CONF = [], CC",BLOCK)

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
  function followDisc(d, p, colr, pulseT) {
    d.visible = p.visible;
    var pl = 1 + 0.35 * Math.sin(Math.PI * lin(tt0, pulseT, pulseT + 0.35));
    d.scale.setScalar(Math.max(p.scale.x * pl, 0.001));
    d.position.set(p.position.x, p.position.y - 0.11 * p.scale.x, 0.72);
    d.material.color.copy(colr);
  }
  var tt0 = 0;
  function frame(tt) {
    tt0 = tt;
    updateChar(prof, tt, 'P'); updateChar(cube, tt, 'C');
    var hide = 1 - S(tt, BYID.P6.t0 - 0.1, BYID.P6.t0 + 0.25);
    var orM = tt >= EV.orMode;
    put(pn1, tt, EV.p1, -1.0, 2.3, 0, hide);
    put(pn2a, tt, EV.p2, 0.15, 2.3, 1, hide); if (orM) pn2a.visible = false;
    put(pn2b, tt, EV.orMode, 0.15, 2.3, 1, hide); if (!orM) pn2b.visible = false;
    var p2 = orM ? pn2b : pn2a;
    var c1 = tt < EV.l1On ? cGray : (orM ? cRed : cGreen);
    var c2 = tt < EV.l2Fail ? cGray : (orM ? (tt < EV.l2Bday ? cGray : cGreen) : cRed);
    followDisc(disc1, pn1, c1, orM ? EV.orMode : EV.l1On);
    followDisc(disc2, p2, c2, orM ? EV.l2Bday : EV.l2Fail);
    // operador E / OU
    put(opE, tt, EV.op, -0.425, 2.3, 2, hide); if (orM) opE.visible = false;
    put(opO, tt, EV.orMode, -0.425, 2.3, 2, hide); if (!orM) opO.visible = false;
    // resultado
    var yesOn = (tt >= EV.resYes && tt < EV.resNo) || tt >= EV.resYes2;
    put(rYes, tt, tt >= EV.resYes2 ? EV.resYes2 : EV.resYes, 1.2, 2.3, 3, hide); if (!yesOn) rYes.visible = false;
    put(rNo, tt, EV.resNo, 1.2, 2.3, 3, hide); if (!(tt >= EV.resNo && tt < EV.orMode)) rNo.visible = false;
    [pn1, pn2a, pn2b, rYes, rNo, opE, opO].forEach(function (m) { if (hide < 0.02) m.visible = false; });
    if (hide < 0.02) { disc1.visible = false; disc2.visible = false; }

    showIcon(icOkA, tt, EV.okA, 1.6, -2.15, 2.6);
    showIcon(icTickA, tt, EV.tickA, 1.8, 2.15, 2.55);
    showIcon(icAlert, tt, EV.alertI, 1.8, 2.15, 2.55);
    showIcon(icNo, tt, EV.noI, 1.8, -2.15, 2.6);
    showIcon(icGift, tt, EV.giftI, 1.6, 2.15, 2.55);
    showIcon(icOkB, tt, EV.okB, 1.4, -2.15, 2.6);
    showIcon(icTickB, tt, EV.tickB, 1.3, 2.15, 2.55);
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
open('ep9.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test9.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re,json
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check10.js','w').write(m[-1])
L=re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}",S)
json.dump({i:t.replace("\\'","'") for i,w,t in L},open('script9.json','w'),ensure_ascii=False)
