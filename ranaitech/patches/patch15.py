# Aula 15 — Números aleatórios (import random, random.randint; o Cubinho "trapaceia" com dado = 6)
# Uso (dentro de ranaitech/): python3 patches/patch15.py  -> aulas/aula-15/aula15.html + script.json
# (parte da aula 14, que já tem os ícones chat/keyb/dice)
import os, re, json
SRC = 'aulas/aula-14/aula14.html'; D = 'aulas/aula-15'; OUT = D + '/aula15.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula quinze: números aleatórios. É o computador sorteando um número, tipo jogar um dado!' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Oba! Eu adoro jogo de tabuleiro!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Primeiro, import random. Depois, dado igual a random ponto randint, de um a seis. Cada vez sai um número diferente.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Deixa comigo! Joguei... seis! De novo... seis! Eu sou o rei do dado!' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Hum, deixa eu ver seu código... Dado igual a seis? Isso não é sorteio, Cubinho, é trapaça!' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Ops... Fui pego no flagra!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Com o randint, o computador escolhe sozinho. Olha: saiu três, depois um, depois cinco. Ninguém sabe o próximo!' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Agora é sorte de verdade! Vou jogar... deu dois. Ai, ai.' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Faz parte do jogo! Na próxima aula: dicionários na prática. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Até amanhã, se o dado deixar!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, compartilha com a turma do jogo e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "  var SPEC = {", "  function rebuild()", r'''  var SPEC = {
    P1: ['happy', 'happy'], C1: ['happy', 'eureka'], P2: ['happy', 'curious'], C2: ['curious', 'smirk'],
    P3: ['worried', 'smirk'], C3: ['worried', 'hurt'], P4: ['proud', 'curious'], C4: ['happy', 'worried'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'open'], ['P2', 0.2, 'ptBoard'], ['C2', 0, 'crossed'],
    ['P3', 0, 'crossed'], ['P3', 0.6, 'ptBox'], ['C3', 0, 'crossed'], ['P4', 0, 'palms'], ['P4', 0.4, 'ptBoard'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'cheer'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['C2', 0.7, 'cheer'], ['P3', 0, 'fidget'], ['C3', 0, 'droop'], ['P4', 0, 'chin'],
    ['C4', 0, 'up2'], ['C4', 0.75, 'droop'], ['P5', 0, 'rest'], ['P5', 0.12, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

''')

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P4', 0.05),
      L1: ev('P2', 0.08), L2: ev('P2', 0.35), L3: ev('C2', 0.2), L4: ev('C2', 0.45),
      B0: ev('P4', 0.1) + 0.8, B1: ev('P4', 0.1) + 1.4, B2: ev('P4', 0.1) + 2.4,
      pH: ev('P2', 0.5), pS: ev('P2', 0.78), nada: ev('P3', 0.68), pC: ev('P4', 0.48), pE: ev('P4', 0.85), lemb: ev('C4', 0.15),
      hop: ev('C1', 0.3), jump: ev('P5', 0.1), err: ev('P3', 0.68),
      noteI: ev('C1', 0.2), hashI: ev('P2', 0.05), okA: ev('C2', 0.6), noI: ev('C3', 0.1), noteI2: ev('C4', 0.75),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l1 = n(EV.L1, 13), l2 = nS(EV.L2, 1.0, 27), l3 = n(EV.L3, 17), l4 = nS(EV.L4, 2.0, 22), b0 = n(EV.B0, 13), b1 = nS(EV.B1, 1.0, 27), b2 = n(EV.B2, 11);
    var c = (tt < EV.pC) ? 0 : (tt < ev('P4', 0.62) ? 1 : (tt < ev('P4', 0.74) ? 2 : (tt < ev('C4', 0.7) ? 3 : 4)));
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l1, l2, l3, l4, b0, b1, b2, c, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 160px ' + FM; bx.fillText('random', 512, 195);
      bx.fillStyle = '#ffffff'; bx.font = '700 62px ' + FD; bx.fillText('= sorteio de números', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      bx.fillStyle = '#c9a8ff'; bx.fillText('import random'.slice(0, l1), 50, 85);
      bx.fillStyle = '#7fd4ff'; bx.fillText('dado = random.randint(1, 6)'.slice(0, l2), 50, 180);
      bx.fillStyle = '#ff9a9a'; bx.fillText('dado = 6   # hehe'.slice(0, l3), 50, 275);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> 6  6  6  6  6  6...'.slice(0, l4), 50, 410);
      if (tt > EV.nada) { var u = lin(tt, EV.nada, EV.nada + 0.4); bx.strokeStyle = '#ff5a5a'; bx.lineWidth = 7; bx.beginPath(); bx.moveTo(40, 275); bx.lineTo(40 + 500 * u, 275); bx.stroke(); }
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      bx.fillStyle = '#c9a8ff'; bx.fillText('import random'.slice(0, b0), 50, 85);
      bx.fillStyle = '#7fd4ff'; bx.fillText('dado = random.randint(1, 6)'.slice(0, b1), 50, 180);
      bx.fillStyle = '#ffd6a0'; bx.fillText('print(dado)'.slice(0, b2), 50, 275);
      bx.fillStyle = '#9af2c8'; bx.fillText(['', '> 3', '> 3  1', '> 3  1  5', '> 3  1  5  2'][c], 50, 410);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('randint', '1 a 6', '#4a90e2'), 0.9, 0.53), rPula = mkPlane(panelTex('dado', '?', '#e9893b'), 0.9, 0.53);
  var rNada = mkPlane(resTex('TRAPAÇA!', '#e0484f'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('dado', '3', '#e9893b'), 0.9, 0.53), pn2 = mkPlane(panelTex('dado', '1', '#e9893b'), 0.9, 0.53);
  var pn1 = mkPlane(panelTex('dado', '5', '#e9893b'), 0.9, 0.53), pnC = mkPlane(panelTex('dado', '2', '#e9893b'), 0.9, 0.53);
  var pnE = mkPlane(panelTex('próximo', '?', '#7a5cf0'), 0.9, 0.53);
  var rLemb = mkPlane(resTex('SORTE!', '#2fae7a'), 0.9, 0.53);''')

S = cut(S, "  var icNote = mkIcon(", "      icHeart = mkIcon(", r'''  var icNote = mkIcon('dice', '', 0.5), icHash = mkIcon('dice', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('no', '', 0.5),
      icNote2 = mkIcon('dice', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('dice', '', 0.5),
''')

S = cut(S, "    win(pnH, tt,", "    showIcon(icNote,", r'''    win(pnH, tt, EV.pH, EV.nada - 0.3, -0.5, 2.3, 1, hide);
    win(rPula, tt, EV.pS, EV.nada - 0.3, 0.6, 2.3, 2, hide);
    win(rNada, tt, EV.nada, EV.w1, 0.05, 2.3, 3, hide);
    win(pn3, tt, EV.pC, ev('P4', 0.62), -1.0, 2.3, 1, hide);
    win(pn2, tt, ev('P4', 0.62), ev('P4', 0.74), -1.0, 2.3, 1, hide);
    win(pn1, tt, ev('P4', 0.74), ev('C4', 0.7), -1.0, 2.3, 1, hide);
    win(pnC, tt, ev('C4', 0.7), 999, -1.0, 2.3, 1, hide);
    win(pnE, tt, EV.pE, 999, 0.1, 2.3, 2, hide);
    win(rLemb, tt, EV.lemb, 999, 1.2, 2.3, 3, hide);
    [pnH, rPula, rNada, pn3, pn2, pn1, pnC, pnE, rLemb].forEach(function (m) { if (hide < 0.02) m.visible = false; });

''')
S = rep(S, 'ensina entrada do usuário (input) a um aluno desastrado', 'ensina números aleatórios (random) a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
