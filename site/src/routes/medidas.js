var express = require("express");
var router = express.Router();

var medidasController = require('../controllers/medidasController');

router.post('/getDadosEquipamento', function (request, response) {
    medidasController.getDadosEquipamento(request, response);
});

router.post('/getMedidasInstituicao', function (request, response) {
    medidasController.getMedidasInstituicao(request, response);
});


module.exports = router;