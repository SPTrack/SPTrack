//span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

function mudar_sala() {
    idComputador = id_comp.value;
    salaAtual = sala_atual.value;
    novaSala = nova_sala.value;
    idSala = [];
    nomeSala = [];


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
                console.log(json);
                for(i = 0; i < json.length; i++){
                    nomeSala.push(json[i]['nomeSala']);
                    idSala.push(json[i]['sala']);

                }
                alert("FUNCIONOU!!!!!!")
            
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
//pegar id da sala

for (let i = 0; i < nomeSala.length; i++) {
    if (nomeSala[i] == salaAtual) {
        salaAtual = idSala[i]
    }
    if (nomeSala[i] == novaSala) {
        novaSala = idSala[i]
    }
    
}

    fetch("/salas/getDadoSala", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            salaAtual,
            novaSala,
            idComputador
        })
    }).then(function (resposta){
        if (resposta.ok){
            resposta.json().then(json => {
                console.log(json.length);
                console.log(json);

                alert("FUNCIONOU!!!!!!")
                idComputador = json[0].idEquipamento;
                salaAtual = json[0].salatual;
                novaSala = json[0].salanova;

                        
            })
        }            
    }).catch(function (erro) {
        console.log(erro);
    });


}