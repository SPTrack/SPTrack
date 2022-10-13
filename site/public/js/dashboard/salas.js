span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
var sala=[];
var qntdMaquina=[];
var funcionamento=[];

function data_sala() {
    fetch("/salas/getqntdMaquinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            nomeInstituicaoServer: sessionStorage.usuario
        })
    }).then(function (resposta){
        if (resposta.ok){
            resposta.json().then(json => {
                console.log(json.length);
                console.log(json);

                for (var i = 0; i < json.length; i++)
                 {
                    //guardar no vetor
                    qntdMaquina.push(json[i].idEquipamento);
                    
                }
                        
            })
        }            
    }).catch(function (erro) {
        console.log(erro);
    });

    fetch("/salas/getSala", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEquipamentoServer: sessionStorage.usuario
    })
    }).then(function (resposta){
        if (resposta.ok){
            resposta.json().then(json => {
                console.log(json.length);
                console.log(json);

                for (var i = 0; i < json.length; i++){
                    qntdMaquina.push(json[i].nome);
                            
                    if (json[i].situacao=='Aberto') {
                        funcionamento.push('Manutenção');
                    }else{
                        funcionamento.push('OK');
                    }
                }            
            })
        }            
    }).catch(function (erro) {
        console.log(erro);
    });

    printarDados(0);
}
    
function aba1(){
    printarDados(0);
}

function aba2(){
    printarDados(10);
}

function aba3(){
    printarDados(20);
}

function printarDados(aba){
    Datasalas.innerHTML="";

    for (let i = aba; i < aba+10; i++) {
        Datasalas.innerHTML += `<tr>
                        <td> ${sala[i]}</td>
                        <td> ${qntdMaquina[i]}   </td>
                        <td> ${funcionamento[i]} </td><br>
                        </tr>`
        
    }
}

data_sala()