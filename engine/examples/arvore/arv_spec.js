// ===== Plantar uma Árvore =====
makeBubs([['Vamos plantar uma árvore!',46],['Ei! Tô cheia de terra!',46],['Valeu, Pipoca!',64],['Plantadinha!',80],['Cresce, arvorezinha!',48],
 ['Osso não vira árvore!',48],['Agora é só esperar!',50],['Virou uma árvore de verdade!',40],['Nasceu um pé de osso!',46],['Plantar é muito legal!',46]]);
radio.visible=false;
var PY=0.19,TS=[-0.3,-1.0],BH=[1.0,0.5];
var P0={leo:[-1.25,-0.85],teo:[-0.4,-2.45],bia:[0.95,-2.3],duda:[1.45,-0.2]};
var BIP=[0.15,-1.7],TEP=[-0.85,-1.75];
var FIN={teo:[-2.45,-1.0],leo:[-1.45,-1.0],bia:[0.85,-1.0],duda:[1.85,-1.0]},DF=[-0.3,0.35];
var T={ARR:3.0,DIG:4.6,DIGE:8.2,DOG:8.4,DD:9.8,DDE:11.8,PLANT:13.8,PL:15.0,WAT:17.2,WATE:20.0,FETCH:21.8,BACK:23.6,BD:24.2,BDE:25.4,DROPB:25.5,COVER:25.7,COVE:26.5,
 WAIT:31.6,LAPSE:31.8,LAPE:36.0,WOW:36.2,BONE:38.8,UP:43.6,ROW:45.6,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
function dogP(t){return dogState(t).p;}
var TREETOP=[TS[0],2.2,TS[1]];
function lookP(n,t){if(t>=T.DOG&&t<T.PLANT)return dogP(t);if(t>=T.FETCH&&t<T.WAIT-1.4)return dogP(t);if(t>=T.BONE&&t<T.UP)return BH;return TS;}
var LOOKUP=function(t){return t>=T.LAPSE&&t<T.BONE;};
// reações [t0,t1,pose,rosto,(só quem)]
var REACT=[[10.4,13.4,'laugh','tongue'],[T.PL+0.4,T.WAT,'clap','happy'],[T.WATE,21.6,'clap','happy'],[T.FETCH+0.1,T.BACK,'look','wow'],[28.8,30.2,'laugh','tongue'],
 [T.LAPSE,T.LAPE-0.4,'look','wow'],[T.LAPE-0.4,T.BONE,'cheer','happy'],[T.BONE+0.3,T.BONE+1.2,'look','wow'],[T.BONE+1.2,T.UP,'laugh','tongue']];
function watcher(n,t0,t1,p){return cust(t0,t1,function(t){var P=p||P0[n],y=yawTo(P,lookP(n,t));var s={p:P,yaw:y,pose:'stand',face:'happy'};
 for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1]&&(!r[4]||r[4]===n)){s.pose=r[2];s.face=r[3];break;}}
 if(n==='duda'&&t>=10.4&&t<13.4){s.pose='none';s.face='wow';s.A={aLx:-0.5,aRx:-0.5,aLz:-1.0,aRz:1.0,eL:-1.2,eR:-1.2};s.y=0.05*Math.abs(Math.sin(t*8));}
 if(LOOKUP(t)&&s.pose==='look'){s.A={hx:-0.4,aLx:-0.3,aRx:-0.3,eL:-0.6,eR:-0.6};s.pose='none';}
 return s;});}
