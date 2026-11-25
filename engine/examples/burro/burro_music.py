import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,9.4,bpm=116,semi=0,g=0.7)
jingle(9.9,18.4,bpm=116,semi=2,g=0.6,full=False)
jingle(18.8,27.4,bpm=116,semi=5,g=0.65)
jingle(27.9,34.0,bpm=116,semi=2,g=0.6,full=False)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='band':add(t,bell(79,0.3),0.12);add(t+0.08,bell(84,0.3),0.12)
  if ty=='spin':slide(t,500,1100,0.7,0.05);slide(t+0.8,500,1100,0.7,0.05)
  if ty=='steps':
    for k in range(8):tick(t+k*0.32,0.1,k%2==0)
  if ty=='pin':add(t,bell(88,0.4),0.25);boing(t+0.05,0.1)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='dogspin':
    for k in range(4):slide(t+k*0.5,700,1000,0.4,0.05)
    bark(t+0.2,0.25);bark(t+1.2,0.25)
  if ty=='sniff':
    for k in range(5):scratch(t+k*0.3,0.08)
  if ty=='drum':
    k=0
    while k*0.05<1.5:add(t+k*0.05,tom(52+(k%2),0.08+0.15*k*0.05/1.5),1.0);k+=1
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=116,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
