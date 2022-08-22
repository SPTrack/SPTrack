from dashing import HSplit, VSplit, VGauge, HGauge
from psutil import (
    virtual_memory,
    disk_usage,
    cpu_percent
)

from time import sleep

while True:
    print("Analise de dados da maquina" + '\n' + '\n')

    print("Escolha um dado para ser analisado: " + "\n" + "\n" +
    "[0] Ver os Graficos de memoria" + "\n" + "[1] Sair")

    escolha = input("Resposta: ")
    
    if escolha == '0':
        new_dash = VSplit(
            VSplit(
                HGauge(),
                title='CPU',
                border_color=4
            ),
            VSplit(
                HSplit(
                    VSplit(
                        HGauge(),
                        title='MEMÓRIA',
                        border_color=3        
                    ),
                    VSplit(
                        HGauge(),
                        title='DISCO',
                        border_color=3        
                    )
                )
            )
        )
        dash = HSplit(
            VSplit(
                HGauge(),
                title='CPU',
                border_color=4
            ),
            VSplit(
                HGauge(),
                title='MEMÓRIA',
                border_color=3
            ),
            VSplit(
                HGauge(),
                title='DISCO',
                border_color=5,
            ),
        )

        while True:
            #CPU
            # cpu_dash = new_dash.items[0]
            cpu_dash = dash.items[0]
            cpu_percent_dash = cpu_dash.items[0]
            cpu_use = cpu_percent()
            cpu_percent_dash.value = cpu_use
            cpu_percent_dash.title = f'CPU {cpu_use}%'

            #memoria RAM
            # ram_dash = new_dash.items[1].items[0].items[0]
            ram_dash= dash.items[1]
            ram_percent_dash = ram_dash.items[0]
            ram_use = virtual_memory().percent
            ram_percent_dash.value = ram_use
            ram_percent_dash.title = f'RAM {ram_use}%'

            #DISCO
            # disc_dash = new_dash.items[1].items[0].items[1]
            disc_dash = dash.items[2]
            disc_percent_dash = disc_dash.items[0]
            disc_use = disk_usage('/').percent
            disc_percent_dash.value = disc_use
            disc_percent_dash.title = f'DISCO {disc_use}%'

            try:
                dash.display()
                sleep(.5)
            except KeyboardInterrupt:
                break  

    elif escolha == '1':
        break

print("\n" + "Volte sempre")