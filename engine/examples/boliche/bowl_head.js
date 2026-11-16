var KS=0.6,PI=Math.PI,GROUND_Y=-0.55,BPM=120;
Object.keys(BUBS).forEach(function(k){scene.remove(BUBS[k]);});BUBS={};
[['Boliche!',90],['3!',120],['Au au!',84],['Ops!',96],['STRIKE!',84],['Pipoca!',84],['Agora somos os pinos!',40],['Até o próximo jogo!',46]].forEach(function(b){var m=new THREE.Mesh(new THREE.PlaneGeometry(1.8,0.9),new THREE.MeshBasicMaterial({map:bubTex(b[0],b[1]),transparent:true,depthTest:false}));m.renderOrder=10;m.visible=false;scene.add(m);BUBS[b[0]]=m;});
