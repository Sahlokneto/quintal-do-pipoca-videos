// ===== Ovo na colher =====
makeBubs([['Cuidado com o ovo!',60],['3',110],['2',110],['1',110],['Já!',110],['Ihhh!',100],['Ufa!',110],['Uau!',110],['O Pipoca ganhou!',56],['Piu!',110],['Um pintinho!',70],['Bem-vindo, pintinho!',48]]);
radio.visible=false;
var Z0=-3.5,ZF=3.0,LX={teo:-1.5,leo:-0.5,bia:0.5,duda:1.5},DX=2.5;
var T={GO:6.6,TFLY:9.6,SPLAT:10.1,LW0:13.5,LW1:16.0,TRIP:23.6,CATCH:24.4,WIN:28.6,HATCH:36.0,HOP1:39.5,DOWN:42.0,PIU2:45.6,BACK:47.0,ROW:47.6,END:60};
var END=T.END;
// ----- pista -----
(function(){function strip(x,z,w,d,c){var m=box(w,0.03,d,c);m.position.set(x,0.07,z);m.castShadow=false;scene.add(m);}
 [-2,-1,0,1,2].forEach(function(x){strip(x,(Z0+ZF)/2,0.06,ZF-Z0,0xffffff);});strip(0,Z0,4.1,0.12,0xffffff);
 for(var i=0;i<16;i++){strip(-1.94+i*0.258+0.06,ZF,0.13,0.14,i%2?0x222222:0xffffff);strip(-1.94+i*0.258-0.07,ZF+0.13,0.13,0.12,i%2?0xffffff:0x222222);}
 [-3.1,3.1].forEach(function(x){var p=box(0.16,1.4,0.16,0xffffff);p.position.set(x,0.7,ZF);scene.add(p);var tp=box(0.26,0.18,0.26,0xe0484f);tp.position.set(x,1.45,ZF);scene.add(tp);});})();
var RIB=[];[-1,1].forEach(function(sd){var g=new THREE.Group();g.position.set(sd*3.1,0.95,ZF);scene.add(g);var r=box(3.1,0.07,0.03,0xe0484f);r.position.set(-sd*1.55,0,0);r.castShadow=false;g.add(r);RIB.push(g);});
// colheres e ovos
var SPOON={},EGG={},EGGM=mat(0xfffaf0,{roughness:0.3});
Object.keys(KIDS).forEach(function(n){var g=new THREE.Group();scene.add(g);var h=box(0.04,0.03,0.42,0xc8ced6,{metalness:0.4,roughness:0.3});h.position.set(0,0,-0.12);g.add(h);
 var b=new THREE.Mesh(new THREE.SphereGeometry(0.11,14,8,0,PI*2,PI/2,PI/2),mat(0xc8ced6,{metalness:0.4,roughness:0.3,side:THREE.DoubleSide}));b.scale.set(1,0.45,1.2);b.position.set(0,0.035,0.14);g.add(b);g.scale.setScalar(1.45);SPOON[n]=g;
 var e=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),EGGM);e.scale.set(0.12,0.16,0.12);e.castShadow=true;scene.add(e);EGG[n]=e;});
// ovo quebrado (splash do Teo)
var SPL=new THREE.Group();scene.add(SPL);SPL.visible=false;
(function(){var w=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.32,0.02,18),mat(0xfffdf2));w.scale.set(1,1,0.75);SPL.add(w);var y=new THREE.Mesh(new THREE.SphereGeometry(0.12,14,8),mat(0xffc21a));y.scale.set(1,0.4,1);y.position.set(0.04,0.03,0);SPL.add(y);
 [[0.3,0.12],[-0.28,0.05],[0.1,-0.3]].forEach(function(p,i){var s=box(0.09,0.05,0.07,0xfffaf0);s.position.set(p[0],0.03,p[1]);s.rotation.y=i;SPL.add(s);});})();
