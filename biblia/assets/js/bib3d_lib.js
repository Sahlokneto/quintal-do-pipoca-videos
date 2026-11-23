// ===== bib3d_lib.js — biblioteca 3D do canal Segredos da Escritura =====
// Personagens "boneco" arredondados e detalhados (rosto com olhos brilhantes, cabelo, barba, túnica, cinto, manto,
// mangas, sandálias), cavalos, carro, palmeiras, casas de barro, ruínas, terreno com textura, céu HDRI, poeira e luz.
// Regras do canal: Jesus NUNCA aparece com rosto (só luz/símbolo). Profetas e pessoas comuns podem ter rosto de boneco.
// Uso: carregar three.min.js, GLTFLoader.js, (opcional) EffectComposer/RenderPass/ShaderPass/CopyShader/
// LuminosityHighPassShader/UnrealBloomPass e este arquivo. Depois: B3.init(W,H,{sky:'...jpg'}) e B3.load([...]).
var B3 = (function () {
  var PI = Math.PI, A = {}, S, R, cam, composer, texL = new THREE.TextureLoader(), gl = new THREE.GLTFLoader();
  var seed = 11; function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function mat(c, o) { o = o || {}; var m = new THREE.MeshStandardMaterial({ color: c, roughness: o.r == null ? .85 : o.r, metalness: o.m || 0 });
    if (o.e) { m.emissive = new THREE.Color(o.e); m.emissiveIntensity = o.ei == null ? 1 : o.ei; } if (o.map) m.map = o.map; if (o.side) m.side = o.side; return m; }
  function sh(m) { m.castShadow = true; m.receiveShadow = true; return m; }
  function tex(path, rep) { var t = texL.load(path); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rep) t.repeat.set(rep, rep); t.anisotropy = 4; return t; }
  function pbr(base, rep, color) { var m = new THREE.MeshStandardMaterial({ color: color || 0xffffff, roughness: 1 });
    m.map = tex(base + '_Diffuse.jpg', rep); m.map.encoding = THREE.sRGBEncoding; m.normalMap = tex(base + '_nor_gl.jpg', rep); m.roughnessMap = tex(base + '_Rough.jpg', rep); return m; }
  // ---------- tecido com tramas (dá riqueza às roupas) ----------
  function fabric(c1, c2, stripes) { var c = document.createElement('canvas'); c.width = c.height = 256; var x = c.getContext('2d');
    x.fillStyle = c1; x.fillRect(0, 0, 256, 256);
    for (var i = 0; i < 2600; i++) { x.fillStyle = 'rgba(0,0,0,' + (rnd() * .06) + ')'; x.fillRect(rnd() * 256, rnd() * 256, 1 + rnd() * 3, 1); }
    for (var i = 0; i < 900; i++) { x.fillStyle = 'rgba(255,255,255,' + (rnd() * .05) + ')'; x.fillRect(rnd() * 256, rnd() * 256, 1, 1 + rnd() * 3); }
    if (stripes) { x.fillStyle = c2; [26, 34, 222, 230].forEach(function (y) { x.fillRect(0, y, 256, 5); }); }
    var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.encoding = THREE.sRGBEncoding; return t; }
  // ---------- rosto pintado na esfera da cabeça (frente = u 0.25) ----------
  function faceTex(o) { var c = document.createElement('canvas'); c.width = 1024; c.height = 512; var x = c.getContext('2d');
    x.fillStyle = o.skin; x.fillRect(0, 0, 1024, 512);
    var g = x.createRadialGradient(256, 300, 10, 256, 300, 200); g.addColorStop(0, 'rgba(255,255,255,.10)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
    var ey = o.eyeY || 268, ex = 62, closed = o.closed;
    // sobrancelhas
    x.strokeStyle = o.brow; x.lineCap = 'round'; x.lineWidth = 15;
    [-1, 1].forEach(function (s) { x.beginPath(); x.moveTo(256 + s * (ex - 30), ey - 58 + (o.sad ? -s * 8 : 0)); x.quadraticCurveTo(256 + s * ex, ey - 72, 256 + s * (ex + 32), ey - 56 + (o.sad ? s * 10 : 0)); x.stroke(); });
    [-1, 1].forEach(function (s) { var cx = 256 + s * ex;
      if (closed) { x.strokeStyle = '#2a1a12'; x.lineWidth = 9; x.beginPath(); x.arc(cx, ey - 6, 26, .15 * PI, .85 * PI); x.stroke(); return; }
      x.fillStyle = '#fff'; x.beginPath(); x.ellipse(cx, ey, 30, 38, 0, 0, 2 * PI); x.fill();
      var ig = x.createRadialGradient(cx, ey + 4, 2, cx, ey + 4, 27); ig.addColorStop(0, '#1a0f0a'); ig.addColorStop(.55, o.iris || '#5a3a22'); ig.addColorStop(1, '#1a0f0a');
      x.fillStyle = ig; x.beginPath(); x.ellipse(cx, ey + 4, 25, 32, 0, 0, 2 * PI); x.fill();
      x.fillStyle = '#0b0605'; x.beginPath(); x.ellipse(cx, ey + 6, 12, 15, 0, 0, 2 * PI); x.fill();
      x.fillStyle = '#fff'; x.beginPath(); x.ellipse(cx + 9, ey - 9, 9, 11, 0, 0, 2 * PI); x.fill(); x.beginPath(); x.arc(cx - 9, ey + 16, 4.5, 0, 2 * PI); x.fill();
      x.strokeStyle = '#2a1a12'; x.lineWidth = 7; x.beginPath(); x.ellipse(cx, ey, 31, 39, 0, 1.12 * PI, 1.88 * PI); x.stroke();
      if (o.lines) { x.strokeStyle = 'rgba(80,40,20,.35)'; x.lineWidth = 3; x.beginPath(); x.moveTo(cx + s * 34, ey + 10); x.lineTo(cx + s * 48, ey + 2); x.moveTo(cx + s * 34, ey + 18); x.lineTo(cx + s * 48, ey + 18); x.stroke(); } });
    // nariz e boca
    x.fillStyle = 'rgba(120,60,30,.22)'; x.beginPath(); x.ellipse(256, ey + 50, 12, 8, 0, 0, 2 * PI); x.fill();
    if (!o.beard) { x.strokeStyle = '#5a2a1a'; x.lineWidth = 7; x.beginPath(); if (o.open) { x.fillStyle = '#5a1a14'; x.ellipse(256, ey + 92, 16, 13, 0, 0, 2 * PI); x.fill(); } else { x.arc(256, ey + 76, 22, .2 * PI, .8 * PI); x.stroke(); } }
    x.fillStyle = 'rgba(230,110,100,.28)'; [-1, 1].forEach(function (s) { x.beginPath(); x.ellipse(256 + s * 100, ey + 52, 26, 15, 0, 0, 2 * PI); x.fill(); });
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t; }
  // ---------- pessoa ----------
  // o = {skin, iris, robe, robe2, mantle, belt, hair, hairStyle:'long'|'short'|'bald', beard:'long'|'short'|null, beardC, staff, h}
  function person(o) {
    var root = new THREE.Group(), body = new THREE.Group(); root.add(body);
    var skin = mat(o.skin, { r: .6 }), robeT = fabric(o.robe, o.robe2 || '#00000033', true);
    var robe = new THREE.MeshStandardMaterial({ color: 0xffffff, map: robeT, roughness: .95 });
    // túnica (perfil girado)
    var pr = [[0.001, 0], [.62, 0], [.6, .06], [.55, .45], [.47, .95], [.42, 1.25], [.36, 1.45], [.24, 1.56], [.001, 1.58]].map(function (p) { return new THREE.Vector2(p[0], p[1]); });
    var lg = new THREE.LatheGeometry(pr, 48), lp = lg.attributes.position;
    for (var i = 0; i < lp.count; i++) { var X = lp.getX(i), Y = lp.getY(i), Z = lp.getZ(i), an = Math.atan2(Z, X), k = 1 + .045 * Math.sin(an * 11 + Y * 1.5) * clampU(1.15 - Y / 1.5); lp.setX(i, X * k); lp.setZ(i, Z * k); }
    lg.computeVertexNormals(); var tun = sh(new THREE.Mesh(lg, robe)); body.add(tun);
    var hem = sh(new THREE.Mesh(new THREE.TorusGeometry(.6, .035, 6, 32), mat(o.robe2 || '#6b4a2a'))); hem.rotation.x = PI / 2; hem.position.y = .07; body.add(hem);
    var belt = sh(new THREE.Mesh(new THREE.TorusGeometry(.47, .055, 8, 32), mat(o.belt || '#5a3a1e', { r: .7 }))); belt.rotation.x = PI / 2; belt.position.y = .98; body.add(belt);
    var knot = sh(new THREE.Mesh(new THREE.SphereGeometry(.07, 10, 8), mat(o.belt || '#5a3a1e'))); knot.position.set(.12, .96, .45); body.add(knot);
    [[.06, -.05], [.16, -.09]].forEach(function (q) { var e = sh(new THREE.Mesh(new THREE.CylinderGeometry(.025, .02, .28, 6), mat(o.belt || '#5a3a1e'))); e.position.set(q[0] + .08, .82, .44); e.rotation.z = q[1] * 3; body.add(e); });
    // manto (abre na frente)
    var mantleM = new THREE.MeshStandardMaterial({ color: 0xffffff, map: fabric(o.mantle, '#00000022', false), roughness: .95, side: THREE.DoubleSide });
    var ma = sh(new THREE.Mesh(new THREE.CylinderGeometry(.4, .72, 1.3, 28, 4, true, .55, 2 * PI - 1.1), mantleM)); ma.position.y = .9; ma.rotation.y = PI; body.add(ma);
    var col = sh(new THREE.Mesh(new THREE.TorusGeometry(.3, .07, 8, 24), mantleM)); col.rotation.x = PI / 2; col.position.y = 1.52; body.add(col);
    // pés (sandálias)
    [-1, 1].forEach(function (s) { var f = sh(new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 8), skin)); f.scale.set(1, .55, 1.6); f.position.set(s * .2, .06, .42); body.add(f);
      var so = sh(new THREE.Mesh(new THREE.BoxGeometry(.24, .03, .44), mat('#4a2e18'))); so.position.set(s * .2, .015, .42); body.add(so);
      var st = new THREE.Mesh(new THREE.TorusGeometry(.12, .018, 6, 16, PI), mat('#4a2e18')); st.position.set(s * .2, .06, .46); body.add(st); });
    // braços (manga em sino)
    function arm(s) { var g = new THREE.Group(); g.position.set(s * .4, 1.42, 0); body.add(g);
      var up = sh(new THREE.Mesh(new THREE.CylinderGeometry(.11, .15, .5, 12), robe)); up.position.y = -.25; g.add(up);
      var el = new THREE.Group(); el.position.y = -.48; g.add(el);
      var lo = sh(new THREE.Mesh(new THREE.CylinderGeometry(.15, .23, .46, 14, 1, true), new THREE.MeshStandardMaterial({ color: 0xffffff, map: robeT, roughness: .95, side: THREE.DoubleSide }))); lo.position.y = -.23; el.add(lo);
      var hand = sh(new THREE.Mesh(new THREE.SphereGeometry(.1, 12, 10), skin)); hand.scale.set(1, 1.15, .85); hand.position.y = -.5; el.add(hand);
      var th = sh(new THREE.Mesh(new THREE.SphereGeometry(.045, 8, 6), skin)); th.position.set(-s * .07, -.46, .05); el.add(th);
      return { s: g, e: el, hand: hand }; }
    var aL = arm(-1), aR = arm(1);
    if (o.staff) { var stf = sh(new THREE.Mesh(new THREE.CylinderGeometry(.035, .045, 2.3, 8), mat('#6b4a2a', { r: .8 }))); stf.position.set(0, -.2, .05); aR.e.add(stf);
      var crook = sh(new THREE.Mesh(new THREE.TorusGeometry(.12, .035, 6, 14, PI * 1.2), mat('#6b4a2a'))); crook.position.set(-.12, .95, .05); stf.add(crook); }
    // cabeça
    var head = new THREE.Group(); head.position.y = 1.58; body.add(head);
    var neck = sh(new THREE.Mesh(new THREE.CylinderGeometry(.12, .14, .16, 10), skin)); neck.position.y = .02; head.add(neck);
    var fo = { skin: o.skin, iris: o.iris, brow: o.brow || o.hair, beard: !!o.beard, lines: o.old };
    var FT = { idle: faceTex(fo), sad: faceTex(Object.assign({}, fo, { sad: 1 })), closed: faceTex(Object.assign({}, fo, { closed: 1 })), shout: faceTex(Object.assign({}, fo, { open: 1, sad: 1, beard: false })) };
    var hm = new THREE.MeshStandardMaterial({ map: FT.idle, roughness: .6 });
    var hd = sh(new THREE.Mesh(new THREE.SphereGeometry(.42, 48, 32), hm)); hd.scale.set(1, 1.02, .96); hd.position.y = .42; head.add(hd);
    [-1, 1].forEach(function (s) { var e = sh(new THREE.Mesh(new THREE.SphereGeometry(.09, 10, 8), skin)); e.scale.set(.6, 1, .8); e.position.set(s * .41, .42, -.02); head.add(e); });
    var hairM = mat(o.hair, { r: .75 });
    if (o.hairStyle === 'bald') { var ring = sh(new THREE.Mesh(new THREE.TorusGeometry(.38, .07, 8, 28, PI * 1.3), hairM)); ring.rotation.set(PI / 2, 0, PI * -.15 - PI * .5); ring.position.set(0, .36, -.04); head.add(ring); }
    else { var cap = sh(new THREE.Mesh(new THREE.SphereGeometry(.45, 32, 16, 0, 2 * PI, 0, 1.25), hairM)); cap.position.set(0, .45, -.03); cap.rotation.x = -.32; head.add(cap);
      for (var i = 0; i < 9; i++) { var a = -PI * .7 + i * PI * 1.4 / 8; var cl = sh(new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), hairM)); cl.position.set(Math.sin(a) * .4, .62 + Math.cos(i) * .03, Math.cos(a) * .4 - .1); cl.scale.set(1, .8, 1); head.add(cl); }
      if (o.hairStyle === 'long') { var bk = sh(new THREE.Mesh(new THREE.SphereGeometry(.4, 20, 14), hairM)); bk.scale.set(1.05, 1.35, .6); bk.position.set(0, .2, -.25); head.add(bk);
        [-1, 1].forEach(function (s) { var lk = sh(new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), hairM)); lk.scale.set(.8, 2.2, .8); lk.position.set(s * .38, .14, -.05); head.add(lk); }); } }
    if (o.beard) { var bM = mat(o.beardC || o.hair, { r: .8 }); var big = o.beard === 'long';
      var bd = sh(new THREE.Mesh(new THREE.SphereGeometry(.3, 20, 14), bM)); bd.scale.set(1.12, big ? 1.35 : .8, .75); bd.position.set(0, big ? .08 : .16, .2); head.add(bd);
      [-1, 1].forEach(function (s) { var ms = sh(new THREE.Mesh(new THREE.SphereGeometry(.1, 10, 8), bM)); ms.scale.set(1.5, .55, .8); ms.position.set(s * .09, .33, .37); ms.rotation.z = s * .35; head.add(ms);
        var sd = sh(new THREE.Mesh(new THREE.SphereGeometry(.12, 10, 8), bM)); sd.scale.set(.8, 1.5, .9); sd.position.set(s * .3, .26, .17); head.add(sd); });
      var lip = new THREE.Mesh(new THREE.SphereGeometry(.05, 8, 6), mat('#a0503a')); lip.scale.set(1.4, .5, .6); lip.position.set(0, .27, .4); head.add(lip); }
    var P = { root: root, body: body, head: head, hd: hd, aL: aL, aR: aR, FT: FT, hm: hm, face: 'idle' };
    var s = o.h || 1; root.scale.setScalar(s); S.add(root); return P; }
  // poses: walk, stand, shout (braços erguidos), pray (mãos juntas), lift (flutuando)
  function pose(P, p, t) { var aLx = .08, aRx = .08, aLz = .12, aRz = -.12, eL = -.15, eR = -.15, by = 0, br = 0, hx = 0;
    if (p === 'walk') { var w = t * 7; aLx = Math.sin(w) * .45; aRx = -Math.sin(w) * .45; by = Math.abs(Math.sin(w)) * .05; br = Math.sin(w) * .03; }
    if (p === 'shout') { aLx = aRx = -2.6; aLz = -.35; aRz = .35; eL = eR = -.3; hx = -.25; }
    if (p === 'reach') { aLx = -1.6; aRx = -2.3; aLz = -.1; aRz = .2; eL = eR = -.2; hx = -.35; }
    if (p === 'pray') { aLx = aRx = -1.25; aLz = .55; aRz = -.55; eL = eR = -1.25; hx = .18; }
    if (p === 'strike') { aRx = -1.2 - Math.max(0, Math.sin(t * 3)) * 1.2; eR = -.4; }
    if (p === 'lift') { aLx = aRx = -.6; aLz = -.9; aRz = .9; eL = eR = -.2; hx = -.3; }
    P.aL.s.rotation.set(aLx, 0, aLz); P.aR.s.rotation.set(aRx, 0, aRz); P.aL.e.rotation.x = eL; P.aR.e.rotation.x = eR;
    P.body.position.y = by; P.body.rotation.z = br; P.head.rotation.x = hx; }
  function face(P, f) { if (P.face !== f) { P.face = f; P.hm.map = P.FT[f]; P.hm.needsUpdate = true; } }
  // ---------- cavalo arredondado ----------
  function horse(m, mane) { var g = new THREE.Group(), legs = [];
    function el(rx, ry, rz, x, y, z, mm) { var e = sh(new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), mm || m)); e.scale.set(rx, ry, rz); e.position.set(x, y, z); g.add(e); return e; }
    el(.95, .5, .46, 0, 1.45, 0); el(.5, .55, .47, .72, 1.5, 0); el(.52, .55, .48, -.72, 1.48, 0);
    var nk = sh(new THREE.Mesh(new THREE.CylinderGeometry(.2, .32, 1.0, 14), m)); nk.position.set(1.12, 2.0, 0); nk.rotation.z = -.62; g.add(nk);
    var hd = el(.42, .21, .2, 1.55, 2.42, 0); hd.rotation.z = -.75; var mu = el(.18, .17, .17, 1.78, 2.15, 0);
    [-1, 1].forEach(function (s) { var ear = sh(new THREE.Mesh(new THREE.ConeGeometry(.06, .2, 6), m)); ear.position.set(1.4, 2.72, s * .09); ear.rotation.z = -.3; g.add(ear);
      var eye = new THREE.Mesh(new THREE.SphereGeometry(.045, 8, 6), mat('#111', { r: .2 })); eye.position.set(1.55, 2.5, s * .17); g.add(eye);
      var hi = new THREE.Mesh(new THREE.SphereGeometry(.015, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff })); hi.position.set(1.58, 2.52, s * .21); g.add(hi); });
    for (var i = 0; i < 8; i++) { var mn = sh(new THREE.Mesh(new THREE.SphereGeometry(.11, 8, 6), mane || m)); var u = i / 7; mn.position.set(lerp(1.42, .75, u), lerp(2.6, 1.9, u) + .08, 0); mn.scale.set(.9, 1.4, .6); mn.rotation.z = -.6; g.add(mn); }
    var tl = sh(new THREE.Mesh(new THREE.ConeGeometry(.14, 1.0, 10), mane || m)); tl.position.set(-1.32, 1.2, 0); tl.rotation.z = -2.5; g.add(tl);
    [[.62, .22], [.62, -.22], [-.66, .22], [-.66, -.22]].forEach(function (q) { var l = new THREE.Group(); l.position.set(q[0], 1.25, q[1]); g.add(l);
      var up = sh(new THREE.Mesh(new THREE.CylinderGeometry(.12, .09, .62, 10), m)); up.position.y = -.31; l.add(up);
      var kn = new THREE.Group(); kn.position.y = -.62; l.add(kn); var lo = sh(new THREE.Mesh(new THREE.CylinderGeometry(.075, .07, .52, 8), m)); lo.position.y = -.26; kn.add(lo);
      var hf = sh(new THREE.Mesh(new THREE.CylinderGeometry(.09, .1, .1, 10), mat('#2a1e16'))); hf.position.y = -.55; kn.add(hf); legs.push([l, kn]); });
    g.userData.legs = legs; return g; }
  function gallop(g, t, sp) { g.userData.legs.forEach(function (L, k) { var ph = t * sp + [0, .4, 2.2, 2.6][k]; L[0].rotation.z = Math.sin(ph) * .55; L[1].rotation.z = Math.max(0, Math.sin(ph + 1)) * .9; }); }
  // ---------- carro (biga) ----------
  function chariot(m, rim) { var g = new THREE.Group(), wheels = [];
    var front = sh(new THREE.Mesh(new THREE.CylinderGeometry(.75, .75, .95, 24, 1, true, 0, PI), m)); front.material.side = THREE.DoubleSide; front.position.set(0, 1.2, 0); front.rotation.y = PI / 2; g.add(front);
    var tr = sh(new THREE.Mesh(new THREE.TorusGeometry(.75, .045, 8, 24, PI), rim)); tr.position.set(0, 1.67, 0); tr.rotation.set(PI / 2, 0, -PI / 2); g.add(tr);
    var fl = sh(new THREE.Mesh(new THREE.BoxGeometry(1.0, .08, 1.5), m)); fl.position.set(-.25, .74, 0); g.add(fl);
    [-1, 1].forEach(function (s) { var w = new THREE.Group(); w.position.set(-.3, .7, s * .88); g.add(w);
      var r = sh(new THREE.Mesh(new THREE.TorusGeometry(.62, .06, 8, 28), rim)); w.add(r); var hb = sh(new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .2, 10), rim)); hb.rotation.x = PI / 2; w.add(hb);
      for (var k = 0; k < 6; k++) { var sp = sh(new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, 1.18, 6), m)); sp.rotation.z = k * PI / 6; w.add(sp); } wheels.push(w); });
    var pole = sh(new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, 2.6, 8), m)); pole.rotation.z = PI / 2; pole.position.set(1.4, .95, 0); g.add(pole);
    g.userData.wheels = wheels; return g; }
  // ---------- palmeira ----------
  function palm(x, y, z, h) { var g = new THREE.Group(), tm = mat('#7a5a3a', { r: .95 }), lm = new THREE.MeshStandardMaterial({ color: 0x5f7a2e, roughness: .8, side: THREE.DoubleSide });
    var n = 9, bend = (rnd() - .5) * .5, top = new THREE.Vector3();
    for (var i = 0; i < n; i++) { var c = sh(new THREE.Mesh(new THREE.CylinderGeometry(.16 - i * .007, .19 - i * .007, h / n * 1.05, 10), tm)); var yy = (i + .5) * h / n; c.position.set(Math.sin(i / n * 1.2) * bend * h * .3, yy, 0); g.add(c);
      var rg = new THREE.Mesh(new THREE.TorusGeometry(.18 - i * .007, .025, 4, 12), mat('#5a3e26')); rg.rotation.x = PI / 2; rg.position.set(c.position.x, i * h / n + .02, 0); g.add(rg); top.copy(c.position); }
    top.y = h; for (var k = 0; k < 11; k++) { var fg = new THREE.PlaneGeometry(.55, 2.6, 1, 8); var p = fg.attributes.position;
      for (var j = 0; j < p.count; j++) { var yy = p.getY(j) + 1.3; p.setZ(j, -yy * yy * .18); p.setX(j, p.getX(j) * (1 - yy / 3)); } fg.translate(0, 1.3, 0); fg.computeVertexNormals();
      var f = sh(new THREE.Mesh(fg, lm)); f.position.copy(top); f.rotation.set(-.6 - rnd() * .5, k / 11 * 2 * PI, 0, 'YXZ'); g.add(f); }
    for (var k = 0; k < 7; k++) { var d = new THREE.Mesh(new THREE.SphereGeometry(.09, 8, 6), mat('#b5651d')); d.position.set(top.x + Math.cos(k) * .2, h - .25 - rnd() * .2, Math.sin(k) * .2); g.add(d); }
    g.position.set(x, y, z); S.add(g); return g; }
  // ---------- casa de barro ----------
  var plaster;
  function house(x, y, z, w, d, h, ry) { var g = new THREE.Group(); plaster = plaster || pbr(B3.base + 'tex/clay_plaster', 1, 0xe7c9a0);
    var m = plaster.clone(); m.map = plaster.map.clone(); m.map.repeat.set(w / 3, h / 3); m.map.needsUpdate = true;
    var b = sh(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)); b.position.y = h / 2; g.add(b);
    var pm = mat('#c9a57a'); [[0, h + .15, d / 2, w, .3, .12], [0, h + .15, -d / 2, w, .3, .12], [w / 2, h + .15, 0, .12, .3, d], [-w / 2, h + .15, 0, .12, .3, d]].forEach(function (q) { var p = sh(new THREE.Mesh(new THREE.BoxGeometry(q[3], q[4], q[5]), pm)); p.position.set(q[0], q[1], q[2]); g.add(p); });
    var dk = mat('#2a1a10'); var door = new THREE.Mesh(new THREE.PlaneGeometry(.8, 1.5), dk); door.position.set(-w * .2, .75, d / 2 + .01); g.add(door);
    var win = new THREE.Mesh(new THREE.PlaneGeometry(.45, .45), mat('#ffb36a', { e: '#ff9a40', ei: .6 })); win.position.set(w * .25, h * .62, d / 2 + .01); g.add(win);
    var beam = sh(new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, w + .4, 6), mat('#5a3e26'))); beam.rotation.z = PI / 2; beam.position.set(0, h - .15, d / 2 + .05); g.add(beam);
    for (var i = 0; i < 3; i++) { var j = sh(new THREE.Mesh(new THREE.SphereGeometry(.18, 10, 8), mat('#b5734a'))); j.scale.set(1, 1.3, 1); j.position.set(w / 2 - .3 - i * .35, .23, d / 2 + .35); g.add(j); }
    g.position.set(x, y, z); g.rotation.y = ry || 0; S.add(g); return g; }
  // ---------- modelos glTF (Poly Haven, CC0) ----------
  function load(names) { return Promise.all(names.map(function (n) { return new Promise(function (ok, bad) { gl.load(B3.base + 'models/' + n + '/' + n + '.gltf', function (g) { g.scene.traverse(function (o) { if (o.isMesh) { o.castShadow = o.receiveShadow = true; } }); A[n] = g.scene; ok(); }, null, bad); }); })); }
  function put(n, x, y, z, s, ry) { var o = A[n].clone(); o.position.set(x, y, z); o.scale.setScalar(s || 1); o.rotation.y = ry || 0; S.add(o); return o; }
  // ---------- motor ----------
  function init(W, H, o) { o = o || {};
    R = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true }); R.setSize(W, H); R.setPixelRatio(1);
    R.outputEncoding = THREE.sRGBEncoding; R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = o.exposure || 1.05;
    R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFShadowMap; R.domElement.id = 'cv';
    S = new THREE.Scene(); cam = new THREE.PerspectiveCamera(o.fov || 46, W / H, .1, 600);
    if (o.sky) { var sk = texL.load(o.sky, function (t) { t.mapping = THREE.EquirectangularReflectionMapping; t.encoding = THREE.sRGBEncoding; S.background = t;
        var pm = new THREE.PMREMGenerator(R); S.environment = pm.fromEquirectangular(t).texture; B3.skyReady = true; }); }
    if (o.bloom && THREE.UnrealBloomPass) { composer = new THREE.EffectComposer(R); composer.addPass(new THREE.RenderPass(S, cam));
      composer.addPass(new THREE.UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), o.bloom, .5, .82)); }
    B3.S = S; B3.R = R; B3.cam = cam; return { S: S, R: R, cam: cam }; }
  function render() { if (composer) composer.render(); else R.render(S, cam); }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function clampU(v) { return Math.max(0, Math.min(1, v)); }
  return { init: init, render: render, load: load, put: put, person: person, pose: pose, face: face, horse: horse, gallop: gallop, chariot: chariot,
    palm: palm, house: house, mat: mat, pbr: pbr, tex: tex, sh: sh, rnd: rnd, fabric: fabric, A: A, base: '../../assets/' };
})();
