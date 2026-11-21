import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def dirt(t0,dur,g=0.1):
  n=int(dur*SR);r=np.random.RandomState(9).randn(n);tt=np.arange(n)/SR;lp=np.convolve(r,np.ones(25)/25,'same')
  add(t0,lp*(0.5+0.5*np.sign(np.sin(2*np.pi*10*tt)))*4,g)
segs=[(0,T['DOG'],1.0),(T['DDE'],T['FETCH'],0.9),(T['COVE'],T['LAPSE'],0.6)]
for a,b,g in segs:jingle(a,b,bpm=100,semi=-2,g=g*0.8,full=g>0.7)
for t,ty in EV:
  if ty=='chuf':dirt(t-0.1,0.25,0.12);thud(t-0.1,0.2)
  if ty=='bark':bark(t+0.3,0.3);bark(t+0.55,0.25)
  if ty=='dig':dirt(t,T['DDE']-t,0.11)
  if ty=='dig2':dirt(t,T['BDE']-t,0.09)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='plant':plop(t,72,0.35);arp(t+0.6,79,0.2)
  if ty=='water':slide(t,1200,500,T['WATE']-t,0.06);splash(t,0.12,T['WATE']-t)
  if ty=='run':whoosh(t,0.6,0.3)
  if ty=='pat':
    for k in range(4):thud(t+k*0.2,0.18)
  if ty=='lapse':
    k=0;tt=t
    while tt<T['LAPE']-0.1:add(tt,bell(60+[0,4,7,12,16,19,24][k%7]+(k//7)*2,0.5),0.18);k+=1;tt+=0.2
  if ty=='oranges':
    for k in range(7):plop(t+k*0.12,76+k,0.25)
  if ty=='bonepop':boing(t,0.3);arp(t+0.3,74,0.22)
  if ty=='confetti':fanfare(t,0.3);add(t,clap(),1.0)
jingle(T['LAPE'],T['UP'],bpm=100,semi=-2,g=0.7)
jingle(T['UP'],END,bpm=100,semi=-2,g=1.0,claps=True)
e=END-1.6
add(e,bell(58,1.5),0.3);add(e,bell(62,1.5),0.25);add(e,bell(65,1.5),0.25);add(e,bell(70,1.5),0.3)
save(sys.argv[2])
