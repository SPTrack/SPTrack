var database = require("../database/config")

function cadastrar(nome, email, senhaCriptografada, tipoUsuario, nivelAcesso, fkInstituicao, fkGestor) {    
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){        
        return database.executar(`INSERT INTO usuario VALUES (null, '${nome}', '${email}', '${senhaCriptografada}', '${tipoUsuario}', NOW(), ${nivelAcesso}, ${fkInstituicao}, ${fkGestor});`);
    }else if (process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`INSERT INTO usuario (nome, email, senha, tipoUsuario, dataRegisto, fkInstituicao)
        VALUES ('${nome}', '${email}', '${senha}', '${tipoUsuario}', GETDATE(), ${nivelAcesso},${fkInstituicao});`);
    }
}

function procurarPorEmail(email) {
    return database.executar(`SELECT * FROM usuario WHERE email = '${email}';`);
}

module.exports = {
    cadastrar, 
    procurarPorEmail
};