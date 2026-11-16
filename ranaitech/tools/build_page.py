# Uso: python3 tools/build_page.py aulas/aula-N/aulaN.html aulas/aula-N/render.html
# Gera a página de render (three.js local, sem fonte externa) a partir da página da aula.
import sys
s=open(sys.argv[1]).read()
s=s.replace('<title>','<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><title>',1)
s=s.replace('<link rel="stylesheet" href="https://fonts.googleapis','<link rel="stylesheet" data-x="https://fonts.googleapis')
s=s.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','../../three.min.js')
open(sys.argv[2],'w').write(s+'\n</body></html>')