var HOLDA={aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45};
var SHOVA={aLx:-0.9,aRx:-0.9,aLz:0.25,aRz:-0.25,eL:-0.6,eR:-0.6};
(function(){var st={leo:[-5,-0.5],teo:[-2.2,-6.2],bia:[2.2,-6.2],duda:[5,0.6]};
 function arrive(n,A){var P=P0[n];return [hold(0,0.2,st[n],yawTo(st[n],P),'stand'),mv(0.2,2.7,[st[n],P],A?'walk':'run',{face:'happy',A:A}),turnTo(2.7,T.ARR,P,yawTo(st[n],P),yawTo(P,TS),'stand',{face:'happy',A:A})];}
 // LÉO: cava
 TL.leo=arrive('leo',SHOVA).concat([hold(T.ARR,T.DIG,P0.leo,yawTo(P0.leo,TS),'none',{face:'happy',A:SHOVA}),
  cust(T.DIG,T.DIGE,function(t){var k=((t-T.DIG)/1.2)%1,a=Math.sin(PI*k);return {p:P0.leo,yaw:yawTo(P0.leo,TS),pose:'none',face:'focus',pitch:0.3*a,A:{aLx:-0.6-0.6*a,aRx:-0.6-0.6*a,aLz:0.25,aRz:-0.25,eL:-0.5,eR:-0.5}};}),
  cust(T.DIGE,T.DOG+0.6,function(t){return {p:P0.leo,yaw:yawTo(P0.leo,TS),pose:'none',face:'happy',A:SHOVA,y:0.02*Math.abs(Math.sin(t*3))};}),
  cust(T.DOG+0.6,T.PLANT,function(t){var y=yawTo(P0.leo,dogP(t));return {p:P0.leo,yaw:y,pose:t>10.4&&t<12.2?'laugh':'none',face:t>10.4&&t<12.2?'tongue':'wow',A:t>10.4&&t<12.2?null:SHOVA};}),
  watcher('leo',T.PLANT,T.UP)]);
 // BIA: mudinha
 TL.bia=arrive('bia',HOLDA).concat([cust(T.ARR,T.PLANT,function(t){var y=yawTo(P0.bia,lookP('bia',t));var lg=t>10.4&&t<13.4;return {p:P0.bia,yaw:y,pose:lg?'laugh':'none',face:lg?'tongue':(t>T.DOG&&t<T.DD?'wow':'happy'),A:lg?null:HOLDA};}),
  mv(T.PLANT,T.PLANT+0.8,[P0.bia,BIP],'walk',{face:'happy',A:HOLDA}),turnTo(T.PLANT+0.8,T.PLANT+1.0,BIP,yawTo(P0.bia,BIP),yawTo(BIP,TS),'none',{face:'happy',A:HOLDA}),
  cust(T.PLANT+1.0,T.PL+0.5,function(t,u){var a=Math.sin(PI*u);return {p:BIP,yaw:yawTo(BIP,TS),pose:'none',face:'focus',pitch:0.45*a,A:{aLx:-1.25+0.35*a,aRx:-1.25+0.35*a,aLz:0.32,aRz:-0.32,eL:-0.3,eR:-0.3}};}),
  hold(T.PL+0.5,T.PL+1.2,BIP,yawTo(BIP,TS),'clap',{face:'happy'}),mv(T.PL+1.2,T.WAT,[BIP,P0.bia],'walk',{face:'happy'}),
  turnTo(T.WAT,T.WAT+0.3,P0.bia,PI,yawTo(P0.bia,TS),'stand',{face:'happy'}),watcher('bia',T.WAT+0.3,T.UP)]);
 // TEO: regador
 TL.teo=arrive('teo',HOLDA).concat([cust(T.ARR,T.WAT-0.8,function(t){var y=yawTo(P0.teo,lookP('teo',t));var lg=t>10.4&&t<13.4;return {p:P0.teo,yaw:y,pose:lg?'laugh':'none',face:lg?'tongue':'happy',A:lg?null:HOLDA};}),
  mv(T.WAT-0.8,T.WAT,[P0.teo,TEP],'walk',{face:'happy',A:HOLDA}),
  cust(T.WAT,T.WATE+0.3,function(t){var u=S(t,T.WAT,T.WAT+0.4)*(1-S(t,T.WATE,T.WATE+0.3));return {p:TEP,yaw:yawTo(TEP,TS),pose:'none',face:'focus',A:{aLx:-1.25-0.5*u,aRx:-1.25-0.5*u,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45}};}),
  cust(T.WATE+0.3,T.FETCH+0.4,function(t){return {p:TEP,yaw:yawTo(TEP,TS),pose:'none',face:'happy',A:HOLDA};}),
  mv(T.FETCH+0.4,T.FETCH+1.2,[TEP,P0.teo],'walk',{face:'happy',A:HOLDA}),turnTo(T.FETCH+1.2,T.FETCH+1.5,P0.teo,PI,yawTo(P0.teo,TS),'none',{face:'happy',A:HOLDA}),
  cust(T.FETCH+1.5,T.UP,function(t){var w=watcher('teo',0,1).f(t,0);if(w.pose==='stand'||w.pose==='look'&&!w.A)w.A=HOLDA,w.pose='none';return w;})]);
 // DUDA
 TL.duda=arrive('duda',null).concat([watcher('duda',T.ARR,T.UP)]);
 Object.keys(KIDS).forEach(function(n){var P=n==='bia'?P0.bia:n==='teo'?P0.teo:P0[n],F=FIN[n];
  var via=n==='teo'?[[-2.1,-2.3]]:[];
  TL[n].push(mv(T.UP,T.ROW-0.4,[P].concat(via,[F]),'walk',{face:'happy',A:(n==='teo'||n==='leo')?{aLx:-0.6,aRx:-0.6}:null}),turnTo(T.ROW-0.4,T.ROW,F,PI,0,'stand',{face:'happy'}),
   cust(T.ROW,T.WAVE,function(t){var b=t*BPM/60;return {p:F,yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:F,yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var DS0=[4.6,3.2],DDP=[0.42,-1.05],FAR=[4.2,-3.4],BDP=[1.55,0.5];
DG=[hold(0,T.DOG,DS0,-2.2,'stand'),mv(T.DOG,T.DD-0.2,[DS0,[2.2,0.9],[1.5,-1.2],DDP],'drun',{tailF:34}),turnTo(T.DD-0.2,T.DD,DDP,yawTo([1.5,-1.2],DDP),-PI/2,'stand'),
 cust(T.DD,T.DDE,function(t){var k=Math.sin(t*30);return {p:DDP,yaw:-PI/2,pose:'none',pitch:0.18,hx:0.35,legs:[-0.9*Math.max(0,k),-0.9*Math.max(0,-k),0.2*k,-0.2*k],y:0.02*Math.abs(k),tailF:34,tailA:1.2};}),
 turnTo(T.DDE,T.DDE+0.4,DDP,-PI/2,0.3,'sit'),cust(T.DDE+0.4,T.FETCH,function(t){return {p:DDP,yaw:0.3,pose:t<13.4?'party':'sit',tailF:30};}),
 mv(T.FETCH,22.8,[DDP,[2.0,-1.6],FAR],'drun'),hold(22.8,23.0,FAR,PI,'stand'),
 mv(23.0,T.BACK,[FAR,[2.6,-0.6],BDP],'drun',{tailF:34}),turnTo(T.BACK,T.BD,BDP,yawTo([2.6,-0.6],BDP),-PI/2,'stand'),
 cust(T.BD,T.BDE,function(t){var k=Math.sin(t*30);return {p:BDP,yaw:-PI/2,pose:'none',pitch:0.18,hx:0.35,legs:[-0.9*Math.max(0,k),-0.9*Math.max(0,-k),0.2*k,-0.2*k],tailF:34,tailA:1.2};}),
 cust(T.BDE,T.COVER,function(t,u){return {p:BDP,yaw:-PI/2,pose:'stand',hx:0.5*Math.sin(PI*u)};}),
 cust(T.COVER,T.COVE,function(t){return {p:BDP,yaw:-PI/2,pose:'paw',pw:Math.abs(Math.sin((t-T.COVER)*9))};}),
 turnTo(T.COVE,T.COVE+0.4,BDP,-PI/2,-0.2,'sit'),cust(T.COVE+0.4,T.BONE,function(t){return {p:BDP,yaw:-0.2,pose:'sit',tailF:30,hz:t>T.LAPSE&&t<T.LAPE?0.25*Math.sin(t*2):0};}),
 cust(T.BONE,T.UP,function(t){return {p:BDP,yaw:t<T.BONE+0.5?-0.2:-0.6,pose:t<T.BONE+0.5?'sit':'party'};}),
 mv(T.UP,44.8,[BDP,[1.3,1.25],[0.0,1.2],DF],'dwalk'),turnTo(44.8,T.ROW,DF,PI,0,'stand'),hold(T.ROW,END+2,DF,0,'party')];
// ----- objetos -----
(function(){var b=box(3.0,0.1,3.2,0x8a5a32);b.position.set(0,0.14,-0.7);b.castShadow=false;scene.add(b);
 [[0,-2.35,3.2,0.16],[0,0.95,3.2,0.16]].forEach(function(e){var w=box(e[2],0.22,e[3],0xb07a45);w.position.set(e[0],0.12,e[1]);scene.add(w);});
 [[-1.56,-0.7],[1.56,-0.7]].forEach(function(e){var w=box(0.16,0.22,3.2,0xb07a45);w.position.set(e[0],0.12,e[1]);scene.add(w);});})();
var HOLE=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.4,0.02,18),mat(0x4a2c16));HOLE.position.set(TS[0],PY+0.005,TS[1]);scene.add(HOLE);
var MOUND=new THREE.Mesh(new THREE.SphereGeometry(0.4,16,8,0,2*PI,0,PI/2),mat(0x6e4425));MOUND.scale.y=0.35;MOUND.position.set(TS[0],PY,TS[1]);scene.add(MOUND);
var HOLE2=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,0.02,14),mat(0x4a2c16));HOLE2.position.set(BH[0],0.155,BH[1]);scene.add(HOLE2);
var MOUND2=new THREE.Mesh(new THREE.SphereGeometry(0.26,14,8,0,2*PI,0,PI/2),mat(0x6e4425));MOUND2.scale.y=0.35;MOUND2.position.set(BH[0],0.14,BH[1]);scene.add(MOUND2);
// pá
var SHOVEL=new THREE.Group();SHOVEL.rotation.order='YXZ';scene.add(SHOVEL);(function(){var h=box(0.07,1.1,0.07,0x9b6a3c);h.position.y=-0.45;SHOVEL.add(h);var g=box(0.3,0.07,0.07,0x9b6a3c);g.position.y=0.1;SHOVEL.add(g);
 var bl=box(0.32,0.38,0.05,0x9aa3ad);bl.position.y=-1.15;SHOVEL.add(bl);})();
// regador
var CAN=new THREE.Group();CAN.rotation.order='YXZ';scene.add(CAN);(function(){var b=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.22,0.34,14),mat(0x34a0e0));CAN.add(b);
 var s=box(0.06,0.06,0.5,0x34a0e0);s.position.set(0,0.08,0.38);s.rotation.x=-0.5;CAN.add(s);var r=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.04,0.06,10),mat(0x2a7fb5));r.rotation.x=PI/2-0.5;r.position.set(0,0.2,0.62);CAN.add(r);CAN.spout=r;
 var hd=new THREE.Mesh(new THREE.TorusGeometry(0.13,0.025,6,14,PI),mat(0x2a7fb5));hd.position.y=0.17;hd.rotation.y=PI/2;CAN.add(hd);})();
