var database = require("../database/config");

function cadastrar(nome, fkInstituicao) {
    return database.executar(`INSERT INTO sala VALUES (null, '${nome}', ${fkInstituicao});`);
}
function getSala(nomeInstituicao)
{
  return database.executar(`select distinct sala.nome,manutencao.situacao from sala join instituicao on sala.fkInstituicao join usuario on instituicao.idInstituicao join manutencao on usuario.idUsuario where instituicao.idInstituicao=${nomeInstituicao};`);
}
function getqntdMaquinas(idEquipamento){

    return database.executar(`select count(distinct idEquipamento) from sala join locacao on idsala join equipamento on idequipamento where idEquipamento = ${idEquipamento};`);
}
module.exports = {
    cadastrar,
    getSala,
    getqntdMaquinas
}