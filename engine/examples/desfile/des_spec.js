// ===== Desfile de Fantasias =====
makeBubs([['Desfile de fantasias!',52],['Arrr! Sou pirata!',54],['Princesa Bia chegou!',46],['Pulo de astronauta!',46],['Super Duda!',72],
 ['Cadê o Pipoca?',58],['Que chique, Pipoca!',50],['O Pipoca venceu!',54],['Amanhã tem fantasia nova!',40]]);
radio.visible=false;
var SP={leo:[-1.5,-1.0],teo:[-1.5,0.4],bia:[1.5,-1.0],duda:[1.5,0.4]},DJ=[1.6,1.7];
var P0=[0,-2.2],PF=[0,0.8],BAU=[0,-3.2];
var FIN={teo:[-1.95,0.6],leo:[-0.65,0.4],bia:[0.65,0.4],duda:[1.95,0.6]},DF=[0,1.8];
var T={ARR:3.0,OPEN:4.4,FLY:4.7,leo:6.6,bia:13.2,teo:19.8,duda:26.4,DOG:33.4,DIVE:35.0,POP:36.6,DRUN:37.4,DPOSE:39.8,FIM:41.4,ROW:43.6,WAVE:55.5,END:60};
var END=T.END;
var ORDK=['leo','bia','teo','duda'];
var STY={leo:0,bia:3,teo:2,duda:1};
function toStart(n){var s=SP[n],l=s[0]<0?-1:1;return s[1]>0?[s,[0.7*l,0.0],[0.6*l,-2.2],P0]:[s,[0.6*l,-2.2],P0];}
function toSpot(n){var s=SP[n],l=s[0]<0?-1:1;return s[1]>0?[PF,s]:[PF,[0.6*l,-0.2],s];}
function perf(t){for(var i=ORDK.length-1;i>=0;i--){if(t>=T[ORDK[i]])return ORDK[i];}return null;}
function perfP(t){if(t>=T.DOG)return dogState(t).p;var n=perf(t);if(!n)return [0,-1];var a=T[n];if(t<a+1.8)return P0;return stateOf(n,Math.min(t,a+5.8)).p;}
function posing(t){if(t>=T.DPOSE&&t<T.FIM+0.6)return true;var n=perf(t);if(!n||t>=T.DOG)return false;var a=T[n];return t>=a+4.4&&t<a+5.8;}
function aud(n,t0,t1){return cust(t0,t1,function(t){var p=SP[n];var s={p:p,yaw:yawTo(p,perfP(t)),pose:'look',face:'happy'};
 if(posing(t)){s.pose='clap';}
 if(t>T.DIVE+0.3&&t<T.POP){s.face='wow';s.pose='look';}
 if(t>=T.POP&&t<T.POP+1.2){s.face='wow';s.pose='none';s.A={aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};}
 if(t>=T.FIM){s.pose='cheer';}
 return s;});}
// estilo de cada desfile
function runway(n,t,u){var s={p:L2(P0,PF,u),yaw:0,pose:'walk',face:'happy'};
 if(n==='leo'){s.roll=0.14*Math.sin(t*5.5);s.yaw=0.15*Math.sin(t*5.5);s.A={aRx:-2.3,aRz:0.15,eR:-0.2};s.face='tongue';}
 if(n==='bia'){s.A={aLz:-0.45,aRz:0.45,aLx:-0.2,aRx:-0.2,eL:-0.3,eR:-0.3};s.roll=0.06*Math.sin(t*11);}
 if(n==='teo'){var k=(t*1.2)%1;s.pose='none';s.y=0.5*Math.sin(PI*k);s.A={aLz:-0.9,aRz:0.9,aLx:-0.3,aRx:-0.3,eL:-0.2,eR:-0.2,lL:-0.5*Math.sin(PI*k),lR:0.3*Math.sin(PI*k)};s.face='wow';}
 if(n==='duda'){s.pose='run';s.A={aRx:-2.9,aRz:0.05,eR:0,aLx:-0.2,eL:-0.4};s.face='focus';}
 return s;}
