// ===== Corrida de Carrinho de Mão =====
makeBubs([['Corrida de carrinho de mão!',34],['Eu sou o carrinho!',48],['Preparados?',72],['Au!',100],['Devagar, Teo!',62],['Desculpa, Duda!',56],
 ['Devagar e sempre!',50],['Pipoca, sai da frente!',40],['Ganhamos!',76],['Foi culpa do Pipoca!',42],['Agora o Pipoca é o carrinho!',32],['Valendo!',80],
 ['Ele é rápido demais!',42],['Pipoca campeão!',54],['Quem corre comigo amanhã?',34]]);
radio.visible=false;
// ----- linhas de giz e cones -----
(function(){var a=box(4.6,0.04,0.14,0xffffff);a.position.set(0,0.13,2.3);a.castShadow=false;scene.add(a);
 var b=box(4.6,0.04,0.14,0xffffff);b.position.set(0,0.13,-1.2);b.castShadow=false;scene.add(b);
 [[-2.5,2.3],[2.5,2.3],[-2.5,-1.2],[2.5,-1.2]].forEach(function(p,i){var c=new THREE.Mesh(new THREE.ConeGeometry(0.22,0.6,16),mat(i<2?0xff7a1a:0x3a8bff));c.position.set(p[0],0.38,p[1]);c.castShadow=true;scene.add(c);
  var s=box(0.46,0.08,0.46,i<2?0xff7a1a:0x3a8bff);s.position.set(p[0],0.12,p[1]);scene.add(s);});})();
var T={ARR:3.0,CALL1:3.2,DOWN:6.0,GO1:8.0,FLOP:12.2,LICK:16.3,WINB:19.2,ASK:24.2,SET:25.8,GO2:29.0,FALL:31.2,GATH:34.8,YAY:36.0,DANCE:41.6,WAVE:55.5,END:60};
var END=T.END;
var PHI=1.62,HF=0.85,XA=-1.0,XB=1.0,Z0=-3.6;
function track(K){return function(t){if(t<=K[0][0])return K[0][1];for(var i=1;i<K.length;i++)if(t<K[i][0]){var u=(t-K[i-1][0])/(K[i][0]-K[i-1][0]);return lerp(K[i-1][1],K[i][1],u);}return K[K.length-1][1];};}
var zA=track([[T.GO1,Z0],[16.3,-0.4],[19.8,-0.4],[21.6,0.2]]);
var zB=track([[T.GO1,Z0],[T.FLOP,-1.0],[15.0,-1.0],[T.WINB,0.4]]);
// carrinho (quem anda com as mãos): k = 0 em pé .. 1 deitado de mãos no chão; f = 0..1 caído de barriga
function wbS(x,z,t,k,f,face){var ph=z*9,sw=0.35*Math.sin(ph)*k*(1-f);var pitch=lerp(lerp(0,PHI,k),PI/2,f),y=lerp(lerp(0,HF,k),0.24,f);
 return {p:[x,z],yaw:0,pose:'none',y:y,pitch:pitch,face:face||'happy',A:{aLx:lerp(lerp(-0.1,-PHI,k)+sw,-2.9,f),aRx:lerp(lerp(-0.1,-PHI,k)-sw,-2.9,f),aLz:lerp(0,-0.3,f),aRz:lerp(0,0.3,f),eL:-0.1,eR:-0.1,lL:0,lR:0,hx:lerp(-1.0*k,-0.7,f)}};}
// quem segura as pernas: fica atrás dos pés do carrinho
function hdS(x,z,t,k,face,o){var ph=z*9,g=0.5*Math.sin(ph)*k;var s={p:[x,z-lerp(0.9,0.62,k)],yaw:0,pose:'none',y:Math.abs(Math.sin(ph))*0.04,face:face||'happy',
 A:{aLx:lerp(-0.1,-0.78,k),aRx:lerp(-0.1,-0.78,k),aLz:lerp(0,0.3,k),aRz:lerp(0,-0.3,k),eL:lerp(-0.1,0,k),eR:lerp(-0.1,0,k),lL:g,lR:-g,hx:0.25*k}};return ext(s,o,t);}
