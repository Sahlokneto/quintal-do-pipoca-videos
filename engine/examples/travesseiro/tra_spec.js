// ===== Guerra de Travesseiro =====
makeBubs([['Guerra de travesseiro!',58],['Toma essa!',90],['Revanche!',96],['Chuva de penas!',66],['Atchim!',100],['Pipoca campeão!',62],['O rei do travesseiro!',52],
 ['Montanha de travesseiros!',46],['Viva a guerra de penas!',48]]);
radio.visible=false;
var P0={leo:[-0.65,-0.2],bia:[0.65,-0.2],teo:[-1.55,-0.95],duda:[1.55,-0.95]},C=[0,-1.3],DC=[0,1.5],DO=[0,1.4],FR=[0,1.2];
var FIN={teo:[-2.0,-0.8],leo:[-1.15,-0.1],bia:[1.15,-0.1],duda:[2.0,-0.8]};
var PASS={duda:[1.55,-0.2],bia:[0.65,0.55],leo:[-0.65,0.55],teo:[-1.55,-0.2]};
var T={ARR:3.0,WAKE:18.4,SNZ:19.0,GO:20.6,SPIN:22.6,SPINE:25.0,UP:30.0,DOUT:31.0,PILE:32.4,HOP:34.6,MOVE:36.0,ROW:38.0,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
// travesseiradas: [t0, atacante, alvo]  (acerto em t0+0.42)
var SW=[[5.0,'leo','bia'],[6.6,'bia','leo'],[9.0,'duda','bia'],[10.0,'teo','leo'],[11.2,'leo','teo'],[12.6,'bia','duda'],[13.4,'leo','bia'],[14.2,'teo','leo'],[15.0,'duda','bia'],[15.8,'bia','leo'],[16.4,'leo','teo'],[17.0,'bia','duda']];
var SD=0.75,HT=0.42;
function dogYawSpin(t){return 2*PI*clamp((t-T.SPIN)/2.4,0,1)*1.0;}
var DH={duda:22.2,bia:22.8,leo:23.3,teo:23.8};
var HITS=[];SW.forEach(function(s){HITS.push([s[0]+HT,s[2]]);});Object.keys(DH).forEach(function(n){HITS.push([DH[n],n]);});
function lastHit(n,t){var b=null;HITS.forEach(function(h){if(h[1]===n&&t>=h[0]&&(!b||h[0]>b))b=h[0];});return b;}
function swingOf(n,t){for(var i=0;i<SW.length;i++){var s=SW[i];if(s[1]===n&&t>=s[0]&&t<s[0]+SD)return s;}return null;}
function dogP(t){return dogState(t).p;}
function idleLook(n,t){if(t>T.WAKE-0.2&&t<T.UP)return dogP(t);if(t>=T.PILE-0.4)return C;return FR;}
function fightKid(n,t0,t1){var P=P0[n];return cust(t0,t1,function(t){
 var s=swingOf(n,t),h=lastHit(n,t),dh=DH[n];
 // sentado depois do pião do Pipoca
 if(t>=dh&&t<T.UP){var u=lin(t,dh,dh+0.35);var away=yawTo(PASS[n],P),bx=P[0]+0.35*Math.sin(away)*ez(u),bz=P[1]+0.35*Math.cos(away)*ez(u);
  if(u<1)return {p:[bx,bz],yaw:yawTo(P,PASS[n]),pose:'none',face:'wow',y:0.3*Math.sin(PI*u)-0.6*u*u,roll:0.3*Math.sin(PI*u),A:{aLx:-2.6,aRx:-2.6,aLz:-0.4,aRz:0.4,lL:-1.2*u,lR:-1.2*u}};
  return {p:[bx,bz],yaw:yawTo([bx,bz],t<25.2?dogP(t):FR),pose:'sitg',face:t>dh+0.8?'tongue':'wow',y:0.03*Math.abs(Math.sin(t*12)),A:{aLx:-0.6+0.3*Math.sin(t*12),aRx:-0.6+0.3*Math.sin(t*12)}};}
 if(t>=T.UP&&t<T.UP+0.8){var away2=yawTo(PASS[n],P),q=[P[0]+0.35*Math.sin(away2),P[1]+0.35*Math.cos(away2)],u2=ez(lin(t,T.UP,T.UP+0.8));
  return {p:L2(q,P,u2),yaw:yawTo(P,FR),pose:'none',face:'happy',y:lerp(GROUND_Y,0,u2),A:{lL:-PI/2*(1-u2),lR:-PI/2*(1-u2),aLx:-1.0,aRx:-1.0}};}
 if(s){var tg=P0[s[2]],u3=(t-s[0])/SD,y=yawTo(P,tg),st=0.28*Math.sin(PI*u3);var p=[P[0]+st*Math.sin(y),P[1]+st*Math.cos(y)];
  var ax=u3<0.45?lerp(-1.25,-3.1,ez(u3/0.45)):u3<0.62?lerp(-3.1,-0.9,ez((u3-0.45)/0.17)):lerp(-0.9,-1.25,ez((u3-0.62)/0.38));
  return {p:p,yaw:y,pose:'none',face:'focus',pitch:u3>0.45&&u3<0.8?0.15:0,A:{aLx:ax,aRx:ax,aLz:0.25,aRz:-0.25,eL:-0.2,eR:-0.2}};}
 var look=idleLook(n,t),yb=yawTo(P,look);
 if(h!=null&&t<h+0.7){var v=(t-h)/0.7;return {p:P,yaw:yb,pose:'hold',face:'wow',roll:0.35*Math.sin(PI*v)*(n==='bia'||n==='duda'?-1:1),y:0.12*Math.sin(PI*v),A:{hz:0.4*Math.sin(PI*v)}};}
 if(t>T.WAKE-0.2&&t<T.GO+1.0)return {p:P,yaw:yb,pose:'hold',face:t<T.SNZ+0.4?'wow':'tongue'};
 if(t>=T.PILE-0.4&&t<T.PILE+2.0){var k=['leo','bia','duda','teo'].indexOf(n),tt=T.PILE+k*0.4;if(t>=tt-0.3&&t<tt+0.4){var w=lin(t,tt-0.3,tt+0.4);return {p:P,yaw:yawTo(P,C),pose:'none',face:'focus',A:{aLx:lerp(-1.0,-2.6,Math.sin(PI*w)),aRx:lerp(-1.0,-2.6,Math.sin(PI*w)),eL:-0.3,eR:-0.3}};}
  if(t>=tt+0.4)return {p:P,yaw:lerpAng(yawTo(P,C),yawTo(P,FR),ez(lin(t,tt+0.4,tt+0.9))),pose:'clap',face:'happy'};}
 if(t>=T.PILE+2.0)return {p:P,yaw:yawTo(P,FR),pose:t>T.HOP+0.4?'cheer':'clap',face:'happy'};
 var chaos=t>12.4&&t<T.WAKE;return {p:P,yaw:yb,pose:'hold',face:chaos?((Math.floor(t*2)%2)?'tongue':'happy'):'happy',y:chaos?0.06*Math.abs(Math.sin(t*9+P[0])):0};});}
(function(){var st={leo:[-1.0,-5.0],bia:[1.0,-5.0],teo:[-3.6,-4.0],duda:[3.6,-4.0]};
 Object.keys(KIDS).forEach(function(n){var P=P0[n];
  TL[n]=[hold(0,0.2,st[n],yawTo(st[n],P),'stand'),mv(0.2,2.8,[st[n],P],'run',{face:'happy',A:{aLx:-1.25,aRx:-1.25,aLz:0.32,aRz:-0.32,eL:-0.45,eR:-0.45}}),
   turnTo(2.8,T.ARR,P,yawTo(st[n],P),yawTo(P,FR),'hold',{face:'happy'}),fightKid(n,T.ARR,T.MOVE),
   mv(T.MOVE,T.ROW-0.4,[P,FIN[n]],'walk',{face:'happy'}),turnTo(T.ROW-0.4,T.ROW,FIN[n],yawTo(P,FIN[n]),0,'stand',{face:'happy'}),
   cust(T.ROW,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
   cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];});
})();
// ----- Pipoca -----
var STK=0.27,TOPY=4*STK+0.02;
DY=0.5;
DG=[cust(0,T.WAKE,function(t){return {p:DC,yaw:DY,pose:'none',legs:[-1.45,-1.45,1.45,1.45],y:-0.2+0.01*Math.sin(t*2),hx:0.35,tailA:0.15,tailF:4};}),
 cust(T.WAKE,T.SNZ,function(t,u){return {p:DC,yaw:DY,pose:'none',legs:[-1.45,-1.45,1.45,1.45],y:-0.2,hx:lerp(0.35,-0.1,u),tailA:0.15};}),
 cust(T.SNZ,T.GO,function(t){var k=lin(t,T.SNZ,T.SNZ+0.35);return {p:DC,yaw:DY,pose:'sit',hx:k<1?0.5*Math.sin(PI*k):0,y:0.05};}),
 mv(T.GO,21.8,[DC,[1.6,1.3],[2.6,0.3]],'drun',{tailF:30}),mv(21.8,22.2,[[2.6,0.3],PASS.duda],'drun'),mv(22.2,22.8,[PASS.duda,PASS.bia],'drun'),
 mv(22.8,23.3,[PASS.bia,PASS.leo],'drun'),mv(23.3,23.8,[PASS.leo,PASS.teo],'drun'),mv(23.8,25.2,[PASS.teo,[-2.6,0.5],[-1.6,1.4],DO],'drun'),
 turnTo(25.2,25.5,DO,PI/2,0,'sit'),cust(25.5,T.DOUT+0.6,function(t){return {p:DO,yaw:0,pose:'sit',tailF:30,tailA:1.0,hz:0.15*Math.sin(t*3)};}),
 turnTo(T.DOUT+0.6,T.PILE,DO,0,PI,'sit'),hold(T.PILE,T.HOP-0.8,DO,PI,'sit',{hx:-0.3,tailF:30}),mv(T.HOP-0.8,T.HOP,[DO,[0,0.0]],'dwalk'),
 cust(T.HOP,T.HOP+0.6,function(t,u){return {p:L2([0,0.0],C,ez(u)),yaw:PI+PI*ez(u),pose:'stand',legs:[-0.8,-0.8,0.6,0.6],y:TOPY*ez(u)+0.8*4*u*(1-u)};}),
 cust(T.HOP+0.6,END+2,function(t){return {p:C,yaw:0,pose:'party',y:TOPY};})];
// ----- objetos -----
function makePillow(c){var g=new THREE.Group();var a=box(1.45,0.95,0.42,0xffffff);g.add(a);var b=box(1.5,0.12,0.46,c);b.position.y=0.25;g.add(b);var b2=b.clone();b2.position.y=-0.25;g.add(b2);
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var k=box(0.2,0.2,0.2,0xffffff);k.position.set(q[0]*0.72,q[1]*0.46,0);g.add(k);});return g;}
var PC={leo:0x7aa7ff,bia:0xff8fb0,teo:0xffc066,duda:0x6ee0b0},PH={},PF={};
Object.keys(KIDS).forEach(function(n){var h=makePillow(PC[n]);h.position.set(0,-1.38,0.05);KIDS[n].aR.e.add(h);PH[n]=h;var f=makePillow(PC[n]);f.scale.setScalar(KS);f.visible=false;scene.add(f);PF[n]=f;});
var CUSH=new THREE.Group();scene.add(CUSH);(function(){var a=box(0.62,0.16,0.48,0xc39bff);CUSH.add(a);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var k=box(0.1,0.1,0.1,0xffd166);k.position.set(q[0]*0.3,0,q[1]*0.23);CUSH.add(k);});})();
var CUSHM=new THREE.Group();dog.head.add(CUSHM);(function(){var a=box(0.95,0.14,0.3,0xc39bff);CUSHM.add(a);[-1,1].forEach(function(q){var k=box(0.1,0.1,0.1,0xffd166);k.position.set(q*0.47,0,0);CUSHM.add(k);});CUSHM.position.set(0.0,-0.14,0.42);})();
// penas
var FE=[],FPER=9;(function(){var m=new THREE.MeshStandardMaterial({color:col(0xffffff),roughness:0.6,side:THREE.DoubleSide});for(var i=0;i<HITS.length*FPER+40;i++){var f=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.02,0.07),m);f.visible=false;scene.add(f);FE.push(f);}})();
function headPos(n,t){var P=P0[n];return [P[0],n==='dog'?0.9:2.0,P[1]];}
function feather(f,t0,p0,i,t){var ct=t-t0;if(ct<0){f.visible=false;return;}f.visible=true;var a=i*2.399+p0[0],sp=0.9+0.5*rnd(i*3.1);
 var out=sp*(1-Math.exp(-ct*3))/3*3,x=p0[0]+Math.cos(a)*out*0.6+0.12*Math.sin(ct*3+i),z=p0[2]+Math.sin(a)*out*0.6+0.1*Math.cos(ct*2.6+i);
 var y=p0[1]+1.0*(1-Math.exp(-ct*4))-0.32*ct;var land=y<=0.03;f.position.set(x,Math.max(0.03,y),z);
 f.rotation.set(land?0:0.6*Math.sin(ct*4+i),i,land?0:0.5*Math.sin(ct*5+i));}
