var C=[0,-0.6],RS=1.15,RP=1.95,RO=2.6,RG=1.6;
function ring(a,r){var q=a*PI/180;return [C[0]+r*Math.cos(q),C[1]+r*Math.sin(q)];}
function tyaw(a){var q=a*PI/180;return Math.atan2(-Math.sin(q),Math.cos(q));}
function wrapA(a){return ((a+PI)%(2*PI)+2*PI)%(2*PI)-PI;}
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
var T={SIT:3.2,SONG:4.0,DROP1:11.1,LOOK:12.6,PICK1:13.5,LSIT:15.0,R2:17.0,DROP2:21.2,GRAB:21.9,DSIT:24.1,ASK:27.8,TRAIN:29.6,DEX:34.65,YAY:36.8,DANCE:39.0,WAVE:55.5,END:60};
var END=T.END,WT=110;
var FIN={teo:[-1.95,2.4],leo:[-0.65,2.4],bia:[0.65,2.4],duda:[1.95,2.4]},DF=[0,3.3];
var STY={leo:0,bia:3,teo:2,duda:1};
// faixa de ângulo -> pista
function lane(t0,t1,a0,w,r,pose,o){return cust(t0,t1,function(t,u){var a=a0+w*(t-t0);return ext({p:ring(a,r),yaw:tyaw(a),pose:pose,face:'happy'},o,t,u);});}
function laneE(t0,t1,a0,a1,r,pose,o){return cust(t0,t1,function(t,u){var e=1-(1-u)*(1-u);var a=lerp(a0,a1,e);return ext({p:ring(a,r),yaw:tyaw(a),pose:u<0.85?pose:'stand',face:'happy'},o,t,u);});}
function sitDown(t0,t1,p,y){return cust(t0,t1,function(t,u){return {p:p,yaw:y,pose:'none',y:lerp(0,GROUND_Y,S(u,0,1)),sit:S(u,0,1),face:'happy'};});}
function standUp(t0,t1,p,y){return cust(t0,t1,function(t,u){return {p:p,yaw:y,pose:'none',y:lerp(GROUND_Y,0,S(u,0,1)),sit:1-S(u,0,1),face:'wow'};});}
var LENA={A:{aRx:-1.0,eR:-0.4}};
// ----- quem os sentados olham -----
var FOC=[[0,'leo'],[T.LOOK,'teo'],[T.LSIT,'teo'],[T.R2,'teo'],[T.DROP2,'dog'],[T.DSIT,'teo'],[26.0,'dog'],[T.TRAIN,'dog']];
function focName(t){var f='leo';FOC.forEach(function(e){if(t>=e[0])f=e[1];});return f;}
function posOf(n,t){return n==='dog'?dogState(t).p:stateOf(n,t).p;}
var CLAPW=[[T.SONG,T.DROP1],[T.R2,T.DROP2]],LAUGH=[[15.4,16.8],[24.4,27.4]];
function seatS(n,p,t){var yaw=yawTo(p,C),f=focName(t),hy=0;if(f!==n){var q=posOf(f,t);hy=clamp(wrapA(yawTo(p,q)-yaw),-1.1,1.1);}
 var s={p:p,yaw:yaw,pose:'sitg',face:'happy',A:{aLx:-0.4,aRx:-0.4,aLz:0.1,aRz:-0.1,eL:-0.6,eR:-0.6,hy:hy,hx:0.1}};
 if(inW(t,CLAPW)){var cc=Math.abs(Math.sin(t*PI*BPM/60));s.A.aLx=s.A.aRx=-1.3;s.A.aLz=lerp(-0.2,0.32,cc);s.A.aRz=-s.A.aLz;s.A.eL=s.A.eR=-0.6;}
 if(inW(t,LAUGH)){s.face='tongue';s.y=0.04*Math.abs(Math.sin(t*13));s.roll=0.05*Math.sin(t*13);s.A.aLx=s.A.aRx=-1.0;s.A.eL=s.A.eR=-1.2;}
 if(n==='duda'&&t>11.8&&t<13.2){s.face='wow';s.A.aRx=-2.6;s.A.eR=-0.2;}
 return s;}
