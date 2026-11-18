// ===== Telefone sem fio =====
makeBubs([['Telefone sem fio!',56],['Pipoca quer bolo!',56],['Pipoca quer... solo?',50],['Pipoca tem um polvo?',50],['O Pipoca tem um POLVO!',44],['?',130],['Era bolo!',90],
 ['Vamos brincar de bola!',46],['Vamos pintar a bola?',48],['Vamos pintar a vovó?',48],['PINTAR A VOVÓ?!',60],['Você é o melhor!',54],['Au au au!',80],['Ele disse: BISCOITO!',46],['Ele sempre diz isso!',48],['Recado: até amanhã!',48]]);
radio.visible=false;
var P={teo:[-1,-1.2],leo:[-0.35,0],bia:[0.35,1.2],duda:[1,2.4]},DS=[1.4,3.4],DT=[-1.95,-0.45];
var FIN={teo:[-1.4,1.6],leo:[-0.47,1.6],bia:[0.47,1.6],duda:[1.4,1.6]},DFIN=[0,2.7];
var T={ARR:3.4,SH1:11.2,DQ:13.0,ERA:15.6,SH2:24.2,LF:26.0,W3:29.6,DW0:31.6,DW1:34.6,AU:35.0,BIS:37.2,TOSS:41.4,CATCH:42.2,MOVE:44.4,ROW:46.0,END:60};
var END=T.END,YD=-0.1;
var WH=[['teo','leo',5.0],['leo','bia',7.0],['bia','duda',9.0],['duda','bia',18.0],['bia','leo',20.0],['leo','teo',22.0],['duda','dog',T.W3]];
var WD=1.6;
function posOf(n,t){return n==='dog'?dogState(t).p:P[n];}
var STY={leo:0,bia:3,teo:2,duda:1};
function danceO(n){return function(t){var b=t*BPM/60;return {st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};};}
function kidGame(n){var p=P[n];return cust(T.ARR,T.MOVE,function(t){
 var s={p:p,yaw:YD,pose:'stand',face:'happy'};
 // ouvindo / esperando a vez
 for(var i=0;i<WH.length;i++){var w=WH[i];
  if(w[0]===n&&t>=w[2]&&t<w[2]+WD){var q=(t-w[2])/WD,to=posOf(w[1],t);var dz=w[1]==='dog'?0.32:0.12;
   return {p:p,yaw:yawTo(p,to),pose:'none',pitch:dz*S(q,0,0.15)*(1-S(q,0.9,1)),face:'happy',A:{aRx:-2.25,eR:-1.55,aRz:-0.35,aLx:-0.3,eL:-0.4,hz:0.1}};}
  if(w[1]===n&&t>=w[2]-0.3&&t<w[2]+WD+0.3){var fr=P[w[0]];return {p:p,yaw:yawTo(p,fr),pose:'none',face:t>w[2]+WD-0.2?'wow':'focus',A:{hz:-0.25,aLx:-0.2,aRx:-0.2}};}
  // pensando antes de passar adiante
  if(w[1]===n&&t>=w[2]+WD+0.3&&i+1<WH.length&&WH[i+1][0]===n&&t<WH[i+1][2]){return {p:p,yaw:yawTo(p,posOf(WH[i+1][1],t)),pose:'look',face:'focus'};}}
 // gritos
 if(n==='duda'&&t>=T.SH1&&t<T.DQ)return {p:p,yaw:YD,pose:'cheer',face:'wow'};
 if(n==='teo'&&t>=T.SH2&&t<T.LF)return {p:p,yaw:YD,pose:'none',face:'wow',A:{aLx:-0.4,aRx:-0.4,aLz:-1.3,aRz:1.3,eL:-0.3,eR:-0.3},y:0.06*Math.abs(Math.sin(t*8))};
 if(t>=T.DQ&&t<T.ERA){var lk=yawTo(p,posOf('dog',t));return {p:p,yaw:lk,pose:t<T.DQ+0.6?'look':'laugh',face:t<T.DQ+0.6?'wow':'tongue'};}
 if(t>=T.ERA&&t<17.4){if(n==='teo')return {p:p,yaw:YD,pose:'none',face:'happy',A:{aRx:-1.7,eR:-0.2,aLx:-0.5,eL:-1.4}};return {p:p,yaw:YD,pose:'laugh',face:'tongue'};}
 if(t>=T.LF&&t<28.8){if(n==='leo'){var u=lin(t,T.LF,T.LF+0.4),v=1-lin(t,28.4,28.8),c=Math.min(u,v);
   return {p:p,yaw:YD,pose:'none',y:lerp(0,GROUND_Y,c)+(c>0.99?0.03*Math.abs(Math.sin(t*13)):0),sit:c,face:'tongue',roll:c>0.99?0.05*Math.sin(t*13):0,pitch:c>0.99?-0.15:0,A:{lL:-PI/2*c,lR:-PI/2*c,aLx:-1.0,aRx:-1.0,eL:-1.1,eR:-1.1}};}
  return {p:p,yaw:YD,pose:'laugh',face:'tongue'};}
 // rodada do Pipoca
 if(t>=T.W3+WD&&t<T.AU){return {p:p,yaw:yawTo(p,posOf('dog',t)),pose:'look',face:'happy'};}
 if(t>=T.AU&&t<T.BIS){if(n==='teo')return {p:p,yaw:yawTo(p,posOf('dog',t)),pose:'none',face:t>36.6?'wow':'focus',A:{hz:-0.3,aLx:-0.2,aRx:-0.2},pitch:0.08};return {p:p,yaw:yawTo(p,posOf('dog',t)),pose:'look',face:'happy'};}
 if(t>=T.BIS&&t<39.0){if(n==='teo')return {p:p,yaw:YD,pose:'cheer',face:'wow'};return {p:p,yaw:YD,pose:'look',face:'happy'};}
 if(t>=39.0&&t<40.6){return {p:p,yaw:YD,pose:'laugh',face:'tongue'};}
 if(t>=40.6&&t<T.CATCH+0.2){if(n==='teo'){var q2=lin(t,T.TOSS-0.3,T.TOSS+0.15);return {p:p,yaw:yawTo(p,DT),pose:'none',face:'happy',A:{aRx:lerp(-0.6,-2.5,q2),eR:-0.3,aLx:-0.2}};}
  return {p:p,yaw:yawTo(p,posOf('dog',t)),pose:'look',face:'wow'};}
 if(t>=T.CATCH+0.2)return {p:p,yaw:YD,pose:n==='teo'?'cheer':'clap',face:'happy'};
 return s;});}
