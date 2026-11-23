// ===== Lava-Carro =====
makeBubs([['Meu carrinho tá todo sujo!',40],['Lava-jato aberto!',62],['Cadê o Pipoca?',62],['Espuma pra todo lado!',46],['Ei, quem molha sou eu!',44],
 ['Volta aqui, Pipoca!',52],['Brilhando de novo!',54],['Bi-bi! Tá novinho!',54],['Carro limpinho, turma feliz!',38]]);
radio.visible=false;
var CAR0=[0,-0.6],CAR1=[0,0.9];
var WB=[-1.35,-0.6],WT=[1.35,-0.6],WL=[-2.0,1.5],WD=[2.1,1.4],DP=[2.9,0.0],DB=[1.0,0.75],DRY=[0.85,1.05];
var T={ARR:3.0,SPR:7.0,SPRE:11.5,SC:7.4,SCE:12.0,DOG:12.0,JMP:12.6,POP:15.6,LGH:16.4,RIN:19.2,RINE:22.9,WET:23.0,SHK:23.8,DRY:26.6,GRAB:28.6,RUN:28.8,RUNE:31.6,
 SHINE:32.6,IN:35.0,DIN:35.6,DRV:36.6,DRVE:40.4,YAY:40.8,FIM:41.4,ROW:43.4,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function carZ(t){return lerp(CAR0[1],CAR1[1],ez(lin(t,T.DRV,T.DRVE)));}
function carP(t){return [0,carZ(t)];}
function dogP(t){return dogState(t).p;}
var LAUGH=[[T.LGH,19.0]],WOW=[[T.POP,T.LGH],[T.SHINE,T.SHINE+0.8]],CHEER=[[T.SHINE+0.8,T.IN],[T.YAY,T.FIM]];
function react(n,s,t){if(inW(t,LAUGH)){s.pose='laugh';s.face='tongue';delete s.A;}
 if(inW(t,WOW)){s.pose='none';s.face='wow';s.A={aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};}
 if(inW(t,CHEER)){s.pose='cheer';s.face='happy';delete s.A;}return s;}
function scrub(t,ph){return {aRx:-1.35+0.3*Math.sin(t*8+ph),aRz:-0.1+0.3*Math.cos(t*8+ph),eR:-0.5,aLx:-0.5,eL:-0.4};}
function sideKid(n,spot,yaw0,t0,t1,extra){return cust(t0,t1,function(t){var s={p:spot,yaw:yaw0,pose:'stand',face:'happy'};
 if(t>=T.SC&&t<T.SCE){s.pose='none';s.A=scrub(t,n==='bia'?0:1.5);s.face='focus';}
 if(t>=T.DOG&&t<T.POP){s.yaw=yawTo(spot,dogP(t));}
 if(t>=T.RIN&&t<T.DRY){s.yaw=yawTo(spot,[0,0.2]);}
 if(t>=T.GRAB&&t<T.RUNE+0.6){s.yaw=yawTo(spot,dogP(t));s.pose='laugh';s.face='tongue';}
 if(t>=T.SHINE&&t<T.IN){s.yaw=yawTo(spot,carP(t));}
 if(t>=T.DRV&&t<T.FIM){s.yaw=yawTo(spot,carP(t));s.pose='clap';}
 react(n,s,t);if(extra)extra(s,t);return s;});}
(function(){var st={leo:[-4.8,3.6],bia:[-4.6,-3.4],teo:[4.6,-3.4],duda:[4.8,3.8]};
 var W0={leo:WL,bia:WB,teo:WT,duda:WD},Y0={leo:yawTo(WL,[0,0.4]),bia:PI/2,teo:-PI/2,duda:yawTo(WD,[0,0.3])};
 Object.keys(KIDS).forEach(function(n){var p=W0[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.7,[st[n],p],'run',{face:'happy'}),turnTo(2.7,T.ARR,p,yawTo(st[n],p),Y0[n],'stand',{face:'happy'})];});
 // Bia
 TL.bia.push(sideKid('bia',WB,PI/2,T.ARR,T.FIM,function(s,t){if(t>=13.2&&t<15.0){s.pose='none';s.face='wow';s.yaw=yawTo(WB,DB);s.A={aLx:-0.6,aRx:-0.6,aLz:-1.0,aRz:1.0,eL:-1.3,eR:-1.3};}}));
 // Teo: fala, esfrega, entra no carro
 TL.teo.push(sideKid('teo',WT,-PI/2,T.ARR,T.IN,function(s,t){if(t>=T.ARR&&t<4.9){s.pose='none';s.face='wow';s.A={aLx:-0.6,aRx:-0.6,aLz:-1.0,aRz:1.0,eL:-1.3,eR:-1.3};s.yaw=yawTo(WT,[0,0.8]);}}),
  cust(T.IN,T.DIN,function(t,u){var a=[WT[0],WT[1]],b=[0,CAR0[1]-0.1];var p=L2(a,b,ez(u));return {p:p,yaw:lerpAng(-PI/2,0,u),pose:'none',y:0.9*Math.sin(PI*u)+0.3*S(u,0.6,1),sit:S(u,0.5,1),face:'happy',A:{lL:-PI/2*S(u,0.4,1),lR:-PI/2*S(u,0.4,1)}};}),
  cust(T.DIN,END+2,function(t){var c=carP(t);var s={p:[c[0],c[1]-0.1],yaw:0,pose:'none',y:0.3+(t>T.DRV&&t<T.DRVE?0.02*Math.abs(Math.sin(t*12)):0),sit:1,face:'happy',
   A:{lL:-PI/2,lR:-PI/2,aLx:-1.2,aRx:-1.2,aLz:0.25,aRz:-0.25,eL:-0.3,eR:-0.3}};
   if(t>=38.0&&t<39.8){s.A.aRx=-2.7;s.A.aRz=0.3+0.3*Math.sin(t*10);}
   if(t>=T.YAY){var b=t*BPM/60;s.A={lL:-PI/2,lR:-PI/2,aRx:-2.8,aRz:0.25+0.45*Math.sin(t*(t>T.WAVE?11:7)),eR:-0.3,aLx:t>T.WAVE?-2.0:-2.6,aLz:-0.4,eL:-0.4};s.face=(Math.floor(b/4)%2)?'tongue':'happy';s.roll=0.06*Math.sin(PI*b);}
   return s;}));
 // Léo: mangueira
 TL.leo.push(sideKid('leo',WL,yawTo(WL,[0,0.4]),T.ARR,T.FIM,function(s,t){
  var spray=(t>=T.SPR&&t<T.SPRE)||(t>=T.RIN&&t<T.RINE)||(t>=T.WET&&t<T.SHK);
  if(spray){s.pose='none';s.face='focus';s.A={aRx:-1.45,aLx:-1.3,aLz:0.35,eL:-0.4,eR:-0.2};s.yaw=yawTo(WL,[sprayTgt(t).x,sprayTgt(t).z]);if(t>=T.WET)s.face='wow';}
  if(t>=T.SHK&&t<T.SHK+1.0){s.pose='none';s.face='wow';s.yaw=yawTo(WL,dogP(t));s.A={aLx:-1.6,aRx:-1.6,aLz:0.5,aRz:-0.5,eL:-1.6,eR:-1.6};}
  if(t>=24.6&&t<26.4){s.pose='none';s.face='tongue';s.yaw=0.3;s.A={aRx:-1.3,eR:-0.2,aRz:0.2,aLx:-0.3};}}));
 // Duda
 TL.duda.push(sideKid('duda',WD,yawTo(WD,[0,0.3]),T.ARR,T.DRY,function(s,t){if(t>=5.0&&t<6.8){s.pose='cheer';s.face='happy';s.yaw=0.2;}}),
  mv(T.DRY,27.2,[WD,DRY],'walk',{face:'happy'}),
  cust(27.2,T.GRAB,function(t){return {p:DRY,yaw:yawTo(DRY,[0,0.2]),pose:'none',face:'happy',pitch:0.15,A:{aLx:-1.3+0.2*Math.sin(t*7),aRx:-1.3+0.2*Math.sin(t*7),aLz:0.35+0.25*Math.sin(t*7),aRz:-0.35+0.25*Math.sin(t*7),eL:-0.5,eR:-0.5}};}),
  cust(T.GRAB,T.RUNE+0.4,function(t){var s={p:DRY,yaw:yawTo(DRY,dogP(t)),pose:'none',face:'wow',A:{aRx:-1.6,eR:-0.1,aLx:-0.4}};if(t>T.GRAB+0.4&&t<29.0){s.pitch=0.2;}if(t>31.0){s.pose='laugh';s.face='tongue';delete s.A;}return s;}),
  mv(T.RUNE+0.4,T.SHINE,[DRY,WD],'walk',{face:'happy'}),sideKid('duda',WD,yawTo(WD,[0,0.3]),T.SHINE,T.FIM));
 // final: dançam em volta do carro
 var FIN={leo:[-1.55,1.3],bia:[2.6,0.4],duda:[1.55,1.3]},VIA={leo:[],duda:[],bia:[[-1.2,-1.4],[1.5,-1.2]]};
 ['leo','bia','duda'].forEach(function(n){var from={leo:WL,bia:WB,duda:WD}[n];
  TL[n].push(mv(T.FIM,42.8,[from].concat(VIA[n],[FIN[n]]),'walk',{face:'happy'}),turnTo(42.8,43.2,FIN[n],PI/2,0,'stand',{face:'happy'}),
   cust(43.2,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var PLAY=[2.9,2.6],R1=[[1.6,2.1],[2.9,2.7],[3.5,0.6],[2.9,-1.5],[3.4,1.5],PLAY];
DG=[hold(0,0.4,[5,1.2],-PI/2,'stand'),mv(0.4,2.8,[[5,1.2],DP],'drun'),turnTo(2.8,3.1,DP,-PI/2,yawTo(DP,CAR0),'sit'),
 hold(3.1,T.DOG,DP,yawTo(DP,CAR0),'sit'),mv(T.DOG,T.JMP,[DP,[1.5,0.8]],'drun'),
 cust(T.JMP,T.JMP+0.5,function(t,u){return {p:L2([1.5,0.8],DB,u),yaw:yawTo([1.5,0.8],DB),pose:'stand',y:0.8*4*u*(1-u),legs:[-0.9,-0.9,0.9,0.9]};}),
 cust(T.JMP+0.5,T.POP,function(t){return {p:DB,yaw:-1.2+0.3*Math.sin(t*2),pose:'stand',tailF:30,tailA:1.0};}),
 cust(T.POP,T.POP+1.0,function(t,u){return {p:DB,yaw:-1.2,pose:'stand',roll:0.7*Math.sin(t*30)*(1-u),hz:0.5*Math.sin(t*30)*(1-u)};}),
 cust(T.POP+1.0,T.WET-0.6,function(t){return {p:DB,yaw:-1.0,pose:'party'};}),
 mv(T.WET-0.6,T.WET,[DB,[0.15,1.25]],'drun'),
 cust(T.WET,T.SHK,function(t){return {p:[0.15,1.25],yaw:yawTo([0.15,1.25],WL),pose:'stand',hx:-0.2,tailA:0.2};}),
 cust(T.SHK,T.SHK+1.0,function(t,u){return {p:[0.15,1.25],yaw:yawTo([0.15,1.25],WL),pose:'stand',roll:0.7*Math.sin(t*30)*(1-u),hz:0.5*Math.sin(t*30)*(1-u)};}),
 mv(T.SHK+1.0,26.6,[[0.15,1.25],[1.1,2.4],PLAY],'dwalk'),turnTo(26.6,26.9,PLAY,PI/2,yawTo(PLAY,DRY),'sit'),hold(26.9,28.2,PLAY,yawTo(PLAY,DRY),'sit'),
 mv(28.2,T.GRAB,[PLAY,[1.3,1.25]],'dwalk'),
 cust(T.GRAB,T.RUN,function(t,u){return {p:[1.3,1.25],yaw:yawTo([1.3,1.25],DRY),pose:'stand',pitch:-0.15};}),
 mv(T.RUN,T.RUNE,[[1.3,1.25]].concat(R1),'drun',{tailF:36}),
 cust(T.RUNE,T.SHINE,function(t){return {p:PLAY,yaw:-PI/2+0.4*Math.sin(t*3),pose:'party'};}),
 hold(T.SHINE,T.IN,PLAY,yawTo(PLAY,CAR0),'sit'),
 mv(T.IN,T.DIN,[PLAY,[2.9,1.0],[1.25,0.35]],'drun'),
 cust(T.DIN,T.DIN+0.6,function(t,u){return {p:L2([1.25,0.35],[0,CAR0[1]+0.55],u),yaw:-PI/2,pose:'stand',y:0.8*S(u,0.5,1)+0.8*4*u*(1-u),legs:[-0.9,-0.9,0.9,0.9]};}),
 cust(T.DIN+0.6,END+2,function(t){var c=carP(t);var yy=lerpAng(-PI/2,0,S(t,T.DIN+0.6,T.DIN+1.0));
  return {p:[c[0],c[1]+0.55],yaw:yy,pose:t>=T.YAY?'party':'stand',y:0.8,tailF:30};})];
// ----- objetos -----
var CAR=new THREE.Group();scene.add(CAR);var WH=[];
(function(){var R=0xe0484f;var body=box(1.1,0.42,2.2,R);body.position.y=0.46;CAR.add(body);
 var hood=box(1.0,0.14,0.8,0xc23a42);hood.position.set(0,0.72,0.62);CAR.add(hood);var hs=new THREE.Group();hs.position.set(0,0.79,0.62);studs(hs,2,2,0,0xc23a42,0,0,0.4);CAR.add(hs);
 var seat=box(0.9,0.12,0.5,0x2a323d);seat.position.set(0,0.7,-0.25);CAR.add(seat);var sb=box(0.9,0.5,0.12,0x2a323d);sb.position.set(0,0.95,-0.5);CAR.add(sb);
 var ws=new THREE.Mesh(new THREE.BoxGeometry(0.95,0.36,0.06),new THREE.MeshStandardMaterial({color:0xa9d4f0,transparent:true,opacity:0.6}));ws.position.set(0,1.0,0.22);ws.rotation.x=-0.25;CAR.add(ws);
 var bk=box(0.9,0.2,0.35,0xc23a42);bk.position.set(0,0.72,-0.85);CAR.add(bk);
 [-0.32,0.32].forEach(function(x){var l=box(0.22,0.14,0.05,0xfff3a0);l.position.set(x,0.5,1.11);CAR.add(l);});
 var gr=box(0.5,0.1,0.05,0x9aa3ad);gr.position.set(0,0.38,1.11);CAR.add(gr);
 var sw=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.04,8,18),mat(0x2a323d));sw.position.set(0,0.98,0.05);sw.rotation.x=-0.9;CAR.add(sw);
 [[-0.6,0.7],[0.6,0.7],[-0.6,-0.7],[0.6,-0.7]].forEach(function(p){var w=new THREE.Group();w.position.set(p[0],0.28,p[1]);CAR.add(w);
  var c=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.28,0.18,16),mat(0x2a2f36));c.rotation.z=PI/2;c.castShadow=true;w.add(c);var hb=box(0.2,0.12,0.12,0xcfd6dd);w.add(hb);WH.push(w);});})();
// lama (local do carro)
var MUD=[];[[0,0.8,0.55,0.4,0.25,'t'],[-0.25,0.8,0.8,0.25,0.18,'t'],[0.3,0.8,0.35,0.22,0.2,'t'],[-0.56,0.5,0.4,0.35,0.22,'l'],[-0.56,0.4,-0.5,0.4,0.25,'l'],[0.56,0.48,0.2,0.4,0.25,'r'],[0.56,0.42,-0.7,0.3,0.2,'r'],
 [-0.2,0.45,1.12,0.25,0.18,'f'],[0.3,0.62,1.12,0.2,0.12,'f'],[0.15,0.7,-0.85,0.3,0.15,'t']].forEach(function(m){var g=m[5];
 var b=g==='t'?box(m[3],0.03,m[4],0x7a4a26):g==='f'?box(m[3],m[4],0.03,0x7a4a26):box(0.03,m[4],m[3],0x7a4a26);b.position.set(m[0],m[1],m[2]);b.castShadow=false;CAR.add(b);MUD.push(b);});
// espuma no carro
var FOAM=[],fm=new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.6});
for(var i=0;i<16;i++){var s_=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),fm);var a=i*2.399,side=i%4;
 var px=side===0?-0.58:side===1?0.58:(Math.sin(a)*0.4),py=side<2?0.55+0.15*Math.cos(a):0.82,pz=side<2?-0.9+((i*0.37)%1.8):(side===2?0.2+((i*0.29)%0.8):-0.9+((i*0.23)%0.5));
 s_.position.set(px,py,pz);s_.userData.r=0.12+0.08*((i*7)%5)/4;s_.castShadow=false;CAR.add(s_);FOAM.push(s_);}
