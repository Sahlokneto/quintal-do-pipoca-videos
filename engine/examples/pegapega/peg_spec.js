// ===== Pega-pega =====
makeBubs([['Eu sou o pegador!',54],['1, 2, 3... já!',66],['Peguei!',96],['Agora sou eu!',62],['Pique! Tô salva!',54],['Volta aqui, Pipoca!',48],
 ['Tô tonta!',80],['Peguei você!',66],['Eu tava no pique!',52],['Pegou todo mundo!',50],['Amanhã eu pego você, Pipoca!',36]]);
radio.visible=false;
var OC=[0,-1.2],RX=1.7,RZ=1.9;
var NTH=2000,ARC=[0];(function(){for(var i=1;i<=NTH;i++){var a=2*PI*(i-1)/NTH,b=2*PI*i/NTH;ARC.push(ARC[i-1]+Math.hypot(RX*(Math.sin(b)-Math.sin(a)),RZ*(Math.cos(b)-Math.cos(a))));}})();
var PER=ARC[NTH];
function thOf(s){s=((s%PER)+PER)%PER;var lo=0,hi=NTH;while(hi-lo>1){var m=(lo+hi)>>1;if(ARC[m]<=s)lo=m;else hi=m;}var w=(s-ARC[lo])/Math.max(1e-9,ARC[hi]-ARC[lo]);return 2*PI*(lo+w)/NTH;}
function sOfTh(th){return ARC[Math.round(((th%(2*PI))+2*PI)%(2*PI)/(2*PI)*NTH)];}
function ptS(s){var th=thOf(s);return [OC[0]+RX*Math.sin(th),OC[1]+RZ*Math.cos(th)];}
function yawS(s){var a=ptS(s-0.05),b=ptS(s+0.05);return Math.atan2(b[0]-a[0],b[1]-a[1]);}
var T={ARR:3.0,CNT:4.6,GO:6.6,TAG:13.0,STOP:13.8,TS:14.2,B:16.0,PIQ:17.2,DIN:18.6,CIR:19.8,DIZ:23.8,SIT:24.5,LICK:26.6,CATCH:27.4,DPAR:28.0,
 CT:28.6,LT:30.4,DT:32.6,LAUGH:34.6,UP:37.4,FIM:38.0,ROWW:38.2,ROW:40.2,WAVE:55.5,END:60};
var END=T.END;
// corrida A: distância percorrida (mesma para todos), o Teo fecha a distância
var V0=2.7;
function dist(t){var a=t-T.GO;if(a<=0)return 0;var acc=0.6;if(t<=T.TAG){return a<acc?V0*a*a/(2*acc):V0*(a-acc/2);}var d0=dist(T.TAG),b=Math.min(t,T.STOP)-T.TAG,dd=T.STOP-T.TAG;return d0+V0*(b-b*b/(2*dd));}
var SB_STOP=sOfTh(PI/3),DTOT=dist(T.STOP),SB0=SB_STOP-DTOT;
function sB(t){return SB0+dist(t);}
var GAP0=1.9,GAP1=0.85;
function gapT(t){return lerp(GAP0,GAP1,S(t,T.GO+0.4,T.TAG));}
var SOFF={bia:0,leo:PER/3,duda:2*PER/3};
function sK(n,t){return n==='teo'?sB(t)-gapT(t):sB(t)+SOFF[n];}
function spd(t){return (dist(t+0.05)-dist(t-0.05))/0.1;}
var TSIDE=[2.5,0.5],CB=[0.2,0.4],DPQ=[-0.75,-0.95],DH=[-2.4,1.2];
var FIN={duda:[-1.95,0.9],bia:[-0.65,0.9],leo:[0.65,0.9],teo:[1.95,0.9]},DF=[0,2.0];
var STY={leo:0,bia:3,teo:2,duda:1};
function runner(n,t0,t1){return cust(t0,t1,function(t){var s=sK(n,t),v=spd(t)*(n==='teo'?1.1:1);var st={p:ptS(s),yaw:yawS(s),pose:v>1.6?'run':v>0.2?'walk':'stand',face:n==='teo'?'focus':'wow'};
 if(v>1.6&&n!=='teo')st.face=(Math.floor(t*2.5+SOFF[n])%2)?'tongue':'wow';
 if(n==='teo'&&t>T.TAG-0.7&&t<T.STOP+0.3){st.A={aRx:-1.6,aRz:0,eR:-0.1};}
 if(n==='bia'&&t>T.TAG&&t<T.STOP+0.4)st.face='wow';
 return st;});}
