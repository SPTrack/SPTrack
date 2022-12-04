var procModel = require('../models/procModel');

function cadastro(request, response) {
    var sisop = request.body.sisopServer;
    var nameP = request.body.namePServer;
    var tipoP = request.body.tipoServer;

    if (sisop == undefined || nameP == undefined ) {
        response.status(400).send('nome/so inválidos!')
    } else if ( tipoP == "---") {
        response.status(400).send('tipo de processo inválido!')
    } else {
        procModel.cadastro(sisop,nameP,tipoP).then(resultado => {
            response.json(resultado)
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("\nNão foi possivel cadastrar os dados! Erro: ", erro.sqlMessage);
                    response.status(500).json(erro.sqlMessage);
                });

            }
    }

function getProcessosMortos(request,response){
    procModel.getProcessosMortos().then(resultado => {
        response.json(resultado)
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nNão foi possivel pegar os dados! Erro: ", erro.sqlMessage);
                response.status(500).json(erro.sqlMessage);
            });
}

function getProcessos(request,response){
    procModel.getProcessos().then(resultado => {
        response.json(resultado)
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nNão foi possivel pegar os dados! Erro: ", erro.sqlMessage);
                response.status(500).json(erro.sqlMessage);
            });
}
function setCategoria(request,response){
    var id = request.body.idServer;
    var soP = request.body.soServer;
    var nomeP = request.body.nomeServer;
    var tipoP = request.body.tipoServer;
    if (id == undefined || id <0 || id=="") {
        console.log("id errado");
    
    } else if (soP==undefined || nomeP==undefined) {
        console.log("nome ou/e so errado")
    } else if (tipoP!="blacklist" && tipoP!="whitelist") {
        console.log("tipo errado")
    } else {
        procModel.setCategoria(id,soP,nomeP,tipoP).then(resultado => {
            response.json(resultado)
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("\nNão foi possivel pegar os dados! Erro: ", erro.sqlMessage);
                    response.status(500).json(erro.sqlMessage);
                });    
    }
    
}

module.exports = {
    cadastro,
    getProcessosMortos,
    getProcessos,
    setCategoria
}