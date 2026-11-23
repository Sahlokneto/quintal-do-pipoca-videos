import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def magic(t):
  for k,m in enumerate([84,88,91,96]):add(t+k*0.06,bell(m,0.4),0.14)
def no(t):slide(t,420,250,0.35,0.16);slide(t+0.38,330,200,0.4,0.16)
def ring(t):add(t,bell(96,0.8),0.2);add(t+0.1,bell(100,0.8),0.15);trill(t,0.5,0.08)
def sneeze(t):slide(t,500,900,0.25,0.12);whoosh(t+0.25,0.3,0.4);boing(t+0.3,0.25)
jingle(0,T['ASK'],bpm=112,semi=0,g=0.75)
pad(T['ASK'],T['SNZ'],0.08)
for k in range(int((T['SNZ']-T['ASK'])/0.54)):tick(T['ASK']+k*0.54,0.08,k%2==0)
jingle(T['LGH'],T['CALL'],bpm=112,semi=2,g=0.75)
pad(T['CALL'],T['BARK'],0.08)
for k in range(int((T['BARK']-T['SN0'])/0.27)):tick(T['SN0']+k*0.27,0.07,k%2==0)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='magic':magic(t)
  if ty=='ring':ring(t)
  if ty=='no':no(t)
  if ty=='q':arp(t,72,0.15)
  if ty=='sneeze':sneeze(t)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='whoosh':whoosh(t,0.5,0.3)
  if ty=='sniff':
    for k in range(8):add(T['SN0']+k*0.42,hat(),0.12)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['FIM']+0.6,END if 'END' in dir() else T['END'],bpm=112,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