function seatClip(n,a,t0,t1){var p=ring(a,RS);return cust(t0,t1,function(t){return seatS(n,p,t);});}
// ----- trenzinho -----
var TE={leo:30.0,teo:29.8,bia:31.55,duda:32.55},TA={leo:170,teo:225,bia:303,duda:378},XA={leo:810,teo:810,bia:770,duda:770};
function tex(n){return TE[n]+(XA[n]-TA[n])/WT;}
function exitClip(n){var x0=tex(n),p0=ring(XA[n],RP),via=n==='teo'?[[-1.0,2.1]]:(n==='leo'?[[-0.35,2.0]]:[]);
 return [mv(x0,x0+0.6,[p0].concat(via,[FIN[n]]),'run',{face:'happy'}),turnTo(x0+0.6,x0+0.9,FIN[n],yawTo(via.length?via[0]:p0,FIN[n]),0,'stand',{face:'happy'}),
  cust(x0+0.9,T.DANCE,function(t){return {p:FIN[n],yaw:0,pose:t>=T.YAY?'cheer':'clap',face:'happy'};})];}
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
function trainIn(n,tUp){var a={leo:170,bia:295,duda:10}[n],p=ring(a,RS),y=yawTo(p,C),a1=TA[n];
 return [standUp(tUp,tUp+0.4,p,y),mv(tUp+0.4,TE[n],[p,ring(a1,RP)],'run',{face:'happy'}),lane(TE[n],tex(n),a1,WT,RP,'run',{face:(n==='leo'?'tongue':'happy')})];}
