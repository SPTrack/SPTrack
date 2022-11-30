from time import sleep
from datetime import datetime
from psutil import virtual_memory, disk_usage, cpu_percent

def run(cursor, conexao, idEquipamento, idCPU, idRAM, idDK):
    dados = []
    
    cursor.execute(f'''SELECT tarefa.* FROM tarefaXequipamento JOIN tarefa ON tarefaXequipamento.fkTarefa = tarefa.idTarefa JOIN equipamento ON 
                        tarefaXequipamento.fkEquipamento = equipamento.idEquipamento WHERE equipamento.idEquipamento = {idEquipamento} AND tarefa.dataInicio <= NOW();''')
    dados = cursor.fetchall()
        
    if len(dados) == 0:
        print('Nenhuma tarefa programada.')
        run()
        
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
                    print("Entrou")
                    cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {round(cpu_percent(), 2)}, NOW(), {idCPU}, {tarefa[0]})")
                    conexao.commit()

                    cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {round(virtual_memory().used / (1024.0 ** 3), 3)}, NOW(), {idRAM}, {tarefa[0]})")
                    conexao.commit()

                    cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {disk_usage('/').used / (1024.0 ** 2)}, NOW(), {idDK}, {tarefa[0]})")
                    conexao.commit()

            cont += 1

            if cont == fimCont:
                print("Fim da contagem")
                sleep(2)