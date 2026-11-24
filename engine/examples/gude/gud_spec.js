// ===== Bola de Gude =====
makeBubs([['Quem tirar mais, ganha!',46],['Uma!',96],['Volta aqui!',72],['Obrigada, Pipoca!',54],['Duas de uma vez!',56],['Tá dentro ou fora?',52],
 ['O Pipoca empurrou!',52],['Vez do Pipoca!',62],['Que jogada, Pipoca!',50],['Vou treinar o dedinho!',44]]);
radio.visible=false;
var C=[0,-0.5];function at(a,r){return [C[0]+r*Math.cos(a*PI/180),C[1]+r*Math.sin(a*PI/180)];}
var ANG={duda:20,teo:160,leo:240,bia:300};
var SEAT={},SHS={};Object.keys(ANG).forEach(function(n){SEAT[n]=at(ANG[n],2.0);SHS[n]=at(ANG[n],1.25);});
var DW=[0,-2.55],DF=[0,3.0];
var FIN={leo:[-1.95,1.9],teo:[-0.65,2.1],bia:[0.65,2.1],duda:[1.95,1.9]};
var STY={leo:0,bia:3,teo:2,duda:1};
var T={SIT:3.2,LEO:6.0,BIA:9.8,CH:10.3,GRAB:11.95,DROP:13.0,TEO:16.6,HIT2:17.6,DUDA:21.6,LINE:23.6,PUSH:26.3,ROLL:29.6,PAW:31.7,PHIT:32.4,YAY:33.0,UP:36.0,DANCE:39.0,WAVE:55.5,END:60};
var END=T.END,RT=0.12,RS=0.15,Y0=0.1;
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function wrapA(a){return ((a+PI)%(2*PI)+2*PI)%(2*PI)-PI;}
// ----- bolinhas: segmentos {t0,t1,a,b,k} k: roll (desacelera) | lin | mouth | fall -----
function R_(t0,t1,a,b,k){return {t0:t0,t1:t1,a:a,b:b,k:k||'roll'};}
var D300=(function(){var p=at(300,0.5),s=[0,-1.95],dx=p[0]-s[0],dz=p[1]-s[1],l=Math.hypot(dx,dz);return [dx/l,dz/l];})();
var DSH=[0,-1.95],PCON=[at(300,0.5)[0]-0.27*D300[0],at(300,0.5)[1]-0.27*D300[1]],P300=[at(300,0.5)[0]+1.5*D300[0],at(300,0.5)[1]+1.5*D300[1]];
var BIAOUT=[2.8,-1.0],DROPP=[1.85,-1.35];
var MB=[
 {c:0x8ad0ff,r:RT,L:[R_(22.1,T.LINE,at(20,0.5),at(200,1.0)),R_(T.PUSH,27.2,at(200,1.0),at(200,1.5))]},
 {c:0xffe066,r:RT,L:[R_(17.1,T.HIT2,at(160,0.5),at(340,0.26),'lin'),R_(T.HIT2,18.6,at(340,0.26),at(340,1.25))]},
 {c:0xff8fab,r:RT,L:[R_(6.6,7.8,at(240,0.5),at(60,1.7))]},
 {c:0xb8f28c,r:RT,L:[R_(T.PHIT,33.4,at(300,0.5),P300)]},
 {c:0xd6a8ff,r:RT,L:[R_(T.HIT2,18.8,at(340,0.5),at(340,1.9))]},
 // bolonas (cores das camisetas)
 {c:0x2f7de0,r:RS,L:[R_(T.LEO,6.6,SHS.leo,at(240,0.77),'lin'),R_(6.6,7.2,at(240,0.77),at(240,1.05))]},
 {c:0xff6fa3,r:RS,L:[R_(T.BIA,11.2,SHS.bia,BIAOUT),{t0:T.GRAB,t1:T.DROP,k:'mouth'},{t0:T.DROP,t1:13.3,k:'fall'},R_(13.3,13.9,null,SHS.bia),R_(T.ROLL,30.4,SHS.bia,DSH),R_(T.PAW,T.PHIT,DSH,PCON,'lin')]},
 {c:0xff9f1c,r:RS,L:[R_(T.TEO,17.1,SHS.teo,at(160,0.77),'lin'),R_(17.1,17.6,at(160,0.77),at(160,1.05))]},
 {c:0x34d399,r:RS,L:[R_(T.DUDA,22.1,SHS.duda,at(20,0.77),'lin'),R_(22.1,22.6,at(20,0.77),at(20,1.05))]}];
