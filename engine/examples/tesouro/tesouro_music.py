import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def sniffs(t0,n=8,g=0.12):
  for k in range(n):
    m=int(0.07*SR);r=np.random.RandomState(40+k).randn(m);tt=np.arange(m)/SR;add(t0+k*0.32,np.diff(np.concatenate([[0],r]))*np.sin(np.pi*tt/0.07),g)
def dirt(t0,dur,g=0.12):
  n=int(dur*SR);r=np.random.RandomState(4).randn(n);tt=np.arange(n)/SR;lp=np.convolve(r,np.ones(30)/30,'same')
  add(t0,lp*(0.5+0.5*np.sign(np.sin(2*np.pi*9*tt)))*4,g)
segs=[(0,T['SN0'],1.0,-2),(T['SIT']+0.8,T['DIG2'],0.6,-2),(T['UPC']+1.0,T['OPEN'],0.45,-2),(T['BONES']+1.8,T['MOVE'],0.6,-2)]
for a,b,g,sm in segs:jingle(a,b,bpm=116,semi=sm,g=g*0.8,full=g>0.5)
pad(T['OPEN'],T['BONES']+1.8,0.1)
for t,ty in EV:
  if ty=='map':slide(t,400,900,0.4,0.1)
  if ty=='sniff':sniffs(t,12,0.12)
  if ty=='sit':plop(t,72,0.3)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='shovel':
    for k in range(6):add(t+k/1.6,bell(91,0.12),0.12);thud(t+k/1.6+0.05,0.2)
  if ty=='dig':dirt(t,3.6,0.12);bark(t-0.4,0.3)
  if ty=='tchan':add(t,bell(67,0.6),0.3);add(t+0.18,bell(72,0.8),0.35);add(t+0.18,clap(),0.8)
  if ty=='shine':trill(t,1.4,0.15);arp(t,84,0.25)
  if ty=='bones':
    for k in range(3):boing(t+k*0.25,0.15)
  if ty=='pop':plop(t,79,0.4);arp(t+0.05,79,0.25)
  if ty=='guilty':
    for k,m in enumerate([67,65,63,60]):add(t+k*0.25,bell(m,0.4),0.2)
  if ty=='hat':fanfare(t,0.3)
  if ty=='close':thud(t+0.4,0.3)
  if ty=='jump':boing(t,0.2)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
jingle(T['MOVE'],END,bpm=116,semi=-2,g=1.0,claps=True)
bark(2.6,0.25);bark(2.85,0.25)
e=END-1.6
add(e,bell(58,1.5),0.3);add(e,bell(62,1.5),0.25);add(e,bell(65,1.5),0.25);add(e,bell(70,1.5),0.3)
save(sys.argv[2])
