// ===== Estátua =====
makeBubs([['Música, Pipoca!',70],['Estátua!',90],['Ops!',110],['Cócegas!',86],['Hahaha!',90],['Ganhei!',96],['Agora é o Pipoca!',52],['O rabinho mexeu!',54],['Ninguém fica parado!',48]]);
radio.position.set(0,0,-1.9);radio.scale.setScalar(0.75);
var RB=[0,-1.9],DJ=[-0.85,-1.9];
var LP=[-1,0.2],BP=[1,0.2],TP=[-1,2],DP=[1,2],OUT_T=[-1.9,-0.9],OUT_L=[1.9,-0.9];
var FIN={teo:[-1.4,0.6],bia:[-0.47,0.6],duda:[0.47,0.6],leo:[1.4,0.6]},DFIN=[0,1.6];
var T={M1:4.6,S1:10.6,WOB:12.6,FALL:13.6,M2:17.0,S2:22.6,LICK:25.5,LAUGH:26.6,M3:30.4,S3:35.6,DD0:38.2,DD1:41.6,WIN:43.0,M4:46.2,S4:48.6,M5:52.0,ROW:53.4,END:60};
var END=T.END;
var MUSIC=[[T.M1,T.S1],[T.M2,T.S2],[T.M3,T.S3],[T.M4,T.S4],[T.M5,END+1]];
function musicOn(t){return MUSIC.some(function(m){return t>=m[0]&&t<m[1];});}
var STY={leo:0,bia:3,teo:2,duda:1};
function danceO(n){return function(t){var b=t*BPM/60;return {st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};};}
var FZ={
 1:{leo:{A:{aLx:0,aRx:0,aLz:-1.5,aRz:1.5,eL:0,eR:0},face:'focus'},bia:{A:{aLx:-3.0,aRx:-3.0,aLz:-0.2,aRz:0.2,eL:0,eR:0},face:'focus'},
    teo:{A:{lR:-1.2,lL:0,aLz:-1.2,aRz:1.2,aLx:0,aRx:0},face:'wow'},duda:{A:{aLx:-0.4,aLz:-0.9,eL:-1.7,aRx:-3.0,aRz:0.3,eR:-0.3},roll:-0.15,face:'focus'}},
 2:{leo:{A:{aRx:-1.5,eR:0,aLx:-2.8,aLz:-0.2,eL:-0.2,lL:-0.4},face:'focus'},bia:{A:{aLx:-1.6,aRx:-1.6,aLz:-0.3,aRz:0.3,eL:-0.9,eR:-0.9},roll:0.22,face:'focus'},
    duda:{A:{aLx:-1.5,aRx:-1.5,eL:0,eR:0,lL:-0.6,lR:-0.6},sit:0.35,y:-0.12,face:'tongue'}},
 3:{bia:{A:{aLx:-2.9,aRx:-2.9,aLz:0.35,aRz:-0.35,eL:-0.6,eR:-0.6,lL:-0.6},face:'focus'},duda:{A:{aLx:-1.9,aRx:-1.9,aLz:0.7,aRz:-0.7,eL:-2.2,eR:-2.2},face:'wow'}}};
function fz(k,n,t0,t1,p){var f=FZ[k][n];return hold(t0,t1,p,0,'none',function(t,u){var s={A:f.A,face:f.face,roll:f.roll||0,sit:f.sit||0,y:f.y||0};
 var q=t-t0;if(q<0.25){s.y+=0.12*Math.sin(q/0.25*PI);}return s;});}
