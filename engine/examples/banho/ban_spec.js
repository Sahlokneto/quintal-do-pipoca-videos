// ===== Banho do Pipoca =====
makeBubs([['Hora do banho!',72],['Ele fugiu!',90],['Olha o patinho!',64],['Que fácil!',90],['Virou nuvem!',80],['Lá vai água!',80],['Vai sacudir!',80],['Molhou geral!',80],
 ['Não, Pipoca!',80],['Sujou de novo!',70],['Banho de novo?',66],['Agora ele gostou!',56],['Pipoca cheiroso!',66]]);
radio.visible=false;
var TUB=[0,-0.8],TR=0.75,TH=0.45;
(function(){var g=new THREE.Group();g.position.set(TUB[0],0,TUB[1]);scene.add(g);
 var w=new THREE.Mesh(new THREE.CylinderGeometry(TR,TR*0.9,TH,28,1,true),mat(0x4aa3e8,{side:THREE.DoubleSide}));w.position.y=TH/2;w.castShadow=true;g.add(w);
 var rim=new THREE.Mesh(new THREE.TorusGeometry(TR,0.06,8,28),mat(0x2f7de0));rim.rotation.x=PI/2;rim.position.y=TH;g.add(rim);
 var bt=new THREE.Mesh(new THREE.CylinderGeometry(TR*0.9,TR*0.9,0.04,28),mat(0x2f7de0));bt.position.y=0.02;g.add(bt);
 var wa=new THREE.Mesh(new THREE.CylinderGeometry(TR*0.97,TR*0.97,0.03,28),new THREE.MeshStandardMaterial({color:col(0x9fdcff),transparent:true,opacity:0.8,roughness:0.1}));wa.position.y=TH-0.08;g.add(wa);})();
var BI=[-1.15,-0.6],DU=[1.15,-0.6],LE=[0.6,-2.0],LE2=[0.35,-1.72],TE=[-1.95,-1.6],DP0=[1.8,1.25],HID=[-2.0,1.6],DS=[0.25,0.55];
var FIN={teo:[-1.6,-2.15],bia:[-0.5,-2.25],leo:[0.5,-2.25],duda:[1.5,-2.15]};
var T={ARR:3.4,RUN:5.0,HIDE:8.0,DUCK:9.6,GO:11.0,TOSS:11.6,JUMP:12.6,SPL:13.2,SCRUB:15.0,FOAM:20.6,POUR:21.4,RINSE:22.8,OUT:23.6,SHAKE:25.2,WET:27.4,ROLL:30.0,BACK:36.6,SPL2:38.2,MOVE:40.6,ROW:43.0,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
function danceO(n){return function(t){var b=t*BPM/60;return {st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};};}
function dogP(t){return dogState(t).p;}
var REACT=[[T.SPL,15.0,'cheer','happy'],[17.8,20.4,'laugh','tongue'],[T.SHAKE,T.WET,'none','wow'],[T.WET,29.4,'laugh','tongue'],[30.2,32.6,'none','wow'],[33.0,34.8,'laugh','tongue'],[T.SPL2,40.4,'clap','happy']];
var SHIELD={aLx:-2.0,aRx:-2.0,aLz:0.5,aRz:-0.5,eL:-1.6,eR:-1.6};
function watcher(n,p,t0,t1,except){return cust(t0,t1,function(t){var y=yawTo(p,dogP(t));for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1]&&!(except&&except(t))){
  if(r[2]==='none')return {p:p,yaw:y,pose:'none',face:'wow',A:SHIELD,y:0.04*Math.abs(Math.sin(t*15))};return {p:p,yaw:y,pose:r[2],face:r[3]};}}
 return {p:p,yaw:y,pose:'stand',face:'happy'};});}
