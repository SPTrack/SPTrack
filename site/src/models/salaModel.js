var database = require("../database/config");

function cadastrar(nome, fkInstituicao) {
    return database.executar(`INSERT INTO sala VALUES (null, '${nome}', ${fkInstituicao});`);
}
function getSalas(idInstituicao){
    // return database.executar(`SELECT * FROM vw_manutencao_por_sala WHERE idInstituicao = ${idInstituicao};`);
    return database.executar(`SELECT * FROM sala WHERE fkInstituicao = ${idInstituicao};`);
}

module.exports = {
    cadastrar,
    getSalas
}