function strike(n,t,u){var s={p:PF,yaw:0,pose:'none',face:'happy'};
 if(n==='leo'){s.A={aRx:-2.95,aRz:0.25,eR:-0.1,aLx:-0.3,aLz:-0.55,eL:-1.9};s.face='tongue';s.roll=-0.08;}
 if(n==='bia'){s.yaw=2*PI*ez(clamp(u/0.55,0,1));s.A={aLx:-2.9,aLz:-0.35,eL:-0.2,aRz:0.6,aRx:-0.3,eR:-0.3};s.y=0.08*Math.sin(PI*clamp(u/0.55,0,1));}
 if(n==='teo'){var k=clamp(u/0.7,0,1);s.y=1.0*Math.sin(PI*k);s.A={aLx:-2.9,aRx:-2.9,aLz:-0.3,aRz:0.3,eL:-0.1,eR:-0.1,lL:-0.6*Math.sin(PI*k),lR:-0.6*Math.sin(PI*k)};s.face=k<1?'wow':'happy';}
 if(n==='duda'){s.A={aLx:-0.3,aRx:-0.3,aLz:-0.6,aRz:0.6,eL:-1.8,eR:-1.8};s.pitch=-0.08;s.face='focus';if(u>0.5)s.face='tongue';}
 return s;}
