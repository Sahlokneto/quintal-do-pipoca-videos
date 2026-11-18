import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def psst(t0,dur=1.4,g=0.12):
  n=int(dur*SR);tt=np.arange(n)/SR;r=np.random.RandomState(int(t0*7)).randn(n);hp=np.diff(np.concatenate([[0],r]))
  e=(0.5+0.5*np.sin(2*np.pi*3.2*tt))*np.sin(np.pi*tt/dur)
  add(t0,hp*e,g)
def crunch(t0,g=0.3):
  for k in range(4):
    n=int(0.06*SR);r=np.random.RandomState(30+k).randn(n);tt=np.arange(n)/SR;add(t0+k*0.15,r*np.exp(-tt/0.015),g)
def tchan(t0,g=0.35):
  for j,m in enumerate([67,72]):add(t0+j*0.18,bell(m,0.6),g);add(t0+0.18,clap(),0.8)
segs=[(0,4.8,1.0),(4.8,T['SH1'],0.45),(T['SH1']+1.0,17.6,0.6),(17.6,T['SH2'],0.45),(T['LF']+0.6,T['W3'],0.6),(T['W3'],T['AU'],0.45),(T['BIS']+0.4,T['MOVE'],0.6)]
for a,b,g in segs:jingle(a,b,bpm=108,g=g*0.8,full=g>0.5)
for t,ty in EV:
  if ty.startswith('psst'):
    i=int(ty[4:]);psst(t+0.1,1.4,0.13)
    for k in range(3):add(t+0.3+k*0.35,bell(76+i%3*2+k*3,0.3),0.08)
  if ty=='shout':tchan(t,0.35)
  if ty=='spin':slide(t,400,1200,1.8,0.1)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='era':add(t,bell(72,0.4),0.25)
  if ty=='fall':boing(t,0.25);thud(t+0.4,0.35)
  if ty=='walk':
    for k in range(6):tick(t+k*0.5,0.1,k%2==0)
  if ty=='au':bark(t,0.3);bark(t+0.35,0.3);bark(t+0.7,0.3)
  if ty=='toss':slide(t,500,1400,0.6,0.12)
  if ty=='catch':plop(t,79,0.4);arp(t+0.05,79,0.25);crunch(t+0.4,0.3)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
jingle(T['MOVE'],END,bpm=108,g=1.0,claps=True)
bark(2.7,0.25);bark(2.95,0.25)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
