S=open('ep6.html').read()
def cut(s,a,b,new):
    i=s.index(a); j=s.index(b,i); return s[:i]+new+s[j:]

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula sete: percorrendo listas! Percorrer é passar por cada item da lista, um de cada vez.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo ver cada sabor de pizza, um por um?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Isso! Usamos o for: para cada sabor na lista, mostre o sabor. Ele repete o mesmo código para cada item, sozinho.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Então ele só mostra a calabresa, né?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Errado, meu querido! O for passa por todos: calabresa, queijo, frango, um depois do outro, até a lista acabar.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Nossa, então eu não preciso escrever três vezes!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Exatamente! Com mil sabores, o código continua do mesmo tamanho. É o loop e a lista trabalhando juntos.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Preguiça de programador, eu entendi!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Viu? Você não é burrinho, só estava com preguiça, igual a todo programador. Comemora com um pulinho! Na próxima aula: funções com retorno. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau, professor!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curtiu? Deixa o like, manda pra um amigo e segue o canal pra aprender mais!' }
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
      L: [ev('P1', 0.6), ev('P1', 0.68), ev('P1', 0.76), ev('P1', 0.84), ev('P1', 0.91)],
      pz: [ev('P1', 0.72), ev('P1', 0.8), ev('P1', 0.88)],
      f1: ev('P2', 0.14), f2: ev('P2', 0.32),
      ring0: ev('C2', 0.55), hop1: ev('P3', 0.5), hop2: ev('P3', 0.64),
      nm: [ev('P3', 0.36), ev('P3', 0.52), ev('P3', 0.66)],
      hop: ev('C3', 0.2), jump: ev('P5', 0.5),
      okA: ev('P2', 0.02), bulbA: ev('C1', 0.55), noI: ev('P3', 0.03), bulbB: ev('C3', 0.35), okB: ev('P4', 0.0), zzI: ev('C4', 0.3),
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

BOARD=r'''  var BL = ['sabores = [', '   "calabresa",', '   "queijo",', '   "frango"', ']'];
  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0);
    var lN = EV.L.map(function (t0) { return Math.round(lin(tt, t0, t0 + 0.6) * 24); });
    var f1 = Math.round(lin(tt, EV.f1, EV.f1 + 0.8) * 24), f2 = Math.round(lin(tt, EV.f2, EV.f2 + 0.8) * 24);
    var key = [Math.round(e0 * 30), lN.join('.'), f1, f2, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 130px ' + FM; bx.fillText('PERCORRER', 512, 200);
      bx.fillStyle = '#ffffff'; bx.font = '700 66px ' + FD; bx.fillText('= um item de cada vez', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      for (var i = 0; i < 5; i++) {
        bx.fillStyle = (i === 0 || i === 4) ? '#ffe69a' : '#9af2c8';
        bx.fillText(BL[i].slice(0, lN[i]), 90, 70 + i * 66);
      }
      bx.fillStyle = '#7fd4ff'; bx.fillText('for sabor in sabores:'.slice(0, f1), 90, 70 + 5 * 66 + 8);
      bx.fillStyle = '#ffd6a0'; bx.fillText('   mostrar(sabor)'.slice(0, f2), 90, 70 + 6 * 66 + 8);
    }
    boardTex.needsUpdate = true;
  }

'''
S=cut(S,"  var BL = [","  var woodM",BOARD)

