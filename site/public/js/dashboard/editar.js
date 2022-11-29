span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
idTarefa = window.location.search.split('?')[1];
isReagrupar = false;

function updateGroup(modo){
    if(JSON.parse(modo)){
        salasInputs.style.display = 'block';
        equipamentosPersonalizados.style.display = 'none';
    }else{
        salasInputs.style.display = 'none';
        equipamentosPersonalizados.style.display = 'block';
    }
}

function updateIsAgrupar(modo){
    if(JSON.parse(modo)){
        campo_Reagrupar.style.display = 'block';
    }else{
        campo_Reagrupar.style.display = 'none';
        equipamentosPersonalizados.style.display = 'none';
        salasInputs.style.display = 'none';
    }

    isReagrupar = modo;
}

function getDados(){
    fetch("/tarefas/getTarefa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idTarefaServer: idTarefa
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                datasSelecionadas = [json[0]['isDomingo'], json[0]['isSegunda'], json[0]['isTerca'],
                                    json[0]['isQuarta'], json[0]['isQuinta'], json[0]['isSexta'], json[0]['isSabado']];

                btsDatas = [domingoBox, segundaBox, tercaBox, quartaBox, quintaBox, sextaBox, sabadoBox];
                timeBox = [domingoTimeBox, segundaTimeBox, tercaTimeBox, quartaTimeBox, quintaTimeBox, sextaTimeBox, sabadoTimeBox]
                btnsHorariosInicio = [domingoTimeInicio, segundaTimeInicio, tercaTimeInicio, quartaTimeInicio, quintaTimeInicio, sextaTimeInicio, sabadoTimeInicio];
                btnsHorariosFins = [domingoTimeFim, segundaTimeFim, tercaTimeFim, quartaTimeFim, quintaTimeFim, sextaTimeFim, sabadoTimeFim];
        
                datasInicio = [json[0]['horarioInicioDomingo'], json[0]['horarioInicioSegunda'], json[0]['horarioInicioTerca'], 
                json[0]['horarioInicioQuarta'], json[0]['horarioInicioQuinta'], json[0]['horarioInicioSexta'], json[0]['horarioInicioSabado']];
                datasFim = [json[0]['horarioFimDomingo'], json[0]['horarioFimSegunda'], json[0]['horarioFimTerca'], 
                json[0]['horarioFimQuarta'], json[0]['horarioFimQuinta'], json[0]['horarioFimSexta'], json[0]['horarioFimSabado']];

                nomeTarefa.value = json[0]['nome'];
                descricao.value = json[0]['descricao'];
                dateTimeInicio.value = json[0]['dataInicio'].slice(0, -5);
                dateTimeFim.value = json[0]['dataFim'].slice(0, -5);

                for(i = 0; i < 7; i++){
                    if(datasSelecionadas[i]){
                        btsDatas[i].checked = true;
                        timeBox[i].style.display = 'block';
                        btnsHorariosInicio[i].value = datasInicio[i];
                        btnsHorariosFins[i].value = datasFim[i];

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

function getMaquinas(){
    fetch("/tarefas/getTarefaXequipamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idTarefaServer: idTarefa
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
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

function listarMaquinas(){
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
                for (let i = 0; i < json.length; i++) {
                    agrupamentoPersonalizado.innerHTML+=`
                    <div class="card shadow border-start-info py-2" style="margin: 16px" id="bt${json[i].idEquipamento}" onclick="checkButton(eq${json[i].idEquipamento}, bt${json[i].idEquipamento})">
                        <div class="card-body"  style="cursor:pointer;">
                            <div class="row align-items-center no-gutters">
                                <div class="col me-2">
                                    <input type='checkbox' name='agrupamentoPersonalizado' style='display: none' id="eq${json[i].idEquipamento}" value="eq${json[i].idEquipamento}">
                                    <div class="text-uppercase text-info fw-bold text-xs mb-1"><span style="padding-right: 0px;
                                                margin-bottom: -19px;color: #000000;">
                                                <div style="display: grid !important; grid-template-columns: 1fr 3fr !important;">
                                                <i id="icon1" class="fas fa-laptop fa-3x" style="color: black; margin-left: 6px;"></i>

                                            <div>
                                                <a class="a" style="text-decoration:auto;
                                                color:black">${json[i]['nomeSala']}<br>${json[i].modelo} - ${json[i]['numeroPatrimonio']}
                                                </a></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
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
                    agrupamentoSalas.innerHTML += 
                    `<input type='checkbox' value='${json[i]['idSala']}' id="check${json[i]['idSala']}" name="grupoSalas"/>
                    <label for='check${json[i]['idSala']}'>${json[i]['nome']}</label><br>`;
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


getDados();
getMaquinas();
listarMaquinas();
getSalas();