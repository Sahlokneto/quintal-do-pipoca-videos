import numpy as np, wave
SR=44100;END=62.64;N=int(SR*END);mix=np.zeros(N)
def mf(m):return 440*2**((m-69)/12)
def ez(u):return u*u*(3-2*u)
XK=[[0,0],[9.0,0],[10.4,-0.4],[11.6,0.35],[12.7,-0.15],[13.6,0.25],[14.2,0.1],[15.0,1.3],[15.45,1.45],[18.7,1.45],[20.3,0],[22.4,0],[23.6,0.35],[24.8,-0.3],[25.7,0.2],[26.6,-0.9],[27.4,-0.75],[28.2,-0.95],[29.0,-1.35],[29.45,-1.5],[32.0,-1.5],[33.6,0],[36.4,0],[37.6,0.2],[38.0,0.1],[39.0,-0.25],[40.2,0.25],[41.3,-0.2],[42.4,0.15],[43.4,-0.1],[44.3,0.05],[45.3,0],[70,0]]
def X(t):
  for i in range(1,len(XK)):
    if t<=XK[i][0]:
      a,b=XK[i-1],XK[i];u=min(1,max(0,(t-a[0])/(b[0]-a[0])));return a[1]+(b[1]-a[1])*ez(u)
  return 0
def add(t0,sig,g=1.0):
  i=int(t0*SR)
  if i>=N:return
  s=sig[:N-i]*g;mix[i:i+len(s)]+=s
def env(n,a=0.005,d=None):
  t=np.arange(n)/SR;e=np.minimum(1,t/a)
  if d:e*=np.exp(-t/d)
  return e
def bell(m,dur=0.5,g=0.3):
  n=int(dur*SR);t=np.arange(n)/SR;f=mf(m)
  s=np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*2*f*t)*np.exp(-t/0.08)+0.25*np.sin(2*np.pi*3.01*f*t)*np.exp(-t/0.05)
  return s*env(n,0.003,0.22)*g
def pluck(m,dur=0.35,g=0.12):
  n=int(dur*SR);t=np.arange(n)/SR;f=mf(m);ph=(f*t)%1
  s=(2*np.abs(2*ph-1)-1)+0.3*np.sin(2*np.pi*2*f*t)
  return s*env(n,0.002,0.09)*g
def bassn(m,dur=0.25,g=0.35):
  n=int(dur*SR);t=np.arange(n)/SR;f=mf(m);ph=(f*t)%1
  return (2*np.abs(2*ph-1)-1)*env(n,0.004,0.12)*g
def kick(g=0.6):
  n=int(0.25*SR);t=np.arange(n)/SR;f=110*np.exp(-t/0.04)+45
  return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.09)*g
def hat(g=0.08):
  n=int(0.05*SR);r=np.random.RandomState(3).randn(n);r=np.diff(np.concatenate([[0],r]))
  return r*np.exp(-np.arange(n)/SR/0.012)*g
def clap(g=0.3):
  n=int(0.18*SR);r=np.random.RandomState(7).randn(n);t=np.arange(n)/SR
  e=np.exp(-t/0.05)*(1+0.8*np.exp(-((t-0.012)/0.003)**2)+0.6*np.exp(-((t-0.024)/0.003)**2))
  return np.convolve(r,[1,-0.6],'same')*e*g
def tom(m=45,g=0.5):
  n=int(0.4*SR);t=np.arange(n)/SR;f=mf(m)*(1+0.5*np.exp(-t/0.03))
  return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.16)*g
