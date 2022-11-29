span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
grupo = undefined; isSemDataFim = undefined; isImediatamente = undefined;
maquinasInstituicao = {};
isDataInicioNull = undefined; isDataFimNull = undefined;

function updateDate(mode, isImediato){
    if(mode == 0){
        if(!(JSON.parse(isImediato))){
            dataInicioInput.style.display = 'block';
            isImediatamente = false;
            isDataInicioNull = false;
        }else{
            dataInicioInput.style.display = 'none';
            isImediatamente = true;
            isDataInicioNull = true;
        }
    }else if(mode == 1){
        if(!(JSON.parse(isImediato))){
            dataFimInput.style.display = 'block';
            isSemDataFim = false;
            isDataFimNull = false;
        }else{
            dataFimInput.style.display = 'none';
            isSemDataFim = true;
            isDataFimNull = true;
        }
    }
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

function updateGroup(isSala){
    if(JSON.parse(isSala)){
        grupo = 0;
        salasSelecionadasField.style.display = 'block';
        equipamentosSelecionados.style.display = 'none';
    }else{
        grupo = 1;
        equipamentosSelecionados.style.display = 'block';
        salasSelecionadasField.style.display = 'none';
    }
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
                    salasSelecionadas.innerHTML += 
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

function setTarefasXequipamentos(idTarefa, maquinas){
    fetch("/tarefas/setTarefaXequipamentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            idTarefaServer: idTarefa,
            maquinasServer: maquinas,
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

function getLastTarefa(maquinas){
    fetch("/tarefas/getLastTarefa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            maquinasServer: maquinas
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                setTarefasXequipamentos(json[0]['idTarefa'], maquinas);
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

function enviarRequisicao(nomeTarefa, descricao, dtInicio, dtFim, diasOperacoes, inicioOperacoes, fimOperacoes, maquinas){
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

    fetch("/tarefas/insertTarefa", {
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
            horarioFimSabadoServer: horarioFimSabado
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                getLastTarefa(maquinas);
                Swal.fire(
                    'Sucesso!',
                    'Tarefa criada com sucesso!',
                    'success'
                )                
                setInterval(() => {
                    window.location = window.location.href = "../";
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

function criarTarefa(){
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
    
    // Revalidar teste depois
    // if(isDataInicioNull != undefined && isDataFimNull != undefined){
    //     if(!isDataInicioNull && !isDataFimNull){
    //         if(dateTimeInicio.value >= dateTimeInicio.value){
    //             erros.push("Datas incorretas para início das tarefas!")
    //         }
    //     }
    // }

    if(isImediatamente == undefined){
        erros.push("Escolha uma opção para o início da tarefa!");
    }

    if(isSemDataFim == undefined){
        erros.push("Escolha uma opção para o fim da tarefa!");
    }

    if(!isDiaSetado){
        erros.push("Escolha um ou mais dias para a realização das tarefas.");
    }

    if(!isHorarioSetado){
        erros.push("Atribua corretamente os horários!");
    }

    if(!(grupo == 0 || grupo == 1)){
        erros.push("Escolha o grupo de máquinas!");
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
        dtInicio = '';
        dtFim = '';

        console.log('Nome: ' + nomeTarefa.value);
        console.log('Descrição: ' + descricao.value);
        
        if(isDataInicioNull){
            dtInicio = 'NOW()';
            console.log('Data Início: NOW()');
        }else{
            dtInicio = dateTimeInicio.value;
            console.log('Data Início: ' + dateTimeInicio.value);
        }

        if(isDataFimNull){
            dtFim = 'NULL';
            console.log("Data Fim: NULL");
        }else{
            dtFim = dateTimeFim.value;
            console.log("Data Fim: " + dateTimeFim.value);
        }

        console.log('Dias: ' + diasOperacoes);
        console.log('Horários Iniciais: ' + inicioOperacoes);
        console.log('Horários Finais: ' + fimOperacoes);
        console.log('Máquinas Participantes: ' + maquinas);
        enviarRequisicao(nomeTarefa.value, descricao.value, dtInicio, dtFim, diasOperacoes, inicioOperacoes, fimOperacoes, maquinas);
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

getSalas();
listarMaquinas();
getMaquinasInstituicao();