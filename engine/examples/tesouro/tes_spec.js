// ===== Caça ao Tesouro =====
makeBubs([['Mapa do tesouro!',60],['Cadê o X?',96],['Tá em cima do X!',60],['Ufa, que duro!',72],['Um baú!',100],['Uau!',110],['Tem... ossos?!',70],['Tesouro do Pipoca!',56],
 ['Minha bola!',90],['E a minha meia!',62],['Pipoca pirata!',68],['Capitão Pipoca!',62],['O tesouro é a turma!',50]]);
radio.visible=false;
var XM=[0,-1.0];
var BI=[-1.2,0.1],DU=[1.5,0.4],TE=[-1.9,-1.6],LE=[1.0,-1.9],LD=[0.95,-0.85],BO=[-0.5,-1.95],DO=[0.55,-1.95],DW=[-0.3,0.6],DD=[0,-0.3],DS2=[-0.6,0.5];
var FIN={teo:[-1.5,-2.2],bia:[-0.5,-2.3],duda:[0.5,-2.3],leo:[1.5,-2.2]};
var T={ARR:3.4,SN0:5.2,SIT:9.2,UP:11.6,DIG1:12.4,GIVE:16.0,DIG2:16.8,RISE:19.0,UPC:20.4,OPEN:22.6,BONES:25.2,BALL:29.8,SOCK:31.8,GUIL:33.4,HAT:36.6,CLOSE:39.6,HOP:40.8,MOVE:40.6,ROW:42.8,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
function danceO(n){return function(t){var b=t*BPM/60;return {st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};};}
function dogP(t){return dogState(t).p;}
var REACT=[[10.0,11.6,'laugh','tongue'],[19.6,22.0,'cheer','happy'],[T.OPEN+0.3,25.0,'none','wow'],[25.4,27.2,'look','wow'],[27.4,29.4,'laugh','tongue'],[34.0,36.2,'laugh','tongue'],[36.8,39.4,'clap','happy']];
var WOWA={aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};
function watcher(n,p,t0,t1,tg){return cust(t0,t1,function(t){var g=tg?tg(t):(t>T.UPC&&t<T.HAT?XM:dogP(t));var y=yawTo(p,g);for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1]){
  if(r[2]==='none')return {p:p,yaw:y,pose:'none',face:'wow',A:WOWA};return {p:p,yaw:y,pose:r[2],face:r[3]};}}
 var srch=t>T.SN0&&t<T.SIT;return {p:p,yaw:srch?y+0.5*Math.sin(t*1.7+p[0]):y,pose:srch?'look':'stand',face:srch?'focus':'happy'};});}
