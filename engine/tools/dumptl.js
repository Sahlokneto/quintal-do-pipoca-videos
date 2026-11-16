// salva window.TL da página em JSON (tempos para a música): node tools/dumptl.js pagina.html saida.json
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:720,height:1280}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto('file://'+process.cwd()+'/'+process.argv[2]);await p.waitForTimeout(1500);console.log('ERR',JSON.stringify(errs));
const r=await p.evaluate(()=>({TL:window.TL}));require('fs').writeFileSync(process.argv[3],JSON.stringify(r));await b.close();})();
