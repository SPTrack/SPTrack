var database = require("../database/config");

function cadastrar(nome, fkInstituicao) {
    return database.executar(`INSERT INTO sala VALUES (null, '${nome}', ${fkInstituicao});`);
}

module.exports = {
    cadastrar
}