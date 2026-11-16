// uso: node tools/render.js pagina.html pastaSaida worker nWorkers   (gera f00000.jpg ... a 24 fps)
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
const [page,out,W,N]=[process.argv[2],process.argv[3],+process.argv[4],+process.argv[5]],FPS=24;
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:720,height:1280}});await p.goto('file://'+process.cwd()+'/'+page);await p.waitForTimeout(1500);
const total=await p.evaluate(()=>window.TOTAL);const n=Math.ceil(total*FPS);
for(let i=W;i<n;i+=N){const u=await p.evaluate(t=>{window.frame(t);return document.getElementById('c').toDataURL('image/jpeg',0.92);},i/FPS);fs.writeFileSync(out+'/f'+String(i).padStart(5,'0')+'.jpg',Buffer.from(u.split(',')[1],'base64'));}
console.log('done',W);await b.close();})();
