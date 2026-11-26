import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def hum(t0,t1,f=220,g=0.05):
  n=int((t1-t0)*SR)
  if n<=0:return
  t=np.arange(n)/SR;s=np.sin(2*np.pi*f*t+3*np.sin(2*np.pi*7*t))*(0.6+0.4*np.sin(2*np.pi*11*t))
  e=np.minimum(1,t/0.2)*np.minimum(1,(t[-1]-t+1e-3)/0.3);add(t0,s*e,g)
jingle(0,T['THROW']-1.4,bpm=120,semi=0,g=0.6,full=False)
jingle(T['LAND'],T['DOGIN'],bpm=120,semi=2,g=0.6)
jingle(T['DOGIN'],T['YAY'],bpm=138,semi=5,g=0.7,claps=True)
hum(T['LAND'],T['LFALL'],196,0.05);hum(T['LAND'],T['DFALL'],233,0.04);hum(T['LAND'],T['TFALL'],262,0.04);hum(T['LAND'],T['BFALL'],294,0.04)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='ta':fanfare(t,0.2)
  if ty=='roll':
    for k in range(14):add(t+k*0.09,tom(50,0.25),0.5)
  if ty=='whoosh':whoosh(t,0.5,0.3)
  if ty=='spin':slide(t,300,900,0.6,0.08)
  if ty=='plop':plop(t,60,0.3);tick(t+0.15,0.12)
  if ty=='slide':slide(t,500,700,1.5,0.05)
  if ty=='tlim':add(t,bell(88,0.6),0.35);add(t+0.05,bell(91,0.6),0.25)
  if ty=='laugh':giggle(t,0.13,8)
  if ty=='dizzy':slide(t,900,300,0.8,0.08);trill(t+0.2,0.6,0.1)
  if ty=='boing':boing(t,0.25)
  if ty=='confetti':fanfare(t,0.32);add(t,clap(),1.0)
jingle(T['YAY']+0.4,T['END'],bpm=120,semi=2,g=1.0,claps=True)
e=T['END']-1.6
add(e,bell(62,1.5),0.3);add(e,bell(66,1.5),0.25);add(e,bell(69,1.5),0.25);add(e,bell(74,1.5),0.3)
save(sys.argv[2])