// pintinho e cascas
var CHICK=new THREE.Group();scene.add(CHICK);CHICK.visible=false;
(function(){var Y=0xffd23f;var b=box(0.2,0.18,0.22,Y);b.position.y=0.11;CHICK.add(b);var h=box(0.16,0.15,0.15,Y);h.position.set(0,0.27,0.05);CHICK.add(h);
 var bk=box(0.06,0.04,0.07,0xff8c1a);bk.position.set(0,0.26,0.15);CHICK.add(bk);[-1,1].forEach(function(s){var e=box(0.03,0.04,0.02,0x222222);e.position.set(s*0.045,0.3,0.125);CHICK.add(e);
 var wg=box(0.03,0.1,0.13,0xffc21a);wg.position.set(s*0.115,0.12,0);wg.name='w'+s;CHICK.add(wg);var lg=box(0.03,0.05,0.03,0xff8c1a);lg.position.set(s*0.05,0.0,0.02);CHICK.add(lg);});
 var tuft=box(0.03,0.06,0.03,Y);tuft.position.set(0,0.37,0.04);CHICK.add(tuft);})();
var SHELL=[];[-1,1].forEach(function(s){var m=new THREE.Mesh(new THREE.SphereGeometry(0.1,12,8,0,PI*2,s>0?0:PI/2,PI/2),mat(0xfffaf0,{side:THREE.DoubleSide}));m.scale.set(0.9,1.2,0.9);m.visible=false;scene.add(m);SHELL.push(m);});
// ----- crianças -----
function eggPose(t,wob){var p2=t*9;return {A:{aRx:-1.25,eR:-0.12,aRz:-0.05,aLx:-0.2,aLz:-0.9-0.25*wob*Math.sin(t*7),eL:-0.2},roll:0.08*wob*Math.sin(t*7)};}
function raceZ(n,t){var sp={bia:0.268,leo:0.283,duda:0.27}[n];var mt=t-T.GO;if(n==='leo'){mt-=clamp(t-T.LW0,0,T.LW1-T.LW0);}
 if(n==='duda'){if(t>T.TRIP){var z1=Z0+0.27*(T.TRIP-T.GO);if(t<26.0)return z1+0.15*S(t,T.TRIP,T.CATCH);return z1+0.15+0.29*(t-26.0);}}
 return Z0+sp*Math.max(0,mt);}
var STOPZ=3.55;
function racer(n,t1){return cust(T.GO,t1,function(t){var z=Math.min(raceZ(n,t),STOPZ),walking=raceZ(n,t)<STOPZ;var wob=0.3,face='focus',s;
 if(n==='leo'&&t>T.LW0-1&&t<T.LW1+0.4){wob=1;face='wow';}
 if(n==='leo'&&t>=T.LW0&&t<T.LW1){var q=t-T.LW0;s={p:[LX.leo+0.12*Math.sin(q*5),z],yaw:0.5*Math.sin(q*4.2),pose:'none',face:'wow',y:0.05*Math.abs(Math.sin(q*8)),
   A:{aRx:-1.15+0.3*Math.sin(q*6),eR:-0.35,aLx:-0.4,aLz:-1.3+0.4*Math.sin(q*7),eL:-0.3,lL:0.5*Math.max(0,Math.sin(q*4.2)),lR:-0.5*Math.max(0,-Math.sin(q*4.2))},roll:0.22*Math.sin(q*4.2)};
   if(q>2.1){s.face='happy';}return s;}
 if(n==='duda'&&t>=T.TRIP&&t<26.0){var q2=t-T.TRIP;return {p:[LX.duda,z],yaw:0,pose:'none',face:'wow',pitch:0.35*Math.sin(clamp(q2/0.8,0,1)*PI),A:{aRx:-2.6,aLx:-2.6,aRz:0.4,aLz:-0.4,eL:-0.2,eR:-0.2,lL:-0.5*Math.sin(clamp(q2/0.6,0,1)*PI)}};}
 if(n==='duda'&&t>=26.0){if(!walking)return {p:[LX.duda,z],yaw:0,pose:'cheer',face:'happy'};return {p:[LX.duda,z],yaw:0,pose:'walk',face:'happy'};}
 if(!walking){return ext({p:[LX[n],z],yaw:0,pose:'none',face:'happy'},{A:{aRx:-1.15,eR:-0.35,aLx:-2.6,aLz:-0.3,eL:-0.2}});}
 var p2=t*8;s=ext({p:[LX[n],z],yaw:0,pose:'none',face:face,y:Math.abs(Math.sin(p2))*0.03},eggPose(t,wob));s.A.lL=Math.sin(p2)*0.35;s.A.lR=-Math.sin(p2)*0.35;return s;});}
