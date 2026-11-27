// ===== Coelhinho Sai da Toca =====
makeBubs([['Coelhinho sai da toca!',40],['Ei! Essa toca é minha!',40],['O Pipoca virou coelho!',40],['Agora sim!',80],['Coitadinho do Pipoca!',40],
 ['Pipoca, pega aquele!',48],['Toca nova!',76],['Coelhinho, pula!',52],['O Pipoca pula mais alto!',36],['Abraço de coelho!',48],
 ['Coelhinho mais fofo!',42],['Viva os coelhinhos!',44],['Quem quer ser coelho amanhã?',32]]);
radio.visible=false;
// ----- orelhinhas de coelho -----
Object.keys(KIDS).forEach(function(n){var h=KIDS[n].head;[-1,1].forEach(function(s){var e=new THREE.Group();e.position.set(s*0.24,1.0,-0.05);e.rotation.z=-s*0.12;h.add(e);
 var o=box(0.2,0.75,0.1,0xffffff);o.position.y=0.37;e.add(o);var i=box(0.11,0.55,0.03,0xff9fbf);i.position.set(0,0.37,0.06);e.add(i);KIDS[n]['ear'+(s<0?'L':'R')]=e;});});
// ----- tocas (bambolês) -----
var T1=[-1.3,-1.3],T2=[1.3,-1.3],T3=[0,0.4],T4=[2.4,0.4],HP=[3.6,-2.8];
function hoop(p,c){var m=new THREE.Mesh(new THREE.TorusGeometry(0.62,0.07,10,40),mat(c));m.rotation.order='YXZ';m.rotation.x=PI/2;m.position.set(p[0],0.08,p[1]);m.castShadow=true;scene.add(m);return m;}
hoop(T1,0xffd23f);hoop(T2,0x3a8bff);hoop(T3,0xff6fa3);var H4=hoop(HP,0x2fbf5f);
var T={ARR:3.0,CALL1:3.2,GO1:4.8,CALL2:10.6,GO2:12.0,IDEA:17.3,FETCH:18.9,PICK:20.7,DROP:22.3,CALL3:24.6,HOP:26.0,HOPE:31.5,GO4:32.4,YAY:37.0,ROW:39.0,DANCE:41.6,WAVE:55.5,END:60};
var END=T.END;
var LC=[0,2.8],DOG0=[1.4,1.6],DOG1=[1.6,1.8],TO=[1.0,0.75],TP=[0.62,-0.35];
var C4=[0.6,-0.4],S4={leo:[1.52,-0.15],teo:[-0.32,-0.15],bia:[0.0,-1.25],duda:[1.2,-1.25]};
var FIN={teo:[-1.95,2.6],bia:[-0.65,2.6],leo:[0.65,2.6],duda:[1.95,2.6]},DF=[0,3.5];
var STY={leo:0,bia:3,teo:2,duda:1};
var CALLA={A:{aRx:-2.7,eR:-0.3,aRz:0.2,aLx:-2.7,eL:-0.3,aLz:-0.2},face:'happy'};
var POINT={A:{aRx:-1.6,eR:-0.1,aLx:-0.2},face:'happy'};
var LAUGHW=[[8.4,10.2],[35.2,36.8]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function lg(o){return function(t,u){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue',A:null};return (typeof o==='function')?o(t,u):o;};}
function bunny(t,ph){var b=t*BPM/60+(ph||0);return {pose:'none',A:{aLx:-1.5,aRx:-1.5,eL:-1.7,eR:-1.7,aLz:0.28,aRz:-0.28,lL:-0.15,lR:-0.15},y:0.32*Math.abs(Math.sin(PI*b)),face:(Math.floor(b/2)%2)?'tongue':'happy'};}
function runTo(t0,t1,pts,look,o){var e=pts[pts.length-1],pr=pts[pts.length-2];
 return [mv(t0,t1,pts,'run',{face:'happy'}),turnTo(t1,t1+0.25,e,yawTo(pr,e),yawTo(e,look),'stand',{face:'happy'})];}
var HUG={A:{aLx:-1.25,aRx:-1.25,aLz:0.45,aRz:-0.45,eL:-0.7,eR:-0.7},face:'happy',pitch:0.12};
function hugEnd(n){return [hold(T.GO4+1.6,T.YAY,S4[n],yawTo(S4[n],C4),'none',function(t){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue'};return HUG;}),
 hold(T.YAY,T.ROW,S4[n],yawTo(S4[n],C4),'cheer',{face:'happy'})];}
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
function toFin(n,t0,pts){var e=FIN[n],pr=pts.length?pts[pts.length-1]:S4[n];return [mv(t0,t0+1.2,[S4[n]].concat(pts,[e]),'walk',{face:'happy'}),turnTo(t0+1.2,t0+1.5,e,yawTo(pr,e),0,'stand',{face:'happy'}),hold(t0+1.5,T.DANCE,e,0,'clap',{face:'happy'})];}
(function(){
 // LÉO (quem chama)
 TL.leo=[hold(0,0.2,[2.6,4.6],yawTo([2.6,4.6],LC),'stand'),mv(0.2,2.6,[[2.6,4.6],[1.2,3.9],LC],'run',{face:'happy'}),turnTo(2.6,3.0,LC,yawTo([1.2,3.9],LC),PI,'stand',{face:'happy'}),
  hold(3.0,4.8,LC,PI,'none',CALLA),hold(4.8,8.4,LC,PI,'clap',{face:'happy'}),hold(8.4,10.6,LC,PI,'stand',lg({face:'happy'})),
  hold(10.6,12.0,LC,PI,'none',CALLA),hold(12.0,17.3,LC,PI,'look',function(t){return t>15.4?{face:'focus'}:{face:'happy'};}),
  turnTo(17.3,17.6,LC,PI,yawTo(LC,HP),'none',POINT),hold(17.6,20.6,LC,yawTo(LC,HP),'none',function(t){return t<18.9?POINT:{pose:'look',face:'wow'};}),
  turnTo(20.6,21.0,LC,yawTo(LC,HP),PI,'look',{face:'happy'}),hold(21.0,22.8,LC,PI,'look',{face:'happy'}),hold(22.8,24.6,LC,PI,'clap',{face:'happy'}),
  hold(24.6,T.HOP,LC,PI,'none',CALLA),cust(T.HOP,T.HOPE,function(t){return ext({p:LC,yaw:PI},bunny(t,0.5));}),
  hold(T.HOPE,T.GO4+0.3,LC,PI,'none',{A:{aLx:-1.3,aRx:-1.3,aLz:-0.6,aRz:0.6,eL:-0.4,eR:-0.4},face:'happy'})]
  .concat([mv(T.GO4+0.3,T.GO4+1.4,[LC,[1.5,1.3],S4.leo],'run',{face:'happy'}),turnTo(T.GO4+1.4,T.GO4+1.6,S4.leo,PI,yawTo(S4.leo,C4),'stand',{face:'happy'})],
  hugEnd('leo'),toFin('leo',T.ROW,[[1.6,0.9]]),tail('leo'));
 // BIA: T1 -> T2 -> T1
 var sb=[-3.4,-2.8];
 TL.bia=[hold(0,0.2,sb,yawTo(sb,T1),'stand'),mv(0.2,2.4,[sb,T1],'run',{face:'happy'}),turnTo(2.4,2.8,T1,yawTo(sb,T1),yawTo(T1,LC),'stand',{face:'happy'}),
  hold(2.8,T.GO1,T1,yawTo(T1,LC),'stand',{face:'happy'})]
  .concat(runTo(T.GO1,6.1,[T1,T2],LC),[hold(6.35,T.GO2,T2,yawTo(T2,LC),'stand',lg(function(t){return (t>8.2&&t<8.4)?{pose:'clap',face:'happy'}:{face:'happy'};}))],
  runTo(T.GO2,13.4,[T2,[0.7,-2.25],[-0.7,-2.25],T1],LC),[hold(13.65,22.8,T1,yawTo(T1,LC),'stand',function(t){return t>15.4&&t<17.0?{pose:'look',face:'wow'}:(t>18.9?{pose:'look',face:'happy'}:{face:'happy'});}),
  hold(22.8,24.2,T1,yawTo(T1,T4),'clap',{face:'happy'}),hold(24.2,T.HOP,T1,yawTo(T1,LC),'stand',{face:'happy'}),cust(T.HOP,T.HOPE,function(t){return ext({p:T1,yaw:yawTo(T1,LC)},bunny(t,0));}),
  hold(T.HOPE,T.GO4,T1,yawTo(T1,LC),'stand',{face:'happy'})],runTo(T.GO4,T.GO4+1.2,[T1,S4.bia],C4),[hold(T.GO4+1.45,T.GO4+1.6,S4.bia,yawTo(S4.bia,C4),'none',HUG)],
  hugEnd('bia'),toFin('bia',T.ROW+0.3,[[-0.9,-0.9],[-1.3,0.6]]),tail('bia'));
 // TEO: T2 -> perde -> fora -> T3
 var st=[3.4,-2.8];
 TL.teo=[hold(0,0.2,st,yawTo(st,T2),'stand'),mv(0.2,2.5,[st,T2],'run',{face:'happy'}),turnTo(2.5,2.9,T2,yawTo(st,T2),yawTo(T2,LC),'stand',{face:'happy'}),
  hold(2.9,T.GO1,T2,yawTo(T2,LC),'stand',{face:'happy'}),
  mv(T.GO1,5.9,[T2,TP],'run',{face:'happy'}),turnTo(5.9,6.2,TP,yawTo(T2,TP),yawTo(TP,T3),'none',{face:'wow',A:{aLx:-0.6,aRx:-0.6,aLz:-0.5,aRz:0.5}}),
  hold(6.2,8.0,TP,yawTo(TP,T3),'none',function(t){return {A:{aLx:-0.5,aRx:-2.3,eR:-0.6,aRz:0.2,aLz:-0.3},face:'wow',y:hopAt(t,6.5,0.35,0.15)};}),
  hold(8.0,9.9,TP,yawTo(TP,T3),'none',lg({A:{aLx:-1.2,aRx:-1.2,aLz:0.7,aRz:-0.7,eL:-1.7,eR:-1.7},face:'focus'})),
  mv(9.9,10.6,[TP,[1.15,0.1],TO],'walk',{face:'focus'}),turnTo(10.6,10.9,TO,0,yawTo(TO,T3),'look',{face:'focus'}),
  hold(10.9,T.GO2,TO,yawTo(TO,T3),'look',{face:'focus'}),
  cust(T.GO2,12.8,function(t,u){return {p:L2(TO,T3,ez(u)),yaw:yawTo(TO,T3),pose:'none',A:{lL:-0.6,lR:-0.6,aLx:-2.6,aRx:-2.6},y:0.5*Math.sin(PI*u),face:'happy'};}),
  turnTo(12.8,13.2,T3,yawTo(TO,T3),PI,'cheer',{face:'happy'}),hold(13.2,15.2,T3,PI,'cheer',{face:'happy'}),
  turnTo(15.2,15.6,T3,PI,yawTo(T3,DOG1),'stand',{face:'idle'}),hold(15.6,18.9,T3,yawTo(T3,DOG1),'stand',{face:'idle'}),
  turnTo(18.9,19.3,T3,yawTo(T3,DOG1),yawTo(T3,[3.4,-1.0]),'look',{face:'wow'}),hold(19.3,22.8,T3,yawTo(T3,[3.4,-1.0]),'look',{face:'happy'}),
  hold(22.8,24.2,T3,yawTo(T3,T4),'clap',{face:'happy'}),hold(24.2,T.HOP,T3,PI,'stand',{face:'happy'}),cust(T.HOP,T.HOPE,function(t){var s=ext({p:T3,yaw:PI},bunny(t,0.25));
   if(t>29.4&&t<30.9){s.A={aLx:-0.4,aRx:-2.3,eR:-0.6,aRz:0.3,aLz:-0.3};s.y=0;s.yaw=PI+0.9;s.face='wow';}return s;}),
  hold(T.HOPE,T.GO4,T3,PI,'stand',{face:'happy'})]
  .concat(runTo(T.GO4,T.GO4+0.9,[T3,S4.teo],C4),[hold(T.GO4+1.15,T.GO4+1.6,S4.teo,yawTo(S4.teo,C4),'none',HUG)],hugEnd('teo'),toFin('teo',T.ROW,[[-1.4,0.4]]),tail('teo'));
 // DUDA: T3 -> T1 -> T2
 var sd=[-3.0,3.0];
 TL.duda=[hold(0,0.2,sd,yawTo(sd,T3),'stand'),mv(0.2,2.6,[sd,[-1.6,1.4],T3],'run',{face:'happy'}),turnTo(2.6,3.0,T3,yawTo([-1.6,1.4],T3),yawTo(T3,LC),'stand',{face:'happy'}),
  hold(3.0,T.GO1,T3,PI,'stand',{face:'happy'})]
  .concat(runTo(T.GO1,6.0,[T3,T1],LC),[hold(6.25,T.GO2,T1,yawTo(T1,LC),'stand',lg({face:'happy'}))],
  runTo(T.GO2,13.3,[T1,[-0.5,-0.55],[0.5,-0.55],T2],LC),[hold(13.55,15.3,T2,yawTo(T2,LC),'stand',{face:'happy'}),
  turnTo(15.3,15.6,T2,yawTo(T2,LC),yawTo(T2,DOG1),'none',{A:{aLx:-1.2,aRx:-1.2,aLz:0.5,aRz:-0.5,eL:-1.3,eR:-1.3},face:'idle'}),
  hold(15.6,18.9,T2,yawTo(T2,DOG1),'none',function(t){return t<17.0?{A:{aLx:-1.2,aRx:-1.2,aLz:0.5,aRz:-0.5,eL:-1.3,eR:-1.3},face:'idle'}:{pose:'stand',face:'idle'};}),
  turnTo(18.9,19.3,T2,yawTo(T2,DOG1),yawTo(T2,HP),'look',{face:'wow'}),hold(19.3,22.8,T2,yawTo(T2,HP),'look',{face:'happy'}),
  hold(22.8,24.2,T2,yawTo(T2,T4),'clap',{face:'happy'}),hold(24.2,T.HOP,T2,yawTo(T2,LC),'stand',{face:'happy'}),cust(T.HOP,T.HOPE,function(t){return ext({p:T2,yaw:yawTo(T2,LC)},bunny(t,0.75));}),
  hold(T.HOPE,T.GO4,T2,yawTo(T2,LC),'stand',{face:'happy'})],runTo(T.GO4+0.1,T.GO4+1.0,[T2,S4.duda],C4),[hold(T.GO4+1.25,T.GO4+1.6,S4.duda,yawTo(S4.duda,C4),'none',HUG)],
  hugEnd('duda'),toFin('duda',T.ROW+0.4,[[1.9,-0.6],[2.0,1.4]]),tail('duda'));
})();
// ----- Pipoca -----
var d0=[3.8,2.6],APR=[HP[0],HP[1]+1.4];
DG=[hold(0,0.4,d0,yawTo(d0,DOG0),'stand'),mv(0.4,2.8,[d0,[2.6,2.2],DOG0],'drun'),turnTo(2.8,3.1,DOG0,yawTo([2.6,2.2],DOG0),yawTo(DOG0,LC),'sit'),
 hold(3.1,T.GO1,DOG0,yawTo(DOG0,LC),'sit',{tailF:24}),
 mv(T.GO1,5.6,[DOG0,[0.6,1.2],T3],'drun',{tailF:34}),turnTo(5.6,5.8,T3,yawTo([0.6,1.2],T3),yawTo(T3,TP),'sit'),
 hold(5.8,8.2,T3,yawTo(T3,TP),'sit',function(t){return {tailF:34,tailA:1.0,hz:0.25*Math.sin(t*4)};}),
 cust(8.2,10.2,function(t){return {p:T3,yaw:0,pose:'hind',wig:1,lift:S(t,8.2,8.5)*(1-S(t,9.9,10.2)),tailF:34,tailA:1.1};}),
 hold(10.2,T.GO2,T3,0,'sit',{tailF:24}),
 mv(T.GO2,13.6,[T3,[-0.7,1.2],[0.4,2.0],[1.2,1.4],DOG1],'drun',{tailF:30}),turnTo(13.6,13.9,DOG1,yawTo([1.2,1.4],DOG1),yawTo(DOG1,T3),'sit'),
 hold(13.9,T.FETCH,DOG1,yawTo(DOG1,T3),'sit',function(t){return {tailA:0.15,tailF:6,hx:0.3,hz:0.25};}),
 turnTo(T.FETCH,19.2,DOG1,yawTo(DOG1,T3),yawTo(DOG1,[3.2,0.4]),'stand',{tailF:34}),
 mv(19.2,T.PICK,[DOG1,[3.3,0.6],APR],'drun',{tailF:34}),turnTo(T.PICK,21.0,APR,yawTo([3.3,0.6],APR),PI,'stand',{hx:0.35}),
 mv(21.0,T.DROP,[APR,[3.4,0.2],[2.6,1.4],[2.15,0.9],T4],'dwalk',{tailF:34}),
 turnTo(T.DROP,22.7,T4,yawTo([2.15,0.9],T4),yawTo(T4,[2.4,-0.6]),'stand',{hx:0.3}),
 turnTo(22.7,23.0,T4,yawTo(T4,[2.4,-0.6]),PI*0.85,'sit',{tailF:34}),hold(23.0,T.HOP,T4,PI*0.85,'sit',{tailF:34,tailA:1.1}),
 cust(T.HOP,T.HOPE,function(t){var b=t*BPM/60,big=(t>29.4&&t<31.2)?1.9:1;return {p:T4,yaw:PI*0.85,pose:'stand',y:0.38*big*Math.abs(Math.sin(PI*b)),legs:[-0.6,-0.6,0.5,0.5],tailF:36};}),
 hold(T.HOPE,T.GO4,T4,PI*0.85,'sit',{tailF:30}),mv(T.GO4,T.GO4+0.8,[T4,C4],'drun'),turnTo(T.GO4+0.8,T.GO4+1.0,C4,yawTo(T4,C4),0,'stand'),
 cust(T.GO4+1.0,T.YAY,function(t){if(inW(t,LAUGHW))return {p:C4,yaw:0,pose:'hind',wig:1,lift:1,tailF:36,tailA:1.2};return {p:C4,yaw:0.25*Math.sin(t*3),pose:'sit',tailF:34,tailA:1.1,hz:0.2*Math.sin(t*5)};}),
 hold(T.YAY,40.6,C4,0,'party'),mv(40.6,41.5,[C4,[0.2,1.4],DF],'drun'),turnTo(41.5,41.7,DF,0,0,'stand'),hold(41.7,END+2,DF,0,'party')];
// bambolê verde: no chão -> na boca do Pipoca -> nova toca
var _v=new THREE.Vector3();
EXTRA=function(t){var flat=[HP[0],0.08,HP[1]],rx=PI/2,ry=0;
 if(t<T.PICK){H4.position.set(flat[0],flat[1],flat[2]);H4.rotation.set(rx,ry,0);return;}
 _v.set(0,0.72,1.4);dog.root.localToWorld(_v);var dy=dog.root.rotation.y+PI/2;
 if(t<21.0){var u=ez(lin(t,T.PICK,21.0));H4.position.set(lerp(flat[0],_v.x,u),lerp(flat[1],_v.y,u),lerp(flat[2],_v.z,u));H4.rotation.set(lerp(rx,0,u),dy,0);return;}
 if(t<T.DROP){H4.position.copy(_v);H4.rotation.set(0,dy,0);return;}
 var w=ez(lin(t,T.DROP,22.65));if(t<22.65){var a=[_v.x,_v.y,_v.z];}
 var g=[T4[0],0.08,T4[1]];if(!EXTRA._m||t<22.65)EXTRA._m=[_v.x,_v.y,_v.z,dy];var m=EXTRA._m;
 H4.position.set(lerp(m[0],g[0],w),lerp(m[1],g[1],w)+0.3*Math.sin(PI*w),lerp(m[2],g[2],w));H4.rotation.set(lerp(0,rx,w),m[3],0);};
BURST=[[T.YAY,[0.6,-0.4],2.0],[T.DANCE,[0,2.6],2.2],[T.DANCE+3,[0,2.6],2.2]];
BW=[['Coelhinho sai da toca!',3.2,4.8,kp('leo',2.9,0),1],['Ei! Essa toca é minha!',6.4,8.0,kp('teo',2.9,0.4),1],['O Pipoca virou coelho!',8.2,9.9,kp('bia',2.9,-0.2),1],
 ['Coelhinho sai da toca!',10.6,12.0,kp('leo',2.9,0),1],['Agora sim!',13.4,14.8,kp('teo',2.9,0),1],['Coitadinho do Pipoca!',15.4,17.0,kp('duda',2.9,-0.3),1],
 ['Pipoca, pega aquele!',17.3,18.9,kp('leo',2.9,0),1],['Toca nova!',22.8,24.2,kp('bia',2.9,0.2),1],['Coelhinho, pula!',24.6,26.0,kp('leo',2.9,0),1],
 ['O Pipoca pula mais alto!',29.4,30.9,kp('teo',2.9,0.3),1],['Abraço de coelho!',31.0,32.4,kp('leo',2.9,0),1],['Coelhinho mais fofo!',33.8,35.2,kp('duda',2.9,0.2),1],
 ['Viva os coelhinhos!',37.2,38.8,kp('bia',2.9,0),1],['Quem quer ser coelho amanhã?',50.5,54.5,kp('teo',2.9,0.5),1]];
var TOC=[T1,T2,T3];
function WA(a,e,fov,m,ex){return function(){return frameOn(ALL,a,e,fov||46,m||0.22,ex||TOC);};}
function PAN(a0,a1,e0,e1,t0,t1,fov,m,ex){return function(t){var u=ez(lin(t,t0,t1));return frameOn(ALL,lerp(a0,a1,u),lerp(e0,e1,u),fov||46,m||0.22,ex||TOC);};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.CALL1,PAN(-30,-24,58,56,0,T.CALL1)],
 [T.CALL1,8.2,PAN(-24,-12,56,52,T.CALL1,8.2)],
 [8.2,10.5,PAN(20,28,44,46,8.2,10.5)],
 [10.5,15.3,PAN(-20,-30,46,48,10.5,15.3)],
 [15.3,18.9,PAN(30,20,42,44,15.3,18.9)],
 [18.9,22.6,function(t){var u=ez(lin(t,18.9,22.6));return frameOn(ALL,lerp(62,50,u),lerp(48,44,u),46,0.1,[HP,T4]);}],
 [22.6,26.0,PAN(10,-6,46,44,22.6,26.0,46,0.22,[T1,T2,T3,T4])],
 [26.0,31.0,PAN(-14,8,40,38,26.0,31.0,46,0.22,[T1,T2,T3,T4])],
 [31.0,T.YAY,PAN(-10,15,50,60,31.0,T.YAY)],
 [T.YAY,T.ROW+0.5,WA(15,55)],
 [T.ROW+0.5,T.DANCE,function(t){return mixCam(frameOn(ALL,15,55,46,0.22,TOC),FL(),ez(lin(t,T.ROW+0.5,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.8,'bark'],[T.CALL1,'ta'],[T.GO1-0.3,'go'],[T.GO1,'run'],[6.4,'boing'],[8.4,'laugh'],[T.GO2-0.3,'go'],[T.GO2,'run'],[12.0,'boing'],[14.0,'whine'],
 [T.FETCH,'bark'],[20.8,'pop'],[T.DROP+0.3,'thud'],[22.8,'ta'],[T.CALL3,'go'],[T.HOP,'hops'],[29.6,'bark'],[T.GO4,'go'],[T.GO4,'run'],[35.2,'laugh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
// balões presos dentro da tela (não saem pelas bordas)
var _bv=new THREE.Vector3();
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*(w[4]||1);
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));
  _bv.set(p[0],p[1]+0.45*k,p[2]);var d=_bv.distanceTo(camPosV),tv=Math.tan(camera.fov*PI/360),hw=0.9*k/(d*tv*W/H),hh=0.45*k/(d*tv);
  _bv.project(camera);_bv.x=clamp(_bv.x,-1+hw+0.03,1-hw-0.03);_bv.y=Math.min(_bv.y,1-hh-0.03);_bv.unproject(camera);
  m.position.copy(_bv);m.quaternion.copy(camera.quaternion);}});}