// espuma no Pipoca e chapéus
var DFOAM=[];for(var i=0;i<11;i++){var s_=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),fm);s_.castShadow=false;scene.add(s_);DFOAM.push(s_);}
var CAPS={};Object.keys(KIDS).forEach(function(n){var g=new THREE.Group();g.position.set(0,1.1,0);KIDS[n].head.add(g);
 [[0,0,0,0.38],[0.25,-0.05,0.1,0.25],[-0.25,-0.05,-0.05,0.26],[0,0.22,0,0.24]].forEach(function(q){var m=new THREE.Mesh(new THREE.SphereGeometry(q[3],10,8),fm);m.position.set(q[0],q[1],q[2]);g.add(m);});CAPS[n]=g;});
// água
var WAT=[],wm=new THREE.MeshBasicMaterial({color:0x6ec6ff,transparent:true,opacity:0.85});
for(var i=0;i<34;i++){var m_=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.08,0.08),wm);scene.add(m_);WAT.push(m_);}
var NOZ=box(0.12,0.12,0.3,0x34a853);scene.add(NOZ);var HOSE=box(0.07,0.07,1,0x2f9e5b);HOSE.castShadow=false;scene.add(HOSE);
var SPG=[box(0.24,0.16,0.18,0xffd166),box(0.24,0.16,0.18,0x7aa7ff)];SPG.forEach(function(m){scene.add(m);});
var TOW=box(0.7,0.04,0.45,0xff8fb0);scene.add(TOW);
var BUCK=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.22,0.45,16),mat(0x4a8bf0));BUCK.position.set(-2.75,0.23,0.5);BUCK.castShadow=true;scene.add(BUCK);
(function(){var w=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,0.04,16),new THREE.MeshBasicMaterial({color:0xffffff}));w.position.set(-2.75,0.44,0.5);scene.add(w);})();
var SPK=[];for(var i=0;i<14;i++){var s2=box(0.1,0.1,0.1,0xfff3a0);s2.material=new THREE.MeshBasicMaterial({color:0xfff7c0});s2.castShadow=false;scene.add(s2);SPK.push(s2);}
function sprayTgt(t){if(t<T.SPRE)return V(0.25*Math.sin(t*2),0.8,0.7+0.2*Math.sin(t*3));
 if(t<T.RINE){var u=lin(t,T.RIN,T.RINE);return V(-0.5+1.0*Math.abs(Math.sin(u*PI*2)),0.7,0.9-1.8*u);}
 var d=dogState(t).p;return V(d[0],0.6,d[1]);}