function fallSit(p,yaw,t0,face){return [cust(t0,t0+0.45,function(t,u){return {p:p,yaw:yaw,pose:'none',y:lerp(0,GROUND_Y,u*u),sit:u,pitch:-0.25*u,face:'wow',A:{aLx:-2.6,aRx:-2.6,aLz:-0.5,aRz:0.5}};}),
 cust(t0+0.45,T.UP,function(t){return {p:p,yaw:yaw,pose:'sitg',face:'tongue',y:0.03*Math.abs(Math.sin(t*12)),A:{aLx:-1.0,aRx:-1.0,eL:-1.1,eR:-1.1}};}),
 cust(T.UP,T.UP+0.6,function(t,u){return {p:p,yaw:yaw,pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.7)),sit:1-S(u,0,0.7),face:'happy'};})];}
function dogP(t){return dogState(t).p;}
function scared(p,t0,t1,y0){return cust(t0,t1,function(t){return {p:p,yaw:lerpAng(y0,yawTo(p,dogP(t)),S(t,t0,t0+0.3)),pose:'none',face:'wow',A:{aLx:-2.7,aRx:-2.7,aLz:-0.4,aRz:0.4},y:0.08*Math.abs(Math.sin(t*14))};});}
function watch(p,t0,t1,o){return cust(t0,t1,function(t){var tg=t<T.DIN?stateOf('bia',t).p:dogP(t);var s={p:p,yaw:yawTo(p,tg),pose:'look',face:'happy'};
 if(t>T.SIT&&t<T.LICK)s.pose='laugh',s.face='tongue';if(o)ext(s,o,t,0);return s;});}
