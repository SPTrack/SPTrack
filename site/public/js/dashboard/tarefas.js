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

                    diasDisponiveis = [json[i][5], json[i][6], json[i][7], json[i][8], json[i][9], json[i][10], json[i][11]]
                    horarioInicio = [json[i][12], json[i][14], json[i][16], json[i][18], json[i][20], json[i][22], json[i][24]]
                    horarioFim = [json[i][13], json[i][15], json[i][17], json[i][19], json[i][21], json[i][23], json[i][25]]                    

                    if((inicio <= now) && (fim >= now)){
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

                        horarioAgora = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
                        if(diasDisponiveis[now.getDay()] && horarioInicio[now.getDay()] <=  horarioAgora && horarioFim[now.getDay()] >= horarioAgora){
                            qtdEmExecucao++;
                        }
                    }else if(fim < now){
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