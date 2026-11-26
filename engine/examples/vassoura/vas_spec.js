// ===== Dança da Vassoura =====
makeBubs([['Parou a música, troca o par!',36],['Troca, troca!',62],['Ah, não! Fiquei com a vassoura!',32],['O Pipoca dança bem!',48],['Gira, Duda!',72],
 ['O Pipoca escolheu a vassoura!',34],['Que dupla!',80],['Volta aqui, Pipoca!',50],['O Pipoca é o rei da vassoura!',32],['Quem quer dançar com a vassoura?',30]]);
radio.position.set(2.6,0,-3.4);radio.rotation.y=yawTo([2.6,-3.4],[0,-0.6]);
var RB=[2.6,-3.4];
var T={ARR:3.0,M1:5.0,S1:12.5,M2:17.0,S2:24.5,M3:29.6,S3:36.0,ROW:39.6,YAY:40.0,DANCE:41.6,WAVE:55.5,END:60};
var END=T.END;
var MUS=[[T.M1,T.S1],[T.M2,T.S2],[T.M3,T.S3],[T.DANCE,END+2]];
function musicOn(t){return MUS.some(function(m){return t>=m[0]&&t<m[1];});}
function mt(t){var s=0;MUS.forEach(function(m){s+=clamp(t,m[0],m[1])-m[0];});return s;}
function th(t){return 0.6*Math.sin(0.85*mt(t));}
var SA=[-1.4,-1.3],SB=[1.4,-1.3],CD=[-0.25,0.4],PR=0.5;
function slot(sp,side,t){var a=th(t)+(side?PI:0);return [sp[0]+PR*Math.cos(a),sp[1]+PR*Math.sin(a)];}
var FIN={leo:[-1.95,1.6],bia:[-0.65,1.6],teo:[0.65,1.6],duda:[1.95,1.6]},DF=[0,2.5];
var STY={leo:0,bia:3,teo:2,duda:1};
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
// dança em par
function pairS(n,sp,side,t){var p=slot(sp,side,t),q=slot(sp,1-side,t),b=t*BPM/60,on=musicOn(t);
 var s={p:p,yaw:yawTo(p,q),pose:'none',face:'happy',A:{aLx:-1.25,aRx:-1.25,eL:-0.35,eR:-0.35,aLz:0.15,aRz:-0.15}};
 if(on){s.y=0.1*Math.abs(Math.sin(PI*b));s.roll=0.08*Math.sin(PI*b);s.face=(Math.floor(b/4)%2)?'tongue':'happy';}
 return s;}