(function(){var st={leo:[2,-5],bia:[-4.5,-1],teo:[-4.5,-3.5],duda:[4.5,-1]};
 TL.leo=[hold(0,0.2,st.leo,yawTo(st.leo,LE),'stand'),mv(0.2,3.0,[st.leo,[1.6,-3.0],LE],'run',{face:'happy',A:{aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45}}),
  turnTo(3.0,3.4,LE,yawTo([1.6,-3.0],LE),yawTo(LE,TUB),'hold',{face:'happy'}),
  cust(3.4,20.4,function(t){var y=yawTo(LE,dogP(t));for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1])return {p:LE,yaw:y,pose:'hold',face:r[3],y:r[2]==='cheer'?0.12*Math.abs(Math.sin(t*9)):0};}return {p:LE,yaw:y,pose:'hold',face:'happy'};}),
  mv(20.4,T.POUR-0.3,[LE,LE2],'walk',{face:'focus',A:{aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45}}),
  cust(T.POUR-0.3,T.RINSE+0.3,function(t,u){var a=S(u,0,0.25)*(1-S(u,0.85,1));return {p:LE2,yaw:yawTo(LE2,TUB),pose:'none',face:'happy',A:{aLx:-1.25-1.3*a,aRx:-1.25-1.3*a,aLz:0.32,aRz:-0.32,eL:-0.45+0.3*a,eR:-0.45+0.3*a}};}),
  mv(T.RINSE+0.3,24.0,[LE2,LE],'walk',{face:'happy'}),turnTo(24.0,24.3,LE,yawTo(LE2,LE),yawTo(LE,DS),'stand'),
  watcher('leo',LE,24.3,T.MOVE+0.4),mv(T.MOVE+0.4,T.ROW,[LE,FIN.leo],'walk',{face:'happy'})];
 TL.bia=[hold(0,0.2,st.bia,yawTo(st.bia,BI),'stand'),mv(0.2,3.0,[st.bia,BI],'run',{face:'happy'}),turnTo(3.0,3.4,BI,PI/2,yawTo(BI,TUB),'stand'),
  watcher('bia',BI,3.4,T.SCRUB),mv(T.SCRUB,15.5,[BI,[-0.95,-0.7]],'walk',{face:'happy'}),
  cust(15.5,T.FOAM,function(t){var q=Math.sin(t*10);return {p:[-0.95,-0.7],yaw:yawTo([-0.95,-0.7],TUB),pose:'none',face:t>17.8?'tongue':'happy',pitch:0.12,A:{aRx:-1.3+0.25*q,aRz:-0.25*Math.cos(t*10),eR:-0.3,aLx:-0.9,eL:-0.6,aLz:0.2}};}),
  mv(T.FOAM,21.2,[[-0.95,-0.7],BI],'walk',{face:'happy'}),turnTo(21.2,21.5,BI,PI/2,yawTo(BI,TUB),'stand'),
  watcher('bia',BI,21.5,T.MOVE),mv(T.MOVE,T.ROW-0.4,[BI,[-1.0,-1.6],FIN.bia],'walk',{face:'happy'})];
 TL.teo=[hold(0,0.2,st.teo,yawTo(st.teo,TE),'stand'),mv(0.2,3.0,[st.teo,TE],'run',{face:'happy'}),turnTo(3.0,3.4,TE,yawTo(st.teo,TE),yawTo(TE,TUB),'stand'),
  watcher('teo',TE,3.4,T.MOVE),mv(T.MOVE,T.ROW-0.6,[TE,FIN.teo],'walk',{face:'happy'})];
 TL.duda=[hold(0,0.2,st.duda,yawTo(st.duda,DU),'stand'),mv(0.2,3.0,[st.duda,DU],'run',{face:'happy',A:{aRx:-1.3,eR:-0.6}}),turnTo(3.0,3.4,DU,-PI/2,yawTo(DU,TUB),'stand',{A:{aRx:-1.3,eR:-0.6}}),
  cust(3.4,T.DUCK,function(t){var y=yawTo(DU,dogP(t));return {p:DU,yaw:y,pose:'none',face:t<5.0?'happy':'wow',A:{aRx:-1.3,eR:-0.6,aLx:-0.2}};}),
  cust(T.DUCK,T.TOSS-0.3,function(t){return {p:DU,yaw:yawTo(DU,HID),pose:'none',face:'happy',A:{aRx:-2.7,eR:-0.2,aRz:0.15+0.1*Math.sin(t*12),aLx:-0.2}};}),
  cust(T.TOSS-0.3,T.TOSS+0.4,function(t,u){return {p:DU,yaw:lerpAng(yawTo(DU,HID),yawTo(DU,TUB),ez(u)),pose:'none',face:'happy',A:{aRx:lerp(-2.7,-1.6,u),eR:-0.2,aLx:-0.2}};}),
  watcher('duda',DU,T.TOSS+0.4,T.MOVE),mv(T.MOVE,T.ROW-0.8,[DU,[1.25,-1.5],FIN.duda],'walk',{face:'happy'})];
 Object.keys(KIDS).forEach(function(n){var L=TL[n][TL[n].length-1],pr=n==='leo'?LE:n==='bia'?[-1.0,-1.6]:n==='teo'?TE:[1.25,-1.5],tr=L.t1;
  TL[n].push(turnTo(tr,tr+0.3,FIN[n],yawTo(pr,FIN[n]),0,'stand'),hold(tr+0.3,55.5,FIN[n],0,'dance',danceO(n)),
  cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var LOOP=[DP0,[2.5,-0.6],[1.6,-2.8],[-0.4,-3.2],[-2.7,-2.5],[-2.6,0.6],HID];
var TUBY=0.06;
function hopTo(t0,t1,a,b,h,yaw){return cust(t0,t1,function(t,u){return {p:L2(a,b,ez(u)),yaw:yaw,pose:'stand',legs:[-0.8,-0.8,0.6,0.6],y:4*h*u*(1-u)+(b===TUB?TUBY*u:TUBY*(1-u)),pitch:-0.3*Math.cos(PI*u)};});}
DG=[hold(0,0.3,[3.5,4],yawTo([3.5,4],DP0),'stand'),mv(0.3,2.8,[[3.5,4],DP0],'drun'),turnTo(2.8,3.2,DP0,yawTo([3.5,4],DP0),yawTo(DP0,TUB),'stand'),
 cust(3.2,T.RUN,function(t){return {p:DP0,yaw:yawTo(DP0,TUB),pose:t<4.4?'sit':'stand',hx:t>4.4?-0.2:0,hz:t>4.4?0.3*Math.sin(t*14):0,tailA:t>4.4?0.1:0.7};}),
 mv(T.RUN,T.HIDE,LOOP,'drun'),turnTo(T.HIDE,8.4,HID,yawTo([-2.6,0.6],HID),yawTo(HID,TUB),'sit'),
 cust(8.4,T.DUCK+0.5,function(t){return {p:HID,yaw:yawTo(HID,TUB),pose:'sit',roll:0.04*Math.sin(t*40),tailA:0.05,hx:0.2};}),
 cust(T.DUCK+0.5,T.GO,function(t){return {p:HID,yaw:yawTo(HID,DU),pose:'stand',hx:-0.3,tailF:30,tailA:1.1};}),
 mv(T.GO,T.JUMP,[HID,[-0.3,1.45],[0,0.3]],'drun'),hopTo(T.JUMP,T.SPL,[0,0.3],TUB,0.75,PI),
 cust(T.SPL,T.OUT,function(t,u){var turn=S(t,T.SPL,T.SPL+0.5);return {p:TUB,yaw:PI-PI*turn,pose:t<16?'party':'stand',y:TUBY+(t<16?0:0),hx:t>21.5&&t<22.6?0.3:-0.1,tailF:24};}),
 hopTo(T.OUT,24.4,TUB,DS,0.6,0),
 cust(24.4,T.SHAKE,function(t){return {p:DS,yaw:0,pose:'stand',hx:0.1};}),
 cust(T.SHAKE,T.WET,function(t,u){var a=Math.sin(PI*u);return {p:DS,yaw:0,pose:'stand',roll:0.35*a*Math.sin(t*45),hz:0.5*a*Math.sin(t*45+1),y:0.03*a,tailF:50,tailA:1.2};}),
 cust(T.WET,T.ROLL,function(t){return {p:DS,yaw:0,pose:'sit',hx:-0.1,tailF:26};}),
 cust(T.ROLL,33.2,function(t,u){var r=PI/2*S(u,0,0.1)*(1-S(u,0.9,1)),w=Math.sin(t*9)*0.35*S(u,0.1,0.2)*(1-S(u,0.8,0.9));return {p:DS,yaw:0,pose:'none',roll:r+w,y:0.21*Math.sin(r),legs:[0.7*Math.sin(t*18),-0.7*Math.sin(t*18),0.7*Math.sin(t*18+1),-0.7*Math.sin(t*18+1)]};}),
 cust(33.2,T.BACK,function(t){return {p:DS,yaw:0,pose:'sit',hz:0.25*Math.sin(t*3),tailF:26};}),
 turnTo(T.BACK,37.0,DS,0,PI+yawTo(DS,[0,0.3])-PI,'stand'),mv(37.0,37.6,[DS,[0,0.3]],'dwalk'),hopTo(37.6,T.SPL2,[0,0.3],TUB,0.75,PI),
 cust(T.SPL2,T.MOVE,function(t,u){return {p:TUB,yaw:PI-PI*S(t,T.SPL2,T.SPL2+0.6),pose:'party',y:TUBY};}),
 cust(T.MOVE,END+2,function(t){return {p:TUB,yaw:0,pose:'party',y:TUBY};})];
// ----- objetos: patinho, esponja, balde, espuma, manchas, gotas -----
var DUCK=new THREE.Group();scene.add(DUCK);(function(){var y=0xffd23f;var b=box(0.3,0.2,0.36,y);b.position.y=0.1;DUCK.add(b);var h=box(0.18,0.18,0.18,y);h.position.set(0,0.27,0.1);DUCK.add(h);
 var bk=box(0.1,0.05,0.1,0xff8a1c);bk.position.set(0,0.24,0.22);DUCK.add(bk);[-1,1].forEach(function(s){var e=box(0.03,0.04,0.02,0x222222);e.position.set(s*0.06,0.3,0.19);DUCK.add(e);});})();
var SPONGE=box(0.28,0.16,0.2,0xffe066);scene.add(SPONGE);
var BUCKET=new THREE.Group();scene.add(BUCKET);(function(){var c=new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.18,0.36,16,1,true),mat(0xe0484f,{side:THREE.DoubleSide}));c.castShadow=true;BUCKET.add(c);
 var bt=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.18,0.03,16),mat(0xc23a42));bt.position.y=-0.17;BUCKET.add(bt);var wa=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,0.02,16),mat(0x9fdcff));wa.position.y=0.1;BUCKET.add(wa);BUCKET.userData.w=wa;})();
