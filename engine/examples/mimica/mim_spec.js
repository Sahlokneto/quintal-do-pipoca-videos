// ===== Mímica =====
makeBubs([['Vamos brincar de mímica!',46],['É um passarinho?',54],['É um avião!',70],['Tocando violão?',56],['Pescou o Pipoca!',52],['Vez do Pipoca!',60],
 ['Um bailarino?',62],['É um pião!',72],['Um coelho?',72],['É o Pipoca!',70],['Adivinha quem volta amanhã?',38]]);
radio.visible=false;
var PS=[0,-1.2],PSD=[0,-1.0];
var HM={leo:[-1.4,-0.3],bia:[1.4,-0.3],teo:[-1.3,0.9],duda:[1.3,0.9]},DH=[0,1.9];
var FIN={leo:[-1.95,0.4],teo:[-0.65,0.6],duda:[0.65,0.6],bia:[1.95,0.4]},DF=[0,1.7];
var T={ARR:3.0,L0:5.0,FLY:6.7,LNO:9.4,LOK:11.8,LBK:12.8,T0:14.2,FISH:15.9,TNO:18.4,PULL:19.3,JUMP:19.7,LAND:20.5,LGH1:21.0,TBK:23.0,
 D0:24.4,HIND:26.0,DNO:28.6,SPIN:29.2,DOK:31.4,DBK:32.4,B0:33.4,BDOG:35.1,BNO:37.6,DJN:37.6,BOK:40.4,FIM:41.4,ROW:43.4,WAVE:55.5,END:60};
var END=T.END;
var STY={leo:0,bia:3,teo:2,duda:1};
function shake(t,t0,t1){return (t>t0&&t<t1)?0.55*Math.sin((t-t0)*16)*Math.sin(PI*(t-t0)/(t1-t0)):0;}
// janelas de reação da plateia
var LAUGH=[[T.LGH1,T.TBK],[T.DOK,T.DOK+1.6]],CLAP=[[T.LOK,T.LBK+0.2],[T.BOK,T.FIM]];
var GUESS={teo:[[7.8,9.4],[29.8,31.4]],duda:[[10.2,11.8],[24.4,25.9],[36.0,37.6]],bia:[[16.8,18.4],[26.8,28.4]],leo:[[20.6,22.4],[38.8,40.4]]};
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
function perfPos(t){if(t<T.L0)return PS;if(t<T.T0)return stateOf('leo',t).p;if(t<T.D0)return t>T.JUMP&&t<T.TBK?dogState(t).p:stateOf('teo',t).p;if(t<T.B0)return dogState(t).p;return stateOf('bia',t).p;}
function aud(n,t0,t1){return cust(t0,t1,function(t){var p=HM[n],q=perfPos(t);var y=yawTo(p,q);var s={p:p,yaw:y,pose:'look',face:'happy'};
 if(inW(t,LAUGH)){s.pose='laugh';s.face='tongue';}
 else if(inW(t,CLAP)){s.pose='clap';s.face='happy';}
 if(GUESS[n]&&inW(t,GUESS[n])){s.pose='none';s.face='wow';s.A={aRx:-2.7,aRz:0.2,eR:-0.2,aLx:-0.3,eL:-0.4};s.y=0.05*Math.abs(Math.sin(t*8));}
 if(t>T.JUMP-0.1&&t<T.LGH1&&!inW(t,LAUGH))s.face='wow';
 return s;});}
