// ===== Cabra-cega =====
makeBubs([['Cabra-cega!',80],['Roda, roda!',80],['Tô tonto!',96],['Achei alguém!',66],['É... uma árvore?',56],['Duda, tá peluda?!',56],['Ui! Lambeu!',80],
 ['Peguei!',100],['Como você sabia?',52],['Você ri alto!',64],['Agora o Pipoca!',60],['Foi o biscoito!',60],['Que narizão!',70],['Pipoca, nariz de ouro!',50]]);
radio.visible=false;
var TREE=[-0.3,-3.0];makeTree(TREE[0],TREE[1],1.2);
var L0=[0,0.6],BT=[-0.85,1.15],B=[-1.6,-0.6],TT=[1.4,-1.1],D=[2.1,1.3],P0=[-1.3,1.6];
var LB=[-0.05,0.7];var LH=[-0.3,-2.15],LP2=[0.4,0.2],PD=[0.95,0.75],TS=[-0.15,-0.5],LC=[0.28,0.05],LS=[-0.7,0.5],T2=[1.6,-0.6],DT=[1.2,-0.1];
var FIN={bia:[-1.4,1.2],leo:[-0.47,1.2],teo:[0.47,1.2],duda:[1.4,1.2]},DFIN=[0,2.3];
var T={ARR:3.4,TIE:4.4,SPIN:5.0,DIZ:7.0,W1:9.0,HUG:12.0,W2:15.8,PAT:18.2,LICK:21.0,SNK:22.6,TAP:25.0,CATCH:25.4,UNM:27.0,PIP:30.6,SN0:32.8,FOUND:35.6,MOVE:40.6,ROW:42.4,END:60};
var END=T.END;
var BLIND={aLx:-1.5,aRx:-1.5,eL:-0.1,eR:-0.1,aLz:0.05,aRz:-0.05};
var STY={leo:0,bia:3,teo:2,duda:1};
function danceO(n){return function(t){var b=t*BPM/60;return {st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};};}
var REACT=[[T.DIZ,8.6,'laugh','tongue'],[13.4,15.6,'laugh','tongue'],[19.0,22.6,'laugh','tongue'],[27.2,30.4,'clap','happy'],[35.8,40.4,'laugh','tongue']];
function leoP(t){return stateOf('leo',t).p;}
function watcher(n,p,t0,t1,tgt){return cust(t0,t1,function(t){var g=tgt?tgt(t):leoP(t);var y=yawTo(p,g);for(var i=0;i<REACT.length;i++){var r=REACT[i];if(t>=r[0]&&t<r[1])return {p:p,yaw:y,pose:r[2],face:r[3]};}
 return {p:p,yaw:y,pose:'stand',face:'happy'};});}
