import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def roll(t,d=0.6):
  k=0
  while k*0.05<d:add(t+k*0.05,tom(50+(k%2),0.08+0.15*k*0.05/d),1.0);k+=1
jingle(0,T['STRONG'],bpm=120,semi=0,g=0.75)
jingle(T['POP'],T['DW'],bpm=132,semi=2,g=0.75)
jingle(T['DW'],T['BACK'],bpm=120,semi=5,g=0.7,full=False)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='tap':add(t,tom(64,0.25),0.5);add(t,clap(),0.25)
  if ty=='whee':add(t,tom(60,0.4),0.8);slide(t,400,1600,1.4,0.12)
  if ty=='hat':boing(t,0.35);slide(t+0.1,900,500,0.3,0.08)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='shake':
    for k in range(5):add(t+k*0.07,tom(70,0.2),0.2)
  if ty=='drum':roll(t,0.6)
  if ty=='yay':fanfare(t,0.22)
  if ty=='boop':boing(t,0.22);add(t,tom(67,0.25),0.4)
  if ty=='lap':plop(t,55,0.4)
  if ty=='thud':thud(t,0.6);slide(t,500,200,0.4,0.1)
  if ty=='gulp':plop(t,62,0.35)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['PONTO']+0.4,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
