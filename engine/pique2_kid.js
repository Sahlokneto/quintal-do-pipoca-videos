// bolhas de texto
function bubTex(txt,size,bg){var c=document.createElement('canvas');c.width=512;c.height=256;var x=c.getContext('2d');
 x.fillStyle=bg||'#fff';x.strokeStyle='#2b2b3a';x.lineWidth=10;
 var r=44;x.beginPath();x.moveTo(40+r,20);x.lineTo(472-r,20);x.quadraticCurveTo(472,20,472,20+r);x.lineTo(472,170-r);x.quadraticCurveTo(472,170,472-r,170);
 x.lineTo(290,170);x.lineTo(256,236);x.lineTo(230,170);x.lineTo(40+r,170);x.quadraticCurveTo(40,170,40,170-r);x.lineTo(40,20+r);x.quadraticCurveTo(40,20,40+r,20);x.closePath();x.fill();x.stroke();
 x.fillStyle='#2b2b3a';x.font='800 '+(size||90)+'px system-ui, sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,256,98);
 var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;}
var BUBS={};['1','2','3','4','5','Lá vou eu!','Achei!','De novo!'].forEach(function(k){var m=new THREE.Mesh(new THREE.PlaneGeometry(1.8,0.9),new THREE.MeshBasicMaterial({map:bubTex(k,k.length>3?64:100),transparent:true}));m.visible=false;scene.add(m);BUBS[k]=m;});
// rostos
function faceTex(k){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d');x.lineCap='round';x.fillStyle='#222';x.strokeStyle='#222';
 function eyes(r){x.beginPath();x.ellipse(88,100,13,r||20,0,0,6.3);x.fill();x.beginPath();x.ellipse(168,100,13,r||20,0,0,6.3);x.fill();}
 function cheeks(){x.fillStyle='rgba(255,110,110,0.55)';x.beginPath();x.ellipse(62,150,16,10,0,0,6.3);x.fill();x.beginPath();x.ellipse(194,150,16,10,0,0,6.3);x.fill();x.fillStyle='#222';}
 if(k==='idle'){eyes();cheeks();x.lineWidth=9;x.beginPath();x.arc(128,140,34,0.2*Math.PI,0.8*Math.PI);x.stroke();}
 if(k==='search'){eyes(24);x.lineWidth=8;x.beginPath();x.moveTo(66,66);x.lineTo(108,60);x.moveTo(190,66);x.lineTo(148,60);x.stroke();x.beginPath();x.ellipse(128,172,14,12,0,0,6.3);x.fill();}
 if(k==='hide'){eyes(14);cheeks();x.lineWidth=9;x.beginPath();x.moveTo(104,170);x.lineTo(152,170);x.stroke();}
 if(k==='happy'){x.lineWidth=11;x.beginPath();x.arc(88,108,17,Math.PI*1.1,Math.PI*1.9);x.stroke();x.beginPath();x.arc(168,108,17,Math.PI*1.1,Math.PI*1.9);x.stroke();cheeks();x.fillStyle='#222';x.beginPath();x.arc(128,138,38,0,Math.PI);x.closePath();x.fill();x.fillStyle='#ff7a9a';x.beginPath();x.ellipse(128,170,18,12,0,0,Math.PI);x.fill();}
 var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;}
var FT={idle:faceTex('idle'),search:faceTex('search'),hide:faceTex('hide'),happy:faceTex('happy')};
// criança de peças
function makeKid(shirtC,hairC,pantsC){
 var root=new THREE.Group();scene.add(root);var inner=new THREE.Group();root.add(inner);
 var skin=0xffc247;
 var hips=box(1.1,0.2,0.6,pantsC);hips.position.y=1.3;inner.add(hips);
 function leg(s){var g=new THREE.Group();g.position.set(s*0.3,1.2,0);var l=box(0.46,1.0,0.5,pantsC);l.position.y=-0.5;g.add(l);var sh=box(0.5,0.2,0.75,0x2a323d);sh.position.set(0,-1.1,0.12);g.add(sh);inner.add(g);return g;}
 var legL=leg(-1),legR=leg(1);
 var torso=box(1.35,1.2,0.75,shirtC);torso.position.y=2.0;inner.add(torso);
 var sts=new THREE.Group();sts.position.set(0,2.6,0);studs(sts,3,1,0,shirtC);inner.add(sts);
 function arm(s){var g=new THREE.Group();g.position.set(s*0.88,2.5,0);var u=box(0.38,0.6,0.4,shirtC);u.position.y=-0.3;g.add(u);var e=new THREE.Group();e.position.y=-0.6;g.add(e);var l=box(0.34,0.55,0.36,shirtC);l.position.y=-0.28;e.add(l);var h=box(0.36,0.26,0.36,skin);h.position.y=-0.68;e.add(h);inner.add(g);return {s:g,e:e};}
 var aL=arm(-1),aR=arm(1);
 var neck=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,0.15,12),mat(skin));neck.position.y=2.65;inner.add(neck);
 var head=new THREE.Group();head.position.y=2.7;inner.add(head);
 var hb=box(0.95,0.8,0.9,skin);hb.position.y=0.4;head.add(hb);
 var hair=box(0.98,0.22,0.94,hairC);hair.position.y=0.86;head.add(hair);var bk=box(0.98,0.5,0.2,hairC);bk.position.set(0,0.55,-0.4);head.add(bk);
 var hs=new THREE.Group();hs.position.y=0.97;studs(hs,2,2,0,hairC);head.add(hs);
 var fp=new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.8),new THREE.MeshBasicMaterial({map:FT.idle,transparent:true}));fp.position.set(0,0.4,0.451);head.add(fp);
 return {root:root,inner:inner,legL:legL,legR:legR,aL:aL,aR:aR,head:head,fp:fp,face:'idle',scale:0.5};}
function setFace(k,f){if(k.face!==f){k.face=f;k.fp.material.map=FT[f];k.fp.material.needsUpdate=true;}}
