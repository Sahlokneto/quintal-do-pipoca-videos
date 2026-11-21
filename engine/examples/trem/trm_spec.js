// ===== Trem de Caixas =====
makeBubs([['Vamos brincar de trem!',50],['Au-au! Piuí!',70],['Cadê o maquinista?',52],['Ele tá no meu vagão!',48],['Agora mais rápido!',52],['Ganhei um quepe!',56],
 ['Que freada, Pipoca!',50],['Fim da linha!',72],['Próxima parada: amanhã!',42]]);
radio.visible=false;
var OC=[0,-1.4],RX=1.8,RZ=2.0,GAP=1.3;
// tabela de comprimento de arco do oval
var NTH=2000,ARC=[0];(function(){for(var i=1;i<=NTH;i++){var a=2*PI*(i-1)/NTH,b=2*PI*i/NTH;ARC.push(ARC[i-1]+Math.hypot(RX*(Math.sin(b)-Math.sin(a)),RZ*(Math.cos(b)-Math.cos(a))));}})();
var PER=ARC[NTH];
function thOf(s){s=((s%PER)+PER)%PER;var lo=0,hi=NTH;while(hi-lo>1){var m=(lo+hi)>>1;if(ARC[m]<=s)lo=m;else hi=m;}var w=(s-ARC[lo])/Math.max(1e-9,ARC[hi]-ARC[lo]);return 2*PI*(lo+w)/NTH;}
function ptS(s){var th=thOf(s);return [OC[0]+RX*Math.sin(th),OC[1]+RZ*Math.cos(th)];}
function yawS(s){var a=ptS(s-0.05),b=ptS(s+0.05);return Math.atan2(b[0]-a[0],b[1]-a[1]);}
var ST=0.5*PER; // túnel (fundo)
var T={ARR:3.0,BX:4.6,DOG:6.4,CAP:7.4,GO:9.0,TIN:11.75,POP:15.6,STOP:19.0,JUMP:21.2,FRONT:23.0,FAST:24.4,CAPF:28.0,BRAKE:32.0,LAST:35.6,ARRV:40.0,FIM:41.4,ROW:42.6,WAVE:55.5,END:60};
var END=T.END;
var SF=2.6+4*PER; // parada final do Pipoca
// posição do Pipoca no trilho
var SEG=[[0,T.GO,2.0,2.0,'h'],[T.GO,10.0,2.0,2.8,'i'],[10.0,T.STOP,2.8,17.2,'l'],[T.STOP,20.0,17.2,18.0,'o'],[20.0,T.FAST,18.0,18.0,'h'],
 [T.FAST,25.4,18.0,19.7,'i'],[25.4,T.BRAKE,19.7,42.14,'l'],[T.BRAKE,32.5,42.14,42.99,'o'],[32.5,T.LAST,42.99,42.99,'h'],[T.LAST,T.ARRV,42.99,SF,'io'],[T.ARRV,99,SF,SF,'h']];
