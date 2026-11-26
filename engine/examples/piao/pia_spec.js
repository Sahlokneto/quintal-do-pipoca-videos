// ===== Pião =====
makeBubs([['Campeonato de pião!',50],['Um, dois, três... já!',44],['Ah, o meu caiu!',58],['Volta, piãozinho!',52],['Au!',110],['O meu é o mais rápido!',38],
 ['Ei, empurrou o meu!',46],['Olha o Pipoca!',60],['O Pipoca virou pião!',44],['Quem para primeiro?',46],['O meu parou!',62],['Ele ficou tontinho!',48],
 ['Mas ganhou!',72],['Quem gira mais que o Pipoca?',34]]);
radio.visible=false;
var C=[0,-0.6],RR=1.15;
// roda de giz
(function(){var r=new THREE.Mesh(new THREE.RingGeometry(RR-0.06,RR+0.06,64),new THREE.MeshBasicMaterial({color:0xffffff}));r.rotation.x=-PI/2;r.position.set(C[0],0.065,C[1]);scene.add(r);})();
var T={ARR:3.0,THROW:6.2,LAND:6.85,LFALL:12.4,DMOVE:15.0,DFALL:17.4,HIT:21.0,TFALL:22.2,DOGIN:24.6,SPIN:26.0,BFALL:31.0,DIZZY:33.0,FLOP:33.8,YAY:37.0,ROW:39.0,DANCE:41.6,WAVE:55.5,END:60};
var END=T.END;
var KP={leo:[-1.8,-0.2],bia:[-1.0,-2.3],teo:[1.0,-2.3],duda:[1.8,-0.2]};
var FIN={leo:[-1.95,1.8],bia:[-0.65,1.8],teo:[0.65,1.8],duda:[1.95,1.8]},DF=[0,2.7];
var STY={leo:0,bia:3,teo:2,duda:1};
var D0=[0.9,1.0],D1=[1.25,1.45],DSN=[1.1,0.75],DSP=[0.15,-0.2];
var LAUGHW=[[23.0,24.4],[27.2,29.2],[34.2,35.6]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function YC(n){return yawTo(KP[n],C);}
var TOFF={leo:0,bia:0.1,teo:0.05,duda:0.15};
// pose de lançamento
function throwA(n,t){var t0=T.THROW+TOFF[n];var a;
 if(t<t0-0.5)a=-1.0;else if(t<t0-0.15)a=lerp(-1.0,0.9,S(t,t0-0.5,t0-0.15));else if(t<t0+0.1)a=lerp(0.9,-1.8,S(t,t0-0.15,t0+0.1));else a=lerp(-1.8,-0.3,S(t,t0+0.1,t0+0.8));
 return {A:{aRx:a,eR:-0.3,aLx:-0.5},face:t>t0-0.6?'focus':'happy',pitch:(t>t0-0.2&&t<t0+0.4)?0.15:0};}
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
// reações de cada criança durante o jogo (t de T.THROW+1 até T.ROW)
function react(n,t){var lw=inW(t,LAUGHW);
 if(lw)return {pose:'laugh',face:'tongue'};
 if(t>=T.YAY)return {pose:'cheer',face:'happy'};
 if(t>=35.8&&t<36.9&&n==='leo')return {pose:'none',A:{aRx:-2.7,aLx:-2.7,aRz:0.3,aLz:-0.3},face:'happy'};
 if(t>=T.FLOP&&t<35.8)return {pose:'clap',face:'happy'};
 if(n==='leo'){if(t>=T.LFALL+0.2&&t<14.2)return {pose:'none',A:{aLx:-1.4,aRx:-1.4,aLz:-0.6,aRz:0.6,eL:-0.4,eR:-0.4,hx:0.25},face:'wow'};
  if(t>=29.5&&t<30.9)return {pose:'none',A:{aRx:-2.2,eR:-0.6,aLx:-0.3},face:'happy'};}
 if(n==='duda'){if(t>=T.DMOVE+0.6&&t<T.DFALL+0.4)return {pose:'none',A:{aRx:-1.6,aLx:-1.6,eR:-0.1,eL:-0.1,aRz:0.2,aLz:-0.2},face:'wow'};
  if(t>=24.6&&t<26.0)return {pose:'none',A:{aRx:-1.7,eR:-0.1,aLx:-0.3},face:'wow'};}
 if(n==='teo'){if(t>=19.0&&t<20.6)return {pose:'none',A:{aLx:-0.4,aRx:-0.4,aLz:-0.7,aRz:0.7,eL:-1.7,eR:-1.7},face:'happy',pitch:-0.08};
  if(t>=T.HIT+0.5&&t<23.0)return {pose:'none',A:{aLx:-2.6,aRx:-2.6,aLz:-0.3,aRz:0.3,eL:-1.9,eR:-1.9},face:'wow'};}
 if(n==='bia'){if(t>=T.HIT+0.2&&t<22.4)return {pose:'cheer',face:'happy'};if(t>=T.BFALL+0.2&&t<32.6)return {pose:'none',A:{aLx:-1.3,aRx:-1.3,aLz:0.9,aRz:-0.9,eL:-1.6,eR:-1.6},face:'wow'};}
 if(t>=T.LAND&&t<11.5)return {pose:'clap',face:'happy'};
 return {pose:'look',face:'happy'};}
// olhar: cabeça para o que importa
function lookAt(n,t){var tgt=C;if(t>=T.DMOVE&&t<T.DFALL+1)tgt=[0.5,0.4];if(t>=T.DOGIN&&t<T.YAY+1)tgt=dogState(t).p;return tgt;}
(function(){var st={leo:[-4.5,2.5],bia:[-3.2,-5],teo:[3.2,-5],duda:[4.5,2.5]};
 Object.keys(KP).forEach(function(n){var p=KP[n];
  TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.6,[st[n],p],'run',{face:'happy',A:{aRx:-1.0,eR:-0.4}}),turnTo(2.6,3.0,p,yawTo(st[n],p),YC(n),'stand',{face:'happy',A:{aRx:-1.0,eR:-0.4}}),
   cust(3.0,T.THROW+1.0,function(t){var s=throwA(n,t);return {p:p,yaw:YC(n),pose:'none',A:s.A,face:(n==='teo'&&t>3.2&&t<4.6)?'happy':s.face,pitch:s.pitch};}),
   cust(T.THROW+1.0,T.ROW,function(t){var r=react(n,t),q=lookAt(n,t),y=YC(n);var ya=lerpAng(y,yawTo(p,q),0.7);var o={p:p,yaw:ya,pose:r.pose,face:r.face,A:r.A,pitch:r.pitch||0};if(n==='teo'&&r.pose==='none'&&t<20.6)o.yaw=y;return o;})];});
 // caminho para a fila final
 TL.leo.push(mv(T.ROW,39.9,[KP.leo,FIN.leo],'walk',{face:'happy'}),turnTo(39.9,40.2,FIN.leo,yawTo(KP.leo,FIN.leo),0,'stand',{face:'happy'}),hold(40.2,T.DANCE,FIN.leo,0,'clap',{face:'happy'}));
 TL.duda.push(mv(T.ROW,39.9,[KP.duda,FIN.duda],'walk',{face:'happy'}),turnTo(39.9,40.2,FIN.duda,yawTo(KP.duda,FIN.duda),0,'stand',{face:'happy'}),hold(40.2,T.DANCE,FIN.duda,0,'clap',{face:'happy'}));
 TL.bia.push(hold(T.ROW,39.3,KP.bia,YC('bia'),'cheer',{face:'happy'}),mv(39.3,41.0,[KP.bia,[-2.15,-1.4],[-1.35,0.95],FIN.bia],'walk',{face:'happy'}),turnTo(41.0,41.3,FIN.bia,yawTo([-1.35,0.95],FIN.bia),0,'stand',{face:'happy'}),hold(41.3,T.DANCE,FIN.bia,0,'clap',{face:'happy'}));
 TL.teo.push(hold(T.ROW,39.3,KP.teo,YC('teo'),'cheer',{face:'happy'}),mv(39.3,41.0,[KP.teo,[2.15,-1.4],[1.35,0.95],FIN.teo],'walk',{face:'happy'}),turnTo(41.0,41.3,FIN.teo,yawTo([1.35,0.95],FIN.teo),0,'stand',{face:'happy'}),hold(41.3,T.DANCE,FIN.teo,0,'clap',{face:'happy'}));
 Object.keys(KP).forEach(function(n){TL[n]=TL[n].concat(tail(n));});
})();
// ----- Pipoca -----
var d0=[3.6,3.6];
DG=[hold(0,0.4,d0,yawTo(d0,D0),'stand'),mv(0.4,2.8,[d0,[2.0,2.0],D0],'drun'),turnTo(2.8,3.1,D0,yawTo([2.0,2.0],D0),yawTo(D0,C),'sit'),
 cust(3.1,T.DMOVE+0.5,function(t){var y=yawTo(D0,C);if(t>T.LAND)y+=0.35*Math.sin(t*2.2);return {p:D0,yaw:y,pose:(t>T.LAND&&t<8.5)?'party':'sit',tailF:t>T.THROW?28:16};}),
 cust(T.DMOVE+0.5,T.DMOVE+1.1,function(t,u){return {p:L2(D0,D1,ez(u)),yaw:yawTo(D0,[0.5,0.4])+PI*0,pose:'stand',y:hopAt(t,T.DMOVE+0.5,0.5,0.45),pitch:-0.3*Math.sin(PI*u)};}),
 cust(T.DMOVE+1.1,T.DFALL+1.0,function(t){return {p:D1,yaw:yawTo(D1,[0.5,0.4]),pose:t<17.0?'bark':'stand',tailF:24};}),
 hold(T.DFALL+1.0,T.DOGIN-0.4,D1,yawTo(D1,[0.5,0.4]),'sit',{tailF:18}),
 mv(T.DOGIN-0.4,T.DOGIN+0.3,[D1,DSN],'dwalk'),turnTo(T.DOGIN+0.3,T.DOGIN+0.5,DSN,yawTo(D1,DSN),yawTo(DSN,[0.5,0.4]),'sniff'),
 hold(T.DOGIN+0.5,25.3,DSN,yawTo(DSN,[0.5,0.4]),'sniff'),
 mv(25.3,T.SPIN,[DSN,[1.0,0.0],DSP],'dwalk'),
 cust(T.SPIN,T.DIZZY,function(t){var q=t-T.SPIN,w=Math.min(1,q/0.8)*9;var ang=q<0.8?4.5*q*q/0.8:3.6+9*(q-0.8);return {p:DSP,yaw:-ang,pose:'dwalk',tailF:36,tailA:1.1};}),
 cust(T.DIZZY,T.FLOP,function(t,u){var q=T.DIZZY-T.SPIN,ang=3.6+9*(q-0.8)+lerp(0,3.0,1-(1-u)*(1-u));return {p:[DSP[0]+0.12*Math.sin(t*9),DSP[1]+0.08*Math.cos(t*7)],yaw:-ang,pose:'dwalk',roll:0.35*Math.sin(t*10),hz:0.3*Math.sin(t*8)};}),
 cust(T.FLOP,T.YAY,function(t,u){var q=T.DIZZY-T.SPIN,ang=3.6+9*(q-0.8)+3.0;var k=S(t,T.FLOP,T.FLOP+0.3);return {p:[DSP[0],DSP[1]],yaw:-ang,pose:'sit',roll:0.35*k,hz:0.35*Math.sin(t*3),tailF:10,tailA:0.5};}),
 cust(T.YAY,40.8,function(t){var q=T.DIZZY-T.SPIN,ang=3.6+9*(q-0.8)+3.0;return {p:DSP,yaw:lerpAng(-ang,0,S(t,T.YAY,T.YAY+0.5)),pose:'party',tailF:34};}),
 mv(40.8,41.7,[DSP,[0,0.9],DF],'drun'),turnTo(41.7,41.9,DF,0,0,'stand'),hold(41.9,END+2,DF,0,'party')];