(function(){
 var A90=ring(90,RP);
 // Léo
 TL.leo=[hold(0,0.2,[-4.5,3.6],PI/2,'stand',LENA),mv(0.2,2.6,[[-4.5,3.6],[-1.5,2.3],A90],'run',LENA),turnTo(2.6,3.0,A90,yawTo([-1.5,2.3],A90),tyaw(90),'stand',LENA),
  hold(3.0,T.SONG,A90,tyaw(90),'stand',{face:'happy',A:{aRx:-1.6,eR:-0.4,aLx:-0.1}}),
  lane(T.SONG,T.LOOK,90,62,RP,'walk',function(t){return t<T.DROP1?LENA:null;}),
  lane(T.LOOK,14.65,90+62*(T.LOOK-T.SONG),130,RP,'run',{face:'tongue'}),
  mv(14.65,T.LSIT,[ring(162,RP),ring(170,RS)],'walk',{face:'happy'}),sitDown(T.LSIT,15.4,ring(170,RS),yawTo(ring(170,RS),C)),
  seatClip('leo',170,15.4,29.4)].concat(trainIn('leo',29.4),exitClip('leo'),tail('leo'));
 // Teo
 var ts=ring(170,RS),tp=ring(170,1.42);
 TL.teo=[hold(0,0.2,[-5,0.6],PI/2,'stand'),mv(0.2,2.4,[[-5,0.6],ts],'run',{face:'happy'}),turnTo(2.4,2.7,ts,yawTo([-5,0.6],ts),yawTo(ts,C),'stand'),sitDown(2.7,T.SIT,ts,yawTo(ts,C)),
  seatClip('teo',170,T.SIT,T.LOOK),
  cust(T.LOOK,12.9,function(t,u){var s=seatS('teo',ts,t);s.A.hy=lerp(0,1.2,S(u,0,1));s.face='wow';return s;}),
  standUp(12.9,13.3,ts,yawTo(ts,C)),
  cust(13.3,13.7,function(t,u){var b=Math.sin(PI*u);return {p:L2(ts,tp,u),yaw:lerpAng(yawTo(ts,C),yawTo(C,ts),S(u,0,0.5)),pose:'none',pitch:0.6*b,face:'focus',A:{aRx:-0.8*b,eR:-0.2,aLx:-0.3}};}),
  mv(13.7,13.9,[tp,ring(178,RP)],'run',{face:'focus'}),
  lane(13.9,15.2,178,130,RP,'run',{face:'focus',A:{aRx:-1.2,eR:-0.3}}),
  cust(15.2,T.R2,function(t){var p=ring(347,RP);var s={p:p,yaw:lerpAng(tyaw(347),yawTo(p,[0,4]),S(t,15.2,15.5)),pose:'stand',face:'happy',A:{aRx:-1.1,eR:-0.4}};
   if(t>15.4&&t<16.8){s.face='wow';s.pose='none';s.A={aLx:-2.7,aRx:-2.7,aLz:-0.2,aRz:0.2,eL:-1.9,eR:-1.9};}return s;}),
  turnTo(T.R2,17.3,ring(347,RP),yawTo(ring(347,RP),[0,4]),tyaw(347),'stand',LENA),
  lane(17.3,21.5,347,(605-347)/(T.DROP2-17.3),RP,'walk',function(t){return t<T.DROP2?LENA:null;}),
  lane(21.5,23.9,605+(605-347)/(T.DROP2-17.3)*0.3,130,RP,'run',{face:'focus'}),
  laneE(23.9,24.3,605+(605-347)/(T.DROP2-17.3)*0.3+312,945,RP,'run',{face:'wow'}),
  cust(24.3,TE.teo,function(t){var p=ring(225,RP),d=DS;var s={p:p,yaw:lerpAng(tyaw(225),yawTo(p,d),S(t,24.3,24.6)),pose:'stand',face:'happy'};
   if(t>24.4&&t<25.8){s.pose='none';s.face='focus';s.A={aLx:-1.3,aRx:-1.3,aLz:0.9,aRz:-0.9,eL:-1.6,eR:-1.6};s.y=hopAt(t,24.5,0.3,0.15)+hopAt(t,25.0,0.3,0.15);}
   if(t>T.ASK&&t<29.2){s.pose='none';s.face='wow';s.A={aRx:-1.5,eR:-0.1,aLx:-0.2};}return s;}),
  lane(TE.teo,tex('teo'),225,WT,RP,'run',{face:'focus'})].concat(exitClip('teo'),tail('teo'));
 // Bia e Duda
 [['bia',295,[3.2,-5]],['duda',10,[5,0.4]]].forEach(function(e){var n=e[0],p=ring(e[1],RS),st=e[2],y=yawTo(p,C);
  TL[n]=[hold(0,0.2,st,yawTo(st,p),'stand'),mv(0.2,2.4,[st,p],'run',{face:'happy'}),turnTo(2.4,2.7,p,yawTo(st,p),y,'stand'),sitDown(2.7,T.SIT,p,y),
   seatClip(n,e[1],T.SIT,TE[n]-0.6)].concat(trainIn(n,TE[n]-0.6),exitClip(n),tail(n));});
})();
// ----- Pipoca -----
var DS=ring(245,RS),DG2=ring(245,1.28),YC=yawTo(DS,C),YO=yawTo(C,DS);
function dwatch(t){var f=focName(t);var q=posOf(f==='dog'?'teo':f,t);return {p:DS,yaw:lerpAng(YC,yawTo(DS,q),0.6),pose:'sit',tailF:t>T.DROP2?30:18};}
DG=[hold(0,0.3,[-3,-5],0.5,'stand'),mv(0.3,2.6,[[-3,-5],[-1.6,-3.2],DS],'drun'),turnTo(2.6,2.9,DS,yawTo([-1.6,-3.2],DS),YC,'sit'),
 cust(2.9,21.35,dwatch),
 cust(21.35,21.6,function(t,u){return {p:DS,yaw:lerpAng(YC,YO,S(u,0,1)),pose:'bark'};}),
 mv(21.6,T.GRAB,[DS,DG2],'sniff'),
 mv(T.GRAB,22.3,[DG2,ring(255,RO)],'drun',{tailF:34}),
 lane(22.3,23.63,255,260,RO,'drun',{tailF:34}),
 mv(23.63,T.DSIT,[ring(600,RO),ring(605,RP),DS],'drun',{tailF:34}),
 cust(T.DSIT,T.TRAIN-0.2,function(t){var q=stateOf('teo',t).p;var s={p:DS,yaw:lerpAng(YO,yawTo(DS,q),S(t,T.DSIT,24.5)),pose:'sit',tailF:30,tailA:1.0};
  if(t>25.9&&t<27.2)s.pose='party';if(t>T.ASK&&t<29.2){s.hz=0.25*Math.sin(t*6);}return s;}),
 mv(T.TRAIN-0.2,T.TRAIN,[DS,ring(255,RP)],'drun'),
 lane(T.TRAIN,T.DEX,255,WT,RP,'drun',{tailF:34}),
 mv(T.DEX,35.1,[ring(810,RP),DF],'drun'),turnTo(35.1,35.4,DF,0,0,'sit'),
 cust(35.4,END+2,function(t){return {p:DF,yaw:0,pose:t>=T.YAY?'party':'sit',tailF:30,tailA:1.0};})];
