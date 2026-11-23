// servidor estático mínimo (os modelos glTF precisam de http://, não file://)
const http=require('http'),fs=require('fs'),path=require('path');
const T={'.html':'text/html','.js':'application/javascript','.json':'application/json','.gltf':'model/gltf+json','.bin':'application/octet-stream','.jpg':'image/jpeg','.png':'image/png','.ttf':'font/ttf'};
module.exports=function(root){return new Promise(ok=>{const s=http.createServer((q,r)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);}).listen(0,'127.0.0.1',()=>ok(s));});};
