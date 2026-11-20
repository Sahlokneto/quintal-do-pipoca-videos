// ===== Pipa =====
makeBubs([['Dia de pipa!',90],['Ih, caiu!',100],['O Pipoca empinou!',56],['Pipoca piloto!',64],['Valeu, Pipoca!',64],['Enroscou!',90],
 ['Pipa de quatro patas!',54],['Todos juntos!',72],['Lá no alto!',90],['Voa, pipa, voa!',64]]);
radio.visible=false;
var LE=[-1.3,-0.4],BI=[1.3,-0.4],TE=[-0.6,-1.8],DU=[0.7,-1.9],BI2=[1.2,0.4],BG=[0.2,1.1],DS=[0,1.0],DS2=[0,1.6],LOOSE=[1.5,1.0],GK=[2.0,1.7],DR=[-0.6,1.3];
var LP=[-0.75,1.2],BP=[0.75,1.2];
var FIN={teo:[-1.7,1.6],leo:[-0.65,1.9],bia:[0.65,1.9],duda:[1.7,1.6]},DF=[0,3.0];
var TW={teo:[-1.7,0.9],duda:[1.7,0.9]};
var T={ARR:3.0,LAU1:5.0,LAU2:6.0,FALL:8.0,GRAB:10.8,RUN:11.0,RUNE:15.0,GIVE:18.0,GUST:23.0,MEET:24.0,DOWN:25.6,LAND:29.0,LOOP:29.6,LOOPE:33.0,PICK:34.8,TOG:35.4,LAU3:37.6,UP3:40.0,WAVE:55.5,END:60};
var END=T.END;
var KLS=[-1.2,5.0,2.0],KBS=[1.2,4.8,2.4],KM=[0,4.4,2.3],KL2=[-1.0,4.0,3.2],KB2=[1.0,4.2,3.4];
var STY={leo:0,bia:3,teo:2,duda:1};
function strA(t,ph){var b=0.12*Math.sin(t*3+(ph||0));return {aLx:-1.45+b,aRx:-1.45+b,aLz:0.25,aRz:-0.25,eL:-0.7,eR:-0.7,hx:-0.3};}
var HOLDK={aLx:-2.75,aRx:-2.75,aLz:0.12,aRz:-0.12,eL:-0.1,eR:-0.1};
var WOWA={aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};
function dogP(t){return dogState(t).p;}
var REACT=[[8.0,10.0,'none','wow'],[13.4,16.6,'laugh','tongue'],[21.0,23.0,'clap','happy'],[23.2,25.6,'none','wow'],[29.4,33.4,'laugh','tongue']];
function kiteMid(){return [0,2.4];}
function lookT(t){if((t>T.GRAB-1.4&&t<T.GIVE)||(t>T.LAND&&t<T.PICK))return dogP(t);return kiteMid();}
// criança olhando (sem linha)
function watcher(n,p,t0,t1){return cust(t0,t1,function(t){var y=yawTo(p,lookT(t));for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1]){
  if(r[2]==='none')return {p:p,yaw:y,pose:'none',face:'wow',A:WOWA};return {p:p,yaw:y,pose:r[2],face:r[3]};}}
 var up=!(t>T.GRAB-1.4&&t<T.GIVE)&&!(t>T.LAND&&t<T.PICK);return {p:p,yaw:y,pose:'stand',face:'happy',A:up?{hx:-0.35}:null};});}
// criança segurando a linha
function flyer(n,p,t0,t1,ph){return cust(t0,t1,function(t){var y=yawTo(p,lookT(t)),f='happy',yy=0;for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1]){f=r[3];if(r[2]==='laugh')yy=0.05*Math.abs(Math.sin(t*13));}}
 return {p:p,yaw:y,pose:'none',face:f,y:yy,A:strA(t,ph)};});}
