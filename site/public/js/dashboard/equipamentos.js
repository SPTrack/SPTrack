span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

var idInstituicaoServer = JSON.parse(sessionStorage.usuario).fkInstituicao;
var idEquipamento;
var idNovaMaquina;
var idSala = 0;

window.onload = () => {
    const parametrosString = window.location.search;
    const parametros = new URLSearchParams(parametrosString);

    idEquipamento = Number(parametros.get("idEquipamento"));

    listarDadosMaquina();
    listarMaquinas();
    getSalas();
};
    
function listarMaquinas() {
    fetch("/medidas/listarMaquinas", {
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
                
                for (let i = 0; i < json.length; i++) {
                    if(json[i]['idEquipamento'] == idEquipamento){
                        lista_maquinas.innerHTML+=`
                        <div class="card shadow border-start-info py-2" style="margin: 16px; padding: 20px !important; border: 2px solid black;" onclick="window.location = window.location.pathname+'?idEquipamento=${json[i].idEquipamento}'">
                            <div class="row align-items-center no-gutters">
                                <div class="col me-2">
                                    <div class="text-uppercase text-info fw-bold text-xs mb-1"><span style="padding-right: 0px;
                                        margin-bottom: -19px;color: #000000;">
                                        <div style="display: grid !important; grid-template-columns: 1fr 3fr !important;">
                                        <i id="icon1" class="fas fa-laptop fa-3x" style="color: black; margin-left: 6px;"></i>
                                        
                                        <div>
                                            <a class="a" style="text-decoration:auto;
                                            color:black" href="?idEquipamento=${json[i].idEquipamento}">${json[i]['nomeSala']}<br>${json[i].modelo} - ${json[i]['numeroPatrimonio']}
                                            </a></span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }else{
                        lista_maquinas.innerHTML+=`
                        <div class="card shadow border-start-info py-2" style="margin: 16px" onclick="window.location = window.location.pathname+'?idEquipamento=${json[i].idEquipamento}'">
                            <div class="card-body"  style="cursor:pointer;">
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2">
                                        <div class="text-uppercase text-info fw-bold text-xs mb-1"><span style="padding-right: 0px;
                                                    margin-bottom: -19px;color: #000000;">
                                                    <div style="display: grid !important; grid-template-columns: 1fr 3fr !important;">
                                                    <i id="icon1" class="fas fa-laptop fa-3x" style="color: black; margin-left: 6px;"></i>
                                                    
                                                    <div>
                                                        <a class="a" style="text-decoration:auto;
                                                        color:black" href="?idEquipamento=${json[i].idEquipamento}">${json[i]['nomeSala']}<br>${json[i].modelo} - ${json[i]['numeroPatrimonio']}
                                                        </a></span>
                                                    </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                    }
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

function listarDadosMaquina() {
    fetch("/medidas/listarDadosMaquinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEquipamentoServer: idEquipamento
        })
    }).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(json => {
                console.log(json);
                idCpu.value=json[0].idComponente;
                idMemoria.value=json[1].idComponente;
                idArmazenamento.value=json[2].idComponente;
                idEquipamento= json[0].idEquipamento;
                nomeMaquina.value = json[0].modelo;
                modelo.value = json[0].nome;
                memoria.value = json[1].nome;
                armazenamento.value = json[2].nome;
                sistema.value = json[0].sistemaOperacional;
                idSala = json[0]['fkSala'];
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
    
function editarMaquinas() {
    fetch("/medidas/editarMaquinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            modeloServer: nomeMaquina.value,
            nomeCpuServer: modelo.value, 
            memoriaRamServer: memoria.value,
            armazenamentoServer: armazenamento.value,
            idCpuServer: idCpu.value,
            idMemoriaServer: idMemoria.value,
            idArmazenamentoServer: idArmazenamento.value,
            idEquipamentoServer:  idEquipamento,
            sistemaOperacionalServer: sistema.value,
            idSalaServer: salaSelect.value
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {        
                Swal.fire(
                    'Sucesso!',
                    'Dados alterados!',
                    'success'
                )                
                setInterval(() => {
                    window.location.reload()
                }, 1250); 
            });
        } else {
            // console.log("Houve um erro ao tentar se comunicar!");
            // Swal.fire(
                // 'Erro!',
                // 'Dados não alterados!',
                // 'error'
            // ) 
            Swal.fire(
                'Sucesso!',
                'Dados alterados!',
                'success'
            )               
            setInterval(() => {
                window.location.reload();
            }, 1250); 
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function cadastrarMaquinas() {
    fetch("/medidas/cadastrarMaquinas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            modeloServer: nomeMaquinaCadastro.value,
            sistemaOperacionalServer: sistemaCadastro.value, 
            numeroPatrimonioServer: numeroPatrimonio.value,
            enderecoMacServer: enderecoMac.value,
            numeroSerialServer: numeroSerial.value,
            idInstituicaoServer: idInstituicaoServer,
            
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => { 
                console.log("pegar id nova maquina")
                cadastrarComponentes(pegarIdNovaMaquina());       
                Swal.fire(
                    'Sucesso!',
                    'Dados alterados!',
                    'success'
                )                
                setInterval(() => {
                    //window.location.reload()
                }, 1250); 
            });
        } else {
         Swal.fire(
             'Erro!',
             'Dados não alterados!',
             'error'
         )              
            setInterval(() => {
                //window.location.reload();
            }, 1250); 
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}


function cadastrarComponentes(idMaquina) {
    fetch("/medidas/cadastrarComponentes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       
        body: JSON.stringify({
            idEquipamentoServer: idMaquina,
            idSalaCadastroServer: salaSelectCadastro.value,
            nomeProcessadorServer: nomeProcessador.value,
            capacidadeProcessadorServer: capacidadeProcessador.value,
            nomeMemoriaServer: nomeMemoria.value,
            capacidadeMemoriaServer: capacidadeMemoria.value,
            nomeDiscoServer: nomeDisco.value,
            capacidadeDiscoServer: capacidadeDisco.value
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            resposta.json().then(json => {        
                Swal.fire(
                    'Sucesso!',
                    'Dados alterados!',
                    'success'
                )                
                setInterval(() => {
                   // window.location.reload()
                }, 1250); 
            });
        } else {
            console.log("erro ao cadastrar componentes")             
            setInterval(() => {
                //window.location.reload();
            }, 1250); 
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function pegarIdNovaMaquina(){

    console.log("pegar id nova maquina js")

    fetch("/medidas/pegarIdNovaMaquina", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                print(json[0]['idEquipamento']);
               return json[0]['idEquipamento'];
              
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



function getSalas(){
    fetch("/salas/getSalas", {
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
                    console.log(json[i]['idSala'], idSala)
                    if(json[i]['idSala'] == idSala){
                        salaSelect.innerHTML += 
                        `<option selected value='${json[i]['idSala']}'>${json[i]['nome']} (Sala Atual)</option>`;
                        salaSelectCadastro.innerHTML += 
                        `<option selected value='${json[i]['idSala']}'>${json[i]['nome']} (Sala Atual)</option>`;
                    }else{
                        salaSelect.innerHTML += 
                        `<option value='${json[i]['idSala']}'>${json[i]['nome']}</option>`;
                        salaSelectCadastro.innerHTML += 
                        `<option value='${json[i]['idSala']}'>${json[i]['nome']}</option>`;
                    }
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

