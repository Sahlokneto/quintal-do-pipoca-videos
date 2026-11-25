var PC=[0,-0.3],PRX=1.9,PRZ=1.6,WY=0.175;
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
var T={SIT:3.1,PLACE:4.6,GO:6.6,SPIN:8.5,TEO:10.0,FLIP:11.0,DJ:14.2,SPLASH:15.0,LOOP:20.0,LEND:32.0,DEX:33.4,UP:33.0,SHAKE:35.8,YAY:38.6,DANCE:39.5,WAVE:55.5,END:60};
var END=T.END;
var NM=['leo','bia','teo','duda'],SX={leo:-1.65,bia:-0.55,teo:0.55,duda:1.65},SZ=-2.45;
var FIN={leo:[-1.95,2.4],bia:[-0.65,2.4],teo:[0.65,2.4],duda:[1.95,2.4]},DF=[0,3.4],DJ=[2.6,0.9],SP=[0.8,0.1];
var STY={leo:0,bia:3,teo:2,duda:1};
// ----- poça -----
(function(){function lobe(x,z,rx,rz,c,y){var m=new THREE.Mesh(new THREE.CylinderGeometry(1,1,0.03,40),new THREE.MeshStandardMaterial({color:col(c),roughness:0.08,metalness:0.15}));m.scale.set(rx,1,rz);m.position.set(x,y,z);m.receiveShadow=true;scene.add(m);}
 lobe(PC[0],PC[1],PRX+0.12,PRZ+0.12,0x8a6a45,0.15);lobe(PC[0],PC[1],PRX,PRZ,0x5fb8f0,0.16);lobe(-1.5,0.5,0.7,0.6,0x5fb8f0,0.161);lobe(1.4,-1.2,0.6,0.5,0x5fb8f0,0.161);
 lobe(-0.6,-0.9,0.5,0.18,0xbfe8ff,0.17);lobe(0.7,0.4,0.6,0.15,0xbfe8ff,0.17);})();
// ----- barquinhos -----
function makeBoat(c){var g=new THREE.Group();var hs=new THREE.Shape();hs.moveTo(-0.32,0.12);hs.lineTo(0.32,0.12);hs.lineTo(0.2,0);hs.lineTo(-0.2,0);hs.lineTo(-0.32,0.12);
 var hg=new THREE.ExtrudeGeometry(hs,{depth:0.2,bevelEnabled:false});hg.translate(0,0,-0.1);var h=new THREE.Mesh(hg,mat(c));h.castShadow=true;g.add(h);
 var ss=new THREE.Shape();ss.moveTo(-0.2,0.12);ss.lineTo(0.2,0.12);ss.lineTo(0,0.4);ss.lineTo(-0.2,0.12);var sg=new THREE.ExtrudeGeometry(ss,{depth:0.04,bevelEnabled:false});sg.translate(0,0,-0.02);
 var s=new THREE.Mesh(sg,mat(0xffffff));s.castShadow=true;g.add(s);var st=box(0.04,0.04,0.21,0xffffff);st.position.set(0,0.12,0);g.add(st);scene.add(g);g.scale.setScalar(1.6);return g;}
var BC={leo:0x7aa7ff,bia:0xff8fbf,teo:0xffb35c,duda:0x6fe0b0},BOAT={};NM.forEach(function(n){BOAT[n]=makeBoat(BC[n]);});
var B0={};NM.forEach(function(n){B0[n]=[SX[n],-1.45];});
function kz(K,t){if(t<=K[0][0])return K[0][1];for(var i=1;i<K.length;i++)if(t<=K[i][0]){var u=(t-K[i-1][0])/(K[i][0]-K[i-1][0]);return lerp(K[i-1][1],K[i][1],u);}return K[K.length-1][1];}
var RK={leo:[[T.GO,-1.45],[T.SPIN,-1.1],[11.0,-1.1],[T.SPLASH,-0.45]],bia:[[T.GO,-1.45],[9,-0.9],[12,-0.2],[T.SPLASH,0.32]],
 teo:[[T.GO,-1.45],[T.TEO,-1.05],[T.FLIP,-0.15],[11.6,-0.05]],duda:[[T.GO,-1.45],[9.5,-0.85],[12.5,-0.1],[T.SPLASH,0.3]]};
