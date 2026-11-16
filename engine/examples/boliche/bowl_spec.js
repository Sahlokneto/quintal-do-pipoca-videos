var TS=[0,3.3],SP={leo:[-2.0,1.0],duda:[-2.0,-0.5],teo:[2.0,-0.5],bia:[2.0,1.0]},SY={leo:PI/2,duda:PI/2,teo:-PI/2,bia:-PI/2},DH=[2.6,-2.4],BR=0.24,BALLRET=[-0.35,2.95];
function ext(s,o,t,u){if(o){var e=(typeof o==='function')?o(t,u):o;if(e)for(var k in e)s[k]=e[k];}return s;}
function hold(t0,t1,p,yaw,pose,o){return {t0:t0,t1:t1,f:function(t,u){return ext({p:p,yaw:yaw,pose:pose},o,t,u);}};}
function mv(t0,t1,pts,pose,o){var cum=[0];for(var i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));var L=cum[cum.length-1];
 function at(u){var d=clamp(u,0,1)*L;for(var i=1;i<pts.length;i++){if(d<=cum[i]||i===pts.length-1){var w=(cum[i]-cum[i-1])>1e-6?clamp((d-cum[i-1])/(cum[i]-cum[i-1]),0,1):1;return L2(pts[i-1],pts[i],w);}}return pts[pts.length-1];}
 return {t0:t0,t1:t1,at:at,f:function(t,u){var e=0.82*u+0.18*ez(u);var p=at(e),a=at(e-0.04),b=at(e+0.04);return ext({p:p,yaw:Math.atan2(b[0]-a[0],b[1]-a[1]),pose:pose},o,t,u);}};}
function cust(t0,t1,fn){return {t0:t0,t1:t1,f:fn};}
function turnTo(t0,t1,p,y0,y1,pose,o){return cust(t0,t1,function(t,u){return ext({p:p,yaw:lerpAng(y0,y1,ez(u)),pose:pose||'stand'},o,t,u);});}
// ===== bola: segmentos =====
function polyAt(pts,u){var cum=[0];for(var i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));var d=clamp(u,0,1)*cum[cum.length-1];
 for(var i=1;i<pts.length;i++){if(d<=cum[i]||i===pts.length-1){var w=(cum[i]-cum[i-1])>1e-6?clamp((d-cum[i-1])/(cum[i]-cum[i-1]),0,1):1;return L2(pts[i-1],pts[i],w);}}return pts[pts.length-1];}
