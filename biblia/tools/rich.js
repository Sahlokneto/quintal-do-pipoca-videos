var FLOOR=860;
function popS(lt,t0){return back(lin(lt,t0,t0+.45));}
function mkBg(c0,c1,c2,dust){var b=bg.getContext('2d');var g=b.createRadialGradient(W/2,H*.35,40,W/2,H*.5,H*.9);g.addColorStop(0,c0);g.addColorStop(.45,c1);g.addColorStop(1,c2);b.fillStyle=g;b.fillRect(0,0,W,H);
 for(var i=0;i<7000;i++){b.fillStyle='rgba('+(rnd()>.5?dust:'0,0,0')+','+(rnd()*.05)+')';b.fillRect(rnd()*W,rnd()*H,1+rnd()*2,1+rnd()*2);}}
var bg=document.createElement('canvas');bg.width=W;bg.height=H;
var PRT=[];for(var i=0;i<70;i++)PRT.push([rnd()*W,rnd()*H,1.5+rnd()*4,rnd()*6,.3+rnd()*.8,rnd()<.4]);
var RAYC='rgba(255,220,160,0.035)',GLD='rgba(255,209,102,A)';
function rays(t){x.save();x.globalCompositeOperation='lighter';for(var k=0;k<6;k++){var a0=-.5+k*.2+Math.sin(t*.3+k)*.04;x.fillStyle=RAYC;x.beginPath();x.moveTo(360,-80);x.lineTo(360+Math.tan(a0)*1500,1400);x.lineTo(360+Math.tan(a0+.07)*1500,1400);x.fill();}x.restore();}
// poeira subindo devagar
function particles(t){PRT.forEach(function(p){var yy=H-((H-p[1]+t*12*p[4])%H);var xx=p[0]+Math.sin(t*.7+p[3])*16;
 if(p[5])glow(xx,yy,p[2]*3,GLD,.4);else{x.fillStyle='rgba(255,255,255,.4)';x.beginPath();x.arc(xx,yy,p[2]*.6,0,7);x.fill();}});}
