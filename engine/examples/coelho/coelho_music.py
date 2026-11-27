import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['GO1'],bpm=120,semi=0,g=0.6,full=False)
jingle(T['GO1'],T['CALL2'],bpm=136,semi=3,g=0.7)
jingle(T['CALL2'],T['FETCH'],bpm=120,semi=0,g=0.6)
jingle(T['FETCH'],T['DROP'],bpm=140,semi=5,g=0.7,full=False)
jingle(T['DROP'],T['HOP'],bpm=120,semi=2,g=0.6)
jingle(T['HOP'],T['GO4'],bpm=120,semi=7,g=0.75,claps=True)
jingle(T['GO4'],T['YAY'],bpm=132,semi=4,g=0.7)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='go':whistle(t,0.4,0.22)
  if ty=='run':whoosh(t,0.5,0.25)
  if ty=='boing':boing(t,0.2)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='whine':slide(t,900,600,0.6,0.12);slide(t+0.7,850,550,0.7,0.12)
  if ty=='pop':plop(t,72,0.3)
  if ty=='thud':thud(t,0.4)
  if ty=='hops':
    k=0
    while t+k*0.5<T['HOPE']:boing(t+k*0.5,0.1);k+=1
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
