import os
from dashing import HSplit, VSplit, HGauge
from psutil import virtual_memory, disk_usage, cpu_percent
import pymysql
import pyodbc
import platform
import getmac
import cards
from time import sleep
from threading import Thread
from tarefa import run

cls = 'clear' if platform.system() == 'Linux' else 'cls'
enderecoMac = ''
idEquipamento = 0

os.system(cls)
print('\033[1mSPTrack\033[0m\n\nloading...')

modo = 'dev'
# modo = 'prod'

if modo == 'dev':
    conexao = pymysql.connect(
        host="localhost", user="sptrackClient", password="urubu100", database="SPTrack")
elif modo == 'prod':
    try:
        conexao = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+"sptrack.database.windows.net" +
                                 ';DATABASE='+"SPTrack"+';ENCRYPT=yes;UID='+"sptrackClient"+';PWD=' + "Sprint2SPTrack")
    except:
        conexao = pymysql.connect(
            host="localhost", user="sptrackClient", password="urubu100", database="SPTrack")
        modo = 'dev'
cursor = conexao.cursor()

try:
    cursor.execute(
        f"SELECT enderecoMac, idEquipamento FROM equipamento WHERE enderecoMac = '{getmac.get_mac_address()}'")
    dados = cursor.fetchone()

    enderecoMac = dados[0]
    idEquipamento = dados[1]
except:
    os.system(cls)
    print(
        "\033[1mSPTrack\033[0m\n\nMáquina não encontrada. Entre em contato com o suporte!")
    sleep(3)
    exit()

idCPU = idRAM = idDK = 0

try:
    cursor.execute(
        f"SELECT idComponente FROM componente WHERE fkEquipamento = {idEquipamento} AND tipo = 'Processador';")
    idCPU = cursor.fetchone()[0]

    cursor.execute(
        f"SELECT idComponente FROM componente WHERE fkEquipamento = {idEquipamento} AND tipo = 'Memória RAM';")
    idRAM = cursor.fetchone()[0]

    cursor.execute(
        f"SELECT idComponente FROM componente WHERE fkEquipamento = {idEquipamento} AND tipo = 'Disco Rígido';")
    idDK = cursor.fetchone()[0]
except:
    os.system(cls)
    print(
        "\033[1mSPTrack\033[0m\n\Componentes não encontrados. Entre em contato com o suporte!")
    os.system(cls)
    sleep(3)
    exit()

try:
    thread = Thread(target = run, args=[cursor, conexao, idEquipamento, idCPU, idRAM, idDK])
    thread.start()
except:
    print('Ocorreu um erro ao rodar as tarefas!')
    exit()

while True:
    os.system(cls)

    new_dash = VSplit(
        HSplit(
            HGauge(),
            title='CPU',
            border_color=4
        ),
        HSplit(
            HSplit(
                HGauge(),
                title='MEMÓRIA',
                border_color=3
            ),
            HSplit(
                HGauge(),
                title='DISCO',
                border_color=5
            )
        )
    )

    os.system(cls)

    while True:
        cpu_dash = new_dash.items[0]
        cpu_percent_dash = cpu_dash.items[0]
        cpu_use = round(cpu_percent(), 2)
        cpu_percent_dash.value = round(cpu_use, 2)
        cpu_percent_dash.title = f'CPU {cpu_use}%'

        if cpu_use > 80:
            cards.abrirChamadoCPUTriagem()

        ram_dash = new_dash.items[1].items[0]
        ram_percent_dash = ram_dash.items[0]
        ram_use = virtual_memory().percent
        ram_useGB = round(virtual_memory().used / (1024.0 ** 3), 3)
        ram_percent_dash.value = float(round(ram_use, 2))
        ram_percent_dash.title = f'RAM {ram_use}%'

        if ram_use > 80:
            cards.abrirChamadoRAMTriagem()

        disc_dash = new_dash.items[1].items[1]
        disc_percent_dash = disc_dash.items[0]
        disc_use = disk_usage('/').percent
        disc_useMB = disk_usage('/').used / (1024.0 ** 2)
        disc_percent_dash.value = float(round(disc_use, 2))
        disc_percent_dash.title = f'DISCO {disc_use}%'
        disc_freeGB = disk_usage('/').free / 1024.0 ** 3

        if disk_usage('/').free < 32.0:
            cards.abrirChamadoHDTriagem()

        sleep(1)
        with conexao.cursor() as cursor:
            if modo == 'dev':
                cursor.execute(
                    f"INSERT INTO medida VALUES(NULL, {cpu_use}, NOW(), {idCPU});")
                conexao.commit()

                cursor.execute(
                    f"INSERT INTO medida VALUES(NULL, {ram_useGB}, NOW(), {idRAM});")
                conexao.commit()

                cursor.execute(
                    f'INSERT INTO medida VALUES(NULL, {disc_useMB}, NOW(), {idDK});')
                conexao.commit()

            elif modo == 'prod':
                cursor.execute(
                    f"INSERT INTO medida VALUES({cpu_use}, GETDATE(), {idCPU});")
                conexao.commit()

                cursor.execute(
                    f"INSERT INTO medida VALUES({ram_useGB}, GETDATE(), {idRAM});")
                conexao.commit()

                cursor.execute(
                    f'INSERT INTO medida VALUES({disc_useMB}, GETDATE(), {idDK});')
                conexao.commit()

        try:
            # new_dash.display()
            sleep(1)
        except KeyboardInterrupt:
            break