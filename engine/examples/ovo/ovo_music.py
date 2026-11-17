import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def trem(t0,dur,m=67,g=0.08):
  n=int(dur*SR);tt=np.arange(n)/SR;s=np.sin(2*np.pi*mf(m)*tt)*(0.5+0.5*np.sin(2*np.pi*9*tt))*np.sin(np.pi*tt/dur)
  add(t0,s,g)
jingle(0,4.6,bpm=120,g=0.55)
jingle(T['GO'],T['TFLY'],bpm=132,g=0.75)
jingle(T['SPLAT']+1.0,T['LW0'],bpm=120,g=0.6,full=False)
trem(T['LW0'],T['LW1']-T['LW0'],67,0.12);trem(T['LW0'],T['LW1']-T['LW0'],71,0.08)
jingle(T['LW1']+0.3,T['TRIP'],bpm=120,g=0.7)
jingle(T['CATCH']+0.5,T['WIN'],bpm=120,g=0.6,full=False)
trem(T['CATCH']+0.5,T['WIN']-T['CATCH']-0.5,72,0.06)
jingle(T['WIN']+0.8,34.6,bpm=126,g=0.75,claps=True)
for t,ty in EV:
  if ty=='count':add(t,bell(72,0.4),0.3)
  if ty=='go':add(t,bell(84,0.7),0.35);bark(t,0.3);whistle(t+0.05,0.4,0.15)
  if ty=='fly':slide(t,400,1200,0.45,0.12)
  if ty=='splat':splash(t,0.4);slide(t+0.2,800,300,0.6,0.1)
  if ty=='boing':boing(t,0.25)
  if ty=='trip':thud(t+0.3,0.3);slide(t,300,1300,0.8,0.12)
  if ty=='catch':plop(t,79,0.4);arp(t+0.05,79,0.2)
  if ty=='win':fanfare(t,0.4);add(t,clap(),1.0)
  if ty=='tremble':
    k=0;tt=t
    while tt<T['HATCH']:add(tt,tom(60+(k%2)*3),0.12);k+=1;tt+=0.12
  if ty=='crack':crack(t,0.5)
  if ty=='piu':chirp(t,0.22)
  if ty=='hop':boing(t,0.12)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
for k in range(10):add(T['HATCH']+0.6+k*0.14,bell(72+[0,4,7,12,16,19,24,28,24,19][k],0.5),0.1)
jingle(T['ROW'],END,bpm=120,g=1.0,claps=True)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