function eo2(u){return 1-(1-u)*(1-u);}function eo3(u){return 1-Math.pow(1-u,3);}
var BS=[];
function bHand(t0,t1,n){BS.push({t0:t0,t1:t1,type:'hand',n:n});}
function bToss(t0,t1,a,b){BS.push({t0:t0,t1:t1,type:'toss',a:a,b:b});}
function bPath(t0,t1,pts,ease){BS.push({t0:t0,t1:t1,type:'path',pts:pts,ease:ease||function(u){return u;}});}
function bRest(t0,t1,p){BS.push({t0:t0,t1:t1,type:'path',pts:[p,p],ease:function(u){return u;}});}
function bPick(t0,t1,p,n){BS.push({t0:t0,t1:t1,type:'pick',p:p,n:n});}
var T={};
T.TOSS0=4.0;T.TOSS1=4.6;T.BW0=4.7;T.BW1=5.4;T.BSW=5.5;T.REL1=T.BSW+0.68*0.8;T.STOP1=T.REL1+2.55;
var P1=[[-0.18,2.85],[-0.18,-4.6]];
T.DG1a=T.STOP1+0.1;
T.TW0=14.4;T.TW1=15.2;T.TPK=15.4;T.TPKh=15.7;T.TSW=16.0;T.REL2=T.TSW+1.2;T.STOP2=T.REL2+1.7;
var P2=[[0.05,2.85],[-0.4,0.6],[-1.2,-1.6],[-2.2,-3.6],[-3.0,-5.0]];
T.DW0=22.2;T.DW1=23.0;T.DPK=23.0;T.DPKh=23.3;T.DAIM=23.5;T.DSW=24.3;T.REL3=T.DSW+0.68*0.8;T.STOP3=T.REL3+3.25;
var P3=[[0,2.85],[0,-2.72]];
T.WOB=T.STOP3+1.2;T.F3=T.WOB+0.8;
T.LW0=36.6;T.LW1=37.3;T.LPK=37.3;T.LPKh=37.6;T.LSW=37.8;T.REL4=T.LSW+0.68*0.8;T.STOP4=T.REL4+3.05;
var P4=[[0,2.85],[0,-2.2]];
T.DIVE0=39.6;T.DIVE1=40.1;T.SCAT=39.95;
T.FP0=42.6;T.FP1=43.0;T.FP2=45.4;T.FORM0=44.0;T.FORM1=45.8;T.DPU0=46.2;T.DPU1=48.8;T.KF=48.8;T.UP=52.6;T.ROW0=53.3;T.ROW1=54.3;T.END=61.0;
var END=T.END;
// bola
bHand(0,T.TOSS0,'teo');bToss(T.TOSS0,T.TOSS1,'teo','bia');bHand(T.TOSS1,T.REL1,'bia');
bPath(T.REL1,T.STOP1,P1,eo2);
var R1=[[-0.18,-4.6],[-1.25,-4.6]],R1b=[[-1.25,-4.6],[-1.25,2.4]],R1c=[[-1.25,2.4],BALLRET];
bRest(T.STOP1,10.8,P1[1]);bPath(10.8,11.5,R1);bRest(11.5,11.9,R1[1]);bPath(11.9,14.1,R1b);bPath(14.1,14.5,R1c);bRest(14.5,T.TPKh,BALLRET);bPick(T.TPKh,T.TPKh+0.25,BALLRET,'teo');bHand(T.TPKh+0.25,T.REL2,'teo');
bPath(T.REL2,T.STOP2,P2,eo2);var R2=[[-3.0,-5.0],[-3.0,2.4]],R2c=[[-3.0,2.4],BALLRET];
bRest(T.STOP2,19.3,P2[4]);bPath(19.3,21.8,R2);bPath(21.8,22.2,R2c);bRest(22.2,T.DPKh,BALLRET);bPick(T.DPKh,T.DPKh+0.25,BALLRET,'duda');bHand(T.DPKh+0.25,T.REL3,'duda');
bPath(T.REL3,T.STOP3,P3,eo3);var R3=[[0,-2.72],[-1.25,-2.72]],R3b=[[-1.25,-2.72],[-1.25,2.4]],R3c=[[-1.25,2.4],BALLRET];
bRest(T.STOP3,33.5,P3[1]);bPath(33.5,34.1,R3);bRest(34.1,34.5,R3[1]);bPath(34.5,36.2,R3b);bPath(36.2,36.6,R3c);bRest(36.6,T.LPKh,BALLRET);bPick(T.LPKh,T.LPKh+0.25,BALLRET,'leo');bHand(T.LPKh+0.25,T.REL4,'leo');
bPath(T.REL4,T.STOP4,P4,eo2);bRest(T.STOP4,T.FP1,P4[1]);var F1=[[0,-2.2],[0,2.6]],F2=[[0,2.6],[0,-0.75]];
bPath(T.FP1,T.FP2,F1);bRest(T.FP2,T.DPU0,F1[1]);bPath(T.DPU0,T.DPU1,F2,function(u){return u*u*0.3+u*0.7;});bPath(T.DPU1,T.DPU1+0.4,[[0,-0.75],[0,-0.55]],eo2);bRest(T.DPU1+0.4,END+3,[0,-0.55]);
function bseg(t){for(var i=0;i<BS.length;i++)if(t>=BS[i].t0&&t<BS[i].t1)return BS[i];return BS[BS.length-1];}
function ballXZ(t){var s=bseg(t);if(s.type!=='path')return null;var u=clamp((t-s.t0)/(s.t1-s.t0),0,1);return polyAt(s.pts,s.ease(u));}
function ballDir(t){var a=ballXZ(t-0.03)||ballXZ(t),b=ballXZ(t+0.03)||ballXZ(t);var dx=b[0]-a[0],dz=b[1]-a[1],L=Math.hypot(dx,dz);if(L<1e-5){var s=bseg(t);var p=s.pts;dx=p[p.length-1][0]-p[0][0];dz=p[p.length-1][1]-p[0][1];L=Math.hypot(dx,dz)||1;}return [dx/L,dz/L];}
function hitTime(seg0,t0,t1,zc){for(var t=t0;t<t1;t+=0.005){var p=ballXZ(t);if(p&&p[1]<=zc)return t;}return t1;}
T.HIT1=hitTime(0,T.REL1,T.STOP1,-2.82);
// ===== garrafas =====
var PEV=[[],[],[],[],[],[]];
function pfall(i,t,dx,dz,sl){PEV[i].push({t:t,type:'fall',d:[dx,dz],sl:sl||0.12});}
function pup(i,t){PEV[i].push({t:t,type:'up'});}
pfall(0,T.HIT1,-0.2,-1);pfall(1,T.HIT1+0.1,-0.7,-1);pfall(3,T.HIT1+0.22,-0.5,-1);
T.UP1=T.STOP1+1.0;[0,1,3].forEach(function(i,k){pup(i,T.UP1+0.28*k);});
pfall(0,T.F3,0,-1);pfall(1,T.F3+0.2,-0.4,-1);pfall(2,T.F3+0.2,0.4,-1);pfall(3,T.F3+0.4,-0.6,-1);pfall(4,T.F3+0.4,0.05,-1);pfall(5,T.F3+0.4,0.6,-1);
T.UP3=T.F3+2.0;[0,1,2,3,4,5].forEach(function(i){pup(i,T.UP3+0.17*i);});
[[-1,-0.3],[-1,-1],[1,-1],[-0.8,-1],[0.1,-1],[1,-0.6]].forEach(function(d,i){pfall(i,T.SCAT+0.04*i,d[0],d[1],0.38);});
function applyPins(t){PINS.forEach(function(g,i){var ev=null;PEV[i].forEach(function(e){if(t>=e.t)ev=e;});var base=PINP[i];
 var ang=0,ax=V(1,0,0),off=[0,0],hy=0;
 if(i===0&&t>T.WOB&&t<T.F3){var w=t-T.WOB;ang=0.12*Math.sin(w*16)*(0.5+w);ax=V(1,0,0);}
 if(ev&&ev.type==='fall'){var q=t-ev.t,L=Math.hypot(ev.d[0],ev.d[1]),dx=ev.d[0]/L,dz=ev.d[1]/L;ang=Math.min(1.48,1.48*(1-Math.exp(-q*7)*Math.cos(q*9))*S(q,0,0.12)+1.48*S(q,0.12,0.25)*0);
  ang=1.48*clamp(q/0.28,0,1);ang=ang*ang/1.48;if(q>0.28)ang=1.48+0.08*Math.exp(-(q-0.28)*8)*Math.sin((q-0.28)*30);ax=V(dz,0,-dx).normalize();off=[dx*ev.sl*S(q,0,0.5),dz*ev.sl*S(q,0,0.5)];}
 if(ev&&ev.type==='up'){var q2=t-ev.t;ang=0;hy=hopAt(t,ev.t,0.3,0.25);}
 g.position.set(base[0]+off[0],0.14+hy,base[1]+off[1]);g.quaternion.setFromAxisAngle(ax,ang);});}
