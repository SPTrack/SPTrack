dadosInstituicao = {};

function getDadosInstituicao(){
    fetch("/medidas/getMedidasInstituicao", {
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
                console.log(json)
                for(i = 0; i < json.length; i++){
                    nome = json[i].tipo;
                    if(!dadosInstituicao[nome]){
                        dadosInstituicao[nome] = [];
                    }

                    dadosInstituicao[nome].push(json[i].valor)
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

getDadosInstituicao();