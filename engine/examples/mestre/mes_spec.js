// ===== Siga o Mestre =====
makeBubs([['Siga o mestre!',64],['Tonto, Pipoca?',62],['Flamingo!',80],['Uou!',96],['Au! Au!',90],['Robô!',96],['Que pulão!',72],['Agora é o Pipoca!',50],
 ['Ele mandou sentar!',50],['Dá a patinha!',62],['Siga o Pipoca!',62],['Amanhã eu sou o mestre!',42]]);
radio.visible=false;
var SL=[[0,1.9],[0.9,0.4],[-0.9,-1.1],[0.9,-2.6],[-0.9,-4.1]];
var STY={leo:0,bia:3,teo:2,duda:1};
var T={ARR:3.0,S1:11.4,S2:20.6,S3:29.8,CONGA:38.4,STOP:45.0,DANCE:46.6,WAVE:55.5,END:60};
var END=T.END,DLY=0.35;
var ORD=[[0,['leo','bia','teo','dog','duda']],[T.S1,['bia','teo','dog','duda','leo']],[T.S2,['teo','dog','duda','leo','bia']],[T.S3,['dog','duda','leo','bia','teo']]];
var ACTS=[[5.0,1.6,'jump'],[7.3,1.4,'spin'],[13.6,2.2,'flamingo'],[17.2,1.8,'clap'],[22.8,2.4,'robot'],[26.4,1.8,'frog'],[32.0,2.4,'sit'],[35.0,1.8,'paw']];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function polyLen(P){var c=[0];for(var i=1;i<P.length;i++)c.push(c[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));return c;}
function polyAt(P,c,d){d=clamp(d,0,c[c.length-1]);for(var i=1;i<P.length;i++){if(d<=c[i]||i===P.length-1){var w=(c[i]-c[i-1])>1e-6?clamp((d-c[i-1])/(c[i]-c[i-1]),0,1):1;return L2(P[i-1],P[i],w);}}return P[P.length-1];}
function slotIn(n,ord){return ord.indexOf(n);}
function ordAt(t){var o=ORD[0][1];ORD.forEach(function(e){if(t>=e[0]+2.0)o=e[1];});return o;}
// posição base na fila (com trocas)
var BACKP=function(){return [SL[0],[2.2,1.2],[2.2,-4.4],SL[4]];};
function place(n,t){for(var i=1;i<ORD.length;i++){var ts=ORD[i][0];if(t>=ts&&t<ts+2.0){var prev=ORD[i-1][1],k=slotIn(n,prev);
   if(k===0){var P=BACKP(),c=polyLen(P),u=clamp((t-ts)/1.8,0,1),d=(0.85*u+0.15*ez(u))*c[c.length-1];var p=polyAt(P,c,d),a=polyAt(P,c,d-0.05),b=polyAt(P,c,d+0.05);
    if(t>=ts+1.8)return {p:SL[4],yaw:lerpAng(yawTo(P[2],P[3]),0,ez(lin(t,ts+1.8,ts+2.0))),pose:'stand',mov:true};return {p:p,yaw:Math.atan2(b[0]-a[0],b[1]-a[1]),pose:'run',mov:true};}
   var u2=S(t,ts+0.1,ts+1.0);return {p:L2(SL[k],SL[k-1],u2),yaw:0,pose:(t<ts+1.0)?'walk':'stand',mov:t<ts+1.0};}}
 return {p:SL[slotIn(n,ordAt(t))],yaw:0,pose:'stand',mov:false};}
