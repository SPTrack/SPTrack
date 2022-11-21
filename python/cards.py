import requests
URL = "https://api.pipefy.com/graphql"
headers = {

        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwNzc1MzAsImVtYWlsIjoibWFyaWEubmV2ZXNAc3B0ZWNoLnNjaG9vbCIsImFwcGxpY2F0aW9uIjozMDAyMTQwNzN9fQ.y2SAHLixTf8FwwoXb7lXvPAIWXmw7rYwqlbFuDMqpaRk3iiq81x04i9BeX-dHWzE6jNS-21VG_SH_oBBqoOSpg"
    }



def abrirChamadoCPUTriagem():
    payload = {"query":"mutation { createCard(input: { pipe_id: 302793571, title: \"Uso de CPU acima da média\",fields_attributes:[ {field_id: \"qual_o_assunto_do_seu_pedido\", field_value: \"O computador está esquentando pouco\"}]}) {card {title}}}"}
    response = requests.post(URL, json=payload, headers=headers)
    print(response.text)

def abrirChamadoRAMTriagem():
    payload = {"query":"mutation { createCard(input: { pipe_id: 302793571, title: \"Uso de RAM acima da média\",fields_attributes:[ {field_id: \"qual_o_assunto_do_seu_pedido\", field_value: \"O computador está travando\"}]}) {card {title}}}"}
    response = requests.post(URL, json=payload, headers=headers)
    print(response.text)

def abrirChamadoHDTriagem():
    payload = {"query":"mutation { createCard(input: { pipe_id: 302793571, title: \"Disco Rígido está sem espaço\",fields_attributes:[ {field_id: \"qual_o_assunto_do_seu_pedido\", field_value: \"Disco Rígido está sem espaço\"}]}) {card {title}}}"}
    response = requests.post(URL, json=payload, headers=headers)
    print(response.text)
