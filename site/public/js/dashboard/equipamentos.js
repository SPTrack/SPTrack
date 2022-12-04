span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

var idInstituicaoServer = JSON.parse(sessionStorage.usuario).fkInstituicao;
var idEquipamento;
var idNovaMaquina;
var idSala = 0;

if(window.location.search.split('?')[1]){
    console.log(idEquipamento)
    hide(1);
}
// x = window.location.search.split('?idEquipamento')[1]
// console.log(x)
// console.log('a')

window.onload = () => {
    const parametrosString = window.location.search;
    const parametros = new URLSearchParams(parametrosString);

    idEquipamento = Number(parametros.get("idEquipamento"));

    listarDadosMaquina();
    listarMaquinas();
    getSalas();
    historico();
};

function hide(mode){
    if(mode == 0){
        hideCadastrar.style.display = 'block';
        hideEditar.style.display = 'none';
        hideHistorico.style.display = 'none';
        cadButton.style.backgroundColor = 'black';
        editButton.style.backgroundColor = '#858796';
        cadButton.style.border = '1px solid black';
        editButton.style.border = '1px solid #858796';
        cadButton.style.color = 'white';
        editButton.style.color = 'black';
        histButton.style.color = 'black';
        histButton.style.backgroundColor = '#858796';
    }else if (mode == 1) {
        hideEditar.style.display = 'block';
        hideCadastrar.style.display = 'none';
        hideHistorico.style.display = 'none';
        editButton.style.backgroundColor = 'black';
        cadButton.style.backgroundColor = '#858796';
        editButton.style.border = '1px solid black';
        cadButton.style.border = '1px solid #858796';
        editButton.style.color = 'white';
        cadButton.style.color = 'black';
        histButton.style.color = 'black';
        histButton.style.backgroundColor = '#858796';
    }
    else if (mode == 2) {
        hideEditar.style.display = 'none';
        hideCadastrar.style.display = 'none';
        hideHistorico.style.display = 'block';
        histButton.style.backgroundColor = 'black';
        cadButton.style.backgroundColor = '#858796';
        editButton.style.border = '1px solid black';
        cadButton.style.border = '1px solid #858796';
        histButton.style.color = 'white';
        cadButton.style.color = 'black';
        editButton.style.backgroundColor = '#858796';
        editButton.style.color = 'black';   
    }
       
    
}

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
                pegarIdNovaMaquina();

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
    console.log(idMaquina);
    console.log(salaSelectCadastro.value);
    console.log(nomeProcessador.value);
    console.log(100);
    console.log(nomeMemoria.value);
    console.log(capacidadeMemoria.value);
    console.log(nomeDisco.value);
    console.log(capacidadeDisco.value);
    fetch("/medidas/cadastrarComponentes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       
        body: JSON.stringify({
            idEquipamentoServer: idMaquina,
            idSalaCadastroServer: salaSelectCadastro.value,
            nomeProcessadorServer: nomeProcessador.value,
            capacidadeProcessadorServer: 100,
            nomeMemoriaServer: nomeMemoria.value,
            capacidadeMemoriaServer: capacidadeMemoria.value,
            nomeDiscoServer: nomeDisco.value,
            capacidadeDiscoServer: capacidadeDisco.value * 1000
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
            idInstituicaoServer: idInstituicaoServer
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                cadastrarComponentes(json[0]['idEquipamento']);
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


function historico() {
    fetch("/medidas/historico", {
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
                 hist = json.map((object) => object);
                console.log(hist)
                for (var contHist = 0; contHist < hist.length; contHist++) {
                  
                  
                  if (hist[contHist].fkSala == 1) {
                    document.getElementById(
                        "ul"
                      ).innerHTML += ` 
                      <li class="list-group-item">
                          <div class="row align-items-center no-gutters">
                              <div class="col me-2">
                                  <h6 class="mb-0">
                                      <div id="paiDisps">
                                       <li id="listgrup" class="list-group-item">
                  <div class="row align-items-center no-gutters">
                  <div class="col me-2" >
                  
                  <label for="maquinaD0" class="onmouseoverclass"> ${hist[contHist].modelo} foi modificado e esta alocado na sala de TI</label><br>
                  </div></div></li> 
                  
                  
                  
                  
                                  </h6>
                              </div>
                          </div>
                      </li>
                  
                      
                  `;
                  }
                  if (hist[contHist].fkSala == 2) {
                    document.getElementById(
                        "ul"
                      ).innerHTML += `
                      <li class="list-group-item">
                          <div class="row align-items-center no-gutters">
                              <div class="col me-2">
                                  <h6 class="mb-0">
                                      <div id="paiDisps">
                                       <li id="listgrup" class="list-group-item">
                  <div class="row align-items-center no-gutters">
                  <div class="col me-2" >
                  
                  <label for="maquinaD0" class="onmouseoverclass"> ${hist[contHist].modelo} foi modificado e esta alocado na sala de SI  </label><br>
                  </div></div></li> 
                  
                  
                  
                  
                                  </h6>
                              </div>
                          </div>
                      </li>
                  
                      
                  `;
                  }
                  if (hist[contHist].fkSala == 3) {
                    document.getElementById(
                        "ul"
                      ).innerHTML += `
                      <li class="list-group-item">
                          <div class="row align-items-center no-gutters">
                              <div class="col me-2">
                                  <h6 class="mb-0">
                                      <div id="paiDisps">
                                       <li id="listgrup" class="list-group-item">
                  <div class="row align-items-center no-gutters">
                  <div class="col me-2" >
                  
                  <label for="maquinaD0" class="onmouseoverclass"> ${hist[contHist].modelo} foi modificado e esta alocado na sala de CCO</label><br>
                  </div></div></li> 
                  
                  
                  
                  
                                  </h6>
                              </div>
                          </div>
                      </li>
                  
                      
                  `;
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

