import sys,glob
from PIL import Image,ImageDraw
fs=sorted(glob.glob('cz*.jpg'));ts=sys.argv[2].split(',')
W,H=240,427;cols=6;rows=(len(fs)+cols-1)//cols
S=Image.new('RGB',(W*cols,H*rows),'white');d=ImageDraw.Draw(S)
for i,f in enumerate(fs):
  im=Image.open(f).resize((W,H));S.paste(im,((i%cols)*W,(i//cols)*H));d.text(((i%cols)*W+5,(i//cols)*H+5),ts[i],fill='red')
S.save(sys.argv[1])