var IX={sh_leo:5,sh_bia:6,sh_teo:7,sh_duda:8,m20:0,m160:1,m240:2,m300:3,m340:4};
var MC={};
function mouthLive(){dog.head.updateMatrixWorld(true);return dog.head.localToWorld(V(0,-0.1,0.45));}
function mouthAt(tq,tnow){var key=tq.toFixed(3);if(MC[key])return MC[key].clone();applyDog(tq);dog.root.updateMatrixWorld(true);var m=mouthLive();MC[key]=m.clone();applyDog(tnow);dog.root.updateMatrixWorld(true);return m;}
function segEnd(s,t,r){if(s.k==='fall'){var m=mouthAt(s.t0,t);return [m.x,m.z];}return s.b;}
function mState(i,t){var M=MB[i],L=M.L,r=M.r;if(t<L[0].t0){var a0=L[0].a;return {p:V(a0[0],Y0+r,a0[1]),s:null};}
 var k=0;for(var j=0;j<L.length;j++)if(t>=L[j].t0)k=j;var s=L[k];
 var a=s.a||(k>0?segEnd(L[k-1],t,r):[0,0]);
 if(s.k==='mouth'){if(t<s.t1)return {p:mouthLive(),s:null};var m=mouthAt(s.t1,t);if(!L[k+1]||t<L[k+1].t0)return {p:m,s:null};}
 if(s.k==='fall'){var m0=mouthAt(s.t0,t),u=clamp((t-s.t0)/(s.t1-s.t0),0,1);if(t>=s.t1)return {p:V(m0.x,Y0+r,m0.z),s:null};return {p:V(m0.x,lerp(m0.y,Y0+r,u*u),m0.z),s:null};}
 var u2=clamp((t-s.t0)/(s.t1-s.t0),0,1),e=s.k==='lin'?u2:1-(1-u2)*(1-u2);var p=L2(a,s.b,e);return {p:V(p[0],Y0+r,p[1]),s:{a:a,b:s.b,e:e}};}
