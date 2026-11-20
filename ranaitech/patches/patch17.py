# Aula 17 — Else if / elif (boletim; o Cubinho usa dois ifs e fica aprovado E de recuperação)
# Uso (dentro de ranaitech/): python3 patches/patch17.py  -> aulas/aula-17/aula17.html + script.json
# (parte da aula 16)
import os, re, json
SRC = 'aulas/aula-16/aula16.html'; D = 'aulas/aula-17'; OUT = D + '/aula17.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula dezessete: else if, que no Python se escreve elif. Serve pra testar várias condições, uma depois da outra.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Várias? Eu mal dou conta de uma!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Vamos de boletim. Se a nota for sete ou mais: passou. Se for cinco ou mais: recuperação.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Deixa comigo! Tirei nove... e o código disse: passou. E recuperação! Os dois ao mesmo tempo?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'É que você escreveu dois ifs separados. Nove é maior que sete e também maior que cinco, então os dois rodaram!' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Passei de ano e fiquei de recuperação. Que confusão!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Por isso existe o elif. O Python testa de cima pra baixo e para na primeira condição verdadeira. E o else pega o resto.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Com nove, agora só aparece: passou. Aprovado de verdade!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Parabéns! Na próxima aula: o operador not. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou mostrar o boletim pra todo mundo!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, compartilha com a turma da escola e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "  var SPEC = {", "  function rebuild()", r'''  var SPEC = {
    P1: ['happy', 'happy'], C1: ['happy', 'worried'], P2: ['happy', 'curious'], C2: ['proud', 'curious'],
    P3: ['smirk', 'worried'], C3: ['smirk', 'hurt'], P4: ['proud', 'curious'], C4: ['happy', 'joy'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'open'], ['P2', 0.2, 'ptBoard'], ['C2', 0, 'rest'],
    ['P3', 0, 'palms'], ['P3', 0.4, 'ptBoard'], ['C3', 0, 'crossed'], ['P4', 0, 'palms'], ['P4', 0.3, 'ptBoard'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'fidget'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['C2', 0.6, 'fidget'], ['P3', 0, 'droop'], ['C3', 0, 'droop'], ['P4', 0, 'chin'],
    ['C4', 0, 'up2'], ['C4', 0.6, 'cheer'], ['P5', 0, 'rest'], ['P5', 0.12, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

''')

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P4', 0.05),
      L0: ev('P2', 0.05), L1: ev('P2', 0.3), L2: ev('P2', 0.65), O1: ev('C2', 0.4), O2: ev('C2', 0.62),
      B0: ev('P4', 0.12), B1: ev('P4', 0.2), B2: ev('P4', 0.32), B3: ev('P4', 0.8), O3: ev('C4', 0.25),
      pH: ev('C2', 0.4), pS: ev('C2', 0.62), nada: ev('P3', 0.6), pC: ev('C4', 0.25), pE: ev('C4', 0.6), lemb: ev('P4', 0.55),
      hop: ev('C4', 0.62), jump: ev('P5', 0.1), err: ev('C2', 0.75),
      noteI: ev('C1', 0.2), hashI: ev('P2', 0.05), okA: ev('C2', 0.75), noI: ev('C3', 0.1), noteI2: ev('P4', 0.5),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l0 = n(EV.L0, 8), l1 = nS(EV.L1, 1.4, 29), l2 = nS(EV.L2, 1.4, 29), o1 = n(EV.O1, 8), o2 = n(EV.O2, 8);
    var b0 = n(EV.B0, 8), b1 = nS(EV.B1, 1.0, 29), b2 = nS(EV.B2, 1.2, 31), b3 = nS(EV.B3, 1.0, 22), o3 = n(EV.O3, 8);
    var hl = tt > EV.B2 + 1.4 && tt < EV.B3;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l1, l2, o1, o2, b0, b1, b2, b3, o3, hl, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 170px ' + FM; bx.fillText('elif', 512, 195);
      bx.fillStyle = '#ffffff'; bx.font = '700 62px ' + FD; bx.fillText('= senão, se...', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      bx.fillStyle = '#ffffff'; bx.fillText('nota = 9'.slice(0, l0), 50, 80);
      bx.fillStyle = '#7fd4ff'; bx.fillText("if nota >= 7: print('Passou')".slice(0, l1), 50, 170);
      bx.fillStyle = '#ff9a9a'; bx.fillText("if nota >= 5: print('Recup.')".slice(0, l2), 50, 260);
      bx.fillStyle = '#9af2c8'; bx.fillText('> Passou'.slice(0, o1), 50, 390);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> Recup.'.slice(0, o2), 50, 460);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      if (hl) { bx.fillStyle = 'rgba(255,230,154,0.18)'; bx.fillRect(35, 130, 900, 76); }
      bx.fillStyle = '#ffffff'; bx.fillText('nota = 9'.slice(0, b0), 50, 75);
      bx.fillStyle = '#7fd4ff'; bx.fillText("if nota >= 7: print('Passou')".slice(0, b1), 50, 168);
      bx.fillStyle = '#c9a8ff'; bx.fillText("elif nota >= 5: print('Recup.')".slice(0, b2), 50, 256);
      bx.fillStyle = '#ffd6a0'; bx.fillText("else: print('Estuda!')".slice(0, b3), 50, 344);
      bx.fillStyle = '#9af2c8'; bx.fillText('> Passou'.slice(0, o3), 50, 455);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(resTex('PASSOU', '#2fae7a'), 0.9, 0.53), rPula = mkPlane(resTex('RECUP.', '#e9893b'), 0.9, 0.53);
  var rNada = mkPlane(resTex('2 IFs = 2x', '#e0484f'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('nota', '9', '#4a90e2'), 0.9, 0.53), pn2 = mkPlane(resTex('PASSOU', '#2fae7a'), 0.9, 0.53);
  var pn1 = pn3, pnC = pn2, pnE = mkPlane(resTex('UHUL!', '#e9893b'), 0.9, 0.53);
  var rLemb = mkPlane(resTex('PARA AQUI', '#7a5cf0'), 0.9, 0.53);''')

S = cut(S, "  var icNote = mkIcon(", "      icHeart = mkIcon(", r'''  var icNote = mkIcon('alert', '', 0.5), icHash = mkIcon('note', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('no', '', 0.5),
      icNote2 = mkIcon('ok', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('note', '', 0.5),
''')

S = cut(S, "    win(pnH, tt,", "    showIcon(icNote,", r'''    win(pnH, tt, EV.pH, EV.w1 - 0.3, -1.0, 2.3, 1, hide);
    win(rPula, tt, EV.pS, EV.w1 - 0.3, 0.1, 2.3, 2, hide);
    win(rNada, tt, EV.nada, EV.w1 - 0.3, 1.2, 2.3, 3, hide);
    win(rLemb, tt, EV.lemb, BYID.C4.t0, 1.2, 2.3, 3, hide);
    win(pn3, tt, EV.pC, 999, -1.0, 2.3, 1, hide);
    win(pn2, tt, EV.pC + 0.5, 999, 0.1, 2.3, 2, hide);
    win(pnE, tt, EV.pE, 999, 1.2, 2.3, 3, hide);
    [pnH, rPula, rNada, rLemb, pn3, pn2, pnE].forEach(function (m) { if (hide < 0.02) m.visible = false; });

''')
S = rep(S, 'ensina dicionários na prática a um aluno desastrado', 'ensina else if (elif) a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
