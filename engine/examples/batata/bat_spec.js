FT.blow=(function(){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d');x.lineCap='round';x.strokeStyle='#222';x.fillStyle='#222';x.lineWidth=10;
 x.beginPath();x.arc(88,104,15,Math.PI*1.1,Math.PI*1.9);x.stroke();x.beginPath();x.arc(168,104,15,Math.PI*1.1,Math.PI*1.9);x.stroke();
 x.fillStyle='rgba(255,110,110,0.75)';x.beginPath();x.ellipse(60,150,22,16,0,0,6.3);x.fill();x.beginPath();x.ellipse(196,150,22,16,0,0,6.3);x.fill();
 x.fillStyle='#222';x.beginPath();x.ellipse(128,162,13,15,0,0,6.3);x.fill();x.fillStyle='#ff6f91';x.beginPath();x.ellipse(128,165,6,7,0,0,6.3);x.fill();
 var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;})();

// ===== Batata quente =====
makeBubs([['Batata quente!',80],['QUEIMOU!',96],['Ai, ai, ai!',84],['Ah, não!',96],['O Pipoca pegou!',60],['Pipoca campeão!',60],['Quem quer batata?',56]]);
radio.visible=false;var CEN=[0,1.2],RAD=1.8;
function seatP(a){a=a*PI/180;return [RAD*Math.sin(a),CEN[1]-RAD*Math.cos(a)];}
var SEAT={teo:seatP(-66),leo:seatP(-22),bia:seatP(22),duda:seatP(66)},DOGP=[0,2.45];
var OUT={teo:[-2.3,1.6],leo:[-2.2,0.35]};
var FIN={teo:[-1.56,0.6],leo:[-0.52,0.6],bia:[0.52,0.6],duda:[1.56,0.6]},DFIN=[0,1.65];
var T={SIT:3.2,R1:5.2,Q1:12.6,R2:16.0,BONK:21.0,Q2:21.9,R3:25.6,Q3:34.0,CATCH:35.4,CH0:36.9,CH1:44.0,ROW:45.6,END:60};
var END=T.END;
// ----- agenda da batata -----
var PS=[];// {k:'hold',n,t0,t1} | {k:'fly',a,b,t0,t1,h}
var PASSES=[];
(function(){var o=['leo','bia','duda','teo'];
 // rodada 1: 9 passes, termina no Teo
 var h='duda',t0=0,i;PS.push({k:'hold',n:'duda',t0:0,t1:T.R1});
 var seq=[];for(i=0;i<9;i++){var nx=o[(o.indexOf(h)+1)%4];seq.push([T.R1+i*0.82,h,nx,0.42]);h=nx;}
 seq.push([14.5,'teo','leo',0.5]);
 var o2=['leo','bia','duda'];h='leo';for(i=0;i<5;i++){var nx2=o2[(o2.indexOf(h)+1)%3];seq.push([T.R2+i*0.8,h,nx2,0.38]);h=nx2;}
 // rodada 3: Bia x Duda acelerando
 seq.push([23.1,'leo','bia',0.42]);
 var tt=T.R3,iv=0.62;h='bia';var r3=[];while(tt<33.3){var nx3=h==='bia'?'duda':'bia';r3.push([tt,h,nx3,Math.max(0.2,iv*0.55)]);h=nx3;tt+=iv;iv=Math.max(0.3,iv*0.955);}
 if(h!=='duda'){r3.pop();}
 seq=seq.concat(r3);
 var cur='duda',last=0;
 seq.forEach(function(s){PS.push({k:'hold',n:s[1],t0:last,t1:s[0]});PS.push({k:'fly',a:s[1],b:s[2],t0:s[0],t1:s[0]+s[3],h:0.35+s[3]*0.8});last=s[0]+s[3];cur=s[2];PASSES.push(s);});
 // bonk na cabeça do Léo (antes, Duda segura)
 PS=PS.filter(function(p){return !(p.k==='hold'&&p.t0>=last-0.01);});
})();
// segmentos especiais da rodada 2: Duda segura -> joga alto -> cabeça do Léo -> colo
(function(){var r2end=PS.filter(function(p){return p.k==='fly'&&p.t0<T.R3&&p.t0>T.R2;});var lf=r2end[r2end.length-1];
 // remove o que vier depois do último passe da rodada 2 e reinsere
 var after=PS.filter(function(p){return p.t0>=lf.t1-0.001;});PS=PS.filter(function(p){return p.t0<lf.t1-0.001;});
 PS.push({k:'hold',n:'duda',t0:lf.t1,t1:20.4},{k:'bonk',t0:20.4,t1:21.0},{k:'drop',t0:21.0,t1:21.4},{k:'hold',n:'leo',t0:21.4,t1:23.1});
 after.forEach(function(p){if(p.t0>=23.0)PS.push(p);});
 PS.sort(function(a,b){return a.t0-b.t0;});
 // fecha os 'hold' com o próximo voo
 for(var i=0;i<PS.length-1;i++){if(PS[i].k==='hold')PS[i].t1=PS[i+1].t0;}
 var lp=PS[PS.length-1];// último voo chega na Duda
 PS.push({k:'hold',n:'duda',t0:lp.t1,t1:33.75},{k:'up',t0:33.75,t1:T.CATCH},{k:'mouth',t0:T.CATCH,t1:T.ROW+0.2},{k:'ground',t0:T.ROW+0.2,t1:48.4},{k:'mouth',t0:48.4,t1:END+2});})();
