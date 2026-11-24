// frameC: igual ao frameOn, mas centraliza verticalmente os personagens na tela (evita chão vazio embaixo) e aproxima um pouco
function frameC(names,a,e,fov,m,extra,zoom){var c=frameOn(names,a,e,fov,m,extra);var pts=[];
 names.forEach(function(n){var p=pos2(n);pts.push(V(p.x,0,p.z),V(p.x,n==='dog'?1.15:2.9,p.z));});
 var P=V(c.pos[0],c.pos[1],c.pos[2]),Lk=V(c.look[0],c.look[1],c.look[2]);
 for(var it=0;it<4;it++){_cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(P);_cam.lookAt(Lk);_cam.updateMatrixWorld();
  var lo=1e9,hi=-1e9,lx=1e9,hx=-1e9;pts.forEach(function(q){var v=q.clone().project(_cam);lo=Math.min(lo,v.y);hi=Math.max(hi,v.y);lx=Math.min(lx,v.x);hx=Math.max(hx,v.x);});
  var D=P.distanceTo(Lk),tv=Math.tan(fov*PI/360),up=V(0,1,0).applyQuaternion(_cam.quaternion);var sh=(lo+hi)/2*D*tv;P.addScaledVector(up,sh);Lk.addScaledVector(up,sh);
  var span=Math.max(hi-lo,(hx-lx)),k=clamp(span/(zoom||1.7),0.85,1.0);if(zoom&&it<3){var d=P.clone().sub(Lk);P.copy(Lk).add(d.multiplyScalar(k));}}
 return {pos:[P.x,P.y,P.z],look:[Lk.x,Lk.y,Lk.z],fov:fov};}
window.ALL=ALL;window.frameC=frameC;window.frameOn=frameOn;window._dbg=function(c){_cam.fov=c.fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.set(c.pos[0],c.pos[1],c.pos[2]);_cam.lookAt(c.look[0],c.look[1],c.look[2]);_cam.updateMatrixWorld();return ALL.map(function(n){var p=pos2(n);return [V(p.x,0,p.z).project(_cam).y.toFixed(2),V(p.x,n==="dog"?1.15:2.9,p.z).project(_cam).y.toFixed(2)];});};
