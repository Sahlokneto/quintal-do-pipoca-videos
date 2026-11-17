# uso: python3 mkthumb.py nome "frameOn(ALL,0,24,46,0.28)"  -> work/nome_thumb.html
import sys
n,expr=sys.argv[1],sys.argv[2]
s=open('work/%s.html'%n).read()
s=s.replace('width="720" height="1280"','width="1080" height="1920"').replace('var W=720,H=1280;','var W=1080,H=1920;')
s=s.replace('var c=window.CO||cam(t);','var c=window.CO||(window.TCAM?window.TCAM(t):cam(t));')
s=s.replace('window.frame=frame;','window.NOBUB=1;window.TCAM=function(t){return %s;};window.frame=frame;'%expr,1)
open('work/%s_thumb.html'%n,'w').write(s)
