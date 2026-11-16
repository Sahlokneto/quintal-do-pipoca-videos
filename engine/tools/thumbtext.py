# uso: python3 tools/thumbtext.py th0.png saida.png "LINHA 1" "LINHA 2" "FAIXA DE BAIXO" "#corHexDaFaixa"
import sys
from PIL import Image,ImageDraw,ImageFont,ImageFilter
src,dst,l1,l2,band,col=sys.argv[1:7]
im=Image.open(src).convert('RGBA');W,H=im.size
F='/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf'
def fit(t,s,maxw):
  d=ImageDraw.Draw(im)
  while True:
    f=ImageFont.truetype(F,s)
    if d.textlength(t,font=f)<=maxw:return f
    s-=4
T=[(70,l1,fit(l1,140,990),'#ffffff'),(225,l2,fit(l2,200,1000),'#FFD23F')]
sh=Image.new('RGBA',im.size,(0,0,0,0));ds=ImageDraw.Draw(sh)
for y,t,f,c in T:
  w=ds.textlength(t,font=f);ds.text(((W-w)/2+10,y+14),t,font=f,fill=(0,0,0,120),stroke_width=14,stroke_fill=(0,0,0,120))
sh=sh.filter(ImageFilter.GaussianBlur(8));im=Image.alpha_composite(im,sh);d=ImageDraw.Draw(im)
for y,t,f,c in T:
  w=d.textlength(t,font=f);d.text(((W-w)/2,y),t,font=f,fill=c,stroke_width=14,stroke_fill='#2b2b3a')
f=fit(band,100,940);w=d.textlength(band,font=f)
y=H-300;d.rounded_rectangle(((W-w)/2-50,y-10,(W+w)/2+50,y+132),radius=66,fill=col,outline='#2b2b3a',width=10)
d.text(((W-w)/2,y+4),band,font=f,fill='#ffffff',stroke_width=6,stroke_fill='#2b2b3a')
im.convert('RGB').save(dst)
