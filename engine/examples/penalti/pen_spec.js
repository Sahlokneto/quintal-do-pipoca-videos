// ===== Pênalti =====
makeBubs([['Pipoca no gol!',66],['Que defesa!',80],['Foi longe!',90],['Bom garoto!',80],['Furei!',100],['Foi gol?!',90],['GOOOL!',100],['Que goleiro!',76],['Agora o Pipoca chuta!',44],['GOL do Pipoca!',62],['Pipoca, craque do quintal!',40]]);
radio.visible=false;
var GZ=-2.6,GW=1.3,GH=1.3,BR=0.22;
var K=[0,-2.0],B=[0,0.4],R=[0,1.6],KP=[0,0.8];
// golzinho
(function(){var c=0xffffff;function bar(w,h,d,x,y,z){var m=box(w,h,d,c);m.position.set(x,y,z);scene.add(m);return m;}
 bar(0.14,GH,0.14,-GW,GH/2,GZ);bar(0.14,GH,0.14,GW,GH/2,GZ);bar(2*GW+0.14,0.14,0.14,0,GH,GZ);
 bar(0.08,0.08,0.9,-GW,GH,GZ-0.45);bar(0.08,0.08,0.9,GW,GH,GZ-0.45);bar(0.08,GH,0.08,-GW,GH/2,GZ-0.9);bar(0.08,GH,0.08,GW,GH/2,GZ-0.9);bar(2*GW,0.06,0.06,0,GH,GZ-0.9);
 var nm=new THREE.MeshStandardMaterial({color:col(0xffffff),transparent:true,opacity:0.45,roughness:0.6});
 for(var i=0;i<=12;i++){var v=new THREE.Mesh(new THREE.BoxGeometry(0.025,GH,0.025),nm);v.position.set(-GW+i*2*GW/12,GH/2,GZ-0.9);scene.add(v);}
 for(var j=1;j<=5;j++){var h=new THREE.Mesh(new THREE.BoxGeometry(2*GW,0.025,0.025),nm);h.position.set(0,j*GH/6,GZ-0.9);scene.add(h);}
 for(var k=1;k<=4;k++){[-1,1].forEach(function(s){var q=new THREE.Mesh(new THREE.BoxGeometry(0.025,GH,0.025),nm);q.position.set(s*GW,GH/2,GZ-k*0.18);scene.add(q);});
  var tp=new THREE.Mesh(new THREE.BoxGeometry(2*GW,0.025,0.025),nm);tp.position.set(0,GH,GZ-k*0.18);scene.add(tp);}
 // linhas e marca do pênalti
 function strip(x,z,w,d){var m=box(w,0.03,d,0xffffff);m.position.set(x,0.07,z);m.castShadow=false;scene.add(m);}
 strip(0,GZ,2*GW+1.2,0.08);strip(-GW-0.6,GZ+0.8,0.08,1.6);strip(GW+0.6,GZ+0.8,0.08,1.6);strip(0,GZ+1.6,2*GW+1.2,0.08);
 var pk=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.03,14),mat(0xffffff));pk.position.set(B[0],0.075,B[1]);scene.add(pk);})();
// bola
var BALL;(function(){var c=document.createElement('canvas');c.width=256;c.height=128;var x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,256,128);x.fillStyle='#222';
 [[32,30],[96,64],[160,30],[224,64],[32,100],[160,100],[96,10],[224,118]].forEach(function(p){x.beginPath();for(var i=0;i<5;i++){var a=i*2*PI/5-PI/2;x.lineTo(p[0]+15*Math.cos(a),p[1]+15*Math.sin(a));}x.closePath();x.fill();});
 var tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;BALL=new THREE.Mesh(new THREE.SphereGeometry(BR,20,14),new THREE.MeshStandardMaterial({map:tx,roughness:0.4}));BALL.castShadow=true;scene.add(BALL);})();
