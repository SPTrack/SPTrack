var express = require("express");
var router = express.Router();

var medidasController = require('../controllers/medidasController');

router.post('/getDadosEquipamento', function (request, response) {
    medidasController.getDadosEquipamento(request, response);
});

router.post('/getHistoricoDisponibilidade', function (request, response) {
    medidasController.getHistoricoDisponibilidade(request, response);
});

router.post('/getMedidasInstituicao', function (request, response) {
    medidasController.getMedidasInstituicao(request, response);
});

router.post('/getMaquinasMonitoradas', function (request, response) {
    medidasController.getMaquinasMonitoradas(request, response);
});

router.post('/getDisponibilidade', function (request, response) {
    medidasController.getDisponibilidade(request, response);
});

router.post('/getMaquinasInstituicao', function (request, response) {
    medidasController.getMaquinasInstituicao(request, response);
});

router.post('/setDadosG4', function (request, response) {
    medidasController.setDadosG4(request, response);
});

router.post('/getMediasEquipamentos', function (request, response) {
    medidasController.getMediasEquipamentos(request, response);
});

router.post('/getMaquinasManutencao', function (request, response) {
    medidasController.getMaquinasManutencao(request, response);
});

router.post('/retirarDaManutencao', function (request, response) {
    medidasController.retirarDaManutencao(request, response);
});

router.post('/inserirNaManutencao', function (request, response) {
    medidasController.inserirNaManutencao(request, response);
});

router.post('/pontuacaoDia', function (request, response) {
    medidasController.pontuacaoDia(request, response);
});

module.exports = router;