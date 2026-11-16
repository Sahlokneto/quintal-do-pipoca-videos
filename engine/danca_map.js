// ===== mapa: quintal =====
var MX=13,MZ=13;
var floor=box(MX*2+1,0.3,MZ*2+1,0x49b85f);floor.position.set(0,-0.15,0);scene.add(floor);
(function(){var nx=MX*4,nz=MZ*4,im=new THREE.InstancedMesh(studG,mat(0x49b85f),nx*nz),d=new THREE.Object3D(),k=0;
 for(var i=0;i<nx;i++)for(var j=0;j<nz;j++){d.position.set(-MX+0.25+i*0.5,0.05,-MZ+0.25+j*0.5);d.updateMatrix();im.setMatrixAt(k++,d.matrix);}
 im.castShadow=false;im.receiveShadow=true;scene.add(im);})();
// pátio de terra + caminho
(function(){var p=box(9,0.05,9,0xd9b77a);p.position.set(0,0.025,0);p.castShadow=false;scene.add(p);
 var q=box(2.6,0.05,6,0xd9b77a);q.position.set(0,0.025,-7);q.castShadow=false;scene.add(q);
 var nx=18,nz=18,im=new THREE.InstancedMesh(studG,mat(0xd9b77a),nx*nz),d=new THREE.Object3D(),k=0;
 for(var i=0;i<nx;i++)for(var j=0;j<nz;j++){d.position.set(-4.25+i*0.5,0.09,-4.25+j*0.5);d.updateMatrix();im.setMatrixAt(k++,d.matrix);}
 im.receiveShadow=true;scene.add(im);})();
// cerca
(function(){for(var i=0;i<26;i++){var x=-MX+0.5+i*1.0;[-MZ+0.3,MZ-0.3].forEach(function(z){var p=box(0.7,1.2,0.2,(i%2)?0xffffff:0xffe08a);p.position.set(x,0.6,z);scene.add(p);});}
 for(var j=0;j<26;j++){var z=-MZ+0.5+j*1.0;[-MX+0.3,MX-0.3].forEach(function(x){var p=box(0.2,1.2,0.7,(j%2)?0xffffff:0xffe08a);p.position.set(x,0.6,z);scene.add(p);});}})();
function makeTree(x,z,s){var g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(s);scene.add(g);
 var tr=box(0.9,2.0,0.8,0x8b5a2b);tr.position.y=1.0;g.add(tr);
 var c1=box(2.8,0.8,2.6,0x2f9e5b);c1.position.y=2.4;g.add(c1);var c2=box(2.3,0.8,2.1,0x3fb56c);c2.position.y=3.2;g.add(c2);var c3=box(1.5,0.7,1.4,0x2f9e5b);c3.position.y=3.9;g.add(c3);
 var st=new THREE.Group();st.position.set(0,4.25,0);studs(st,3,3,0,0x2f9e5b);g.add(st);
 [[-0.9,2.5,1.32],[0.7,3.1,1.07],[0.2,2.2,1.32]].forEach(function(a){var ap=box(0.25,0.25,0.1,0xe0484f);ap.position.set(a[0],a[1],a[2]);g.add(ap);});return g;}
makeTree(8.5,-8.5,1.25);makeTree(-8.5,-9,1.1);makeTree(-9.5,8.5,1.0);
// arbusto com flores
(function(){var g=new THREE.Group();g.position.set(8.5,6.5,0);g.position.set(8.5,0,6.5);scene.add(g);
 var a=box(3.0,0.7,1.3,0x2f9e5b);a.position.y=0.35;g.add(a);var b=box(2.5,0.6,1.15,0x3fb56c);b.position.y=1.0;g.add(b);var c=box(1.7,0.5,1.0,0x2f9e5b);c.position.y=1.55;g.add(c);
 [[-1,0.6],[0.2,1.2],[1.0,0.7],[-0.3,1.7],[0.7,1.5]].forEach(function(f,i){var fl=box(0.22,0.22,0.12,[0xff5d8f,0xffd23f,0xffffff][i%3]);fl.position.set(f[0],f[1],0.62);g.add(fl);});})();
