// ===== Queimada (bola macia) =====
makeBubs([['Queimada com bola macia!',38],['Errou! Errou!',62],['Valeu, juiz!',70],['Peguei!',90],['Ai! Fui queimado!',48],['Agora é minha vez!',44],
 ['O juiz pegou a bola!',42],['Ele fugiu com a bola!',40],['O Pipoca é o campeão!',38],['Amanhã eu desvio de tudo!',34]]);
radio.visible=false;
// ----- quadra de giz -----
(function(){function ln(x,z,w,d){var m=box(w,0.03,d,0xffffff);m.position.set(x,0.11,z);m.castShadow=false;scene.add(m);}
 ln(0,-3.0,4.5,0.08);ln(0,2.6,4.5,0.08);ln(-2.2,-0.2,0.08,5.6);ln(2.2,-0.2,0.08,5.6);ln(0,-0.2,4.5,0.1);
 [[-3.6,-4.6],[3.6,4.4],[-3.8,3.8],[3.8,-4.4]].forEach(function(p,i){var c=new THREE.Mesh(new THREE.ConeGeometry(0.22,0.5,12),mat([0xff7a1a,0xffd23f][i%2]));c.position.set(p[0],0.25,p[1]);c.castShadow=true;scene.add(c);});})();
var T={ARR:3.0,T1:5.4,T2:12.15,T3:15.35,HIT:16.0,T4:20.1,T5:23.9,CATCH:24.8,LAP:26.6,DROP:30.6,GO:31.0,YAY:35.0,ROW:36.8,DANCE:39.0,WAVE:55.5,END:60};
var END=T.END;
var P0={leo:[-0.9,-2.2],bia:[1.0,-1.9],teo:[-0.9,1.4],duda:[1.0,1.7]},DREF=[2.7,-0.2],CEM=[-1.2,-3.8],BIA2=[1.9,-2.5],TEOD=[-1.7,1.3];
var S4={leo:[-0.95,-1.05],bia:[0.95,-1.05],teo:[-1.15,0.45],duda:[1.15,0.45]},DC=[0,-0.2],GB=[0,0.72];
var FIN={teo:[-1.95,2.6],leo:[-0.65,2.6],bia:[0.65,2.6],duda:[1.95,2.6]},DF=[0,3.6];
var STY={leo:0,bia:3,teo:2,duda:1};
var LAUGHW=[[17.0,17.9],[26.2,27.6],[33.0,34.6]];
function inW(t,L){return L.some(function(w){return t>=w[0]&&t<w[1];});}
var HOLDB={pose:'hold',face:'happy'};
var CARRY={A:{aRx:-0.9,eR:-0.7,aRz:-0.1}};
// arremesso: prepara (braço para trás) e solta em tr
function throwC(n,t0,tr,p,tgt){return cust(t0,tr+0.4,function(t){var a=S(t,t0,tr-0.15),b=S(t,tr-0.15,tr),c=S(t,tr,tr+0.4);
 var arx=lerp(lerp(-0.9,1.0,a),-2.3,b);arx=lerp(arx,-0.5,c);return {p:p,yaw:yawTo(p,tgt)+0.25*(1-b)*a,pose:'none',face:'focus',pitch:-0.08*a+0.18*b*(1-c),
  A:{aRx:arx,eR:-0.3,aRz:-0.1,aLx:-1.1*a,eL:-0.5,aLz:0.2}};});}
