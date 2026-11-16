var KS=0.6,PI=Math.PI,GROUND_Y=-0.55,BPM=116;
Object.keys(BUBS).forEach(function(k){scene.remove(BUBS[k]);});BUBS={};
[['Amarelinha!',62],['Isso!',100],['Ops!',96],['Ei, Pipoca!',60],['Au au!',84],['Quase!',84],['Ufa!',100],['Uau!',100],['Céu!',110],['Vem brincar com a gente!',40]].forEach(function(b){var m=new THREE.Mesh(new THREE.PlaneGeometry(1.8,0.9),new THREE.MeshBasicMaterial({map:bubTex(b[0],b[1]),transparent:true,depthTest:false}));m.renderOrder=10;m.visible=false;scene.add(m);BUBS[b[0]]=m;});
function faceTex2(k){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d');x.lineCap='round';x.fillStyle='#222';x.strokeStyle='#222';
 function cheeks(){x.fillStyle='rgba(255,110,110,0.6)';x.beginPath();x.ellipse(62,150,16,10,0,0,6.3);x.fill();x.beginPath();x.ellipse(194,150,16,10,0,0,6.3);x.fill();x.fillStyle='#222';}
 if(k==='tongue'){x.lineWidth=11;x.beginPath();x.arc(88,104,16,Math.PI*1.1,Math.PI*1.9);x.stroke();x.beginPath();x.ellipse(168,100,13,20,0,0,6.3);x.fill();cheeks();
  x.beginPath();x.arc(128,138,34,0,Math.PI);x.closePath();x.fill();x.fillStyle='#ff6f91';x.beginPath();x.ellipse(128,182,20,26,0,0,6.3);x.fill();}
 if(k==='wow'){x.beginPath();x.ellipse(88,98,15,24,0,0,6.3);x.fill();x.beginPath();x.ellipse(168,98,15,24,0,0,6.3);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(93,90,5,0,6.3);x.fill();x.beginPath();x.arc(173,90,5,0,6.3);x.fill();x.fillStyle='#222';cheeks();x.beginPath();x.ellipse(128,168,22,26,0,0,6.3);x.fill();}
 if(k==='focus'){x.lineWidth=10;x.beginPath();x.moveTo(70,92);x.lineTo(108,100);x.stroke();x.beginPath();x.moveTo(186,92);x.lineTo(148,100);x.stroke();x.beginPath();x.ellipse(90,114,12,14,0,0,6.3);x.fill();x.beginPath();x.ellipse(166,114,12,14,0,0,6.3);x.fill();cheeks();
  x.lineWidth=9;x.beginPath();x.moveTo(104,166);x.lineTo(152,166);x.stroke();x.fillStyle='#ff6f91';x.beginPath();x.ellipse(146,172,9,8,0,0,6.3);x.fill();}
 var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;}
FT.tongue=faceTex2('tongue');FT.wow=faceTex2('wow');FT.focus=faceTex2('focus');
var KIDS={leo:makeKid(0x2f7de0,0x6b3f26,0x3b4a5c),bia:makeKid(0xff6fa3,0x2a1a10,0x7a5aa8),teo:makeKid(0xff9f1c,0xd9a441,0x3b6aa8),duda:makeKid(0x34d399,0x8b3a2a,0xe9e9e9)};
Object.keys(KIDS).forEach(function(n){KIDS[n].root.rotation.order='YXZ';KIDS[n].root.scale.setScalar(KS);});
var dog=makeDog();dog.root.rotation.order='YXZ';
function lerpAng(a,b,u){var d=((b-a+PI)%(2*PI)+2*PI)%(2*PI)-PI;return a+d*u;}
function yawTo(p,q){return Math.atan2(q[0]-p[0],q[1]-p[1]);}
function L2(a,b,u){return [lerp(a[0],b[0],u),lerp(a[1],b[1],u)];}
function hopAt(t,t0,d,h){var u=(t-t0)/d;return (u>0&&u<1)?h*4*u*(1-u):0;}
function ez(u){return u*u*(3-2*u);}
function V(x,y,z){return new THREE.Vector3(x,y,z);}
var SS=STARTP,P45=[0,-0.7],P78=[0,-2.5];
var SP={leo:[-2.0,0.9],duda:[-2.0,-0.6],teo:[2.0,-0.6],bia:[2.0,0.9]},SY={leo:PI/2,duda:PI/2,teo:-PI/2,bia:-PI/2},DHOME=[2.7,-2.0];
// ===== motor de pulos =====
function hopPlan(t0,start,yaw0,steps,HD,AIRH){var segs=[],t=t0,p=start,yaw=yaw0;
 steps.forEach(function(s){var to=s.to||p,y1=(s.yaw!==undefined)?s.yaw:yaw,air=HD*0.78,gr=HD*0.22+(s.hold||0);
  segs.push({t0:t,t1:t+air,type:'air',p0:p,p1:to,y0:yaw,y1:y1,h:s.h||AIRH,spin:s.spin||0});t+=air;
  segs.push({t0:t,t1:t+gr,type:'ground',p:to,yaw:y1,foot:s.foot||'two',act:s.act,cnt:s.cnt});t+=gr;p=to;yaw=y1;});
 return {segs:segs,end:t,p:p,yaw:yaw};}
