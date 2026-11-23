// ===== Passa Anel =====
makeBubs([['Vamos brincar de passa anel?',38],['Léo, cadê o anel?',54],['Tá com o Teo!',70],['Então é a Duda!',62],['Tava com o Pipoca!',52],
 ['Pipoca, fareja o anel!',44],['Que faro, Pipoca!',58],['Pipoca, o detetive do quintal!',36]]);
radio.visible=false;
var SP={leo:[-1.9,-0.1],teo:[-0.65,-0.5],duda:[0.65,-0.5],bia:[0.65,-0.5]},DP=[1.9,-0.1];
function FR(p,d){return [p[0],p[1]+(d||0.75)];}
var BC=[0,1.9],BS=[3.05,0.9],DC=[0,1.5],DS=[-3.05,0.9];
var FIN={leo:[-1.95,0.2],teo:[-0.65,0.4],duda:[0.65,0.4],bia:[1.95,0.2]},DF=[0,1.55];
var T={ARR:3.0,SHOW:3.2,HANDS:5.0,P0:5.6,PDONE:11.6,ASK:12.0,G1:14.0,O1:15.6,G2:17.4,O2:19.0,SNZ:20.4,LAND:21.2,LGH:21.8,FLIP:25.0,
 SW:25.0,DSHOW:26.0,Q0:27.8,QDONE:32.4,CALL:33.8,SN0:35.0,BARK:38.3,OPEN:38.8,YAY:39.3,FIM:41.6,ROW:43.6,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function hands(n){return hand(n,1).add(hand(n,-1)).multiplyScalar(0.5);}
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
var HT={aLx:-1.3,aRx:-1.3,aLz:0.36,aRz:-0.36,eL:-0.35,eR:-0.35};          // mãos juntas
var OP={aLx:-1.15,aRx:-1.15,aLz:-0.55,aRz:0.55,eL:-0.4,eR:-0.4};          // mãos abertas
var SHOWA=function(t){return {aRx:-2.8,aRz:0.15+0.12*Math.sin(t*6),eR:-0.15,aLx:-0.2,eL:-0.3};};
// visitas: [quem passa, alvo, t0, t1]
var VIS=[['bia','leo',6.0,7.2],['bia','teo',7.5,8.7],['bia','duda',9.0,10.2],['bia','dog',10.5,11.6],
 ['duda','leo',28.3,29.5],['duda','teo',29.8,31.0],['duda','bia',31.3,32.4]];
function tgtPos(n){return n==='dog'?DP:SP[n];}
// a quem o resto olha
function focus(t){
 if(t<T.HANDS)return BC;
 if(t<T.PDONE)return stateOf('bia',t).p;
 if(t<T.G1)return t<T.ASK+1.8?BS:SP.leo;
 if(t<T.O1+1.6)return SP.teo; if(t<T.SNZ)return SP.duda;
 if(t<T.FLIP+0.8)return DP;
 if(t<T.QDONE+0.3)return stateOf('duda',t).p;
 if(t<T.SN0)return DS;
 if(t<T.FIM)return dogState(t).p;
 return [0,2];}
// janelas
var LAUGH=[[T.LGH,T.FLIP]],CHEER=[[T.YAY,T.FIM]];
var OPENW={teo:[[T.O1,T.O1+1.7]],duda:[[T.O2,T.O2+1.5]],leo:[[T.OPEN,T.FIM]]};
function rowKid(n,t0,t1,spot,rnd){return cust(t0,t1,function(t){
 var f=focus(t);var b=0,y=yawTo(spot,f);var d=((y-b+PI)%(2*PI)+2*PI)%(2*PI)-PI;
 var s={p:spot,yaw:clamp(d,-1.1,1.1),pose:'none',face:'happy',A:HT};
 // visitas recebidas: inclina um pouquinho
 VIS.forEach(function(v){if(v[1]===n&&t>=v[2]&&t<v[3]){s.face='focus';s.pitch=0.08;s.yaw=0;}});
 if(OPENW[n]&&inW(t,OPENW[n])){s.A=OP;s.yaw=0;s.face=(n==='teo')?'tongue':(n==='duda'?'tongue':'wow');if(n==='leo'&&t>T.OPEN+0.9)s.face='happy';s.y=0.04*Math.abs(Math.sin(t*9));}
 if(inW(t,LAUGH)){s.A=null;s.pose='laugh';s.face='tongue';s.yaw=yawTo(spot,DP);if(n==='leo'&&t<T.LGH+0.8)s.face='wow';}
 if(inW(t,CHEER)&&n!=='leo'){s.A=null;s.pose='cheer';s.face='happy';}
 if(inW(t,CHEER)&&n==='leo'&&t>T.FIM-1.2){s.A=null;s.pose='cheer';s.face='happy';}
 if(s.A===null)delete s.A;
 return s;});}
// quem passa o anel: anda pela frente e se inclina em cada visita
function passer(n,t0,t1,from,vis,to){var cl=[],cur=from,tc=t0;
 vis.forEach(function(v){var tp=FR(tgtPos(v[1]),v[1]==='dog'?0.62:0.72);cl.push(mv(tc,v[2],[cur,tp],'walk',{face:'happy',A:HT}));
  cl.push(cust(v[2],v[3],function(t,u){var a=Math.sin(PI*u);return {p:tp,yaw:PI,pose:'none',pitch:(v[1]==='dog'?0.45:0.22)*a,face:'focus',
   A:{aLx:-1.3-0.25*a,aRx:-1.3-0.25*a,aLz:0.36,aRz:-0.36,eL:-0.35+0.2*a,eR:-0.35+0.2*a}};}));cur=tp;tc=v[3];});
 cl.push(mv(tc,t1,[cur,[cur[0]+(to[0]>cur[0]?0.6:-0.6),cur[1]+0.5],to],'walk',{face:'happy'}));return cl;}
(function(){var st={leo:[-4.6,-3.2],teo:[-1.5,-5.0],duda:[1.5,-5.0],bia:[4.6,3.8]};
 ['leo','teo','duda'].forEach(function(n){var p=SP[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.7,[st[n],p],'run',{face:'happy'}),turnTo(2.7,T.ARR,p,yawTo(st[n],p),0,'stand',{face:'happy'})];});
 TL.bia=[hold(0,0.2,st.bia,yawTo(st.bia,BC),'stand'),mv(0.2,2.7,[st.bia,BC],'run',{face:'happy'}),turnTo(2.7,T.ARR,BC,yawTo(st.bia,BC),0,'stand',{face:'happy'}),
  cust(T.ARR,T.HANDS,function(t){return {p:BC,yaw:0,pose:'none',face:'happy',A:SHOWA(t),y:0.05*Math.abs(Math.sin(t*7))};}),
  turnTo(T.HANDS,T.P0,BC,0,PI,'stand',{face:'happy',A:HT})];
 TL.bia=TL.bia.concat(passer('bia',T.P0,T.PDONE,BC,VIS.slice(0,4),BS));
 // Bia ao lado: pergunta, depois ri
 TL.bia.push(cust(T.PDONE,T.SW,function(t){var f=focus(t);var s={p:BS,yaw:yawTo(BS,f),pose:'stand',face:'happy'};
  if(t>=T.ASK&&t<T.ASK+1.8){s.yaw=yawTo(BS,SP.leo);s.pose='none';s.A={aRx:-1.5,eR:-0.1,aRz:0.1};}
  if(inW(t,LAUGH)){s.pose='laugh';s.face='tongue';s.yaw=yawTo(BS,DP);}
  return s;}));
 // troca: Duda sai para a frente, Bia vai pelo fundo para o lugar dela
 TL.bia.push(mv(T.SW+0.6,27.4,[BS,[2.95,-1.3],[0.65,-1.35],SP.bia],'walk',{face:'happy'}),turnTo(27.4,27.8,SP.bia,PI,0,'stand',{face:'happy',A:HT}),rowKid('bia',27.8,T.FIM,SP.bia));
 // Léo
 TL.leo.push(rowKid('leo',T.ARR,T.ASK+0.6,SP.leo),
  cust(T.ASK+0.6,T.SNZ,function(t){var s={p:SP.leo,yaw:0,pose:'none',face:'focus',A:{aLx:-0.4,aRx:-1.9,eR:-1.6,aRz:0.2,eL:-0.3,hz:0.15*Math.sin(t*3)}};
   if(t>=T.G1&&t<T.O1+1.6){s.yaw=yawTo(SP.leo,SP.teo);s.face='happy';s.A={aRx:-1.55,eR:-0.05,aRz:0.05,aLx:-0.2,eL:-0.3};}
   if(t>=T.O1+1.6&&t<T.G2)s.face='wow';
   if(t>=T.G2&&t<T.O2+1.4){s.yaw=yawTo(SP.leo,SP.duda);s.face='happy';s.A={aRx:-1.55,eR:-0.05,aRz:0.05,aLx:-0.2,eL:-0.3};}
   if(t>=T.O2+1.4){s.face='wow';s.A={aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8};}
   return s;}),
  rowKid('leo',T.SNZ,T.FIM,SP.leo));
 TL.teo.push(rowKid('teo',T.ARR,T.FIM,SP.teo));
 // Duda: fila, depois passa o anel
 TL.duda.push(rowKid('duda',T.ARR,T.SW,SP.duda),mv(T.SW,26.0,[SP.duda,[0.65,0.45],DC],'walk',{face:'happy'}),
  turnTo(26.0,26.3,DC,yawTo([0.65,0.45],DC),0,'stand',{face:'happy'}),
  cust(26.3,27.4,function(t){return {p:DC,yaw:0,pose:'none',face:'happy',A:SHOWA(t),y:0.05*Math.abs(Math.sin(t*7))};}),
  turnTo(27.4,T.Q0,DC,0,PI,'stand',{face:'happy',A:HT}));
 TL.duda=TL.duda.concat(passer('duda',T.Q0,T.QDONE+1.2,DC,VIS.slice(4),DS));
 TL.duda.push(cust(T.QDONE+1.2,T.FIM,function(t){var s={p:DS,yaw:yawTo(DS,focus(t)),pose:'stand',face:'happy'};
  if(t>=T.CALL&&t<T.CALL+1.8){s.pose='none';s.yaw=yawTo(DS,DP);s.A={aRx:-1.5,eR:-0.1,aRz:0.1};}
  if(inW(t,CHEER)){s.pose='cheer';}return s;}));
 // final: fila e dança
 var via={leo:[[-2.0,0.1]],teo:[[-0.65,0.0]],duda:[[-2.3,1.2],[-0.65,1.2],[0.65,0.9]],bia:[[1.9,-0.6],[2.2,0.0]]},from={leo:SP.leo,teo:SP.teo,duda:DS,bia:SP.bia};
 Object.keys(KIDS).forEach(function(n){var t0=T.FIM+0.3,t1=n==='duda'?43.4:43.0;
  TL[n].push(mv(t0,t1,[from[n]].concat(via[n],[FIN[n]]),'walk',{face:'happy'}),turnTo(t1,t1+0.4,FIN[n],PI,0,'stand',{face:'happy'}),
   cust(t1+0.4,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var DST=[4.6,-3.0],SN=[[1.4,0.65],[0.65,0.3],[-0.65,0.25],[-1.85,0.55]];
DG=[hold(0,0.3,DST,yawTo(DST,DP),'stand'),mv(0.3,2.8,[DST,DP],'drun'),turnTo(2.8,3.1,DP,yawTo(DST,DP),0,'sit'),
 cust(3.1,T.SNZ,function(t){var y=yawTo(DP,focus(t));if(t>=10.6&&t<11.5)return {p:DP,yaw:0,pose:'paw',pw:Math.abs(Math.sin(t*5))};
  return {p:DP,yaw:clamp(y,-1.2,1.2),pose:'sit',tailF:t>T.O1&&t<T.SNZ?28:20};}),
 cust(T.SNZ,T.LAND,function(t,u){var k=u<0.3?S(u,0,0.3):1-S(u,0.3,0.6);return {p:DP,yaw:0,pose:'sit',hx:-0.5*k+0.3*S(u,0.3,0.45),y:0.08*k};}),
 cust(T.LAND,T.FLIP,function(t){return {p:DP,yaw:0.25*Math.sin(t*2),pose:'sit',tailF:34,tailA:1.0};}),
 cust(T.FLIP,T.FLIP+0.8,function(t,u){return {p:DP,yaw:0,pose:'sit',hz:0.6*Math.sin(u*PI*4)*(1-u)};}),
 cust(T.FLIP+0.8,T.SN0,function(t){return {p:DP,yaw:clamp(yawTo(DP,focus(t)),-1.3,1.3),pose:'sit'};}),
 mv(T.SN0,35.8,[DP,SN[0],SN[1]],'sniff'),cust(35.8,36.5,function(t){return {p:SN[1],yaw:PI,pose:'stand',hx:-0.35+0.1*Math.sin(t*20)};}),
 mv(36.5,37.1,[SN[1],SN[2]],'sniff'),cust(37.1,37.6,function(t){return {p:SN[2],yaw:PI,pose:'stand',hx:-0.35+0.1*Math.sin(t*20)};}),
 mv(37.6,38.1,[SN[2],SN[3]],'sniff'),turnTo(38.1,T.BARK,SN[3],-PI/2,PI,'stand'),
 hold(T.BARK,T.YAY,SN[3],PI,'bark'),cust(T.YAY,T.FIM,function(t){return {p:SN[3],yaw:PI+0.6,pose:'party'};}),
 mv(T.FIM,42.4,[SN[3],[-1.4,1.3],[-1.3,2.1]],'drun'),hold(42.4,43.4,[-1.3,2.1],0,'party'),mv(43.4,44.4,[[-1.3,2.1],DF],'dwalk'),turnTo(44.4,44.7,DF,PI/2,0,'stand'),hold(44.7,END+2,DF,0,'party')];
// ----- o anel -----
var RG=new THREE.Group();scene.add(RG);
(function(){var tor=new THREE.Mesh(new THREE.TorusGeometry(0.13,0.04,10,28),new THREE.MeshStandardMaterial({color:0xffc83d,metalness:0.6,roughness:0.25,emissive:0x6b4a00}));RG.add(tor);
 var gem=box(0.1,0.1,0.1,0xe0484f);gem.position.y=0.16;gem.rotation.z=PI/4;RG.add(gem);})();
var RN=new THREE.Group();dog.head.add(RN);RN.position.set(0,-0.07,0.3);
(function(){var tor=new THREE.Mesh(new THREE.TorusGeometry(0.15,0.035,10,28),new THREE.MeshStandardMaterial({color:0xffc83d,metalness:0.6,roughness:0.25,emissive:0x6b4a00}));RN.add(tor);
 var gem=box(0.09,0.09,0.09,0xe0484f);gem.position.y=0.17;gem.rotation.z=PI/4;RN.add(gem);})();
var SPK=[];for(var i=0;i<8;i++){var s_=box(0.07,0.07,0.07,0xfff3a0);s_.castShadow=false;s_.material=new THREE.MeshBasicMaterial({color:0xfff3a0});scene.add(s_);SPK.push(s_);}
var _np=new THREE.Vector3();
function noseW(){RN.getWorldPosition(_np);return _np.clone();}
function arc(a,b,u,h){return V(lerp(a.x,b.x,u),lerp(a.y,b.y,u)+h*4*u*(1-u),lerp(a.z,b.z,u));}
EXTRA=function(t){RG.visible=false;RN.visible=false;var sp=null;
 if(t>=T.SHOW&&t<T.HANDS){var h=hand('bia',1);RG.position.set(h.x,h.y+0.22,h.z);RG.rotation.set(0,t*2,0);RG.visible=true;sp=RG.position;}
 if(t>=T.SNZ&&t<T.LAND){var a=noseW().add(V(0,0,0.15)),u=lin(t,T.SNZ,T.LAND);var b=noseW();RG.position.copy(arc(a,b,u,1.0));RG.rotation.set(u*8,u*6,0);RG.visible=true;}
 if(t>=T.LAND&&t<T.FLIP+0.15){RN.visible=true;}
 if(t>=T.FLIP+0.15&&t<26.3){var u2=lin(t,T.FLIP+0.15,T.FLIP+0.9),a2=noseW(),b2=hand('duda',1);RG.position.copy(u2<1?arc(a2,b2,u2,1.2):b2);RG.rotation.set(t*6,t*3,0);RG.visible=true;}
 if(t>=26.3&&t<27.4){var h2=hand('duda',1);RG.position.set(h2.x,h2.y+0.22,h2.z);RG.rotation.set(0,t*2,0);RG.visible=true;sp=RG.position;}
 if(t>=T.OPEN&&t<T.FIM){var h3=hands('leo');var r=S(t,T.OPEN,T.OPEN+0.4);RG.position.set(h3.x,h3.y+0.1+0.35*r,h3.z+0.15);RG.rotation.set(0,t*3,0);RG.scale.setScalar(Math.max(0.01,r*1.2));RG.visible=true;sp=RG.position;}else RG.scale.setScalar(1);
 SPK.forEach(function(m,i){m.visible=!!sp&&!window.NOBUB_X;if(!sp)return;var a=i*0.785+t*2.5,r=0.32+0.08*Math.sin(t*7+i);m.position.set(sp.x+Math.cos(a)*r,sp.y+Math.sin(a)*r,sp.z+0.05);m.rotation.z=t*4+i;m.scale.setScalar(0.6+0.5*Math.abs(Math.sin(t*6+i)));});
};
BURST=[[T.YAY,[-1.2,0.2],2.2],[T.ROW,[0,0.0],2.4],[T.ROW+2.8,[0,0.0],2.4]];
BW=[['Vamos brincar de passa anel?',3.1,4.9,kp('bia',2.9,0.0),1],['Léo, cadê o anel?',12.0,13.8,kp('bia',2.9,-1.3),1],['Tá com o Teo!',14.1,15.7,kp('leo',2.9,1.1),1],
 ['Então é a Duda!',17.4,19.0,kp('leo',2.9,1.1),1],['Tava com o Pipoca!',22.0,23.9,kp('teo',2.9,0.0),1],['Pipoca, fareja o anel!',33.8,35.6,kp('duda',2.9,1.2),1],
 ['Que faro, Pipoca!',39.6,41.4,kp('bia',2.9,-0.3),1],['Pipoca, o detetive do quintal!',50.4,54.8,kp('duda',2.9,0.0),1]];
var EXP=[[0,-1.0],[0,1.5]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||46,m||0.12,EXP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(28,0,ez(lin(t,0,T.ARR))),lerp(40,28,ez(lin(t,0,T.ARR))),48,0.12,EXP);}],
 [T.ARR,T.HANDS,A_(0,34)],
 [T.HANDS,T.PDONE,function(t){return frameOn(ALL,lerp(-18,14,lin(t,T.HANDS,T.PDONE)),30,46,0.12,EXP);}],
 [T.PDONE,T.O1,A_(-10,26)],
 [T.O1,T.SNZ,A_(4,24)],
 [T.SNZ,T.FLIP,A_(-14,16,40,0.08)],
 [T.FLIP,T.Q0,A_(0,28)],
 [T.Q0,T.CALL,function(t){return frameOn(ALL,lerp(-14,10,lin(t,T.Q0,T.CALL)),30,46,0.12,EXP);}],
 [T.CALL,T.BARK,function(t){return frameOn(ALL,lerp(10,-14,lin(t,T.CALL,T.BARK)),24,46,0.12,EXP);}],
 [T.BARK,T.FIM,A_(-18,22)],
 [T.FIM,T.ROW,function(t){return mixCam(frameOn(ALL,-8,24,46,0.12,EXP),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.FIM,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.9,'bark'],[T.SHOW,'ring'],[6.4,'magic'],[7.9,'magic'],[9.4,'magic'],[10.9,'magic'],[T.ASK,'q'],[T.O1,'no'],[T.O2,'no'],[T.SNZ,'sneeze'],[T.LAND,'ring'],[T.LGH,'laugh'],
 [T.FLIP,'whoosh'],[26.3,'ring'],[28.7,'magic'],[30.2,'magic'],[31.7,'magic'],[T.SN0,'sniff'],[T.BARK,'bark'],[T.OPEN,'ring'],[T.YAY,'confetti'],[T.ROW,'confetti2']];
