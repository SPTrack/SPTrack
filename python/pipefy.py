from re import A
from time import sleep
import requests
import pymysql
import wordc
import json


conexao = pymysql.connect(
    host="localhost", user="sptrackClient", password="urubu100", database="SPTrack")
cursor = conexao.cursor()

cursor.execute(f"SELECT * FROM infoChamados;")
retorno = cursor.fetchall()
if len(retorno) == 0:
    cursor.execute(f"INSERT INTO infoChamados VALUES(1,0,0,0,0,0,0,1000);")


URL = "https://api.pipefy.com/graphql"
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwOTQ1MjEsImVtYWlsIjoiZGFuaWVsLnNpcXVlaXJhQHNwdGVjaC5zY2hvb2wiLCJhcHBsaWNhdGlvbiI6MzAwMjE0MDA0fX0.3A7r7ZlkoAWeGnRy77BgQT23PJwM1zvlT0y32mjH1KNiDP-JwCim4in-BqiTibA8iKzG1w_Zf6eeDpg9YHF-WQ"
}


while True:

    def pegarChamadoTriagem():
        payload = {
            "query": "query{   phase(id:317370883){     cards{       edges{         node{           id  title         }       }     }   } }"}
        response = requests.post(URL, json=payload, headers=headers)
        return response.text

    def pegarChamadoAtendimento():
        payload = {
            "query": "query{   phase(id:317370884){     cards{       edges{         node{           id  title         }       }     }   } }"}
        response = requests.post(URL, json=payload, headers=headers)
        return response.text

    def pegarChamadoEscalar():
        payload = {
            "query": "query{   phase(id:317370886){     cards{       edges{         node{           id  title         }       }     }   } }"}
        response = requests.post(URL, json=payload, headers=headers)
        return response.text

    def pegarChamadoConcluido():
        payload = {
            "query": "query{   phase(id:317370885){     cards{       edges{         node{           id  title         }       }     }   } }"}
        response = requests.post(URL, json=payload, headers=headers)
        return response.text

    def pegarChamadoArquivado():
        payload = {
            "query": "query{   phase(id:317370887){     cards{       edges{         node{           id  title         }       }     }   } }"}
        response = requests.post(URL, json=payload, headers=headers)
        return response.text

    def enviarWorldCloud():
        
        quantidadeChamados = 0
        quantidadeChamadosTriagem = 0
        quantidadeChamadosAtendimento = 0
        quantidadeChamadosEscalar = 0
        quantidadeChamadosConcluidos = 0
        quantidadeChamadosArquivados = 0
        
        listaChamados = ""
        resposta = pegarChamadoTriagem()
        objeto = json.loads(resposta)
        cards = objeto['data']['phase']['cards']['edges']
        for card in cards:
            listaChamados += (card['node']['title'])
            listaChamados += " "
            quantidadeChamados += 1
            quantidadeChamadosTriagem += 1

        resposta = pegarChamadoAtendimento()
        objeto = json.loads(resposta)
        cards = objeto['data']['phase']['cards']['edges']
        for card in cards:
            listaChamados += (card['node']['title'])
            listaChamados += " "
            quantidadeChamadosAtendimento += 1
            quantidadeChamados += 1

        resposta = pegarChamadoEscalar()
        objeto = json.loads(resposta)
        cards = objeto['data']['phase']['cards']['edges']
        for card in cards:
            listaChamados += (card['node']['title'])
            listaChamados += " "
            quantidadeChamadosEscalar += 1
            quantidadeChamados += 1

        resposta = pegarChamadoConcluido()
        objeto = json.loads(resposta)
        cards = objeto['data']['phase']['cards']['edges']
        for card in cards:
            listaChamados += (card['node']['title'])
            listaChamados += " "
            quantidadeChamados += 1
            quantidadeChamadosConcluidos += 1

        resposta = pegarChamadoArquivado()
        objeto = json.loads(resposta)
        cards = objeto['data']['phase']['cards']['edges']
        for card in cards:
            listaChamados += (card['node']['title'])
            listaChamados += " "
            quantidadeChamadosArquivados += 1
            quantidadeChamados += 1

        wordc.plotarWordcloud(listaChamados)

        with conexao.cursor() as cursor:
            cursor.execute(
                f"UPDATE infoChamados SET quantidadeChamados = {quantidadeChamados}, quantidadeChamadosTriagem = {quantidadeChamadosTriagem}, quantidadeChamadosAtendimento = {quantidadeChamadosAtendimento}, quantidadeChamadosEscalar = {quantidadeChamadosEscalar}, quantidadeChamadosConcluidos = {quantidadeChamadosConcluidos}, quantidadeChamadosArquivados = {quantidadeChamadosArquivados} WHERE idInfo = 1;")
            conexao.commit()

    enviarWorldCloud()
    sleep(5)
