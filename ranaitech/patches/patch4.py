S=open('ep3.html').read()
def cut(s,a,b,new):
    i=s.index(a); j=s.index(b,i); return s[:i]+new+s[j:]

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula quatro: as funções! Função é uma receita que você escreve uma vez e usa quantas vezes quiser.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Uma receita? Tipo a de pizza?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Exato! Você escreve a receita uma vez só: massa, molho, queijo, forno. Isso é criar a função. E dá um nome para ela: fazer pizza.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'E aí é só chamar o nome?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Isso! Escreveu fazer pizza, o computador segue a receita inteira. Quer outra? É só chamar de novo.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Que preguiça boa!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Boa mesmo! E tem mais: a função pode receber um ingrediente. Fazer pizza de calabresa, fazer pizza de queijo. Esse ingrediente se chama parâmetro.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Parâmetro… parece nome de remédio.' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Ha! Mas não precisa de receita médica para usar. Viu? Você não é burrinho, só imaginativo. Comemora com um pulinho! Na próxima aula: listas. Tchau, turma!' },
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
    P1: ['happy', 'happy'], C1: ['neutral', 'curious'], P2: ['happy', 'curious'], C2: ['neutral', 'curious'],
    P3: ['happy', 'happy'], C3: ['happy', 'proud'], P4: ['happy', 'curious'], C4: ['smirk', 'deadpan'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'ptBoard'], ['C2', 0, 'rest'],
    ['P3', 0, 'ptBox'], ['P3', 0.6, 'palms'], ['C3', 0, 'rest'], ['P4', 0, 'palms'], ['P4', 0.45, 'ptBoard'], ['C4', 0, 'crossed'],
    ['P5', 0, 'open'], ['P5', 0.8, 'wave'], ['C5', 0, 'wave']];
  var GC = [['C1', -0.05, 'hand'], ['P2', 0, 'chin'], ['C2', 0, 'hand'], ['P3', 0, 'fidget'], ['C3', 0, 'up2'], ['P4', 0, 'chin'],
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
      w0: BYID.P1.t0 + 0.5, w1: ev('P3', 0.02), w2: ev('P4', 0.26),
      d: [0.22, 0.3, 0.37, 0.43, 0.5, 0.56].map(function (f) { return ev('P2', f); }),
      c: [ev('P3', 0.36), ev('P3', 0.82)],
      p: [ev('P4', 0.5), ev('P4', 0.7)], lab: ev('P4', 0.88),
      oven: ev('P2', 0.78),
      pz: [ev('P3', 0.38), ev('P3', 0.84), ev('P4', 0.52), ev('P4', 0.72)],
      hop: ev('C3', 0.3), g0: 0, g1: 0, jump: ev('P5', 0.5)
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
  var DEF = ['função fazerPizza() {', '   massa()', '   molho()', '   queijo()', '   forno()', '}'];
  var DEFC = ['#ffe69a', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffe69a'];
  var CALLS = ['fazerPizza()', 'fazerPizza()'];
  var PARS = ['fazerPizza("calabresa")', 'fazerPizza("queijo")'];
  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1), e2 = eraseF(tt, EV.w2);
    var dN = EV.d.map(function (t0, i) { return Math.round(lin(tt, t0, t0 + 0.6) * 24); });
    var cN = EV.c.map(function (t0) { return Math.round(lin(tt, t0, t0 + 0.7) * 14); });
    var pN = EV.p.map(function (t0) { return Math.round(lin(tt, t0, t0 + 0.9) * 26); });
    var lb = tt >= EV.lab ? 1 : 0;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), Math.round(e2 * 30), dN.join('.'), cN.join('.'), pN.join('.'), lb, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('FUNÇÃO', 512, 215);
      bx.fillStyle = '#ffffff'; bx.font = '700 96px ' + FD; bx.fillText('= receita', 512, 400);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (tt < EV.w1 + 0.7) {
      bx.textAlign = 'left'; bx.font = '500 52px ' + FM;
      for (var i = 0; i < 6; i++) { bx.fillStyle = DEFC[i]; bx.fillText(DEF[i].slice(0, dN[i]), 70, 62 + i * 82); }
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else if (tt < EV.w2 + 0.7) {
      bx.textAlign = 'left'; bx.font = '500 70px ' + FM; bx.fillStyle = '#9af2c8';
      for (var j = 0; j < 2; j++) bx.fillText(CALLS[j].slice(0, cN[j]), 120, 170 + j * 140);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e2, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 50px ' + FM;
      for (var k = 0; k < 2; k++) {
        var s = PARS[k].slice(0, pN[k]);
        bx.fillStyle = '#9af2c8'; bx.fillText(s, 50, 150 + k * 120);
      }
      if (lb) { bx.textAlign = 'center'; bx.font = '700 64px ' + FD; bx.fillStyle = '#ffe69a'; bx.fillText('parâmetro = ingrediente', 512, 440); }
    }
    boardTex.needsUpdate = true;
  }

  var woodM = mat(0xe6b184, { roughness: 0.7 });
  var tableTop = mk(roundedBox(1.55, 0.1, 0.9, 0.04, 8), woodM, true, true); tableTop.position.set(0, 0.5, 0.45); scene.add(tableTop);
  [-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) {
    var lg = mk(new THREE.CylinderGeometry(0.05, 0.04, 0.46, 12), woodM, true, true); lg.position.set(sx * 0.64, 0.23, 0.45 + sz * 0.32); scene.add(lg);
  }); });

  // forno de pizza (a "função")
  var oven = new THREE.Group(); oven.position.set(0, 0.55, 0.45); scene.add(oven);
  var ovenBody = mk(roundedBox(0.95, 0.72, 0.62, 0.1, 8), mat(0x56606f, { roughness: 0.5 }), true); ovenBody.position.y = 0.36; oven.add(ovenBody);
  var doorM = new THREE.MeshBasicMaterial({ color: col(0x7a3a1a) });
  var door = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.36), doorM); door.position.set(0, 0.34, 0.32); oven.add(door);
  var doorFrame = mk(new THREE.BoxGeometry(0.64, 0.42, 0.02), mat(0x2f3540), false); doorFrame.position.set(0, 0.34, 0.309); oven.add(doorFrame);
  var chim = mk(new THREE.CylinderGeometry(0.1, 0.12, 0.3, 14), mat(0x3a4150), true); chim.position.set(0.3, 0.85, -0.1); oven.add(chim);
  oven.scale.setScalar(0.001); oven.visible = false;
  var ovenTop = new THREE.Vector3(0, 1.4, 0.5);

  function makePizza(type) {
    var g = new THREE.Group(), face = new THREE.Group(); g.add(face);
    face.add(mk(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32), mat(0xe2a35c), true));
    face.add(mk(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 32), mat(type === 1 ? 0xd13a2f : 0xe5483d), false));
    face.add(mk(new THREE.CylinderGeometry(0.38, 0.38, 0.1, 32), mat(type === 2 ? 0xffe27a : 0xffd35c), false));
    var pts = type === 2 ? [] : type === 1 ? [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14], [0.0, 0.0], [0.28, 0.0], [-0.28, 0.0]] : [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14]];
    pts.forEach(function (p) {
      var pp = mk(new THREE.CylinderGeometry(0.07, 0.07, 0.11, 12), mat(type === 1 ? 0xa3221d : 0xc2352f), false); pp.position.set(p[0], 0, p[1]); face.add(pp);
    });
    face.rotation.x = Math.PI / 2 - 0.25;
    g.scale.setScalar(0.001); g.visible = false; scene.add(g); return g;
  }
  var SLOTX = [-1.05, -0.35, 0.35, 1.05];
  var row = [0, 0, 1, 2].map(function (t) { return makePizza(t); });
  function pill(txt, w) {
    var tex = labelTex(function (x, ww, hh) {
      x.fillStyle = '#ffffff'; rr(x, 6, 6, ww - 12, hh - 12, 54); x.fill();
      x.fillStyle = '#3a2a40'; x.font = '700 76px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, ww / 2, hh / 2 + 4);
    }, 512, 128);
    var m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 4), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var pillA = pill('calabresa', 0.82), pillB = pill('queijo', 0.62);
  var puffs = [];
  for (var qi = 0; qi < 8; qi++) {
    var pf = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), new THREE.MeshBasicMaterial({ color: col(0xffffff), transparent: true, opacity: 0.8 }));
    pf.visible = false; scene.add(pf); puffs.push(pf);
  }
  var CONF = [], CC = ['#ff6b8a', '#ffd166', '#5bd6a4', '#7aa7ff', '#c39bff'];
  for (var ci = 0; ci < 44; ci++) {
    var cm = mk(new THREE.BoxGeometry(0.09, 0.05, 0.012), new THREE.MeshBasicMaterial({ color: col(CC[ci % 5]) }), false, false);
    cm.visible = false; scene.add(cm); CONF.push(cm);
  }

