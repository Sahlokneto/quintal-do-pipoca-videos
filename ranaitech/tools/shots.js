// Uso: node tools/shots.js aulas/aula-N t1,t2,t3,...   -> aulas/aula-N/shots/sNN.png (para conferir)
const {chromium}=require('playwright');const fs=require('fs');
const D=process.argv[2],TS=process.argv[3].split(',').map(Number);
(async()=>{
const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:780,height:1400}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.requestAnimationFrame=function(){return 0;};});
await p.goto('file://'+process.cwd()+'/'+D+'/render.html');
await p.addStyleTag({content:'main{max-width:720px!important} body{padding:0!important} .stage{aspect-ratio:9/16!important}'});
await p.waitForTimeout(1200);
await p.evaluate(d=>window.__retime(d),JSON.parse(fs.readFileSync(D+'/durs.json')));
fs.mkdirSync(D+'/shots',{recursive:true});const st=await p.$('#stage');
for(let i=0;i<TS.length;i++){await p.evaluate(t=>window.__seek(t),TS[i]);await p.waitForTimeout(200);await st.screenshot({path:`${D}/shots/s${String(i).padStart(2,'0')}.png`});}
console.log(errs.join('\n')||'sem erros');await b.close();})();
