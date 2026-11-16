// re-renderiza só trechos: node tools/part.js pagina.html pastaSaida "[[t0,t1],[t2,t3]]"
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
const page=process.argv[2],out=process.argv[3],R=JSON.parse(process.argv[4]),FPS=24;
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:720,height:1280}});await p.goto('file://'+process.cwd()+'/'+page);await p.waitForTimeout(1200);
for(const [a,z] of R){for(let i=Math.floor(a*FPS);i<=Math.ceil(z*FPS);i++){const u=await p.evaluate(t=>{window.frame(t);return document.getElementById('c').toDataURL('image/jpeg',0.92);},i/FPS);fs.writeFileSync(out+'/f'+String(i).padStart(5,'0')+'.jpg',Buffer.from(u.split(',')[1],'base64'));}}
console.log('done');await b.close();})();
