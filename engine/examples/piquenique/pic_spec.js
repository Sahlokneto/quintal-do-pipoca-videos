// ===== Piquenique =====
makeBubs([['Hora do piquenique!',56],['Que delícia!',84],['Hum, sanduíche!',60],['Olha, uma borboleta!',46],['Cadê meu sanduíche?',46],['Foi o Pipoca!',70],
 ['Ele comeu metade!',54],['Formigas no bolo!',54],['Valeu, Pipoca!',64],['Um biscoito pra você!',46],['Barriguinha cheia!',54],['Piquenique nota mil!',50]]);
radio.visible=false;
var SEAT={leo:[-0.85,-1.5],bia:[0.85,-1.5],teo:[-1.45,-0.2],duda:[1.45,-0.2]};
var FACE0=[0,0.7],FY=0.19;
var BK=[0,-1.25],SP=[-1.85,0.3],JU=[-0.3,-0.6],ML=[0.75,-0.55],CK=[0,0.15];
var FIN={teo:[-1.65,-2.6],leo:[-0.55,-2.6],bia:[0.55,-2.6],duda:[1.65,-2.6]},DF=[0.95,1.25];
var T={ARR:2.9,SIT:3.5,OPEN:4.6,F1:5.0,F2:5.5,F3:6.0,F4:6.5,DOG:8.6,PICK:9.6,PUT:12.0,BF:12.2,STEAL:14.2,MISS:15.2,LAP:18.4,LAPE:23.0,DROP:24.0,
 ANT:27.4,RUN:30.2,BARK:31.4,FLEE:32.4,CK0:35.0,TOSS:37.4,CATCH:38.2,EAT:38.4,EATE:40.4,ROLL:40.6,UP:43.4,ROW:45.2,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
// ----- olhar -----
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
function dogP(t){return dogState(t).p;}
var BFP=function(t){var u=lin(t,T.BF,T.BF+3.4);return [lerp(3.2,-3.4,u),2.1+0.35*Math.sin(u*9),lerp(-2.8,0.8,u)+0.5*Math.sin(u*6)];};
function antHead(t){if(t<T.FLEE)return L2([3.8,0.55],[0.45,0.2],ez(lin(t,T.ANT,T.ANT+2.6)));return [0.45+4.0*ez(lin(t,T.FLEE+0.2,T.FLEE+2.4)),0.2];}
function lookP(n,t){
 if(t>=T.BF&&t<T.STEAL+0.9){var b=BFP(t);return [b[0],b[2]];}
 if(t>=T.DOG&&t<T.PICK)return dogP(t);
 if(n==='teo'&&t>=T.PICK&&t<T.BF)return SP;
 if(t>=T.STEAL+0.9&&t<T.MISS+1.6)return n==='teo'?SP:dogP(t);
 if(t>=T.MISS+1.6&&t<T.ANT)return dogP(t);
 if(t>=T.ANT&&t<T.RUN)return antHead(t);
 if(t>=T.RUN&&t<T.UP)return dogP(t);
 return FACE0;}
function baseYaw(n){return yawTo(SEAT[n],FACE0);}
function lookYaw(n,t){var b=baseYaw(n),y=yawTo(SEAT[n],lookP(n,t));var d=((y-b+PI)%(2*PI)+2*PI)%(2*PI)-PI;return b+clamp(d,-1.3,1.3);}
var SA={
 clap:function(t){var cc=Math.abs(Math.sin(t*9));return {aLx:-1.3,aRx:-1.3,aLz:lerp(-0.2,0.32,cc),aRz:-lerp(-0.2,0.32,cc),eL:-0.6,eR:-0.6};},
 laugh:function(t){return {aLx:-1.0,aRx:-1.0,eL:-1.1,eR:-1.1};},
 wow:function(t){return {aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};},
 up:function(t){return {aLx:-0.5,aRx:-0.5,eL:-0.6,eR:-0.6,hx:-0.45};},
 rest:function(t){return {aLx:-0.4,aRx:-0.4,eL:-0.5,eR:-0.5};}};
// [t0,t1,tipo,rosto,quem]
var REACT=[[5.0,7.4,'clap','happy'],[T.BF+0.3,T.STEAL+0.9,'up','wow'],[T.MISS,T.MISS+1.7,'wow','wow','teo'],[T.MISS+1.8,T.LAP,'wow','wow'],[T.LAP,T.LAPE,'laugh','tongue'],
 [T.DROP+0.2,T.DROP+3.2,'laugh','tongue'],[T.ANT+1.4,T.FLEE,'wow','wow'],[T.FLEE,T.FLEE+3.0,'clap','happy'],[T.CATCH,T.EATE,'clap','happy'],[T.ROLL+0.4,T.UP,'laugh','tongue']];
function seated(n,t0,t1){return cust(t0,t1,function(t){var s={p:SEAT[n],yaw:lookYaw(n,t),pose:'sitg',face:'happy',A:SA.rest(t)};
 for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1]&&(!r[4]||r[4]===n)){s.A=SA[r[2]](t);s.face=r[3];if(r[2]==='laugh'){s.y=0.04*Math.abs(Math.sin(t*13));s.pitch=0.1;}break;}}
 if(n==='teo'&&t>=T.MISS&&t<T.LAP&&!(t<T.MISS+1.7))s.face='wow';
 return s;});}
