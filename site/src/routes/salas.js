var express = require("express");
var router = express.Router();

var salaController = require('../controllers/salaController');

router.post('/', function (request, response) {
    salaController.cadastrar(request, response);
});

router.post('/getSalas', function (request, response) {
    salaController.getSalas(request, response);
});

router.post('/getDadoSala', function (request, response) {
    salaController.getDadoSala(request, response);
});

router.post('/getMaquinasSala', function (request, response) {
    salaController.getMaquinasSala(request, response);
});

router.post('/getNomeSala', function (request, response) {
    salaController.getNomeSala(request, response);
});

module.exports = router;