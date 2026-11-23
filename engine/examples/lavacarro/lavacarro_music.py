import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
import numpy as np
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def water(t0,t1,g=0.05):
  n=int((t1-t0)*SR) if 'SR' in globals() else int((t1-t0)*44100)
  sr=n/(t1-t0);x=np.random.randn(n)*g;k=np.ones(8)/8;x=np.convolve(x,k,'same');e=np.minimum(1,np.minimum(np.arange(n)/(0.1*sr),(n-np.arange(n))/(0.1*sr)));add(t0,x*e,1.0)
def squish(t):slide(t,200,120,0.15,0.1)
def honk(t):beep(t,392,0.18,0.18);beep(t+0.24,392,0.25,0.18)
def bubbles(t):
  for k in range(8):plop(t+k*0.12,72+(k*5)%12,0.12)
jingle(0,T['SPR'],bpm=120,semi=0,g=0.75)
jingle(T['SPR'],T['DOG'],bpm=120,semi=0,g=0.6,full=False)
for k in range(int((T['SCE']-T['SC'])/0.5)):squish(T['SC']+k*0.5)
jingle(T['DOG'],T['RIN'],bpm=132,semi=2,g=0.7)
jingle(T['RIN'],T['SHINE'],bpm=120,semi=5,g=0.65,full=False)
jingle(T['SHINE'],T['FIM'],bpm=120,semi=0,g=0.75)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='water':water(T['SPR'],T['SPRE'])
  if ty=='water2':water(T['RIN'],T['RINE'])
  if ty=='water3':water(T['WET'],T['SHK'])
  if ty=='bubbles':bubbles(t)
  if ty=='q':arp(t,72,0.15)
  if ty=='shake':
    for k in range(5):whoosh(t+k*0.18,0.2,0.15)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='run2':
    for k in range(10):add(t+k*0.28,hat(),0.12)
  if ty=='shine':
    for k in range(6):add(t+k*0.12,bell(84+k*3,0.6),0.15)
  if ty=='jump':boing(t,0.25)
  if ty=='honk':honk(t)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['FIM']+0.6,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