var T={ARR:3.4,K1:5.6,K2:11.0,FETCH:14.0,DROP1:16.6,K3:20.2,GOAL3:25.0,PICK3:27.6,DROP3:28.8,K4:32.4,CATCH4:32.8,DROP4:36.2,K5:39.0,GOAL5:39.8,MOVE:42.4,ROW:44.6,END:60};
var END=T.END;
var WAIT={bia:[2.0,1.0],teo:[2.1,0.0],duda:[2.2,-1.0]},DONE={leo:[-2.0,1.0],bia:[-2.1,0.0],teo:[-2.2,-1.0],duda:[2.0,1.0]},G=[0,-2.0];
var FIN={bia:[-1.4,1.2],teo:[-0.47,1.2],leo:[0.47,1.2],duda:[1.4,1.2]},DFIN=[0,2.3];
var REACT=[[T.K1+0.5,7.6,'clap','happy'],[T.K2+0.6,13.2,'look','wow'],[T.DROP1,18.2,'clap','happy'],[T.K3+0.2,24.6,'laugh','tongue'],[T.GOAL3,28.0,'cheer','happy'],[T.CATCH4,35.0,'cheer','happy'],[T.GOAL5,T.MOVE,'cheer','happy']];
function watcher(n,p,t0,t1){return cust(t0,t1,function(t){var y=yawTo(p,[0,-0.6]);for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1])return {p:p,yaw:y,pose:r[2],face:r[3]};}
 var pre=[T.K1,T.K2,T.K3,T.K4,T.K5].some(function(k){return t>k-1.0&&t<k+0.3;});return {p:p,yaw:y,pose:pre?'look':'stand',face:pre?'focus':'happy'};});}