// ===== crianças =====
var TL={};
function swingC(t0,dur,big){return cust(t0,t0+dur+0.5,function(t,u){var q=clamp((t-t0)/dur,0,1.3);return {p:TS,yaw:PI,pose:big?'bigswing':'swing',q:q,face:'focus'};});}
function pickC(t0,t1){return cust(t0,t1,function(t,u){return {p:TS,yaw:PI,pose:'pick',pitch:0.7*Math.sin(PI*u),face:'happy'};});}
function watchC(t0,t1,n,o){return hold(t0,t1,SP[n],SY[n],'watch',o);}
function laughW(t){var l=(t>T.STOP2-0.6&&t<T.STOP2+1.6)||(t>T.SCAT&&t<T.SCAT+2.5);var w=(t>T.STOP3+0.2&&t<T.F3);var c=(t>T.F3+0.4&&t<T.F3+2.0);return {laugh:l?1:0,wowA:c?1:0,face:l?'tongue':(w?'wow':(c?'happy':'happy'))};}
var FORM={bia:[0,-1.2],teo:[-0.6,-1.8],duda:[0.6,-1.8],leo:[0,-2.4]},ROW={leo:[-1.35,-1.5],teo:[-0.45,-1.5],duda:[0.45,-1.5],bia:[1.35,-1.5]};
var FROLL={bia:0,teo:-0.35,duda:0.35,leo:0},FT_={bia:T.KF,teo:T.KF+0.25,duda:T.KF+0.25,leo:T.KF+0.5};
function finale(n,w0,w1){var fp=FORM[n];return [mv(w0,w1,[SP[n],fp],'walk',{face:'happy'}),turnTo(w1,w1+0.3,fp,yawTo(SP[n],fp),0,'stand',{face:'happy'}),
 hold(w1+0.3,FT_[n],fp,0,'pinpose',function(t){return {face:(t>T.DPU1-1.2)?'wow':'tongue'};}),
 cust(FT_[n],FT_[n]+0.55,function(t,u){return {p:[fp[0],fp[1]-0.25*u],yaw:0,pose:'fallb',pitch:-(PI/2*0.9)*u*u,roll:FROLL[n]*u,y:0.22*S(u,0.6,1),face:'wow'};}),
 hold(FT_[n]+0.55,T.UP,[fp[0],fp[1]-0.25],0,'fallb',function(t){return {pitch:-PI/2*0.9,roll:FROLL[n],y:0.22,kick:1,laugh:1,face:'happy'};}),
 cust(T.UP,T.ROW0,function(t,u){return {p:[fp[0],fp[1]-0.25],yaw:0,pose:'stand',pitch:-(PI/2*0.9)*(1-ez(u)),roll:FROLL[n]*(1-u),y:0.22*(1-ez(u))+hopAt(t,T.UP+0.4,0.3,0.2),face:'happy'};}),
 mv(T.ROW0,T.ROW1,[[fp[0],fp[1]-0.25],ROW[n]],'walk',{face:'happy'}),turnTo(T.ROW1,T.ROW1+0.3,ROW[n],yawTo([fp[0],fp[1]-0.25],ROW[n]),0,'stand',{face:'happy'}),
 cust(T.ROW1+0.3,END+2,function(t){var b=(t-T.ROW1)*BPM/60;return {p:ROW[n],yaw:0,pose:'wave',y:0.25*Math.abs(Math.sin(PI*b)),b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
(function(){var st={leo:[-6,3],duda:[-6,-2],teo:[6,-2],bia:[6,3]};
 Object.keys(KIDS).forEach(function(n){TL[n]=[hold(0,0.3,st[n],yawTo(st[n],SP[n]),'stand'),mv(0.3,3.0,[st[n],SP[n]],'run',{face:'happy'}),turnTo(3.0,3.4,SP[n],yawTo(st[n],SP[n]),SY[n],'stand',{face:'happy'})];});
 // BIA
 TL.bia=TL.bia.concat([watchC(3.4,T.BW0,'bia',function(t){return {catchA:t>T.TOSS1-0.1?1:0};}),mv(T.BW0,T.BW1,[SP.bia,TS],'walk',{face:'happy',holdB:1}),turnTo(T.BW1,T.BSW,TS,yawTo(SP.bia,TS),PI,'stand',{face:'focus',holdB:1}),
  swingC(T.BSW,0.8,false),hold(T.BSW+1.3,T.HIT1+0.3,TS,PI,'stand',{face:'focus'}),hold(T.HIT1+0.3,T.HIT1+1.3,TS,PI,'cheer',{face:'happy'}),
  mv(T.HIT1+1.3,T.HIT1+2.1,[TS,SP.bia],'walk',{face:'happy'}),turnTo(T.HIT1+2.1,T.HIT1+2.4,SP.bia,yawTo(TS,SP.bia),SY.bia,'stand'),watchC(T.HIT1+2.4,T.FORM0,'bia',laughW)]).concat(finale('bia',T.FORM0,T.FORM0+1.5));
 // TEO
 TL.teo=TL.teo.concat([watchC(3.4,T.TW0,'teo',function(t){var e=laughW(t);if(t<T.TOSS0+0.2){e.show=(t>3.0)?1:0;e.holdB=1;}return e;}),mv(T.TW0,T.TW1,[SP.teo,TS],'walk',{face:'happy'}),turnTo(T.TW1,T.TPK,TS,yawTo(SP.teo,TS),PI,'stand'),pickC(T.TPK,T.TSW),
  swingC(T.TSW,1.2,true),hold(T.TSW+1.7,T.STOP2+1.4,TS,PI,'stand',function(t){return {face:'wow',facepalm:t>T.REL2+0.8?1:0};}),
  mv(T.STOP2+1.4,T.STOP2+2.2,[TS,SP.teo],'walk',{face:'tongue'}),turnTo(T.STOP2+2.2,T.STOP2+2.5,SP.teo,yawTo(TS,SP.teo),SY.teo,'stand'),watchC(T.STOP2+2.5,T.FORM0,'teo',laughW)]).concat(finale('teo',T.FORM0,T.FORM0+1.4));
 // DUDA
 TL.duda=TL.duda.concat([watchC(3.4,T.DW0,'duda',laughW),mv(T.DW0,T.DW1,[SP.duda,TS],'walk',{face:'happy'}),pickC(T.DPK,T.DAIM),hold(T.DAIM,T.DSW,TS,PI,'aim',{face:'tongue'}),
  swingC(T.DSW,0.8,false),hold(T.DSW+1.3,T.F3+0.4,TS,PI,'stand',function(t){return {face:t>T.STOP3?'wow':'focus',tense:t>T.STOP3?1:0};}),
  hold(T.F3+0.4,T.F3+2.0,TS,PI,'cheer',{face:'happy',jump:1}),mv(T.F3+2.0,T.F3+2.8,[TS,SP.duda],'walk',{face:'happy'}),turnTo(T.F3+2.8,T.F3+3.1,SP.duda,yawTo(TS,SP.duda),SY.duda,'stand'),
  watchC(T.F3+3.1,T.FORM0,'duda',laughW)]).concat(finale('duda',T.FORM0,T.FORM0+1.4));
 // LÉO
 TL.leo=TL.leo.concat([watchC(3.4,T.LW0,'leo',laughW),mv(T.LW0,T.LW1,[SP.leo,TS],'walk',{face:'happy'}),pickC(T.LPK,T.LSW),swingC(T.LSW,0.8,false),
  hold(T.LSW+1.3,T.SCAT,TS,PI,'stand',{face:'focus'}),hold(T.SCAT,T.SCAT+2.2,TS,PI,'stand',function(t){return {face:t<T.SCAT+0.8?'wow':'tongue',laugh:t>T.SCAT+0.8?1:0};}),
  mv(T.SCAT+2.2,T.FORM0+0.4,[TS,SP.leo],'walk',{face:'happy'})]).concat(finale('leo',T.FORM0+0.4,T.FORM0+1.8));
})();
function stateOf(n,t){var c=TL[n],cl=c[0];for(var i=0;i<c.length;i++){if(t>=c[i].t0)cl=c[i];else break;}var u=clamp((t-cl.t0)/Math.max(1e-6,cl.t1-cl.t0),0,1);return cl.f(Math.min(t,cl.t1),u);}
function applyKid(k,s,t){
 var y=s.y||0,pitch=s.pitch||0,roll=s.roll||0,face=s.face||'idle',headY=0;
 var lL=0,lR=0,aLx=0,aRx=0,aLz=0,aRz=0,eL=-0.1,eR=-0.1,bt=2*PI*t*BPM/60;
 if(s.pose==='run'){var ph=t*17;lL=Math.sin(ph)*0.95;lR=-lL;y+=Math.abs(Math.sin(ph))*0.14;aLx=-Math.sin(ph)*1.1;aRx=Math.sin(ph)*1.1;eL=eR=-0.7;pitch+=0.12;}
 else if(s.pose==='walk'){var p2=t*11;lL=Math.sin(p2)*0.55;lR=-lL;y+=Math.abs(Math.sin(p2))*0.05;aLx=-Math.sin(p2)*0.6;aRx=Math.sin(p2)*0.6;eL=eR=-0.4;}
 else if(s.pose==='watch'){y+=Math.abs(Math.sin(bt*0.5))*0.03;aLx=aRx=-0.2;eL=eR=-0.5;headY=Math.sin(t*0.9)*0.15;
  if(s.show){aRx=-2.4;aRz=0.2;eR=-0.3;y+=Math.abs(Math.sin(t*9))*0.08;}
  if(s.laugh){y+=Math.abs(Math.sin(t*13))*0.05;aLx=aRx=-1.0;eL=eR=-1.1;roll+=Math.sin(t*13)*0.04;}
  if(s.wowA){aLx=aRx=-2.8;aLz=-0.4;aRz=0.4;eL=eR=-0.2;y+=Math.abs(Math.sin(t*10))*0.12;}
  if(s.catchA){aRx=-1.4;eR=-0.5;}}
 else if(s.pose==='swing'||s.pose==='bigswing'){var q=s.q||0;
  if(s.pose==='swing'){aRx=q<0.45?lerp(-0.4,1.3,q/0.45):lerp(1.3,-1.5,clamp((q-0.45)/0.45,0,1));eR=-0.15;aLx=-0.8;aLz=-0.6;var lu=S(q,0.3,0.75);lL=-0.75*lu;lR=0.55*lu;pitch+=0.35*lu;y-=0.12*lu;}
  else{var sw=Math.min(q,1);aRx=-(sw*2*PI*1.25)-0.4;eR=-0.2;aLx=-0.6;aLz=-0.5;pitch+=0.15*Math.sin(q*PI*2);lL=-0.4*S(q,0.7,1);lR=0.4*S(q,0.7,1);}}
 else if(s.pose==='pick'){aRx=-1.5;eR=-0.2;aLx=-0.4;}
 else if(s.pose==='aim'){aRx=-1.2;eR=-0.6;aLx=-1.2;aLz=0.3;eL=-0.5;pitch+=0.25;y-=0.08;headY=Math.sin(t*3)*0.05;}
 else if(s.pose==='cheer'){aLx=aRx=-2.9;aLz=-0.3+0.15*Math.sin(t*12);aRz=0.3-0.15*Math.sin(t*12);eL=eR=-0.2;y+=Math.abs(Math.sin(t*PI*(s.jump?2.4:2.0)))*(s.jump?0.45:0.3);}
 else if(s.pose==='wave'){var b=s.b||0;aRx=-2.8;aRz=0.25+0.45*Math.sin(t*11);eR=-0.3;aLx=-2.0+0.6*Math.sin(PI*b);aLz=-0.5;eL=-0.4;roll+=0.05*Math.sin(PI*b);}
 else if(s.pose==='pinpose'){aLz=0.05;aRz=-0.05;y+=0.02*Math.sin(t*6);}
 else if(s.pose==='fallb'){aLx=aRx=-2.5;aLz=-0.6;aRz=0.6;if(s.laugh){aLx=aRx=-1.0;eL=eR=-1.1;y+=Math.abs(Math.sin(t*13))*0.03;}if(s.kick){lL=Math.sin(t*11)*0.4-0.3;lR=-Math.sin(t*11)*0.4-0.3;}}
 else if(s.pose==='stand'){if(s.facepalm){aRx=-2.6;aRz=-0.6;eR=-1.6;}if(s.tense){aLx=aRx=-1.1;eL=eR=-1.6;aLz=0.4;aRz=-0.4;y+=0.015*Math.sin(t*20);}}
 if(s.holdB){aRx=-0.9;eR=-0.8;}
 k.root.position.set(s.p[0],y,s.p[1]);k.root.rotation.set(pitch,s.yaw,roll);
 k.legL.rotation.set(lL,0,0);k.legR.rotation.set(lR,0,0);
 k.aL.s.rotation.x=aLx;k.aR.s.rotation.x=aRx;k.aL.s.rotation.z=aLz;k.aR.s.rotation.z=aRz;k.aL.e.rotation.x=eL;k.aR.e.rotation.x=eR;
 k.head.rotation.y=headY;setFace(k,face);}
// ===== Pipoca =====
function pushC(t0,t1,yawOf){return cust(t0,t1,function(t){var b=ballXZ(t),d=ballDir(t);return {p:[b[0]-d[0]*0.8,b[1]-d[1]*0.8],yaw:Math.atan2(d[0],d[1]),pose:'push'};});}
var DG=[hold(0,0.2,[5,-4],yawTo([5,-4],DH),'stand'),mv(0.2,2.8,[[5,-4],DH],'drun'),turnTo(2.8,3.1,DH,yawTo([5,-4],DH),-PI/2,'sit'),hold(3.1,T.DG1a,DH,-PI/2,'sit'),
 mv(T.DG1a,T.DG1a+0.7,[DH,[0.85,-3.4]],'drun'),hold(T.DG1a+0.7,10.2,[0.85,-3.4],-PI/2,'reset'),mv(10.2,10.8,[[0.85,-3.4],[0.9,-4.2],[0.57,-4.6]],'drun'),
 pushC(10.8,11.5),mv(11.5,11.9,[[-0.53,-4.6],[-0.8,-5.2],[-1.25,-5.32]],'drun'),pushC(11.9,14.1),pushC(14.1,14.5),
 mv(14.5,16.2,[[-0.95,2.5],[-1.0,2.0],[0.6,-1.4],DH],'drun'),turnTo(16.2,16.5,DH,yawTo([0.6,-1.4],DH),-PI/2,'sit'),hold(16.5,T.STOP2-0.3,DH,-PI/2,'sit'),
 mv(T.STOP2-0.3,19.3,[DH,[1.0,-4.6],[-1.5,-5.6],[-3.0,-5.72]],'drun'),pushC(19.3,21.8),pushC(21.8,22.2),
 mv(22.2,24.0,[[-0.95,2.6],[-1.0,2.0],[0.6,-1.4],DH],'drun'),turnTo(24.0,24.3,DH,yawTo([0.6,-1.4],DH),-PI/2,'sit'),hold(24.3,T.F3+0.8,DH,-PI/2,'sit',function(t){return {wow:(t>T.STOP3&&t<T.F3+0.8)?1:0};}),
 mv(T.F3+0.8,T.F3+1.5,[DH,[0.9,-3.3]],'drun'),hold(T.F3+1.5,33.2,[0.9,-3.3],-PI/2,'reset'),mv(33.2,33.5,[[0.9,-3.3],[0.75,-2.72]],'drun'),
 pushC(33.5,34.1),mv(34.1,34.5,[[-0.53,-2.72],[-0.8,-3.3],[-1.25,-3.44]],'drun'),pushC(34.5,36.2),pushC(36.2,36.6),
 mv(36.6,38.2,[[-0.95,2.6],[-1.0,2.0],[0.6,-1.0],[2.4,-1.0]],'drun'),turnTo(38.2,38.6,[2.4,-1.0],PI/2,-PI/2,'sit'),hold(38.6,39.0,[2.4,-1.0],-PI/2,'sit'),
 mv(39.0,T.DIVE0,[[2.4,-1.0],[1.0,-2.7]],'drun'),cust(T.DIVE0,T.DIVE1,function(t,u){return {p:L2([1.0,-2.7],[0,-3.5],u),yaw:yawTo([1.0,-2.7],[0,-3.5]),pose:'dive',y:0.6*4*u*(1-u),u:u};}),
 hold(T.DIVE1,T.FP0,[0,-3.5],yawTo([1.0,-2.7],[0,-3.5]),'sitp',function(t){return {bark:(t>T.STOP4)?1:0};}),
 mv(T.FP0,T.FP1,[[0,-3.5],[0.3,-3.2],[0,-2.92]],'drun'),pushC(T.FP1,T.FP2),mv(T.FP2,T.DPU0,[[0,1.88],[0.75,2.4],[0.5,3.2],[0,3.32]],'drun'),pushC(T.DPU0,T.DPU1),
 hold(T.DPU1,END+2,[0,0.05],PI,'sit',function(t){var q=t-T.ROW1;return q>0?{party:1,yaw:lerpAng(PI,0,S(q,0,0.4))}:null;})];
function dogState(t){var cl=DG[0];for(var i=0;i<DG.length;i++){if(t>=DG[i].t0)cl=DG[i];else break;}var u=clamp((t-cl.t0)/Math.max(1e-6,cl.t1-cl.t0),0,1);return cl.f(Math.min(t,cl.t1),u);}
function applyDog(t){var s=dogState(t),y=s.y||0,pitch=0,roll=0,yaw=s.yaw,lp=t*26,legs=[0,0,0,0],hx=0;
 if(s.pose==='drun'||s.pose==='push'){var sp=s.pose==='push'?16:26;legs=[Math.sin(t*sp)*0.7,-Math.sin(t*sp)*0.7,-Math.sin(t*sp)*0.7,Math.sin(t*sp)*0.7];y+=Math.abs(Math.sin(t*sp*0.5))*0.08;if(s.pose==='push')hx=0.3;}
 if(s.pose==='sit'||s.pose==='sitp'){legs=[0,0,-0.9,-0.9];pitch=-0.25;y+=0.05;if(s.wow)y+=Math.abs(Math.sin(t*9))*0.05;if(s.bark&&t<T.STOP4+1.0){y+=hopAt(t,T.STOP4+0.05,0.3,0.25);hx=-0.3*Math.abs(Math.sin(t*14));}
  if(s.party){legs=[-0.5,-0.5,0.5,0.5];pitch=0;y+=Math.abs(Math.sin(PI*(t-T.ROW1)*BPM/60))*0.35;}}
 if(s.pose==='reset'){y+=Math.abs(Math.sin(t*9))*0.2;yaw+=Math.sin(t*5)*0.8;hx=-0.2;}
 if(s.pose==='dive'){var u=s.u||0;pitch=0.5*Math.sin(PI*u);legs=[-1.2,-1.2,1.2,1.2];}
 dog.root.position.set(s.p[0],y,s.p[1]);dog.root.rotation.set(pitch,yaw,roll);
 dog.legs.forEach(function(l,i){l.rotation.x=legs[i];});dog.tail.rotation.y=Math.sin(t*20)*0.7;dog.head.rotation.x=hx;}
// ===== bola na cena =====
var _a=new THREE.Vector3();
function handR(n){KIDS[n].aR.e.children[1].getWorldPosition(_a);return _a.clone();}
var CACHE={};
function handAt(n,t){var key=n+t;if(CACHE[key])return CACHE[key].clone();var s=stateOf(n,t);applyKid(KIDS[n],s,t);KIDS[n].root.updateMatrixWorld(true);var h=handR(n);CACHE[key]=h.clone();return h;}
function applyBall(t){var s=bseg(t),P;
 if(s.type==='hand'){P=handR(s.n);P.y-=0.12;}
 else if(s.type==='toss'){var u=(t-s.t0)/(s.t1-s.t0),a=handAt(s.a,s.t0),b=handAt(s.b,s.t1);P=a.clone().lerp(b,u);P.y+=1.4*4*u*(1-u);}
 else if(s.type==='pick'){var u2=(t-s.t0)/(s.t1-s.t0);P=V(s.p[0],BR+0.14,s.p[1]).lerp(handR(s.n),u2);}
 else{var b2=ballXZ(t);P=V(b2[0],BR+0.14,b2[1]);var prev=s.type==='path'?(s.t0===T.REL1||s.t0===T.REL2||s.t0===T.REL3||s.t0===T.REL4):false;
  if(prev&&t-s.t0<0.12){var h=handAt(['bia','teo','duda','leo'][[T.REL1,T.REL2,T.REL3,T.REL4].indexOf(s.t0)],s.t0);P.lerp(h,1-(t-s.t0)/0.12);}}
 BALL.position.copy(P);var b3=ballXZ(t);if(b3){BALL.rotation.set(-b3[1]/BR,0,b3[0]/BR);}else BALL.rotation.set(t*2,0,0);}
