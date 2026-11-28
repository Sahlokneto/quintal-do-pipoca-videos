import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['T1'],bpm=120,semi=0,g=0.6,full=False)
jingle(T['T1'],T['HIT'],bpm=128,semi=2,g=0.65,claps=True)
jingle(T['HIT'],T['CATCH'],bpm=128,semi=5,g=0.65)
jingle(T['CATCH'],T['DROP'],bpm=144,semi=7,g=0.75,claps=True)
jingle(T['DROP'],T['YAY'],bpm=120,semi=4,g=0.65)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='whistle':whistle(t,0.5,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='go':whistle(t,0.4,0.22)
  if ty=='run':whoosh(t,0.5,0.22)
  if ty=='throw':whoosh(t,0.45,0.35)
  if ty=='boing':boing(t,0.22)
  if ty=='catch':thud(t,0.3)
  if ty=='pop':plop(t,72,0.3)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