function racePos(n,t){return [SX[n]+0.06*Math.sin(t*1.7+SX[n]*3),kz(RK[n],t)];}
var PUSH={};NM.forEach(function(n){var p=racePos(n,T.SPLASH),d=[p[0]-SP[0],p[1]-SP[1]],l=Math.hypot(d[0],d[1])||1;PUSH[n]=[p[0]+d[0]/l*0.55,p[1]+d[1]/l*0.45];});
PUSH.teo=[0.15,-0.55];
// Pipoca em volta: elipse dentro da poça
var LRX=1.2,LRZ=0.95,LW=4*PI/(T.LEND-T.LOOP);
function lpos(th){return [PC[0]+LRX*Math.cos(th),PC[1]+LRZ*Math.sin(th)];}
function lth(t){return clamp(t-T.LOOP,0,T.LEND-T.LOOP)*LW;}
var ORDB=['duda','leo','teo'],JOIN={duda:20.4,leo:21.0,teo:21.6};
function followPos(n,t){var k=ORDB.indexOf(n),th=lth(t)-(k+1)*0.6;return {p:lpos(th),yaw:Math.atan2(-LRX*Math.sin(th),LRZ*Math.cos(th))};}
var _v=new THREE.Vector3();
function headTop(){dog.head.updateMatrixWorld(true);return dog.head.localToWorld(V(0,0.3,0.02));}
var _hp=new THREE.Vector3();function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function boatSet(n,t){var g=BOAT[n],bob=0.015*Math.sin(t*3+SX[n]*2);g.scale.setScalar(n==='bia'&&t>=T.SPLASH?lerp(1.6,1.0,lin(t,T.SPLASH,15.8)):1.6);
 if(t<T.PLACE){var h=handR(n);g.position.set(h.x,h.y-0.05,h.z+0.05);g.rotation.set(0,PI/2,0);return;}
 if(t<T.PLACE+0.6){var u=S(t,T.PLACE,T.PLACE+0.6);var h2=V(SX[n],0.75,SZ+0.75);g.position.set(lerp(h2.x,B0[n][0],u),lerp(h2.y,WY,u),lerp(h2.z,B0[n][1],u));g.rotation.set(0,PI/2,0);return;}
 if(n==='bia'&&t>=T.SPLASH){var a=racePos('bia',T.SPLASH);if(t<15.8){var u2=lin(t,T.SPLASH,15.8),ht=headTop();g.position.set(lerp(a[0],ht.x,u2),lerp(WY,ht.y,u2)+1.3*Math.sin(PI*u2),lerp(a[1],ht.z,u2));g.rotation.set(u2*PI*2,PI/2,0);return;}
  var ht2=headTop();g.position.copy(ht2);g.rotation.set(0,dog.root.rotation.y+PI/2,0.15*Math.sin(t*4));return;}
 var p,yaw=PI/2,rz=0,ry=0;
 if(t<T.SPLASH){p=racePos(n,t);if(n==='leo'&&t>T.SPIN&&t<11.0)ry=(t-T.SPIN)*7*S(t,T.SPIN,T.SPIN+0.3)*(1-S(t,10.6,11.0))+0;if(n==='teo'&&t>T.FLIP)rz=PI*S(t,T.FLIP,T.FLIP+0.35);
  if(n==='leo'&&t>=11.0)ry=0;}
 else{var u3=1-Math.pow(1-lin(t,T.SPLASH,15.9),2),a3=racePos(n,T.SPLASH);p=L2(a3,PUSH[n],u3);ry=u3*PI*(n==='duda'?1.5:-1.2);if(n==='teo')rz=PI;
  var j=JOIN[n];if(t>=j){var f=followPos(n,t),w=S(t,j,j+0.9);p=L2(p,f.p,w);yaw=lerpAng(PI/2+ry,f.yaw+PI/2,w);ry=0;if(n==='teo')rz=PI*(1-w);}}
 g.position.set(p[0],WY+bob+(rz>0.1?0.03:0),p[1]);g.rotation.set(0,yaw+ry,rz);}
