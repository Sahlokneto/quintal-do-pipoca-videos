# Aula 16 — Dicionários na prática (cardápio da cantina; o Cubinho pede 'pastel' e dá KeyError)
# Uso (dentro de ranaitech/): python3 patches/patch16.py  -> aulas/aula-16/aula16.html + script.json
# (parte da aula 15)
import os, re, json
SRC = 'aulas/aula-15/aula15.html'; D = 'aulas/aula-16'; OUT = D + '/aula16.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula dezesseis: dicionários na prática. O dicionário guarda pares de chave e valor, igual ao cardápio da cantina!' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Cardápio? Agora você falou a minha língua!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Olha: preços igual a suco, cinco, e bolo, sete. Pra saber o preço do bolo, é preços, colchete, bolo. Resultado: sete.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Fácil! Então eu quero um pastel: preços, colchete, pastel... Deu erro! A cantina fechou?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Não, Cubinho! Deu KeyError porque a chave pastel não existe no dicionário.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Mas eu tô com fome de pastel!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Então a gente adiciona: preços, colchete, pastel, igual a seis. Pronto! Agora o cardápio tem três itens.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Uhul! Um pastel e um suco: onze reais. Professor, você paga?' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Boa tentativa! Na próxima aula: else if, o famoso elif. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou correndo pra cantina!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, compartilha com quem ama um pastel e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "  var SPEC = {", "  function rebuild()", r'''  var SPEC = {
    P1: ['happy', 'happy'], C1: ['happy', 'eureka'], P2: ['happy', 'curious'], C2: ['proud', 'worried'],
    P3: ['smirk', 'hurt'], C3: ['smirk', 'hurt'], P4: ['proud', 'curious'], C4: ['smirk', 'joy'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'open'], ['P2', 0.2, 'ptBoard'], ['C2', 0, 'rest'],
    ['P3', 0, 'palms'], ['P3', 0.5, 'ptBoard'], ['C3', 0, 'crossed'], ['P4', 0, 'palms'], ['P4', 0.4, 'ptBoard'], ['C4', 0, 'rest'], ['C4', 0.7, 'crossed'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'cheer'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['C2', 0.75, 'fidget'], ['P3', 0, 'droop'], ['C3', 0, 'droop'], ['P4', 0, 'chin'],
    ['C4', 0, 'cheer'], ['C4', 0.7, 'hand'], ['P5', 0, 'rest'], ['P5', 0.12, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

''')

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P4', 0.05),
      L1: ev('P2', 0.08), L2: ev('P2', 0.6), L3: ev('C2', 0.25), L4: ev('C2', 0.65),
      B0: ev('P4', 0.15), B1: ev('P4', 0.6), B2: ev('C4', 0.15), B3: ev('C4', 0.4),
      pH: ev('P2', 0.3), pS: ev('P2', 0.7), nada: ev('C2', 0.65), pC: ev('P4', 0.35), pE: ev('P4', 0.75), lemb: ev('C4', 0.68),
      hop: ev('C1', 0.3), jump: ev('P5', 0.1), err: ev('C2', 0.65),
      noteI: ev('C1', 0.2), hashI: ev('P2', 0.05), okA: ev('P3', 0.1), noI: ev('C3', 0.1), noteI2: ev('P4', 0.5),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l1 = nS(EV.L1, 1.6, 32), l2 = n(EV.L2, 18), l3 = n(EV.L3, 16), l4 = nS(EV.L4, 1.0, 20), b0 = nS(EV.B0, 1.0, 20), b1 = n(EV.B1, 18), b2 = nS(EV.B2, 1.4, 33), b3 = n(EV.B3, 15);
    var r2 = tt > EV.L2 + 0.9, rb1 = tt > EV.B1 + 0.9, rb2 = tt > EV.B2 + 1.5;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l1, l2, l3, l4, b0, b1, b2, b3, r2, rb1, rb2, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('{ : }', 512, 195);
      bx.fillStyle = '#ffffff'; bx.font = '700 62px ' + FD; bx.fillText('dicionário = chave e valor', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      bx.fillStyle = '#7fd4ff'; bx.fillText("precos = {'suco': 5, 'bolo': 7}".slice(0, l1), 50, 85);
      bx.fillStyle = '#ffd6a0'; bx.fillText("precos['bolo']".slice(0, l2), 50, 180);
      if (r2) { bx.fillStyle = '#9af2c8'; bx.fillText('> 7', 560, 180); }
      bx.fillStyle = '#ffd6a0'; bx.fillText("precos['pastel']".slice(0, l3), 50, 275);
      bx.fillStyle = '#ff9a9a'; bx.fillText("> KeyError: 'pastel'".slice(0, l4), 50, 410);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      bx.fillStyle = '#c9a8ff'; bx.fillText("precos['pastel'] = 6".slice(0, b0), 50, 85);
      bx.fillStyle = '#ffd6a0'; bx.fillText('print(len(precos))'.slice(0, b1), 50, 180);
      if (rb1) { bx.fillStyle = '#9af2c8'; bx.fillText('> 3', 640, 180); }
      bx.fillStyle = '#ffd6a0'; bx.fillText("precos['pastel'] + precos['suco']".slice(0, b2), 50, 275);
      if (rb2) { bx.fillStyle = '#9af2c8'; bx.fillText('> 11', 50, 410); }
      bx.fillStyle = '#ffe69a'; bx.fillText('# quem paga?'.slice(0, b3), 330, 410);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('suco', '5', '#e9893b'), 0.9, 0.53), rPula = mkPlane(panelTex('bolo', '7', '#4a90e2'), 0.9, 0.53);
  var rNada = mkPlane(resTex('KeyError!', '#e0484f'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('pastel', '6', '#2fae7a'), 0.9, 0.53), pn2 = mkPlane(panelTex('itens', '3', '#7a5cf0'), 0.9, 0.53);
  var pn1 = mkPlane(panelTex('total', '11', '#e9893b'), 0.9, 0.53), pnC = pn1;
  var pnE = pn2;
  var rLemb = mkPlane(resTex('PAGA?', '#f59e0b'), 0.9, 0.53);''')

S = cut(S, "  var icNote = mkIcon(", "      icHeart = mkIcon(", r'''  var icNote = mkIcon('pizza', '', 0.5), icHash = mkIcon('note', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('no', '', 0.5),
      icNote2 = mkIcon('plus', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('pizza', '', 0.5),
''')

S = cut(S, "    win(pnH, tt,", "    showIcon(icNote,", r'''    win(pnH, tt, EV.pH, EV.w1 - 0.3, -1.0, 2.3, 1, hide);
    win(rPula, tt, EV.pS, EV.w1 - 0.3, 0.1, 2.3, 2, hide);
    win(rNada, tt, EV.nada, EV.w1 - 0.3, 1.2, 2.3, 3, hide);
    win(pn3, tt, EV.pC, 999, -1.0, 2.3, 1, hide);
    win(pn2, tt, EV.pE, EV.lemb - 0.2, 0.1, 2.3, 2, hide);
    win(pn1, tt, EV.B2 + 1.5, 999, 1.2, 2.3, 3, hide);
    win(rLemb, tt, EV.lemb, 999, 0.1, 2.3, 4, hide);
    [pnH, rPula, rNada, pn3, pn2, pn1, rLemb].forEach(function (m) { if (hide < 0.02) m.visible = false; });

''')
S = rep(S, 'ensina números aleatórios (random) a um aluno desastrado', 'ensina dicionários na prática a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
