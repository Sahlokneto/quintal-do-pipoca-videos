// ===== Peteca =====
makeBubs([['Quem deixar cair, perde!',44],['Pipoca de chapéu!',56],['Salvei!',90],['Ele joga também!',56],['Ops!',96],['Ponto pro Pipoca!',54],['Amanhã tem revanche!',46]]);
radio.visible=false;
var CEN=[0,-0.25],DC=[0,-0.25],DP0=[2.6,-0.5],DF=[0,0.6];
var POS={leo:[-1.1,-1.7],bia:[1.1,-1.7],teo:[-1.8,0.9],duda:[1.8,0.9]};
var TS=[-2.26,1.2];
var FIN={leo:[-1.95,-1.0],teo:[-0.65,-0.8],bia:[0.65,-0.8],duda:[1.95,-1.0]};
var STY={leo:0,bia:3,teo:2,duda:1};
var T={ARR:3.0,SERVE:5.4,STRONG:12.75,HAT:14.4,POP:16.3,R2:17.4,LOW:21.9,SAVE:22.9,DW:24.8,D1:26.9,D2:28.9,D3:30.9,BACK:31.2,FALL:32.2,LAP:32.6,PONTO:34.4,GRAB:35.4,FIM:36.5,DANCE:38.5,WAVE:55.5,END:60};
var END=T.END;
function dirC(p){var dx=CEN[0]-p[0],dz=CEN[1]-p[1],l=Math.hypot(dx,dz);return [dx/l,dz/l];}
function wrapA(a){return ((a+PI)%(2*PI)+2*PI)%(2*PI)-PI;}
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
// ----- sequência da peteca: [chegada, quem, altura do arco, saída] -----
var SEQ=[[0,'bia',0,T.SERVE],
 [6.45,'teo',1.4],[7.5,'leo',1.4],[8.55,'duda',1.4],[9.6,'bia',1.4],[10.65,'leo',1.4],[11.7,'duda',1.4],[T.STRONG,'teo',1.4],
 [T.HAT,'hat',3.0,T.POP],
 [T.R2,'bia',1.5],[18.3,'leo',1.2],[19.2,'duda',1.2],[20.1,'teo',1.2],[21.0,'bia',1.2],[T.LOW,'duda',1.2],[T.SAVE,'leo',0.25],[23.9,'teo',1.6],[24.8,'duda',1.2],[25.7,'bia',1.2],
 [T.D1,'dog',1.5],[27.9,'leo',1.3],[T.D2,'dog',1.3],[29.9,'duda',1.3],[T.D3,'dog',1.3],[T.LAP,'lap',2.6,35.3],[35.5,'mouth',0.05,999]];
var KH={leo:[],bia:[],teo:[],duda:[]};SEQ.forEach(function(s,i){if(i>0&&KH[s[1]])KH[s[1]].push(s[0]);});KH.bia.unshift(T.SERVE);
function petSeg(t){for(var i=SEQ.length-1;i>=0;i--){var ta=SEQ[i][0],tl=SEQ[i][3]||ta;if(t>=ta){if(t<tl||i===SEQ.length-1)return {rest:true,i:i};return {rest:false,i:i};}}return {rest:true,i:0};}
// pontos aproximados (para onde olhar) e precisos (mão / cabeça / focinho)
function APX(w){if(KH[w]){var d=dirC(POS[w]);return V(POS[w][0]+0.45*d[0],2.0,POS[w][1]+0.45*d[1]);}
 if(w==='hat')return V(DP0[0],1.05,DP0[1]);if(w==='dog')return V(DC[0],1.2,DC[1]);if(w==='lap')return V(-1.91,0.35,0.97);return V(-1.1,0.7,0.8);}
var _hp=new THREE.Vector3();
function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_hp);return _hp.clone().add(V(0,0.12,0));}
function live(w){dog.head.updateMatrixWorld(true);
 if(KH[w])return handR(w);if(w==='hat')return dog.head.localToWorld(V(0,0.22,0.0));if(w==='dog')return dog.head.localToWorld(V(0,0.3,0.28));
 if(w==='lap'){KIDS.teo.root.updateMatrixWorld(true);return KIDS.teo.root.localToWorld(V(0,1.55,0.75));}
 return dog.head.localToWorld(V(0,-0.08,0.45));}
