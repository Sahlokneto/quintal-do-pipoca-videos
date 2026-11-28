// ===== Adoleta =====
makeBubs([['Vamos de adoleta?',46],['Mão em cima da mão!',40],['Escapei!',84],['Quase!',90],['Mais rápido, turma!',42],['Ele lambeu minha mão!',38],
 ['Última rodada!',56],['O Pipoca me pegou!',42],['Quem topa outra rodada?',36]]);
radio.visible=false;
var C=[0,0.2],R=1.45;
// tapete de piquenique redondo + florzinhas
(function(){var r=new THREE.Mesh(new THREE.CylinderGeometry(2.3,2.3,0.04,40),mat(0xffe08a,{roughness:0.9}));r.position.set(C[0],0.12,C[1]);r.receiveShadow=true;scene.add(r);
 var r2=new THREE.Mesh(new THREE.TorusGeometry(2.2,0.05,6,60),mat(0xff7aa8));r2.rotation.x=PI/2;r2.position.set(C[0],0.15,C[1]);scene.add(r2);
 for(var i=0;i<12;i++){var a=i/12*2*PI+0.13,rr=3.5+0.3*Math.sin(i*1.7),f=new THREE.Group();f.position.set(C[0]+Math.sin(a)*rr,0,C[1]+Math.cos(a)*rr);scene.add(f);
  var st=box(0.06,0.35,0.06,0x2f9e5b);st.position.y=0.17;f.add(st);var fl=box(0.24,0.08,0.24,[0xff5d8f,0xffd23f,0xffffff,0xc39bff][i%4]);fl.position.y=0.38;f.add(fl);}})();
