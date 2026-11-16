<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#000}canvas{display:block}</style></head><body>
<canvas id="c" width="720" height="1280"></canvas>
<script src="h/node_modules/three/build/three.min.js"></script>
<script>
(function(){
var W=720,H=1280;
var renderer=new THREE.WebGLRenderer({canvas:document.getElementById('c'),antialias:true,preserveDrawingBuffer:true});
renderer.setSize(W,H,false);renderer.outputEncoding=THREE.sRGBEncoding;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
var scene=new THREE.Scene();scene.background=new THREE.Color(0xbfe6ff).convertSRGBToLinear();
scene.fog=new THREE.Fog(col2(0xbfe6ff),90,170);
function col2(h){return new THREE.Color(h).convertSRGBToLinear();}
var camera=new THREE.PerspectiveCamera(36,W/H,0.1,300);
function col(h){return new THREE.Color(h).convertSRGBToLinear();}
function clamp(x,a,b){return Math.min(b,Math.max(a,x));}
function lin(x,a,b){return clamp((x-a)/(b-a),0,1);}
function S(x,a,b){var u=lin(x,a,b);return u*u*(3-2*u);}
function lerp(a,b,u){return a+(b-a)*u;}
function back(u){var c1=1.70158,c3=c1+1;u=clamp(u,0,1);return 1+c3*Math.pow(u-1,3)+c1*Math.pow(u-1,2);}
function mat(c,o){return new THREE.MeshStandardMaterial(Object.assign({color:col(c),roughness:0.4,metalness:0},o||{}));}
function box(w,h,d,c,o){var m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c,o));m.castShadow=true;m.receiveShadow=true;return m;}
var studG=new THREE.CylinderGeometry(0.14,0.14,0.1,14);
function studs(parent,nx,nz,y,c,ox,oz,sp){var m=mat(c);sp=sp||0.5;for(var i=0;i<nx;i++)for(var j=0;j<nz;j++){var s=new THREE.Mesh(studG,m);s.castShadow=true;s.position.set((i-(nx-1)/2)*sp+(ox||0),y+0.05,(j-(nz-1)/2)*sp+(oz||0));parent.add(s);}}
scene.add(new THREE.HemisphereLight(0xffffff,0x9ab0c8,0.95));
var sun=new THREE.DirectionalLight(0xffffff,1.0);sun.position.set(9,22,14);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
sun.shadow.camera.left=-17;sun.shadow.camera.right=17;sun.shadow.camera.top=17;sun.shadow.camera.bottom=-17;sun.shadow.camera.near=1;sun.shadow.camera.far=100;sun.shadow.bias=-0.0005;scene.add(sun);
function rnd(s){var x=Math.sin(s*127.1)*43758.5453;return x-Math.floor(x);}
