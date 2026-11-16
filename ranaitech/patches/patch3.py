S=open('ep2.html').read()
def cut(s,a,b,new):
    i=s.index(a); j=s.index(b,i); return s[:i]+new+s[j:]

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula três: o loop! Loop é mandar o computador repetir uma coisa quantas vezes você quiser, sem você ter que escrever tudo de novo.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo… repetir sem eu ficar cansado?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Exato! Sem loop, eu teria que escrever: comer pizza, comer pizza, comer pizza, comer pizza, comer pizza. Que trabalho chato, né?' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Nossa, que chatice! Tem um jeito mais fácil?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Tem! É o for. Você diz: repete cinco vezes, come pizza. Escreveu uma vez, o computador faz cinco.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Cinco pizzas?! Eu quero!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Calma, guloso! Mas cuidado: se você esquecer de dizer quando parar, o loop nunca acaba. Isso se chama loop infinito, e o computador trava.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Eu travei só de ouvir isso…' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Relaxa, é só dizer quantas vezes. Você já está dominando a programação! Comemora com um pulinho! Na próxima aula: funções. Tchau, turma!' },
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
    P1: ['happy', 'happy'], C1: ['neutral', 'curious'], P2: ['smirk', 'worried'], C2: ['smirk', 'deadpan'],
    P3: ['happy', 'curious'], C3: ['happy', 'joy'], P4: ['smirk', 'worried'], C4: ['deadpan', 'hurt'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'ptBoard'], ['P2', 0.8, 'palms'], ['C2', 0, 'rest'],
    ['P3', 0, 'ptBoard'], ['P3', 0.5, 'ptBox'], ['C3', 0, 'rest'], ['P4', 0, 'palms'], ['P4', 0.5, 'ptBoard'], ['C4', 0, 'crossed'],
    ['P5', 0, 'open'], ['P5', 0.8, 'wave'], ['C5', 0, 'wave']];
  var GC = [['C1', -0.05, 'hand'], ['P2', 0, 'chin'], ['C2', 0, 'droop'], ['P3', 0, 'fidget'], ['C3', 0, 'up2'], ['P4', 0, 'rest'],
    ['C4', 0, 'droop'], ['P5', 0, 'rest'], ['P5', 0.5, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave']];

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
      w0: BYID.P1.t0 + 0.5, w1: ev('P3', 0.04),
      a: [0, 1, 2, 3, 4].map(function (i) { return ev('P2', 0.33 + 0.11 * i); }),
      b: [ev('P3', 0.28), ev('P3', 0.37), ev('P3', 0.46)],
      pz: [0, 1, 2, 3, 4].map(function (i) { return ev('P3', 0.52 + 0.09 * i); }),
      hop: ev('C3', 0.45), inf: ev('P4', 0.35), rain: ev('P4', 0.55), rainEnd: ev('P5', 0.02),
      g0: ev('C4', 0), g1: ev('C4', 1) + 0.3, jump: ev('P5', 0.5)
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

SCENE=r'''  /* ---------- sala ---------- */
  var wall = mk(new THREE.PlaneGeometry(40, 20), mat(0xa9d9f0, { roughness: 1 }), false, true);
  wall.position.set(0, 8, -1.6); scene.add(wall);
  var floor = mk(new THREE.PlaneGeometry(40, 30), mat(0xf3d9b8, { roughness: 0.95 }), false, true);
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  var rug = mk(new THREE.CircleGeometry(3.4, 64), mat(0xffc7d6, { roughness: 1 }), false, true);
  rug.scale.y = 0.55; rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.01, 0.5); scene.add(rug);
  var skirt = mk(new THREE.BoxGeometry(40, 0.18, 0.05), mat(0xffffff, { roughness: 0.8 }), false, true);
  skirt.position.set(0, 0.09, -1.57); scene.add(skirt);

  var frameM = mat(0xc98f5b, { roughness: 0.7 });
  var BY = 4.0;
  var boardFrame = mk(new THREE.BoxGeometry(4.3, 2.3, 0.1), frameM, true, true); boardFrame.position.set(0, BY, -1.5); scene.add(boardFrame);
  var bc = document.createElement('canvas'); bc.width = 1024; bc.height = 540;
  var bx = bc.getContext('2d');
  var boardTex = new THREE.CanvasTexture(bc); boardTex.encoding = THREE.sRGBEncoding; boardTex.anisotropy = 4;
  var boardPlane = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 2.1), new THREE.MeshBasicMaterial({ map: boardTex }));
  boardPlane.position.set(0, BY, -1.44); scene.add(boardPlane);
  var tray = mk(new THREE.BoxGeometry(2.4, 0.07, 0.16), frameM, true, true); tray.position.set(0, BY - 1.2, -1.42); scene.add(tray);

  var eraser = new THREE.Group();
  (function () {
    var b1 = mk(roundedBox(0.5, 0.75, 0.22, 0.06, 6), mat(0xe8e2d6), true); eraser.add(b1);
    var b2 = mk(roundedBox(0.52, 0.28, 0.24, 0.05, 6), mat(0x3a3a55), true); b2.position.y = -0.24; eraser.add(b2);
    eraser.visible = false; scene.add(eraser);
  })();

  var boardKey = '', infState = 0;
  function eraseF(tt, w) { return lin(tt, w, w + 0.7); }
  function countAt(tt) { var n = 0; EV.pz.forEach(function (t0) { if (tt >= t0) n++; }); return n; }
  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1), inf = tt >= EV.inf ? 1 : 0, cnt = countAt(tt);
    var aN = EV.a.map(function (t0) { return Math.round(lin(tt, t0, t0 + 0.6) * 12); });
    var bN = EV.b.map(function (t0) { return Math.round(lin(tt, t0, t0 + 0.8) * 16); });
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), inf, cnt, aN.join('.'), bN.join('.'), fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 190px ' + FM; bx.fillText('LOOP', 512, 215);
      bx.fillStyle = '#ffffff'; bx.font = '700 96px ' + FD; bx.fillText('= repetir', 512, 400);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (tt < EV.w1 + 0.7) {
      bx.textAlign = 'left'; bx.font = '500 56px ' + FM;
      bx.fillStyle = '#ffffff';
      for (var i = 0; i < 5; i++) bx.fillText('comer(pizza)'.slice(0, aN[i]), 170, 70 + i * 100);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 66px ' + FM;
      var l1 = inf ? 'repete (sempre) {' : 'repete (5) {';
      bx.fillStyle = inf ? '#ff8f8f' : '#ffe69a'; bx.fillText(l1.slice(0, inf ? 17 : bN[0]), 120, 95);
      bx.fillStyle = '#9af2c8'; bx.fillText('   comer(pizza)'.slice(0, bN[1]), 120, 200);
      bx.fillStyle = inf ? '#ff8f8f' : '#ffe69a'; bx.fillText('}'.slice(0, bN[2]), 120, 305);
      bx.font = '700 62px ' + FD;
      if (inf) { bx.fillStyle = '#ff8f8f'; bx.fillText('! loop infinito !', 120, 430); }
      else if (cnt > 0) { bx.fillStyle = '#ffffff'; bx.fillText('vezes: ' + cnt + ' / 5', 120, 430); }
    }
    boardTex.needsUpdate = true;
  }

  var woodM = mat(0xe6b184, { roughness: 0.7 });
  var tableTop = mk(roundedBox(1.55, 0.1, 0.9, 0.04, 8), woodM, true, true); tableTop.position.set(0, 0.5, 0.45); scene.add(tableTop);
  [-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) {
    var lg = mk(new THREE.CylinderGeometry(0.05, 0.04, 0.46, 12), woodM, true, true); lg.position.set(sx * 0.64, 0.23, 0.45 + sz * 0.32); scene.add(lg);
  }); });

  function makePizza() {
    var g = new THREE.Group(), face = new THREE.Group(); g.add(face);
    face.add(mk(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32), mat(0xe2a35c), true));
    face.add(mk(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 32), mat(0xe5483d), false));
    face.add(mk(new THREE.CylinderGeometry(0.38, 0.38, 0.1, 32), mat(0xffd35c), false));
    [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14]].forEach(function (p) {
      var pp = mk(new THREE.CylinderGeometry(0.07, 0.07, 0.11, 12), mat(0xc2352f), false); pp.position.set(p[0], 0, p[1]); face.add(pp);
    });
    face.rotation.x = Math.PI / 2 - 0.25;
    g.scale.setScalar(0.001); g.visible = false; scene.add(g); return g;
  }
  var row = [0, 1, 2, 3, 4].map(function () { return makePizza(); });
  var rain = []; for (var ri = 0; ri < 16; ri++) { var rp = makePizza(); rp.traverse(function (o) { o.castShadow = false; }); rain.push(rp); }

  var CONF = [], CC = ['#ff6b8a', '#ffd166', '#5bd6a4', '#7aa7ff', '#c39bff'];
  for (var ci = 0; ci < 44; ci++) {
    var cm = mk(new THREE.BoxGeometry(0.09, 0.05, 0.012), new THREE.MeshBasicMaterial({ color: col(CC[ci % 5]) }), false, false);
    cm.visible = false; scene.add(cm); CONF.push(cm);
  }

'''
S=cut(S,"  /* ---------- sala ---------- */","  /* ---------- expressões e gestos ---------- */",SCENE)

# gestos extras no updateChar: pulinho do C3 e tremedeira do C4
S=S.replace("var j = jumpFx(tt); sy *= j.sy; jy = j.y;","var j = jumpFx(tt); sy *= j.sy; jy = j.y + hopY(tt);")
S=S.replace("ch.root.rotation.z = Math.sin(tt * 1.3 + ch.ph) * 0.025;","ch.root.rotation.z = Math.sin(tt * 1.3 + ch.ph) * 0.025;\n    if (who === 'C') { var gl = glitchF(tt); ch.root.position.x = 1.5 + 0.07 * gl * Math.sin(tt * 75); ch.root.rotation.z += 0.05 * gl * Math.sin(tt * 53); }")

FRAME=r'''  /* ---------- quadro a quadro ---------- */
  var camW = { p: [0, 2.0, 19.8], t: [0, 1.7, 0] }, camP = { p: [-0.5, 2.0, 18.4], t: [-0.45, 1.7, 0] }, camC = { p: [0.5, 2.0, 18.4], t: [0.45, 1.7, 0] };
  var camPos = new THREE.Vector3(), camTgt = new THREE.Vector3();
  function hopY(tt) { var u = (tt - EV.hop) / 0.55; return (u > 0 && u < 1) ? 0.45 * 4 * u * (1 - u) : 0; }
  function glitchF(tt) { return (tt >= EV.g0 && tt <= EV.g1) ? 1 - S(tt, EV.g1 - 0.5, EV.g1) : 0; }
  function eraserUpdate(tt) {
    var w = null;
    if (tt >= EV.w0 - 0.15 && tt <= EV.w0 + 0.85) w = EV.w0; else if (tt >= EV.w1 - 0.15 && tt <= EV.w1 + 0.85) w = EV.w1;
    if (w === null) { eraser.visible = false; return; }
    var e = lin(tt, w, w + 0.7), appear = pop(tt, w - 0.15, 0.25) * (1 - S(tt, w + 0.7, w + 0.85));
    eraser.visible = appear > 0.02; eraser.scale.setScalar(Math.max(appear, 0.001));
    eraser.position.set(lerp(-2.0, 2.0, e), BY + 0.1 * Math.sin(e * 25), -1.3);
    eraser.rotation.z = 0.25 * Math.sin(e * 25);
  }
  function frame(tt) {
    updateChar(prof, tt, 'P'); updateChar(cube, tt, 'C');
    row.forEach(function (g, i) {
      var s = pop(tt, EV.pz[i], 0.45);
      g.visible = s > 0.01; g.scale.setScalar(Math.max(s * 0.8, 0.001));
      g.position.set(-1.25 + 0.625 * i, 2.35 + 0.05 * Math.sin(tt * 2.6 + i), 0.7);
      g.rotation.z = 0.1 * Math.sin(tt * 1.9 + i);
    });
    rain.forEach(function (g, i) {
      if (tt < EV.rain || tt > EV.rainEnd) { g.visible = false; return; }
      var ph = ((tt - EV.rain) * 0.7 + i / 16) % 1;
      var fade = lin(tt, EV.rain, EV.rain + 0.4) * (1 - S(tt, EV.rainEnd - 0.4, EV.rainEnd));
      g.visible = true; g.scale.setScalar(Math.max(0.35 * fade, 0.001));
      g.position.set(-2.1 + ((i * 0.97) % 4.2), 6.4 - ph * 6.3, -0.8);
      g.rotation.z = ph * 6 + i;
    });
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
# jumpFx usa EV.jump: manter. reduce-motion usa ev('C3',0.8): ok
open('ep3.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test3.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re,json
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check4.js','w').write(m[-1])
L=re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}",S)
json.dump({i:t.replace("\\'","'") for i,w,t in L},open('script3.json','w'),ensure_ascii=False)