var HOLDA={aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45};
(function(){var st={leo:[3,-5],bia:[-4.5,1],teo:[-3,-5],duda:[4.5,1.5]};
 TL.leo=[hold(0,0.2,st.leo,yawTo(st.leo,LE),'stand'),mv(0.2,3.0,[st.leo,LE],'run',{face:'happy',A:HOLDA}),turnTo(3.0,3.4,LE,yawTo(st.leo,LE),yawTo(LE,BI),'hold',{face:'happy'}),
  cust(3.4,T.DIG1-0.8,function(t){var y=yawTo(LE,t<T.SN0?BI:dogP(t));if(t>10.0&&t<11.6)return {p:LE,yaw:y,pose:'hold',face:'tongue'};return {p:LE,yaw:y+(t>T.SN0&&t<T.SIT?0.4*Math.sin(t*1.5):0),pose:'hold',face:t>T.SN0&&t<T.SIT?'focus':'happy'};}),
  mv(T.DIG1-0.8,T.DIG1,[LE,LD],'walk',{face:'focus',A:HOLDA}),
  cust(T.DIG1,T.GIVE,function(t){var q=(t-T.DIG1)*1.6%1,a=Math.sin(PI*q);return {p:LD,yaw:yawTo(LD,XM),pose:'none',face:t>14.8?'wow':'focus',pitch:0.25*a,A:{aLx:-1.0-0.8*a,aRx:-1.0-0.8*a,aLz:0.3,aRz:-0.3,eL:-0.6,eR:-0.6}};}),
  cust(T.GIVE,T.DIG2,function(t){return {p:LD,yaw:yawTo(LD,XM),pose:'none',face:'wow',pitch:0.1,A:{aLx:-0.2,aRx:-0.2,aLz:-0.3,aRz:0.3}};}),
  watcher('leo',LD,T.DIG2,T.BALL-0.4),
  cust(T.BALL-0.4,T.BALL+0.4,function(t,u){return {p:LD,yaw:yawTo(LD,XM),pose:'none',face:'focus',pitch:0.3*Math.sin(PI*u),A:{aLx:-1.3,aRx:-1.3,aLz:0.3,aRz:-0.3,eL:-0.4,eR:-0.4}};}),
  cust(T.BALL+0.4,T.SOCK,function(t,u){return {p:LD,yaw:yawTo(LD,XM),pose:'none',face:'happy',y:0.08*Math.abs(Math.sin(t*8)),A:{aLx:-2.8,aRx:-2.8,aLz:0.25,aRz:-0.25,eL:-0.2,eR:-0.2}};}),
  cust(T.SOCK,T.GUIL,function(t){return {p:LD,yaw:yawTo(LD,DO),pose:'none',face:'happy',A:{aLx:-1.3,aRx:-1.3,aLz:0.25,aRz:-0.25,eL:-0.6,eR:-0.6}};}),
  watcher('leo',LD,T.GUIL,T.MOVE+0.2),mv(T.MOVE+0.2,T.ROW-0.6,[LD,[1.6,-1.3],FIN.leo],'walk',{face:'happy'})];
 TL.bia=[hold(0,0.2,st.bia,yawTo(st.bia,BI),'stand'),mv(0.2,3.0,[st.bia,BI],'run',{face:'happy',A:HOLDA}),turnTo(3.0,3.4,BI,PI/2,0.5,'hold',{face:'happy'}),
  hold(3.4,T.SN0,BI,0.5,'hold',{face:'happy'}),watcher('bia',BI,T.SN0,20.6),mv(20.6,T.OPEN-0.2,[BI,[-1.15,-1.0],BO],'walk',{face:'happy'}),
  cust(T.OPEN-0.2,T.OPEN+0.8,function(t,u){var a=Math.sin(PI*u);return {p:BO,yaw:yawTo(BO,XM),pose:'none',face:'focus',pitch:0.3*a,A:{aLx:-1.2-1.4*S(u,0.3,1),aRx:-1.2-1.4*S(u,0.3,1),eL:-0.3,eR:-0.3}};}),
  watcher('bia',BO,T.OPEN+0.8,T.MOVE),mv(T.MOVE,T.ROW,[BO,FIN.bia],'walk',{face:'happy'})];
 TL.teo=[hold(0,0.2,st.teo,yawTo(st.teo,TE),'stand'),mv(0.2,3.0,[st.teo,TE],'run',{face:'happy'}),turnTo(3.0,3.4,TE,yawTo(st.teo,TE),yawTo(TE,BI),'stand'),
  watcher('teo',TE,3.4,T.MOVE),mv(T.MOVE,T.ROW-1.0,[TE,FIN.teo],'walk',{face:'happy'})];
 TL.duda=[hold(0,0.2,st.duda,yawTo(st.duda,DU),'stand'),mv(0.2,3.0,[st.duda,DU],'run',{face:'happy'}),turnTo(3.0,3.4,DU,-PI/2,yawTo(DU,BI),'stand'),
  watcher('duda',DU,3.4,29.4),mv(29.4,31.6,[DU,[1.8,-0.8],[1.3,-1.75],DO],'walk',{face:'happy'}),
  cust(31.6,T.SOCK+0.4,function(t,u){return {p:DO,yaw:yawTo(DO,XM),pose:'none',face:'focus',pitch:0.3*Math.sin(PI*clamp(u,0,1)),A:{aRx:-1.4,eR:-0.4,aLx:-0.3}};}),
  cust(T.SOCK+0.4,T.GUIL+0.6,function(t){return {p:DO,yaw:yawTo(DO,XM)+0.4,pose:'none',face:'happy',A:{aRx:-2.8,eR:-0.2,aRz:0.2+0.15*Math.sin(t*10),aLx:-0.2}};}),
  watcher('duda',DO,T.GUIL+0.6,T.MOVE),mv(T.MOVE,T.ROW-0.3,[DO,FIN.duda],'walk',{face:'happy'})];
 Object.keys(KIDS).forEach(function(n){var L=TL[n][TL[n].length-1],pr=n==='leo'?[1.6,-1.3]:n==='bia'?BO:n==='teo'?TE:DO,tr=L.t1;
  TL[n].push(turnTo(tr,tr+0.3,FIN[n],yawTo(pr,FIN[n]),0,'stand'),hold(tr+0.3,55.5,FIN[n],0,'dance',danceO(n)),
  cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var CH_H=0.62;
DG=[hold(0,0.3,[3.5,4],yawTo([3.5,4],[2.0,1.5]),'stand'),mv(0.3,2.8,[[3.5,4],[2.0,1.5]],'drun'),turnTo(2.8,3.2,[2.0,1.5],yawTo([3.5,4],[2.0,1.5]),yawTo([2.0,1.5],BI),'sit'),
 hold(3.2,T.SN0,[2.0,1.5],yawTo([2.0,1.5],BI),'sit',{hz:0.3}),
 mv(T.SN0,T.SIT-0.4,[[2.0,1.5],[0.4,1.0],[-0.4,0.5],[0.35,-0.2],[-0.2,-0.6],XM],'sniff'),turnTo(T.SIT-0.4,T.SIT,XM,yawTo([-0.2,-0.6],XM),0,'sit'),
 cust(T.SIT,T.UP,function(t){return {p:XM,yaw:0,pose:'sit',hz:0.25*Math.sin(t*2),tailF:24};}),
 turnTo(T.UP,12.0,XM,0,0,'stand'),mv(12.0,12.6,[XM,DW],'dwalk'),turnTo(12.6,12.9,DW,yawTo(XM,DW),yawTo(DW,LD),'sit'),
 cust(12.9,T.GIVE,function(t){return {p:DW,yaw:yawTo(DW,LD),pose:'sit',hz:0.3*Math.sin(t*2.5)};}),
 cust(T.GIVE,T.DIG2,function(t,u){return {p:L2(DW,DD,ez(u)),yaw:PI,pose:u<0.9?'dwalk':'stand',y:0.04*Math.abs(Math.sin(t*20))};}),
 cust(T.DIG2,T.UPC,function(t){var q=Math.sin(t*28);return {p:DD,yaw:PI,pose:'none',pitch:0.18,legs:[-0.9*Math.max(0,q),-0.9*Math.max(0,-q),0.2,0.2],hx:0.35,tailF:34,tailA:1.2,y:0.02};}),
 cust(T.UPC,21.0,function(t,u){return {p:L2(DD,DS2,ez(u)),yaw:PI,pose:'dwalk'};}),turnTo(21.0,21.3,DS2,PI,PI,'sit'),
 cust(21.3,T.GUIL,function(t){var b=t>T.BONES+0.4&&t<29.4;return {p:DS2,yaw:PI,pose:b?'party':'sit',tailF:b?34:20,tailA:b?1.2:0.7};}),
 cust(T.GUIL,T.HAT,function(t){return {p:DS2,yaw:PI,pose:'sit',hx:0.45,tailA:0.1,hz:0.15*Math.sin(t*3)};}),
 cust(T.HAT,T.HOP,function(t){return {p:DS2,yaw:PI+PI*S(t,T.HAT+1.6,T.HAT+2.4),pose:t>T.HAT+0.4?'party':'sit'};}),
 cust(T.HOP,41.6,function(t,u){return {p:L2(DS2,[XM[0],XM[1]+0.05],ez(u)),yaw:0,pose:'stand',legs:[-0.8,-0.8,0.6,0.6],y:CH_H*ez(u)+0.6*4*u*(1-u)};}),
 cust(41.6,END+2,function(t){return {p:[XM[0],XM[1]+0.05],yaw:0,pose:'party',y:CH_H};})];
// ----- objetos -----
var XG=new THREE.Group();XG.position.set(XM[0],0.075,XM[1]);scene.add(XG);[0.7,-0.7].forEach(function(r){var b=box(0.95,0.03,0.16,0xe0484f);b.rotation.y=r;b.castShadow=false;XG.add(b);});
var HOLE=new THREE.Mesh(new THREE.CylinderGeometry(0.62,0.62,0.02,24),mat(0x6b4423));HOLE.position.set(XM[0],0.08,XM[1]);scene.add(HOLE);
var MOUND=new THREE.Mesh(new THREE.SphereGeometry(0.45,16,8,0,2*PI,0,PI/2),mat(0x9a6a3a));MOUND.position.set(0.75,0.05,0.1);MOUND.scale.set(1,0.5,1);scene.add(MOUND);
var CHEST=new THREE.Group();scene.add(CHEST);var LID=new THREE.Group();var GLOW;
(function(){var w=0x9a5b2e,gd=0xffc83d;var b=box(0.95,0.42,0.6,w);b.position.y=0.21;CHEST.add(b);
 [-0.3,0.3].forEach(function(x){var s=box(0.1,0.44,0.62,gd);s.position.set(x,0.22,0);CHEST.add(s);});
 LID.position.set(0,0.42,-0.3);CHEST.add(LID);var l=box(0.97,0.2,0.62,w);l.position.set(0,0.1,0.31);LID.add(l);[-0.3,0.3].forEach(function(x){var s=box(0.1,0.22,0.64,gd);s.position.set(x,0.1,0.31);LID.add(s);});
 var lk=box(0.16,0.18,0.06,gd);lk.position.set(0,0.0,0.63);LID.add(lk);
 var gl=box(0.85,0.06,0.5,0xffe27a,{emissive:col(0xffc83d),emissiveIntensity:0.9});gl.position.y=0.4;CHEST.add(gl);GLOW=gl;
 for(var i=0;i<6;i++){var c=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.07,0.03,10),mat(gd,{metalness:0.4}));c.position.set(-0.3+i*0.12,0.43,0.1*Math.sin(i*2));CHEST.add(c);}})();
var SPARK=[];(function(){var m=new THREE.MeshBasicMaterial({color:0xfff2a8});for(var i=0;i<16;i++){var s=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.07,0.07),m);s.visible=false;scene.add(s);SPARK.push(s);}})();
function makeBone(){var g=new THREE.Group();var w=0xfaf7ee;var c=box(0.34,0.08,0.08,w);g.add(c);[-1,1].forEach(function(s){[-1,1].forEach(function(r){var k=box(0.1,0.1,0.1,w);k.position.set(s*0.18,0,r*0.05);g.add(k);});});g.scale.setScalar(1.4);scene.add(g);return g;}
var BONES=[makeBone(),makeBone(),makeBone()],BLAND=[[-0.95,-1.25,0.6],[0.35,0.15,2.0],[-0.55,-0.25,1.2]];
var RBALL=new THREE.Mesh(new THREE.SphereGeometry(0.2,16,12),mat(0xe0484f));RBALL.castShadow=true;scene.add(RBALL);
var SOCK=new THREE.Group();scene.add(SOCK);(function(){for(var i=0;i<4;i++){var b=box(0.14,0.1,0.14,i%2?0x34d399:0xffffff);b.position.y=-i*0.1;SOCK.add(b);}var f=box(0.14,0.12,0.24,0x34d399);f.position.set(0,-0.42,0.06);SOCK.add(f);SOCK.scale.setScalar(1.3);})();
var MAP=new THREE.Group();scene.add(MAP);(function(){var c=document.createElement('canvas');c.width=256;c.height=192;var x=c.getContext('2d');x.fillStyle='#f3e2b3';x.fillRect(0,0,256,192);x.strokeStyle='#8b5a2b';x.lineWidth=6;x.strokeRect(4,4,248,184);
 x.setLineDash([10,8]);x.beginPath();x.moveTo(30,160);x.quadraticCurveTo(90,40,190,70);x.stroke();x.setLineDash([]);x.strokeStyle='#e0484f';x.lineWidth=12;x.beginPath();x.moveTo(180,55);x.lineTo(215,90);x.moveTo(215,55);x.lineTo(180,90);x.stroke();
 var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;var m=new THREE.Mesh(new THREE.PlaneGeometry(0.75,0.56),new THREE.MeshStandardMaterial({map:t,side:THREE.DoubleSide,roughness:0.8}));MAP.add(m);})();
var SHOVEL=new THREE.Group();scene.add(SHOVEL);(function(){var h=box(0.06,0.06,1.0,0x8b5a2b);h.position.z=0.1;SHOVEL.add(h);var bl=box(0.26,0.04,0.3,0x9aa4ae,{metalness:0.5});bl.position.z=0.7;SHOVEL.add(bl);})();
var HAT=new THREE.Group();dog.head.add(HAT);HAT.position.set(0,0.24,0);(function(){var br=box(0.6,0.05,0.34,0x222222);HAT.add(br);var cr=box(0.36,0.2,0.26,0x222222);cr.position.y=0.12;HAT.add(cr);var sk=box(0.1,0.1,0.02,0xffffff);sk.position.set(0,0.13,0.135);HAT.add(sk);})();
var DIRT=[];(function(){var m=mat(0x8b5a2b);for(var i=0;i<40;i++){var d=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.09,0.09),m);d.visible=false;scene.add(d);DIRT.push(d);}})();
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
var CA={};function frameState(t){Object.keys(KIDS).forEach(function(n){applyKid(KIDS[n],stateOf(n,t),t);});applyDog(t);scene.updateMatrixWorld(true);}
function at(key,tq,fn,tnow){if(CA[key])return CA[key].clone();frameState(tq);var v=fn();CA[key]=v.clone();frameState(tnow);return v;}
EXTRA=function(t){
 var hole=S(t,T.DIG1+1.0,T.RISE);XG.visible=hole<0.5;HOLE.visible=hole>0.01;HOLE.scale.setScalar(Math.max(0.01,0.3+0.7*hole));MOUND.visible=t>T.DIG1+0.6;MOUND.scale.set(1,0.5,1).multiplyScalar(Math.max(0.01,0.3+0.7*S(t,T.DIG1+0.6,T.RISE)));
 var ry=lerp(-0.7,0,S(t,T.RISE,T.UPC));CHEST.visible=t>T.RISE;CHEST.position.set(XM[0],ry,XM[1]);
 var op=S(t,T.OPEN,T.OPEN+0.6)*(1-S(t,T.CLOSE,T.CLOSE+0.5));LID.rotation.x=-1.9*op;GLOW.visible=op>0.05;
 SPARK.forEach(function(s,i){var on=op>0.3&&t<T.CLOSE;s.visible=on;if(on){var ph=(t*0.7+i/16)%1;s.position.set(XM[0]+0.4*Math.cos(i*2.4),0.5+ph*1.4,XM[1]+0.3*Math.sin(i*2.4));s.scale.setScalar(Math.max(0.01,Math.sin(PI*ph)));s.rotation.set(t*3,t*2,0);}});
 BONES.forEach(function(b,i){var t0=T.BONES+i*0.25;b.visible=t>t0;if(!b.visible)return;var u=clamp((t-t0)/0.7,0,1),a=V(XM[0],0.45,XM[1]),L=BLAND[i],e=V(L[0],0.08,L[1]);var p=a.clone().lerp(e,u);p.y+=1.6*4*u*(1-u);b.position.copy(p);b.rotation.set(0,L[2]+u*6*(1-u),u<1?t*8:0);});
 var bh=at('bh',T.BALL+0.4,function(){return hands('leo');},t);
 if(t<T.BALL){RBALL.visible=false;}else{RBALL.visible=true;if(t<T.BALL+0.4){var u=(t-T.BALL)/0.4;var p=V(XM[0],0.45,XM[1]).lerp(bh,u);p.y+=0.4*4*u*(1-u);RBALL.position.copy(p);}else if(t<T.MOVE+0.2){var h=hands('leo');RBALL.position.copy(h);RBALL.position.y+=0.12;}
  else{var u2=clamp((t-T.MOVE-0.2)/0.5,0,1),d0=at('bd',T.MOVE+0.2,function(){return hands('leo');},t),e2=V(1.4,0.2,-0.45);var p2=d0.lerp(e2,u2);p2.y+=0.4*4*u2*(1-u2);RBALL.position.copy(p2);}}
 if(t<T.SOCK){SOCK.visible=false;}else{SOCK.visible=t<T.MOVE;var sh=hand('duda',1);if(t<T.SOCK+0.4){var u3=(t-T.SOCK)/0.4;SOCK.position.copy(V(XM[0],0.5,XM[1]).lerp(sh,u3));}else SOCK.position.copy(sh);SOCK.position.y-=0.0;SOCK.rotation.set(0,KIDS.duda.root.rotation.y,0.2*Math.sin(t*10));}
 var mapOn=t<21.4;MAP.visible=mapOn;if(mapOn){var mh=hands('bia');MAP.position.copy(mh);MAP.position.y+=0.25;MAP.rotation.set(-0.5,KIDS.bia.root.rotation.y,0,'YXZ');MAP.scale.setScalar(Math.max(0.01,(t<3.0?1:back((t-3.0)/0.3))*(1-S(t,21.0,21.4))));}
 if(t<T.GIVE){var sp=hands('leo');SHOVEL.position.copy(sp);var dig=t>T.DIG1;var yl=KIDS.leo.root.rotation.y;SHOVEL.rotation.set(dig?0.9+0.35*Math.sin((t-T.DIG1)*1.6*2*PI):-0.6,yl,0,'YXZ');}
 else{SHOVEL.position.set(1.55,0.06,-0.15);SHOVEL.rotation.set(0,0.4,PI/2,'YXZ');SHOVEL.rotation.set(0,0.4,0);SHOVEL.position.y=0.06;}
 HAT.visible=t>T.HAT;if(HAT.visible)HAT.scale.setScalar(Math.max(0.001,back((t-T.HAT)/0.35)));
 var di=0;DIRT.forEach(function(d){d.visible=false;});
 function dr(p,v,ct){if(di>=DIRT.length)return;var y=p.y+v.y*ct-4.9*ct*ct;if(y<0.05)return;var d=DIRT[di++];d.visible=true;d.position.set(p.x+v.x*ct,y,p.z+v.z*ct);d.rotation.set(ct*5,ct*3,0);}
 if(t>T.DIG1&&t<T.GIVE){for(var i=0;i<6;i++){var t0=T.DIG1+Math.floor((t-T.DIG1)*1.6)/1.6+0.3,ct=t-t0-i*0.03;if(ct>0&&ct<0.5)dr(V(XM[0]+0.2,0.1,XM[1]),V(0.5+0.1*i,1.6,0.6+0.1*i),ct);}}
 if(t>T.DIG2&&t<T.UPC){for(var j=0;j<34;j++){var c2=((t*2.2+j/34)%1)*0.7;dr(V(XM[0],0.1,XM[1]+0.1),V(Math.sin(j*2.4)*0.9,2.6+(j%4)*0.3,0.8+(j%3)*0.4),c2);}}
 GLOW.material.emissiveIntensity=0.7+0.3*Math.sin(t*6);};
