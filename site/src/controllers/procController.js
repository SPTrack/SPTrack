var procModel = require('../models/procModel');

function lista(request, response) {
 //   var email = request.body.emailServer;
   // var senha = request.body.senhaServer;

    if (email == null || email == undefined) {
        response.status(400).send('Email é obrigatório!')
    } else if (senha == null || senha == undefined) {
        response.status(400).send('Senha é obrigatório!')
    } else {
        procModel.procurarPorEmail(email).then(resultado => {
            response.json(resultado)
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("\nNão foi possivel pegar os dados! Erro: ", erro.sqlMessage);
                    response.status(500).json(erro.sqlMessage);
                });

            }
    }


module.exports = {
    lista
}