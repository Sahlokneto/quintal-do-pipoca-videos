// ===== Morto-Vivo =====
makeBubs([['Manda, Pipoca!',64],['Morto!',100],['Vivo!',110],['Ops!',110],['Morango!',90],['Morango não vale!',50],['Atchim!',96],['Ganhei!',96],['Agora é o Pipoca!',52],['Zzz...',100],['Acorda, Pipoca!',58],['Tô morto... de rir!',48]]);
radio.visible=false;
var CRATE=[0,-1.3],CH=0.5;
(function(){var g=new THREE.Group();g.position.set(CRATE[0],0,CRATE[1]);scene.add(g);
 var b=box(1.0,CH,0.9,0xb7793f);b.position.y=CH/2;g.add(b);
 [-0.3,0.3].forEach(function(x){var s=box(0.12,CH+0.02,0.92,0x8b5a2b);s.position.set(x,CH/2,0);g.add(s);});
 var tp=new THREE.Group();tp.position.set(0,CH,0);studs(tp,2,2,0,0xb7793f,0,0,0.42);g.add(tp);})();
var LP=[-1,0.4],BP=[1,0.4],TP=[-1,2.0],DP=[1,2.0];
var P0={leo:LP,bia:BP,teo:TP,duda:DP};
var OUT_T=[-2.3,1.4],OUT_L=[2.3,1.2];
var DC=[0,1.3],BL=[0,-0.4],W2={teo:[-1.8,0.6],leo:[1.8,1.4],duda:[-1.5,2.3]};
var FIN={teo:[-1.4,1.8],duda:[-0.47,1.8],bia:[0.47,1.8],leo:[1.4,1.8]},DFIN=[0,2.9];
var T={TRICK:12.2,MOR:19.8,SNZ:29.8,WIN:30.9,P2:32.6,ZZ:42.0,WAKE:46.6,ROW:49.6,END:60};
var END=T.END;
// comandos do Pipoca (fase 1) e da Bia (fase 2)
var C1=[[4.6,'M'],[6.2,'V'],[7.6,'M'],[8.8,'V'],[9.8,'M'],[10.8,'V'],[T.TRICK,'X'],
 [16.0,'M'],[17.0,'V'],[17.8,'M'],[18.6,'V'],[T.MOR,'R'],
 [24.6,'M'],[25.3,'V'],[25.9,'M'],[26.5,'V'],[27.0,'M'],[27.5,'V'],[28.0,'M'],[28.5,'V'],[T.SNZ,'S']];
var C2=[[35.6,'M'],[37.2,'V'],[38.4,'M'],[39.4,'V'],[40.6,'M'],[T.ZZ,'V']];
var WRONG={teo:T.TRICK,leo:T.MOR,duda:T.SNZ};
function crouchAt(n,t){var c=0;for(var i=0;i<C1.length;i++){var tc=C1[i][0],k=C1[i][1];if(t<tc+0.2)break;if(WRONG[n]!=null&&tc>WRONG[n])break;
  var tg=k==='M'?1:0;if(WRONG[n]===tc)tg=1;else if(k!=='M'&&k!=='V')tg=c;
  var sp=(WRONG[n]===tc)?[0.25,0.55]:[0.2,0.5];c=lerp(c,tg,S(t,tc+sp[0],tc+sp[1]));}return c;}
function vivoFlash(t){var f=0;C1.forEach(function(c){if(c[1]==='V'){var q=t-c[0]-0.2;if(q>0&&q<0.9)f=Math.max(f,Math.sin(PI*Math.min(1,q/0.9)));}});return f;}
function gameState(n,t){var c=crouchAt(n,t),f=vivoFlash(t)*(1-c);var p=P0[n];
 return {p:p,yaw:0,pose:'none',y:lerp(0,GROUND_Y,c)+0.06*f,sit:c,face:c>0.5?'happy':'focus',
  A:{aLx:lerp(-0.15-2.6*f,-1.0,c),aRx:lerp(-0.15-2.6*f,-1.0,c),aLz:-0.25*f,aRz:0.25*f,eL:lerp(-0.1,-0.9,c),eR:lerp(-0.1,-0.9,c),lL:-PI/2*c,lR:-PI/2*c}};}
