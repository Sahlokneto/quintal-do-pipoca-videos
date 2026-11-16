S=open('professor-e-cubinho.html').read()
def cut(s,a,b,new,keep_b=True):
    i=s.index(a); j=s.index(b,i)
    return s[:i]+new+(s[j:] if keep_b else s[j+len(b):])

HEAD=r'''  var WPS = 3.0;
  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 0.9, text: 'E aí, turma! Aula dois: o if, que em português é só: se. Se uma coisa for verdade, o computador faz uma coisa. Se não for, ele faz outra.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo… se tiver pizza, eu como?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Exato! Se tiver pizza, você come. Mas e se não tiver pizza? O que acontece, gênio?' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Eu… choro?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Chorar não é código, meu querido. Isso se chama else: o senão. Se tiver pizza, come pizza. Senão, come bolacha. Pronto, ninguém chora.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Ahh! Então o computador sempre escolhe um caminho!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Isso! Um caminho ou o outro, nunca os dois. Viu? Você não é burrinho, só estava com fome.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Agora eu entendi o if!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Então toma aqui um pedaço de pizza, você mereceu! Comemora com um pulinho! Na próxima aula a gente aprende a repetir coisas várias vezes: os loops. Tchau, turma!' },
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
    P1: ['happy', 'neutral'], C1: ['neutral', 'happy'], P2: ['smirk', 'curious'], C2: ['deadpan', 'hurt'],
    P3: ['smirk', 'worried'], C3: ['happy', 'eureka'], P4: ['happy', 'proud'], C4: ['proud', 'joy'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.55, 'ptBoard'], ['C1', 0, 'rest'], ['P2', 0.1, 'ptBox'], ['P2', 0.6, 'palms'], ['C2', 0, 'crossed'],
    ['P3', 0, 'palms'], ['P3', 0.35, 'ptBoard'], ['P3', 0.75, 'ptBox'], ['C3', 0, 'rest'], ['P4', 0, 'open'], ['P4', 0.6, 'rest'],
    ['C4', 0, 'rest'], ['P5', 0, 'ptBox'], ['P5', 0.8, 'wave'], ['C5', 0, 'wave']];
  var GC = [['C1', -0.05, 'hand'], ['P2', 0, 'chin'], ['C2', 0, 'droop'], ['P3', 0, 'fidget'], ['C3', 0, 'up2'], ['P4', 0, 'rest'],
    ['C4', 0, 'eureka'], ['P5', 0, 'up2'], ['P5', 0.4, 'cheer'], ['P5', 0.88, 'wave'], ['C5', 0, 'wave']];

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
      title: ev('P1', 0.45), lA: ev('P1', 0.74), lB: ev('C1', 0.4), pizza: ev('C1', 0.1), chk: ev('P2', 0.3), qm: ev('P2', 0.6), qmEnd: ev('C2', 0.9),
      c2a: ev('C2', 0), c2b: ev('C2', 1), lC: ev('P3', 0.28), cookie: ev('P3', 0.45), lD: ev('P3', 0.58), lE: ev('P3', 0.88),
      slice: ev('P5', 0.04), jump: ev('P5', 0.4)
    };
    var P = [{ t: -9, k: 'neutral' }], C = [{ t: -9, k: 'neutral' }];
    SCRIPT.forEach(function (l) { var s = SPEC[l.id]; P.push({ t: l.t0 - 0.15, k: s[0] }); C.push({ t: l.t0 - 0.15, k: s[1] }); });
    C.push({ t: ev('P3', 0.5), k: 'curious' });
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

  var TITLE = 'if = se   |   else = senão';
  var BL = [
    { t: 'se (tem_pizza) {', c: '#ffe69a', ev: 'lA' },
    { t: '   comer(pizza)', c: '#ffffff', ev: 'lB' },
    { t: '} senão {', c: '#ffe69a', ev: 'lC' },
    { t: '   comer(bolacha)', c: '#9af2c8', ev: 'lD' },
    { t: '}', c: '#ffe69a', ev: 'lE' }
  ];
  var boardKey = '';
  function drawBoard(tt) {
    var key = [Math.round(lin(tt, EV.title, EV.title + 1.4) * 24), fontsVer];
    BL.forEach(function (l) { key.push(Math.round(lin(tt, EV[l.ev], EV[l.ev] + 0.9) * 20)); });
    key = key.join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'left';
    bx.font = '700 44px ' + FD;
    var n0 = Math.round(lin(tt, EV.title, EV.title + 1.4) * TITLE.length);
    var tw = bx.measureText(TITLE).width;
    bx.fillStyle = '#ffe69a'; bx.fillText(TITLE.slice(0, n0), (1024 - tw) / 2, 62);
    bx.strokeStyle = 'rgba(255,255,255,0.18)'; bx.lineWidth = 3; bx.beginPath(); bx.moveTo(90, 108); bx.lineTo(934, 108); bx.stroke();
    bx.font = '500 62px ' + FM;
    BL.forEach(function (l, i) {
      var n = Math.round(lin(tt, EV[l.ev], EV[l.ev] + 0.9) * l.t.length);
      bx.fillStyle = l.c; bx.fillText(l.t.slice(0, n), 150, 190 + i * 74);
    });
    boardTex.needsUpdate = true;
  }

  var woodM = mat(0xe6b184, { roughness: 0.7 });
  var tableTop = mk(roundedBox(1.55, 0.1, 0.9, 0.04, 8), woodM, true, true); tableTop.position.set(0, 0.5, 0.45); scene.add(tableTop);
  [-1, 1].forEach(function (sx) { [-1, 1].forEach(function (sz) {
    var lg = mk(new THREE.CylinderGeometry(0.05, 0.04, 0.46, 12), woodM, true, true); lg.position.set(sx * 0.64, 0.23, 0.45 + sz * 0.32); scene.add(lg);
  }); });

  // pizza inteira, fatia e bolacha
  function makePizza() {
    var g = new THREE.Group(), face = new THREE.Group(); g.add(face);
    var crust = mk(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 40), mat(0xe2a35c), true); face.add(crust);
    var sauce = mk(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 40), mat(0xe5483d), false); face.add(sauce);
    var cheese = mk(new THREE.CylinderGeometry(0.38, 0.38, 0.1, 40), mat(0xffd35c), false); face.add(cheese);
    [[0.15, 0.1], [-0.18, 0.12], [0.02, -0.2], [-0.2, -0.12], [0.22, -0.14]].forEach(function (p) {
      var pp = mk(new THREE.CylinderGeometry(0.07, 0.07, 0.11, 16), mat(0xc2352f), false); pp.position.set(p[0], 0, p[1]); face.add(pp);
    });
    face.rotation.x = Math.PI / 2 - 0.25;
    g.scale.setScalar(0.001); g.visible = false; scene.add(g); return g;
  }
  function makeCookie() {
    var g = new THREE.Group(), face = new THREE.Group(); g.add(face);
    var body = mk(new THREE.CylinderGeometry(0.42, 0.42, 0.1, 36), mat(0xc88a4a), true); face.add(body);
    [[0.1, 0.12], [-0.15, 0.05], [0.0, -0.18], [0.2, -0.08], [-0.12, -0.22], [-0.05, 0.25]].forEach(function (p) {
      var ch = mk(new THREE.SphereGeometry(0.055, 10, 8), mat(0x4a2b1a), false); ch.position.set(p[0], 0.05, p[1]); face.add(ch);
    });
    face.rotation.x = Math.PI / 2 - 0.25;
    g.scale.setScalar(0.001); g.visible = false; scene.add(g); return g;
  }
  var pizzaG = makePizza(), cookieG = makeCookie();
  var PZ = new THREE.Vector3(-0.62, 2.45, 0.7), CK = new THREE.Vector3(0.62, 2.45, 0.7);
  var sliceG = new THREE.Group();
  (function () {
    var f = new THREE.Group(); sliceG.add(f);
    var cr = mk(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 24, 1, false, 0, 1.1), mat(0xe2a35c), true); f.add(cr);
    var ch = mk(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 24, 1, false, 0.04, 1.02), mat(0xffd35c), false); f.add(ch);
    var pp = mk(new THREE.CylinderGeometry(0.06, 0.06, 0.11, 14), mat(0xc2352f), false); pp.position.set(0.2, 0, 0.2); f.add(pp);
    f.rotation.x = Math.PI / 2 - 0.25; f.rotation.z = 0.4; f.position.x = -0.2;
    sliceG.visible = false; scene.add(sliceG);
  })();

  function pill(txt, w) {
    var tex = labelTex(function (x, ww, hh) {
      x.fillStyle = '#ffffff'; rr(x, 6, 6, ww - 12, hh - 12, 54); x.fill();
      x.fillStyle = '#3a2a40'; x.font = '700 80px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, ww / 2, hh / 2 + 4);
    }, 512, 128);
    var m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 4), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    m.scale.setScalar(0.001); m.visible = false; scene.add(m); return m;
  }
  var pillP = pill('tem pizza?', 1.1), pillC = pill('senão', 0.8);
  var chkTex = labelTex(function (x, w, h) {
    x.fillStyle = '#3ecf8e'; x.beginPath(); x.arc(w / 2, h / 2, 110, 0, 6.3); x.fill();
    x.strokeStyle = '#ffffff'; x.lineWidth = 26; x.lineCap = 'round'; x.lineJoin = 'round';
    x.beginPath(); x.moveTo(w / 2 - 55, h / 2 + 5); x.lineTo(w / 2 - 12, h / 2 + 50); x.lineTo(w / 2 + 60, h / 2 - 45); x.stroke();
  }, 256, 256);
  var chk = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.42), new THREE.MeshBasicMaterial({ map: chkTex, transparent: true }));
  chk.visible = false; scene.add(chk);

  var qmTex = labelTex(function (x, w, h) {
    x.font = '700 230px ' + FD; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.lineWidth = 26; x.strokeStyle = '#ffffff'; x.lineJoin = 'round'; x.strokeText('?', w / 2, h / 2 + 10);
    x.fillStyle = '#ff5c8a'; x.fillText('?', w / 2, h / 2 + 10);
  }, 256, 256);
  var qm = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.6), new THREE.MeshBasicMaterial({ map: qmTex, transparent: true }));
  qm.position.set(1.5, 2.15, 0.9); qm.visible = false; scene.add(qm);

  var tears = [];
  for (var ti = 0; ti < 6; ti++) {
    var tm = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), new THREE.MeshBasicMaterial({ color: col(0x8fd3ff) }));
    tm.scale.set(0.8, 1.25, 0.8); tm.visible = false; scene.add(tm); tears.push(tm);
  }
  var CONF = [], CC = ['#ff6b8a', '#ffd166', '#5bd6a4', '#7aa7ff', '#c39bff'];
  for (var ci = 0; ci < 44; ci++) {
    var cm = mk(new THREE.BoxGeometry(0.09, 0.05, 0.012), new THREE.MeshBasicMaterial({ color: col(CC[ci % 5]) }), false, false);
    cm.visible = false; scene.add(cm); CONF.push(cm);
  }

'''
S=cut(S,"  /* ---------- sala ---------- */","  /* ---------- expressões e gestos ---------- */",SCENE)
S=S.replace("x: -2.15, z: 0.2","x: -1.5, z: 0.2").replace("x: 2.15, z: 0.2","x: 1.5, z: 0.2")

