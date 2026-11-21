# Aula 18 — Operador not (tempo/chuva; o Cubinho inverte a ideia e sai de guarda-chuva num dia de sol)
# Uso (dentro de ranaitech/): python3 patches/patch18.py  -> aulas/aula-18/aula18.html + script.json
# (parte da aula 17)
import os, re, json
SRC = 'aulas/aula-17/aula17.html'; D = 'aulas/aula-18'; OUT = D + '/aula18.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula dezoito: o operador not. Ele inverte um valor: o que é True vira False, e o que é False vira True.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo o meu humor na segunda-feira?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Quase! Vamos ver o tempo. Chovendo é False. Se for not chovendo, dá pra ir ao parque.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Deixa comigo! Escrevi: if not chovendo, leva guarda-chuva. Saí num sol de rachar... de guarda-chuva!' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Você inverteu a ideia! Not chovendo quer dizer que não está chovendo. Guarda-chuva é pra quando chovendo é True.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Passei a tarde toda na sombra do guarda-chuva. Pelo menos não peguei sol!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Então: if chovendo, leva guarda-chuva. E if not chovendo, vai pro parque. O not é um não na frente da condição.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Céu limpo, not chovendo é True: parque liberado!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Isso aí! Na próxima aula: escopo de variável. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Hoje o guarda-chuva fica em casa!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, manda pra quem vive esquecendo o guarda-chuva e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "  var SPEC = {", "  function rebuild()", r'''  var SPEC = {
    P1: ['happy', 'happy'], C1: ['happy', 'smirk'], P2: ['smirk', 'curious'], C2: ['proud', 'worried'],
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
      w0: BYID.P1.t0 + 2.6, w1: ev('P4', 0.03),
      L0: ev('P2', 0.05), L1: ev('C2', 0.12), L2: ev('C2', 0.3), O1: ev('C2', 0.66),
      B0: ev('P4', 0.08), B1: ev('P4', 0.14), B2: ev('P4', 0.22), B3: ev('P4', 0.42), B4: ev('P4', 0.52), O3: ev('C4', 0.35),
      pH: ev('P2', 0.45), pS: ev('C2', 0.62), nada: ev('P3', 0.25), pC: ev('C4', 0.2), pE: ev('C4', 0.62), lemb: ev('P4', 0.7),
      hop: ev('C4', 0.62), jump: ev('P5', 0.1), err: ev('C2', 0.75),
      noteI: ev('C1', 0.2), hashI: ev('P2', 0.05), okA: ev('C2', 0.85), noI: ev('C3', 0.1), noteI2: ev('P4', 0.6),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l0 = n(EV.L0, 16), l1 = nS(EV.L1, 1.0, 16), l2 = nS(EV.L2, 1.2, 25), o1 = nS(EV.O1, 0.8, 14);
    var b0 = n(EV.B0, 16), b1 = nS(EV.B1, 0.6, 12), b2 = nS(EV.B2, 1.0, 25), b3 = nS(EV.B3, 0.8, 16), b4 = nS(EV.B4, 0.8, 20), o3 = n(EV.O3, 10);
    var hlA = tt > EV.nada && tt < EV.w1, hlB = tt > EV.B4 + 1.0 && tt < EV.O3 + 2.0;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l1, l2, o1, b0, b1, b2, b3, b4, o3, hlA, hlB, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 190px ' + FM; bx.fillText('not', 512, 190);
      bx.fillStyle = '#ffffff'; bx.font = '700 60px ' + FD; bx.fillText('True  ⇄  False', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 48px ' + FM;
      if (hlA) { bx.fillStyle = 'rgba(255,154,154,0.20)'; bx.fillRect(35, 128, 560, 76); }
      bx.fillStyle = '#ffffff'; bx.fillText('chovendo = False'.slice(0, l0), 50, 80);
      bx.fillStyle = '#7fd4ff'; bx.fillText('if not chovendo:'.slice(0, l1), 50, 166);
      bx.fillStyle = '#ffd6a0'; bx.fillText("    print('Guarda-chuva')".slice(0, l2), 50, 252);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> Guarda-chuva ☀'.slice(0, o1), 50, 420);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      if (hlB) { bx.fillStyle = 'rgba(154,242,200,0.18)'; bx.fillRect(35, 245, 560, 70); }
      bx.fillStyle = '#ffffff'; bx.fillText('chovendo = False'.slice(0, b0), 50, 60);
      bx.fillStyle = '#7fd4ff'; bx.fillText('if chovendo:'.slice(0, b1), 50, 135);
      bx.fillStyle = '#ffd6a0'; bx.fillText("    print('Guarda-chuva')".slice(0, b2), 50, 205);
      bx.fillStyle = '#c9a8ff'; bx.fillText('if not chovendo:'.slice(0, b3), 50, 280);
      bx.fillStyle = '#ffd6a0'; bx.fillText("    print('Parque!')".slice(0, b4), 50, 350);
      bx.fillStyle = '#9af2c8'; bx.fillText('> Parque!'.slice(0, o3), 50, 460);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('chovendo', 'False', '#e0484f'), 0.9, 0.53), rPula = mkPlane(resTex('SOL!', '#e9893b'), 0.9, 0.53);
  var rNada = mkPlane(resTex('INVERTEU', '#e0484f'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('not chovendo', 'True', '#2fae7a'), 0.9, 0.53), pn2 = mkPlane(resTex('PARQUE!', '#2fae7a'), 0.9, 0.53);
  var pn1 = pn3, pnC = pn2, pnE = mkPlane(resTex('UHUL!', '#e9893b'), 0.9, 0.53);
  var rLemb = mkPlane(resTex('not = NÃO', '#7a5cf0'), 0.9, 0.53);''')

S = rep(S, 'ensina else if (elif) a um aluno desastrado', 'ensina o operador not a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