var FOAM=new THREE.Group();dog.root.add(FOAM);var FB=[];
(function(){var m=mat(0xffffff,{roughness:0.9});[[0,0.72,0,0.22],[0.15,0.7,-0.25,0.2],[-0.15,0.7,0.2,0.2],[0,0.68,-0.38,0.18],[0.2,0.6,0.1,0.17],[-0.2,0.6,-0.1,0.17],[0,1.05,0.42,0.2],[0.18,1.0,0.35,0.13],[-0.18,1.0,0.35,0.13],[0,0.85,-0.5,0.14],[0.22,0.45,0.25,0.12],[-0.22,0.45,-0.3,0.12]].forEach(function(f,i){
 var s=new THREE.Mesh(new THREE.SphereGeometry(f[3],10,8),m);s.position.set(f[0],f[1],f[2]);s.userData.k=i;FOAM.add(s);FB.push(s);});})();
var DIRT=new THREE.Group();dog.root.add(DIRT);[[0.22,0.5,0.1],[-0.22,0.45,-0.2],[0.05,0.68,0.25],[0.22,0.35,-0.3],[-0.22,0.55,0.25]].forEach(function(p){var b=box(0.05,0.14,0.16,0x8b5a2b);b.position.set(p[0],p[1],p[2]);b.castShadow=false;DIRT.add(b);});
var CROWN=[];Object.keys(KIDS).forEach(function(n,j){var g=new THREE.Group();g.position.set(0,1.1,0);KIDS[n].head.add(g);var m=mat(0xffffff,{roughness:0.9});
 [[0,0,0,0.22],[0.2,-0.05,0.1,0.15],[-0.18,-0.04,-0.08,0.16]].forEach(function(f){var s=new THREE.Mesh(new THREE.SphereGeometry(f[3],10,8),m);s.position.set(f[0],f[1],f[2]);g.add(s);});CROWN.push(g);});