function pairC(n,t0,t1,sp,side){return cust(t0,t1,function(t){return pairS(n,sp,side,t);});}
// dança com a vassoura (de frente para +x, vassoura na frente)
var SPINW=[21.5,23.0];
function broomS(t,spin){var b=t*BPM/60,on=musicOn(t);var y=PI/2;if(on)y+=0.25*Math.sin(PI*b/2);
 if(spin&&t>=SPINW[0]&&t<SPINW[1])y+=2*PI*ez(lin(t,SPINW[0],SPINW[1]));
 return {p:CD,yaw:y,pose:'none',face:on?'tongue':'happy',A:{aLx:-1.55,aRx:-1.55,eL:-0.45,eR:-0.45,aLz:0.1,aRz:-0.1},y:on?0.1*Math.abs(Math.sin(PI*b)):0};}
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
function runC(t0,t1,pts,pose){return mv(t0,t1,pts,pose||'run',{face:'happy'});}
// pontos de troca (θ congelado nas paradas)
var A0s1=slot(SA,1,0),A0s0=slot(SA,0,0),B0s1=slot(SB,1,0),B0s0=slot(SB,0,0);
var A1s0=slot(SA,0,T.S1),B1s0=slot(SB,0,T.S1);
var A2s0=slot(SA,0,T.S2),B2s0=slot(SB,0,T.S2);
var DQ=[0.15,-0.45];
(function(){
 // LÉO: sempre no par A, lado 1
 TL.leo=[hold(0,0.2,[-4.5,1.5],yawTo([-4.5,1.5],A0s1),'stand'),runC(0.2,2.6,[[-4.5,1.5],[-2.6,-0.6],A0s1]),pairC(2.6,T.S3+3.6,SA,1)];
 TL.leo[2]=cust(2.6,T.ROW,function(t){return pairS('leo',SA,1,t);});
 // BIA: A lado 0 -> B lado 0 (por trás) -> A lado 0 (por trás)
 TL.bia=[hold(0,0.2,[-3.2,-4.6],yawTo([-3.2,-4.6],A0s0),'stand'),runC(0.2,2.6,[[-3.2,-4.6],[-1.0,-2.6],A0s0]),pairC(2.6,T.S1+0.1,SA,0),
  runC(T.S1+0.1,13.7,[A1s0,[-0.6,-2.4],[1.2,-2.45],[2.25,-1.9],B1s0]),pairC(13.7,T.S2+0.2,SB,0),
  runC(T.S2+0.2,26.1,[B2s0,[2.25,-1.9],[1.2,-2.45],[-0.6,-2.4],A2s0]),pairC(26.1,T.ROW,SA,0)];
 // TEO: sempre no par B, lado 1
 TL.teo=[hold(0,0.2,[3.2,-4.6],yawTo([3.2,-4.6],B0s1),'stand'),runC(0.2,2.6,[[3.2,-4.6],[1.0,-2.6],B0s1]),cust(2.6,T.ROW,function(t){return pairS('teo',SB,1,t);})];
 // DUDA: B lado 0 -> (tenta o Léo) -> vassoura -> B lado 0
 TL.duda=[hold(0,0.2,[4.5,1.5],yawTo([4.5,1.5],B0s0),'stand'),runC(0.2,2.6,[[4.5,1.5],[2.6,-0.6],B0s0]),pairC(2.6,T.S1+0.2,SB,0),
  runC(T.S1+0.2,13.4,[B1s0,[1.2,-0.4],DQ]),
  turnTo(13.4,13.8,DQ,yawTo([1.2,-0.4],DQ),yawTo(DQ,A1s0),'none',{face:'wow',A:{aLx:-2.6,aRx:-2.6,aLz:-0.3,aRz:0.3,eL:-1.9,eR:-1.9}}),
  mv(13.8,14.3,[DQ,CD],'walk',{face:'wow'}),turnTo(14.3,14.5,CD,yawTo(DQ,CD),PI/2,'stand',{face:'happy'}),
  cust(14.5,T.S2+0.1,function(t){return broomS(t,true);}),
  runC(T.S2+0.1,25.5,[CD,[0.8,-0.3],B2s0]),pairC(25.5,T.ROW,SB,0)];
 // fila final
 Object.keys(FIN).forEach(function(n){var t0=T.ROW+(n==='bia'||n==='teo'?0.15:0);
  TL[n].push(cust(T.ROW,t0,function(t){var s=pairS(n,n==='leo'||n==='bia'?SA:SB,(n==='leo'||n==='teo')?1:0,T.S3);s.face='happy';return s;}));
  var p0=slot(n==='leo'||n==='bia'?SA:SB,(n==='leo'||n==='teo')?1:0,T.S3);
  TL[n].push(mv(t0,t0+1.2,[p0,FIN[n]],'walk',{face:'happy'}),turnTo(t0+1.2,t0+1.45,FIN[n],yawTo(p0,FIN[n]),0,'stand',{face:'happy'}),hold(t0+1.45,T.DANCE,FIN[n],0,'cheer',{face:'happy'}));
  TL[n]=TL[n].concat(tail(n));});
})();
// ----- reações (falas, risadas) por cima das poses -----
var LAUGHW=[[16.2,17.0],[27.8,29.4],[37.6,39.2]];
var RX={
 leo:[[3.1,4.9,{A:{aRx:-2.5,eR:-0.4,aLx:-1.2,eL:-0.35},face:'happy'}],[19.6,21.0,{face:'tongue'}]],
 teo:[[12.6,13.6,{A:{aLx:-2.7,aRx:-2.7,aLz:-0.3,aRz:0.3,eL:-0.2,eR:-0.2},face:'wow'}],[26.2,27.8,{A:{aRx:-1.6,eR:-0.1,aLx:-1.2},face:'happy'}]],
 bia:[[21.3,22.6,{A:{aRx:-2.6,eR:-0.3,aLx:-1.2},face:'happy'}],[32.0,33.4,{face:'tongue'}]],
 duda:[[14.6,16.2,{face:'wow'}],[36.6,38.0,{A:{aRx:-1.7,eR:-0.1,aLx:-1.2},face:'wow'}]]};
