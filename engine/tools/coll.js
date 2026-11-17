// confere colisões: node tools/coll.js pagina.html [dmin=0.7]  -> lista momentos em que dois personagens ficam perto demais
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:360,height:640}});await p.goto('file://'+process.cwd()+'/'+process.argv[2]);await p.waitForTimeout(1200);
const dmin=+(process.argv[3]||0.7);
const r=await p.evaluate(dmin=>{var out=[],N=['leo','bia','teo','duda','dog'];for(var t=0;t<window.TOTAL;t+=0.1){var P={};N.forEach(function(n){var s=n==='dog'?dogState(t):stateOf(n,t);P[n]=s.p;});
 for(var i=0;i<5;i++)for(var j=i+1;j<5;j++){var d=Math.hypot(P[N[i]][0]-P[N[j]][0],P[N[i]][1]-P[N[j]][1]);var lim=(N[j]==='dog')?dmin*0.75:dmin;if(d<lim)out.push(t.toFixed(1)+' '+N[i]+'-'+N[j]+' '+d.toFixed(2));}}return out;},dmin);
console.log(r.join('\n'));await b.close();})();