function lg(o){return function(t,u){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue',A:null};return (typeof o==='function')?o(t,u):o;};}
function watch(n,p,yaw,o){return o||lg({face:'happy'});}
function tail(n){return [cust(T.DANCE,T.WAVE,function(t){var b=t*BPM/60;return {p:FIN[n],yaw:0,pose:'dance',st:STY[n],face:(Math.floor(b/4)%2)?'tongue':'happy'};}),
 cust(T.WAVE,END+2,function(t){var b=t*BPM/60+(n==='bia'||n==='leo'?0.5:0);return {p:FIN[n],yaw:0,pose:'wave',b:b,face:(Math.floor(b/4)%2)?'tongue':'happy'};})];}
function gather(n,from,via,t0,t1){var e=S4[n],pr=via.length?via[via.length-1]:from;
 return [mv(t0,t1,[from].concat(via,[e]),'run',{face:'happy'}),turnTo(t1,t1+0.3,e,yawTo(pr,e),yawTo(e,DC),'stand',{face:'happy'}),
  hold(t1+0.3,T.YAY,e,yawTo(e,DC),'clap',lg({pose:'clap',face:'happy'})),hold(T.YAY,T.ROW,e,yawTo(e,DC),'cheer',{face:'happy'})];}
function toFin(n,t0,via){var e=FIN[n],pr=via.length?via[via.length-1]:S4[n];
 return [mv(t0,t0+1.5,[S4[n]].concat(via,[e]),'walk',{face:'happy'}),turnTo(t0+1.5,t0+1.8,e,yawTo(pr,e),0,'stand',{face:'happy'}),hold(t0+1.8,T.DANCE,e,0,'cheer',{face:'happy'})];}
var ST={leo:[-3.6,-4.4],bia:[3.9,-4.0],teo:[-4.0,3.4],duda:[3.6,4.2]};
function arrive(n,o){var p=P0[n],s=ST[n];return [hold(0,0.2,s,yawTo(s,p),'stand',o),mv(0.2,2.6,[s,p],'run',ext({face:'happy'},o)),
 turnTo(2.6,T.ARR,p,yawTo(s,p),n==='leo'||n==='bia'?0:PI,'stand',ext({face:'happy'},o))];}
(function(){
 var L=P0.leo,B=P0.bia,Te=P0.teo,D=P0.duda;
 // LÉO: arremessa no Teo, se abaixa quando a Duda joga
 TL.leo=arrive('leo',CARRY).concat([hold(T.ARR,4.9,L,0,'stand',ext({face:'happy'},CARRY)),throwC('leo',4.9,T.T1,L,[-0.9,2.7]),
  hold(T.T1+0.4,6.3,L,yawTo(L,[-0.9,2.7]),'look',{face:'wow'}),hold(6.3,8.4,L,0,'stand',lg({face:'happy'})),
  hold(8.4,19.9,L,0,'stand',lg(function(t){if(t>15.4&&t<16.0)return {pose:'look',face:'focus'};if(t>16.0&&t<17.0)return {pose:'clap',face:'happy'};return {face:'happy'};})),
  cust(19.9,21.3,function(t,u){var k=S(t,19.9,20.2)*(1-S(t,20.9,21.3));return {p:L,yaw:0,pose:'none',y:-0.32*k,pitch:0.45*k,face:k>0.3?'wow':'happy',A:{aLx:-2.6*k,aRx:-2.6*k,aLz:-0.3*k,aRz:0.3*k,eL:-0.9*k,eR:-0.9*k,lL:-0.5*k,lR:-0.5*k}};}),
  turnTo(21.3,21.7,L,0,PI,'stand',{face:'wow'}),hold(21.7,23.9,L,PI,'look',{face:'wow'}),turnTo(23.9,24.3,L,PI,yawTo(L,DREF),'look',{face:'wow'}),
  hold(24.3,28.4,L,yawTo(L,DREF),'stand',lg({face:'wow'})),hold(28.4,T.GO,L,yawTo(L,[3,-3]),'none',{face:'wow',A:{aLx:-1.6,aRx:-1.6,aLz:-0.6,aRz:0.6,eL:-0.6,eR:-0.6}})],
  gather('leo',L,[],T.GO,32.2),toFin('leo',T.ROW+0.3,[[-0.55,0.0],[-0.75,1.6]]),tail('leo'));
 // BIA: segura a bola da Duda, arremessa no Teo, desvia do Teo
 TL.bia=arrive('bia').concat([hold(T.ARR,12.3,B,0,'stand',lg(function(t){if(t>9.8&&t<10.8)return {pose:'clap',face:'happy'};return {face:'happy'};})),
  hold(12.3,13.0,B,0,'none',{pose:'hold',face:'focus'}),hold(13.0,14.85,B,0,'none',{pose:'hold',face:'happy',y:hopAt(13.05,13.0,0.0,0)}),
  throwC('bia',14.85,T.T3,B,Te),hold(T.T3+0.4,16.0,B,yawTo(B,Te),'look',{face:'focus'}),hold(16.0,17.8,B,yawTo(B,Te),'cheer',lg({face:'happy'})),
  hold(17.8,21.5,B,0,'stand',{face:'happy'}),turnTo(21.5,21.9,B,0,yawTo(B,CEM),'look',{face:'wow'}),hold(21.9,23.65,B,yawTo(B,CEM),'look',{face:'wow'}),
  cust(23.65,24.15,function(t,u){return {p:L2(B,BIA2,ez(u)),yaw:yawTo(B,CEM),pose:'none',y:0.45*Math.sin(PI*u),face:'wow',A:{aLx:-2.4,aRx:-2.4,aLz:-0.5,aRz:0.5,lL:-0.4,lR:0.3}};}),
  hold(24.15,24.8,BIA2,yawTo(BIA2,CEM),'none',{face:'wow',A:{aLx:-0.7,aRx:-0.7,aLz:-0.6,aRz:0.6}}),turnTo(24.8,25.1,BIA2,yawTo(BIA2,CEM),yawTo(BIA2,DREF),'stand',{face:'wow'}),
  hold(25.1,T.GO,BIA2,yawTo(BIA2,DREF),'stand',lg({face:'happy'}))],gather('bia',BIA2,[],T.GO,32.0),toFin('bia',T.ROW+0.2,[[0.6,0.1],[0.75,1.6]]),tail('bia'));
 // TEO: desvia, é queimado, corre para o cemitério, pega a bola e arremessa
 TL.teo=arrive('teo').concat([hold(T.ARR,5.45,Te,PI,'stand',{face:'focus'}),
  cust(5.45,5.85,function(t,u){return {p:L2(Te,TEOD,ez(u)),yaw:PI,pose:'none',y:0.4*Math.sin(PI*u),face:'wow',A:{aLx:-2.3,aRx:-2.3,aLz:-0.6,aRz:0.6,lL:0.3,lR:-0.4}};}),
  hold(5.85,6.3,TEOD,PI,'none',{face:'happy',A:{aLx:-0.5,aRx:-0.5,aLz:-0.7,aRz:0.7}}),
  hold(6.3,7.0,TEOD,PI,'laugh',{face:'tongue'}),mv(7.0,7.5,[TEOD,Te],'walk',{face:'tongue'}),turnTo(7.5,7.8,Te,PI/2,PI,'laugh',{face:'tongue'}),
  hold(7.8,15.0,Te,PI,'stand',lg(function(t){if(t>12.9&&t<13.8)return {pose:'clap',face:'happy'};return {face:'happy'};})),
  hold(15.0,16.0,Te,PI,'none',{face:'wow',A:{aLx:-0.6,aRx:-0.6,aLz:-0.6,aRz:0.6}}),
  cust(16.0,17.8,function(t,u){var k=1-S(t,16.6,17.2);return {p:Te,yaw:PI,pose:t<17.0?'none':'laugh',pitch:-0.3*Math.sin(PI*clamp((t-16.0)/0.6,0,1)),face:t<16.8?'wow':'tongue',
   A:t<17.0?{aLx:-1.0,aRx:-1.0,aLz:0.35,aRz:-0.35,eL:-1.4,eR:-1.4}:null};}),
  mv(17.8,19.8,[Te,[-2.7,0.4],[-2.8,-3.2],CEM],'run',{face:'happy'}),turnTo(19.8,20.1,CEM,yawTo([-2.8,-3.2],CEM),0,'stand',{face:'happy'}),
  hold(20.1,21.0,CEM,0,'stand',{face:'focus'}),hold(21.0,23.4,CEM,0,'none',function(t){return t<21.5?{pose:'hold',face:'focus'}:{pose:'hold',face:'happy',y:hopAt(t,21.6,0.4,0.25)};}),
  throwC('teo',23.4,T.T5,CEM,[1.0,-1.6]),hold(T.T5+0.4,24.9,CEM,yawTo(CEM,BIA2),'look',{face:'wow'}),hold(24.9,T.GO,CEM,yawTo(CEM,DREF),'stand',lg({face:'wow'}))],
  gather('teo',CEM,[[-2.4,-2.7],[-2.2,-0.4]],T.GO,32.4),toFin('teo',T.ROW,[[-1.6,1.4]]),tail('teo'));
 // DUDA: recebe do Pipoca, arremessa na Bia, recebe o quique, arremessa no Léo
 TL.duda=arrive('duda').concat([hold(T.ARR,6.3,D,PI,'stand',{face:'happy'}),hold(6.3,9.3,D,PI,'stand',lg(function(t){return t>7.7?{pose:'look',face:'happy'}:{face:'happy'};})),
  hold(9.3,10.1,D,PI,'none',{pose:'hold',face:'focus'}),hold(10.1,11.7,D,PI,'none',{pose:'hold',face:'happy'}),
  throwC('duda',11.7,T.T2,D,B),hold(T.T2+0.4,13.0,D,yawTo(D,B),'look',{face:'focus'}),hold(13.0,14.4,D,PI,'clap',{face:'happy'}),
  hold(14.4,16.3,D,PI,'stand',{face:'focus'}),hold(16.3,19.6,D,PI,'none',function(t){if(inW(t,LAUGHW))return {pose:'hold',face:'tongue',y:0.04*Math.abs(Math.sin(t*13))};return {pose:'hold',face:t<16.9?'wow':'happy'};}),
  throwC('duda',19.6,T.T4,D,[-0.9,-2.6]),hold(T.T4+0.4,21.7,D,yawTo(D,L),'look',{face:'wow'}),hold(21.7,23.9,D,PI,'stand',{face:'happy'}),
  turnTo(23.9,24.3,D,PI,yawTo(D,DREF),'look',{face:'wow'}),hold(24.3,27.6,D,yawTo(D,DREF),'none',function(t){if(inW(t,LAUGHW))return {pose:'laugh',face:'tongue'};return {pose:'none',face:'wow',A:{aRx:-1.7,eR:-0.1,aLx:-0.2}};}),
  hold(27.6,T.GO,D,yawTo(D,DREF),'stand',{face:'happy'})],gather('duda',D,[],T.GO,31.9),toFin('duda',T.ROW+0.4,[[1.6,1.4]]),tail('duda'));
})();
// ----- Pipoca (juiz) -----
var DPK=[0.42,4.1],DDU=[1.0,3.1];
var LOOP=[DREF,[3.2,2.8],[0.0,3.9],[-3.0,2.7],[-3.4,-1.0],[-2.9,-4.9],[0.2,-5.1],[3.1,-3.8],[3.5,-1.4],[1.6,-0.5],DC];
DG=[hold(0,0.4,[4.6,1.6],yawTo([4.6,1.6],DREF),'stand'),mv(0.4,2.6,[[4.6,1.6],[3.4,0.6],DREF],'drun'),turnTo(2.6,2.9,DREF,yawTo([3.4,0.6],DREF),-PI/2,'sit'),
 hold(2.9,6.35,DREF,-PI/2,'sit',function(t){return {tailF:24,hz:0.12*Math.sin(t*3)};}),
 mv(6.35,7.7,[DREF,[2.9,2.9],[1.2,4.2],DPK],'drun',{tailF:34}),turnTo(7.7,7.8,DPK,yawTo([1.2,4.2],DPK),-PI/2,'sniff'),hold(7.8,8.1,DPK,-PI/2,'sniff'),
 mv(8.1,9.3,[DPK,[1.3,3.9],DDU],'dwalk',{tailF:30}),turnTo(9.3,9.5,DDU,yawTo([1.3,3.9],DDU),PI,'stand'),
 cust(9.5,10.2,function(t){return {p:DDU,yaw:PI,pose:'stand',hx:-0.6*Math.sin(PI*lin(t,9.5,10.1)),y:0.15*Math.sin(PI*lin(t,9.5,10.1))};}),
 mv(10.2,11.8,[DDU,[2.7,2.8],[3.1,0.8],DREF],'drun'),turnTo(11.8,12.1,DREF,yawTo([3.1,0.8],DREF),-PI/2,'sit'),
 hold(12.1,16.0,DREF,-PI/2,'sit',{tailF:24}),hold(16.0,17.6,DREF,-PI/2,'bark'),hold(17.6,24.15,DREF,-PI/2,'sit',{tailF:24}),
 cust(24.15,25.6,function(t){var l=S(t,24.15,24.55)*(1-S(t,25.2,25.6));return {p:DREF,yaw:-PI/2-0.15,pose:'hind',lift:l,wig:0,tailF:36,tailA:1.1};}),
 hold(25.6,T.LAP,DREF,-PI/2,'stand',{tailF:36}),mv(T.LAP,30.4,LOOP,'drun',{tailF:40,tailA:1.2}),turnTo(30.4,30.6,DC,yawTo([1.6,-0.5],DC),0,'stand'),
 cust(30.6,T.YAY,function(t){if(t<31.0)return {p:DC,yaw:0,pose:'stand',hx:0.5*Math.sin(PI*lin(t,30.6,31.0))};if(inW(t,LAUGHW))return {p:DC,yaw:0,pose:'hind',wig:1,lift:1,tailF:36,tailA:1.2};return {p:DC,yaw:0.25*Math.sin(t*3),pose:'sit',tailF:34,tailA:1.1};}),
 hold(T.YAY,36.4,DC,0,'party'),hold(36.4,36.9,DC,0,'sniff'),mv(36.9,38.2,[DC,[0,1.6],DF],'dwalk',{tailF:30}),hold(38.2,T.DANCE,DF,0,'sit',{tailF:30}),hold(T.DANCE,END+2,DF,0,'party')];
// ----- bola -----
var BALL=new THREE.Group();scene.add(BALL);
(function(){var b=new THREE.Mesh(new THREE.SphereGeometry(0.26,22,16),mat(0xffd23f,{roughness:0.8}));b.castShadow=true;BALL.add(b);
 [0,PI/2].forEach(function(r){var s=new THREE.Mesh(new THREE.TorusGeometry(0.262,0.035,8,28),mat(0xff5d8f,{roughness:0.8}));s.rotation.y=r;BALL.add(s);});})();
var BR=0.26;
function A_h(n){return ['h',n];}
var BS=[[0,T.T1,['h','leo']],[T.T1,6.25,'F',['h','leo'],['g',-0.8,2.7],0.7],[6.25,7.8,'R',[-0.8,2.7],[-0.5,4.1]],[7.8,8.1,'F',['g',-0.5,4.1],['m'],0.05],[8.1,9.6,['m']],
 [9.6,10.1,'F',['m'],['2','duda'],0.5],[10.1,11.7,['2','duda']],[11.7,T.T2,['h','duda']],[T.T2,12.95,'F',['h','duda'],['2','bia'],0.6],[12.95,14.85,['2','bia']],
 [14.85,T.T3,['h','bia']],[T.T3,T.HIT,'F',['h','bia'],['belly','teo'],0.35],[T.HIT,16.9,'F',['belly','teo'],['2','duda'],1.4],[16.9,19.6,['2','duda']],
 [19.6,T.T4,['h','duda']],[T.T4,21.4,'F',['h','duda'],['2','teo'],1.0],[21.4,23.4,['2','teo']],[23.4,T.T5,['h','teo']],[T.T5,T.CATCH,'F',['h','teo'],['m'],0.9],
 [T.CATCH,T.DROP,['m']],[T.DROP,31.0,'F',['m'],['g',GB[0],GB[1]],0.15],[31.0,36.5,['g',GB[0],GB[1]]],[36.5,36.85,'F',['g',GB[0],GB[1]],['m'],0.05],[36.85,999,['m']]];
var _hp=new THREE.Vector3(),_hq=new THREE.Vector3();
function live(a){var k=a[0];
 if(k==='h'){KIDS[a[1]].aR.e.children[1].getWorldPosition(_hp);return _hp.clone().add(V(0,-0.05,0));}
 if(k==='2'){KIDS[a[1]].aR.e.children[1].getWorldPosition(_hp);KIDS[a[1]].aL.e.children[1].getWorldPosition(_hq);var m=_hp.clone().add(_hq).multiplyScalar(0.5);
  var y=KIDS[a[1]].root.rotation.y;m.x+=Math.sin(y)*0.12;m.z+=Math.cos(y)*0.12;return m;}
 if(k==='belly')return KIDS[a[1]].root.localToWorld(V(0,2.0,0.9));
 if(k==='m'){dog.head.updateMatrixWorld(true);return dog.head.localToWorld(V(0,-0.1,0.55));}
 return V(a[1],BR,a[2]);}
var PC={};
function ptAt(a,tq,tnow){if(a[0]==='g')return live(a);var key=a.join()+tq.toFixed(3);if(PC[key])return PC[key].clone();var r;
 if(a[0]==='m'){applyDog(tq);dog.root.updateMatrixWorld(true);r=live(a);applyDog(tnow);dog.root.updateMatrixWorld(true);}
 else{var n=a[1];applyKid(KIDS[n],stateOf(n,tq),tq);KIDS[n].root.updateMatrixWorld(true);r=live(a);applyKid(KIDS[n],stateOf(n,tnow),tnow);KIDS[n].root.updateMatrixWorld(true);}
 PC[key]=r.clone();return r;}
function ballAt(t){var s=BS[0];for(var i=0;i<BS.length;i++)if(t>=BS[i][0])s=BS[i];
 if(s[2]==='F'){var a=ptAt(s[3],s[0],t),b=ptAt(s[4],s[1],t),u=clamp((t-s[0])/(s[1]-s[0]),0,1);var top=Math.max(a.y,b.y)+s[5],m=a.clone().lerp(b,0.5);m.y=2*top-(a.y+b.y)/2;var v=1-u;
  return {p:a.clone().multiplyScalar(v*v).add(m.multiplyScalar(2*v*u)).add(b.clone().multiplyScalar(u*u)),spin:true};}
 if(s[2]==='R'){var w=1-Math.pow(1-lin(t,s[0],s[1]),2);return {p:V(lerp(s[3][0],s[4][0],w),BR,lerp(s[3][1],s[4][1],w)),roll:w*Math.hypot(s[4][0]-s[3][0],s[4][1]-s[3][1])/BR,dir:Math.atan2(s[4][0]-s[3][0],s[4][1]-s[3][1])};}
 return {p:live(s[2])};}
EXTRA=function(t){var b=ballAt(t);BALL.position.copy(b.p);if(b.spin)BALL.rotation.set(t*7,t*3,0);else if(b.roll!=null)BALL.rotation.set(b.roll,b.dir,0,'YXZ');};
BURST=[[T.YAY,DC,1.6],[T.DANCE,[0,2.6],2.2],[T.DANCE+3,[0,2.6],2.2]];
BW=[['Queimada com bola macia!',3.2,4.8,kp('leo',2.9,0.4),1],['Errou! Errou!',6.3,7.8,kp('teo',2.2,-0.6),1],['Valeu, juiz!',9.9,11.3,kp('duda',2.9,0.2),1],
 ['Peguei!',13.0,14.4,kp('bia',2.9,0),1],['Ai! Fui queimado!',16.2,17.7,kp('teo',2.9,0),1],['Agora é minha vez!',21.6,23.1,kp('teo',2.9,0),1],
 ['O juiz pegou a bola!',25.9,27.4,kp('duda',2.9,0),1],['Ele fugiu com a bola!',28.4,29.9,kp('leo',2.9,0),1],['O Pipoca é o campeão!',32.8,34.4,kp('bia',2.9,0),1],
 ['Amanhã eu desvio de tudo!',50.5,54.5,kp('teo',2.9,0.5),1]];
var EXQ=[[0,-3.0],[0,2.6]];
function PANC(a0,a1,e0,e1,t0,t1,fov,m,ex,zm){return function(t){var u=ez(lin(t,t0,t1));return frameC(ALL,lerp(a0,a1,u),lerp(e0,e1,u),fov||46,m||0.17,ex||EXQ,zm);};}
var FL=function(){return frameLow(ALL,0,18,50,0.06);};
SH=[[0,T.ARR,PANC(30,5,56,46,0,T.ARR)],
 [T.ARR,5.0,PANC(5,-5,46,44,T.ARR,5.0)],
 [5.0,9.4,PANC(-12,14,48,50,5.0,9.4,46,0.17,[[0,-3.0],[0,4.2]])],
 [9.4,14.6,PANC(14,-12,46,44,9.4,14.6)],
 [14.6,17.8,PANC(160,172,44,42,14.6,17.8)],
 [17.8,21.6,PANC(-16,-6,48,46,17.8,21.6,46,0.17,[[0,-3.9],[0,2.6]])],
 [21.6,26.4,PANC(62,70,50,48,21.6,26.4,46,0.17,[[0,-3.9],[0,2.6]])],
 [26.4,30.6,function(t){var u=ez(lin(t,26.4,30.6));return frameOn(ALL,lerp(10,-10,u),56,46,0.1,[[0,-5.1],[0,3.9]]);}],
 [30.6,T.YAY,PANC(-10,8,48,50,30.6,T.YAY,46,0.14,[])],
 [T.YAY,T.ROW+0.4,PANC(8,0,50,48,T.YAY,T.ROW+0.4,46,0.14,[])],
 [T.ROW+0.4,T.DANCE,function(t){return mixCam(frameC(ALL,0,48,46,0.14,[]),FL(),ez(lin(t,T.ROW+0.4,T.DANCE)));}],
 [T.DANCE,END+2,FL]];
EV=[[2.7,'bark'],[3.0,'whistle'],[T.T1,'throw'],[6.25,'boing'],[6.4,'laugh'],[6.4,'run'],[7.9,'pop'],[9.7,'boing'],[T.T2,'throw'],[12.95,'catch'],[13.0,'ta'],
 [T.T3,'throw'],[T.HIT,'boing'],[16.05,'whistle'],[16.2,'bark'],[17.1,'laugh'],[17.8,'run'],[T.T4,'throw'],[21.4,'catch'],[T.T5,'throw'],[T.CATCH,'catch'],
 [25.0,'bark'],[26.3,'laugh'],[T.LAP,'run'],[T.LAP,'go'],[T.DROP+0.35,'boing'],[T.GO,'run'],[33.0,'laugh'],[T.YAY,'confetti'],[T.DANCE,'confetti']];
// balões presos dentro da tela (não saem pelas bordas)
var _bv=new THREE.Vector3();
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*(w[4]||1);
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));
  _bv.set(p[0],p[1]+0.45*k,p[2]);var d=_bv.distanceTo(camPosV),tv=Math.tan(camera.fov*PI/360),hw=0.9*k/(d*tv*W/H),hh=0.45*k/(d*tv);
  _bv.project(camera);_bv.x=clamp(_bv.x,-1+hw+0.03,1-hw-0.03);_bv.y=Math.min(_bv.y,1-hh-0.03);_bv.unproject(camera);
  m.position.copy(_bv);m.quaternion.copy(camera.quaternion);}});}
