// ===== Pular Elástico =====
makeBubs([['Altura um: tornozelo!',40],['Vai, Bia! Vai!',62],['Agora no joelho!',50],['Me enrolei todo!',48],['Vez do Pipoca!',58],['Que pulo!',80],
 ['Agora bem alto!',54],['Ele passou por baixo!',40],['A Bia voou!',72],['Amanhã o elástico sobe mais!',30]]);
radio.visible=false;
var T={ARR:3.0,B1:4.8,LV2:11.0,TE:12.8,HOOK:15.0,FALL:15.6,FREE:17.6,DJ:20.4,LV3:24.0,CRAWL:25.8,B3:29.4,LAND:32.15,YAY:35.0,ROW:36.6,DANCE:39.0,WAVE:55.5,END:60};
var END=T.END;
var JY=0.85,LP=[0,-1.8],DP=[0,1.6],SX=0.4,XL=-0.95,XR=0.95,ZJ=0;
var BW0=[-2.0,-0.9],TW0=[-2.0,0.9],TW1=[1.6,-1.0],DS=[2.0,0.6],DR=[1.05,0],DL=[-1.05,0];
var FIN={bia:[-1.95,3.2],leo:[-0.65,3.2],duda:[0.65,3.2],teo:[1.95,3.2]},DF=[0,4.1];
var STY={leo:0,bia:3,teo:2,duda:1};
var LAUGHW=[[16.0,17.5],[27.4,29.0]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function track(K){return function(t){if(t<=K[0][0])return K[0][1];for(var i=1;i<K.length;i++)if(t<K[i][0]){var u=ez((t-K[i-1][0])/(K[i][0]-K[i-1][0]));return lerp(K[i-1][1],K[i][1],u);}return K[K.length-1][1];};}
var LV=track([[0,0.03],[3.0,0.03],[3.4,0.12],[T.LV2,0.12],[11.8,0.33],[T.LV3,0.33],[24.8,0.6],[T.ROW,0.6],[37.0,0.03]]);
function lg(o){return function(t,u){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue',A:null};return (typeof o==='function')?o(t,u):o;};}
// ----- pulos de lado: seq de x ('L','I','R','O'), um pulo a cada dt -----
var XS={L:XL,I:0,R:XR,O:0};
function hopsC(t0,dt,seq,hh,o){var n=seq.length-1;return cust(t0,t0+dt*n,function(t){var k=Math.min(n-1,Math.floor((t-t0)/dt)),u=clamp((t-t0)/dt-k,0,1);
 var a=XS[seq[k]],b=XS[seq[k+1]],air=u>0.12&&u<0.88,w=clamp((u-0.12)/0.76,0,1),x=lerp(a,b,ez(w)),y=air?hh*4*w*(1-w):0;
 var land=(u>=0.88)?seq[k+1]:seq[k];var s={p:[x,ZJ],yaw:JY,pose:'none',y:y,face:air?'tongue':'happy',on:(!air&&land==='O'),
  A:{aLx:-0.3,aRx:-0.3,aLz:air?-1.2:-0.5,aRz:air?1.2:0.5,eL:-0.3,eR:-0.3,lL:air?-0.35:0,lR:air?-0.35:0}};return ext(s,o,t,u);});}
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
function toFin(n,from,t0,t1,via){var e=FIN[n],pr=via.length?via[via.length-1]:from;
 return [mv(t0,t1,[from].concat(via,[e]),'walk',{face:'happy'}),turnTo(t1,t1+0.3,e,yawTo(pr,e),0,'stand',{face:'happy'}),hold(t1+0.3,T.DANCE,e,0,'cheer',{face:'happy'})];}
function arrive(n,s,p,yaw){return [hold(0,0.2,s,yawTo(s,p),'stand'),mv(0.2,2.6,[s,p],'run',{face:'happy'}),turnTo(2.6,T.ARR,p,yawTo(s,p),yaw,'stand',{face:'happy'})];}
var HOLDER={spread:1};
(function(){
 // LÉO (segura atrás)
 TL.leo=arrive('leo',[-2.6,-4.4],LP,0).concat([hold(T.ARR,3.2,LP,0,'stand',{face:'happy',spread:1}),
  hold(3.2,4.8,LP,0,'none',{face:'happy',spread:1,A:{aRx:-2.6,eR:-0.2,aRz:0.2,aLx:-0.2}}),
  hold(4.8,T.ROW,LP,0,'stand',lg(function(t){var s={face:'happy',spread:1};if(t>18.6&&t<20.0){s.pose='none';s.A={aRx:-1.6,eR:-0.1,aRz:-0.5,aLx:-0.2};}
   if(t>21.3&&t<22.6)s.pose='clap';if(t>14.9&&t<16.0)s.face='wow';if(t>32.2&&t<T.YAY)s.pose='cheer';if(t>=T.YAY)s.pose='cheer';return s;}))],
  toFin('leo',LP,37.4,39.0,[[-0.15,0.0],[-0.4,2.0]]).slice(0,2),[hold(39.3,T.DANCE,FIN.leo,0,'cheer',{face:'happy'})],tail('leo'));
 // DUDA (segura na frente)
 TL.duda=arrive('duda',[2.8,4.4],DP,PI).concat([hold(T.ARR,T.LV2,DP,PI,'stand',lg(function(t){var s={face:'happy',spread:1};if(t>7.0&&t<8.5)s.pose='clap';return s;})),
  hold(T.LV2,12.4,DP,PI,'none',{face:'happy',spread:1,A:{aLx:-2.6,eL:-0.2,aLz:-0.2,aRx:-0.2}}),
  hold(12.4,T.LV3,DP,PI,'stand',lg(function(t){var s={face:'happy',spread:1};if(t>14.9&&t<16.0)s.face='wow';if(t>20.4&&t<23.4)s.pose='look';return s;})),
  hold(T.LV3,25.4,DP,PI,'none',{face:'happy',spread:1,A:{aLx:-2.6,eL:-0.2,aLz:-0.2,aRx:-2.6,eR:-0.2,aRz:0.2}}),
  hold(25.4,T.ROW,DP,PI,'stand',lg(function(t){var s={face:'happy',spread:1};if(t>32.2)s.pose='cheer';return s;}))],
  toFin('duda',DP,T.ROW,37.6,[[0.4,2.4]]),tail('duda'));
 // BIA: pula no tornozelo e na altura alta
 TL.bia=arrive('bia',[-4.2,-3.2],BW0,yawTo(BW0,[0,0])).concat([turnTo(T.ARR,3.3,BW0,yawTo(BW0,[0,0]),yawTo(BW0,[0,0]),'stand',{face:'happy'}),
  mv(3.3,4.3,[BW0,[XL,ZJ]],'walk',{face:'happy'}),turnTo(4.3,T.B1,[XL,ZJ],yawTo(BW0,[XL,ZJ]),JY,'stand',{face:'focus'}),
  hopsC(T.B1,0.55,['L','I','R','I','O','R','I','L','O','L'],0.45),
  hold(9.75,10.4,[XL,ZJ],JY,'cheer',{face:'happy'}),mv(10.4,11.2,[[XL,ZJ],BW0],'walk',{face:'happy'}),turnTo(11.2,11.5,BW0,yawTo([XL,ZJ],BW0),yawTo(BW0,[0,0]),'stand',{face:'happy'}),
  hold(11.5,28.4,BW0,yawTo(BW0,[0,0]),'stand',lg(function(t){if(t>20.4&&t<23.4)return {pose:'clap',face:'happy'};if(t>14.9&&t<16.0)return {face:'wow'};return {face:'happy'};})),
  mv(28.4,29.0,[BW0,[XL,ZJ]],'walk',{face:'focus'}),turnTo(29.0,T.B3,[XL,ZJ],yawTo(BW0,[XL,ZJ]),JY,'stand',{face:'focus'}),
  hopsC(T.B3,0.55,['L','I','R','I','L','O'],0.85),
  hold(T.LAND,T.YAY,[0,ZJ],JY,'cheer',{face:'happy',on:true}),hold(T.YAY,T.ROW,[0,ZJ],JY,'cheer',{face:'happy',on:true})],
  toFin('bia',[0,ZJ],T.ROW,38.2,[[-1.2,1.0]]),tail('bia'));
 // TEO: pula no joelho, engancha e cai
 TL.teo=arrive('teo',[-4.4,3.4],TW0,yawTo(TW0,[0,0])).concat([hold(T.ARR,11.9,TW0,yawTo(TW0,[0,0]),'stand',function(t){if(t>7.0&&t<8.4)return {pose:'cheer',face:'happy'};return {face:'happy'};}),
  mv(11.9,12.5,[TW0,[XL,ZJ]],'walk',{face:'focus'}),turnTo(12.5,T.TE,[XL,ZJ],yawTo(TW0,[XL,ZJ]),JY,'stand',{face:'focus'}),
  hopsC(T.TE,0.55,['L','I','R','I','O'],0.5),
  cust(T.HOOK,T.FALL,function(t,u){return {p:[lerp(0,0.95,ez(u)),ZJ],yaw:JY-0.3*u,pose:'none',y:0.35*Math.sin(PI*u),roll:-0.35*u,face:'wow',hook:1,A:{aLx:-2.3,aRx:-2.3,aLz:-0.8,aRz:0.8,lL:-0.5,lR:0.5*u}};}),
  cust(T.FALL,16.0,function(t,u){var k=ez(u);return {p:[0.95,ZJ],yaw:JY-0.3,pose:'none',y:lerp(0,GROUND_Y,k),sit:k,face:'wow',hook:1,A:{aLx:-2.2,aRx:-2.2,aLz:-0.5,aRz:0.5,lL:-k*PI/2,lR:-k*PI/2}};}),
  cust(16.0,T.FREE,function(t){var lgh=inW(t,LAUGHW);return {p:[0.95,ZJ],yaw:JY-0.3,pose:'sitg',face:'tongue',hook:1,y:lgh?0.04*Math.abs(Math.sin(t*13)):0,roll:lgh?0.06*Math.sin(t*13):0,A:{aLx:-0.6,aRx:-0.6,aLz:0.3,aRz:-0.3,eL:-1.0,eR:-1.0}};}),
  cust(T.FREE,18.0,function(t,u){return {p:[0.95,ZJ],yaw:JY-0.3,pose:'none',y:lerp(GROUND_Y,0,ez(u)),sit:1-ez(u),face:'happy',hook:1-u,A:{lL:-(1-ez(u))*PI/2,lR:-(1-ez(u))*PI/2}};}),
  mv(18.0,18.8,[[0.95,ZJ],TW1],'walk',{face:'happy'}),turnTo(18.8,19.1,TW1,yawTo([0.95,ZJ],TW1),yawTo(TW1,[0,0]),'stand',{face:'happy'}),
  hold(19.1,T.ROW,TW1,yawTo(TW1,[0,0]),'stand',lg(function(t){if(t>21.3&&t<22.6)return {pose:'cheer',face:'happy'};if(t>26.0&&t<27.2)return {pose:'look',face:'wow'};if(t>32.2)return {pose:'clap',face:'happy'};return {face:'happy'};}))],
  toFin('teo',TW1,T.ROW+0.2,38.2,[[2.4,1.2]]),tail('teo'));
})();
// ----- Pipoca -----
function djump(t0,t1,a,b,yaw){return cust(t0,t1,function(t,u){return {p:L2(a,b,ez(u)),yaw:yaw,pose:'stand',y:0.75*Math.sin(PI*u),pitch:-0.35*Math.cos(PI*u),legs:[-0.9,-0.9,0.9,0.9],tailF:36};});}
DG=[hold(0,0.4,[4.2,2.6],yawTo([4.2,2.6],DS),'stand'),mv(0.4,2.6,[[4.2,2.6],DS],'drun'),turnTo(2.6,2.9,DS,yawTo([4.2,2.6],DS),-PI/2,'sit'),
 hold(2.9,15.6,DS,-PI/2,'sit',function(t){return {tailF:24,hz:0.15*Math.sin(t*3)};}),hold(15.6,17.4,DS,-PI/2-0.4,'party'),hold(17.4,19.4,DS,-PI/2,'sit',{tailF:30}),
 mv(19.4,20.1,[DS,DR],'dwalk',{tailF:34}),turnTo(20.1,T.DJ,DR,yawTo(DS,DR),-PI/2,'stand',{tailF:34}),
 djump(T.DJ,21.0,DR,DL,-PI/2),turnTo(21.0,21.6,DL,-PI/2,PI/2,'stand',{tailF:34}),djump(21.6,22.2,DL,DR,PI/2),turnTo(22.2,22.8,DR,PI/2,-PI/2,'stand',{tailF:34}),
 djump(22.8,23.4,DR,DL,-PI/2),turnTo(23.4,24.0,DL,-PI/2,PI/2,'stand',{tailF:34}),hold(24.0,T.CRAWL,DL,PI/2,'sit',{tailF:30,hx:-0.3}),
 cust(T.CRAWL,27.0,function(t,u){return {p:L2(DL,DR,u),yaw:PI/2,pose:'dwalk',y:-0.1,hx:0.25,tailF:30};}),
 hold(27.0,27.4,DR,PI/2,'stand'),cust(27.4,29.0,function(t){return {p:DR,yaw:PI/2,pose:'hind',wig:1,lift:1,tailF:36,tailA:1.2};}),
 mv(29.0,29.6,[DR,DS],'dwalk'),turnTo(29.6,29.9,DS,yawTo(DR,DS),-PI/2,'sit'),hold(29.9,32.2,DS,-PI/2,'sit',{tailF:30}),hold(32.2,T.ROW,DS,-PI/2,'party'),
 mv(T.ROW,38.0,[DS,[3.1,2.0],[3.1,4.4],DF],"drun"),turnTo(38.0,38.2,DF,yawTo([3.1,4.4],DF),0,"stand"),hold(38.2,END+2,DF,0,'party')];
// ----- elástico: 2 fios, cada um com 2 pedaços (A->P->B) -----
var EM=mat(0xff3d7f,{roughness:0.6}),SEG=[];
for(var i=0;i<4;i++){var m=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.06,1),EM);m.castShadow=true;scene.add(m);SEG.push(m);}
function segTo(m,a,b){var d=b.clone().sub(a),l=d.length();m.position.copy(a).add(b).multiplyScalar(0.5);m.scale.set(1,1,Math.max(l,0.01));m.lookAt(b);}
var _f=new THREE.Vector3();
function footW(n,side){var k=KIDS[n],g=side<0?k.legL:k.legR;g.updateMatrixWorld(true);return g.localToWorld(_f.set(0,-1.0,0.05)).clone();}
function strandP(t,sx,h){var y=h,x=sx;
 var bs=stateOf('bia',t),ts=stateOf('teo',t);
 if(bs.on&&Math.abs(bs.p[0])<0.2)y=0.06;
 if(ts.on&&Math.abs(ts.p[0])<0.2)y=0.06;
 if(sx>0&&ts.hook){var f=footW('teo',1);return V(lerp(sx,f.x,ts.hook),lerp(h,Math.max(0.08,f.y),ts.hook),lerp(ZJ,f.z,ts.hook));}
 var dpos=dog.root.position;if(t>T.CRAWL&&t<27.0&&Math.abs(dpos.x-sx)<0.5)y=Math.max(y,0.95-0.6*Math.abs(dpos.x-sx));
 return V(x,y,ZJ);}
EXTRA=function(t){
 ['leo','duda','bia','teo'].forEach(function(n){var s=stateOf(n,t);if(s.spread||s.on){KIDS[n].legL.rotation.z=-0.3;KIDS[n].legR.rotation.z=0.3;}});
 scene.updateMatrixWorld(true);var h=LV(t);var vis=t<38.4;SEG.forEach(function(m){m.visible=vis;});if(!vis)return;
 [-1,1].forEach(function(sx,i){var a=V(sx*SX,h,LP[1]),b=V(sx*SX,h,DP[1]);if(t<T.ROW&&t>3.0){var hl=Math.max(0.05,h);a.y=hl;b.y=hl;}
  var p=strandP(t,sx*SX,h);if(t>=T.ROW||t<3.0)p=V(sx*SX,Math.max(0.03,h),ZJ);segTo(SEG[i*2],a,p);segTo(SEG[i*2+1],p,b);});};
BURST=[[T.YAY,[0,0],1.6],[T.DANCE,[0,3.2],2.2],[T.DANCE+3,[0,3.2],2.2]];
BW=[['Altura um: tornozelo!',3.2,4.7,kp('leo',2.9,0),1],['Vai, Bia! Vai!',7.0,8.4,kp('teo',2.9,0),1],['Agora no joelho!',11.0,12.4,kp('duda',2.9,0),1],
 ['Me enrolei todo!',15.9,17.4,kp('teo',2.2,0.3),1],['Vez do Pipoca!',18.6,20.0,kp('leo',2.9,0),1],['Que pulo!',21.3,22.7,kp('bia',2.9,0),1],
 ['Agora bem alto!',24.0,25.4,kp('duda',2.9,0),1],['Ele passou por baixo!',27.2,28.7,kp('teo',2.9,0),1],['A Bia voou!',33.0,34.5,kp('leo',2.9,0),1],
 ['Amanhã o elástico sobe mais!',50.5,54.5,kp('duda',2.9,0.4),1]];
var EXE=[[0,-1.8],[0,1.6],[-1.0,0],[1.0,0]];
function PANC(a0,a1,e0,e1,t0,t1,fov,m,ex){return function(t){var u=ez(lin(t,t0,t1));return frameC(ALL,lerp(a0,a1,u),lerp(e0,e1,u),fov||46,m||0.17,ex||EXE,1.15);};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.ARR,PANC(70,55,58,50,0,T.ARR)],
 [T.ARR,T.LV2,PANC(55,45,50,48,T.ARR,T.LV2)],
 [T.LV2,18.4,PANC(42,52,48,46,T.LV2,18.4)],
 [18.4,T.LV3,PANC(60,50,46,46,18.4,T.LV3)],
 [T.LV3,29.2,PANC(40,50,48,48,T.LV3,29.2)],
 [29.2,T.YAY,PANC(52,44,46,46,29.2,T.YAY)],
 [T.YAY,T.ROW+0.6,PANC(44,20,48,48,T.YAY,T.ROW+0.6)],
 [T.ROW+0.6,T.DANCE,function(t){return mixCam(frameC(ALL,20,48,46,0.17,EXE),FL(),ez(lin(t,T.ROW+0.6,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.7,'bark'],[3.2,'stretch'],[3.2,'ta'],[T.LV2,'stretch'],[T.LV3,'stretch'],[T.HOOK,'stretch'],[T.FALL+0.3,'thud'],[16.1,'laugh'],[18.0,'boing'],
 [T.DJ,'whee'],[21.6,'whee'],[22.8,'whee'],[21.0,'bark'],[T.CRAWL,'sneak'],[26.3,'stretch'],[27.4,'laugh'],[28.0,'bark'],[T.LAND,'ta'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
(function(){function hops(t0,n,dt){for(var i=1;i<=n;i++)EV.push([t0+dt*(i-1)+0.2,'hop']);}hops(T.B1,9,0.55);hops(T.TE,4,0.55);hops(T.B3,5,0.55);})();
// balões presos dentro da tela (não saem pelas bordas)
var _bv=new THREE.Vector3();
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*(w[4]||1);
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));
  _bv.set(p[0],p[1]+0.45*k,p[2]);var d=_bv.distanceTo(camPosV),tv=Math.tan(camera.fov*PI/360),hw=0.9*k/(d*tv*W/H),hh=0.45*k/(d*tv);
  _bv.project(camera);_bv.x=clamp(_bv.x,-1+hw+0.03,1-hw-0.03);_bv.y=Math.min(_bv.y,1-hh-0.03);_bv.unproject(camera);
  m.position.copy(_bv);m.quaternion.copy(camera.quaternion);}});}
