// ===== Elefante Colorido =====
makeBubs([['Elefante colorido!',50],['Que cor?',90],['Vermelho!',84],['O Pipoca chegou por último!',34],['Amarelo!',90],['Achei amarelo!',62],
 ['Ei! Cabelo vale?',58],['Vale!',100],['Verde!',100],['Eu já sou verde!',56],['Espertinha!',70],['Agora o Pipoca escolhe!',40],['Au, au!',90],
 ['Ele disse... marrom!',44],['Achei a manchinha!',48],['Cócegas no Pipoca!',46],['Marrom é a cor do Pipoca!',36],['Que cor vem amanhã?',44]]);
radio.visible=false;
// ----- blocos gigantes -----
var BR=[-2.4,-2.4],BY=[2.4,-2.4],BG=[-2.4,1.2],BB=[2.4,1.2];
function brick(p,c){var g=new THREE.Group();g.position.set(p[0],0,p[1]);scene.add(g);var b=box(1.0,0.9,1.0,c);b.position.y=0.45;g.add(b);
 var st=new THREE.Group();st.position.set(0,0.9,0);studs(st,2,2,0,c,0,0,0.5);g.add(st);return g;}
brick(BR,0xe0484f);brick(BY,0xffd23f);brick(BG,0x2fbf5f);brick(BB,0x3a6fe0);
var EXB=[[-2.9,-2.9],[2.9,-2.9],[-2.9,1.7],[2.9,1.7]];
var T={ARR:3.0,CALL1:3.2,GO1:6.4,GO2:12.4,GO3:21.0,ASK:25.8,DOGC:27.6,GO4:31.4,YAY:37.0,ROW:39.0,DANCE:41.6,WAVE:55.5,END:60};
var END=T.END;
var LC=[0,2.8],ROWP={bia:[-1.2,-0.8],teo:[0,-0.95],duda:[1.2,-0.8]},DOG0=[0.6,-0.1];
var FIN={teo:[-1.95,2.6],bia:[-0.65,2.6],leo:[0.65,2.6],duda:[1.95,2.6]},DF=[0,3.5];
var STY={leo:0,bia:3,teo:2,duda:1};
var TOUCH={A:{aRx:-1.45,eR:-0.15,aLx:-0.3},face:'happy'};
var CALLA={A:{aRx:-2.7,eR:-0.3,aRz:0.2,aLx:-0.2},face:'happy'};
var LAUGHW=[[17.0,19.0],[35.0,36.8]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function lg(o){return function(t,u){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue',A:null};return (typeof o==='function')?o(t,u):o;};}
// corre por pts e termina olhando para alvo, tocando
function runTo(t0,t1,pts,look,o){var e=pts[pts.length-1],pr=pts[pts.length-2];
 return [mv(t0,t1,pts,'run',{face:'happy'}),turnTo(t1,t1+0.25,e,yawTo(pr,e),yawTo(e,look),'stand',{face:'happy'})];}
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
// pontos de cada rodada
var P1={bia:[-2.4,-1.45],teo:[-1.45,-2.4],duda:[-2.4,-3.35]},DP1=[-3.4,-2.4];
var BIA2=[-1.5,-1.65],DUDA2=[1.45,-2.4],DP2=[2.4,-3.4];
var BIA3=[-2.4,0.25],TEO3=[-1.45,1.2],DP3=[1.45,-3.1];
var C4=[0,-0.6],S4={leo:[0.92,-0.4],teo:[-0.92,-0.4],bia:[-0.6,-1.45],duda:[0.6,-1.45]};
(function(){
 // LÉO (o mestre)
 TL.leo=[hold(0,0.2,[3.5,5.0],yawTo([3.5,5.0],LC),'stand'),mv(0.2,2.6,[[3.5,5.0],[1.2,3.8],LC],'run',{face:'happy'}),turnTo(2.6,3.0,LC,yawTo([1.2,3.8],LC),PI,'stand',{face:'happy'}),
  hold(3.0,4.6,LC,PI,'none',CALLA),hold(4.6,5.9,LC,PI,'stand',{face:'happy'}),hold(5.9,7.0,LC,PI,'none',CALLA),
  hold(7.0,8.8,LC,PI,'clap',{face:'happy'}),hold(8.8,11.8,LC,PI,'laugh',function(t){return t<10.3?{face:'tongue'}:{pose:'stand',face:'happy'};}),
  hold(11.8,12.9,LC,PI,'none',CALLA),hold(12.9,16.7,LC,PI,'look',{face:'happy'}),hold(16.7,17.0,LC,PI,'none',{A:{aRx:-2.0,aLx:-2.0,aRz:0.5,aLz:-0.5},face:'happy'}),
  hold(17.0,20.5,LC,PI,'stand',lg({face:'happy'})),hold(20.5,21.6,LC,PI,'none',CALLA),hold(21.6,25.8,LC,PI,'clap',{face:'happy'}),
  hold(25.8,27.4,LC,PI,'none',{A:{aRx:-1.3,eR:-0.2,aLx:-1.3,eL:-0.2,aRz:0.4,aLz:-0.4},face:'happy'}),
  turnTo(27.4,28.0,LC,PI,yawTo(LC,C4),'look',{face:'happy'}),hold(28.0,T.GO4,LC,yawTo(LC,C4),'look',{face:'wow'})]
  .concat(runTo(T.GO4,32.6,[LC,[1.5,0.2],S4.leo],C4),[hold(32.85,T.YAY,S4.leo,yawTo(S4.leo,C4),'none',function(t){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue'};return {A:{aRx:-0.9,aLx:-0.9,eR:-0.6,eL:-0.6,aRz:0.15,aLz:-0.15},face:'happy',pitch:0.1};}),
  hold(T.YAY,T.ROW,S4.leo,yawTo(S4.leo,C4),'cheer',{face:'happy'}),mv(T.ROW,39.8,[S4.leo,FIN.leo],'walk',{face:'happy'}),turnTo(39.8,40.1,FIN.leo,yawTo(S4.leo,FIN.leo),0,'stand',{face:'happy'}),
  hold(40.1,T.DANCE,FIN.leo,0,'clap',{face:'happy'})],tail('leo'));
 // BIA
 var sb=[-4.2,-3.6];
 TL.bia=[hold(0,0.2,sb,yawTo(sb,ROWP.bia),'stand'),mv(0.2,2.5,[sb,ROWP.bia],'run',{face:'happy'}),turnTo(2.5,2.9,ROWP.bia,yawTo(sb,ROWP.bia),yawTo(ROWP.bia,LC),'stand',{face:'happy'}),
  hold(2.9,T.GO1,ROWP.bia,yawTo(ROWP.bia,LC),'stand',function(t){return (t>4.6&&t<5.8)?{pose:'none',A:{aRx:-2.0,eR:-1.2,aLx:-0.3},face:'wow'}:{face:'happy'};})]
  .concat(runTo(T.GO1,7.6,[ROWP.bia,P1.bia],BR),[hold(7.85,T.GO2,P1.bia,yawTo(P1.bia,BR),'none',function(t){return t>8.8&&t<10.3?{pose:'laugh',face:'tongue'}:TOUCH;}),
  turnTo(T.GO2,12.65,P1.bia,PI,yawTo(P1.bia,BIA2),'stand',{face:'focus'}),mv(12.65,13.2,[P1.bia,BIA2],'walk',{face:'focus'}),
  turnTo(13.2,13.4,BIA2,yawTo(P1.bia,BIA2),yawTo(BIA2,P1.teo),'stand',{face:'happy'}),
  hold(13.4,T.GO3,BIA2,yawTo(BIA2,P1.teo),'none',lg(function(t){return t<16.7?{A:{aRx:-2.35,eR:-0.5,aRz:-0.1,aLx:-0.3},face:'happy'}:{pose:'stand',face:'happy'};}))],
  runTo(T.GO3,22.3,[BIA2,BIA3],BG),[hold(22.55,T.GO4,BIA3,yawTo(BIA3,BG),'none',function(t){return t>24.0&&t<25.4?{pose:'clap',face:'happy'}:(t>28?{pose:'look',face:'wow'}:TOUCH);}),
  ],runTo(T.GO4,32.6,[BIA3,[-1.7,-1.2],S4.bia],C4),[hold(32.85,T.YAY,S4.bia,yawTo(S4.bia,C4),'none',function(t){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue'};return {A:{aRx:-0.9,aLx:-0.3,eR:-0.6,aRz:0.1},face:'happy',pitch:0.12};}),
  hold(T.YAY,39.4,S4.bia,yawTo(S4.bia,C4),'cheer',{face:'happy'}),mv(39.4,40.8,[S4.bia,[-1.5,-0.6],[-1.2,0.8],FIN.bia],'walk',{face:'happy'}),turnTo(40.8,41.1,FIN.bia,yawTo([-1.2,0.8],FIN.bia),0,'stand',{face:'happy'}),
  hold(41.1,T.DANCE,FIN.bia,0,'clap',{face:'happy'})],tail('bia'));
 // TEO
 var st=[-1.5,5.0];
 TL.teo=[hold(0,0.2,st,yawTo(st,ROWP.teo),'stand'),mv(0.2,2.6,[st,[-0.6,3.0],[-0.4,0.5],ROWP.teo],'run',{face:'happy'}),turnTo(2.6,3.0,ROWP.teo,yawTo([-0.4,0.5],ROWP.teo),yawTo(ROWP.teo,LC),'stand',{face:'happy'}),
  hold(3.0,T.GO1,ROWP.teo,yawTo(ROWP.teo,LC),'stand',{face:'happy'})]
  .concat(runTo(T.GO1,7.9,[ROWP.teo,P1.teo],BR),[hold(8.15,T.GO2,P1.teo,yawTo(P1.teo,BR),'none',function(t){return t>8.8&&t<10.3?{pose:'none',A:{aRx:-2.0,eR:-1.0,aLx:-0.3},face:'happy'}:TOUCH;}),
  hold(T.GO2,13.4,P1.teo,yawTo(P1.teo,BR),'look',{face:'focus'}),
  turnTo(13.4,13.8,P1.teo,yawTo(P1.teo,BR),yawTo(P1.teo,BIA2),'none',{face:'wow',A:{hx:0.2}}),
  hold(13.8,T.GO3+0.5,P1.teo,yawTo(P1.teo,BIA2),'none',lg(function(t){return (t>15.2&&t<16.6)?{A:{aLx:-2.6,aRx:-2.6,aLz:-0.3,aRz:0.3,eL:-1.9,eR:-1.9},face:'wow'}:(t>19.3&&t<20.3?{pose:'stand',face:'happy'}:{pose:'none',A:{hx:0.2,aLx:-0.3,aRx:-0.3},face:'wow'});}))],
  runTo(T.GO3+0.5,22.9,[P1.teo,[-1.45,-0.5],TEO3],BG),[hold(23.15,T.GO4,TEO3,yawTo(TEO3,BG),'none',function(t){return t>28?{pose:'look',face:'wow'}:(t>30.0&&t<31.4?{pose:'none',A:{aRx:-2.4,eR:-0.3,aLx:-0.3},face:'happy'}:TOUCH);}),
  ],runTo(T.GO4+0.1,32.5,[TEO3,S4.teo],C4),[hold(32.75,T.YAY,S4.teo,yawTo(S4.teo,C4),'none',function(t){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue'};return {A:{aRx:-0.9,aLx:-0.9,eR:-0.6,eL:-0.6,aRz:0.15,aLz:-0.15},face:'happy',pitch:0.1};}),
  hold(T.YAY,T.ROW,S4.teo,yawTo(S4.teo,C4),'cheer',{face:'happy'}),mv(T.ROW,40.0,[S4.teo,FIN.teo],'walk',{face:'happy'}),turnTo(40.0,40.3,FIN.teo,yawTo(S4.teo,FIN.teo),0,'stand',{face:'happy'}),
  hold(40.3,T.DANCE,FIN.teo,0,'clap',{face:'happy'})],tail('teo'));
 // DUDA
 var sd=[4.2,-3.6];
 TL.duda=[hold(0,0.2,sd,yawTo(sd,ROWP.duda),'stand'),mv(0.2,2.5,[sd,ROWP.duda],'run',{face:'happy'}),turnTo(2.5,2.9,ROWP.duda,yawTo(sd,ROWP.duda),yawTo(ROWP.duda,LC),'stand',{face:'happy'}),
  hold(2.9,T.GO1,ROWP.duda,yawTo(ROWP.duda,LC),'stand',{face:'happy'})]
  .concat(runTo(T.GO1,8.3,[ROWP.duda,[-0.4,-3.35],P1.duda],BR),[hold(8.55,T.GO2,P1.duda,yawTo(P1.duda,BR),'none',function(t){return (t>10.6&&t<11.6)?{pose:'none',A:{aRx:-2.0,eR:-1.2,aLx:-0.3},face:'happy'}:(t>8.8&&t<10.3?{pose:'laugh',face:'tongue'}:TOUCH);}),
  ],runTo(T.GO2,14.0,[P1.duda,[1.0,-3.35],DUDA2],BY),[hold(14.25,T.GO3,DUDA2,yawTo(DUDA2,BY),'none',lg(TOUCH)),
  turnTo(T.GO3,21.4,DUDA2,yawTo(DUDA2,BY),PI,'none',{face:'happy'}),
  hold(21.4,T.ASK,DUDA2,PI,'none',function(t){var hug={A:{aLx:-1.3,aRx:-1.3,aLz:0.9,aRz:-0.9,eL:-1.6,eR:-1.6},face:'happy',roll:0.06*Math.sin(t*6)};if(t>22.0&&t<24.0)hug.y=hopAt(t,22.1,0.35,0.12)+hopAt(t,22.6,0.35,0.12);if(t>24.2)hug={pose:'laugh',face:'tongue'};return hug;}),
  turnTo(T.ASK,26.3,DUDA2,PI,yawTo(DUDA2,LC),'stand',{face:'happy'}),hold(26.3,28,DUDA2,yawTo(DUDA2,LC),'stand',{face:'happy'}),
  hold(28,T.GO4,DUDA2,yawTo(DUDA2,C4),'look',{face:'wow'})],
  runTo(T.GO4,32.6,[DUDA2,S4.duda],C4),[hold(32.85,T.YAY,S4.duda,yawTo(S4.duda,C4),'none',function(t){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue'};return {A:{aLx:-0.9,aRx:-0.3,eL:-0.6,aLz:-0.1},face:'happy',pitch:0.12};}),
  hold(T.YAY,T.ROW,S4.duda,yawTo(S4.duda,C4),'cheer',{face:'happy'}),hold(T.ROW,39.4,S4.duda,yawTo(S4.duda,C4),'cheer',{face:'happy'}),mv(39.4,40.9,[S4.duda,[1.6,-1.0],[1.4,0.2],[1.45,2.0],FIN.duda],'walk',{face:'happy'}),turnTo(40.9,41.2,FIN.duda,yawTo([1.45,2.0],FIN.duda),0,'stand',{face:'happy'}),
  hold(41.2,T.DANCE,FIN.duda,0,'clap',{face:'happy'})],tail('duda'));
})();
// ----- Pipoca -----
var d0=[4.6,2.6];
DG=[hold(0,0.4,d0,yawTo(d0,DOG0),'stand'),mv(0.4,2.8,[d0,[1.6,1.6],DOG0],'drun'),turnTo(2.8,3.1,DOG0,yawTo([1.6,1.6],DOG0),yawTo(DOG0,LC),'sit'),
 hold(3.1,6.9,DOG0,yawTo(DOG0,LC),'sit',function(t){return {tailF:t>5.9?32:16};}),
 cust(6.9,7.2,function(t,u){return {p:DOG0,yaw:yawTo(DOG0,LC)+0.4*Math.sin(t*20),pose:'stand'};}),
 mv(7.2,8.6,[DOG0,[-1.0,0.2],[-3.3,-0.9],DP1],'drun',{tailF:34}),turnTo(8.6,8.8,DP1,PI,PI/2,'stand'),
 cust(8.8,10.3,function(t){return {p:DP1,yaw:PI/2,pose:'paw',pw:0.7+0.2*Math.sin(t*8)};}),hold(10.3,11.0,DP1,PI/2,'bark'),hold(11.0,T.GO2,DP1,PI/2,'sit'),
 mv(T.GO2+0.2,14.6,[DP1,[-3.4,-4.0],[2.4,-4.0],DP2],'drun',{tailF:34}),turnTo(14.6,14.8,DP2,PI,0,'stand'),
 cust(14.8,T.GO3,function(t){if(inW(t,LAUGHW))return {p:DP2,yaw:0,pose:'party'};return {p:DP2,yaw:0,pose:'paw',pw:0.8};}),
 mv(T.GO3+0.3,21.9,[DP2,DP3],'dwalk'),
 cust(21.9,25.0,function(t,u){return {p:DP3,yaw:0,pose:'hind',wig:1,lift:S(t,21.9,22.2)*(1-S(t,24.7,25.0)),tailF:34,tailA:1.1};}),
 hold(25.0,T.DOGC,DP3,0,'sit',{tailF:24}),
 mv(T.DOGC,29.0,[DP3,[0.5,-3.2],[0.1,-1.6],C4],"dwalk"),turnTo(29.0,29.2,C4,yawTo([0.1,-1.6],C4),0,'stand'),
 hold(29.2,30.0,C4,0,'bark'),hold(30.0,T.GO4,C4,0,'sit',{tailF:30}),
 cust(T.GO4,T.YAY,function(t){var q=t-T.GO4;if(q<1.0)return {p:C4,yaw:0.6*Math.sin(t*10),pose:'stand',tailF:34};
  if(inW(t,LAUGHW))return {p:C4,yaw:0,pose:'hind',wig:1,lift:1,tailF:36,tailA:1.2};return {p:C4,yaw:0.25*Math.sin(t*3),pose:'sit',tailF:34,tailA:1.1,hz:0.2*Math.sin(t*5)};}),
 hold(T.YAY,40.6,C4,0,'party'),mv(40.6,41.5,[C4,DF],'drun'),turnTo(41.5,41.7,DF,0,0,'stand'),hold(41.7,END+2,DF,0,'party')];
BURST=[[T.YAY,[0,-0.6],2.0],[T.DANCE,[0,2.6],2.2],[T.DANCE+3,[0,2.6],2.2]];
BW=[['Elefante colorido!',3.2,4.6,kp('leo',2.9,0),1],['Que cor?',4.7,5.8,kp('bia',2.9,0),1],['Vermelho!',5.9,7.0,kp('leo',2.9,0),1],
 ['O Pipoca chegou por último!',8.8,10.3,kp('teo',2.9,0.6),1],['Que cor?',10.6,11.6,kp('duda',2.9,0.4),1],['Amarelo!',11.8,12.9,kp('leo',2.9,-0.8),1],
 ['Achei amarelo!',13.6,15.0,kp('bia',2.9,-0.4),1],['Ei! Cabelo vale?',15.2,16.6,kp('teo',2.9,0.3),1],['Vale!',16.7,17.8,kp('leo',2.9,0),1],
 ['Que cor?',19.3,20.3,kp('teo',2.9,0.3),1],['Verde!',20.5,21.6,kp('leo',2.9,0),1],['Eu já sou verde!',22.2,23.8,kp('duda',2.9,-0.8),1],
 ['Espertinha!',24.0,25.4,kp('bia',2.9,0.2),1],['Agora o Pipoca escolhe!',25.8,27.4,kp('leo',2.9,0),1],['Au, au!',29.1,30.0,dp(1.3),0.9],
 ['Ele disse... marrom!',30.0,31.4,kp('teo',2.9,0.3),1],['Achei a manchinha!',33.2,34.8,kp('bia',2.9,-0.3),1],['Cócegas no Pipoca!',35.0,36.6,kp('duda',2.9,0.3),1],
 ['Marrom é a cor do Pipoca!',37.2,38.8,kp('teo',2.9,0.3),1],['Que cor vem amanhã?',50.5,54.5,kp('teo',2.9,0.5),1]];
function WA(a,e,fov,m,z){return function(){return frameOn(ALL,a,e,fov||46,0.22);};}
function PAN(a0,a1,e0,e1,t0,t1,fov,m){return function(t){var u=ez(lin(t,t0,t1));return frameOn(ALL,lerp(a0,a1,u),lerp(e0,e1,u),fov||46,m||0.22);};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.CALL1,PAN(-30,-8,56,44,0,T.CALL1)],
 [T.CALL1,6.3,PAN(-8,8,48,46,T.CALL1,6.3,46,0.34)],
 [6.3,10.5,PAN(-30,-38,44,46,6.3,10.5)],
 [10.5,12.3,WA(-30,46)],
 [12.3,17.0,PAN(10,22,46,44,12.3,17.0)],
 [17.0,20.4,PAN(-6,6,40,40,17.0,20.4)],
 [20.4,25.6,PAN(30,18,44,46,20.4,25.6)],
 [25.6,29.4,WA(24,48)],
 [29.4,31.3,PAN(-10,0,42,40,29.4,31.3)],
 [31.3,T.YAY,PAN(-15,15,52,62,31.3,T.YAY)],
 [T.YAY,T.ROW+0.5,WA(15,55)],
 [T.ROW+0.5,T.DANCE,function(t){return mixCam(frameOn(ALL,15,55,46,0.22),FL(),ez(lin(t,T.ROW+0.5,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.8,'bark'],[T.CALL1,'ta'],[T.GO1-0.4,'go'],[T.GO1,'run'],[10.3,'bark'],[T.GO2-0.5,'go'],[T.GO2,'run'],[13.4,'boing'],[17.0,'laugh'],
 [T.GO3-0.4,'go'],[T.GO3,'run'],[22.1,'boing'],[24.2,'laugh'],[29.2,'bark'],[29.6,'bark'],[T.GO4,'go'],[T.GO4,'run'],[35.0,'laugh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
