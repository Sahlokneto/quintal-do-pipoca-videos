# Aula 14 — Entrada do usuário (input; o input sempre devolve texto, use int() para número)
# Uso (dentro de ranaitech/): python3 patches/patch14.py  -> aulas/aula-14/aula14.html + script.json
import os, re, json
SRC = 'aulas/aula-13/aula13.html'; D = 'aulas/aula-14'; OUT = D + '/aula14.html'
S = open(SRC).read()
def cut(s, a, b, new):
    i = s.index(a); j = s.index(b, i); return s[:i] + new + s[j:]
def rep(s, a, b):
    assert a in s, a[:60]; return s.replace(a, b)

SCRIPT = r'''  var SCRIPT = [
    { id: 'P1', who: 'P', gap: 2.4, text: 'Olá, turma! Bem-vindos à aula catorze: entrada do usuário. Com o input, o programa faz uma pergunta e espera a resposta.' },
    { id: 'C1', who: 'C', gap: 0.35, text: 'Então o computador vai conversar comigo? Que chique!' },
    { id: 'P2', who: 'P', gap: 0.3, text: 'Isso! Nome igual a input, qual é o seu nome. O programa espera, você digita, e a resposta vai pra variável nome.' },
    { id: 'C2', who: 'C', gap: 0.3, text: 'Deixa comigo! Idade igual a input. Agora soma: idade mais um... Ué, deu erro!' },
    { id: 'P3', who: 'P', gap: 0.35, text: 'É que o input sempre devolve texto! Doze entre aspas não é número, então não dá pra somar.' },
    { id: 'C3', who: 'C', gap: 0.3, text: 'Texto?! Mas eu digitei um número, eu juro!' },
    { id: 'P4', who: 'P', gap: 0.3, text: 'Calma! É só converter com int. Idade igual a int de input. Agora doze mais um dá treze!' },
    { id: 'C4', who: 'C', gap: 0.3, text: 'Treze! Fiquei um ano mais velho no programa!' },
    { id: 'P5', who: 'P', gap: 0.35, text: 'Isso aí! Na próxima aula: números aleatórios. Tchau, turma!' },
    { id: 'C5', who: 'C', gap: 0.3, text: 'Tchau! Digita aí nos comentários: até amanhã!' },
    { id: 'P6', who: 'P', gap: 0.35, text: 'Curte, compartilha com quem quer aprender a programar e segue o canal!' }
  ];
'''
S = cut(S, "  var SCRIPT = [", "  var NAMES", SCRIPT)

S = cut(S, "  var SPEC = {", "  function rebuild()", r'''  var SPEC = {
    P1: ['happy', 'happy'], C1: ['happy', 'curious'], P2: ['happy', 'curious'], C2: ['curious', 'smirk'],
    P3: ['worried', 'worried'], C3: ['worried', 'hurt'], P4: ['proud', 'curious'], C4: ['happy', 'eureka'],
    P5: ['joy', 'joy'], C5: ['happy', 'happy'], P6: ['happy', 'happy']
  };
  var GP = [['P1', -0.05, 'open'], ['P1', 0.5, 'ptBoard'], ['P1', 0.8, 'rest'], ['C1', 0, 'rest'], ['P2', 0, 'open'], ['P2', 0.3, 'ptBoard'], ['C2', 0, 'crossed'],
    ['P3', 0, 'palms'], ['P3', 0.5, 'ptBox'], ['C3', 0, 'crossed'], ['P4', 0, 'palms'], ['P4', 0.45, 'ptBoard'], ['C4', 0, 'rest'],
    ['P5', 0, 'open'], ['P5', 0.85, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'open'], ['P6', 0.5, 'ptBox']];
  var GC = [['C1', -0.05, 'hand'], ['P2', 0, 'chin'], ['C2', 0, 'up2'], ['C2', 0.85, 'fidget'], ['P3', 0, 'fidget'], ['C3', 0, 'droop'], ['P4', 0, 'chin'],
    ['C4', 0, 'eureka'], ['P5', 0, 'rest'], ['P5', 0.12, 'cheer'], ['P5', 0.9, 'wave'], ['C5', 0, 'wave'], ['P6', 0, 'rest'], ['P6', 0.5, 'cheer']];

''')

