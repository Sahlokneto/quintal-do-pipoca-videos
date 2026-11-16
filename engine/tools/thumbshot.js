// thumbnail 1080x1920: node tools/thumbshot.js pagina_thumb.html '[{"t":12.3,"c":{"pos":[x,y,z],"look":[x,y,z],"fov":48}}]'  -> th0.png...
// pagina_thumb.html = cópia da página com width/height 1080x1920 e W,H=1080,1920 e balões desligados.
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
const page=process.argv[2],cams=JSON.parse(process.argv[3]);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+process.cwd()+'/'+page);await p.waitForTimeout(2500);
for(let i=0;i<cams.length;i++){const u=await p.evaluate(c=>{window.CO=c.c||null;window.frame(c.t);return document.getElementById('c').toDataURL('image/png');},cams[i]);fs.writeFileSync('th'+i+'.png',Buffer.from(u.split(',')[1],'base64'));}
await b.close();})();
