import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
segs=[(0,T["FALL"],1.0),(T["FALL"]+1.6,T["GUST"],0.8),(T["DOWN"]+3.6,T["LAU3"],0.6)]
for a,b,g in segs:jingle(a,b,bpm=120,semi=0,g=g*0.8,full=g>0.7)
pad(T['GUST'],T['DOWN']+3.6,0.1)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='launch':slide(t,300,1200,0.9,0.12);boing(t,0.15)
  if ty=='fall':
    for k,m in enumerate([76,72,69,64]):add(t+k*0.22,bell(m,0.4),0.22)
  if ty=='thud':thud(t,0.4)
  if ty=='run':
    for k in range(16):add(t+k*0.25,tom(50+(k%4)*3),0.18)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='pop':plop(t,79,0.4);arp(t+0.05,79,0.25)
  if ty=='clap':
    for k in range(6):add(t+k*0.33,clap(),0.6)
  if ty=='gust':whoosh(t,1.2,0.5)
  if ty=='spin':trill(t,1.6,0.16)
  if ty=='down':slide(t,1200,250,3.2,0.08)
  if ty=='land':plop(t,72,0.4);plop(t+0.15,76,0.4)
  if ty=='confetti':fanfare(t,0.3);add(t,clap(),1.0)
jingle(T['LAU3'],END,bpm=120,semi=0,g=1.0,claps=True)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
