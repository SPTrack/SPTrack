var database = require("../database/config");

function cadastro(sisop,nameP,tipoP){
    return database.executar(`insert into processos(so,arquivos,tipoProcesso) values('${sisop}','${nameP}','${tipoP}');`);
}
function getProcessosMortos(){
    return database.executar("select nome,horas  from processosMortos order by horas desc OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;");
}
function getProcessos(){
    return database.executar("select * from processos;");
}
function setCategoria(id,soP,nomeP,tipoP){
    return database.executar(`update processos set so='${soP}',arquivos='${nomeP}',tipoProcesso = '${tipoP}' where idLeitura = '${id}' ;`);
}
module.exports = {
    cadastro,
    getProcessosMortos,
    getProcessos,
    setCategoria
}