// ----- piões -----
var TOPS={},_hp=new THREE.Vector3();
var TC={leo:[0x2f7de0,0xffd23f],bia:[0xff6fa3,0xffffff],teo:[0xff9f1c,0x7a3fd0],duda:[0x34d399,0xe0484f]};
var SPOT={leo:[-0.5,-0.5],bia:[-0.45,-1.15],teo:[0.3,-1.05],duda:[0.5,-0.45]};
function makeTop(c){var g=new THREE.Group(),pv=new THREE.Group(),sp=new THREE.Group();g.add(pv);pv.add(sp);scene.add(g);g.scale.setScalar(1.35);
 var cone=new THREE.Mesh(new THREE.CylinderGeometry(0.26,0.03,0.32,20),mat(c[0]));cone.position.y=0.16;cone.castShadow=true;sp.add(cone);
 var band=new THREE.Mesh(new THREE.CylinderGeometry(0.265,0.265,0.06,20),mat(c[1]));band.position.y=0.34;band.castShadow=true;sp.add(band);
 var cap=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.26,0.06,20),mat(c[0]));cap.position.y=0.4;sp.add(cap);
 var stem=new THREE.Mesh(new THREE.CylinderGeometry(0.045,0.045,0.16,10),mat(0x8b5a2b));stem.position.y=0.5;sp.add(stem);
 [0,1,2].forEach(function(i){var a=i*2.094;var m=box(0.08,0.07,0.08,c[1]);m.position.set(0.2*Math.cos(a),0.22,0.2*Math.sin(a));sp.add(m);});
 return {g:g,pv:pv,sp:sp};}
