var express = require("express");
var router = express.Router();

var medidasController = require('../controllers/medidasController');

router.post('/getDadosEquipamento', function (request, response) {
    medidasController.getDadosEquipamento(request, response);
});

router.post('/getMedidasInstituicao', function (request, response) {
    medidasController.getMedidasInstituicao(request, response);
});

router.post('/getMediasInstituicao', function (request, response) {
    medidasController.getMediasInstituicao(request, response);
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

module.exports = router;