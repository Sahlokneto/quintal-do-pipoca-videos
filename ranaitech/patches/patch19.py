# Aula 19 — Escopo de variável (jogo; os pontos criados dentro da função somem lá fora)
# Uso (dentro de ranaitech/): python3 patches/patch19.py  -> aulas/aula-19/aula19.html + script.json
# (parte da aula 18)
import os, re, json
SRC = 'aulas/aula-18/aula18.html'; D = 'aulas/aula-19'; OUT = D + '/aula19.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula dezenove: escopo de variável. Escopo é o pedaço do código onde uma variável existe.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Variável tem endereço? Ela paga aluguel?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Quase isso! Uma variável criada dentro de uma função só vive lá dentro. Vamos ver num jogo.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Deixa comigo! Criei pontos igual a dez dentro da função ganhar. Agora é só mostrar lá fora... Erro? Pontos não existe?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Pontos é uma variável local. Ela nasce quando a função roda e some quando a função termina. Lá fora, ninguém conhece.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Ganhei dez pontos e eles evaporaram. Meu recorde sumiu!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Pra levar o valor pra fora, a função devolve com return. E você guarda o resultado numa variável aqui fora.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Pontos igual a ganhar. Agora aparece dez. Recorde salvo!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Muito bem! Na próxima aula: arredondar e fazer contas com números. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou guardar meus pontos num cofre!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, compartilha com quem tá aprendendo a programar e segue o canal!' }
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
      L0: ev('P2', 0.7), L1: ev('C2', 0.15), L2: ev('C2', 0.42), L3: ev('C2', 0.52), O1: ev('C2', 0.72),
      B0: ev('P4', 0.08), B1: ev('P4', 0.14), B2: ev('P4', 0.3), B3: ev('P4', 0.6), B4: ev('P4', 0.78), O3: ev('C4', 0.4),
      pH: ev('C2', 0.25), pS: ev('C2', 0.75), nada: ev('P3', 0.15), pC: ev('C4', 0.3), pE: ev('C4', 0.75), lemb: ev('P4', 0.35),
      hop: ev('C4', 0.75), jump: ev('P5', 0.1), err: ev('C2', 0.78),
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
    var l0 = n(EV.L0, 13), l1 = nS(EV.L1, 0.9, 15), l2 = n(EV.L2, 8), l3 = n(EV.L3, 13), o1 = nS(EV.O1, 0.8, 19);
    var b0 = n(EV.B0, 13), b1 = nS(EV.B1, 0.9, 15), b2 = nS(EV.B2, 1.0, 17), b3 = nS(EV.B3, 1.0, 17), b4 = n(EV.B4, 13), o3 = n(EV.O3, 4);
    var hlA = tt > EV.nada && tt < EV.w1, hlB = tt > EV.B2 + 0.9 && tt < EV.B3 + 1.2;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l1, l2, l3, o1, b0, b1, b2, b3, b4, o3, hlA, hlB, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('escopo', 512, 190);
      bx.fillStyle = '#ffffff'; bx.font = '700 56px ' + FD; bx.fillText('= onde a variável existe', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 48px ' + FM;
      if (hlA) { bx.fillStyle = 'rgba(255,230,154,0.18)'; bx.fillRect(35, 118, 560, 70); }
      bx.fillStyle = '#7fd4ff'; bx.fillText('def ganhar():'.slice(0, l0), 50, 75);
      bx.fillStyle = '#ffd6a0'; bx.fillText('    pontos = 10'.slice(0, l1), 50, 153);
      bx.fillStyle = '#ffffff'; bx.fillText('ganhar()'.slice(0, l2), 50, 231);
      bx.fillStyle = '#ffffff'; bx.fillText('print(pontos)'.slice(0, l3), 50, 309);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> NameError: pontos'.slice(0, o1), 50, 440);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      if (hlB) { bx.fillStyle = 'rgba(154,242,200,0.18)'; bx.fillRect(35, 167, 560, 66); }
      bx.fillStyle = '#7fd4ff'; bx.fillText('def ganhar():'.slice(0, b0), 50, 60);
      bx.fillStyle = '#ffd6a0'; bx.fillText('    pontos = 10'.slice(0, b1), 50, 130);
      bx.fillStyle = '#9af2c8'; bx.fillText('    return pontos'.slice(0, b2), 50, 200);
      bx.fillStyle = '#c9a8ff'; bx.fillText('pontos = ganhar()'.slice(0, b3), 50, 280);
      bx.fillStyle = '#ffffff'; bx.fillText('print(pontos)'.slice(0, b4), 50, 350);
      bx.fillStyle = '#9af2c8'; bx.fillText('> 10'.slice(0, o3), 50, 460);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('pontos', '10', '#4a90e2'), 0.9, 0.53), rPula = mkPlane(resTex('ERRO!', '#e0484f'), 0.9, 0.53);
  var rNada = mkPlane(resTex('LOCAL', '#7a5cf0'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('pontos', '10', '#2fae7a'), 0.9, 0.53), pn2 = mkPlane(resTex('SALVO!', '#2fae7a'), 0.9, 0.53);
  var pn1 = pn3, pnC = pn2, pnE = mkPlane(resTex('RECORDE!', '#e9893b'), 0.9, 0.53);
  var rLemb = mkPlane(resTex('return', '#2fae7a'), 0.9, 0.53);''')

S = rep(S, 'ensina o operador not a um aluno desastrado', 'ensina escopo de variável a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
