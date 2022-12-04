CREATE TABLE instituicao(
    idInstituicao INT PRIMARY KEY IDENTITY(1000,1),
    razaoSocial VARCHAR(120) NOT NULL,
    nomeFantasia VARCHAR(100) NOT NULL,
    cnpj VARCHAR (18) NOT NULL UNIQUE,
    cep CHAR(8) NOT NULL,
    estado VARCHAR (64) NOT NULL,
    complemento VARCHAR(128) NOT NULL,
    cidade VARCHAR(64) NOT NULL,
    bairro VARCHAR(64) NOT NULL,
    logradouro VARCHAR(64) NOT NULL,
    numero CHAR(6) NOT NULL,
    dataRegisto DATETIME NOT NULL
);

CREATE TABLE usuario(
    idUsuario INT PRIMARY KEY IDENTITY(10000,1),
    nome VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    senha VARCHAR(65) NOT NULL,
    tipoUsuario VARCHAR(45) NOT NULL,
    dataRegisto DATETIME NOT NULL,
    nivelAcesso INT NOT NULL,
    fkInstituicao INT NOT NULL,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao),    
    fkGestor INT,
    FOREIGN KEY (fkGestor) REFERENCES usuario(IdUsuario)
); 

CREATE TABLE sala(
	idSala INT PRIMARY KEY IDENTITY(1,1),
    nome VARCHAR(64),
    fkInstituicao INT NOT NULL,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao(idInstituicao)
); 

CREATE TABLE equipamento(
	idEquipamento INT PRIMARY KEY IDENTITY(100000,1),
    modelo VARCHAR(64),
    sistemaOperacional VARCHAR(64),
    numeroPatrimonio VARCHAR(12) UNIQUE,
    numeroSerial VARCHAR(64) UNIQUE,
    dataRegistro DATETIME,
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
); 

CREATE TABLE componente(
    idComponente INT PRIMARY KEY IDENTITY(200000,1),
    nome VARCHAR(64) NOT NULL,
    unidadeMedida VARCHAR(64) NOT NULL,
    capacidade INT NOT NULL,
    tipo VARCHAR(64) NOT NULL,
    fkEquipamento INT,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
);

CREATE TABLE medida(
	idMedida INT PRIMARY KEY IDENTITY(300000,1),
    valor FLOAT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES componente (idComponente)
);  

CREATE TABLE locacao(
	fkEquipamento INT NOT NULL,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento),
    fkSala INT NOT NULL,
    FOREIGN KEY (fkSala) REFERENCES sala(idSala),
    dtEstadia DATETIME NOT NULL,
    PRIMARY KEY (fkEquipamento, fkSala, dtEstadia)
);

CREATE TABLE historico(
	fkEquipamento INT NOT NULL,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento),
    
    fkSala INT NOT NULL,
    FOREIGN KEY (fkSala) REFERENCES sala(idSala),
    
    dtRegistro DATETIME NOT NULL,
    PRIMARY KEY (fkEquipamento, fkSala, dtRegistro)
);


CREATE TABLE manutencao(
	idManutencao INT PRIMARY KEY IDENTITY(5000,1),
    dtInicio DATETIME NOT NULL,
    dtFim DATETIME,
    situacao VARCHAR(10) CHECK (situacao IN ('Aberto', 'Finalizado')) NOT NULL,
    descricao VARCHAR(128) NOT NULL,

    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    
    fkEquipamento INT,
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
);

CREATE TABLE disponibilidade(
    idDisponibilidade INT PRIMARY KEY IDENTITY(1500,1),
    valor FLOAT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
);

CREATE TABLE estadoDeUso(
    idEstadoDeUso INT PRIMARY KEY IDENTITY(1500,1),
    mb INT NOT NULL,
    b INT NOT NULL,
    r INT NOT NULL,
    a INT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    
    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
);

CREATE TABLE infoChamados(
    idInfo INT PRIMARY KEY IDENTITY(3000,1),
    quantidadeChamados INT NOT NULL,
    quantidadeChamadosConcluidos INT NOT NULL
);

CREATE TABLE tarefa(
    idTarefa INT PRIMARY KEY IDENTITY(4000, 1),
    nome VARCHAR(64) NOT NULL,
    descricao VARCHAR(256) NOT NULL,
    dataInicio DATETIME NOT NULL,
    dataFim DATETIME,
    isDomingo TINYINT CHECK (isDomingo IN (0, 1)) NOT NULL,
    isSegunda TINYINT CHECK (isSegunda IN (0, 1)) NOT NULL,
    isTerca TINYINT CHECK (isTerca IN (0, 1)) NOT NULL,
    isQuarta TINYINT CHECK (isQuarta IN (0, 1)) NOT NULL,
    isQuinta TINYINT CHECK (isQuinta IN (0, 1)) NOT NULL,
    isSexta TINYINT CHECK (isSexta IN (0, 1)) NOT NULL,
    isSabado TINYINT CHECK (isSabado IN (0, 1)) NOT NULL,

    horarioInicioDomingo TIME,
    horarioFimDomingo TIME,
    horarioInicioSegunda TIME,
    horarioFimSegunda TIME,
    horarioInicioTerca TIME,
    horarioFimTerca TIME,
    horarioInicioQuarta TIME,
    horarioFimQuarta TIME,
    horarioInicioQuinta TIME,
    horarioFimQuinta TIME,
    horarioInicioSexta TIME,
    horarioFimSexta TIME,
    horarioInicioSabado TIME,
    horarioFimSabado TIME,

    fkInstituicao INT,
    FOREIGN KEY (fkInstituicao) REFERENCES instituicao (idInstituicao)
);