// mudinha
var SEED=new THREE.Group();scene.add(SEED);(function(){var rb=box(0.26,0.2,0.26,0x6e4425);rb.position.y=0.1;SEED.add(rb);var st=box(0.05,0.36,0.05,0x3f9e45);st.position.y=0.38;SEED.add(st);
 [-1,1].forEach(function(s){var l=box(0.2,0.03,0.11,0x5cc15c);l.position.set(s*0.12,0.5,0);l.rotation.z=s*0.4;SEED.add(l);});var tl=box(0.12,0.03,0.12,0x5cc15c);tl.position.y=0.58;SEED.add(tl);})();
// árvore
var TREE=new THREE.Group();TREE.position.set(TS[0],PY,TS[1]);scene.add(TREE);var TRUNK=new THREE.Group();TREE.add(TRUNK);
(function(){var t=box(0.34,1.0,0.34,0x8b5a2b);t.position.y=0.5;TRUNK.add(t);})();
var CROWN=new THREE.Group();CROWN.position.y=1.9;TREE.add(CROWN);var ORANGES=[];
(function(){[[0,0,0,1.5,0.9,1.3],[-0.35,0.45,0.1,1.0,0.7,0.95],[0.35,0.5,-0.1,0.95,0.7,0.95],[0,0.85,0,0.75,0.5,0.75]].forEach(function(c){var b=box(c[3],c[4],c[5],0x3fae54);b.position.set(c[0],c[1],c[2]);CROWN.add(b);});
 [[0.55,0.1,0.55],[-0.6,0.2,0.4],[0.2,-0.3,0.66],[-0.2,0.55,0.5],[0.66,0.45,0.1],[-0.7,-0.2,-0.2],[0.3,0.95,0.3]].forEach(function(p){var o=new THREE.Mesh(new THREE.SphereGeometry(0.12,12,10),mat(0xff9a1f));o.position.set(p[0],p[1],p[2]);CROWN.add(o);ORANGES.push(o);});})();
