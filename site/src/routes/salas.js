var express = require("express");
var router = express.Router();

var salaController = require('../controllers/salaController');

router.post('/', function (request, response) {
    salaController.cadastrar(request, response);
});

module.exports = router;