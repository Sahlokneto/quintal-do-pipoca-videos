import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
segs=[(0,T['BF'],1.0),(T['BF'],T['MISS'],0.5),(T['LAP'],T['ANT'],0.9),(T['FLEE'],T['UP'],0.8)]
for a,b,g in segs:jingle(a,b,bpm=104,semi=2,g=g*0.8,full=g>0.7)
def munch(t0):
  for k in range(3):add(t0+k*0.7,tom(50),0.25);add(t0+k*0.7+0.03,hat(),2.0)
for t,ty in EV:
  if ty=='sit':thud(t+0.4,0.25)
  if ty=='open':slide(t,500,900,0.25,0.12)
  if ty=='plop':plop(t+0.45,74,0.35)
  if ty=='yay':arp(t,79,0.25)
  if ty=='sneak':
    for k in range(6):tick(t+k*0.22,0.12,k%2==0)
  if ty=='bfly':trill(t+0.3,2.6,0.08)
  if ty=='nhac':tom(55);add(t,tom(55),0.3)
  if ty=='oops':
    for k,m in enumerate([72,68,64]):add(t+k*0.22,bell(m,0.4),0.22)
  if ty=='run':
    for k in range(int((T['LAPE']-t)/0.13)):tick(t+k*0.13,0.08,k%2==0)
    bark(t+0.2,0.3)
  if ty=='drop':plop(t+0.2,67,0.35)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='ants':
    for k in range(int((T['RUN']-t)/0.18)):tick(t+k*0.18,0.06,k%2==1)
  if ty=='run2':whoosh(t,0.6,0.3)
  if ty=='bark':bark(t,0.35);bark(t+0.35,0.3);bark(t+0.7,0.3)
  if ty=='flee':slide(t,1400,600,1.0,0.12)
  if ty=='toss':whoosh(t,0.7,0.3)
  if ty=='catch':plop(t,72,0.4);arp(t+0.1,76,0.2)
  if ty=='munch':munch(t)
  if ty=='roll':boing(t,0.25)
  if ty=='up':thud(t+0.3,0.2)
  if ty=='confetti':fanfare(t,0.3);add(t,clap(),1.0)
jingle(T['ROW'],END,bpm=104,semi=2,g=1.0,claps=True)
e=END-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
