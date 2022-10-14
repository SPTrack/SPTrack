var express = require("express");
var router = express.Router();

var instituicaoController = require('../controllers/instituicaoController');

router.post('/cadastro', function (request, response) {
    instituicaoController.cadastrar(request, response);
});

router.post('/editar', function (request, response){
    instituicaoController.editar(request, response);
});

router.post('/getInstituicao', function (request, response){
    instituicaoController.getInstituicao(request, response);
});

module.exports = router;