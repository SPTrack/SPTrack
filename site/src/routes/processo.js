var express = require("express");
var router = express.Router();

var procController = require('../controllers/procController');

router.post('/cadastrarProcesso', function (request, response) {
    procController.cadastro(request, response);
});
router.post('/getProcessosMortos', function (request, response) {
    procController.getProcessosMortos(request, response);
});
router.post('/getProcessos', function (request, response) {
    procController.getProcessos(request, response);
});
router.post('/setCategoria', function (request, response) {
    procController.setCategoria(request, response);
});


module.exports = router;