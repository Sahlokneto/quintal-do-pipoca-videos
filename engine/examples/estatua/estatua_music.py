import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
ons=[e[0] for e in EV if e[1]=='on'];offs=[e[0] for e in EV if e[1]=='off']
for i,t0 in enumerate(ons):
  t1=offs[i] if i<len(offs) else END
  last=(i==len(ons)-1)
  jingle(t0,t1,bpm=112,semi=[0,2,4,0,0][i],g=0.9 if last else 0.75,claps=last or i==3)
  add(t0-0.05,bell(84,0.3),0.15)
for i,t in enumerate(offs):
  scratch(t,0.4);bark(t+0.15,0.3)
  nxt=ons[i+1] if i+1<len(ons) else END
  k=0;tt=t+0.6
  while tt<nxt-0.3:tick(tt,0.1,k%2==0);k+=1;tt+=0.5
for t,ty in EV:
  if ty=='fall':boing(t,0.3);thud(t+0.45,0.4)
  if ty=='laugh':giggle(t,0.12)
  if ty=='win':fanfare(t,0.35)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
bark(2.9,0.25);bark(3.15,0.25)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
