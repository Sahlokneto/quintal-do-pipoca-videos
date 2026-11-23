# Curiosidades da Bíblia: processo de pesquisa, análise e produção (Reels/Shorts/TikTok 9:16, 70–100 s)

Objetivo: espalhar o evangelho explicando a Bíblia de um jeito que qualquer pessoa entende, com o "uau" de quem
descobre algo escondido: palavras em hebraico e grego, costumes da época, parábolas e milagres explicados,
história e descobertas arqueológicas.

## 1. O que está dando engajamento (pesquisa vidIQ, ago–nov/2026, Brasil, Instagram + TikTok)
| Vídeo (perfil) | Resultado | O que funcionou |
|---|---|---|
| "O mistério da primeira palavra da Bíblia" (@hebraico.revelado) | 783 mil views, 48× a média do perfil | hebraico + "mistério escondido", pergaminho e voz calma |
| "Ninguém chamava Jesus de Jesus" (@voceebiblia) | 1,1 milhão | origem de um nome (Yeshua), animação 2D rápida |
| "Camelo e o fundo da agulha" (@apostolorogeriooficial) | 587 mil, 1.124× a média | "por que Jesus disse X?" + contexto histórico |
| "Por que o véu rasgou de cima para baixo?" (@pitadadefe) | 136 mil, 352× a média | pergunta "por quê" + detalhe que ninguém percebe |
| "Jericó: 7 dias, 7 voltas, 7 trombetas" (@lume.biblia) | 311 mil, 129× a média | padrão de números, animação 2D minimalista |
| "Territórios da Bíblia hoje" (@otiago.correa) | 1,8 milhão | mapa antes × hoje |
| "Chineses registraram fenômenos da crucificação" (@eduardobatista) | 546 mil | evidência histórica fora da Bíblia |

**Padrões:** (1) gancho em forma de pergunta "Por que…?" ou "Ninguém percebe…"; (2) palavra original em
hebraico/grego mostrada na tela; (3) prova externa (arqueologia, historiadores, mapas); (4) visual de pergaminho,
2D animado, voz calma + música épica/orquestral; (5) 70–180 s funcionam bem no TikTok.

## 2. Banco de temas (escolha 1 por vídeo; não repetir; marque os feitos)
- Milagres/gestos "estranhos": saliva no cego ✅ · "Eli, Eli, lamá sabactâni" ✅ · Jesus escreveu no chão (Jo 8) · figueira amaldiçoada · água em vinho (talhas de purificação) · "Talitá cumi".
- Palavras originais: Yeshua · Aleluia · Amém · Shalom · Emanuel · "Eli, Eli, lamá sabactâni" · Bereshit (1ª palavra) · YHWH · Maranata · Ágape × Philia (grego).
- Costumes/objetos: camelo e agulha · véu do templo · INRI · coroa de espinhos · por que 30 moedas · sandália na rua (Rute) · lavar os pés · pão sem fermento.
- Parábolas explicadas: filho pródigo (o pai correndo era vergonha) · bom samaritano (quem eram os samaritanos) · dez virgens (lâmpadas e óleo) · semeador · ovelha perdida.
- Números/padrões: 7 · 40 · 12 · 3 dias · 153 peixes.
- Arqueologia/história: tanque de Siloé ✅ · Pedra de Pilatos · ossário de Caifás · Estela de Tel Dan ("Casa de Davi") · Manuscritos do Mar Morto · Muralha de Jericó · Piscina de Betesda · casa de Pedro em Cafarnaum · selos de Ezequias e Isaías.
- Mapas: lugares da Bíblia hoje (Babilônia = Iraque, Ninive = Mossul, Éfeso = Turquia…).

## 3. PROMPT DE PESQUISA (use sempre, antes de escrever)
1. Escolha o tema no banco (ou um tema em alta: datas cristãs, notícia de descoberta arqueológica da semana:
   busque `biblical archaeology discovery <mês ano>` e `descoberta arqueológica bíblia <mês ano>`).
2. Leia o texto bíblico completo do trecho (capítulo inteiro) e anote versículos exatos.
3. Busque (WebSearch + WebFetch, no mesmo turno): o significado da palavra no original (hebraico/grego) com
   transliteração; o contexto histórico/cultural da época; o que os Pais da Igreja ou comentaristas clássicos dizem;
   evidência externa (arqueologia, historiadores antigos como Josefo, Tácito, Plínio; Mishná/Talmude).
   Fontes boas: Biblical Archaeology Society, Bible Hub (léxico Strong), Blue Letter Bible, Britannica, Wikipedia
   (para achar a fonte primária), sites de museus/universidades, Israel Antiquities Authority.
4. Cada fato do roteiro precisa de fonte anotada em `fontes.txt`. Interpretação teológica sempre atribuída
   ("Irineu de Lyon via…", "muitos estudiosos entendem…"). Nunca inventar etimologia nem "código secreto" sem fonte.
5. Respeito: falar com reverência, sem atacar outras religiões ou denominações; sem rosto de Jesus/pessoas reais
   (usar símbolos, pergaminho, letras, mapas, objetos, luz).

