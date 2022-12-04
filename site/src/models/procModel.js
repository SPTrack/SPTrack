var database = require("../database/config");

function cadastro(sisop,nameP,tipoP){
    return database.executar(`insert into processos(so,arquivos,tipoProcesso) values('${sisop}','${nameP}','${tipoP}');`);
}
function getProcessosMortos(){
    if(process.env.AMBIENTE_PROCESSO == 'producao'){
    return database.executar("select nome,horas  from processosMortos order by horas desc OFFSET 0 ROWS FETCH NEXT 20 ROWS ONLY;");
    }
    else{
        return database.executar("select nome,horas  from processosMortos order by horas desc limit 20");
    }
}
function getProcessos(){
    return database.executar("select * from processos;");
}
function setCategoria(id,soP,nomeP,tipoP){
    return database.executar(`update processos set so='${soP}',arquivos='${nomeP}',tipoProcesso = '${tipoP}' where idLeitura = ${id} ;`);
}
module.exports = {
    cadastro,
    getProcessosMortos,
    getProcessos,
    setCategoria
}