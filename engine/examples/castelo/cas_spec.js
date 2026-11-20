// ===== Castelo de Areia =====
makeBubs([['Vamos fazer um castelo!',52],['Uma torre!',96],['Muralha pronta!',64],['Ficou lindo!',84],['Pipoca, cuidado!',64],['Ele fez um fosso!',58],['Agora com água!',64],
 ['Minha torre!',84],['Ficou ainda maior!',58],['Rei do castelo!',66],['Melhor castelo do mundo!',46]]);
radio.visible=false;
var SY=0.12,CC=[0,-0.8];
var LE=[-0.8,-2.7],BI=[0.8,-2.7],TE=[-2.6,-0.8],DU=[2.6,-0.8],LB=[-0.85,-1.75],BB=[0.85,-1.75],DK=[0,0.05],TW=[0,0.45];
var TL_=[-0.85,-0.9],TR_=[0.85,-0.9],KP=[0,-0.9],KH=0.7;
var FIN={teo:[-2.2,-2.35],leo:LE,bia:BI,duda:[2.2,-2.35]};
var T={ARR:3.0,PL:6.3,PR:7.1,PK:9.3,WL:11.2,FLAG:13.4,DOG:15.0,JMP:16.4,DIG:17.0,DIGE:21.4,POUR:24.0,POURE:25.2,SPL:27.4,SHK:28.0,SHKE:29.6,FALL:28.6,FIX:31.8,FIXE:33.0,HOP:35.0,MOVE:37.6,ROW:39.0,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
function ell(th){return [1.55*Math.sin(th),CC[1]+1.05*Math.cos(th)];}
var TH0=0.6,M0=ell(TH0),WP=[0,0.25],FX=[1.25,-0.3],DOGIN=[1.1,1.25];
function dogP(t){return dogState(t).p;}
var WOWA={aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};
var REACT=[[15.6,17.0,'none','wow'],[18.4,21.4,'laugh','tongue'],[27.4,28.0,'none','wow'],[28.0,29.6,'laugh','tongue'],[33.0,35.0,'clap','happy'],[35.6,37.6,'cheer','happy']];
function lookT(t){if(t>T.DOG-0.2&&t<T.HOP+0.8)return dogP(t);return KP;}
function watcher(n,p,t0,t1,skip){return cust(t0,t1,function(t){var y=yawTo(p,lookT(t));
 if(n==='bia'&&t>T.FALL&&t<T.FIX)return {p:p,yaw:yawTo(p,TR_),pose:'none',face:'wow',A:WOWA};
 if(t>T.FLAG&&t<T.FLAG+1.6)return {p:p,yaw:y,pose:'clap',face:'happy'};
 for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1]){if(r[2]==='none')return {p:p,yaw:y,pose:'none',face:'wow',A:WOWA};return {p:p,yaw:y,pose:r[2],face:r[3]};}}
 return {p:p,yaw:y,pose:'stand',face:'happy'};});}
