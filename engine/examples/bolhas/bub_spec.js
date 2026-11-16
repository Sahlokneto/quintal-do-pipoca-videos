var NP=[-1.7,2.6],B0=[0,0],LP=[-1.7,-0.2],TP=[1.7,-0.2],DP=[0,-1.8],GP=[-1.0,1.5],TB=[1.0,-1.2],BOT=[0.42,0.3];
var POS={leo:LP,teo:TP,duda:DP,bia:B0};
function yawC(p){return Math.atan2(-p[0],-p[1]);}
var YW={leo:yawC(LP),teo:yawC(TP),duda:0,bia:0};
var ROWP={leo:[-1.6,0.8],duda:[-0.8,0.8],bia:[0,0.8],teo:[0.8,0.8]},DROW=[1.6,0.8];
function ext(s,o,t,u){if(o){var e=(typeof o==='function')?o(t,u):o;if(e)for(var k in e)s[k]=e[k];}return s;}
function hold(t0,t1,p,yaw,pose,o){return {t0:t0,t1:t1,f:function(t,u){return ext({p:p,yaw:yaw,pose:pose},o,t,u);}};}
function mv(t0,t1,pts,pose,o){var cum=[0];for(var i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));var L=cum[cum.length-1];
 function at(u){var d=clamp(u,0,1)*L;for(var i=1;i<pts.length;i++){if(d<=cum[i]||i===pts.length-1){var w=(cum[i]-cum[i-1])>1e-6?clamp((d-cum[i-1])/(cum[i]-cum[i-1]),0,1):1;return L2(pts[i-1],pts[i],w);}}return pts[pts.length-1];}
 return {t0:t0,t1:t1,f:function(t,u){var e=0.82*u+0.18*ez(u);var p=at(e),a=at(e-0.04),b=at(e+0.04);return ext({p:p,yaw:Math.atan2(b[0]-a[0],b[1]-a[1]),pose:pose},o,t,u);}};}
function cust(t0,t1,fn){return {t0:t0,t1:t1,f:fn};}
function turnTo(t0,t1,p,y0,y1,pose,o){return cust(t0,t1,function(t,u){return ext({p:p,yaw:lerpAng(y0,y1,ez(u)),pose:pose||'stand'},o,t,u);});}
// ===== tempos =====
var T={BLOW1:5.3,BURST1:5.6,BLOW2:10.6,BURST2:10.9,DOGB:13.9,CH0:14.0,NOSE:17.2,SNEEZE:19.2,HAND1:22.4,HARD:22.8,SLOW:25.2,DETACH:27.5,ARRIVE:29.5,FLOAT0:30.0,FLOAT1:32.0,GPOP:32.4,HAND2:34.9,
 BURSTS:[35.8,38.0,40.2,42.4,44.6],ROW0:47.0,ROW1:48.4,FB0:49.3,FB1:51.8,FB2:54.0,END:60.0};
var END=T.END;
var POPS={leo:[7.4,8.4,9.4],teo:[7.9,11.8,13.0],duda:[8.9,12.4],dog:[]};
(function(){var ord=['leo','teo','duda','dog','leo','duda','teo','dog'],t=36.6,i=0;while(t<46.3){POPS[ord[i%8]].push(t);t+=0.55;i++;}})();
// ===== crianças =====
var TL={};
function ringC(n,t0,t1,o){var p=POS[n];return hold(t0,t1,p,YW[n],'ring',function(t){var pj=0,clap=0;POPS[n].forEach(function(tp){var q=t-tp;if(q>-0.32&&q<0.25){pj=Math.max(pj,0.5*4*((q+0.32)/0.57)*(1-(q+0.32)/0.57));clap=Math.max(clap,1-Math.abs(q)/0.3);}});
 var s={y:pj,clap:clap,face:clap>0.2?'happy':'wow'};if(o){var e=o(t);if(e)for(var k in e)s[k]=e[k];}return s;});}
