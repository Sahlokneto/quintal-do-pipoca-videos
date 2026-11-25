function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
var T={ARR:3.2,YAY:35.8,LINE:37.5,DANCE:39.5,WAVE:55.5,END:60};
var END=T.END,X0=[0,0.9],BZ=-2.4,BZF=-2.31,BY=1.25,DP=[-1.4,-1.5],DF=[0,2.7];
var HOME={leo:[-1.7,-0.4],bia:[-1.8,0.9],teo:[1.7,-0.4],duda:[1.8,0.9]};
var FIN={bia:[-1.95,1.7],leo:[-0.65,1.6],teo:[0.65,1.6],duda:[1.95,1.7]};
var STY={leo:0,bia:3,teo:2,duda:1};
function bw(u,v){return [(u-256)*0.00508,BY+(192-v)*0.00508];}
var PHEAD=bw(398,72),PMOUTH=bw(452,142),PTAIL=bw(126,168);
// ----- cavalete com o desenho -----
(function(){var g=new THREE.Group();g.position.set(0,0,BZ);scene.add(g);
 var fr=box(2.8,2.15,0.08,0xc08a4a);fr.position.y=BY;g.add(fr);
 [-1.1,1.1].forEach(function(x){var l=box(0.12,BY+1.1,0.12,0x8b5a2b);l.position.set(x,(BY+1.1)/2-0.05,-0.12);l.rotation.x=-0.08;g.add(l);});
 var c=document.createElement('canvas');c.width=512;c.height=384;var x=c.getContext('2d');x.fillStyle='#fffaf0';x.fillRect(0,0,512,384);
 x.lineWidth=7;x.strokeStyle='#4a4a55';x.lineJoin='round';x.lineCap='round';var G='#a9adb8';
 function rr(a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.lineTo(a+w-r,b);x.quadraticCurveTo(a+w,b,a+w,b+r);x.lineTo(a+w,b+h-r);x.quadraticCurveTo(a+w,b+h,a+w-r,b+h);x.lineTo(a+r,b+h);x.quadraticCurveTo(a,b+h,a,b+h-r);x.lineTo(a,b+r);x.quadraticCurveTo(a,b,a+r,b);x.closePath();x.fillStyle=G;x.fill();x.stroke();}
 [150,195,300,345].forEach(function(lx){rr(lx-14,240,30,95,10);x.fillStyle='#4a4a55';x.fillRect(lx-14,320,30,15);});
 rr(130,150,240,110,50);
 x.beginPath();x.moveTo(330,175);x.lineTo(370,105);x.lineTo(410,125);x.lineTo(375,200);x.closePath();x.fillStyle=G;x.fill();x.stroke();
 [[378,52,-0.25],[412,48,0.2]].forEach(function(e){x.save();x.translate(e[0],e[1]);x.rotate(e[2]);x.beginPath();x.ellipse(0,0,13,36,0,0,6.3);x.fillStyle=G;x.fill();x.stroke();x.beginPath();x.ellipse(0,4,6,22,0,0,6.3);x.fillStyle='#f2b8c6';x.fill();x.restore();});
 x.beginPath();x.ellipse(405,115,52,40,0.35,0,6.3);x.fillStyle=G;x.fill();x.stroke();
 x.beginPath();x.ellipse(440,138,28,22,0.3,0,6.3);x.fillStyle='#d8d2c8';x.fill();x.stroke();
 x.fillStyle='#4a4a55';x.beginPath();x.arc(410,100,7,0,6.3);x.fill();x.beginPath();x.arc(446,134,4,0,6.3);x.fill();x.beginPath();x.arc(434,142,4,0,6.3);x.fill();
 x.lineWidth=5;x.beginPath();x.arc(425,150,12,0.2,1.4);x.stroke();
 x.fillStyle='#4a4a55';x.beginPath();x.moveTo(360,108);x.lineTo(372,92);x.lineTo(384,108);x.lineTo(396,95);x.lineTo(400,115);x.closePath();x.fill();
 x.fillStyle='#e0484f';x.font='800 34px system-ui, sans-serif';x.textAlign='center';x.fillText('?',120,135);
 var tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;var pl=new THREE.Mesh(new THREE.PlaneGeometry(2.6,1.95),new THREE.MeshBasicMaterial({map:tx}));pl.position.set(0,BY,0.045);g.add(pl);})();
// ----- rabos -----
function makeTail(){var g=new THREE.Group();g.rotation.order='YXZ';var r=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,0.5,8),mat(0x7a7e8a));r.position.y=0.25;r.castShadow=true;g.add(r);
 var tf=box(0.13,0.2,0.13,0x3f3f4a);tf.position.y=0.55;g.add(tf);var pin=box(0.07,0.07,0.07,0xe0484f);g.add(pin);g.visible=false;scene.add(g);return g;}
