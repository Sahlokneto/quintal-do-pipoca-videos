import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def ding(t,m=84):add(t,bell(m,0.6),0.25);add(t+0.08,bell(m+7,0.6),0.18)
def steps(t0,t1,per=0.16,g=0.06):
  t=t0;k=0
  while t<t1:add(t,hat(),g*(1.6 if k%2 else 1));t+=per;k+=1
jingle(0,T['CNT'],bpm=126,semi=0,g=0.75)
pad(T['CNT'],T['GO'],0.08)
jingle(T['GO'],T['STOP']+0.4,bpm=152,semi=2,g=0.85)
jingle(T['STOP']+0.4,T['DIN'],bpm=126,semi=0,g=0.7,full=False)
jingle(T['DIN'],T['DIZ'],bpm=140,semi=5,g=0.8)
jingle(T['DIZ']+1.2,T['CT'],bpm=126,semi=0,g=0.6,full=False)
jingle(T['CT'],T['LAUGH'],bpm=152,semi=2,g=0.8)
jingle(T['LAUGH'],T['FIM'],bpm=126,semi=0,g=0.6,full=False)
steps(T['GO'],T['STOP']);steps(T['B'],T['PIQ']);steps(T['CT'],34.6,0.13)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='star':ding(t)
  if ty in('c1','c2','c3'):add(t,bell({'c1':72,'c2':76,'c3':79}[ty],0.5),0.3)
  if ty=='go':whistle(t,0.5,0.22)
  if ty=='tag':slide(t,300,900,0.25,0.18);add(t,clap(),0.8)
  if ty=='pique':arp(t,79,0.26)
  if ty=='circle':
    for k in range(12):whoosh(t+k*0.33,0.3,0.12)
  if ty=='dizzy':slide(t,700,250,0.7,0.12);slide(t+0.1,650,220,0.7,0.1)
  if ty=='thud':boing(t-0.3,0.18);thud(t,0.35)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='lick':chirp(t,0.18);chirp(t+0.25,0.15)
  if ty=='confetti':fanfare(t,0.33);add(t,clap(),1.0)
jingle(T['FIM']+0.5,END,bpm=126,semi=0,g=1.0,claps=True)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
