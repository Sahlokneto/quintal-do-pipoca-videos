// ===== Circo no Quintal =====
makeBubs([['Respeitável público!',54],['O malabarista Léo!',54],['O Pipoca roubou a bola!',42],['O fortão Teo!',66],['Que força!',80],['Ei, o show é meu!',56],
 ['Agora, o salto do Pipoca!',40],['Por dentro, Pipoca!',54],['Que salto!',80],['Fim do show... por hoje!',44]]);
radio.visible=false;
var STG=[0,-0.4],RC=[0,-0.6];
var WT={leo:[-1.9,-1.75],duda:[-2.0,0.6],teo:[1.9,-1.75],bia:[2.0,0.6]},DW=[1.2,1.5];
var DH=[-0.75,-0.6],HS=[0,-2.3],HL=[0,0.9];
var FIN={leo:[-1.95,-1.3],duda:[-0.65,-1.1],teo:[0.65,-1.1],bia:[1.95,-1.3]},DF=[0,0.9];
var T={ARR:3.0,LW:6.4,JUG:7.6,STEAL:12.0,LGH1:12.8,LBK:14.6,TW:15.4,GRAB:17.0,UP:18.6,TOP:19.4,DIN:20.4,HIND:21.2,HE:23.6,TDN:24.0,
 HOOP:25.0,A1:27.0,A1E:28.6,A2:29.6,A2E:30.4,A3:32.4,JMP:33.2,LAND:33.9,YAY:34.0,FIM:37.0,BOW:39.0,BOWE:40.8,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function dogP(t){return dogState(t).p;}
// para onde a plateia olha
function star(t){if(t<T.LW)return WT.bia;if(t<T.STEAL)return STG;if(t<T.LBK)return dogP(t);if(t<T.DIN)return STG;if(t<T.HOOP)return dogP(t);if(t<T.FIM)return [0,-0.8];return [0,2];}
var LAUGH=[[T.LGH1,T.LBK],[22.0,T.TDN],[T.A1E-0.6,T.A2-0.3]],CLAP=[[T.TOP,T.DIN+0.4],[T.LBK-1.0,T.LBK]],CHEER=[[T.YAY,36.4]],WOW=[[T.STEAL,T.LGH1],[T.JMP-0.2,T.YAY]];
function watch(n,spot,t0,t1,extra){return cust(t0,t1,function(t){var s={p:spot,yaw:yawTo(spot,star(t)),pose:'look',face:'happy'};
 if(inW(t,LAUGH)){s.pose='laugh';s.face='tongue';}
 if(inW(t,CLAP)){s.pose='clap';}
 if(inW(t,WOW)){s.pose='none';s.face='wow';s.A={aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};}
 if(inW(t,CHEER)){s.pose='cheer';s.face='happy';}
 if(extra)extra(s,t);return s;});}
(function(){var st={leo:[-5,-2.5],duda:[-5,1.8],teo:[5,-2.5],bia:[5,1.8]};
 Object.keys(KIDS).forEach(function(n){var p=WT[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.7,[st[n],p],'run',{face:'happy'}),turnTo(2.7,T.ARR,p,yawTo(st[n],p),yawTo(p,STG),'stand',{face:'happy'})];});
 // Bia apresentadora
 TL.bia.push(watch('bia',WT.bia,T.ARR,T.FIM,function(s,t){var ann=[[3.1,4.9],[5.0,6.6],[15.0,16.6],[19.6,21.0],[24.8,26.6],[34.6,36.2]];
  if(inW(t,ann)){s.pose='none';s.face='happy';s.yaw=yawTo(WT.bia,[0,1.5]);s.A={aLx:-1.9,aRx:-1.9,aLz:-0.6-0.2*Math.sin(t*6),aRz:0.6+0.2*Math.sin(t*6),eL:-0.3,eR:-0.3};s.y=0.04*Math.abs(Math.sin(t*7));}}));
 // Léo malabarista
 TL.leo.push(watch('leo',WT.leo,T.ARR,T.LW),mv(T.LW,7.3,[WT.leo,STG],'walk',{face:'happy'}),turnTo(7.3,T.JUG,STG,yawTo(WT.leo,STG),0,'stand',{face:'happy'}),
  cust(T.JUG,T.LGH1+0.6,function(t){var p=Math.sin(t*10);var s={p:STG,yaw:0,pose:'none',face:t<T.STEAL?'focus':'wow',A:{aLx:-1.5+0.35*p,aRx:-1.5-0.35*p,aLz:0.2,aRz:-0.2,eL:-0.6,eR:-0.6,hx:-0.2}};return s;}),
  cust(T.LGH1+0.6,T.LBK,function(t,u){var b=Math.sin(PI*clamp(u*1.3,0,1));return {p:STG,yaw:0,pose:'none',pitch:0.5*b,face:'happy',A:{aLx:-0.3,aRx:-0.3,aLz:-0.5*b,aRz:0.5*b}};}),
  mv(T.LBK,15.6,[STG,WT.leo],'walk',{face:'happy'}),watch('leo',WT.leo,15.6,T.FIM));
 // Teo fortão
 TL.teo.push(watch('teo',WT.teo,T.ARR,T.TW),mv(T.TW,16.6,[WT.teo,STG],'walk',{face:'happy',A:{aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45}}),turnTo(16.6,T.GRAB,STG,yawTo(WT.teo,STG),0,'stand',{face:'focus',A:{aLx:-1.0,aRx:-1.0,aLz:0.3,aRz:-0.3,eL:-0.2,eR:-0.2},pitch:0.2}),
  cust(T.GRAB,T.UP,function(t){var b=S(t,T.GRAB,T.GRAB+0.5),st=S(t,17.6,18.0);var sh=0.05*Math.sin(t*40)*st;
   return {p:STG,yaw:0,pose:'none',pitch:0.5*b*(1-st)+sh,face:'focus',A:{aLx:lerp(-0.2,-0.9,b)+lerp(0,0.4,st),aRx:lerp(-0.2,-0.9,b)+lerp(0,0.4,st),aLz:0.25,aRz:-0.25,eL:lerp(0,-0.2,b)-1.2*st,eR:lerp(0,-0.2,b)-1.2*st,lL:-0.2*st,lR:-0.2*st}};}),
  cust(T.UP,T.TDN,function(t){var u=S(t,T.UP,T.TOP);var s={p:STG,yaw:0,pose:'none',face:t<T.TOP?'focus':'happy',y:t>T.TOP?0.03*Math.abs(Math.sin(t*6)):0,
   A:{aLx:lerp(-0.5,-2.95,u),aRx:lerp(-0.5,-2.95,u),aLz:0.25,aRz:-0.25,eL:lerp(-1.4,-0.1,u),eR:lerp(-1.4,-0.1,u)}};
   if(t>=T.HIND){s.yaw=yawTo(STG,dogP(t))*0.6;s.face='wow';}if(t>=22.2&&t<T.TDN)s.face='tongue';return s;}),
  cust(T.TDN,24.6,function(t,u){return {p:STG,yaw:0,pose:'none',pitch:0.4*Math.sin(PI*u),face:'happy',A:{aLx:lerp(-2.95,-1.25,u),aRx:lerp(-2.95,-1.25,u),aLz:lerp(0.25,0.32,u),aRz:lerp(-0.25,-0.32,u),eL:lerp(-0.2,-0.45,u),eR:lerp(-0.2,-0.45,u)}};}),
  mv(24.6,25.8,[STG,WT.teo],'walk',{face:'happy',A:{aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45}}),watch('teo',WT.teo,25.8,T.FIM));
 // Duda: assiste, depois segura o bambolê
 var HA={aLx:-1.62,aRx:-1.62,aLz:0.3,aRz:-0.3,eL:-0.1,eR:-0.1};
 TL.duda.push(watch('duda',WT.duda,T.ARR,T.HOOP),mv(T.HOOP,26.4,[WT.duda,[-1.3,-0.9],DH],'walk',{face:'happy'}),turnTo(26.4,26.8,DH,yawTo([-1.3,-0.9],DH),PI/2,'stand',{face:'happy'}),
  cust(26.8,T.FIM,function(t){var s={p:DH,yaw:PI/2,pose:'none',face:'happy',A:HA};
   if(inW(t,[[T.A1E-0.6,T.A2-0.3]])){s.face='tongue';s.y=0.03*Math.abs(Math.sin(t*12));}
   if(t>=T.A2E&&t<32.0)s.face='wow';if(t>=T.JMP-0.2&&t<T.YAY)s.face='wow';if(t>=T.YAY){s.face='happy';s.y=0.12*Math.abs(Math.sin(t*9));}
   return s;}));
 // final: reverência e dança
 var via={leo:[],duda:[],teo:[],bia:[[2.2,-0.4]]},from={leo:WT.leo,duda:DH,teo:WT.teo,bia:WT.bia};
 Object.keys(KIDS).forEach(function(n){TL[n].push(mv(T.FIM,38.4,[from[n]].concat(via[n],[FIN[n]]),'walk',{face:'happy'}),turnTo(38.4,T.BOW,FIN[n],PI,0,'stand',{face:'happy'}),
   cust(T.BOW,T.BOWE,function(t,u){var b=Math.sin(PI*u);return {p:FIN[n],yaw:0,pose:'none',pitch:0.55*b,face:'happy',A:{aLx:-0.2,aRx:-0.2,aLz:-0.4*b,aRz:0.4*b}};}),
   cust(T.BOWE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var J0=[1.45,0.15],J1=[-1.0,0.2];
DG=[hold(0,0.4,[5,3.5],-2.2,'stand'),mv(0.4,2.8,[[5,3.5],DW],'drun'),turnTo(2.8,3.1,DW,-2.2,yawTo(DW,STG),'sit'),
 cust(3.1,11.0,function(t){return {p:DW,yaw:yawTo(DW,t<T.LW?WT.bia:STG),pose:'sit',hx:t>T.JUG?-0.25:0};}),
 mv(11.0,T.STEAL,[DW,J0],'drun'),
 cust(T.STEAL,12.7,function(t,u){return {p:L2(J0,J1,u),yaw:-PI/2,pose:'stand',y:1.0*4*u*(1-u),pitch:-0.5+1.0*u,legs:[-0.9,-0.9,0.9,0.9],tailF:40,tailA:1.1};}),
 mv(12.7,14.2,[J1,[-0.9,1.1],[0.4,1.6],DW],'drun',{tailF:36}),turnTo(14.2,14.5,DW,PI/2,yawTo(DW,STG),'sit'),
 hold(14.5,T.DIN,DW,yawTo(DW,STG),'sit'),mv(T.DIN,T.HIND,[DW,[0.95,0.5]],'dwalk'),
 cust(T.HIND,T.HE,function(t,u){return {p:[0.95,0.5],yaw:-0.2+0.15*Math.sin(t*3),pose:'hind',wig:0.4,lift:S(u,0,0.15)*(1-S(u,0.92,1))};}),
 hold(T.HE,26.0,[0.95,0.5],-0.3,'party'),mv(26.0,26.8,[[0.95,0.5],[0.6,-1.0],HS],'drun'),turnTo(26.8,T.A1,HS,PI,0,'stand'),
 mv(T.A1,T.A1E,[HS,[0.7,-1.3],[0.85,-0.6],[0.6,0.2],HL],'drun'),
 mv(T.A1E,T.A2,[HL,[1.2,0.4],[1.0,-1.6],HS],'drun'),turnTo(T.A2,T.A2+0.15,HS,PI,0,'stand'),
 mv(T.A2+0.15,T.A2E,[HS,[0,-1.25]],'drun'),cust(T.A2E,31.6,function(t){return {p:[0,-1.25],yaw:0,pose:'sit',hz:0.4*Math.sin(t*3)};}),
 mv(31.6,T.A3,[[0,-1.25],[0.4,-1.9],HS],'dwalk'),turnTo(T.A3-0.1,T.A3,HS,PI,0,'stand'),
 mv(T.A3,T.JMP,[HS,[0,-1.45]],'drun'),
 cust(T.JMP,T.LAND,function(t,u){return {p:L2([0,-1.45],[0,0.25],u),yaw:0,pose:'stand',y:0.62*Math.sin(PI*u),pitch:-0.4+0.8*u,legs:[-1.0,-1.0,1.0,1.0],tailF:40,tailA:1.1};}),
 mv(T.LAND,34.4,[[0,0.25],HL],'drun'),hold(34.4,END+2,HL,0,'party')];
// ----- objetos -----
(function(){var r=new THREE.Mesh(new THREE.CylinderGeometry(1.75,1.75,0.05,40),mat(0xffd166));r.position.set(RC[0],0.1,RC[1]);r.receiveShadow=true;scene.add(r);
 var r2=new THREE.Mesh(new THREE.CylinderGeometry(1.55,1.55,0.06,40),mat(0xe0484f));r2.position.set(RC[0],0.11,RC[1]);r2.receiveShadow=true;scene.add(r2);
 var st_=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,0.065,5),mat(0xffd166));st_.position.set(RC[0],0.115,RC[1]);scene.add(st_);
 [-3.4,3.4].forEach(function(x){var p=box(0.18,3.2,0.18,0xffffff);p.position.set(x,1.6,-3.0);scene.add(p);var tp=box(0.3,0.3,0.3,0xe0484f);tp.position.set(x,3.3,-3.0);scene.add(tp);});
 var cols=[0xe0484f,0xffd166,0x4a8bf0,0x34d399,0xff6fa3];for(var i=0;i<13;i++){var u=(i+0.5)/13,x=lerp(-3.3,3.3,u),y=3.0-0.6*Math.sin(PI*u);var f=new THREE.Mesh(new THREE.ConeGeometry(0.16,0.34,3),mat(cols[i%5]));f.rotation.x=PI;f.position.set(x,y-0.2,-3.0);scene.add(f);}
 var ln=box(6.8,0.03,0.03,0x555555);ln.position.set(0,2.65,-3.0);ln.castShadow=false;scene.add(ln);})();
// cartola da Bia
(function(){var g=new THREE.Group();g.position.set(0,0.98,0);KIDS.bia.head.add(g);var a=box(1.25,0.1,1.15,0x22252b);g.add(a);var b=box(0.8,0.75,0.75,0x22252b);b.position.y=0.42;g.add(b);var c=box(0.82,0.14,0.77,0xe0484f);c.position.y=0.12;g.add(c);})();
// bolinhas
var BALLS=[0xe0484f,0xffd166,0x4a8bf0].map(function(c){var m=new THREE.Mesh(new THREE.SphereGeometry(0.15,14,10),mat(c));m.castShadow=true;scene.add(m);return m;});
var _m=new THREE.Vector3();function mouth(){dog.head.updateMatrixWorld(true);return dog.head.localToWorld(V(0,-0.1,0.42));}
function nose(){dog.head.updateMatrixWorld(true);return dog.head.localToWorld(V(0,0.32,0.3));}
// haltere
var DB=new THREE.Group();scene.add(DB);(function(){var b=box(1.3,0.08,0.08,0x9aa3ad);DB.add(b);[-0.6,0.6].forEach(function(x){var d=new THREE.Mesh(new THREE.CylinderGeometry(0.24,0.24,0.14,16),mat(0x2a2f36));d.rotation.z=PI/2;d.position.x=x;d.castShadow=true;DB.add(d);});})();
// bambolê
var HP=new THREE.Mesh(new THREE.TorusGeometry(0.5,0.05,10,32),new THREE.MeshStandardMaterial({color:0xff6fa3,roughness:0.4}));HP.castShadow=true;scene.add(HP);
var STR=[];for(var i=0;i<8;i++){var s_=box(0.1,0.1,0.1,0xfff3a0);s_.material=new THREE.MeshBasicMaterial({color:0xfff7c0});s_.castShadow=false;scene.add(s_);STR.push(s_);}
EXTRA=function(t){
 // bolinhas
 BALLS.forEach(function(m,k){var C=V(STG[0],1.75,STG[1]+0.42);var th=t*5+k*2*PI/3;var lp=V(C.x+0.45*Math.cos(th),C.y+0.5*Math.sin(th),C.z);
  m.visible=t>=T.LW;if(t<T.JUG){var hl=hand('leo',k===1?1:-1);m.position.set(hl.x,hl.y+0.12+k*0.0,hl.z+(k===2?0.15:0));return;}
  if(k===0){if(t<T.STEAL+0.2){m.position.copy(lp);return;}var u=lin(t,T.STEAL+0.2,T.STEAL+0.32);
   if(t<T.HE){m.position.copy(lp.clone().lerp(t<T.HIND?mouth():nose().add(V(0,0.05*Math.abs(Math.sin(t*6)),0)),u));if(t>=T.HIND-0.2&&t<T.HIND)m.position.copy(mouth().lerp(nose(),lin(t,T.HIND-0.2,T.HIND)));return;}
   var u2=lin(t,T.HE,T.HE+0.8);var a=nose(),b=V(0.4,0.15,1.6);m.position.set(lerp(a.x,b.x,u2),Math.max(0.15,lerp(a.y,0.15,u2)+0.8*Math.sin(PI*u2)),lerp(a.z,b.z,u2));return;}
  if(t<T.LGH1+0.6){m.position.copy(lp);return;}
  var u3=lin(t,T.LGH1+0.6,T.LGH1+1.3);var e=V(-0.5+k*0.4,0.15,0.4);m.position.copy(lp.lerp(e,u3));if(u3>0.5)m.position.y=Math.max(0.15,m.position.y);});
 // haltere
 var g0=V(STG[0],0.25,STG[1]+0.5);if(t<T.TW){DB.position.set(WT.teo[0]+0.2,0.25,WT.teo[1]-0.8);DB.rotation.set(0,0,0);}else if(t<16.8){var hc=hands('teo');DB.position.copy(hc);DB.rotation.set(0,KIDS.teo.root.rotation.y,0);}else if(t<T.GRAB+0.5){DB.position.copy(hands('teo').lerp(g0,S(t,16.8,16.95)));DB.rotation.set(0,0,0);}else if(t>=25.8){DB.position.set(WT.teo[0]+0.2,0.25,WT.teo[1]-0.8);DB.rotation.set(0,0,0);}
 else{var h=hands('teo');var u=S(t,T.GRAB+0.4,T.GRAB+0.6);DB.position.copy(g0.clone().lerp(h,u));DB.rotation.set(0,KIDS.teo.root.rotation.y,0.08*Math.sin(t*30)*S(t,17.6,18.0)*(1-S(t,T.TOP-0.2,T.TOP)));}
 // bambolê
 if(t<T.HOOP+0.7){HP.position.set(-1.5,0.08,-1.55);HP.rotation.set(PI/2,0,0);}
 else if(t<T.FIM){var hh=hands('duda');var u4=S(t,T.HOOP+0.7,T.HOOP+1.0);HP.position.set(hh.x+0.12*u4,hh.y-0.48*u4,hh.z);HP.rotation.set(PI/2*(1-u4),0,0);}
 else{var v=lin(t,T.FIM,T.FIM+0.6);HP.position.set(lerp(-0.6,1.3,v),lerp(0.95,0.08,v)+0.6*Math.sin(PI*v),lerp(-0.6,0.5,v));HP.rotation.set(PI/2*v,0,0);}
 STR.forEach(function(m,i){var on=t>=T.YAY&&t<T.YAY+2.0;m.visible=on;if(!on)return;var a=i*0.785+t*3,r=0.62+0.1*Math.sin(t*8+i);m.position.set(HP.position.x+Math.cos(a)*r,HP.position.y+Math.sin(a)*r,HP.position.z);m.rotation.z=t*5+i;});
};
BURST=[[T.YAY,[0,-0.6],2.2],[T.BOW,[0,0.4],2.4],[T.BOW+2.8,[0,0.4],2.4]];
BW=[['Respeitável público!',3.1,4.9,kp('bia',3.3,-0.8),1],['O malabarista Léo!',5.0,6.6,kp('bia',3.3,-0.8),1],['O Pipoca roubou a bola!',12.9,14.5,kp('duda',2.9,0.9),1],
 ['O fortão Teo!',15.0,16.6,kp('bia',3.3,-0.8),1],['Que força!',19.6,21.0,kp('bia',3.3,-0.8),1],['Ei, o show é meu!',22.2,24.0,kp('teo',3.9,0.2),1],
 ['Agora, o salto do Pipoca!',24.8,26.6,kp('bia',3.3,-0.9),1],['Por dentro, Pipoca!',30.4,32.0,kp('duda',2.9,0.4),1],['Que salto!',34.6,36.2,kp('bia',3.3,-0.8),1],
 ['Fim do show... por hoje!',50.4,54.8,kp('leo',2.9,0.9),1]];
var EXP=[[0,-2.4],[0,1.3]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||46,m||0.12,EXP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(30,0,ez(lin(t,0,T.ARR))),lerp(42,28,ez(lin(t,0,T.ARR))),48,0.12,EXP);}],
 [T.ARR,T.LW,A_(0,28)],
 [T.LW,T.STEAL,function(t){return frameOn(ALL,lerp(-8,8,lin(t,T.LW,T.STEAL)),20,46,0.12,EXP);}],
 [T.STEAL,T.TW,A_(4,24)],
 [T.TW,T.DIN,function(t){return frameOn(ALL,lerp(8,-6,lin(t,T.TW,T.DIN)),20,46,0.12,EXP);}],
 [T.DIN,T.HOOP,A_(8,22)],
 [T.HOOP,T.A2E,A_(-8,26)],
 [T.A2E,T.A3,A_(-14,22)],
 [T.A3,T.FIM,function(t){return frameOn(ALL,lerp(-16,0,lin(t,T.A3,T.FIM)),18,46,0.12,EXP);}],
 [T.FIM,T.BOW,function(t){return mixCam(frameOn(ALL,0,24,46,0.12,EXP),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.FIM,T.BOW)));}],
 [T.BOW,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.9,'bark'],[3.1,'ta'],[T.JUG-0.8,'roll'],[T.STEAL,'jump'],[T.LGH1,'laugh'],[T.LBK-1.0,'clap'],[15.6,'roll'],[T.GRAB,'strain'],[T.TOP,'ta'],[T.HIND,'boing'],[22.0,'laugh'],
 [25.6,'roll'],[T.A1E-0.6,'no'],[T.A2E,'no'],[T.JMP-1.0,'roll2'],[T.JMP,'jump'],[T.YAY,'confetti'],[T.BOW,'applause'],[T.BOW,'confetti2']];
