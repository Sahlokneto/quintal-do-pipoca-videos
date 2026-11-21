import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def chug(t0,t1,per):
  t=t0;k=0
  while t<t1:
    n=int(0.09*SR);r=np.random.RandomState(k%4).randn(n);tt=np.arange(n)/SR
    add(t,np.convolve(r,np.ones(8)/8,'same')*np.exp(-tt/0.03)*3,0.07 if k%2 else 0.11);t+=per;k+=1
def piui(t0,g=0.2):
  for (a,d) in [(0,0.25),(0.3,0.5)]:
    n=int(d*SR);tt=np.arange(n)/SR;f=np.where(tt<0.05,700+tt*2000,800)*(1 if a==0 else 1.26)
    s=(np.sin(2*np.pi*np.cumsum(f)/SR)+0.5*np.sin(2*np.pi*np.cumsum(f*1.5)/SR))*np.minimum(1,tt/0.02)*np.minimum(1,(d-tt)/0.06)
    add(t0+a,s,g)
segs=[(0,T['GO'],0.9),(T['GO'],T['TIN'],0.8),(T['POP'],T['FAST'],0.8),(T['LAST'],T['ROW'],0.7)]
for a,b,g in segs:jingle(a,b,bpm=120,semi=0,g=g*0.8,full=g>0.75)
jingle(T['FAST'],T['BRAKE'],bpm=150,semi=2,g=0.8)
chug(T['GO']+0.3,T['STOP']+0.8,0.25);chug(T['FAST'],T['BRAKE'],0.13);chug(T['LAST'],T['ARRV'],0.3)
for t,ty in EV:
  if ty=='box':plop(t+0.5,70,0.35);boing(t+0.5,0.12)
  if ty=='bark':bark(t+0.4,0.3);bark(t+0.65,0.25)
  if ty=='pop':plop(t,79,0.35)
  if ty=='whistle':piui(t,0.18)
  if ty=='go':slide(t,200,400,0.6,0.1)
  if ty=='tunnel':
    for k in range(4):add(t+k*0.45,tom(40),0.3)
  if ty=='surprise':arp(t,76,0.28);boing(t+0.1,0.25)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='stop':scratch(t,0.2)
  if ty=='jump':boing(t,0.25)
  if ty=='fast':whoosh(t,0.8,0.35)
  if ty=='whoosh':whoosh(t,0.9,0.3)
  if ty=='brake':
    scratch(t,0.35)
    for k in range(4):boing(t+0.3+k*0.18,0.18)
  if ty=='go2':piui(t,0.12)
  if ty=='confetti':fanfare(t,0.3);add(t,clap(),1.0)
jingle(T['ROW'],END,bpm=120,semi=0,g=1.0,claps=True)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
