# build2.py <pasta> <P|S> <vars.css> <cards.html> <base.js> <scenes.js>
import sys,re,json
d,key,vf,cf,bf,sf=sys.argv[1:]
base=open('/home/claude/quintal-do-pipoca-videos/biblia/videos/2026-11-26-incenso/bib.html',encoding='utf-8').read()
base=re.sub(r'/\*CAPS\*/.*?/\*CAPS_END\*/','',base,flags=re.S)
base=re.sub(r':root\{[^}]*\}',open(vf).read().strip(),base,count=1)
a=base.index('<div id="c1"');b=base.index('<div id="q"');base=base[:a]+open(cf,encoding='utf-8').read()+base[b:]
L=json.load(open('../lines.json'))[key]
lines='var LINES=['+',\n'.join("['L%d','%s']"%(i+1,s.replace("'","\\'")) for i,s in enumerate(L))+'];\n'
a=base.index('var LINES=');b=base.index('var T={}');base=base[:a]+lines+base[b:]
a=base.index('// paleta')
R=lambda f:open(f,encoding='utf-8').read()
base=base[:a]+R('lib2.js')+'\n'+R(bf)+'\n'+R(sf)+'\n'+R('tail2.js')
open(d+'/bib.html','w',encoding='utf-8').write(base)
print('ok')
