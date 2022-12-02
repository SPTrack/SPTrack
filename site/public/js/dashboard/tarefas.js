span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
qtdAtivas = 0;
qtdEncerradas = 0;
qtdProgramadas = 0;
qtdEmExecucao = 0;

function updateCards(){
    span_qtdAtivas.innerHTML = `${qtdAtivas} Tarefas`;
    span_qtdEncerradas.innerHTML = `${qtdEncerradas} Tarefas`;
    span_qtdProgramadas.innerHTML = `${qtdProgramadas} Tarefas`;
    span_qtdEmExecucao.innerHTML = `${qtdEmExecucao} Tarefas`;
}

function getTarefas(){
    fetch("/tarefas/getTarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                for (let i = 0; i < json.length; i++) {
                    now = new Date();
                    inicio = new Date(json[i]['dataInicio'])
                    fim = new Date(json[i]['dataFim'])

                    diasDisponiveis = [json[i]['isDomingo'], json[i]['isSegunda'], json[i]['isTerca'], json[i]['isQuarta'], json[i]['isQuinta'], json[i]['isSexta'], json[i]['isSabado']]
                    horarioInicio = [json[i]['horarioInicioDomingo'], json[i]['horarioInicioSegunda'], json[i]['horarioInicioTerca'], json[i]['horarioInicioQuarta'], json[i]['horarioInicioQuinta'], json[i]['horarioInicioSexta'], json[i]['horarioInicioSabado']]
                    horarioFim = [json[i]['horarioFimDomingo'], json[i]['horarioFimSegunda'], json[i]['horarioFimTerca'], json[i]['horarioFimQuarta'], json[i]['horarioFimQuinta'], json[i]['horarioFimSexta'], json[i]['horarioFimSabado']];
                    if(json[i]['nome'] == 'Análise da ai'){
                        console.log(horarioFim)
                    }
                    if(json[i]['dataFim'] ==  null){
                        if(inicio <= now){
                            tarefasAtivas.innerHTML += `
                            <li class="list-group-item linha">
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2" onclick="window.location = window.location.href + 'dados/?${json[i]['idTarefa']}'">
                                        <span class="nomeTarefa"> ${json[i]['nome']} </span><br>
                                        <span class="descricaoTarefa"> ${json[i]['descricao']} </span>
                                    </div>
                                </div>
                            </li>`;
                            qtdAtivas++;
                        }else if(inicio > now){
                            tarefasProgramadas.innerHTML += `
                            <li class="list-group-item linha">
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2" onclick="window.location = window.location.href + 'dados/?${json[i]['idTarefa']}'">
                                        <span class="nomeTarefa"> ${json[i]['nome']} </span><br>
                                        <span class="descricaoTarefa"> ${json[i]['descricao']} </span><br>
                                        <span class="fimAtividade"> Iniciará em: ${("0" + inicio.getDate()).slice(-2)}/${("0" + inicio.getMonth()).slice(-2)}/${inicio.getFullYear()} </span>
                                    </div>
                                </div>
                            </li>`;
    
                            qtdProgramadas++;
                        }
                    }

                    if((inicio <= now) && (fim >= now)){
                        horarioAgora = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

                        if((diasDisponiveis[now.getDay()]) && (horarioInicio[now.getDay()] <= horarioAgora) && (horarioFim[now.getDay()] >= horarioAgora)){
                            qtdEmExecucao++;
                            tarefasAtivas.innerHTML += `
                                <li class="list-group-item linha">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col me-2" onclick="window.location = window.location.href + 'dados/?${json[i]['idTarefa']}'">
                                            <span class="nomeTarefa"> ${json[i]['nome']} </span> <span style="float: right"> Executando...
                                            <img src="../../../assets/img/live.png" style="height: 24px; margin-top: -2px"></span><br>
                                            <span class="descricaoTarefa"> ${json[i]['descricao']} </span>
                                        </div>
                                    </div>
                                </li>`;
                        }else{
                            tarefasAtivas.innerHTML += `
                            <li class="list-group-item linha">
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2" onclick="window.location = window.location.href + 'dados/?${json[i]['idTarefa']}'">
                                        <span class="nomeTarefa"> ${json[i]['nome']} </span><br>
                                        <span class="descricaoTarefa"> ${json[i]['descricao']} </span>
                                    </div>
                                </div>
                            </li>`;
                        }

                        qtdAtivas++;
                    }else if(fim < now && json[i]['dataFim'] != null){
                        tarefasEncerrada.innerHTML += `
                        <li class="list-group-item linha">
                            <div class="row align-items-center no-gutters">
                                <div class="col me-2" onclick="window.location = window.location.href + 'dados/?${json[i]['idTarefa']}'">
                                    <span class="nomeTarefa"> ${json[i]['nome']} </span><br>
                                    <span class="descricaoTarefa"> ${json[i]['descricao']} </span><br>
                                    <span class="fimAtividade"> Encerrada em: ${("0" + fim.getDate()).slice(-2)}/${("0" + fim.getMonth()).slice(-2)}/${fim.getFullYear()} </span>
                                </div>
                            </div>
                        </li>`;
                        qtdEncerradas++;
                    }else if(inicio > now){
                        tarefasProgramadas.innerHTML += `
                        <li class="list-group-item linha">
                            <div class="row align-items-center no-gutters">
                                <div class="col me-2" onclick="window.location = window.location.href + 'dados/?${json[i]['idTarefa']}'">
                                    <span class="nomeTarefa"> ${json[i]['nome']} </span><br>
                                    <span class="descricaoTarefa"> ${json[i]['descricao']} </span><br>
                                    <span class="fimAtividade"> Iniciará em: ${("0" + inicio.getDate()).slice(-2)}/${("0" + inicio.getMonth()).slice(-2)}/${inicio.getFullYear()} </span>
                                </div>
                            </div>
                        </li>`;

                        qtdProgramadas++;
                    }
                }

                updateCards();
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

getTarefas()