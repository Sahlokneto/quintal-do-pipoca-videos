# Aula 22 — Arquivos (o Cubinho abre com 'w' pra ler, dá erro e apaga o recorde)
# Uso (dentro de ranaitech/): python3 patches/patch22.py  -> aulas/aula-22/aula22.html + script.json
# (parte da aula 21)
import os, re, json
SRC = 'aulas/aula-21/aula21.html'; D = 'aulas/aula-22'; OUT = D + '/aula22.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula vinte e dois: arquivos. Com arquivos, o programa guarda dados mesmo depois de fechar.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Tipo um caderno que não some quando eu desligo o computador?' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Isso! Vamos guardar o recorde de um jogo. Abrimos o arquivo recorde ponto txt com a letra w, de escrever, e gravamos cem.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Agora eu leio! Abro com w de novo e uso read... Erro? E o meu recorde sumiu!' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'Cuidado! O w é só pra escrever, e ainda apaga o que tinha. Pra ler, use a letra r, de read. E o with fecha o arquivo sozinho.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Então eu arranquei a página do caderno pra tentar ler!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Exato! Com r, o read mostra cem. E pra somar no fim sem apagar, use a letra a, de adicionar.' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Escrevo com w, leio com r e adiciono com a. Meu recorde está salvo!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Muito bem! Na próxima aula: try e except, pra tratar erros. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Vou guardar esta aula num arquivo!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte o vídeo, compartilha com quem aprende a programar e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P3', 0.38),
      L0: ev('P2', 0.4), L1: ev('P2', 0.78), L2: ev('C2', 0.12), L3: ev('C2', 0.35), O1: ev('C2', 0.55),
      B0: ev('P3', 0.42), B1: ev('P3', 0.56), B2: ev('P3', 0.72), B4: ev('P3', 0.86), O2: ev('P4', 0.15), B3: ev('P4', 0.62), O3: 999,
      pH: ev('P2', 0.55), pS: ev('C2', 0.55), nada: ev('P3', 0.15), lemb: ev('P3', 0.6), pC: ev('P4', 0.2), pD: ev('P4', 0.7), pE: ev('C4', 0.8),
      hop: ev('C4', 0.82), jump: ev('P5', 0.1), err: ev('C2', 0.55),
      noteI: ev('C1', 0.3), hashI: ev('P2', 0.05), okA: ev('C2', 0.7), noI: ev('C3', 0.1), noteI2: ev('P4', 0.5),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var W = "with open('recorde.txt', 'w') as f:", R = "with open('recorde.txt', 'r') as f:";
    var l0 = nS(EV.L0, 1.2, 35), l1 = nS(EV.L1, 0.9, 18), l2 = nS(EV.L2, 1.0, 35), l3 = nS(EV.L3, 0.9, 19), o1 = nS(EV.O1, 0.9, 20);
    var bH = n(EV.B0, 35), b1 = nS(EV.B1, 1.1, 35), b2 = nS(EV.B2, 0.9, 19), o2 = n(EV.O2, 5), b4 = nS(EV.B4, 1.0, 30), b3 = nS(EV.B3, 1.1, 30);
    var hlA = tt > EV.nada && tt < EV.w1, hlB = tt > EV.B1 + 1.1 && tt < BYID.P4.t0 + 0.6;
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l0, l1, l2, l3, o1, bH, b1, b2, o2, b3, b4, hlA, hlB, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 150px ' + FM; bx.fillText('open()', 512, 190);
      bx.fillStyle = '#ffffff'; bx.font = '700 56px ' + FD; bx.fillText('= guardar e ler arquivos', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 40px ' + FM;
      if (hlA) { bx.fillStyle = 'rgba(255,154,154,0.18)'; bx.fillRect(35, 187, 900, 66); }
      bx.fillStyle = '#7fd4ff'; bx.fillText(W.slice(0, l0), 50, 70);
      bx.fillStyle = '#ffd6a0'; bx.fillText("    f.write('100')".slice(0, l1), 50, 145);
      bx.fillStyle = '#ffb0b0'; bx.fillText(W.slice(0, l2), 50, 220);
      bx.fillStyle = '#ffffff'; bx.fillText('    print(f.read())'.slice(0, l3), 50, 295);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> Erro: not readable'.slice(0, o1), 50, 440);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 40px ' + FM;
      if (hlB) { bx.fillStyle = 'rgba(154,242,200,0.18)'; bx.fillRect(35, 152, 900, 56); }
      bx.fillStyle = '#7fd4ff'; bx.fillText(W.slice(0, bH), 50, 45);
      bx.fillStyle = '#ffd6a0'; bx.fillText("    f.write('100')".slice(0, bH), 50, 110);
      bx.fillStyle = '#9af2c8'; bx.fillText(R.slice(0, b1), 50, 180);
      bx.fillStyle = '#ffffff'; bx.fillText('    print(f.read())'.slice(0, b2), 50, 245);
      bx.fillStyle = '#9af2c8'; bx.fillText('> 100'.slice(0, o2), 50, 312);
      bx.fillStyle = '#c9c9c9'; bx.fillText('# with fecha o arquivo sozinho'.slice(0, b4), 50, 395);
      bx.fillStyle = '#ffe69a'; bx.fillText('# w escreve, r lê, a adiciona'.slice(0, b3), 50, 465);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex("modo 'w'", 'escreve', '#4a90e2'), 0.9, 0.53), rPula = mkPlane(resTex('ERRO!', '#e0484f'), 0.9, 0.53);
  var rNada = mkPlane(resTex('APAGOU!', '#7a5cf0'), 0.9, 0.53);
  var rLemb = mkPlane(panelTex("modo 'r'", 'lê', '#2fae7a'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('f.read()', '100', '#2fae7a'), 0.9, 0.53), pn2 = mkPlane(panelTex("modo 'a'", 'adiciona', '#e9893b'), 0.9, 0.53);
  var pnE = mkPlane(resTex('SALVO!', '#e9893b'), 0.9, 0.53);''')

S = cut(S, "  var icNote = mkIcon(", "\n\n  var CONF", r'''  var icNote = mkIcon('note', '', 0.5), icHash = mkIcon('dice', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('no', '', 0.5),
      icNote2 = mkIcon('ok', '', 0.5), icOkB = mkIcon('ok', '', 0.5), icNote3 = mkIcon('note', '', 0.5),
      icHeart = mkIcon('heart', 'Curte', 0.7), icShare = mkIcon('share', 'Compartilha', 0.7), icPlus = mkIcon('plus', 'Segue', 0.7);''')

S = rep(S, 'ensina classes a um aluno desastrado', 'ensina arquivos a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
