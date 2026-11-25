var KS=0.6,PI=Math.PI,GROUND_Y=-0.55,BPM=120;
// ===== Barquinho de Papel na Poça =====
makeBubs([['Choveu! Corrida de barquinho!',34],['1, 2, 3... já!',66],['Tá rodando!',70],['Virou!',96],['Pipoca!',90],['Capitão Pipoca!',58],
 ['Ele puxa os barquinhos!',44],['Vai, capitão!',70],['Banho de cachorro!',50],['Tomara que chova amanhã!',40]]);
radio.visible=false;
FT.blow=(function(){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d');x.lineCap='round';x.strokeStyle='#222';x.fillStyle='#222';x.lineWidth=10;
 x.beginPath();x.arc(88,104,15,Math.PI*1.1,Math.PI*1.9);x.stroke();x.beginPath();x.arc(168,104,15,Math.PI*1.1,Math.PI*1.9);x.stroke();
 x.fillStyle='rgba(255,110,110,0.75)';x.beginPath();x.ellipse(60,150,22,16,0,0,6.3);x.fill();x.beginPath();x.ellipse(196,150,22,16,0,0,6.3);x.fill();
 x.fillStyle='#222';x.beginPath();x.ellipse(128,162,13,15,0,0,6.3);x.fill();x.fillStyle='#ff6f91';x.beginPath();x.ellipse(128,165,6,7,0,0,6.3);x.fill();
 var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t;})();
