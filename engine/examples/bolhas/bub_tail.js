var CONF=[],CC=[0xff6b8a,0xffd166,0x5bd6a4,0x7aa7ff,0xc39bff];
for(var i=0;i<100;i++){var m=box(0.12,0.12,0.12,CC[i%5]);m.visible=false;m.castShadow=false;scene.add(m);CONF.push(m);}
var BURST=[[9.6,[-1.7,-0.2]],[T.FB2+0.1,[0,1.5]],[T.FB2+2.6,[0,0.8]],[T.GPOP+0.1,[0,-1.8]]];
function particles(t){CONF.forEach(function(m,i){var b=i%4,ct=t-BURST[b][0];if(ct<0||ct>2.0){m.visible=false;return;}
 var bp=BURST[b][1],a=i*2.399,v=0.6+(i%5)*0.3,vy=4.2+(i%7)*0.4,s=clamp((2.0-ct)/0.4,0,1);
 m.visible=true;m.position.set(bp[0]+Math.cos(a)*v*ct,Math.max(0.1,1.8+vy*ct-4.9*ct*ct),bp[1]+Math.sin(a)*v*ct);m.rotation.set(ct*3+i,ct*4,ct*5);m.scale.setScalar(Math.max(s,0.001));});
 CLOTHES.forEach(function(c,i){c.rotation.z=Math.sin(t*1.6+i*0.9)*0.22;});}
var camPosV=new THREE.Vector3();
function kp(n,dy,dx){return function(){var p=KIDS[n].root.position;return [p.x+(dx||0),p.y+dy,p.z];};}
function dp(dy){return function(){var p=dog.root.position;return [p.x,p.y+dy,p.z];};}
var BW=[['Bolhas!',3.0,4.5,kp('bia',2.5),1],['Peguei!',9.6,10.8,kp('leo',2.6,0.7),1],['Atchim!',T.SNEEZE-0.05,T.SNEEZE+1.2,dp(1.3),0.8],['Devagar!',23.8,25.0,kp('bia',2.5),1],
 ['Uau!',30.4,31.8,kp('duda',2.7),1],['Hihihi!',T.GPOP+0.5,T.GPOP+1.8,kp('duda',1.4),1],['Mais bolhas!',36.0,37.3,kp('leo',2.6,0.7),1],['Até a próxima bolha!',T.FB2+0.9,END+1,function(){return [0,2.7,0.8];},1.0]];
function bubbles(t){Object.keys(BUBS).forEach(function(k){BUBS[k].visible=false;});if(window.NOBUB)return;
 BW.forEach(function(w){if(t>=w[1]&&t<w[2]){var m=BUBS[w[0]],p=w[3]();var dist=camPosV.distanceTo(V(p[0],p[1],p[2])),k=clamp(dist/7,0.6,2.2)*w[4];
  var s=back((t-w[1])/0.25)*(1-S(t,w[2]-0.15,w[2]))*k;m.visible=true;m.scale.setScalar(Math.max(s,0.001));m.position.set(p[0],p[1]+0.45*k,p[2]);m.quaternion.copy(camera.quaternion);}});}
var ALL=['leo','bia','teo','duda','dog'];
function bpts(){var c=giantState(window._t||0).c;return [[c.x,c.z]];}
var SH=[[0,4.6,function(t){return frameOn(ALL,25,lerp(45,22,ez(lin(t,0,4.2))),50,0.1);}],
 [4.6,7.0,function(){return frameOn(ALL,0,16,48,0.1);}],
 [7.0,10.0,function(){return frameOn(ALL,0,22,50,0.1);}],
 [10.0,11.4,function(){return frameOn(ALL,-20,18,48,0.1);}],
 [11.4,14.0,function(){return frameOn(ALL,30,22,50,0.1);}],
 [14.0,T.NOSE-0.2,function(){return frameOn(ALL,-35,18,48,0.1,[[NP[0]-0.6,NP[1]+0.4]]);}],
 [T.NOSE-0.2,T.SNEEZE+0.8,function(){return frameOn(['dog'],-90,14,44,0.3);}],
 [T.SNEEZE+0.8,21.4,function(){return frameOn(ALL,15,20,50,0.1);}],
 [21.4,T.SLOW,function(){return frameOn(ALL,40,18,48,0.1);}],
 [T.SLOW,T.ARRIVE,function(){return frameOn(ALL,30,30,48,0.1);}],
 [T.ARRIVE,T.GPOP+0.6,function(){return frameOn(ALL,-25,30,48,0.1,[[DP[0]-1.1,DP[1]],[DP[0]+1.1,DP[1]]]);}],
 [T.GPOP+0.6,35.5,function(){return frameOn(ALL,20,20,50,0.1);}],
 [35.5,T.ROW0,function(t){return frameOn(ALL,lerp(-30,30,lin(t,35.5,T.ROW0)),22,50,0.1);}],
 [T.ROW0,END+2,function(){return frameOn(ALL,0,14,50,0.14);}]];
function cam(t){for(var i=0;i<SH.length;i++)if(t>=SH[i][0]&&t<SH[i][1])return SH[i][2](t);return SH[SH.length-1][2](t);}
function frame(t){window._t=t;var ST={};
 for(var pass=0;pass<2;pass++){Object.keys(KIDS).forEach(function(n){ST[n]=stateOf(n,t);applyKid(KIDS[n],ST[n],t);});applyDog(t);scene.updateMatrixWorld(true);applyWand(t);}
 var c=window.CO||cam(t);camera.fov=c.fov;camera.updateProjectionMatrix();camera.position.set(c.pos[0],c.pos[1],c.pos[2]);camera.lookAt(c.look[0],c.look[1],c.look[2]);camera.updateMatrixWorld();camPosV.copy(camera.position);
 if(t>=T.ROW0){var fw=V(0,0,-1).applyQuaternion(camera.quaternion);CAMC=camera.position.clone().addScaledVector(fw,0.9);}
 applyBubbles(t);particles(t);bubbles(t);renderer.render(scene,camera);}
window.frame=frame;window.TOTAL=END;window.TL={T:T,POPS:POPS,BP:BUBS2.map(function(b){return [b.tp,b.type];})};
frame(0);
})();
</script></body></html>
