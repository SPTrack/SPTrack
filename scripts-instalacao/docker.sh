##!/bin/bash

echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7) : Verificando se o docker está instalado"


docker version
if [ $? -eq 0 ]
	then
		echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7) : Você já tem Docker no seu dispositivo!"
	else
		echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7)  Não foi identificada nenhuma versão do Docker em seu dispositivo."
		
			echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7)  preparando para instalação do Docker"
			echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7)  Adicionando o repositório!"
			sleep 2
			sudo apt install docker.io -y
			
			echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7)  Atualizando..."
			sleep 2
			sudo apt update -y
			
			echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7) Processo finalizado."
		
fi

echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7) Startando docker."

    
    sudo systemctl start docker
	sudo systemctl enable docker

 echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7) : instalando mysql no docker e criando banco com o nome do projeto"   
    
    sudo docker pull mysql:8.0.31
    sudo docker container rm ConteinerBD
    sudo docker run -d -p 3305:3305 --name ConteinerBD -e "MYSQL_DATABASE=SPTrack" -e "MYSQL_ROOT_PASSWORD=urubu100" mysql:8.0.31

echo "$(tput setaf 10)[Assistente de instalação]:$(tput setaf 7) : Entrando no docker"
clear
sudo docker exec -it ConteinerBD bash