var FR={teo:[-1.5,3.6],leo:[-0.5,3.4],bia:[0.5,3.4],duda:[1.5,3.6]};var GATH={teo:[-1.15,3.95],leo:[-0.45,3.35],bia:[0.45,3.35],duda:[1.15,3.95]},DOGF=[0,4.55];
(function(){var st={teo:[-1.5,-6],leo:[-0.5,-6.5],bia:[0.5,-6.5],duda:[1.5,-6]};
 Object.keys(KIDS).forEach(function(n){var p=[LX[n],Z0];TL[n]=[hold(0,0.2,st[n],0,'stand'),cust(0.2,2.8,function(t,u){var z=lerp(st[n][1],Z0,u);var s=ext({p:[LX[n],z],yaw:0,pose:'none',face:'happy'},eggPose(t,0.2));var p2=t*10;s.A.lL=Math.sin(p2)*0.4;s.A.lR=-Math.sin(p2)*0.4;s.y=Math.abs(Math.sin(p2))*0.04;return s;}),
  hold(2.8,T.GO,p,0,'none',function(t){var s=ext({face:t>4.8?'focus':'happy'},eggPose(t,0.1));return s;})];});
 // TEO: corre e quebra o ovo
 TL.teo.push(cust(T.GO,T.TFLY+0.3,function(t,u){var z=Z0+0.85*(t-T.GO)-0.25*Math.max(0,t-T.TFLY)*1;var ph=t*15;var s={p:[LX.teo,Math.min(z,-0.9)],yaw:0,pose:'none',face:'tongue',y:Math.abs(Math.sin(ph))*0.1,
  A:{aRx:-1.15+0.25*Math.sin(t*16),eR:-0.35,aLx:-Math.sin(ph)*1.0,eL:-0.7,lL:Math.sin(ph)*0.8,lR:-Math.sin(ph)*0.8},pitch:0.12};if(t>T.TFLY){s.face='wow';s.A.aRx=-2.0;}return s;}),
  hold(T.TFLY+0.3,11.4,[LX.teo,-0.9],0,'none',function(t){return {face:'wow',A:{aRx:-0.6,eR:-0.4,aLx:-0.9,aLz:0.2,eL:-1.6},pitch:0.25};}),hold(11.4,12.4,[LX.teo,-0.9],0,'laugh',{face:'tongue'}),
  mv(12.4,13.6,[[LX.teo,-0.9],[-2.0,-0.7],[-2.6,-0.4]],'walk',{face:'happy'}),turnTo(13.6,13.9,[-2.6,-0.4],-PI/2,0.5,'stand',{face:'happy'}),
  cust(13.9,T.WIN,function(t){var z=Math.max(-0.4,Math.min(1.9,raceZ('bia',t)));return {p:[-2.6,-0.4],yaw:0.5,pose:t>T.TRIP&&t<T.CATCH+1.2?'look':'clap',face:t>T.TRIP&&t<T.CATCH+0.8?'wow':'happy'};}),
  hold(T.WIN,30.6,[-2.6,-0.4],0.5,'cheer',{face:'happy'}),mv(30.6,33.0,[[-2.6,-0.4],[-2.6,2.6],GATH.teo],'walk',{face:'happy'}),turnTo(33.0,33.3,GATH.teo,PI*0.85,0,'stand',{face:'happy'}));
 ['leo','bia','duda'].forEach(function(n){var arr=33.3;TL[n].push(racer(n,arr));});
 // reunião, choco, pintinho
 Object.keys(KIDS).forEach(function(n){var g=GATH[n];var fr=n==='teo'?null:[LX[n],STOPZ];if(fr&&n!=='teo'){TL[n].push(mv(33.3,33.6,[fr,g],'walk',{face:'happy'}));}
  TL[n].push(hold(33.6,T.HATCH,g,0,'look',{face:'happy'}),hold(T.HATCH,T.HATCH+0.3,g,0,'look',{face:'wow'}),hold(T.HATCH+0.3,T.HOP1+0.6,g,0,'none',{face:'wow',A:{aLx:-1.9,aRx:-1.9,aLz:0.5,aRz:-0.5,eL:-1.5,eR:-1.5}}),
   hold(T.HOP1+0.6,T.DOWN,g,0,'cheer',{face:'happy'}),hold(T.DOWN,T.PIU2,g,0,'look',{face:'happy'}),hold(T.PIU2,T.BACK,g,0,'laugh',{face:'tongue'}),mv(T.BACK,T.ROW,[g,FR[n]],'walk',{face:'happy'}),
   hold(T.ROW,55.5,FR[n],0,'dance',function(t){var b=t*BPM/60;return {st:{leo:0,bia:3,teo:2,duda:1}[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='teo'?0.5:0);return {p:FR[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var DSTART=[2.5,-3.0];
function dogRunZ(t){return Math.max(-3.0,Math.min(raceZ('bia',t)+0.3,1.15));}
var CZ=1.15;// z da pegada
DG=[hold(0,0.2,[4,-6],yawTo([4,-6],DSTART),'stand'),mv(0.2,2.8,[[4,-6],DSTART],'drun'),turnTo(2.8,3.2,DSTART,0,-PI/2,'sit'),hold(3.2,4.8,DSTART,-PI/2,'sit'),
 cust(4.8,T.GO+0.6,function(t){var b=0;[4.8,5.4,6.0,T.GO].forEach(function(x){var q=t-x;if(q>=0&&q<0.25)b=Math.sin(q/0.25*PI);});return {p:DSTART,yaw:-PI/2,pose:'sit',hx:-0.35*b,y:0.05+0.12*b};}),
 turnTo(T.GO+0.6,T.GO+0.9,DSTART,-PI/2,0,'stand'),
 cust(T.GO+0.9,T.TRIP,function(t){var z=Math.max(-3.0,Math.min(raceZ('bia',t)+0.35,1.15));var z2=Math.max(-3.0,Math.min(raceZ('bia',t+0.1)+0.35,1.15));var mvng=z2-z>0.002;return {p:[DX,z],yaw:0,pose:mvng?'dwalk':'party'};}),
 cust(T.TRIP,T.CATCH+0.2,function(t,u){var z=Math.min(raceZ('bia',T.TRIP)+0.35,1.15);var lift=S(t,T.TRIP+0.2,T.TRIP+0.5);return {p:[DX-0.15*S(t,T.TRIP,T.CATCH),z],yaw:-0.5*lift,pose:'hind',lift:lift,y:hopAt(t,T.TRIP+0.3,0.9,0.55)};}),
 cust(T.CATCH+0.2,T.CATCH+0.6,function(t,u){var z=Math.min(raceZ('bia',T.TRIP)+0.35,1.15);return {p:[DX-0.15,z],yaw:-0.5*(1-u),pose:'hind',lift:1-u};}),
 cust(T.CATCH+0.6,30.4,function(t){var z0=Math.min(raceZ('bia',T.TRIP)+0.35,1.15);var z=z0+0.48*(t-T.CATCH-0.6);var q=t*10;return {p:[DX-0.15,z],yaw:0,pose:'dwalk',hx:-0.55,tailF:12};}),
 turnTo(30.4,30.8,[DX-0.15,z0end()],0,-PI*0.6,'stand',{hx:-0.55}),mv(30.8,33.4,[[DX-0.15,z0end()],[1.6,4.6],DOGF],'dwalk',{hx:-0.55}),turnTo(33.4,33.8,DOGF,yawTo([1.6,4.6],DOGF),0,'sit',{hx:-0.55}),
 cust(33.8,T.HATCH,function(t){return {p:DOGF,yaw:0,pose:'sit',hx:-0.55,hz:t>35.0?0.08*Math.sin(t*30):0};}),
 cust(T.HATCH,T.DOWN,function(t){var q=t-T.HATCH;return {p:DOGF,yaw:0,pose:'sit',hx:q<3.4?-0.55+0.1*Math.sin(q*3):-0.2,tailF:30,tailA:1};}),
 cust(T.DOWN,T.PIU2,function(t){var c=chickPos(t);var dz=Math.max(DOGF[1],c.z-0.55);return {p:[c.x*0.8,dz],yaw:0,pose:'sniff'};}),
 cust(T.PIU2,T.BACK,function(t,u){var c0=chickPos(T.PIU2);var z0=Math.max(DOGF[1],c0.z-0.55);var jb=Math.min(1,(t-T.PIU2)/0.35);return {p:[c0.x*0.8,z0-0.4*ez(jb)],yaw:0,pose:'sit',y:hopAt(t,T.PIU2,0.4,0.35),hx:-0.3};}),
 cust(T.BACK,T.ROW,function(t,u){var c0=chickPos(T.PIU2);var z0=Math.max(DOGF[1],c0.z-0.55)-0.4;return {p:L2([c0.x*0.8,z0],DOGF,ez(u)),yaw:0,pose:'dwalk'};}),hold(T.ROW,END+2,DOGF,0,'party')];
function z0end(){return Math.min(raceZ('bia',T.TRIP)+0.35,1.15)+0.48*(30.4-T.CATCH-0.6);}
// ----- ovo, colher, pintinho -----
var _hp=new THREE.Vector3();
function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function noseW(){return dog.head.localToWorld(V(0,0.12,0.36));}
function headTopW(){return dog.head.localToWorld(V(0,0.2,0.0));}
var DC={};function dogAt(tq,key,fn,tnow){if(DC[key])return DC[key].clone();applyDog(tq);dog.root.updateMatrixWorld(true);var v=fn();DC[key]=v.clone();applyDog(tnow);dog.root.updateMatrixWorld(true);return v;}
var KC={};function kidAt(n,tq,tnow){var key=n+tq.toFixed(3);if(KC[key])return KC[key];applyKid(KIDS[n],stateOf(n,tq),tq);KIDS[n].root.updateMatrixWorld(true);var h=handR(n),y=KIDS[n].root.rotation.y;KC[key]={h:h,y:y};applyKid(KIDS[n],stateOf(n,tnow),tnow);KIDS[n].root.updateMatrixWorld(true);return KC[key];}
function spoonTip(h,yaw){return h.clone().add(V(Math.sin(yaw)*0.36,0.045,Math.cos(yaw)*0.36));}
function wobAmp(n,t){if(n==='teo')return t>T.GO?0.4+1.4*lin(t,T.GO,T.TFLY):0.15;if(n==='leo'&&t>T.LW0-1&&t<T.LW1)return 1.0;return 0.25;}
function eggFlight(a,b,u,hgt){var m=a.clone().lerp(b,0.5);m.y+=hgt;var v=1-u;return a.clone().multiplyScalar(v*v).add(m.multiplyScalar(2*v*u)).add(b.clone().multiplyScalar(u*u));}
var CH0=V(0,0,0);
function chickPos(t){var base=V(DOGF[0],0,DOGF[1]+0.75);
 if(t<T.DOWN+0.4)return base;var q=t-(T.DOWN+0.4);var steps=Math.min(q/0.55,5.5);var k=Math.floor(steps),f=steps-k;var z=base.z+0.22*(k+ez(f));var x=0.25*Math.sin((k+f)*1.7);
 return V(x,hopAt(f,0,1,0.18)*(steps<5.5?1:0),z);}
function EXTRAfn(t){
 Object.keys(KIDS).forEach(function(n){var k=KIDS[n],h=handR(n),y=k.root.rotation.y;var sp=SPOON[n];sp.position.copy(h);sp.rotation.set(0,y,0);sp.position.add(V(Math.sin(y)*0.17,0.0,Math.cos(y)*0.17));
  var tip=spoonTip(h,y),e=EGG[n],wa=wobAmp(n,t);e.visible=true;e.rotation.set(0.25*wa*Math.sin(t*9),0,0.3*wa*Math.sin(t*7));
  var on=tip.clone().add(V(0.06*wa*Math.sin(t*7),0.17+0.02*wa*Math.abs(Math.sin(t*9)),0));
  if(n==='teo'&&t>=T.TFLY){var a=kidAt('teo',T.TFLY,t),from=spoonTip(a.h,a.y).add(V(0,0.13,0)),to=V(LX.teo,0.05,-0.15);if(t<T.SPLAT){on=eggFlight(from,to,(t-T.TFLY)/(T.SPLAT-T.TFLY),0.9);e.rotation.x=t*12;}else e.visible=false;}
  if(n==='leo'&&t>=14.6&&t<15.3){var u=(t-14.6)/0.7;on.y+=0.55*4*u*(1-u);e.rotation.x=u*PI*2;}
  if(n==='duda'&&t>=T.TRIP){var a2=kidAt('duda',T.TRIP,t),f2=spoonTip(a2.h,a2.y).add(V(0,0.13,0));var to2=dogAt(T.CATCH,'nose',noseW,t).add(V(0,0.1,0));
   if(t<T.CATCH){on=eggFlight(f2,to2,(t-T.TRIP)/(T.CATCH-T.TRIP),1.4);e.rotation.z=t*10;}else{on=noseW().add(V(0,0.1,0));e.rotation.set(0,0,0);if(t<T.HATCH&&t>35.0){e.rotation.z=0.25*Math.sin(t*28);}}
   if(t>=T.HATCH)e.visible=false;}
  e.position.copy(on);
  var hide=(n==='teo'&&t>T.TFLY+0.3)||(n==='duda'&&t>T.TRIP+0.4)||(t>33.3);sp.visible=!hide;if(t>33.3&&n!=='duda')e.visible=false;});
 SPL.visible=t>=T.SPLAT;SPL.position.set(LX.teo,0.08,-0.15);var sq=clamp((t-T.SPLAT)/0.15,0.2,1);SPL.scale.set(sq,1,sq);
 // faixa de chegada
 var br=t>=T.WIN?S(t,T.WIN,T.WIN+0.6):0;RIB[0].rotation.z=-br*1.25;RIB[1].rotation.z=br*1.25;RIB.forEach(function(r){r.rotation.y=br*0.3*Math.sin(t*6)*(1-S(t,T.WIN+0.6,T.WIN+2));});
 // pintinho e cascas
 CHICK.visible=t>=T.HATCH;SHELL.forEach(function(s,i){s.visible=t>=T.HATCH&&t<T.HATCH+3.0;});
 if(t>=T.HATCH){var q=t-T.HATCH;var nose=noseW();
  SHELL.forEach(function(s,i){var sd=i?1:-1;var u=clamp(q/0.9,0,1);s.position.set(nose.x+sd*0.18*u,nose.y+0.08+0.25*u*(1-u)*4*0.4-(u*u)*(nose.y-0.06),nose.z+0.1*u);s.rotation.z=sd*u*2.0;});
  var cp,cy=0,wing=0;
  if(t<T.HOP1){cp=nose.clone().add(V(0,0.04+0.1*S(q,0,0.3),0));cy=0;wing=Math.sin(t*20)*0.5*(q<1.4?1:0.2);}
  else if(t<T.DOWN){var u2=clamp((t-T.HOP1)/0.5,0,1),a=dogAt(T.HOP1,'nh',noseW,t),b=headTopW();cp=a.clone().lerp(b,u2);cp.y+=0.4*Math.sin(u2*PI);wing=Math.sin(t*25)*0.6*(u2<1?1:0);}
  else if(t<T.DOWN+0.4){var u3=(t-T.DOWN)/0.4,a3=dogAt(T.DOWN,'hd',headTopW,t),b3=chickPos(T.DOWN+0.4);cp=a3.clone().lerp(b3,u3);cp.y+=0.35*Math.sin(u3*PI);wing=Math.sin(t*25)*0.7;}
  else if(t<T.BACK){cp=chickPos(t);if(t>T.PIU2-0.3&&t<T.PIU2+0.2)cy=PI*S(t,T.PIU2-0.3,T.PIU2-0.05);else if(t>=T.PIU2+0.2)cy=PI;wing=(t>T.PIU2&&t<T.PIU2+0.8)?Math.sin(t*30)*0.8:0;}
  else{var u4=clamp((t-T.BACK)/0.7,0,1),a4=chickPos(T.BACK),b4=headTopW();cp=a4.clone().lerp(b4,ez(u4));cp.y+=0.7*Math.sin(u4*PI);wing=Math.sin(t*25)*0.6*(u4<1?1:0);cy=lerp(PI,0,u4);if(u4>=1){cy=0;cp.y+=0.03*Math.abs(Math.sin(t*BPM/60*PI));}}
  CHICK.position.copy(cp);CHICK.rotation.set(0,cy,0);var sc=t<T.HATCH+0.25?S(q,0,0.25):1;CHICK.scale.setScalar(Math.max(0.01,sc*1.7));
  CHICK.children.forEach(function(c){if(c.name==='w1')c.rotation.z=-wing-0.1;if(c.name==='w-1')c.rotation.z=wing+0.1;});}}
EXTRA=EXTRAfn;
BURST=[[T.WIN,[2.3,3.0],1.0],[T.HATCH+0.1,[0,4.6],1.0],[T.ROW,[0,3.6]],[T.ROW+2.3,[0,3.6]]];
BW=[['Cuidado com o ovo!',3.2,4.6,kp('bia',2.6,-0.2),1],['3',4.8,5.35,dp(1.2,-0.5),0.7],['2',5.4,5.95,dp(1.2,-0.5),0.7],['1',6.0,6.55,dp(1.2,-0.5),0.7],['Já!',T.GO,T.GO+1.0,dp(1.2,-0.5),0.8],
 ['Ihhh!',T.SPLAT+0.1,11.4,kp('teo',2.6,0.6),1],['Ufa!',15.4,16.6,kp('leo',2.6),1],['Uau!',T.CATCH+0.1,25.6,kp('duda',2.6,-0.3),1],['O Pipoca ganhou!',T.WIN+0.3,30.2,kp('teo',2.6,0.5),1],
 ['Piu!',T.HATCH+0.3,37.4,dp(1.4),0.8],['Um pintinho!',37.6,39.2,kp('bia',2.6),1],['Piu!',T.PIU2,T.PIU2+1.0,function(){var c=CHICK.position;return [c.x,c.y+0.35,c.z];},0.7],['Bem-vindo, pintinho!',51.4,55.0,function(){return [0,2.6,3.5];},1]];
var TRK=[[-2.2,Z0],[2.6,Z0]];
function RC(a,e,fov,m,ex){return function(){return frameOn(ALL,a,e,fov||48,m||0.08,ex);};}
SH=[[0,3.0,function(t){return frameOn(ALL,lerp(-15,0,ez(lin(t,0,3))),lerp(46,26,ez(lin(t,0,3))),50,0.1,[[0,ZF],[-2,ZF],[2,ZF]]);}],
 [3.0,T.GO+0.6,RC(0,18,46,0.08)],
 [T.GO+0.6,T.TFLY-0.6,RC(-12,24)],
 [T.TFLY-0.6,12.4,RC(-28,20,46)],
 [12.4,T.LW0-0.5,RC(0,26)],
 [T.LW0-0.5,T.LW1+0.8,RC(-18,18,46)],
 [T.LW1+0.8,T.TRIP-0.6,function(t){return frameOn(ALL,lerp(-5,15,ez(lin(t,T.LW1,T.TRIP))),24,48,0.08);}],
 [T.TRIP-0.6,T.CATCH+1.6,RC(22,18,46)],
 [T.CATCH+1.6,T.WIN+1.6,RC(10,24,48,0.08)],
 [T.WIN+1.6,33.6,RC(0,26,48,0.13)],
 [33.6,T.DOWN,RC(0,22,40,0.06)],
 [T.DOWN,T.ROW,RC(-10,24,44,0.08,[[0,5.8]])],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,48,0.06);}]];
EV=[[T.GO,'go'],[T.TFLY,'fly'],[T.SPLAT,'splat'],[T.LW0,'wob'],[14.6,'boing'],[T.TRIP,'trip'],[T.CATCH,'catch'],[T.WIN,'win'],[35.0,'tremble'],[T.HATCH,'crack'],[T.HATCH+0.3,'piu'],[T.HOP1,'hop'],[T.DOWN,'hop'],[T.PIU2,'piu'],[T.BACK,'hop'],[T.ROW,'confetti']];
[4.8,5.4,6.0].forEach(function(x){EV.push([x,'count']);});
