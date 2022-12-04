var bcrypt = require('bcrypt');

var usuarioModel = require('../models/usuarioModel');

function entrar(request, response) {
    var email = request.body.emailServer;
    var senha = request.body.senhaServer;

    if (email == null || email == undefined) {
        response.status(400).send('Email é obrigatório!')
    } else if (senha == null || senha == undefined) {
        response.status(400).send('Senha é obrigatório!')
    } else {
        usuarioModel.procurarPorEmail(email).then(usuarioEncontrado => {
            if (usuarioEncontrado.length == 1) {
                bcrypt.compare(senha, usuarioEncontrado[0].senha).then(isIgual => {
                    if (isIgual) {
                        delete usuarioEncontrado[0].senha;
                        
                        if(usuarioEncontrado[0].fkGestor == null){
                            usuarioEncontrado[0]['nivelAcesso'] = "Admin";
                        }else{
                            usuarioEncontrado[0]['nivelAcesso'] = "Suporte";
                        }
                        
                        response.json(usuarioEncontrado[0]);

                    } else {
                        response.status(400).send('Email e/ou Senha inválido(s)!');        
                    }

                }).catch(function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    response.status(500).json(erro.sqlMessage);
                });

            } else {
                response.status(400).send('Email e/ou Senha inválido(s)!');
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            response.status(500).json(erro.sqlMessage);
        });
    }
}

function cadastrar(request, response){
    var nome = request.body.nomeServer;
    var email = request.body.emailServer;
    var tipoUsuario = request.body.tipoUsuarioServer;
    var nivelAcesso = request.body.nivelAcessoServer;
    var idInstituicao = request.body.idInstituicaoServer;
    var fkGestor = request.body.fkGestorServer;
    
    bcrypt.hash(request.body.senhaServer, 8).then(senhaCriptografada => {
        usuarioModel.cadastrar(nome, email, senhaCriptografada, tipoUsuario, nivelAcesso, idInstituicao, fkGestor)
        .then(resultado => {
            response.json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar os dados da tarefa! Erro: ", erro.sqlMessage);
        });
    });

    
}

module.exports = {
    entrar,
    cadastrar
}