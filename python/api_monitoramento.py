import os
from dashing import HSplit, VSplit, HGauge
from psutil import virtual_memory, disk_usage, cpu_percent
import pymysql
import platform
from time import sleep

conexao = pymysql.connect(host="localhost",user="sptrackClient", password="urubu100", database="SPTrack")
contador = 0
cls = 'clear' if platform.system() == 'Linux' else 'cls'

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
        cpu_use = cpu_percent()
        cpu_percent_dash.value = round(cpu_use,2)
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
                sqlQuery = 'INSERT INTO registro VALUES(null,%s,%s,%s,now(),null);'
                cursor.execute(sqlQuery, (cpu_use, ram_use, disc_use))
                resposta = conexao.commit()
                print(resposta)

        contador += 1
        try:
            new_dash.display()
            sleep(.5)
        except KeyboardInterrupt:
            break