var LAUGHW=[[13.0,14.4],[22.0,23.6]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
var FIN={bia:[-1.95,2.6],leo:[-0.65,2.6],duda:[0.65,2.6],teo:[1.95,2.6]},DF=[0,3.5],JD=[0,3.1];
var STY={leo:0,bia:3,teo:2,duda:1};
var SB=[-1.6,2.9],SD=[1.6,2.9],ST=[2.3,1.3],P2=[0,-1.6],LH=[0,-2.62];
function tail(n){return [hold(T.YAY,T.DANCE,FIN[n],0,'cheer',{face:'happy'}),cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
var dZ=track([[T.GO2,P2[1]],[T.FALL,3.4]]);
(function(){
 // BIA (carrinho da raia A)
 TL.bia=[hold(0,0.2,[-3.0,-4.2],yawTo([-3.0,-4.2],[XA,Z0]),'stand'),mv(0.2,2.4,[[-3.0,-4.2],[XA,Z0]],'run',{face:'happy'}),turnTo(2.4,2.8,[XA,Z0],yawTo([-3.0,-4.2],[XA,Z0]),0,'stand',{face:'happy'}),
  hold(2.8,T.DOWN,[XA,Z0],0,'stand',function(t){return t>4.8&&t<6.0?{pose:'clap',face:'happy'}:{face:'happy'};}),
  cust(T.DOWN,23.4,function(t){var k=S(t,T.DOWN,6.6),z=zA(t),face=(t>16.3&&t<19.5)?'tongue':(t>15.4&&t<16.3?'focus':'happy');if(inW(t,LAUGHW))face='tongue';return wbS(XA,z,t,k,0,face);}),
  cust(23.4,24.0,function(t,u){return wbS(XA,0.2,t,1-ez(u),0,'happy');}),
  mv(24.0,25.4,[[XA,0.2],[-1.9,1.4],SB],'walk',{face:'happy'}),turnTo(25.4,25.7,SB,yawTo([-1.9,1.4],SB),yawTo(SB,P2),'stand',{face:'happy'}),
  hold(25.7,T.GO2,SB,yawTo(SB,P2),'stand',{face:'happy'}),hold(T.GO2,T.FALL,SB,yawTo(SB,[0,1.5]),'cheer',{face:'happy'}),
  hold(T.FALL,T.GATH,SB,yawTo(SB,[0,2.6]),'clap',function(t){return t>33.2?{pose:'cheer',face:'happy'}:{face:'happy'};}),
  mv(T.GATH,35.6,[SB,FIN.bia],'walk',{face:'happy'}),turnTo(35.6,T.YAY,FIN.bia,yawTo(SB,FIN.bia),0,'stand',{face:'happy'})].concat(tail('bia'));
 // LÉO (segura a Bia; depois segura o Pipoca)
 TL.leo=[hold(0,0.2,[-2.6,-5.2],yawTo([-2.6,-5.2],[XA,Z0-0.9]),'stand'),mv(0.2,2.6,[[-2.6,-5.2],[XA,Z0-0.9]],'run',{face:'happy'}),turnTo(2.6,3.0,[XA,Z0-0.9],yawTo([-2.6,-5.2],[XA,Z0-0.9]),0,'stand',{face:'happy'}),
  hold(3.0,T.DOWN,[XA,Z0-0.9],0,'none',function(t){return t<4.7?{A:{aRx:-2.7,eR:-0.3,aRz:0.2,aLx:-2.7,eL:-0.3,aLz:-0.2},face:'happy'}:{pose:'stand',face:'happy'};}),
  cust(T.DOWN,23.4,function(t){var k=S(t,T.DOWN,6.6),z=zA(t),face='focus';if(t>16.3&&t<19.5)face='wow';if(inW(t,LAUGHW))face='tongue';
   return hdS(XA,z,t,k,face,(t>16.6&&t<18.0)?{A:{aLx:-0.78,aRx:-0.78,aLz:0.3,aRz:-0.3,eL:0,eR:0,hx:-0.1}}:null);}),
  cust(23.4,24.0,function(t,u){return hdS(XA,0.2,t,1-ez(u),'happy');}),
  hold(24.0,T.SET,[XA,-0.4],0,'clap',{face:'happy'}),
  mv(T.SET,27.2,[[XA,-0.4],[-1.1,-2.0],LH],'walk',{face:'happy'}),turnTo(27.2,27.5,LH,yawTo([-1.1,-2.0],LH),0,'stand',{face:'happy'}),
  cust(27.5,T.GO2,function(t,u){var k=S(t,27.5,28.0);return {p:LH,yaw:0,pose:'none',face:'focus',A:{aLx:lerp(-0.1,-0.95,k),aRx:lerp(-0.1,-0.95,k),aLz:0.25*k,aRz:-0.25*k,eL:0,eR:0,hx:0.25}};}),
  cust(T.GO2,T.FALL,function(t){var z=dZ(t)-1.02,ph=t*17;return {p:[0,z],yaw:0,pose:'none',face:'wow',pitch:-0.15,y:Math.abs(Math.sin(ph))*0.12,A:{aLx:-1.15,aRx:-1.15,aLz:0.25,aRz:-0.25,eL:0,eR:0,lL:Math.sin(ph)*0.95,lR:-Math.sin(ph)*0.95,hx:0.1}};}),
  cust(T.FALL,T.GATH,function(t,u){var p=[0,dZ(T.FALL)-1.02];var k=S(t,T.FALL,31.6);return {p:p,yaw:0,pose:k>0.5?'sitg':'none',y:k>0.5?0:0,face:'tongue',A:k>0.5?{aLx:-0.6,aRx:-0.6,aLz:-0.4,aRz:0.4}:{aLx:-1.5,aRx:-1.5},roll:0.05*Math.sin(t*12),pitch:k<=0.5?0.3*k:0};}),
  mv(T.GATH,35.6,[[0,dZ(T.FALL)-1.02],FIN.leo],'walk',{face:'happy'}),turnTo(35.6,T.YAY,FIN.leo,yawTo([0,2.38],FIN.leo),0,'stand',{face:'happy'})].concat(tail('leo'));
 // DUDA (carrinho da raia B)
 TL.duda=[hold(0,0.2,[3.0,-4.2],yawTo([3.0,-4.2],[XB,Z0]),'stand'),mv(0.2,2.4,[[3.0,-4.2],[XB,Z0]],'run',{face:'happy'}),turnTo(2.4,2.8,[XB,Z0],yawTo([3.0,-4.2],[XB,Z0]),0,'stand',{face:'happy'}),
  hold(2.8,T.DOWN,[XB,Z0],0,'none',function(t){return t>4.8&&t<6.0?{A:{aRx:-2.6,eR:-0.4,aLx:-0.2},face:'happy'}:{pose:'stand',face:'happy'};}),
  cust(T.DOWN,19.3,function(t){var k=S(t,T.DOWN,6.6),z=zB(t),f=S(t,T.FLOP,12.5)*(1-S(t,14.4,15.0)),face=(t>10.6&&t<12.2)?'wow':'happy';if(inW(t,LAUGHW)||(t>12.5&&t<14.4))face='tongue';return wbS(XB,z,t,k,f,face);}),
  cust(19.3,19.9,function(t,u){return wbS(XB,0.4,t,1-ez(u),0,'happy');}),hold(19.9,22.6,[XB,0.4],0,'cheer',function(t){return inW(t,LAUGHW)?{pose:'laugh',face:'tongue'}:{face:'happy'};}),
  mv(22.6,23.8,[[XB,0.4],[1.9,1.6],SD],'walk',{face:'happy'}),turnTo(23.8,24.1,SD,yawTo([1.9,1.6],SD),yawTo(SD,[0,1.0]),'stand',{face:'happy'}),
  hold(24.1,T.GO2,SD,yawTo(SD,[0,1.0]),'none',function(t){return t<25.8?{A:{aRx:-2.5,eR:-0.4,aLx:-0.2},face:'happy'}:{pose:'stand',face:'happy'};}),
  hold(T.GO2,T.FALL,SD,yawTo(SD,[0,1.5]),'cheer',{face:'happy'}),hold(T.FALL,T.GATH,SD,yawTo(SD,[0,2.6]),'laugh',{face:'tongue'}),
  mv(T.GATH,35.4,[SD,FIN.duda],'walk',{face:'happy'}),turnTo(35.4,35.7,FIN.duda,yawTo(SD,FIN.duda),0,'stand',{face:'happy'})].concat(tail('duda'));
 // TEO (segura a Duda)
 TL.teo=[hold(0,0.2,[2.6,-5.2],yawTo([2.6,-5.2],[XB,Z0-0.9]),'stand'),mv(0.2,2.6,[[2.6,-5.2],[XB,Z0-0.9]],'run',{face:'happy'}),turnTo(2.6,3.0,[XB,Z0-0.9],yawTo([2.6,-5.2],[XB,Z0-0.9]),0,'stand',{face:'happy'}),
  hold(3.0,T.DOWN,[XB,Z0-0.9],0,'stand',{face:'happy'}),
  cust(T.DOWN,19.4,function(t){var k=S(t,T.DOWN,6.6)*(1-S(t,T.FLOP,12.4))+S(t,14.2,14.6),z=zB(t),face='happy';
   if(t>T.FLOP&&t<14.4)return {p:[XB,zB(t)-0.9],yaw:0,pose:t>13.0?'laugh':'none',face:t>13.0?'tongue':'wow',A:t>13.0?null:{aLx:-1.3,aRx:-1.3,aLz:0.6,aRz:-0.6,eL:-1.8,eR:-1.8}};
   if(t>6.6&&t<8.0)return hdS(XB,z,t,1,'happy',{A:{aLx:-0.78,aRx:-0.78,aLz:0.3,aRz:-0.3,eL:0,eR:0,hx:0.25,lL:0,lR:0}});
   return hdS(XB,z,t,Math.min(1,k),t<T.FLOP?'happy':'focus');}),
  hold(19.4,22.6,[XB,-0.5],0,'cheer',function(t){return inW(t,LAUGHW)?{pose:'laugh',face:'tongue'}:{face:'happy'};}),
  mv(22.6,23.8,[[XB,-0.5],[2.0,0.2],ST],'walk',{face:'happy'}),turnTo(23.8,24.1,ST,yawTo([2.0,0.2],ST),yawTo(ST,[0,0]),'stand',{face:'happy'}),
  hold(24.1,T.GO2,ST,yawTo(ST,[0,0]),'none',function(t){return (t>27.6&&t<28.8)?{A:{aRx:-2.8,eR:-0.2,aRz:0.3,aLx:-0.2},face:'happy'}:{pose:'stand',face:'happy'};}),
  hold(T.GO2,T.FALL,ST,yawTo(ST,[0,1.5]),'cheer',{face:'happy'}),hold(T.FALL,T.GATH,ST,yawTo(ST,[0,2.6]),'clap',{face:'happy'}),
  mv(T.GATH,35.4,[ST,FIN.teo],'walk',{face:'happy'}),turnTo(35.4,35.7,FIN.teo,yawTo(ST,FIN.teo),0,'stand',{face:'happy'})].concat(tail('teo'));
})();
// ----- Pipoca (juiz) -----
var d0=[3.6,3.6],LK=[XA,2.62];
function wheel(t,z,run){var q=t*(run?26:10);return {p:[0,z],yaw:0,pose:'none',pitch:0.5,y:0.22,legs:[-0.5+Math.sin(q)*0.7,-0.5-Math.sin(q)*0.7,1.6,1.6],tailF:36,tailA:1.1};}
DG=[hold(0,0.4,d0,yawTo(d0,JD),'stand'),mv(0.4,2.8,[d0,[1.4,3.6],JD],'drun'),turnTo(2.8,3.1,JD,yawTo([1.4,3.6],JD),PI,'sit'),
 hold(3.1,7.4,JD,PI,'sit',{tailF:20}),hold(7.4,8.0,JD,PI,'bark'),hold(8.0,15.9,JD,PI,'sit',function(t){return {tailF:30,hz:(t>12.2&&t<14.4)?0.3*Math.sin(t*6):0};}),
 mv(15.9,16.3,[JD,LK],'drun',{tailF:36}),turnTo(16.3,16.45,LK,yawTo(JD,LK),PI,'stand'),
 cust(16.45,19.5,function(t){return {p:LK,yaw:PI+0.15*Math.sin(t*4),pose:'stand',hx:0.25+0.2*Math.sin(t*16),tailF:38,tailA:1.2};}),
 mv(19.5,20.3,[LK,[-0.6,3.3],JD],'drun'),turnTo(20.3,20.6,JD,yawTo([-0.6,3.3],JD),PI*0.9,'sit'),
 cust(20.6,T.SET,function(t){return {p:JD,yaw:PI*0.9,pose:inW(t,LAUGHW)?'party':'sit',tailF:34};}),
 mv(T.SET,27.0,[JD,[0,1.0],P2],'dwalk'),turnTo(27.0,27.5,P2,PI,0,'stand'),
 cust(27.5,T.GO2,function(t,u){var k=S(t,27.6,28.1),w=wheel(t,P2[1],false);w.pitch*=k;w.y*=k;w.legs=[w.legs[0]*k,w.legs[1]*k,1.6*k,1.6*k];w.legs[0]=-0.5*k;w.legs[1]=-0.5*k;return w;}),
 cust(T.GO2,T.FALL,function(t){return wheel(t,dZ(t),true);}),
 cust(T.FALL,T.YAY,function(t){var k=1-S(t,T.FALL,31.5);if(k>0){var w=wheel(t,3.4,false);w.pitch*=k;w.y*=k;w.legs=[-0.5*k,-0.5*k,1.6*k,1.6*k];return w;}return {p:[0,3.4],yaw:0,pose:(t>33.2&&t<34.8)?'hind':'party',wig:1,lift:1,tailF:36};}),
 hold(T.YAY,END+2,[0,3.4],0,'party')];
BURST=[[T.WINB,[XB,2.4],1.6],[T.YAY,[0,2.6],2.2],[T.DANCE,[0,2.6],2.2],[T.DANCE+3,[0,2.6],2.2]];
function kpw(n,dz){return function(){var p=KIDS[n].root.position;return [p.x,1.4,p.z+dz];};}
BW=[['Corrida de carrinho de mão!',3.2,4.7,kp('leo',2.9,0.4),1],['Eu sou o carrinho!',4.8,6.0,kp('duda',2.9,0.2),1],['Preparados?',6.6,7.4,kp('teo',2.9,0.3),1],
 ['Au!',7.4,8.0,dp(1.3),0.9],['Devagar, Teo!',10.6,12.0,kpw('duda',1.8),1],['Desculpa, Duda!',12.8,14.2,kp('teo',2.9,0.3),1],['Devagar e sempre!',15.4,16.3,kpw('bia',1.8),1],
 ['Pipoca, sai da frente!',16.6,18.0,kp('leo',2.9,0),1],['Ganhamos!',19.4,20.8,kp('teo',2.9,0.2),1],['Foi culpa do Pipoca!',21.8,23.3,kpw('bia',1.8),1],
 ['Agora o Pipoca é o carrinho!',24.2,25.8,kp('duda',2.9,-0.3),1],['Valendo!',27.6,28.8,kp('teo',2.9,-0.2),1],['Ele é rápido demais!',31.4,32.9,kp('leo',2.0,0.3),1],
 ['Pipoca campeão!',33.2,34.8,kp('bia',2.9,0.3),1],['Quem corre comigo amanhã?',50.5,54.5,kp('duda',2.9,0.2),1]];
var EXL=[[-2.5,2.3],[2.5,2.3]];
function PAN(a0,a1,e0,e1,t0,t1,fov,m){return function(t){var u=ez(lin(t,t0,t1));return frameC(ALL,lerp(a0,a1,u),lerp(e0,e1,u),fov||44,m||0.1,null,1.2);};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.CALL1,PAN(-35,-28,40,36,0,T.CALL1)],
 [T.CALL1,T.GO1,PAN(-30,-38,34,30,T.CALL1,T.GO1)],
 [T.GO1,12.0,PAN(40,32,30,32,T.GO1,12.0)],
 [12.0,15.3,PAN(48,42,30,32,12.0,15.3)],
 [15.3,19.4,PAN(-40,-34,28,30,15.3,19.4,44,0.2)],
 [19.4,24.0,PAN(30,20,34,36,19.4,24.0)],
 [24.0,29.0,PAN(-30,-40,36,32,24.0,29.0)],
 [29.0,T.FALL,PAN(-12,-4,32,32,29.0,T.FALL)],
 [T.FALL,T.YAY,PAN(20,0,34,38,T.FALL,T.YAY)],
 [T.YAY,38.5,PAN(-5,0,42,40,T.YAY,38.5)],
 [38.5,T.DANCE,function(t){return mixCam(frameOn(ALL,0,40,46,0.2,EXL),FL(),ez(lin(t,38.5,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.8,'bark'],[T.CALL1,'ta'],[T.DOWN,'boing'],[7.4,'bark'],[T.GO1,'go'],[T.GO1,'run'],[T.FLOP+0.2,'thud'],[13.0,'laugh'],[16.3,'lick'],[T.WINB,'confetti'],[22.0,'laugh'],
 [27.6,'go'],[T.GO2,'run'],[T.GO2,'bark'],[T.FALL+0.3,'thud'],[31.6,'laugh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
// balões presos dentro da tela (não saem pelas bordas)
var _bv=new THREE.Vector3();
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*(w[4]||1);
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));
  _bv.set(p[0],p[1]+0.45*k,p[2]);var d=_bv.distanceTo(camPosV),tv=Math.tan(camera.fov*PI/360),hw=0.9*k/(d*tv*W/H),hh=0.45*k/(d*tv);
  _bv.project(camera);_bv.x=clamp(_bv.x,-1+hw+0.03,1-hw-0.03);_bv.y=Math.min(_bv.y,1-hh-0.03);_bv.unproject(camera);
  m.position.copy(_bv);m.quaternion.copy(camera.quaternion);}});}
