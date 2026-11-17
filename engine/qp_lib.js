// ===== qp_lib.js: biblioteca comum (clipes, poses das crianças e do Pipoca, confete, balões, câmera) =====
// Ordem na página: X_head.js + common_faces.js + qp_lib.js + X_spec.js + common_frameon.js + qp_tail.js
function ext(s,o,t,u){if(o){var e=(typeof o==='function')?o(t,u):o;if(e)for(var k in e)s[k]=e[k];}return s;}
function hold(t0,t1,p,yaw,pose,o){return {t0:t0,t1:t1,f:function(t,u){return ext({p:p,yaw:yaw,pose:pose},o,t,u);}};}
function mv(t0,t1,pts,pose,o){var cum=[0];for(var i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));var L=cum[cum.length-1];
 function at(u){var d=clamp(u,0,1)*L;for(var i=1;i<pts.length;i++){if(d<=cum[i]||i===pts.length-1){var w=(cum[i]-cum[i-1])>1e-6?clamp((d-cum[i-1])/(cum[i]-cum[i-1]),0,1):1;return L2(pts[i-1],pts[i],w);}}return pts[pts.length-1];}
 return {t0:t0,t1:t1,f:function(t,u){var e=0.82*u+0.18*ez(u);var p=at(e),a=at(e-0.04),b=at(e+0.04);return ext({p:p,yaw:Math.atan2(b[0]-a[0],b[1]-a[1]),pose:pose},o,t,u);}};}
function cust(t0,t1,fn){return {t0:t0,t1:t1,f:fn};}
function turnTo(t0,t1,p,y0,y1,pose,o){return cust(t0,t1,function(t,u){return ext({p:p,yaw:lerpAng(y0,y1,ez(u)),pose:pose||'stand'},o,t,u);});}
function clipAt(c,t){var cl=c[0];for(var i=0;i<c.length;i++){if(t>=c[i].t0)cl=c[i];else break;}var u=clamp((t-cl.t0)/Math.max(1e-6,cl.t1-cl.t0),0,1);return cl.f(Math.min(t,cl.t1),u);}
var TL={},DG=[];
function stateOf(n,t){return clipAt(TL[n],t);}
function dogState(t){return clipAt(DG,t);}
// ----- criança -----
function applyKid(k,s,t){
 var y=s.y||0,pitch=s.pitch||0,roll=s.roll||0,face=s.face||'idle',headX=0,headY=0,headZ=0,sit=s.sit||0,yaw=s.yaw;
 var lL=-sit*PI/2,lR=-sit*PI/2,aLx=0,aRx=0,aLz=0,aRz=0,eL=-0.1,eR=-0.1,bt=t*BPM/60;
 var P=s.pose;
 if(P==='run'){var ph=t*17;lL=Math.sin(ph)*0.95;lR=-lL;y+=Math.abs(Math.sin(ph))*0.14;aLx=-Math.sin(ph)*1.1;aRx=Math.sin(ph)*1.1;eL=eR=-0.7;pitch+=0.12;}
 else if(P==='walk'){var p2=t*11;lL+=Math.sin(p2)*0.55*(1-sit);lR-=Math.sin(p2)*0.55*(1-sit);y+=Math.abs(Math.sin(p2))*0.05;aLx=-Math.sin(p2)*0.6;aRx=Math.sin(p2)*0.6;eL=eR=-0.4;}
 else if(P==='stand'){y+=Math.abs(Math.sin(t*2))*0.02;aLx=aRx=-0.1;}
 else if(P==='look'){headX=-0.15;aLx=aRx=-0.3;eL=eR=-0.6;}
 else if(P==='dance'){var st=s.st||0,b=bt*PI;
  if(st===0){y+=Math.abs(Math.sin(b))*0.18;aLx=-1.4-1.2*Math.max(0,Math.sin(b));aRx=-1.4-1.2*Math.max(0,-Math.sin(b));eL=eR=-0.5;lL=-0.25*Math.max(0,Math.sin(b));lR=-0.25*Math.max(0,-Math.sin(b));}
  if(st===1){yaw+=0.45*Math.sin(b);roll+=0.08*Math.sin(b);aLx=aRx=-0.9;aLz=0.4*Math.sin(b);aRz=0.4*Math.sin(b);eL=eR=-1.2;y+=Math.abs(Math.sin(b))*0.08;lL=0.25*Math.sin(b);lR=-0.25*Math.sin(b);}
  if(st===2){var hp=Math.abs(Math.sin(b));y+=hp*0.3;var c=Math.max(0,Math.cos(2*b));aLx=aRx=lerp(-1.2,-2.7,c);aLz=lerp(0.1,0.35,c);aRz=-aLz;eL=eR=-0.2;lL=lR=-0.3*hp;}
  if(st===3){roll+=0.12*Math.sin(b);aLx=aRx=-2.8;aLz=-0.3+0.5*Math.sin(b);aRz=0.3+0.5*Math.sin(b);eL=eR=-0.2;y+=Math.abs(Math.sin(b))*0.1;headZ=0.15*Math.sin(b);}}
 else if(P==='wave'){var b2=s.b||bt;aRx=-2.8;aRz=0.25+0.45*Math.sin(t*11);eR=-0.3;aLx=-2.0+0.6*Math.sin(PI*b2);aLz=-0.5;eL=-0.4;roll+=0.05*Math.sin(PI*b2);y+=0.2*Math.abs(Math.sin(PI*b2));}
 else if(P==='cheer'){aLx=aRx=-2.9;aLz=-0.3;aRz=0.3;y+=Math.abs(Math.sin(t*9))*0.18;eL=eR=-0.1;}
 else if(P==='laugh'){y+=Math.abs(Math.sin(t*13))*0.05;aLx=aRx=-1.0;eL=eR=-1.1;roll+=Math.sin(t*13)*0.04;pitch+=0.12;}
 else if(P==='clap'){var cc=Math.abs(Math.sin(t*9));aLx=aRx=-1.3;aLz=lerp(-0.2,0.32,cc);aRz=-aLz;eL=eR=-0.6;y+=0.04*cc;}
 else if(P==='hold'){aLx=aRx=-1.25;aLz=0.32;aRz=-0.32;eL=eR=-0.45;headX=0.12;}
 else if(P==='sitg'){y=GROUND_Y+(s.y||0);sit=1;lL=lR=-PI/2;aLx=aRx=-0.4;eL=eR=-0.5;}
 if(s.A){var A=s.A;if(A.aLx!=null)aLx=A.aLx;if(A.aRx!=null)aRx=A.aRx;if(A.aLz!=null)aLz=A.aLz;if(A.aRz!=null)aRz=A.aRz;if(A.eL!=null)eL=A.eL;if(A.eR!=null)eR=A.eR;
  if(A.lL!=null)lL=A.lL;if(A.lR!=null)lR=A.lR;if(A.hx!=null)headX=A.hx;if(A.hy!=null)headY=A.hy;if(A.hz!=null)headZ=A.hz;}
 k.root.position.set(s.p[0],y,s.p[1]);k.root.rotation.set(pitch,yaw,roll);
 k.legL.rotation.set(lL,0,0);k.legR.rotation.set(lR,0,0);
 k.aL.s.rotation.set(aLx,0,aLz);k.aR.s.rotation.set(aRx,0,aRz);k.aL.e.rotation.x=eL;k.aR.e.rotation.x=eR;
 k.head.rotation.set(headX,headY,headZ);setFace(k,face);}