function actAt(n,t){var k=slotIn(n,ordAt(t));var r=null;ACTS.forEach(function(a){var tt=t-a[0]-k*DLY;if(tt>=0&&tt<a[1])r={tt:tt,d:a[1],ty:a[2],u:tt/a[1],k:k};});return r;}
// ----- trenzinho -----
var CP=[SL[4],SL[3],SL[2],SL[1],SL[0],[2.0,2.4],[3.2,0.6],[3.0,-3.0],[0,-4.9],[-3.0,-3.0],[-3.4,0.2],[-2.6,0.9],[3.6,0.9]];
var CC=polyLen(CP);var ROWS=CC[11];
var FIN={duda:[1.95,0.9],leo:[0.65,0.9],bia:[-0.65,0.9],teo:[-1.95,0.9]},DSTOP=[3.0,0.9],DF=[0,2.0];
var CO4=ORD[3][1];
function s0(n){return CC[4-slotIn(n,CO4)];}
function sStop(n){var x=n==='dog'?DSTOP[0]:FIN[n][0];return ROWS+(x+2.6);}
var VC=(sStop('teo')-s0('teo'))/(T.STOP-0.4-T.CONGA);
function conga(n,t){var tt=t-T.CONGA,ramp=tt<0.4?tt*tt/0.8:tt-0.2;var s=Math.min(s0(n)+VC*ramp,sStop(n));var p=polyAt(CP,CC,s),a=polyAt(CP,CC,s-0.06),b=polyAt(CP,CC,s+0.06);
 var done=s>=sStop(n)-1e-4;return {p:p,yaw:done?0:Math.atan2(b[0]-a[0],b[1]-a[1]),done:done};}
// ----- poses das crianças -----
function kidAct(s,a,n,t){var tt=a.tt,u=a.u;
 if(a.ty==='jump'){s.pose='cheer';s.y=hopAt(tt,0.15,0.6,0.45)+hopAt(tt,0.85,0.6,0.45);s.face='happy';}
 if(a.ty==='spin'){s.yaw=2*PI*ez(u);s.pose='none';s.A={aLx:-0.2,aRx:-0.2,aLz:-1.3,aRz:1.3,eL:0,eR:0};s.face='happy';}
 if(a.ty==='flamingo'){var k=S(tt,0,0.3)*(1-S(tt,a.d-0.3,a.d));s.pose='none';s.A={aLx:0,aRx:0,aLz:-1.4*k,aRz:1.4*k,eL:0,eR:0,lR:-1.3*k};s.roll=0.06*Math.sin(t*5)*k;s.face='focus';
  if(n==='teo'){s.roll=(0.06+0.22*S(tt,0.6,1.1))*Math.sin(t*8)*k;s.face=tt>0.9?'wow':'focus';if(tt>1.25&&tt<1.75){s.y=hopAt(tt,1.25,0.5,0.25);s.A.lR=0;s.A.aLz=-1.0;s.A.aRz=1.0;}}}
 if(a.ty==='clap'){var cc=Math.abs(Math.sin(tt*PI*2.5));s.pose='none';s.A={aLx:-2.9,aRx:-2.9,aLz:lerp(-0.5,0.05,cc),aRz:lerp(0.5,-0.05,cc),eL:-0.1,eR:-0.1};s.face='happy';s.y=0.04*cc;}
 if(a.ty==='robot'){var q=Math.floor(tt*4)%4;var cfg=[[-1.57,-0.3],[-0.3,-1.57],[-1.57,-1.57],[-0.3,-0.3]][q];s.pose='none';s.A={aLx:cfg[0],aRx:cfg[1],aLz:0.1,aRz:-0.1,eL:-1.5,eR:-1.5};
  s.yaw=[0.35,-0.35,0.35,0][q]*(1-S(tt,a.d-0.25,a.d));s.face='focus';}
 if(a.ty==='frog'){s.pose='none';var sq=S(tt,0,0.4)*(1-S(tt,0.6,0.7));var hp=hopAt(tt,0.65,0.7,0.6);s.y=-0.22*sq+hp;s.pitch=0.3*sq;s.A=hp>0.01?{aLx:-2.9,aRx:-2.9,aLz:-0.3,aRz:0.3,eL:-0.1,eR:-0.1}:{aLx:-0.6*sq,aRx:-0.6*sq,eL:-0.6,eR:-0.6,lL:-0.9*sq,lR:-0.9*sq};s.face=hp>0.01?'happy':'focus';}
 if(a.ty==='sit'){var dn=S(tt,0,0.35),up=S(tt,a.d-0.4,a.d),k2=dn*(1-up);if(k2>0.99){s.pose='sitg';s.y=0;s.A={aLx:-0.4,aRx:-0.4,eL:-0.5,eR:-0.5};s.face=(n==='duda'||n==='teo')?'tongue':'happy';}
  else{s.pose='none';s.y=lerp(0,GROUND_Y,k2);s.sit=k2;s.A={lL:-k2*PI/2,lR:-k2*PI/2};s.face='happy';}}
 if(a.ty==='paw'){var k3=S(tt,0,0.3)*(1-S(tt,a.d-0.3,a.d));s.pose='none';s.A={aRx:-1.6*k3,eR:-0.1,aLx:-0.2,eL:-0.3};s.face='tongue';}
 return s;}