function sitDown(n,t0,t1){return cust(t0,t1,function(t,u){return {p:SEAT[n],yaw:baseYaw(n),pose:'none',y:lerp(0,GROUND_Y,u*u),sit:u,face:'happy',A:{aLx:-0.6*u,aRx:-0.6*u}};});}
function standUp(n,t0,t1){return cust(t0,t1,function(t,u){return {p:SEAT[n],yaw:baseYaw(n),pose:'none',y:lerp(GROUND_Y,0,S(u,0,0.8)),sit:1-S(u,0,0.8),face:'happy'};});}
var HOLDA={aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45};
(function(){var st={leo:[-1.6,-6.2],bia:[1.6,-6.2],teo:[-5,-1.2],duda:[5,-1.2]};
 Object.keys(KIDS).forEach(function(n){var P=SEAT[n],A=n==='bia'?HOLDA:null;
  TL[n]=[hold(0,0.2,st[n],yawTo(st[n],P),'stand'),mv(0.2,T.ARR,[st[n],P],n==='bia'?'walk':'run',{face:'happy',A:A}),turnTo(T.ARR,T.SIT,P,yawTo(st[n],P),baseYaw(n),'stand',{face:'happy',A:A})];});
 // Bia põe a cesta e senta
 TL.bia[2]=turnTo(T.ARR,3.2,SEAT.bia,yawTo(st.bia,SEAT.bia),yawTo(SEAT.bia,BK),'stand',{face:'happy',A:HOLDA});
 TL.bia.push(cust(3.2,3.9,function(t,u){var a=Math.sin(PI*u);return {p:SEAT.bia,yaw:yawTo(SEAT.bia,BK),pose:'none',pitch:0.35*a,face:'happy',A:{aLx:-1.25+0.2*a,aRx:-1.25+0.2*a,aLz:0.32,aRz:-0.32,eL:-0.3,eR:-0.3}};}),
  turnTo(3.9,4.1,SEAT.bia,yawTo(SEAT.bia,BK),baseYaw('bia'),'stand',{face:'happy'}),sitDown('bia',4.1,4.6),seated('bia',4.6,T.CK0),
  cust(T.CK0,T.TOSS,function(t){var u=S(t,T.CK0,T.CK0+0.8);return {p:SEAT.bia,yaw:lerpAng(baseYaw('bia'),yawTo(SEAT.bia,dogP(t)),u),pose:'sitg',face:'happy',A:{aLx:lerp(-0.6,-2.2,u),aRx:lerp(-0.6,-2.2,u),aLz:0.3,aRz:-0.3,eL:-0.4,eR:-0.4}};}),
  cust(T.TOSS,T.TOSS+0.6,function(t,u){var y=yawTo(SEAT.bia,dogP(t));return {p:SEAT.bia,yaw:y,pose:'sitg',face:'happy',A:{aLx:lerp(-2.2,-1.2,ez(u)),aRx:lerp(-2.2,-1.2,ez(u)),aLz:0.3,aRz:-0.3,eL:-0.2,eR:-0.2}};}),
  seated('bia',T.TOSS+0.6,T.UP));
 ['leo','duda'].forEach(function(n){TL[n].push(sitDown(n,T.SIT,4.1),seated(n,4.1,T.UP));});
 // Teo: pega o sanduíche, põe de volta, perde
 TL.teo.push(sitDown('teo',T.SIT,4.1),seated('teo',4.1,T.PICK),
  cust(T.PICK,T.PUT+0.4,function(t){var u=S(t,T.PICK,T.PICK+0.5)*(1-S(t,T.PUT,T.PUT+0.4));var y=lerpAng(yawTo(SEAT.teo,SP),baseYaw('teo'),u*0.7);
   return {p:SEAT.teo,yaw:y,pose:'sitg',face:t>T.PICK+0.5&&t<T.PUT?'tongue':'happy',y:0.03*Math.abs(Math.sin(t*6))*u,A:{aLx:lerp(-0.9,-1.7,u),aRx:lerp(-0.9,-1.7,u),aLz:0.3,aRz:-0.3,eL:lerp(-0.3,-1.2,u),eR:lerp(-0.3,-1.2,u)}};}),
  seated('teo',T.PUT+0.4,T.MISS),
  cust(T.MISS,T.MISS+1.7,function(t){return {p:SEAT.teo,yaw:yawTo(SEAT.teo,SP),pose:'sitg',face:'wow',A:{aLx:-0.6,aRx:-0.6,aLz:-1.0,aRz:1.0,eL:-1.4,eR:-1.4}};}),
  seated('teo',T.MISS+1.7,T.UP));
 // Bia aponta para o Pipoca
 var bi=TL.bia;for(var i=0;i<bi.length;i++){if(bi[i].t0===4.6){var old=bi[i];bi.splice(i,1,cust(4.6,16.9,old.f),cust(16.9,T.LAP,function(t){return {p:SEAT.bia,yaw:yawTo(SEAT.bia,dogP(t)),pose:'sitg',face:'happy',A:{aRx:-1.7,eR:-0.1,aRz:0.1,aLx:-0.4,eL:-0.5}};}),cust(T.LAP,T.CK0,old.f));break;}}
 Object.keys(KIDS).forEach(function(n){var P=SEAT[n],F=FIN[n];var via=n==='teo'?[[-2.35,-1.2]]:n==='duda'?[[2.35,-1.2]]:[];
  TL[n].push(standUp(n,T.UP,44.1),mv(44.1,T.ROW-0.3,[P].concat(via,[F]),'walk',{face:'happy'}),turnTo(T.ROW-0.3,T.ROW,F,PI,0,'stand',{face:'happy'}),
   cust(T.ROW,T.WAVE,function(t){var b=t*BPM/60;return {p:F,yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:F,yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var D0=[-4.8,2.4],DW=[-2.55,0.75],DS=[-2.2,0.5],LAPC=[0,-0.6],RX=2.75,RZ=2.25;
function ell(th){return [LAPC[0]+RX*Math.sin(th),LAPC[1]+RZ*Math.cos(th)];}
var TH0=-0.95,LP0=ell(TH0),BKP=[0.75,1.25];
DG=[hold(0,T.DOG,D0,1.2,'stand'),mv(T.DOG,9.8,[D0,[-3.4,1.4],DW],'sniff'),turnTo(9.8,10.1,DW,yawTo([-3.4,1.4],DW),yawTo(DW,SEAT.teo),'sit'),
 cust(10.1,13.0,function(t){return {p:DW,yaw:yawTo(DW,SEAT.teo),pose:t<T.PUT?'sit':'paw',pw:Math.abs(Math.sin(t*5)),tailF:30};}),
 mv(13.0,T.STEAL,[DW,DS],'dwalk',{hx:0.3}),
 cust(T.STEAL,T.STEAL+0.4,function(t,u){return {p:DS,yaw:yawTo(DS,SP),pose:'stand',hx:0.55*Math.sin(PI*u)};}),
 mv(T.STEAL+0.4,T.MISS+0.8,[DS,[-2.6,1.1],[-2.9,1.5]],'dwalk',{tailF:30}),
 turnTo(T.MISS+0.8,T.MISS+1.2,[-2.9,1.5],yawTo([-2.6,1.1],[-2.9,1.5]),0.4,'stand'),
 cust(T.MISS+1.2,T.LAP,function(t){return {p:[-2.9,1.5],yaw:0.4,pose:'stand',tailF:34,tailA:1.1,hz:0.15*Math.sin(t*6)};}),
 mv(T.LAP,T.LAP+0.5,[[-2.9,1.5],LP0],'drun'),
 cust(T.LAP+0.5,T.LAPE,function(t,u){var th=TH0-2*PI*u,p=ell(th),q=ell(th-0.05);return {p:p,yaw:yawTo(p,q),pose:'drun',roll:-0.12};}),
 mv(T.LAPE,T.DROP,[LP0,DS],'dwalk'),
 cust(T.DROP,T.DROP+0.4,function(t,u){return {p:DS,yaw:yawTo(DS,SP),pose:'stand',hx:0.55*Math.sin(PI*u)};}),
 cust(T.DROP+0.4,T.RUN,function(t){return {p:DS,yaw:yawTo(DS,SEAT.teo),pose:'party'};}),
 mv(T.RUN,T.BARK,[DS,[-1.6,1.45],[-0.2,1.55],BKP],'drun'),turnTo(T.BARK-0.1,T.BARK,BKP,PI/2+0.3,yawTo(BKP,[2.2,0.5]),'stand'),
 cust(T.BARK,T.FLEE+1.2,function(t){return {p:BKP,yaw:yawTo(BKP,[2.2,0.5]),pose:'bark'};}),
 cust(T.FLEE+1.2,T.CK0+0.8,function(t){return {p:BKP,yaw:lerpAng(yawTo(BKP,[2.2,0.5]),yawTo(BKP,SEAT.bia),S(t,T.FLEE+1.2,T.FLEE+1.8)),pose:'party'};}),
 cust(T.CK0+0.8,T.TOSS+0.4,function(t){return {p:BKP,yaw:yawTo(BKP,SEAT.bia),pose:'hind',wig:1};}),
 cust(T.TOSS+0.4,T.CATCH,function(t,u){return {p:BKP,yaw:yawTo(BKP,SEAT.bia),pose:'hind',lift:1,y:0.35*Math.sin(PI*u)};}),
 cust(T.CATCH,T.CATCH+0.3,function(t,u){return {p:BKP,yaw:yawTo(BKP,SEAT.bia),pose:'hind',lift:1-u};}),
 cust(T.CATCH+0.3,T.ROLL,function(t){var c=Math.abs(Math.sin((t-T.EAT)*7));return {p:BKP,yaw:yawTo(BKP,[0,3]),pose:'sit',hx:t<T.EATE?0.15*c:0,tailF:30};}),
 cust(T.ROLL,T.ROLL+0.5,function(t,u){return {p:BKP,yaw:yawTo(BKP,[0,3]),pose:'stand',roll:PI*ez(u),y:0.95*Math.sin(PI/2*ez(u))};}),
 cust(T.ROLL+0.5,T.UP,function(t){var k=Math.sin(t*10);return {p:BKP,yaw:yawTo(BKP,[0,3]),pose:'stand',roll:PI,y:0.95,legs:[-0.4+0.4*k,-0.4-0.4*k,0.4+0.4*k,0.4-0.4*k],tailF:30,hz:0.2*Math.sin(t*4)};}),
 cust(T.UP,T.UP+0.5,function(t,u){return {p:BKP,yaw:yawTo(BKP,[0,3]),pose:'stand',roll:PI*(1-ez(u)),y:0.95*Math.sin(PI/2*(1-ez(u)))};}),
 mv(T.UP+0.5,44.8,[BKP,DF],'dwalk'),turnTo(44.8,T.ROW,DF,yawTo(BKP,DF),0,'stand'),hold(T.ROW,END+2,DF,0,'party')];
// ----- objetos -----
(function(){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d');for(var i=0;i<8;i++)for(var j=0;j<8;j++){x.fillStyle=(i+j)%2?'#ffffff':'#e8505b';x.fillRect(i*32,j*32,32,32);}
 var tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;tx.wrapS=tx.wrapT=THREE.RepeatWrapping;tx.repeat.set(1.6,1.2);
 var b=new THREE.Mesh(new THREE.BoxGeometry(4.0,0.04,2.8),new THREE.MeshStandardMaterial({map:tx,roughness:0.8}));b.position.set(0,0.165,-0.6);b.receiveShadow=true;scene.add(b);})();
// cesta
var BASKET=new THREE.Group();scene.add(BASKET);var LIDL,LIDR;
(function(){var b=box(0.62,0.38,0.44,0xc68a4a);b.position.y=0.19;BASKET.add(b);for(var i=0;i<3;i++){var s=box(0.64,0.04,0.46,0xa86e35);s.position.y=0.08+i*0.12;BASKET.add(s);}
 var h=new THREE.Mesh(new THREE.TorusGeometry(0.24,0.03,6,16,PI),mat(0xa86e35));h.position.y=0.38;BASKET.add(h);
 LIDL=new THREE.Group();LIDL.position.set(-0.31,0.39,0);BASKET.add(LIDL);var l1=box(0.31,0.04,0.44,0xa86e35);l1.position.x=0.155;LIDL.add(l1);
 LIDR=new THREE.Group();LIDR.position.set(0.31,0.39,0);BASKET.add(LIDR);var l2=box(0.31,0.04,0.44,0xa86e35);l2.position.x=-0.155;LIDR.add(l2);})();
// comidas
function sandwich(){var g=new THREE.Group();scene.add(g);var halves=[];[-1,1].forEach(function(s){var h=new THREE.Group();h.position.x=s*0.13;g.add(h);
 var a=box(0.25,0.07,0.36,0xf2c27b);a.position.y=0.035;h.add(a);var l=box(0.27,0.03,0.38,0x5cc15c);l.position.y=0.085;h.add(l);var q=box(0.24,0.03,0.33,0xe0484f);q.position.y=0.11;h.add(q);var c=box(0.25,0.07,0.36,0xf2c27b);c.position.y=0.16;h.add(c);halves.push(h);});g.halves=halves;return g;}
var SAND=sandwich();
var MEL=new THREE.Group();scene.add(MEL);(function(){var r=new THREE.Mesh(new THREE.CylinderGeometry(0.34,0.34,0.13,18,1,false,0,PI),mat(0x3f9e45));r.rotation.set(PI/2,0,PI/2);r.position.y=0;MEL.add(r);
 var m=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,0.14,18,1,false,0,PI),mat(0xff5468));m.rotation.set(PI/2,0,PI/2);m.position.y=0.005;MEL.add(m);
 for(var i=0;i<4;i++){var s=box(0.03,0.05,0.15,0x222222);s.position.set(-0.15+i*0.1,0.12+0.04*Math.sin(i*1.3),0);MEL.add(s);}})();
var JUICE=new THREE.Group();scene.add(JUICE);(function(){var j=new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.15,0.42,16),new THREE.MeshStandardMaterial({color:col(0xffa726),roughness:0.15,transparent:true,opacity:0.85}));j.position.y=0.21;JUICE.add(j);
 var lid=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,0.05,16),mat(0xffffff));lid.position.y=0.44;JUICE.add(lid);
 [[0.3,0.05],[0.25,-0.25]].forEach(function(q){var c=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.07,0.16,12),mat(0x7aa7ff));c.position.set(q[0],0.08,q[1]);JUICE.add(c);});})();