var PC={};
function ptAt(w,tq,tnow){var key=w+tq.toFixed(3);if(PC[key])return PC[key].clone();var r;
 if(KH[w]||w==='lap'){var n=KH[w]?w:'teo';applyKid(KIDS[n],stateOf(n,tq),tq);KIDS[n].root.updateMatrixWorld(true);r=live(w);applyKid(KIDS[n],stateOf(n,tnow),tnow);KIDS[n].root.updateMatrixWorld(true);}
 else{applyDog(tq);dog.root.updateMatrixWorld(true);r=live(w);applyDog(tnow);dog.root.updateMatrixWorld(true);}
 PC[key]=r.clone();return r;}
function petPos(t,apx){var g=petSeg(t),s=SEQ[g.i];if(g.rest)return apx?APX(s[1]):live(s[1]);
 var nx=SEQ[g.i+1],tl=s[3]||s[0],a=apx?APX(s[1]):ptAt(s[1],tl,t),b=apx?APX(nx[1]):ptAt(nx[1],nx[0],t),u=clamp((t-tl)/(nx[0]-tl),0,1);
 var top=Math.max(a.y,b.y)+nx[2],m=a.clone().lerp(b,0.5);m.y=2*top-(a.y+b.y)/2;var v=1-u;
 return a.clone().multiplyScalar(v*v).add(m.multiplyScalar(2*v*u)).add(b.clone().multiplyScalar(u*u));}
// ----- crianças -----
var WOW=[[12.85,T.HAT]],LAUGH=[[14.6,16.2],[32.7,34.3]],WOW2=[[22.25,T.SAVE]],CLAPW=[[23.0,23.5],[27.0,27.6],[29.0,29.6]],CHEER=[[T.PONTO,36.3]];
function kidS(n,t){var p=POS[n],yaw=yawTo(p,CEN),q=petPos(t,true);
 var hy=clamp(wrapA(yawTo(p,[q.x,q.z])-yaw),-1.0,1.0),hx=-0.5*clamp((q.y-1.6)/3,0,1);
 var s={p:p,yaw:yaw,pose:'none',face:'happy',A:{aLx:-0.6,aRx:-0.6,aLz:0.12,aRz:-0.12,eL:-0.9,eR:-0.9,hy:hy,hx:hx}};
 var hit=null;KH[n].forEach(function(th){if(t>=th-0.3&&t<th+0.35)hit=th;});
 if(n==='bia'&&t<T.SERVE-0.3){s.A.aRx=-1.3;s.A.eR=-0.7;}
 if(hit!=null){var th=hit;if(t<th){s.A.aRx=lerp(n==='bia'&&th===T.SERVE?-1.3:-0.6,-2.4,S(t,th-0.3,th));s.face='focus';}else{s.A.aRx=lerp(-2.4,-0.6,S(t,th,th+0.35));}
  s.A.eR=-0.15;s.y=0.07*Math.sin(PI*lin(t,th-0.3,th+0.35));return s;}
 if(inW(t,WOW)||inW(t,WOW2)){s.face='wow';s.A.aLx=-0.5;s.A.aRx=-0.5;s.A.aLz=-0.8;s.A.aRz=0.8;s.A.eL=s.A.eR=-0.7;}
 if(inW(t,LAUGH)){s.face='tongue';s.pitch=0.12;s.y=0.05*Math.abs(Math.sin(t*13));s.A.aLx=s.A.aRx=-1.0;s.A.eL=s.A.eR=-1.2;s.A.hy=0;s.A.hx=0;}
 if(inW(t,CLAPW)&&!(n==='leo'&&t<24)){var cc=Math.abs(Math.sin(t*9));s.A.aLx=s.A.aRx=-1.3;s.A.aLz=lerp(-0.2,0.32,cc);s.A.aRz=-s.A.aLz;s.A.eL=s.A.eR=-0.6;}
 if(inW(t,CHEER)){s.pose='cheer';s.A={hy:0,hx:-0.1};s.face='happy';}
 return s;}
