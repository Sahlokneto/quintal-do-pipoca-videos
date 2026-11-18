// node tools/ev.js pagina.html "expr"
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:360,height:640}});await p.goto('file://'+process.cwd()+'/'+process.argv[2]);await p.waitForTimeout(1000);
console.log(JSON.stringify(await p.evaluate(process.argv[3])));await b.close();})();
