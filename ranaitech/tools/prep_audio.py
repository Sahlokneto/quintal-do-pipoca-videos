# Uso: python3 tools/prep_audio.py aulas/aula-N
# Lê aulas/aula-N/mp3/<ID>.mp3 (uma fala por arquivo: P1, C1, P2...), corta silêncio do começo/fim,
# grava aulas/aula-N/aud/<ID>.wav e aulas/aula-N/durs.json {ID: duração em s}.
import sys,os,glob,json,subprocess
d=sys.argv[1]; os.makedirs(d+'/aud',exist_ok=True); durs={}
for f in sorted(glob.glob(d+'/mp3/*.mp3')):
    i=os.path.basename(f)[:-4]; o=f'{d}/aud/{i}.wav'
    af='silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse'
    subprocess.run(['ffmpeg','-v','error','-y','-i',f,'-af',af,'-ac','1','-ar','44100',o],check=True)
    durs[i]=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',o],capture_output=True,text=True).stdout)
json.dump(durs,open(d+'/durs.json','w'))
print(durs)
