// Uso (dentro de ranaitech/): node tools/timeline.js aulas/aula-N
// Aplica durs.json na página render.html e grava timeline.json (falas com t0/dur, eventos, fim).
const {chromium}=require('playwright');const fs=require('fs');
const D=process.argv[2];
(async()=>{
const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:780,height:1400}});
const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.requestAnimationFrame=function(){return 0;};});
await p.goto('file://'+process.cwd()+'/'+D+'/render.html');await p.waitForTimeout(1200);
await p.evaluate(d=>window.__retime(d),JSON.parse(fs.readFileSync(D+'/durs.json')));
const tl=await p.evaluate(()=>window.__timeline());
fs.writeFileSync(D+'/timeline.json',JSON.stringify(tl));
console.log('fim',tl.end.toFixed(2),'s',errs.join('\n')||'sem erros');await b.close();})();