function planClip(plan,o){return {t0:plan.segs[0].t0,t1:plan.end,f:function(t){var sg=plan.segs[plan.segs.length-1];for(var i=0;i<plan.segs.length;i++){if(t<plan.segs[i].t1){sg=plan.segs[i];break;}}
 var u=clamp((t-sg.t0)/Math.max(1e-6,sg.t1-sg.t0),0,1),s;
 if(sg.type==='air'){s={p:L2(sg.p0,sg.p1,u),yaw:lerpAng(sg.y0,sg.y1,ez(u))+sg.spin*2*PI*ez(u),pose:'hopAir',y:sg.h*4*u*(1-u),air:Math.sin(PI*u),face:'happy'};}
 else{s={p:sg.p,yaw:sg.yaw,pose:'hopGround',foot:sg.foot,act:sg.act,u:u,tg:t-sg.t0,dur:sg.t1-sg.t0,face:'focus'};}
 if(o){var e=o(t,s);if(e)for(var k in e)s[k]=e[k];}return s;}};}
function sq(k){return k==='45'?P45:k==='78'?P78:k==='ceu'?CEU:k==='S'?SS:SQ[k];}
function stepsOf(list){return list.map(function(e){var k=e[0];return {to:sq(k),foot:e[1]||((k==='45'||k==='78'||k==='ceu'||k==='S')?'two':'one'),yaw:e[2],hold:e[3],act:e[4],spin:e[5],h:e[6]};});}
// ===== clipes =====
function ext(s,o,t,u){if(o){var e=(typeof o==='function')?o(t,u):o;if(e)for(var k in e)s[k]=e[k];}return s;}
function hold(t0,t1,p,yaw,pose,o){return {t0:t0,t1:t1,f:function(t,u){return ext({p:p,yaw:yaw,pose:pose},o,t,u);}};}
function mv(t0,t1,pts,pose,o){var cum=[0];for(var i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));var L=cum[cum.length-1];
 function at(u){var d=clamp(u,0,1)*L;for(var i=1;i<pts.length;i++){if(d<=cum[i]||i===pts.length-1){var w=(cum[i]-cum[i-1])>1e-6?clamp((d-cum[i-1])/(cum[i]-cum[i-1]),0,1):1;return L2(pts[i-1],pts[i],w);}}return pts[pts.length-1];}
 return {t0:t0,t1:t1,f:function(t,u){var e=0.82*u+0.18*ez(u);var p=at(e),a=at(e-0.04),b=at(e+0.04);return ext({p:p,yaw:Math.atan2(b[0]-a[0],b[1]-a[1]),pose:pose},o,t,u);}};}
function cust(t0,t1,fn){return {t0:t0,t1:t1,f:fn};}
function turnTo(t0,t1,p,y0,y1,pose,o){return cust(t0,t1,function(t,u){return ext({p:p,yaw:lerpAng(y0,y1,ez(u)),pose:pose||'stand'},o,t,u);});}
function watchC(t0,t1,n,o){return hold(t0,t1,SP[n],SY[n],'watch',o);}
// ===== linha do tempo =====
var HD=0.46,AH=0.38;
var T={};
T.DS0=4.4;T.DS1=5.1;T.DTH=5.15;T.DREL=5.45;T.DLAND=6.0;T.DH0=6.1;
var planD=hopPlan(T.DH0,SS,PI,stepsOf([['1'],['2'],['45'],['6'],['78'],['ceu'],['ceu','two',0,0.15],['78'],['6'],['45','two',undefined,0.8,'pick3'],['2'],['1'],['S']]),HD,AH);
T.DE=planD.end;T.DPICK=null;planD.segs.forEach(function(s){if(s.act==='pick3')T.DPICK=s.t0+0.35;});
T.TOSS1=T.DE+1.05;T.TOSS1E=T.TOSS1+0.6;
T.TS0=T.DE+1.7;T.TS1=T.DE+2.4;T.TTH=T.DE+2.5;T.TREL=T.DE+3.2;T.TLAND=T.TREL+1.0;var PL=[2.95,-0.9];
T.DOG1=T.TLAND+0.1;T.TGRAB=T.TLAND+0.6;T.CH0=T.TGRAB+0.2;T.CH1=T.CH0+5.0;
var CHP=[[2.95,-1.6],[2.95,-4.3],[0,-5.4],[-2.95,-4.3],[-2.95,3.0],[-0.2,3.05]];
var TEOP=[SS,[2.95,3.0],[2.95,-1.6]].concat(CHP.slice(1,5)).concat([[-1.45,3.1]]);
T.DROP=T.CH1+0.6;T.TPICK=T.CH1+1.2;T.TB0=T.CH1+1.7;T.TB1=T.CH1+3.1;
T.TOSS2=T.CH1+2.1;T.TOSS2E=T.TOSS2+0.7;
T.LS0=T.CH1+3.0;T.LS1=T.LS0+0.7;T.LTH=T.LS1+0.05;T.LREL=T.LTH+0.3;T.LLAND=T.LREL+0.6;T.LH0=T.LLAND+0.15;
var planL=hopPlan(T.LH0,SS,PI,stepsOf([['1'],['2'],['3'],['45'],['78'],['ceu'],['ceu','two',0,0.15],['78','two',undefined,0.8,'pick6'],['45'],['3','one',undefined,1.7,'wobble'],['2'],['1'],['S']]),HD,AH);
T.LE=planL.end;planL.segs.forEach(function(s){if(s.act==='pick6')T.LPICK=s.t0+0.35;if(s.act==='wobble'){T.WB0=s.t0;T.WB1=s.t1;}});
T.P0=T.LE+1.1;T.PGRAB=T.P0+1.5;T.PDROP=T.P0+2.6;T.PH0=T.P0+3.1;
var planP=hopPlan(T.PH0,SS,PI,stepsOf([['2'],['3'],['45'],['6'],['78'],['ceu'],['ceu','two',0,0.2,'spin',1,0.6],['78'],['6'],['45'],['3'],['2','two',undefined,0.5,'pickd'],['S']]),0.36,0.3);
var DEXIT=[0.95,3.3];planP.segs[planP.segs.length-2].p1=DEXIT;planP.segs[planP.segs.length-1].p=DEXIT;
T.PE=planP.end;planP.segs.forEach(function(s){if(s.act==='pickd')T.PPICK=s.t0+0.25;if(s.spin)T.PSPIN=s.t0;});
T.F0=T.PE+0.3;
var COL={duda:[0,3.2],teo:[0,3.85],leo:[0,4.5],bia:[0,5.15]},ORD=['duda','teo','leo','bia'];
var FIN={duda:[-1.35,-4.2],teo:[1.35,-4.2],leo:[-0.45,-4.45],bia:[0.45,-4.45]},DFIN=[0,-5.15];
var PLANF={};ORD.forEach(function(n,i){var t0=T.F0+1.4+i*0.92;var st=[[SS[0],SS[1]]];if(n!=='duda')st=[];
 var list=(n==='duda'?[]:[['S']]).concat([['1'],['2'],['3'],['45'],['6'],['78'],['ceu']]);var steps=stepsOf(list);steps.push({to:FIN[n],foot:'two',yaw:PI});
 PLANF[n]=hopPlan(t0,COL[n],PI,steps,HD,AH);});