function dogP(t){return dogState(t).p;}
(function(){var st={leo:[-4,4],bia:[-4.5,3],teo:[4.5,-1],duda:[4.5,3.5]};
 // Léo
 TL.leo=[hold(0,0.2,st.leo,yawTo(st.leo,L0),'stand'),mv(0.2,3.0,[st.leo,[-1.5,2.4],L0],'run',{face:'happy'}),turnTo(3.0,3.4,L0,yawTo([-1.5,2.4],L0),0,'stand',{face:'happy'}),
  hold(3.4,T.SPIN,L0,0,'stand',{face:'happy'}),
  cust(T.SPIN,T.DIZ,function(t,u){return {p:L0,yaw:4*PI*ez(u),pose:'none',face:'happy',A:{aLx:-0.3,aRx:-0.3,aLz:-1.2,aRz:1.2,eL:0,eR:0},y:0.04*Math.abs(Math.sin(t*14))};}),
  cust(T.DIZ,8.6,function(t){var q=t-T.DIZ;return {p:[L0[0]+0.12*Math.sin(q*5),L0[1]+0.08*Math.cos(q*5)],yaw:0.5*Math.sin(q*4),pose:'none',face:'wow',roll:0.18*Math.sin(q*6),A:{aLx:-0.6,aRx:-0.6,aLz:-1.0+0.4*Math.sin(q*6),aRz:1.0+0.4*Math.sin(q*6)}};}),
  turnTo(8.6,T.W1,L0,0,PI+yawTo(L0,LH)-PI,'none',{face:'focus',A:BLIND}),
  mv(T.W1,T.HUG,[L0,[0.1,-0.6],LH],'walk',{face:'focus',A:BLIND}),
  cust(T.HUG,13.4,function(t,u){return {p:LH,yaw:PI,pose:'none',face:'happy',A:{aLx:-1.45,aRx:-1.45,aLz:0.55*S(u,0,0.3),aRz:-0.55*S(u,0,0.3),eL:-0.5,eR:-0.5}};}),
  cust(13.4,15.4,function(t){return {p:LH,yaw:PI,pose:'none',face:'wow',A:{aLx:-1.4,aRx:-1.6+0.25*Math.sin(t*10),aLz:0.3,aRz:-0.2,eL:-0.4,eR:-0.4}};}),
  turnTo(15.4,T.W2,LH,PI,yawTo(LH,[0.1,-0.8]),'none',{face:'focus',A:BLIND}),
  mv(T.W2,T.PAT,[LH,[0.15,-0.8],LP2],'walk',{face:'focus',A:BLIND}),
  cust(T.PAT,T.LICK,function(t){var y=yawTo(LP2,PD);return {p:LP2,yaw:y,pose:'none',face:'happy',pitch:0.22,A:{aLx:-0.9+0.12*Math.sin(t*9),aRx:-0.9-0.12*Math.sin(t*9),eL:-0.3,eR:-0.3,aLz:0.15,aRz:-0.15}};}),
  cust(T.LICK,22.6,function(t){var y=yawTo(LP2,PD);return {p:LP2,yaw:y,pose:'none',face:'tongue',pitch:-0.12,A:{aLx:-2.4,aRx:-2.4,aLz:-0.4,aRz:0.4,eL:-0.2,eR:-0.2},y:0.05*Math.abs(Math.sin(t*12))};}),
  hold(22.6,T.TAP,LP2,yawTo(LP2,PD),'none',{face:'focus',A:BLIND}),
  cust(T.TAP,T.CATCH,function(t,u){return {p:LP2,yaw:yawTo(LP2,PD),pose:'none',face:'wow',y:0.12*Math.sin(PI*u),A:{aLx:-2.2,aRx:-2.2,aLz:-0.5,aRz:0.5}};}),
  cust(T.CATCH,26.0,function(t,u){return {p:LP2.map(function(v,i){return lerp(v,LC[i],ez(u));}),yaw:lerpAng(yawTo(LP2,PD),yawTo(LC,TS),ez(Math.min(1,u*2))),pose:'none',face:'happy',A:{aLx:-1.5,aRx:-1.5,aLz:0.45*u,aRz:-0.45*u,eL:-0.4,eR:-0.4}};}),
  mv(26.0,T.UNM,[LC,LB],'walk',{face:'happy',yaw:yawTo(LB,TS)}),
  cust(T.UNM,27.6,function(t,u){return {p:LB,yaw:yawTo(LB,TS),pose:'none',face:'happy',A:{aLx:-2.9*Math.sin(PI*u)-0.2,aRx:-2.9*Math.sin(PI*u)-0.2,eL:-1.4*Math.sin(PI*u),eR:-1.4*Math.sin(PI*u)}};}),
  hold(27.6,29.0,LB,yawTo(LB,TS),'laugh',{face:'tongue'}),hold(29.0,30.4,LB,yawTo(LB,TS),'stand',{face:'happy'}),
  turnTo(30.4,30.8,LB,yawTo(LB,TS),yawTo(LB,LS),'stand'),mv(30.8,32.4,[LB,LS],'walk',{face:'happy',pitch:0.1}),turnTo(32.4,32.8,LS,yawTo(LB,LS),0.6,'stand'),
  watcher('leo',LS,32.8,T.MOVE,dogP),mv(T.MOVE,T.ROW,[LS,FIN.leo],'walk',{face:'happy'})];
 // Bia
 TL.bia=[hold(0,0.2,st.bia,yawTo(st.bia,BT),'stand'),mv(0.2,3.0,[st.bia,BT],'run',{face:'happy'}),turnTo(3.0,3.4,BT,yawTo(st.bia,BT),yawTo(BT,L0),'stand'),
  cust(3.4,T.SPIN,function(t,u){var a=Math.sin(PI*clamp(u*1.2,0,1));return {p:BT,yaw:yawTo(BT,L0),pose:'none',face:'happy',A:{aLx:-2.3*a-0.2,aRx:-2.3*a-0.2,eL:-0.8*a,eR:-0.8*a,aLz:0.2*a,aRz:-0.2*a}};}),
  mv(T.SPIN,6.4,[BT,[-1.7,0.4],B],'walk',{face:'happy'}),turnTo(6.4,6.7,B,PI,yawTo(B,L0),'stand'),watcher('bia',B,6.7,T.MOVE),mv(T.MOVE,T.ROW,[B,FIN.bia],'walk',{face:'happy'})];
 // Teo
 TL.teo=[hold(0,0.2,st.teo,yawTo(st.teo,TT),'stand'),mv(0.2,3.0,[st.teo,TT],'run',{face:'happy'}),turnTo(3.0,3.4,TT,-PI/2,yawTo(TT,L0),'stand'),
  watcher('teo',TT,3.4,T.SNK),
  mv(T.SNK,T.TAP-0.2,[TT,[0.6,-1.3],TS],'walk',{face:'tongue',pitch:0.18,A:{aLx:-0.6,aRx:-0.6,aLz:-0.5,aRz:0.5}}),
  cust(T.TAP-0.2,T.CATCH,function(t,u){return {p:TS,yaw:yawTo(TS,LP2),pose:'none',face:'tongue',A:{aRx:-1.6*Math.sin(PI*u),eR:-0.2,aLx:-0.2}};}),
  hold(T.CATCH,27.2,TS,yawTo(TS,LC),'none',{face:'wow',A:{aLx:-2.6,aRx:-2.6,aLz:-0.4,aRz:0.4}}),
  hold(27.2,29.0,TS,yawTo(TS,LB),'none',{face:'wow',A:{aLx:-0.5,aRx:-0.5,aLz:-0.9,aRz:0.9,eL:-0.8,eR:-0.8}}),hold(29.0,30.6,TS,yawTo(TS,LB),'laugh',{face:'tongue'}),
  turnTo(30.6,30.9,TS,yawTo(TS,LB),yawTo(TS,T2),'stand'),mv(30.9,32.6,[TS,[0.6,-0.95],T2],'walk',{face:'tongue',pitch:0.12}),turnTo(32.6,33.0,T2,yawTo([0.6,-0.95],T2),yawTo(T2,PD),'stand'),
  cust(33.0,T.FOUND,function(t){return {p:T2,yaw:yawTo(T2,dogP(t)),pose:'none',face:'focus',A:{aLx:-0.3,aRx:-0.3,aLz:-0.2,aRz:0.2,hz:0.08*Math.sin(t*4)}};}),
  cust(T.FOUND,37.4,function(t){return {p:T2,yaw:yawTo(T2,DT),pose:'laugh',face:'tongue'};}),
  cust(37.4,T.MOVE,function(t){return {p:T2,yaw:yawTo(T2,dogP(t)),pose:'none',face:'happy',A:{aRx:-1.7,eR:-0.4,aLx:-0.2}};}),
  mv(T.MOVE,T.ROW,[T2,[1.0,0.3],FIN.teo],'walk',{face:'happy'})];
 // Duda
 TL.duda=[hold(0,0.2,st.duda,yawTo(st.duda,D),'stand'),mv(0.2,3.0,[st.duda,D],'run',{face:'happy'}),turnTo(3.0,3.4,D,-PI/2,yawTo(D,L0),'stand'),
  watcher('duda',D,3.4,T.PIP),hold(T.PIP,32.0,D,yawTo(D,PD),'cheer',{face:'happy'}),watcher('duda',D,32.0,T.MOVE,dogP),mv(T.MOVE,T.ROW,[D,FIN.duda],'walk',{face:'happy'})];
 Object.keys(KIDS).forEach(function(n){var pr=n==='leo'?LS:n==='bia'?B:n==='teo'?[1.0,0.3]:D;TL[n].push(turnTo(T.ROW,T.ROW+0.3,FIN[n],yawTo(pr,FIN[n]),0,'stand'),hold(T.ROW+0.3,55.5,FIN[n],0,'dance',danceO(n)),
  cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='teo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var YPD=yawTo(PD,LP2);
DG=[hold(0,0.4,[3,6],yawTo([3,6],P0),'stand'),mv(0.4,3.0,[[3,6],[0.5,3.2],P0],'drun'),turnTo(3.0,3.3,P0,yawTo([0.5,3.2],P0),yawTo(P0,L0),'sit'),
 cust(3.3,14.8,function(t){var s={p:P0,yaw:yawTo(P0,leoP(t)),pose:'sit'};if(t>T.DIZ&&t<8.6)s.pose='party';if(t>13.4&&t<14.8)s.hz=0.3;return s;}),
 mv(14.8,16.8,[P0,[-0.3,1.9],[0.9,1.5],PD],'drun'),turnTo(16.8,17.2,PD,yawTo([0.9,1.5],PD),YPD,'stand'),
 cust(17.2,T.PAT,function(t){return {p:PD,yaw:YPD,pose:'sit',hz:0.3};}),
 cust(T.PAT,T.LICK,function(t){return {p:PD,yaw:YPD,pose:'sit',hx:-0.3,tailF:30,tailA:1.1};}),
 cust(T.LICK,22.2,function(t,u){return {p:PD,yaw:YPD,pose:'hind',lift:S(u,0,0.25)*(1-S(u,0.8,1)),hx:0.5+0.25*Math.sin(t*16),tailF:30,tailA:1.1};}),
 cust(22.2,T.PIP,function(t){return {p:PD,yaw:t<T.CATCH?YPD:yawTo(PD,LB),pose:'sit',tailF:24,hz:t>T.TAP&&t<26?0.3:0};}),
 cust(T.PIP,T.SN0,function(t){return {p:PD,yaw:yawTo(PD,LB),pose:t>31.2?'stand':'sit',tailF:30,tailA:1.0};}),
 mv(T.SN0,T.FOUND-0.2,[PD,[0.45,0.3],[0.7,-0.25],[0.9,0.05],DT],'sniff'),turnTo(T.FOUND-0.2,T.FOUND,DT,yawTo([0.9,0.05],DT),yawTo(DT,T2),'stand'),
 cust(T.FOUND,37.4,function(t,u){return {p:DT,yaw:yawTo(DT,T2),pose:'hind',lift:S(u,0,0.2)*(1-S(u,0.85,1)),wig:1,hx:0.5,tailF:34,tailA:1.2};}),
 cust(37.4,39.8,function(t){return {p:DT,yaw:yawTo(DT,T2),pose:'sit',hx:0.12*Math.sin(t*18),tailF:30,tailA:1.0};}),
 mv(39.8,41.6,[DT,[0.3,-0.2],[0.05,0.6],DFIN],'dwalk'),turnTo(41.6,41.9,DFIN,PI,0,'party'),hold(41.9,END+2,DFIN,0,'party')];
// ----- vendas e biscoito -----
var BF=new THREE.Group();KIDS.leo.head.add(BF);(function(){var b=box(1.02,0.22,0.98,0xe0484f);BF.add(b);var k=box(0.2,0.2,0.12,0xc23a42);k.position.set(0,0,-0.52);BF.add(k);
 var t1=box(0.12,0.3,0.06,0xe0484f);t1.position.set(-0.08,-0.2,-0.53);t1.rotation.z=0.3;BF.add(t1);var t2=t1.clone();t2.position.x=0.08;t2.rotation.z=-0.3;BF.add(t2);})();
var DF=new THREE.Group();dog.head.add(DF);(function(){var b=box(0.47,0.11,0.44,0xe0484f);DF.add(b);var k=box(0.1,0.1,0.06,0xc23a42);k.position.set(0,0,-0.24);DF.add(k);})();DF.position.set(0,0.07,0);
var BIS=new THREE.Group();scene.add(BIS);BIS.visible=false;
(function(){var c=0xd9a05b;var m=box(0.26,0.07,0.08,c);BIS.add(m);[-1,1].forEach(function(s){[-1,1].forEach(function(r){var k=box(0.08,0.07,0.08,c);k.position.set(s*0.15,0,r*0.05);BIS.add(k);});});BIS.scale.setScalar(1.6);})();
var _hp=new THREE.Vector3();function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_hp);return _hp.clone();}
EXTRA=function(t){
 var on=t>=T.TIE&&t<27.6;BF.visible=on;if(on){var sc=back((t-T.TIE)/0.3);var up=S(t,T.UNM+0.15,27.5);BF.position.set(0,0.5+0.8*up,0);BF.scale.setScalar(Math.max(0.001,sc*(1-S(t,27.3,27.6))));}
 var don=t>=31.2&&t<39.8;DF.visible=don;if(don){DF.scale.setScalar(Math.max(0.001,back((t-31.2)/0.3)*(1-S(t,39.5,39.8))));}
 BIS.visible=t>=37.4&&t<T.MOVE;if(BIS.visible){BIS.position.copy(handR('teo'));BIS.position.y+=0.05;BIS.rotation.set(0,0,0.3);}};
BURST=[[T.CATCH+0.1,[0.1,-0.2],1.6],[T.FOUND+0.1,[1.3,-0.4],1.2],[T.ROW,[0,0.8]],[T.ROW+2.4,[0,0.8]]];
BW=[['Cabra-cega!',3.5,4.9,kp('bia',2.6,-0.3),1],['Roda, roda!',5.2,6.6,kp('teo',2.6,-0.4),1],['Tô tonto!',7.1,8.5,kp('leo',2.7),1],['Achei alguém!',12.1,13.3,kp('leo',2.7,0.3),1],
 ['É... uma árvore?',13.5,15.0,kp('leo',2.7,0.3),1],['Duda, tá peluda?!',18.6,20.4,kp('leo',2.7,-0.3),1],['Ui! Lambeu!',21.1,22.4,kp('leo',2.7,-0.4),1],
 ['Peguei!',25.6,26.9,kp('leo',2.7,0.2),1],['Como você sabia?',27.3,28.8,kp('teo',2.7,-0.3),1],['Você ri alto!',29.0,30.4,kp('leo',2.7,0.2),1],
 ['Agora o Pipoca!',T.PIP,32.0,kp('duda',2.7,-0.6),1],['Foi o biscoito!',37.5,38.9,kp('teo',2.7,-0.5),1],['Que narizão!',39.0,40.4,kp('bia',2.7,0.4),1],
 ['Pipoca, nariz de ouro!',51.4,55.0,function(){return [0,2.6,1.2];},1]];
var GP=[[TREE[0],TREE[1]+0.5]];
function A_(a,e,fov,m,x){return function(){return frameOn(ALL,a,e,fov||48,m||0.08,x);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(35,10,ez(lin(t,0,3.2))),lerp(40,26,ez(lin(t,0,3.2))),50,0.1);}],
 [T.ARR,T.SPIN,A_(-10,24,46)],
 [T.SPIN,8.6,A_(12,26,46)],
 [8.6,15.6,A_(18,22,48,0.08,GP)],
 [15.6,22.6,A_(-22,24,46)],
 [22.6,27.0,A_(-34,28,46)],
 [27.0,30.6,A_(-30,26,46)],
 [30.6,35.4,A_(-18,30,48)],
 [35.4,T.MOVE,A_(-30,24,46)],
 [T.MOVE,T.ROW,function(t){return mixCam(frameOn(ALL,-30,24,46,0.08),frameLow(ALL,0,16,50,0.06),ez(lin(t,T.MOVE,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[[T.TIE,'tie'],[T.SPIN,'spin'],[T.DIZ,'dizzy'],[T.W1,'steps'],[T.HUG,'boing'],[13.5,'laugh'],[T.W2,'steps'],[T.PAT,'pat'],[19.0,'laugh'],[T.LICK,'lick'],[T.SNK,'tiptoe'],[T.TAP,'tap'],[T.CATCH,'catch'],
 [T.UNM,'unmask'],[29.0,'laugh'],[T.PIP,'shout'],[31.2,'tie'],[T.SN0,'sniff'],[T.FOUND,'found'],[35.8,'laugh'],[T.ROW,'confetti']];