BLOCK=r'''  /* ---------- pizzas, nomes, anel e ícones ---------- */
  var PT = {
    0: { sauce: 0xd13a2f, cheese: 0xffd35c, tc: 0xa3221d, pts: [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14], [0, 0], [0.28, 0], [-0.28, 0]], box: false },
    1: { sauce: 0xe5483d, cheese: 0xffe27a, tc: 0, pts: [], box: false },
    2: { sauce: 0xe5483d, cheese: 0xffd35c, tc: 0xf2e3c4, pts: [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14], [0, 0]], box: true }
  };
  function makeSlot(type) {
    var d = PT[type], g = new THREE.Group(), face = new THREE.Group(); g.add(face);
    face.add(mk(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32), mat(0xe2a35c), true));
    face.add(mk(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 32), mat(d.sauce), false));
    face.add(mk(new THREE.CylinderGeometry(0.38, 0.38, 0.1, 32), mat(d.cheese), false));
    d.pts.forEach(function (p) {
      var pp = mk(d.box ? new THREE.BoxGeometry(0.12, 0.11, 0.09) : new THREE.CylinderGeometry(0.07, 0.07, 0.11, 12), mat(d.tc), false); pp.position.set(p[0], 0, p[1]); face.add(pp);
    });
    face.rotation.x = Math.PI / 2 - 0.25;
    var tray = mk(roundedBox(0.74, 0.07, 0.5, 0.03, 4), mat(0xd9a066, { roughness: 0.85 }), true); tray.position.y = -0.55; g.add(tray);
    g.scale.setScalar(0.001); g.visible = false; scene.add(g); return g;
  }
  var SLOTX = [-1.1, 0, 1.1];
  var slots = [0, 1, 2].map(function (t) { return makeSlot(t); });
  function namePill(txt) {
    var tex = labelTex(function (x, w, h) {
      x.fillStyle = '#2fae7a'; rr(x, 4, 4, w - 8, h - 8, 60); x.fill();
      x.fillStyle = '#fff'; x.font = '700 84px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 4);
    }, 512, 160);
    var m = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.3), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var pills = [namePill('calabresa'), namePill('queijo'), namePill('frango')];
  var ring = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.045, 10, 40), new THREE.MeshBasicMaterial({ color: col(0xffe45c) }));
  ring.visible = false; scene.add(ring);

  function iconTex(kind, label) {
    return labelTex(function (x, w, h) {
      var C = { ok: '#2fae7a', no: '#e0484f', bulb: '#ffb703', zz: '#7a8cff', heart: '#ff4d7d', share: '#4a90e2', plus: '#2fae7a' }[kind];
      x.fillStyle = C; x.beginPath(); x.arc(128, 128, 118, 0, 6.3); x.fill();
      x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
      x.strokeStyle = '#fff'; x.fillStyle = '#fff'; x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = 28;
      if (kind === 'ok') { x.beginPath(); x.moveTo(72, 132); x.lineTo(112, 172); x.lineTo(188, 86); x.stroke(); }
      if (kind === 'no') { x.beginPath(); x.moveTo(84, 84); x.lineTo(172, 172); x.moveTo(172, 84); x.lineTo(84, 172); x.stroke(); }
      if (kind === 'zz') { x.font = '700 120px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Zzz', 128, 136); }
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
      icNo = mkIcon('no', '', 0.5), icZz = mkIcon('zz', '', 0.5),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);

'''
S=cut(S,"  /* ---------- cartões do objeto e ícones ---------- */","  var CONF = [], CC",BLOCK)

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
    slots.forEach(function (g, i) {
      put(g, tt, EV.pz[i], SLOTX[i], 2.32, i, 0.78 * hide);
      if (hide < 0.02) g.visible = false;
      g.rotation.z = 0.06 * Math.sin(tt * 1.9 + i);
    });
    pills.forEach(function (m, i) { put(m, tt, EV.nm[i], SLOTX[i], 1.6, i + 0.5, hide); if (hide < 0.02) m.visible = false; });
    var rs = pop(tt, EV.ring0, 0.35) * hide;
    ring.visible = rs > 0.02;
    var u1 = lin(tt, EV.hop1, EV.hop1 + 0.4), u2 = lin(tt, EV.hop2, EV.hop2 + 0.4);
    var px = SLOTX[0] + (SLOTX[1] - SLOTX[0]) * S(u1, 0, 1) + (SLOTX[2] - SLOTX[1]) * S(u2, 0, 1);
    var uu = (u1 > 0 && u1 < 1) ? u1 : ((u2 > 0 && u2 < 1) ? u2 : 0);
    ring.position.set(px, 2.32 + 0.35 * 4 * uu * (1 - uu), 0.8);
    ring.scale.setScalar(Math.max(rs, 0.001) * 0.8 * (1 + 0.06 * Math.sin(tt * 6)));

    showIcon(icOkA, tt, EV.okA, 1.6, -2.15, 2.6);
    showIcon(icBulbA, tt, EV.bulbA, 1.8, 2.15, 2.55);
    showIcon(icNo, tt, EV.noI, 2.4, 2.15, 2.55);
    showIcon(icBulbB, tt, EV.bulbB, 1.8, 2.15, 2.55);
    showIcon(icOkB, tt, EV.okB, 1.4, -2.15, 2.6);
    showIcon(icZz, tt, EV.zzI, 1.6, 2.15, 2.55);
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
open('ep7.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test7.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re,json
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check8.js','w').write(m[-1])
L=re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}",S)
json.dump({i:t.replace("\\'","'") for i,w,t in L},open('script7.json','w'),ensure_ascii=False)