CREATE TABLE tarefaXequipamento(
    fkTarefa INT NOT NULL,
    fkEquipamento INT NOT NULL,
    PRIMARY KEY(fkTarefa, fkEquipamento),

    FOREIGN KEY (fkTarefa) REFERENCES tarefa(idTarefa),
    FOREIGN KEY (fkEquipamento) REFERENCES equipamento(idEquipamento)
);

CREATE TABLE medidaTarefa(
    idMedida INT PRIMARY KEY IDENTITY(600000, 1),
    valor FLOAT NOT NULL,
    dataRegistro DATETIME NOT NULL,
    
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES componente (idComponente),

    fkTarefa INT,
    FOREIGN KEY (fkTarefa) REFERENCES tarefa (idTarefa)
);

create table processos(
	idLeitura int primary key identity(1,1),
	so varchar(15),
	arquivos varchar(45),
	tipoProcesso char(9)
	);

create table processosMortos(
	id int primary key identity(1,1),
	nome varchar(45),
	horas smalldatetime
	);

EXEC('CREATE VIEW vw_medidasInstituicao AS
SELECT medida.idMedida, componente.tipo, componente.unidadeMedida, medida.valor, instituicao.idInstituicao, medida.dataRegistro AS dataRegistro
FROM instituicao JOIN equipamento ON equipamento.fkInstituicao = instituicao.idInstituicao 
JOIN componente ON componente.fkEquipamento = equipamento.idEquipamento JOIN medida ON medida.fkComponente = componente.idComponente; ');

EXEC('CREATE VIEW vw_medidasEquipamento AS
SELECT medida.idMedida, componente.tipo, componente.unidadeMedida, medida.valor, equipamento.idEquipamento, medida.dataRegistro AS dataRegistro
FROM instituicao JOIN equipamento ON equipamento.fkInstituicao = instituicao.idInstituicao 
JOIN componente ON componente.fkEquipamento = equipamento.idEquipamento JOIN medida ON medida.fkComponente = componente.idComponente;')

EXEC('CREATE VIEW vw_medidas7dias AS
SELECT equipamento.modelo, componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro, equipamento.idEquipamento
FROM medida
JOIN componente ON medida.fkComponente = componente.idComponente
JOIN equipamento ON componente.fkEquipamento = equipamento.idEquipamento
JOIN instituicao ON equipamento.fkInstituicao = instituicao.idInstituicao
WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATEADD(DAY, -7, GETDATE())
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento AND
equipamento.fkInstituicao = instituicao.idInstituicao;') 

EXEC('CREATE VIEW vw_medida60s AS
SELECT equipamento.modelo, componente.tipo, medida.valor, componente.unidadeMedida, componente.nome, medida.dataRegistro, equipamento.idEquipamento
FROM medida
JOIN componente ON medida.fkComponente = componente.idComponente
JOIN equipamento ON componente.fkEquipamento = equipamento.idEquipamento
JOIN instituicao ON equipamento.fkInstituicao = instituicao.idInstituicao
WHERE instituicao.idInstituicao = idInstituicao AND medida.dataRegistro >= DATEADD(SECOND, -60, GETDATE())
AND medida.fkComponente = componente.idComponente AND componente.fkEquipamento = equipamento.idEquipamento AND
equipamento.fkInstituicao = instituicao.idInstituicao;')

EXEC('CREATE VIEW vw_manutencao_por_sala AS
SELECT idSala, nome, (SELECT count(manutencao.fkEquipamento) FROM manutencao WHERE situacao = ''Aberto'') qtd
FROM sala 
JOIN locacao ON sala.idSala = locacao.fkSala
JOIN instituicao ON sala.fkInstituicao = instituicao.idInstituicao
JOIN equipamento ON equipamento.fkInstituicao = instituicao.idInstituicao
JOIN manutencao ON manutencao.fkEquipamento = equipamento.idEquipamento
WHERE idEquipamento = manutencao.fkEquipamento 
AND fkSala = sala.idSala and manutencao.fkEquipamento = locacao.fkEquipamento
GROUP BY idSala, nome;')

-- sala, locacao, institucao, equipamento, manutencao
SELECT idSala, nome, (SELECT count(manutencao.fkEquipamento) FROM manutencao WHERE situacao ='Aberto') qtd
FROM sala 
JOIN locacao ON sala.idSala = locacao.fkSala
JOIN instituicao ON sala.fkInstituicao = instituicao.idInstituicao
JOIN equipamento ON equipamento.fkInstituicao = instituicao.idInstituicao
JOIN manutencao ON manutencao.fkEquipamento = equipamento.idEquipamento
WHERE idEquipamento = manutencao.fkEquipamento 
AND fkSala = sala.idSala and manutencao.fkEquipamento = locacao.fkEquipamento
GROUP BY idSala, nome;