function walkTo(t0,t1,a,b,o){return mv(t0,t1,[a,b],'walk',o||{face:'happy'});}
// ----- crianças -----
(function(){var st={leo:[-4.6,-3.6],bia:[4.6,-3.6],teo:[-4.6,3.2],duda:[4.6,3.2]};
 Object.keys(KIDS).forEach(function(n){var p=HM[n];TL[n]=[hold(0,0.2,st[n],yawTo(st[n],p),'stand'),mv(0.2,2.7,[st[n],p],'run',{face:'happy'}),turnTo(2.7,T.ARR,p,yawTo(st[n],p),yawTo(p,PS),'stand',{face:'happy'})];});
 // Bia anuncia
 TL.bia.push(hold(T.ARR,T.L0,HM.bia,yawTo(HM.bia,PS),'none',function(t){return {face:'happy',A:{aRx:-2.6,aRz:0.3+0.3*Math.sin(t*8),eR:-0.3}};}));
 ['leo','teo','duda'].forEach(function(n){TL[n].push(aud(n,T.ARR,T.L0));});
 // ---- R1 Léo: avião ----
 var CC=[PS[0],PS[1]+0.5];
 TL.leo=TL.leo.concat([walkTo(T.L0,6.4,HM.leo,PS),turnTo(6.4,T.FLY,PS,yawTo(HM.leo,PS),PI/2,'stand',{face:'focus'}),
  cust(T.FLY,T.LNO,function(t,u){var f=2*PI*ez(u);var p=[CC[0]+0.5*Math.sin(f),CC[1]-0.5*Math.cos(f)];
   return {p:p,yaw:PI/2-f,pose:'none',roll:-0.35*Math.sin(PI*u)+0.08*Math.sin(t*5),y:0.06*Math.abs(Math.sin(t*10)),face:'focus',A:{aLx:0,aRx:0,aLz:-1.5,aRz:1.5,eL:0,eR:0,lL:0.4*Math.sin(t*10),lR:-0.4*Math.sin(t*10)}};}),
  cust(T.LNO,T.LOK,function(t){var yy=lerpAng(PI/2,0,S(t,T.LNO,T.LNO+0.3));return {p:PS,yaw:yy,pose:'none',roll:0.18*Math.sin(t*3),face:t<10.3?'focus':'happy',A:{aLx:0,aRx:0,aLz:-1.5,aRz:1.5,eL:0,eR:0,hy:shake(t,T.LNO+0.2,10.2)}};}),
  hold(T.LOK,T.LBK,PS,0,'cheer',{face:'happy'}),walkTo(T.LBK,T.T0,PS,HM.leo),turnTo(T.T0,T.T0+0.3,HM.leo,yawTo(PS,HM.leo),yawTo(HM.leo,PS),'stand'),aud('leo',T.T0+0.3,T.FIM)]);
 // ---- R2 Teo: pescaria ----
 TL.teo=TL.teo.concat([aud('teo',T.L0,T.T0),mv(T.T0,15.6,[HM.teo,[-0.5,0.2],PS],'walk',{face:'happy'}),turnTo(15.6,T.FISH,PS,yawTo(HM.teo,PS),0,'stand',{face:'focus'}),
  cust(T.FISH,T.PULL,function(t){var c=((t-T.FISH)%1.75)/1.75;var up=c<0.25?S(c,0,0.25):c<0.4?1-S(c,0.25,0.4):0;var jig=c>0.4?0.08*Math.sin(t*20):0;
   var A={aLx:lerp(-1.1,-2.9,up)+jig,aRx:lerp(-1.1,-2.9,up)+jig,aLz:0.32,aRz:-0.32,eL:-0.3,eR:-0.3,hy:shake(t,T.TNO,T.TNO+0.7)};
   return {p:PS,yaw:0,pose:'none',pitch:-0.12*up,face:'focus',A:A};}),
  cust(T.PULL,T.LGH1,function(t,u){var k=S(t,T.PULL,T.PULL+0.3);return {p:PS,yaw:0,pose:'none',pitch:-0.3*k,face:t>T.JUMP?'wow':'focus',A:{aLx:lerp(-1.1,-2.8,k),aRx:lerp(-1.1,-2.8,k),aLz:0.3,aRz:-0.3,eL:-0.6,eR:-0.6}};}),
  hold(T.LGH1,T.TBK,PS,0,'laugh',{face:'tongue'}),mv(T.TBK,T.D0,[PS,[-0.5,0.2],HM.teo],'walk',{face:'happy'}),turnTo(T.D0,T.D0+0.3,HM.teo,yawTo([-0.5,0.2],HM.teo),yawTo(HM.teo,PS),'stand'),aud('teo',T.D0+0.3,T.FIM)]);
 // ---- R4 Bia: imita o Pipoca ----
 TL.bia=TL.bia.concat([aud('bia',T.L0,T.B0),walkTo(T.B0,34.8,HM.bia,PS),turnTo(34.8,T.BDOG,PS,yawTo(HM.bia,PS),0,'stand',{face:'happy'}),
  cust(T.BDOG,T.BOK,function(t){var h=Math.abs(Math.sin(t*7));return {p:PS,yaw:0.25*Math.sin(t*2.5),pose:'none',y:0.16*h,roll:0.1*Math.sin(t*7),face:'tongue',
   A:{aLx:-2.75,aRx:-2.75,aLz:0.55+0.12*Math.sin(t*14),aRz:-0.55-0.12*Math.sin(t*14),eL:-1.7,eR:-1.7,hy:shake(t,T.BNO,T.BNO+0.7),lL:-0.2*h,lR:-0.2*h}};}),
  hold(T.BOK,T.FIM,PS,0,'cheer',{face:'happy'}),hold(T.FIM,42.0,PS,0,'cheer',{face:'happy'}),mv(42.0,T.ROW,[PS,FIN.bia],'walk',{face:'happy'})]);
 TL.duda.push(aud('duda',T.L0,T.FIM));
 TL.leo.push(mv(T.FIM+0.2,42.6,[HM.leo,FIN.leo],'walk',{face:'happy'}));
 TL.teo.push(mv(T.FIM+0.2,43.0,[HM.teo,FIN.teo],'walk',{face:'happy'}));
 TL.duda.push(mv(T.FIM+0.2,43.0,[HM.duda,FIN.duda],'walk',{face:'happy'}));
 Object.keys(KIDS).forEach(function(n){var tt=n==='bia'?T.ROW:(n==='leo'?42.6:43.0);
  TL[n].push(turnTo(tt,tt+0.4,FIN[n],n==='bia'?yawTo(PS,FIN.bia):yawTo(HM[n],FIN[n]),0,'stand',{face:'happy'}));
  TL[n].push(cust(tt+0.4,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}));
  TL[n].push(cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};}));});
})();
// ----- Pipoca -----
var DS=[3.6,4.6],RUN1=[0.5,0.6],LANDP=[0.6,-0.4],BDP=[0.8,-0.9];
var DY=yawTo(DH,PS);
DG=[hold(0,0.4,DS,yawTo(DS,DH),'stand'),mv(0.4,2.8,[DS,DH],'drun'),turnTo(2.8,3.1,DH,yawTo(DS,DH),DY,'sit'),
 hold(3.1,T.LOK,DH,DY,'sit'),hold(T.LOK,T.LBK+0.4,DH,DY,'bark'),hold(T.LBK+0.4,19.0,DH,DY,'sit'),
 mv(19.0,T.JUMP,[DH,RUN1],'drun'),
 cust(T.JUMP,T.LAND,function(t,u){var p=L2(RUN1,LANDP,u);return {p:p,yaw:yawTo(RUN1,LANDP),pose:'stand',y:1.3*4*u*(1-u),pitch:-0.9+1.8*u,roll:0.5*Math.sin(u*PI*3),legs:[-0.9,-0.9,0.9,0.9],tailF:40,tailA:1.1};}),
 cust(T.LAND,22.0,function(t,u){var w=Math.max(0,1-u*1.1);return {p:LANDP,yaw:yawTo(RUN1,LANDP)+0.3*Math.sin(t*12)*w,pose:'stand',roll:0.7*Math.sin(t*15)*w,y:0.08*Math.abs(Math.sin(t*15))*w,tailF:40,tailA:1.1};}),
 hold(22.0,T.TBK+1.4,LANDP,yawTo(LANDP,PS),'party'),
 mv(T.TBK+1.4,25.2,[LANDP,PSD],'dwalk'),turnTo(25.2,25.6,PSD,yawTo(LANDP,PSD),0,'stand'),hold(25.6,T.HIND,PSD,0,'stand'),
 cust(T.HIND,T.DNO,function(t,u){return {p:PSD,yaw:0.35*Math.sin(t*3),pose:'hind',wig:1,lift:S(u,0,0.12)*(1-S(u,0.9,1))};}),
 hold(T.DNO,T.SPIN,PSD,0,'bark'),
 cust(T.SPIN,T.DOK,function(t,u){return {p:[PSD[0]+0.12*Math.sin(2*PI*3*ez(u)),PSD[1]+0.12*Math.cos(2*PI*3*ez(u))-0.12],yaw:2*PI*3*ez(u)+PI/2,pose:'drun',tailF:40,tailA:1.2};}),
 hold(T.DOK,T.DBK,PSD,0,'party'),mv(T.DBK,33.6,[PSD,DH],'dwalk'),turnTo(33.6,33.9,DH,yawTo(PSD,DH),DY,'sit'),hold(33.9,T.DJN,DH,DY,'sit'),
 mv(T.DJN,38.6,[DH,BDP],'drun'),turnTo(38.6,38.8,BDP,yawTo(DH,BDP),0,'stand'),
 cust(38.8,T.FIM,function(t){return {p:BDP,yaw:-0.2,pose:'party',tailF:34};}),
 mv(T.FIM,42.6,[BDP,[0,-0.3],DF],'dwalk'),turnTo(42.6,42.9,DF,PI,0,'stand'),hold(42.9,END+2,DF,0,'party')];