function sky(c1,c2){var g=x.createLinearGradient(0,300,0,FLOOR);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(0,300,W,FLOOR-300);}
function ground(c1,c2,lines){var g=x.createLinearGradient(0,FLOOR-40,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(0,FLOOR-40,W,H-FLOOR+40);
 if(lines){x.strokeStyle='rgba(0,0,0,.22)';x.lineWidth=2;for(var i=0;i<6;i++){x.beginPath();x.moveTo(0,FLOOR-40+i*i*12);x.lineTo(W,FLOOR-40+i*i*12);x.stroke();}}
 else{for(var i=0;i<160;i++){x.fillStyle='rgba(0,0,0,'+(.05+(i%5)*.03)+')';x.beginPath();x.ellipse((i*97)%W,FLOOR-30+(i*53)%200,2+(i%4),1+(i%3)*.6,0,0,7);x.fill();}}}
// pessoa em silhueta (sem rosto): túnica + cabeça + véu opcional
function person(X,Y,s,col,o){o=o||{};x.save();x.translate(X,Y);x.scale(o.flip?-s:s,s);if(o.bow){x.rotate(o.bow);}
 x.fillStyle=col;x.beginPath();x.moveTo(-34,0);x.quadraticCurveTo(-40,-80,-24,-120);x.quadraticCurveTo(0,-132,24,-120);x.quadraticCurveTo(40,-80,34,0);x.fill();
 x.beginPath();x.arc(o.headX||0,-146,22,0,7);x.fill();
 if(o.veil){x.fillStyle=o.veil;x.beginPath();x.moveTo(-26,-140);x.quadraticCurveTo(0,-182,26,-140);x.lineTo(34,-96);x.quadraticCurveTo(0,-110,-34,-96);x.fill();}
 if(o.belt){x.fillStyle=o.belt;x.fillRect(-28,-72,56,7);}
 if(o.arm!==undefined){x.strokeStyle=col;x.lineCap='round';x.lineWidth=14;x.beginPath();x.moveTo(14,-110);var ax=o.arm[0],ay=o.arm[1];x.quadraticCurveTo(ax+10,(ay-110)/2-20,ax,ay);x.stroke();if(o.stone){x.fillStyle=o.stone;x.beginPath();x.ellipse(ax,ay-6,12,10,.3,0,7);x.fill();}}
 x.restore();}
function column(X,Y0,Y1,w,c1,c2){var g=x.createLinearGradient(X-w/2,0,X+w/2,0);g.addColorStop(0,c2);g.addColorStop(.4,c1);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(X-w/2,Y0,w,Y1-Y0);x.fillStyle=c1;x.fillRect(X-w/2-10,Y0-14,w+20,16);x.fillRect(X-w/2-10,Y1-6,w+20,12);x.strokeStyle='rgba(0,0,0,.12)';x.lineWidth=2;for(var k=1;k<4;k++){x.beginPath();x.moveTo(X-w/2+k*w/4,Y0);x.lineTo(X-w/2+k*w/4,Y1);x.stroke();}}
function smoke(X,Y,t,h,col,a,sp){if(a<=0)return;sp=sp||1;x.save();for(var i=0;i<26;i++){var u=((t*.22*sp+i/26)%1),yy=Y-u*h,xx=X+Math.sin(u*7+t*.8+i)*(10+u*50),r=8+u*46;var gg=x.createRadialGradient(xx,yy,0,xx,yy,r);gg.addColorStop(0,col.replace('A',(a*.55*(1-u)*Math.min(1,u*6)).toFixed(3)));gg.addColorStop(1,col.replace('A',0));x.fillStyle=gg;x.beginPath();x.arc(xx,yy,r,0,7);x.fill();}x.restore();}
function flame(X,Y,s,t,k,a){if(a<=0)return;var f=1+.14*Math.sin(t*9+k*1.7);glow(X,Y-6*s,46*s,'rgba(255,200,100,A)',.75*a);x.save();x.globalAlpha*=a;x.fillStyle='#ffb347';x.beginPath();x.ellipse(X,Y-8*s,7*s,16*s*f,0,0,7);x.fill();x.fillStyle='#fff3c4';x.beginPath();x.ellipse(X,Y-5*s,3.5*s,8*s*f,0,0,7);x.fill();x.restore();}
function candle(X,Y,h,w,col,lit,t,k){var g=x.createLinearGradient(X-w/2,0,X+w/2,0);g.addColorStop(0,col[1]);g.addColorStop(.45,col[0]);g.addColorStop(1,col[1]);x.fillStyle=g;x.fillRect(X-w/2,Y-h,w,h);x.strokeStyle='#2a1a10';x.lineWidth=2;x.beginPath();x.moveTo(X,Y-h);x.lineTo(X,Y-h-6);x.stroke();flame(X,Y-h-4,w/22,t,k,lit);}
// rolo / pergaminho aberto
function scroll(X,Y,w,h,u,col){if(u<=0)return;var ww=w*u;x.fillStyle='rgba(0,0,0,.3)';rr(X-ww/2+6,Y-h/2+10,ww,h,8);x.fill();var g=x.createLinearGradient(0,Y-h/2,0,Y+h/2);g.addColorStop(0,col||'#f7e7c2');g.addColorStop(1,'#d9bd86');x.fillStyle=g;x.fillRect(X-ww/2,Y-h/2,ww,h);
 [-1,1].forEach(function(s){var gx=X+s*ww/2;var g2=x.createLinearGradient(gx-14,0,gx+14,0);g2.addColorStop(0,'#7a4a1e');g2.addColorStop(.5,'#c08a4a');g2.addColorStop(1,'#6a3a12');x.fillStyle=g2;rr(gx-14,Y-h/2-16,28,h+32,12);x.fill();});}
// livro aberto
function book(X,Y,w,h,a){x.save();x.globalAlpha*=a;x.fillStyle='#5a1e10';rr(X-w/2-12,Y-h/2-8,w+24,h+20,10);x.fill();['#fbf1dc','#f3e3c0'].forEach(function(c,i){x.fillStyle=c;x.beginPath();var s=i?1:-1;x.moveTo(X,Y-h/2+6);x.quadraticCurveTo(X+s*w*.25,Y-h/2-6,X+s*w/2,Y-h/2);x.lineTo(X+s*w/2,Y+h/2);x.quadraticCurveTo(X+s*w*.25,Y+h/2-10,X,Y+h/2);x.fill();});x.strokeStyle='rgba(90,40,10,.35)';x.lineWidth=2;x.beginPath();x.moveTo(X,Y-h/2+6);x.lineTo(X,Y+h/2);x.stroke();x.restore();}
function lab(s,X,Y,u,col,bgc){if(u<=0)return;x.save();x.globalAlpha*=u;x.font='700 28px P';var w=x.measureText(s).width+44;x.fillStyle=bgc||'rgba(10,4,4,.82)';rr(X-w/2,Y-40,w,58,14);x.fill();txt(s,X,Y-2,'700 28px P',col||'#ffd166');x.restore();}
function stone(X,Y,r,c){x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(X+3,Y+r*.55,r*1.1,r*.35,0,0,7);x.fill();var g=x.createRadialGradient(X-r*.3,Y-r*.3,1,X,Y,r*1.2);g.addColorStop(0,c||'#cfc6b8');g.addColorStop(1,'#6e665a');x.fillStyle=g;x.beginPath();x.ellipse(X,Y,r*1.15,r*.8,.2,0,7);x.fill();}
function heart(X,Y,s,col,a){if(a<=0)return;x.save();x.globalAlpha*=a;x.translate(X,Y);x.scale(s,s);x.fillStyle=col;x.beginPath();x.moveTo(0,30);x.bezierCurveTo(-60,-10,-40,-60,0,-30);x.bezierCurveTo(40,-60,60,-10,0,30);x.fill();x.restore();}
// ================= MOTOR RICO (v2): câmera, personagens detalhados, cenários =================
var CU=0; // progresso da cena (0..1) para parallax
function par(d){x.translate((CU-.5)*-d,0);}
function withCam(fs,CAM){return fs.map(function(f,i){return function(t,lt,L){var id='L'+(i+1),d=(i<7?L[id+'e']:L.END)-L[id];var u=clamp(lt/d,0,1);CU=u;var c=CAM[i];
 var z=lerp(c[0],c[1],ez(u))*(1+.07*(1-ez(lin(lt,-.3,.7))));x.save();x.translate(360+c[2]*(ez(u)-.5),580+c[3]*(ez(u)-.5));x.scale(z,z);x.translate(-360,-580);f(t,lt,L,u);x.restore();};});}
function shade(c,k){var r,g,b;if(c[0]=='#'){var n=parseInt(c.slice(1),16);r=n>>16;g=n>>8&255;b=n&255;}else{var m=c.match(/\d+/g);r=+m[0];g=+m[1];b=+m[2];}function f(v){return Math.round(clamp(k<0?v*(1+k):v+(255-v)*k,0,255));}return 'rgb('+f(r)+','+f(g)+','+f(b)+')';}
// braço em 2 segmentos (ombro sx,sy), ângulos a partir de "para baixo", + = para frente
function limb(sx,sy,a1,a2,col,skin,w,fist){var L1=30,L2=26;var ex=sx+Math.sin(a1)*L1,ey=sy+Math.cos(a1)*L1,hx=ex+Math.sin(a1+a2)*L2,hy=ey+Math.cos(a1+a2)*L2;
 x.lineCap='round';x.lineJoin='round';x.strokeStyle=col;x.lineWidth=w;x.beginPath();x.moveTo(sx,sy);x.lineTo(ex,ey);x.lineTo(hx-Math.sin(a1+a2)*4,hy-Math.cos(a1+a2)*4);x.stroke();
 x.strokeStyle=shade(col,.06);x.lineWidth=w*.3;x.beginPath();x.moveTo(sx+1,sy-2);x.lineTo(ex+1,ey-2);x.stroke();x.strokeStyle=shade(col,-.12);x.lineWidth=w*1.05;x.beginPath();x.moveTo(hx-Math.sin(a1+a2)*9,hy-Math.cos(a1+a2)*9);x.lineTo(hx-Math.sin(a1+a2)*5,hy-Math.cos(a1+a2)*5);x.stroke();
 x.fillStyle=skin;x.beginPath();x.ellipse(hx,hy,fist?7.5:6,fist?7:8,a1+a2,0,7);x.fill();x.fillStyle=shade(skin,-.2);x.beginPath();x.ellipse(hx+1,hy+2,4,3,0,0,7);x.fill();return [hx,hy];}
var POSE={down:[.15,.12],chest:[.35,2.25],away:[.62,1.55],raise:[2.0,.3],pray:[.5,1.9],open:[1.25,.35],book:[.45,1.35],quill:[.95,.95],hold:[.8,.9]};
// pessoa detalhada. o: x,y,s,f(1 direita/-1 esquerda),t, robe,mantle,trim,skin,hair,beard,head('bare','veil','turban','hood','tallit','tonsure'),veil, walk(fase|null), bow, tilt, arm, back(pose braço de trás), beat(0..1), back view: o.rear
function fig(o){var t=o.t||0;x.save();x.translate(o.x,o.y);x.scale(o.s*(o.f||1),o.s);
 var skin=o.skin||'#c98e64',hair=o.hair||'#2a1a10',robe=o.robe||'#7a4a2a',man=o.mantle||null,trim=o.trim||'#d9a441';
 x.fillStyle='rgba(0,0,0,.28)';x.beginPath();x.ellipse(0,0,48,9,0,0,7);x.fill();
 var bob=0;
 // pés / pernas
 if(o.walk!=null){var ph=o.walk;bob=-Math.abs(Math.sin(ph))*3;[[1,0],[-1,PI]].forEach(function(k){var sw=Math.sin(ph+k[1]);var fx=sw*16,lift=Math.max(0,-Math.cos(ph+k[1]))*6;x.strokeStyle=shade(skin,-.15);x.lineWidth=9;x.lineCap='round';x.beginPath();x.moveTo(k[0]*5,-30);x.lineTo(fx,-6-lift);x.stroke();x.fillStyle='#5a3418';x.beginPath();x.ellipse(fx+5,-3-lift,11,5,0,0,7);x.fill();});}
 else{x.fillStyle='#5a3418';x.beginPath();x.ellipse(-8,-3,11,5,0,0,7);x.fill();x.beginPath();x.ellipse(14,-3,11,5,0,0,7);x.fill();}
 x.translate(0,bob);x.translate(0,-50);x.rotate(o.bow||0);x.translate(0,50);
 var br=1+.012*Math.sin(t*2.2+o.x*.1);x.translate(0,-90);x.scale(1,br);x.translate(0,90);
 // braço de trás
 var bp=POSE[o.back||'down'];x.save();limb(-4,-144,bp[0],bp[1],shade(robe,-.35),shade(skin,-.2),15,1);x.restore();
 // túnica
 var sway=Math.sin(t*1.3+o.x)*2+(o.walk!=null?Math.sin(o.walk)*4:0);
 var g=x.createLinearGradient(-40,0,40,0);g.addColorStop(0,shade(robe,-.35));g.addColorStop(.55,robe);g.addColorStop(1,shade(robe,-.2));x.fillStyle=g;
 x.beginPath();x.moveTo(-22,-152);x.quadraticCurveTo(0,-158,24,-150);x.quadraticCurveTo(34,-96,40+sway,-24);x.quadraticCurveTo(2,-16,-38+sway,-24);x.quadraticCurveTo(-34,-96,-22,-152);x.fill();
 x.strokeStyle=shade(robe,-.3);x.lineWidth=2.5;[[-12,-110,-18,-26],[4,-104,6+sway*.5,-22],[18,-100,26+sway,-26],[-24,-90,-30,-30]].forEach(function(f){x.beginPath();x.moveTo(f[0],f[1]);x.quadraticCurveTo((f[0]+f[2])/2+3,(f[1]+f[3])/2,f[2],f[3]);x.stroke();});
 x.strokeStyle=trim;x.lineWidth=4;x.beginPath();x.moveTo(-37+sway,-27);x.quadraticCurveTo(2,-19,39+sway,-27);x.stroke();
 // manto
 if(man){var gm=x.createLinearGradient(-30,-150,30,-60);gm.addColorStop(0,shade(man,.1));gm.addColorStop(1,shade(man,-.3));x.fillStyle=gm;x.beginPath();x.moveTo(-26,-150);x.quadraticCurveTo(0,-160,22,-152);x.lineTo(26,-136);x.quadraticCurveTo(-6,-100,-30+sway*.5,-50);x.quadraticCurveTo(-40,-100,-26,-150);x.fill();x.strokeStyle=shade(man,-.4);x.lineWidth=2;x.beginPath();x.moveTo(20,-140);x.quadraticCurveTo(-8,-104,-28,-58);x.stroke();}
 if(o.chas){var gc=x.createLinearGradient(-40,0,40,0);gc.addColorStop(0,shade(o.chas,-.35));gc.addColorStop(.55,o.chas);gc.addColorStop(1,shade(o.chas,-.2));x.fillStyle=gc;x.beginPath();x.moveTo(-26,-152);x.quadraticCurveTo(0,-160,26,-150);x.quadraticCurveTo(44,-110,40,-52);x.quadraticCurveTo(4,-40,-36,-52);x.quadraticCurveTo(-44,-110,-26,-152);x.fill();x.strokeStyle='#ffd56b';x.lineWidth=7;x.beginPath();x.moveTo(-14,-150);x.lineTo(4,-122);x.lineTo(20,-150);x.moveTo(4,-122);x.lineTo(4,-48);x.stroke();}
 // cinto
 if(!o.chas)if(!o.chas){x.fillStyle=o.belt||shade(trim,-.2);x.beginPath();x.moveTo(-30,-96);x.lineTo(32,-98);x.lineTo(32,-89);x.lineTo(-31,-87);x.fill();x.fillRect(-18,-90,5,22+Math.sin(t*2)*1.5);x.fillRect(-11,-90,5,18);}
 // pescoço e cabeça
 x.save();x.translate(2,-158);x.rotate(o.tilt||0);x.translate(-2,158);
 x.fillStyle=shade(skin,-.15);x.fillRect(-6,-166,13,14);
 var gh=x.createRadialGradient(10,-184,3,4,-178,22);gh.addColorStop(0,shade(skin,.12));gh.addColorStop(1,shade(skin,-.15));x.fillStyle=gh;x.beginPath();x.ellipse(4,-180,16,19,0,0,7);x.fill();
 if(!o.rear){x.beginPath();x.moveTo(18,-185);x.lineTo(25,-174);x.lineTo(18,-171);x.fill();
  x.fillStyle=shade(skin,-.3);x.beginPath();x.ellipse(-4,-179,3.5,5,0,0,7);x.fill();
  x.strokeStyle='#2a1a10';x.lineWidth=2;x.lineCap='round';if(o.closed||o.bow>.15){x.beginPath();x.arc(12,-183,3.5,.2,PI-.2);x.stroke();}else{x.fillStyle='#1a1008';x.beginPath();x.ellipse(13,-183,2.2,2.6,0,0,7);x.fill();}
  x.strokeStyle=shade(hair,.1);x.lineWidth=2.4;x.beginPath();x.moveTo(8,-190);x.lineTo(17,-189);x.stroke();
  x.strokeStyle=shade(skin,-.35);x.lineWidth=1.6;x.beginPath();x.moveTo(13,-166);x.lineTo(18,-166);x.stroke();}
 // cabelo / barba
 x.fillStyle=hair;x.beginPath();x.ellipse(0,-190,16,12,-.3,PI*.85,PI*2.05);x.fill();if(o.rear){x.beginPath();x.ellipse(4,-182,16.5,18,0,0,7);x.fill();}
 if(o.beard){x.beginPath();x.moveTo(-6,-176);x.quadraticCurveTo(-4,-158,8,-154);x.quadraticCurveTo(18,-156,20,-168);x.quadraticCurveTo(14,-162,8,-166);x.quadraticCurveTo(0,-168,-6,-176);x.fill();}
 var hd=o.head||'bare';
 if(hd=='veil'||hd=='hood'||hd=='tallit'){var vc=o.veil||(hd=='tallit'?'#f4efe2':man||robe);var gv=x.createLinearGradient(-30,-200,20,-140);gv.addColorStop(0,shade(vc,.08));gv.addColorStop(1,shade(vc,-.22));x.fillStyle=gv;x.beginPath();x.moveTo(15,-197);x.quadraticCurveTo(2,-208,-14,-198);x.quadraticCurveTo(-26,-184,-24,-160);x.quadraticCurveTo(-28,-148,-36,-128);x.lineTo(-16,-132);x.quadraticCurveTo(-8,-150,-6,-170);x.quadraticCurveTo(0,-190,15,-197);x.fill();
  if(hd=='tallit'){x.strokeStyle='#2a5aa8';x.lineWidth=3;x.beginPath();x.moveTo(-30,-144);x.lineTo(-14,-140);x.moveTo(-33,-136);x.lineTo(-16,-133);x.stroke();x.fillStyle='#111';x.fillRect(4,-205,9,8);}}
 if(hd=='turban'){x.fillStyle=o.veil||'#e8dcc0';x.beginPath();x.ellipse(2,-196,19,9,-.1,0,7);x.fill();x.fillStyle=shade(o.veil||'#e8dcc0',-.15);x.beginPath();x.ellipse(2,-192,18,5,-.1,0,PI);x.fill();}
 if(hd=='tonsure'){x.fillStyle=shade(skin,.05);x.beginPath();x.ellipse(0,-196,10,5,-.2,0,7);x.fill();}
 x.restore();
 // braço da frente
 var ap=POSE[o.arm||'down'],a1=ap[0],a2=ap[1];if(o.arm=='chest'){var b=o.beat||0;a1=lerp(.52,.35,b);a2=lerp(1.9,2.25,b);}
 if(o.arm=='quill'){a1+=Math.sin(t*7)*.06;a2+=Math.sin(t*9)*.08;}
 if(o.hg>0){glow(26,-128,46,'rgba(255,110,90,A)',o.hg*(.35+.5*(o.beat||0)));}
 var hpos=limb(8,-144,a1,a2,shade(robe,-.05),skin,16,o.arm=='chest');
 if(o.item=='book'){x.fillStyle='#6a1a12';x.save();x.translate(hpos[0]+8,hpos[1]-4);x.rotate(-.3);x.fillRect(-14,-18,28,36);x.fillStyle='#d9a441';x.fillRect(-10,-14,20,3);x.restore();}
 if(o.item=='quill'){x.strokeStyle='#f4ecd8';x.lineWidth=2.5;x.beginPath();x.moveTo(hpos[0],hpos[1]);x.lineTo(hpos[0]+18,hpos[1]-34);x.stroke();x.fillStyle='#f4ecd8';x.beginPath();x.ellipse(hpos[0]+14,hpos[1]-26,4,13,.5,0,7);x.fill();}
 if(o.item=='candle'){candle(hpos[0]+2,hpos[1]-4,40,9,['#fffaf0','#d8d0c0'],1,t,3);}
 x.restore();}
// vitral com feixe de luz
function vitral(X,Y,w,h,t,cols,beam){x.save();x.beginPath();x.moveTo(X-w/2,Y+h);x.lineTo(X-w/2,Y+w/2);x.arc(X,Y+w/2,w/2,PI,0);x.lineTo(X+w/2,Y+h);x.closePath();x.fillStyle='#1a0a08';x.fill();x.clip();
 var n=0;for(var r=0;r<Math.ceil(h/22)+1;r++)for(var c=0;c<Math.ceil(w/22);c++){var cc=cols[(r*3+c*5+n++)%cols.length];x.fillStyle=cc;x.globalAlpha=.75+.25*Math.sin(t*1.5+r+c);x.fillRect(X-w/2+c*22+1,Y+r*22+1,20,20);}
 x.globalAlpha=1;x.strokeStyle='#1a0a08';x.lineWidth=3;x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y+h);x.moveTo(X-w/2,Y+h*.55);x.lineTo(X+w/2,Y+h*.55);x.stroke();
 x.strokeStyle='rgba(255,230,160,.9)';x.lineWidth=4;x.beginPath();x.arc(X,Y+w/2+6,w*.22,0,7);x.stroke();x.restore();
 x.strokeStyle='#3a2018';x.lineWidth=6;x.beginPath();x.moveTo(X-w/2-3,Y+h+3);x.lineTo(X-w/2-3,Y+w/2);x.arc(X,Y+w/2,w/2+3,PI,0);x.lineTo(X+w/2+3,Y+h+3);x.closePath();x.stroke();
 if(beam){x.save();x.globalCompositeOperation='lighter';var bx=beam[0],by=beam[1];var g=x.createLinearGradient(X,Y,bx,by);g.addColorStop(0,'rgba(255,200,150,'+(.22+.05*Math.sin(t))+')');g.addColorStop(1,'rgba(255,120,120,0)');x.fillStyle=g;x.beginPath();x.moveTo(X-w/2,Y+h*.3);x.lineTo(X+w/2,Y+h*.3);x.lineTo(bx+70,by);x.lineTo(bx-70,by);x.fill();x.restore();}}
