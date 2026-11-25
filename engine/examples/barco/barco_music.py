import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['GO'],bpm=120,semi=0,g=0.7)
jingle(T['GO'],T['SPLASH']-0.3,bpm=120,semi=2,g=0.55,full=False)
jingle(T['SPLASH']+1.0,T['LOOP'],bpm=120,semi=5,g=0.65)
jingle(T['LOOP'],T['LEND'],bpm=104,semi=0,g=0.7)
jingle(T['LEND'],T['SHAKE'],bpm=120,semi=2,g=0.6,full=False)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='plim':
    for k in range(4):add(t+k*0.06,bell(84+k*2,0.3),0.15)
  if ty=='count':
    for k in range(3):beep(t+k*0.4,660,0.12,0.08)
    beep(t+1.2,990,0.25,0.1)
  if ty=='go':whistle(t,0.4,0.12)
  if ty=='puff':whoosh(t,0.5,0.12)
  if ty=='spin':slide(t,500,1100,0.7,0.05);slide(t+0.8,500,1100,0.7,0.05)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='bigblow':whoosh(t,0.8,0.35)
  if ty=='flip':plop(t+0.2,60,0.25);boing(t+0.3,0.12)
  if ty=='splash':splash(t,0.6,0.8);boing(t,0.15)
  if ty=='plop':plop(t,70,0.3)
  if ty=='march':
    for k in range(int((T['LEND']-T['LOOP'])/0.58)):add(t+k*0.58,bell(76 if k%2 else 72,0.25),0.08)
  if ty=='shake':
    for k in range(6):splash(t+k*0.2,0.18,0.25)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
