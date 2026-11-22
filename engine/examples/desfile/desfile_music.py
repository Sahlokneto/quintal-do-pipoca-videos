import sys,os,json;sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
from qp_music import *
D=json.load(open(sys.argv[1]))['TL'];T=D['T'];EV=D['EV']
def runwaybeat(t0,t1,semi=0,g=0.8):
  b=60/116;t=t0;k=0
  while t<t1-0.02:
    add(t,kick(),0.6*g if k%2==0 else 0.2*g);add(t+b/2,hat(),g)
    if k%2==1:add(t,clap(),0.6*g)
    add(t,bassn(36+semi+(7 if k%4==2 else 0),b*0.8),0.9*g);t+=b;k+=1
def theme(t0,kind,g=0.2):
  M={'leo':[62,65,69,67,65,62],'bia':[84,88,91,96,91,88],'teo':[72,79,84,91,86,79],'duda':[67,72,76,79,84,79]}[kind];d={'leo':0.3,'bia':0.22,'teo':0.4,'duda':0.18}[kind]
  for i,m in enumerate(M):
    add(t0+i*d,bell(m,0.6) if kind!='leo' else pluck(m,0.4),g if kind!='leo' else g*1.8)
jingle(0,T['OPEN'],bpm=116,semi=0,g=0.75)
runwaybeat(T['OPEN']+1.8,T['DOG'],0,0.8)
runwaybeat(T['DRUN'],T['FIM'],2,0.9)
for t,ty in EV:
  if ty=='bark':bark(t,0.3);bark(t+0.25,0.25)
  if ty=='open':slide(t,200,500,0.4,0.12);trill(t+0.3,0.8,0.12)
  if ty=='fly':whoosh(t,0.5,0.2)
  if ty=='pop':plop(t,79,0.3);add(t,bell(88,0.5),0.15)
  if ty in('leo','bia','teo','duda'):theme(t,ty)
  if ty=='dog':theme(t,'bia',0.22)
  if ty=='pose':add(t,bell(96,0.4),0.12);add(t+0.12,bell(100,0.4),0.1);add(t,clap(),0.8);add(t+0.25,clap(),0.7);add(t+0.5,clap(),0.6)
  if ty=='dive':splash(t,0.25);thud(t+0.1,0.4)
  if ty=='popd':boing(t,0.3);arp(t+0.1,76,0.28)
  if ty=='confetti':fanfare(t,0.33);add(t,clap(),1.0)
# baú tremendo
for k in range(8):tom(50);add(T['DIVE']+0.6+k*0.13,tom(48+(k%2)*3),0.18)
jingle(T['FIM']+0.6,END,bpm=116,semi=0,g=1.0,claps=True)
e=END-1.6
add(e,bell(60,1.5),0.3);add(e,bell(64,1.5),0.25);add(e,bell(67,1.5),0.25);add(e,bell(72,1.5),0.3)
save(sys.argv[2])
