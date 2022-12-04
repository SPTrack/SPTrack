import bdProjeto
from platform import system
from psutil import process_iter
import os,time

rest = bdProjeto.ListaComportamento(system())

i=0
while True:
 
 for proc in process_iter():

  for x in range(len(rest)):
   try:
    if rest[x][0] in proc.name():      


      if system() == 'Windows':
       os.system(f" taskkill /PID {proc.pid} /F ")

    
      else:
        os.system(f"kill -9 {proc.pid}")
        print(f'Processo {proc.pid} morto com sucesso!')

      morto = bdProjeto.InsertMortos(proc.name())    
   
   except:
      print(f'Erro ao matar o processo {proc.pid}!')
      pass
 if i%20==0:
   rest=None
   morto=None
   rest = bdProjeto.ListaComportamento(system())
 i+=1
 time.sleep(3) 