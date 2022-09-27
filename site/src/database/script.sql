CREATE USER 'sptrackClient'@'localhost' IDENTIFIED BY 'urubu100';
GRANT ALL PRIVILEGES ON SPTrack.* TO 'sptrackClient'@'localhost';

CREATE DATABASE SPTrack;
USE SPTrack;

CREATE TABLE instituicao(
	idInstituicao INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(120) NOT NULL,
    nomeFantasia VARCHAR(100) NOT NULL,
    cnpj VARCHAR (18) NOT NULL,
    cep CHAR(8) NOT NULL,
    estado VARCHAR (45) NOT NULL,
    complemento VARCHAR(100) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    logradouro VARCHAR(50) NOT NULL,
    numero CHAR(6) NOT NULL
) AUTO_INCREMENT = 1000;

CREATE TABLE usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(65) NOT NULL,
    tipoUsuario VARCHAR(45) CHECK (tipoUsuario IN ('admin', 'analista')) NOT NULL,
    
    fkInstituicao INT NOT NULL,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao),
    
    fkGestor INT,
    FOREIGN KEY (fkGestor) REFERENCES usuario(IdUsuario)
) AUTO_INCREMENT = 10000;

CREATE TABLE sala(
	idSala INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    andar VARCHAR(8) NOT NULL,
    numero INT NOT NULL,

    fkInstituicao INT NOT NULL,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao)
) AUTO_INCREMENT = 1;

CREATE TABLE locacao(
	fkEquipamento INT NOT NULL,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento),
    
    fkSala INT NOT NULL,
    FOREIGN KEY (fkSala) REFERENCES sala(idSala),
    
    dtEstadia DATETIME NOT NULL,
    PRIMARY KEY (fkEquipamento, fkSala, dtEstadia)
) AUTO_INCREMENT = 500;

CREATE TABLE manutencao(
	idManutencao INT PRIMARY KEY AUTO_INCREMENT,
    dtInicio DATETIME NOT NULL,
    dtFim DATETIME NOT NULL,
    situacao VARCHAR(45) NOT NULL,
    descricao VARCHAR(60) NOT NULL,

    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    
    fkEquipamento INT,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
) AUTO_INCREMENT = 5000;

CREATE TABLE equipamento(
	idEquipamento INT PRIMARY KEY AUTO_INCREMENT,
    modeloEquipamento VARCHAR(64),
    sistemaOperacional VARCHAR(64),
    numeroPatrimonio VARCHAR(12),
    numeroSerial VARCHAR(64),
    dataRegistro DATETIME,
    
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao);
) AUTO_INCREMENT = 100000;

CREATE TABLE componente(
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
    tipo VARCHAR(64),
    
    fkEquipamento INT,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
) AUTO_INCREMENT = 200000;

CREATE TABLE medida(
	idMedida INT PRIMARY KEY AUTO_INCREMENT,
    valor decimal(5,2),
    dataRegistro DATETIME,
    
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES componente (idComponente)
) AUTO_INCREMENT = 300000;

INSERT INTO equipamento VALUES (NULL, 'I5 9400f','4GB','500GB','HP Prata','Windows','3892','BRG382784F');
drop database sptrack;
select * from usuario;