Object.keys(KIDS).forEach(function(n){TL[n]=TL[n].map(function(c){return {t0:c.t0,t1:c.t1,f:function(t,u){var s=c.f(t,u);
 if(t>T.S3&&t<T.ROW){var dp=dogState(t).p;s.yaw=lerpAng(s.yaw,yawTo(s.p,dp),0.8);}
 if(inW(t,LAUGHW)&&t<T.ROW&&!(n==='duda'&&t>=14.5&&t<T.S2)){s.pose='laugh';s.face='tongue';s.A=null;}
 (RX[n]||[]).forEach(function(w){if(t>=w[0]&&t<w[1]){if(w[2].A)s.A=Object.assign({},s.A||{},w[2].A),s.pose='none';s.face=w[2].face;}});
 return s;}};});});
// ----- Pipoca -----
function dogBroom(t){var b=t*BPM/60,on=musicOn(t);return {p:CD,yaw:PI/2+(on?0.3*Math.sin(PI*b/2):0),pose:'hind',lift:1,wig:on?1:0,tailF:on?34:18,tailA:1.1};}
function dogPair(t){var p=slot(SA,0,t),q=slot(SA,1,t),on=musicOn(t);return {p:p,yaw:yawTo(p,q),pose:'hind',lift:1,wig:on?1:0,tailF:34,tailA:1.1};}
var O=[0,-0.9],RL=2.7;function ringP(a){var q=a*PI/180;return [O[0]+RL*Math.cos(q),O[1]+RL*Math.sin(q)];}
DG=[hold(0,0.3,[-1.5,4.5],yawTo([-1.5,4.5],CD),'stand'),mv(0.3,2.5,[[-1.5,4.5],[-1.0,1.6],CD],'drun'),
 cust(2.5,2.9,function(t,u){return {p:CD,yaw:lerpAng(yawTo([-1.0,1.6],CD),PI/2,u),pose:'hind',lift:S(u,0,1)};}),
 cust(2.9,T.S1+0.05,dogBroom),
 cust(T.S1+0.05,T.S1+0.3,function(t,u){return {p:CD,yaw:PI/2,pose:'hind',lift:1-u};}),
 mv(T.S1+0.3,13.1,[CD,[-0.55,-0.35],A1s0],'drun',{tailF:34}),
 cust(13.1,13.4,function(t,u){var p=A1s0,q=slot(SA,1,T.S1);return {p:p,yaw:yawTo(p,q),pose:'hind',lift:S(u,0,1),tailF:34};}),
 cust(13.4,T.S2+0.05,dogPair),
 cust(T.S2+0.05,T.S2+0.25,function(t,u){var s=dogPair(t);s.lift=1-u;return s;}),
 mv(T.S2+0.25,25.3,[A2s0,[-0.55,-0.25],CD],'drun',{tailF:34}),
 cust(25.3,25.7,function(t,u){return {p:CD,yaw:lerpAng(yawTo([-0.55,-0.25],CD),PI/2,u),pose:'hind',lift:S(u,0.3,1),tailF:36};}),
 cust(25.7,T.S3+0.2,dogBroom),
 cust(T.S3+0.2,T.S3+0.4,function(t,u){return {p:CD,yaw:PI/2,pose:'hind',lift:1-u};}),
 mv(T.S3+0.4,37.0,[CD,[-0.1,1.2],ringP(90)],'drun',{tailF:36}),
 cust(37.0,39.2,function(t,u){var a=90+360*u,p=ringP(a);return {p:p,yaw:Math.atan2(-Math.sin(a*PI/180),Math.cos(a*PI/180)),pose:'drun',tailF:36};}),
 mv(39.2,39.5,[ringP(90),DF],'drun'),
 cust(39.5,END+2,function(t){var b=t*BPM/60;return {p:DF,yaw:t<T.DANCE?0:0.3*Math.sin(PI*b/2),pose:'hind',lift:S(t,39.5,39.8),wig:1,tailF:34,tailA:1.1};})];
