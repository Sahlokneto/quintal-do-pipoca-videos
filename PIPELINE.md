# Quintal do Pipoca — como os vídeos são feitos

Canal infantil no YouTube (Shorts 9:16, ~60 s). Quatro crianças de peças de montar e o cachorrinho Pipoca brincando no quintal.
Cada vídeo é **uma brincadeira infantil nova**, simples, engraçada, sem violência, sem marcas ou personagens conhecidos.

## Personagens (fixos)
- **Léo** (azul, cabelo castanho), **Bia** (rosa, cabelo escuro), **Teo** (laranja, cabelo loiro), **Duda** (verde, cabelo ruivo).
- **Pipoca**: cachorrinho branco com manchas marrons. Sempre tem um papel engraçado (juiz, ajudante, "rouba a cena").
- Criados por `makeKid(...)` (pique2_kid.js) e `makeDog()` (danca_map.js). Cores das crianças: ver `common_faces.js`.

## Brincadeiras já feitas (NÃO repetir)
1. Dança das Cadeiras · 2. Cabo de Guerra na Lama · 3. Corrida de Saco · 4. Pula Corda · 5. Amarelinha · 6. Boliche no Quintal · 7. Bolhas de Sabão
· 8. Estátua · 9. Batata Quente · 10. Ovo na Colher
· 11. Morto-Vivo · 12. Telefone sem Fio · 13. Pênalti (chute ao gol)
· 14. Cabra-cega · 15. Banho do Pipoca (lavar o Pipoca) · 16. Caça ao Tesouro
· 17. Pipa · 18. Guerra de Travesseiro · 19. Castelo de Areia
· 20. Piquenique · 21. Plantar uma Árvore · 22. Trem de Caixas
· 23. Mímica · 24. Desfile de Fantasias · 25. Pega-pega
· 26. Passa Anel · 27. Lava-Carro de brinquedo · 28. Circo no Quintal
· 29. Peteca · 30. Bola de Gude · 31. Siga o Mestre
· 32. Corre Cutia · 33. Barquinho de Papel na Poça · 34. Rabo do Burro
(Também já existiu um Pique-Esconde fora do canal.)
**Ideias ainda não usadas:** cama de gato, esconde-esconde de brinquedo,
acampamento no quintal, corrida de carrinho de mão, pião, elefante colorido, ciranda, queimada (com bola macia), dança da vassoura, etc.
Atualize esta lista a cada vídeo novo.

## Regras de qualidade (o dono do canal cobra isso)
1. **Roteiro primeiro**: escrever o roteiro completo (personagens, mapa, fluxo cena a cena com tempos, música, câmera) e só então animar.
2. **Formato vertical de verdade**: a ação acontece numa área compacta e em profundidade (eixo z), não espalhada na horizontal.
3. **Ninguém cortado na tela**: usar `frameOn(nomes, α, elevação, fov, margem, pontosExtras)` (common_frameon.js) que calcula a distância
   da câmera para caber todos os alvos. Planos abertos = todos os personagens (`ALL`). Close só quando o personagem está isolado
   (sem ninguém por perto que apareça pela metade). Conferir sempre os quadros.
4. **Colisão**: ninguém atravessa objeto/pessoa; planejar caminhos que desviam.
5. **Variedade**: cada vídeo com falas, piadas e final diferentes (não repetir sempre "Empate!", "De novo!", "Tchau, turma!").
6. Balões de fala curtos, posicionados para não sair da tela (desloque com `kp(nome, altura, dx)`).
7. Final alegre com aceno/comemoração + confete; frase final diferente a cada vídeo.
8. **Chamada para seguir (obrigatório)**: nos últimos ~4,5 s, enquanto a turma acena, entra no topo da tela o card
   "Gostou da brincadeira? Siga o canal!" com joinha, botão SEGUIR (o dedinho clica e vira SEGUINDO!), sininho e coraçõezinhos.
   É aplicado no MP4 pronto com `python3 tools/cta.py x.mp4 x_final.mp4` (o arquivo final é o x_final, renomeie para <nome>.mp4).
   Para não cobrir nada: o plano final deixa ~35% de cima da tela livre (céu/fundo, personagens da metade para baixo)
   e o último balão de fala termina pelo menos 4,5 s antes do fim do vídeo. Confira 1 quadro do fim com o card.

## Estrutura de um vídeo (ver `engine/examples/bolhas` — o exemplo mais recente e completo)
Página HTML = `danca_head.js` + `<seu>_map.js` + `pique2_kid.js` + `<seu>_logic.js`, onde
- `<seu>_map.js` = `danca_map.js` sem o bloco do rádio (`// rádio` até `// cachorrinho Pipoca`) + objetos da brincadeira;
- `<seu>_logic.js` = `<seu>_head.js` (balões) + `common_faces.js` + (rostos extras) + `<seu>_spec.js` (linha do tempo, poses, Pipoca, objetos)
  + `common_frameon.js` + `<seu>_tail.js` (efeitos, balões, câmeras, `frame(t)`).
