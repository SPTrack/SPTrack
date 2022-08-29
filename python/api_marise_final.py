import os
from dashing import HSplit, VSplit, VGauge, HGauge
from psutil import (
    virtual_memory,
    disk_usage,
    cpu_percent
)
import pymysql
import _thread as thread
from time import sleep

conexao = pymysql.connect(host="localhost",user="root", password="@Pedrinho1",database="SPTrack")

contador = 0


with conexao.cursor() as cursor:
    sqlQuery = "insert into equipamento(disco) values('10')"
    cursor.execute(sqlQuery)
    resposta = conexao.commit()
    print(resposta)


while True:
    print("Analise de dados da maquina" + '\n' + '\n')
    print("Escolha um dado para ser analisado: " + "\n" + "\n" +
    "[0] Ver os Graficos de memoria" + "\n" + "[1] Sair")

    escolha = input("Resposta: ")
    
    if escolha == '0':
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
                    border_color=3        
                )
            )            
        )

        os.system('clear')

        while True:
            

           
            #CPU
            cpu_dash = new_dash.items[0]
            cpu_percent_dash = cpu_dash.items[0]
            cpu_use = cpu_percent()
            cpu_percent_dash.value = float(round(cpu_use,2))
            cpu_percent_dash.title = f'CPU {cpu_use}%'

            #memoria RAM
            ram_dash = new_dash.items[1].items[0]
            ram_percent_dash = ram_dash.items[0]
            ram_use = virtual_memory().percent
            ram_percent_dash.value = float(round(ram_use,2))
            ram_percent_dash.title = f'RAM {ram_use}%'

            #DISCO
            disc_dash = new_dash.items[1].items[1]
            disc_percent_dash = disc_dash.items[0]
            disc_use = disk_usage('/').percent
            disc_percent_dash.value = float(round(disc_use,2))
            disc_percent_dash.title = f'DISCO {disc_use}%'

            if contador % 20 == 0:
                with conexao.cursor() as cursor:
                    sqlQuery = 'INSERT INTO registro VALUES(null,%s,%s,%s,now(),1);'
                    cursor.execute(sqlQuery, (cpu_use, ram_use, disc_use))
                    resposta = conexao.commit()
                    print(resposta)

            contador += 1
            try:
                new_dash.display()
                sleep(.5)
            except KeyboardInterrupt:
                break  

    elif escolha == '1':
        break

print("\n" + "Volte sempre")