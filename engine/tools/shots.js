// uso: node tools/shots.js pagina.html t1,t2,...   -> cz00.jpg... e imprime erros da página. Depois: python3 tools/sheet.py folha.png t1,t2,...
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
const page=process.argv[2],ts=process.argv[3].split(',').map(Number);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:720,height:1280}});const errs=[];p.on('pageerror',e=>errs.push(String(e.stack||e)));
await p.goto('file://'+process.cwd()+'/'+page);await p.waitForTimeout(1500);console.log('ERR',JSON.stringify(errs));
for(let i=0;i<ts.length;i++){const u=await p.evaluate(t=>{window.frame(t);return document.getElementById('c').toDataURL('image/jpeg',0.85);},ts[i]);fs.writeFileSync('cz'+String(i).padStart(2,'0')+'.jpg',Buffer.from(u.split(',')[1],'base64'));}
await b.close();})();
