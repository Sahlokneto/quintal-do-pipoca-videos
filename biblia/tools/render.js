const {chromium}=require('playwright');const fs=require('fs');
const Wk=+process.argv[2],N=+process.argv[3],FPS=24,dir=__dirname;
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:720,height:1280}});
await p.goto('file://'+dir+'/bib.html');await p.waitForTimeout(800);
await p.evaluate(d=>window.__retime(d),JSON.parse(fs.readFileSync(dir+'/durs.json')));
const tot=await p.evaluate(()=>window.TOTAL);const n=Math.ceil(tot*FPS);fs.mkdirSync(dir+'/frames',{recursive:true});
const st=await p.$('#stage');
for(let i=Wk;i<n;i+=N){const f=`${dir}/frames/f${String(i).padStart(5,'0')}.jpg`;if(fs.existsSync(f))continue;
 await p.evaluate(t=>window.__seek(t),i/FPS);await st.screenshot({path:f,type:'jpeg',quality:92});}
await b.close();})();
