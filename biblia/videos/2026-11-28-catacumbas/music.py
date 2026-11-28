import numpy as np,json,wave
sr=44100;tl=json.load(open('timeline.json'));END=tl['end']+0.8;N=int(END*sr);t=np.arange(N)/sr
def f(n):return 440*2**((n-69)/12)
# Dm - Bb - F - A (solene)
CH=[[45,52,57,60],[41,48,57,60],[48,55,60,64],[40,47,56,59]]
pad=np.zeros(N)
for k in range(int(END//8)+2):
  s0=k*8.0;notes=CH[k%4]
  for n in notes:
    for det in (-0.06,0.06):
      fr=f(n)*(1+det/100)
      env=np.clip((t-s0)/2.5,0,1)*np.clip((s0+10.5-t)/2.5,0,1)
      pad+=env*(np.sin(2*np.pi*fr*t)+.3*np.sin(2*np.pi*2*fr*t))*.05
  # baixo
  b=f(notes[0]-12);env=np.clip((t-s0)/1.5,0,1)*np.clip((s0+9-t)/2,0,1);pad+=env*np.sin(2*np.pi*b*t)*.09
# brilho (arpejo suave de sinos)
arp=np.zeros(N);step=0.5
for i in range(int(END/step)):
  st=i*step;k=int(st//8)%4;n=CH[k][[0,2,1,3,2,1][i%6]]+12;s=int(st*sr);L=int(2.2*sr)
  if s+L>N:L=N-s
  tt=np.arange(L)/sr;arp[s:s+L]+=np.sin(2*np.pi*f(n)*tt)*np.exp(-tt*2.2)*.035*(0.6+0.4*((i%4)==0))
hb=np.zeros(N)
for l in tl['lines']:
  if l['id'] in ('L1','L2'):
    st=l['t0'];en=st+l['dur']
    k=st
    while k<en:
      for off,amp in ((0,1),(0.22,.6)):
        s0=int((k+off)*sr);L=int(.25*sr)
        if s0+L<N:
          tt=np.arange(L)/sr;hb[s0:s0+L]+=np.sin(2*np.pi*55*tt*(1-tt))*np.exp(-tt*18)*.5*amp
      k+=0.85
# sininhos de altar nas falas do sino
import json as _j
caps=_j.load(open('caps.json'));bel=np.zeros(N)
for l in tl['lines']:
  for w in caps.get(l['id'],[]):
    if w['w'].lower().startswith(('ressurrei','peixe')):
      st=l['t0']+w['t']
      for r in range(4):
        s0=int((st+r*.13)*sr);L=int(1.2*sr)
        if s0+L<N:
          tt=np.arange(L)/sr
          for fr,am in ((2093,1),(2637,.6),(3136,.4)):bel[s0:s0+L]+=np.sin(2*np.pi*fr*(1+r*.01)*tt)*np.exp(-tt*5)*.06*am
mus=pad+arp*.6+hb+bel
# eco simples
d=int(.37*sr);out=mus.copy()
for r in range(1,5):out[d*r:]+=mus[:-d*r]*(.35**r)
# crescendo no versículo
v=[l for l in tl['lines'] if l['id']=='L7'][0]['t0']
out*=1+0.6*np.clip((t-(v+4))/3,0,1)*np.clip((END-1-t)/3,0,1)
out=out/np.abs(out).max()*.9
w=wave.open('music.wav','w');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((out*32767).astype(np.int16).tobytes());w.close()
# mix com as falas (música abaixa durante a voz)
def rd(p):
  w=wave.open(p);a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(float)/32768;return a.reshape(-1,w.getnchannels()).mean(1)
voz=np.zeros(N);act=np.zeros(N)
for l in tl['lines']:
  a=rd(f"aud/{l['id']}.wav");a=a/np.abs(a).max()*.9;s=int(l['t0']*sr);e=min(N,s+len(a));voz[s:e]+=a[:e-s];act[max(0,s-int(.2*sr)):e+int(.25*sr)]=1
k=int(.3*sr);act=np.convolve(act,np.ones(k)/k,'same')
bed=out*(0.42-0.28*act);fo=int(1.5*sr);bed[-fo:]*=np.linspace(1,0,fo);fi=int(.8*sr);bed[:fi]*=np.linspace(0,1,fi)
m=voz+bed;m=m/max(1,np.abs(m).max()/.95)
w=wave.open('audio.wav','w');w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((m*32767).astype(np.int16).tobytes());w.close()
print('ok',END)