(function(){var st={teo:[-4,-4],leo:[-4.5,0.5],bia:[4.5,0],duda:[4.5,4.5]};
 Object.keys(KIDS).forEach(function(n){var p=P[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,3.0,[st[n],p],'run',{face:'happy'}),turnTo(3.0,T.ARR,p,yawTo(st[n],p),YD,'stand',{face:'happy'}),kidGame(n)];});
 var via={teo:[P.teo,[-1.5,0.3],FIN.teo],leo:[P.leo,FIN.leo],bia:[P.bia,FIN.bia],duda:[P.duda,FIN.duda]};
 Object.keys(KIDS).forEach(function(n){var pts=via[n];TL[n].push(mv(T.MOVE,T.ROW,pts,'walk',{face:'happy'}),turnTo(T.ROW,T.ROW+0.3,FIN[n],yawTo(pts[pts.length-2],FIN[n]),0,'stand'),
  hold(T.ROW+0.3,55.5,FIN[n],0,'dance',danceO(n)),cust(55.5,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='teo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var YS=yawTo(DS,P.duda),YT=yawTo(DT,P.teo);
var DPATH=[DS,[2.3,2.3],[1.7,0.5],[0.9,-0.8],[0,-2.25],[-1.3,-2.2],[-2.1,-1.2],DT];
DG=[hold(0,0.2,[5,6],yawTo([5,6],DS),'stand'),mv(0.2,2.8,[[5,6],DS],'drun'),turnTo(2.8,3.2,DS,yawTo([5,6],DS),YS,'sit'),
 cust(3.2,T.DQ,function(t){var s={p:DS,yaw:YS,pose:'sit',hz:0.15*Math.sin(t*1.3)};if(t>T.SH1+0.2)s.hz=0.35;return s;}),
 cust(T.DQ,T.ERA-0.2,function(t,u){var q=t-T.DQ;return {p:DS,yaw:YS+(q<0.5?0:-2*PI*2*ez(clamp((q-0.5)/1.8,0,1))),pose:q<0.5?'stand':'dwalk',hz:q<0.5?0.3:0,hx:q<0.5?0.2:0};}),
 cust(T.ERA-0.2,T.W3-0.2,function(t){var s={p:DS,yaw:YS,pose:'sit'};if(t>T.LF&&t<28.6){s.pose='party';}if(t>T.SH2&&t<T.LF){s.hz=0.35;}return s;}),
 cust(T.W3-0.2,T.W3+WD+0.2,function(t){return {p:DS,yaw:YS,pose:'sit',hz:-0.3,tailF:30,tailA:1.0};}),
 hold(T.W3+WD+0.2,T.DW0,DS,YS,'party'),
 mv(T.DW0,T.DW1,DPATH,'dwalk'),turnTo(T.DW1,T.AU,DT,yawTo([-2.1,-1.2],DT),YT,'stand'),
 cust(T.AU,36.9,function(t,u){var b=((t-T.AU)*5)%1;return {p:DT,yaw:YT,pose:'hind',lift:S(u,0,0.15)*(1-S(u,0.9,1)),hx:0.6+(b<0.4?0.25:0)};}),
 cust(36.9,T.BIS,function(t){return {p:DT,yaw:YT,pose:'stand'};}),
 cust(T.BIS,39.0,function(t){return {p:DT,yaw:YT,pose:'party'};}),hold(39.0,40.8,DT,YT,'sit',{hz:0.25}),
 cust(40.8,T.CATCH-0.4,function(t,u){return {p:DT,yaw:YT,pose:'hind',lift:S(u,0,0.3),hx:0.4,tailF:30,tailA:1.0};}),
 cust(T.CATCH-0.4,T.CATCH+0.4,function(t,u){return {p:DT,yaw:YT,pose:'hind',lift:1-S(u,0.5,1),hx:0.6*(1-u),y:hopAt(t,T.CATCH-0.4,0.6,0.5)};}),
 cust(T.CATCH+0.4,T.MOVE-1.2,function(t){return {p:DT,yaw:YT,pose:'sit',hx:0.12*Math.sin(t*18),tailF:30,tailA:1.0};}),
 mv(T.MOVE-1.2,T.ROW-0.8,[DT,[-2.4,0.9],[-2.1,2.6],[-1.0,2.9],DFIN],'dwalk'),hold(T.ROW-0.8,END+2,DFIN,0,'party')];
// ----- biscoito -----
var BIS=new THREE.Group();scene.add(BIS);BIS.visible=false;
(function(){var c=0xd9a05b;var m=box(0.26,0.07,0.08,c);BIS.add(m);[-1,1].forEach(function(s){[-1,1].forEach(function(r){var k=box(0.08,0.07,0.08,c);k.position.set(s*0.15,0,r*0.05);BIS.add(k);});});BIS.scale.setScalar(1.4);})();
var _hp=new THREE.Vector3();
function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_hp);return _hp.clone();}
function noseW(){return dog.head.localToWorld(V(0,-0.05,0.36));}
var CA={};function at(key,tq,fn,tnow){if(CA[key])return CA[key].clone();frameState(tq);var v=fn();CA[key]=v.clone();frameState(tnow);return v;}
function frameState(t){Object.keys(KIDS).forEach(function(n){applyKid(KIDS[n],stateOf(n,t),t);});applyDog(t);scene.updateMatrixWorld(true);}
function EXTRAfn(t){BIS.visible=t>=40.6&&t<T.CATCH+0.9;if(!BIS.visible)return;
 if(t<T.TOSS+0.15){BIS.position.copy(handR('teo'));BIS.rotation.set(0,0,0.3);}
 else if(t<T.CATCH){var a=at('h',T.TOSS+0.15,function(){return handR('teo');},t),b=at('n',T.CATCH,noseW,t);var u=(t-T.TOSS-0.15)/(T.CATCH-T.TOSS-0.15);var m=a.clone().lerp(b,0.5);m.y+=1.1;var v=1-u;
  BIS.position.copy(a.clone().multiplyScalar(v*v).add(m.multiplyScalar(2*v*u)).add(b.clone().multiplyScalar(u*u)));BIS.rotation.set(0,0,t*10);}
 else{BIS.position.copy(noseW());BIS.rotation.set(0,dog.root.rotation.y+PI/2,0);var k=1-S(t,T.CATCH+0.4,T.CATCH+0.9);BIS.scale.setScalar(Math.max(0.01,1.4*k));}}
EXTRA=EXTRAfn;
BURST=[[T.CATCH+0.1,[-0.25,-1.6],1.2],[T.ROW,[0,1.2]],[T.ROW+2.4,[0,1.2]]];
var WT=['Pipoca quer bolo!','Pipoca quer... solo?','Pipoca tem um polvo?','Vamos brincar de bola!','Vamos pintar a bola?','Vamos pintar a vovó?','Você é o melhor!'];
BW=[['Telefone sem fio!',T.ARR,T.ARR+1.4,kp('teo',2.6,0.5),1]];
WH.forEach(function(w,i){BW.push([WT[i],w[2]+0.1,w[2]+WD,kp(w[0],2.5,0.1),1.0]);});
BW.push(['O Pipoca tem um POLVO!',T.SH1,T.DQ,kp('duda',2.7,-0.3),1],['?',T.DQ+0.2,T.DQ+2.0,dp(1.2,-0.3),0.7],['Era bolo!',T.ERA,17.2,kp('teo',2.6,0.5),1],
 ['PINTAR A VOVÓ?!',T.SH2,T.LF+0.2,kp('teo',2.7,0.6),1],['Au au au!',T.AU+0.2,36.8,dp(1.9,0.1),0.9],['Ele disse: BISCOITO!',T.BIS,38.9,kp('teo',2.7,0.4),1],
 ['Ele sempre diz isso!',39.2,40.8,kp('bia',2.6,-0.2),1],['Recado: até amanhã!',51.4,55.0,function(){return [0,2.6,1.6];},1]);
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||48,m||0.08);};}
function SW(a0,a1,t0,t1,e,fov){return function(t){return frameOn(ALL,lerp(a0,a1,ez(lin(t,t0,t1))),e||24,fov||48,0.08);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(25,-4,ez(lin(t,0,3.2))),lerp(40,26,ez(lin(t,0,3.2))),50,0.1);}],
 [T.ARR,11.0,SW(-20,-12,T.ARR,11.0,26)],
 [11.0,17.4,A_(-6,26,50,0.12)],
 [17.4,24.0,SW(-12,-20,17.4,24.0,26)],
 [24.0,29.0,A_(-16,26,48)],
 [29.0,31.4,A_(0,24,48,0.1)],
 [31.4,T.AU,A_(4,32)],
 [T.AU,40.8,A_(-18,26,46)],
 [40.8,T.MOVE,A_(-8,28)],
 [T.MOVE,T.ROW,function(t){return mixCam(frameOn(ALL,-8,28,48,0.08),frameLow(ALL,0,16,50,0.06),ez(lin(t,T.MOVE,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,16,50,0.06);}]];
EV=[];WH.forEach(function(w,i){EV.push([w[2],'psst'+i]);});
EV.push([T.SH1,'shout'],[T.DQ+0.5,'spin'],[T.DQ+0.6,'laugh'],[T.ERA,'era'],[T.SH2,'shout'],[T.LF,'fall'],[T.LF+0.3,'laugh'],[T.DW0,'walk'],[T.AU+0.2,'au'],[T.BIS,'shout'],[39.0,'laugh'],[T.TOSS,'toss'],[T.CATCH,'catch'],[T.ROW,'confetti']);
