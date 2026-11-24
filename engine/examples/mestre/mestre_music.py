import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
jingle(0,T['S1'],bpm=124,semi=0,g=0.7)
jingle(T['S1'],T['S2'],bpm=124,semi=2,g=0.7,full=False)
jingle(T['S2'],T['S3'],bpm=124,semi=5,g=0.7)
jingle(T['S3'],T['CONGA'],bpm=124,semi=2,g=0.7,full=False)
jingle(T['CONGA'],T['STOP'],bpm=140,semi=0,g=0.85,claps=True)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='swap':whistle(t,0.4,0.12)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
  if ty=='jump':boing(t+0.15,0.1);boing(t+0.85,0.1)
  if ty=='spin':slide(t,500,1100,0.7,0.05)
  if ty=='dizzy':
    for k in range(6):slide(t+1.2+k*0.3,900,600,0.28,0.06)
  if ty=='flamingo':whistle(t,0.3,0.06)
  if ty=='clap':
    for k in range(5):add(t+k*0.4,clap(),0.25)
  if ty=='robot':
    for k in range(4):beep(t+k*0.25,880 if k%2 else 660,0.1,0.06)
  if ty=='frog':add(t+0.6,tom(48,0.3),0.4);boing(t+0.65,0.12)
  if ty=='sit':plop(t+0.2,55,0.12)
  if ty=='paw':add(t,bell(84,0.2),0.15)
for t,ty in EV:
  if ty=='clap' and abs(t-(17.2+2*0.35))<0.01:
    for k in range(4):bark(t+k*0.45,0.28)
jingle(T['STOP']+0.4,T['END'],bpm=124,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
