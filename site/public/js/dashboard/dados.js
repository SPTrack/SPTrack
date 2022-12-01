span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
idTarefa = window.location.search.split('?')[1];
isHide = 0;
statusProc = 0;
statusRAM = 0;
statusDK = 0;
maquinas = []
totalCPUmaquinas = [];
totalRAMmaquinas = [];
totalDKmaquinas = [];
totalCounterMaquinas = [];

function hide(){
    if(isHide){
        lista_maquinas.style.display = 'none';
        btnShow.innerHTML = "Mostrar as Máquinas";
        isHide = 0;
    }else{
        lista_maquinas.style.display = 'grid';
        btnShow.innerHTML = "Esconder as Máquinas";
        isHide = 1;
    }
}

function getDadosTarefas(){
    fetch("/tarefas/getMedidasTarefa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
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
    });
}

function getTarefa(){
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
                console.log(json)
                span_nomeTarefa.innerHTML = json[0]['nome'];
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function deleteTarefa(){
    fetch("/tarefas/deleteTarefa", {
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
                Swal.fire(
                    'Sucesso!',
                    'Tarefa excluída com sucesso!',
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
    });
}

function editarTarefa(){
    window.location = window.location.origin + window.location.pathname + 'editar/?' + idTarefa;
}

function listarMaquinas() {
    fetch("/tarefas/listarMaquinas", {
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
                for (let i = 0; i < json.length; i++) {
                    lista_maquinas.innerHTML+=`
                    <div class="card shadow border-start-info py-2" style="margin: 16px">
                            <div class="card-body"  style="cursor:pointer;">
                                <div class="row align-items-center no-gutters">
                                    <div class="col me-2">
                                        <div class="text-uppercase text-info fw-bold text-xs mb-1"><span style="padding-right: 0px;
                                                    margin-bottom: -19px;color: #000000;">
                                                    <div style="display: grid !important; grid-template-columns: 1fr 3fr !important;">
                                                    <i id="icon1" class="fas fa-laptop fa-3x" style="color: black; margin-left: 6px;"></i>
                                                    <div>
                                                        <a class="a" style="text-decoration:auto;
                                                        color:black" >${json[i]['modelo']}<br>${json[i]['nome']} - ${json[i]['numeroPatrimonio']}
                                                        </a></span>
                                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>`;

                    maquinas.push(json[i]['idEquipamento']);
                    totalCPUmaquinas.push(0);
                    totalRAMmaquinas.push(0);
                    totalDKmaquinas.push(0);
                    totalCounterMaquinas.push(0);
                }

                updateTotal(json.length);
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

function updateRAM(valor){
    usoMedioRAM_span.innerHTML = `${valor.toFixed(2)}%`;
    progRAM.style.width = `${valor}%`;

    if(valor < 20){
        progRAM.style.backgroundColor = '#F00';
        ramIcon.style.color = '#F00';
        statusRAM = 1;
    }else if(valor <= 50){
        progRAM.style.backgroundColor = '#cc8400';
        ramIcon.style.color = '#cc8400';
        statusRAM = 2;
    }else if(valor <= 80){
        progRAM.style.backgroundColor = '#FF0';
        ramIcon.style.color = '#FF0';
        statusRAM = 3;
    }else{
        progRAM.style.backgroundColor = '#080';
        ramIcon.style.color = '#080';
        statusRAM = 4;
    }
}

function updateCPU(valor){
    usoMedioCPU_span.innerHTML = `${valor.toFixed(2)}%`;
    progCPU.style.width = `${valor}%`;

    if(valor < 40){
        progCPU.style.backgroundColor = '#080';
        cpuIcon.style.color = '#080';
        statusProc = 4;
    }else if(valor <= 60){
        progCPU.style.backgroundColor = '#FF0';
        cpuIcon.style.color = '#FF0';
        statusProc = 3;
    }else if(valor <= 80){
        progCPU.style.backgroundColor = '#cc8400';
        cpuIcon.style.color = '#cc8400';
        statusProc = 2;
    }else{
        progCPU.style.backgroundColor = '#F00';
        cpuIcon.style.color = '#F00';
        statusProc = 1;
    }
}

/*
                 MÉTRICAS
    -----------------------------------------
    | INDIVIDUAIS      | GRUPO              |
    -----------------------------------------
    | Muito Bom: 4     | Muito Bom: == 4    |
    | Bom:       3     | Bom:       >= 3    |
    | Regular:   2     | Regular:   >= 2    |
    | Atenção:   1     | Atenção:   >= 1    |
    -----------------------------------------
*/

function updateAlertas(mediaDK){
    if(mediaDK > 256000){
        statusDK = 4;
    }else if(mediaDK >= 64000){
        statusDK = 3;
    }else if(mediaDK >= 32000){
        statusDK = 2;
    }else{
        statusDK = 1;
    }

    statusTotal = statusProc + statusRAM + statusDK;

    if(statusTotal == 4){
        span_status.innerHTML = "Ótimo";
        icoStatus.style.color = "#080";
    }else if(statusTotal >= 3){
        span_status.innerHTML = "Bom";
        icoStatus.style.color = "#FF0";
    }else if(statusTotal >= 2){
        span_status.innerHTML = "Regular";
        icoStatus.style.color = "#cc8400";
    }else{
        span_status.innerHTML = "Atenção";
        icoStatus.style.color = "#F00";
    }
}

function getMediaRAM(){
    fetch("/tarefas/getMediaRAM", {
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
                total = 0;

                for(i = 0; i < json.length; i++){
                    total += ((json[i]['valor'] * 100) / json[i]['capacidade']);
                }

                updateRAM(total / json.length);
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function getMediaCPU(){
    fetch("/tarefas/getMediaCPU", {
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
                total = 0;

                for(i = 0; i < json.length; i++){
                    total += json[i]['valor'];
                }

                updateCPU(total / json.length);
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function updateTotal(valor){
    if(valor != undefined && valor > 0){
        qtd_span.innerHTML = valor;
    }else{
        qtd_span.innerHTML = 0;
    }
}

function updateQtdDias(valor){
    if(valor != 1){
        qtdDias_span.innerHTML = `${valor} dias`;
    }else{
        qtdDias_span.innerHTML = `${valor} dia`;
    }
}

function updateKPIs(){
    maquinasAlerta = 0;
    maquinasOkay = 0;

    for(i = 0; i < maquinas.length; i++){
        valorCPU = totalCPUmaquinas[i] / totalCounterMaquinas[i];
        valorRAM = totalRAMmaquinas[i] / totalCounterMaquinas[i];
        valorDK = totalDKmaquinas[i] / totalCounterMaquinas[i];
        statusCPU = 0;
        statusRAM = 0;
        statusDK = 0;
        

        if(valorCPU < 40){
            statusCPU = 4;
        }else if(valorCPU <= 60){
            statusCPU = 3;
        }else if(valorCPU <= 80){
            statusCPU = 2;
        }else{
            statusCPU = 1;
        }

        if(valorRAM < 20){
            statusRAM = 1;
        }else if(valorRAM <= 50){
            statusRAM = 2;
        }else if(valorRAM <= 80){
            statusRAM = 3;
        }else{
            statusRAM = 4;
        }

        statusTotal = (statusProc + statusRAM) / 2;

        if(statusTotal == 1){
            maquinasAlerta++;
        }else{
            maquinasOkay++;
        }
    }

    valorMaquinasOkay = (maquinasOkay * 100) / maquinas.length;
    progMaquinasOkay.style.width = `${valorMaquinasOkay}%`;
    maquinasOkay_span.innerHTML = `${((maquinasOkay * 100) / maquinas.length).toFixed(0)}%`;

    valorMaquinasAlerta = (maquinasAlerta * 100) / maquinas.length;
    progMaquinasAlerta.style.width = `${valorMaquinasAlerta}%`;
    maquinasAlerta_span.innerHTML = `${((valorMaquinasAlerta * 100) / maquinas.length).toFixed(0)}%`;
}

function plotGrafico(){
    fetch("/tarefas/getDadosMedidas", {
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
                medidasCPU = [];
                medidasRAM = [];
                medidasDK = [];
                kpiDKcounter = 0;
                kpiDKtotal = 0;
                xValues = []
                console.log(maquinas)
                for(let i = 0; i < json.length; i++){
                    // Jogar o valor das máquinas
                    for(j = 0; j < maquinas.length; j++){
                        if(json[i]['fkEquipamento'] == maquinas[j]){
                            if(json[i]['tipo'] == "Processador"){
                                totalCPUmaquinas[j] += json[i]['valor'];
                                totalCounterMaquinas++;
                            }else if(json[i]['tipo'] == "Memória RAM"){
                                totalRAMmaquinas[j] += (Number(json[i]['valor'] * 100) / json[i]['capacidade']);
                            }else if(json[i]['tipo'] == "Disco Rígido"){
                                totalDKmaquinas[j] += (Number(json[i]['valor'] * 100) / json[i]['capacidade']);
                            }
                        }
                    }

                    if(json[i]['tipo'] == "Processador"){
                        medidasCPU.push(json[i]['valor']);
                    }else if(json[i]['tipo'] == "Memória RAM"){
                        medidasRAM.push(((json[i]['valor'] * 100) / json[i]['capacidade']).toFixed(2));
                    }else if(json[i]['tipo'] == "Disco Rígido"){
                        medidasDK.push(((json[i]['valor'] * 100) / json[i]['capacidade']).toFixed(2));
                        kpiDKtotal += json[i]['valor'];
                        kpiDKcounter++;
                    }
                }

                for(i = 0; i < json.length / 3; i++){
                    xValues.push(i+1);
                }

                console.log(medidasDK)

                updateAlertas(kpiDKtotal / kpiDKcounter);
                updateKPIs();
                
                chart1 = new Chart(grafico, {
                    type: "line",
                    data: {
                    labels: xValues,
                    datasets: [{ 
                            data: medidasCPU,
                            backgroundColor: "brown",
                            borderColor: "brown",
                            fill: false,
                            yAxisID: 'A',
                            label: 'CPU (%)'
                        }, { 
                            data: medidasRAM,
                            backgroundColor: "green",
                            borderColor: 'green',
                            fill: false,
                            yAxisID: 'B',
                            label: 'Memória RAM (GB)'
                        }, { 
                            data: medidasDK,
                            backgroundColor: "blue",
                            borderColor: 'blue',
                            fill: false,
                            yAxisID: 'C',
                            label: 'Disco Rígido (GB)'
                        }]
                    },
            
                    options: {
                        legend: {display: true},
                        scales: {
                            yAxes: [{
                                id: 'A',
                                type: 'linear',
                                position: 'left',
                                ticks: {
                                    max: 100,
                                    min: 0
                                }
                            }, {
                                id: 'B',
                                type: 'linear',
                                position: 'right',
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    display: false
                                }
                            },{
                                id: 'C',
                                type: 'linear',
                                position: 'right',
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    display: false
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    maxTicksLimit: 5,
                                    maxRotation: 0,
                                    minRotation: 0
                                    // autoSkip: true
                                }
                            }]
                        },
                        animation: 0,
                        title: {
                            display: false
                        }
                    }
                });
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

function getQuantidadeDias(){
    fetch("/tarefas/getQuantidadeDias", {
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
                updateQtdDias(json.length);
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

getTarefa();
listarMaquinas();
getMediaRAM();
getMediaCPU();
plotGrafico();
getQuantidadeDias();



// setTimeout(function() {
//     setTimeout(function() {

//         setTimeout(function() {

//             setTimeout(function() {

//                 setTimeout(function() {

//                     setTimeout(function() {

//                         getTarefa();
//                     },100)
//                     listarMaquinas();
//                 },100)

//                 getMediaRAM();
//             },100)

//             getMediaCPU();
//         },100)

//         plotGrafico();
//     }, 200)
//     getQuantidadeDias();
// }, 2000);