function seg(t){for(var i=PS.length-1;i>=0;i--)if(t>=PS[i].t0)return PS[i];return PS[0];}
function holderAt(t){var s=seg(t);return s.k==='hold'?s.n:null;}
function heat(t){if(t<T.R1)return 0.1;if(t<T.Q1+0.5)return lin(t,T.R1,T.Q1);if(t<T.R2)return lin(t,T.Q1+0.5,T.R2)*0.0+0.6*(1-lin(t,T.Q1+0.5,T.R2));if(t<T.Q2+0.5)return lin(t,T.R2,T.Q2);if(t<T.R3)return 0.5*(1-lin(t,T.Q2+0.5,T.R3));if(t<T.CATCH)return lin(t,T.R3,T.Q3);return 1-lin(t,T.CATCH,T.ROW+2);}
// ----- crianças sentadas -----
function seatYaw(n){return yawTo(SEAT[n],CEN);}
function seated(n,t0,t1){return cust(t0,t1,function(t){var s=seg(t),h=heat(t);var A={aLx:-0.35,aRx:-0.35,eL:-0.6,eR:-0.6,aLz:0.15,aRz:-0.15},face='happy',y=0;
 if(s.k==='hold'&&s.n===n){A={aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45};face=h>0.6?'wow':'focus';y=0.03*Math.abs(Math.sin(t*20))*h;}
 else{var nx=seg(t+0.25);if(nx.k==='hold'&&nx.n===n){A={aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45};face='focus';}
  var pv=seg(t-0.22);if(s.k==='fly'&&s.a===n&&t-s.t0<0.22){var q=(t-s.t0)/0.22;A={aLx:lerp(-1.25,-2.3,Math.sin(q*PI)),aRx:lerp(-1.25,-2.3,Math.sin(q*PI)),aLz:0.3,aRz:-0.3,eL:-0.2,eR:-0.2};face='tongue';}}
 return {p:SEAT[n],yaw:seatYaw(n),pose:'sitg',A:A,face:face,y:y};});}
function sitDown(n,t0,t1){return cust(t0,t1,function(t,u){return {p:SEAT[n],yaw:seatYaw(n),pose:'none',y:lerp(0,GROUND_Y,S(u,0,1)),sit:S(u,0,1),face:'happy'};});}
function standUp(n,t0,t1,face){return cust(t0,t1,function(t,u){return {p:SEAT[n],yaw:seatYaw(n),pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.7)),sit:1-S(u,0,0.7),face:face||'happy'};});}
// ----- pega-pega (elipse) -----
var EC=[0,0.9],ERX=2.3,ERZ=1.7,OM=2*PI*1.15/(T.CH1-T.CH0);
function ell(ph){return [EC[0]+ERX*Math.sin(ph),EC[1]+ERZ*Math.cos(ph)];}
function phD(t){return OM*(t-T.CH0);}
function nearPh(p){return Math.atan2((p[0]-EC[0])/ERX,(p[1]-EC[1])/ERZ);}
function chase(n,from,tj){var ph0=nearPh(from),lag=((phD(tj)-ph0)%(2*PI)+2*PI)%(2*PI);var ent=ell(ph0);
 return [mv(tj-0.7,tj,[from,ent],'run',{face:'happy'}),cust(tj,T.CH1,function(t){var ph=phD(t)-lag,p=ell(ph),q=ell(ph+0.05);return {p:p,yaw:yawTo(p,q),pose:'run',face:(Math.floor(t*2)%2)?'tongue':'happy'};}),
  cust(T.CH1,T.ROW,function(t,u){var p0=ell(phD(T.CH1)-lag);var p=L2(p0,FIN[n],ez(u));return {p:p,yaw:yawTo(p0,FIN[n]),pose:'run',face:'happy'};}),turnTo(T.ROW,T.ROW+0.3,FIN[n],yawTo(ell(phD(T.CH1)-lag),FIN[n]),0,'stand')];}
