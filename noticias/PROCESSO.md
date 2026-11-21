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

## 4. Roteiro (500–850 caracteres, 6–8 falas, ~55–75 s) — PARA LEIGO TOTAL
**Regra de ouro (pedido do dono):** explicar como se fosse para alguém que não sabe nada do assunto.
Sem termos técnicos (nada de "função zeta", "regolito", "sinterização"); quando não tiver jeito, explique na mesma frase
com algo do dia a dia ("como uma impressora 3D", "igual brinquedo de montar"). Frases curtas. Um conceito por fala.
Sempre diga por que aquilo importa para a vida da pessoa. Cartões na tela com no máximo 4–5 palavras.
1. Gancho (1 frase, número/mistério). 2. O que é (contexto simples). 3. Por que importa. 4. A novidade de hoje
(quem, o quê). 5. A ressalva honesta. 6. Fechamento com pergunta para comentários + "segue o canal".
Linguagem de conversa, frases curtas, números escritos por extenso na fala (o ElevenLabs lê melhor).

## 5. Produção
- Vozes: ElevenLabs (conector do usuário), voz **O Viajante | Cinematic Storyteller** `urHXVUOxm0ZDI0ypEYDd`,
  modelo `eleven_v4`, **1 take por fala** (`generations_count: 1`); depois `creative_get_flow_run_status` e baixar o
  `content_url` (curl) para `mp3/L1.mp3…`. Confira antes o saldo com `account_get_usage`.
- `python3 ../ranaitech/tools/prep_audio.py <pasta>` → `aud/*.wav` + `durs.json`.
- Página: copie `exemplos/2026-11-21-riemann/news.html` (2D, rápido) ou `exemplos/piloto-terra/terra.html` (3D, Three.js)
  e troque LINES (legendas). O exemplo mais recente e no estilo certo é `exemplos/2026-11-21-lua/lua.html` (3D, linguagem simples); remova a faixa do topo se usar o de Riemann cenas e cartões pelo tema do dia. **Sem faixa "Notícia do dia" e sem data na tela** (a data e as fontes vão só na legenda do post).
  Legenda da fala embaixo (y ≈ 1020), cartões/gráficos no meio, nada importante nos 15% de baixo.
- Conferir: `node tools/shots.js t1,t2,...` (≈15 momentos), montar folha e **olhar** (texto sobreposto, áreas vazias, cortes).
- Render: 3 processos (`node tools/render.js 0 3` …) → `frames/`; música: `python3 tools/music.py` (lê timeline.json e aud/) →
  `audio.wav`; `ffmpeg -framerate 24 -i frames/f%05d.jpg -i audio.wav … -movflags +faststart video.mp4`.
- Legenda do post: gancho + 3 linhas do que aconteceu + ressalva + pergunta + 4–5 hashtags + "Fontes: …".

## 6. Entrega
Enviar ao Rubens: tema escolhido e por quê (tabela de pontuação curta), o MP4, a legenda e as fontes. Publicar só com aprovação.
