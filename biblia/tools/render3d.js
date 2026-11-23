// node render3d.js <pasta> <pagina.html> <worker> <N>  -> <pasta>/frames/fNNNNN.jpg (24 fps; pula quadros já feitos)
const {chromium}=require('playwright');const srv=require('./srv3d.js');const fs=require('fs'),path=require('path');
const dir=path.resolve(process.argv[2]),page=process.argv[3],Wk=+process.argv[4],N=+process.argv[5],FPS=24;
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:720,height:1280}});
const ROOT=path.resolve(__dirname,'..','..');const sv=await srv(ROOT);await p.goto('http://127.0.0.1:'+sv.address().port+'/'+path.relative(ROOT,dir)+'/'+page);await p.waitForFunction(()=>window.READY===true,null,{timeout:180000});
await p.evaluate(d=>window.__retime(d),JSON.parse(fs.readFileSync(dir+'/durs.json')));
const tot=await p.evaluate(()=>window.TOTAL);const n=Math.ceil(tot*FPS);fs.mkdirSync(dir+'/frames',{recursive:true});const st=await p.$('#stage');
for(let i=Wk;i<n;i+=N){const f=`${dir}/frames/f${String(i).padStart(5,'0')}.jpg`;if(fs.existsSync(f))continue;
 await p.evaluate(t=>window.__seek(t),i/FPS);await st.screenshot({path:f,type:'jpeg',quality:92});}
await b.close();sv.close();})();
