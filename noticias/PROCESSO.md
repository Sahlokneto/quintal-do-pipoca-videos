# Notícia do Dia: análise das notícias do mundo + vídeo narrado (Reels/Shorts/TikTok 9:16, 60–85 s)

Objetivo: todo dia, descobrir **o assunto mais forte do dia** no mundo (ciência, tecnologia, IA, física, matemática,
química, saúde/remédios/doenças, espaço, inovação e, quando for o caso, geopolítica) e transformar em um vídeo curto,
narrado, visual e **verdadeiro**, com potencial de viralizar.

## 1. Coleta (busca de altíssimo nível, sempre com a data de HOJE)
Faça as buscas no mesmo turno (WebSearch, modo extended), sempre com a data do dia em inglês e português:
- `biggest science and technology news <data>` · `world news today <data> top headlines`
- `medical breakthrough health news <data>` · `AI news <data>` · `space news <data>`
- `notícias mais lidas hoje <data> ciência tecnologia` · `geopolitics news <data> Reuters AP`
Leia (WebFetch) as fontes que listam as manchetes: ScienceDaily (top/science e top/health), agregadores diários
(ex.: "Daily World-Scan"), Al Jazeera, Reuters, AP, BBC, Nature News, Science, Phys.org, MIT Tech Review,
TechCrunch, Olhar Digital, Euronews. Monte uma lista de 8–15 candidatos com fonte e data.

## 2. Pontuação (0–5 em cada critério; escolha a maior soma)
| Critério | Pergunta |
|---|---|
| Peso mundial | Afeta ou interessa muita gente no mundo? Está em vários veículos grandes? |
| Novidade | Aconteceu nas últimas 24–48 h? É inédito ("primeira vez", "167 anos")? |
| Gancho viral | Dá para abrir com uma frase que prende em 2 s (número chocante, mistério, "pode mudar tudo")? |
| Visual | Dá para mostrar com gráficos/animação (números, mapas, planetas, moléculas, linhas do tempo)? |
| Confirmação | Pelo menos 2 fontes sérias independentes? (se < 2, nota 0 e descarta) |
| Risco | Pouco polêmico/partidário e sem risco de desinformação? (geopolítica e saúde exigem mais cuidado) |
Desempate: ciência/tecnologia/saúde antes de política partidária. Nunca escolha boato, "cura milagrosa", tragédia
explorada ou tema que dependa de foto de pessoa real.

## 3. Regras de verdade (obrigatórias)
- Cada número e afirmação do roteiro precisa estar em fonte lida hoje. Anote as fontes em `fontes.txt`.
- Afirmação ainda não confirmada = dizer isso no vídeo ("diz ter", "ainda não verificado", "estudo em ratos").
- Saúde: nunca dar conselho médico; dizer "estudo", "experimental", "ainda em teste" quando for o caso.
- Geopolítica: neutro, só fatos, sem opinião nem lado.
- Sem foto de pessoa real e sem logotipos; usar gráficos, ícones e animação. Código/telas "de exemplo" levam a etiqueta "ilustração".

## 4. Roteiro (600–900 caracteres, 7–8 falas, ~60–80 s): TENSÃO + CIÊNCIA DE VERDADE, EXPLICADA PARA LEIGO
**Regras do dono (21/11):**
1. **Tensão/risco ("o perigo escondido").** Todo vídeo precisa de uma ameaça, um perigo ou um mistério que dá um frio na barriga.
   Pense no "silo de soja que engole gente": coisa simples com risco real. Ex.: "a poeira da Lua corta como vidro",
   "um erro aqui e a internet inteira fica exposta". Sempre um risco REAL e com fonte, nunca inventado ou exagerado.
2. **Ciência de verdade, bem explicada.** Use 2 ou 3 termos técnicos reais (ex.: "regolito", "sinterização", "porosidade",
   "vácuo") e explique cada um NA MESMA FRASE com algo do dia a dia. Mostre o mecanismo por dentro
   (o que o laser faz nos grãos, o que acontece com as moléculas). O espectador tem que sair se sentindo mais inteligente.
3. **Leigo entende tudo.** Frases curtas, um conceito por fala, cartões na tela com no máximo 4–5 palavras.

Estrutura:
1. **Gancho de tensão** (perigo, mistério ou número chocante, em até 2 s).
2. **O problema e o que está em jogo** (por que isso é difícil ou perigoso).
3. **A virada:** a novidade de hoje (quem, o quê).
4. **Como funciona por dentro:** o mecanismo, com 1 ou 2 termos técnicos explicados.
5. **O resultado.**
6. **O risco que continua:** a ressalva honesta, contada como suspense ("mas ninguém sabe se…").
7. **Fechamento** com pergunta provocante + "segue o canal".
Linguagem de conversa, frases curtas, números escritos por extenso na fala (o ElevenLabs lê melhor).

## 5. Produção
- Vozes: ElevenLabs (conector do usuário), voz **O Viajante | Cinematic Storyteller** `urHXVUOxm0ZDI0ypEYDd`,
  modelo `eleven_v4`, **1 take por fala** (`generations_count: 1`); depois `creative_get_flow_run_status` e baixar o
  `content_url` (curl) para `mp3/L1.mp3…`. Confira antes o saldo com `account_get_usage`.
- `python3 ../ranaitech/tools/prep_audio.py <pasta>` → `aud/*.wav` + `durs.json`.
- Página: copie `exemplos/2026-11-21-riemann/news.html` (2D, rápido) ou `exemplos/piloto-terra/terra.html` (3D, Three.js)
  e troque LINES (legendas). O exemplo no estilo certo (tensão + ciência) é `exemplos/2026-11-21-lua-tensao/lua2.html` (vinheta vermelha, batida de coração na música, zoom em grãos) (3D, linguagem simples); remova a faixa do topo se usar o de Riemann cenas e cartões pelo tema do dia. **Sem faixa "Notícia do dia" e sem data na tela** (a data e as fontes vão só na legenda do post).
  Legenda da fala embaixo (y ≈ 1020), cartões/gráficos no meio, nada importante nos 15% de baixo.
- Conferir: `node tools/shots.js t1,t2,...` (≈15 momentos), montar folha e **olhar** (texto sobreposto, áreas vazias, cortes).
- Render: 3 processos (`node tools/render.js 0 3` …) → `frames/`; música: `python3 tools/music.py` (lê timeline.json e aud/) →
  `audio.wav`; `ffmpeg -framerate 24 -i frames/f%05d.jpg -i audio.wav … -movflags +faststart video.mp4`.
- Legenda do post: gancho + 3 linhas do que aconteceu + ressalva + pergunta + 4–5 hashtags + "Fontes: …".

## 6. Entrega
Enviar ao Rubens: tema escolhido e por quê (tabela de pontuação curta), o MP4, a legenda e as fontes. Publicar só com aprovação.