S = cut(S, "    EV = {", "    var P = [{ t: -9", r'''    EV = {
      w0: BYID.P1.t0 + 2.6, w1: ev('P4', 0.05),
      L1: ev('P2', 0.2), L2: ev('C2', 0.12), L3: ev('C2', 0.45), L4: ev('C2', 0.75),
      B0: ev('P4', 0.36), B1: ev('P4', 0.6), B2: ev('P4', 0.72), B3: ev('P4', 0.88),
      pH: ev('P2', 0.25), pS: ev('P2', 0.75), nada: ev('P3', 0.3), pC: ev('P4', 0.05), pE: ev('P4', 0.85), lemb: ev('C4', 0.25),
      hop: ev('C4', 0.5), jump: ev('P5', 0.1), err: ev('C2', 0.85),
      noteI: ev('C1', 0.2), hashI: ev('C2', 0.1), okA: ev('C2', 0.8), noI: ev('C3', 0.1), noteI2: ev('C4', 0.15),
      okB: ev('P5', 0.0), noteI3: ev('C5', 0.3),
      heart: ev('P6', 0.18), share: ev('P6', 0.4), plus: ev('P6', 0.64), g0: 0, g1: 0
    };
''')

BOARD = r'''  function drawBoard(tt) {
    var e0 = eraseF(tt, EV.w0), e1 = eraseF(tt, EV.w1);
    function n(t0, k) { return Math.round(lin(tt, t0, t0 + 0.8) * k); }
    function nS(t0, d, k) { return Math.round(lin(tt, t0, t0 + d) * k); }
    var phB = tt >= EV.w1 + 0.7;
    var l1 = n(EV.L1, 22), l2 = n(EV.L2, 24), l3 = n(EV.L3, 16), l4 = nS(EV.L4, 1.0, 22), b0 = nS(EV.B0, 1.0, 30), b1 = n(EV.B1, 16);
    var c = (tt < EV.B2) ? 0 : (tt < EV.B3 ? 1 : 2);
    var key = [Math.round(e0 * 30), Math.round(e1 * 30), phB, l1, l2, l3, l4, b0, b1, c, fontsVer].join();
    if (key === boardKey) return;
    boardKey = key;
    bx.clearRect(0, 0, 1024, 540);
    bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024, 540);
    bx.textBaseline = 'middle'; bx.textAlign = 'center';
    if (tt < EV.w0 + 0.7) {
      bx.fillStyle = '#ffe69a'; bx.font = '700 160px ' + FM; bx.fillText('input()', 512, 195);
      bx.fillStyle = '#ffffff'; bx.font = '700 62px ' + FD; bx.fillText('= pergunta e espera', 512, 385);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e0, 540);
    } else if (!phB) {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      bx.fillStyle = '#7fd4ff'; bx.fillText('nome = input("Nome? ")'.slice(0, l1), 50, 85);
      bx.fillStyle = '#7fd4ff'; bx.fillText('idade = input("Idade? ")'.slice(0, l2), 50, 180);
      bx.fillStyle = '#ffd6a0'; bx.fillText('print(idade + 1)'.slice(0, l3), 50, 275);
      bx.fillStyle = '#ff9a9a'; bx.fillText('> ERRO: texto + número'.slice(0, l4), 50, 410);
      bx.fillStyle = '#2b5a58'; bx.fillRect(0, 0, 1024 * e1, 540);
    } else {
      bx.textAlign = 'left'; bx.font = '500 46px ' + FM;
      bx.fillStyle = '#7fd4ff'; bx.fillText('idade = int(input("Idade? "))'.slice(0, b0), 50, 85);
      bx.fillStyle = '#ffd6a0'; bx.fillText('print(idade + 1)'.slice(0, b1), 50, 180);
      bx.fillStyle = '#ffffff'; if (c >= 1) bx.fillText('> Idade? 12', 50, 300);
      bx.fillStyle = '#9af2c8'; if (c >= 2) bx.fillText('> 13', 50, 410);
    }
    boardTex.needsUpdate = true;
  }

'''
S = cut(S, "  function drawBoard(tt) {", "  var woodM", BOARD)

