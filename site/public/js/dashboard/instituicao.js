span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
cnpj =  "";

function editar() {
    fetch("/instituicoes/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            nomeFantasiaServer: nomeFantasia.value,
            razaoSocialServer: razaoSocial.value,
            cnpjServer: cnpj,
            cepServer: cep.value,
            ufServer: estado.value,
            complementoServer: complemento.value,
            cidadeServer: cidade.value,
            bairroServer: bairro.value,
            logradouroServer: logradouro.value,
            numeroServer: numero.value
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
 
        alert("Dados editados com sucesso")
          setInterval(() => {
            window.location.reload()
          }, 3000);
                
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

function getInstituicao() {
    fetch("/instituicoes/getInstituicao", {
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
                console.log()
                    nomeFantasia.value = json[0]['nomeFantasia']
                    razaoSocial.value = json[0]['razaoSocial']
                    cnpj.value = json[0]['cnpj']
                    cnpjInp.value = json[0]['cnpj'];
                    cep.value = json[0]['cep']
                    estado.value = json[0]['estado']
                    complemento.value = json[0]['complemento']
                    cidade.value = json[0]['cidade']
                    bairro.value = json[0]['bairro']
                    logradouro.value = json[0]['logradouro']
                    numero.value = json[0]['numero']
                    
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



getInstituicao();