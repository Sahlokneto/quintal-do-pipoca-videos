import numpy as np, wave
sr=44100; bpm=75; beat=60/bpm; bar=4*beat; dur=92.6
rng=np.random.default_rng(7)
N=int(sr*dur); out=np.zeros(N)
def add(buf,start,sig):
    s=int(start*sr); e=min(N,s+len(sig))
    if s<N: buf[s:e]+=sig[:e-s]
def midi(m): return 440*2**((m-69)/12)
def rhodes(f,length,vel=1.0):
    t=np.arange(int(sr*length))/sr
    s=np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*2*f*t)*np.exp(-t*5)+0.12*np.sin(2*np.pi*3.01*f*t)*np.exp(-t*9)
    s*=np.exp(-t*1.6)*(1-np.exp(-t*90))
    s*=1+0.08*np.sin(2*np.pi*4.5*t)
    return s*vel
chords=[[50,53,57,60,64],[43,53,59,64,67],[48,55,59,62,64],[45,52,55,60,64]]  # Dm9 G13 Cmaj9 Am9
basses=[38,31,36,33]
swing=0.06
nb=int(dur/bar)+1
for b in range(nb):
    c=chords[b%4]; t0=b*bar
    for i,m in enumerate(c):
        add(out,t0+i*0.012,0.11*rhodes(midi(m),bar*1.05))
    # bass
    tt=np.arange(int(sr*beat*1.8))/sr
    bs=np.sin(2*np.pi*midi(basses[b%4])*tt)*np.exp(-tt*1.4)*(1-np.exp(-tt*60))
    add(out,t0,0.30*bs); add(out,t0+2.5*beat,0.22*bs[:int(sr*beat)])
    # drums
    for k in (0,2.5):
        tt=np.arange(int(sr*0.25))/sr
        kick=np.sin(2*np.pi*(48+90*np.exp(-tt*30))*tt)*np.exp(-tt*14)
        add(out,t0+k*beat,0.55*kick)
    for k in (1,3):
        tt=np.arange(int(sr*0.2))/sr
        sn=rng.standard_normal(len(tt))*np.exp(-tt*22)
        sn=np.convolve(sn,np.ones(6)/6,mode='same')
        add(out,t0+k*beat+0.01,0.22*sn)
    for k in range(8):
        tt=np.arange(int(sr*0.05))/sr
        h=rng.standard_normal(len(tt))*np.exp(-tt*90)
        h=h-np.convolve(h,np.ones(8)/8,mode='same')
        off=(k*0.5)*beat+(swing if k%2 else 0)
        add(out,t0+off,(0.07 if k%2 else 0.10)*h)
# vinyl crackle
cr=np.zeros(N); idx=rng.integers(0,N,int(dur*14))
for i in idx: cr[i:i+30]+=rng.standard_normal(min(30,N-i))*rng.uniform(0.01,0.05)
out+=cr+rng.standard_normal(N)*0.003
# lowpass ~3.2k (one-pole x3)
a=np.exp(-2*np.pi*3200/sr)
for _ in range(3):
    y=np.zeros(N); z=0.0
    for i in range(N):
        z=(1-a)*out[i]+a*z; y[i]=z
    out=y
fade=int(sr*2.0); out[:fade]*=np.linspace(0,1,fade); out[-int(sr*3):]*=np.linspace(1,0,int(sr*3))
out=out/np.max(np.abs(out))*0.9
w=wave.open('lofi.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