function kid(n,t0,t1){return cust(t0,t1,function(t){return kidS(n,t);});}
function toFin(n,from,t0,t1,via){return [mv(t0,t1,[from].concat(via||[],[FIN[n]]),'walk',{face:'happy'}),turnTo(t1,t1+0.4,FIN[n],yawTo((via&&via.length)?via[via.length-1]:from,FIN[n]),0,'stand',{face:'happy'}),
 hold(t1+0.4,T.DANCE,FIN[n],0,'cheer',{face:'happy'}),
 cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
(function(){var st={leo:[-4.6,-3.6],bia:[4.6,-3.6],teo:[-4.8,3.2],duda:[4.8,3.2]};
 Object.keys(KIDS).forEach(function(n){var p=POS[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.7,[st[n],p],'run',n==='bia'?{face:'happy',A:{aRx:-1.3,eR:-0.7}}:{face:'happy'}),
  turnTo(2.7,T.ARR,p,yawTo(st[n],p),yawTo(p,CEN),'stand',n==='bia'?{face:'happy',A:{aRx:-1.3,eR:-0.7}}:{face:'happy'})];});
 // Léo: salva rente ao chão
 var dl=dirC(POS.leo),LG=[POS.leo[0]+0.55*dl[0],POS.leo[1]+0.55*dl[1]];
 TL.leo.push(kid('leo',T.ARR,22.2),cust(22.2,23.7,function(t){var k=S(t,22.2,22.65)*(1-S(t,23.25,23.7)),s=kidS('leo',t);s.p=L2(POS.leo,LG,k);s.pitch=0.6*k;
   var sw=S(t,22.6,T.SAVE),bk=S(t,T.SAVE,23.3);s.A={aLx:lerp(-0.6,-0.3,k),aRx:lerp(-0.6,lerp(-0.9,-1.7,sw),k)+0.8*bk*k,aLz:0.3*k,aRz:-0.12,eL:-0.5,eR:-0.2,lL:-0.7*k,lR:0.45*k,hx:-0.5*k,hy:0};
   s.face=t<T.SAVE?'wow':'happy';if(t>=T.SAVE&&t<23.3){s.face='happy';}return s;}),kid('leo',23.7,T.FIM));
 TL.leo=TL.leo.concat(toFin('leo',POS.leo,T.FIM,38.0));
 TL.bia.push(kid('bia',T.ARR,T.FIM));TL.bia=TL.bia.concat(toFin('bia',POS.bia,T.FIM,38.0));
 TL.duda.push(kid('duda',T.ARR,T.FIM));TL.duda=TL.duda.concat(toFin('duda',POS.duda,T.FIM,38.2));
 // Teo: dá ré, cai sentado, a peteca cai no colo
 TL.teo.push(kid('teo',T.ARR,T.BACK),
  cust(T.BACK,T.FALL,function(t,u){return {p:L2(POS.teo,TS,ez(u)),yaw:yawTo(POS.teo,CEN),pose:'walk',face:'wow',A:{aLx:-2.2,aRx:-2.2,aLz:-0.2,aRz:0.2,eL:-0.3,eR:-0.3,hx:-0.5}};}),
  cust(T.FALL,32.5,function(t,u){var k=S(u,0,1);return {p:TS,yaw:yawTo(POS.teo,CEN),pose:'none',y:lerp(0,GROUND_Y,k),sit:k,pitch:-0.25*Math.sin(PI*u),face:'wow',A:{aLx:-2.4,aRx:-2.4,aLz:-0.4,aRz:0.4,lL:-k*PI/2,lR:-k*PI/2}};}),
  cust(32.5,35.6,function(t){var lg=t>=32.7&&t<35.2;return {p:TS,yaw:yawTo(POS.teo,CEN),pose:'sitg',face:lg?'tongue':'happy',y:lg?0.04*Math.abs(Math.sin(t*13)):0,roll:lg?0.05*Math.sin(t*13):0,
   A:{aLx:-0.7,aRx:-0.7,aLz:0.25,aRz:-0.25,eL:-1.0,eR:-1.0,hx:lg?-0.1:0.1}};}),
  cust(35.6,36.2,function(t,u){return {p:TS,yaw:yawTo(POS.teo,CEN),pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.8)),sit:1-S(u,0,0.8),face:'happy'};}));
 TL.teo=TL.teo.concat(toFin('teo',TS,36.2,38.0,[[-1.1,0.2]]));
})();
// ----- Pipoca -----
var DGRAB=[-1.33,0.6],DHT=[T.D1,T.D2,T.D3];
function dogWatch(t){var x=0,z=0,yy=0;for(var k=0;k<5;k++){var q=petPos(t-k*0.1,true);x+=q.x/5;z+=q.z/5;yy+=q.y/5;}
 var y0=yawTo(DP0,[x,z]);return {p:DP0,yaw:y0,pose:'sit',hx:-0.35*clamp((yy-1)/3,0,1)};}