var T={ARR:3.0,SIT:3.4,HANDS:5.0,R1:6.2,R2:17.0,R3:28.0,YAY:35.6,ROW:37.0,DANCE:39.2,WAVE:55.5,END:60};
var END=T.END;
var ANG={dog:0,leo:0.4*PI,bia:0.8*PI,teo:1.2*PI,duda:1.6*PI};
function seat(n){var a=ANG[n],r=(n==='dog')?R+0.1:R;return [C[0]+Math.sin(a)*r,C[1]+Math.cos(a)*r];}
var ORD=['leo','dog','duda','teo','bia'];
// tapas: [tempo, quem bate, quem recebe]
var SL=[];
function round(t0,dt,K,s0){for(var k=0;k<K;k++)SL.push([t0+dt*k,ORD[(s0+k)%5],ORD[(s0+k+1)%5],dt]);return t0+dt*(K-1);}
var F1=round(T.R1,0.5,15,0),F2=round(T.R2,0.42,16,0),F3=round(T.R3,0.36,16,1);
var LAUGHW=[[13.5,15.0],[24.0,25.9],[33.7,35.4]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
var REST={aLx:-0.95,aRx:-0.95,aLz:-0.9,aRz:0.9,eL:-0.35,eR:-0.35};
function kidSit(n,t){var p=seat(n),yaw=yawTo(p,C),k=S(t,T.HANDS,5.6);
 var s={p:p,yaw:yaw,pose:'sitg',face:'happy',A:{aLx:lerp(-0.4,REST.aLx,k),aRx:lerp(-0.4,REST.aRx,k),aLz:lerp(0,REST.aLz,k),aRz:lerp(0,REST.aRz,k),eL:-0.35,eR:-0.35}};
 if(t<T.HANDS)return s;
 SL.forEach(function(e){var ts=e[0],d=Math.min(0.5,e[3]);
  if(e[1]===n&&t>ts-d*0.7&&t<ts+d*0.3){var up=S(t,ts-d*0.7,ts-d*0.35),dn=S(t,ts-d*0.35,ts);var miss=(ts===F1);s.A.aRx=lerp(lerp(REST.aRx,-1.9,up),miss?-0.35:REST.aRx,dn);s.A.aRz=lerp(0.85,0.6,up*(1-dn));s.face='focus';}
  if(e[2]===n&&t>ts-0.05&&t<ts+0.2){var w=Math.sin(PI*lin(t,ts-0.05,ts+0.2));if(ts===F1){}else{s.A.aLx=REST.aLx+0.25*w;s.y=-0.02*w;}}});
 // Léo tira a mão no último tapa da rodada 1
 if(n==='leo'&&t>F1-0.35&&t<F1+1.2){var q=S(t,F1-0.35,F1-0.1)*(1-S(t,F1+0.8,F1+1.2));s.A.aLx=lerp(REST.aLx,-2.7,q);s.A.aLz=lerp(REST.aLz,-0.2,q);s.face='happy';}
 if(inW(t,LAUGHW)){s.face='tongue';s.roll=0.06*Math.sin(t*13);s.y=0.03*Math.abs(Math.sin(t*13));}
 if(n==='duda'&&t>F3&&t<F3+0.9){s.face='wow';s.pitch=-0.15*Math.sin(PI*lin(t,F3,F3+0.9));}
 if(n==='leo'&&t>F2&&t<F2+0.8)s.face='wow';
 if(t>T.R3+5.6&&t<T.YAY&&!inW(t,LAUGHW)&&n!=='duda'){s.A={aLx:-2.6,aRx:-2.6,aLz:-0.4,aRz:0.4};}
 return s;}
var STY={leo:0,bia:3,teo:2,duda:1};
var FX=[-1.95,-0.65,0.65,1.95],FIN={},DF=[0,4.3];
// fila final em ordem de x
(function(){var ns=['leo','bia','teo','duda'].map(function(n){return [n,seat(n)];});ns.sort(function(a,b){return a[1][0]-b[1][0];});ns.forEach(function(e,i){FIN[e[0]]=[FX[i],3.3];});})();
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
var STARTS={leo:[4.4,2.6],bia:[3.6,-3.6],teo:[-3.6,-3.6],duda:[-4.4,2.6]};
var VIA={leo:[[1.8,2.2]],bia:[[0.5,2.3],[-1.4,2.4]],teo:[[-0.5,2.3]],duda:[[1.5,2.3]]};
['leo','bia','teo','duda'].forEach(function(n){var s0=STARTS[n],p=seat(n),y=yawTo(p,C);
 // caminho de saída para a fila: por fora da roda (o Pipoca sai antes pela frente)
 var outP=[C[0]+Math.sin(ANG[n])*(R+0.9),C[1]+Math.cos(ANG[n])*(R+0.9)];
 var via=(n==='bia')?[[0.45,0.2],[0.5,1.6]]:(n==='teo')?[[-0.45,0.2],[-0.5,1.6]]:[outP];
 TL[n]=[hold(0,0.2,s0,yawTo(s0,p),'stand'),mv(0.2,2.7,[s0,p],'run',{face:'happy'}),turnTo(2.7,T.ARR,p,yawTo(s0,p),y,'stand',{face:'happy'}),
  cust(T.ARR,T.SIT,function(t,u){var k=ez(u);return {p:p,yaw:y,pose:'none',y:lerp(0,GROUND_Y,k),sit:k,face:'happy',A:{lL:-k*PI/2,lR:-k*PI/2,aLx:-0.4*k,aRx:-0.4*k}};}),
  cust(T.SIT,T.YAY,function(t){return kidSit(n,t);}),
  cust(T.YAY,36.2,function(t,u){var k=1-ez(u);return {p:p,yaw:y,pose:'none',y:lerp(0,GROUND_Y,k),sit:k,face:'happy',A:{lL:-k*PI/2,lR:-k*PI/2,aLx:-2.6,aRx:-2.6,aLz:-0.4,aRz:0.4}};}),
  hold(36.2,T.ROW,p,y,'cheer',{face:'happy'}),
  mv(T.ROW+(n==='leo'||n==='duda'?0:0.3),38.6,[p].concat(via,[FIN[n]]),'walk',{face:'happy'}),turnTo(38.6,38.9,FIN[n],yawTo(via[via.length-1],FIN[n]),0,'stand',{face:'happy'}),
  hold(38.9,T.DANCE,FIN[n],0,'cheer',{face:'happy'})].concat(tail(n));});
// ----- Pipoca -----
var DS=seat('dog'),d0=[0.8,5.0];
function dogSit(t){var s={p:DS,yaw:PI,pose:'sit',tailF:24,hz:0.1*Math.sin(t*3)};if(t<T.HANDS)return s;
 SL.forEach(function(e){var ts=e[0],d=Math.min(0.5,e[3]);
  if(e[1]==='dog'&&t>ts-d*0.7&&t<ts+d*0.3){var up=S(t,ts-d*0.7,ts-d*0.35)*(1-S(t,ts-d*0.35,ts));s.pose='paw';s.pw=up;s.yaw=PI-0.5;}
  if(e[2]==='dog'&&t>ts-0.05&&t<ts+0.2){s.y=0.06*Math.sin(PI*lin(t,ts-0.05,ts+0.2));s.yaw=PI+0.4;}});
 // lambida na mão do Léo
 if(t>F2+0.05&&t<F2+2.0){var k=S(t,F2+0.05,F2+0.4)*(1-S(t,F2+1.6,F2+2.0));var lp=seat('leo');s.yaw=lerpAng(PI,yawTo(DS,[lp[0]*0.55,lp[1]*0.55+0.4]),k);s.pose='stand';s.hx=0.25*k+0.1*Math.sin(t*20)*k;s.tailF=36;
  s.p=L2(DS,[DS[0]+0.25,DS[1]-0.2],k);}
 // patada final na Duda + comemoração
 if(t>F3-0.3&&t<F3+0.25){s.pose='paw';s.pw=1;s.yaw=PI-0.6;}
 if(t>=F3+0.25){s.pose='hind';s.wig=1;s.lift=S(t,F3+0.25,F3+0.6);s.yaw=PI;s.tailF=36;s.tailA=1.2;}
 return s;}
DG=[hold(0,0.4,d0,yawTo(d0,DS),'stand'),mv(0.4,2.8,[d0,DS],'drun'),turnTo(2.8,3.1,DS,yawTo(d0,DS),PI,'sit'),
 cust(3.1,T.YAY,dogSit),hold(T.YAY,36.4,DS,PI,'party'),mv(36.4,37.4,[DS,[0.4,2.6],DF],'drun'),turnTo(37.4,37.6,DF,yawTo([0.4,2.6],DF),0,'stand'),hold(37.6,END+2,DF,0,'party')];
// ----- estrelinhas onde a mão bate -----
function starTex(){var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d');x.fillStyle='#ffd23f';x.strokeStyle='#ff8a00';x.lineWidth=6;x.beginPath();
 for(var i=0;i<10;i++){var r=i%2?24:58,a=i*PI/5-PI/2;x.lineTo(64+r*Math.cos(a),64+r*Math.sin(a));}x.closePath();x.fill();x.stroke();var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;}
var STAR=new THREE.Mesh(new THREE.PlaneGeometry(0.75,0.75),new THREE.MeshBasicMaterial({map:starTex(),transparent:true,depthTest:false}));STAR.renderOrder=9;scene.add(STAR);
var _hp=new THREE.Vector3();
EXTRA=function(t){STAR.visible=false;
 for(var i=0;i<SL.length;i++){var e=SL[i];if(t>=e[0]&&t<e[0]+0.25){if(e[0]===F1||e[0]===F2)break;
  var tg=e[2];if(tg==='dog'){dog.root.updateMatrixWorld(true);_hp.copy(dog.root.position);_hp.y+=0.5;}else KIDS[tg].aL.e.children[1].getWorldPosition(_hp);
  var u=(t-e[0])/0.25;STAR.visible=true;STAR.position.copy(_hp);STAR.position.y+=0.15;STAR.quaternion.copy(camera.quaternion);STAR.rotateZ(u*2);STAR.scale.setScalar(Math.max(0.001,back(u*2)*(1-u)*1.3));break;}}};
BURST=[[T.YAY,C,1.4],[T.DANCE,[0,3.3],2.2],[T.DANCE+3,[0,3.3],2.2]];
BW=[['Vamos de adoleta?',3.4,4.9,kp('duda',2.2,0),1],['Mão em cima da mão!',4.9,6.2,kp('leo',2.2,0),1],['Escapei!',13.4,14.8,kp('leo',2.2,0),1],['Quase!',15.0,16.2,kp('bia',2.2,0),1],
 ['Mais rápido, turma!',15.6,16.9,kp('teo',2.2,0),1],['Ele lambeu minha mão!',23.8,25.4,kp('leo',2.2,0),1],['Última rodada!',26.0,27.4,kp('duda',2.2,0),1],
 ['O Pipoca me pegou!',33.6,35.2,kp('duda',2.2,0),1],['Quem topa outra rodada?',50.5,54.5,kp('bia',2.9,0.4),1]];
function CLZ(c,k){return {pos:[lerp(c.look[0],c.pos[0],k),lerp(c.look[1],c.pos[1],k)-0.35*(1-k)*3,lerp(c.look[2],c.pos[2],k)],look:[c.look[0],c.look[1]-0.35*(1-k)*3,c.look[2]],fov:c.fov};}
function ORB(a0,a1,e0,e1,t0,t1,m){return function(t){var u=ez(lin(t,t0,t1)),c=frameC(ALL,lerp(a0,a1,u),lerp(e0,e1,u),46,m||0.18,[],1.15);return t>T.SIT-0.4&&t<T.YAY+0.4?CLZ(c,0.87):c;};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.SIT,ORB(30,10,52,44,0,T.SIT)],
 [T.SIT,T.R1,ORB(10,-10,42,40,T.SIT,T.R1)],
 [T.R1,13.2,ORB(-10,30,42,42,T.R1,13.2)],
 [13.2,T.R2,ORB(40,30,40,40,13.2,T.R2)],
 [T.R2,23.2,ORB(30,-20,44,44,T.R2,23.2)],
 [23.2,26.0,ORB(170,185,44,42,23.2,26.0)],
 [26.0,33.2,ORB(185,170,44,44,26.0,33.2)],
 [33.2,T.YAY,ORB(200,212,42,42,33.2,T.YAY)],
 [T.YAY,T.ROW,ORB(30,10,46,46,T.YAY,T.ROW)],
 [T.ROW,T.DANCE,function(t){return mixCam(frameC(ALL,10,46,46,0.18,[],1.15),FL(),ez(lin(t,T.ROW,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.8,'bark'],[T.SIT,'ta'],[T.HANDS,'chime'],[F1,'fiu'],[13.6,'laugh'],[F2,'lick'],[24.1,'laugh'],[26.0,'ta'],[F3,'pow'],[33.8,'laugh'],[34.2,'bark'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
SL.forEach(function(e){if(e[0]!==F1)EV.push([e[0],'tap']);});
// balões presos dentro da tela (não saem pelas bordas)
var _bv=new THREE.Vector3();
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*(w[4]||1);
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));
  _bv.set(p[0],p[1]+0.45*k,p[2]);var d=_bv.distanceTo(camPosV),tv=Math.tan(camera.fov*PI/360),hw=0.9*k/(d*tv*W/H),hh=0.45*k/(d*tv);
  _bv.project(camera);_bv.x=clamp(_bv.x,-1+hw+0.03,1-hw-0.03);_bv.y=Math.min(_bv.y,1-hh-0.03);_bv.unproject(camera);
  m.position.copy(_bv);m.quaternion.copy(camera.quaternion);}});}