function sDog(t){for(var i=0;i<SEG.length;i++){var g=SEG[i];if(t<g[1]||i===SEG.length-1){var u=clamp((t-g[0])/(g[1]-g[0]),0,1);var e=g[4]==='i'?u*u:g[4]==='o'?1-(1-u)*(1-u):g[4]==='io'?ez(u):u;return lerp(g[2],g[3],e);}}}
function speed(t){return (sDog(t+0.05)-sDog(t-0.05))/0.1;}
var ORD={leo:1,bia:2,duda:3,teo:4};
var FROW={teo:[-1.95,0.0],duda:[-0.65,0.0],bia:[0.65,0.0],leo:[1.95,0.0]},DF=[0,1.25];
function gapAt(t){var b=t-T.BRAKE-0.2;return GAP*(1-(b>0&&b<1.4?0.28*Math.sin(PI*b/1.4)*Math.cos(b*9)*0+0.3*Math.sin(PI*clamp(b/0.4,0,1))*Math.exp(-Math.max(0,b-0.4)*3)+0.06*Math.sin(b*14)*Math.exp(-b*2.5):0));}
function sKid(n,t){return sDog(t)-ORD[n]*gapAt(t);}
var STY={leo:0,bia:3,teo:2,duda:1};
var BOXA={aLx:-0.45,aRx:-0.45,aLz:0.12,aRz:-0.12,eL:-0.7,eR:-0.7};
var PILE=[[ -0.32,0.0,-1.4],[0.32,0.0,-1.4],[0,0.62,-1.4],[0,1.24,-1.4]];
// ----- crianças -----
function trainKid(n,t0,t1){return cust(t0,t1,function(t){var s=sKid(n,t),v=speed(t);var p=ptS(s),y=yawS(s);var st={p:p,yaw:y,pose:v>2.4?'run':v>0.3?'walk':'stand',face:'happy',A:BOXA};
 if(v>2.4){st.face=(Math.floor(t*2+ORD[n])%2)?'tongue':'wow';st.pitch=0.1;}
 // reações
 if(t>T.TIN+1.0&&t<T.POP&&n!=='teo')st.face='wow';
 if(t>T.POP&&t<T.FRONT){st.face=t<T.POP+0.6?'wow':'tongue';if(t>T.POP+0.6&&v<0.3){st.pose='laugh';st.A=null;}}
 if(n==='teo'&&t>T.POP-0.2&&t<T.JUMP){st.A={aLx:-0.45,aRx:-0.45,aLz:0.12,aRz:-0.12,eL:-0.7,eR:-0.7,hy:1.2*S(t,T.POP-0.2,T.POP+0.3)};}
 if(t>T.BRAKE+0.2&&t<T.LAST){var b=t-T.BRAKE-0.2;st.pitch=0.35*Math.sin(PI*clamp(b/0.4,0,1))*Math.exp(-Math.max(0,b-0.4)*2);st.face=b<0.8?'wow':'tongue';if(b>1.2){st.pose='laugh';st.A=null;}}
 if(t>=T.ARRV){var u=lin(t,T.ARRV,T.ARRV+1.0),P0=ptS(sKid(n,T.ARRV));st.p=L2(P0,FROW[n],ez(u));st.yaw=u<1?yawTo(P0,FROW[n]):lerpAng(yawTo(P0,FROW[n]),0,S(t,T.ARRV+1.0,T.ARRV+1.3));st.pose=u<1?'walk':'stand';st.A=BOXA;if(t>T.FIM-0.2){st.pose='cheer';st.A=null;}}
 return st;});}