function crouchHold(n,t0,t1,p,face,laugh){return cust(t0,t1,function(t){var s={p:p,yaw:0,pose:'none',y:GROUND_Y,sit:1,face:face,A:{aLx:-1.0,aRx:-1.0,eL:-1.1,eR:-1.1,lL:-PI/2,lR:-PI/2}};
 if(laugh){s.y+=0.03*Math.abs(Math.sin(t*13));s.roll=0.05*Math.sin(t*13);}return s;});}
function standUp(t0,t1,p){return cust(t0,t1,function(t,u){var c=1-S(u,0,1);return {p:p,yaw:0,pose:'none',y:lerp(0,GROUND_Y,c),sit:c,face:'happy',A:{aLx:-1.0*c,aRx:-1.0*c,lL:-PI/2*c,lR:-PI/2*c}};});}
var STY={leo:0,bia:3,teo:2,duda:1};
function danceO(n){return function(t){var b=t*BPM/60;return {st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};};}
function yw(a,b){return yawTo(a,b);}
// ----- crianças -----
(function(){var st={leo:[-5,-3],bia:[5,-3],teo:[-5,4],duda:[5,4]};
 Object.keys(KIDS).forEach(function(n){var p=P0[n];TL[n]=[hold(0,0.2,st[n],yw(st[n],p),'stand'),mv(0.2,2.9,[st[n],p],'run',{face:'happy'}),turnTo(2.9,3.3,p,yw(st[n],p),0,'stand',{face:'happy'}),
  hold(3.3,4.6,p,0,'look',{face:'happy'})];});
 TL.teo.push(cust(4.6,T.TRICK+0.9,function(t){return gameState('teo',t);}),crouchHold('teo',T.TRICK+0.9,13.9,TP,'tongue',true),standUp(13.9,14.3,TP),
  mv(14.3,15.6,[TP,[-1.9,1.7],OUT_T],'walk',{face:'happy'}),turnTo(15.6,15.9,OUT_T,yw(TP,OUT_T),0.5,'stand',{face:'happy'}),
  hold(15.9,19.9,OUT_T,0.5,'clap',{face:'happy'}),hold(19.9,22.4,OUT_T,0.5,'laugh',{face:'tongue'}),hold(22.4,24.4,OUT_T,0.5,'stand',{face:'happy'}),
  hold(24.4,T.SNZ,OUT_T,0.5,'clap',{face:'happy'}),hold(T.SNZ,T.WIN,OUT_T,0.5,'look',{face:'wow'}),hold(T.WIN,T.P2,OUT_T,0.5,'cheer',{face:'happy'}),
  hold(T.P2,33.2,OUT_T,0.5,'none',{A:{aRx:-1.7,eR:-0.2},face:'happy'}),mv(33.2,34.0,[OUT_T,W2.teo],'walk',{face:'happy'}),turnTo(34.0,34.3,W2.teo,yw(OUT_T,W2.teo),yw(W2.teo,DC),'stand'));
 TL.leo.push(cust(4.6,T.MOR+1.0,function(t){return gameState('leo',t);}),crouchHold('leo',T.MOR+1.0,21.8,LP,'wow',false),standUp(21.8,22.2,LP),
  mv(22.2,23.8,[LP,[0,1.2],[1.9,1.25],OUT_L],'walk',{face:'happy'}),turnTo(23.8,24.1,OUT_L,PI/2,-0.5,'stand',{face:'happy'}),
  hold(24.1,T.SNZ,OUT_L,-0.5,'clap',{face:'happy'}),hold(T.SNZ,T.WIN,OUT_L,-0.5,'look',{face:'wow'}),hold(T.WIN,33.2,OUT_L,-0.5,'clap',{face:'happy'}),
  mv(33.2,34.0,[OUT_L,W2.leo],'walk',{face:'happy'}),turnTo(34.0,34.3,W2.leo,yw(OUT_L,W2.leo),yw(W2.leo,DC),'stand'));
 TL.duda.push(cust(4.6,T.SNZ+1.0,function(t){return gameState('duda',t);}),crouchHold('duda',T.SNZ+1.0,32.4,DP,'tongue',true),standUp(32.4,32.8,DP),
  hold(32.8,33.4,DP,0,'stand',{face:'happy'}),mv(33.4,34.4,[DP,[0,2.9],W2.duda],'walk',{face:'happy'}),turnTo(34.4,34.6,W2.duda,yw([0,2.9],W2.duda),yw(W2.duda,DC),'stand'));
 TL.bia.push(cust(4.6,T.WIN,function(t){var s=gameState('bia',t);if(t>T.SNZ&&t<T.SNZ+0.8){s.face='wow';s.y+=0.12*Math.sin(clamp((t-T.SNZ)/0.4,0,1)*PI);}return s;}),
  hold(T.WIN,32.9,BP,0,'cheer',{face:'happy'}),hold(32.9,34.4,BP,0,'stand',{face:'happy'}),mv(34.4,35.3,[BP,[0.7,-0.3],BL],'walk',{face:'happy'}),turnTo(35.3,35.5,BL,yw([0.7,-0.3],BL),0,'stand'),
  cust(35.5,T.ZZ+1.0,function(t){var call=0;C2.forEach(function(c){var q=t-c[0]+0.1;if(q>0&&q<0.6)call=Math.sin(PI*q/0.6);});
   return {p:BL,yaw:0,pose:'none',face:call>0.1?'wow':'happy',A:{aRx:-0.2-2.5*call,aRz:0.2,eR:-0.2,aLx:-0.6,eL:-1.0},y:0.05*call};}),
  hold(T.ZZ+1.0,43.4,BL,0,'look',{face:'wow'}),hold(43.4,45.4,BL,0,'laugh',{face:'tongue'}),hold(45.4,T.WAKE+0.5,BL,0,'look',{face:'happy'}),hold(T.WAKE+0.5,48.0,BL,0,'laugh',{face:'tongue'}));
 // fase 2: observadores
 ['teo','leo','duda'].forEach(function(n){var p=W2[n],y=yw(p,DC);TL[n].push(cust(34.5,T.ZZ+0.8,function(t){var flop=0;
   [35.6,38.4,40.6].forEach(function(x){var q=t-x-0.6;if(q>0&&q<1.0)flop=1;});return {p:p,yaw:y,pose:flop?'laugh':'clap',face:flop?'tongue':'happy'};}),
  hold(T.ZZ+0.8,43.4,p,y,'look',{face:'wow'}),hold(43.4,45.4,p,y,'laugh',{face:'tongue'}),
  n==='duda'?hold(45.4,T.WAKE+0.4,p,y,'none',{A:{aLx:-1.4,aRx:-1.4,aLz:0.3,aRz:-0.3,eL:-0.8,eR:-0.8},face:'wow'}):hold(45.4,T.WAKE+0.4,p,y,'look',{face:'happy'}),
  hold(T.WAKE+0.4,48.0,p,y,'laugh',{face:'tongue'}));});
 // fila final
 var via={teo:[W2.teo,FIN.teo],bia:[BL,[0.9,0.6],FIN.bia],duda:[W2.duda,FIN.duda],leo:[W2.leo,FIN.leo]};
 Object.keys(KIDS).forEach(function(n){var pts=via[n];TL[n].push(mv(48.6,T.ROW,pts,'walk',{face:'happy'}),turnTo(T.ROW,T.ROW+0.3,FIN[n],yw(pts[pts.length-2],FIN[n]),0,'stand'),
  hold(T.ROW+0.3,55.5,FIN[n],0,'dance',danceO(n)),cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var DA=[-0.9,-1.7];
function callDog(t,list){var b=0;list.forEach(function(c){var q=t-c[0]+0.05;if(q>0&&q<0.3)b=Math.sin(PI*q/0.3);});return b;}
function flopAmt(t){var v=0;for(var i=0;i<C2.length;i++){var tc=C2[i][0],k=C2[i][1];if(t<tc+0.25)break;var tg=k==='M'?1:0;if(tc===T.ZZ)tg=1;v=lerp(v,tg,S(t,tc+0.25,tc+0.6));}
 if(t>T.WAKE)v=v*(1-S(t,T.WAKE,T.WAKE+0.35));return v;}
DG=[hold(0,0.2,[-4,-5],yw([-4,-5],DA),'stand'),mv(0.2,2.3,[[-4,-5],DA],'drun'),turnTo(2.3,2.5,DA,yw([-4,-5],DA),yw(DA,CRATE),'stand'),
 cust(2.5,2.95,function(t,u){var p=L2(DA,CRATE,ez(u));return {p:p,yaw:lerpAng(yw(DA,CRATE),0,u),pose:'drun',y:CH*S(u,0,0.75)+hopAt(t,2.5,0.45,0.45)};}),
 cust(2.95,T.P2+0.4,function(t){var b=callDog(t,C1),s={p:CRATE,yaw:0,pose:'stand',y:CH,hx:-0.35*b};s.y+=0.1*b;
  if(t>T.TRICK+0.9&&t<14.3){s.pose='party';}
  if(t>T.MOR+0.6&&t<22.4){s.pose='party';}
  if(t>T.SNZ-0.5&&t<T.SNZ+0.5){var q=t-(T.SNZ-0.5);s.hx=q<0.45?-0.4*S(q,0,0.45):0.6*Math.sin(PI*clamp((q-0.45)/0.5,0,1));s.pitch=q<0.45?-0.1:0.15*Math.sin(PI*clamp((q-0.45)/0.5,0,1));s.pose='stand';}
  if(t>T.WIN&&t<T.P2+0.4){s.pose='party';}
  return s;}),
 cust(T.P2+0.4,33.4,function(t,u){return {p:L2(CRATE,[0,-0.5],u),yaw:0,pose:'drun',y:CH*(1-u)+hopAt(t,T.P2+0.4,0.4,0.4)};}),
 mv(33.4,34.4,[[0,-0.5],DC],'dwalk'),
 cust(34.4,T.ROW-1.6,function(t){var f=flopAmt(t),r=f*PI/2,s={p:[DC[0]+0.48*Math.sin(r),DC[1]],yaw:0,pose:f>0.02?'none':'sit',roll:r,y:0.21*Math.sin(r)};
  if(f>0.02){s.legs=[0.15,0.15,-0.15,-0.15];s.tailA=0.1;s.hx=0;}
  // levanta no "Vivo!" com pulinho (e um giro no 2o)
  [37.2,39.4].forEach(function(x,i){var q=t-x-0.6;if(q>0&&q<0.6){s.pose='party';s.y=hopAt(q,0,0.6,0.45);if(i===1)s.yaw=2*PI*ez(q/0.6);}});
  if(t>T.ZZ+0.6&&t<T.WAKE){s.y+=0.015*Math.sin(t*4);s.legs=[0.1,0.1,-0.1,-0.1];}
  if(t>=T.WAKE){var q2=t-T.WAKE;s.y=Math.max(s.y,hopAt(q2,0,0.7,0.9));s.yaw=2*PI*ez(clamp(q2/0.7,0,1));if(q2>0.7){s.pose='party';}}
  return s;}),
 mv(T.ROW-1.6,T.ROW-0.7,[DC,DFIN],'dwalk'),hold(T.ROW-0.6,END+2,DFIN,0,'party')];
// ----- zzz -----
var ZM=[];(function(){for(var i=0;i<3;i++){var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d');x.fillStyle='#4a5bd1';x.font='900 100px system-ui';x.textAlign='center';x.textBaseline='middle';x.fillText('z',64,64);
 var tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;var m=new THREE.Mesh(new THREE.PlaneGeometry(0.4,0.4),new THREE.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}));m.visible=false;scene.add(m);ZM.push(m);}})();
function EXTRAfn(t){ZM.forEach(function(m,i){var on=t>T.ZZ+0.8&&t<T.WAKE;if(!on){m.visible=false;return;}var ph=((t*0.6+i/3)%1);m.visible=true;var hp=dog.head.localToWorld(V(0,0.25,0.1));
 m.position.set(hp.x+0.15+ph*0.5,hp.y+0.1+ph*1.0,hp.z);m.scale.setScalar(0.5+ph*0.9);m.quaternion.copy(camera.quaternion);});}
EXTRA=EXTRAfn;
BURST=[[T.WIN,[1,0.4]],[T.ROW,[0,1.4]],[T.ROW+2.3,[0,1.4]]];
BW=[['Manda, Pipoca!',3.2,4.4,kp('bia',2.6,0.2),1]];
C1.forEach(function(c){var w=c[1]==='M'?'Morto!':c[1]==='V'||c[1]==='X'?'Vivo!':c[1]==='R'?'Morango!':'Atchim!';var d=(c[0]>24&&c[0]<29)?0.45:(c[1]==='R'||c[1]==='S')?1.1:0.8;BW.push([w,c[0],c[0]+d,dp(1.25),(c[1]==='R'||c[1]==='S')?1.0:0.8]);});
C2.forEach(function(c){BW.push([c[1]==='M'?'Morto!':'Vivo!',c[0],c[0]+0.9,kp('bia',2.6),0.85]);});
BW.push(['Ops!',T.TRICK+0.8,T.TRICK+2.0,kp('teo',2.0),1],['Morango não vale!',T.MOR+1.0,T.MOR+2.6,kp('leo',2.0,0.3),1],['Ganhei!',T.WIN,T.WIN+1.4,kp('bia',2.7),1],
 ['Agora é o Pipoca!',T.P2,T.P2+1.5,kp('teo',2.6,0.6),1],['Zzz...',T.ZZ+1.2,T.ZZ+2.8,dp(0.9,0.2),0.85],['Acorda, Pipoca!',T.WAKE-1.5,T.WAKE-0.1,kp('duda',2.6,0.7),1],
 ['Tô morto... de rir!',52.0,55.0,function(){return [0,2.6,1.8];},1]);
var CR=[[0,-1.3],[-0.5,-1.3],[0.5,-1.3]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||50,m||0.1,CR);};}
SH=[[0,3.2,function(t){return frameOn(ALL,lerp(25,0,ez(lin(t,0,3.0))),lerp(42,24,ez(lin(t,0,3.0))),50,0.1,CR);}],
 [3.2,12.0,function(t){return frameOn(ALL,lerp(-24,-8,ez(lin(t,3.2,12))),32,50,0.1,CR);}],
 [12.0,16.0,A_(-28,28,46)],
 [16.0,19.6,A_(18,32)],
 [19.6,24.2,A_(-16,32,46)],
 [24.2,29.6,function(t){return frameOn(ALL,lerp(-14,14,ez(lin(t,24.2,29.6))),30,lerp(50,44,lin(t,24.2,29.6)),0.1,CR);}],
 [29.6,32.6,A_(0,30,46)],
 [32.6,35.6,A_(-14,28)],
 [35.6,42.0,function(t){return frameOn(ALL,lerp(-8,12,ez(lin(t,35.6,42.0))),26,48,0.08);}],
 [42.0,48.2,function(){return frameOn(ALL,8,22,44,0.08);}],
 [48.2,T.ROW,function(t){return mixCam(frameOn(ALL,8,22,44,0.08),frameLow(ALL,0,16,50,0.06),ez(lin(t,48.2,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[];C1.forEach(function(c){EV.push([c[0],c[1]]);});C2.forEach(function(c){EV.push([c[0],'B'+c[1]]);});
EV.push([T.TRICK+0.45,'oops'],[T.MOR+0.45,'oops'],[T.WIN,'win'],[T.ZZ+1.2,'zzz'],[T.WAKE,'wake'],[T.ROW,'confetti'],[35.9,'flop'],[38.7,'flop'],[40.9,'flop'],[37.8,'hop'],[40.0,'hop'],[43.4,'laugh'],[T.TRICK+0.9,'laugh'],[T.WAKE+0.4,'laugh']);
