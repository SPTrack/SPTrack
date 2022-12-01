var express = require("express");
var router = express.Router();

var procController = require('../controllers/procController');

router.post('/entrar', function (request, response) {
    procController.entrar(request, response);
});

module.exports = router;