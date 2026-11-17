# RanaiTech — aulas de programação com o Professor e o Cubinho (Instagram @ranaitech)

Reels 9:16, ~60–75 s. Sala de aula 3D: o **Professor** (bolinha amarela de óculos) ensina e o **Cubinho** (cubo roxo) aprende,
erra de um jeito engraçado e é corrigido (às vezes é o Cubinho quem corrige o Professor). Lousa mostra o código; ícones/placas
na frente da lousa ilustram o exemplo. Legenda (fala atual) embaixo. Música lo-fi de fundo.

## Aulas feitas (NÃO repetir) — atualize a cada aula
1 Variáveis · 2 If/else · 3 Loops · 4 Funções · 5 Listas · 6 Objetos · 7 Percorrendo listas · 8 Funções com retorno · 9 Operadores lógicos (and/or) ·
10 Como achar erros no código (debug) · 11 Comentários no código

## Próximas aulas (em ordem; a aula N sempre anuncia a N+1 no fim)
12 Textos (strings) e juntar textos · 13 While (repetir até uma condição) · 14 Entrada do usuário (input) · 15 Números aleatórios ·
16 Dicionários na prática · 17 Else if / elif · 18 Operador not · 19 Escopo de variável · 20 Arredondar e operações com números ·
depois: classes, arquivos, try/except, módulos, APIs… (continue a lista se acabar).

## Personagens e vozes (ElevenLabs, conector do usuário — plano Creator, ~121 mil caracteres/mês)
- Professor: voz **Will - Deep, Smooth and Affectionate** `CstacWqMhJQlnfLPxRG4`, modelo `eleven_v4`.
- Cubinho: voz **Lotus - Educational & Engaging** `hzcQtaL2e6Qrqg03np6e`, modelo `eleven_v4` (ver VOZES.md).
- Orçamento: 2 aulas/dia ≈ 850 caracteres cada ≈ 51 mil/mês. Mantenha o roteiro entre 700 e 900 caracteres.
- Gere **1 take** por fala (`generations_count: 1`), nunca repita a geração para "tentar de novo" (cobra de novo).

## Passo a passo (dentro de `ranaitech/`)
1. **Roteiro**: 10–11 falas alternando P/C (IDs P1, C1, P2, C2…; termina com P5 "Na próxima aula: <tema>. Tchau, turma!",
   C5 despedida curta e diferente a cada aula, P6 "curte/compartilha/segue" com frase variada). Uma piada/erro do Cubinho por aula.
   Exemplo de código simples e visual (pizza, jogo, escola…), sem marcas.
2. **Página**: copie a última aula (`base/aula9.html` ou `aulas/aula-<N-1>/aulaN-1.html`) para `aulas/aula-N/aulaN.html` e adapte
   como nos `patches/patchK.py` (eles mostram como cada aula trocou SCRIPT, SPEC de expressões, gestos GP/GC, desenho da lousa
   `drawBoard`, ícones/placas e eventos). Mantenha `window.__retime`, `__timeline`, `__seek`.
   Grave também `aulas/aula-N/script.json` = {ID: texto da fala}.
3. **Vozes**: para cada fala, `creative_generate_speech` (prompt = texto, voice_id do personagem, model eleven_v4, generations_count 1);
   depois `creative_get_flow_run_status` (flow_id + session_ids) até completar; baixe o `content_url` com curl para
   `aulas/aula-N/mp3/<ID>.mp3`. (O domínio elevenlabsusercontent.com está liberado.)
4. `python3 tools/prep_audio.py aulas/aula-N` → aud/*.wav + durs.json
5. `python3 tools/build_page.py aulas/aula-N/aulaN.html aulas/aula-N/render.html` e `node tools/timeline.js aulas/aula-N`
6. Conferir: `node tools/shots.js aulas/aula-N t1,t2,...` (~10 momentos-chave) e **abrir as imagens** (Read). Corrigir lousa
   cortada, texto saindo da placa, legenda cobrindo algo importante, erros de JS.
7. Render em 3 processos em segundo plano:
   `nohup sh -c 'node tools/render.js aulas/aula-N 0 3 & node tools/render.js aulas/aula-N 1 3 & node tools/render.js aulas/aula-N 2 3 & wait; touch aulas/aula-N/done' &`
   (~20–25 min; cada comando tem limite de 10 min: espere em laço curto checando o arquivo `done`).
8. `python3 tools/mix.py aulas/aula-N` e
   `ffmpeg -y -framerate 24 -i aulas/aula-N/frames/f%05d.jpg -i aulas/aula-N/audio.wav -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -c:a aac -b:a 160k -shortest -movflags +faststart aulas/aula-N/aulaN-<tema>.mp4`
   Confira alguns quadros do MP4 (ffmpeg -ss … -frames:v 1).
9. Legenda em `aulas/aula-N/legenda.txt` (padrão abaixo). Apague frames/, aud/, mp3/ e render.html antes do commit
   (só ficam: aulaN.html, script.json, durs.json, legenda.txt e o .mp4). Atualize a lista "Aulas feitas". Commit + push.

## Legenda (padrão que o canal já usa)
```
<1–2 frases explicando o conceito>. Nesta aula <o que o Cubinho erra/descobre>. 😅

<emoji> <exemplo de código em 1 linha>
👉 <regra 1>
👉 <regra 2>
👉 <regra 3>

Próxima aula: <tema>! Curte, compartilha com um amigo e segue o canal pra não perder. 💛

#programação #<tema> #aprenderprogramação #python #lógicadeprogramação
```
(Use no máximo 5 hashtags, todas com #.)

## Publicação (vidIQ, Instagram @ranaitech, platformAccountId `29301075916192797`)
1. `vidiq_video_upload` com a URL raw: `https://raw.githubusercontent.com/Sahlokneto/quintal-do-pipoca-videos/main/ranaitech/aulas/aula-N/<arquivo>.mp4`
2. `vidiq_social_post_draft_create`: destino INSTAGRAM 29301075916192797, media = vídeo, text = legenda, publishAt 12:00 (1ª aula)
   e 18:00 (2ª aula) de hoje, horário de Brasília (-03:00). Se o horário já passou, use o próximo (18:00 ou 12:00 do dia seguinte).
3. **Só publicar (`vidiq_social_post_publish`) depois que o Rubens aprovar** ("pode publicar"). Nunca usar as contas do Quintal do Pipoca.