var DROPS=[];(function(){var m=new THREE.MeshStandardMaterial({color:col(0x6cc4ff),transparent:true,opacity:0.85,roughness:0.1});for(var i=0;i<70;i++){var d=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.08,0.08),m);d.visible=false;scene.add(d);DROPS.push(d);}})();
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
var SPL=[[T.SPL,TUB,1.0],[T.POUR+0.4,TUB,0.5],[T.SPL2,TUB,1.0]];
function foamLvl(t){if(t<15.6)return 0;if(t<T.FOAM)return S(t,15.6,T.FOAM-0.4);if(t<T.RINSE)return 1-S(t,T.POUR+0.2,T.RINSE);if(t>=T.SPL2+0.2&&t<T.MOVE+30)return 0.45*S(t,T.SPL2+0.2,T.SPL2+1.2);return 0;}
EXTRA=function(t){
 // patinho
 if(t<T.TOSS){DUCK.position.copy(hand('duda',1));DUCK.position.y+=0.05;DUCK.rotation.set(0,KIDS.duda.root.rotation.y,0);var sq=(t>T.DUCK&&t<T.GO)?1-0.25*Math.abs(Math.sin(t*14)):1;DUCK.scale.set(1.3,1.3*sq,1.3);}
 else if(t<12.2){var u=(t-T.TOSS)/0.6,a=hand('duda',1),b=V(0.35,TH-0.1,-0.55);if(!DUCK.userData.a)DUCK.userData.a=a;a=DUCK.userData.a||a;var p=a.clone().lerp(b,u);p.y+=1.0*4*u*(1-u);DUCK.position.copy(p);DUCK.rotation.set(t*8,0,0);DUCK.scale.setScalar(1.3);}
 else{DUCK.position.set(0.4+0.05*Math.sin(t*1.3),TH-0.1+0.03*Math.sin(t*4),-0.5);DUCK.rotation.set(0.1*Math.sin(t*3),t*0.6,0.08*Math.sin(t*2.5));DUCK.scale.setScalar(1.3);}
 // esponja
 SPONGE.position.copy(hand('bia',1));SPONGE.rotation.set(0,KIDS.bia.root.rotation.y,0);
 // balde
 if(t>T.MOVE+0.3){BUCKET.position.set(1.05,0.27,-1.75);BUCKET.rotation.set(0,0,0);BUCKET.userData.w.visible=false;BUCKET.scale.setScalar(1.4);}else{var bl=hand('leo',1).add(hand('leo',-1)).multiplyScalar(0.5);BUCKET.position.copy(bl);var tilt=(t>T.POUR&&t<T.RINSE+0.3)?S(t,T.POUR,T.POUR+0.4)*(1-S(t,T.RINSE,T.RINSE+0.3)):0;
 BUCKET.rotation.set(0,KIDS.leo.root.rotation.y,0);BUCKET.rotateX(1.9*tilt);BUCKET.position.y+=0.12;BUCKET.userData.w.visible=t<T.RINSE;BUCKET.scale.setScalar(1.4);}
 // espuma
 var f=foamLvl(t);FOAM.visible=f>0.01;FB.forEach(function(s,i){var k=clamp(f*1.3-i*0.025,0,1);s.scale.setScalar(Math.max(0.001,k*(1+0.06*Math.sin(t*6+i))));});
 DIRT.visible=t>31.0&&t<T.SPL2;if(DIRT.visible)DIRT.scale.setScalar(Math.max(0.001,S(t,31.0,32.4)*(1-S(t,T.SPL2-0.1,T.SPL2))));
 CROWN.forEach(function(g,i){var on=t>T.SHAKE+0.6+i*0.15&&t<T.MOVE;g.visible=on;if(on)g.scale.setScalar(Math.max(0.001,back((t-T.SHAKE-0.6-i*0.15)/0.3)*(1-S(t,T.MOVE-0.4,T.MOVE))));});
 // gotas
 var di=0;DROPS.forEach(function(d){d.visible=false;});
 function drop(p,v,ct){if(di>=DROPS.length)return;var d=DROPS[di++];var y=p.y+v.y*ct-4.9*ct*ct;if(y<0.05)return;d.visible=true;d.position.set(p.x+v.x*ct,y,p.z+v.z*ct);}
 if(t>T.SHAKE+0.2&&t<T.WET+0.6){for(var i=0;i<40;i++){var t0=T.SHAKE+0.2+(i%8)*0.22,ct=t-t0;if(ct<0||ct>0.9)continue;var a=i*2.399,sp=2.6+(i%5)*0.5;drop(V(DS[0],0.6,DS[1]),V(Math.cos(a)*sp,2.2+(i%3)*0.6,Math.sin(a)*sp),ct);}}
 if(t>T.POUR+0.2&&t<T.RINSE){var m=BUCKET.localToWorld(V(0,0.2,0.2));for(var j=0;j<14;j++){var ct2=((t*1.7+j/14)%1)*0.45;drop(m,V((TUB[0]-m.x)*1.2,0,(TUB[1]-m.z)*1.2),ct2);}}
 SPL.forEach(function(s){var ct=t-s[0];if(ct<0||ct>0.8)return;for(var i=0;i<14;i++){var a=i*2.399;drop(V(s[1][0],TH,s[1][1]),V(Math.cos(a)*1.4*s[2],2.6*s[2],Math.sin(a)*1.4*s[2]),ct);}});};
