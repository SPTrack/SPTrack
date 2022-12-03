from time import sleep
from datetime import datetime
from psutil import virtual_memory, disk_usage, cpu_percent
import pymysql
import pyodbc
import getmac

def run(idEquipamento, idCPU, idRAM, idDK, modo):
    dados = []
    if modo == 'dev':
        conexao = pymysql.connect(host="localhost", user="sptrackClient", password="urubu100", database="SPTrack")
    elif modo == 'prod':
        try:
            conexao = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+"sptrack.database.windows.net" +
                                 ';DATABASE='+"SPTrack"+';ENCRYPT=yes;UID='+"sptrackClient"+';PWD=' + "Sprint2SPTrack")
        except:
            conexao = pymysql.connect(host="localhost", user="sptrackClient", password="urubu100", database="SPTrack")
            modo = 'dev'
    cursor = conexao.cursor()
    
    if modo == 'dev':
        cursor.execute(f'''SELECT tarefa.* FROM tarefaXequipamento JOIN tarefa ON tarefaXequipamento.fkTarefa = tarefa.idTarefa JOIN equipamento ON 
                        tarefaXequipamento.fkEquipamento = equipamento.idEquipamento WHERE equipamento.idEquipamento = {idEquipamento} AND tarefa.dataInicio <= NOW();''')
        dados = cursor.fetchall()
    elif modo == 'prod':
        cursor.execute(f'''SELECT tarefa.* FROM tarefaXequipamento JOIN tarefa ON tarefaXequipamento.fkTarefa = tarefa.idTarefa JOIN equipamento ON 
                        tarefaXequipamento.fkEquipamento = equipamento.idEquipamento WHERE equipamento.idEquipamento = {idEquipamento} AND tarefa.dataInicio <= GETDATE();''')
        dados = cursor.fetchall()

    if len(dados) == 0:
        print('Nenhuma tarefa programada.\nAguardando próxima chamada...')
        sleep(30)
        run(cursor, conexao, idEquipamento, idCPU, idRAM, idDK, modo)
        
    while True:
        sleep(2)
        now = datetime.now()
        cont = 0
        free_pass = False
        fimCont = len(dados)
        for tarefa in dados:    
            isLiberado = True
        
            if tarefa[4] == None:
                isLiberado = False
                
            if tarefa[4] < now:
                isLiberado = False

            if isLiberado:
                diaN = int(now.strftime("%w"))
                diasDisponiveis = [tarefa[5], tarefa[6], tarefa[7], tarefa[8], tarefa[9], tarefa[10], tarefa[11]]
                horarioInicio = [tarefa[12], tarefa[14], tarefa[16], tarefa[18], tarefa[20], tarefa[22], tarefa[24]]
                horarioFim = [tarefa[13], tarefa[15], tarefa[17], tarefa[19], tarefa[21], tarefa[23], tarefa[25]]
                try:
                    hrNow = datetime.strptime(str(now.strftime("%X")), '%X')
                    hrInicio = datetime.strptime(str(horarioInicio[diaN]), '%X')
                    hrFim = datetime.strptime(str(horarioFim[diaN]), '%X')
                    free_pass = True
                except:
                    free_pass = False
            
                if (diasDisponiveis[diaN]) and (hrNow >= hrInicio) and (hrNow <= hrFim) and free_pass:
                    if modo == 'dev':
                        cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {round(cpu_percent(), 2)}, NOW(), {idCPU}, {tarefa[0]})")
                        conexao.commit()

                        cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {round(virtual_memory().used / (1024.0 ** 3), 3)}, NOW(), {idRAM}, {tarefa[0]})")
                        conexao.commit()

                        cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {disk_usage('/').used / (1024.0 ** 2)}, NOW(), {idDK}, {tarefa[0]})")
                        conexao.commit()
                    elif modo == 'prod':
                        cursor.execute(f"INSERT INTO medidaTarefa VALUES({round(cpu_percent(), 2)}, GETDATE(), {idCPU}, {tarefa[0]})")
                        conexao.commit()

                        cursor.execute(f"INSERT INTO medidaTarefa VALUES({round(virtual_memory().used / (1024.0 ** 3), 3)}, GETDATE(), {idRAM}, {tarefa[0]})")
                        conexao.commit()

                        cursor.execute(f"INSERT INTO medidaTarefa VALUES({disk_usage('/').used / (1024.0 ** 2)}, GETDATE(), {idDK}, {tarefa[0]})")
                        conexao.commit()

            cont += 1

            if cont == fimCont:
                sleep(2)