S = cut(S, "  var pnH = mkPlane(", "\n\n\n  function iconTex", r'''  var pnH = mkPlane(panelTex('input()', '?', '#7a5cf0'), 0.9, 0.53), rPula = mkPlane(panelTex('nome', 'Cubinho', '#4a90e2'), 0.9, 0.53);
  var rNada = mkPlane(resTex('É TEXTO!', '#e0484f'), 0.9, 0.53);
  var pn3 = mkPlane(panelTex('idade', '"12"', '#e0484f'), 0.9, 0.53), pn2 = pn3, pn1 = pn3;
  var pnC = mkPlane(panelTex('int', '12', '#4a90e2'), 0.9, 0.53);
  var pnE = mkPlane(panelTex('12 + 1', '13', '#2fae7a'), 0.9, 0.53);
  var rLemb = mkPlane(resTex('CERTO!', '#2fae7a'), 0.9, 0.53);''')

S = rep(S, "pizza: '#e9893b', loop: '#7a5cf0',", "pizza: '#e9893b', loop: '#7a5cf0', chat: '#4a90e2', keyb: '#7a5cf0', dice: '#e9893b',")
ICONS = r'''      if (kind === 'chat') {
        x.beginPath(); rr(x, 56, 66, 144, 98, 26); x.fill(); x.beginPath(); x.moveTo(92, 150); x.lineTo(80, 196); x.lineTo(128, 160); x.closePath(); x.fill();
        x.fillStyle = C; [96, 128, 160].forEach(function (cx) { x.beginPath(); x.arc(cx, 115, 11, 0, 6.3); x.fill(); });
      }
      if (kind === 'keyb') {
        x.beginPath(); rr(x, 44, 82, 168, 96, 14); x.fill(); x.fillStyle = C;
        for (var ky = 0; ky < 2; ky++) for (var kx = 0; kx < 5; kx++) x.fillRect(58 + kx * 30, 96 + ky * 28, 22, 20);
        x.fillRect(84, 152, 88, 16);
      }
      if (kind === 'dice') {
        x.save(); x.translate(128, 128); x.rotate(0.18); x.beginPath(); rr(x, -66, -66, 132, 132, 24); x.fill();
        x.fillStyle = '#2b2b3a'; [[-34, -34], [34, -34], [0, 0], [-34, 34], [34, 34]].forEach(function (q) { x.beginPath(); x.arc(q[0], q[1], 13, 0, 6.3); x.fill(); }); x.restore();
      }
'''
S = rep(S, "      if (kind === 'heart')", ICONS + "      if (kind === 'heart')")
S = cut(S, "  var icNote = mkIcon(", "      icHeart = mkIcon(", r'''  var icNote = mkIcon('chat', '', 0.5), icHash = mkIcon('keyb', '', 0.5), icOkA = mkIcon('alert', '', 0.5), icNo = mkIcon('no', '', 0.5),
      icNote2 = mkIcon('ok', '', 0.5), icOkB = mkIcon('chat', '', 0.5), icNote3 = mkIcon('keyb', '', 0.5),
''')

S = cut(S, "    win(pnH, tt,", "    showIcon(icNote,", r'''    win(pnH, tt, EV.pH, EV.nada - 0.3, -0.5, 2.3, 1, hide);
    win(rPula, tt, EV.pS, EV.nada - 0.3, 0.6, 2.3, 2, hide);
    win(rNada, tt, EV.nada, EV.w1, 0.05, 2.3, 3, hide);
    win(pn3, tt, EV.pC, ev('P4', 0.42), -1.0, 2.3, 1, hide);
    win(pnC, tt, ev('P4', 0.42), 999, -1.0, 2.3, 1, hide);
    win(pnE, tt, EV.pE, 999, 0.1, 2.3, 2, hide);
    win(rLemb, tt, EV.lemb, 999, 1.2, 2.3, 3, hide);
    [pnH, rPula, rNada, pn3, pnC, pnE, rLemb].forEach(function (m) { if (hide < 0.02) m.visible = false; });

''')
S = rep(S, 'ensina while (repetir até uma condição) a um aluno desastrado', 'ensina entrada do usuário (input) a um aluno desastrado')
os.makedirs(D, exist_ok=True)
open(OUT, 'w').write(S)
L = re.findall(r"\{ id: '(\w+)', who: '(\w)', gap: [\d.]+, text: '(.*?)' \}", S)
json.dump({i: t.replace("\\'", "'") for i, w, t in L}, open(D + '/script.json', 'w'), ensure_ascii=False)
print(len(L), 'falas,', sum(len(t) for i, w, t in L), 'caracteres')
