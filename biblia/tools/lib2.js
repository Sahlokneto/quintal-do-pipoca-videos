// ===== lib2: desenhos estáticos e detalhados (sem balanço/flutuação) =====
function hs(n){var s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s);}
function flame(X,Y,s,t,k,a){if(a<=0)return;glow(X,Y-6*s,46*s,'rgba(255,200,100,A)',.7*a);x.save();x.globalAlpha*=a;x.fillStyle='#ff9a3a';x.beginPath();x.moveTo(X,Y-26*s);x.quadraticCurveTo(X+9*s,Y-8*s,X,Y);x.quadraticCurveTo(X-9*s,Y-8*s,X,Y-26*s);x.fill();x.fillStyle='#fff3c4';x.beginPath();x.moveTo(X,Y-16*s);x.quadraticCurveTo(X+4*s,Y-5*s,X,Y);x.quadraticCurveTo(X-4*s,Y-5*s,X,Y-16*s);x.fill();x.restore();}
function shadow(X,Y,w,a){x.fillStyle='rgba(0,0,0,'+(a||.32)+')';x.beginPath();x.ellipse(X,Y,w,w*.14,0,0,7);x.fill();}
function lg(x0,x1,c0,c1,c2){var g=x.createLinearGradient(x0,0,x1,0);g.addColorStop(0,c0);g.addColorStop(.5,c1);g.addColorStop(1,c2||c0);return g;}
function vg(y0,y1,c0,c1){var g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,c0);g.addColorStop(1,c1);return g;}
// figura humana sem rosto (de costas, ou com capuz/véu); o: c, c2, head(hair|veil|hood), vc, hair, skin, pose(stand|kneel), arms(down|pray|up|[x,y]), belt, rope, flip, cand
function fig(X,Y,s,o){o=o||{};var c=o.c||'#7a4a2a',c2=o.c2||'#3a2010',sk=o.skin||'#c98e64',kn=o.pose=='kneel';x.save();x.translate(X,Y);x.scale(o.flip?-s:s,s);
 shadow(0,0,kn?50:40,.35);var top=kn?-86:-118,hy=kn?-108:-140;
 x.fillStyle=lg(-34,34,c2,c,c2);x.beginPath();
 if(kn){x.moveTo(-44,0);x.quadraticCurveTo(-46,-30,-28,-50);x.quadraticCurveTo(-30,-74,-24,top);x.quadraticCurveTo(0,top-10,24,top);x.quadraticCurveTo(30,-74,30,-50);x.quadraticCurveTo(48,-30,46,0);x.quadraticCurveTo(0,6,-44,0);}
 else{x.moveTo(-32,0);x.quadraticCurveTo(-36,-60,-25,top);x.quadraticCurveTo(0,top-10,25,top);x.quadraticCurveTo(36,-60,32,0);x.quadraticCurveTo(0,6,-32,0);}
 x.fill();x.strokeStyle='rgba(0,0,0,.2)';x.lineWidth=2;for(var k=-1;k<=1;k++){x.beginPath();x.moveTo(k*10,top+30);x.quadraticCurveTo(k*13,top+70,k*15,-4);x.stroke();}
 if(!kn){x.fillStyle='#2a1a10';x.beginPath();x.ellipse(-12,0,10,5,0,0,7);x.ellipse(12,0,10,5,0,0,7);x.fill();}
 if(o.belt){x.fillStyle=o.belt;x.fillRect(-26,top+44,52,6);if(o.rope){x.strokeStyle=o.belt;x.lineWidth=4;x.beginPath();x.moveTo(8,top+50);x.lineTo(12,top+110);x.stroke();x.fillStyle=o.belt;[top+70,top+88,top+106].forEach(function(yy){x.beginPath();x.arc(11,yy,4,0,7);x.fill();});}}
 // braços
 var ar=o.arms||'down';x.strokeStyle=c;x.lineCap='round';x.lineWidth=14;
 function arm(sx,ex,ey,hand){x.strokeStyle=c2;x.lineWidth=15;x.beginPath();x.moveTo(sx,top+8);x.quadraticCurveTo(sx+(ex-sx)*.2,(top+ey)/2,ex,ey);x.stroke();x.strokeStyle=c;x.lineWidth=11;x.beginPath();x.moveTo(sx,top+8);x.quadraticCurveTo(sx+(ex-sx)*.2,(top+ey)/2,ex,ey);x.stroke();if(hand){x.fillStyle=sk;x.beginPath();x.arc(ex,ey+(ey<top?-4:4),6,0,7);x.fill();}}
 if(ar=='down'){arm(-22,-30,top+66,1);arm(22,30,top+66,1);}
 else if(ar=='pray'){arm(-22,-8,top+40,0);arm(22,8,top+40,0);}
 else if(ar=='up'){arm(-22,-20,top-70,1);arm(22,20,top-70,1);}
 else if(ar=='none'){}
 else {arm(-22,-30,top+66,1);arm(22,ar[0],ar[1],1);}
 if(o.cand){x.fillStyle='#fffaf0';x.fillRect(26,top+40,7,22);flame(29.5,top+40,.8,0,0,1);}
 x.fillStyle=sk;x.fillRect(-6,top-8,12,10);
 var h=o.head||'hair';
 if(h=='hood'){x.fillStyle=c2;x.beginPath();x.arc(0,hy,22,0,7);x.fill();x.fillStyle=c;x.beginPath();x.moveTo(-26,top+4);x.quadraticCurveTo(-30,hy-30,0,hy-28);x.quadraticCurveTo(30,hy-30,26,top+4);x.quadraticCurveTo(0,top-4,-26,top+4);x.fill();x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.arc(0,hy+2,15,0,7);x.fill();}
 else if(h=='veil'){x.fillStyle=o.vc||'#3a5a8a';x.beginPath();x.moveTo(-30,top+16);x.quadraticCurveTo(-30,hy-32,0,hy-26);x.quadraticCurveTo(30,hy-32,30,top+16);x.quadraticCurveTo(0,top+4,-30,top+16);x.fill();x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=2;x.beginPath();x.moveTo(0,hy-24);x.lineTo(0,top+8);x.stroke();}
 else{x.fillStyle=sk;x.beginPath();x.arc(0,hy,19,0,7);x.fill();x.fillStyle=o.hair||'#3a2414';x.beginPath();x.arc(0,hy-2,20,PI*.85,PI*2.15);x.lineTo(16,hy+14);x.quadraticCurveTo(0,hy+20,-16,hy+14);x.fill();x.fillStyle=sk;x.beginPath();x.ellipse(-19,hy+2,3,6,0,0,7);x.ellipse(19,hy+2,3,6,0,0,7);x.fill();}
 x.restore();}