(function(){var st={leo:[4.5,-3.5],bia:[3.5,1.8],duda:[-3.5,1.8],teo:[-4.5,-3.5]};
 Object.keys(KIDS).forEach(function(n){var s0=sKid(n,0),P=ptS(s0),bt=T.BX+(ORD[n]-1)*0.6;
  TL[n]=[hold(0,0.2,st[n],yawTo(st[n],P),'stand'),mv(0.2,2.7,[st[n],P],'run',{face:'happy'}),turnTo(2.7,T.ARR,P,yawTo(st[n],P),yawTo(P,OC),'stand',{face:'happy'}),
   hold(T.ARR,bt+0.4,P,yawTo(P,OC),'look',{face:'happy'}),
   cust(bt+0.4,bt+0.8,function(t,u){return {p:P,yaw:yawTo(P,OC),pose:'none',face:'wow',y:0.25*Math.sin(PI*u),A:BOXA};}),
   cust(bt+0.8,8.2,function(t){return {p:P,yaw:yawTo(P,OC),pose:t<7.0?'clap':'none',face:'happy',A:t<7.0?null:BOXA};}),
   turnTo(8.2,T.GO,P,yawTo(P,OC),yawS(s0),'none',{face:'happy',A:BOXA}),
   trainKid(n,T.GO,T.ROW),
   cust(T.ROW,T.WAVE,function(t){var b=t*BPM/60;return {p:FROW[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FROW[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];});
})();
// ----- Pipoca -----
var DIN=[3.6,2.2];
function dogTrain(t0,t1){return cust(t0,t1,function(t){var s=sDog(t),v=speed(t);var p=ptS(s);var st={p:p,yaw:yawS(s),pose:v>0.3?(v>2.4?'drun':'dwalk'):'stand',tailF:30};
 if(t>T.BRAKE-0.1&&t<T.LAST){st.pose='stand';st.legs=[-0.6,-0.6,0.5,0.5];if(t>T.BRAKE+0.6)st.pose='bark';}
 if(t>=T.ARRV){var D0=ptS(SF),u=lin(t,T.ARRV,T.ARRV+1.2);var pts=[D0,[2.7,0.3],[1.3,1.4],DF];st.p=t<T.ARRV+1.2?mv(0,1,pts,'dwalk').f(u,u).p:DF;st.yaw=t<T.ARRV+1.2?mv(0,1,pts,'dwalk').f(u,u).yaw:lerpAng(-PI/2,0,S(t,T.ARRV+1.2,T.ARRV+1.5));st.pose=t<T.ARRV+1.2?'drun':(t>T.FIM?'party':'stand');}
 return st;});}
function teoBox(t){var s=stateOf('teo',t),y=s.yaw;return {p:[s.p[0]-Math.sin(y)*0.62,s.p[1]-Math.cos(y)*0.62],yaw:y+PI};}
DG=[hold(0,T.DOG,DIN,-2.0,'stand'),mv(T.DOG,T.CAP,[DIN,[2.6,0.6],ptS(2.0)],'drun',{tailF:34}),turnTo(T.CAP,T.CAP+0.3,ptS(2.0),yawTo([2.6,0.6],ptS(2.0)),yawS(2.0)-1.2,'stand'),
 cust(T.CAP+0.3,T.GO,function(t){return {p:ptS(2.0),yaw:yawS(2.0)-1.2,pose:'bark'};}),
 dogTrain(T.GO,T.POP),
 cust(T.POP,T.JUMP,function(t){var b=teoBox(t);var u=S(t,T.POP,T.POP+0.35);return {p:b.p,yaw:b.yaw,pose:t<T.POP+0.4?'stand':'party',y:lerp(-0.4,0.42,u),tailF:34};}),
 cust(T.JUMP,T.JUMP+0.6,function(t,u){var b=teoBox(T.JUMP);var q=[OC[0]+0.2,OC[1]+0.4];return {p:L2(b.p,q,ez(u)),yaw:yawTo(b.p,q),pose:'stand',legs:[-0.8,-0.8,0.6,0.6],y:lerp(0.42,0,u)+0.8*4*u*(1-u)};}),
 cust(T.JUMP+0.6,T.FRONT,function(t,u){var q=[OC[0]+0.2,OC[1]+0.4],e=ptS(sDog(t));return {p:L2(q,e,ez(u)),yaw:yawTo(q,e),pose:'drun'};}),
 turnTo(T.FRONT,T.FRONT+0.3,ptS(18.0),yawTo([OC[0]+0.2,OC[1]+0.4],ptS(18.0)),yawS(18.0),'stand'),
 dogTrain(T.FRONT+0.3,END+2)];
// ----- objetos -----
var CARD=0xc9965a,CARD2=0xb5824a;
var TRIM={leo:0x2f7de0,bia:0xff6fa3,duda:0x34d399,teo:0xff9f1c};
var BOXES={},WHEELS=[];
function makeCar(n){var g=new THREE.Group();g.rotation.order='YXZ';scene.add(g);var inner=new THREE.Group();g.add(inner);var W2=1.2,D2=n==='teo'?1.55:1.2,Hh=0.5,cy=0.7,oz=n==='teo'?-0.22:0;inner.position.z=oz;
 [[0,cy,D2/2,W2,Hh,0.05],[0,cy,-D2/2,W2,Hh,0.05],[W2/2,cy,0,0.05,Hh,D2],[-W2/2,cy,0,0.05,Hh,D2]].forEach(function(w){var b=box(w[3],w[4],w[5],CARD);b.position.set(w[0],w[1],w[2]);inner.add(b);});
 var bt=box(W2,0.04,D2,CARD2);bt.position.y=cy-Hh/2;inner.add(bt);
 [[0,cy+Hh/2,D2/2,W2+0.04,0.06,0.07],[0,cy+Hh/2,-D2/2,W2+0.04,0.06,0.07],[W2/2,cy+Hh/2,0,0.07,0.06,D2+0.04],[-W2/2,cy+Hh/2,0,0.07,0.06,D2+0.04]].forEach(function(w){var b=box(w[3],w[4],w[5],TRIM[n]);b.position.set(w[0],w[1],w[2]);inner.add(b);});
 [-1,1].forEach(function(sx){[-1,1].forEach(function(sz){var wh=new THREE.Group();wh.position.set(sx*(W2/2+0.04),cy-0.12,sz*D2*0.28);inner.add(wh);var c=new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.17,0.04,16),mat(0x2a2f36));c.rotation.z=PI/2;wh.add(c);
  var sp=box(0.045,0.26,0.05,0xeeeeee);wh.add(sp);WHEELS.push({w:wh,n:n});});});
 if(n==='leo'){var ch=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.09,0.42,12),mat(0x333a44));ch.position.set(0.32,cy+Hh/2+0.18,D2/2-0.12);inner.add(ch);var tp=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.11,0.1,12),mat(0x333a44));tp.position.set(0.32,cy+Hh/2+0.42,D2/2-0.12);inner.add(tp);g.chim=tp;
  var lamp=box(0.2,0.14,0.05,0xffe066);lamp.position.set(-0.3,cy+0.05,D2/2+0.03);inner.add(lamp);var cc=box(W2,0.14,0.12,0xe0484f);cc.position.set(0,cy-0.22,D2/2+0.06);inner.add(cc);}
 g.scale.setScalar(0.001);return g;}