var _hp=new THREE.Vector3();function hand(n,s){var a=s>0?KIDS[n].aR:KIDS[n].aL;a.e.children[1].getWorldPosition(_hp);return _hp.clone();}
var CA={};function frameState(t){Object.keys(KIDS).forEach(function(n){applyKid(KIDS[n],stateOf(n,t),t);});applyDog(t);scene.updateMatrixWorld(true);}
function at(key,tq,fn,tnow){if(CA[key])return CA[key].clone();frameState(tq);var v=fn();CA[key]=v.clone();frameState(tnow);return v;}
var ORD=['leo','bia','duda','teo'];
EXTRA=function(t){var k=0;
 HITS.forEach(function(h,j){var p=headPos(h[1],t);for(var i=0;i<FPER;i++)feather(FE[k++],h[0],p,j*FPER+i,t);});
 // penas soltas caindo durante a bagunça (uma cai no focinho do Pipoca)
 for(var i=0;i<40;i++){var f=FE[k++],t0=12.6+i*0.15;if(i===39){var u=lin(t,16.4,T.WAKE);f.visible=t>16.4&&t<T.SNZ;f.position.set(lerp(1.0,DC[0]+0.42*Math.sin(DY),u),lerp(3.0,0.5,u),lerp(0.8,DC[1]+0.42*Math.cos(DY),u));f.rotation.set(0.5*Math.sin(t*4),t,0.4*Math.sin(t*5));continue;}
  feather(f,t0,[-1.6+3.2*rnd(i*7.7),3.6,-2.0+2.6*rnd(i*5.3)],i+500,t);}
 // almofadinha do Pipoca
 CUSH.visible=t<T.GO+0.3;CUSH.position.set(DC[0]+0.38*Math.sin(DY),0.08,DC[1]+0.38*Math.cos(DY));CUSH.rotation.y=DY;CUSHM.visible=!CUSH.visible;
 // travesseiros jogados na pilha
 ORD.forEach(function(n,j){var tt=T.PILE+j*0.4;PH[n].visible=t<tt;PF[n].visible=t>=tt;if(t>=tt){var h=at('ph'+n,tt,function(){return hand(n,1);},t),e=V(C[0],STK*j+STK/2+0.01,C[1]),u=clamp((t-tt)/0.5,0,1);
  var p=h.clone().lerp(e,ez(u));p.y+=1.0*4*u*(1-u);PF[n].position.copy(p);PF[n].rotation.set(u<1?(1-u)*2:PI/2,j*0.5,0);}});};