var CAKE=new THREE.Group();scene.add(CAKE);(function(){var p=new THREE.Mesh(new THREE.CylinderGeometry(0.48,0.48,0.03,20),mat(0xffffff));p.position.y=0.015;CAKE.add(p);
 var c=new THREE.Mesh(new THREE.CylinderGeometry(0.38,0.38,0.32,20),mat(0xff9ec4));c.position.y=0.19;CAKE.add(c);var t=new THREE.Mesh(new THREE.CylinderGeometry(0.39,0.39,0.06,20),mat(0xfff4f8));t.position.y=0.37;CAKE.add(t);
 var ch=new THREE.Mesh(new THREE.SphereGeometry(0.08,12,10),mat(0xd81b3c));ch.position.y=0.46;CAKE.add(ch);})();
var BONE=new THREE.Group();scene.add(BONE);(function(){var b=box(0.42,0.1,0.1,0xe8b86a);BONE.add(b);[[-0.22,-0.07],[-0.22,0.07],[0.22,-0.07],[0.22,0.07]].forEach(function(q){var s=new THREE.Mesh(new THREE.SphereGeometry(0.08,10,8),mat(0xe8b86a));s.position.set(q[0],0,q[1]);BONE.add(s);});})();
// borboleta
var BFLY=new THREE.Group();scene.add(BFLY);BFLY.scale.setScalar(2.2);var WL=new THREE.Group(),WR=new THREE.Group();BFLY.add(WL);BFLY.add(WR);
(function(){var m=new THREE.MeshStandardMaterial({color:col(0xc066ff),side:THREE.DoubleSide});var a=new THREE.Mesh(new THREE.PlaneGeometry(0.34,0.3),m);a.rotation.x=-PI/2;a.position.x=-0.17;WL.add(a);
 var b=new THREE.Mesh(new THREE.PlaneGeometry(0.34,0.3),m);b.rotation.x=-PI/2;b.position.x=0.17;WR.add(b);var bd=box(0.06,0.06,0.3,0x333333);BFLY.add(bd);})();