// osso
var BONE=new THREE.Group();scene.add(BONE);(function(){var b=box(0.34,0.08,0.08,0xf4ecd8);BONE.add(b);[[-0.18,-0.06],[-0.18,0.06],[0.18,-0.06],[0.18,0.06]].forEach(function(q){var s=new THREE.Mesh(new THREE.SphereGeometry(0.065,10,8),mat(0xf4ecd8));s.position.set(q[0],0,q[1]);BONE.add(s);});})();
var BPLANT=new THREE.Group();BPLANT.position.set(BH[0],0.14,BH[1]);scene.add(BPLANT);(function(){var st=box(0.06,0.6,0.06,0x3f9e45);st.position.y=0.3;BPLANT.add(st);
 [-1,1].forEach(function(s){var l=box(0.24,0.03,0.12,0x5cc15c);l.position.set(s*0.14,0.3,0);l.rotation.z=s*0.4;BPLANT.add(l);});
 var bn=new THREE.Group();bn.position.y=0.72;BPLANT.add(bn);var b=box(0.42,0.1,0.1,0xf4ecd8);bn.add(b);[[-0.22,-0.07],[-0.22,0.07],[0.22,-0.07],[0.22,0.07]].forEach(function(q){var s=new THREE.Mesh(new THREE.SphereGeometry(0.08,10,8),mat(0xf4ecd8));s.position.set(q[0],0,q[1]);bn.add(s);});bn.rotation.x=0.3;})();