function build(p,t0,t1,tg){return cust(t0,t1,function(t,u){var a=Math.sin(PI*u);return {p:p,yaw:yawTo(p,tg),pose:'none',face:'focus',pitch:0.35*a,A:{aLx:-1.2-0.3*a,aRx:-1.2-0.3*a,aLz:0.2,aRz:-0.2,eL:-0.4,eR:-0.4}};});}
var BUCKA={aLx:-1.1,aRx:-1.1,aLz:0.25,aRz:-0.25,eL:-0.5,eR:-0.5};
(function(){var st={leo:[-1.6,-6.0],bia:[1.6,-6.0],teo:[-4.5,-3.0],duda:[4.5,-3.0]};
 function arrive(n,P,A){return [hold(0,0.2,st[n],yawTo(st[n],P),'stand'),mv(0.2,2.8,[st[n],P],'run',{face:'happy',A:A}),turnTo(2.8,T.ARR,P,yawTo(st[n],P),yawTo(P,KP),'stand',{face:'happy',A:A})];}
 TL.leo=arrive('leo',LE,BUCKA).concat([cust(T.ARR,4.8,function(t){return {p:LE,yaw:yawTo(LE,KP),pose:'none',face:'happy',A:BUCKA};}),
  mv(4.8,5.6,[LE,LB],'walk',{face:'happy',A:BUCKA}),build(LB,5.6,6.6,TL_),mv(6.6,7.4,[LB,LE],'walk',{face:'happy',A:BUCKA}),turnTo(7.4,7.7,LE,PI,0,'none',{face:'happy',A:BUCKA}),
  watcher('leo',LE,7.7,T.POUR-0.4),
  cust(T.POUR-0.4,T.POURE+0.3,function(t){var u=S(t,T.POUR-0.4,T.POUR);return {p:LE,yaw:yawTo(LE,[-0.8,-1.7]),pose:'none',face:'focus',pitch:0.2*u,A:{aLx:-1.1-0.6*u,aRx:-1.1-0.6*u,aLz:0.25,aRz:-0.25,eL:-0.3,eR:-0.3}};}),
  watcher('leo',LE,T.POURE+0.3,T.ROW)]);
 TL.bia=arrive('bia',BI,BUCKA).concat([cust(T.ARR,5.6,function(t){return {p:BI,yaw:yawTo(BI,KP),pose:'none',face:'happy',A:BUCKA};}),
  mv(5.6,6.4,[BI,BB],'walk',{face:'happy',A:BUCKA}),build(BB,6.4,7.4,TR_),mv(7.4,8.2,[BB,BI],'walk',{face:'happy',A:BUCKA}),turnTo(8.2,8.5,BI,PI,0,'none',{face:'happy',A:BUCKA}),
  watcher('bia',BI,8.5,T.ROW)]);
 TL.duda=arrive('duda',DU,null).concat([watcher('duda',DU,T.ARR,7.6),mv(7.6,8.6,[DU,[2.3,0.5],[0.6,0.4],DK],'walk',{face:'happy'}),build(DK,8.6,9.6,KP),
  mv(9.6,10.8,[DK,[0.6,0.4],[2.3,0.5],DU],'walk',{face:'happy'}),turnTo(10.8,11.1,DU,PI,yawTo(DU,KP),'stand'),watcher('duda',DU,11.1,T.MOVE),
  mv(T.MOVE,38.8,[DU,[2.5,-1.6],FIN.duda],'walk',{face:'happy'}),turnTo(38.8,T.ROW,FIN.duda,PI,0,'stand',{face:'happy'})]);
 TL.teo=arrive('teo',TE,null).concat([watcher('teo',TE,T.ARR,10.0),mv(10.0,11.0,[TE,[-2.3,0.6],[-0.6,0.7],TW],'walk',{face:'happy'}),build(TW,11.0,12.0,[0,-0.3]),
  mv(12.0,13.2,[TW,[-0.6,0.7],[-2.3,0.6],TE],'walk',{face:'happy'}),turnTo(13.2,13.5,TE,PI,yawTo(TE,KP),'stand'),watcher('teo',TE,13.5,T.MOVE),
  mv(T.MOVE,38.8,[TE,[-2.5,-1.6],FIN.teo],'walk',{face:'happy'}),turnTo(38.8,T.ROW,FIN.teo,PI,0,'stand',{face:'happy'})]);
 Object.keys(KIDS).forEach(function(n){TL[n].push(cust(T.ROW,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
  cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
DG=[hold(0,T.DOG,[3.5,4.5],-2.5,'stand'),mv(T.DOG,T.JMP,[[3.5,4.5],[2.0,2.0],DOGIN],'drun',{tailF:34}),
 cust(T.JMP,T.DIG,function(t,u){return {p:L2(DOGIN,M0,ez(clamp(u*1.2,0,1))),yaw:yawTo(DOGIN,M0),pose:'stand',legs:[-0.8,-0.8,0.6,0.6],y:SY*u+0.7*4*clamp(u*1.2,0,1)*(1-clamp(u*1.2,0,1))};}),
 cust(T.DIG,T.DIGE,function(t,u){var th=TH0+2*PI*u,p=ell(th),q=ell(th+0.05);var k=Math.sin(t*26);return {p:p,yaw:yawTo(p,q),pose:'none',pitch:0.15,hx:0.35,legs:[-0.8*Math.max(0,k),-0.8*Math.max(0,-k),0.3*k,-0.3*k],y:SY+0.03*Math.abs(k),tailF:34,tailA:1.2};}),
 turnTo(T.DIGE,T.DIGE+0.3,M0,yawTo(M0,ell(TH0+0.05)),0,'sit',{y:SY}),
 cust(T.DIGE+0.3,26.8,function(t){return {p:M0,yaw:0,pose:'sit',y:SY,tailF:30,tailA:1.0,hx:t>T.POUR&&t<T.POURE+0.6?-0.2:0};}),
 cust(26.8,T.SPL,function(t,u){return {p:L2(M0,WP,ez(u)),yaw:yawTo(M0,WP),pose:'stand',legs:[-0.8,-0.8,0.6,0.6],y:SY+0.8*4*u*(1-u)-0.25*u*u};}),
 cust(T.SPL,T.SHK,function(t){return {p:WP,yaw:0,pose:'stand',y:-0.13,hx:-0.2};}),
 cust(T.SHK,T.SHKE,function(t){return {p:WP,yaw:0,pose:'stand',y:SY,roll:0.35*Math.sin((t-T.SHK)*40),hz:0.4*Math.sin((t-T.SHK)*40+1)};}),
 cust(T.SHKE,31.2,function(t){return {p:WP,yaw:0,pose:'sit',y:SY,hx:0.25,tailA:0.2};}),
 mv(31.2,T.FIX,[WP,[0.7,0.35],FX],'dwalk',{y:SY}),
 cust(T.FIX,T.FIXE,function(t){return {p:FX,yaw:yawTo(FX,TR_),pose:'paw',y:SY,pw:Math.abs(Math.sin((t-T.FIX)*9))};}),
 cust(T.FIXE,T.HOP,function(t){return {p:FX,yaw:yawTo(FX,[0,2]),pose:'party',y:SY};}),
 cust(T.HOP,T.HOP+0.6,function(t,u){return {p:L2(FX,KP,ez(u)),yaw:lerpAng(yawTo(FX,KP),0,u),pose:'stand',legs:[-0.8,-0.8,0.6,0.6],y:lerp(SY,SY+KH,ez(u))+0.9*4*u*(1-u)};}),
 cust(T.HOP+0.6,END+2,function(t){return {p:KP,yaw:0,pose:'party',y:SY+KH};})];
// ----- caixa de areia e castelo -----
var SAND=0xf0d48e,SAND2=0xe6c27a;
(function(){var s=box(4.0,SY,2.8,SAND);s.position.set(0,SY/2,CC[1]);s.castShadow=false;scene.add(s);
 [[0,0.6,4.2,0.2],[0,-2.2,4.2,0.2]].forEach(function(e){var b=box(e[2],0.26,e[3],0xb07a45);b.position.set(e[0],0.13,e[1]);scene.add(b);});
 [[-2.05,CC[1]],[2.05,CC[1]]].forEach(function(e){var b=box(0.2,0.26,2.8,0xb07a45);b.position.set(e[0],0.13,e[1]);scene.add(b);});})();
function crenel(g,w,d,y,c){[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var k=box(0.16,0.16,0.16,c);k.position.set(q[0]*w,y,q[1]*d);g.add(k);});}
function makeTower(x,z,c){var g=new THREE.Group();g.position.set(x,SY,z);scene.add(g);var m=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.36,0.9,14),mat(SAND2));m.castShadow=true;m.position.y=0.45;g.add(m);
 crenel(g,0.2,0.2,0.98,SAND2);var f=new THREE.Group();f.position.y=0.9;g.add(f);var pole=box(0.04,0.6,0.04,0x8b5a2b);pole.position.y=0.3;f.add(pole);var fl=box(0.3,0.2,0.02,c);fl.position.set(0.16,0.48,0);f.add(fl);g.flag=f;return g;}
var TWL=makeTower(TL_[0],TL_[1],0xe0484f),TWR=makeTower(TR_[0],TR_[1],0x2f7de0);
var KEEP=new THREE.Group();KEEP.position.set(KP[0],SY,KP[1]);scene.add(KEEP);(function(){var b=box(1.0,KH,0.8,SAND2);b.position.y=KH/2;KEEP.add(b);var d=box(0.3,0.36,0.03,0x8b5a2b);d.position.set(0,0.18,0.41);KEEP.add(d);})();
var WALL=new THREE.Group();WALL.position.set(0,SY,-0.3);scene.add(WALL);(function(){var b=box(1.5,0.3,0.18,SAND2);b.position.y=0.15;WALL.add(b);for(var i=0;i<5;i++){var k=box(0.14,0.12,0.18,SAND2);k.position.set(-0.6+i*0.3,0.36,0);WALL.add(k);}})();
var MOATM=mat(0x9a7440),MOAT=[];(function(){var n=44;for(var i=0;i<n;i++){var th=TH0+2*PI*(i+0.5)/n,p=ell(th),q=ell(th+0.07);var s=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.02,0.3),MOATM);s.position.set(p[0],SY+0.006,p[1]);s.rotation.y=Math.atan2(q[0]-p[0],q[1]-p[1])+PI/2;s.receiveShadow=true;scene.add(s);s.th=(i+0.5)/n;MOAT.push(s);}})();
function makeBucket(c){var g=new THREE.Group();scene.add(g);var m=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.16,0.32,14,1,true),mat(c,{side:THREE.DoubleSide}));g.add(m);var b=new THREE.Mesh(new THREE.CircleGeometry(0.16,14),mat(c));b.rotation.x=-PI/2;b.position.y=-0.16;g.add(b);
 var h=new THREE.Mesh(new THREE.TorusGeometry(0.2,0.015,6,16,PI),mat(0x333333));h.position.y=0.16;g.add(h);g.rotation.order='YXZ';return g;}
