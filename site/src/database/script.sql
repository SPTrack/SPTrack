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

CREATE TABLE equipamento(
	idEquipamento INT PRIMARY KEY AUTO_INCREMENT,
    modeloEquipamento VARCHAR(64),
    sistemaOperacional VARCHAR(64),
    numeroPatrimonio VARCHAR(12),
    numeroSerial VARCHAR(64),
    dataRegistro DATETIME,
    
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
) AUTO_INCREMENT = 100000;

CREATE TABLE componente(
    idComponente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL,
    unidadeMedida VARCHAR(64),
    tipo VARCHAR(64),
    
    fkEquipamento INT,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
) AUTO_INCREMENT = 200000;

CREATE TABLE medida(
	idMedida INT PRIMARY KEY AUTO_INCREMENT,
    valor FLOAT,
    dataRegistro DATETIME,
    
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES componente (idComponente)
) AUTO_INCREMENT = 300000;

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

CREATE VIEW `vw_getDadosInst` AS
SELECT componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro
 FROM medida
 JOIN componente ON medida.fkComponente
 JOIN equipamento ON componente.fkEquipamento
 JOIN instituicao ON equipamento.fkInstituicao
 WHERE instituicao.idInstituicao = idInstituicao
;

CREATE VIEW `vw_getDados7dias` AS
SELECT componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro
 FROM medida
 JOIN componente ON medida.fkComponente
 JOIN equipamento ON componente.fkEquipamento
 JOIN instituicao ON equipamento.fkInstituicao
 WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATE(NOW() - INTERVAL 7 DAY)
 AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento AND
 equipamento.fkInstituicao = instituicao.idInstituicao
;

CREATE VIEW `vw_getDados60sec` AS
SELECT componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro
 FROM medida
 JOIN componente ON medida.fkComponente
 JOIN equipamento ON componente.fkEquipamento
 JOIN instituicao ON equipamento.fkInstituicao
 WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATE(NOW() - INTERVAL 1 MINUTE)
 ;

SELECT * FROM vw_getDadosInst;
SELECT * FROM vw_getDados7dias;
SELECT * FROM vw_getDados60sec;

INSERT INTO instituicao VALUES (NULL, 'EDUCARE TECNOLOGIA DA INFORMACAO S.A.', 'EDUCARE', '07165496000100', '01414905', 'SP', 'EDIF', 'SAO PAULO', 'CERQUEIRA CESAR', 'R HADDOCK LOBO 595', '595');
INSERT INTO sala VALUES (NULL, "Sala 1A", 1, 1, 1000);

INSERT INTO equipamento VALUES (NULL, 'HP Prata', 'Windows','3892','BRG383084F', NOW(), 1000);
INSERT INTO equipamento VALUES (NULL, 'Dell Preto', 'Linux','3312','BRG381284F', NOW(), 1000);
INSERT INTO equipamento VALUES (NULL, 'Acer Prata', 'Linux','3586','BRG323283F', NOW(), 1000);
INSERT INTO equipamento VALUES (NULL, 'Samsung Diamante', 'Windows','3526','BRG323433F', NOW(), 1000);

INSERT INTO componente VALUES (NULL, 'I5 11º Gen', '%', 'Processador', 100000);
INSERT INTO componente VALUES (NULL, 'Pente 4x4 - 8GB', 'GB', 'Memória RAM', 100000);
INSERT INTO componente VALUES (NULL, 'HD SamDisk', 'MB', 'Disco Rigído', 100000);

INSERT INTO componente VALUES (NULL, 'AMD neon Xtr', '%', 'Processador', 100001);
INSERT INTO componente VALUES (NULL, 'Pente 8x4 - 12GB', 'GB', 'Memória RAM', 100001);
INSERT INTO componente VALUES (NULL, 'SSD 256GB SATA', 'MB', 'Disco Rigído', 100001);

INSERT INTO componente VALUES (NULL, 'I7 8º Gen', '%', 'Processador', 100002);
INSERT INTO componente VALUES (NULL, 'Pente 2x2 - 4GB', 'GB', 'Memória RAM', 100002);
INSERT INTO componente VALUES (NULL, 'HD SamDisk', 'MB', 'Disco Rigído', 100002);

INSERT INTO componente VALUES (NULL, 'I9 11º Gen', '%', 'Processador', 100003);
INSERT INTO componente VALUES (NULL, 'Pente 8x8 - 16GB', 'GB', 'Memória RAM', 100003);
INSERT INTO componente VALUES (NULL, 'SSD 1GB SATA', 'MB', 'Disco Rigído', 100003);

select * from usuario;