'''
S=cut(S,"  var boardKey = '', infState = 0;","  /* ---------- expressões e gestos ---------- */",SCENE)

FRAME=r'''  /* ---------- quadro a quadro ---------- */
  var camW = { p: [0, 2.0, 19.8], t: [0, 1.7, 0] }, camP = { p: [-0.5, 2.0, 18.4], t: [-0.45, 1.7, 0] }, camC = { p: [0.5, 2.0, 18.4], t: [0.45, 1.7, 0] };
  var camPos = new THREE.Vector3(), camTgt = new THREE.Vector3();
  function hopY(tt) { var u = (tt - EV.hop) / 0.55; return (u > 0 && u < 1) ? 0.45 * 4 * u * (1 - u) : 0; }
  function glitchF(tt) { return 0; }
  function eraserUpdate(tt) {
    var w = null;
    [EV.w0, EV.w1, EV.w2].forEach(function (x) { if (tt >= x - 0.15 && tt <= x + 0.85) w = x; });
    if (w === null) { eraser.visible = false; return; }
    var e = lin(tt, w, w + 0.7), appear = pop(tt, w - 0.15, 0.25) * (1 - S(tt, w + 0.7, w + 0.85));
    eraser.visible = appear > 0.02; eraser.scale.setScalar(Math.max(appear, 0.001));
    eraser.position.set(lerp(-2.0, 2.0, e), BY + 0.1 * Math.sin(e * 25), -1.3);
    eraser.rotation.z = 0.25 * Math.sin(e * 25);
  }
  function frame(tt) {
    updateChar(prof, tt, 'P'); updateChar(cube, tt, 'C');
    // forno
    var os = pop(tt, EV.oven, 0.5), puls = 0, pulseT = -1;
    EV.pz.forEach(function (t0) { var u = (tt - t0) / 0.5; if (u > 0 && u < 1) { puls = Math.sin(Math.PI * u); pulseT = t0; } });
    oven.visible = os > 0.01;
    oven.scale.set(os * (1 + 0.05 * puls), os * (1 - 0.1 * puls), os * (1 + 0.05 * puls));
    doorM.color.copy(col(0x7a3a1a)).lerp(col(0xffa33a), puls);
    oven.rotation.z = 0.04 * puls * Math.sin(tt * 40);
    // pizzas voam do forno para a fileira
    row.forEach(function (g, i) {
      var s = tt - EV.pz[i];
      if (s < 0) { g.visible = false; return; }
      var u = clamp(s / 0.85, 0, 1), e = u * u * (3 - 2 * u);
      var tx = SLOTX[i], ty = 2.35 + 0.05 * Math.sin(tt * 2.6 + i);
      g.visible = true;
      g.position.set(lerp(ovenTop.x, tx, e), lerp(ovenTop.y, ty, e) + 0.8 * 4 * u * (1 - u) * (u < 1 ? 1 : 0), lerp(ovenTop.z, 0.7, e));
      g.scale.setScalar(lerp(0.3, 0.8, easeOutBack(u * 1.0)));
      g.rotation.z = (1 - e) * 5 * Math.sin(u * 3.14) + 0.1 * Math.sin(tt * 1.9 + i) * e;
    });
    [[pillA, 2], [pillB, 3]].forEach(function (a) {
      var s = pop(tt, EV.pz[a[1]] + 0.7, 0.4); a[0].visible = s > 0.01; a[0].scale.setScalar(Math.max(s, 0.001));
      a[0].position.set(SLOTX[a[1]], 1.72, 0.7);
    });
    // fumaça da chaminé
    puffs.forEach(function (m, i) {
      var t0 = pulseT < 0 ? -1 : pulseT, ph = (tt - t0) / 1.2 + 0;
      if (pulseT < 0) { var best = -1; EV.pz.forEach(function (x) { if (tt >= x && tt - x < 1.2) best = x; }); if (best < 0) { m.visible = false; return; } t0 = best; ph = (tt - t0) / 1.2; }
      if (ph < 0 || ph > 1) { m.visible = false; return; }
      var a = i * 0.9;
      m.visible = true; m.position.set(0.3 + 0.12 * Math.sin(a + ph * 4), 1.55 + ph * 1.1, 0.35 + 0.1 * Math.cos(a));
      m.scale.setScalar(0.5 + ph * 1.2); m.material.opacity = 0.7 * (1 - ph);
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
open('ep4.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test4.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re,json
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check5.js','w').write(m[-1])
L=re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}",S)
json.dump({i:t.replace("\\'","'") for i,w,t in L},open('script4.json','w'),ensure_ascii=False)
