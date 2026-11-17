// ===== qp_tail.js: câmera e frame(t) =====
function cam(t){for(var i=0;i<SH.length;i++)if(t>=SH[i][0]&&t<SH[i][1])return SH[i][2](t);return SH[SH.length-1][2](t);}
function frame(t){window._t=t;
 for(var pass=0;pass<2;pass++){Object.keys(KIDS).forEach(function(n){applyKid(KIDS[n],stateOf(n,t),t);});applyDog(t);scene.updateMatrixWorld(true);}
 var c=window.CO||cam(t);camera.fov=c.fov;camera.updateProjectionMatrix();camera.position.set(c.pos[0],c.pos[1],c.pos[2]);camera.lookAt(c.look[0],c.look[1],c.look[2]);camera.updateMatrixWorld();camPosV.copy(camera.position);
 EXTRA(t);scene.updateMatrixWorld(true);particles(t);bubbles(t);renderer.render(scene,camera);}
window.frame=frame;window.stateOf=stateOf;window.dogState=dogState;window.TOTAL=END;window.TL={T:T,EV:EV};
frame(0);
})();
</script></body></html>