BURST=[[T.SPL+0.1,[0,-0.8],0.9],[T.SPL2+0.1,[0,-0.8],0.9],[T.ROW,[0,-1.6]],[T.ROW+2.4,[0,-1.6]]];
BW=[['Hora do banho!',3.5,4.9,kp('duda',2.7,-0.4),1],['Ele fugiu!',7.6,9.0,kp('teo',2.7,0.4),1],['Olha o patinho!',T.DUCK,11.0,kp('duda',2.7,-0.5),1],['Que fácil!',13.4,14.8,kp('bia',2.7,0.3),1],
 ['Virou nuvem!',18.0,19.6,kp('teo',2.7,0.4),1],['Lá vai água!',20.6,22.0,kp('leo',2.7,-0.2),1],['Vai sacudir!',24.0,25.2,kp('bia',2.7,0.3),1],['Molhou geral!',27.6,29.2,kp('duda',2.9,-0.6),1],
 ['Não, Pipoca!',30.4,31.8,kp('teo',2.7,0.4),1],['Sujou de novo!',33.2,34.6,kp('leo',2.9,-0.3),1],['Banho de novo?',35.0,36.4,kp('bia',2.9,0.3),1],['Agora ele gostou!',38.6,40.0,kp('duda',2.9,-0.5),1],
 ['Pipoca cheiroso!',51.4,55.0,function(){return [0,2.4,-2.2];},1]];