// casinha ao fundo
(function(){var h=new THREE.Group();h.position.set(0,0,-10.6);scene.add(h);
 for(var r=0;r<5;r++){var w=box(5.0,0.5,2.6,r%2?0xf4f1e8:0xe6e0cf);w.position.y=0.25+r*0.5;h.add(w);}
 var roof=box(5.6,0.4,3.2,0xe0484f);roof.position.y=2.7;h.add(roof);var roof2=box(4.2,0.4,2.4,0xc23a42);roof2.position.y=3.1;h.add(roof2);
 var rs=new THREE.Group();rs.position.set(0,3.3,0);studs(rs,7,4,0,0xc23a42);h.add(rs);
 var door=box(1.0,1.6,0.06,0x4a5bd1);door.position.set(0,0.8,1.32);h.add(door);
 [-1.6,1.6].forEach(function(x){var win=box(0.9,0.8,0.06,0xa9d4f0);win.position.set(x,1.5,1.32);h.add(win);});})();
// mesinha de festa (oeste)
(function(){var g=new THREE.Group();g.position.set(-6.2,0,3.2);scene.add(g);
 var top=box(2.0,0.15,1.3,0xffffff);top.position.y=0.9;g.add(top);var cl=box(2.1,0.06,1.4,0xff8fb0);cl.position.y=0.99;g.add(cl);
 [[-0.85,-0.5],[0.85,-0.5],[-0.85,0.5],[0.85,0.5]].forEach(function(p){var l=box(0.14,0.85,0.14,0x8b5a2b);l.position.set(p[0],0.42,p[1]);g.add(l);});
 [[-0.6,0xff9f1c],[-0.2,0x7aa7ff],[0.2,0xff5d8f],[0.6,0x5bd6a4]].forEach(function(c,i){var cup=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.09,0.26,12),mat(c[1]));cup.position.set(c[0],1.15,0.3);cup.castShadow=true;g.add(cup);});
 var cake=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.32,0.26,18),mat(0xffe9c9));cake.position.set(0,1.15,-0.25);cake.castShadow=true;g.add(cake);
 var ic=new THREE.Mesh(new THREE.CylinderGeometry(0.33,0.33,0.07,18),mat(0xff7aa8));ic.position.set(0,1.31,-0.25);g.add(ic);
 var ch=box(0.1,0.1,0.1,0xe0484f);ch.position.set(0,1.4,-0.25);g.add(ch);})();
// varal com roupinhas (oeste, perto da cerca)
var CLOTHES=[];
(function(){[-5.5,-0.5].forEach(function(z){var p=box(0.2,2.6,0.2,0x8b5a2b);p.position.set(-10.6,1.3,z);scene.add(p);});
 var line=box(0.05,0.05,5.0,0x444444);line.position.set(-10.6,2.5,-3.0);line.castShadow=false;scene.add(line);
 [[-4.8,0xff6fa3],[-3.8,0x7aa7ff],[-2.8,0xffd23f],[-1.8,0x5bd6a4],[-1.0,0xffffff]].forEach(function(c,i){var piv=new THREE.Group();piv.position.set(-10.6,2.5,c[0]);scene.add(piv);
  var sh=box(0.08,0.75,0.6,c[1]);sh.position.y=-0.42;piv.add(sh);CLOTHES.push(piv);});})();
// bola listrada
(function(){var b=new THREE.Mesh(new THREE.SphereGeometry(0.45,20,14),mat(0xff5d5d));b.position.set(7.5,0.5,9.5);b.castShadow=true;scene.add(b);
 var s=new THREE.Mesh(new THREE.TorusGeometry(0.45,0.07,8,24),mat(0xffffff));s.position.copy(b.position);s.rotation.x=1.2;scene.add(s);})();
// nuvens
[[-10,15,-24],[9,17,-26],[0,13,-22]].forEach(function(c){for(var i=0;i<3;i++){var b=box(4.4-i*0.7,1.2,1.8,0xffffff);b.position.set(c[0]+i*1.6-1.6,c[1]+(i==1?0.8:0),c[2]);b.castShadow=false;scene.add(b);}});
// cadeiras
function makeChair(c){var g=new THREE.Group();scene.add(g);
 var seat=box(0.95,0.14,0.95,c);seat.position.y=0.55;g.add(seat);
 [[-0.38,-0.38],[0.38,-0.38],[-0.38,0.38],[0.38,0.38]].forEach(function(p){var l=box(0.14,0.48,0.14,0x6b4a2f);l.position.set(p[0],0.24,p[1]);g.add(l);});
 var bk=box(0.95,0.85,0.14,c);bk.position.set(0,1.04,-0.4);g.add(bk);
 var st=new THREE.Group();st.position.set(0,1.46,-0.4);studs(st,2,1,0,c,0,0,0.45);g.add(st);
 var ss=new THREE.Group();ss.position.set(0,0.62,0.05);g.add(ss);return g;}