function arcV(a,b,u,h){return V(lerp(a.x,b.x,u),lerp(a.y,b.y,u)+h*4*u*(1-u),lerp(a.z,b.z,u));}
var _q=new THREE.Vector3();
EXTRA=function(t){var c=carP(t);CAR.position.set(c[0],0,c[1]);var wr=(carZ(t)-CAR0[1])/0.28;WH.forEach(function(w){w.rotation.x=wr;});
 // lama: lavagem
 var wash=0.35*lin(t,T.SPR,T.SPRE)+0.65*lin(t,T.RIN,T.RINE);MUD.forEach(function(m,i){m.scale.setScalar(Math.max(0.001,1-clamp(wash*1.15-((i%3)*0.05),0,1)));});
 var fg=S(t,T.SC,T.SCE-1)*(1-S(t,T.RIN+((0)),T.RINE));
 FOAM.forEach(function(m,i){var r=m.userData.r*fg*(1+0.08*Math.sin(t*3+i));m.visible=r>0.005;m.scale.setScalar(Math.max(0.001,r));});
 // espuma do Pipoca
 var dp=dog.root.position;var dv=t>=T.JMP+0.4&&t<T.POP+0.8;
 DFOAM.forEach(function(m,i){m.visible=false;if(!dv)return;var a=i*2.399,r=0.3,g=S(t,T.JMP+0.4,T.JMP+0.8);var base=V(dp.x+Math.cos(a)*r*0.8,0.45+0.25*Math.sin(i*1.7),dp.z+Math.sin(a)*r);
  if(t<T.POP){m.position.copy(base);m.scale.setScalar(Math.max(0.001,(0.2+0.04*(i%3))*g));m.visible=true;}
  else{var u=lin(t,T.POP,T.POP+0.8);if(i<4){var n=['leo','bia','teo','duda'][i];CAPS[n].getWorldPosition(_q);m.position.copy(arcV(base,_q,u,1.5));m.scale.setScalar(0.2);m.visible=u<1;}
   else{m.position.set(base.x+Math.cos(a)*u*2,base.y+2*u-3*u*u,base.z+Math.sin(a)*u*2);m.scale.setScalar(Math.max(0.001,0.2*(1-u)));m.visible=true;}}});
 Object.keys(CAPS).forEach(function(n){var on=t>=T.POP+0.8&&t<T.SHINE+0.4;CAPS[n].visible=on;CAPS[n].scale.setScalar(on?Math.max(0.001,back(lin(t,T.POP+0.7,T.POP+1.0))*(1-S(t,T.SHINE,T.SHINE+0.4))):0.001);});
 // mangueira e água
 var hn=hand('leo',1);NOZ.position.copy(hn);NOZ.lookAt(sprayTgt(t));NOZ.visible=t>=T.ARR-0.3&&t<T.FIM;
 var hb=V(-2.75,0.5,0.5);HOSE.visible=NOZ.visible;HOSE.position.copy(hb.clone().add(hn).multiplyScalar(0.5));HOSE.lookAt(hn);HOSE.scale.set(1,1,Math.max(0.01,hb.distanceTo(hn)));
 var sp=(t>=T.SPR&&t<T.SPRE)||(t>=T.RIN&&t<T.RINE)||(t>=T.WET&&t<T.SHK),tg=sprayTgt(t);
 WAT.forEach(function(m,i){m.visible=false;
  if(sp){var u=((t*2.4+i/34)%1);m.position.copy(arcV(hn,tg.clone().add(V(0.06*Math.sin(i),0,0.06*Math.cos(i))),u,0.5));m.visible=true;m.scale.setScalar(1);}
  else if(t>=T.SHK&&t<T.SHK+1.0){var u2=lin(t,T.SHK,T.SHK+1.0),a=i*2.399;var from=V(dp.x,0.55,dp.z),to=V(WL[0]+0.3*Math.cos(a),1.6+0.4*Math.sin(a*1.3),WL[1]+0.2*Math.sin(a));
   var ui=clamp(u2*1.6-(i%6)*0.1,0,1);if(ui>0&&ui<1){m.position.copy(arcV(from,to,ui,0.8));m.visible=true;}}});
 // esponjas
 [['bia',0],['teo',1]].forEach(function(q){var on=t>=T.ARR&&t<T.RIN;SPG[q[1]].visible=on;if(on){SPG[q[1]].position.copy(hand(q[0],1));SPG[q[1]].rotation.y=KIDS[q[0]].root.rotation.y;}});
 // toalha
 TOW.visible=t>=T.DRY&&t<T.SHINE+2;
 if(t<T.GRAB){var hh=hands('duda');TOW.position.set(hh.x,hh.y-0.05,hh.z);TOW.rotation.set(0,KIDS.duda.root.rotation.y,0.1*Math.sin(t*7));}
 else if(t<T.RUNE){dog.head.updateMatrixWorld(true);var mp=dog.head.localToWorld(V(0,-0.12,0.42));TOW.position.copy(mp);TOW.rotation.set(0.6*Math.sin(t*14),dog.root.rotation.y,0.5*Math.sin(t*9));}
 else{TOW.position.set(PLAY[0],0.13,PLAY[1]);TOW.rotation.set(0,0.4,0);}
 // brilho
 SPK.forEach(function(m,i){var on=t>=T.SHINE&&t<T.DRVE;m.visible=on;if(!on)return;var a=i*2.399;var ph=(t*1.3+i*0.31)%1;
  m.position.set(c[0]+Math.sin(a)*0.65,0.6+0.7*ph,c[1]+Math.cos(a)*1.2);m.scale.setScalar(Math.max(0.001,Math.sin(ph*PI)*1.3));m.rotation.z=t*5+i;});
};
BURST=[[T.YAY,[0,1.0],2.2],[T.ROW,[0,0.6],2.4],[T.ROW+2.8,[0,0.6],2.4]];
BW=[['Meu carrinho tá todo sujo!',3.1,4.9,kp('teo',2.9,-0.6),1],['Lava-jato aberto!',5.0,6.8,kp('duda',2.9,-0.5),1],['Cadê o Pipoca?',13.2,15.0,kp('bia',2.9,0.4),1],
 ['Espuma pra todo lado!',16.8,18.8,kp('teo',3.2,-0.5),1],['Ei, quem molha sou eu!',24.6,26.4,kp('leo',2.9,0.8),1],['Volta aqui, Pipoca!',29.0,30.8,kp('duda',2.9,-0.6),1],
 ['Brilhando de novo!',33.0,34.8,kp('teo',3.1,-0.5),1],['Bi-bi! Tá novinho!',38.0,39.8,kp('teo',2.6,0.3),1],['Carro limpinho, turma feliz!',50.4,54.8,kp('bia',2.9,-1.4),1]];