(function(){var fr={teo:OUT.teo,leo:OUT.leo,bia:SEAT.bia,duda:SEAT.duda},TJ=T.CH0+0.4,xs=[];
 Object.keys(fr).forEach(function(n){var lag=((phD(TJ)-nearPh(fr[n]))%(2*PI)+2*PI)%(2*PI);xs.push([ell(phD(T.CH1)-lag)[0],n]);});
 xs.sort(function(a,b){return a[0]-b[0];});var slots=[-1.56,-0.52,0.52,1.56];xs.forEach(function(e,i){FIN[e[1]]=[slots[i],0.6];});})();
// ----- linhas do tempo -----
(function(){var st={teo:[-5,-3],leo:[-2,-6],bia:[2,-6],duda:[5,-3]};
 Object.keys(KIDS).forEach(function(n){var p=SEAT[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.6,[st[n],p],'run',{face:'happy'}),turnTo(2.6,2.9,p,yawTo(st[n],p),seatYaw(n),'stand',{face:'happy'}),sitDown(n,2.9,T.SIT)];});
 var TJ=T.CH0+0.4;
 // TEO
 TL.teo=TL.teo.concat([seated('teo',T.SIT,T.Q1+0.15),standUp('teo',T.Q1+0.15,T.Q1+0.55,'wow'),
  cust(T.Q1+0.55,14.4,function(t){return {p:SEAT.teo,yaw:seatYaw('teo'),pose:'none',y:hopAt((t-T.Q1-0.55)%0.45,0,0.45,0.25),A:{aLx:-1.6+0.5*Math.sin(t*22),aRx:-1.6-0.5*Math.sin(t*22),eL:-1.8,eR:-1.8,aLz:0.5,aRz:-0.5},face:'blow',lL:0};}),
  cust(14.4,14.9,function(t){var q=(t-14.4)/0.25;return {p:SEAT.teo,yaw:seatYaw('teo')+0.6,pose:'none',A:{aLx:lerp(-1.25,-2.0,Math.sin(clamp(q,0,1)*PI)),aRx:lerp(-1.25,-2.0,Math.sin(clamp(q,0,1)*PI)),aLz:0.3,aRz:-0.3},face:'happy'};}),
  mv(14.9,16.0,[SEAT.teo,[-1.9,1.2],OUT.teo],'walk',{face:'happy'}),turnTo(16.0,16.3,OUT.teo,yawTo([-1.9,1.2],OUT.teo),1.0,'stand'),
  hold(16.3,T.Q2,OUT.teo,1.0,'clap',{face:'happy'}),hold(T.Q2,24.0,OUT.teo,1.0,'laugh',{face:'tongue'}),hold(24.0,T.Q3,OUT.teo,1.0,'clap',{face:'happy'}),hold(T.Q3,T.CATCH,OUT.teo,1.0,'look',{face:'wow'}),hold(T.CATCH,TJ-0.7,OUT.teo,1.0,'cheer',{face:'happy'})].concat(chase('teo',OUT.teo,TJ)));
 // LÉO
 TL.leo=TL.leo.concat([seated('leo',T.SIT,T.BONK),cust(T.BONK,21.4,function(t,u){return {p:SEAT.leo,yaw:seatYaw('leo'),pose:'sitg',face:'wow',A:{aLx:-0.6,aRx:-0.6,eL:-0.4,eR:-0.4},y:0.08*Math.sin(u*PI)};}),
  seated('leo',21.4,T.Q2+0.1),cust(T.Q2+0.1,23.1,function(t){return {p:SEAT.leo,yaw:seatYaw('leo'),pose:'sitg',face:'wow',A:{aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45},roll:0.08*Math.sin(t*8)};}),seated('leo',23.1,23.6),standUp('leo',23.6,24.1),
  mv(24.1,25.4,[SEAT.leo,[-1.2,-0.6],OUT.leo],'walk',{face:'happy'}),turnTo(25.4,25.7,OUT.leo,yawTo([-1.2,-0.6],OUT.leo),1.3,'stand'),
  hold(25.7,T.Q3,OUT.leo,1.3,'clap',{face:'happy'}),hold(T.Q3,T.CATCH,OUT.leo,1.3,'look',{face:'wow'}),hold(T.CATCH,TJ-0.7,OUT.leo,1.3,'cheer',{face:'happy'})].concat(chase('leo',OUT.leo,TJ)));
 // BIA e DUDA
 ['bia','duda'].forEach(function(n){TL[n]=TL[n].concat([seated(n,T.SIT,T.Q3),
  cust(T.Q3,T.CATCH,function(t,u){var s={p:SEAT[n],yaw:seatYaw(n),pose:'sitg',face:'wow',A:{aLx:-2.6,aRx:-2.6,aLz:-0.3,aRz:0.3,eL:-0.2,eR:-0.2,hx:-0.4}};return s;}),
  cust(T.CATCH,TJ-0.7,function(t,u){return {p:SEAT[n],yaw:seatYaw(n),pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.6)),sit:1-S(u,0,0.6),face:'happy'};})].concat(chase(n,SEAT[n],TJ)));});
 // Duda: joga pra cima no susto
 TL.duda.splice(TL.duda.length-6,0,cust(33.75,T.Q3,function(t,u){return {p:SEAT.duda,yaw:seatYaw('duda'),pose:'sitg',face:'wow',A:{aLx:lerp(-1.25,-2.9,u),aRx:lerp(-1.25,-2.9,u),aLz:0.2,aRz:-0.2,eL:0,eR:0}};}));
 TL.duda.sort(function(a,b){return a.t0-b.t0;});
 Object.keys(KIDS).forEach(function(n){TL[n].push(hold(T.ROW+0.3,48.6,FIN[n],0,'cheer',{face:'happy'}));TL[n].push(hold(48.6,55.5,FIN[n],0,'dance',function(t){var b=t*BPM/60;return {st:{leo:0,bia:3,teo:2,duda:1}[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}));
  TL[n].push(cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='teo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var BARK=[];(function(){for(var t=T.R1;t<T.Q1-0.2;t+=0.52)BARK.push(t);for(var t2=T.R2;t2<T.Q2-0.2;t2+=0.45)BARK.push(t2);for(var t3=T.R3;t3<T.Q3-0.2;t3+=0.38)BARK.push(t3);})();
function coverS(t){var b=0;BARK.forEach(function(x){var q=t-x;if(q>=0&&q<0.18)b=Math.sin(q/0.18*PI);});return {p:DOGP,yaw:0,pose:'sit',hx:0.45-0.25*b,legs:[-1.75,-1.75,-0.9,-0.9],pitch:-0.3};}
function queimou(t0,t1){return cust(t0,t1,function(t,u){return {p:DOGP,yaw:0,pose:'bark',y:0.08};});}
DG=[hold(0,0.2,[-4,5],yawTo([-4,5],DOGP),'stand'),mv(0.2,2.6,[[-4,5],[-1.5,3.6],DOGP],'drun'),turnTo(2.6,3.0,DOGP,yawTo([-1.5,3.6],DOGP),0,'sit'),hold(3.0,4.7,DOGP,0,'sit'),
 cust(4.7,T.Q1,function(t){return coverS(t);}),queimou(T.Q1,T.Q1+1.4),hold(T.Q1+1.4,T.R2-0.4,DOGP,PI,'party'),turnTo(T.R2-0.4,T.R2,DOGP,PI,0,'sit'),
 cust(T.R2,T.Q2,function(t){return coverS(t);}),queimou(T.Q2,T.Q2+1.2),hold(T.Q2+1.2,24.8,DOGP,0,'sit'),cust(24.8,T.Q3,function(t){return coverS(t);}),
 queimou(T.Q3,34.6),cust(34.6,T.CATCH+0.5,function(t,u){var q=t-34.6;var lift=S(q,0,0.4);var jy=hopAt(t,34.95,0.9,0.75);return {p:DOGP,yaw:PI,pose:'hind',lift:lift,y:jy};}),
 cust(T.CATCH+0.5,T.CH0,function(t,u){return {p:DOGP,yaw:PI,pose:'hind',lift:1-u};}),
 cust(T.CH0,T.CH1,function(t){var ph=phD(t)+0.0;var p0=ell(0);var p=ell(ph),q=ell(ph+0.05);if(t<T.CH0+0.4){var u=(t-T.CH0)/0.4;p=L2(DOGP,ell(phD(T.CH0+0.4)),u);}return {p:p,yaw:yawTo(p,q),pose:'drun'};}),
 cust(T.CH1,T.ROW,function(t,u){var p0=ell(phD(T.CH1));return {p:L2(p0,DFIN,ez(u)),yaw:yawTo(p0,DFIN),pose:'drun'};}),turnTo(T.ROW,T.ROW+0.2,DFIN,0,0,'sit'),hold(T.ROW+0.2,48.0,DFIN,0,'sit'),
 cust(48.0,48.6,function(t,u){return {p:DFIN,yaw:0,pose:'stand',hx:0.6*Math.sin(u*PI)};}),hold(48.6,END+2,DFIN,0,'party')];
// ----- batata e fumacinha -----
var POT=new THREE.Group();scene.add(POT);var POTM=mat(0xb07a3c);POTM.emissive=new THREE.Color(0xff3a10);POTM.emissiveIntensity=0;
(function(){[[0,0,0,0.34,0.24,0.26],[0.1,0.05,0.02,0.2,0.2,0.22],[-0.11,-0.02,-0.03,0.18,0.18,0.2]].forEach(function(b){var m=new THREE.Mesh(new THREE.BoxGeometry(b[3],b[4],b[5]),POTM);m.position.set(b[0],b[1],b[2]);m.castShadow=true;POT.add(m);});
 [[0.08,0.12,0.11],[-0.07,0.1,-0.08],[0.12,-0.05,0.13]].forEach(function(e){var d=box(0.04,0.04,0.04,0x6b4220);d.position.set(e[0],e[1],e[2]);POT.add(d);});})();
var STEAM=[];for(var i=0;i<14;i++){var sm=new THREE.Mesh(new THREE.SphereGeometry(0.06,8,6),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.7,depthWrite:false}));sm.visible=false;scene.add(sm);STEAM.push(sm);}
var _h1=new THREE.Vector3(),_h2=new THREE.Vector3(),HC={};
function handMidNow(n){KIDS[n].aL.e.children[1].getWorldPosition(_h1);KIDS[n].aR.e.children[1].getWorldPosition(_h2);return _h1.clone().add(_h2).multiplyScalar(0.5).add(V(0,0.06,0));}
function handMidAt(n,tq,tnow){var key=n+tq.toFixed(3);if(HC[key])return HC[key].clone();applyKid(KIDS[n],stateOf(n,tq),tq);KIDS[n].root.updateMatrixWorld(true);var h=handMidNow(n);HC[key]=h.clone();applyKid(KIDS[n],stateOf(n,tnow),tnow);KIDS[n].root.updateMatrixWorld(true);return h;}
function mouthNow(){return dog.head.localToWorld(V(0,-0.1,0.42));}
var MC={};
function mouthAt(tq,tnow){var key='m'+tq.toFixed(3);if(MC[key])return MC[key].clone();var keep=window._t;applyDogAt(tq);var m=mouthNow();MC[key]=m.clone();applyDogAt(tnow);return m;}
function applyDogAt(tt){applyDog(tt);dog.root.updateMatrixWorld(true);}
function bez3(a,b,c,u){var v=1-u;return a.clone().multiplyScalar(v*v).add(b.clone().multiplyScalar(2*v*u)).add(c.clone().multiplyScalar(u*u));}
function potPos(t){var s=seg(t);
 if(s.k==='hold')return handMidNow(s.n);
 if(s.k==='fly'){var a=handMidAt(s.a,s.t0,t),b=handMidAt(s.b,s.t1,t),u=(t-s.t0)/(s.t1-s.t0);var m=a.clone().lerp(b,0.5);m.y+=s.h*2;return bez3(a,m,b,u);}
 if(s.k==='bonk'){var a2=handMidAt('duda',s.t0,t),hd=KIDS.leo.root.position.clone();hd.y=GROUND_Y+2.25;var m2=a2.clone().lerp(hd,0.5);m2.y+=2.2;return bez3(a2,m2,hd,(t-s.t0)/(s.t1-s.t0));}
 if(s.k==='drop'){var hd2=KIDS.leo.root.position.clone();hd2.y=GROUND_Y+2.25;var b2=handMidAt('leo',s.t1,t),u2=(t-s.t0)/(s.t1-s.t0);var m3=hd2.clone().lerp(b2,0.5);m3.y+=0.5;m3.x+=0.15;return bez3(hd2,m3,b2,u2);}
 if(s.k==='up'){var a3=handMidAt('duda',s.t0,t),b3=mouthAt(s.t1,t),u3=(t-s.t0)/(s.t1-s.t0);var m4=a3.clone().lerp(b3,0.4);m4.y+=4.2;return bez3(a3,m4,b3,u3);}
 if(s.k==='mouth')return mouthNow();
 if(s.k==='ground')return V(DFIN[0],0.14,DFIN[1]+0.62);
 return V(0,-5,0);}
function EXTRAfn(t){var p=potPos(t);POT.position.copy(p);var s=seg(t);POT.rotation.set(s.k==='hold'||s.k==='mouth'||s.k==='ground'?0:t*9,t*(s.k==='fly'||s.k==='up'?6:0.5),0);
 POT.scale.setScalar(1.0);var h=clamp(heat(t),0,1);POTM.emissiveIntensity=0.55*h;POTM.color.copy(col(0xb07a3c)).lerp(col(0xe8552b),h*0.7);
 STEAM.forEach(function(m,i){var ph=((t*0.9+i/14)%1);if(h<0.15){m.visible=false;return;}m.visible=true;m.position.set(p.x+0.12*Math.sin(i*2.1+ph*4),p.y+0.15+ph*0.9,p.z+0.12*Math.cos(i*1.3+ph*3));m.scale.setScalar((0.5+ph*1.4)*(0.3+h));m.material.opacity=0.65*(1-ph)*h;});}
EXTRA=EXTRAfn;
BURST=[[T.CATCH,[0,2.45],1.2],[T.ROW+0.2,[0,0.8]],[T.ROW+2.6,[0,0.8]]];
BW=[['Batata quente!',3.3,4.7,kp('duda',2.2,-0.4),1],['QUEIMOU!',T.Q1,T.Q1+1.3,dp(1.25),0.9],['Ai, ai, ai!',T.Q1+0.5,T.Q1+1.9,kp('teo',2.6,0.8),1],['QUEIMOU!',T.Q2,T.Q2+1.0,dp(1.25),0.9],['Ah, não!',T.Q2+1.05,24.2,kp('leo',2.0,0.2),1],
 ['QUEIMOU!',T.Q3,T.Q3+1.0,dp(1.25),0.9],['O Pipoca pegou!',T.CATCH+0.3,T.CATCH+1.6,kp('teo',2.6,0.4),1],['Pipoca campeão!',46.4,47.9,kp('duda',2.6,-0.3),1],['Quem quer batata?',51.6,55.0,function(){return [0,2.6,0.6];},1]];
var EXT=[[-2.3,0.9],[2.3,0.9],[0,-0.8],[0,2.6]];
SH=[[0,T.SIT,function(t){return frameOn(ALL,lerp(-20,0,ez(lin(t,0,3))),lerp(45,32,ez(lin(t,0,3))),50,0.1);}],
 [T.SIT,T.R1,function(){return frameOn(ALL,0,32,48,0.08);}],
 [T.R1,T.Q1,function(t){return frameOn(ALL,lerp(-12,12,ez(lin(t,T.R1,T.Q1))),34,48,0.08);}],
 [T.Q1,T.R2,function(){return frameOn(ALL,-10,26,46,0.1);}],
 [T.R2,T.BONK-0.6,function(t){return frameOn(ALL,lerp(12,-8,ez(lin(t,T.R2,T.BONK))),32,48,0.08);}],
 [T.BONK-0.6,24.2,function(){return frameOn(ALL,-12,22,46,0.08);}],
 [24.2,T.Q3,function(t){return frameOn(ALL,lerp(-10,15,ez(lin(t,24.2,T.Q3))),30,48,0.08);}],
 [T.Q3,T.CH0,function(){return frameOn(ALL,0,16,48,0.1,[[0,2.45]]);}],
 [T.CH0,T.CH1,function(){return frameOn(ALL,0,42,50,0.06,EXT);}],
 [T.CH1,T.ROW+0.3,function(t){return mixCam(frameOn(ALL,0,42,50,0.06,EXT),frameLow(ALL,0,16,50,0.06),ez(lin(t,T.CH1,T.ROW+0.3)));}],
 [T.ROW+0.3,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[];PASSES.forEach(function(p){EV.push([p[0],'toss'],[p[0]+p[3],'catch']);});BARK.forEach(function(b){EV.push([b,'bark']);});
EV.push([T.Q1,'queimou'],[T.Q2,'queimou'],[T.Q3,'queimou'],[20.4,'toss'],[T.BONK,'bonk'],[21.4,'catch'],[33.75,'toss'],[T.CATCH,'gulp'],[T.ROW+0.2,'confetti'],[T.Q1+0.5,'ai'],[T.Q2+1.05,'ah']);