function mXZ(i,t){var q=mState(i,t).p;return [q.x,q.z];}
// ----- para onde olhar -----
var FOC=[[0,null],[5.2,'sh_leo'],[6.6,'m240'],[9.2,'sh_bia'],[13.9,null],[15.8,'sh_teo'],[17.1,'m340'],[20.6,'sh_duda'],[22.1,'m20'],[28.6,'dog'],[29.4,'sh_bia'],[T.PHIT,'m300'],[34.0,null]];
function focus(t){var f=null;FOC.forEach(function(e){if(t>=e[0])f=e[1];});if(!f)return C;if(f==='dog')return DW;return mXZ(IX[f],t);}
// ----- crianças -----
var TURN={leo:[[5.2,T.LEO,7.0]],bia:[[9.2,T.BIA,10.4],[29.0,T.ROLL,30.2]],teo:[[15.8,T.TEO,17.4]],duda:[[20.6,T.DUDA,22.4]]};
var CHEER={leo:[[7.6,9.0],[T.YAY,35.8]],teo:[[18.4,20.2],[T.YAY,35.8]],bia:[[T.YAY,35.8]],duda:[[T.YAY,35.8]]};
var CLAPW={leo:[[18.6,20.0]],bia:[[7.8,9.0],[18.6,20.0],[13.3,15.0]],teo:[[7.8,9.0]],duda:[[7.8,9.0],[18.6,20.0]]};
var WOW={bia:[[9.95,11.8]],leo:[[17.2,18.4],[10.0,11.6]],teo:[[17.2,18.4],[10.0,11.6]],duda:[[17.2,18.4],[10.0,11.6]]};
var LEAN=[[23.7,26.3]],LAUGH=[[26.5,28.4]];
function seatS(n,t){var p=SEAT[n],yaw=yawTo(p,C),f=focus(t);var hy=clamp(wrapA(yawTo(p,f)-yaw),-1.0,1.0);
 var s={p:p,yaw:yaw,pose:'sitg',face:'happy',A:{aLx:-0.4,aRx:-0.4,aLz:0.1,aRz:-0.1,eL:-0.6,eR:-0.6,hy:hy,hx:0.2}};
 var tw=null;TURN[n].forEach(function(w){if(t>=w[0]&&t<w[2])tw=w;});
 if(tw){var k=S(t,tw[0],tw[0]+0.4)*(1-S(t,tw[2]-0.4,tw[2])),fl=Math.sin(PI*lin(t,tw[1]-0.12,tw[1]+0.15));s.pitch=0.5*k;
  s.A={aLx:lerp(-0.4,-0.7,k),aRx:lerp(-0.4,-1.2,k)-0.45*fl,aLz:0.25,aRz:-0.05,eL:-0.6,eR:-0.2,hy:0,hx:0.25*k};s.face=t<tw[1]?'focus':'happy';
  if(n==='bia'&&tw[1]===T.BIA&&t>=T.BIA)s.face='wow';return s;}
 if(inW(t,WOW[n]||[])){s.face='wow';s.A.aLx=-0.6;s.A.aRx=-0.6;s.A.aLz=-0.8;s.A.aRz=0.8;s.A.eL=s.A.eR=-0.7;}
 if(inW(t,LEAN)){s.pitch=0.35;s.face=(n==='duda')?'focus':'wow';s.A.hx=0.3;}
 if(inW(t,LAUGH)){s.face='tongue';s.y=0.04*Math.abs(Math.sin(t*13));s.roll=0.05*Math.sin(t*13);s.A.aLx=s.A.aRx=-1.0;s.A.eL=s.A.eR=-1.2;s.A.hy=0;}
 if(inW(t,CLAPW[n]||[])){var cc=Math.abs(Math.sin(t*9));s.A.aLx=s.A.aRx=-1.3;s.A.aLz=lerp(-0.2,0.32,cc);s.A.aRz=-s.A.aLz;s.A.eL=s.A.eR=-0.6;}
 if(inW(t,CHEER[n]||[])){s.face='happy';s.A={aLx:-2.9,aRx:-2.9,aLz:-0.3,aRz:0.3,eL:-0.1,eR:-0.1,hy:0};s.y=0.06*Math.abs(Math.sin(t*9));}
 return s;}