MEL=[76,None,79,76,74,None,72,None,74,76,77,None,76,None,None,None,76,None,79,81,79,None,77,76,74,None,76,74,72,None,None,None]
CH=[[48,52,55],[43,47,50],[48,52,55],[43,47,50]]
ROOT=[36,31,36,31]
def jingle(t0,t1,bpm=112,semi=0,g=1.0,claps=False,full=True):
  b=60/bpm;e=b/2;k=0;t=t0
  while t<t1-0.01:
    i=k%32;bar=(k//8)%4
    m=MEL[i]
    if m is not None and full:add(t,bell(m+semi,0.5),0.28*g)
    if k%2==0:
      beat=(k//2)%4
      add(t,kick(),0.55*g if beat in(0,2) else 0.0)
      rt=ROOT[bar]+semi+(7 if beat%2 else 0);add(t,bassn(rt,b*0.9),g)
      if beat in(1,3):
        for j,c in enumerate(CH[bar][:3]):add(t+j*0.012,pluck(c+12+semi),g)
        if claps:add(t,clap(),0.9*g)
    else:add(t,hat(),g)
    k+=1;t+=e
def whistle(t0,dur=0.7,g=0.25):
  n=int(dur*SR);t=np.arange(n)/SR;f=2900+120*np.sin(2*np.pi*32*t)
  s=np.sin(2*np.pi*np.cumsum(f)/SR)*(0.75+0.25*np.sin(2*np.pi*32*t))*np.minimum(1,t/0.02)*np.minimum(1,(dur-t)/0.05)
  add(t0,s,g)
def bark(t0,g=0.35):
  n=int(0.16*SR);t=np.arange(n)/SR;f=520*np.exp(-t/0.12)+260
  s=(np.sin(2*np.pi*np.cumsum(f)/SR)+0.5*np.sign(np.sin(2*np.pi*np.cumsum(f*1.5)/SR)))*np.minimum(1,t/0.01)*np.exp(-t/0.06)
  add(t0,s,g)
def arp(t0,base=72,g=0.3):
  for j,m in enumerate([0,4,7,12,16]):add(t0+j*0.07,bell(base+m,0.8),g)
def drums(t0,t1):
  k=0;t=t0;n=int((t1-t0)/0.5)+1
  while t<t1-0.05:
    add(t,tom(43),0.25+0.5*k/n);k+=1;t+=0.5
def slide(t0,f0,f1,dur,g=0.25):
  n=int(dur*SR);t=np.arange(n)/SR;f=f0*(f1/f0)**(t/dur)
  add(t0,np.sin(2*np.pi*np.cumsum(f)/SR)*np.minimum(1,t/0.01)*np.minimum(1,(dur-t)/0.05),g)
def splash(t0,g=0.35,dur=0.5):
  n=int(dur*SR);r=np.random.RandomState(int(t0*10)).randn(n);t=np.arange(n)/SR
  lp=np.convolve(r,np.ones(18)/18,'same');s=lp*np.exp(-t/0.12)*(1+0.5*np.sin(2*np.pi*13*t))
  add(t0,s*4,g);add(t0,kick(),0.3*g)
def thud(t0,g=0.5):
  add(t0,tom(36),g)
def boing(t0,g=0.2):
  n=int(0.45*SR);t=np.arange(n)/SR;f=180+120*np.sin(2*np.pi*9*t)*np.exp(-t/0.2)+t*200
  add(t0,np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.18),g)
def crack(t0,g=0.8):
  n=int(0.25*SR);r=np.random.RandomState(11).randn(n);t=np.arange(n)/SR
  add(t0,np.diff(np.concatenate([[0],r]))*np.exp(-t/0.02)*1.0,g);add(t0,tom(33),0.7*g)
def pad(t0,t1,g=0.12):
  n=int((t1-t0)*SR);t=np.arange(n)/SR+t0;ax=np.array([abs(X(x)) for x in t[::441]]);ax=np.interp(np.arange(n),np.arange(len(ax))*441,ax)
  f=mf(60)*2**((ax*5)/12);ph=np.cumsum(f)/SR
  s=(np.sin(2*np.pi*ph)+0.4*np.sin(2*np.pi*1.005*ph*2))*(0.35+ax)*np.minimum(1,(t-t0)/0.3)*np.minimum(1,(t1-t)/0.1)
  add(t0,s,g)

def beep(t0,f,dur,g=0.25):
  n=int(dur*SR);t=np.arange(n)/SR;add(t0,np.sign(np.sin(2*np.pi*f*t))*0.5*np.minimum(1,t/0.005)*np.minimum(1,(dur-t)/0.02),g)
def trill(t0,dur=0.8,g=0.15):
  k=0;t=t0
  while t<t0+dur:add(t,bell(84 if k%2 else 88,0.12),g);k+=1;t+=0.06
def whoosh(t0,dur=0.6,g=0.4):
  n=int(dur*SR);r=np.random.RandomState(5).randn(n);t=np.arange(n)/SR
  w=int(SR*0.002);lp=np.convolve(r,np.ones(w)/w,'same');add(t0,lp*np.sin(np.pi*t/dur)*3,g)
def fanfare(t0,g=0.35):
  for j,(m,d) in enumerate([(72,0.15),(72,0.15),(72,0.15),(79,0.6)]):
    n=int(d*SR*1.6);tt=np.arange(n)/SR;f=mf(m);sq=np.sign(np.sin(2*np.pi*f*tt))*0.4+np.sin(2*np.pi*f*tt)
    add(t0+j*0.17,sq*np.minimum(1,tt/0.01)*np.exp(-tt/0.5),g*0.5)
  arp(t0+0.75,72,g)


import json
J=json.load(open('amarelinha_tl.json'));T=J['TL'];PL=J['PL']
def toc(t0,g=0.4):
  n=int(0.08*SR);tt=np.arange(n)/SR;add(t0,(np.sin(2*np.pi*900*tt)+0.5*np.sin(2*np.pi*1400*tt))*np.exp(-tt/0.02),g)
def plins(segs,base=72,g=0.22):
  lands=[s[0] for s in segs if s[1]=='ground']
  n=len(lands);half=(n+1)//2
  for i,t in enumerate(lands):
    k=i if i<half else n-1-i
    add(t,bell(base+[0,2,4,5,7,9,11,12,14][min(k,8)],0.35),g)
jingle(0.0,17.5,bpm=116,g=0.75)
toc(T['DLAND']);plins(PL['D']);arp(T['DE']+0.05,72,0.28)
whoosh(T['TREL']-0.2,0.6,0.25);toc(T['TLAND'])
jingle(18.0,23.1,bpm=140,semi=2,g=0.95)
bark(T['TGRAB']);bark(T['CH1']+0.5);bark(T['CH1']+0.85)
jingle(23.3,37.4,bpm=116,g=0.75)
toc(T['LLAND']);plins(PL['L'])
w=T['WB0']
for k in range(4):slide(w+0.05+k*0.4,500 if k%2 else 350,350 if k%2 else 500,0.38,0.12)
arp(T['WB1'],76,0.22)
bark(T['P0']+0.05);bark(T['P0']+0.4)
jingle(37.5,46.2,bpm=124,g=0.85)
toc(T['PDROP']+0.25,0.3);plins(PL['P'],79,0.18);arp(T['PSPIN']+0.1,79,0.3)
jingle(46.4,T['CJ'],bpm=116,g=0.8)
for segs in PL['F']:plins(segs,72,0.12)
arp(T['CJ'],72,0.4);add(T['CJ'],clap(),1.2)
jingle(T['CJ'],END,bpm=116,g=1.0,claps=True)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
t=np.arange(N)/SR;mix*=np.minimum(1,(END-t)/1.0)
mix=mix/np.max(np.abs(mix))*0.89
st=(np.repeat(mix[:,None],2,1)*32767).astype(np.int16)
w=wave.open('amarelinha.wav','wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(st.tobytes());w.close()
print('ok',N/SR)
