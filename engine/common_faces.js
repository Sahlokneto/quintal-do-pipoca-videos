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
