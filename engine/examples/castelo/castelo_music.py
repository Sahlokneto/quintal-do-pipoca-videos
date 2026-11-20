import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def sand(t0,dur,g=0.1):
  n=int(dur*SR);r=np.random.RandomState(5).randn(n);tt=np.arange(n)/SR;lp=np.convolve(r,np.ones(20)/20,'same')
  add(t0,lp*(0.5+0.5*np.sign(np.sin(2*np.pi*8*tt)))*4,g)
segs=[(0,T['DOG'],1.0),(T['DIG'],T['SPL'],0.6),(T['SHKE']+0.6,T['MOVE'],0.6)]
for a,b,g in segs:jingle(a,b,bpm=112,semi=-3,g=g*0.8,full=g>0.7)
for t,ty in EV:
  if ty=='puf':plop(t,76,0.35);sand(t,0.3,0.1)
  if ty=='flag':arp(t,81,0.25)
  if ty=='bark':bark(t+0.6,0.3);bark(t+0.85,0.25)
  if ty=='jump':boing(t,0.2)
  if ty=='dig':sand(t,T['DIGE']-t,0.1)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='water':slide(t,900,300,1.2,0.12);splash(t+0.3,0.2,0.9)
  if ty=='splash':splash(t,0.45,0.6)
  if ty=='shake':trill(t,1.6,0.16);splash(t,0.15,1.6)
  if ty=='fall':
    for k,m in enumerate([72,69,65,60]):add(t+k*0.2,bell(m,0.4),0.22)
  if ty=='fix':sand(t,1.2,0.08)
  if ty=='pop':plop(t,79,0.4);arp(t+0.05,79,0.25)
  if ty=='confetti':fanfare(t,0.3);add(t,clap(),1.0)
jingle(T['MOVE'],END,bpm=112,semi=-3,g=1.0,claps=True)
e=END-1.6
add(e,bell(57,1.5),0.3);add(e,bell(61,1.5),0.25);add(e,bell(64,1.5),0.25);add(e,bell(69,1.5),0.3)
save(sys.argv[2])
