import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['B1'],bpm=120,semi=0,g=0.6,full=False)
jingle(T['B1'],T['LV2'],bpm=120,semi=2,g=0.65,claps=True)
jingle(T['LV2'],T['FREE'],bpm=126,semi=4,g=0.6)
jingle(T['FREE'],T['LV3'],bpm=132,semi=7,g=0.7,claps=True)
jingle(T['LV3'],T['B3'],bpm=112,semi=5,g=0.55,full=False)
jingle(T['B3'],T['YAY'],bpm=132,semi=2,g=0.7,claps=True)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='stretch':slide(t,300,700,0.35,0.15)
  if ty=='hop':boing(t,0.12)
  if ty=='thud':thud(t,0.45)
  if ty=='boing':boing(t,0.2)
  if ty=='whee':slide(t,500,1200,0.5,0.15)
  if ty=='sneak':
    for k in range(5):tick(t+k*0.24,0.12,k%2==0)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