var EXP=[[0,-1.9],[0,2.0]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||46,m||0.12,EXP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(-30,0,ez(lin(t,0,T.ARR))),lerp(42,30,ez(lin(t,0,T.ARR))),48,0.12,EXP);}],
 [T.ARR,T.SPR,A_(0,30)],
 [T.SPR,T.DOG,function(t){return frameOn(ALL,lerp(-16,10,lin(t,T.SPR,T.DOG)),30,46,0.12,EXP);}],
 [T.DOG,T.LGH,A_(-10,28)],
 [T.LGH,T.RIN,A_(0,32)],
 [T.RIN,T.WET,function(t){return frameOn(ALL,lerp(-12,8,lin(t,T.RIN,T.WET)),28,46,0.12,EXP);}],
 [T.WET,T.DRY,A_(-16,24)],
 [T.DRY,T.SHINE,function(t){return frameOn(ALL,lerp(8,22,lin(t,T.DRY,T.SHINE)),30,46,0.12,EXP);}],
 [T.SHINE,T.DRV,A_(0,26)],
 [T.DRV,T.FIM,function(t){return frameOn(ALL,lerp(-10,6,lin(t,T.DRV,T.FIM)),24,46,0.12,[[0,-1.9],[0,2.4]]);}],
 [T.FIM,T.ROW,function(t){return mixCam(frameOn(ALL,0,24,46,0.12,[[0,-1.9],[0,2.4]]),frameLow(ALL,0,18,50,0.06,[[0,-0.3],[0,2.2]]),ez(lin(t,T.FIM,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,18,50,0.06,[[0,-0.3],[0,2.2]]);}]];
EV=[[2.9,'bark'],[T.SPR,'water'],[T.SC,'scrub'],[T.DOG,'run'],[T.JMP+0.4,'bubbles'],[13.2,'q'],[T.POP,'shake'],[T.LGH,'laugh'],[T.RIN,'water2'],[T.WET,'water3'],[T.SHK,'shake'],
 [24.8,'laugh'],[T.GRAB,'bark'],[T.RUN,'run2'],[T.SHINE,'shine'],[T.DIN,'jump'],[T.DRV,'drive'],[38.0,'honk'],[T.DRVE,'honk'],[T.YAY,'confetti'],[T.ROW,'confetti2']];
