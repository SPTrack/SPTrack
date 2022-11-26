span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

function updateDate(mode, isImediato){
    if(mode == 0){
        if(!(JSON.parse(isImediato))){
            dataInicioInput.style.display = 'block';
        }else{
            dataInicioInput.style.display = 'none';
        }
    }else if(mode == 1){
        if(!(JSON.parse(isImediato))){
            dataFimInput.style.display = 'block';
        }else{
            dataFimInput.style.display = 'none';
        }
    }
}

function verificarDia(dia){
    console.log(dia.style.display)
    if(dia.style.display == 'block'){
        return true;
    }else{
        return false;
    }
}

function setDayDate(day){
    if(day == '1'){
        isAtivo = verificarDia(domingoTimeBox);
        console.log(isAtivo)

        if(isAtivo){
            domingoTimeBox.style.display = 'none';
        }else if(!isAtivo){
            console.log(isAtivo)
            domingoTimeBox.style.display = 'block';
        }
    }else if(day == '2'){
        isAtivo = verificarDia(segundaTimeBox);

        if(isAtivo){
            segundaTimeBox.style.display = 'none';
        }else{
            segundaTimeBox.style.display = 'block';
        }
    }else if(day == '3'){
        isAtivo = verificarDia(tercaTimeBox);

        if(isAtivo){
            tercaTimeBox.style.display = 'none';
        }else{
            tercaTimeBox.style.display = 'block';
        }
    }else if(day == '4'){
        isAtivo = verificarDia(quartaTimeBox);

        if(isAtivo){
            quartaTimeBox.style.display = 'none';
        }else{
            quartaTimeBox.style.display = 'block';
        }
    }else if(day == '5'){
        isAtivo = verificarDia(quintaTimeBox);

        if(isAtivo){
            quintaTimeBox.style.display = 'none';
        }else{
            quintaTimeBox.style.display = 'block';
        }
    }else if(day == '6'){
        isAtivo = verificarDia(sextaTimeBox);

        if(isAtivo){
            sextaTimeBox.style.display = 'none';
        }else{
            sextaTimeBox.style.display = 'block';
        }
    }else if(day == '7'){
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
        salasSelecionadasField.style.display = 'block';
        equipamentosSelecionados.style.display = 'none';
    }else{
        equipamentosSelecionados.style.display = 'block';
        salasSelecionadasField.style.display = 'none';
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
                    `<input type='checkbox' value='${json[i]['idSala']}'>  ${json[i]['nome']}</input><br>`;
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
                console.log(json);
                
                for (let i = 0; i < json.length; i++) {
                    agrupamentoPersonalizado.innerHTML+=`
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

getSalas();
listarMaquinas();