BURST=[[T.HOP+0.5,C,2.0],[T.ROW+0.1,[0,-0.6]],[T.ROW+2.6,[0,-0.6]]];
BW=[['Guerra de travesseiro!',3.2,4.8,kp('leo',2.9,0.4),1],['Toma essa!',7.1,8.5,kp('bia',2.8,-0.3),1],['Revanche!',10.6,11.9,kp('leo',2.8,-0.2),1],['Chuva de penas!',16.8,18.3,kp('bia',2.9,-0.2),1],
 ['Atchim!',T.SNZ,20.2,dp(1.2,0.0),1],['Pipoca campeão!',25.4,27.2,kp('teo',2.0,0.4),1],['O rei do travesseiro!',27.4,29.4,kp('duda',2.0,-0.4),1],
 ['Montanha de travesseiros!',30.6,32.4,kp('bia',2.9,-0.2),1],['Viva a guerra de penas!',51.0,54.8,function(){return [0,2.6,-1.0];},1]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||46,m||0.08);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(30,-6,ez(lin(t,0,3.0))),lerp(38,24,ez(lin(t,0,3.0))),48,0.1);}],
 [T.ARR,8.6,A_(-8,24,46)],
 [8.6,12.4,A_(10,26,46)],
 [12.4,T.WAKE,A_(-4,32,46)],
 [T.WAKE,T.GO,A_(14,20,46)],
 [T.GO,25.4,A_(0,30,46)],
 [25.4,T.UP,A_(-10,24,46)],
 [T.UP,T.MOVE,A_(8,30,46)],
 [T.MOVE,T.ROW,function(t){return mixCam(frameOn(ALL,8,30,46,0.08),frameLow(ALL,0,20,50,0.06),ez(lin(t,T.MOVE,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,20,50,0.06);}]];
EV=[];SW.forEach(function(s){EV.push([s[0],'swing']);EV.push([s[0]+HT,'pof']);});
EV=EV.concat([[T.SNZ-0.3,'snz'],[T.GO,'run'],[DH.bia,'pof'],[DH.duda,'pof'],[DH.teo,'pof'],[DH.leo,'pof'],[T.SPINE+0.4,'laugh'],[T.UP,'up'],[T.PILE,'toss'],[T.PILE+0.4,'toss'],[T.PILE+0.8,'toss'],[T.PILE+1.2,'toss'],[T.HOP,'jump'],[T.HOP+0.5,'confetti'],[T.ROW,'confetti']]);
EV.sort(function(a,b){return a[0]-b[0];});
