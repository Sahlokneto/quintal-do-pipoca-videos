var KS=0.6,PI=Math.PI,GROUND_Y=-0.55,BPM=112;
Object.keys(BUBS).forEach(function(k){scene.remove(BUBS[k]);});BUBS={};
[['Bolhas!',96],['Peguei!',84],['Atchim!',84],['Devagar!',76],['Uau!',100],['Hihihi!',90],['Mais bolhas!',62],['Até a próxima bolha!',44]].forEach(function(b){var m=new THREE.Mesh(new THREE.PlaneGeometry(1.8,0.9),new THREE.MeshBasicMaterial({map:bubTex(b[0],b[1]),transparent:true,depthTest:false}));m.renderOrder=10;m.visible=false;scene.add(m);BUBS[b[0]]=m;});