BURST=[[T.UPC+0.1,[0,-1.0],0.6],[T.HAT+0.1,DS2,0.9],[T.ROW,[0,-1.6]],[T.ROW+2.4,[0,-1.6]]];
BW=[['Mapa do tesouro!',3.5,5.0,kp('bia',2.9,0.4),1],['Cadê o X?',7.4,8.8,kp('leo',2.7,-0.3),1],['Tá em cima do X!',10.0,11.6,kp('duda',2.7,-0.5),1],['Ufa, que duro!',14.8,16.2,kp('leo',2.7,-0.3),1],
 ['Um baú!',20.4,21.8,kp('teo',2.7,0.3),1],['Uau!',T.OPEN+0.5,24.6,kp('bia',2.7,0.2),1],['Tem... ossos?!',25.6,27.0,kp('duda',2.7,-0.4),1],['Tesouro do Pipoca!',27.4,29.2,kp('teo',2.7,0.6),1],
 ['Minha bola!',T.BALL+0.4,31.6,kp('leo',2.9,-0.4),1],['E a minha meia!',T.SOCK+0.4,33.6,kp('duda',2.9,-0.3),1],['Pipoca pirata!',34.0,35.8,kp('bia',2.9,0.4),1],['Capitão Pipoca!',37.0,38.8,kp('teo',2.8,0.5),1],
 ['O tesouro é a turma!',51.4,55.0,function(){return [0,2.4,-2.2];},1]];