// ----- Pipoca -----
function applyDog(t){var s=dogState(t),y=s.y||0,pitch=s.pitch||0,roll=s.roll||0,yaw=s.yaw,lp=t*26,legs=[0,0,0,0],hx=0,hy=0,hz=0,tailA=0.7,tailF=20,P=s.pose;
 if(P==='drun'){legs=[Math.sin(lp)*0.8,-Math.sin(lp)*0.8,-Math.sin(lp)*0.8,Math.sin(lp)*0.8];y+=Math.abs(Math.sin(lp*0.5))*0.12;}
 else if(P==='dwalk'||P==='sniff'){var q=t*14;legs=[Math.sin(q)*0.5,-Math.sin(q)*0.5,-Math.sin(q)*0.5,Math.sin(q)*0.5];y+=Math.abs(Math.sin(q))*0.03;if(P==='sniff'){hx=0.35+0.08*Math.sin(t*18);pitch=0.08;}}
 else if(P==='sit'){legs=[0,0,-0.9,-0.9];pitch=-0.25;y+=0.05;}
 else if(P==='paw'){legs=[-1.5*(s.pw==null?1:s.pw),0,-0.9,-0.9];pitch=-0.3;y+=0.06;hx=-0.15;}
 else if(P==='stand'){}
 else if(P==='bark'){var bq=(t*6)%1;hx=bq<0.3?-0.35:0;y+=bq<0.3?0.06:0;}
 else if(P==='party'){y+=Math.abs(Math.sin(PI*t*BPM/60))*0.35;legs=[-0.5,-0.5,0.4,0.4];}
 else if(P==='hind'){var wg=s.wig||0,lift=s.lift==null?1:s.lift;pitch=-1.25*lift;y+=0.42*lift+wg*Math.abs(Math.sin(t*10))*0.08;legs=[-0.6*lift+wg*0.5*Math.sin(t*10),-0.6*lift-wg*0.5*Math.sin(t*10),1.25*lift,1.25*lift];roll+=wg*0.18*Math.sin(t*5);hx=0.9*lift;if(s.still){roll=0;legs=[-1.0,-1.0,1.25,1.25];y=0.42;}}
 if(s.legs)legs=s.legs;if(s.hx!=null)hx=s.hx;if(s.hz!=null)hz=s.hz;if(s.tailA!=null)tailA=s.tailA;if(s.tailF!=null)tailF=s.tailF;
 dog.root.position.set(s.p[0],y,s.p[1]);dog.root.rotation.set(pitch,yaw,roll);
 dog.legs.forEach(function(l,i){l.rotation.x=legs[i];});dog.tail.rotation.y=Math.sin(t*tailF)*tailA;dog.head.rotation.set(hx,hy,hz);}
