var express = require("express");
var router = express.Router();

var usuarioController = require('../controllers/usuarioController');

router.post('/entrar', function (request, response) {
    usuarioController.cadastrar(request, response);
});

module.exports = router;