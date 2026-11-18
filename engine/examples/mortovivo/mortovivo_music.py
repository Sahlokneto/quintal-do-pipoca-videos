import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def snore(t0,dur,g=0.25):
  n=int(dur*SR);tt=np.arange(n)/SR;r=np.random.RandomState(9).randn(n);lp=np.convolve(r,np.ones(40)/40,'same')
  e=np.maximum(0,np.sin(2*np.pi*0.6*tt))**2
  add(t0,(lp*6+0.4*np.sin(2*np.pi*(90+30*e)*tt))*e,g)
def sneeze(t0,g=0.4):
  slide(t0-0.45,500,900,0.4,0.12)
  n=int(0.3*SR);tt=np.arange(n)/SR;r=np.random.RandomState(4).randn(n)
  add(t0,r*np.exp(-tt/0.07)*0.8,g);add(t0,kick(),0.4*g)
# trilha: jingle de fundo nos trechos de jogo, pausas de suspense nas pegadinhas
jingle(0,4.4,bpm=116,g=0.6)
jingle(4.4,T['TRICK']-0.2,bpm=116,g=0.5,full=False)
jingle(T['TRICK']+1.4,T['MOR']-0.2,bpm=120,g=0.55,full=False)
jingle(T['MOR']+2.4,24.4,bpm=116,g=0.55)
jingle(24.4,T['SNZ']-0.6,bpm=138,g=0.6,full=False)
jingle(T['WIN']+0.6,35.4,bpm=120,g=0.7,claps=True)
jingle(35.4,T['ZZ'],bpm=110,g=0.45,full=False)
for t,ty in EV:
  if ty=='M':add(t,bell(60,0.5),0.4);add(t,tom(40),0.3)
  if ty in('V','X'):add(t,bell(84,0.5),0.35)
  if ty=='BM':add(t,bell(62,0.5),0.4);add(t,tom(40),0.3)
  if ty=='BV':add(t,bell(86,0.5),0.35)
  if ty=='R':add(t,bell(72,0.4),0.3);add(t+0.25,bell(76,0.4),0.3)
  if ty=='S':sneeze(t,0.45)
  if ty=='oops':boing(t,0.3);thud(t+0.3,0.35)
  if ty=='laugh':giggle(t,0.12)
  if ty=='win':fanfare(t,0.4);add(t,clap(),1.0)
  if ty=='flop':slide(t,700,250,0.35,0.15);thud(t+0.3,0.25)
  if ty=='hop':boing(t,0.18)
  if ty=='zzz':snore(t,T['WAKE']-t-0.2,0.3)
  if ty=='wake':bark(t,0.35);bark(t+0.2,0.3);slide(t,300,1400,0.5,0.15)
  if ty=='confetti':arp(t,84,0.3);add(t,clap(),1.0)
jingle(T['ROW']-1.2,END,bpm=116,g=1.0,claps=True)
bark(2.6,0.25);bark(2.85,0.25)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