var BKL=makeBucket(0xe0484f),BKB=makeBucket(0x2f7de0);
var PS=[];(function(){var m=mat(SAND2);for(var i=0;i<60;i++){var s=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.09,0.09),m);s.visible=false;scene.add(s);PS.push(s);}})();
var WD=[];(function(){var m=new THREE.MeshStandardMaterial({color:col(0x5cc1ff),roughness:0.2,transparent:true,opacity:0.85});for(var i=0;i<70;i++){var s=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.08,0.08),m);s.visible=false;scene.add(s);WD.push(s);}})();
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
function pop(t,t0){return t<t0?0.001:Math.max(0.001,back((t-t0)/0.35));}
var PUFFS=[[T.PL,TL_],[T.PR,TR_],[T.PK,KP],[T.WL,[0,-0.3]],[T.FALL+0.3,TR_],[T.FIXE-0.3,TR_]];
EXTRA=function(t){dog.root.visible=t>=T.DOG-0.3;
 // castelo
 TWL.scale.setScalar(pop(t,T.PL));KEEP.scale.setScalar(pop(t,T.PK));WALL.scale.set(Math.max(0.001,S(t,T.WL,T.WL+0.7)),pop(t,T.WL),1);
 var fl=pop(t,T.FLAG);TWL.flag.scale.setScalar(fl);TWL.flag.rotation.y=0.2*Math.sin(t*3);
 var r=pop(t,T.PR),fall=S(t,T.FALL,T.FALL+0.8),fix=S(t,T.FIX+0.4,T.FIXE);
 TWR.scale.set(r*(1+0.3*fall-0.3*fix)*(1+0.15*fix),Math.max(0.001,r*(1-0.7*fall+0.7*fall*fix+0.35*fix)),r*(1+0.3*fall-0.3*fix)*(1+0.15*fix));TWR.rotation.z=-0.5*Math.sin(PI*fall)*(1-fix);
 TWR.flag.visible=t<T.FALL+0.3||t>T.FIX;TWR.flag.scale.setScalar(t>T.FIX?pop(t,T.FIXE-0.2):fl);TWR.flag.rotation.y=0.2*Math.sin(t*3+1);
 // fosso
 var dug=lin(t,T.DIG,T.DIGE),wet=S(t,T.POUR+0.3,T.POURE+0.4);MOAT.forEach(function(s){s.visible=s.th<=dug;});MOATM.color.copy(col(0x9a7440)).lerp(col(0x4aa8e8),wet);
 // baldes
 [['leo',BKL,TL_,5.6,6.6],['bia',BKB,TR_,6.4,7.4]].forEach(function(b){var n=b[0],k=b[1];var h=hands(n),y=KIDS[n].root.rotation.y;k.position.copy(h);k.position.y-=0.05;
  var u=lin(t,b[3],b[4]),fl2=Math.sin(PI*clamp(u*1.4,0,1));var px=-PI*fl2;
  if(n==='leo'&&t>T.POUR-0.4&&t<T.POURE+0.3)px=-1.9*S(t,T.POUR-0.4,T.POUR)*(1-S(t,T.POURE,T.POURE+0.3));
  k.rotation.set(px,y,0);var f2=V(Math.sin(y),0,Math.cos(y));k.position.addScaledVector(f2,0.15);});
 // areia
 var pi=0;PS.forEach(function(s){s.visible=false;});
 PUFFS.forEach(function(P){var ct=t-P[0];if(ct<0||ct>0.8)return;for(var i=0;i<10&&pi<PS.length;i++){var s=PS[pi++],a=i*2.4+P[0],v=0.9+0.3*(i%3);var y=0.4+2.4*ct-4.9*ct*ct;if(y<SY)continue;s.visible=true;s.position.set(P[1][0]+Math.cos(a)*v*ct,y,P[1][1]+Math.sin(a)*v*ct);s.rotation.set(ct*6,ct*4,0);}});
 if(t>T.DIG&&t<T.DIGE){var dp_=dog.root.position,yy=dog.root.rotation.y;for(var j=0;j<20&&pi<PS.length;j++){var c2=((t*2.4+j/20)%1)*0.6;var y2=0.3+2.4*c2-4.9*c2*c2;if(y2<SY)continue;var s2=PS[pi++];s2.visible=true;
   s2.position.set(dp_.x-Math.sin(yy)*(0.4+1.2*c2)+0.3*Math.sin(j*2.1)*c2,y2,dp_.z-Math.cos(yy)*(0.4+1.2*c2)+0.3*Math.cos(j*2.1)*c2);}}
 if(t>T.FIX&&t<T.FIXE){for(var j2=0;j2<10&&pi<PS.length;j2++){var c3=((t*2+j2/10)%1)*0.5,y3=0.3+1.6*c3-4.9*c3*c3;if(y3<SY)continue;var s3=PS[pi++];s3.visible=true;s3.position.set(FX[0]-0.2-0.6*c3+0.2*Math.sin(j2),y3,FX[1]-0.4-0.4*c3);}}
 // água
 var wi=0;WD.forEach(function(s){s.visible=false;});
 if(t>T.POUR&&t<T.POURE){var bp=BKL.localToWorld(V(0,0.18,0));for(var i2=0;i2<20;i2++){var ct2=((t*1.6+i2/20)%1)*0.5;var s4=WD[wi++],e=V(-0.8,SY,-1.72),p4=bp.clone().lerp(e,ct2/0.5);p4.y=bp.y+(SY-bp.y)*Math.pow(ct2/0.5,1.6);s4.visible=true;s4.position.copy(p4);}}
 if(t>T.SPL&&t<T.SPL+0.9){var ct5=t-T.SPL;for(var i3=0;i3<26;i3++){var a3=i3*2.399,v3=0.8+0.5*(i3%3);var y5=0.2+3.2*ct5-4.9*ct5*ct5;if(y5<SY)continue;var s5=WD[wi++];s5.visible=true;s5.position.set(WP[0]+Math.cos(a3)*v3*ct5,y5,WP[1]+Math.sin(a3)*v3*ct5);}}
 if(t>T.SHK&&t<T.SHKE+0.5){for(var i4=0;i4<24&&wi<WD.length;i4++){var c6=((t*2.2+i4/24)%1)*0.7;if(t-c6<T.SHK||t-c6>T.SHKE)continue;var a4=i4*2.399+Math.floor(t*2.2+i4/24);var y6=0.6+1.6*c6-4.9*c6*c6;if(y6<SY)continue;var s6=WD[wi++];s6.visible=true;
   s6.position.set(WP[0]+Math.cos(a4)*3.0*c6,y6,WP[1]+Math.sin(a4)*3.0*c6);}}};