function laughF(t){var l=(t>T.SNEEZE+0.1&&t<T.SNEEZE+2.0)||(t>T.GPOP+0.3&&t<T.GPOP+2.0);var w=(t>T.SLOW+1.2&&t<T.GPOP);return l?{laugh:1,face:'tongue'}:(w?{face:'wow',wowA:(t>T.FLOAT0)?1:0}:null);}
(function(){var st={leo:[-6,2.5],duda:[-5,-5],teo:[6,2.5],bia:[0,6]};
 Object.keys(KIDS).forEach(function(n){var p=POS[n];TL[n]=[hold(0,0.3,st[n],yawTo(st[n],p),'stand'),mv(0.3,3.1,[st[n],p],'run',{face:'happy',carry:n==='bia'?1:0}),turnTo(3.1,3.4,p,yawTo(st[n],p),YW[n],'stand',{face:'happy',carry:n==='bia'?1:0})];});
 // BIA
 var bl=[ [3.4,4.6,'show'],[4.6,5.2,'dip'],[T.BLOW1,6.7,'blow'],[6.7,10.0,'look'],[10.0,10.5,'dip'],[10.6,11.6,'blow'],[11.6,13.2,'look'],[13.2,13.6,'dip'],[13.6,14.2,'blow'],[14.2,22.0,'look'],[22.0,22.6,'give'],[22.6,34.8,'look'],[34.8,35.2,'take']];
 T.BURSTS.forEach(function(b,i){bl.push([b-0.6,b-0.2,'dip']);bl.push([b-0.2,b+0.8,'blow']);bl.push([b+0.8,(i<4?T.BURSTS[i+1]-0.6:T.ROW0),'look']);});
 bl.sort(function(a,b){return a[0]-b[0];});
 var last=3.4;bl.forEach(function(e){if(e[0]>last)TL.bia.push(hold(last,e[0],B0,0,'look',{face:'happy'}));TL.bia.push(hold(e[0],e[1],B0,0,e[2],function(t,u){var f='happy';if(e[2]==='blow')f='blow';if(t>23.8&&t<25.0)return {face:'happy',tip:1};var lf=laughF(t);if(lf&&e[2]==='look')return lf;return {face:f};}));last=e[1];});
 TL.bia=TL.bia.concat([mv(T.ROW0,T.ROW0+1.0,[B0,ROWP.bia],'walk',{face:'happy'}),turnTo(T.ROW0+1.0,T.ROW1,ROWP.bia,PI,0,'stand',{face:'happy'}),hold(T.ROW1,T.FB0,ROWP.bia,0,'dip'),
  hold(T.FB0,T.FB1,ROWP.bia,0,'blow',{face:'blow'}),hold(T.FB1,T.FB2+0.3,ROWP.bia,0,'look',{face:'wow'}),cust(T.FB2+0.3,END+2,function(t){var b=(t-T.FB2)*BPM/60;return {p:ROWP.bia,yaw:0,pose:'wave',y:0.25*Math.abs(Math.sin(PI*b)),b:b,face:'happy'};})]);
 // LÉO
 TL.leo=TL.leo.concat([ringC('leo',3.4,T.ROW0,function(t){if(t>9.6&&t<10.8)return {cheer:1,face:'happy'};return laughF(t);})]);
 // TEO
 var yTD=yawTo(TB,DP);
 TL.teo=TL.teo.concat([ringC('teo',3.4,21.5,laughF),mv(21.5,22.3,[TP,TB],'walk',{face:'happy'}),turnTo(22.3,22.6,TB,yawTo(TP,TB),yTD,'stand',{face:'happy'}),
  hold(22.6,T.HARD,TB,yTD,'look',{face:'happy',wand:1}),hold(T.HARD,23.6,TB,yTD,'blowHard',{face:'blow',wand:1}),hold(23.6,T.SLOW,TB,yTD,'look',{face:'wow',wand:1}),
  hold(T.SLOW,T.DETACH,TB,yTD,'blow',{face:'blow',wand:1}),hold(T.DETACH,T.HAND2,TB,yTD,'look',function(t){var lf=laughF(t);if(lf){lf.wand=1;return lf;}return {face:'wow',wand:1};}),
  mv(T.HAND2,T.HAND2+0.7,[TB,TP],'walk',{face:'happy'}),turnTo(T.HAND2+0.7,T.HAND2+1.0,TP,yawTo(TB,TP),YW.teo,'stand'),ringC('teo',T.HAND2+1.0,T.ROW0)]);
 // DUDA
 TL.duda=TL.duda.concat([ringC('duda',3.4,T.ARRIVE,laughF),hold(T.ARRIVE,T.FLOAT0,DP,0,'float',{face:'wow'}),
  cust(T.FLOAT0,T.GPOP,function(t,u){var q=t-T.FLOAT0;return {p:[DP[0]+0.15*Math.sin(q*1.7),DP[1]],yaw:0.3*Math.sin(q*1.3),pose:'float',y:0.85*ez(clamp(q/1.6,0,1))+0.06*Math.sin(q*3),face:q<1.2?'wow':'happy'};}),
  cust(T.GPOP,T.GPOP+0.5,function(t,u){var y0=0.85+0.06*Math.sin((T.GPOP-T.FLOAT0)*3);return {p:DP,yaw:0,pose:'ground',y:lerp(y0,GROUND_Y,u*u),sit:S(u,0,0.6),pitch:-0.6*u,face:'wow',flail:1};}),
  hold(T.GPOP+0.5,34.6,DP,0,'ground',function(t){var q=t-T.GPOP-0.5,ph=-0.3-0.4*Math.exp(-q*2)*Math.cos(q*6);return {y:GROUND_Y+0.72*(1-Math.cos(ph)),sit:1,pitch:ph,laugh:1,kick:1,face:'tongue'};}),
  cust(34.6,35.3,function(t,u){return {p:DP,yaw:0,pose:'walk',y:lerp(GROUND_Y,0,S(u,0,0.6))+hopAt(t,34.9,0.35,0.2),sit:1-S(u,0,0.6),pitch:lerp(-0.3,0,S(u,0,0.5)),face:'happy'};}),
  ringC('duda',35.3,T.ROW0)]);
 ['leo','teo','duda'].forEach(function(n){var p=POS[n];TL[n]=TL[n].concat([mv(T.ROW0,T.ROW0+1.1,[p,ROWP[n]],'walk',{face:'happy'}),turnTo(T.ROW0+1.1,T.ROW1,ROWP[n],yawTo(p,ROWP[n]),0,'stand',{face:'happy'}),
  hold(T.ROW1,T.FB2+0.3,ROWP[n],0,'look',function(t){return {face:t>T.FB1?'wow':'happy'};}),cust(T.FB2+0.3,END+2,function(t){var b=(t-T.FB2)*BPM/60+(n==='duda'?0.5:0);return {p:ROWP[n],yaw:0,pose:'wave',y:0.25*Math.abs(Math.sin(PI*b)),b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})]);});
})();
function stateOf(n,t){var c=TL[n],cl=c[0];for(var i=0;i<c.length;i++){if(t>=c[i].t0)cl=c[i];else break;}var u=clamp((t-cl.t0)/Math.max(1e-6,cl.t1-cl.t0),0,1);return cl.f(Math.min(t,cl.t1),u);}
function applyKid(k,s,t){
 var y=s.y||0,pitch=s.pitch||0,roll=s.roll||0,face=s.face||'idle',headX=0,headY=0,sit=s.sit||0;
 var lL=-sit*PI/2,lR=-sit*PI/2,aLx=0,aRx=0,aLz=0,aRz=0,eL=-0.1,eR=-0.1,bt=2*PI*t*BPM/60;
 if(s.pose==='run'){var ph=t*17;lL=Math.sin(ph)*0.95;lR=-lL;y+=Math.abs(Math.sin(ph))*0.14;aLx=-Math.sin(ph)*1.1;aRx=Math.sin(ph)*1.1;eL=eR=-0.7;pitch+=0.12;if(s.carry){aRx=-0.9;eR=-0.8;aLx=-0.8;eL=-0.9;}}
 else if(s.pose==='walk'){var p2=t*11;lL+=Math.sin(p2)*0.55*(1-sit);lR-=Math.sin(p2)*0.55*(1-sit);y+=Math.abs(Math.sin(p2))*0.05;aLx=-Math.sin(p2)*0.6;aRx=Math.sin(p2)*0.6;eL=eR=-0.4;}
 else if(s.pose==='ring'||s.pose==='look'){headX=-0.25;y+=Math.abs(Math.sin(bt*0.5))*0.03;aLx=aRx=-0.3;eL=eR=-0.6;
  if(s.clap>0){var c=s.clap;aLx=aRx=lerp(-0.3,-2.9,c);aLz=lerp(0,0.35,c);aRz=lerp(0,-0.35,c);eL=eR=-0.1;headX=-0.4;}
  if(s.cheer){aLx=aRx=-2.9;aLz=-0.3;aRz=0.3;y+=Math.abs(Math.sin(t*9))*0.15;}
  if(s.laugh){y+=Math.abs(Math.sin(t*13))*0.05;aLx=aRx=-1.0;eL=eR=-1.1;roll+=Math.sin(t*13)*0.04;headX=0;}
  if(s.wowA){aLx=aRx=-2.6;aLz=-0.5;aRz=0.5;}
  if(s.tip){aLx=-2.5;eL=-0.3;}}
 else if(s.pose==='show'){aRx=-2.6;aRz=0.15;eR=-0.2;y+=Math.abs(Math.sin(t*9))*0.08;aLx=-0.6;eL=-0.8;}
 else if(s.pose==='dip'){pitch+=0.45*Math.sin(PI*clamp((t%1e9-0)*0,0,1));aRx=-0.9;eR=-0.2;pitch+=0.35;}
 else if(s.pose==='blow'){aRx=-2.0;eR=-1.5;aRz=-0.15;aLx=-0.3;headX=-0.1;pitch+=-0.05;}
 else if(s.pose==='blowHard'){aRx=-2.0;eR=-1.5;aLx=-0.3;pitch+=0.25*Math.sin(t*14);y+=0.02*Math.sin(t*14);}
 else if(s.pose==='give'){aRx=-1.4;eR=-0.3;aRz=-0.5;}
 else if(s.pose==='float'){aLz=-1.3;aRz=1.3;aLx=aRx=-0.3;lL=-0.3+0.3*Math.sin(t*4);lR=-0.3-0.3*Math.sin(t*4);headX=-0.2;}
 else if(s.pose==='ground'){aLx=aRx=0.55;eL=eR=-0.2;if(s.flail){aLx=aRx=-2.4;aLz=-0.6;aRz=0.6;}if(s.laugh){y+=Math.abs(Math.sin(t*13))*0.03;aLx=aRx=-0.9;eL=eR=-1.0;}if(s.kick){lL+=Math.sin(t*11)*0.35;lR-=Math.sin(t*11)*0.35;}}
 else if(s.pose==='wave'){var b=s.b||0;aRx=-2.8;aRz=0.25+0.45*Math.sin(t*11);eR=-0.3;aLx=-2.0+0.6*Math.sin(PI*b);aLz=-0.5;eL=-0.4;roll+=0.05*Math.sin(PI*b);}
 if(s.wand&&s.pose!=='blow'&&s.pose!=='blowHard'){aRx=-1.0;eR=-0.9;}
 k.root.position.set(s.p[0],y,s.p[1]);k.root.rotation.set(pitch,s.yaw,roll);
 k.legL.rotation.set(lL,0,0);k.legR.rotation.set(lR,0,0);
 k.aL.s.rotation.x=aLx;k.aR.s.rotation.x=aRx;k.aL.s.rotation.z=aLz;k.aR.s.rotation.z=aRz;k.aL.e.rotation.x=eL;k.aR.e.rotation.x=eR;
 k.head.rotation.set(headX,headY,0);setFace(k,face);}
// ===== Pipoca =====
var DG=[hold(0,0.2,[5,5],yawTo([5,5],GP),'stand'),mv(0.2,2.9,[[5,5],GP],'drun'),turnTo(2.9,3.2,GP,yawTo([5,5],GP),yawC(GP),'sit'),
 cust(3.2,T.CH0,function(t){return {p:GP,yaw:yawC(GP),pose:'sit'};}),
 cust(T.CH0,T.NOSE-0.2,function(t,u){var b=hbPos(DOGB,t);var ph=L2(GP,NP,ez(u));return {p:ph,yaw:yawTo(ph,[b.x,b.z]),pose:'snap'};}),
 turnTo(T.NOSE-0.2,T.NOSE,NP,0,-PI/2,'sit'),cust(T.NOSE,T.SNEEZE+0.5,function(t){return {p:NP,yaw:-PI/2,pose:'nose'};}),hold(T.SNEEZE+0.5,21.0,NP,-PI/2,'ringd',{laugh:1}),mv(21.0,21.8,[NP,GP],'drun'),
 turnTo(21.8,22.1,GP,yawTo(NP,GP),yawC(GP),'sit'),cust(22.1,T.ROW0,function(t){return {p:GP,yaw:yawC(GP),pose:'ringd'};}),
 mv(T.ROW0,T.ROW0+1.0,[GP,DROW],'drun'),turnTo(T.ROW0+1.0,T.ROW1,DROW,yawTo(GP,DROW),0,'sit'),hold(T.ROW1,T.FB2+0.3,DROW,0,'sit'),hold(T.FB2+0.3,END+2,DROW,0,'party')];
function dogState(t){var cl=DG[0];for(var i=0;i<DG.length;i++){if(t>=DG[i].t0)cl=DG[i];else break;}var u=clamp((t-cl.t0)/Math.max(1e-6,cl.t1-cl.t0),0,1);return cl.f(Math.min(t,cl.t1),u);}
var SNAPS=[14.5,15.3,16.1];
function applyDog(t){var s=dogState(t),y=0,pitch=0,roll=0,yaw=s.yaw,lp=t*26,legs=[0,0,0,0],hx=0,hz=0;
 if(s.pose==='drun'){legs=[Math.sin(lp)*0.8,-Math.sin(lp)*0.8,-Math.sin(lp)*0.8,Math.sin(lp)*0.8];y+=Math.abs(Math.sin(lp*0.5))*0.12;}
 if(s.pose==='sit'){legs=[0,0,-0.9,-0.9];pitch=-0.25;y+=0.05;}
 if(s.pose==='snap'){SNAPS.forEach(function(sn){var q=t-sn;if(q>-0.25&&q<0.3){y+=0.6*4*((q+0.25)/0.55)*(1-(q+0.25)/0.55);hx=-0.4*Math.sin(clamp((q+0.25)/0.55,0,1)*PI);legs=[-0.8,-0.8,0.8,0.8];}});}
 if(s.pose==='nose'){legs=[0,0,-0.9,-0.9];pitch=-0.25;y+=0.05;hz=0.25*Math.sin(t*2);var q=t-T.SNEEZE;if(q>-0.6&&q<0)hx=-0.25*(1+q/0.6);if(q>=0&&q<0.3)hx=0.45;}
 if(s.pose==='ringd'){legs=[0,0,0,0];var pj=0;POPS.dog.forEach(function(tp){var q=t-tp;if(q>-0.3&&q<0.25){pj=Math.max(pj,0.55*4*((q+0.3)/0.55)*(1-(q+0.3)/0.55));legs=[-0.8,-0.8,0.8,0.8];hx=-0.3;}});y+=pj;if(s.laugh)y+=Math.abs(Math.sin(t*9))*0.12;}
 if(s.pose==='party'){y+=Math.abs(Math.sin(PI*(t-T.FB2)*BPM/60))*0.35;}
 dog.root.position.set(s.p[0],y,s.p[1]);dog.root.rotation.set(pitch,yaw,roll);
 dog.legs.forEach(function(l,i){l.rotation.x=legs[i];});dog.tail.rotation.y=Math.sin(t*20)*0.7;dog.head.rotation.set(hx,0,hz);}
// ===== varinha =====
var _a=new THREE.Vector3();
function holder(t){if(t<T.HAND1||t>=T.HAND2)return 'bia';return 'teo';}
function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_a);return _a.clone();}
var CACHE={};
function tipAt(t){var key='w'+t.toFixed(3);if(CACHE[key])return CACHE[key].clone();var n=holder(t),s=stateOf(n,t);applyKid(KIDS[n],s,t);KIDS[n].root.updateMatrixWorld(true);var h=handR(n);h.y+=0.32;CACHE[key]=h.clone();return h;}
function applyWand(t){var n=holder(t),h=handR(n);WAND.position.set(h.x,h.y+0.25,h.z);WAND.rotation.set(0,KIDS[n].root.rotation.y,0);
 BOTTLE.position.set(t<3.6?handLx('bia').x:BOT[0],t<3.6?handLx('bia').y-0.15:0.14,t<3.6?handLx('bia').z:BOT[1]);}
