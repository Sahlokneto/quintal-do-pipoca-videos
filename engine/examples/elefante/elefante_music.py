import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['GO1'],bpm=116,semi=0,g=0.6,full=False)
jingle(T['GO1'],T['GO2'],bpm=132,semi=2,g=0.7)
jingle(T['GO2'],T['GO3'],bpm=116,semi=5,g=0.6)
jingle(T['GO3'],T['ASK'],bpm=132,semi=2,g=0.7)
jingle(T['ASK'],T['GO4'],bpm=116,semi=0,g=0.5,full=False)
jingle(T['GO4'],T['YAY'],bpm=140,semi=4,g=0.75,claps=True)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='go':whistle(t,0.4,0.22)
  if ty=='run':whoosh(t,0.5,0.25)
  if ty=='boing':boing(t,0.2)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=116,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