// ----- confete -----
var CONF=[],CC=[0xff6b8a,0xffd166,0x5bd6a4,0x7aa7ff,0xc39bff],BURST=[];
for(var i=0;i<120;i++){var m=box(0.12,0.12,0.12,CC[i%5]);m.visible=false;m.castShadow=false;scene.add(m);CONF.push(m);}
function particles(t){var nb=Math.max(1,BURST.length);CONF.forEach(function(m,i){var b=i%nb;if(!BURST.length){m.visible=false;return;}var ct=t-BURST[b][0];if(ct<0||ct>2.2){m.visible=false;return;}
 var bp=BURST[b][1],h0=BURST[b][2]||1.8,a=i*2.399,v=0.6+(i%5)*0.3,vy=4.2+(i%7)*0.4,s=clamp((2.2-ct)/0.4,0,1);
 m.visible=true;m.position.set(bp[0]+Math.cos(a)*v*ct,Math.max(0.1,h0+vy*ct-4.9*ct*ct),bp[1]+Math.sin(a)*v*ct);m.rotation.set(ct*3+i,ct*4,ct*5);m.scale.setScalar(Math.max(s,0.001));});
 CLOTHES.forEach(function(c,i){c.rotation.z=Math.sin(t*1.6+i*0.9)*0.22;});}
// ----- balões de fala -----
var camPosV=new THREE.Vector3();
function kp(n,dy,dx,dz){return function(){var p=KIDS[n].root.position;return [p.x+(dx||0),p.y+dy,p.z+(dz||0)];};}
function dp(dy,dx){return function(){var p=dog.root.position;return [p.x+(dx||0),p.y+dy,p.z];};}
var BW=[];
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*(w[4]||1);
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));m.position.set(p[0],p[1]+0.45*k,p[2]);m.quaternion.copy(camera.quaternion);}});}
function makeBubs(list){Object.keys(BUBS).forEach(function(k){scene.remove(BUBS[k]);});BUBS={};
 list.forEach(function(b){var m=new THREE.Mesh(new THREE.PlaneGeometry(1.8,0.9),new THREE.MeshBasicMaterial({map:bubTex(b[0],fitSize(b[0],b[1]||90)),transparent:true,depthTest:false}));m.renderOrder=10;m.visible=false;scene.add(m);BUBS[b[0]]=m;});}
var ALL=['leo','bia','teo','duda','dog'];
// plano com o topo livre (para o card de "Siga o canal"): personagens ocupam a parte de baixo da tela
function frameLow(names,a,e,fov,m,extra,free){free=free||0.36;var c=frameOn(names,a,e,fov,m,extra);
 // pontos dos personagens (pés e topo da cabeça)
 var pts=[];names.forEach(function(n){var p=pos2(n);pts.push(V(p.x,0,p.z),V(p.x,n==='dog'?1.15:2.9,p.z));});
 var P=V(c.pos[0],c.pos[1],c.pos[2]),Lk=V(c.look[0],c.look[1],c.look[2]);
 for(var it=0;it<30;it++){_cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(P);_cam.lookAt(Lk);_cam.updateMatrixWorld();
  var lo=1e9,hi=-1e9;pts.forEach(function(q){var v=q.clone().project(_cam);lo=Math.min(lo,v.y);hi=Math.max(hi,v.y);});
  var D=P.distanceTo(Lk),tv=Math.tan(fov*PI/360),topLim=1-2*free;
  if(hi>topLim&&lo<-0.85){var d=P.clone().sub(Lk).normalize();P.addScaledVector(d,D*0.06);continue;}
  var dy=(lo-(-0.9))*D*tv*0.9;if(Math.abs(dy)<0.005&&hi<=topLim)break;P.y+=dy;Lk.y+=dy;}
 return {pos:[P.x,P.y,P.z],look:[Lk.x,Lk.y,Lk.z],fov:fov};}
function fitSize(txt,size){var c=document.createElement('canvas').getContext('2d');for(var z=size;z>20;z-=2){c.font='800 '+z+'px system-ui, sans-serif';if(c.measureText(txt).width<=405)return z;}return 20;}
function mixCam(a,b,u){return {pos:[lerp(a.pos[0],b.pos[0],u),lerp(a.pos[1],b.pos[1],u),lerp(a.pos[2],b.pos[2],u)],look:[lerp(a.look[0],b.look[0],u),lerp(a.look[1],b.look[1],u),lerp(a.look[2],b.look[2],u)],fov:lerp(a.fov,b.fov,u)};}
var SH=[];var EXTRA=function(t){};var EV=[];