function handLx(n){KIDS[n].aL.e.children[1].getWorldPosition(_a);return _a.clone();}
// ===== bolhas =====
function rnd2(i){var x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);}
var BUBS2=[],seed=1;
function ambient(t0,n,dur,spread,spd,life,rr,dirFn){for(var i=0;i<n;i++){var ts=t0+dur*i/n;var a=(rnd2(seed++)-0.5)*spread,e=0.2+rnd2(seed++)*0.6,sp=spd[0]+rnd2(seed++)*(spd[1]-spd[0]);var base=dirFn?dirFn(ts):0;
 BUBS2.push({type:'amb',t0:ts,dir:V(Math.sin(base+a)*Math.cos(e),Math.sin(e)*0.6,Math.cos(base+a)*Math.cos(e)).multiplyScalar(sp),r:rr[0]+rnd2(seed++)*(rr[1]-rr[0]),tp:ts+life[0]+rnd2(seed++)*(life[1]-life[0]),ph:rnd2(seed++)*6});}}
function popTarget(n){if(n==='dog'){var g=GP,d=[-g[0],-g[1]],L=Math.hypot(d[0],d[1]);return V(g[0]+d[0]/L*0.75,1.3,g[1]+d[1]/L*0.75);}var p=POS[n],c=[-p[0],-p[1]],L2_=Math.hypot(c[0],c[1])||1;return V(p[0]+c[0]/L2_*0.35,2.65,p[1]+c[1]/L2_*0.35);}
function hero(t0,tp,n){BUBS2.push({type:'hero',t0:t0,tp:tp,n:n,r:0.17+rnd2(seed++)*0.05,ph:rnd2(seed++)*6});}
ambient(T.BURST1,12,1.0,2.6,[0.9,1.7],[2.5,4.2],[0.12,0.2]);ambient(T.BURST2,12,0.7,2.6,[0.9,1.7],[2.5,4.2],[0.12,0.2]);
[['leo',7.4],['teo',7.9],['leo',8.4],['duda',8.9],['leo',9.4]].forEach(function(e,i){hero(T.BURST1+0.1+i*0.12,e[1],e[0]);});
[['teo',11.8],['duda',12.4],['teo',13.0]].forEach(function(e,i){hero(T.BURST2+0.1+i*0.15,e[1],e[0]);});
var DOGB={type:'dogb',t0:T.DOGB,tp:T.SNEEZE,r:0.16,ph:0};BUBS2.push(DOGB);
ambient(T.HARD+0.3,16,0.5,0.8,[1.2,2.0],[0.8,1.5],[0.045,0.065],function(){return yawTo(TB,DP);});
var GB={type:'giant',t0:T.SLOW+0.2,tp:T.GPOP,r:1.0,ph:0};BUBS2.push(GB);
T.BURSTS.forEach(function(b){ambient(b,10,0.6,2.8,[0.9,1.6],[2.4,4.0],[0.12,0.2]);});
var pk=[];Object.keys(POPS).forEach(function(n){POPS[n].forEach(function(tp){if(tp>36)pk.push([tp,n]);});});pk.sort(function(a,b){return a[0]-b[0];});
pk.forEach(function(e){var bs=T.BURSTS.filter(function(b){return b<e[0]-0.9;});var b=bs[bs.length-1];hero(b+0.1+rnd2(seed++)*0.5,e[0],e[1]);});
var FB={type:'final',t0:T.FB0+0.2,tp:T.FB2,r:0.45,ph:0};BUBS2.push(FB);
// alocação de malhas
(function(){var free=BUBM.map(function(){return -1;});BUBS2.sort(function(a,b){return a.t0-b.t0;});BUBS2.forEach(function(b){for(var i=0;i<free.length;i++){if(free[i]<b.t0){b.m=i;free[i]=b.tp+0.35;return;}}b.m=-1;});})();
function bez(a,b,c,d,u){var v=1-u;return a.clone().multiplyScalar(v*v*v).add(b.clone().multiplyScalar(3*v*v*u)).add(c.clone().multiplyScalar(3*v*u*u)).add(d.clone().multiplyScalar(u*u*u));}
function mouthW(){return dog.head.localToWorld(V(0,-0.02,0.42));}
var CAMC=null;
function hbPos(b,t){var tau=t-b.t0,p0;
 if(b.type==='amb'){p0=b.p0||(b.p0=tipAt(b.t0));var k=(1-Math.exp(-tau*1.4))/1.4;return p0.clone().addScaledVector(b.dir,k).add(V(0.08*Math.sin(tau*2+b.ph),0.16*tau+0.05*Math.sin(tau*3+b.ph),0.08*Math.cos(tau*1.7+b.ph)));}
 if(b.type==='hero'){p0=b.p0||(b.p0=tipAt(b.t0));var tg=popTarget(b.n),u=clamp(tau/(b.tp-b.t0),0,1);var c1=p0.clone().add(V((tg.x-p0.x)*0.3,1.0,(tg.z-p0.z)*0.3)),c2=tg.clone().add(V(0,0.6,0));return bez(p0,c1,c2,tg,u).add(V(0.06*Math.sin(tau*3+b.ph),0.04*Math.sin(tau*4),0));}
 if(b.type==='dogb'){p0=b.p0||(b.p0=tipAt(b.t0));var K=[[T.DOGB,p0],[14.6,V(-0.6,1.7,1.7)],[15.4,V(-1.5,1.5,2.2)],[16.2,V(-1.0,1.3,2.6)],[16.9,V(-2.0,1.2,2.6)]];
  if(t>=T.NOSE){var m=mouthW();return m.add(V(-0.06,0.12,0));}
  if(t>=16.9){var m2=mouthAtNose();var u2=(t-16.9)/(T.NOSE-16.9);return K[4][1].clone().lerp(m2,ez(u2));}
  for(var i=1;i<K.length;i++){if(t<K[i][0]){var u3=(t-K[i-1][0])/(K[i][0]-K[i-1][0]);return K[i-1][1].clone().lerp(K[i][1],ez(u3)).add(V(0.05*Math.sin(t*5),0.05*Math.sin(t*4),0));}}return K[4][1];}
 return V(0,0,0);}
