// ===== Ciranda =====
makeBubs([['Vamos fazer uma ciranda?',38],['Todo mundo de mãos dadas!',34],['O Pipoca fica no meio!',40],['Agora mais rápido!',46],['Tô ficando tonto!',48],
 ['Abre a roda!',72],['Fecha a roda!',70],['Au, au!',90],['Ele quer entrar na roda!',36],['Roda de cinco!',60],['E agora... senta!',48],['Ciranda do Pipoca!',44],
 ['Amanhã a roda é maior!',38]]);
radio.visible=false;
var C=[0,0.2];
// círculo de giz + florzinhas
(function(){var r=new THREE.Mesh(new THREE.TorusGeometry(1.5,0.05,6,60),new THREE.MeshStandardMaterial({color:col(0xffffff),roughness:0.9}));r.rotation.x=PI/2;r.position.set(C[0],0.13,C[1]);scene.add(r);
 for(var i=0;i<14;i++){var a=i/14*2*PI+0.2,rr=3.1+0.3*Math.sin(i*2.3),f=new THREE.Group();f.position.set(C[0]+Math.sin(a)*rr,0,C[1]+Math.cos(a)*rr);scene.add(f);
  var st=box(0.06,0.35,0.06,0x2f9e5b);st.position.y=0.17;f.add(st);var fl=box(0.24,0.08,0.24,[0xff5d8f,0xffd23f,0xffffff,0xc39bff][i%4]);fl.position.y=0.38;f.add(fl);var md=box(0.1,0.1,0.1,0xffb000);md.position.y=0.43;f.add(md);}})();