// ----- gotas (splash) -----
var DROPS=[],DB=[];for(var i=0;i<70;i++){var m=box(0.09,0.09,0.09,0x8fd3ff);m.castShadow=false;m.visible=false;scene.add(m);DROPS.push(m);}
DB.push([T.SPLASH,SP,1.0,null]);for(var q=0;q<5;q++)DB.push([T.SHAKE+q*0.24,null,0.55,1]);
function drops(t){DROPS.forEach(function(m,i){m.visible=false;});var per=Math.floor(70/DB.length);
 DB.forEach(function(b,bi){var ct=t-b[0];if(ct<0||ct>1.3)return;var o=b[1]||[dog.root.position.x,dog.root.position.z];
  for(var k=0;k<per;k++){var i=bi*per+k,m=DROPS[i],a=i*2.399+bi,v=(0.8+(i%5)*0.35)*b[2],vy=(3.0+(i%4)*0.5)*b[2],dir=b[3]?-1:0;
   var dx=Math.cos(a)*v,dz=Math.sin(a)*v;if(b[3]){dz=-Math.abs(dz)-1.2;}
   var y=0.3+vy*ct-4.9*ct*ct;if(y<0.12)continue;m.visible=true;m.position.set(o[0]+dx*ct,y,o[1]+dz*ct);m.scale.setScalar(clamp((1.3-ct)/0.3,0.05,1));}});}
// ----- crianças -----
var PUFF={leo:[[6.8,7.6],[8.0,8.6],[11.6,12.4],[13.0,13.8],[14.2,14.8]],bia:[[7.0,7.8],[8.3,9.1],[9.6,10.4],[11.6,12.4],[12.9,13.7],[14.1,14.9]],
 teo:[[6.9,7.7],[8.2,9.0],[T.TEO,10.8]],duda:[[6.8,7.6],[8.1,8.9],[9.5,10.3],[11.5,12.3],[12.9,13.7],[14.0,14.8]]};
var CHEER2=[[16.0,18.6]],CLAPW=[[23.0,26.0],[28.0,31.0]];
function seatS(n,t){var p=[SX[n],SZ];var s={p:p,yaw:0,pose:'sitg',face:'happy',A:{aLx:-0.4,aRx:-0.4,aLz:0.1,aRz:-0.1,eL:-0.6,eR:-0.6}};
 if(t<T.PLACE+0.8&&t>=T.PLACE-0.3){var k=Math.sin(PI*lin(t,T.PLACE-0.3,T.PLACE+0.8));s.pitch=0.45*k;s.A.aRx=lerp(-0.4,-1.3,k);s.A.eR=-0.2;return s;}
 if(t<T.PLACE){s.A.aRx=-1.1;s.A.eR=-0.5;}
 if(inW(t,PUFF[n])){var w=PUFF[n].filter(function(x){return t>=x[0]&&t<x[1];})[0],k2=Math.sin(PI*lin(t,w[0],w[1]));s.pitch=0.4*k2*(n==='teo'&&w[0]===T.TEO?1.4:1);s.face='blow';s.A.aLx=s.A.aRx=-0.7;s.A.eL=s.A.eR=-0.3;return s;}
 if(t>=T.GO&&t<T.SPLASH)s.face='focus';
 if(n==='leo'&&t>9.0&&t<10.4){s.face='tongue';s.y=0.04*Math.abs(Math.sin(t*13));s.A.aLx=s.A.aRx=-1.0;s.A.eL=s.A.eR=-1.2;}
 if(n==='teo'&&t>11.3&&t<12.8){s.face='wow';s.A={aLx:-2.7,aRx:-2.7,aLz:-0.2,aRz:0.2,eL:-1.9,eR:-1.9};}
 if(t>=T.SPLASH&&t<16.0){s.face='wow';s.pitch=-0.25;s.A={aLx:-1.6,aRx:-1.6,aLz:-0.5,aRz:0.5,eL:-1.6,eR:-1.6};}
 if(inW(t,CHEER2)){s.face='tongue';s.y=0.04*Math.abs(Math.sin(t*13));s.roll=0.05*Math.sin(t*13);s.A.aLx=s.A.aRx=-1.0;s.A.eL=s.A.eR=-1.2;}
 if(inW(t,CLAPW)){var cc=Math.abs(Math.sin(t*9));s.A.aLx=s.A.aRx=-1.3;s.A.aLz=lerp(-0.2,0.32,cc);s.A.aRz=-s.A.aLz;s.A.eL=s.A.eR=-0.6;}
 return s;}