// formigas
var ANTS=[];(function(){for(var i=0;i<9;i++){var g=new THREE.Group();scene.add(g);for(var k=0;k<3;k++){var s=box(0.075,0.065,0.075,0x2a1d14);s.position.set(0,0.05,(k-1)*0.08);s.castShadow=false;g.add(s);}
 if(i===0){var cr=box(0.09,0.06,0.09,0xf2c27b);cr.position.set(0,0.13,0);cr.visible=false;g.add(cr);g.crumb=cr;}ANTS.push(g);}})();
// migalhas
var CR=[];(function(){var m=mat(0xe8b86a);for(var i=0;i<24;i++){var s=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,0.05),m);s.visible=false;scene.add(s);CR.push(s);}})();
function mouth(){return dog.head.localToWorld(V(0,-0.1,0.42));}
function pop(t,t0){return t<t0?0.001:Math.max(0.001,back((t-t0)/0.35));}
function arcTo(t,t0,dur,a,b,h){var u=clamp((t-t0)/dur,0,1);var p=a.clone().lerp(b,u);p.y+=h*4*u*(1-u);return p;}
var FOOD=[[SAND,SP,T.F1],[MEL,ML,T.F2],[JUICE,JU,T.F3],[CAKE,CK,T.F4]];
EXTRA=function(t){dog.root.visible=t>=T.DOG-0.2;
 // cesta: carregada pela Bia até 3.6
 if(t<3.6){var h=hands('bia');var u=S(t,3.25,3.6);var g=V(BK[0],FY,BK[1]);var p=h.clone();p.y-=0.25;p.lerp(g,u);BASKET.position.copy(p);BASKET.rotation.y=lerpAng(KIDS.bia.root.rotation.y,0,u);}
 else{BASKET.position.set(BK[0],FY,BK[1]);BASKET.rotation.y=0;}
 var op=S(t,T.OPEN,T.OPEN+0.3)*(1-S(t,T.F4+0.6,T.F4+0.9))+S(t,T.CK0-0.3,T.CK0)*(1-S(t,T.CK0+0.6,T.CK0+0.9));LIDL.rotation.z=1.9*op;LIDR.rotation.z=-1.9*op;
 // comidas saltam da cesta
 FOOD.forEach(function(f){var o=f[0];if(t<f[2]){o.visible=false;return;}o.visible=true;var a=V(BK[0],0.4+FY,BK[1]),b=V(f[1][0],FY,f[1][1]);o.position.copy(arcTo(t,f[2],0.5,a,b,1.0));o.rotation.y=f[0]===SAND?0.6:0;o.scale.setScalar(Math.max(0.3,Math.min(1,0.3+(t-f[2])*2)));});
 // sanduíche
 if(t>=T.PICK&&t<T.PUT+0.4){var u2=S(t,T.PICK,T.PICK+0.4)*(1-S(t,T.PUT,T.PUT+0.4));var hp=hands('teo');var g2=V(SP[0],FY,SP[1]);SAND.position.copy(g2.clone().lerp(hp,u2));SAND.rotation.y=0.6;}
 if(t>=T.STEAL+0.2&&t<T.DROP+0.2){var m=mouth();SAND.position.copy(m);SAND.position.y-=0.09;SAND.rotation.y=dog.root.rotation.y+PI/2;}
 if(t>=T.DROP+0.2){SAND.position.set(SP[0],FY,SP[1]);SAND.rotation.y=0.6;}
 SAND.halves[1].visible=t<T.STEAL+1.5;
 // borboleta
 BFLY.visible=t>T.BF&&t<T.BF+3.4;if(BFLY.visible){var bp=BFP(t),bq=BFP(t+0.05);BFLY.position.set(bp[0],bp[1],bp[2]);BFLY.rotation.y=Math.atan2(bq[0]-bp[0],bq[2]-bp[2]);WL.rotation.z=0.9*Math.sin(t*28);WR.rotation.z=-0.9*Math.sin(t*28);}
 // formigas
 ANTS.forEach(function(a,i){var vis=t>T.ANT&&t<T.FLEE+2.6;a.visible=vis;if(!vis)return;var d=i*0.28,ah=antHead(Math.min(t,T.FLEE-0.001));var dir=t<T.FLEE?[-1,-0.1]:[1,0.1];
  var p=[ah[0]+d,ah[1]+0.1*d];if(t>=T.FLEE)p[0]+=4.0*ez(lin(t,T.FLEE+0.2,T.FLEE+2.4));a.position.set(p[0],FY+0.012*Math.abs(Math.sin(t*20+i)),p[1]);a.rotation.y=Math.atan2(dir[0],dir[1]);
  if(t>T.FLEE&&t<T.FLEE+0.3){a.position.y+=0.12*Math.sin(PI*(t-T.FLEE)/0.3);}if(a.crumb)a.crumb.visible=t>T.FLEE;});
 // biscoito
 BONE.visible=t>T.CK0&&t<T.EATE+0.1;if(BONE.visible){var bs=1;if(t<T.TOSS){var u3=S(t,T.CK0,T.CK0+0.5);var hb=hands('bia');BONE.position.copy(V(BK[0],0.35+FY,BK[1]).lerp(hb,u3));BONE.rotation.set(0,KIDS.bia.root.rotation.y+PI/2,0);}
  else if(t<T.CATCH){var hb2=V(SEAT.bia[0],1.5,SEAT.bia[1]);BONE.position.copy(arcTo(t,T.TOSS,T.CATCH-T.TOSS,hb2,mouth(),1.6));BONE.rotation.set(t*8,0,0);}
  else{BONE.position.copy(mouth());BONE.position.y-=0.02;BONE.rotation.set(0,dog.root.rotation.y+PI/2,0);var k=Math.floor((t-T.EAT)/0.7);bs=k<0?1:[0.75,0.5,0.25][Math.min(k,2)];if(t>T.EATE-0.1)bs=0.001;}
  BONE.scale.set(bs,1,1);}
 // migalhas do biscoito
 CR.forEach(function(s){s.visible=false;});if(t>T.EAT&&t<T.EATE+0.5){var m2=mouth();CR.forEach(function(s,i){var ct=((t*1.3+i/24)%1)*0.6;if(t-ct<T.EAT)return;var y=m2.y-1.8*ct*ct+0.6*ct;if(y<FY)y=FY;s.visible=true;s.position.set(m2.x+0.35*Math.sin(i*2.3)*ct,y,m2.z+0.35*Math.cos(i*1.7)*ct);});}
 if(t>T.ROW-1)TL_DONE=1;};