## 4. Roteiro (8 falas, 900–1.100 caracteres, ~80–95 s): mistério + palavra original + prova + fé
1. **Gancho "Por que…?"/estranheza** (o que parece estranho ou que ninguém percebe).
2. **Contexto da época** (costume, crença, cultura).
3. **A chave escondida**: palavra no original, com escrita e pronúncia ("em hebraico, homem é adám, terra é adamá").
4. **A ligação com outra parte da Bíblia** (ex.: Gênesis) e quem já via isso (Pais da Igreja).
5. **O detalhe que quase ninguém percebe** (tensão: sábado, proibição, risco).
6. **O lugar/objeto e o mistério** ("por séculos ninguém sabia onde ficava").
7. **A prova da arqueologia/história** (data, quem achou, o quê).
8. **Fechamento de fé + pergunta** ("Você já sabia disso? Comenta e segue o canal pra mais curiosidades da Bíblia").
Linguagem de leigo, termos explicados na mesma frase, números por extenso na fala.

## 5. Produção
- Voz ElevenLabs **O Viajante** `urHXVUOxm0ZDI0ypEYDd`, `eleven_v4`, 1 take por fala; baixar mp3 → `mp3/L1.mp3…`.
- `python3 ../ranaitech/tools/prep_audio.py <pasta>` → aud/ + durs.json.
- Página: copiar `exemplos/01-saliva-cego/bib.html` (2D, pergaminho escuro, poeira dourada, letras hebraicas com a
  fonte FreeSerifBold, títulos em Lora) e trocar LINES, cartões e desenhos de cada cena. Sem faixa/data na tela.
- **Cores: variar a cada vídeo (pedido do dono, 23/11).** Os vídeos 1 e 2 usaram marrom/pergaminho. Não repetir a
  paleta do vídeo anterior: escolha uma da lista abaixo que combine com o tema e anote no `legenda.txt` qual foi usada.
  Troque o gradiente do fundo (`bg`), a cor das letras hebraicas/títulos, a poeira, o brilho e a borda dos cartões.
  | Paleta | Fundo (gradiente) | Destaque (títulos/hebraico) | Bom para |
  |---|---|---|---|
  | Azul noite | #0b1a3a → #03060f | #9fd8ff / branco | água, Siloé, Jordão, céus, criação |
  | Púrpura real | #2a0f3d → #0c0414 | #e6c3ff / dourado | reis, Davi, realeza, Apocalipse |
  | Verde oliva | #1f2e14 → #070b04 | #d9f2a2 | parábolas do campo, figueira, semeador, Jardim |
  | Vermelho carmim | #3a0a10 → #0d0204 | #ffb3a8 / dourado | cruz, sangue, Páscoa, sacrifício |
  | Areia do deserto | #6b4a24 → #1c1208 | #fff0c9 | Êxodo, Moisés, deserto, Abraão |
  | Azul-petróleo | #0a3335 → #021012 | #8ff5e6 | mar da Galileia, pesca, Jonas |
  | Pergaminho/marrom | #3a2615 → #120a05 | #ffd98a | (já usado nos vídeos 1 e 2; usar com moderação) |
- Conferir com `node tools/shots.js …` + folha de contato (olhar!), render em 3 processos, `music.py` (acordes menores,
  batida grave só no gancho e no "detalhe proibido"), ffmpeg.
- Legenda do post: pergunta-gancho + 4 tópicos com 🔹 (palavra original escrita em hebraico/grego) + pergunta +
  5 hashtags (#biblia #curiosidadesbiblicas #jesus + 2 do tema) + "Fontes: …".

## 6. Contas e publicação (conector vidIQ **"VidIQ Segredos Bíblicos"**, ferramentas `mcp__VidIQ_Segredos_B_blicos__*`)
NUNCA usar o conector vidIQ antigo (é do Pipoca/RanaiTech) para este canal.
| Rede | Conta | platformAccountId |
|---|---|---|
| Instagram | @segredosdaescritura | 30023239467279032 |
| TikTok | Segredos da Escritura Bíblica | _000BrE_LvCDnZf0LdK-00hFq_NtMVunMm0M |
| YouTube | @segredosescritura | UCquG2Dl9xeQEk5_uvwJaAAg |
Fluxo: `vidiq_video_upload` (URL raw do GitHub) → `vidiq_social_post_draft_create` com os 3 destinos → publicar só após aprovação do dono.

## 7. Rotina diária (tarefa agendada, desde 23/11)
- **2 vídeos por dia**, publicação às **12:00** e **19:00** (Brasília, -03:00), nos 3 destinos da seção 6.
- Orçamento ElevenLabs (plano Creator, ~121 mil caracteres/mês, dividido com o RanaiTech que usa ~26 mil):
  cada vídeo entre 900 e 1.100 caracteres. Antes de gerar, confira o saldo (`account_get_usage`); se faltar
  menos de 3.000 caracteres para o limite, faça só 1 vídeo e avise o dono.
- Os 2 vídeos do dia: temas diferentes do banco (de categorias diferentes) e **paletas diferentes entre si e do último vídeo**.
- Arquivos: `biblia/videos/AAAA-MM-DD-<slug>/` com `<slug>.mp4`, `legenda.txt` (com a paleta usada), `fontes.txt`, a página .html.
  Apague frames/, aud/, mp3/ antes do commit. Marque o tema como ✅ no banco (seção 2).
