#!/bin/sh
# uso: sh build.sh estatua est  -> work/estatua.html
d=examples/$1; p=$2
cat danca_head.js danca_map.js pique2_kid.js $d/${p}_head.js common_faces.js qp_lib.js $d/${p}_spec.js common_frameon.js common_framec.js qp_tail.js > work/$1.html
