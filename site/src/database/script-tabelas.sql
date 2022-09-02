create database SPTrack;
use SPTrack;

create table instituicao(
	idInstituicao int primary key auto_increment,
    razaoSocial varchar(120),
    nomeFantasia varchar(100),
    cnpj varchar (14),
    cep char(8),
    estado varchar (45),
    complemento varchar(100),
    cidade varchar(45),
    bairro varchar(45),
    logradouro varchar(50),
    numero char(6)
) auto_increment = 1000;

create table usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(65),
    tipoUsuario varchar(45) check(tipoUsuario IN ('admin', 'analista')),
    fkInstituicao int,
    foreign key (fkInstituicao) references instituicao(idInstituicao),
    fkGestor int,
    foreign key (fkGestor) references usuario(IdUsuario)
);

create table sala(
	idSala int primary key auto_increment,
    nome varchar(45),
    fkInstituicao int,
    foreign key (fkInstituicao) references instituicao(idInstituicao)
);

create table equipamento(
	idEquipamento int primary key auto_increment,
    cpuEquipamento varchar(45),
    memoriaRam char(5),
    disco char(5),
    modelo varchar(45),
    sistemaOperacional varchar(20),
    numeroPatrimonio char(5),
    numeroSerial varchar(20)
);

INSERT INTO equipamento VALUES (null, 'I5 9400f','4GB','500GB','HP Prata','Windows','3892','BRG382784F');
create table registro(
	idRegistro int primary key auto_increment,
    cpuEquipamento decimal(5,2),
    memoria decimal(5,2),
    disco decimal(5,2),
    dataRegistro datetime,
    fkEquipamento int,
    foreign key (fkEquipamento) references equipamento(idEquipamento)
);
create table locacao(
	fkEquipamento int,
    foreign key (fkEquipamento) references equipamento(idEquipamento),
    fkSala int,
    foreign key (fkSala) references sala(idSala),
    dtEstadia datetime,
    primary key (fkEquipamento, fkSala, dtEstadia)
);
create table manutencao(
	idManutencao int primary key auto_increment,
    dtInicio datetime,
    dtFim datetime,
    situacao varchar(45),
    descricao varchar(60),
    fkUsuario int,
    foreign key (fkUsuario) references usuario(idUsuario),
    fkEquipamento int,
    foreign key (fkEquipamento) references equipamento(idEquipamento)
);
select * from usuario;