// ----- crianças -----
(function(){var st={leo:[-4.6,-4.0],bia:[4.6,-4.0],teo:[-4.6,3.0],duda:[4.6,3.0]};
 Object.keys(KIDS).forEach(function(n){var p=SP[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.7,[st[n],p],'run',{face:'happy'}),turnTo(2.7,T.ARR,p,yawTo(st[n],p),yawTo(p,[0,-1]),'stand',{face:'happy'})];});
 TL.duda.push(hold(T.ARR,T.OPEN,SP.duda,yawTo(SP.duda,[0,-1]),'none',function(t){return {face:'happy',A:{aRx:-2.7,aRz:0.3+0.3*Math.sin(t*8),eR:-0.3}};}));
 ['leo','bia','teo'].forEach(function(n){TL[n].push(hold(T.ARR,T.OPEN,SP[n],yawTo(SP[n],[0,-1]),'look',{face:'happy'}));});
 // recebe a fantasia
 Object.keys(KIDS).forEach(function(n,i){var ct=T.FLY+i*0.5+0.6;TL[n].push(cust(T.OPEN,ct+0.6,function(t){var s={p:SP[n],yaw:yawTo(SP[n],BAU),pose:'look',face:'wow'};
  if(t>ct){s.pose='cheer';s.face='happy';}return s;}));});
 Object.keys(KIDS).forEach(function(n,i){var ct=T.FLY+i*0.5+1.2,a=T[n];
  TL[n].push(aud(n,ct,a));
  TL[n]=TL[n].concat([mv(a,a+1.5,toStart(n),'walk',{face:'happy'}),turnTo(a+1.5,a+1.8,P0,PI,0,'stand',{face:'happy'}),
   cust(a+1.8,a+4.4,function(t,u){return runway(n,t,u);}),cust(a+4.4,a+5.8,function(t,u){return strike(n,t,u);}),
   mv(a+5.8,a+7.0,toSpot(n),'walk',{face:'happy'}),
   turnTo(a+7.0,a+7.3,SP[n],(function(){var q=toSpot(n);return yawTo(q[q.length-2],q[q.length-1]);})(),yawTo(SP[n],[0,-1]),'stand',{face:'happy'}),
   aud(n,a+7.3,T.FIM+0.6)]);});
 Object.keys(KIDS).forEach(function(n){var t0=T.FIM+0.6,t1=t0+1.4;
  TL[n].push(mv(t0,t1,[SP[n],FIN[n]],'walk',{face:'happy'}));
  TL[n].push(turnTo(t1,T.ROW,FIN[n],yawTo(SP[n],FIN[n]),0,'stand',{face:'happy'}));
  TL[n].push(cust(T.ROW,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}));
  TL[n].push(cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var DS=[4.0,4.4],DIVEP=[0,-2.45],POPP=[0,-2.2];
var DJY=-PI/2-0.25;
function dLook(t0,t1){return cust(t0,t1,function(t){var q=perfP(t);var y=yawTo(DJ,q);var s={p:DJ,yaw:y,pose:'sit'};if(posing(t)){s.pose='bark';}return s;});}
DG=[hold(0,0.4,DS,yawTo(DS,DJ),'stand'),mv(0.4,2.8,[DS,DJ],'drun'),turnTo(2.8,3.1,DJ,yawTo(DS,DJ),DJY,'sit'),dLook(3.1,T.DOG),
 mv(T.DOG,T.DIVE,[DJ,[0.4,1.6],[0,1.0],[0,-1.0],DIVEP],'drun'),
 cust(T.DIVE,T.DIVE+0.5,function(t,u){return {p:L2(DIVEP,BAU,u),yaw:PI,pose:'stand',y:0.9*Math.sin(PI*u)+0.2*u,pitch:0.8*u,legs:[-0.9,-0.9,0.9,0.9]};}),
 hold(T.DIVE+0.5,T.POP,[BAU[0],BAU[1]],PI,'stand',{y:-1.5}),
 cust(T.POP,T.POP+0.6,function(t,u){return {p:L2(BAU,POPP,u),yaw:lerpAng(PI,0,u),pose:'stand',y:1.3*Math.sin(PI*u)+0.2*(1-u),legs:[-0.9,-0.9,0.9,0.9],tailF:40};}),
 hold(T.POP+0.6,T.DRUN,POPP,0,'party'),
 mv(T.DRUN,T.DPOSE,[POPP,[0,0.9]],'dwalk',{tailF:34}),
 cust(T.DPOSE,T.FIM,function(t,u){return {p:[0,0.9],yaw:0,pose:'hind',still:1,lift:S(u,0,0.2),tailF:34,tailA:1.1,hx:0.85};}),
 cust(T.FIM,T.FIM+0.6,function(t,u){return {p:[0,0.9],yaw:0,pose:'hind',lift:1-u};}),
 cust(T.FIM+0.6,42.6,function(t,u){return {p:[0,0.9],yaw:0,pose:'party'};}),
 mv(42.6,43.4,[[0,0.9],DF],'dwalk'),hold(43.4,END+2,DF,0,'party')];
// ----- objetos -----
(function(){var c=box(1.1,0.04,3.9,0xd7263d);c.position.set(0,0.11,-0.7);c.castShadow=false;scene.add(c);
 [-0.58,0.58].forEach(function(x){var b=box(0.08,0.06,3.9,0xffd166);b.position.set(x,0.12,-0.7);b.castShadow=false;scene.add(b);});
 for(var i=0;i<4;i++){var st=box(0.16,0.06,0.16,0xffffff);st.position.set(0,0.14,-2.2+i*1.0);st.rotation.y=PI/4;st.castShadow=false;scene.add(st);}})();
var BAUG=new THREE.Group(),LID=new THREE.Group();(function(){BAUG.position.set(BAU[0],0,BAU[1]);scene.add(BAUG);
 var b=box(1.4,0.75,0.85,0x9b6a3c);b.position.y=0.375;BAUG.add(b);
 [-0.5,0.5].forEach(function(x){var s=box(0.12,0.77,0.87,0xffd166);s.position.set(x,0.375,0);BAUG.add(s);});
 LID.position.set(0,0.75,-0.43);BAUG.add(LID);var l=box(1.42,0.16,0.88,0x7a4f2a);l.position.set(0,0.08,0.43);LID.add(l);
 var lk=box(0.18,0.2,0.05,0xffd166);lk.position.set(0,-0.05,0.88);LID.add(lk);})();
// fantasias (grupos que seguem a cabeça/tronco)
function M(c,o){return mat(c,o);}
function piece(g,w,h,d,c,x,y,z,o){var m=box(w,h,d,c,o);m.position.set(x,y,z);g.add(m);return m;}
var COS=[];
function costume(n,kind,anchor,build){var g=new THREE.Group();scene.add(g);var inner=new THREE.Group();g.add(inner);build(inner);g.visible=false;COS.push({n:n,g:g,inner:inner,kind:kind,anchor:anchor});return g;}
costume('leo','hat','head',function(g){piece(g,1.35,0.22,0.75,0x22252b,0,1.08,0);var c=piece(g,0.9,0.45,0.5,0x22252b,0,1.35,0);
 piece(g,0.26,0.2,0.04,0xffffff,0,1.32,0.27);piece(g,1.0,0.07,0.04,0xd7263d,0,1.14,0.39);
 piece(g,0.24,0.2,0.03,0x111111,0.13,0.5,0.47);piece(g,0.98,0.05,0.02,0x111111,0,0.62,0.465);});
costume('bia','crown','head',function(g){piece(g,0.86,0.16,0.82,0xffc83d,0,1.12,0,{metalness:0.3});
 [[-0.37,-0.35],[0.37,-0.35],[-0.37,0.35],[0.37,0.35],[0,0.37],[0,-0.37]].forEach(function(q){piece(g,0.13,0.26,0.13,0xffc83d,q[0],1.3,q[1],{metalness:0.3});});
 piece(g,0.14,0.14,0.04,0xff4fa0,0,1.13,0.42);});
costume('bia','cape','inner',function(g){var p=new THREE.Group();p.position.set(0,2.55,-0.42);g.add(p);g.userData.piv=p;piece(p,1.25,1.7,0.06,0xff8fc4,0,-0.85,0);piece(p,1.3,0.12,0.12,0xffd166,0,0,0.02);});
costume('teo','helmet','head',function(g){var w=0xf4f6fa;piece(g,1.25,0.14,1.2,w,0,0.98,0);piece(g,1.25,1.05,0.12,w,0,0.45,-0.56);
 piece(g,0.12,1.05,1.2,w,-0.62,0.45,0);piece(g,0.12,1.05,1.2,w,0.62,0.45,0);piece(g,1.25,0.16,0.12,w,0,-0.05,0.56);
 var gl=new THREE.Mesh(new THREE.BoxGeometry(1.15,0.9,0.03),new THREE.MeshStandardMaterial({color:col(0x9fd8ff),transparent:true,opacity:0.28,roughness:0.1}));gl.position.set(0,0.47,0.6);g.add(gl);
 piece(g,0.06,0.4,0.06,0xb0b6c0,0.4,1.2,0);piece(g,0.14,0.14,0.14,0xff4f4f,0.4,1.42,0);piece(g,1.3,0.14,0.14,0x2f7de0,0,1.06,0.56);});
costume('duda','cape','inner',function(g){var p=new THREE.Group();p.position.set(0,2.55,-0.42);g.add(p);g.userData.piv=p;piece(p,1.25,1.75,0.06,0xd7263d,0,-0.88,0);piece(p,1.3,0.12,0.12,0xffd166,0,0,0.02);});
costume('duda','band','head',function(g){piece(g,1.0,0.13,0.96,0xffd166,0,0.74,0);piece(g,0.2,0.2,0.04,0xd7263d,0,0.74,0.49);});
costume('duda','star','inner',function(g){piece(g,0.38,0.38,0.04,0xffd166,0,2.05,0.39).rotation.z=PI/4;});
// Pipoca: coroa e capa
costume('dog','crown','dhead',function(g){piece(g,0.4,0.1,0.36,0xffc83d,0,0.24,0,{metalness:0.3});[[-0.16,-0.15],[0.16,-0.15],[-0.16,0.15],[0.16,0.15]].forEach(function(q){piece(g,0.08,0.14,0.08,0xffc83d,q[0],0.34,q[1],{metalness:0.3});});});
costume('dog','dcape','droot',function(g){var p=new THREE.Group();p.position.set(0,0.72,0.22);g.add(p);g.userData.piv=p;piece(p,0.5,0.06,0.7,0x7b3fe4,0,0,-0.35);piece(p,0.52,0.08,0.08,0xffd166,0,0.01,0.0);});
var _p=new THREE.Vector3(),_q=new THREE.Quaternion(),_s=new THREE.Vector3(),_b=new THREE.Vector3();
function anchorObj(c){if(c.anchor==='head')return KIDS[c.n].head;if(c.anchor==='inner')return KIDS[c.n].inner;if(c.anchor==='dhead')return dog.head;return dog.root;}
function arcV(a,b,u,h){var p=a.clone().lerp(b,u);p.y+=h*4*u*(1-u);return p;}
EXTRA=function(t){
 LID.rotation.x=-1.9*S(t,T.OPEN,T.OPEN+0.4)+(t>T.DIVE+0.4&&t<T.POP+0.3?0.15*Math.abs(Math.sin(t*14))*(t<T.POP-0.2?0.5:1)-1.9*(1-S(t,T.DIVE+0.4,T.DIVE+0.8))*0+0:0);
 if(t>T.DIVE+0.5&&t<T.POP){LID.rotation.x=-0.25-0.2*Math.abs(Math.sin(t*12));BAUG.rotation.z=0.04*Math.sin(t*20);}else{BAUG.rotation.z=0;if(t>=T.POP)LID.rotation.x=-1.9*S(t,T.POP-0.2,T.POP);}
 dog.root.visible=!(t>T.DIVE+0.5&&t<T.POP);
 COS.forEach(function(c,i){var a=anchorObj(c);a.updateMatrixWorld(true);a.matrixWorld.decompose(_p,_q,_s);
  var ki=ORDK.indexOf(c.n),ct=c.n==='dog'?T.POP:T.FLY+ki*0.5;
  if(t<ct){c.g.visible=false;return;}
  c.g.visible=c.n==='dog'?dog.root.visible:true;
  _b.set(BAU[0],0.9,BAU[1]);var u=c.n==='dog'?1:clamp((t-ct)/0.6,0,1);
  if(u<1){var tgt=_p.clone();if(c.anchor==='head')tgt.y+=0.6;c.g.position.copy(arcV(_b,tgt,ez(u),1.4));c.g.quaternion.copy(_q);c.g.scale.copy(_s).multiplyScalar(lerp(0.4,1,u));c.inner.position.set(0,0,0);if(c.anchor==='head'){c.inner.position.y=-0.6/_s.x*(1-u)*0;}c.g.rotateY(4*PI*(1-u));}
  else{c.g.position.copy(_p);c.g.quaternion.copy(_q);c.g.scale.copy(_s);}
  if(c.n==='dog'&&t<T.POP+0.3){c.g.scale.multiplyScalar(Math.max(0.01,back((t-T.POP)/0.3)));}
  var pv=c.inner.children[0]&&c.inner.userData.piv;if(pv){var mv_=0.2+0.12*Math.sin(t*9);if(c.n==='duda'&&t>T.duda+1.8&&t<T.duda+4.4)mv_=1.0+0.15*Math.sin(t*14);if(c.n==='dog')mv_=-0.1+0.08*Math.sin(t*9);pv.rotation.x=mv_;}
 });};
BURST=[[T.FIM,[0,0.2],2.4],[T.ROW,[0,-0.4],2.4],[T.ROW+2.8,[0,-0.4],2.4]];
function pk(n,dx){return function(){var p=KIDS[n].root.position;return [p.x+(dx||0),p.y+3.3,p.z];};}
BW=[['Desfile de fantasias!',2.9,4.4,kp('duda',2.9,-0.5),1],['Arrr! Sou pirata!',T.leo+4.4,T.leo+5.9,pk('leo'),1],['Princesa Bia chegou!',T.bia+4.4,T.bia+5.9,pk('bia'),1],
 ['Pulo de astronauta!',T.teo+4.5,T.teo+6.0,pk('teo'),1],['Super Duda!',T.duda+4.4,T.duda+5.9,pk('duda'),1],['Cadê o Pipoca?',35.4,36.8,kp('leo',2.9,0.5),1],
 ['Que chique, Pipoca!',38.2,39.7,kp('bia',3.1,-0.5),1],['O Pipoca venceu!',40.2,41.7,kp('teo',2.9,0.5),1],['Amanhã tem fantasia nova!',50.6,54.8,kp('duda',2.9,-0.3),1]];
var EXP=[[0,-3.6],[0,1.3],[1.6,2.0]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||46,m||0.1,EXP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(-28,0,ez(lin(t,0,T.ARR))),lerp(42,28,ez(lin(t,0,T.ARR))),48,0.1,EXP);}],
 [T.ARR,T.leo+1.8,A_(0,30)]];
