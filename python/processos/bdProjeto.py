import pymssql 
conexao = pymssql.connect(
    server='sptrack.database.windows.net', 
     user='sptrackClient',
     password='Sprint2SPTrack', 
     database='SPTrack')  

cursor = conexao.cursor()  

def ListaComportamento(so):
 proc = []
 row = None

 cursor.execute(f"select arquivos from processos where so = '{so}' and tipoProcesso='blacklist';")  
 row = cursor.fetchone()

 while row:  
   proc.append(row)
   row = cursor.fetchone()
   
 return proc

def InsertMortos(arquivo):
  instrucao = f"insert into processosMortos (nome,horas) values ('{arquivo}',getdate() );"
  cursor.execute(instrucao)
  conexao.commit()