var VIA={leo:[[-2.9,-0.9]],bia:[[0.45,-1.0],[0.2,0.0]],teo:[],duda:[]};
(function(){var st={leo:[-2.8,-4.6],bia:[2.8,-4.6],teo:[-4.8,1.2],duda:[4.8,1.2]};
 Object.keys(KIDS).forEach(function(n){var p=SEAT[n],y=yawTo(p,C);
  TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.6,[st[n],p],'run',{face:'happy'}),turnTo(2.6,2.9,p,yawTo(st[n],p),y,'stand',{face:'happy'}),
   cust(2.9,T.SIT,function(t,u){return {p:p,yaw:y,pose:'none',y:lerp(0,GROUND_Y,S(u,0,1)),sit:S(u,0,1),face:'happy'};}),
   cust(T.SIT,T.UP,function(t){return seatS(n,t);}),
   cust(T.UP,36.6,function(t,u){return {p:p,yaw:y,pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.8)),sit:1-S(u,0,0.8),face:'happy'};}),
   mv(36.6,38.4,[p].concat(VIA[n],[FIN[n]]),'walk',{face:'happy'}),
   turnTo(38.4,38.7,FIN[n],yawTo((VIA[n].length?VIA[n][VIA[n].length-1]:p),FIN[n]),0,'stand',{face:'happy'}),
   hold(38.7,T.DANCE,FIN[n],0,'cheer',{face:'happy'}),
   cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];});
})();
// ----- Pipoca -----
var DIN=at(200,0.28),YIN=yawTo(at(200,0.28),at(200,1.0)),GP=[2.8,-1.7];
function dwatch(t){var f=focus(t);return {p:DW,yaw:clamp(wrapA(yawTo(DW,f)),-0.9,0.9),pose:'sit'};}
DG=[hold(0,0.3,[4.5,-4.6],-0.9,'stand'),mv(0.3,2.8,[[4.5,-4.6],[1.7,-3.4],DW],'drun'),turnTo(2.8,3.1,DW,yawTo([1.7,-3.4],DW),0,'sit'),
 cust(3.1,T.CH,dwatch),
 mv(T.CH,11.55,[DW,[0.5,-3.15],[2.0,-2.8],GP],'drun',{tailF:30}),turnTo(11.55,11.7,GP,yawTo([2.0,-2.8],GP),0,'sniff'),hold(11.7,T.GRAB,GP,0,'sniff'),
 mv(T.GRAB,T.DROP,[GP,DROPP],'dwalk'),cust(T.DROP,15.0,function(t){return {p:DROPP,yaw:yawTo(GP,DROPP),pose:t<13.4?'stand':'sit',hx:t<13.4?0.3:0,tailF:30,tailA:1.0};}),
 mv(15.0,16.0,[DROPP,[1.7,-2.9],[0.5,-3.15],DW],'drun'),turnTo(16.0,16.3,DW,yawTo([0.5,-3.15],DW),0,'sit'),
 cust(16.3,24.0,dwatch),
 mv(24.0,25.2,[DW,DIN],'dwalk'),turnTo(25.2,25.5,DIN,yawTo(DW,DIN),YIN,'sniff'),hold(25.5,26.1,DIN,YIN,'sniff'),
 cust(26.1,26.5,function(t,u){var b=Math.sin(PI*u);return {p:L2(DIN,at(200,0.4),b*0.5),yaw:YIN,pose:'stand',hx:0.45*b};}),
 hold(26.5,27.4,DIN,YIN,'party'),mv(27.4,28.6,[DIN,DW],'dwalk'),turnTo(28.6,28.9,DW,yawTo(DIN,DW),0,'sit'),
 cust(28.9,31.0,dwatch),
 cust(31.0,32.0,function(t){var pw=S(t,31.0,31.4)*(1-S(t,31.5,T.PAW));return {p:DW,yaw:0,pose:'paw',pw:pw};}),
 hold(32.0,32.6,DW,0,'sit'),hold(32.6,37.0,DW,0,'party'),
 mv(37.0,38.4,[DW,[-0.25,-1.9],[-0.2,-0.5],DF],'drun'),turnTo(38.4,38.7,DF,yawTo([-0.2,-0.5],DF),0,'sit'),hold(38.7,T.DANCE,DF,0,'sit'),hold(T.DANCE,END+2,DF,0,'party')];
// ----- círculo de giz e bolinhas -----
(function(){var r=new THREE.Mesh(new THREE.RingGeometry(0.96,1.04,64),new THREE.MeshBasicMaterial({color:0xffffff}));r.rotation.x=-PI/2;r.position.set(C[0],0.152,C[1]);scene.add(r);
 var g=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.06,0.5),mat(0xffffff));g.position.set(-3.2,0.12,-2.4);g.rotation.y=0.6;scene.add(g);})();
