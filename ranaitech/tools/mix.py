# Uso: python3 tools/mix.py aulas/aula-N
# Monta o áudio final: cada fala (aud/<ID>.wav) no seu t0 da timeline.json + música lo-fi de fundo
# (tools/lofi.wav) abaixando durante as falas. Saída: aulas/aula-N/audio.wav
import sys,json,wave,numpy as np
D=sys.argv[1]; sr=44100
def rd(p):
    w=wave.open(p); n=w.getnframes(); ch=w.getnchannels(); a=np.frombuffer(w.readframes(n),dtype=np.int16).astype(float)/32768
    return a.reshape(-1,ch).mean(1) if ch>1 else a
tl=json.load(open(D+'/timeline.json')); end=tl['end']+0.8; N=int(end*sr)
voz=np.zeros(N); act=np.zeros(N)
for l in tl['lines']:
    a=rd(f"{D}/aud/{l['id']}.wav"); a=a/(np.abs(a).max()+1e-9)*0.85
    s=int(l['t0']*sr); e=min(N,s+len(a)); voz[s:e]+=a[:e-s]; act[max(0,s-int(.15*sr)):e+int(.2*sr)]=1
k=int(.25*sr); act=np.convolve(act,np.ones(k)/k,'same')
bed=rd('tools/lofi.wav')
while len(bed)<N: bed=np.concatenate([bed,bed])
bed=bed[:N]/(np.abs(bed).max()+1e-9)*(0.30-0.20*act)
fi=int(.6*sr); bed[:fi]*=np.linspace(0,1,fi); fo=int(1.5*sr); bed[-fo:]*=np.linspace(1,0,fo)
out=voz+bed; out=out/max(1,np.abs(out).max()/0.95)
w=wave.open(D+'/audio.wav','w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
print('audio.wav',round(end,2),'s')