ORDK.forEach(function(n,i){var a=T[n],sg=i%2?1:-1;SH.push([a+1.8,a+4.4,function(t){return frameOn(ALL,sg*lerp(14,4,lin(t,a+1.8,a+4.4)),lerp(16,22,lin(t,a+1.8,a+4.4)),46,0.1,EXP);}]);
 SH.push([a+4.4,(i<3?T[ORDK[i+1]]+1.8:T.DOG),A_(-sg*6,28)]);});
SH.push([T.DOG,T.DRUN,A_(-12,32)],[T.DRUN,T.FIM,function(t){return frameOn(ALL,lerp(10,0,lin(t,T.DRUN,T.FIM)),lerp(16,24,lin(t,T.DRUN,T.FIM)),46,0.1,EXP);}],
 [T.FIM,T.ROW,function(t){return mixCam(frameOn(ALL,0,26,46,0.1,EXP),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.FIM+0.6,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]);
EV=[[2.9,'bark'],[T.OPEN,'open']];
ORDK.forEach(function(n,i){EV.push([T.FLY+i*0.5,'fly'],[T.FLY+i*0.5+0.6,'pop'],[T[n]+1.8,n],[T[n]+4.4,'pose']);});
EV.push([T.DOG,'bark'],[T.DIVE+0.4,'dive'],[T.POP,'popd'],[T.DRUN,'dog'],[T.DPOSE,'pose'],[T.FIM,'confetti']);