// ----- objetos: tapete do palco -----
(function(){var r=box(1.9,0.04,1.5,0xe0484f);r.position.set(PS[0],0.1,PS[1]+0.1);r.castShadow=false;scene.add(r);
 var b=box(2.0,0.05,1.6,0xffd166);b.position.set(PS[0],0.085,PS[1]+0.1);b.castShadow=false;scene.add(b);})();
EXTRA=function(t){};
BURST=[[T.BOK,[0,-1.2],2.2],[T.ROW,[0,-0.4],2.4],[T.ROW+2.8,[0,-0.4],2.4]];
BW=[['Vamos brincar de mímica!',3.1,4.8,kp('bia',2.9,-0.5),1],['É um passarinho?',7.8,9.4,kp('teo',2.9,0.5),1],['É um avião!',10.2,11.8,kp('duda',2.9,-0.5),1],
 ['Tocando violão?',16.8,18.4,kp('bia',2.9,-0.2),1],['Pescou o Pipoca!',20.6,22.4,kp('leo',2.9,0.5),1],['Vez do Pipoca!',24.4,25.9,kp('duda',2.9,-0.5),1],
 ['Um bailarino?',26.8,28.4,kp('bia',2.9,-0.2),1],['É um pião!',29.8,31.4,kp('teo',2.9,0.5),1],['Um coelho?',36.0,37.6,kp('duda',2.9,-0.5),1],
 ['É o Pipoca!',38.8,40.4,kp('leo',2.9,0.5),1],['Adivinha quem volta amanhã?',50.6,54.8,kp('teo',2.9,0.2),1]];