Object.keys(KIDS).forEach(function(n){BOXES[n]=makeCar(n);});
// túnel
(function(){var g=new THREE.Group();g.position.set(0,0,-3.4);g.rotation.y=PI/2;scene.add(g);var H2=2.4,L=1.2;
 [-0.88,0.88].forEach(function(x){var w=box(0.12,H2,L,CARD);w.position.set(x,H2/2,0);g.add(w);var a=box(0.14,0.5,0.5,0x9b6a3c);a.position.set(x>0?x+0.01:x-0.01,H2*0.62,0);g.add(a);});
 var r=box(2.0,0.14,L,CARD2);r.position.set(0,H2+0.07,0);g.add(r);
 [-1,1].forEach(function(sz){var tr=box(2.0,0.12,0.06,0xe0484f);tr.position.set(0,H2+0.14,sz*L/2);g.add(tr);});
 var dk=box(1.7,0.02,L,0x7a5634);dk.position.set(0,0.13,0);dk.castShadow=false;g.add(dk);})();
// quepe
var CAP=new THREE.Group();scene.add(CAP);(function(){var b=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,0.16,16),mat(0x2b4a8c));b.position.y=0.08;CAP.add(b);var br=box(0.26,0.03,0.16,0x1d2f5c);br.position.set(0,0.02,0.2);CAP.add(br);
 var st=box(0.42,0.05,0.42,0x2b4a8c);st.position.y=0.17;CAP.add(st);var bd=box(0.1,0.06,0.02,0xffd166);bd.position.set(0,0.1,0.2);CAP.add(bd);})();
CAP.rotation.order='YXZ';
// fumaça
var SMOKE=[];(function(){for(var i=0;i<18;i++){var m=new THREE.Mesh(new THREE.SphereGeometry(0.16,10,8),new THREE.MeshStandardMaterial({color:col(0xffffff),roughness:0.9,transparent:true,opacity:0.85}));m.visible=false;m.castShadow=false;scene.add(m);SMOKE.push(m);}})();
var _v=new THREE.Vector3();
function chimAt(tt){var s=stateOf('leo',tt),y=s.yaw;return V(s.p[0]+Math.sin(y)*0.48+Math.cos(y)*0.32,1.55,s.p[1]+Math.cos(y)*0.48-Math.sin(y)*0.32);}
function arcV(a,b,u,h){var p=a.clone().lerp(b,u);p.y+=h*4*u*(1-u);return p;}
EXTRA=function(t){var sd=sDog(t);
 dog.root.visible=t>=T.DOG-0.2&&!(t>T.TIN&&t<T.POP);
 // caixas
 Object.keys(BOXES).forEach(function(n,i){var g=BOXES[n],k=KIDS[n].root,bt=T.BX+(ORD[n]-1)*0.6;
  if(t<bt){var p=PILE[i];g.position.set(p[0],p[1],p[2]);g.rotation.set(0,0.3*i,0);g.scale.setScalar(0.85);g.children[0].position.y=-0.45;}
  else if(t<bt+0.6){var u=(t-bt)/0.6,p2=PILE[i];var a=V(p2[0],p2[1],p2[2]),b=k.position.clone();g.position.copy(arcV(a,b,ez(u),1.6));g.rotation.set(0,lerpAng(0.3*i,k.rotation.y,u),0);g.scale.setScalar(0.85+0.15*u);g.children[0].position.y=lerp(-0.45,0,u);}
  else{g.position.set(k.position.x,Math.max(0,k.position.y),k.position.z);g.rotation.set(k.rotation.x*0.5,k.rotation.y,0);g.scale.setScalar(1);g.children[0].position.y=0;}});
 WHEELS.forEach(function(w){w.w.rotation.x=-sKid(w.n,t)/0.17;});
 // quepe
 CAP.visible=t>T.CAP;if(CAP.visible){var hp=dog.head.localToWorld(V(0,0.19,0.02)),bp=KIDS.bia.head.localToWorld(V(0,1.0,0.05));
  if(t<T.CAPF){CAP.position.copy(hp);CAP.rotation.set(dog.root.rotation.x,dog.root.rotation.y,0);CAP.scale.setScalar(t<T.CAP+0.35?Math.max(0.001,back((t-T.CAP)/0.35)):1);if(t>T.TIN&&t<T.POP)CAP.visible=false;}
  else if(t<T.CAPF+0.9){var u2=(t-T.CAPF)/0.9;CAP.position.copy(arcV(hp,bp,u2,1.4));CAP.rotation.set(t*9,KIDS.bia.root.rotation.y,0);CAP.scale.setScalar(lerp(1,1.45,u2));}
  else{CAP.position.copy(bp);CAP.rotation.set(0,KIDS.bia.root.rotation.y,0);CAP.scale.setScalar(1.45);}}
 // fumaça da chaminé
 SMOKE.forEach(function(m,i){m.visible=false;if(t<T.BX+0.6)return;var age=((t*1.1+i/18)%1)*1.6,tt=t-age;if(tt<T.GO-0.3)return;var v=Math.abs(speed(tt));if(v<0.3&&!(tt>T.ARRV&&tt<T.ARRV+2))return;
  var c=chimAt(tt);m.visible=true;m.position.set(c.x+0.15*Math.sin(i*2.1)*age,c.y+0.7*age,c.z+0.15*Math.cos(i*1.7)*age);var sc=0.5+1.0*age;m.scale.setScalar(sc);m.material.opacity=0.85*(1-age/1.6);});
};
BURST=[[T.POP+0.3,[-1.4,0.4],1.4],[T.ROW,[0,-0.6],2.4],[T.ROW+2.6,[0,-0.6],2.4]];
BW=[['Vamos brincar de trem!',3.0,4.5,kp('teo',2.9,0.6),1],['Au-au! Piuí!',7.7,9.0,dp(1.5,-0.2),1],['Cadê o maquinista?',13.4,15.0,kp('leo',2.9,0.3),1],
 ['Ele tá no meu vagão!',16.0,17.6,kp('teo',2.9,0),1],['Agora mais rápido!',22.9,24.4,kp('duda',2.9,0),1],['Ganhei um quepe!',29.4,30.9,kp('bia',3.2,0.7),1],
 ['Que freada, Pipoca!',33.4,35.0,kp('duda',2.9,0),1],['Fim da linha!',T.FIM,T.ROW+0.2,kp('bia',3.2,0),1],['Próxima parada: amanhã!',50.8,54.8,kp('bia',3.2,0),1]];
