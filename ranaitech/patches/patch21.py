# Aula 21 — Classes (classe = molde; o Cubinho usa o molde em vez de criar o objeto)
# Uso (dentro de ranaitech/): python3 patches/patch21.py  -> aulas/aula-21/aula21.html + script.json
# (parte da aula 20)
import os, re, json
SRC = 'aulas/aula-20/aula20.html'; D = 'aulas/aula-21'; OUT = D + '/aula21.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula vinte e um: classes. Uma classe é um molde pra criar vários objetos parecidos.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Molde? Tipo forma de bolo? Já fiquei com fome!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Isso mesmo! Vamos criar a classe Bichinho, com um nome, pra um joguinho de bichinho virtual.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Deixa comigo! Print de Bichinho ponto nome... Erro? O molde não tem nome?' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'A classe é só o molde. Primeiro você cria um objeto: rex igual a Bichinho, passando o nome. O init guarda esse nome no self.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Então eu tentei comer a forma em vez do bolo!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Exato! Agora rex ponto nome mostra Rex. E com o mesmo molde você cria quantos bichinhos quiser.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Mimi igual a Bichinho, com o nome Mimi. Dois bichinhos e um molde só. Sou um criador!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Muito bem! Na próxima aula: arquivos. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou criar um bichinho chamado Cubinho Dois!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, compartilha com quem quer criar jogos e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "  var SPEC = {", "  function rebuild()", r'''  var SPEC = {
    P1: ['happy', 'happy'], C1: ['smirk', 'joy'], P2: ['happy', 'curious'], C2: ['proud', 'worried'],
    P3: ['smirk', 'curious'], C3: ['smirk', 'hurt'], P4: ['proud', 'eureka'], C4: ['happy', 'joy'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'open'], ['P2', 0.3, 'ptBoard'], ['C2', 0, 'rest'],
    ['P3', 0, 'palms'], ['P3', 0.4, 'ptBoard'], ['C3', 0, 'crossed'], ['P4', 0, 'palms'], ['P4', 0.3, 'ptBoard'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'fidget'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['C2', 0.6, 'fidget'], ['P3', 0, 'droop'], ['C3', 0, 'droop'], ['P4', 0, 'eureka'], ['P4', 0.4, 'chin'],
    ['C4', 0, 'up2'], ['C4', 0.7, 'cheer'], ['P5', 0, 'rest'], ['P5', 0.12, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

''')

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P3', 0.2),
      L0: ev('P2', 0.4), L1: ev('P2', 0.55), L2: ev('P2', 0.78), L3: ev('C2', 0.12), O1: ev('C2', 0.5),
      B0: ev('P3', 0.25), B1: ev('P3', 0.42), O2: ev('P4', 0.22), B2: ev('P4', 0.08), B3: ev('C4', 0.1), B4: ev('C4', 0.45), O3: ev('C4', 0.55),
      pH: ev('P2', 0.45), pS: ev('C2', 0.55), nada: ev('P3', 0.08), lemb: ev('P3', 0.5), pC: ev('P4', 0.25), pD: ev('C4', 0.5), pE: ev('C4', 0.82),
      hop: ev('C4', 0.82), jump: ev('P5', 0.1), err: ev('C2', 0.55),
      noteI: ev('C1', 0.3), hashI: ev('P2', 0.05), okA: ev('C2', 0.7), noI: ev('C3', 0.1), noteI2: ev('P4', 0.6),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l0 = n(EV.L0, 15), l1 = nS(EV.L1, 1.1, 29), l2 = nS(EV.L2, 1.0, 24), l3 = nS(EV.L3, 1.0, 20), o1 = nS(EV.O1, 0.9, 16);
    var bH = n(EV.B0, 29), b1 = nS(EV.B1, 1.0, 21), b2 = nS(EV.B2, 0.9, 15), o2 = n(EV.O2, 5), b3 = nS(EV.B3, 1.1, 23), b4 = nS(EV.B4, 1.0, 16), o3 = n(EV.O3, 6);
    var hlA = tt > EV.nada && tt < EV.w1, hlB = tt > EV.B1 + 1.0 && tt < BYID.P4.t0;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l1, l2, l3, o1, bH, b1, b2, o2, b3, b4, o3, hlA, hlB, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('class', 512, 190);
      bx.fillStyle = '#ffffff'; bx.font = '700 56px ' + FD; bx.fillText('= molde para criar objetos', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      if (hlA) { bx.fillStyle = 'rgba(255,154,154,0.16)'; bx.fillRect(35, 268, 600, 66); }
      bx.fillStyle = '#7fd4ff'; bx.fillText('class Bichinho:'.slice(0, l0), 50, 70);
      bx.fillStyle = '#c9a8ff'; bx.fillText('    def __init__(self, nome):'.slice(0, l1), 50, 145);
      bx.fillStyle = '#ffd6a0'; bx.fillText('        self.nome = nome'.slice(0, l2), 50, 220);
      bx.fillStyle = '#ffffff'; bx.fillText('print(Bichinho.nome)'.slice(0, l3), 50, 301);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> AttributeError'.slice(0, o1), 50, 440);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 42px ' + FM;
      if (hlB) { bx.fillStyle = 'rgba(154,242,200,0.18)'; bx.fillRect(35, 213, 560, 58); }
      bx.fillStyle = '#7fd4ff'; bx.fillText('class Bichinho:'.slice(0, bH), 50, 45);
      bx.fillStyle = '#c9a8ff'; bx.fillText('    def __init__(self, nome):'.slice(0, bH), 50, 108);
      bx.fillStyle = '#ffd6a0'; bx.fillText('        self.nome = nome'.slice(0, bH), 50, 171);
      bx.fillStyle = '#9af2c8'; bx.fillText("rex = Bichinho('Rex')".slice(0, b1), 50, 242);
      bx.fillStyle = '#ffffff'; bx.fillText('print(rex.nome)'.slice(0, b2), 50, 310);
      bx.fillStyle = '#9af2c8'; bx.fillText('> Rex'.slice(0, o2), 520, 310);
      bx.fillStyle = '#9af2c8'; bx.fillText("mimi = Bichinho('Mimi')".slice(0, b3), 50, 395);
      bx.fillStyle = '#ffffff'; bx.fillText('print(mimi.nome)'.slice(0, b4), 50, 463);
      bx.fillStyle = '#9af2c8'; bx.fillText('> Mimi'.slice(0, o3), 520, 463);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('class', 'Bichinho', '#4a90e2'), 0.9, 0.53), rPula = mkPlane(resTex('ERRO!', '#e0484f'), 0.9, 0.53);
  var rNada = mkPlane(resTex('MOLDE', '#7a5cf0'), 0.9, 0.53);
  var rLemb = mkPlane(panelTex('objeto', 'rex', '#2fae7a'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('rex.nome', 'Rex', '#2fae7a'), 0.9, 0.53), pn2 = mkPlane(panelTex('mimi.nome', 'Mimi', '#e9893b'), 0.9, 0.53);
  var pnE = mkPlane(resTex('CRIADOR!', '#e9893b'), 0.9, 0.53);''')

# a placa "objeto rex" fica no meio até o P4; a placa rex.nome entra à esquerda no P4
S = rep(S, "win(rLemb, tt, EV.lemb, BYID.P4.t0, 0.1, 2.3, 2, hide);", "win(rLemb, tt, EV.lemb, EV.pD - 0.3, 0.1, 2.3, 2, hide);")

S = cut(S, "  var icNote = mkIcon(", "\n\n  var CONF", r'''  var icNote = mkIcon('pizza', '', 0.5), icHash = mkIcon('note', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('no', '', 0.5),
      icNote2 = mkIcon('ok', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('note', '', 0.5),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);''')

S = rep(S, 'ensina contas e arredondamento a um aluno desastrado', 'ensina classes a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
