#!/bin/bash

PURPLE='0;35'
NC='\033[0m' 
VERSAO=11
	
echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Olá caro cliente, serei seu assistente para instalação dos requerimentos para SPTrack!;"
echo  "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Verificando se você possui o Java instalado...;"
sleep 2

java -version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) : Você já tem Java no seu dispositivo!"
	else
		echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Não foi identificada nenhuma versão do java em seu dispositivo."
		
			echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  preparando para instalação do Java"
			echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Adicionando o repositório!"
			sleep 2
			sudo add-apt-repository ppa:webupd8team/java -y
			clear
			echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Atualizando..."
			sleep 2
			sudo apt update -y
			clear
			
			if [ $VERSAO -eq 11 ]
				then
					echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Preparando para instalar a versão 11 do Java. Confirme a instalação:"
					sudo apt install default-jre ; apt install openjdk-11-jre-headless; -y
					clear
					echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7) Java instalado com sucesso!"
				fi
			
		echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Processo Finalizado."
	
fi


echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  preparando para instalação do projeto..."
echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Adicionando o repositório!"
sleep 5
git clone https://github.com/SPTrack/SPTrack.git
clear
sleep 3
echo "$(tput setaf 10)[Bot assistant]:$(tput setaf 7)  Projeto instalado"
sleep 3
clear