Object.keys(TC).forEach(function(n){TOPS[n]=makeTop(TC[n]);});
// trajetos no chão: [t0,t1,de,para]
var TMV={duda:[[T.DMOVE,T.DFALL,SPOT.duda,[0.5,0.4]]],bia:[[T.HIT-0.5,T.HIT,SPOT.bia,[-0.2,-1.1]]],teo:[[T.HIT,T.TFALL,SPOT.teo,[0.75,-1.5]]]};
var TFALL={leo:T.LFALL,duda:T.DFALL,teo:T.TFALL,bia:T.BFALL};
function gpos(n,t){var p=SPOT[n];(TMV[n]||[]).forEach(function(m){if(t>=m[0])p=L2(m[2],m[3],n==='teo'?1-(1-lin(t,m[0],m[1]))*(1-lin(t,m[0],m[1])):ez(lin(t,m[0],m[1])));});
 if(n==='duda'&&t>=T.DMOVE&&t<T.DFALL){var u=lin(t,T.DMOVE,T.DFALL);p=[p[0]+0.18*Math.sin(u*PI*3),p[1]];}return p;}
function hand0(n){var p=KP[n],y=YC(n);return V(p[0]+0.45*Math.sin(y),1.0,p[1]+0.45*Math.cos(y));}
function topAt(n,t){var o=TOPS[n],t0=T.THROW+TOFF[n],tl=t0+0.45,tf=TFALL[n];
 if(t<t0){KIDS[n].aR.e.children[1].getWorldPosition(_hp);o.g.position.set(_hp.x,_hp.y-0.38,_hp.z);o.pv.rotation.set(0.2,0,0);o.sp.rotation.y=0;return;}
 var sp=gpos(n,t);
 if(t<tl){var u=lin(t,t0,tl),h=hand0(n);o.g.position.set(lerp(h.x,sp[0],u),lerp(h.y-0.3,0.08,u)+1.0*u*(1-u),lerp(h.z,sp[1],u));o.pv.rotation.set(0.6*(1-u),0,0);o.sp.rotation.y=t*20;return;}
 var ph=t*4.5,spin=(t-tl)*34-Math.max(0,t-tf+1.5)*Math.max(0,t-tf+1.5)*6;
 if(t<tf){var wob=0.04+0.3*S(t,tf-1.4,tf)+(t<tl+0.3?0.25*(1-lin(t,tl,tl+0.3)):0);if(n==='teo'&&t>T.HIT)wob=0.35;
  o.g.position.set(sp[0],0.08,sp[1]);o.pv.rotation.set(wob*Math.cos(ph),0,wob*Math.sin(ph));o.sp.rotation.y=spin;return;}
 var v=lin(t,tf,tf+0.35),wf=lerp(0.34,0.92,v*v),phf=tf*4.5+lerp(0,2.0,1-Math.pow(1-lin(t,tf,tf+1.6),2));
 o.g.position.set(sp[0],0.08,sp[1]);o.pv.rotation.set(wf*Math.cos(phf),0,wf*Math.sin(phf));o.sp.rotation.y=(tf-tl)*34-2.25*6+lerp(0,6,1-Math.pow(1-lin(t,tf,tf+1.2),2));}
