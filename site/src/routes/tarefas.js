var express = require("express");
var router = express.Router();

var tarefaController = require('../controllers/tarefaController');

router.post('/insertTarefa', function (request, response) {
    tarefaController.insertTarefa(request, response);
});

router.post('/getLastTarefa', function (request, response) {
    tarefaController.getLastTarefa(request, response);
});

router.post('/setTarefaXequipamentos', function (request, response) {
    tarefaController.setTarefaXequipamentos(request, response);
});

module.exports = router;