var LAUGH=[[9.9,11.2],[33.0,34.4]];
function kidS(n,t){var b=place(n,t);var s={p:b.p,yaw:b.yaw,pose:b.pose,face:'happy'};if(b.mov)return s;
 var a=actAt(n,t);if(a)return kidAct(s,a,n,t);
 if(inW(t,LAUGH)&&n!=='teo'){s.pose='laugh';s.face='tongue';}
 return s;}
(function(){Object.keys(KIDS).forEach(function(n){var k=slotIn(n,ORD[0][1]),p=SL[k],st=[-5.5,p[1]-1.0];
  TL[n]=[hold(0,0.2,st,PI/2,'stand'),mv(0.2,2.6,[st,[p[0]-1.4,p[1]],p],'run',{face:'happy'}),turnTo(2.6,T.ARR,p,PI/2,0,'stand',{face:'happy'}),
   cust(T.ARR,T.CONGA,function(t){return kidS(n,t);}),
   cust(T.CONGA,T.DANCE,function(t){var c=conga(n,t);if(!c.done)return {p:c.p,yaw:c.yaw,pose:'run',face:(Math.floor(t*2)%2)?'tongue':'happy'};return {p:c.p,yaw:0,pose:'cheer',face:'happy'};}),
   cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];});})();
// ----- Pipoca -----
function dogS(t){var b=place('dog',t);var s={p:b.p,yaw:b.yaw,pose:b.pose==='run'?'drun':(b.pose==='walk'?'dwalk':'stand')};if(b.mov)return s;
 // giro com tontura (passa do ponto)
 if(t>=8.35&&t<11.4){var tt=t-8.35;if(tt<2.2){s.yaw=2*PI*3.5*(1-(1-tt/2.2)*(1-tt/2.2));s.pose='drun';}else{s.yaw=2*PI*3.5+0.4*Math.sin(t*5);s.roll=0.18*Math.sin(t*6)*(1-S(t,10.8,11.4));s.pose='stand';s.hz=0.3*Math.sin(t*4);}return s;}
 var a=actAt('dog',t);if(!a)return s;var tt=a.tt;
 if(a.ty==='jump'){s.y=hopAt(tt,0.15,0.6,0.45)+hopAt(tt,0.85,0.6,0.45);s.legs=s.y>0.02?[-0.8,-0.8,0.8,0.8]:null;}
 if(a.ty==='flamingo'){s.pose='hind';s.lift=S(tt,0,0.3)*(1-S(tt,a.d-0.3,a.d));s.wig=0.4;}
 if(a.ty==='clap'){s.pose='bark';}
 if(a.ty==='robot'){s.pose='party';}
 if(a.ty==='frog'){var hp=hopAt(tt,0.6,0.9,1.15);s.y=hp;s.pitch=hp>0.01?-0.5+1.0*lin(tt,0.6,1.5):0;s.legs=hp>0.01?[-1.0,-1.0,1.0,1.0]:null;s.tailF=36;}
 if(a.ty==='sit'){s.pose='sit';}
 if(a.ty==='paw'){s.pose='paw';s.pw=S(tt,0,0.3)*(1-S(tt,a.d-0.3,a.d));}
 return s;}