// ----- vassoura -----
var BRM=new THREE.Group();BRM.rotation.order='YXZ';scene.add(BRM);BRM.scale.setScalar(1.25);
(function(){var st=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1.25,10),mat(0xb07a45));st.position.y=0.42+0.62;st.castShadow=true;BRM.add(st);
 var bb=box(0.42,0.32,0.12,0xf2c94c);bb.position.y=0.2;BRM.add(bb);var bn=box(0.2,0.12,0.14,0xe0484f);bn.position.y=0.42;BRM.add(bn);
 [-0.15,-0.05,0.05,0.15].forEach(function(x){var l=box(0.02,0.3,0.13,0xd9a62f);l.position.set(x,0.18,0);BRM.add(l);});})();
// dono: posição e rumo
function own(n,t){if(n==='dog'){var s=dogState(t);return {p:s.p,yaw:s.yaw,d:0.5};}var k=stateOf(n,t);return {p:k.p,yaw:k.yaw,d:0.42};}
function bAt(o){return [o.p[0]+o.d*Math.sin(o.yaw),o.p[1]+o.d*Math.cos(o.yaw)];}
var DROP1=bAt(own('dog',T.S1)),DROP2=bAt(own('duda',T.S2+0.05));
function broom(t){var o,bp,ly=0,yaw,rz=0;
 if(t<2.9){bp=bAt({p:CD,yaw:PI/2,d:0.5});yaw=PI/2;ly=0;}
 else if(t<T.S1){o=own('dog',t);bp=bAt(o);yaw=o.yaw;rz=0.12*Math.sin(t*PI*BPM/60);}
 else if(t<14.5){bp=DROP1;yaw=PI/2;ly=S(t,T.S1,T.S1+0.4)*(1-S(t,14.2,14.5));}
 else if(t<T.S2){o=own('duda',t);bp=bAt(o);yaw=o.yaw;rz=0.2*Math.sin(t*PI*BPM/120);}
 else if(t<25.7){bp=DROP2;yaw=own('duda',T.S2).yaw;ly=S(t,T.S2,T.S2+0.4)*(1-S(t,25.3,25.7));}
 else {o=own('dog',t);bp=bAt(o);yaw=o.yaw;rz=musicOn(t)?0.15*Math.sin(t*PI*BPM/60):0;if(t>T.S3+0.3&&t<39.5)rz=0.35;}
 BRM.position.set(bp[0],ly*0.05,bp[1]);BRM.rotation.set(-0.22*(1-ly)-1.5*ly,yaw,rz*(1-ly));}
// ----- rádio: luz e notinhas -----
EXTRA=function(t){broom(t);var on=musicOn(t);radioLight.material.color.setHex(on?0x34ff7a:0x333333);
 NOTES.forEach(function(m,i){if(!on){m.visible=false;return;}var ph=((t*0.7+i/6)%1);m.visible=true;var a=i*1.7;
  m.position.set(RB[0]+Math.sin(a)*(0.3+ph*0.6),0.9+ph*1.8,RB[1]+0.25+Math.cos(a)*0.2);m.scale.setScalar(0.6*Math.sin(PI*ph)+0.01);m.quaternion.copy(camera.quaternion);});};
