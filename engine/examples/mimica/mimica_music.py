import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def mime(t0,t1,g=0.14):
  # trilha de "suspense engraçado": pizzicato em passos + ticks
  sc=[60,62,64,65,67,65,64,62];t=t0;k=0
  while t<t1-0.05:
    add(t,pluck(sc[k%8]+(12 if k%4==3 else 0),0.3),g*1.6);tick(t+0.28,0.08,k%2==0);t+=0.56;k+=1
def no(t):slide(t,420,250,0.35,0.16);slide(t+0.38,330,200,0.4,0.16)
def yes(t):arp(t,79,0.28);add(t,bell(91,0.6),0.18)
segs=[(0,6.6),(12.6,15.8),(22.0,26.0),(32.6,35.0)]
for a,b in segs:jingle(a,b,bpm=108,semi=0,g=0.75)
mime(T['FLY'],T['LOK']);mime(T['FISH'],T['LGH1']);mime(T['HIND'],T['DOK']);mime(T['BDOG'],T['BOK'])
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='no':no(t)
  if ty=='yes':yes(t)
  if ty=='pull':whoosh(t,0.5,0.3)
  if ty=='jump':boing(t,0.3);slide(t,300,900,0.5,0.12)
  if ty=='splash':splash(t,0.35);boing(t+0.15,0.2)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='spin':
    for k in range(6):whoosh(t+k*0.33,0.3,0.15)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['FIM']+0.6,END,bpm=108,semi=2,g=1.0,claps=True)
e=END-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
