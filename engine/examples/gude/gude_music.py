import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def rollsnd(t,d=1.2,g=0.05):
  n=int(d*SR);r=np.random.RandomState(int(t*11)).randn(n);tt=np.arange(n)/SR
  add(t,r*np.exp(-2.5*tt/d)*(0.6+0.4*np.sin(tt*60)),g)
def drumroll(t,d=0.7):
  k=0
  while k*0.05<d:add(t+k*0.05,tom(52+(k%2),0.08+0.15*k*0.05/d),1.0);k+=1
jingle(0,T['LEO']-0.4,bpm=112,semi=0,g=0.7)
jingle(7.6,T['TEO']-0.6,bpm=112,semi=2,g=0.65,full=False)
jingle(18.4,T['DUDA']-0.8,bpm=112,semi=5,g=0.65)
jingle(T['PUSH'],T['PAW']-0.8,bpm=112,semi=2,g=0.6,full=False)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='flick':tick(t,0.25);rollsnd(t,0.7,0.04)
  if ty=='clack':add(t,bell(100,0.1),0.45);add(t+0.02,bell(95,0.1),0.3)
  if ty=='yay':arp(t,79,0.22)
  if ty=='roll':rollsnd(t,1.3,0.05)
  if ty=='gulp':plop(t,62,0.35)
  if ty=='drop':plop(t,70,0.3);boing(t+0.1,0.15)
  if ty=='hm':slide(t,500,520,0.8,0.06)
  if ty=='boop':boing(t,0.25);rollsnd(t,0.8,0.04)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='drum':drumroll(t,0.65)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=112,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