var PATH={leo:[[-1.65,SZ],[-2.6,-2.2],[-2.65,1.5],[-1.95,2.4]],bia:[[-0.55,SZ],[-1.6,-2.95],[-2.65,-2.2],[-2.65,1.5],[-1.3,1.7],[-0.65,2.4]],
 duda:[[1.65,SZ],[2.6,-2.2],[2.65,1.5],[1.95,2.4]],teo:[[0.55,SZ],[1.6,-2.95],[2.65,-2.2],[2.65,1.5],[1.3,1.7],[0.65,2.4]]};
var GOUP={leo:T.UP,duda:T.UP,bia:T.UP+0.6,teo:T.UP+0.6};
(function(){var st={leo:[-4.5,-4.2],bia:[-2.5,-5.2],teo:[2.5,-5.2],duda:[4.5,-4.2]};
 NM.forEach(function(n){var p=[SX[n],SZ],u0=GOUP[n],P=PATH[n],ta=u0+0.4+2.0;
  TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.4,[st[n],[SX[n],SZ-0.9],p],'run',{face:'happy'}),turnTo(2.4,2.6,p,PI,0,'stand',{face:'happy'}),
   cust(2.6,T.SIT,function(t,u){return {p:p,yaw:0,pose:'none',y:lerp(0,GROUND_Y,S(u,0,1)),sit:S(u,0,1),face:'happy',A:{aRx:-1.1,eR:-0.5}};}),
   cust(T.SIT,u0,function(t){return seatS(n,t);}),
   cust(u0,u0+0.4,function(t,u){return {p:p,yaw:0,pose:'none',y:lerp(GROUND_Y,0,S(u,0,1)),sit:1-S(u,0,1),face:'happy'};}),
   mv(u0+0.4,ta,P,'run',{face:'happy'}),turnTo(ta,ta+0.3,FIN[n],yawTo(P[P.length-2],FIN[n]),0,'stand',{face:'happy'}),
   cust(ta+0.3,T.YAY,function(t){var s={p:FIN[n],yaw:0,pose:'stand',face:'happy'};
    if(t>=T.SHAKE&&t<37.0){s.face='wow';s.pose='none';s.A={aLx:-1.6,aRx:-1.6,aLz:-0.5,aRz:0.5,eL:-1.6,eR:-1.6};s.pitch=-0.2;}
    if(t>=37.0){s.pose='laugh';s.face='tongue';}return s;}),
   cust(T.YAY,T.DANCE,function(t){return {p:FIN[n],yaw:0,pose:'cheer',face:'happy'};}),
   cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];});})();
// ----- Pipoca -----
function lead(t){var bz=-9,bx=0;NM.forEach(function(n){var p=racePos(n,t);if(p[1]>bz){bz=p[1];bx=p[0];}});return [bx,bz];}
var YJ=-PI/2;
DG=[hold(0,0.3,[4.8,-1.5],0,'stand'),mv(0.3,2.6,[[4.8,-1.5],[3.6,0.2],DJ],'drun'),turnTo(2.6,2.9,DJ,yawTo([3.6,0.2],DJ),YJ,'sit'),
 cust(2.9,13.6,function(t){var y=t<T.GO?YJ:clamp(yawTo(DJ,lead(t)),-PI*0.85,-PI*0.15);return {p:DJ,yaw:y,pose:'sit',tailF:t>11?30:18};}),
 cust(13.6,T.DJ,function(t){return {p:DJ,yaw:yawTo(DJ,SP),pose:'stand',tailF:36,tailA:1.2,y:hopAt(t,13.7,0.25,0.12)+hopAt(t,14.0,0.2,0.1)};}),
 cust(T.DJ,T.SPLASH,function(t,u){var p=L2(DJ,SP,u);return {p:p,yaw:yawTo(DJ,SP),pose:'drun',y:Math.sin(PI*u)*0.9,pitch:lerp(-0.4,0.4,u),legs:[-1,-1,1,1]};}),
 cust(T.SPLASH,19.6,function(t){var y=lerpAng(yawTo(DJ,SP),0,S(t,15.1,15.6));return {p:SP,yaw:y,pose:t<15.6?'stand':(t<17.5?'party':'stand'),tailF:30,tailA:1.1};}),
 mv(19.6,T.LOOP,[SP,lpos(0)],'dwalk'),
 cust(T.LOOP,T.LEND,function(t){var th=lth(t);return {p:lpos(th),yaw:Math.atan2(-LRX*Math.sin(th),LRZ*Math.cos(th)),pose:'dwalk',tailF:24};}),
 mv(T.LEND,T.DEX,[lpos(4*PI),[1.6,1.2],[0.6,2.9],DF],'dwalk'),turnTo(T.DEX,33.8,DF,yawTo([0.6,2.9],DF),PI,'stand'),
 hold(33.8,T.SHAKE,DF,PI,'stand'),
 cust(T.SHAKE,37.0,function(t){return {p:DF,yaw:PI+0.5*Math.sin(t*40)*S(t,T.SHAKE,T.SHAKE+0.1),roll:0.35*Math.sin(t*40),pose:'stand',hz:0.3*Math.sin(t*40),tailF:40,tailA:1.2};}),
 turnTo(37.0,37.4,DF,PI,0,'sit'),cust(37.4,END+2,function(t){return {p:DF,yaw:0,pose:t>T.YAY?'party':'sit',tailF:30};})];