T.FE=Math.max.apply(null,ORD.map(function(n){return PLANF[n].end;}));T.CJ=T.FE+0.4;T.END=T.CJ+7.6;
var END=T.END;
// ===== crianças =====
var TL={};
function thrower(n,ts0,ts1,tth,trel,big){return [mv(ts0,ts1,[SP[n],SS],'walk',{face:'happy'}),turnTo(ts1,tth,SS,yawTo(SP[n],SS),PI,'stand',{face:'focus'}),
 cust(tth,trel+0.35,function(t,u){var q=(t-tth)/(trel-tth);return {p:SS,yaw:PI,pose:'throw',q:clamp(q,0,1.4),big:big?1:0,face:'focus'};})];}
(function(){
 var starts={leo:[-6,2.5],duda:[-6,-1.5],teo:[6,-1.5],bia:[6,2.5]};
 Object.keys(KIDS).forEach(function(n){TL[n]=[hold(0,0.3,starts[n],yawTo(starts[n],SP[n]),'stand'),mv(0.3,3.0,[starts[n],SP[n]],'run',{face:'happy'}),turnTo(3.0,3.4,SP[n],yawTo(starts[n],SP[n]),SY[n],'stand',{face:'happy'})];});
 var laughW=function(t){var l=(t>T.CH0&&t<T.CH1+1.5);return {laugh:l?1:0,face:l?'tongue':((t>T.WB0&&t<T.WB1)?'wow':((T.PSPIN&&t>T.PSPIN-0.2&&t<T.PSPIN+1.2)?'wow':'happy'))};};
 // DUDA
 TL.duda=TL.duda.concat([hold(3.4,T.DS0,SP.duda,SY.duda,'watch',function(t){return {show:(t>3.0&&t<4.4)?1:0,face:'happy'};})]).concat(thrower('duda',T.DS0,T.DS1,T.DTH,T.DREL,false)).concat([
  planClip(planD),hold(T.DE,T.DE+1.0,SS,0,'cheer',{face:'happy'}),mv(T.DE+1.0,T.DE+2.0,[SS,SP.duda],'walk',{face:'happy'}),turnTo(T.DE+2.0,T.DE+2.3,SP.duda,yawTo(SS,SP.duda),SY.duda,'stand'),
  watchC(T.DE+2.3,T.F0,'duda',laughW),mv(T.F0,T.F0+1.2,[SP.duda,COL.duda],'walk',{face:'happy'}),turnTo(T.F0+1.2,T.F0+1.4,COL.duda,yawTo(SP.duda,COL.duda),PI,'stand',{face:'happy'}),
  planClip(PLANF.duda)]);
 // TEO
 TL.teo=TL.teo.concat([watchC(3.4,T.TS0,'teo',function(t){var c=(t>T.TOSS1E-0.1&&t<T.TS0)?1:0;return {catchA:c,face:'happy'};})]).concat(thrower('teo',T.TS0,T.TS1,T.TTH,T.TREL,true)).concat([
  hold(T.TREL+0.35,T.CH0+0.3,SS,PI,'stand',function(t){return {face:'wow',facepalm:t>T.TREL+0.5?1:0};}),
  mv(T.CH0+0.3,T.CH1+0.7,TEOP,'run',{face:'happy'}),turnTo(T.CH1+0.7,T.CH1+0.9,TEOP[TEOP.length-1],PI/2,PI/2,'stand',{face:'tongue'}),
  cust(T.CH1+0.9,T.TB0,function(t,u){return {p:TEOP[TEOP.length-1],yaw:PI/2,pose:'pick',pitch:0.7*Math.sin(PI*u),face:'tongue'};}),
  mv(T.TB0,T.TB1,[TEOP[TEOP.length-1],SP.teo],'walk',{face:'happy'}),turnTo(T.TB1,T.TB1+0.3,SP.teo,yawTo(TEOP[TEOP.length-1],SP.teo),SY.teo,'stand'),
  watchC(T.TB1+0.3,T.F0,'teo',laughW),mv(T.F0,T.F0+1.2,[SP.teo,COL.teo],'walk',{face:'happy'}),turnTo(T.F0+1.2,T.F0+1.4,COL.teo,yawTo(SP.teo,COL.teo),PI,'stand',{face:'happy'}),
  hold(T.F0+1.4,PLANF.teo.segs[0].t0,COL.teo,PI,'stand',{face:'happy'}),planClip(PLANF.teo)]);
 // LÉO
 TL.leo=TL.leo.concat([watchC(3.4,T.LS0,'leo',function(t){var e=laughW(t);if(t>T.TOSS2E-0.1)e.catchA=1;return e;})]).concat(thrower('leo',T.LS0,T.LS1,T.LTH,T.LREL,false)).concat([
  planClip(planL,function(t,s){if(s.act==='wobble'){var w=s.tg,dec=1-S(w,1.1,1.6);return {face:w<1.2?'wow':'happy',roll:0.38*Math.sin(w*8.5)*dec,wob:dec};}return null;}),
  hold(T.LE,T.LE+0.6,SS,0,'cheer',{face:'happy'}),mv(T.LE+0.6,T.LE+1.3,[SS,SP.leo],'walk',{face:'happy'}),turnTo(T.LE+1.3,T.LE+1.5,SP.leo,yawTo(SS,SP.leo),SY.leo,'stand'),
  watchC(T.LE+1.5,T.F0,'leo',function(t){var e=laughW(t);if(t<T.PGRAB+0.2)e.offer=1;return e;}),mv(T.F0,T.F0+1.2,[SP.leo,COL.leo],'walk',{face:'happy'}),turnTo(T.F0+1.2,T.F0+1.4,COL.leo,yawTo(SP.leo,COL.leo),PI,'stand',{face:'happy'}),
  hold(T.F0+1.4,PLANF.leo.segs[0].t0,COL.leo,PI,'stand',{face:'happy'}),planClip(PLANF.leo)]);
 // BIA
 TL.bia=TL.bia.concat([watchC(3.4,T.F0,'bia',laughW),mv(T.F0,T.F0+1.2,[SP.bia,COL.bia],'walk',{face:'happy'}),turnTo(T.F0+1.2,T.F0+1.4,COL.bia,yawTo(SP.bia,COL.bia),PI,'stand',{face:'happy'}),
  hold(T.F0+1.4,PLANF.bia.segs[0].t0,COL.bia,PI,'stand',{face:'happy'}),planClip(PLANF.bia)]);
 ORD.forEach(function(n){TL[n].push(cust(PLANF[n].end,END+2,function(t){var q=t-T.CJ;var y=(q>0&&q<0.65)?0.75*4*(q/0.65)*(1-q/0.65):0;var b=(t-T.CJ)*BPM/60;
  return {p:FIN[n],yaw:PI,pose:q<0.8?'cheer':'wave',y:y+(q>0.8?0.25*Math.abs(Math.sin(PI*b)):0),b:b,face:(q>0.8&&Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
function stateOf(n,t){var c=TL[n],cl=c[0];for(var i=0;i<c.length;i++){if(t>=c[i].t0)cl=c[i];else break;}var u=clamp((t-cl.t0)/Math.max(1e-6,cl.t1-cl.t0),0,1);return cl.f(Math.min(t,cl.t1),u);}
function applyKid(k,s,t){
 var y=s.y||0,pitch=s.pitch||0,roll=s.roll||0,face=s.face||'idle',headY=0,sit=s.sit||0;
 var lL=0,lR=0,lLz=0,lRz=0,aLx=0,aRx=0,aLz=0,aRz=0,eL=-0.1,eR=-0.1,bt=2*PI*t*BPM/60;
 if(s.pose==='run'){var ph=t*17;lL=Math.sin(ph)*0.95;lR=-lL;y+=Math.abs(Math.sin(ph))*0.14;aLx=-Math.sin(ph)*1.1;aRx=Math.sin(ph)*1.1;eL=eR=-0.7;pitch+=0.12;}
 else if(s.pose==='walk'){var p2=t*11;lL=Math.sin(p2)*0.55;lR=-lL;y+=Math.abs(Math.sin(p2))*0.05;aLx=-Math.sin(p2)*0.6;aRx=Math.sin(p2)*0.6;eL=eR=-0.4;}
 else if(s.pose==='watch'){y+=Math.abs(Math.sin(bt*0.5))*0.03;aLx=aRx=-0.2;eL=eR=-0.5;headY=Math.sin(t*0.9)*0.15;
  if(s.show){aRx=-2.4;aRz=0.2;eR=-0.3;y+=Math.abs(Math.sin(t*9))*0.08;}
  if(s.laugh){y+=Math.abs(Math.sin(t*13))*0.05;aLx=aRx=-1.0;eL=eR=-1.1;roll+=Math.sin(t*13)*0.04;}
  if(s.catchA){aRx=-1.4;aRz=-0.2;eR=-0.5;}if(s.offer){aRx=-1.3;eR=-0.3;}}
 else if(s.pose==='throw'){var q=s.q||0;if(s.big){var sw=q<1?q:1;aRx=-(sw*2*PI*1.1)-0.6;eR=-0.2;aLx=-0.6;aLz=-0.5;pitch+=0.1*Math.sin(q*PI);}
  else{aRx=q<0.6?lerp(-0.2,0.9,q/0.6):lerp(0.9,-1.8,clamp((q-0.6)/0.4,0,1));eR=-0.2;aLx=-0.5;lL=-0.25;pitch+=q>0.6?0.15:-0.05;}}
 else if(s.pose==='hopAir'){var a=s.air||0;lL=lR=-0.45*a;aLx=aRx=-0.5-0.8*a;aLz=-0.6;aRz=0.6;eL=eR=-0.4;}
 else if(s.pose==='hopGround'){var u=s.u||0;y+=-0.06*Math.sin(PI*clamp(s.tg/0.12,0,1));
  if(s.foot==='one'){lR=1.15;eL=eR=-0.3;aLz=-1.2;aRz=1.2;aLx=aRx=-0.2;}else{lLz=0.16;lRz=-0.16;aLz=-0.7;aRz=0.7;aLx=aRx=-0.3;}
  if(s.act==='pick3'||s.act==='pick6'){var g=Math.sin(PI*clamp(s.tg/s.dur,0,1));pitch+=0.75*g;aRx=lerp(aRx,-1.5,g);aRz=lerp(aRz,0,g);}
  if(s.act==='wobble'){var wb=s.wob||0;aLx=Math.sin(t*14)*1.6*wb-0.2;aRx=-Math.sin(t*14)*1.6*wb-0.2;aLz=-1.3;aRz=1.3;lR=1.15+0.3*Math.sin(t*9)*wb;}}
 else if(s.pose==='pick'){aRx=-1.5;eR=-0.2;aLx=-0.4;}
 else if(s.pose==='cheer'){aLx=aRx=-2.9;aLz=-0.3+0.15*Math.sin(t*12);aRz=0.3-0.15*Math.sin(t*12);eL=eR=-0.2;y+=Math.abs(Math.sin(t*PI*2.2))*0.3;}
 else if(s.pose==='wave'){var b=s.b||0;aRx=-2.8;aRz=0.25+0.45*Math.sin(t*11);eR=-0.3;aLx=-2.0+0.6*Math.sin(PI*b);aLz=-0.5;eL=-0.4;roll+=0.05*Math.sin(PI*b);}
 else if(s.pose==='stand'){if(s.facepalm){aRx=-2.6;aRz=-0.6;eR=-1.6;y+=0.02*Math.sin(t*8);}}
 k.root.position.set(s.p[0],y,s.p[1]);k.root.rotation.set(pitch,s.yaw,roll);
 k.legL.rotation.set(lL,0,lLz);k.legR.rotation.set(lR,0,lRz);
 k.aL.s.rotation.x=aLx;k.aR.s.rotation.x=aRx;k.aL.s.rotation.z=aLz;k.aR.s.rotation.z=aRz;k.aL.e.rotation.x=eL;k.aR.e.rotation.x=eR;
 k.head.rotation.y=headY;setFace(k,face);}
// ===== Pipoca =====
var DG=[hold(0,0.2,[5,-3.5],yawTo([5,-3.5],DHOME),'stand'),mv(0.2,2.8,[[5,-3.5],DHOME],'drun'),turnTo(2.8,3.1,DHOME,yawTo([5,-3.5],DHOME),-PI/2,'sit'),
 hold(3.1,T.DOG1,DHOME,-PI/2,'sit'),mv(T.DOG1,T.TGRAB-0.15,[DHOME,[2.95,-1.6]],'drun'),turnTo(T.TGRAB-0.15,T.CH0,[2.95,-1.6],0,0,'bite'),
 mv(T.CH0,T.CH1,CHP,'drun'),turnTo(T.CH1,T.CH1+0.4,CHP[CHP.length-1],PI/2,-PI/2,'stand'),hold(T.CH1+0.4,T.CH1+1.4,CHP[CHP.length-1],-PI/2,'barkS'),
 mv(T.CH1+1.4,T.CH1+3.4,[CHP[CHP.length-1],[2.95,3.0],[2.95,-2.0],DHOME],'drun'),turnTo(T.CH1+3.4,T.CH1+3.7,DHOME,PI,-PI/2,'sit'),
 hold(T.CH1+3.7,T.P0+0.3,DHOME,-PI/2,'sit',function(t){return {bark:(t>T.P0)?1:0};}),
 mv(T.P0+0.3,T.P0+1.3,[DHOME,[-1.15,0.9]],'drun'),turnTo(T.P0+1.3,T.P0+1.7,[-1.15,0.9],yawTo(DHOME,[-1.15,0.9]),-PI/2,'bite'),
 mv(T.P0+1.7,T.P0+2.4,[[-1.15,0.9],[-0.7,3.0],[0,2.75]],'drun'),turnTo(T.P0+2.4,T.P0+2.7,[0,2.75],PI/2,PI,'bite'),
 cust(T.P0+2.7,T.PH0,function(t,u){return {p:L2([0,2.75],SS,ez(u)),yaw:PI,pose:'stand'};}),
 planClip(planP,function(t,s){s.pose=s.pose==='hopAir'?'dhopAir':'dhopGround';return null;}),
 turnTo(T.PE,T.PE+0.2,DEXIT,0,PI/2,'stand'),mv(T.PE+0.2,T.PE+2.6,[DEXIT,[2.95,2.4],[2.95,-4.6],DFIN],'drun'),turnTo(T.PE+2.6,T.PE+2.9,DFIN,-PI/2,PI,'sit'),
 cust(T.PE+2.9,END+2,function(t){var q=t-T.CJ;return {p:DFIN,yaw:PI,pose:q>0?'party':'sit'};})];
function dogState(t){var cl=DG[0];for(var i=0;i<DG.length;i++){if(t>=DG[i].t0)cl=DG[i];else break;}var u=clamp((t-cl.t0)/Math.max(1e-6,cl.t1-cl.t0),0,1);return cl.f(Math.min(t,cl.t1),u);}
function applyDog(t){var s=dogState(t),y=s.y||0,pitch=0,roll=0,yaw=s.yaw,lp=t*26,legs=[0,0,0,0],hx=0;
 if(s.pose==='drun'){legs=[Math.sin(lp)*0.8,-Math.sin(lp)*0.8,-Math.sin(lp)*0.8,Math.sin(lp)*0.8];y+=Math.abs(Math.sin(lp*0.5))*0.12;}
 if(s.pose==='sit'){legs=[0,0,-0.9,-0.9];pitch=-0.25;y+=0.05;if(s.bark){y+=hopAt(t,T.P0+0.05,0.3,0.25);hx=-0.3*Math.abs(Math.sin(t*14));}}
 if(s.pose==='bite')hx=0.3;
 if(s.pose==='barkS'){y+=hopAt(t,T.CH1+0.5,0.3,0.25);hx=-0.3*Math.abs(Math.sin(t*14));}
 if(s.pose==='dhopAir'){var a=s.air||0;legs=[-0.9*a,-0.9*a,0.9*a,0.9*a];}
 if(s.pose==='dhopGround'){if(s.act==='pickd')hx=0.4*Math.sin(PI*clamp(s.tg/s.dur,0,1));}
 if(s.pose==='party'){y+=Math.abs(Math.sin(PI*(t-T.CJ)*BPM/60))*0.35;}
 dog.root.position.set(s.p[0],y,s.p[1]);dog.root.rotation.set(pitch,yaw,roll);
 dog.legs.forEach(function(l,i){l.rotation.x=legs[i];});dog.tail.rotation.y=Math.sin(t*20)*0.7;dog.head.rotation.x=hx;}
// ===== pedrinha =====
var _a=new THREE.Vector3();
function handR(n){var k=KIDS[n];k.aR.e.children[1].getWorldPosition(_a);return _a.clone();}
function mouth(){return dog.head.localToWorld(V(0,-0.1,0.45));}
function g(p){return V(p[0],0.2,p[1]);}
function arc(a,b,u,h){var p=a.clone().lerp(b,u);p.y+=h*4*u*(1-u);return p;}
function pebble(t){var P;
 if(t<T.DREL)P=handR('duda');
 else if(t<T.DLAND)P=arc(handAt('duda',T.DREL),g(SQ['3']),(t-T.DREL)/(T.DLAND-T.DREL),1.1);
 else if(t<T.DPICK)P=g(SQ['3']);
 else if(t<T.DPICK+0.3)P=g(SQ['3']).lerp(handR('duda'),(t-T.DPICK)/0.3);
 else if(t<T.TOSS1)P=handR('duda');
 else if(t<T.TOSS1E)P=arc(handAt('duda',T.TOSS1),handAt('teo',T.TOSS1E),(t-T.TOSS1)/(T.TOSS1E-T.TOSS1),1.5);
 else if(t<T.TREL)P=handR('teo');
 else if(t<T.TLAND)P=arc(handAt('teo',T.TREL),g(PL),(t-T.TREL)/(T.TLAND-T.TREL),3.2);
 else if(t<T.TGRAB)P=g(PL);
 else if(t<T.DROP)P=mouth();
 else if(t<T.DROP+0.25){var m=mouthAt(T.DROP);P=m.clone().lerp(V(m.x,0.2,m.z),(t-T.DROP)/0.25);}
 else if(t<T.TPICK){var m2=mouthAt(T.DROP);P=V(m2.x,0.2,m2.z);}
 else if(t<T.TPICK+0.3){var m3=mouthAt(T.DROP);P=V(m3.x,0.2,m3.z).lerp(handR('teo'),(t-T.TPICK)/0.3);}
 else if(t<T.TOSS2)P=handR('teo');
 else if(t<T.TOSS2E)P=arc(handAt('teo',T.TOSS2),handAt('leo',T.TOSS2E),(t-T.TOSS2)/(T.TOSS2E-T.TOSS2),1.8);
 else if(t<T.LREL)P=handR('leo');
 else if(t<T.LLAND)P=arc(handAt('leo',T.LREL),g(SQ['6']),(t-T.LREL)/(T.LLAND-T.LREL),1.1);
 else if(t<T.LPICK)P=g(SQ['6']);
 else if(t<T.LPICK+0.3)P=g(SQ['6']).lerp(handR('leo'),(t-T.LPICK)/0.3);
 else if(t<T.PGRAB)P=handR('leo');
 else if(t<T.PDROP)P=mouth();
 else if(t<T.PDROP+0.25){var m4=mouthAt(T.PDROP);P=m4.clone().lerp(g(SQ['1']),(t-T.PDROP)/0.25);}
 else if(t<T.PPICK)P=g(SQ['1']);
 else P=mouth();
 PEB.position.copy(P);PEB.rotation.set(t*3,t*2,0);if(t>T.DLAND&&t<T.DPICK||t>T.LLAND&&t<T.LPICK||t>T.PDROP+0.25&&t<T.PPICK)PEB.rotation.set(0,0.3,0);}
var CACHE={};
function handAt(n,t){var key=n+t;if(CACHE[key])return CACHE[key].clone();var s=stateOf(n,t);applyKid(KIDS[n],s,t);KIDS[n].root.updateMatrixWorld(true);var h=handR(n);CACHE[key]=h.clone();return h;}
function mouthAt(t){var key='m'+t;if(CACHE[key])return CACHE[key].clone();applyDog(t);dog.root.updateMatrixWorld(true);var m=mouth();CACHE[key]=m.clone();return m;}
// ===== efeitos =====
var CONF=[],CC=[0xff6b8a,0xffd166,0x5bd6a4,0x7aa7ff,0xc39bff];
for(var i=0;i<150;i++){var m=box(0.13,0.13,0.13,CC[i%5]);m.visible=false;m.castShadow=false;scene.add(m);CONF.push(m);}
var BURST=[[T.DE+0.1,[0,3.15]],[T.PSPIN+0.3,[0,-3.4]],[T.CJ+0.2,[0,-4.4]],[T.CJ+3.0,[0,-4.4]],[T.CJ+5.6,[0,-4.4]]];
function particles(t){CONF.forEach(function(m,i){var b=i%5,ct=t-BURST[b][0];if(ct<0||ct>2.0){m.visible=false;return;}
 var bp=BURST[b][1],a=i*2.399,v=0.6+(i%5)*0.3,vy=4.2+(i%7)*0.4,s=clamp((2.0-ct)/0.4,0,1);
 m.visible=true;m.position.set(bp[0]+Math.cos(a)*v*ct,Math.max(0.1,1.8+vy*ct-4.9*ct*ct),bp[1]+Math.sin(a)*v*ct);m.rotation.set(ct*3+i,ct*4,ct*5);m.scale.setScalar(Math.max(s,0.001));});
 CLOTHES.forEach(function(c,i){c.rotation.z=Math.sin(t*1.6+i*0.9)*0.22;});}
var camPosV=new THREE.Vector3();
function kp(n,dy,dx){return function(){var p=KIDS[n].root.position;return [p.x+(dx||0),dy,p.z];};}
function dp(dy){return function(){var p=dog.root.position;return [p.x,p.y+dy,p.z];};}
var BW=[['Amarelinha!',3.0,4.6,kp('duda',2.5),1],['Isso!',T.DE,T.DE+1.3,kp('duda',2.5),1],['Ops!',T.TREL+0.5,T.TREL+1.8,kp('teo',2.5),1],
 ['Ei, Pipoca!',T.CH0+0.3,T.CH0+1.8,kp('teo',2.5),1],['Au au!',T.CH1+0.4,T.CH1+1.4,dp(1.2),0.75],['Quase!',T.WB0+0.15,T.WB0+1.4,kp('leo',2.5),1],['Ufa!',T.WB1-0.1,T.WB1+1.2,kp('leo',2.5),1],
 ['Au au!',T.P0,T.P0+1.1,dp(1.2),0.75],['Uau!',T.PSPIN,T.PSPIN+1.3,kp('bia',2.5,-0.5),1],['Céu!',T.CJ,T.CJ+1.5,function(){return [0,2.6,-4.4];},1.1],['Vem brincar com a gente!',T.CJ+2.4,END+1,function(){return [0,2.7,-4.4];},0.95]];
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*w[4];
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));m.position.set(p[0],p[1]+0.45*k,p[2]);m.quaternion.copy(camera.quaternion);}});}
// ===== câmera vertical automática =====
var _cam=new THREE.PerspectiveCamera(50,W/H,0.1,300);
function pos2(n){return n==='dog'?dog.root.position:KIDS[n].root.position;}
function frameOn(names,aDeg,eDeg,fov,m,extra){var pts=[],mn=[1e9,1e9],mx=[-1e9,-1e9];
 function addP(x,z,top){pts.push(V(x,0,z),V(x,top,z));mn[0]=Math.min(mn[0],x);mn[1]=Math.min(mn[1],z);mx[0]=Math.max(mx[0],x);mx[1]=Math.max(mx[1],z);}
 names.forEach(function(n){var p=pos2(n);addP(p.x,p.z,n==='dog'?1.15:2.9);});(extra||[]).forEach(function(e){addP(e[0],e[1],0.3);});
 var hasKid=names.some(function(n){return n!=='dog';});var c=V((mn[0]+mx[0])/2,hasKid?1.3:0.55,(mn[1]+mx[1])/2);
 var a=aDeg*PI/180,e=eDeg*PI/180,dir=V(Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e));
 _cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(c).add(dir);_cam.lookAt(c);_cam.updateMatrixWorld();
 var r=V(1,0,0).applyQuaternion(_cam.quaternion),u=V(0,1,0).applyQuaternion(_cam.quaternion),f=dir.clone().negate();
 var tv=Math.tan(fov*PI/360),th=tv*W/H,D=2;
 pts.forEach(function(p){var v=p.clone().sub(c),x=Math.abs(v.dot(r))+0.45,y=Math.abs(v.dot(u))+0.35,z=v.dot(f);D=Math.max(D,x/(th*(1-m))+z,y/(tv*(1-m))+z);});
 var pos=c.clone().addScaledVector(dir,D);return {pos:[pos.x,pos.y,pos.z],look:[c.x,c.y,c.z],fov:fov};}
var ALL=['leo','bia','teo','duda','dog'],GP=[[0,2.75],[0,-3.9]];
function near(n,r){var p=pos2(n);return [[p.x,p.z-r],[p.x,p.z+r]];}
var SH=[[0,4.4,function(t){return frameOn(ALL,25,lerp(50,22,ez(lin(t,0,4.0))),50,0.1,GP);}],
 [4.4,T.DH0,function(){return frameOn(['duda'],30,12,46,0.22);}],
 [T.DH0,T.DE,function(){return frameOn(ALL,0,36,48,0.08,GP);}],
 [T.DE,T.TS0,function(){return frameOn(ALL,15,18,50,0.1);}],
 [T.TS0,T.TREL+0.3,function(){return frameOn(['teo'],-30,12,46,0.22);}],
 [T.TREL+0.3,T.CH0,function(){return frameOn(['teo','dog'],20,20,50,0.12);}],
 [T.CH0,T.CH1+0.8,function(){return frameOn(ALL,0,40,52,0.1,[[2.45,-5.3],[-2.45,3.1]]);}],
 [T.CH1+0.8,T.LS0,function(){return frameOn(ALL,20,16,48,0.1);}],
 [T.LS0,T.LH0,function(){return frameOn(['leo'],30,12,46,0.22);}],
 [T.LH0,T.WB0,function(){return frameOn(ALL,0,36,48,0.08,GP);}],
 [T.WB0,T.WB1,function(){return frameOn(['leo'],10,10,44,0.25);}],
 [T.WB1,T.P0,function(){return frameOn(ALL,0,36,48,0.08,GP);}],
 [T.P0,T.PH0,function(){return frameOn(['dog','leo'],25,15,48,0.15);}],
 [T.PH0,T.PE,function(){return frameOn(['dog'],0,34,46,0.15,near('dog',1.6));}],
 [T.PE,T.F0+1.4,function(){return frameOn(ALL,20,18,50,0.1);}],
 [T.F0+1.4,T.FE-1.6,function(){return frameOn(ALL,0,42,50,0.1);}],[T.FE-1.6,T.CJ,function(){return frameOn(ALL,135,22,50,0.1,[[0,-3.0]]);}],
 [T.CJ,END+2,function(t){var u=lin(t,T.CJ,END);return frameOn(ALL,135,lerp(14,20,u),50,0.17);}]];
function cam(t){for(var i=0;i<SH.length;i++)if(t>=SH[i][0]&&t<SH[i][1])return SH[i][2](t);return SH[SH.length-1][2](t);}
function frame(t){var ST={};
 Object.keys(KIDS).forEach(function(n){ST[n]=stateOf(n,t);applyKid(KIDS[n],ST[n],t);});applyDog(t);
 scene.updateMatrixWorld(true);pebble(t);
 Object.keys(KIDS).forEach(function(n){applyKid(KIDS[n],ST[n],t);});applyDog(t);scene.updateMatrixWorld(true);pebble(t);
 var c=window.CO||cam(t);camera.fov=c.fov;camera.updateProjectionMatrix();camera.position.set(c.pos[0],c.pos[1],c.pos[2]);camera.lookAt(c.look[0],c.look[1],c.look[2]);camera.updateMatrixWorld();camPosV.copy(camera.position);
 particles(t);bubbles(t);renderer.render(scene,camera);}
window.frame=frame;window.TOTAL=END;window.TL=T;window.PLANS={D:planD.segs.map(function(s){return [s.t0,s.type];}),L:planL.segs.map(function(s){return [s.t0,s.type];}),P:planP.segs.map(function(s){return [s.t0,s.type];}),F:ORD.map(function(n){return PLANF[n].segs.map(function(s){return [s.t0,s.type];});})};
frame(0);
})();
</script></body></html>