var EXP=[[0,-1.9],[0,2.2]];
function A_(a,e,fov,m){return function(){return frameOn(ALL,a,e,fov||46,m||0.12,EXP);};}
SH=[[0,T.ARR,function(t){return frameOn(ALL,lerp(28,0,ez(lin(t,0,T.ARR))),lerp(40,28,ez(lin(t,0,T.ARR))),48,0.12,EXP);}],
 [T.ARR,T.L0,A_(0,28)],
 [T.L0,T.FLY,A_(-10,30)],
 [T.FLY,T.LNO,function(t){return frameOn(ALL,lerp(14,4,lin(t,T.FLY,T.LNO)),22,46,0.12,EXP);}],
 [T.LNO,T.LBK,A_(-8,28)],
 [T.LBK,T.FISH,A_(0,32)],
 [T.FISH,19.0,function(t){return frameOn(ALL,lerp(16,8,lin(t,T.FISH,19)),24,46,0.12,EXP);}],
 [19.0,22.0,A_(-14,22)],
 [22.0,T.D0,A_(0,30)],
 [T.D0,T.SPIN,A_(-8,22)],
 [T.SPIN,T.DBK,A_(10,26)],
 [T.DBK,T.BDOG,A_(0,32)],
 [T.BDOG,T.FIM,function(t){return frameOn(ALL,lerp(-12,-4,lin(t,T.BDOG,T.FIM)),24,46,0.12,EXP);}],
 [T.FIM,T.ROW,function(t){return mixCam(frameOn(ALL,-6,24,46,0.12,EXP),frameLow(ALL,0,18,50,0.06),ez(lin(t,T.FIM,T.ROW)));}],
 [T.ROW,END+2,function(){return frameLow(ALL,0,18,50,0.06);}]];
EV=[[2.9,'bark'],[T.FLY,'mime'],[T.LNO+0.2,'no'],[T.LOK,'yes'],[T.LOK+0.2,'bark'],[T.FISH,'mime'],[T.TNO,'no'],[T.PULL,'pull'],[T.JUMP,'jump'],[T.LAND,'splash'],[T.LGH1,'laugh'],
 [T.HIND,'mime'],[T.DNO,'no'],[T.DNO,'bark'],[T.SPIN,'spin'],[T.DOK,'yes'],[T.DOK+0.3,'laugh'],[T.BDOG,'mime'],[T.BNO,'no'],[T.DJN+0.6,'bark'],[T.BOK,'yes'],[T.FIM,'confetti'],[T.ROW,'confetti2']];
var MIMES=[[T.FLY,T.LOK],[T.FISH,T.LGH1],[T.HIND,T.DOK],[T.BDOG,T.BOK]];