// ----- crianças -----
(function(){var st={leo:[-4.4,-4.6],bia:[4.6,-3.0],teo:[4.6,1.4],duda:[-4.6,1.0]};
 Object.keys(KIDS).forEach(function(n){var p=ptS(sK(n,T.GO));TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.7,[st[n],p],'run',{face:'happy'}),turnTo(2.7,T.ARR,p,yawTo(st[n],p),yawTo(p,[0,0.5]),'stand',{face:'happy'})];});
 var pT=ptS(sK('teo',T.GO));
 TL.teo=TL.teo.concat([hold(T.ARR,T.CNT,pT,yawTo(pT,[0,0.5]),'none',function(t){return {face:'happy',A:{aRx:-2.8,aRz:0.2,eR:-0.2,aLx:-0.3}};}),
  cust(T.CNT,T.GO-0.3,function(t){return {p:pT,yaw:lerpAng(yawTo(pT,[0,0.5]),yawTo(pT,OC)+PI,S(t,T.CNT,T.CNT+0.4)),pose:'none',face:'hide',A:{aLx:-2.2,aRx:-2.2,aLz:0.55,aRz:-0.55,eL:-1.9,eR:-1.9,hx:0.2}};}),
  turnTo(T.GO-0.3,T.GO,pT,yawTo(pT,OC)+PI,yawS(sK('teo',T.GO)),'stand',{face:'focus'}),runner('teo',T.GO,T.STOP+0.4)]);
 ['bia','leo','duda'].forEach(function(n){var p=ptS(sK(n,T.GO));TL[n]=TL[n].concat([hold(T.ARR,T.CNT,p,yawTo(p,[0,0.5]),'look',{face:'happy'}),
  cust(T.CNT,T.GO-0.3,function(t){return {p:p,yaw:yawTo(p,[0,0.5]),pose:'none',face:'wow',A:{aLx:-2.6,aRx:-2.6,aLz:-0.3,aRz:0.3},y:0.1*Math.abs(Math.sin(t*10))};}),
  turnTo(T.GO-0.3,T.GO,p,yawTo(p,[0,0.5]),yawS(sK(n,T.GO)),'stand',{face:'wow'}),runner(n,T.GO,T.STOP+0.4)]);});
 var pB=ptS(sK('bia',T.STOP)),pL=ptS(sK('leo',T.STOP)),pD=ptS(sK('duda',T.STOP)),pT2=ptS(sK('teo',T.STOP));
 // TEO: comemora e vai para a lateral
 TL.teo=TL.teo.concat([hold(T.STOP+0.4,T.TS,pT2,yawS(sK('teo',T.STOP)),'cheer',{face:'happy'}),mv(T.TS,15.6,[pT2,[1.6,1.0],TSIDE],'walk',{face:'happy'}),
  turnTo(15.6,15.9,TSIDE,yawTo([1.6,1.0],TSIDE),yawTo(TSIDE,CB),'stand'),watch(TSIDE,15.9,28.4),scared(TSIDE,28.4,30.0,yawTo(TSIDE,CB))].concat(fallSit(TSIDE,yawTo(TSIDE,[1.9,0.75]),30.0)));
 // BIA
 TL.bia=TL.bia.concat([cust(T.STOP+0.4,T.B,function(t){var y0=yawS(sK('bia',T.STOP));return {p:pB,yaw:lerpAng(y0,yawTo(pB,pD),S(t,14.3,14.8)),pose:t>14.4&&t<15.8?'none':'stand',face:'focus',A:t>14.4&&t<15.8?{aRx:-2.8,aRz:0.2,eR:-0.1}:null};}),
  mv(T.B,17.4,[pB,CB],'run',{face:'focus'}),
  cust(17.4,T.DIN+0.6,function(t){return {p:CB,yaw:yawTo(CB,DPQ),pose:'none',face:'focus',y:0.06*Math.abs(Math.sin(t*10)),A:{aLx:-0.2,aRx:-0.2,aLz:-0.3,aRz:0.3,eL:-1.6,eR:-1.6,lL:-0.4*Math.max(0,Math.sin(t*10)),lR:-0.4*Math.max(0,-Math.sin(t*10))}};}),
  cust(T.DIN+0.6,T.DIZ,function(t){var d=dogP(t);return {p:CB,yaw:yawTo(CB,d),pose:'none',face:t>20.2&&t<21.8?'focus':'wow',A:{aLx:-1.5,aRx:-1.5,aLz:0.1,aRz:-0.1,eL:-0.2,eR:-0.2}};}),
  cust(T.DIZ,T.SIT,function(t,u){var y0=yawTo(CB,dogP(T.DIZ));return {p:CB,yaw:lerpAng(y0,0,u),pose:'none',roll:0.25*Math.sin(t*9),pitch:0.1*Math.sin(t*7),face:'wow',A:{aLx:-0.5,aRx:-0.5,aLz:-1.0,aRz:1.0}};}),
  cust(T.SIT,T.SIT+0.45,function(t,u){return {p:CB,yaw:0,pose:'none',y:lerp(0,GROUND_Y,u*u),sit:u,face:'wow',roll:0.15*(1-u)};}),
  cust(T.SIT+0.45,T.UP,function(t){var s={p:CB,yaw:0,pose:'sitg',face:'tongue',A:{aLx:-1.0,aRx:-1.0,eL:-1.1,eR:-1.1},hy:0};
   if(t<T.LICK)s.roll=0.08*Math.sin(t*5);
   if(t>T.LICK+0.3&&t<T.CATCH+0.6){s.face='happy';s.A={aRx:-1.4,eR:-0.1,aLx:-0.5,eL:-0.6};}
   return s;}),
  cust(T.UP,T.UP+0.6,function(t,u){return {p:CB,yaw:0,pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.7)),sit:1-S(u,0,0.7),face:'happy'};})]);
 // DUDA: corre para o pique
 TL.duda=TL.duda.concat([cust(T.STOP+0.4,T.B,function(t){return {p:pD,yaw:lerpAng(yawS(sK('duda',T.STOP)),yawTo(pD,pB),S(t,14.4,14.8)),pose:'look',face:t>14.4?'wow':'happy'};}),
  mv(T.B,T.PIQ,[pD,DPQ],'run',{face:'wow'}),
  cust(T.PIQ,32.6,function(t){var s={p:DPQ,yaw:yawTo(DPQ,OC),pose:'none',face:'happy',A:{aRx:-1.0,aRz:0.0,eR:-0.2}};if(t>T.PIQ+1.8){s.yaw=yawTo(DPQ,t<T.DIN?CB:dogP(t));s.pose='look';s.A=null;}
   if(t>T.SIT&&t<T.LICK){s.pose='laugh';s.face='tongue';}return s;}),
  cust(32.6,33.8,function(t){return {p:DPQ,yaw:yawTo(DPQ,dogP(t)),pose:'none',face:'focus',A:{aLx:-0.3,aRx:-1.0,eR:-0.2,aLz:-0.6,eL:-1.8}};}),
  scared(DPQ,33.8,34.2,yawTo(DPQ,[-1.0,-1.6]))].concat(fallSit(DPQ,yawTo(DPQ,[-1.0,-1.6]),34.2)));
 // LÉO: fica no fundo
 TL.leo=TL.leo.concat([cust(T.STOP+0.4,30.6,function(t){var tg=t<T.B?pB:(t<T.DIN?stateOf('bia',t).p:dogP(t));var s={p:pL,yaw:lerpAng(yawS(sK('leo',T.STOP)),yawTo(pL,tg),S(t,T.STOP+0.4,T.STOP+0.8)),pose:'look',face:'happy'};
   if(t>T.SIT&&t<T.LICK){s.pose='laugh';s.face='tongue';}if(t>T.PIQ&&t<T.PIQ+1.4)s.pose='clap';return s;}),
  scared(pL,30.6,32.2,yawTo(pL,[0.6,-2.8]))].concat(fallSit(pL,yawTo(pL,[0.6,-2.8]),32.2)));
 // levantam e vão para a fila
 var FROM={teo:TSIDE,bia:CB,duda:DPQ,leo:pL},VIA={leo:[[1.3,-1.6]],teo:[],bia:[],duda:[]};
 Object.keys(KIDS).forEach(function(n){var pts=[FROM[n]].concat(VIA[n]).concat([FIN[n]]);
  TL[n].push(hold(T.UP+0.6,T.ROWW,FROM[n],yawTo(FROM[n],pts[1]),'cheer',{face:'happy'}));
  TL[n].push(mv(T.ROWW,T.ROW-0.3,pts,'walk',{face:'happy'}));
  TL[n].push(turnTo(T.ROW-0.3,T.ROW,FIN[n],yawTo(pts[pts.length-2],FIN[n]),0,'stand',{face:'happy'}));
  TL[n].push(cust(T.ROW,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}));
  TL[n].push(cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
 window._pL=pL;
})();
// ----- Pipoca -----
var DS0=[-4.4,2.6],DC0=[CB[0]-0.85,CB[1]],DLK=[CB[0],CB[1]+0.65];
var CT1=[1.9,0.75],LT1=[0.6,-2.6],DT1=[-1.05,-1.6];
function lick(p,yaw,t0,t1){return cust(t0,t1,function(t,u){return {p:p,yaw:yaw,pose:'hind',lift:S(u,0,0.25)*(1-S(u,0.8,1)),hx:0.6+0.25*Math.sin(t*18),tailF:40,tailA:1.1};});}
var pLx=null;
DG=[hold(0,0.4,DS0,yawTo(DS0,DH),'stand'),mv(0.4,2.8,[DS0,DH],'drun'),turnTo(2.8,3.1,DH,yawTo(DS0,DH),yawTo(DH,OC),'sit'),
 cust(3.1,T.DIN,function(t){var s={p:DH,yaw:yawTo(DH,OC),pose:'sit'};if(t>T.GO&&t<T.STOP)s.pose='bark';if(t>T.PIQ&&t<T.PIQ+1.0)s.pose='bark';return s;}),
 mv(T.DIN,T.CIR-0.3,[DH,DC0],'drun'),hold(T.CIR-0.3,T.CIR,DC0,yawTo(DH,DC0),'bark'),
 cust(T.CIR,T.DIZ,function(t,u){var f=-PI/2-2*PI*3*u;var p=[CB[0]+0.85*Math.sin(f),CB[1]+0.85*Math.cos(f)];return {p:p,yaw:f-PI/2,pose:'drun',tailF:40,tailA:1.1};}),
 cust(T.DIZ,26.0,function(t){var p=DC0;var s={p:p,yaw:yawTo(p,CB),pose:'party'};if(t>T.SIT+0.3)s.pose='bark';return s;}),
 mv(26.0,T.LICK,[DC0,[-0.5,1.1],DLK],'dwalk'),lick(DLK,PI,T.LICK,T.CATCH),
 cust(T.CATCH,T.CT,function(t){return {p:DLK,yaw:PI,pose:t<T.DPAR?'stand':'party',tailF:40};}),
 mv(T.CT,29.6,[DLK,CT1],'drun'),lick(CT1,yawTo(CT1,TSIDE),29.6,30.4),
 mv(30.4,31.8,[CT1,[1.4,-1.6],LT1],'drun'),cust(31.8,32.6,function(t,u){var y=yawTo(LT1,[0,-3.1]);return {p:LT1,yaw:y,pose:'hind',lift:S(u,0,0.25)*(1-S(u,0.8,1)),hx:0.6+0.25*Math.sin(t*18),tailF:40,tailA:1.1};}),
 mv(32.6,33.8,[LT1,DT1],'drun'),lick(DT1,yawTo(DT1,DPQ),33.8,34.6),
 cust(34.6,39.0,function(t){return {p:DT1,yaw:yawTo(DT1,DPQ)+0.6*Math.sin(t*3),pose:'party'};}),
 mv(39.0,40.6,[DT1,[0,-0.5],[0,0.0],DF],'drun'),turnTo(40.6,40.9,DF,PI,0,'stand'),hold(40.9,END+2,DF,0,'party')];