// ----- crianças -----
(function(){var st={leo:[-5,-3],bia:[5,-3],teo:[-5,4],duda:[5,4]},P0={leo:LP,bia:BP,teo:TP,duda:DP};
 Object.keys(KIDS).forEach(function(n){var p=P0[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.9,[st[n],p],'run',{face:'happy'}),turnTo(2.9,3.3,p,yawTo(st[n],p),0,'stand',{face:'happy'}),
  hold(3.3,T.M1,p,0,'look',{face:'happy'}),hold(T.M1,T.S1,p,0,'dance',danceO(n)),fz(1,n,T.S1,n==='teo'?T.WOB:T.M2,p)];});
 // TEO: balança e cai
 TL.teo=TL.teo.concat([cust(T.WOB,T.FALL,function(t,u){var f=FZ[1].teo;return {p:TP,yaw:0,pose:'none',A:f.A,roll:0.06*Math.sin(t*14)*(0.4+u*1.6),face:'wow',y:0};}),
  cust(T.FALL,T.FALL+0.5,function(t,u){return {p:TP,yaw:0,pose:'none',y:lerp(0,GROUND_Y,u*u),sit:u,pitch:-0.3*u,face:'wow',A:{aLx:-2.6,aRx:-2.6,aLz:-0.5,aRz:0.5}};}),
  hold(T.FALL+0.5,15.2,TP,0,'sitg',function(t){return {face:'tongue',y:0.03*Math.abs(Math.sin(t*12)),A:{aLx:-1.0,aRx:-1.0,eL:-1.1,eR:-1.1}};}),
  cust(15.2,15.8,function(t,u){return {p:TP,yaw:0,pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.7)),sit:1-S(u,0,0.7),face:'happy'};}),
  mv(15.8,16.8,[TP,[-1.9,1.0],OUT_T],'walk',{face:'happy'}),turnTo(16.8,17.1,OUT_T,yawTo(TP,OUT_T),0.5,'stand',{face:'happy'}),
  hold(17.1,T.S2,OUT_T,0.5,'clap',{face:'happy'}),hold(T.S2,T.LAUGH,OUT_T,0.5,'look',{face:'wow'}),hold(T.LAUGH,28.2,OUT_T,0.5,'laugh',{face:'tongue'}),
  hold(28.2,T.M3,OUT_T,0.5,'stand',{face:'happy'}),hold(T.M3,T.S3,OUT_T,0.5,'clap',{face:'happy'}),hold(T.S3,T.DD1,OUT_T,0.5,'look',{face:'wow'}),hold(T.DD1,T.WIN+1.4,OUT_T,0.5,'laugh',{face:'tongue'}),
  mv(44.6,45.6,[OUT_T,[-1.3,-1.9],DJ],'walk',{face:'happy'}),turnTo(45.6,46.0,DJ,yawTo([-1.3,-1.9],DJ),PI/2,'stand'),
  hold(46.0,T.M5+0.4,DJ,PI/2,'none',function(t){var pr=Math.max(0,1-Math.abs(t-T.M4)/0.35,1-Math.abs(t-T.S4)/0.35,1-Math.abs(t-T.M5)/0.35);
   var lg=(t>50.3&&t<52.0);return {A:{aRx:lerp(-0.3,-1.0,pr),eR:-0.1,aLx:lg?-1.0:-0.3,eL:lg?-1.1:-0.5},face:lg?'tongue':(t>T.S4&&t<50.3?'wow':'happy'),y:lg?0.04*Math.abs(Math.sin(t*12)):0};}),
  mv(T.M5+0.4,T.ROW,[DJ,[-1.6,-1.0],FIN.teo],'walk',{face:'happy'}),turnTo(T.ROW,T.ROW+0.3,FIN.teo,PI*0.1,0,'stand')]);
 // LÉO
 TL.leo=TL.leo.concat([hold(T.M2,T.S2,LP,0,'dance',danceO('leo')),fz(2,'leo',T.S2,T.LAUGH,LP),
  hold(T.LAUGH,28.0,LP,0,'laugh',{face:'tongue'}),mv(28.0,29.5,[LP,[-0.3,-0.7],[1.4,-0.8],OUT_L],'walk',{face:'happy'}),turnTo(29.5,29.8,OUT_L,PI/2,-0.5,'stand'),
  hold(29.8,T.M3,OUT_L,-0.5,'stand',{face:'happy'}),hold(T.M3,T.S3,OUT_L,-0.5,'clap',{face:'happy'}),hold(T.S3,T.DD1,OUT_L,-0.5,'look',{face:'wow'}),hold(T.DD1,44.3,OUT_L,-0.5,'laugh',{face:'tongue'}),
  turnTo(44.3,44.6,OUT_L,-0.5,-0.6,'stand',{face:'happy'}),hold(44.6,T.M4,OUT_L,-0.6,'none',{A:{aRx:-1.6,eR:-0.2},face:'happy'}),hold(T.M4,T.S4,OUT_L,-0.6,'clap',{face:'happy'}),hold(T.S4,50.3,OUT_L,-0.6,'look',{face:'wow'}),hold(50.3,T.M5+0.4,OUT_L,-0.6,'laugh',{face:'tongue'}),
  mv(T.M5+0.4,T.ROW,[OUT_L,FIN.leo],'walk',{face:'happy'}),turnTo(T.ROW,T.ROW+0.3,FIN.leo,yawTo(OUT_L,FIN.leo),0,'stand')]);
 // BIA
 TL.bia=TL.bia.concat([hold(T.M2,T.S2,BP,0,'dance',danceO('bia')),fz(2,'bia',T.S2,T.M3,BP),hold(T.M3,T.S3,BP,0,'dance',danceO('bia')),fz(3,'bia',T.S3,T.WIN,BP),
  hold(T.WIN,44.4,BP,0,'cheer',{face:'happy'}),hold(44.4,T.M4,BP,0,'look',{face:'happy'}),hold(T.M4,T.S4,BP,0,'clap',{face:'happy'}),hold(T.S4,49.5,BP,0,'look',{face:'wow'}),
  hold(49.5,51.2,BP,0,'none',{A:{aRx:-1.5,eR:0,aRz:0.3,aLx:-0.5},face:'tongue'}),hold(51.2,T.M5+0.4,BP,0,'laugh',{face:'tongue'}),
  mv(T.M5+0.4,T.ROW,[BP,FIN.bia],'walk',{face:'happy'}),turnTo(T.ROW,T.ROW+0.3,FIN.bia,yawTo(BP,FIN.bia),0,'stand')]);
 // DUDA
 TL.duda=TL.duda.concat([hold(T.M2,T.S2,DP,0,'dance',danceO('duda')),fz(2,'duda',T.S2,T.M3,DP),hold(T.M3,T.S3,DP,0,'dance',danceO('duda')),fz(3,'duda',T.S3,T.DD1,DP),
  cust(T.DD1,44.4,function(t,u){return {p:DP,yaw:0,pose:'laugh',face:'tongue',pitch:0.2+0.08*Math.sin(t*13)};}),hold(44.4,T.M4,DP,0,'look',{face:'happy'}),hold(T.M4,T.S4,DP,0,'clap',{face:'happy'}),hold(T.S4,50.3,DP,0,'look',{face:'wow'}),hold(50.3,T.M5+0.4,DP,0,'laugh',{face:'tongue'}),
  mv(T.M5+0.4,T.ROW,[DP,FIN.duda],'walk',{face:'happy'}),turnTo(T.ROW,T.ROW+0.3,FIN.duda,yawTo(DP,FIN.duda),0,'stand')]);
 Object.keys(KIDS).forEach(function(n){TL[n].push(hold(T.ROW+0.3,55.5,FIN[n],0,'dance',danceO(n)));TL[n].push(cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
function press(t0,t1,tp){return cust(t0,t1,function(t){var q=1-Math.abs(t-tp)/0.3;return {p:DJ,yaw:PI/2,pose:'paw',pw:clamp(q,0,1)*1+0.0};});}
DG=[hold(0,0.2,[-4,-5],yawTo([-4,-5],DJ),'stand'),mv(0.2,2.8,[[-4,-5],[-1.8,-2.6],DJ],'drun'),turnTo(2.8,3.2,DJ,yawTo([-1.8,-2.6],DJ),PI/2,'sit'),
 hold(3.2,4.3,DJ,PI/2,'sit'),press(4.3,4.9,T.M1),hold(4.9,10.3,DJ,PI/2,'party'),press(10.3,10.9,T.S1),hold(10.9,11.8,DJ,PI/2,'bark'),
 mv(11.8,13.4,[DJ,[0,-0.9],[0,1.1]],'sniff'),turnTo(13.4,13.6,[0,1.1],0,-PI/2,'stand'),hold(13.6,14.8,[0,1.1],-PI/2,'bark'),
 mv(14.8,16.5,[[0,1.1],[0,-0.9],[-0.85,-1.2],DJ],'dwalk'),turnTo(16.5,16.7,DJ,PI,PI/2,'sit'),press(16.7,17.3,T.M2),hold(17.3,22.3,DJ,PI/2,'party'),press(22.3,22.9,T.S2),hold(22.9,23.6,DJ,PI/2,'bark'),
 mv(23.6,25.3,[DJ,[0,-0.8],[0,1.0],[-0.8,1.05]],'sniff'),turnTo(25.3,25.5,[-0.8,1.05],-PI/2,yawTo([-0.8,1.05],LP),'stand'),
 cust(T.LICK,T.LAUGH,function(t){return {p:[-0.8,1.05],yaw:yawTo([-0.8,1.05],LP),pose:'stand',hx:-0.45+0.25*Math.sin(t*16),pitch:-0.15,y:0.05};}),hold(T.LAUGH,28.6,[-0.8,1.05],yawTo([-0.8,1.05],LP),'party'),
 mv(28.6,30.0,[[-0.8,1.05],[0,1.0],[0,-0.9],[-0.85,-1.4],DJ],'dwalk'),turnTo(30.0,30.1,DJ,PI,PI/2,'sit'),press(30.1,30.7,T.M3),hold(30.7,35.3,DJ,PI/2,'party'),press(35.3,35.9,T.S3),hold(35.9,36.6,DJ,PI/2,'bark'),
 mv(36.6,37.9,[DJ,[0,-0.8],[-0.2,1.1]],'dwalk'),turnTo(37.9,38.2,[-0.2,1.1],0,PI/2,'stand'),
 cust(T.DD0,T.DD1,function(t,u){return {p:[-0.2,1.1],yaw:PI/2-0.45+0.25*Math.sin(t*3),pose:'hind',wig:1,lift:S(u,0,0.08)*(1-S(u,0.94,1))};}),hold(T.DD1,T.WIN,[-0.2,1.1],PI/2,'bark'),
 hold(T.WIN,44.6,[-0.2,1.1],PI/2,'party'),mv(44.6,45.6,[[-0.2,1.1],[0,1.3]],'dwalk'),turnTo(45.6,46.0,[0,1.3],PI/2,0,'stand'),
 cust(T.M4,T.S4,function(t,u){var q=t-T.M4;return {p:[0,1.3],yaw:(q>0.8&&q<1.6)?2*PI*(q-0.8)/0.8:0,pose:'party'};}),
 cust(T.S4,T.M5,function(t,u){var q=t-T.S4;return {p:[0,1.3],yaw:0,pose:'hind',still:1,lift:S(q,0,0.25),tailF:34,tailA:1.1,hx:0.85};}),
 cust(T.M5,T.M5+0.6,function(t,u){return {p:[0,1.3],yaw:0,pose:'hind',lift:1-u};}),mv(T.M5+0.6,T.ROW,[[0,1.3],DFIN],'dwalk'),hold(T.ROW,END+2,DFIN,0,'party')];
// ----- rádio: luz e notinhas -----
function EXTRAfn(t){var on=musicOn(t);radioLight.material.color.setHex(on?0x34ff7a:0x333333);
 NOTES.forEach(function(m,i){if(!on){m.visible=false;return;}var ph=((t*0.7+i/6)%1);m.visible=true;var a=i*1.7;
  m.position.set(RB[0]+Math.sin(a)*(0.3+ph*0.6),0.9+ph*1.8,RB[1]+0.25+Math.cos(a)*0.2);m.scale.setScalar(0.6*Math.sin(PI*ph)+0.01);m.quaternion.copy(camera.quaternion);});}
EXTRA=EXTRAfn;
BURST=[[T.WIN,[1,0.2]],[T.ROW,[0,0.8]],[T.ROW+2.2,[0,0.8]]];
BW=[['Música, Pipoca!',3.2,4.6,kp('duda',2.6,-0.2),1],['Estátua!',T.S1,T.S1+1.1,dp(1.2),0.9],['Ops!',T.FALL+0.2,T.FALL+1.4,kp('teo',2.0),1],['Estátua!',T.S2,T.S2+1.0,dp(1.2),0.9],
 ['Cócegas!',T.LAUGH,T.LAUGH+1.3,kp('leo',2.6),1],['Estátua!',T.S3,T.S3+1.0,dp(1.2),0.9],['Hahaha!',T.DD1+0.1,T.DD1+1.4,kp('duda',2.6,-0.7),1],['Ganhei!',T.WIN,T.WIN+1.3,kp('bia',2.7),1],
 ['Agora é o Pipoca!',44.4,45.9,kp('leo',2.6,-0.3),1],['O rabinho mexeu!',49.6,51.2,kp('bia',2.6),1],['Ninguém fica parado!',53.7,55.4,function(){return [0,2.6,0.6];},1]];
var RX=[[0,-2.3],[-0.5,-1.9],[0.5,-1.9]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||50,m||0.1,RX);};}
SH=[[0,3.4,function(t){return frameOn(ALL,lerp(25,0,ez(lin(t,0,3.2))),lerp(42,20,ez(lin(t,0,3.2))),50,0.1,RX);}],
 [3.4,T.M1,A_(0,30)],
 [T.M1,T.S1,function(t){return frameOn(ALL,lerp(-22,22,ez(lin(t,T.M1,T.S1))),28,50,0.1,RX);}],
 [T.S1,11.8,A_(0,32,48)],
 [11.8,15.8,A_(-28,30,48)],
 [15.8,T.M2,A_(0,30)],
 [T.M2,T.S2,function(t){return frameOn(ALL,lerp(20,-20,ez(lin(t,T.M2,T.S2))),28,50,0.1,RX);}],
 [T.S2,25.2,A_(10,32,48)],
 [25.2,28.0,function(){return frameOn(ALL,-22,22,44,0.05);}],
 [28.0,T.M3,A_(0,30)],
 [T.M3,T.S3,function(t){return frameOn(ALL,lerp(-20,20,ez(lin(t,T.M3,T.S3))),28,50,0.1,RX);}],
 [T.S3,37.9,A_(0,32,48)],
 [37.9,T.WIN,A_(-22,22,44,0.09)],
 [T.WIN,T.M4,A_(0,30)],
 [T.M4,T.M5+0.6,A_(-10,26,48)],
 [T.M5+0.6,T.ROW,function(t){return mixCam(frameOn(ALL,-10,26,48,0.1,RX),frameLow(ALL,0,16,50,0.06),ez(lin(t,T.M5+0.6,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[];MUSIC.forEach(function(m){EV.push([m[0],'on']);if(m[1]<END)EV.push([m[1],'off']);});EV.push([T.FALL,'fall'],[T.LAUGH,'laugh'],[T.DD1,'laugh'],[T.WIN,'win'],[50.3,'laugh'],[T.ROW,'confetti']);
