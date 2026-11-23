// node shots3d.js <pasta-do-video> <pagina.html> t1,t2,...  -> <pasta>/shots/sNN.jpg  (espera window.READY)
const {chromium}=require('playwright');const srv=require('./srv3d.js');const fs=require('fs'),path=require('path');
const dir=path.resolve(process.argv[2]),page=process.argv[3],TS=process.argv[4].split(',').map(Number);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:720,height:1280}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
const ROOT=path.resolve(__dirname,'..','..');const sv=await srv(ROOT);await p.goto('http://127.0.0.1:'+sv.address().port+'/'+path.relative(ROOT,dir)+'/'+page);await p.waitForFunction(()=>window.READY===true,null,{timeout:180000});
await p.evaluate(d=>window.__retime(d),JSON.parse(fs.readFileSync(dir+'/durs.json')));
fs.writeFileSync(dir+'/timeline.json',JSON.stringify(await p.evaluate(()=>window.__timeline())));
const st=await p.$('#stage');fs.mkdirSync(dir+'/shots',{recursive:true});
for(let i=0;i<TS.length;i++){const t0=Date.now();await p.evaluate(t=>window.__seek(t),TS[i]);await st.screenshot({path:`${dir}/shots/s${String(i).padStart(2,'0')}.jpg`,type:'jpeg',quality:82});console.log('ms',TS[i],Date.now()-t0);}
console.log(errs.slice(0,8).join('\n')||'sem erros');await b.close();sv.close();})();
