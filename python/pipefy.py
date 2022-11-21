from re import A
from time import sleep
import requests
import wordc
import json
import api

URL = "https://api.pipefy.com/graphql"
headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwOTQ1MjEsImVtYWlsIjoiZGFuaWVsLnNpcXVlaXJhQHNwdGVjaC5zY2hvb2wiLCJhcHBsaWNhdGlvbiI6MzAwMjE0MDA0fX0.3A7r7ZlkoAWeGnRy77BgQT23PJwM1zvlT0y32mjH1KNiDP-JwCim4in-BqiTibA8iKzG1w_Zf6eeDpg9YHF-WQ"
    }


def pegarChamadoTriagem():
    payload = {"query": "query{   phase(id:317370883){     cards{       edges{         node{           id  title         }       }     }   } }"}
    response = requests.post(URL, json=payload, headers=headers)
    return response.text

def pegarChamadoAtendimento():
    payload = {"query": "query{   phase(id:317370884){     cards{       edges{         node{           id  title         }       }     }   } }"}
    response = requests.post(URL, json=payload, headers=headers)
    return response.text


def pegarChamadoEscalar():
    payload = {"query": "query{   phase(id:317370886){     cards{       edges{         node{           id  title         }       }     }   } }"}
    response = requests.post(URL, json=payload, headers=headers)
    return response.text

def pegarChamadoConcluido():
    payload = {"query": "query{   phase(id:317370885){     cards{       edges{         node{           id  title         }       }     }   } }"}
    response = requests.post(URL, json=payload, headers=headers)
    return response.text

def pegarChamadoArquivado():
    payload = {"query": "query{   phase(id:317370887){     cards{       edges{         node{           id  title         }       }     }   } }"}
    response = requests.post(URL, json=payload, headers=headers)
    return response.text


def enviarWorldCloud():
    listaChamados = ""
    resposta = pegarChamadoTriagem()
    objeto = json.loads(resposta)
    cards = objeto['data']['phase']['cards']['edges']
    for card in cards:
        listaChamados += (card['node']['title'])
        listaChamados += " "

    resposta = pegarChamadoAtendimento()
    objeto = json.loads(resposta)
    cards = objeto['data']['phase']['cards']['edges']
    for card in cards:
        listaChamados += (card['node']['title'])
        listaChamados += " "
    
    resposta = pegarChamadoEscalar()
    objeto = json.loads(resposta)
    cards = objeto['data']['phase']['cards']['edges']
    for card in cards:
        listaChamados += (card['node']['title'])
        listaChamados += " "

    resposta = pegarChamadoConcluido()
    objeto = json.loads(resposta)
    cards = objeto['data']['phase']['cards']['edges']
    for card in cards:
        listaChamados += (card['node']['title'])
        listaChamados += " "

    resposta = pegarChamadoArquivado()
    objeto = json.loads(resposta)
    cards = objeto['data']['phase']['cards']['edges']
    for card in cards:
        listaChamados += (card['node']['title'])
        listaChamados += " "

    
    wordc.plotarWordcloud(listaChamados)

enviarWorldCloud()
    

