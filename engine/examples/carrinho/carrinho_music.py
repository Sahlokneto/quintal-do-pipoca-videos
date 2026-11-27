import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['GO1'],bpm=124,semi=0,g=0.6,full=False)
jingle(T['GO1'],T['FLOP'],bpm=144,semi=2,g=0.7,claps=True)
jingle(T['FLOP'],T['LICK'],bpm=124,semi=5,g=0.6)
jingle(T['LICK'],T['ASK'],bpm=132,semi=0,g=0.65)
jingle(T['ASK'],T['GO2'],bpm=124,semi=2,g=0.55,full=False)
jingle(T['GO2'],T['YAY'],bpm=156,semi=4,g=0.75,claps=True)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='go':whistle(t,0.5,0.25)
  if ty=='run':whoosh(t,0.6,0.25)
  if ty=='boing':boing(t,0.2)
  if ty=='thud':thud(t,0.45);boing(t+0.1,0.15)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='lick':
    for k in range(6):chirp(t+k*0.45,0.12)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=124,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
