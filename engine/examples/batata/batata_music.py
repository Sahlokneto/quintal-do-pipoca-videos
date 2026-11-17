import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def hiss(t0,dur,g=0.05):
  n=int(dur*SR);r=np.random.RandomState(int(t0*7)).randn(n);tt=np.arange(n)/SR
  add(t0,np.diff(np.concatenate([[0],r]))*np.sin(np.pi*tt/dur),g)
def round_beat(t0,t1,b0,b1,semi=0):
  t=t0;k=0
  while t<t1-0.05:
    u=(t-t0)/(t1-t0);b=b0+(b1-b0)*u;e=60/b/2
    bongo(t,[62,67,62,62,67,62,69,67][k%8]+semi,0.32)
    if k%2==0:add(t,bassn([38,38,43,41][(k//4)%4]+semi,e*1.6),0.8)
    if k%4==2:add(t,clap(),0.35)
    else:add(t,hat(),0.8)
    if k%8==0:add(t,bell([76,79,81,79][(k//8)%4]+semi,0.4),0.18)
    k+=1;t+=e
jingle(0,T['R1']-0.3,bpm=116,g=0.6)
round_beat(T['R1'],T['Q1'],116,150)
round_beat(T['Q1']+1.6,T['R2'],116,116);round_beat(T['R2'],T['Q2'],132,170,2)
round_beat(T['Q2']+1.4,T['R3'],116,116);round_beat(T['R3'],T['Q3'],150,210,4)
hiss(T['R3'],T['Q3']-T['R3'],0.04)
for t,ty in EV:
  if ty=='bark':bark(t,0.16)
  if ty=='catch':plop(t,72,0.12)
  if ty=='toss':slide(t,500,900,0.12,0.05)
  if ty=='queimou':add(t,kick(),0.9);bark(t,0.5);bark(t+0.2,0.5);slide(t+0.1,1200,300,0.5,0.15)
  if ty=='bonk':boing(t,0.35);add(t,tom(50),0.3)
  if ty=='gulp':plop(t,55,0.5);arp(t+0.1,79,0.25)
  if ty=='ai':
    for k in range(3):slide(t+k*0.35,900,1400,0.2,0.1)
  if ty=='ah':slide(t,700,350,0.7,0.12)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
whoosh(T['Q3']+0.1,1.3,0.3)
jingle(T['CH0'],T['ROW'],bpm=132,g=0.85,claps=True)
fanfare(T['ROW']+0.1,0.35)
jingle(T['ROW']+0.9,END,bpm=116,g=1.0,claps=True)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