// terra na Duda
var SPOTS=[];(function(){var k=KIDS.duda;[[0.25,0.5,0.47,'h'],[-0.3,0.2,0.47,'h'],[0.05,0.75,0.4,'h'],[0.3,2.1,0.39,'i'],[-0.35,1.8,0.39,'i'],[0.1,1.6,0.39,'i'],[-0.1,2.3,0.39,'i']].forEach(function(p){var s=box(0.16,0.14,0.04,0x6e4425);s.position.set(p[0],p[1],p[2]);(p[3]==='h'?k.head:k.inner).add(s);s.visible=false;SPOTS.push(s);});})();
// partículas
var PS=[];(function(){var m=mat(0x6e4425);for(var i=0;i<60;i++){var s=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.09,0.09),m);s.visible=false;scene.add(s);PS.push(s);}})();
var WD=[];(function(){var m=new THREE.MeshStandardMaterial({color:col(0x5cc1ff),roughness:0.2,transparent:true,opacity:0.85});for(var i=0;i<30;i++){var s=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.09,0.06),m);s.visible=false;scene.add(s);WD.push(s);}})();
function mouth(){return dog.head.localToWorld(V(0,-0.1,0.42));}
function pop(t,t0,d){return t<t0?0.001:Math.max(0.001,back((t-t0)/(d||0.35)));}
var SKY=[[0,0xbfe6ff,1.0],[0.25,0xffb07a,0.7],[0.5,0x1d2a5a,0.25],[0.75,0xffc9a0,0.6],[1,0xbfe6ff,1.0]];
var _c1=new THREE.Color(),_c2=new THREE.Color();
function grow(t){return clamp((t-T.LAPSE)/(T.LAPE-T.LAPSE),0,1);}
EXTRA=function(t){dog.root.visible=t>=T.DOG-0.2;
 // céu (passagem do tempo)
 var u=grow(t);var i=0;while(i<SKY.length-2&&u>SKY[i+1][0])i++;var a=SKY[i],b=SKY[i+1],w=clamp((u-a[0])/(b[0]-a[0]),0,1);
 _c1.copy(col(a[1]));_c2.copy(col(b[1]));_c1.lerp(_c2,w);scene.background.copy(_c1);scene.fog.color.copy(_c1);sun.intensity=lerp(a[2],b[2],w);
 // buraco
 var dg=Math.max(lin(t,T.DIG,T.DIGE)*0.55,t>T.DD?0.55+0.45*lin(t,T.DD,T.DDE):0);HOLE.visible=t>T.DIG+0.3&&t<T.PL+0.3;HOLE.scale.set(Math.max(0.2,dg),1,Math.max(0.2,dg));
 MOUND.visible=t>=T.PL+0.3;MOUND.scale.set(1,0.35*pop(t,T.PL+0.3),1);
 HOLE2.visible=t>T.BD+0.2&&t<T.COVER+0.3;HOLE2.scale.set(lin(t,T.BD,T.BDE)+0.1,1,lin(t,T.BD,T.BDE)+0.1);MOUND2.visible=t>=T.COVER+0.3;
 // pá
 SHOVEL.visible=t<T.UP;var hl=hands('leo');SHOVEL.position.copy(hl);SHOVEL.rotation.y=KIDS.leo.root.rotation.y;
 var dig=t>T.DIG&&t<T.DIGE?Math.sin(PI*(((t-T.DIG)/1.2)%1)):0;SHOVEL.rotation.x=-0.35-0.5*dig+(KIDS.leo.root.rotation.x||0);
 // regador
 CAN.visible=t<T.UP;var ht=hands('teo');CAN.position.copy(ht);CAN.position.y-=0.12;CAN.rotation.y=KIDS.teo.root.rotation.y;var tilt=S(t,T.WAT,T.WAT+0.4)*(1-S(t,T.WATE,T.WATE+0.3));CAN.rotation.x=0.75*tilt;
 // mudinha
 var hb=hands('bia');if(t<T.PL-0.3){SEED.position.copy(hb);SEED.position.y-=0.15;}else{var g=V(TS[0],PY-0.15,TS[1]);SEED.position.copy(hb.clone().setY(hb.y-0.15).lerp(g,S(t,T.PL-0.3,T.PL)));}
 var sg=1+0.5*S(t,T.WAT+0.8,T.WATE);SEED.scale.setScalar(sg);SEED.visible=t<T.LAPSE+0.8;
 // árvore
 var gt=clamp((u-0.15)/0.85,0,1);TREE.visible=t>T.LAPSE+0.5;var tr=Math.max(0.001,Math.min(1,gt*1.6));TRUNK.scale.set(0.6+0.4*tr,Math.max(0.001,tr*1.9),0.6+0.4*tr);
 var cg=Math.max(0.001,clamp((gt-0.35)/0.65,0,1));CROWN.scale.setScalar(Math.max(0.001,back(cg)));CROWN.position.y=tr*1.9;
 ORANGES.forEach(function(o,k){o.scale.setScalar(pop(t,T.LAPE-0.2+k*0.12,0.3));});TREE.rotation.z=0.03*Math.sin(t*1.3);
 // osso
 BONE.visible=t>22.8&&t<T.COVER+0.2;if(BONE.visible){if(t<T.BDE){var m=mouth();BONE.position.copy(m);BONE.position.y-=0.03;BONE.rotation.set(0,dog.root.rotation.y+PI/2,0);}
  else{var m2=mouth(),g2=V(BH[0],0.15,BH[1]);BONE.position.copy(m2.lerp(g2,S(t,T.BDE,T.DROPB+0.2)));}}
 BPLANT.scale.setScalar(pop(t,T.BONE,0.5));BPLANT.visible=t>T.BONE;BPLANT.rotation.z=0.08*Math.sin(t*3);
 // terra na Duda
 SPOTS.forEach(function(s,k){s.visible=t>10.0+k*0.15&&t<T.PLANT;});
 // partículas de terra
 var pi=0;PS.forEach(function(s){s.visible=false;});
 for(var sc=0;sc<3;sc++){var t0=T.DIG+sc*1.2+0.6,ct=t-t0;if(ct>0&&ct<0.7){for(var j=0;j<8;j++){var s1=PS[pi++],aa=j*2.4,v=0.5+0.15*(j%3);var y=0.5+2.6*ct-4.9*ct*ct;if(y<PY)continue;s1.visible=true;s1.position.set(TS[0]+Math.cos(aa)*v*ct-0.3*ct,y,TS[1]+Math.sin(aa)*v*ct+0.6*ct);}}}
 function spray(t0,t1,from,to,n0){if(t<=t0||t>=t1+0.7)return;for(var j=0;j<n0&&pi<PS.length;j++){var c=((t*1.8+j/n0)%1)*0.7;if(t-c<t0||t-c>t1)continue;var s2=PS[pi++];var p=from.clone().lerp(to,c/0.7);p.y=from.y+2.6*c-4.9*c*c+(to.y-from.y)*c/0.7;p.x+=0.25*Math.sin(j*2.1);p.z+=0.25*Math.cos(j*1.3);s2.visible=true;s2.position.copy(p);s2.rotation.set(c*5,c*4,0);}}
 spray(T.DD,T.DDE,V(DDP[0]+0.3,0.4,DDP[1]),V(P0.duda[0],1.4,P0.duda[1]+0.2),26);
 spray(T.BD,T.BDE,V(BDP[0]+0.3,0.4,BDP[1]),V(BDP[0]+1.5,0.15,BDP[1]+0.4),14);
 // água
 WD.forEach(function(s){s.visible=false;});if(t>T.WAT+0.4&&t<T.WATE){var sp=CAN.spout.getWorldPosition(new THREE.Vector3());WD.forEach(function(s,k){var c=((t*1.5+k/30)%1)*0.55;var p=sp.clone();p.x+=(TS[0]-sp.x)*c*0.4+0.08*Math.sin(k*2.3);p.z+=(TS[1]-sp.z)*c*0.4+0.08*Math.cos(k*1.9);p.y=sp.y-4.9*c*c-0.5*c;if(p.y<PY)return;s.visible=true;s.position.copy(p);});}
};
BURST=[[T.LAPE,[TS[0],2.6,TS[1]],2.6],[T.BONE+0.4,BH,0.9],[T.ROW+0.1,[0,-1.0],2.6],[T.ROW+2.6,[0,-1.0],2.6]];
BW=[['Vamos plantar uma árvore!',3.0,4.6,kp('duda',2.9,-0.9),1],['Ei! Tô cheia de terra!',10.8,12.4,kp('duda',2.9,-0.9),1],['Valeu, Pipoca!',12.4,13.8,kp('leo',2.9,0.5),1],
 ['Plantadinha!',T.PL+0.6,T.PL+2.0,kp('bia',2.9,0.4),1],['Cresce, arvorezinha!',18.6,20.2,kp('teo',2.9,0.4),1],['Osso não vira árvore!',27.0,28.8,kp('bia',2.9,0.3),1],
 ['Agora é só esperar!',30.2,31.6,kp('duda',2.9,-0.7),1],['Virou uma árvore de verdade!',36.4,38.4,kp('teo',2.9,0.5),1],['Nasceu um pé de osso!',40.0,41.8,kp('leo',2.9,0.5),1],
 ['Plantar é muito legal!',50.8,54.8,kp('bia',2.9,0.1),1]];