function mouthAtNose(){var key='mn';if(CACHE[key])return CACHE[key].clone();var g=V(GP[0],0.05,GP[1]);var m=V(NP[0]-0.48,0.05+0.68*Math.cos(-0.25)+0.12,NP[1]);CACHE[key]=m.clone();return m;}
function giantState(t){var dirTD=V(DP[0]-TB[0],0,DP[1]-TB[1]).normalize();
 if(t<T.DETACH){var tip=tipAt(Math.min(t,T.DETACH));var u=clamp((t-GB.t0)/(T.DETACH-GB.t0),0,1),r=0.85*ez(u)+0.02;return {c:tip.clone().addScaledVector(dirTD,r+0.05),r:r};}
 var det=tipAt(T.DETACH).addScaledVector(dirTD,0.92);var top=V(DP[0],1.15,DP[1]);
 if(t<T.ARRIVE){var u2=(t-T.DETACH)/(T.ARRIVE-T.DETACH);var c=det.clone().lerp(V(DP[0],2.2,DP[1]),ez(u2));c.y+=0.5*Math.sin(PI*u2);return {c:c.add(V(0.1*Math.sin(t*2),0,0)),r:lerp(0.87,1.05,u2)};}
 var d=KIDS.duda.root.position;if(t<T.FLOAT0){var u3=(t-T.ARRIVE)/(T.FLOAT0-T.ARRIVE);return {c:V(DP[0],lerp(2.2,1.15,ez(u3)),DP[1]),r:1.05};}
 return {c:V(d.x,d.y+1.15,d.z),r:1.05+0.03*Math.sin(t*5)};}