// rádio
var radio=new THREE.Group();radio.position.set(0,0,-5.2);scene.add(radio);
var radioLight;
(function(){var st=box(0.8,0.45,0.7,0x8b5a2b);st.position.y=0.225;radio.add(st);
 var b=box(1.1,0.55,0.42,0x7d8794);b.position.y=0.73;radio.add(b);
 [-0.3,0.3].forEach(function(x){var sp=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.17,0.05,18),mat(0x2a2f36));sp.rotation.x=Math.PI/2;sp.position.set(x,0.72,0.22);radio.add(sp);});
 var b1=box(0.16,0.08,0.16,0xe0484f);b1.position.set(-0.3,1.04,0);radio.add(b1);var b2=box(0.16,0.08,0.16,0x34d399);b2.position.set(0.3,1.04,0);radio.add(b2);
 var an=box(0.04,0.9,0.04,0xcfd6dd);an.position.set(-0.45,1.4,-0.1);an.rotation.z=0.35;radio.add(an);
 radioLight=new THREE.Mesh(new THREE.BoxGeometry(0.14,0.1,0.05),new THREE.MeshBasicMaterial({color:0x333333}));radioLight.position.set(0,0.9,0.23);radio.add(radioLight);})();
// notinhas musicais
var NOTES=[];
(function(){function ntex(c){var cv=document.createElement('canvas');cv.width=cv.height=128;var x=cv.getContext('2d');x.fillStyle=c;x.strokeStyle=c;x.lineWidth=10;x.lineCap='round';
 x.beginPath();x.ellipse(46,96,22,16,-0.4,0,6.3);x.fill();x.beginPath();x.moveTo(64,92);x.lineTo(64,24);x.lineTo(100,36);x.stroke();
 var t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;return t;}
 ['#ff4f9a','#2f7de0','#ff9f1c','#34d399','#8f5fff','#e0484f'].forEach(function(c){var m=new THREE.Mesh(new THREE.PlaneGeometry(0.6,0.6),new THREE.MeshBasicMaterial({map:ntex(c),transparent:true,depthWrite:false}));m.visible=false;scene.add(m);NOTES.push(m);});})();
// cachorrinho Pipoca
function makeDog(){var root=new THREE.Group();root.rotation.order='YXZ';scene.add(root);var W=0xffffff,B=0x9a5b2e;
 var body=box(0.42,0.38,0.85,W);body.position.y=0.48;root.add(body);
 var sp1=box(0.44,0.2,0.3,B);sp1.position.set(0,0.59,-0.12);root.add(sp1);
 var head=new THREE.Group();head.position.set(0,0.78,0.42);root.add(head);
 var hb=box(0.42,0.38,0.4,W);head.add(hb);var sn=box(0.24,0.18,0.2,W);sn.position.set(0,-0.07,0.28);head.add(sn);
 var no=box(0.1,0.08,0.06,0x222222);no.position.set(0,-0.01,0.39);head.add(no);
 [-1,1].forEach(function(s){var e=box(0.07,0.09,0.03,0x222222);e.position.set(s*0.11,0.06,0.205);head.add(e);var ear=box(0.1,0.3,0.2,B);ear.position.set(s*0.25,0.02,-0.05);ear.rotation.z=s*0.15;head.add(ear);});
 var eyeSpot=box(0.2,0.2,0.03,B);eyeSpot.position.set(0.11,0.07,0.2);head.add(eyeSpot);
 var tg=box(0.08,0.02,0.1,0xff6b8e);tg.position.set(0,-0.17,0.3);head.add(tg);
 var col_=box(0.46,0.07,0.3,0xe0484f);col_.position.set(0,0.62,0.3);root.add(col_);
 var legs=[];[[-0.14,0.3],[0.14,0.3],[-0.14,-0.3],[0.14,-0.3]].forEach(function(p){var g=new THREE.Group();g.position.set(p[0],0.32,p[1]);var l=box(0.12,0.32,0.12,W);l.position.y=-0.16;g.add(l);root.add(g);legs.push(g);});
 var tail=new THREE.Group();tail.position.set(0,0.62,-0.42);root.add(tail);var tb=box(0.09,0.09,0.36,B);tb.position.set(0,0.12,-0.14);tb.rotation.x=0.9;tail.add(tb);
 return {root:root,head:head,legs:legs,tail:tail};}