var GP=[[0,-1.6],[0,-0.0],[-0.8,-0.8],[0.8,-0.8]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||48,m||0.08,GP);};}
function K_(names,a,e,fov,m){return function(){return frameOn(names,a,e,fov||46,m||0.1,GP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(-30,-8,ez(lin(t,0,3.2))),lerp(40,28,ez(lin(t,0,3.2))),50,0.1,GP);}],
 [T.ARR,T.RUN,A_(-8,28,46)],
 [T.RUN,T.DUCK,A_(10,34,50)],
 [T.DUCK,T.SPL+0.6,A_(-16,28,48)],
 [T.SPL+0.6,20.4,A_(-6,30,46)],
 [20.4,23.4,A_(22,28,46)],
 [23.4,29.6,A_(0,24,46)],
 [29.6,36.4,A_(-20,26,46)],
 [36.4,T.MOVE,A_(8,28,46)],
 [T.MOVE,T.ROW,function(t){return mixCam(frameOn(ALL,8,28,46,0.08,GP),frameLow(ALL,0,16,50,0.06),ez(lin(t,T.MOVE,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[[4.4,'uhoh'],[T.RUN,'run'],[T.DUCK,'quack'],[T.TOSS,'toss'],[T.JUMP,'jump'],[T.SPL,'splash'],[T.SCRUB+0.5,'scrub'],[17.8,'laugh'],[T.POUR,'pour'],[T.OUT,'jump'],[T.SHAKE,'shake'],[T.WET,'laugh'],
 [T.ROLL,'roll'],[33.0,'laugh'],[37.6,'jump'],[T.SPL2,'splash'],[T.ROW,'confetti']];