function finalState(t){var tip=tipAt(Math.min(t,T.FB1));if(t<T.FB1){var u=clamp((t-FB.t0)/(T.FB1-FB.t0),0,1),r=0.42*ez(u)+0.02;return {c:tip.clone().add(V(0,0,r+0.04)),r:r};}
 var st=tipAt(T.FB1).add(V(0,0,0.46));var tgt=CAMC?CAMC.clone():st.clone().add(V(0,0,5));var u2=ez(clamp((t-T.FB1)/(T.FB2-T.FB1),0,1));var c=st.clone().lerp(tgt,u2);c.y+=0.4*Math.sin(PI*u2);return {c:c,r:lerp(0.44,0.75,u2)};}
var POPLIST=[];
function applyBubbles(t){BUBM.forEach(function(m){m.visible=false;});var di=0;DROPS.forEach(function(d){d.visible=false;});
 BUBS2.forEach(function(b){if(b.m<0)return;var m=BUBM[b.m];var c,r=b.r;
  if(t<b.t0)return;
  if(b.type==='giant'){var g=giantState(Math.min(t,b.tp));c=g.c;r=g.r;}else if(b.type==='final'){var f=finalState(Math.min(t,b.tp));c=f.c;r=f.r;}else{c=hbPos(b,Math.min(t,b.tp));if(b.type!=='dogb')r=b.r*clamp((t-b.t0)/0.25,0.3,1);}
  if(t<b.tp){m.visible=true;m.position.copy(c);m.scale.setScalar(r);m.rotation.y=t*0.5+b.ph;}
  else if(t<b.tp+0.35){var q=(t-b.tp)/0.35;if(q<0.25){m.visible=true;m.position.copy(c);m.scale.setScalar(r*(1+0.4*q/0.25));}
   for(var k=0;k<8&&di<DROPS.length;k++){var d=DROPS[di++],a=k*PI/4+b.ph;d.visible=true;d.position.set(c.x+Math.cos(a)*r*(1+q*1.2),c.y+Math.sin(a*1.3)*r*0.6*(1+q)-q*q*0.4,c.z+Math.sin(a)*r*(1+q*1.2));d.scale.setScalar((1-q)*(b.type==='giant'||b.type==='final'?2.5:1));}}});}
