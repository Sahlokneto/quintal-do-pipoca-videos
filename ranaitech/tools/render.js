// Uso: node tools/render.js aulas/aula-N <worker> <total_workers>   (rode 3 em paralelo: 0 3, 1 3, 2 3)
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const D=process.argv[2],W=+process.argv[3],N=+process.argv[4],FPS=24;
const SCRIPT=JSON.parse(fs.readFileSync(D+'/script.json'));
(async()=>{
const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:780,height:1400}});
await p.addInitScript(()=>{window.requestAnimationFrame=function(){return 0;};});
await p.goto('file://'+process.cwd()+'/'+D+'/render.html');
await p.addStyleTag({content:'main{max-width:720px!important} body{padding:0!important} .stage{aspect-ratio:9/16!important}'});
await p.waitForTimeout(1500);
const durs=JSON.parse(fs.readFileSync(D+'/durs.json'));
await p.evaluate(d=>window.__retime(d),durs);
const tl=await p.evaluate(()=>window.__timeline());
const total=Math.ceil(tl.end*FPS);
const NAMES={P:'PROFESSOR',C:'CUBINHO'};
fs.mkdirSync(D+'/frames',{recursive:true});
const t00=Date.now();let n=0;
for(let f=W;f<total;f+=N){
  const t=f/FPS;
  let cur=null;for(const l of tl.lines){if(t>=l.t0-0.05&&t<=l.t0+l.dur+0.35)cur=l;}
  const sub=cur?{tag:NAMES[cur.id[0]],text:SCRIPT[cur.id]}:null;
  const url=await p.evaluate(([t,sub])=>{
    window.__seek(t);
    const c=document.getElementById('c');
    const o=document.createElement('canvas');o.width=c.width;o.height=c.height;const x=o.getContext('2d');
    x.drawImage(c,0,0);
    if(sub){
      const w=o.width,h=o.height;x.font='700 '+Math.round(w*0.047)+'px system-ui, sans-serif';
      const maxW=w*0.88,words=sub.text.split(' '),lines=[];let cur='';
      for(const wd of words){const tt=cur?cur+' '+wd:wd;if(x.measureText(tt).width>maxW&&cur){lines.push(cur);cur=wd;}else cur=tt;}
      lines.push(cur);
      const fs=Math.round(w*0.047),lh=fs*1.3,tagH=fs*0.7,pad=fs*0.6;
      const bw=Math.max(...lines.map(l=>x.measureText(l).width))+pad*2,bh=lines.length*lh+tagH+pad*1.6;
      const bx=(w-bw)/2,by=h*0.715;
      x.fillStyle='rgba(10,16,20,0.8)';x.beginPath();x.roundRect(bx,by,bw,bh,fs*0.5);x.fill();
      x.fillStyle='rgba(255,255,255,0.75)';x.font='600 '+Math.round(fs*0.55)+'px system-ui, sans-serif';x.textAlign='center';x.textBaseline='top';
      x.fillText(sub.tag.split('').join(String.fromCharCode(8202)),w/2,by+pad*0.7);
      x.fillStyle='#fff';x.font='700 '+fs+'px system-ui, sans-serif';
      lines.forEach((l,i)=>x.fillText(l,w/2,by+pad*0.7+tagH+i*lh));
    }
    return o.toDataURL('image/jpeg',0.92);
  },[t,sub]);
  fs.writeFileSync(`${D}/frames/f${String(f).padStart(5,'0')}.jpg`,Buffer.from(url.split(',')[1],'base64'));
  n++;if(n%100===0)console.log('worker',W,D+'/frames',n,'sec',((Date.now()-t00)/1000).toFixed(0));
}
console.log('worker',W,'DONE',n);
await b.close();})();
