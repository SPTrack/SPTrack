var express = require("express");
var router = express.Router();

var tarefaController = require('../controllers/tarefaController');

router.post('/insertTarefa', function (request, response) {
    tarefaController.insertTarefa(request, response);
});

module.exports = router;