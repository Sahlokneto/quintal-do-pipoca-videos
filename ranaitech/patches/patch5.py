S=open('ep4.html').read()
def cut(s,a,b,new):
    i=s.index(a); j=s.index(b,i); return s[:i]+new+s[j:]

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula cinco: as listas! Lista é uma variável que guarda várias coisas de uma vez, na ordem.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo uma lista de sabores de pizza?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Isso! Sabores: calabresa, queijo, frango. Três sabores, uma única lista. Cada item tem uma posição, chamada índice.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Então a calabresa é o número um, né?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Errado, meu querido! Programador conta a partir do zero. A calabresa é a posição zero, o queijo é a um, e o frango é a dois.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Zero?! Mas isso não faz sentido!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Faz sim! Pensa assim: o índice é quantos passos você anda desde o começo. Na calabresa você ainda não andou nenhum passo.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Ahh, então no queijo eu dei um passo!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Isso! E se quiser mais um sabor, é só adicionar na lista. Viu? Você não é burrinho, só estava contando errado. Comemora com um pulinho! Na próxima aula: objetos. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau, professor!' }
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
    P3: ['smirk', 'worried'], C3: ['deadpan', 'worried'], P4: ['happy', 'curious'], C4: ['smirk', 'eureka'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'ptBoard'], ['P2', 0.5, 'ptBox'], ['C2', 0, 'rest'],
    ['P3', 0, 'palms'], ['P3', 0.4, 'ptBox'], ['C3', 0, 'crossed'], ['P4', 0, 'palms'], ['P4', 0.6, 'ptBox'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave']];
  var GC = [['C1', -0.05, 'hand'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['P3', 0, 'droop'], ['C3', 0, 'hand'], ['P4', 0, 'chin'],
    ['C4', 0, 'eureka'], ['P5', 0, 'rest'], ['P5', 0.5, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave']];

  function rebuild() {
    var t = 0;
    SCRIPT.forEach(function (l) {
      l.words = wordsOf(l.text);
      l.est = Math.max(1.2, l.words / WPS + 0.3);
      l.dur = l.userDur || l.est;
      t += l.gap; l.t0 = t; t += l.dur;
      BYID[l.id] = l;
    });
    END = t + 2.4;
    EV = {
      w0: BYID.P1.t0 + 0.5,
      L: [ev('P2', 0.1), ev('P2', 0.2), ev('P2', 0.28), ev('P2', 0.36), ev('P2', 0.42)],
      slot: [ev('P2', 0.2), ev('P2', 0.28), ev('P2', 0.36)],
      wrong: ev('C2', 0.7), wrongOff: ev('P3', 0.3),
      idx: [ev('P3', 0.42), ev('P3', 0.65), ev('P3', 0.85)],
      ring0: ev('P4', 0.5), ring1: ev('C4', 0.35), hop: ev('C4', 0.3),
      add: ev('P5', 0.12), jump: ev('P5', 0.5), g0: 0, g1: 0
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
  var LST = ['sabores = [', '   "calabresa",', '   "queijo",', '   "frango"', ']'];
  var LST2 = ['sabores = [', '   "calabresa",', '   "queijo",', '   "frango",', '   "bacon"', ']'];
  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0);
    var add = tt >= EV.add ? Math.round(lin(tt, EV.add, EV.add + 0.7) * 12) : -1;
    var lN = EV.L.map(function (t0) { return Math.round(lin(tt, t0, t0 + 0.7) * 16); });
    var key = [Math.round(e0 * 30), add, lN.join('.'), fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 160px ' + FM; bx.fillText('LISTA', 512, 200);
      bx.fillStyle = '#ffffff'; bx.font = '700 84px ' + FD; bx.fillText('= vários itens', 512, 395);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 54px ' + FM;
      var lines = add >= 0 ? LST2 : LST;
      for (var i = 0; i < lines.length; i++) {
        var txt = lines[i], n;
        if (add >= 0) {
          if (i === 3) n = txt.length;           // "frango", ganha a vírgula
          else if (i === 4) n = Math.min(txt.length, add + 3);
          else if (i === 5) n = add >= 5 ? 1 : 0;
          else n = i < 3 ? txt.length : 0;
          if (i === 5) n = add >= 8 ? 1 : 0;
        } else n = lN[i];
        bx.fillStyle = (i === 0 || i === lines.length - 1) ? '#ffe69a' : '#9af2c8';
        bx.fillText(txt.slice(0, n), 90, 75 + i * 82);
      }
    }
    boardTex.needsUpdate = true;
  }

  var woodM = mat(0xe6b184, { roughness: 0.7 });
  var tableTop = mk(roundedBox(1.55, 0.1, 0.9, 0.04, 8), woodM, true, true); tableTop.position.set(0, 0.5, 0.45); scene.add(tableTop);
  [-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) {
    var lg = mk(new THREE.CylinderGeometry(0.05, 0.04, 0.46, 12), woodM, true, true); lg.position.set(sx * 0.64, 0.23, 0.45 + sz * 0.32); scene.add(lg);
  }); });

  var PT = {
    0: { sauce: 0xd13a2f, cheese: 0xffd35c, tc: 0xa3221d, pts: [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14], [0, 0], [0.28, 0], [-0.28, 0]], box: false },
    1: { sauce: 0xe5483d, cheese: 0xffe27a, tc: 0, pts: [], box: false },
    2: { sauce: 0xe5483d, cheese: 0xffd35c, tc: 0xf2e3c4, pts: [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14], [0, 0]], box: true },
    3: { sauce: 0xe5483d, cheese: 0xffd35c, tc: 0xe8806a, pts: [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14]], box: true }
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
  var SLOTX = [-1.05, -0.35, 0.35, 1.05];
  var slots = [0, 1, 2, 3].map(function (t) { return makeSlot(t); });
  function numPill(txt, hex) {
    var tex = labelTex(function (x, w, h) {
      x.fillStyle = hex; x.beginPath(); x.arc(w / 2, h / 2, 110, 0, 6.3); x.fill();
      x.fillStyle = '#ffffff'; x.font = '700 150px ' + FM; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 8);
    }, 256, 256);
    var m = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.36), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var idxPills = [numPill('0', '#2fae7a'), numPill('1', '#2fae7a'), numPill('2', '#2fae7a'), numPill('3', '#2fae7a')];
  var wrongPill = numPill('1', '#e0484f');
  var ring = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.04, 10, 40), new THREE.MeshBasicMaterial({ color: col(0xffe45c) }));
  ring.visible = false; scene.add(ring);
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
  function frame(tt) {
    updateChar(prof, tt, 'P'); updateChar(cube, tt, 'C');
    var starts = [EV.slot[0], EV.slot[1], EV.slot[2], EV.add];
    slots.forEach(function (g, i) {
      put(g, tt, starts[i], SLOTX[i], 2.2, i, 0.66);
      g.rotation.z = 0.06 * Math.sin(tt * 1.9 + i);
    });
    // números (índices)
    var idxT = [EV.idx[0], EV.idx[1], EV.idx[2], EV.add + 0.5];
    idxPills.forEach(function (m, i) { put(m, tt, idxT[i], SLOTX[i], 1.72, i + 0.5); });
    // "1" errado do Cubinho
    var ws = pop(tt, EV.wrong, 0.35) * (1 - S(tt, EV.wrongOff, EV.wrongOff + 0.25));
    wrongPill.visible = ws > 0.02; wrongPill.scale.setScalar(Math.max(ws, 0.001));
    wrongPill.position.set(SLOTX[0], 1.72, 0.7); wrongPill.rotation.z = 0.2 * Math.sin(tt * 8) * (ws > 0.5 ? 1 : 0);
    // anel dos "passos"
    var rs = pop(tt, EV.ring0, 0.35);
    ring.visible = rs > 0.02;
    var u = clamp((tt - EV.ring1) / 0.5, 0, 1), e = u * u * (3 - 2 * u);
    ring.position.set(lerp(SLOTX[0], SLOTX[1], e), 2.2 + 0.35 * 4 * u * (1 - u), 0.75);
    ring.scale.setScalar(Math.max(rs, 0.001) * 0.7 * (1 + 0.08 * Math.sin(tt * 6)));
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
open('ep5.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test5.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re,json
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check6.js','w').write(m[-1])
L=re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}",S)
json.dump({i:t.replace("\\'","'") for i,w,t in L},open('script5.json','w'),ensure_ascii=False)