var TL_DONE=0;
BURST=[[T.F4+0.5,CK,1.0],[T.ROW+0.1,[0,-1.4],2.4],[T.ROW+2.6,[0,-1.4],2.4]];
BW=[['Hora do piquenique!',2.9,4.4,kp('leo',2.9,-0.3),1],['Que delícia!',7.3,8.6,kp('duda',2.1,-0.4),1],['Hum, sanduíche!',10.2,11.7,kp('teo',2.1,-0.4),1],
 ['Olha, uma borboleta!',12.5,14.1,kp('duda',2.1,-0.7),1],['Cadê meu sanduíche?',15.4,16.9,kp('teo',2.1,-0.2),1],['Foi o Pipoca!',17.0,18.4,kp('bia',2.1,0.3),1],
 ['Ele comeu metade!',24.5,26.0,kp('teo',2.1,-0.2),1],['Formigas no bolo!',28.9,30.3,kp('bia',2.1,0.3),1],['Valeu, Pipoca!',33.0,34.5,kp('duda',2.1,-0.5),1],
 ['Um biscoito pra você!',35.7,37.2,kp('bia',2.1,0.3),1],['Barriguinha cheia!',41.2,42.7,kp('duda',2.1,-0.7),1],['Piquenique nota mil!',50.8,54.8,kp('teo',2.9,1.1),1]];
