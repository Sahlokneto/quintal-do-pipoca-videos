# caps.py — legenda sincronizada com a voz (sem gastar créditos)
# Uso: python3 caps.py <pasta-do-video> <pagina.html>
# Lê LINES da página e aud/Lx.wav; acha as pausas reais da fala (silêncios) e prende o fim de cada frase
# (vírgula/ponto) na pausa correspondente. Dentro da frase, distribui as palavras pelo tamanho.
# Grava caps.json e injeta "window.CAPS=..." na página (entre /*CAPS*/ ... /*CAPS_END*/).
import sys, re, json, wave, struct, os
import numpy as np
d, page = sys.argv[1], sys.argv[2]
html = open(os.path.join(d, page), encoding='utf-8').read()
lines = re.findall(r"\['(L\d+)','((?:[^'\\]|\\.)*)'\]", html[html.index('var LINES='):])
def words_of(txt):
    toks, bold = [], False
    for p in re.split(r'(<b>|</b>)', txt.replace("\\'", "'")):
        if p == '<b>': bold = True; continue
        if p == '</b>': bold = False; continue
        for w in p.split():
            if re.fullmatch(r'[.,!?:;]+', w) and toks: toks[-1][0] += w; continue
            toks.append([w, bold])
    return toks
def pauses(wav):
    w = wave.open(wav); n = w.getnframes(); sr = w.getframerate(); ch = w.getnchannels()
    a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32)
    if ch > 1: a = a.reshape(-1, ch).mean(1)
    hop = int(sr * .01); env = np.array([np.sqrt(np.mean(a[i:i + hop] ** 2)) for i in range(0, len(a) - hop, hop)])
    thr = max(env.max() * .06, 120); sil = env < thr; gaps = []; i = 0
    while i < len(sil):
        if sil[i]:
            j = i
            while j < len(sil) and sil[j]: j += 1
            if (j - i) >= 9 and i > 5 and j < len(sil) - 5: gaps.append(((i + j) / 2 * .01, (j - i) * .01))
            i = j
        else: i += 1
    return gaps, len(a) / sr
out = {}
for lid, txt in lines:
    toks = words_of(txt); gaps, dur = pauses(os.path.join(d, 'aud', lid + '.wav'))
    # frases = até cada pontuação
    ph, cur = [], []
    for tk in toks:
        cur.append(tk)
        if re.search(r'[.,!?:;]$', tk[0]): ph.append(cur); cur = []
    if cur: ph.append(cur)
    k = len(ph) - 1
    # escolhe as k maiores pausas (em ordem de tempo) como fronteiras das frases
    gsel = sorted(sorted(gaps, key=lambda g: -g[1])[:k], key=lambda g: g[0])
    bounds = [0.0] + [g[0] for g in gsel] + [dur]
    if len(bounds) != len(ph) + 1:  # poucas pausas: proporcional ao tamanho
        tot = sum(sum(len(w[0]) + 1 for w in p) for p in ph); acc = 0; bounds = [0.0]
        for p in ph: acc += sum(len(w[0]) + 1 for w in p); bounds.append(dur * acc / tot)
    W = []
    for p, a, b in zip(ph, bounds[:-1], bounds[1:]):
        b2 = b - (0.12 if b < dur else 0); tot = sum(len(w[0]) + 2 for w in p); acc = 0
        for w in p: W.append({'w': w[0], 'b': w[1], 't': round(a + (b2 - a) * acc / tot, 3)}); acc += len(w[0]) + 2
    out[lid] = W
open(os.path.join(d, 'caps.json'), 'w').write(json.dumps(out, ensure_ascii=False))
inj = '/*CAPS*/window.CAPS=' + json.dumps(out, ensure_ascii=False) + ';/*CAPS_END*/'
html = re.sub(r'/\*CAPS\*/.*?/\*CAPS_END\*/', lambda m: inj, html, flags=re.S) if '/*CAPS*/' in html else html.replace('<script>', '<script>' + inj, 1)
open(os.path.join(d, page), 'w', encoding='utf-8').write(html)
print({k: len(v) for k, v in out.items()})