A página expõe `window.frame(t)`, `window.TOTAL` (segundos) e `window.TL` (tempos para a música).
Personagens usam "clipes" (`hold`, `mv`, `cust`, `turnTo`) avaliados por `stateOf(n,t)`; tudo determinístico em função de t.
**Atenção:** `examples/amarelinha/hop_logic.js` tem uma versão antiga do frameOn com um erro de sinal — use sempre `common_frameon.js`.

## Atalho novo (vídeos 8-10): biblioteca comum `qp_lib.js`
Para não reescrever poses/câmera em cada vídeo: `examples/<nome>/<x>_head.js` (KS, BPM) + `<x>_spec.js` (objetos, T, TL, DG, BW, SH, EXTRA, EV)
e `sh build.sh <nome> <x>` monta `work/<nome>.html` (danca_head + danca_map + pique2_kid + head + common_faces + qp_lib + spec + common_frameon + qp_tail).
`qp_lib.js` traz clipes, poses (dance st 0-3, wave, cheer, clap, laugh, hold, sitg; Pipoca: drun, dwalk, sniff, sit, paw, bark, party, hind),
confete, balões com ajuste automático do texto (`makeBubs`) e `frameLow(...)` = plano final com ~35% do topo livre para o card de seguir.
`sh shots.sh <nome> t1,t2,... folha.png` gera a folha de contato; `node tools/coll.js work/<nome>.html 0.7` lista personagens perto demais (colisão);
`python3 mkthumb.py <nome> "frameOn(...)"` cria a página da thumbnail. Música: `qp_music.py` (sintetizador) + `examples/<nome>/<nome>_music.py tl.json saida.wav`.
Exemplos: `examples/estatua`, `examples/batata`, `examples/ovo`, `examples/mortovivo`, `examples/telefone`, `examples/penalti`, `examples/cabracega`, `examples/banho`, `examples/tesouro`, `examples/pipa` (objetos no céu: `framePts` com pontos 3D), `examples/travesseiro` (objeto preso no antebraço), `examples/castelo` (caixa de areia, `frameLow2` com pontos do chão), `examples/piquenique` (crianças sentadas `sitg`, objetos na mão com `hands()`), `examples/arvore` (passagem do tempo mudando o céu, `frameLowT` com o topo da árvore), `examples/trem` (personagens seguindo um trilho oval por comprimento de arco, caixas "vestidas"), `examples/mimica` (plateia nos dois lados com o meio livre para a câmera ver o palco), `examples/desfile` (fantasias que seguem cabeça/tronco via matrixWorld e voam do baú), `examples/pegapega` (perseguição no oval + estrela do pegador), `examples/passaanel` (objeto preso no focinho do Pipoca como filho de dog.head), `examples/lavacarro` (carro que anda com criança sentada dentro, jato de água em partículas, espuma), `examples/circo` (cartola presa na cabeça, malabares, haltere nas mãos, bambolê de frente para a câmera), `examples/peteca` (objeto voando em arcos de mão em mão com pontos de contato calculados no instante do tapa), `examples/gude` (crianças sentadas em roda, bolinhas rolando com segmentos de rolagem, objeto levado na boca do Pipoca), `examples/mestre` (fila em profundidade com ações em cascata e troca de mestre; trenzinho seguindo um caminho por comprimento de arco), `examples/cutia` (roda sentada + pista em volta por ângulo, ultrapassagem por pista de fora, lencinho na mão/chão/boca; câmera fixa `WD` em volta do centro da roda, sem zoom automático), `examples/barco` (poça de água acima dos pinos do chão, barquinhos de papel com ExtrudeGeometry, gotas de splash, objeto na cabeça do Pipoca), `examples/burro` (cavalete com desenho em canvas, vendas, giro + caminhada tateando, objetos pregados no desenho).
**Novo: `common_framec.js` → `frameC(nomes,α,elev,fov,margem,extras,zoom)`** (já incluído pelo build.sh): igual ao frameOn, mas centraliza os personagens na vertical; com `zoom` (ex.: 1.3) aproxima até os personagens ocuparem essa fração da tela. Câmeras mais altas (elevação 40-50) aproveitam melhor a tela vertical.
**Atenção:** não use `H` nem `W` como nomes de variáveis no spec (são o tamanho da tela; a câmera vira NaN e o quadro fica só céu).
Obs.: a máquina da nuvem tem 2 núcleos: renderize com 2 processos (`render.js ... 0 2` e `1 2`), ~12 min por vídeo; não use o nome `L2` para variáveis (é a função de interpolação).
`node tools/ev.js work/<nome>.html "expr"` avalia uma expressão na página (útil para depurar estados).
Obs.: `work/h` precisa ser um link para `../h` (three.js): `ln -sf ../h engine/work/h`.

