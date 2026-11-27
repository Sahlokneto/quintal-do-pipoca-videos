# Aula 24 — Módulos (import) (o Cubinho chama sqrt sem importar o math, dá NameError e "a raiz sumiu")
# Uso (dentro de ranaitech/): python3 patches/patch24.py  -> aulas/aula-24/aula24.html + script.json
# (parte da aula 23; adiciona o ícone 'box' = caixa de ferramentas)
import os, re, json
SRC = 'aulas/aula-23/aula23.html'; D = 'aulas/aula-24'; OUT = D + '/aula24.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula vinte e quatro: módulos. Um módulo é uma caixa de ferramentas pronta pra gente usar.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Caixa de ferramentas? Adoro! Só não sei usar nenhuma...' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Vamos ver! O módulo math sabe fazer contas difíceis, como a raiz quadrada de um número.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Fácil! Eu peço a raiz de dezesseis... Ué, NameError? A raiz sumiu!' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Calma! Primeiro você precisa trazer a caixa. Escreva import math no começo, e depois use math ponto sqrt.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Ah, é tipo pegar a caixa no armário antes de procurar o martelo!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Exato! Agora a raiz de dezesseis dá quatro. E lembra do random? Ele também é um módulo!' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Então o import traz a caixa, e o ponto pega a ferramenta. Vou importar tudo!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Muito bem! Na próxima aula: fatiar listas. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou arrumar minha caixa de ferramentas!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curtiu? Deixa o like, compartilha com quem quer programar e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P3', 0.3),
      L0: ev('P2', 0.45), L1: 999, L2: ev('C2', 0.45), L3: 999, O1: ev('C2', 0.6),
      B0: ev('P3', 0.4), B1: ev('P3', 0.75), B2: ev('P4', 0.05), B4: ev('P4', 0.6), O2: 999, B3: ev('C4', 0.15), O3: 999,
      pH: ev('P2', 0.6), pS: ev('C2', 0.6), nada: ev('C2', 0.8), lemb: ev('P3', 0.42), pC: ev('P3', 0.42), pD: ev('P3', 0.78), pE: ev('P4', 0.25),
      hop: ev('C4', 0.82), jump: ev('P5', 0.1), err: ev('C2', 0.6),
      noteI: ev('P1', 0.6), hashI: ev('C1', 0.2), okA: ev('C2', 0.7), noI: ev('C3', 0.2), noteI2: ev('P4', 0.6),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.22), share: ev('P6', 0.45), plus: ev('P6', 0.75), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l0 = nS(EV.L0, 1.1, 16), l2 = nS(EV.L2, 1.0, 26), o1 = nS(EV.O1, 0.9, 25);
    var b0 = nS(EV.B0, 0.8, 11), b1 = nS(EV.B1, 1.1, 21), b2 = nS(EV.B2, 0.5, 5), b4 = nS(EV.B4, 0.9, 13), b3 = nS(EV.B3, 1.1, 25);
    var hlA = tt > EV.L2 && tt < EV.w1, hlB = tt > EV.B0 && tt < BYID.C3.t0 + 0.6;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l2, o1, b0, b1, b2, b4, b3, hlA, hlB, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 140px ' + FM; bx.fillText('import', 512, 190);
      bx.fillStyle = '#ffffff'; bx.font = '700 56px ' + FD; bx.fillText('= usar módulos prontos', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      if (hlA) { bx.fillStyle = 'rgba(255,154,154,0.18)'; bx.fillRect(35, 70, 600, 76); }
      bx.fillStyle = '#7fd4ff'; bx.fillText('print(sqrt(16))'.slice(0, l0), 50, 108);
      bx.fillStyle = '#ff9a9a'; bx.fillText("> NameError: 'sqrt'".slice(0, l2), 50, 270);
      bx.fillStyle = '#ffd6a0'; bx.fillText('# sqrt = raiz quadrada'.slice(0, o1), 50, 400);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 44px ' + FM;
      if (hlB) { bx.fillStyle = 'rgba(154,242,200,0.18)'; bx.fillRect(35, 30, 420, 72); }
      bx.fillStyle = '#9af2c8'; bx.fillText('import math'.slice(0, b0), 50, 66);
      bx.fillStyle = '#7fd4ff'; bx.fillText('print(math.sqrt(16))'.slice(0, b1), 50, 160);
      bx.fillStyle = '#ffd6a0'; bx.fillText('> 4.0'.slice(0, b2), 50, 250);
      bx.fillStyle = '#c9c9c9'; bx.fillText('import random'.slice(0, b4), 50, 345);
      bx.fillStyle = '#ffe69a'; bx.fillText('# import traz, ponto usa'.slice(0, b3), 50, 450);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('math', 'raiz', '#4a90e2'), 0.9, 0.53), rPula = mkPlane(resTex('ERRO!', '#e0484f'), 0.9, 0.53);
  var rNada = mkPlane(resTex('SUMIU!', '#7a5cf0'), 0.9, 0.53);
  var rLemb = mkPlane(panelTex('import', 'traz', '#2fae7a'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('import', 'traz', '#2fae7a'), 0.9, 0.53), pn2 = mkPlane(panelTex('math.', 'usa', '#e9893b'), 0.9, 0.53);
  var pnE = mkPlane(resTex('4.0', '#e9893b'), 0.9, 0.53);''')
# rLemb e pn3 dividem o mesmo lugar e momento: some com o rLemb (fica só o pn3)
S = rep(S, "    win(rLemb, tt, EV.lemb, EV.pD - 0.3, 0.1, 2.3, 2, hide);\n", "")

# ícone novo: caixa de ferramentas
S = rep(S, "dice: '#e9893b', heart:", "dice: '#e9893b', box: '#7a5cf0', heart:")
S = rep(S, "      if (kind === 'heart')", r'''      if (kind === 'box') {
        x.lineWidth = 14; x.beginPath(); rr(x, 96, 62, 64, 40, 10); x.stroke();
        x.beginPath(); rr(x, 50, 92, 156, 98, 14); x.fill();
        x.fillStyle = C; x.fillRect(50, 126, 156, 10); x.fillRect(116, 116, 24, 30);
      }
      if (kind === 'heart')''')

S = cut(S, "  var icNote = mkIcon(", "\n\n  var CONF", r'''  var icNote = mkIcon('box', '', 0.5), icHash = mkIcon('box', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('box', '', 0.5),
      icNote2 = mkIcon('dice', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('box', '', 0.5),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);''')

S = rep(S, 'ensina try e except a um aluno desastrado', 'ensina módulos (import) a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
