# Chamada para seguir no fim do vídeo (card "Gostou? Siga o canal!", joinha, sininho, botão SEGUIR e dedinho clicando).
# Uso (dentro de engine/):  python3 tools/cta.py entrada.mp4 saida.mp4 [segundos=4.5] [y_topo=0.10]
# Desenha no topo da tela (acima dos personagens) durante os últimos N segundos. O plano final da câmera deve
# deixar ~35% de cima da tela livre (céu/fundo) para o card não cobrir ninguém.
import sys, os, math, subprocess, tempfile, shutil
from PIL import Image, ImageDraw, ImageFont
inp, out = sys.argv[1], sys.argv[2]
DUR = float(sys.argv[3]) if len(sys.argv) > 3 else 4.5
YT = float(sys.argv[4]) if len(sys.argv) > 4 else 0.10
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'cta')
probe = lambda k: subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', k, '-of', 'csv=p=0', inp], capture_output=True, text=True).stdout.strip()
W, H = map(int, probe('stream=width,height').split(','))
FPS = 24
TOT = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', inp], capture_output=True, text=True).stdout)
START = max(0.0, TOT - DUR)
s = W / 720.0
font = lambda px: ImageFont.truetype(os.path.join(A, 'Poppins-Bold.ttf'), int(px * s))
ic = {k: Image.open(os.path.join(A, k + '.png')).convert('RGBA') for k in ('like', 'bell', 'finger', 'heart')}

def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def back(u):  # pulo com "overshoot"
    u = clamp(u); c1 = 1.70158; c3 = c1 + 1
    return 1 + c3 * (u - 1) ** 3 + c1 * (u - 1) ** 2
def paste(base, im, cx, cy, sc, rot=0.0):
    if sc <= 0.01: return
    im = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.LANCZOS)
    if rot: im = im.rotate(rot, resample=Image.BICUBIC, expand=True)
    base.alpha_composite(im, (int(cx - im.width / 2), int(cy - im.height / 2)))
def pill(w, h, fill, txt, fnt, tc=(255, 255, 255)):
    im = Image.new('RGBA', (w + 12, h + 16), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((6, 12, w + 6, h + 12), h // 2, fill=(0, 0, 0, 70))      # sombra
    d.rounded_rectangle((6, 4, w + 6, h + 4), h // 2, fill=fill)
    d.text((w / 2 + 6, h / 2 + 4), txt, font=fnt, fill=tc, anchor='mm')
    return im

cardW, cardH = int(600 * s), int(118 * s)
card = Image.new('RGBA', (cardW + 16, cardH + 20), (0, 0, 0, 0)); d = ImageDraw.Draw(card)
d.rounded_rectangle((8, 16, cardW + 8, cardH + 16), int(34 * s), fill=(0, 0, 0, 60))
d.rounded_rectangle((8, 4, cardW + 8, cardH + 4), int(34 * s), fill=(255, 255, 255, 240), outline=(255, 196, 0, 255), width=int(6 * s))
d.text((cardW / 2 + 8, cardH * 0.38 + 4), 'Gostou da brincadeira?', font=font(34), fill=(60, 60, 80), anchor='mm')
d.text((cardW / 2 + 8, cardH * 0.74 + 4), 'Siga o canal!', font=font(40), fill=(235, 70, 90), anchor='mm')
btnW, btnH = int(300 * s), int(84 * s)
btn_red = pill(btnW, btnH, (235, 45, 60, 255), '+ SEGUIR', font(40))
btn_ok = pill(btnW, btnH, (60, 190, 110, 255), 'SEGUINDO!', font(38))

cx = W / 2; cardY = H * YT + cardH / 2; rowY = cardY + cardH / 2 + int(95 * s)
tmp = tempfile.mkdtemp(); n = int(math.ceil(DUR * FPS)) + 2
for i in range(n):
    t = i / FPS; fr = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    out_u = clamp((DUR - 0.35 - t) / 0.35)  # some no finalzinho
    k = back(t / 0.45) * out_u
    paste(fr, card, cx, cardY - (1 - clamp(t / 0.45)) * 60 * s, k)
    # joinha (esquerda), botão (centro), sininho (direita)
    kl = back((t - 0.35) / 0.4) * out_u
    paste(fr, ic['like'], cx - 250 * s, rowY, 0.95 * s * kl * (1 + 0.12 * math.sin(t * 9) * (t > 0.8)), 12 * math.sin(t * 6))
    kb = back((t - 0.55) / 0.4) * out_u
    tap = clamp(1 - abs(t - 1.9) / 0.12)  # aperto do botão
    paste(fr, btn_ok if t > 1.95 else btn_red, cx, rowY, kb * (1 - 0.08 * tap))
    kn = back((t - 0.75) / 0.4) * out_u
    paste(fr, ic['bell'], cx + 250 * s, rowY, 0.9 * s * kn, 22 * math.sin(t * 14) * (0.8 < t < 3.2))
    # dedinho entra, clica no botão e sai
    if 1.1 < t < DUR - 0.3:
        u = clamp((t - 1.1) / 0.6); fx = cx + (1 - u) * 260 * s + 40 * s; fy = rowY + 90 * s + (1 - u) * 160 * s - 30 * s * tap
        paste(fr, ic['finger'], fx, fy, 0.85 * s * out_u)
    if t > 1.95:  # coraçõezinhos subindo depois do clique
        for j in range(5):
            v = t - 1.95 - j * 0.12
            if 0 < v < 1.3: paste(fr, ic['heart'], cx + (j - 2) * 70 * s, rowY - 30 * s - v * 110 * s, 0.34 * s * clamp(1.3 - v) * out_u)
    fr.save(f'{tmp}/c{i:04d}.png')
fc = (f"[1:v]setpts=PTS+{START:.3f}/TB[c];[0:v][c]overlay=0:0:eof_action=pass:format=auto[v]")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', inp, '-framerate', str(FPS), '-i', f'{tmp}/c%04d.png', '-filter_complex', fc,
                '-map', '[v]', '-map', '0:a?', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p',
                '-c:a', 'copy', '-movflags', '+faststart', out], check=True)
shutil.rmtree(tmp); print('ok', out, f'(card de {START:.1f}s a {TOT:.1f}s)')
