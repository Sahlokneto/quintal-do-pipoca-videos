var CONF=[],CC=[0xff6b8a,0xffd166,0x5bd6a4,0x7aa7ff,0xc39bff];
for(var i=0;i<150;i++){var m=box(0.13,0.13,0.13,CC[i%5]);m.visible=false;m.castShadow=false;scene.add(m);CONF.push(m);}
var BURST=[[T.HIT1+0.3,[0,3.3]],[T.F3+0.4,[0,-3.3]],[T.F3+0.5,[0,3.3]],[T.KF+0.3,[0,-1.8]],[T.ROW1+0.5,[0,-1.5]]];
function particles(t){CONF.forEach(function(m,i){var b=i%5,ct=t-BURST[b][0];if(ct<0||ct>2.0){m.visible=false;return;}
 var bp=BURST[b][1],a=i*2.399,v=0.6+(i%5)*0.3,vy=4.2+(i%7)*0.4,s=clamp((2.0-ct)/0.4,0,1);
 m.visible=true;m.position.set(bp[0]+Math.cos(a)*v*ct,Math.max(0.1,1.8+vy*ct-4.9*ct*ct),bp[1]+Math.sin(a)*v*ct);m.rotation.set(ct*3+i,ct*4,ct*5);m.scale.setScalar(Math.max(s,0.001));});
 CLOTHES.forEach(function(c,i){c.rotation.z=Math.sin(t*1.6+i*0.9)*0.22;});}
var camPosV=new THREE.Vector3();
function kp(n,dy,dx){return function(){var p=KIDS[n].root.position;return [p.x+(dx||0),dy,p.z];};}
function dp(dy){return function(){var p=dog.root.position;return [p.x,p.y+dy,p.z];};}
var BW=[['Boliche!',3.0,4.4,kp('teo',2.5),1],['3!',T.HIT1+0.4,T.HIT1+1.6,kp('bia',2.5),1],['Au au!',T.DG1a+0.8,T.DG1a+1.8,dp(1.2),0.75],
 ['Ops!',T.REL2+0.7,T.REL2+2.0,kp('teo',2.5),1],['STRIKE!',T.F3+0.4,T.F3+2.0,function(){return [0,1.6,-3.3];},1.2],
 ['Pipoca!',T.SCAT+0.1,T.SCAT+1.5,kp('leo',2.5),1],['Au au!',T.STOP4,T.STOP4+1.0,dp(1.2),0.75],['Agora somos os pinos!',T.FORM1-0.2,T.FORM1+1.5,kp('bia',2.5),1],
 ['Au au!',T.DPU0+0.1,T.DPU0+1.0,dp(1.2),0.75],['STRIKE!',T.KF+0.3,T.KF+1.9,function(){return [0,2.4,-1.8];},1.1],['Até o próximo jogo!',T.ROW1+1.4,END+1,function(){return [0,2.6,-1.5];},1.0]];
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*w[4];
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));m.position.set(p[0],p[1]+0.45*k,p[2]);m.quaternion.copy(camera.quaternion);}});}
var ALL=['leo','bia','teo','duda','dog'],LANE=[[0,3.0],[0,-4.0]];
function pinPts(){var r=PINP.map(function(p){return [p[0],p[1]];});var b=ballXZ(window._t||0);if(b)r.push(b);return r;}
var SH=[[0,4.0,function(t){return frameOn(ALL,25,lerp(50,24,ez(lin(t,0,3.6))),50,0.1,LANE);}],
 [4.0,T.BSW,function(){return frameOn(ALL,15,20,50,0.1);}],
 [T.BSW,T.REL1+0.3,function(){return frameOn(['bia'],35,10,46,0.22);}],
 [T.REL1+0.3,T.DG1a+0.6,function(){return frameOn(ALL,0,30,50,0.12,LANE);}],
 [T.DG1a+0.6,T.TPK,function(){return frameOn(ALL,0,34,50,0.12,LANE);}],
 [T.TPK,T.REL2+0.3,function(){return frameOn(['teo'],-35,10,46,0.22);}],
 [T.REL2+0.3,T.DW0+0.3,function(){return frameOn(ALL,0,34,50,0.12,LANE.concat([[-3.0,-5.6]]));}],
 [T.DW0+0.3,T.REL3+0.3,function(){return frameOn(['duda'],30,10,46,0.22);}],
 [T.REL3+0.3,T.STOP3-0.6,function(){return frameOn(ALL,0,30,50,0.12,LANE);}],
 [T.STOP3-0.6,T.F3+0.45,function(){return frameOn([],0,28,46,0.2,pinPts());}],
 [T.F3+0.45,T.F3+2.0,function(){return frameOn(ALL,0,22,50,0.1);}],
 [T.F3+2.0,T.LPK,function(){return frameOn(ALL,0,34,50,0.12,LANE);}],
 [T.LPK,T.REL4+0.3,function(){return frameOn(['leo'],35,10,46,0.22);}],
 [T.REL4+0.3,T.DIVE0-0.3,function(){return frameOn(ALL,0,30,50,0.12,LANE);}],
 [T.DIVE0-0.3,T.SCAT+0.9,function(){return frameOn(['dog'],55,12,46,0.2,PINP.map(function(p){return p;}));}],
 [T.SCAT+0.9,T.FP0,function(){return frameOn(ALL,0,24,50,0.1);}],
 [T.FP0,T.KF+0.1,function(){return frameOn(ALL,0,22,50,0.1);}],
 [T.KF+0.1,T.ROW0,function(){return frameOn(ALL,20,30,50,0.12);}],
 [T.ROW0,END+2,function(t){var u=lin(t,T.ROW0,END);return frameOn(ALL,0,lerp(14,20,u),50,0.14);}]];
function cam(t){for(var i=0;i<SH.length;i++)if(t>=SH[i][0]&&t<SH[i][1])return SH[i][2](t);return SH[SH.length-1][2](t);}
function frame(t){window._t=t;var ST={};
 for(var pass=0;pass<2;pass++){Object.keys(KIDS).forEach(function(n){ST[n]=stateOf(n,t);applyKid(KIDS[n],ST[n],t);});applyDog(t);scene.updateMatrixWorld(true);applyBall(t);}
 applyPins(t);
 var c=window.CO||cam(t);camera.fov=c.fov;camera.updateProjectionMatrix();camera.position.set(c.pos[0],c.pos[1],c.pos[2]);camera.lookAt(c.look[0],c.look[1],c.look[2]);camera.updateMatrixWorld();camPosV.copy(camera.position);
 particles(t);bubbles(t);renderer.render(scene,camera);}
window.frame=frame;window.DBG=function(t){frame(t);var o={cam:camera.position.toArray().map(x=>+x.toFixed(2)),fov:camera.fov};var d=dog.root.position.clone();var q=d.clone().project(camera);o.dog=[+d.x.toFixed(2),+d.z.toFixed(2),+q.x.toFixed(2),+q.y.toFixed(2)];['leo','bia','teo','duda'].forEach(function(n){var v=KIDS[n].root.position.clone(),w=v.clone().project(camera);o[n]=[+v.x.toFixed(2),+v.z.toFixed(2),+w.x.toFixed(2),+w.y.toFixed(2)];});return o;};window.TOTAL=END;window.TL=T;
frame(0);
})();
</script></body></html>
