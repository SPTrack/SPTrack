from re import A
from time import sleep
import requests
import wordc
import json


URL = "https://api.pipefy.com/graphql"
headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwOTQ1MjEsImVtYWlsIjoiZGFuaWVsLnNpcXVlaXJhQHNwdGVjaC5zY2hvb2wiLCJhcHBsaWNhdGlvbiI6MzAwMjE0MDA0fX0.3A7r7ZlkoAWeGnRy77BgQT23PJwM1zvlT0y32mjH1KNiDP-JwCim4in-BqiTibA8iKzG1w_Zf6eeDpg9YHF-WQ"
    }

def pegarChamado():
    payload = {"query": "query{   phase(id:317370884){     cards{       edges{         node{           id  title         }       }     }   } }"}
    response = requests.post(URL, json=payload, headers=headers)
    return response.text

def enviarWorldCloud():
    listaChamados = ""
    resposta = pegarChamado()
    objeto = json.loads(resposta)
    objeto = json.loads(resposta)
    cards = objeto['data']['phase']['cards']['edges']
    print(cards)
    for card in cards:
        listaChamados += (card['node']['title'])
        listaChamados += " "
    wordc.plotarWordcloud(listaChamados)

enviarWorldCloud()
    

