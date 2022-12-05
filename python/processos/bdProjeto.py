import pymssql 
import pymysql.cursors

config = 'desenvolvimento'
#config = 'producao'

if config == 'producao':
 conexao = pymssql.connect(
    server='sptrack.database.windows.net', 
     user='sptrackClient',
     password='Sprint2SPTrack', 
     database='SPTrack')

else:
 conexao = pymysql.connect(
   host='localhost',
   user='sptrackClient',
   password='urubu100',
   database='SPTrack',
 )

cursor = conexao.cursor()

def ListaComportamento(so):
 proc = []

 cursor.execute(f"select arquivos from processos where so = '{so}' and tipoProcesso='blacklist';")
 row = cursor.fetchone()

 while row:
   proc.append(row)
   row = cursor.fetchone()

 return proc

def InsertMortos(arquivo):
  if config == 'producao':
   instrucao = f"insert into processosMortos (nome,horas) values ('{arquivo}',getdate() );"
  else:
    instrucao = f"insert into processosMortos (nome,horas) values ('{arquivo}',now());"
  cursor.execute(instrucao)
  conexao.commit()