var MM=MB.map(function(M){var g=new THREE.Group();var s=new THREE.Mesh(new THREE.SphereGeometry(M.r,18,14),new THREE.MeshStandardMaterial({color:col(M.c),roughness:0.12,metalness:0.1}));s.castShadow=true;g.add(s);
 var sw=new THREE.Mesh(new THREE.TorusGeometry(M.r*0.62,M.r*0.16,6,16),mat(0xffffff));sw.rotation.y=0.6;g.add(sw);scene.add(g);return g;});
var _ax=new THREE.Vector3();
EXTRA=function(t){MB.forEach(function(M,i){var st=mState(i,t);MM[i].position.copy(st.p);
 if(st.s){var dx=st.s.b[0]-st.s.a[0],dz=st.s.b[1]-st.s.a[1],l=Math.hypot(dx,dz);if(l>1e-4){_ax.set(dz/l,0,-dx/l);MM[i].setRotationFromAxisAngle(_ax,st.s.e*l/M.r);}}});};
BURST=[[T.YAY,[0,-0.6],1.6],[T.DANCE,[0,1.2],2.2],[T.DANCE+3,[0,1.2],2.2]];
BW=[['Quem tirar mais, ganha!',3.4,5.1,kp('bia',2.1,-0.5),1],['Uma!',7.7,9.0,kp('leo',2.1,0),1],['Volta aqui!',10.2,11.6,kp('bia',2.1,-0.3),1],['Obrigada, Pipoca!',13.3,15.0,kp('bia',2.1,-0.4),1],
 ['Duas de uma vez!',18.6,20.2,kp('teo',2.1,0.4),1],['Tá dentro ou fora?',23.8,25.4,kp('duda',2.1,-0.3),1],['O Pipoca empurrou!',26.6,28.2,kp('teo',2.1,0.5),1],
 ['Vez do Pipoca!',29.0,30.6,kp('bia',2.1,-0.3),1],['Que jogada, Pipoca!',32.8,34.4,kp('leo',2.1,0.3),1],['Vou treinar o dedinho!',50.4,54.8,kp('teo',2.9,0.4),1]];
var EXP=[[0,-2.8],[0,0.6]];
function A_(a,e,fov,m){return function(){return frameC(ALL,a,e,fov||46,m||0.12,EXP,1.3);};}
function PAN(a0,a1,e,t0,t1){return function(t){return frameC(ALL,lerp(a0,a1,ez(lin(t,t0,t1))),e,46,0.12,EXP,1.3);};}
SH=[[0,T.SIT,function(t){return frameC(ALL,lerp(25,0,ez(lin(t,0,T.SIT))),lerp(58,50,ez(lin(t,0,T.SIT))),48,0.12,EXP);}],
 [T.SIT,5.2,A_(0,50)],
 [5.2,9.2,PAN(-6,-16,48,5.2,9.2)],
 [9.2,15.8,PAN(10,18,46,9.2,15.8)],
 [15.8,20.6,A_(-16,46)],
 [20.6,28.6,PAN(16,2,50,20.6,28.6)],
 [28.6,T.UP,A_(0,44)],
 [T.UP,T.DANCE,function(t){return mixCam(frameC(ALL,0,44,46,0.12,EXP),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.UP,T.DANCE)));}],
 [T.DANCE,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.8,'bark'],[3.4,'ta'],[T.LEO,'flick'],[6.6,'clack'],[7.7,'yay'],[T.BIA,'flick'],[T.BIA,'roll'],[T.CH,'bark'],[T.GRAB,'gulp'],[T.DROP,'drop'],[13.3,'yay'],
 [T.TEO,'flick'],[17.1,'clack'],[T.HIT2,'clack'],[18.6,'yay'],[T.DUDA,'flick'],[22.1,'clack'],[T.LINE,'hm'],[T.PUSH,'boop'],[26.5,'laugh'],[T.ROLL,'roll'],[31.0,'drum'],[T.PAW,'flick'],[T.PHIT,'clack'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