// ----- objetos -----
(function(){var g=new THREE.Group();g.position.set(OC[0],0,OC[1]);scene.add(g);
 var c=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.46,0.55,20),mat(0x9b6a3c));c.position.y=0.275;c.castShadow=true;g.add(c);
 var tp=new THREE.Mesh(new THREE.CylinderGeometry(0.43,0.43,0.04,20),mat(0xe3c08a));tp.position.y=0.56;g.add(tp);
 var r=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,0.045,20),mat(0xc99a5e));r.position.y=0.565;g.add(r);
 var fl=box(0.04,0.7,0.04,0x6b4a2f);fl.position.set(0.25,0.9,0);g.add(fl);var fg=box(0.36,0.24,0.03,0xff4f6d);fg.position.set(0.44,1.12,0);g.add(fg);g.flag=fg;window._FLAG=fg;})();
// pista: bolinhas brancas marcando o oval
(function(){for(var i=0;i<28;i++){var p=ptS(PER*i/28);var d=box(0.18,0.03,0.18,0xffffff);d.position.set(p[0],0.1,p[1]);d.castShadow=false;scene.add(d);}})();
// estrela do pegador
var STAR=new THREE.Group();scene.add(STAR);(function(){var a=box(0.42,0.42,0.1,0xffd23f,{emissive:col(0x553300)});a.rotation.z=PI/4;STAR.add(a);var b=box(0.42,0.42,0.1,0xffd23f,{emissive:col(0x553300)});STAR.add(b);})();
function holder(t){if(t<T.TAG+0.2)return 'teo';if(t<T.CATCH)return 'bia';return 'dog';}
var _w=new THREE.Vector3();
function starAt(h,t){if(h==='dog'){var p=dog.root.position;return V(p.x,p.y+1.55,p.z);}var r=KIDS[h].root.position;var top=KIDS[h].head.localToWorld(V(0,1.6,0));return top;}
EXTRA=function(t){STAR.visible=t>T.ARR+0.2;
 var sc=t<T.ARR+0.6?Math.max(0.01,back((t-T.ARR-0.2)/0.4)):1;
 var fl=null;if(t>=T.TAG+0.2&&t<T.TAG+0.8)fl=['teo','bia',(t-T.TAG-0.2)/0.6];if(t>=T.CATCH&&t<T.CATCH+0.6)fl=['bia','dog',(t-T.CATCH)/0.6];
 if(fl){var a=starAt(fl[0],t),b=starAt(fl[1],t),u=ez(fl[2]);var p=a.clone().lerp(b,u);p.y+=1.2*4*u*(1-u);STAR.position.copy(p);}
 else{var h=fl?null:holder(t);STAR.position.copy(starAt(h,t));STAR.position.y+=0.08*Math.sin(t*4);}
 STAR.rotation.set(0,t*3,0);STAR.scale.setScalar(sc*(h==='dog'?1.1:1.5));
 if(window._FLAG)window._FLAG.rotation.y=0.3*Math.sin(t*4);};