BURST=[[T.HOP+0.6,KP,1.6],[T.ROW+0.1,[0,-1.6],2.4],[T.ROW+2.6,[0,-1.6],2.4]];
BW=[['Vamos fazer um castelo!',3.2,4.8,kp('bia',2.9,-0.2),1],['Uma torre!',6.6,7.8,kp('leo',2.8,-0.2),1],['Muralha pronta!',12.0,13.3,kp('teo',2.8,0.7),1],['Ficou lindo!',13.6,15.0,kp('duda',2.8,-0.9),1],
 ['Pipoca, cuidado!',15.6,17.0,kp('bia',2.9,0.2),1],['Ele fez um fosso!',21.6,23.2,kp('teo',2.8,1.1),1],['Agora com água!',25.4,26.8,kp('leo',2.9,-0.2),1],
 ['Minha torre!',29.6,31.0,kp('bia',2.9,0.2),1],['Ficou ainda maior!',33.2,34.8,kp('bia',2.9,0.2),1],['Rei do castelo!',36.0,37.6,kp('teo',2.8,1.1),1],
 ['Melhor castelo do mundo!',51.0,54.8,function(){return [0,2.6,-2.6];},1]];
var GP=[[0,0.6],[-1.9,0.5],[1.9,0.5]];
var KN=['leo','bia','teo','duda'];function NM(){return (window._t||0)<T.DOG-0.3?KN:ALL;}
function A_(a,e,fov,m){return function(){return frameOn(NM(),a,e,fov||46,m||0.15,GP);};}
function frameLow2(a,e,fov,m){var c=frameLow(ALL,a,e,fov,m),P=V(c.pos[0],c.pos[1],c.pos[2]),Lk=V(c.look[0],c.look[1],c.look[2]);
 for(var it=0;it<25;it++){_cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(P);_cam.lookAt(Lk);_cam.updateMatrixWorld();var lo=1e9;GP.forEach(function(g){lo=Math.min(lo,V(g[0],0,g[1]).project(_cam).y);});
  if(lo>-0.92)break;var d=P.clone().sub(Lk).normalize();P.addScaledVector(d,0.25);}
 return {pos:[P.x,P.y,P.z],look:[Lk.x,Lk.y,Lk.z],fov:fov};}
