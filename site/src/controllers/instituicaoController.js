var bcrypt = require('bcrypt');

var instituicaoModel = require('../models/instituicaoModel');
var salaModel = require('../models/salaModel');
var usuarioModel = require('../models/usuarioModel');

function cadastrar(request, response) {
    var razaoSocial = request.body.razaoSocialServer;
    var nomeFantasia = request.body.nomeFantasiaServer;
    var cnpj = request.body.cnpjServer;
    var cep = request.body.cepServer;
    var uf = request.body.ufServer;
    var complemento = request.body.complementoServer;
    var cidade = request.body.cidadeServer;
    var bairro = request.body.bairroServer;
    var logradouro = request.body.logradouroServer;
    var numero = request.body.numeroServer;
    var nome = request.body.nomeServer;
    var email = request.body.emailServer;
    var senha = request.body.senhaServer;
    var nomeUsuario = request.body.nomeServer;

    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.replace('-', '');
    cnpj = cnpj.replace(/\./g,'');
    cep = cep.replace('-', '')
    cep = cep.replace(/\./g, '');

    if (razaoSocial == null || razaoSocial == undefined) {
        response.status(400).send('Razão Social é obrigatório!')
    } else if (nomeFantasia == null || nomeFantasia == undefined) {
        response.status(400).send('Nome Fantasia é obrigatório!')
    } else if (cnpj == null || cnpj == undefined) {
        response.status(400).send('CNPJ é obrigatório!')
    } else if (cep == null || cep == undefined) {
        response.status(400).send('CEP é obrigatório!')
    } else if (uf == null || uf == undefined) {
        response.status(400).send('uf é obrigatório!')
    } else if (complemento == null || complemento == undefined) {
        response.status(400).send('Complemento é obrigatório!')
    } else if (cidade == null || cidade == undefined) {
        response.status(400).send('Cidade é obrigatório!')
    } else if (bairro == null || bairro == undefined) {
        response.status(400).send('Bairro é obrigatório!')
    } else if (logradouro == null || logradouro == undefined) {
        response.status(400).send('Lougrado é obrigatório!')
    } else if (numero == null || numero == undefined) {
        response.status(400).send('Número é obrigatório!')
    } else if (nome == null || nome == undefined) {
        response.status(400).send('Nome do administrador é obrigatório!')
    } else if (email == null || email == undefined) {
        response.status(400).send('Email do administrador é obrigatório!')
    } else if (senha == null || senha == undefined) {
        response.status(400).send('Senha do administrador é obrigatório!')
    } else {
        instituicaoModel.cadastrar(razaoSocial, nomeFantasia, cnpj, cep, uf, complemento, cidade, bairro, logradouro, numero)
        .then(resultadoInstituicao => {
            var idInstituicao = resultadoInstituicao.insertId;

            salaModel.cadastrar('Sala de TI', idInstituicao).then(_ => {                
                bcrypt.hash(senha, 8).then(senhaCriptografada => {
                    usuarioModel.cadastrar(nomeUsuario, email, senhaCriptografada, 'admin', 3, idInstituicao, null)
                    .then(resultado => {
                        response.json(resultado);
                    }).catch(function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                        response.status(500).json(erro.sqlMessage);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                response.status(500).json(erro.sqlMessage);
            });

        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function editar(request, response) {
    var idInstituicao = request.body.idInstituicaoServer;
    var nomeFantasia = request.body.nomeFantasiaServer;
    var razaoSocial = request.body.razaoSocialServer;
    var cnpj = request.body.cnpjServer;
    var cep = request.body.cepServer;
    var uf = request.body.ufServer;
    var complemento = request.body.complementoServer;
    var cidade = request.body.cidadeServer;
    var bairro = request.body.bairroServer;
    var logradouro = request.body.logradouroServer;
    var numero = request.body.numeroServer;

    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.replace('-', '');
    cnpj = cnpj.replace(/\./g,'');
    cep = cep.replace('-', '')
    cep = cep.replace(/\./g, '');

    if (razaoSocial == null || razaoSocial == undefined) {
        response.status(400).send('Razão Social é obrigatório!')
    } else if (nomeFantasia == null || nomeFantasia == undefined) {
        response.status(400).send('Nome Fantasia é obrigatório!')
    } else if (cnpj == null || cnpj == undefined) {
        response.status(400).send('CNPJ é obrigatório!')
    } else if (cep == null || cep == undefined) {
        response.status(400).send('CEP é obrigatório!')
    } else if (uf == null || uf == undefined) {
        response.status(400).send('uf é obrigatório!')
    } else if (complemento == null || complemento == undefined) {
        response.status(400).send('Complemento é obrigatório!')
    } else if (cidade == null || cidade == undefined) {
        response.status(400).send('Cidade é obrigatório!')
    } else if (bairro == null || bairro == undefined) {
        response.status(400).send('Bairro é obrigatório!')
    } else if (logradouro == null || logradouro == undefined) {
        response.status(400).send('Lougrado é obrigatório!')
    } else if (numero == null || numero == undefined) {
        response.status(400).send('Número é obrigatório!')
    }else {
        instituicaoModel.editar(idInstituicao,nomeFantasia,razaoSocial,cep, uf, complemento, cidade, bairro, logradouro, numero)
                    .then(resultado => {
                        response.json(resultado);
                    }).catch(function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao editar os dados da instituição! Erro: ", erro.sqlMessage);
                        response.status(500).json(erro.sqlMessage);
                    });
        
    }
}

function getInstituicao(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        instituicaoModel.getInstituicao(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados da instituição! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function notificacoes(request, response){
    var idInstituicao = request.body.idInstituicaoServer;

    if ((idInstituicao == null || idInstituicao == undefined)) {
        response.status(400).send("Requisição negada. Dados não integros!");
    } else {
        instituicaoModel.notificacoes(idInstituicao).then(resultado => {
            response.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados da instituição! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    cadastrar,
    editar,
    getInstituicao,
    notificacoes
}