DG=[hold(0,0.2,[-5.5,-3.05],PI/2,'stand'),mv(0.2,2.6,[[-5.5,-3.05],[-2.0,-2.05],SL[3]],'drun'),turnTo(2.6,T.ARR,SL[3],PI/2,0,'stand'),
 cust(T.ARR,T.CONGA,dogS),
 cust(T.CONGA,T.STOP+0.3,function(t){var c=conga('dog',t);return {p:c.p,yaw:c.yaw,pose:c.done?'stand':'drun',tailF:30};}),
 mv(T.STOP+0.3,46.2,[DSTOP,[2.6,2.0],DF],'dwalk'),turnTo(46.2,46.5,DF,yawTo([2.6,2.0],DF),0,'sit'),hold(46.5,END+2,DF,0,'party')];
EXTRA=function(t){};
BURST=[[T.STOP,[0,0.9],2.2],[T.DANCE+2,[0,0.9],2.2]];
BW=[['Siga o mestre!',3.2,4.8,kp('leo',2.9,0.4),1],['Tonto, Pipoca?',9.7,11.1,kp('leo',2.6,-0.2),0.85],['Flamingo!',13.6,15.0,kp('bia',2.9,0.5),1],['Uou!',15.0,16.3,kp('teo',2.2,-0.9),0.9],
 ['Au! Au!',18.0,19.3,dp(1.3,0.3),0.9],['Robô!',23.0,24.4,kp('teo',2.9,0.5),1],['Que pulão!',27.8,29.2,kp('duda',2.9,0.5),1],['Agora é o Pipoca!',30.2,31.7,kp('leo',2.9,0.5),1],
 ['Ele mandou sentar!',32.9,34.4,kp('duda',2.0,-0.4),1],['Dá a patinha!',35.4,36.8,kp('leo',2.9,0.5),1],['Siga o Pipoca!',38.8,40.3,kp('bia',2.9,0.2),1],
 ['Amanhã eu sou o mestre!',50.4,54.8,kp('duda',2.9,-0.6),1]];
var EXL=[[0,2.4],[0,-4.5]],EXC=[[3.2,0],[-3.4,0],[0,-4.9],[0,2.4]];
function LN(a,e){return function(){return frameC(ALL,a,e,46,0.2,EXL);};}
function LP(a0,a1,e,t0,t1){return function(t){return frameC(ALL,lerp(a0,a1,ez(lin(t,t0,t1))),e,46,0.2,EXL);};}
SH=[[0,T.ARR,function(t){return frameC(ALL,lerp(-30,8,ez(lin(t,0,T.ARR))),lerp(54,46,ez(lin(t,0,T.ARR))),48,0.2,EXL);}],
 [T.ARR,T.S1,LP(8,14,46,T.ARR,T.S1)],
 [T.S1,T.S2,LP(-8,-14,46,T.S1,T.S2)],
 [T.S2,T.S3,LP(12,6,44,T.S2,T.S3)],
 [T.S3,T.CONGA,LP(-8,-14,46,T.S3,T.CONGA)],
 [T.CONGA,T.STOP,function(t){return mixCam(frameC(ALL,-12,46,46,0.2,EXL),frameOn(ALL,0,52,48,0.06,EXC),ez(lin(t,T.CONGA,T.CONGA+1.2)));}],
 [T.STOP,T.DANCE,function(t){return mixCam(frameOn(ALL,0,52,48,0.06,EXC),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.STOP,T.DANCE)));}],
 [T.DANCE,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.8,'bark'],[3.2,'ta'],[T.S1,'swap'],[T.S2,'swap'],[T.S3,'swap'],[9.7,'laugh'],[33.0,'laugh'],[T.CONGA,'bark'],[T.STOP,'confetti']];
ACTS.forEach(function(a){for(var k=0;k<5;k++)EV.push([a[0]+k*DLY,a[2]]);});
EV.push([8.35,'dizzy']);
