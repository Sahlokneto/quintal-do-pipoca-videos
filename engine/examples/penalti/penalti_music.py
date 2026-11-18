import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def crowd(t0,dur,g=0.25):
  n=int(dur*SR);tt=np.arange(n)/SR;r=np.random.RandomState(int(t0*3)).randn(n);lp=np.convolve(r,np.ones(30)/30,'same')
  add(t0,lp*6*np.sin(np.pi*tt/dur)*(1+0.3*np.sin(2*np.pi*5*tt)),g)
def kickfx(t0,g=0.5):add(t0,kick(),g);add(t0,tom(50),0.3*g)
def batuque(t0,t1,g=0.5):
  b=60/124;k=0;t=t0
  while t<t1-0.05:
    add(t,tom(45 if k%4 in(0,3) else 52),0.35*g);add(t,hat(),g)
    if k%4==2:add(t,clap(),0.6*g)
    k+=1;t+=b/2
jingle(0,4.6,bpm=124,g=0.6)
segs=[(4.6,T['K1']+0.8),(8.0,T['K2']+0.8),(12.0,T['K3']+0.2),(T['GOAL3']+0.2,T['K4']+0.4),(33.0,T['K5']+0.2)]
for a,b in segs:batuque(a,b,0.55)
for t,ty in EV:
  if ty=='whistle':whistle(t,0.5,0.18)
  if ty=='kick':kickfx(t,0.5);slide(t,600,1200,0.4,0.08)
  if ty=='boing':boing(t,0.3);crowd(t+0.3,1.4,0.25)
  if ty=='thud':thud(t,0.3);slide(t-0.6,900,300,0.6,0.1)
  if ty=='drop':plop(t,72,0.3);arp(t+0.2,72,0.18)
  if ty=='whiff':whoosh(t,0.4,0.4);boing(t+0.15,0.2)
  if ty=='fall':thud(t,0.4);giggle(t+0.3,0.12,8)
  if ty=='lick':
    for k in range(6):plop(t+k*0.35,84,0.12)
  if ty=='goal':fanfare(t,0.4);crowd(t,2.0,0.35);add(t,clap(),1.0)
  if ty=='catch':plop(t,79,0.4);arp(t+0.05,79,0.25);crowd(t+0.1,1.8,0.3)
  if ty=='head':kickfx(t,0.4);boing(t,0.15)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
# rolada lenta do Teo: suspense
k=0;tt=T['K3']+0.6
while tt<T['GOAL3']-0.1:tick(tt,0.1,k%2==0);k+=1;tt+=0.4
jingle(T['GOAL3']+0.3,28.4,bpm=124,g=0.7,claps=True)
jingle(T['MOVE']-0.4,END,bpm=124,g=1.0,claps=True)
bark(2.7,0.25);bark(2.95,0.25)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