SH=[[0,T.ARR,function(t){return frameOn(KN,lerp(30,-6,ez(lin(t,0,3.0))),lerp(40,28,ez(lin(t,0,3.0))),48,0.14,GP);}],
 [T.ARR,8.6,A_(-8,30)],
 [8.6,T.DOG,A_(10,32)],
 [T.DOG,T.DIGE,A_(0,40)],
 [T.DIGE,T.SPL-0.6,A_(-10,30)],
 [T.SPL-0.6,31.2,A_(8,26)],
 [31.2,T.MOVE,A_(-6,28)],
 [T.MOVE,T.ROW,function(t){return mixCam(frameOn(ALL,-6,28,46,0.15,GP),frameLow2(0,20,50,0.05),ez(lin(t,T.MOVE,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow2(0,20,50,0.05);}]];
EV=[[T.PL,'puf'],[T.PR,'puf'],[T.PK,'puf'],[T.WL,'puf'],[T.FLAG,'flag'],[T.DOG,'bark'],[T.JMP,'jump'],[T.DIG,'dig'],[18.4,'laugh'],[T.POUR,'water'],[T.SPL,'splash'],[T.SHK,'shake'],[28.2,'laugh'],[T.FALL,'fall'],[T.FIX,'fix'],[T.FIXE,'pop'],[T.HOP,'jump'],[T.HOP+0.6,'confetti'],[T.ROW,'confetti']];