FRAME=r'''  /* ---------- quadro a quadro ---------- */
  var camW = { p: [0, 2.0, 19.8], t: [0, 1.7, 0] }, camP = { p: [-0.5, 2.0, 18.4], t: [-0.45, 1.7, 0] }, camC = { p: [0.5, 2.0, 18.4], t: [0.45, 1.7, 0] };
  var camPos = new THREE.Vector3(), camTgt = new THREE.Vector3();
  function itemPop(g, tt, t0, base, bob) {
    var s = pop(tt, t0, 0.5);
    g.visible = s > 0.01; g.scale.setScalar(Math.max(s, 0.001));
    g.position.set(base.x, base.y + 0.05 * Math.sin(tt * 2.6 + bob), base.z);
    g.rotation.z = 0.1 * Math.sin(tt * 1.9 + bob);
  }
  function frame(tt) {
    updateChar(prof, tt, 'P'); updateChar(cube, tt, 'C');
    itemPop(pizzaG, tt, EV.pizza, PZ, 0);
    itemPop(cookieG, tt, EV.cookie, CK, 1.3);
    [[pillP, EV.pizza + 0.1, PZ], [pillC, EV.cookie + 0.1, CK]].forEach(function (a) {
      var s = pop(tt, a[1], 0.4); a[0].visible = s > 0.01; a[0].scale.setScalar(Math.max(s, 0.001)); a[0].position.set(a[2].x, a[2].y - 0.72, a[2].z);
    });
    var cs = pop(tt, EV.chk, 0.4); chk.visible = cs > 0.01; chk.scale.setScalar(Math.max(cs, 0.001)); chk.position.set(PZ.x + 0.45, PZ.y + 0.4, PZ.z + 0.1);

    // fatia de pizza voa até o Cubinho
    var sl = tt - EV.slice, jf = jumpFx(tt);
    if (sl < 0) { sliceG.visible = false; }
    else {
      var u = clamp(sl / 0.9, 0, 1), e = u * u * (3 - 2 * u);
      var hx = 1.5 + 0.02 * Math.sin(tt * 3), hy = 2.2 + jf.y;
      sliceG.visible = true;
      sliceG.position.set(lerp(PZ.x, hx, e), lerp(PZ.y, hy, e) + 0.9 * 4 * u * (1 - u) * (u < 1 ? 1 : 0), lerp(PZ.z, 0.95, e));
      sliceG.rotation.z = (1 - e) * 5 * Math.sin(u * 3.14);
      sliceG.scale.setScalar(lerp(0.9, 0.75, e));
    }

    // interrogação e lágrimas
    var qs = pop(tt, EV.qm, 0.35) * (1 - S(tt, EV.qmEnd, EV.qmEnd + 0.2));
    qm.visible = qs > 0.02; qm.scale.setScalar(Math.max(qs, 0.001)); qm.position.y = 2.15 + 0.05 * Math.sin(tt * 3); qm.rotation.z = 0.15 * Math.sin(tt * 2.2);
    tears.forEach(function (m, i) {
      var side = i % 2 ? 1 : -1, ph = ((tt - EV.c2a) * 1.6 + i * 0.31) % 1;
      if (tt < EV.c2a || tt > EV.c2b + 0.5) { m.visible = false; return; }
      m.visible = true;
      m.position.set(1.5 + side * 0.3, 0.86 - ph * 0.55, 0.82);
      m.scale.set(0.8 * (1 - ph * 0.5), 1.25 * (1 - ph * 0.5), 0.8);
    });

    // confete
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
open('ep2.html','w').write(S)
t=S.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','h/node_modules/three/build/three.min.js').replace('<link rel="stylesheet" href="https://fonts.googleapis.com','<link rel="stylesheet" data-x="https://fonts.googleapis.com')
open('test2.html','w').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
import re
m=re.findall(r'<script>(.*?)</script>',S,re.S); open('check3.js','w').write(m[-1])
