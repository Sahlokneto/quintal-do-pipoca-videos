import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def quack(t0,g=0.25):
  for k in range(2):
    n=int(0.14*SR);tt=np.arange(n)/SR;f=520-180*tt/0.14;ph=np.cumsum(f)/SR;s=np.sign(np.sin(2*np.pi*ph))*0.5+np.sin(2*np.pi*2*ph)*0.3
    add(t0+k*0.22,s*np.sin(np.pi*tt/0.14),g)
def shake(t0,dur=2.0,g=0.25):
  n=int(dur*SR);tt=np.arange(n)/SR;r=np.random.RandomState(9).randn(n);lp=np.convolve(r,np.ones(12)/12,'same')
  add(t0,lp*(0.5+0.5*np.sin(2*np.pi*14*tt))*np.sin(np.pi*tt/dur)*3,g)
segs=[(0,T['RUN'],1.0,0),(T['RUN'],T['HIDE'],0.6,2),(T['SPL']+0.6,T['POUR'],0.6,0),(T['RINSE'],T['SHAKE'],0.45,0),(T['WET'],T['MOVE'],0.6,0)]
for a,b,g,sm in segs:jingle(a,b,bpm=120,semi=sm,g=g*0.8,full=g>0.5)
for t,ty in EV:
  if ty=='uhoh':add(t,bell(67,0.4),0.2);add(t+0.25,bell(62,0.6),0.2)
  if ty=='run':
    for k in range(10):tick(t+k*0.3,0.1,k%2==0)
  if ty=='quack':quack(t,0.22);quack(t+0.6,0.22)
  if ty=='toss':slide(t,500,1400,0.6,0.12)
  if ty=='jump':boing(t,0.2)
  if ty=='splash':splash(t,0.45,0.7)
  if ty=='scrub':
    for k in range(12):
      m=int(0.1*SR);r=np.random.RandomState(60+k).randn(m);add(t+k*0.4,r*np.sin(np.pi*np.arange(m)/m),0.05)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='pour':splash(t+0.3,0.3,1.4);slide(t,800,300,1.2,0.06)
  if ty=='shake':shake(t,2.2,0.3)
  if ty=='roll':
    for k in range(6):add(t+k*0.45,bell(72+(k%3)*4,0.3),0.12)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
jingle(T['MOVE'],END,bpm=120,g=1.0,claps=True)
bark(2.6,0.25);bark(2.85,0.25)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