EXTRA=function(t){Object.keys(TOPS).forEach(function(n){topAt(n,t);});};
BURST=[[T.YAY,DSP,1.6],[T.DANCE,[0,1.8],2.2],[T.DANCE+3,[0,1.8],2.2]];
BW=[['Campeonato de pião!',3.2,4.5,kp('teo',2.9,0),1],['Um, dois, três... já!',4.6,6.0,kp('bia',2.9,0),1],['Ah, o meu caiu!',12.7,14.2,kp('leo',2.9,0.4),1],
 ['Au!',16.0,16.9,dp(1.3),0.9],['Volta, piãozinho!',16.0,17.6,kp('duda',2.9,-0.5),1],['O meu é o mais rápido!',19.0,20.6,kp('teo',2.9,-0.2),1],
 ['Ei, empurrou o meu!',21.6,23.0,kp('teo',2.9,-0.2),1],['Olha o Pipoca!',24.6,26.0,kp('duda',2.9,-0.5),1],['O Pipoca virou pião!',27.2,28.8,kp('teo',2.9,-0.2),1],
 ['Quem para primeiro?',29.5,30.9,kp('leo',2.9,0.4),1],['O meu parou!',31.2,32.6,kp('bia',2.9,0.2),1],['Ele ficou tontinho!',34.0,35.6,kp('duda',2.9,-0.5),1],
 ['Mas ganhou!',35.8,36.9,kp('leo',2.9,1.0),1],['Quem gira mais que o Pipoca?',50.5,54.5,kp('leo',2.9,0.7),1]];