function kick(t0,p){return cust(t0,t0+0.4,function(t,u){var s=Math.sin(PI*u);return {p:p,yaw:PI,pose:'none',face:'focus',y:0.05*s,A:{lR:-1.5*s+0.3*(1-u),lL:0.35*s,aLx:0.7*s,aRx:-0.9*s,aLz:-0.7*s,aRz:0.7*s},pitch:-0.12*s};});}
function runUp(t0,t1){return mv(t0,t1,[R,KP],'run',{face:'focus'});}
var STY={leo:0,bia:3,teo:2,duda:1};
function danceO(n){return function(t){var b=t*BPM/60;return {st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};};}
(function(){var st={leo:[-4,4],bia:[4.5,2.5],teo:[4.5,0],duda:[4.5,-2.5]};
 TL.leo=[hold(0,0.2,st.leo,yawTo(st.leo,R),'stand'),mv(0.2,3.0,[st.leo,[-1,2.4],R],'run',{face:'happy'}),turnTo(3.0,3.4,R,yawTo([-1,2.4],R),PI,'stand',{face:'happy'}),
  hold(3.4,T.K1-0.6,R,PI,'look',{face:'focus'}),runUp(T.K1-0.6,T.K1),kick(T.K1,KP),hold(T.K1+0.4,6.6,KP,PI,'look',{face:'wow'}),
  hold(6.6,7.0,KP,PI,'none',{face:'wow',A:{aLx:-2.6,aRx:-2.6,aLz:0.6,aRz:-0.6,eL:-2.0,eR:-2.0}}),
  mv(7.0,8.6,[KP,[-1.0,1.0],DONE.leo],'walk',{face:'happy'}),turnTo(8.6,8.9,DONE.leo,-PI/2,yawTo(DONE.leo,[0,-0.6]),'stand'),watcher('leo',DONE.leo,8.9,35.2),
  mv(35.2,37.2,[DONE.leo,[-1.0,0.2],[-0.8,-1.3],G],'walk',{face:'happy'}),turnTo(37.2,37.5,G,yawTo([-0.8,-1.3],G),0,'stand'),
  cust(37.5,T.K5+0.1,function(t){return {p:[0.2*Math.sin((t-37.5)*3),G[1]],yaw:0,pose:'none',face:'focus',pitch:0.15,A:{aLx:-0.6,aRx:-0.6,aLz:-0.9,aRz:0.9,eL:-0.3,eR:-0.3,lL:-0.15,lR:-0.15},sit:0.1};}),
  cust(T.K5+0.1,T.K5+0.6,function(t,u){var x0=0.2*Math.sin((T.K5+0.1-37.5)*3);var r=-PI/2*S(u,0,1);return {p:[lerp(x0,0.9,ez(u)),G[1]],yaw:0,pose:'none',face:'wow',roll:r,y:hopAt(u,0,1,0.5)+0.25*Math.sin(-r),A:{aLx:-2.9,aRx:-2.9,aLz:-0.3,aRz:0.3}};}),
  cust(T.K5+0.6,41.8,function(t){var lg=t>T.GOAL5+0.4;return {p:[0.9,G[1]],yaw:0,pose:'none',face:lg?'tongue':'wow',roll:-PI/2,y:0.25,A:{aLx:-2.9,aRx:-2.9,aLz:-0.3,aRz:0.3,lL:lg?0.3*Math.sin(t*12):0}};}),
  cust(41.8,T.MOVE,function(t,u){return {p:[0.9,G[1]],yaw:0,pose:'none',face:'happy',roll:-PI/2*(1-ez(u)),y:0.25*(1-ez(u))};}),
  mv(T.MOVE,T.ROW,[[0.9,G[1]],[0.9,0.0],FIN.leo],'walk',{face:'happy'})];
 TL.bia=[hold(0,0.2,st.bia,yawTo(st.bia,WAIT.bia),'stand'),mv(0.2,3.0,[st.bia,WAIT.bia],'run',{face:'happy'}),turnTo(3.0,3.4,WAIT.bia,-PI/2,yawTo(WAIT.bia,[0,-0.6]),'stand'),
  watcher('bia',WAIT.bia,3.4,8.0),mv(8.0,9.4,[WAIT.bia,[1.0,1.7],R],'walk',{face:'happy'}),turnTo(9.4,9.7,R,-PI/2,PI,'stand'),hold(9.7,T.K2-0.6,R,PI,'look',{face:'focus'}),
  runUp(T.K2-0.6,T.K2),kick(T.K2,KP),hold(T.K2+0.4,11.9,KP,PI,'look',{face:'wow'}),hold(11.9,12.6,KP,PI,'none',{face:'wow',A:{aLx:-2.0,aRx:-2.0,eL:-1.9,eR:-1.9}}),
  mv(12.6,14.2,[KP,[-1.2,0.6],DONE.bia],'walk',{face:'happy'}),turnTo(14.2,14.5,DONE.bia,-PI/2,yawTo(DONE.bia,[0,-0.6]),'stand'),watcher('bia',DONE.bia,14.5,T.MOVE),
  mv(T.MOVE,T.ROW,[DONE.bia,FIN.bia],'walk',{face:'happy'})];
 TL.teo=[hold(0,0.2,st.teo,yawTo(st.teo,WAIT.teo),'stand'),mv(0.2,3.0,[st.teo,WAIT.teo],'run',{face:'happy'}),turnTo(3.0,3.4,WAIT.teo,-PI/2,yawTo(WAIT.teo,[0,-0.6]),'stand'),
  watcher('teo',WAIT.teo,3.4,17.0),mv(17.0,18.6,[WAIT.teo,[1.2,1.2],R],'walk',{face:'happy'}),turnTo(18.6,18.9,R,-PI/2,PI,'stand'),hold(18.9,T.K3-0.6,R,PI,'look',{face:'focus'}),
  runUp(T.K3-0.6,T.K3),
  cust(T.K3,T.K3+0.6,function(t,u){var s=Math.sin(PI*Math.min(1,u*1.6));return {p:KP,yaw:PI,pose:'none',face:'wow',y:lerp(0,GROUND_Y,S(u,0.35,1)),sit:S(u,0.35,1),pitch:-0.5*s,A:{lR:-2.2*s-PI/2*S(u,0.35,1)*(1-s),lL:-PI/2*S(u,0.35,1),aLx:-2.6,aRx:-2.6,aLz:-0.5,aRz:0.5}};}),
  cust(T.K3+0.6,26.0,function(t){var lick=t>21.8&&t<24.6;return {p:KP,yaw:PI,pose:'none',y:GROUND_Y+(lick?0.03*Math.abs(Math.sin(t*13)):0),sit:1,face:lick?'tongue':(t<21.0?'wow':'happy'),roll:lick?0.05*Math.sin(t*13):0,
   A:{lL:-PI/2,lR:-PI/2,aLx:-1.0,aRx:-1.0,eL:-1.1,eR:-1.1,hy:t>T.GOAL3-0.4?0:(lick?0.4:0)}};}),
  cust(26.0,26.4,function(t,u){var c=1-u;return {p:KP,yaw:PI,pose:'none',y:lerp(0,GROUND_Y,c),sit:c,face:'happy',A:{lL:-PI/2*c,lR:-PI/2*c}};}),
  turnTo(26.4,26.7,KP,PI,0.3,'cheer',{face:'happy'}),hold(26.7,28.2,KP,0.3,'cheer',{face:'happy'}),
  mv(28.2,29.8,[KP,[-1.0,-0.4],DONE.teo],'walk',{face:'happy'}),turnTo(29.8,30.1,DONE.teo,yawTo([-1.0,-0.4],DONE.teo),yawTo(DONE.teo,[0,-0.6]),'stand'),watcher('teo',DONE.teo,30.1,T.MOVE),
  mv(T.MOVE,T.ROW,[DONE.teo,[-1.0,0.1],FIN.teo],'walk',{face:'happy'})];
 TL.duda=[hold(0,0.2,st.duda,yawTo(st.duda,WAIT.duda),'stand'),mv(0.2,3.0,[st.duda,WAIT.duda],'run',{face:'happy'}),turnTo(3.0,3.4,WAIT.duda,-PI/2,yawTo(WAIT.duda,[0,-0.6]),'stand'),
  watcher('duda',WAIT.duda,3.4,29.4),mv(29.4,31.0,[WAIT.duda,[1.4,0.6],R],'walk',{face:'happy'}),turnTo(31.0,31.3,R,yawTo([1.4,0.6],R),PI,'stand'),hold(31.3,T.K4-0.6,R,PI,'look',{face:'focus'}),
  runUp(T.K4-0.6,T.K4),kick(T.K4,KP),hold(T.K4+0.4,33.4,KP,PI,'look',{face:'wow'}),hold(33.4,34.8,KP,PI,'none',{face:'wow',A:{aLx:-2.0,aRx:-2.0,eL:-1.9,eR:-1.9}}),
  mv(34.8,35.9,[KP,[1.0,1.4],DONE.duda],'walk',{face:'happy'}),turnTo(35.9,36.2,DONE.duda,yawTo([1.0,1.4],DONE.duda),yawTo(DONE.duda,[0,-0.6]),'stand'),watcher('duda',DONE.duda,36.2,T.MOVE),
  mv(T.MOVE,T.ROW,[DONE.duda,FIN.duda],'walk',{face:'happy'})];
 Object.keys(KIDS).forEach(function(n){TL[n].push(turnTo(T.ROW,T.ROW+0.3,FIN[n],PI*0.9,0,'stand'),hold(T.ROW+0.3,55.5,FIN[n],0,'dance',danceO(n)),
  cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
function keeper(t0,t1){return cust(t0,t1,function(t){var a=0.3*(1-S(t,t1-0.5,t1))*S(t,t0,t0+0.4);return {p:[a*Math.sin((t-t0)*2.6),K[1]],yaw:0,pose:'stand',hx:-0.1,tailF:24};});}
function sideLie(r){return {roll:r,y:0.21*Math.sin(r)};}
var BACK1=[[0.8,-6.2],[1.7,-4.2],[1.8,-2.2],[0.6,-1.2],[0,-0.6],[0,-0.4]];
DG=[hold(0,0.2,[3,6],yawTo([3,6],[1.2,-0.6]),'stand'),mv(0.2,2.8,[[3,6],[1.2,-0.6],K],'drun'),turnTo(2.8,3.2,K,yawTo([1.2,-0.6],K),0,'stand'),
 keeper(3.2,T.K1-0.05),
 cust(T.K1-0.05,6.6,function(t,u){var r=PI/2*S(t,T.K1,T.K1+0.5),x=lerp(0,-0.7,ez(lin(t,T.K1,T.K1+0.5)));var s=sideLie(r);return {p:[x+0.48*Math.sin(r),K[1]],yaw:0,pose:'none',roll:r,y:Math.max(s.y,hopAt(t,T.K1,0.5,0.55)),legs:[-0.6,-0.6,0.5,0.5]};}),
 cust(6.6,7.0,function(t,u){var r=PI/2*(1-ez(u));return {p:[-0.7+0.48*Math.sin(r),K[1]],yaw:0,pose:'stand',roll:r,y:0.21*Math.sin(r)};}),
 hold(7.0,8.4,[-0.7,K[1]],0,'party'),mv(8.4,9.2,[[-0.7,K[1]],K],'dwalk'),turnTo(9.2,9.4,K,PI/2,0,'stand'),keeper(9.4,T.K2-0.05),
 cust(T.K2-0.05,11.6,function(t,u){return {p:K,yaw:0,pose:'hind',lift:S(u,0,0.3)*(1-S(u,0.75,1)),y:hopAt(t,T.K2,0.55,0.6),hx:-0.4};}),
 turnTo(11.6,12.0,K,0,PI,'stand',{hx:-0.3}),
 mv(12.0,T.FETCH,[K,[1.8,-2.2],[1.7,-4.2],[0.8,-6.2]],'drun'),turnTo(T.FETCH,14.3,[0.8,-6.2],yawTo([1.7,-4.2],[0.8,-6.2]),PI,'stand',{hx:0.4}),
 mv(14.3,16.4,BACK1,'drun'),hold(16.4,T.DROP1,[0,-0.4],0,'stand',{hx:0.2}),turnTo(T.DROP1,17.0,[0,-0.4],0,PI,'stand'),mv(17.0,18.2,[[0,-0.4],K],'dwalk'),turnTo(18.2,18.6,K,PI,0,'stand'),
 keeper(18.6,T.K3+0.1),hold(T.K3+0.1,20.9,K,0,'party'),mv(20.9,21.8,[K,[0.9,-0.8],[0.85,0.25]],'drun'),turnTo(21.8,22.0,[0.85,0.25],0,yawTo([0.85,0.25],KP),'stand'),
 cust(22.0,24.6,function(t){return {p:[0.85,0.25],yaw:yawTo([0.85,0.25],KP),pose:'stand',hx:-0.2+0.25*Math.sin(t*14),tailF:30,tailA:1.0};}),
 turnTo(24.6,25.0,[0.85,0.25],yawTo([0.85,0.25],KP),yawTo([0.85,0.25],[0,-2.6]),'stand'),hold(25.0,26.6,[0.85,0.25],yawTo([0.85,0.25],[0,-2.6]),'stand',{hz:0.35,hx:-0.1}),
 mv(26.6,T.PICK3,[[0.85,0.25],[0.6,-1.6],[0,-2.2]],'drun'),turnTo(T.PICK3,28.0,[0,-2.2],PI,0,'stand',{hx:0.3}),mv(28.0,T.DROP3,[[0,-2.2],[0,-0.4]],'dwalk',{hx:0.2}),
 turnTo(T.DROP3,29.2,[0,-0.4],0,PI,'stand'),mv(29.2,30.2,[[0,-0.4],K],'dwalk'),turnTo(30.2,30.6,K,PI,0,'stand'),keeper(30.6,T.K4-0.1),
 cust(T.K4-0.1,32.9,function(t,u){return {p:K,yaw:0,pose:'hind',lift:S(u,0,0.6),y:hopAt(t,T.K4,0.7,0.7),hx:0.2};}),
 cust(32.9,35.0,function(t){return {p:K,yaw:0,pose:'hind',still:1,lift:1,hx:0.2,tailF:34,tailA:1.1};}),
 cust(35.0,35.3,function(t,u){return {p:K,yaw:0,pose:'hind',lift:1-u,hx:0.2};}),
 mv(35.3,T.DROP4,[K,[0.6,-1.2],[0,-0.6],[0,-0.4]],'dwalk',{hx:0.2}),hold(T.DROP4,36.4,[0,-0.4],0,'stand'),
 mv(36.4,37.8,[[0,-0.4],[0.9,0.2],[0.8,1.3],[0,1.6]],'dwalk'),turnTo(37.8,38.2,[0,1.6],-PI/2,PI,'stand'),
 cust(38.2,38.5,function(t){return {p:[0,1.6],yaw:PI,pose:'stand',hx:0.15,y:0.03*Math.sin(t*30)};}),mv(38.5,T.K5,[[0,1.6],[0,1.1]],'drun'),
 cust(T.K5,40.0,function(t,u){return {p:[0,1.1],yaw:PI,pose:'stand',hx:-0.5*Math.sin(PI*clamp(u*3,0,1))};}),
 cust(40.0,41.0,function(t,u){return {p:[0,1.1],yaw:PI+2*PI*ez(u),pose:'party'};}),mv(41.0,42.0,[[0,1.1],[0.5,1.7],DFIN],'dwalk'),turnTo(42.0,42.3,DFIN,yawTo([0.5,1.7],DFIN),0,'party'),hold(42.3,END+2,DFIN,0,'party')];
// ----- bola -----
function noseW(){return dog.head.localToWorld(V(0,-0.08,0.42));}
function frameState(t){Object.keys(KIDS).forEach(function(n){applyKid(KIDS[n],stateOf(n,t),t);});applyDog(t);scene.updateMatrixWorld(true);}
var CA={};function at(key,tq,fn,tnow){if(CA[key])return CA[key].clone();frameState(tq);var v=fn();CA[key]=v.clone();frameState(tnow);return v;}
function bz(a,b,u,h){var m=a.clone().lerp(b,0.5);m.y+=h;var v=1-u;return a.clone().multiplyScalar(v*v).add(m.multiplyScalar(2*v*u)).add(b.clone().multiplyScalar(u*u));}
var VB=V(B[0],BR,B[1]);
var SEG=[[0,T.K1,'s',VB],[T.K1,T.K1+0.5,'a',VB,V(-0.75,0.8,-2.0),0.5],[T.K1+0.5,6.7,'a',V(-0.75,0.8,-2.0),V(-0.5,BR,-0.6),0.9],[6.7,7.8,'r',V(-0.5,BR,-0.6),VB],[7.8,T.K2,'s',VB],
 [T.K2,11.7,'a',VB,V(0.4,BR,-6.0),6.4],[11.7,12.6,'r',V(0.4,BR,-6.0),V(0.8,BR,-7.0)],[12.6,T.FETCH,'s',V(0.8,BR,-7.0)],[T.FETCH,T.DROP1,'m'],[T.DROP1,T.DROP1+0.2,'d',VB],[T.DROP1+0.2,T.K3+0.05,'s',VB],
 [T.K3+0.05,T.GOAL3+0.3,'r',VB,V(0,BR,-2.95),1],[T.GOAL3+0.3,T.PICK3,'s',V(0,BR,-2.95)],[T.PICK3,T.DROP3,'m'],[T.DROP3,T.DROP3+0.2,'d',VB],[T.DROP3+0.2,T.K4,'s',VB],
 [T.K4,T.CATCH4,'c'],[T.CATCH4,T.DROP4,'m'],[T.DROP4,T.DROP4+0.2,'d',VB],[T.DROP4+0.2,T.K5,'s',VB],[T.K5,T.GOAL5,'a',VB,V(-0.85,0.4,-2.75),1.0],[T.GOAL5,40.5,'r',V(-0.85,0.4,-2.75),V(-0.95,BR,-3.2)],[40.5,END+2,'s',V(-0.95,BR,-3.2)]];
var lastP=null;
function EXTRAfn(t){var sg=SEG[0];for(var i=0;i<SEG.length;i++)if(t>=SEG[i][0])sg=SEG[i];var u=clamp((t-sg[0])/(sg[1]-sg[0]),0,1),p;
 if(sg[2]==='s')p=sg[3].clone();
 else if(sg[2]==='a')p=bz(sg[3],sg[4],u,sg[5]);
 else if(sg[2]==='r'){var k=sg[5]?u*(2-u)*0.6+u*0.4:u*(2-u);p=sg[3].clone().lerp(sg[4],k);}
 else if(sg[2]==='m')p=noseW();
 else if(sg[2]==='d'){var a=at('d'+sg[0],sg[0],noseW,t);p=a.lerp(sg[3],ez(u));}
 else if(sg[2]==='c'){var b=at('c4',T.CATCH4,noseW,t);p=bz(VB,b,u,0.4);}
 BALL.position.copy(p);var spin=(sg[2]==='a'||sg[2]==='r')?1:0;if(spin){var d=sg[4].clone().sub(sg[3]);BALL.rotation.set(-t*8*Math.sign(d.z||1),0,t*3*Math.sign(d.x));}}
EXTRA=EXTRAfn;
BURST=[[T.GOAL3+0.2,[0,-2.4],0.8],[T.GOAL5+0.1,[-0.7,-2.4],0.8],[T.ROW,[0,0.8]],[T.ROW+2.4,[0,0.8]]];
BW=[['Pipoca no gol!',T.ARR,T.ARR+1.4,kp('teo',2.6,-0.5),1],['Que defesa!',6.5,7.9,kp('bia',2.6,-0.4),1],['Foi longe!',11.8,13.2,kp('bia',2.6),1],['Bom garoto!',16.8,18.2,kp('teo',2.6,-0.5),1],
 ['Furei!',T.K3+0.5,21.8,kp('teo',2.0),1],['Foi gol?!',T.GOAL3+0.2,26.6,kp('duda',2.6,-0.5),1],['GOOOL!',26.7,28.1,kp('teo',2.7),1],['Que goleiro!',33.1,34.6,kp('leo',2.6,1.1),1],
 ['Agora o Pipoca chuta!',34.9,36.4,kp('duda',2.6,-0.6),1],['GOL do Pipoca!',T.GOAL5+0.1,41.6,kp('bia',2.6,0.4),1],['Pipoca, craque do quintal!',51.4,55.0,function(){return [0,2.6,1.2];},1]];
var GP=[[-GW,GZ],[GW,GZ],[0,GZ-0.9]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||48,m||0.08,GP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(35,15,ez(lin(t,0,3.2))),lerp(40,26,ez(lin(t,0,3.2))),50,0.1,GP);}],
 [T.ARR,5.2,A_(8,28)],
 [5.2,8.2,A_(22,22,46)],
 [8.2,10.6,A_(0,28)],
 [10.6,14.6,A_(10,32,50)],
 [14.6,17.0,A_(-8,28)],
 [17.0,19.8,A_(8,28)],
 [19.8,25.8,A_(-20,24,46)],
 [25.8,28.4,A_(0,26)],
 [28.4,32.0,A_(10,28)],
 [32.0,35.0,A_(24,22,46)],
 [35.0,38.4,A_(0,28)],
 [38.4,T.MOVE,A_(-25,22,46)],
 [T.MOVE,T.ROW,function(t){return mixCam(frameOn(ALL,-25,22,46,0.08,GP),frameLow(ALL,0,16,50,0.06),ez(lin(t,T.MOVE,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[[T.K1,'kick'],[T.K1+0.5,'boing'],[T.K2,'kick'],[11.7,'thud'],[T.DROP1,'drop'],[T.K3,'whiff'],[T.K3+0.5,'fall'],[22.0,'lick'],[T.GOAL3,'goal'],[T.K4,'kick'],[T.CATCH4,'catch'],[T.K5,'head'],[T.GOAL5,'goal'],[T.ROW,'confetti']];
[T.K1,T.K2,T.K3,T.K4,T.K5].forEach(function(k){EV.push([k-1.4,'whistle']);});
