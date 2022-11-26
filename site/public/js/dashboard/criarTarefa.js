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