var TA=makeTail(),TB=makeTail(),TC=makeTail();
// ----- vendas -----
var BF={};['leo','bia','teo'].forEach(function(n){var g=new THREE.Group();KIDS[n].head.add(g);var b=box(1.02,0.22,0.98,0xe0484f);g.add(b);var k=box(0.2,0.2,0.12,0xc23a42);k.position.set(0,0,-0.52);g.add(k);g.position.set(0,0.5,0);g.visible=false;BF[n]=g;});
var DBF=new THREE.Group();dog.head.add(DBF);(function(){var b=box(0.47,0.11,0.44,0xe0484f);DBF.add(b);var k=box(0.1,0.1,0.06,0xc23a42);k.position.set(0,0,-0.24);DBF.add(k);})();DBF.position.set(0,0.07,0);DBF.visible=false;
var BLW={leo:[4.2,9.9],bia:[13.4,18.7],teo:[22.6,27.9]};
// ----- turnos -----
var TURN={leo:{w:3.2,walk:[6.2,9.0],stick:9.2,pts:[X0,[0.5,0.2],[-0.1,-0.6],[0.73,-1.88]],face:PI,arm:-2.5,back:[11.6,12.8],via:[[0.6,-0.6]]},
 bia:{w:12.4,walk:[15.4,18.0],stick:18.0,pts:[X0,[0.3,0.3],[-0.45,-0.35],[-0.8,-1.0]],face:yawTo([-0.8,-1.0],DP),arm:-0.9,bend:1,back:[20.8,22.0],via:[[-1.2,0.6]]},
 teo:{w:21.6,walk:[24.6,27.0],stick:27.2,pts:[X0,[-0.5,0.2],[0.4,-0.7],[0.95,-1.86]],face:PI,arm:-2.0,back:[29.6,30.8],via:[[1.4,-0.6]]}};
var LAUGHW=[[9.9,11.6],[18.8,21.0],[28.0,29.6]],CHEERW=[[T.YAY,T.LINE]];
var CUR=[[0,null],[3.2,'leo'],[12.4,'bia'],[18.6,'dog'],[21.4,'teo'],[30.4,'dog']];
function curP(t){var c=null;CUR.forEach(function(e){if(t>=e[0])c=e[1];});return c;}
function posOf(n,t){return n==='dog'?dogState(t).p:stateOf(n,t).p;}
function waitS(n,t){var h=HOME[n],c=curP(t),q=(c&&c!==n)?posOf(c,t):[0,-0.8];var s={p:h,yaw:yawTo(h,q),pose:'stand',face:'happy'};
 if(inW(t,LAUGHW)){s.pose='laugh';s.face='tongue';}
 if(inW(t,CHEERW)){s.pose='cheer';}
 return s;}
var ARMSF={aLx:-1.45,aRx:-1.45,aLz:0.15,aRz:-0.15,eL:-0.2,eR:-0.2};
function turnClips(n){var R=TURN[n],h=HOME[n],tB=R.w+1.0,P=R.pts,sp=P[P.length-1],ts=R.stick,te=BLW[n][1];
 return [mv(R.w,tB,[h,X0],'walk',{face:'happy'}),turnTo(tB,tB+0.3,X0,yawTo(h,X0),PI,'stand',{face:'happy'}),
  cust(tB+0.3,tB+1.9,function(t,u){return {p:X0,yaw:PI+4*PI*ez(u),pose:'none',face:'happy',A:{aLx:-0.2,aRx:-0.2,aLz:-1.3,aRz:1.3,eL:0,eR:0},y:0.04*Math.abs(Math.sin(t*14))};}),
  hold(tB+1.9,R.walk[0],X0,PI,'stand',{face:'happy',roll:0.06,A:ARMSF}),
  mv(R.walk[0],R.walk[1],P,'walk',function(t){return {face:'happy',A:ARMSF,roll:0.05*Math.sin(t*4)};}),
  turnTo(R.walk[1],ts,sp,yawTo(P[P.length-2],sp),R.face,'stand',{face:'happy',A:ARMSF}),
  cust(ts,te,function(t){var k=Math.sin(PI*lin(t,ts,ts+0.6));var s={p:sp,yaw:R.face,pose:'none',face:'focus',A:{aRx:lerp(-1.45,R.arm,k),aLx:-1.0,eR:-0.1,eL:-0.3}};if(R.bend)s.pitch=0.45*k;return s;}),
  cust(te,R.back[0],function(t){var s={p:sp,yaw:lerpAng(R.face,0,S(t,te,te+0.4)),pose:t<te+0.5?'stand':'laugh',face:t<te+0.5?'wow':'tongue'};return s;}),
  mv(R.back[0],R.back[1],[sp].concat(R.via,[h]),'walk',{face:'happy'})];}