// ----- lencinho -----
var LEN=new THREE.Group(),LCL=new THREE.Group();scene.add(LEN);LEN.add(LCL);
(function(){var c=box(0.36,0.36,0.025,0xe0484f);LCL.add(c);[[-0.09,-0.09],[0.09,0.09],[0.09,-0.09],[-0.09,0.09],[0,0]].forEach(function(d){var w=box(0.06,0.06,0.03,0xffffff);w.position.set(d[0],d[1],0);LCL.add(w);});})();
var _hp=new THREE.Vector3();function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function mouth(){dog.head.updateMatrixWorld(true);return dog.head.localToWorld(V(0,-0.12,0.42));}
var GY=0.17,G1=ring(170,RG),G2=ring(245,RG);
function hand0(n,t){var s=stateOf(n,t);return V(s.p[0]+0.35*Math.cos(s.yaw),0.95,s.p[1]-0.35*Math.sin(s.yaw));}
function lenAt(t){
 if(t<T.DROP1)return {p:handR('leo'),k:1};
 if(t<T.DROP1+0.35){var a=hand0('leo',T.DROP1),u=lin(t,T.DROP1,T.DROP1+0.35);return {p:V(lerp(a.x,G1[0],u),lerp(a.y,GY,u*u),lerp(a.z,G1[1],u)),k:1-u};}
 if(t<T.PICK1)return {p:V(G1[0],GY,G1[1]),k:0};
 if(t<T.DROP2)return {p:handR('teo'),k:1};
 if(t<T.DROP2+0.35){var b=hand0('teo',T.DROP2),u2=lin(t,T.DROP2,T.DROP2+0.35);return {p:V(lerp(b.x,G2[0],u2),lerp(b.y,GY,u2*u2),lerp(b.z,G2[1],u2)),k:1-u2};}
 if(t<T.GRAB)return {p:V(G2[0],GY,G2[1]),k:0};
 return {p:mouth(),k:1,dog:1};}
EXTRA=function(t){var L=lenAt(t);LEN.position.copy(L.p);LCL.position.set(0,-0.17*L.k,0);LEN.rotation.set(-PI/2*(1-L.k),L.dog?dog.root.rotation.y:(t*0.7),0.12*Math.sin(t*7)*L.k);};
BURST=[[T.YAY,[0,2.4],2.0],[T.DANCE+2,[0,2.4],2.2]];
BW=[['Corre cutia!',3.2,4.6,kp('bia',2.1,-0.3),1],['Corre cutia, na casa da tia!',4.8,6.8,kp('leo',2.9,0.6),1],['Corre cipó, na casa da avó!',7.0,9.0,kp('leo',2.9,0),1],
 ['Lencinho na mão...',9.3,10.8,kp('leo',2.9,0),1],['...caiu no chão!',10.9,12.2,kp('leo',2.9,0.6),1],['Teo, olha atrás!',12.2,13.5,kp('duda',2.1,-0.6),1],
 ['Ah, não!',15.4,16.8,kp('teo',2.9,-0.9),1],['Agora sou eu!',17.2,18.6,kp('teo',2.9,-0.8),1],['Caiu no chão!',20.6,21.9,kp('teo',2.9,0),1],
 ['Não vale!',24.4,25.8,kp('teo',2.9,0.5),1],['O Pipoca é rapidão!',26.0,27.5,kp('bia',2.1,0),1],['Me dá o lencinho!',T.ASK,29.2,kp('teo',2.9,0.6),1],
 ['Pega o Pipoca!',30.4,31.8,kp('leo',2.9,0),1],['Ele ganhou de todo mundo!',37.1,38.8,kp('duda',2.9,-0.6),1],['O Pipoca virou cutia!',50.4,54.8,kp('teo',2.9,0.6),1]];