EXTRA=function(t){NM.forEach(function(n){boatSet(n,t);});drops(t);};
BURST=[[T.YAY,[0,2.6],2.0],[T.DANCE+2,[0,2.6],2.2]];
BW=[['Choveu! Corrida de barquinho!',3.1,4.6,kp('duda',2.1,-0.7),1],['1, 2, 3... já!',5.2,6.6,kp('bia',2.1,0),1],['Tá rodando!',9.0,10.4,kp('leo',2.1,0.4),1],
 ['Virou!',11.3,12.8,kp('teo',2.1,0),1],['Pipoca!',15.4,16.8,kp('bia',2.1,0),1],['Capitão Pipoca!',17.3,18.8,kp('duda',2.1,-0.5),1],
 ['Ele puxa os barquinhos!',22.0,23.8,kp('leo',2.1,0.6),1],['Vai, capitão!',26.2,27.6,kp('bia',2.1,0.2),1],['Banho de cachorro!',37.1,38.6,kp('teo',2.9,0.3),1],
 ['Tomara que chova amanhã!',50.4,54.8,kp('duda',2.9,-0.6),1]];
function WD(a,e,D,lz){var aa=a*PI/180,ee=e*PI/180;var L=[0,0.5,lz==null?-0.75:lz];return {pos:[L[0]+D*Math.sin(aa)*Math.cos(ee),L[1]+D*Math.sin(ee),L[2]+D*Math.cos(aa)*Math.cos(ee)],look:L,fov:46};}
function OR(a0,a1,e0,e1,D0,D1,t0,t1,z0,z1){return function(t){var u=ez(lin(t,t0,t1));return WD(lerp(a0,a1,u),lerp(e0,e1,u),lerp(D0,D1,u),lerp(z0==null?-0.75:z0,z1==null?(z0==null?-0.75:z0):z1,u));};}
SH=[[0,T.SIT,OR(-20,-4,52,44,16,12,0,T.SIT,-0.75,-1.35)],
 [T.SIT,T.GO,OR(-4,4,44,40,12,11.4,T.SIT,T.GO,-1.35,-1.35)],
 [T.GO,T.DJ,OR(4,12,40,38,11.4,11.0,T.GO,T.DJ,-1.35,-1.2)],
 [T.DJ,19.6,OR(12,6,38,42,11.0,11.8,T.DJ,19.6,-1.2,-1.2)],
 [19.6,T.LEND,OR(6,-8,42,46,11.8,11.8,19.6,T.LEND,-1.2,-1.2)],
 [T.LEND,T.SHAKE,OR(-8,0,46,30,11.8,14.6,T.LEND,T.SHAKE,-1.2,1.0)],
 [T.SHAKE,T.DANCE,function(t){return mixCam(WD(0,30,14.6,1.0),frameLow(ALL,0,18,50,0.06),ez(lin(t,37.2,T.DANCE)));}],
 [T.DANCE,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.6,'bark'],[3.1,'ta'],[T.PLACE+0.5,'plim'],[5.2,'count'],[T.GO,'go'],[T.SPIN,'spin'],[9.0,'laugh'],[T.TEO,'bigblow'],[T.FLIP,'flip'],[T.DJ,'bark'],[T.SPLASH,'splash'],[15.8,'plop'],[16.0,'laugh'],
 [T.LOOP,'march'],[T.DEX,'bark'],[T.SHAKE,'shake'],[37.0,'laugh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
NM.forEach(function(n){PUFF[n].forEach(function(w){EV.push([w[0],'puff']);});});
