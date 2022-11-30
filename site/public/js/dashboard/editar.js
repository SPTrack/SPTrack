span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
idTarefa = window.location.search.split('?')[1];
maquinasInstituicao = {};
isReagrupar = false;
grupo = undefined;

function updateGroup(modo){
    if(JSON.parse(modo)){
        salasInputs.style.display = 'block';
        equipamentosPersonalizados.style.display = 'none';
        grupo = 0;
    }else{
        salasInputs.style.display = 'none';
        equipamentosPersonalizados.style.display = 'block';
        grupo = 1;
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

function checkButton(idEquipamento, bt){
    if(idEquipamento.checked){
        idEquipamento.checked = false;
        bt.style.border = "0px";
        bt.style.backgroundColor = "#FFF"
    }else{
        idEquipamento.checked = true;
        bt.style.border = "1px solid black";
        bt.style.backgroundColor = "#B3CF99"
    }
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
                    maquinasInstituicao[i] = [json[i]['idEquipamento'], json[i]['sala']];
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

function verificarDia(dia){
    if(dia.style.display == 'block'){
        return true;
    }else{
        return false;
    }
}

function setDayDate(day){
    if(day == '0'){
        isAtivo = verificarDia(domingoTimeBox);

        if(isAtivo){
            domingoTimeBox.style.display = 'none';
        }else if(!isAtivo){
            domingoTimeBox.style.display = 'block';
        }
    }else if(day == '1'){
        isAtivo = verificarDia(segundaTimeBox);

        if(isAtivo){
            segundaTimeBox.style.display = 'none';
        }else{
            segundaTimeBox.style.display = 'block';
        }
    }else if(day == '2'){
        isAtivo = verificarDia(tercaTimeBox);

        if(isAtivo){
            tercaTimeBox.style.display = 'none';
        }else{
            tercaTimeBox.style.display = 'block';
        }
    }else if(day == '3'){
        isAtivo = verificarDia(quartaTimeBox);

        if(isAtivo){
            quartaTimeBox.style.display = 'none';
        }else{
            quartaTimeBox.style.display = 'block';
        }
    }else if(day == '4'){
        isAtivo = verificarDia(quintaTimeBox);

        if(isAtivo){
            quintaTimeBox.style.display = 'none';
        }else{
            quintaTimeBox.style.display = 'block';
        }
    }else if(day == '5'){
        isAtivo = verificarDia(sextaTimeBox);

        if(isAtivo){
            sextaTimeBox.style.display = 'none';
        }else{
            sextaTimeBox.style.display = 'block';
        }
    }else if(day == '6'){
        isAtivo = verificarDia(sabadoTimeBox);

        if(isAtivo){
            sabadoTimeBox.style.display = 'none';
        }else{
            sabadoTimeBox.style.display = 'block';
        }
    }
}

getDados();
getMaquinas();
listarMaquinas();
getSalas();
getMaquinasInstituicao();

function enviarRequisicao(nomeTarefa, descricao, dtInicio, dtFim, diasOperacoes, inicioOperacoes, fimOperacoes, maquinas, idTarefa){
    isDomingo = "0"; isSegunda = "0"; isTerca = "0"; isQuarta = "0"; isQuinta = "0"; isSexta = "0"; isSabado = "0"; horarioInicioDomingo = "NULL";
    horarioFimDomingo = "NULL"; horarioInicioSegunda = "NULL"; horarioFimSegunda = "NULL"; horarioInicioTerca = "NULL"; horarioFimTerca = "NULL"; horarioInicioQuarta = "NULL";
    horarioFimQuarta = "NULL"; horarioInicioQuinta = "NULL"; horarioFimQuinta = "NULL"; horarioInicioSexta = "NULL"; horarioFimSexta = "NULL"; horarioInicioSabado = "NULL"; horarioFimSabado = "NULL";

    for(i = 0; i < diasOperacoes.length; i++){
        if(diasOperacoes[i] == '0'){
            isDomingo = "1";
            horarioInicioDomingo = `'${inicioOperacoes[i]}'`;
            horarioFimDomingo = `'${fimOperacoes[i]}'`;
        }else if(diasOperacoes[i] == '1'){
            isSegunda = "1";
            horarioInicioSegunda = `'${inicioOperacoes[i]}'`;
            horarioFimSegunda = `'${fimOperacoes[i]}'`;
        }else if(diasOperacoes[i] == '2'){
            isTerca = "1";
            horarioInicioTerca = `'${inicioOperacoes[i]}'`;
            horarioFimTerca = `'${fimOperacoes[i]}'`;
        }else if(diasOperacoes[i] == '3'){
            isQuarta = "1";
            horarioInicioQuarta = `'${inicioOperacoes[i]}'`;
            horarioFimQuarta = `'${fimOperacoes[i]}'`;
        }else if(diasOperacoes[i] == '4'){
            isQuinta = "1";
            horarioInicioQuinta = `'${inicioOperacoes[i]}'`;
            horarioFimQuinta = `'${fimOperacoes[i]}'`;
        }else if(diasOperacoes[i] == '5'){
            isSexta = "1";
            horarioInicioSexta = `'${inicioOperacoes[i]}'`;
            horarioFimSexta = `'${fimOperacoes[i]}'`;
        }else if(diasOperacoes[i] == '6'){
            isSabado = "1";
            horarioInicioSabado = `'${inicioOperacoes[i]}'`;
            horarioFimSabado = `'${fimOperacoes[i]}'`;
        }
    }
    maquinasSent = [];

    if(maquinas == undefined){
        maquinasSent = 'vazio';
    }else{
        maquinasSent = maquinas;
    }

    console.log(maquinasSent)

    fetch("/tarefas/updateTarefa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            nomeTarefaServer: nomeTarefa,
            descricaoServer: descricao,
            dtInicioServer: dtInicio,
            dtFimServer: dtFim,
            isDomingoServer: isDomingo,
            isSegundaServer: isSegunda,
            isTercaServer: isTerca,
            isQuartaServer: isQuarta,
            isQuintaServer: isQuinta,
            isSextaServer: isSexta,
            isSabadoServer: isSabado,
            horarioInicioDomingoServer: horarioInicioDomingo,
            horarioFimDomingoServer: horarioFimDomingo,
            horarioInicioSegundaServer: horarioInicioSegunda,
            horarioFimSegundaServer: horarioFimSegunda,
            horarioInicioTercaServer: horarioInicioTerca,
            horarioFimTercaServer: horarioFimTerca,
            horarioInicioQuartaServer: horarioInicioQuarta,
            horarioFimQuartaServer: horarioFimQuarta,
            horarioInicioQuintaServer: horarioInicioQuinta,
            horarioFimQuintaServer: horarioFimQuinta,
            horarioInicioSextaServer: horarioInicioSexta,
            horarioFimSextaServer: horarioFimSexta,
            horarioInicioSabadoServer: horarioInicioSabado,
            horarioFimSabadoServer: horarioFimSabado,
            idTarefaServer: idTarefa,
            maquinasServer: maquinasSent
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                Swal.fire(
                    'Sucesso!',
                    'Tarefa editada com sucesso!',
                    'success'
                )                
                setInterval(() => {
                    window.location = window.location.origin + "/dashboard/tarefas/";
                }, 2000); 
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


function editarTarefa(){
    dias = Array.from(document.getElementsByName('diasSemana'));
    horariosInicio = Array.from(document.getElementsByName('timeInicio'));
    horariosFim = Array.from(document.getElementsByName('timeFim'));
    salas = Array.from(document.getElementsByName('grupoSalas'));
    personalizados = Array.from(document.getElementsByName('agrupamentoPersonalizado'));
    isDiaSetado = false;
    isHorarioSetado = true;
    maquinas = []; inicioOperacoes = []; fimOperacoes = []; diasOperacoes = []; erros = [];

    for(i = 0; i < dias.length; i++){
        if(dias[i].checked){
            isDiaSetado = true;
            diasOperacoes.push(dias[i].value);

            if(horariosInicio[i].value == '' || horariosFim[i].value == ''){
                isHorarioSetado = false;
            }else{
                if(horariosInicio[i].value < horariosFim[i].value){
                    inicioOperacoes.push(horariosInicio[i].value);
                    fimOperacoes.push(horariosFim[i].value);
                }else{
                    isHorarioSetado = false;
                }
            }
        }
    }
    
    if(nomeTarefa.value == ""){
        erros.push("A tarefa deve ser nomeada!");
    }
    
    if(descricao.value == ""){
        erros.push("A tarefa deverá ter uma descrição!");
    }

    if(dateTimeInicio.value == ''){
        erros.push("A tarefa deve ter um dia para ser iniciada!");
    }

    if(dateTimeFim.value == ''){
        erros.push("A tarefa deve ter um dia para ser finalizada!");
    }

    if(!isDiaSetado){
        erros.push("Selecione pelo menos um dia da semana!");
    }
    
    if(!isHorarioSetado){
        erros.push("Selecione corretamente os horários!");
    }

    // Revalidar teste depois
    // if(isDataInicioNull != undefined && isDataFimNull != undefined){
    //     if(!isDataInicioNull && !isDataFimNull){
    //         if(dateTimeInicio.value >= dateTimeInicio.value){
    //             erros.push("Datas incorretas para início das tarefas!")
    //         }
    //     }
    // }

    if(grupo == undefined){
        maquinas = undefined;
    }

    if(grupo == 0){
        for(i = 0; i < salas.length; i++){
            for(j = 0; j < Object.keys(maquinasInstituicao).length; j++){
                if(Number(salas[i].value) == maquinasInstituicao[j][1] && salas[i].checked){
                    maquinas.push(maquinasInstituicao[j][0]);
                }
            }
        }
    }else if(grupo == 1){
        for(i = 0; i < personalizados.length; i++){
            if(personalizados[i].checked){
                maquinas.push(Number(personalizados[i].value.split("eq")[1]));
            }
        }
    }

    if(erros.length == 0){
        console.log('Nome: ' + nomeTarefa.value);
        console.log('Descrição: ' + descricao.value);

        console.log('Dias: ' + diasOperacoes);
        console.log('Horários Iniciais: ' + inicioOperacoes);
        console.log('Horários Finais: ' + fimOperacoes);
        console.log('Máquinas Participantes: ' + maquinas);
        enviarRequisicao(nomeTarefa.value, descricao.value, dateTimeInicio.value, dateTimeFim.value, diasOperacoes, inicioOperacoes, fimOperacoes, maquinas, idTarefa);
    }else{
        mensagem = '';
        for(i = 0; i < erros.length; i++){
            mensagem += erros[i] + '<br>';
        }
        Swal.fire(
            'Erro!',
            mensagem,
            'error'
        )
    }
}