## Passo a passo
```
cd engine && mkdir -p work && cd work  (ou trabalhe direto em engine/)
cat danca_head.js X_map.js pique2_kid.js X_logic.js > x.html
node tools/shots.js x.html 2,5,8,...   &&  python3 tools/sheet.py folha.png 2,5,8,...   # conferir ~25 quadros (Read na folha)
# corrigir até ninguém estar cortado/atravessando; depois renderizar em 3 processos em segundo plano:
nohup sh -c 'node tools/render.js x.html xf 0 3 & node tools/render.js x.html xf 1 3 & node tools/render.js x.html xf 2 3 & wait; touch x.done' &
node tools/dumptl.js x.html x_tl.json ; python3 x_music.py        # música sintetizada (numpy) sincronizada com TL
ffmpeg -y -framerate 24 -i xf/f%05d.jpg -i x.wav -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart x.mp4
# conferir 1 quadro a cada 60 numa folha; corrigir trechos com tools/part.js
python3 tools/cta.py x.mp4 x_cta.mp4 && mv x_cta.mp4 x.mp4   # chamada para seguir no final (regra 8)
```
Render: ~25 min por vídeo de 60 s (3 processos). Cada chamada de comando tem limite de ~10 min: use segundo plano + espera em laço.

## Thumbnail (1080x1920)
Copiar a página trocando `width="720" height="1280"` → 1080x1920 e `var W=720,H=1280;` → `var W=1080,H=1920;`, desligar balões,
render com `tools/thumbshot.js` no momento mais engraçado/suspense, e texto com
`python3 tools/thumbtext.py th0.png thumb-x.png "LINHA 1" "LINHA 2?" "NOME DA BRINCADEIRA" "#corDaFaixa"`. Personagens não podem ficar sob o texto.

## Descrição (padrão)
```
Título:
<Brincadeira> com o Pipoca! <emojis> <pergunta curta> #shorts

Descrição:
<3-4 linhas engraçadas contando o vídeo, com emojis>

<pergunta para o público> 👇

🔔 Inscreva-se no Quintal do Pipoca para ver mais brincadeiras da turma!

#<brincadeira> #brincadeirasinfantis #desenhoinfantil #animaçãoinfantil #shorts
```

## Onde salvar
- Repositório: `videos/video-N/` com `<nome>.mp4`, `thumb-<nome>.png`, `descricao.txt` (N continua a numeração; último = 34).
- Computador do dono (se a sessão estiver ligada ao PC): `D:\Neto\Videos_Claude_RanaiTech\Youtube_AuAuBrincadeiras\video-N\` (mesmos arquivos).

## Publicação (vidIQ) — o mesmo vídeo vai para 3 contas, num único rascunho
- YouTube "Quintal do Pipoca": platformAccountId `UC-odYbtOPKQS1k_ypSZlSAQ`
- Instagram @quintaldopipocaoficial: platformAccountId `30161432880112305`
- TikTok quintaldopipocaoficial ("Pipoca"): platformAccountId `_000l9fRRNknjJYv_W3QWe_f6vOSTbUGUS8w`
(Confira com `vidiq_social_account_list`; se o id mudou, use o novo. NÃO usar a @ranaitech: ela é só de programação.)

1. Vídeo: `vidiq_video_upload` com url `https://raw.githubusercontent.com/Sahlokneto/quintal-do-pipoca-videos/main/videos/video-N/<nome>.mp4` (depois do push).
2. Thumbnail (tentar 1 vez; se o YouTube recusar ou limitar, siga sem ela — o dono não se importa, NÃO insista nem gaste créditos com vidiq_update_video_thumbnail): `vidiq_upload_image` sem imagem → PUT do PNG no uploadUrl (curl) → `vidiq_upload_image` com transferId.
3. `vidiq_social_post_draft_create` com UM rascunho por vídeo, media = o vídeo, publishAt (Brasília -03:00) e 3 destinos:
   - YOUTUBE: title, text = descrição, privacyStatus public, thumbnailImageId, categoryId 1, tags.
   - INSTAGRAM: text = título + descrição (legenda, até 2200 caracteres).
   - TIKTOK: text = título + 3-5 hashtags (curto), privacyLevel PUBLIC_TO_EVERYONE, allowComment true,
     musicUsageConfirmed true, isAiGenerated true (escolhas do dono, confirmadas em 16/11/2026).
   Se algum destino voltar recusado, corrija com `vidiq_social_post_draft_update` (nunca crie um segundo rascunho).
4. **Horários**: 09:00, 12:00 e 18:00 (Brasília). Os 3 vídeos do dia saem SEMPRE no mesmo dia (decisão do dono, 21/11/2026): se um horário já passou
   (ex.: o dono aprovou às 10h), esse vídeo sai atrasado, na hora da aprovação (sem publishAt); nunca empurrar para o dia seguinte.
5. **Só chamar `vidiq_social_post_publish` depois que o dono aprovar** (ele responde "pode publicar"/"pode agendar" na conversa).
   Depois confira cada destino com `vidiq_social_post_status`.
