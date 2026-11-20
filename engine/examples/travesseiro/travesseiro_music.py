import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def pof(t0,g=0.3):
  n=int(0.18*SR);r=np.random.RandomState(11).randn(n);tt=np.arange(n)/SR;lp=np.convolve(r,np.ones(40)/40,'same')
  add(t0,lp*np.exp(-tt/0.05)*6,g);thud(t0,0.25)
segs=[(0,T['WAKE'],1.0),(T['UP'],T['ROW'],0.6)]
for a,b,g in segs:jingle(a,b,bpm=126,semi=2,g=g*0.8,full=g>0.7)
pad(T['WAKE'],T['SNZ']+0.4,0.08)
jingle(T['GO'],T['UP'],bpm=150,semi=2,g=0.5,full=True)
for t,ty in EV:
  if ty=='swing':whoosh(t+0.2,0.3,0.25)
  if ty=='pof':pof(t,0.35);add(t+0.05,bell(84,0.2),0.08)
  if ty=='snz':slide(t,500,900,0.3,0.1);add(t+0.32,clap(),0.9);bark(t+0.35,0.2)
  if ty=='run':bark(t,0.3)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='up':boing(t,0.15)
  if ty=='toss':slide(t,400,800,0.4,0.1);thud(t+0.5,0.2)
  if ty=='jump':boing(t,0.2)
  if ty=='confetti':fanfare(t,0.3);add(t,clap(),1.0)
jingle(T['ROW'],END,bpm=126,semi=2,g=1.0,claps=True)
e=END-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