(function(){var st={leo:[-3.5,-3.5],bia:[3.5,-3.5],teo:[-1.0,-5.5],duda:[1.0,-5.5]};
 function arrive(n,P,A){return [hold(0,0.2,st[n],yawTo(st[n],P),'stand'),mv(0.2,2.8,[st[n],P],'run',{face:'happy',A:A}),turnTo(2.8,T.ARR,P,yawTo(st[n],P),yawTo(P,kiteMid()),'stand',{face:'happy',A:A})];}
 TL.leo=arrive('leo',LE,HOLDK).concat([
  cust(T.ARR,T.LAU1,function(t){return {p:LE,yaw:yawTo(LE,kiteMid()),pose:'none',face:'happy',A:HOLDK};}),
  flyer('leo',LE,T.LAU1,33.2,0),mv(33.2,34.6,[LE,LP],'walk',{face:'happy',A:strA(0,0)}),
  cust(34.6,37.4,function(t){var y=yawTo(LP,kiteMid());if(t<T.PICK+0.5)return {p:LP,yaw:y,pose:'none',face:'focus',A:{aLx:-1.2,aRx:-1.2,aLz:0.2,aRz:-0.2,eL:-0.6,eR:-0.6}};
   return {p:LP,yaw:y,pose:'none',face:'happy',A:HOLDK};}),
  mv(37.4,38.4,[LP,FIN.leo],'run',{face:'happy',A:strA(0,0)}),flyer('leo',FIN.leo,38.4,T.WAVE,0)]);
 TL.bia=arrive('bia',BI,HOLDK).concat([
  cust(T.ARR,T.LAU2,function(t){return {p:BI,yaw:yawTo(BI,kiteMid()),pose:'none',face:'happy',A:HOLDK};}),
  cust(T.LAU2,T.FALL,function(t){return {p:BI,yaw:yawTo(BI,kiteMid()),pose:'none',face:t<7.0?'focus':'wow',A:strA(t*2.5,1)};}),
  watcher('bia',BI,T.FALL,16.6),mv(16.6,T.GIVE,[BI,BG],'walk',{face:'happy'}),
  cust(T.GIVE,19.6,function(t){return {p:BG,yaw:yawTo(BG,KBS),pose:'none',face:t<T.GIVE+0.3?'focus':'happy',A:strA(t,1)};}),
  mv(19.6,21.0,[BG,BI2],'walk',{face:'happy',A:strA(0,1)}),flyer('bia',BI2,21.0,33.2,1),mv(33.2,34.6,[BI2,BP],'walk',{face:'happy',A:strA(0,1)}),
  cust(34.6,37.4,function(t){var y=yawTo(BP,kiteMid());if(t<T.PICK+0.5)return {p:BP,yaw:y,pose:'none',face:'focus',A:{aLx:-1.2,aRx:-1.2,aLz:0.2,aRz:-0.2,eL:-0.6,eR:-0.6}};
   return {p:BP,yaw:y,pose:'none',face:'happy',A:HOLDK};}),
  mv(37.4,38.4,[BP,FIN.bia],'run',{face:'happy',A:strA(0,1)}),flyer('bia',FIN.bia,38.4,T.WAVE,1)]);
 function fan(n,P,via){return arrive(n,P,null).concat([watcher(n,P,T.ARR,35.0),mv(35.0,37.0,[P,via,TW[n]],'walk',{face:'happy'}),
  turnTo(37.0,37.4,TW[n],yawTo(via,TW[n]),0,'stand',{face:'happy'}),mv(37.4,38.4,[TW[n],FIN[n]],'run',{face:'happy'}),
  cust(38.4,T.WAVE,function(t){if(t<43.0)return {p:FIN[n],yaw:0,pose:'cheer',face:'happy',A:{hx:-0.3}};var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};})]);}
 TL.teo=fan('teo',TE,[-1.9,-0.6]);TL.duda=fan('duda',DU,[1.9,-0.6]);
 Object.keys(KIDS).forEach(function(n){TL[n].push(cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var RUNP=[LOOSE,[2.3,2.3],[1.0,3.2],[-0.6,3.1],[-1.5,2.1],DR];
DG=[hold(0,0.3,[3.5,4],yawTo([3.5,4],[1.2,2.2]),'stand'),mv(0.3,2.8,[[3.5,4],[1.2,2.2],DS],'drun'),turnTo(2.8,3.2,DS,yawTo([1.2,2.2],DS),0,'sit'),
 cust(3.2,9.4,function(t){var up=t>T.LAU1;return {p:DS,yaw:0,pose:'sit',hx:up?-0.45:0,hz:0.2*Math.sin(t*2),tailF:20};}),
 turnTo(9.4,9.8,DS,0,yawTo(DS,LOOSE),'stand'),mv(9.8,T.GRAB-0.2,[DS,LOOSE],'dwalk'),
 cust(T.GRAB-0.2,T.RUN,function(t,u){return {p:LOOSE,yaw:yawTo(DS,LOOSE),pose:'stand',hx:0.5*Math.sin(PI*u)};}),
 mv(T.RUN,T.RUNE,RUNP,'drun',{tailF:34}),turnTo(T.RUNE,T.RUNE+0.3,DR,yawTo([-1.5,2.1],DR),yawTo(DR,[KBS[0],KBS[2]]),'sit'),
 cust(T.RUNE+0.3,19.8,function(t){return {p:DR,yaw:yawTo(DR,[KBS[0],KBS[2]]),pose:t<T.GIVE?'sit':'party',hx:t<T.GIVE?-0.3:0,tailF:30,tailA:1.0};}),
 mv(19.8,21.0,[DR,DS2],'dwalk'),turnTo(21.0,21.3,DS2,yawTo(DR,DS2),0,'sit'),
 cust(21.3,T.LAND,function(t){var up=t>22.5;return {p:DS2,yaw:0,pose:'sit',hx:up?-0.5:0,hz:0.15*Math.sin(t*2.5)};}),
 cust(T.LAND,T.LOOP,function(t){return {p:DS2,yaw:0,pose:'stand',hx:0.1};}),
 mv(T.LOOP,T.LOOPE,[DS2,[0.9,2.4],[0,3.1],[-0.9,2.4],DS2],'dwalk',{tailF:30}),turnTo(T.LOOPE,T.LOOPE+0.3,DS2,yawTo([-0.9,2.4],DS2),0,'sit'),
 cust(T.LOOPE+0.3,36.0,function(t){return {p:DS2,yaw:0,pose:'sit',hx:t>T.PICK?-0.3:0};}),
 mv(36.0,37.0,[DS2,[0,2.4]],'dwalk'),turnTo(37.0,37.4,[0,2.4],0,0,'sit'),mv(37.4,38.4,[[0,2.4],DF],'drun'),turnTo(38.4,38.7,DF,0,0,'stand'),
 cust(38.7,END+2,function(t){return {p:DF,yaw:0,pose:'party'};})];
// ----- objetos: pipas e linhas -----
function makeKite(c1,c2){var g=new THREE.Group();g.rotation.order='YXZ';scene.add(g);var d=new THREE.Group();d.scale.set(0.78,1.08,1);g.add(d);
 var a=box(0.85,0.85,0.03,c1);a.rotation.z=PI/4;d.add(a);var b=box(0.42,0.42,0.035,c2);b.rotation.z=PI/4;b.position.y=0.21*1.41/2;d.add(b);
 var s1=box(0.04,1.3,0.05,0x8b5a2b);s1.position.z=-0.03;g.add(s1);var s2=box(0.95,0.04,0.05,0x8b5a2b);s2.position.set(0,0.1,-0.03);g.add(s2);
 var tail=[];for(var i=0;i<5;i++){var bw=box(0.16,0.09,0.03,i%2?c2:c1);g.add(bw);tail.push(bw);}g.tail=tail;g.scale.setScalar(1.1);return g;}
var KITEL=makeKite(0x2f7de0,0xffd166),KITEB=makeKite(0xff6fa3,0xffffff);
function makeLine(){var m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xf5f5f5}));scene.add(m);return m;}
var LINEL=makeLine(),LINEB=makeLine();
function stretch(m,a,b){var L=a.distanceTo(b);m.visible=L>0.05;m.position.copy(a).add(b).multiplyScalar(0.5);m.lookAt(b);m.scale.set(0.028,0.028,L);}
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
function mouth(){return dog.head.localToWorld(V(0,-0.12,0.42));}
var CA={};function frameState(t){Object.keys(KIDS).forEach(function(n){applyKid(KIDS[n],stateOf(n,t),t);});applyDog(t);scene.updateMatrixWorld(true);}
function at(key,tq,fn,tnow){if(CA[key])return CA[key].clone();frameState(tq);var v=fn();CA[key]=v.clone();frameState(tnow);return v;}
function A3(a){return V(a[0],a[1],a[2]);}
function inHands(n){var h=hands(n);h.y+=0.75;var y=KIDS[n].root.rotation.y;h.x+=0.05*Math.sin(y);h.z+=0.05*Math.cos(y);return {p:h,r:[-0.2,y,0]};}
function sky(P,t,ph){return {p:V(P[0]+0.25*Math.sin(t*1.3+ph),P[1]+0.15*Math.sin(t*2.1+ph),P[2]),r:[-0.35+0.08*Math.sin(t*2+ph),0.15*Math.sin(t*1.1+ph),0.25*Math.sin(t*1.3+ph+0.5)]};}
function spin(t,side){var a=(t-T.MEET)*4.5+(side>0?PI:0),r=0.5;return V(KM[0]+r*Math.cos(a),KM[1]+0.2*Math.sin(a*0.7),KM[2]+r*Math.sin(a));}
function wing(t,side){var s=dogState(t),y=dog.root.rotation.y,ox=side*0.34,oy=0.9,c=Math.cos(y),sn=Math.sin(y);var p=dog.root.position;
 return {p:V(p.x+ox*c,p.y+oy,p.z-ox*sn),r:[-0.25+0.2*Math.sin(t*9),y+side*PI/2,side*0.5]};}
function arcP(a,b,u,h){var p=a.clone().lerp(b,u);p.y+=h*4*u*(1-u);return p;}
function kiteState(t,who){var side=who==='leo'?-1:1,P0=who==='leo'?KLS:KBS,P2=who==='leo'?KL2:KB2,ph=who==='leo'?0:2;
 if(who==='leo'){if(t<T.LAU1)return inHands('leo');
  if(t<7.4){var h=at('hl',T.LAU1,function(){return inHands('leo').p;},t),u=ez(lin(t,T.LAU1,7.4)),s=sky(P0,t,ph);return {p:arcP(h,s.p,u,0.6),r:[-0.35,0.6*Math.sin(t*5)*(1-u),0.4*Math.sin(t*4)*(1-u)]};}}
 else{if(t<T.LAU2)return inHands('bia');
  if(t<7.0){var h2=at('hb',T.LAU2,function(){return inHands('bia').p;},t),u2=ez(lin(t,T.LAU2,7.0));return {p:h2.clone().lerp(V(1.6,2.7,0.9),u2),r:[-0.3,0,0.5*Math.sin(t*9)]};}
  if(t<T.FALL){var u3=lin(t,7.0,T.FALL);var p3=V(1.6,2.7,0.9).lerp(V(GK[0],0.12,GK[1]),u3*u3);return {p:p3,r:[-0.3-1.27*u3,u3*4,0.8*Math.sin(t*12)*(1-u3)]};}
  if(t<T.RUN)return {p:V(GK[0],0.12,GK[1]),r:[-PI/2,4,0]};
  if(t<T.RUNE){var u4=lin(t,T.RUN,T.RUNE),g=V(GK[0],0.12,GK[1]),s4=sky(P0,t,ph),pp=g.clone().lerp(s4.p,ez(u4));pp.y=lerp(0.12,s4.p.y,S(u4,0.05,0.9));
   return {p:pp,r:[lerp(-PI/2,-0.35,S(u4,0,0.3)),lerp(4,0,S(u4,0,0.5)),0.3*Math.sin(t*6)]};}}
 if(t<T.GUST)return sky(P0,t,ph);
 if(t<T.MEET){var a=sky(P0,T.GUST,ph).p,u5=ez(lin(t,T.GUST,T.MEET));return {p:a.lerp(spin(T.MEET,side),u5),r:[-0.35,u5*2,side*u5]};}
 if(t<T.DOWN)return {p:spin(t,side),r:[-0.35,(t-T.MEET)*4.5,side*0.6+0.3*Math.sin(t*7)]};
 if(t<T.LAND){var u6=ez(lin(t,T.DOWN,T.LAND)),sp=spin(t,side),w=wing(t,side);return {p:sp.lerp(w.p,u6),r:[lerp(-0.35,w.r[0],u6),lerp((t-T.MEET)*4.5,w.r[1]+4*PI,u6),lerp(side*0.6,w.r[2],u6)]};}
 if(t<T.PICK)return wing(t,side);
 if(t<T.PICK+0.5){var w2=at('w'+who,T.PICK,function(){return wing(T.PICK,side).p;},t),u7=ez(lin(t,T.PICK,T.PICK+0.5)),ih=inHands(who);return {p:arcP(w2,ih.p,u7,0.8),r:[-0.2,ih.r[1]+(1-u7)*3,0]};}
 if(t<T.LAU3)return inHands(who);
 if(t<T.UP3){var h3=at('h3'+who,T.LAU3,function(){return inHands(who).p;},t),u8=ez(lin(t,T.LAU3,T.UP3)),s8=sky(P2,t,ph);return {p:arcP(h3,s8.p,u8,0.8),r:[-0.35,0.5*Math.sin(t*5)*(1-u8),0.3*Math.sin(t*4)*(1-u8)]};}
 return sky(P2,t,ph);}
function lineEnd(who,t){if(who==='leo'){if(t<T.LAU1||(t>=T.PICK&&t<T.LAU3))return null;return hand('leo',1);}
 if(t<T.LAU2||(t>=T.PICK&&t<T.LAU3))return null;if(t<T.FALL)return hand('bia',1);if(t<T.GRAB)return V(LOOSE[0],0.08,LOOSE[1]);if(t<T.GIVE)return mouth();return hand('bia',1);}
function placeKite(K,st,t){K.position.copy(st.p);K.rotation.set(st.r[0],st.r[1],st.r[2]);
 K.tail.forEach(function(b,i){var k=i+1;b.position.set(0.08*k*Math.sin(t*5-k*0.8),-0.62-0.2*k,0.02*Math.sin(t*4-k));b.rotation.z=0.4*Math.sin(t*6-k);});}
function kiteAnchor(K){return K.localToWorld(V(0,-0.05,0.02));}
EXTRA=function(t){var L=kiteState(t,'leo'),B=kiteState(t,'bia');placeKite(KITEL,L,t);placeKite(KITEB,B,t);scene.updateMatrixWorld(true);
 var e1=lineEnd('leo',t),e2=lineEnd('bia',t);LINEL.visible=!!e1;LINEB.visible=!!e2;if(e1)stretch(LINEL,e1,kiteAnchor(KITEL));if(e2)stretch(LINEB,e2,kiteAnchor(KITEB));};
BURST=[[T.UP3+0.1,[0,2.2],2.2],[T.UP3+2.6,[0,2.0],2.2],[46.0,[0,2.0],2.2]];
BW=[['Dia de pipa!',3.2,4.8,kp('leo',3.0,0.5),1],['Ih, caiu!',8.3,9.8,kp('bia',2.8,-0.5),1],['O Pipoca empinou!',13.4,15.0,kp('duda',2.8,0.3),1],['Pipoca piloto!',15.2,16.6,kp('teo',2.8,-0.3),1],
 ['Valeu, Pipoca!',18.3,19.8,kp('bia',2.9,0.4),1],['Enroscou!',24.0,25.6,kp('teo',2.8,-0.2),1],['Pipa de quatro patas!',30.6,32.8,kp('duda',2.8,0.2),1],
 ['Todos juntos!',35.4,37.0,kp('teo',2.8,0.3),1],['Lá no alto!',40.6,42.4,kp('leo',2.9,-0.3),1],['Voa, pipa, voa!',51.6,54.6,kp('bia',2.9,0.3),1]];
function framePts(names,aDeg,eDeg,fov,m,P3){var pts=[],mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9];
 function addP(x,y,z){pts.push(V(x,y,z));mn[0]=Math.min(mn[0],x);mn[1]=Math.min(mn[1],y);mn[2]=Math.min(mn[2],z);mx[0]=Math.max(mx[0],x);mx[1]=Math.max(mx[1],y);mx[2]=Math.max(mx[2],z);}
 names.forEach(function(n){var p=pos2(n);addP(p.x,0,p.z);addP(p.x,n==='dog'?1.15:2.9,p.z);});(P3||[]).forEach(function(e){addP(e[0],e[1]+0.75,e[2]);addP(e[0],e[1]-1.1,e[2]);});
 var c=V((mn[0]+mx[0])/2,(mn[1]+mx[1])/2,(mn[2]+mx[2])/2);
 var a=aDeg*PI/180,e=eDeg*PI/180,dir=V(Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e));
 _cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(c).add(dir);_cam.lookAt(c);_cam.updateMatrixWorld();
 var r=V(1,0,0).applyQuaternion(_cam.quaternion),u=V(0,1,0).applyQuaternion(_cam.quaternion),f=dir.clone().negate();
 var tv=Math.tan(fov*PI/360),th=tv*W/H,D=2;
 pts.forEach(function(p){var v=p.clone().sub(c),x=Math.abs(v.dot(r))+0.6,y=Math.abs(v.dot(u))+0.35,z=v.dot(f);D=Math.max(D,x/(th*(1-m))-z,y/(tv*(1-m))-z);});
 var pos=c.clone().addScaledVector(dir,D);return {pos:[pos.x,pos.y,pos.z],look:[c.x,c.y,c.z],fov:fov};}
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||46,m||0.08);};}
function K_(a,e,P3,fov){return function(){return framePts(ALL,a,e,fov||46,0.03,P3);};}
var KS1=[KLS],KS2=[KLS,[2.0,0.4,1.7]],KS3=[KLS,KBS],KS4=[KL2,KB2];
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(28,-6,ez(lin(t,0,3.0))),lerp(36,22,ez(lin(t,0,3.0))),48,0.1);}],
 [T.ARR,T.LAU1,A_(-6,20,46)],
 [T.LAU1,9.6,K_(8,8,KS1)],
 [9.6,16.6,K_(-12,14,KS3)],
 [16.6,21.0,K_(14,12,KS3)],
 [21.0,T.LAND-0.4,K_(0,8,KS3)],
 [T.LAND-0.4,T.PICK,A_(-14,26,46)],
 [T.PICK,T.LAU3,A_(6,22,46,0.14)],
 [T.LAU3,44.0,K_(0,8,KS4)],
 [44.0,46.0,function(t){return mixCam(framePts(ALL,0,8,46,0.06,KS4),frameLow(ALL,0,12,50,0.06),ez(lin(t,44.0,46.0)));}],
 [46.0,END+2,function(){return frameLow(ALL,0,12,50,0.06);}]];
EV=[[2.6,'bark'],[T.LAU1,'launch'],[T.LAU2,'launch'],[7.0,'fall'],[T.FALL,'thud'],[T.GRAB,'bark'],[T.RUN,'run'],[13.4,'laugh'],[T.GIVE,'pop'],[21.0,'clap'],[T.GUST,'gust'],[T.MEET,'spin'],[T.DOWN,'down'],[T.LAND,'land'],[29.4,'laugh'],[T.PICK,'pop'],[T.LAU3,'launch'],[T.UP3,'confetti']];
