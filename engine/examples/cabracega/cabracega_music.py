import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def sniffs(t0,n=8,g=0.12):
  for k in range(n):
    m=int(0.07*SR);r=np.random.RandomState(40+k).randn(m);tt=np.arange(m)/SR;add(t0+k*0.32,np.diff(np.concatenate([[0],r]))*np.sin(np.pi*tt/0.07),g)
segs=[(0,T['SPIN'],1.0,0),(T['DIZ']+1.6,T['HUG'],0.55,0),(T['HUG']+1.4,T['SNK'],0.6,0),(T['SNK'],T['CATCH'],0.35,-3),(T['UNM'],T['MOVE'],0.6,0)]
for a,b,g,sm in segs:jingle(a,b,bpm=112,semi=sm,g=g*0.8,full=g>0.5)
for t,ty in EV:
  if ty=='tie':plop(t,72,0.3);plop(t+0.12,79,0.3)
  if ty=='spin':slide(t,300,1300,2.0,0.1)
  if ty=='dizzy':
    for k in range(5):add(t+k*0.3,bell(76-k*2,0.3),0.12)
  if ty=='steps':
    for k in range(6):tick(t+k*0.5,0.1,k%2==0)
  if ty=='boing':boing(t,0.25)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='pat':
    for k in range(4):add(t+k*0.4,bell(84,0.2),0.08)
  if ty=='lick':slide(t,900,1600,0.25,0.1);slide(t+0.35,900,1600,0.25,0.1)
  if ty=='tiptoe':
    for k in range(5):add(t+k*0.5,pluck(67+(k%2)*3,0.3),1.0)
  if ty=='tap':plop(t,84,0.4)
  if ty=='catch':add(t,clap(),1.0);arp(t,79,0.3)
  if ty=='unmask':whoosh(t,0.5,0.3)
  if ty=='shout':add(t,bell(67,0.6),0.3);add(t+0.18,bell(72,0.6),0.3)
  if ty=='sniff':sniffs(t,9,0.12)
  if ty=='found':bark(t,0.3);bark(t+0.35,0.3);arp(t+0.1,84,0.25)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
jingle(T['MOVE'],END,bpm=112,g=1.0,claps=True)
bark(2.7,0.25);bark(2.95,0.25)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