function friar(X,Y,s,o){o=o||{};o.c='#7a5030';o.c2='#4a2c14';o.head='hood';o.belt='#f0e6cc';o.rope=1;fig(X,Y,s,o);}
// pedras / parede rochosa
function rocks(x0,y0,x1,y1,c1,c2,seed,n){for(var i=0;i<(n||60);i++){var X=x0+hs(seed+i)*(x1-x0),Y=y0+hs(seed+i*3.1)*(y1-y0),r=10+hs(seed+i*7.3)*26;var g=x.createLinearGradient(X-r,Y-r,X+r,Y+r);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.beginPath();for(var k=0;k<7;k++){var an=k/7*PI*2,rr2=r*(.7+.3*hs(seed+i*11+k));x.lineTo(X+Math.cos(an)*rr2*1.3,Y+Math.sin(an)*rr2*.8);}x.closePath();x.fill();}}
function bricks(x0,y0,x1,y1,c,line,h,w){x.fillStyle=c;x.fillRect(x0,y0,x1-x0,y1-y0);x.strokeStyle=line;x.lineWidth=2;for(var r=0;y0+r*h<y1;r++){var yy=y0+r*h;x.beginPath();x.moveTo(x0,yy);x.lineTo(x1,yy);x.stroke();for(var xx=x0+(r%2)*w/2;xx<x1;xx+=w){x.beginPath();x.moveTo(xx,yy);x.lineTo(xx,Math.min(yy+h,y1));x.stroke();}}
 for(var i=0;i<40;i++){x.fillStyle='rgba(0,0,0,'+(.04+hs(i*5)*.06)+')';x.fillRect(x0+hs(i)*(x1-x0),y0+hs(i*2)*(y1-y0),w*.8,h*.7);}}
function straw(x0,x1,y,n,seed){for(var i=0;i<n;i++){var X=x0+hs(seed+i)*(x1-x0),Y=y+hs(seed+i*2)*50,an=(hs(seed+i*3)-.5)*1.2,l=10+hs(seed+i*4)*18;x.strokeStyle=hs(seed+i*5)>.5?'#f2c75a':'#c89a3a';x.lineWidth=2;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(an)*l,Y+Math.sin(an)*l*.4);x.stroke();}}
function torch(X,Y,h){x.fillStyle=lg(X-6,X+6,'#3a2010','#6a4420');x.fillRect(X-5,Y-h,10,h);x.fillStyle='#2a1608';x.fillRect(X-11,Y-h-8,22,12);glow(X,Y-h-18,150,'rgba(255,170,80,A)',.45);flame(X,Y-h-6,1.8,0,0,1);}
function lantern(X,Y){x.strokeStyle='#2a1a10';x.lineWidth=2;x.beginPath();x.moveTo(X,Y-60);x.lineTo(X,Y-26);x.stroke();glow(X,Y,90,'rgba(255,190,100,A)',.5);x.fillStyle='#3a2410';x.beginPath();x.moveTo(X-16,Y-26);x.lineTo(X+16,Y-26);x.lineTo(X+10,Y-34);x.lineTo(X-10,Y-34);x.fill();x.fillStyle='rgba(255,220,140,.85)';x.fillRect(X-12,Y-24,24,30);x.strokeStyle='#3a2410';x.lineWidth=3;x.strokeRect(X-12,Y-24,24,30);x.fillRect(X-14,Y+6,28,5);flame(X,Y+2,.7,0,0,1);}
function staticStars(n,y0,h,seed){for(var i=0;i<n;i++){var X=hs(seed+i)*W,Y=y0+hs(seed+i*1.7)*h,r=.8+hs(seed+i*2.3)*1.8;x.fillStyle='rgba(255,250,230,'+(.5+hs(seed+i*4)*.5)+')';x.beginPath();x.arc(X,Y,r,0,7);x.fill();}}
function fadeIn(lt,id,w,k){return ez(lin(lt,LW(id,w,k)-.35,LW(id,w,k)+.15));}
