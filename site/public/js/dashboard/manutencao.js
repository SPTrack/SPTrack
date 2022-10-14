span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
maquinasTotal = [];
maquinasEmManutencao = [];


// Funcao para capturar todas as máquinas
function getMaquinasInstituicao(){
    fetch("/medidas/getMaquinasInstituicao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                for(i = 0; i < json.length; i++){
                    maquinasTotal.push(json[i]['idEquipamento']);
                }
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

// Funcao para capturar as máquinas em manutencao
function getMaquinasManutencao(){
    fetch("/medidas/getMaquinasManutencao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                for(i = 0; i < json.length; i++){
                    maquinasEmManutencao.push(json[i]['idEquipamento']);
                }
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

getMaquinasInstituicao();
getMaquinasManutencao();
// Funcao