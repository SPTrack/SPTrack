# Bilioteca de solicitação, para chamar a API do Slack
import requests
# Biblioteca para obter o caminho da mensagem que será enviada
import sys
# Biblioteca que pega os parametros da mensagem
import getopt

# Está função ira enviar uma string em json


def send_slack_message(message):

    # Variável que define o tipo de dados que estamos enviando. E que envie a solicitação e poste está mensagem
    payload = '{"text":"%s"}' % message

    # Variável que irá obter reposta que iremos receber da API. Logo depois do sinal de igual tem a chamada da bilioteca de solicitaçao.
    # E também o link do bot criado para o envio de mensagens
    response = requests.post(
        'https://hooks.slack.com/services/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', data=payload)

    print(response.text)

# Função main para receber uma mensagem que será enviada para o canal do slack


def main(argv):

    # Variável que representa a mensagem digitada pelo usuário
    message = ' '

    # Aqui são definidas as opções de argumentos#
    try:
        opts, args = getopt.getopt(argv, "hm:", ["message="])

    except getopt.GetoptError:
        print('SlackMessage.py -m <message>')
        sys.exit(2)

    # Caso o usuário não digitou uma mensagem o programa irá mandar uma mensagem pré_definida de nossa escolha
    if len(opts) == 0:

        # Mensagem que será enviada caso o usuário não digite nenhuma
        message = "Olá a todos!"

    # Este for irá verificar as opções fonecidas
    for opt, arg in opts:

        # Se a opção for "H" para ajuda, o programa vai imprimir o uso
        if opt == '-h':
            print('SlackMessage.py -m <message>')
            sys.exit()

            # Caso contrário o programa ira enviar a mensagem digitada pelo usuário
        elif opt in ("-m", "--message"):
            message = arg

    # Função que recebe a mensagem que o usuário digitou como parametro e envia ele para o slack
    send_slack_message(message)


# Se por acaso a função main for chamada quando o programa for inicado, o código irá chamar a função main
if __name__ == "__main__":
    main(sys.argv[1:])
