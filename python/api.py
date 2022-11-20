import os
from dashing import HSplit, VSplit, HGauge
from psutil import virtual_memory, disk_usage, cpu_percent
import pymysql
import pyodbc
import platform
from time import sleep

cls = 'clear' if platform.system() == 'Linux' else 'cls'

os.system(cls)
print('\033[1mSPTrack\033[0m\n\nloading...')

# modo = 'dev'
modo = 'prod'

if modo == 'dev':
    conexao = pymysql.connect(host="localhost",user="sptrackClient", password="urubu100", database="SPTrack")
elif modo == 'prod':
    try:
        conexao = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+"sptrack.database.windows.net"+';DATABASE='+"SPTrack"+';ENCRYPT=yes;UID='+"sptrackClient"+';PWD='+ "Sprint2SPTrack")
    except:
        conexao = pymysql.connect(host="localhost",user="sptrackClient", password="urubu100", database="SPTrack")
        modo = 'dev'
cursor = conexao.cursor()

os.system(cls)
patrimonio = input('\033[1mSPTrack\033[0m\n\nNúmero de Patrimônio: ')
os.system(cls)
print('\033[1mSPTrack\033[0m\n\nloading...')

try:
    cursor.execute(f'SELECT idEquipamento FROM equipamento WHERE numeroPatrimonio = {patrimonio}')
except:
    os.system(cls)
    print("\033[1mSPTrack\033[0m\n\nMáquina não encontrada. Entre em contato com o suporte!")
    sleep(3)
    exit()

idMaquina = cursor.fetchone()[0]
os.system(cls)
print('\033[1mSPTrack\033[0m\n\nloading...')

idCPU = idRAM = idDK = 0

try:
    cursor.execute(f"SELECT idComponente FROM componente WHERE fkEquipamento = {idMaquina} AND tipo = 'Processador';")
    idCPU = cursor.fetchone()[0]
    
    cursor.execute(f"SELECT idComponente FROM componente WHERE fkEquipamento = {idMaquina} AND tipo = 'Memória RAM';")
    idRAM = cursor.fetchone()[0]
     
    cursor.execute(f"SELECT idComponente FROM componente WHERE fkEquipamento = {idMaquina} AND tipo = 'Disco Rígido';")
    idDK = cursor.fetchone()[0]
except:
    os.system(cls)
    print("\033[1mSPTrack\033[0m\n\Código de criação aqui!!!.")   
os.system(cls)

contador = 0

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
        #CPU
        cpu_dash = new_dash.items[0]
        cpu_percent_dash = cpu_dash.items[0]
        cpu_use = round(cpu_percent(), 2)
        cpu_percent_dash.value = round(cpu_use, 2)
        cpu_percent_dash.title = f'CPU {cpu_use}%'

        # #memoria RAM
        ram_dash = new_dash.items[1].items[0]
        ram_percent_dash = ram_dash.items[0]
        ram_use = virtual_memory().percent
        ram_useGB = round(virtual_memory().used / (1024.0 ** 3), 3)
        ram_percent_dash.value = float(round(ram_use, 2))
        ram_percent_dash.title = f'RAM {ram_use}%'

        #DISCO
        disc_dash = new_dash.items[1].items[1]
        disc_percent_dash = disc_dash.items[0]
        disc_use = disk_usage('/').percent
        disc_useMB = disk_usage('/').used/ (1024.0 ** 2)
        disc_percent_dash.value = float(round(disc_use, 2))
        disc_percent_dash.title = f'DISCO {disc_use}%'

        sleep(0.2)
        with conexao.cursor() as cursor:
            if modo == 'dev':
                cursor.execute(f"INSERT INTO medida VALUES(NULL, {cpu_use}, NOW(), {idCPU});")
                conexao.commit()

                cursor.execute(f"INSERT INTO medida VALUES(NULL, {ram_useGB}, NOW(), {idRAM});")
                conexao.commit()

                cursor.execute(f'INSERT INTO medida VALUES(NULL, {disc_useMB}, NOW(), {idDK});')
                conexao.commit()

            elif modo == 'prod':
                cursor.execute(f"INSERT INTO medida VALUES({cpu_use}, GETDATE(), {idCPU});")
                conexao.commit()

                cursor.execute(f"INSERT INTO medida VALUES({ram_useGB}, GETDATE(), {idRAM});")
                conexao.commit()

                cursor.execute(f'INSERT INTO medida VALUES({disc_useMB}, GETDATE(), {idDK});')
                conexao.commit()

        try:
            new_dash.display()
            sleep(0.5)
        except KeyboardInterrupt:
            break