var EXC=[[C[0]+RO+0.3,C[1]],[C[0]-RO-0.3,C[1]],[C[0],C[1]+RP+0.3],[C[0],C[1]-RO-0.3]];
function frameR(a,e,fov,fill){fill=fill||1.6;var pts=[];pts.push(V(C[0],0,C[1]));
 ALL.forEach(function(n){var p=pos2(n);pts.push(V(p.x,0,p.z),V(p.x,n==='dog'?1.15:1.85,p.z));});
 var aa=a*PI/180,ee=e*PI/180,dir=V(Math.sin(aa)*Math.cos(ee),Math.sin(ee),Math.cos(aa)*Math.cos(ee)),Lk=V(C[0],0.4,C[1]),D=12;
 for(var it=0;it<10;it++){var P=Lk.clone().addScaledVector(dir,D);_cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(P);_cam.lookAt(Lk);_cam.updateMatrixWorld();
  var lo=1e9,hi=-1e9,lx=1e9,hx=-1e9;pts.forEach(function(q){var v=q.clone().project(_cam);lo=Math.min(lo,v.y);hi=Math.max(hi,v.y);lx=Math.min(lx,v.x);hx=Math.max(hx,v.x);});
  var tv=Math.tan(fov*PI/360),up=V(0,1,0).applyQuaternion(_cam.quaternion),rt=V(1,0,0).applyQuaternion(_cam.quaternion);
  Lk.addScaledVector(up,(lo+hi)/2*D*tv);Lk.addScaledVector(rt,(lx+hx)/2*D*tv*W/H);D*=clamp(Math.max((hx-lx)/fill,(hi-lo)/fill),0.7,1.4);}
 var P2=Lk.clone().addScaledVector(dir,D);return {pos:[P2.x,P2.y,P2.z],look:[Lk.x,Lk.y,Lk.z],fov:fov};}
function WD(a,e,fov,D){var aa=a*PI/180,ee=e*PI/180;D=D||10.8;var L=[C[0],0.55,C[1]-0.35];D*=1.25;return {pos:[L[0]+D*Math.sin(aa)*Math.cos(ee),L[1]+D*Math.sin(ee),L[2]+D*Math.cos(aa)*Math.cos(ee)],look:L,fov:fov||46};}
function OR(a0,a1,e0,e1,t0,t1,D0,D1){return function(t){var u=ez(lin(t,t0,t1));return WD(lerp(a0,a1,u),lerp(e0,e1,u),46,lerp(D0||10.8,D1||D0||10.8,u));};}
SH=[[0,T.SIT,OR(-25,0,60,50,0,T.SIT,14,10.2)],
 [T.SIT,11.0,OR(0,18,50,48,T.SIT,11.0,10.2,9.6)],
 [11.0,17.0,OR(18,24,48,48,11.0,17.0,10.4,10.8)],
 [17.0,24.6,OR(-6,-18,50,50,17.0,24.6,10.4,11.2)],
 [24.6,T.TRAIN,OR(-18,-10,50,48,24.6,T.TRAIN,10.0,9.6)],
 [T.TRAIN,T.DEX,OR(-10,14,48,56,T.TRAIN,T.DEX,11.0,11.2)],
 [T.DEX,T.DANCE,function(t){return mixCam(WD(14,56,46,11.2),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.DEX,37.2)));}],
 [T.DANCE,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.6,'bark'],[3.2,'ta'],[T.DROP1,'drop'],[T.LOOK,'run'],[13.9,'run'],[T.LSIT,'plop'],[15.4,'laugh'],[T.DROP2,'drop'],[21.4,'bark'],[T.GRAB,'gulp'],[22.3,'zoom'],[T.DSIT,'plop'],
 [24.4,'laugh'],[T.TRAIN,'bark'],[T.TRAIN,'chase'],[T.DEX,'whoosh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
