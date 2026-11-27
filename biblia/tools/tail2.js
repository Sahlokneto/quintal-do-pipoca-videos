// ===== tail2: quadro estático; 1º quadro já com cena + título (capa) =====
(function(){var b=bg.getContext('2d');b.save();b.globalCompositeOperation='lighter';for(var k=0;k<6;k++){var a0=-.5+k*.2;b.fillStyle=RAYC;b.beginPath();b.moveTo(360,-80);b.lineTo(360+Math.tan(a0)*1500,1400);b.lineTo(360+Math.tan(a0+.07)*1500,1400);b.fill();}b.restore();})();
var OFF=document.createElement('canvas');OFF.width=W;OFF.height=H;var offx=OFF.getContext('2d');
function sceneA(i,t,L){var id='L'+(i+1);if(i==0)return clamp((L.L1e+.3-t)/.35,0,1);if(i==7)return clamp((t-(L.L8-.25))/.35,0,1);return fade(t,L[id]-.25,L[id+'e']+.3,.35);}
function setO(el,o){el.style.opacity=o;el.style.transform='none';}
function frame(t){var L=T;x=MAIN;x.drawImage(bg,0,0);
 for(var i=0;i<8;i++){var id='L'+(i+1),a=sceneA(i,t,L);if(a<=0)continue;
  offx.clearRect(0,0,W,H);x=offx;SC[i](t,t-L[id],L);x=MAIN;offx.save();offx.globalCompositeOperation='destination-in';var mg=offx.createLinearGradient(0,290,0,H);mg.addColorStop(0,'rgba(0,0,0,0)');mg.addColorStop(.08,'rgba(0,0,0,1)');mg.addColorStop(.74,'rgba(0,0,0,1)');mg.addColorStop(1,'rgba(0,0,0,0)');offx.fillStyle=mg;offx.fillRect(0,0,W,H);offx.restore();
  MAIN.save();MAIN.globalAlpha=a;MAIN.drawImage(OFF,0,0);MAIN.restore();}
 for(var i=1;i<=8;i++){var id='L'+i,s=i==1?-5:L[id]+.35,e=(i<8)?L[id+'e']+.2:WT('L8','voce')-.2;setO($('c'+i),fade(t,s,e,.3));}
 setO($('q'),fade(t,WT('L8','voce'),L.END+2,.3));
 var vgr=x.createRadialGradient(W/2,H/2,H*.34,W/2,H/2,H*.8);vgr.addColorStop(0,'rgba(0,0,0,0)');vgr.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=vgr;x.fillRect(0,0,W,H);
 var cur=null;for(var i=0;i<CHK.length;i++)if(t>=CHK[i].t0&&t<CHK[i].t1){cur=CHK[i];break;}
 if(cur){$('cap').innerHTML='<span class="box">'+cur.ws.map(function(w){return '<i class="'+(w.b?'b ':'')+(t<w.t-.05?'f':'')+'">'+w.w+'</i>';}).join(' ')+'</span>';$('cap').style.opacity=1;$('cap').style.transform='none';}
 else $('cap').innerHTML='';}
window.__seek=frame;window.frame=frame;
})();
</script></body></html>