function FU(c,d,z){var P=V(c.pos[0],c.pos[1],c.pos[2]),L=V(c.look[0],c.look[1],c.look[2]);_cam.position.copy(P);_cam.lookAt(L);_cam.updateMatrixWorld();var up=V(0,1,0).applyQuaternion(_cam.quaternion);
 P.addScaledVector(up,d);L.addScaledVector(up,d);P.copy(L.clone().add(P.clone().sub(L).multiplyScalar(z)));return {pos:[P.x,P.y,P.z],look:[L.x,L.y,L.z],fov:c.fov};}
function CF(a,e){return FU(frameOn(ALL,a,e,46,0.2),1.5,0.88);}
function WA(a,e,m){return function(){return CF(a,e);};}
function PAN(a0,a1,e0,e1,t0,t1,m){return function(t){var u=ez(lin(t,t0,t1));return CF(lerp(a0,a1,u),lerp(e0,e1,u));};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.ARR,PAN(-30,-5,58,50,0,T.ARR)],
 [T.ARR,T.THROW-0.3,PAN(-5,5,50,48,T.ARR,T.THROW-0.3)],
 [T.THROW-0.3,11.8,PAN(8,-8,52,56,T.THROW-0.3,11.8)],
 [11.8,14.8,WA(-25,52)],
 [14.8,18.6,PAN(20,28,50,52,14.8,18.6)],
 [18.6,24.3,PAN(-8,8,55,55,18.6,24.3)],
 [24.3,29.3,PAN(25,10,50,56,24.3,29.3)],
 [29.3,33.0,PAN(-15,-25,56,52,29.3,33.0)],
 [33.0,T.YAY,PAN(5,0,56,58,33.0,T.YAY)],
 [T.YAY,T.ROW+0.6,WA(0,50)],
 [T.ROW+0.6,T.DANCE,function(t){return mixCam(CF(0,50),FL(),ez(lin(t,T.ROW+0.6,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.8,'bark'],[T.ARR+0.2,'ta'],[T.THROW-1.4,'roll'],[T.THROW,'whoosh'],[T.LAND,'spin'],[T.LFALL,'plop'],[T.DMOVE,'slide'],[16.0,'bark'],[T.DFALL,'plop'],
 [T.HIT,'tlim'],[T.TFALL,'plop'],[23.0,'laugh'],[T.SPIN,'spin'],[27.2,'laugh'],[T.BFALL,'plop'],[T.DIZZY,'dizzy'],[T.FLOP,'boing'],[34.2,'laugh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
