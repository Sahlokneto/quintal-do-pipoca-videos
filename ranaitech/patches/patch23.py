# Aula 23 — Try/except (o Cubinho digita "duas" por extenso, o int dá ValueError e a pizzaria "fecha")
# Uso (dentro de ranaitech/): python3 patches/patch23.py  -> aulas/aula-23/aula23.html + script.json
# (parte da aula 22)
import os, re, json
SRC = 'aulas/aula-22/aula22.html'; D = 'aulas/aula-23'; OUT = D + '/aula23.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula vinte e três: try e except. Com eles, o programa não quebra quando acontece um erro.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Erro? Eu nunca erro... quer dizer, quase nunca!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Vamos ver! Uma pizzaria pergunta quantas pizzas você quer, e o int transforma a resposta em número.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Fácil! Eu escrevo duas, por extenso... Ué, ValueError? A pizzaria fechou!' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Calma! O int não entende palavras. Coloque o código perigoso dentro do try. Se der erro, o except entra em ação e mostra um aviso.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Tipo uma rede de proteção pro programa não cair do trapézio!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Exato! Agora, se digitar duas, aparece: digite um número! E o programa continua funcionando.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Então o try tenta, e o except socorre. Vou pedir três pizzas, em número!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Muito bem! Na próxima aula: módulos, com import. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Se eu errar, eu tento de novo!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Gostou? Curte, manda pra um amigo que está aprendendo e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = rep(S, "C3: ['smirk', 'hurt']", "C3: ['happy', 'joy']")
S = rep(S, "['C3', 0, 'droop']", "['C3', 0, 'up2']")

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P3', 0.38),
      L0: ev('P2', 0.4), L1: ev('P2', 0.75), L2: ev('C2', 0.3), L3: 999, O1: ev('C2', 0.55),
      B0: ev('P3', 0.42), B1: ev('P3', 0.5), B2: ev('P3', 0.72), B4: ev('P3', 0.84), O2: ev('P4', 0.3), B3: ev('C4', 0.15), O3: 999,
      pH: ev('P2', 0.6), pS: ev('C2', 0.55), nada: ev('P3', 0.12), lemb: ev('P3', 0.8), pC: ev('P3', 0.5), pD: ev('P4', 0.7), pE: ev('C4', 0.8),
      hop: ev('C4', 0.82), jump: ev('P5', 0.1), err: ev('C2', 0.55),
      noteI: ev('C1', 0.2), hashI: ev('P2', 0.05), okA: ev('C2', 0.7), noI: ev('C3', 0.1), noteI2: ev('P4', 0.5),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.22), share: ev('P6', 0.45), plus: ev('P6', 0.75), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var Q = "qtd = int(input('Pizzas? '))", PR = 'print(qtd * 30)';
    var l0 = nS(EV.L0, 1.2, 28), l1 = nS(EV.L1, 0.8, 15), l2 = nS(EV.L2, 0.9, 14), o1 = nS(EV.O1, 1.0, 30);
    var b0 = n(EV.B0, 4), b1 = nS(EV.B1, 1.1, 32), b1b = nS(EV.B1 + 1.0, 0.7, 19), b2 = nS(EV.B2, 0.9, 18), b4 = nS(EV.B4, 1.1, 30);
    var o2 = nS(EV.O2, 0.8, 14), o2b = nS(EV.O2 + 0.9, 0.9, 19), b3 = nS(EV.B3, 1.1, 27);
    var hlA = tt > EV.nada && tt < EV.w1, hlB = tt > EV.lemb && tt < BYID.P4.t0 + 0.6;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l1, l2, o1, b0, b1, b1b, b2, b4, o2, o2b, b3, hlA, hlB, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 130px ' + FM; bx.fillText('try/except', 512, 190);
      bx.fillStyle = '#ffffff'; bx.font = '700 56px ' + FD; bx.fillText('= tratar erros sem quebrar', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 42px ' + FM;
      if (hlA) { bx.fillStyle = 'rgba(255,154,154,0.18)'; bx.fillRect(35, 37, 900, 66); }
      bx.fillStyle = '#7fd4ff'; bx.fillText(Q.slice(0, l0), 50, 70);
      bx.fillStyle = '#ffffff'; bx.fillText(PR.slice(0, l1), 50, 150);
      bx.fillStyle = '#ffd6a0'; bx.fillText('> Pizzas? duas'.slice(0, l2), 50, 290);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> ValueError! Programa parou'.slice(0, o1), 50, 380);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 38px ' + FM;
      if (hlB) { bx.fillStyle = 'rgba(154,242,200,0.18)'; bx.fillRect(35, 190, 900, 110); }
      bx.fillStyle = '#9af2c8'; bx.fillText('try:'.slice(0, b0), 50, 40);
      bx.fillStyle = '#7fd4ff'; bx.fillText(('    ' + Q).slice(0, b1), 50, 95);
      bx.fillStyle = '#ffffff'; bx.fillText(('    ' + PR).slice(0, b1b), 50, 150);
      bx.fillStyle = '#9af2c8'; bx.fillText('except ValueError:'.slice(0, b2), 50, 215);
      bx.fillStyle = '#ffd6a0'; bx.fillText("    print('Digite um número!')".slice(0, b4), 50, 270);
      bx.fillStyle = '#c9c9c9'; bx.fillText('> Pizzas? duas'.slice(0, o2), 50, 345);
      bx.fillStyle = '#9af2c8'; bx.fillText('> Digite um número!'.slice(0, o2b), 50, 400);
      bx.fillStyle = '#ffe69a'; bx.fillText('# try tenta, except socorre'.slice(0, b3), 50, 480);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex("int('2')", '2', '#4a90e2'), 0.9, 0.53), rPula = mkPlane(resTex('ERRO!', '#e0484f'), 0.9, 0.53);
  var rNada = mkPlane(resTex('PAROU!', '#7a5cf0'), 0.9, 0.53);
  var rLemb = mkPlane(panelTex('except:', 'avisa', '#2fae7a'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('try:', 'tenta', '#2fae7a'), 0.9, 0.53), pn2 = mkPlane(panelTex('programa', 'segue', '#e9893b'), 0.9, 0.53);
  var pnE = mkPlane(resTex('3 PIZZAS', '#e9893b'), 0.9, 0.53);''')

S = cut(S, "  var icNote = mkIcon(", "\n\n  var CONF", r'''  var icNote = mkIcon('alert', '', 0.5), icHash = mkIcon('pizza', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('ok', '', 0.5),
      icNote2 = mkIcon('ok', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('pizza', '', 0.5),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);''')

S = rep(S, 'ensina arquivos a um aluno desastrado', 'ensina try e except a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