var KN=['leo','bia','teo','duda'];function NM(){var t=window._t||0;return t<T.DOG-0.2||(t>22.4&&t<23.4)?KN:ALL;}
function UP_(c,d){c.pos[1]+=d;c.look[1]+=d;return c;}
var GP=[[-1.5,0.95],[1.5,0.95]];
function A_(a,e,fov,m,ex){return function(){return UP_(frameOn(NM(),a,e,fov||46,m||0.12,ex||GP),0.2);};}
function treePts(){return GP.concat([[TS[0]-0.8,TS[1]],[TS[0]+0.8,TS[1]]]);}
function frameLowT(a,e,fov,m){var c=frameLow(ALL,a,e,fov,m,GP),P=V(c.pos[0],c.pos[1],c.pos[2]),Lk=V(c.look[0],c.look[1],c.look[2]);
 for(var it=0;it<30;it++){_cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(P);_cam.lookAt(Lk);_cam.updateMatrixWorld();
  var top=V(TS[0],PY+3.0,TS[1]).project(_cam).y,lo=V(0,0,1.0).project(_cam).y;if(top<0.34&&lo>-0.97)break;var d=P.clone().sub(Lk).normalize();P.addScaledVector(d,0.12);}
 return {pos:[P.x,P.y,P.z],look:[Lk.x,Lk.y,Lk.z],fov:fov};}
