FT.blow=(function(){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d');x.lineCap='round';x.strokeStyle='#222';x.fillStyle='#222';x.lineWidth=10;
 x.beginPath();x.arc(88,104,15,Math.PI*1.1,Math.PI*1.9);x.stroke();x.beginPath();x.arc(168,104,15,Math.PI*1.1,Math.PI*1.9);x.stroke();
 x.fillStyle='rgba(255,110,110,0.75)';x.beginPath();x.ellipse(60,150,22,16,0,0,6.3);x.fill();x.beginPath();x.ellipse(196,150,22,16,0,0,6.3);x.fill();
 x.fillStyle='#222';x.beginPath();x.ellipse(128,162,13,15,0,0,6.3);x.fill();x.fillStyle='#ff6f91';x.beginPath();x.ellipse(128,165,6,7,0,0,6.3);x.fill();
 var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;})();
