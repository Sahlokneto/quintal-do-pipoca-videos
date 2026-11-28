import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['R1'],bpm=104,semi=0,g=0.55,full=False)
jingle(T['R1'],13.3,bpm=120,semi=2,g=0.6)
jingle(13.3,T['R2'],bpm=104,semi=0,g=0.5,full=False)
jingle(T['R2'],23.4,bpm=143,semi=4,g=0.65)
jingle(23.4,T['R3'],bpm=104,semi=5,g=0.5,full=False)
jingle(T['R3'],33.5,bpm=167,semi=7,g=0.7,claps=True)
jingle(33.5,T['YAY'],bpm=120,semi=4,g=0.6)
k=0
for t,ty in EV:
  if ty=='tap':add(t,clap(0.18),1.0);add(t,bell(76+(k%5)*2,0.25,0.12),1.0);k+=1
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='chime':trill(t,0.6,0.15)
  if ty=='fiu':slide(t-0.2,600,1400,0.35,0.18)
  if ty=='lick':slide(t,900,1300,0.2,0.12);slide(t+0.3,900,1300,0.2,0.12);slide(t+0.6,900,1300,0.2,0.12)
  if ty=='pow':boing(t,0.25);add(t,clap(0.3),1.0)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