var h=null;
BURST=[[T.FIM,[0,-0.6],2.2],[T.ROW,[0,0.2],2.4],[T.ROW+3.0,[0,0.2],2.4]];
BW=[['Eu sou o pegador!',3.0,4.6,kp('teo',2.9,-0.5),1],['1, 2, 3... já!',4.8,6.4,kp('teo',2.9,-0.5),1],['Peguei!',13.0,14.4,kp('teo',2.9,0),1],['Agora sou eu!',14.4,15.9,kp('bia',3.2,-0.4),1],
 ['Pique! Tô salva!',17.2,18.8,kp('duda',2.9,0.3),1],['Volta aqui, Pipoca!',20.2,21.8,kp('bia',3.2,0),1],['Tô tonta!',24.8,26.2,kp('bia',2.6,0),1],['Peguei você!',27.0,28.4,kp('bia',2.6,0),1],
 ['Eu tava no pique!',32.8,34.4,kp('duda',2.9,0.3),1],['Pegou todo mundo!',35.0,36.6,kp('leo',2.3,0),1],['Amanhã eu pego você, Pipoca!',50.6,54.8,kp('duda',2.9,0.6),1]];
var OVAL=[[-1.8,-1.2],[1.8,-1.2],[0,-3.2],[0,0.8]];
function A_(a,e,fov,m,ex){return function(){return frameOn(ALL,a,e,fov||46,m||0.1,ex||OVAL);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(-26,0,ez(lin(t,0,T.ARR))),lerp(42,30,ez(lin(t,0,T.ARR))),48,0.1,OVAL);}],
 [T.ARR,T.GO,A_(0,30)],
 [T.GO,T.TAG-1.0,function(t){return frameOn(ALL,lerp(-10,10,lin(t,T.GO,T.TAG-1)),lerp(34,28,lin(t,T.GO,T.TAG)),46,0.1,OVAL);}],
 [T.TAG-1.0,T.B,A_(14,26)],
 [T.B,T.DIN,A_(-8,30)],
 [T.DIN,T.SIT,function(t){return frameOn(ALL,lerp(-6,8,lin(t,T.DIN,T.SIT)),26,46,0.1,OVAL);}],
 [T.SIT,T.CT,A_(0,24)],
 [T.CT,31.0,A_(16,28)],
 [31.0,T.UP,A_(-10,32)],
 [T.UP,T.ROW,function(t){return mixCam(frameOn(ALL,-6,30,46,0.1,OVAL),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.FIM,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.9,'bark'],[T.ARR+0.2,'star'],[T.CNT+0.3,'c1'],[T.CNT+0.9,'c2'],[T.CNT+1.5,'c3'],[T.GO,'go'],[T.TAG,'tag'],[T.TAG+0.2,'star'],[T.PIQ,'pique'],[T.DIN,'bark'],[T.CIR,'circle'],
 [T.DIZ,'dizzy'],[T.SIT+0.4,'thud'],[T.SIT+0.4,'laugh'],[T.LICK,'lick'],[T.CATCH,'tag'],[T.CATCH,'star'],[T.DPAR,'bark'],[29.6,'lick'],[30.0,'thud'],[31.8,'lick'],[32.2,'thud'],[33.8,'lick'],[34.2,'thud'],[34.6,'laugh'],[35.6,'laugh'],[T.FIM,'confetti']];
var RUNS=[[T.GO,T.STOP],[T.B,T.PIQ],[T.DIN,T.DIZ],[T.CT,34.6]];