var OVAL=[[-2.0,1.0],[2.0,1.0],[-2.0,-3.6],[2.0,-3.6]];
var KN=['leo','bia','teo','duda'];function NM(){var t=window._t||0;return (t<T.DOG-0.2||(t>T.TIN&&t<T.POP))?KN:ALL;}
function UP_(c,d){c.pos[1]+=d;c.look[1]+=d;return c;}
function A_(a,e,fov,m,ex){return function(){return frameOn(NM(),a,e,fov||46,m||0.14,ex||OVAL);};}
SH=[[0,T.ARR,function(t){return frameOn(KN,lerp(30,-6,ez(lin(t,0,T.ARR))),lerp(42,30,ez(lin(t,0,T.ARR))),48,0.12,[]);}],
 [T.ARR,T.DOG,A_(-8,32)],
 [T.DOG,T.GO,A_(14,26)],
 [T.GO,11.0,A_(-10,34,46,0.12,OVAL)],
 [11.0,T.POP-0.4,A_(4,26,46,0.14,OVAL.concat([[0,-4.3]]))],
 [T.POP-0.4,T.JUMP,A_(-45,28,46,0.12,[])],
 [T.JUMP,T.FAST,A_(-6,32)],
 [T.FAST,T.BRAKE,A_(0,40,46,0.12,OVAL)],
 [T.BRAKE,T.LAST,A_(-14,26)],
 [T.LAST,T.ARRV,A_(6,34,46,0.12,OVAL)],
 [T.ARRV,T.ROW,function(t){return mixCam(UP_(frameOn(ALL,6,34,46,0.12,OVAL),0.2),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.ARRV,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[T.BX,'box'],[T.BX+0.6,'box'],[T.BX+1.2,'box'],[T.BX+1.8,'box'],[T.DOG,'bark'],[T.CAP,'pop'],[T.CAP+0.4,'whistle'],[T.GO,'go'],[T.TIN,'tunnel'],[T.POP,'surprise'],[T.POP+0.8,'laugh'],
 [T.STOP,'stop'],[T.JUMP,'jump'],[T.FAST,'whistle'],[T.FAST,'fast'],[T.CAPF,'whoosh'],[T.CAPF+0.9,'pop'],[T.BRAKE,'brake'],[T.BRAKE+1.4,'laugh'],[T.LAST,'go2'],[T.ARRV,'whistle'],[T.ROW,'confetti']];
