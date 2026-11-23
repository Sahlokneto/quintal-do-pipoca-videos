import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def oompah(t0,t1,g=0.3,semi=0):
  b=60/116;t=t0;k=0;R=[48,55,53,55]
  while t<t1-0.05:
    r=R[(k//4)%4]+semi
    if k%2==0:add(t,bassn(r,b*0.8),g*1.2)
    else:
      for j,c in enumerate([r+12,r+16,r+19]):add(t+j*0.01,pluck(c,0.2),g*0.6)
    t+=b;k+=1
def roll(t,d=1.0):
  k=0
  while k*0.05<d:add(t+k*0.05,tom(52+(k%2),0.08+0.15*k*0.05/d),1.0);k+=1
def no(t):slide(t,420,250,0.35,0.16);slide(t+0.38,330,200,0.4,0.16)
jingle(0,T['LW'],bpm=116,semi=0,g=0.75)
oompah(T['JUG'],T['STEAL'])
jingle(T['LGH1'],T['GRAB'],bpm=116,semi=2,g=0.7)
oompah(T['TOP'],T['HE'],semi=5)
jingle(T['HE'],T['A1'],bpm=116,semi=0,g=0.7,full=False)
oompah(T['A1'],T['JMP']-1.0,semi=2)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.22)
  if ty=='roll':roll(t,0.9)
  if ty=='roll2':roll(t,1.0)
  if ty=='jump':boing(t,0.3);slide(t,300,900,0.5,0.12)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='clap':
    for k in range(6):add(t+k*0.16,clap(),0.6)
  if ty=='strain':slide(t+0.6,120,90,1.2,0.1)
  if ty=='boing':boing(t,0.25)
  if ty=='no':no(t)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
  if ty=='applause':
    import random
    for k in range(40):add(t+random.random()*1.8,clap(),0.35)
jingle(T['YAY']+0.4,T['END'],bpm=116,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
