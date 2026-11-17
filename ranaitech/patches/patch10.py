# Aula 10 — Como achar erros no código (ler a mensagem de erro + print para investigar)
# Uso (dentro de ranaitech/): python3 patches/patch10.py  -> aulas/aula-10/aula10.html + script.json
import os, re, json
SRC = 'base/aula9.html'; D = 'aulas/aula-10'; OUT = D + '/aula10.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]

HEAD = r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula dez: como achar erros no código. Todo programador erra, o segredo é saber investigar!' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Professor, apareceu um texto vermelho na tela! Eu quebrei o computador!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Calma! Isso é uma mensagem de erro, e ela é sua amiga: diz a linha e o problema. Linha dois, nome não encontrado.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Ah, eu escrevi nome com dois E! Vou apagar o programa inteiro e começar de novo.' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Não precisa! É só corrigir aquela linha e rodar de novo.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Funcionou! Mas agora a conta da pizza deu zero reais, e nenhum erro apareceu.' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Aí a gente investiga com o print. Coloca um print no meio do código pra ver o valor de cada variável.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'O print mostrou pessoas igual a zero! Esqueci de contar os amigos!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Isso, detetive! Leia o erro, use o print e ache o culpado. Na próxima aula: comentários no código. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou caçar bugs de lupa na mão!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Se aprendeu algo hoje, curte, compartilha com um amigo e segue o canal!' }
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
    P1: ['happy', 'happy'], C1: ['curious', 'worried'], P2: ['happy', 'curious'], C2: ['worried', 'hurt'],
    P3: ['smirk', 'curious'], C3: ['curious', 'worried'], P4: ['proud', 'curious'], C4: ['happy', 'eureka'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'palms'], ['P2', 0.5, 'ptBoard'], ['C2', 0, 'crossed'],
    ['P3', 0, 'open'], ['P3', 0.5, 'ptBoard'], ['C3', 0, 'rest'], ['P4', 0, 'ptBox'], ['P4', 0.5, 'ptBoard'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'up2'], ['P2', 0, 'chin'], ['C2', 0, 'hand'], ['C2', 0.5, 'droop'], ['P3', 0, 'rest'], ['C3', 0, 'up2'], ['C3', 0.5, 'fidget'], ['P4', 0, 'chin'],
    ['C4', 0, 'eureka'], ['P5', 0, 'rest'], ['P5', 0.12, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

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
      w0: BYID.P1.t0 + 0.5, w1: ev('C3', 0.3),
      A0: ev('C1', 0.1), A1: ev('C1', 0.3), A2: ev('C1', 0.55), fix: ev('P3', 0.45),
      B0: ev('C3', 0.3) + 0.75, B1: ev('C3', 0.55), B2: ev('P4', 0.3), B3: ev('C4', 0.12), fix2: ev('P5', 0.05),
      err: ev('C1', 0.3), pL: ev('P2', 0.55), pN: ev('P2', 0.72), ok: ev('P3', 0.45),
      pP: ev('P4', 0.35), lupa: ev('P4', 0.3), tot: ev('P5', 0.05),
      hop: ev('C4', 0.5), jump: ev('P5', 0.1),
      alertI: ev('C1', 0.05), trashI: ev('C2', 0.5), noI: ev('P3', 0.0), okA: ev('P3', 0.55), alertI2: ev('C3', 0.55),
      lupaI: ev('C4', 0.1), okB: ev('P5', 0.0), lupaI2: ev('C5', 0.3),
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
S = cut(S, "  var WPS = 3.0;", "  /* ======================= interface do roteiro", HEAD)

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    var phB = tt >= EV.w1 + 0.7, fx = tt >= EV.fix, fx2 = tt >= EV.fix2;
    var a0 = n(EV.A0, 16), a1 = n(EV.A1, 12), a2 = n(EV.A2, 26), b0 = n(EV.B0, 12), b1 = n(EV.B1, 20), b2 = n(EV.B2, 14), b3 = n(EV.B3, 16);
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, fx, fx2, a0, a1, a2, b0, b1, b2, b3, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('DEBUG', 512, 200);
      bx.fillStyle = '#ffffff'; bx.font = '700 66px ' + FD; bx.fillText('= caçar erros', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 52px ' + FM;
      bx.fillStyle = '#7fd4ff'; bx.fillText('nome = "Cubinho"'.slice(0, a0), 80, 95);
      if (!fx) {
        bx.fillStyle = '#ffd6a0'; bx.fillText('print(nomee)'.slice(0, a1), 80, 190);
        if (a1 >= 12) { bx.strokeStyle = '#ff6b6b'; bx.lineWidth = 6; bx.beginPath(); bx.moveTo(80 + 6 * 31.2, 222); bx.lineTo(80 + 11 * 31.2, 222); bx.stroke(); }
        bx.fillStyle = '#ff9a9a'; bx.font = '500 46px ' + FM; bx.fillText('Erro na linha 2:'.slice(0, a2), 80, 320);
        bx.fillText("NameError: 'nomee'".slice(0, Math.max(0, a2 - 8)), 80, 400);
      } else {
        bx.fillStyle = '#9af2c8'; bx.fillText('print(nome)', 80, 190);
        bx.fillStyle = '#ffffff'; bx.fillText('> Cubinho', 80, 320);
      }
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 52px ' + FM;
      bx.fillStyle = fx2 ? '#9af2c8' : '#7fd4ff'; bx.fillText((fx2 ? 'pessoas = 4' : 'pessoas = 0').slice(0, b0), 80, 85);
      bx.fillStyle = '#7fd4ff'; bx.fillText('total = 30 * pessoas'.slice(0, b1), 80, 175);
      bx.fillStyle = '#ffe69a'; bx.fillText('print(pessoas)'.slice(0, b2), 80, 300);
      bx.fillStyle = '#ff9a9a'; bx.fillText((fx2 ? '> 4' : '> 0  # culpado!').slice(0, b3), 80, 390);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

BLOCK = r'''  /* ---------- placas, resultados e ícones ---------- */
  function panelTex(label, val, vcol) {
    return labelTex(function (x, w, h) {
      x.fillStyle = '#fff7e0'; rr(x, 6, 6, w - 12, h - 12, 36); x.fill();
      x.lineWidth = 12; x.strokeStyle = '#c98f5b'; rr(x, 6, 6, w - 12, h - 12, 36); x.stroke();
      x.fillStyle = '#e8c27a'; rr(x, 6, 6, w - 12, 96, 36); x.fill(); x.fillRect(6, 60, w - 12, 42);
      x.fillStyle = '#7a4a12'; x.font = '700 54px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, w / 2, 58);
      x.fillStyle = vcol || '#2b2b3a'; x.font = '700 ' + (val.length > 5 ? 88 : 120) + 'px ' + FM; x.fillText(val, w / 2, 202);
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
  var rErr = mkPlane(resTex('ERRO!', '#e0484f'), 0.9, 0.53), rOk = mkPlane(resTex('RODOU!', '#2fae7a'), 0.9, 0.53);
  var pnL = mkPlane(panelTex('linha', '2', '#e0484f'), 0.9, 0.53), pnN = mkPlane(panelTex('nome', 'nomee', '#e0484f'), 0.9, 0.53);
  var pnP0 = mkPlane(panelTex('pessoas', '0', '#e0484f'), 0.9, 0.53), pnP4 = mkPlane(panelTex('pessoas', '4', '#2fae7a'), 0.9, 0.53);
  var rTot = mkPlane(resTex('R$ 120', '#2fae7a'), 0.9, 0.53);

  function iconTex(kind, label) {
    return labelTex(function (x, w, h) {
      var C = { ok: '#2fae7a', no: '#e0484f', alert: '#f59e0b', trash: '#8a94a6', lupa: '#4a90e2', heart: '#ff4d7d', share: '#4a90e2', plus: '#2fae7a' }[kind];
      x.fillStyle = C; x.beginPath(); x.arc(128, 128, 118, 0, 6.3); x.fill();
      x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
      x.strokeStyle = '#fff'; x.fillStyle = '#fff'; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = 28;
      if (kind === 'ok') { x.beginPath(); x.moveTo(72, 132); x.lineTo(112, 172); x.lineTo(188, 86); x.stroke(); }
      if (kind === 'no') { x.beginPath(); x.moveTo(84, 84); x.lineTo(172, 172); x.moveTo(172, 84); x.lineTo(84, 172); x.stroke(); }
      if (kind === 'alert') { x.font = '700 170px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('!', 128, 138); }
      if (kind === 'lupa') {
        x.lineWidth = 20; x.beginPath(); x.arc(112, 110, 46, 0, 6.3); x.stroke();
        x.lineWidth = 30; x.beginPath(); x.moveTo(146, 146); x.lineTo(190, 190); x.stroke();
      }
      if (kind === 'trash') {
        rr(x, 80, 96, 96, 104, 10); x.fill(); rr(x, 66, 74, 124, 18, 6); x.fill(); rr(x, 108, 60, 40, 18, 6); x.fill();
        x.strokeStyle = C; x.lineWidth = 9; x.beginPath(); [108, 128, 148].forEach(function (q) { x.moveTo(q, 112); x.lineTo(q, 184); }); x.stroke();
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
  var icAlert = mkIcon('alert', '', 0.5), icAlert2 = mkIcon('alert', '', 0.5), icTrash = mkIcon('trash', '', 0.5), icNo = mkIcon('no', '', 0.5),
      icOkA = mkIcon('ok', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icLupa = mkIcon('lupa', '', 0.52), icLupa2 = mkIcon('lupa', '', 0.52),
      bigLupa = mkIcon('lupa', '', 0.62),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);

'''
S = cut(S, "  /* ---------- portão do parque, lâmpadas e ícones ---------- */", "  var CONF = [], CC", BLOCK)

FRAME = r'''  /* ---------- quadro a quadro ---------- */
  var camW = { p: [0, 2.0, 19.8], t: [0, 1.7, 0] }, camP = { p: [-0.5, 2.0, 18.4], t: [-0.45, 1.7, 0] }, camC = { p: [0.5, 2.0, 18.4], t: [0.45, 1.7, 0] };
  var camPos = new THREE.Vector3(), camTgt = new THREE.Vector3();
  function hopY(tt) { var u = (tt - EV.hop) / 0.55; return (u > 0 && u < 1) ? 0.45 * 4 * u * (1 - u) : 0; }
  function glitchF(tt) { var u = tt - EV.err; return (u > 0 && u < 0.6) ? 1 - u / 0.6 : 0; }
  function eraserUpdate(tt) {
    var w = (tt < EV.w1 - 0.3) ? EV.w0 : EV.w1;
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
  function win(m, tt, t0, t1, x, y, bob, k) {
    var s = pop(tt, t0, 0.45) * (1 - S(tt, t1, t1 + 0.3)) * (k || 1);
    m.visible = s > 0.01 && tt >= t0; m.scale.setScalar(Math.max(s, 0.001));
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
    win(rErr, tt, EV.err, BYID.P2.t0 + 0.4, 0.15, 2.3, 0, hide);
    win(pnL, tt, EV.pL, EV.ok - 0.3, -0.5, 2.3, 1, hide);
    win(pnN, tt, EV.pN, EV.ok - 0.3, 0.6, 2.3, 2, hide);
    win(rOk, tt, EV.ok, EV.w1, 0.05, 2.3, 3, hide);
    win(pnP0, tt, EV.pP, ev('C4', 0.6), -0.5, 2.3, 1, hide);
    win(pnP4, tt, ev('C4', 0.6) + 0.25, 999, -0.5, 2.3, 1, hide);
    win(bigLupa, tt, EV.lupa, EV.tot - 0.3, 0.6, 2.3, 2, hide);
    win(rTot, tt, EV.tot, 999, 0.6, 2.3, 3, hide);
    [rErr, pnL, pnN, rOk, pnP0, pnP4, bigLupa, rTot].forEach(function (m) { if (hide < 0.02) m.visible = false; });

    showIcon(icAlert, tt, EV.alertI, 1.8, 2.15, 2.55);
    showIcon(icTrash, tt, EV.trashI, 1.6, 2.15, 2.55);
    showIcon(icNo, tt, EV.noI, 0.9, -2.15, 2.6);
    showIcon(icOkA, tt, EV.okA, 1.4, -2.15, 2.6);
    showIcon(icAlert2, tt, EV.alertI2, 1.6, 2.15, 2.55);
    showIcon(icLupa, tt, EV.lupaI, 1.8, 2.15, 2.55);
    showIcon(icOkB, tt, EV.okB, 1.4, -2.15, 2.6);
    showIcon(icLupa2, tt, EV.lupaI2, 1.3, 2.15, 2.55);
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
S = cut(S, "  /* ---------- quadro a quadro ---------- */", "  function resize() {", FRAME)
S = S.replace("if (reduce) { t = ev('C3', 0.8);", "if (reduce) { t = ev('P2', 0.8);")
S = S.replace('ensina variáveis a um aluno desastrado', 'ensina a achar erros no código a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
