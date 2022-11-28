from time import sleep
from datetime import datetime
from psutil import virtual_memory, disk_usage, cpu_percent

def run(cursor, conexao, idEquipamento, idCPU, idRAM, idDK):
    # Atenção desenvolvedor: A query possui um erro lógico proposital devido a limitação do MySQL. O erro é tratado por meio do Python
    dados = []

    try:
        cursor.execute(f'''SELECT tarefa.* FROM tarefaXequipamento JOIN tarefa ON tarefaXequipamento.fkTarefa = tarefa.idTarefa JOIN equipamento ON 
                       tarefaXequipamento.fkEquipamento = equipamento.idEquipamento WHERE equipamento.idEquipamento = {idEquipamento} AND tarefa.dataInicio <= NOW();''')
        dados = cursor.fetchall()
    except:
        print('Nenhuma tarefa programada.')
        run()

    while True:
        now = datetime.now()
        cont = 0
        fimCont = len(dados)
        for tarefa in dados:      
            isLiberado = True

            if not(tarefa[4] == None or tarefa[4] >= now):
                isLiberado = False

            if isLiberado:
                diaN = int(now.strftime("%w"))
                diasDisponiveis = [tarefa[5], tarefa[6], tarefa[7], tarefa[8], tarefa[9], tarefa[10], tarefa[11]]
                horarioInicio = [tarefa[12], tarefa[14], tarefa[16], tarefa[18], tarefa[20], tarefa[22], tarefa[24]]
                horarioFim = [tarefa[13], tarefa[15], tarefa[17], tarefa[19], tarefa[21], tarefa[23], tarefa[25]]

                hrNow = datetime.strptime(str(now.strftime("%X")), '%X')
                hrInicio = datetime.strptime(str(horarioInicio[diaN]), '%X')
                hrFim = datetime.strptime(str(horarioFim[diaN]), '%X')

                if (diasDisponiveis[diaN]) and (hrNow >= hrInicio) and (hrNow <= hrFim):
                    cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {round(cpu_percent(), 2)}, NOW(), {idCPU}, {tarefa[0]})")
                    conexao.commit()

                    cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {round(virtual_memory().used / (1024.0 ** 3), 3)}, NOW(), {idRAM}, {tarefa[0]})")
                    conexao.commit()

                    cursor.execute(f"INSERT INTO medidaTarefa VALUES(NULL, {disk_usage('/').used / (1024.0 ** 2)}, NOW(), {idDK}, {tarefa[0]})")
                    conexao.commit()

            cont += 1

            if cont == fimCont:
                sleep(2)