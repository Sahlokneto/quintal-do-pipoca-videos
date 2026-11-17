#!/bin/sh
# uso: sh shots.sh nome t1,t2,... folha.png
cd work && rm -f cz*.jpg && node ../tools/shots.js $1.html $2 && python3 ../tools/sheet.py $3 $2