var GP=[[0,-1.5],[0,-0.4],[-1.0,-1.0],[0.6,-1.0]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||48,m||0.08,GP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(30,-8,ez(lin(t,0,3.2))),lerp(40,28,ez(lin(t,0,3.2))),50,0.1,GP);}],
 [T.ARR,T.SN0,A_(-8,26,46)],
 [T.SN0,T.UP,A_(8,34,48)],
 [T.UP,T.DIG2,A_(-18,26,46)],
 [T.DIG2,T.OPEN-0.4,A_(10,26,46)],
 [T.OPEN-0.4,29.6,A_(-10,30,46)],
 [29.6,T.HAT-0.2,A_(-18,30,46)],
 [T.HAT-0.2,T.MOVE,A_(-6,26,46)],
 [T.MOVE,T.ROW,function(t){return mixCam(frameOn(ALL,-6,26,46,0.08,GP),frameLow(ALL,0,16,50,0.06),ez(lin(t,T.MOVE,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[[3.2,'map'],[T.SN0,'sniff'],[T.SIT,'sit'],[10.0,'laugh'],[T.DIG1+0.3,'shovel'],[T.DIG2,'dig'],[T.UPC,'tchan'],[T.OPEN+0.3,'shine'],[T.BONES,'bones'],[27.4,'laugh'],[T.BALL+0.4,'pop'],[T.SOCK+0.4,'pop'],[T.GUIL,'guilty'],[34.0,'laugh'],[T.HAT,'hat'],[T.CLOSE,'close'],[T.HOP,'jump'],[T.ROW,'confetti']];