var T={ARR:3.0,ASK:3.2,HANDS:5.0,SPIN:6.2,FAST:11.0,STOP:16.5,OPEN:19.8,CLOSE:22.2,HUG:23.6,FIVE:27.0,SPIN5:28.4,SIT:33.0,YAY:36.0,DANCE:41.6,WAVE:55.5,END:60};
var END=T.END;
function track(K){return function(t){if(t<=K[0][0])return K[0][1];for(var i=1;i<K.length;i++)if(t<K[i][0]){var u=(t-K[i-1][0])/(K[i][0]-K[i-1][0]);return lerp(K[i-1][1],K[i][1],u);}return K[K.length-1][1];};}
var PH=track([[T.SPIN,0],[T.FAST,2.4],[T.STOP,11.2]]),PH5=track([[T.SPIN5,0],[31.4,1.6],[T.SIT,2.1]]);
var RR=track([[0,1.5],[T.OPEN,1.5],[21.2,2.4],[T.CLOSE,2.4],[T.HUG,1.35],[T.FIVE,1.35],[T.SPIN5,1.6]]);
var B4={leo:0,bia:PI/2,teo:PI,duda:1.5*PI,dog:1.6*PI},B5={leo:0,bia:0.4*PI,teo:0.8*PI,duda:1.2*PI,dog:1.6*PI};
var OFF=11.2%(2*PI);
function ang(n,t){if(t<T.FIVE)return B4[n]+PH(t);var a4=B4[n]+OFF,a5=B5[n]+OFF;if(t<T.SPIN5)return lerp(a4,a5,ez(lin(t,T.FIVE,T.SPIN5)));return a5+PH5(t);}
function ringP(a,r){return [C[0]+Math.sin(a)*r,C[1]+Math.cos(a)*r];}
var HOLD={aLx:-0.75,aRx:-0.75,aLz:-1.0,aRz:1.0,eL:-0.15,eR:-0.15};
var LAUGHW=[[16.8,19.0],[34.0,35.8]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function circ(n,t){var a=ang(n,t),r=RR(t),p=ringP(a,r),yaw=yawTo(p,C),s={p:p,yaw:yaw,pose:'none',face:'happy',A:{}},g;
 if(t<T.HANDS){s.pose='stand';return s;}
 if(t<T.SPIN){var k=S(t,T.HANDS,5.6);s.A={aLx:-0.75*k,aRx:-0.75*k,aLz:-1.0*k,aRz:1.0*k,eL:-0.15,eR:-0.15};return s;}
 if(t<T.FAST){g=0.45*Math.sin(t*10);s.A=ext({lL:g,lR:-g},HOLD);s.y=Math.abs(Math.sin(t*10))*0.04;s.roll=0.05*Math.sin(t*5);return s;}
 if(t<T.STOP){g=0.9*Math.sin(t*17);s.A=ext({lL:g,lR:-g},HOLD);s.y=Math.abs(Math.sin(t*17))*0.12;s.face=(n==='teo'&&t>14.0)?'wow':'tongue';s.roll=-0.12;return s;}
 if(t<T.OPEN){var w=1-S(t,18.6,19.6);if(n==='teo'&&t>16.8&&t<19.4){s.pose='sitg';s.A={aLx:-0.5,aRx:-0.5,aLz:-0.5,aRz:0.5};s.face='tongue';s.roll=0.08*Math.sin(t*9);return s;}
  if(inW(t,LAUGHW)){s.pose='laugh';s.face='tongue';}else s.face='wow';s.roll=0.16*Math.sin(t*5)*w;s.yaw=yaw+0.3*Math.sin(t*3.3)*w;if(t>19.2&&n==='bia'){s.pose='none';s.A={aLx:-2.6,aRx:-2.6,aLz:-0.4,aRz:0.4};s.face='happy';}return s;}
 if(t<T.CLOSE){g=(t<21.2)?0.45*Math.sin(t*10):0;s.A={aLx:-2.6,aRx:-2.6,aLz:-0.5,aRz:0.5,eL:-0.1,eR:-0.1,lL:g,lR:-g};s.y=(t>=21.2)?Math.abs(Math.sin(t*9))*0.12:0;
  if(n==='duda'&&t>21.6){s.A={aLx:-1.3,aRx:-1.3,aLz:0.3,aRz:-0.3,eL:-0.4,eR:-0.4};}return s;}
 if(t<T.FIVE){g=(t<T.HUG)?0.45*Math.sin(t*10):0;s.A={aLx:-1.25,aRx:-1.25,aLz:0.5,aRz:-0.5,eL:-0.7,eR:-0.7,lL:g,lR:-g};s.pitch=0.12;
  if(inW(t,[[25.2,26.8]])&&n==='teo'){s.A={aLx:-0.3,aRx:-2.4,aRz:0.3,eR:-0.4};s.pitch=0;}if(t>24.0&&t<25.2)s.face='tongue';return s;}
 if(t<T.SPIN5){var k2=S(t,T.FIVE,T.SPIN5);g=0.45*Math.sin(t*10)*(1-k2);s.A={aLx:lerp(-1.25,-0.75,k2),aRx:lerp(-1.25,-0.75,k2),aLz:lerp(0.5,-1.0,k2),aRz:lerp(-0.5,1.0,k2),eL:-0.3,eR:-0.3,lL:g,lR:-g};return s;}
 if(t<T.SIT){var mvg=t<32.6;g=mvg?0.45*Math.sin(t*10):0;s.A=ext({lL:g,lR:-g},HOLD);s.y=mvg?Math.abs(Math.sin(t*10))*0.04:0;s.roll=mvg?0.05*Math.sin(t*5):0;
  if(n==='leo'&&t>31.0&&t<32.4){s.face='wow';}return s;}
 s.pose='sitg';s.A={aLx:-0.75,aRx:-0.75,aLz:-0.9,aRz:0.9,eL:-0.15,eR:-0.15};if(inW(t,LAUGHW)){s.face='tongue';s.roll=0.06*Math.sin(t*10);}return s;}
// fila final em ordem da esquerda para a direita (sem ninguém cruzar)
var FX=[-1.95,-0.65,0.65,1.95],FIN={},DF=[0,3.5];
(function(){var ns=['leo','bia','teo','duda'].map(function(n){return [n,ringP(ang(n,T.YAY),RR(T.YAY))];});ns.sort(function(a,b){return a[1][0]-b[1][0];});ns.forEach(function(e,i){FIN[e[0]]=[FX[i],2.6];});})();
var STY={leo:0,bia:3,teo:2,duda:1};
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
var STARTS={leo:[1.2,4.6],bia:[4.4,0.8],teo:[-1.0,-4.2],duda:[-4.4,0.0]};
['leo','bia','teo','duda'].forEach(function(n){var s0=STARTS[n],p3=ringP(B4[n],1.5),py=ringP(B4[n]+OFF+B5[n]-B4[n]+PH5(T.SIT),1.6),pe=ringP(ang(n,T.YAY),RR(T.YAY));
 TL[n]=[hold(0,0.2,s0,yawTo(s0,p3),'stand'),mv(0.2,2.7,[s0,p3],'run',{face:'happy'}),turnTo(2.7,3.0,p3,yawTo(s0,p3),yawTo(p3,C),'stand',{face:'happy'}),
  cust(3.0,T.YAY,function(t){return circ(n,t);}),
  cust(T.YAY,36.6,function(t,u){var s=circ(n,T.YAY);return {p:pe,yaw:s.yaw,pose:'none',y:lerp(GROUND_Y,0,ez(u))*(1-ez(u))*0,face:'happy',A:{aLx:-2.6,aRx:-2.6,aLz:-0.3,aRz:0.3}};}),
  mv(36.6,38.2,[pe,[lerp(pe[0],FIN[n][0],0.5),lerp(pe[1],FIN[n][1],0.5)+0.3],FIN[n]],'walk',{face:'happy'}),turnTo(38.2,38.5,FIN[n],yawTo(pe,FIN[n]),0,'stand',{face:'happy'}),
  hold(38.5,T.DANCE,FIN[n],0,'cheer',{face:'happy'})].concat(tail(n));});
// ----- Pipoca -----
var d0=[-3.8,3.6];
function dogRing(t){var a=ang('dog',t);return ringP(a,RR(t));}
DG=[hold(0,0.4,d0,yawTo(d0,C),'stand'),mv(0.4,2.8,[d0,[-1.2,1.6],C],'drun'),turnTo(2.8,3.1,C,yawTo([-1.2,1.6],C),0,'sit'),
 cust(3.1,T.FAST,function(t){var yw=(t>T.SPIN)?Math.atan2(Math.sin(PH(t)),Math.cos(PH(t))):0;return {p:C,yaw:yw,pose:'sit',tailF:24,hz:0.15*Math.sin(t*3)};}),
 cust(T.FAST,T.STOP,function(t){var a=(t-T.FAST)*7.5;return {p:[C[0]+0.18*Math.sin(a),C[1]+0.18*Math.cos(a)],yaw:a+PI/2,pose:'drun',tailF:40,tailA:1.2};}),
 cust(T.STOP,T.OPEN,function(t){var w=1-S(t,18.8,19.6);return {p:C,yaw:(T.STOP-T.FAST)*7.5+PI/2+0.6*Math.sin(t*2.5)*w,pose:'stand',roll:0.25*Math.sin(t*6)*w,hz:0.3*Math.sin(t*4)*w,tailF:10};}),
 hold(T.OPEN,T.CLOSE,C,0,'sit',{tailF:30}),
 cust(T.CLOSE,T.FIVE,function(t){if(t<T.HUG)return {p:C,yaw:0,pose:'sit',tailF:34};if(t>24.0&&t<25.0)return {p:C,yaw:0.4,pose:'bark'};return {p:C,yaw:0.3*Math.sin(t*2),pose:'hind',wig:1,lift:1,tailF:38,tailA:1.2};}),
 cust(T.FIVE,T.SPIN5,function(t,u){var q=dogRing(t),p=L2(C,q,ez(u));return {p:p,yaw:yawTo(C,q),pose:'dwalk'};}),
 cust(T.SPIN5,T.SIT,function(t){var q=dogRing(t);return {p:q,yaw:yawTo(q,C),pose:'hind',still:true,lift:1,tailF:36,y:0.42+Math.abs(Math.sin(t*10))*0.05};}),
 cust(T.SIT,T.YAY,function(t){var q=dogRing(t);return {p:q,yaw:yawTo(q,C),pose:inW(t,LAUGHW)?'party':'sit',tailF:34};}),
 cust(T.YAY,37.0,function(t){var q=dogRing(T.YAY);return {p:q,yaw:yawTo(q,C),pose:'party'};})];
(function(){var q=dogRing(T.YAY);DG.push(mv(37.0,38.0,[q,[q[0]*0.5,2.0],DF],'drun'),turnTo(38.0,38.2,DF,0,0,'stand'),hold(38.2,END+2,DF,0,'party'));})();
BURST=[[T.YAY,C,2.0],[T.DANCE,[0,2.6],2.2],[T.DANCE+3,[0,2.6],2.2]];
BW=[['Vamos fazer uma ciranda?',3.2,4.7,kp('bia',2.9,0),1],['Todo mundo de mãos dadas!',4.8,6.2,kp('teo',2.9,0),1],['O Pipoca fica no meio!',8.0,9.6,kp('duda',2.9,0),1],
 ['Agora mais rápido!',10.0,11.4,kp('leo',2.9,0),1],['Tô ficando tonto!',14.2,15.8,kp('teo',2.9,0),1],['Abre a roda!',19.2,20.6,kp('bia',2.9,0),1],
 ['Fecha a roda!',21.6,22.9,kp('duda',2.9,0),1],['Au, au!',24.0,25.0,dp(1.3),0.9],['Ele quer entrar na roda!',25.2,26.8,kp('teo',2.9,0),1],
 ['Roda de cinco!',28.6,30.0,kp('duda',2.9,0),1],['E agora... senta!',31.0,32.4,kp('leo',2.9,0),1],['Ciranda do Pipoca!',34.0,35.6,kp('bia',2.2,0),1],
 ['Amanhã a roda é maior!',50.5,54.5,kp('teo',2.9,0.4),1]];
function ORB(a0,a1,e0,e1,t0,t1,fov,m){return function(t){var u=ez(lin(t,t0,t1));return frameOn(ALL,lerp(a0,a1,u),lerp(e0,e1,u),fov||46,m||0.16);};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.ASK,ORB(-30,-15,52,56,0,T.ASK)],
 [T.ASK,T.FAST,ORB(-15,25,56,52,T.ASK,T.FAST)],
 [T.FAST,T.STOP,ORB(25,85,58,62,T.FAST,T.STOP)],
 [T.STOP,T.OPEN,ORB(-20,-10,48,46,T.STOP,T.OPEN)],
 [T.OPEN,23.2,ORB(10,25,58,56,T.OPEN,23.2)],
 [23.2,T.FIVE,ORB(25,35,62,60,23.2,T.FIVE)],
 [T.FIVE,T.SIT,ORB(-25,10,54,58,T.FIVE,T.SIT,46,0.22)],
 [T.SIT,T.YAY,ORB(10,0,46,44,T.SIT,T.YAY)],
 [T.YAY,38.6,ORB(0,0,48,46,T.YAY,38.6)],
 [38.6,T.DANCE,function(t){return mixCam(frameOn(ALL,0,46,46,0.2),FL(),ez(lin(t,38.6,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.8,'bark'],[T.ASK,'ta'],[T.HANDS,'chime'],[T.FAST,'go'],[T.FAST,'run'],[T.STOP,'whoosh'],[16.8,'boing'],[17.0,'laugh'],[T.OPEN,'up'],[T.CLOSE,'down'],
 [24.0,'bark'],[24.5,'bark'],[T.FIVE,'chime'],[T.SIT,'thud'],[34.0,'laugh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
// balões presos dentro da tela (não saem pelas bordas)
var _bv=new THREE.Vector3();
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*(w[4]||1);
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));
  _bv.set(p[0],p[1]+0.45*k,p[2]);var d=_bv.distanceTo(camPosV),tv=Math.tan(camera.fov*PI/360),hw=0.9*k/(d*tv*W/H),hh=0.45*k/(d*tv);
  _bv.project(camera);_bv.x=clamp(_bv.x,-1+hw+0.03,1-hw-0.03);_bv.y=Math.min(_bv.y,1-hh-0.03);_bv.unproject(camera);
  m.position.copy(_bv);m.quaternion.copy(camera.quaternion);}});}