var GP=[[-2.0,0.8],[2.0,0.8]];
var KN=['leo','bia','teo','duda'];function NM(){return (window._t||0)<T.DOG-0.2?KN:ALL;}
function UP_(c,d){c.pos[1]+=d;c.look[1]+=d;return c;}
function A_(a,e,fov,m,ex){return function(){return UP_(frameOn(NM(),a,e,fov||46,m||0.1,ex||[]),0.4);};}
function antPts(){var t=window._t||0,h=antHead(t);return [[Math.min(h[0]+1.2,2.9),h[1]]];}
SH=[[0,T.ARR,function(t){return frameOn(KN,lerp(28,-6,ez(lin(t,0,T.ARR))),lerp(42,32,ez(lin(t,0,T.ARR))),48,0.14,GP);}],
 [T.ARR,T.DOG,A_(-6,34)],
 [T.DOG,T.BF,A_(-22,30)],
 [T.BF,T.MISS,A_(8,20,48)],
 [T.MISS,T.LAP,A_(-16,30)],
 [T.LAP,T.LAPE,A_(0,44,46,0.1,GP)],
 [T.LAPE,T.ANT,A_(-18,28)],
 [T.ANT,T.RUN,function(){return UP_(frameOn(NM(),20,34,46,0.1,antPts()),0.4);}],
 [T.RUN,T.CK0,A_(10,28)],
 [T.CK0,T.ROLL,A_(-8,30)],
 [T.ROLL,T.UP,A_(12,34)],
 [T.UP,T.ROW,function(t){return mixCam(frameOn(ALL,12,34,46,0.14,GP),frameLow(ALL,0,20,50,0.05),ez(lin(t,T.UP,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,20,50,0.05);}]];
EV=[[T.SIT,'sit'],[T.OPEN,'open'],[T.F1,'plop'],[T.F2,'plop'],[T.F3,'plop'],[T.F4,'plop'],[T.F4+0.5,'yay'],[T.DOG,'sneak'],[T.BF,'bfly'],[T.STEAL,'nhac'],[T.MISS,'oops'],
 [T.LAP,'run'],[T.LAPE,'stop'],[T.DROP,'drop'],[T.DROP+0.3,'laugh'],[T.ANT,'ants'],[T.RUN,'run2'],[T.BARK,'bark'],[T.FLEE,'flee'],[T.CK0,'open'],[T.TOSS,'toss'],[T.CATCH,'catch'],
 [T.EAT,'munch'],[T.ROLL,'roll'],[T.ROLL+0.5,'laugh'],[T.UP,'up'],[T.ROW,'confetti']];
