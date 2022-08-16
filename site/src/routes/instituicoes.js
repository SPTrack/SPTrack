var express = require("express");
var router = express.Router();

var instituicaoController = require('../controllers/instituicaoController');

router.post('/', function (request, response) {
    instituicaoController.cadastrar(request, response);
});

module.exports = router;