BURST=[[T.YAY,[0,1.8],2.0],[T.DANCE,[0,1.8],2.2],[T.DANCE+3,[0,1.8],2.2]];
BW=[['Parou a música, troca o par!',3.1,4.9,kp('leo',2.9,1.1),1],['Troca, troca!',12.6,13.6,kp('teo',2.9,-0.4),1],
 ['Ah, não! Fiquei com a vassoura!',14.6,16.2,kp('duda',2.9,0.2),1],['O Pipoca dança bem!',19.6,21.0,kp('leo',2.9,0.3),1],['Gira, Duda!',21.3,22.6,kp('bia',2.9,-0.9),1],
 ['O Pipoca escolheu a vassoura!',26.2,27.8,kp('teo',2.9,-0.6),1],['Que dupla!',32.0,33.4,kp('bia',2.9,0),1],['Volta aqui, Pipoca!',36.6,38.0,kp('duda',2.9,-1.1),1],
 ['O Pipoca é o rei da vassoura!',40.2,41.8,kp('bia',2.9,0.4),1],['Quem quer dançar com a vassoura?',50.5,54.5,kp('duda',2.9,-0.6),1]];
function FU(c,d,z){var P=V(c.pos[0],c.pos[1],c.pos[2]),L=V(c.look[0],c.look[1],c.look[2]);_cam.position.copy(P);_cam.lookAt(L);_cam.updateMatrixWorld();var up=V(0,1,0).applyQuaternion(_cam.quaternion);
 P.addScaledVector(up,d);L.addScaledVector(up,d);P.copy(L.clone().add(P.clone().sub(L).multiplyScalar(z)));return {pos:[P.x,P.y,P.z],look:[L.x,L.y,L.z],fov:c.fov};}
var BX=[[-2.0,-1.8],[2.0,-1.8],[-0.4,0.9],[0.4,0.9]];
function CF(a,e){return FU(frameOn(ALL,a,e,46,0.2,BX),2.0,0.86);}
function WA(a,e){return function(){return CF(a,e);};}
function PAN(a0,a1,e0,e1,t0,t1){return function(t){var u=ez(lin(t,t0,t1));return CF(lerp(a0,a1,u),lerp(e0,e1,u));};}
var LAPC={pos:[0,0.2+17.5*Math.sin(56*PI/180),-2.3+17.5*Math.cos(56*PI/180)],look:[0,0.2,-2.3],fov:46};
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.ARR,PAN(-30,-8,52,44,0,T.ARR)],
 [T.ARR,T.M1,WA(-8,42)],
 [T.M1,T.S1,PAN(-20,20,42,40,T.M1,T.S1)],
 [T.S1,T.M2,PAN(10,0,46,48,T.S1,T.M2)],
 [T.M2,T.S2,PAN(25,-15,40,42,T.M2,T.S2)],
 [T.S2,T.M3,PAN(-10,5,46,46,T.S2,T.M3)],
 [T.M3,T.S3,PAN(15,-15,40,40,T.M3,T.S3)],
 [T.S3,T.ROW,function(){return LAPC;}],
 [T.ROW,T.DANCE,function(t){return mixCam(LAPC,FL(),ez(lin(t,T.ROW,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.6,'bark'],[T.ARR+0.1,'ta'],[T.M1,'on'],[T.S1,'off'],[T.S1+0.1,'run'],[14.5,'boing'],[16.2,'laugh'],[T.M2,'on'],[T.S2,'off'],[T.S2+0.1,'run'],[25.6,'bark'],
 [27.8,'laugh'],[T.M3,'on'],[T.S3,'off'],[T.S3+0.3,'run'],[36.5,'bark'],[37.6,'laugh'],[T.YAY,'confetti'],[T.DANCE,'on'],[T.DANCE,'confetti']];