var YK=[[26.2,yawTo(DC,POS.bia)],[27.2,yawTo(DC,POS.bia)],[28.3,yawTo(DC,POS.leo)],[29.2,yawTo(DC,POS.leo)],[30.3,yawTo(DC,POS.duda)],[31.2,yawTo(DC,POS.duda)],[31.9,yawTo(DC,POS.teo)],[40,yawTo(DC,POS.teo)]];
function yk(t){for(var i=1;i<YK.length;i++)if(t<=YK[i][0]){var a=YK[i-1],b=YK[i];return lerpAng(a[1],b[1],ez(lin(t,a[0],b[0])));}return YK[YK.length-1][1];}
DG=[hold(0,0.3,[5.6,3.6],-2.2,'stand'),mv(0.3,2.8,[[5.6,3.6],DP0],'drun'),turnTo(2.8,3.1,DP0,yawTo([5.6,3.6],DP0),-PI/2,'sit'),
 cust(3.1,12.6,dogWatch),
 cust(12.6,16.6,function(t){var s={p:DP0,yaw:-1.05,pose:'sit',hx:t<T.HAT?-0.45*S(t,12.6,13.2):0};if(t>=T.HAT&&t<T.HAT+0.25)s.y=-0.05*Math.sin(PI*lin(t,T.HAT,T.HAT+0.25));
  if(t>=16.0&&t<16.4){s.hz=0.55*Math.sin((t-16.0)*45);s.roll=0.1*Math.sin((t-16.0)*45);}if(t>=16.4)s.yaw=lerpAng(-1.05,dogWatch(t).yaw,S(t,16.4,16.6));return s;}),
 cust(16.6,T.DW,dogWatch),
 mv(T.DW,26.2,[DP0,[1.2,-0.4],DC],'drun'),
 cust(26.2,32.8,function(t){var lift=0,hy=0;DHT.forEach(function(th){lift=Math.max(lift,S(t,th-0.6,th-0.3)*(1-S(t,th+0.3,th+0.6)));hy+=hopAt(t,th-0.25,0.5,0.22);});
  if(lift<0.01)return {p:DC,yaw:yk(t),pose:'stand',hx:-0.2};return {p:DC,yaw:yk(t),pose:'hind',lift:lift,y:hy,tailF:30};}),
 hold(32.8,34.8,DC,yawTo(DC,POS.teo),'party'),
 mv(34.8,35.25,[DC,DGRAB],'drun'),cust(35.25,35.7,function(t){return {p:DGRAB,yaw:yawTo(DGRAB,[-1.91,0.97]),pose:'sniff'};}),
 mv(35.7,36.7,[DGRAB,[-0.4,1.4],DF],'drun'),turnTo(36.7,37.0,DF,yawTo([-0.4,1.4],DF),0,'sit'),hold(37.0,T.DANCE,DF,0,'sit'),hold(T.DANCE,END+2,DF,0,'party')];
// ----- peteca -----
var PET=new THREE.Group();PET.scale.setScalar(1.45);scene.add(PET);
(function(){var b=new THREE.Mesh(new THREE.CylinderGeometry(0.13,0.15,0.12,16),mat(0xe0484f));b.position.y=0.06;b.castShadow=true;PET.add(b);
 var r=new THREE.Mesh(new THREE.CylinderGeometry(0.135,0.135,0.04,16),mat(0xffffff));r.position.y=0.13;PET.add(r);
 [0xffd166,0x4a8bf0,0x34d399,0xff6fa3,0xffffff].forEach(function(c,i){var a=i*2*PI/5,f=box(0.08,0.4,0.025,c);var g=new THREE.Group();g.position.set(0,0.14,0);g.rotation.y=a;PET.add(g);f.position.set(0,0.2,0.05);f.rotation.x=0.28;g.add(f);});})();
