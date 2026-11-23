// ===== bib3d_world.js — mundo 100% feito à mão (sem modelos importados) =====
// Regra de ouro: TODO objeto apoiado no chão nasce ABAIXO do chão (base enterrada) — nada flutua.
// Use W3.ground(fn) para registrar a função de altura do terreno e W3.y(x,z) para consultar.
var W3 = (function () {
  var PI = Math.PI, HT = function () { return 0; };
  function rnd() { return B3.rnd(); }
  function ground(fn) { HT = fn; }
  function y(x, z) { return HT(x, z); }
  // menor altura do terreno numa área (para enterrar a base de construções)
  function minUnder(x, z, w, d) { var m = 1e9; for (var i = -1; i <= 1; i += .5) for (var j = -1; j <= 1; j += .5) m = Math.min(m, HT(x + i * w / 2, z + j * d / 2)); return m; }
  function maxUnder(x, z, w, d) { var m = -1e9; for (var i = -1; i <= 1; i += .5) for (var j = -1; j <= 1; j += .5) m = Math.max(m, HT(x + i * w / 2, z + j * d / 2)); return m; }
  // ---------- texturas pintadas por código ----------
  function canvasTex(sz, paint, rep) { var c = document.createElement('canvas'); c.width = c.height = sz; var x = c.getContext('2d'); paint(x, sz);
    var t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; if (rep) t.repeat.set(rep, rep); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t; }
  function speckle(x, sz, n, cols, smin, smax, a) { for (var i = 0; i < n; i++) { x.fillStyle = cols[i % cols.length]; x.globalAlpha = a * (.4 + rnd() * .6); var s = smin + rnd() * (smax - smin); x.beginPath(); x.ellipse(rnd() * sz, rnd() * sz, s, s * (.5 + rnd() * .6), rnd() * 3, 0, 2 * PI); x.fill(); } x.globalAlpha = 1; }
  var T = {};
  T.sand = function (rep) { return canvasTex(512, function (x, s) { x.fillStyle = '#d2ab7c'; x.fillRect(0, 0, s, s); speckle(x, s, 2600, ['#c49a6a', '#e0bc8e', '#b88d5e', '#ead0a6'], 1, 4, .5);
      x.strokeStyle = 'rgba(150,110,70,.18)'; x.lineWidth = 3; for (var i = 0; i < 26; i++) { x.beginPath(); var yy = rnd() * s; x.moveTo(0, yy); for (var k = 0; k <= 8; k++) x.quadraticCurveTo(k * s / 8 - s / 16, yy + Math.sin(k + i) * 10, k * s / 8, yy + Math.cos(k * 1.3 + i) * 6); x.stroke(); }
      speckle(x, s, 140, ['#8a6a4a', '#9a7a5a'], 2, 5, .6); }, rep); };
  T.plaster = function () { return canvasTex(256, function (x, s) { x.fillStyle = '#dcc09a'; x.fillRect(0, 0, s, s); speckle(x, s, 900, ['#cbb08a', '#e8d2b0', '#bfa27c'], 2, 9, .35);
      x.strokeStyle = 'rgba(120,90,60,.25)'; x.lineWidth = 1.5; for (var i = 0; i < 10; i++) { x.beginPath(); var a = rnd() * s, b = rnd() * s; x.moveTo(a, b); x.lineTo(a + rnd() * 30 - 15, b + rnd() * 40); x.stroke(); } }, 1); };
  T.stone = function () { return canvasTex(256, function (x, s) { x.fillStyle = '#b9a284'; x.fillRect(0, 0, s, s);
      var rows = 6, h = s / rows; for (var r = 0; r < rows; r++) { var off = (r % 2) * 22, w = 0; for (var c = -1; c < 6; c++) { var ww = 38 + rnd() * 20; x.fillStyle = ['#c8b294', '#b09878', '#d2bea0', '#a88e70'][(r + c + 8) % 4]; x.fillRect(c * 46 + off + 2, r * h + 2, ww, h - 4); } }
      speckle(x, s, 700, ['#8a7458', '#e0ceb0'], 1, 3, .4); }, 1); };
  T.wood = function () { return canvasTex(256, function (x, s) { x.fillStyle = '#7a4a2a'; x.fillRect(0, 0, s, s); x.strokeStyle = 'rgba(40,20,10,.35)'; for (var i = 0; i < 40; i++) { x.lineWidth = 1 + rnd() * 2; x.beginPath(); var yy = rnd() * s; x.moveTo(0, yy); x.bezierCurveTo(s * .3, yy + rnd() * 8, s * .6, yy - rnd() * 8, s, yy); x.stroke(); } }, 1); };
  // ---------- céu desenhado (degradê + sol + nuvens) ----------
  function sky(S, o) { o = o || {}; var sunDir = (o.sun || new THREE.Vector3(-.55, .16, -.82)).clone().normalize();
    var m = new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false, uniforms: { sd: { value: sunDir }, tm: { value: 0 } },
      vertexShader: 'varying vec3 p;void main(){p=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: ['uniform vec3 sd;uniform float tm;varying vec3 p;',
        'float h(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453);}',
        'float n(vec2 q){vec2 i=floor(q),f=fract(q);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
        'float fb(vec2 q){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*n(q);q*=2.03;a*=.5;}return s;}',
        'void main(){float y=max(p.y,0.);vec3 top=vec3(.18,.36,.62),hor=vec3(.98,.74,.48),low=vec3(.85,.62,.45);',
        'vec3 c=mix(hor,top,pow(y,.55));if(p.y<0.)c=low;float d=max(dot(p,sd),0.);c+=vec3(1.,.62,.3)*pow(d,8.)*.55+vec3(1.,.9,.7)*pow(d,600.)*2.5;',
        'vec2 uv=p.xz/(p.y+.12)*1.6+vec2(tm*.004,0.);float cl=smoothstep(.52,.78,fb(uv*1.3));cl*=smoothstep(.02,.18,p.y);',
        'vec3 cc=mix(vec3(.98,.86,.78),vec3(1.,.72,.5),pow(d,3.));c=mix(c,cc,cl*.85);gl_FragColor=vec4(c,1.);}'].join('\n') });
    var dome = new THREE.Mesh(new THREE.SphereGeometry(400, 48, 24), m); S.add(dome); return { mesh: dome, sun: sunDir, u: m.uniforms }; }
  // ---------- pedra (icosaedro deformado), sempre enterrada 35% ----------
  var rockM;
  function rock(S, x, z, r, sq) { rockM = rockM || new THREE.MeshStandardMaterial({ color: 0x9a7a5c, roughness: .95, flatShading: true });
    var g = new THREE.IcosahedronGeometry(1, 2), p = g.attributes.position, sd = rnd() * 10;
    for (var i = 0; i < p.count; i++) { var vx = p.getX(i), vy = p.getY(i), vz = p.getZ(i), k = 1 + .22 * Math.sin(vx * 3.1 + sd) * Math.cos(vz * 2.7 + sd) + .12 * Math.sin(vy * 5 + sd); p.setXYZ(i, vx * k, vy * k * (sq || .7), vz * k); }
    g.computeVertexNormals(); var m = B3.sh(new THREE.Mesh(g, rockM)); m.scale.setScalar(r); m.rotation.y = rnd() * 6;
    m.position.set(x, minUnder(x, z, r * 2, r * 2) + r * (sq || .7) * .35, z); S.add(m); return m; }
  // ---------- arbusto ----------
  var bushM;
  function bush(S, x, z, s) { bushM = bushM || [new THREE.MeshStandardMaterial({ color: 0x6b7a3a, roughness: .9 }), new THREE.MeshStandardMaterial({ color: 0x55652e, roughness: .9 })];
    var g = new THREE.Group(); for (var i = 0; i < 6; i++) { var b = B3.sh(new THREE.Mesh(new THREE.IcosahedronGeometry(.35 + rnd() * .2, 1), bushM[i % 2])); b.position.set((rnd() - .5) * .7, .25 + rnd() * .25, (rnd() - .5) * .7); b.scale.y = .75; g.add(b); }
    g.scale.setScalar(s || 1); g.position.set(x, HT(x, z) - .12 * (s || 1), z); S.add(g); return g; }
  // ---------- oliveira / acácia ----------
  function tree(S, x, z, h) { var g = new THREE.Group(), tm = new THREE.MeshStandardMaterial({ color: 0x6a4a32, roughness: .95 }), lm = new THREE.MeshStandardMaterial({ color: 0x7a8a4a, roughness: .9 }), lm2 = new THREE.MeshStandardMaterial({ color: 0x5d6e38, roughness: .9 });
    var tr = B3.sh(new THREE.Mesh(new THREE.CylinderGeometry(.16, .32, h * .6, 8), tm)); tr.position.y = h * .3 - .2; tr.rotation.z = (rnd() - .5) * .25; g.add(tr);
    for (var k = 0; k < 3; k++) { var br = B3.sh(new THREE.Mesh(new THREE.CylinderGeometry(.06, .12, h * .4, 6), tm)); var a = k * 2.1 + rnd(); br.position.set(Math.cos(a) * .35, h * .62, Math.sin(a) * .35); br.rotation.set(Math.sin(a) * .7, 0, -Math.cos(a) * .7); g.add(br); }
    for (var k = 0; k < 7; k++) { var c = B3.sh(new THREE.Mesh(new THREE.IcosahedronGeometry(.8 + rnd() * .4, 1), k % 2 ? lm : lm2)); var a = rnd() * 6.28, r = rnd() * 1.1; c.position.set(Math.cos(a) * r, h * .78 + rnd() * .5, Math.sin(a) * r); c.scale.set(1.2, .55, 1.2); g.add(c); }
    g.position.set(x, HT(x, z) - .15, z); S.add(g); return g; }
  // ---------- casa de barro com fundação enterrada ----------
  var plM;
  function house(S, x, z, w, d, h, ry) { plM = plM || new THREE.MeshStandardMaterial({ map: T.plaster(), roughness: .95 });
    var lo = minUnder(x, z, w * 1.2, d * 1.2), hi = maxUnder(x, z, w * 1.2, d * 1.2), g = new THREE.Group(), tot = h + (hi - lo) + .3;
    var m = plM.clone(); m.map = plM.map.clone(); m.map.repeat.set(w / 2.5, tot / 2.5); m.map.needsUpdate = true;
    var b = B3.sh(new THREE.Mesh(new THREE.BoxGeometry(w, tot, d), m)); b.position.y = tot / 2; g.add(b);
    var pm = new THREE.MeshStandardMaterial({ color: 0xc9a57a, roughness: .95 }), top = tot;
    [[0, d / 2 - .06, w, .12], [0, -d / 2 + .06, w, .12], [w / 2 - .06, 0, .12, d], [-w / 2 + .06, 0, .12, d]].forEach(function (q) { var p = B3.sh(new THREE.Mesh(new THREE.BoxGeometry(q[2], .35, q[3]), pm)); p.position.set(q[0], top + .17, q[1]); g.add(p); });
    var dk = new THREE.MeshStandardMaterial({ color: 0x2a1a10, roughness: 1 }), wood = new THREE.MeshStandardMaterial({ map: T.wood(), roughness: .9 });
    var door = new THREE.Mesh(new THREE.BoxGeometry(.85, 1.55, .06), dk); door.position.set(-w * .2, (hi - lo) + .3 + .775, d / 2 + .01); g.add(door);
    var lintel = B3.sh(new THREE.Mesh(new THREE.BoxGeometry(1.15, .14, .14), wood)); lintel.position.set(-w * .2, (hi - lo) + .3 + 1.62, d / 2 + .05); g.add(lintel);
    var win = new THREE.Mesh(new THREE.BoxGeometry(.45, .45, .05), new THREE.MeshStandardMaterial({ color: 0x2a1a10, emissive: 0xff9a40, emissiveIntensity: .35 })); win.position.set(w * .25, (hi - lo) + .3 + h * .62, d / 2 + .01); g.add(win);
    for (var i = 0; i < 4; i++) { var bm = B3.sh(new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, .5, 6), wood)); bm.rotation.x = PI / 2; bm.position.set(-w / 2 + .4 + i * (w - .8) / 3, top - .2, d / 2 + .2); g.add(bm); }
    g.position.set(x, lo - .3, z); g.rotation.y = ry || 0; S.add(g);
    // jarros apoiados no chão na frente da casa
    for (var i = 0; i < 2; i++) { var jx = x + Math.cos(ry || 0) * (w / 2 - .4 - i * .45), jz = z + d / 2 + .45; jar(S, jx, jz, .32 + i * .05); }
    return g; }
  // ---------- jarro de barro (torno) ----------
  var jarM;
  function jarGeo() { var pts = [[0, 0], [.18, 0], [.28, .1], [.34, .3], [.3, .5], [.18, .62], [.14, .7], [.18, .76], [0, .76]].map(function (q) { return new THREE.Vector2(q[0], q[1]); }); return new THREE.LatheGeometry(pts, 20); }
  function jar(S, x, z, s, yy) { jarM = jarM || new THREE.MeshStandardMaterial({ color: 0xb5734a, roughness: .8 }); var j = B3.sh(new THREE.Mesh(jarGeo(), jarM)); j.scale.setScalar(s / .76 * 1.0); j.position.set(x, yy == null ? HT(x, z) - .03 : yy, z); S.add(j); return j; }
  // ---------- cálice e castiçal de bronze (torno) ----------
  var brass;
  function cup(S, x, yy, z, s) { brass = brass || new THREE.MeshStandardMaterial({ color: 0xc89a48, metalness: .85, roughness: .32 });
    var pts = [[0, 0], [.32, 0], [.33, .04], [.12, .1], [.06, .2], [.05, .45], [.1, .52], [.28, .62], [.36, .85], [.37, 1.0], [.34, 1.0], [.32, .86], [.24, .66], [0, .6]].map(function (q) { return new THREE.Vector2(q[0], q[1]); });
    var c = B3.sh(new THREE.Mesh(new THREE.LatheGeometry(pts, 32), brass)); c.scale.setScalar(s); c.position.set(x, yy, z); S.add(c);
    var wine = new THREE.Mesh(new THREE.CircleGeometry(.33, 24), new THREE.MeshStandardMaterial({ color: 0x5a0c18, roughness: .2 })); wine.rotation.x = -PI / 2; wine.position.y = .92; c.add(wine); return c; }
  function candle(S, x, yy, z, s, list) { brass = brass || new THREE.MeshStandardMaterial({ color: 0xc89a48, metalness: .85, roughness: .32 });
    var pts = [[0, 0], [.22, 0], [.22, .04], [.08, .08], [.05, .5], [.12, .55], [.12, .6], [0, .6]].map(function (q) { return new THREE.Vector2(q[0], q[1]); });
    var g = new THREE.Group(); g.add(B3.sh(new THREE.Mesh(new THREE.LatheGeometry(pts, 24), brass)));
    var cd = B3.sh(new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, .45, 12), new THREE.MeshStandardMaterial({ color: 0xfff4e2, roughness: .6 }))); cd.position.y = .6 + .225; g.add(cd);
    var fl = new THREE.Mesh(new THREE.SphereGeometry(.05, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffd27a })); fl.scale.set(1, 2, 1); fl.position.y = 1.13; g.add(fl);
    var pl = new THREE.PointLight(0xffa850, 1.2, 6, 2); pl.position.y = 1.25; g.add(pl);
    g.scale.setScalar(s); g.position.set(x, yy, z); S.add(g); if (list) list.push(fl); return g; }
  return { ground: ground, y: y, minUnder: minUnder, maxUnder: maxUnder, T: T, sky: sky, rock: rock, bush: bush, tree: tree, house: house, jar: jar, cup: cup, candle: candle, canvasTex: canvasTex };
})();
