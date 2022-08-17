var bcrypt = require('bcrypt');

var instituicaoModel = require('../models/instituicaoModel');
var usuarioModel = require('../models/usuarioModel');

function cadastrar(request, response) {
    var razaoSocial = request.body.razaoSocialServer;
    var nomeFantasia = request.body.nomeFantasiaServer;
    var cnpj = request.body.cnpjServer;
    var cep = request.body.cepServer;
    var estado = request.body.estadoServer;
    var complemento = request.body.complementoServer;
    var cidade = request.body.cidadeServer;
    var bairro = request.body.bairroServer;
    var lougradouro = request.body.lougradouroServer;
    var numero = request.body.numeroServer;
    var email = request.body.emailServer;
    var senha = request.body.senhaServer;

    if (razaoSocial == null || razaoSocial == undefined) {
        response.status(400).send('Razão Social é obrigatório!')
    } else if (nomeFantasia == null || nomeFantasia == undefined) {
        response.status(400).send('Nome Fantasia é obrigatório!')
    } else if (cnpj == null || cnpj == undefined) {
        response.status(400).send('CNPJ é obrigatório!')
    } else if (cep == null || cep == undefined) {
        response.status(400).send('CEP é obrigatório!')
    } else if (estado == null || estado == undefined) {
        response.status(400).send('Estado é obrigatório!')
    } else if (complemento == null || complemento == undefined) {
        response.status(400).send('Complemento é obrigatório!')
    } else if (cidade == null || cidade == undefined) {
        response.status(400).send('Cidade é obrigatório!')
    } else if (bairro == null || bairro == undefined) {
        response.status(400).send('Bairro é obrigatório!')
    } else if (lougradouro == null || lougradouro == undefined) {
        response.status(400).send('Lougrado é obrigatório!')
    } else if (numero == null || numero == undefined) {
        response.status(400).send('Número é obrigatório!')
    } else if (email == null || email == undefined) {
        response.status(400).send('Email do administrador é obrigatório!')
    } else if (senha == null || senha == undefined) {
        response.status(400).send('Senha do administrador é obrigatório!')
    } else {
        instituicaoModel.cadastrar(
            razaoSocial, 
            nomeFantasia, 
            cnpj, 
            cep, 
            estado, 
            complemento, 
            cidade, 
            bairro, 
            lougradouro, 
            numero
        ).then(resultadoInstituicao => {
            var idInstituicao = resultadoInstituicao.insertId;

            bcrypt.hash(senha, 8).then(senhaCriptografada => {
                usuarioModel.cadastrar(`Admin ${nomeFantasia}`, email, senhaCriptografada, 'admin', idInstituicao, null)
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
    }
}

module.exports = {
    cadastrar
}