SH=[[0,T.ARR,function(t){return frameOn(KN,lerp(30,-8,ez(lin(t,0,T.ARR))),lerp(40,28,ez(lin(t,0,T.ARR))),48,0.12,GP);}],
 [T.ARR,T.DOG,A_(-10,30)],
 [T.DOG,T.PLANT,A_(14,30)],
 [T.PLANT,T.FETCH,A_(-8,26)],
 [T.FETCH,T.BACK,A_(8,30)],
 [T.BACK,T.WAIT,A_(18,28)],
 [T.WAIT,T.BONE,function(t){return UP_(frameOn(ALL,lerp(0,-12,lin(t,T.WAIT,T.BONE)),22,50,0.1,treePts().concat([[TS[0],TS[1]-0.01]])),lerp(0.3,1.0,S(t,T.LAPSE,T.LAPE)));}],
 [T.BONE,T.UP,A_(16,26)],
 [T.UP,T.ROW,function(t){return mixCam(UP_(frameOn(ALL,16,26,46,0.12,GP),0.2),frameLowT(0,12,46,0.12),ez(lin(t,T.UP,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLowT(0,12,46,0.12);}]];
EV=[[T.DIG+0.6,'chuf'],[T.DIG+1.8,'chuf'],[T.DIG+3.0,'chuf'],[T.DOG,'bark'],[T.DD,'dig'],[10.4,'laugh'],[T.PL,'plant'],[T.WAT+0.4,'water'],[T.FETCH,'run'],[T.BACK,'bark'],
 [T.BD,'dig2'],[T.COVER,'pat'],[28.8,'laugh'],[T.LAPSE,'lapse'],[T.LAPE-0.2,'oranges'],[T.LAPE,'confetti'],[T.BONE,'bonepop'],[T.BONE+1.2,'laugh'],[T.ROW,'confetti']];
