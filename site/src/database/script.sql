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
    nome VARCHAR(45),
    andar VARCHAR(8),
    numero INT,

    fkInstituicao INT NOT NULL,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao)
) AUTO_INCREMENT = 1;

CREATE TABLE equipamento(
	idEquipamento INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(64),
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
    unidadeMedida VARCHAR(64) NOT NULL,
    capacidade INT NOT NULL,
    tipo VARCHAR(64) NOT NULL,
    
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

CREATE VIEW `vw_instituicaoXmedidas` AS
SELECT instituicao.nomeFantasia, sala.andar, sala.numero, componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
JOIN sala ON sala.fkInstituicao
WHERE instituicao.idInstituicao = instituicao.idInstituicao
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento
AND sala.fkInstituicao = instituicao.idInstituicao AND
equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro;

CREATE VIEW `vw_medidas7dias` AS
SELECT equipamento.modelo, componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATE(NOW() - INTERVAL 7 DAY)
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento AND
equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro;

CREATE VIEW `vw_medida60s` AS
SELECT equipamento.modelo, componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATE(NOW() - INTERVAL 1 MINUTE)
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento AND
equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro;

CREATE VIEW `vw_medidaCPU` AS
SELECT medida.valor as valorCPU
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
JOIN sala ON sala.fkInstituicao
WHERE instituicao.idInstituicao = instituicao.idInstituicao
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento
AND sala.fkInstituicao = instituicao.idInstituicao
AND componente.tipo = 'Processador'
AND equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro DESC;

CREATE VIEW `vw_medidaRAM` AS
SELECT medida.valor as valorRAM
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
JOIN sala ON sala.fkInstituicao
WHERE instituicao.idInstituicao = instituicao.idInstituicao
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento
AND sala.fkInstituicao = instituicao.idInstituicao
AND componente.tipo = 'Memória RAM'
AND equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro DESC;

CREATE VIEW `vw_medidaDK` AS
SELECT medida.valor as valorDK
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
JOIN sala ON sala.fkInstituicao
WHERE instituicao.idInstituicao = instituicao.idInstituicao
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento
AND sala.fkInstituicao = instituicao.idInstituicao
AND componente.tipo = 'Disco Rigído'
AND equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro DESC;

SELECT idMedidaCPU, idMedidaRAM, idMedidaDK, ram.valorRAM, dk.valorDK
FROM 
(SELECT idMedida AS idMedidaCPU, medida.valor as valorCPU
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
JOIN sala ON sala.fkInstituicao
WHERE instituicao.idInstituicao = instituicao.idInstituicao
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento
AND sala.fkInstituicao = instituicao.idInstituicao
AND componente.tipo = 'Processador'
AND equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro DESC) AS cpu,
(SELECT medida.valor AS valorRAM, idMedida AS idMedidaRAM
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
JOIN sala ON sala.fkInstituicao
WHERE instituicao.idInstituicao = instituicao.idInstituicao
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento
AND sala.fkInstituicao = instituicao.idInstituicao
AND componente.tipo = 'Memória RAM'
AND equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro DESC) AS ram,
(SELECT medida.valor AS idMedidaDK AS valorDK, idMedida AS idMedidaDK
FROM medida
JOIN componente ON medida.fkComponente
JOIN equipamento ON componente.fkEquipamento
JOIN instituicao ON equipamento.fkInstituicao
JOIN sala ON sala.fkInstituicao
WHERE instituicao.idInstituicao = instituicao.idInstituicao
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento
AND sala.fkInstituicao = instituicao.idInstituicao
AND componente.tipo = 'Disco Rigído'
AND equipamento.fkInstituicao = instituicao.idInstituicao ORDER BY medida.dataRegistro DESC) AS dk;

SELECT * FROM vw_getDadosInst;
SELECT * FROM vw_getDados7dias;
SELECT * FROM vw_getDados60sec;
SELECT * FROM vw_medidaTeste;

INSERT INTO instituicao VALUES (NULL, 'EDUCARE TECNOLOGIA DA INFORMACAO S.A.', 'EDUCARE', '07165496000100', '01414905', 'SP', 'EDIF', 'SAO PAULO', 'CERQUEIRA CESAR', 'R HADDOCK LOBO 595', '595');
INSERT INTO sala VALUES (NULL, "Sala 1A", 1, 1, 1000);

INSERT INTO equipamento VALUES (NULL, 'HP Prata', 'Windows','3892','BRG383084F', NOW(), 1000);
INSERT INTO equipamento VALUES (NULL, 'Dell Preto', 'Linux','3312','BRG381284F', NOW(), 1000);
INSERT INTO equipamento VALUES (NULL, 'Acer Prata', 'Linux','3586','BRG323283F', NOW(), 1000);
INSERT INTO equipamento VALUES (NULL, 'Samsung Diamante', 'Windows','3526','BRG323433F', NOW(), 1000);

INSERT INTO componente VALUES (NULL, 'I5 11º Gen', '%', 100, 'Processador', 100000);
INSERT INTO componente VALUES (NULL, 'Pente 4x4 - 8GB', 8, 'GB', 'Memória RAM', 100000);
INSERT INTO componente VALUES (NULL, 'HD SamDisk', 'MB', 1000,'Disco Rigído', 100000);

INSERT INTO componente VALUES (NULL, 'AMD neon Xtr', '%', 100, 'Processador', 100001);
INSERT INTO componente VALUES (NULL, 'Pente 8x4 - 12GB', 8, 'GB', 'Memória RAM', 100001);
INSERT INTO componente VALUES (NULL, 'SSD 256GB SATA', 1000, 'MB', 'Disco Rigído', 100001);

INSERT INTO componente VALUES (NULL, 'I7 8º Gen', '%', 100, 'Processador', 100002);
INSERT INTO componente VALUES (NULL, 'Pente 2x2 - 4GB', 8, 'GB', 'Memória RAM', 100002);
INSERT INTO componente VALUES (NULL, 'HD SamDisk', 'MB', 1000, 'Disco Rigído', 100002);

INSERT INTO componente VALUES (NULL, 'I9 11º Gen', '%', 100, 'Processador', 100003);
INSERT INTO componente VALUES (NULL, 'Pente 8x8 - 16GB', 8, 'GB', 'Memória RAM', 100003);
INSERT INTO componente VALUES (NULL, 'SSD 1GB SATA', 'MB', 1000, 'Disco Rigído', 100003);

SELECT * FROM usuario;