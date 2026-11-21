const {chromium}=require('playwright');const fs=require('fs');
const TS=process.argv[2].split(',').map(Number);const dir=__dirname;
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:720,height:1280}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+dir+'/news.html');await p.waitForTimeout(800);
await p.evaluate(d=>window.__retime(d),JSON.parse(fs.readFileSync(dir+'/durs.json')));
fs.writeFileSync(dir+'/timeline.json',JSON.stringify(await p.evaluate(()=>window.__timeline())));
const st=await p.$('#stage');fs.mkdirSync(dir+'/shots',{recursive:true});
for(let i=0;i<TS.length;i++){await p.evaluate(t=>window.__seek(t),TS[i]);await st.screenshot({path:`${dir}/shots/s${String(i).padStart(2,'0')}.jpg`,type:'jpeg',quality:80});}
console.log(errs.join('\n')||'sem erros');await b.close();})();
