var _cam=new THREE.PerspectiveCamera(50,W/H,0.1,300);
function pos2(n){return n==='dog'?dog.root.position:KIDS[n].root.position;}
function frameOn(names,aDeg,eDeg,fov,m,extra){var pts=[],mn=[1e9,1e9],mx=[-1e9,-1e9];
 function addP(x,z,top){pts.push(V(x,0,z),V(x,top,z));mn[0]=Math.min(mn[0],x);mn[1]=Math.min(mn[1],z);mx[0]=Math.max(mx[0],x);mx[1]=Math.max(mx[1],z);}
 names.forEach(function(n){var p=pos2(n);addP(p.x,p.z,n==='dog'?1.15:2.9);});(extra||[]).forEach(function(e){addP(e[0],e[1],0.3);});
 var hasKid=names.some(function(n){return n!=='dog';});var c=V((mn[0]+mx[0])/2,hasKid?1.3:0.55,(mn[1]+mx[1])/2);
 var a=aDeg*PI/180,e=eDeg*PI/180,dir=V(Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e));
 _cam.fov=fov;_cam.aspect=W/H;_cam.updateProjectionMatrix();_cam.position.copy(c).add(dir);_cam.lookAt(c);_cam.updateMatrixWorld();
 var r=V(1,0,0).applyQuaternion(_cam.quaternion),u=V(0,1,0).applyQuaternion(_cam.quaternion),f=dir.clone().negate();
 var tv=Math.tan(fov*PI/360),th=tv*W/H,D=2;
 pts.forEach(function(p){var v=p.clone().sub(c),x=Math.abs(v.dot(r))+0.6,y=Math.abs(v.dot(u))+0.35,z=v.dot(f);D=Math.max(D,x/(th*(1-m))-z,y/(tv*(1-m))-z);});
 var pos=c.clone().addScaledVector(dir,D);return {pos:[pos.x,pos.y,pos.z],look:[c.x,c.y,c.z],fov:fov};}