var LW={leo:[T.LINE,38.9,[[-0.9,0.6]]],bia:[T.LINE,38.4,[]],teo:[T.LINE,38.9,[[0.9,0.6]]],duda:[T.LINE,38.4,[]]};
(function(){var st={leo:[-5,-0.5],bia:[-5,2.4],teo:[5,-0.5],duda:[5,2.4]};
 Object.keys(KIDS).forEach(function(n){var h=HOME[n],L=TL[n]=[hold(0,0.2,st[n],yawTo(st[n],h),'stand'),mv(0.2,2.6,[st[n],h],'run',{face:'happy'})];
  var t0=2.6;function wait(t1){if(t1>t0)L.push(cust(t0,t1,function(t){return waitS(n,t);}));}
  if(TURN[n]){wait(TURN[n].w);L.push.apply(L,turnClips(n));t0=TURN[n].back[1];}
  wait(T.LINE);
  var lw=LW[n];L.push(mv(lw[0],lw[1],[h].concat(lw[2],[FIN[n]]),'walk',{face:'happy'}),turnTo(lw[1],lw[1]+0.3,FIN[n],yawTo(lw[2].length?lw[2][0]:h,FIN[n]),0,'stand',{face:'happy'}),
   hold(lw[1]+0.3,T.DANCE,FIN[n],0,'cheer',{face:'happy'}),
   cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});})();
// ----- Pipoca -----
var DST=[-0.65,-1.76];
function dwatch(t){var c=curP(t);var q=(c&&c!=='dog')?stateOf(c,t).p:X0;return {p:DP,yaw:lerpAng(0.6,yawTo(DP,q),0.8),pose:'sit',tailF:20};}
DG=[hold(0,0.3,[-4.5,-3.5],1.0,'stand'),mv(0.3,2.6,[[-4.5,-3.5],[-2.6,-2.4],DP],'drun'),turnTo(2.6,2.9,DP,yawTo([-2.6,-2.4],DP),0.6,'sit'),
 cust(2.9,18.6,dwatch),
 cust(18.6,19.0,function(t){return {p:DP,yaw:lerpAng(yawTo(DP,X0),0.6,0),pose:'stand',hx:-0.2};}),
 cust(19.0,21.0,function(t,u){return {p:DP,yaw:0.6+4*PI*ez(u),pose:'drun',tailF:40,tailA:1.2};}),
 cust(21.0,31.0,function(t){var s=dwatch(t);if(t<21.6){s.roll=0.15*Math.sin(t*8)*(1-lin(t,21.0,21.6));s.pose='stand';}return s;}),
 cust(31.0,31.8,function(t,u){var k=Math.sin(PI*u);return {p:DP,yaw:0.6+0.9*k,pose:'stand',hx:0.25*k};}),
 mv(31.8,32.8,[DP,[-0.8,0.0],X0],'dwalk'),turnTo(32.8,32.9,X0,yawTo([-0.8,0],X0),PI,'stand'),
 cust(32.9,33.6,function(t,u){return {p:X0,yaw:PI+2*PI*ez(u),pose:'drun'};}),
 mv(33.6,35.2,[X0,[-0.3,-0.4],DST],'sniff'),turnTo(35.2,35.3,DST,yawTo([-0.3,-0.4],DST),PI,'stand'),
 cust(35.3,36.1,function(t,u){return {p:DST,yaw:PI,pose:'hind',lift:S(u,0,0.35)*(1-S(u,0.8,1)),hx:0.9};}),
 cust(36.1,37.6,function(t){return {p:DST,yaw:lerpAng(PI,0,S(t,36.1,36.5)),pose:'party',tailF:34};}),
 mv(37.6,39.2,[DST,[0,-0.4],X0,DF],'drun'),turnTo(39.2,39.4,DF,PI,0,'sit'),hold(39.4,END+2,DF,0,'party')];
// ----- objetos por quadro -----
var _hp=new THREE.Vector3();function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function mouthW(){dog.head.updateMatrixWorld(true);return dog.head.localToWorld(V(0,-0.1,0.42));}
function backW(){dog.root.updateMatrixWorld(true);return dog.root.localToWorld(V(0,0.62,-0.33));}
function placeT(o,p,rx,ry,rz){o.visible=true;o.position.copy(p);o.rotation.set(rx,ry,rz||0);}
EXTRA=function(t){
 Object.keys(BF).forEach(function(n){BF[n].visible=t>=BLW[n][0]&&t<BLW[n][1];});DBF.visible=t>=31.6&&t<36.0;
 var sw=0.12*Math.sin(t*3);
 TA.visible=false;if(t>=4.2){if(t<9.5)placeT(TA,handR('leo'),PI,0,sw);else placeT(TA,V(PHEAD[0],PHEAD[1]-0.02,BZF),0,0,0.08);}
 TC.visible=false;if(t>=22.6){if(t<27.5)placeT(TC,handR('teo'),PI,0,sw);else placeT(TC,V(PMOUTH[0]-0.05,PMOUTH[1],BZF),0,0,-PI/2+0.15);}
 TB.visible=false;var dy=dog.root.rotation.y;
 if(t>=13.4){if(t<18.3)placeT(TB,handR('bia'),PI,0,sw);
  else if(t<31.2)placeT(TB,backW(),-0.7+0.15*Math.sin(t*10),dy,0);
  else if(t<31.6){var u=lin(t,31.2,31.6),a=backW(),b=mouthW();placeT(TB,a.lerp(b,u),lerp(-0.7,PI*0.75,u),dy,0);}
  else if(t<35.75)placeT(TB,mouthW(),PI*0.75,dy,0.15*Math.sin(t*6));
  else placeT(TB,V(PTAIL[0],PTAIL[1]+0.02,BZF),PI,0,0.25*Math.sin(t*2.5)*Math.exp(-(t-35.75)*0.6));}};
BURST=[[T.YAY,[PTAIL[0],-1.6],2.0],[T.DANCE+2,[0,1.8],2.2]];
BW=[['Rabo do burro!',2.8,4.2,kp('bia',2.9,0.5),1],['Roda, roda!',4.6,6.0,kp('teo',2.9,-0.5),1],['Virou unicórnio!',10.0,11.5,kp('duda',2.9,-0.6),1],
 ['Um, dois, três!',13.8,15.2,kp('leo',2.9,0.5),1],['O Pipoca tem dois rabos!',18.8,20.6,kp('teo',2.9,-0.7),1],['Gira, gira!',23.0,24.4,kp('duda',2.9,-0.5),1],
 ['Burro de bigode!',28.0,29.5,kp('bia',2.9,0.6),1],['Vez do Pipoca!',30.4,31.8,kp('duda',2.9,-0.6),1],['Na mosca, Pipoca!',36.1,37.6,kp('leo',2.9,0.6),1],
 ['Meu burro virou unicórnio!',50.4,54.8,kp('leo',2.9,0.2),1]];
function WD(a,e,D,L){var aa=a*PI/180,ee=e*PI/180;L=L||[0,1.1,-0.6];return {pos:[L[0]+D*Math.sin(aa)*Math.cos(ee),L[1]+D*Math.sin(ee),L[2]+D*Math.cos(aa)*Math.cos(ee)],look:L,fov:46};}
function OR(a0,a1,e0,e1,D0,D1,t0,t1){return function(t){var u=ez(lin(t,t0,t1));return WD(lerp(a0,a1,u),lerp(e0,e1,u),lerp(D0,D1,u));};}
function CL(a,x){return function(){return WD(a,14,7.6,[x||0,1.25,-1.9]);};}
SH=[[0,T.ARR,OR(-18,0,46,40,15,12.8,0,T.ARR)],
 [T.ARR,10.0,OR(0,8,40,38,12.8,12.6,T.ARR,10.0)],
 [10.0,18.8,OR(8,-8,38,38,12.6,12.6,10.0,18.8)],
 [18.8,28.0,OR(-8,8,38,38,12.6,12.6,18.8,28.0)],
 [28.0,T.LINE,OR(8,16,38,36,12.6,12.6,28.0,T.LINE)],
 [T.LINE,T.DANCE,function(t){return mixCam(WD(16,36,12.6),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.LINE,T.DANCE)));}],
 [T.DANCE,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.6,'bark'],[2.8,'ta']];
['leo','bia','teo'].forEach(function(n){var R=TURN[n];EV.push([R.w+1.0,'band'],[R.w+1.3,'spin'],[R.walk[0],'steps'],[R.stick+0.3,'pin'],[BLW[n][1]+0.4,'laugh']);});
EV.push([19.0,'dogspin'],[30.4,'bark'],[31.6,'band'],[32.9,'spin'],[33.6,'sniff'],[34.2,'drum'],[35.75,'pin'],[T.YAY,'confetti'],[T.DANCE,'confetti']);
