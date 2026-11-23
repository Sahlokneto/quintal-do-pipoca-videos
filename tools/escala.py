# Escala dos canais (decisão do dono em 23/11/2026).
# RanaiTech: um dia sim, um dia não (dias "ranaitech" = 23/11/2026, 25/11, 27/11, ...).
# Segredos da Escritura: 2 vídeos nos dias do RanaiTech (12h e 19h) e 3 nos outros (12h, 15h e 19h).
# Uso: python3 tools/escala.py  -> imprime um JSON com o plano de HOJE (fuso America/Sao_Paulo).
import json, datetime, zoneinfo, sys
hoje = datetime.datetime.now(zoneinfo.ZoneInfo('America/Sao_Paulo')).date()
if len(sys.argv) > 1: hoje = datetime.date.fromisoformat(sys.argv[1])
ranai = (hoje - datetime.date(2026, 11, 23)).days % 2 == 0
print(json.dumps({
  'data': hoje.isoformat(),
  'ranaitech_hoje': ranai,
  'ranaitech_horario': '18:00' if ranai else None,
  'biblia_videos': 2 if ranai else 3,
  'biblia_horarios': ['12:00', '19:00'] if ranai else ['12:00', '15:00', '19:00'],
}, ensure_ascii=False))
