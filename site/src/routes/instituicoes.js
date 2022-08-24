var express = require("express");
var router = express.Router();

var instituicaoController = require('../controllers/instituicaoController');

router.post('/cadastro', function (request, response) {
    instituicaoController.cadastrar(request, response);
});

module.exports = router;