var TRAIL=[];for(var i=0;i<6;i++){var tm=new THREE.Mesh(new THREE.SphereGeometry(0.05,8,6),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.6,depthWrite:false}));tm.visible=false;scene.add(tm);TRAIL.push(tm);}
EXTRA=function(t){var p=petPos(t,false),g=petSeg(t),w=SEQ[g.i][1];PET.position.copy(p);
 if(g.rest&&w==='mouth'){PET.position.y-=0.05;PET.rotation.set(0,dog.root.rotation.y,PI/2);}
 else if(g.rest&&w==='lap')PET.rotation.set(0.3,0,0.2);
 else if(g.rest)PET.rotation.set(0,0,0);
 else PET.rotation.set(0.25*Math.cos(t*6),t*2,0.25*Math.sin(t*7));
 var fast=(t>=T.STRONG&&t<T.HAT)||(t>=T.D3&&t<T.LAP);
 TRAIL.forEach(function(m,i){m.visible=fast;if(!fast)return;var q=petPos(t-0.05*(i+1),false);m.position.copy(q);m.position.y+=0.2;m.scale.setScalar(1-i*0.13);m.material.opacity=0.5*(1-i/6);});};
BURST=[[T.PONTO,DC,1.3],[T.DANCE,[0,-0.5],2.2],[T.DANCE+3,[0,-0.5],2.2]];
BW=[['Quem deixar cair, perde!',3.2,5.0,kp('bia',2.9,-0.7),1],['Pipoca de chapéu!',14.7,16.2,kp('duda',2.9,-0.2),1],['Salvei!',23.1,24.5,kp('leo',2.5,0.4),1],
 ['Ele joga também!',27.2,28.7,kp('bia',2.9,0.4),1],['Ops!',32.7,34.1,kp('teo',2.0,0.3),1],['Ponto pro Pipoca!',34.4,36.0,kp('bia',2.9,-0.6),1],
 ['Amanhã tem revanche!',50.4,54.8,kp('duda',2.9,-0.7),1]];
var EXP=[[0,-2.2],[0,1.8]];
function A_(a,e,fov,m){return function(){return frameC(ALL,a,e,fov||46,m||0.12,EXP);};}
function PAN(a0,a1,e,t0,t1){return function(t){return frameC(ALL,lerp(a0,a1,ez(lin(t,t0,t1))),e,46,0.12,EXP);};}
SH=[[0,T.ARR,function(t){return frameC(ALL,lerp(28,0,ez(lin(t,0,T.ARR))),lerp(55,46,ez(lin(t,0,T.ARR))),48,0.12,EXP);}],
 [T.ARR,T.SERVE,A_(0,46)],
 [T.SERVE,T.STRONG,PAN(-10,10,46,T.SERVE,T.STRONG)],
 [T.STRONG,16.4,A_(14,38)],
 [16.4,T.LOW,PAN(10,-8,46,16.4,T.LOW)],
 [T.LOW,24.6,A_(-16,42)],
 [24.6,T.BACK,PAN(-6,8,48,24.6,T.BACK)],
 [T.BACK,T.PONTO,A_(-14,42)],
 [T.PONTO,T.FIM,A_(0,44)],
 [T.FIM,T.DANCE,function(t){return mixCam(frameC(ALL,0,44,46,0.12,EXP),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.FIM,T.DANCE)));}],
 [T.DANCE,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.8,'bark'],[3.2,'ta']];SEQ.forEach(function(s,i){if(i===0)return;var ty={hat:'hat',dog:'boop',lap:'lap',mouth:'gulp'}[s[1]]||'tap';EV.push([s[0],ty]);});
EV.push([T.SERVE,'tap'],[T.STRONG,'whee'],[14.6,'laugh'],[16.05,'shake'],[22.3,'drum'],[T.SAVE,'yay'],[T.FALL,'thud'],[32.7,'laugh'],[T.PONTO,'confetti'],[T.DANCE,'confetti']);
