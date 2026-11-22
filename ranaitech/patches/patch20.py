# Aula 20 — Arredondar e operações com números (dividir a conta da pizza: round, // e %)
# Uso (dentro de ranaitech/): python3 patches/patch20.py  -> aulas/aula-20/aula20.html + script.json
# (parte da aula 19)
import os, re, json
SRC = 'aulas/aula-19/aula19.html'; D = 'aulas/aula-20'; OUT = D + '/aula20.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula vinte: contas com números. Hoje vamos dividir a conta da pizza e arredondar o resultado.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Conta? Eu achei que programar era pra fugir da matemática!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Que nada, o computador faz as contas por você. A pizza custou cem reais e são três amigos.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Fácil! Total dividido por três... Trinta e três vírgula três, três, três... Socorro, os números não acabam!' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Isso é uma dízima. Pra arredondar, use a função round, com o valor e o número de casas decimais.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Round da divisão com duas casas. Trinta e três e trinta e três. Bem melhor!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Isso! E tem mais: duas barras fazem a divisão inteira, e o sinal de porcentagem dá o resto da divisão.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Cem, duas barras, três: trinta e três pra cada. E sobra um real. Esse real é meu!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Muito bem! Na próxima aula: classes. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou arredondar minha mesada pra cima!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, compartilha com quem divide a pizza com você e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "  var SPEC = {", "  function rebuild()", r'''  var SPEC = {
    P1: ['happy', 'happy'], C1: ['smirk', 'worried'], P2: ['happy', 'curious'], C2: ['proud', 'worried'],
    P3: ['smirk', 'curious'], C3: ['happy', 'proud'], P4: ['proud', 'curious'], C4: ['happy', 'joy'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'open'], ['P2', 0.3, 'ptBoard'], ['C2', 0, 'rest'],
    ['P3', 0, 'palms'], ['P3', 0.4, 'ptBoard'], ['C3', 0, 'rest'], ['P4', 0, 'palms'], ['P4', 0.3, 'ptBoard'], ['C4', 0, 'crossed'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'fidget'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['C2', 0.6, 'fidget'], ['P3', 0, 'droop'], ['C3', 0, 'up2'], ['C3', 0.7, 'cheer'], ['P4', 0, 'chin'],
    ['C4', 0, 'up2'], ['C4', 0.7, 'cheer'], ['P5', 0, 'rest'], ['P5', 0.12, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

''')

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P3', 0.42),
      L0: ev('P2', 0.55), L1: ev('P2', 0.8), L2: ev('C2', 0.12), O1: ev('C2', 0.4),
      B0: ev('P3', 0.55), O2: ev('C3', 0.5), B1: ev('P4', 0.3), B2: ev('P4', 0.62), O3: ev('C4', 0.2), O4: ev('C4', 0.55),
      pH: ev('P2', 0.65), pS: ev('C2', 0.62), nada: ev('P3', 0.2), lemb: ev('C3', 0.55), pC: ev('C4', 0.22), pD: ev('C4', 0.55), pE: ev('C4', 0.8),
      hop: ev('C4', 0.8), jump: ev('P5', 0.1), err: ev('C2', 0.62),
      noteI: ev('C1', 0.2), hashI: ev('P2', 0.05), okA: ev('C2', 0.75), noI: ev('C3', 0.7), noteI2: ev('P4', 0.1),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l0 = n(EV.L0, 11), l1 = n(EV.L1, 11), l2 = nS(EV.L2, 1.0, 22), o1 = nS(EV.O1, 1.2, 17);
    var b0 = nS(EV.B0, 1.3, 26), o2 = n(EV.O2, 7), b1 = nS(EV.B1, 0.9, 17), b2 = nS(EV.B2, 0.9, 16), o3 = n(EV.O3, 4), o4 = n(EV.O4, 3);
    var hlA = tt > EV.nada && tt < EV.w1, hlB = tt > EV.O2 && tt < BYID.P4.t0;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l1, l2, o1, b0, o2, b1, b2, o3, o4, hlA, hlB, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('round()', 512, 190);
      bx.fillStyle = '#ffffff'; bx.font = '700 56px ' + FD; bx.fillText('= contas e arredondar', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 48px ' + FM;
      if (hlA) { bx.fillStyle = 'rgba(255,154,154,0.16)'; bx.fillRect(35, 388, 700, 70); }
      bx.fillStyle = '#ffd6a0'; bx.fillText('total = 100'.slice(0, l0), 50, 80);
      bx.fillStyle = '#ffd6a0'; bx.fillText('amigos = 3'.slice(0, l1), 50, 160);
      bx.fillStyle = '#ffffff'; bx.fillText('print(total / amigos)'.slice(0, l2), 50, 260);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> 33.3333333333...'.slice(0, o1), 50, 423);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      if (hlB) { bx.fillStyle = 'rgba(154,242,200,0.18)'; bx.fillRect(35, 112, 320, 64); }
      bx.fillStyle = '#7fd4ff'; bx.fillText('print(round(total / 3, 2))'.slice(0, b0), 50, 65);
      bx.fillStyle = '#9af2c8'; bx.fillText('> 33.33'.slice(0, o2), 50, 144);
      bx.fillStyle = '#c9a8ff'; bx.fillText('print(total // 3)'.slice(0, b1), 50, 240);
      bx.fillStyle = '#9af2c8'; bx.fillText('> 33'.slice(0, o3), 620, 240);
      bx.fillStyle = '#ffd6a0'; bx.fillText('print(total % 3)'.slice(0, b2), 50, 330);
      bx.fillStyle = '#9af2c8'; bx.fillText('> 1'.slice(0, o4), 620, 330);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('total', '100', '#4a90e2'), 0.9, 0.53), rPula = mkPlane(resTex('DÍZIMA!', '#e0484f'), 0.9, 0.53);
  var rNada = mkPlane(resTex('round()', '#7a5cf0'), 0.9, 0.53);
  var rLemb = mkPlane(panelTex('cada um', '33.33', '#2fae7a'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('100 // 3', '33', '#7a5cf0'), 0.9, 0.53), pn2 = mkPlane(panelTex('100 % 3', '1', '#e9893b'), 0.9, 0.53);
  var pnE = mkPlane(resTex('É MEU!', '#e9893b'), 0.9, 0.53);''')

S = cut(S, "    win(pnH, tt,", "    SWAY.forEach", r'''    win(pnH, tt, EV.pH, EV.w1 - 0.3, -1.0, 2.3, 1, hide);
    win(rPula, tt, EV.pS, EV.w1 - 0.3, 0.1, 2.3, 2, hide);
    win(rNada, tt, EV.nada, EV.w1 - 0.3, 1.2, 2.3, 3, hide);
    win(rLemb, tt, EV.lemb, BYID.P4.t0, 0.1, 2.3, 2, hide);
    win(pn3, tt, EV.pC, 999, -1.0, 2.3, 1, hide);
    win(pn2, tt, EV.pD, 999, 0.1, 2.3, 2, hide);
    win(pnE, tt, EV.pE, 999, 1.2, 2.3, 3, hide);
    [pnH, rPula, rNada, rLemb, pn3, pn2, pnE].forEach(function (m) { if (hide < 0.02) m.visible = false; });

    showIcon(icNote, tt, EV.noteI, 1.8, 2.15, 2.55);
    showIcon(icHash, tt, EV.hashI, 1.6, -2.15, 2.6);
    showIcon(icOkA, tt, EV.okA, 1.4, 2.15, 2.55);
    showIcon(icNo, tt, EV.noI, 1.4, 2.15, 2.55);
    showIcon(icNote2, tt, EV.noteI2, 1.6, -2.15, 2.6);
    showIcon(icOkB, tt, EV.okB, 1.4, -2.15, 2.6);
    showIcon(icNote3, tt, EV.noteI3, 1.3, 2.15, 2.55);
    showIcon(icHeart, tt, EV.heart, 99, -1.0, 2.5);
    showIcon(icShare, tt, EV.share, 99, 0, 2.5);
    showIcon(icPlus, tt, EV.plus, 99, 1.0, 2.5);
''')

S = cut(S, "  var icNote = mkIcon(", "\n\n  var CONF", r'''  var icNote = mkIcon('alert', '', 0.5), icHash = mkIcon('pizza', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('ok', '', 0.5),
      icNote2 = mkIcon('note', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('note', '', 0.5),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);''')

S = rep(S, 'ensina escopo de variável a um aluno desastrado', 'ensina contas e arredondamento a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