function tiles(y0,y1,vx,c1,c2){var rows=10;for(var r=0;r<rows;r++){var a=Math.pow(r/rows,1.6),b=Math.pow((r+1)/rows,1.6);var ya=y0+(y1-y0)*a,yb=y0+(y1-y0)*b;for(var c=-12;c<12;c++){var xa0=vx+(c*40-0)*(.35+a*2.2),xa1=vx+((c+1)*40)*(.35+a*2.2),xb0=vx+(c*40)*(.35+b*2.2),xb1=vx+((c+1)*40)*(.35+b*2.2);x.fillStyle=(r+c)%2?c1:c2;x.beginPath();x.moveTo(xa0,ya);x.lineTo(xa1,ya);x.lineTo(xb1,yb);x.lineTo(xb0,yb);x.fill();}}}
function colm(X,Y0,Y1,w,c1,c2){column(X,Y0,Y1,w,c1,c2);x.fillStyle=shade(c1,-.1);x.beginPath();x.moveTo(X-w/2-14,Y0-14);x.quadraticCurveTo(X,Y0+6,X+w/2+14,Y0-14);x.lineTo(X+w/2+18,Y0-24);x.lineTo(X-w/2-18,Y0-24);x.fill();}
function lamp(X,Y,len,t,k){var a=Math.sin(t*1.1+k)*.08;var lx=X+Math.sin(a)*len,ly=Y+Math.cos(a)*len;x.strokeStyle='#6a4a2a';x.lineWidth=2;x.beginPath();x.moveTo(X,Y);x.lineTo(lx,ly);x.stroke();x.fillStyle='#c9902a';x.beginPath();x.ellipse(lx,ly+8,18,8,0,0,PI);x.fill();x.fillRect(lx-18,ly+2,36,6);flame(lx,ly+2,.8,t,k,1);}
function clouds(t,y,col,sp,n,sc){for(var i=0;i<n;i++){var X=((i*260+t*sp)%(W+400))-200,Y=y+(i%3)*30;x.fillStyle=col;for(var k=0;k<4;k++){x.beginPath();x.ellipse(X+k*40*sc,Y-(k%2)*16*sc,50*sc,26*sc,0,0,7);x.fill();}}}
function birds(t,n,y,col){x.strokeStyle=col||'#2a1a1a';x.lineWidth=2.5;x.lineCap='round';for(var i=0;i<n;i++){var X=((i*190+t*(50+i*7))%(W+200))-100,Y=y+Math.sin(t+i)*14+i*18,f=Math.sin(t*9+i)*7;x.beginPath();x.moveTo(X-10,Y-f);x.quadraticCurveTo(X-4,Y-2,X,Y);x.quadraticCurveTo(X+4,Y-2,X+10,Y-f);x.stroke();}}
function hills(y,col,amp,fr,off){x.fillStyle=col;x.beginPath();x.moveTo(-100,FLOOR+200);for(var X=-100;X<=W+100;X+=20)x.lineTo(X,y+Math.sin(X*fr+off)*amp+Math.sin(X*fr*2.3+off)*amp*.4);x.lineTo(W+100,FLOOR+200);x.fill();}
function olive2(X,Y,s,t){x.save();x.translate(X,Y);x.scale(s,s);x.fillStyle='#4a3420';x.beginPath();x.moveTo(-14,0);x.bezierCurveTo(-26,-40,10,-60,-6,-110);x.lineTo(8,-112);x.bezierCurveTo(24,-60,-6,-40,16,0);x.fill();var sw=Math.sin(t*1.2+X)*4;[[-50,-130,48,'#5a7a32'],[22,-150,56,'#6a8a3a'],[64,-118,40,'#4f6e2a'],[-10,-176,46,'#7a9a4a'],[40,-190,34,'#6a8a3a']].forEach(function(c){x.fillStyle=c[3];x.beginPath();x.ellipse(c[0]+sw,c[1],c[2],c[2]*.62,0,0,7);x.fill();x.fillStyle='rgba(220,240,180,.18)';x.beginPath();x.ellipse(c[0]+sw-10,c[1]-10,c[2]*.5,c[2]*.25,0,0,7);x.fill();});x.restore();}
function house2(X,Y,w,h,col,lit,t){x.fillStyle=col;x.fillRect(X,Y-h,w,h);x.fillStyle=shade(col,-.2);x.fillRect(X-4,Y-h-8,w+8,10);x.fillStyle=lit?'rgba(255,200,110,'+(.8+.2*Math.sin(t*3+X))+')':'#2a1a10';x.fillRect(X+w*.3,Y-h*.65,w*.22,h*.28);x.fillStyle='#3a2210';x.fillRect(X+w*.62,Y-h*.5,w*.2,h*.5);}
function cross2(X,Y,s,c){x.save();x.translate(X,Y);x.scale(s,s);var g=x.createLinearGradient(-8,0,8,0);g.addColorStop(0,shade(c,-.3));g.addColorStop(.5,c);g.addColorStop(1,shade(c,-.4));x.fillStyle=g;x.fillRect(-8,-170,16,190);x.fillRect(-60,-130,120,15);x.restore();}
function ripple(X,Y,t,a,col){for(var k=0;k<4;k++){var u=((t*.8+k/4)%1);x.strokeStyle=col.replace('A',(a*(1-u)*.7).toFixed(3));x.lineWidth=5*(1-u)+1;x.beginPath();x.ellipse(X,Y,60+u*380,24+u*150,0,0,7);x.stroke();}}
