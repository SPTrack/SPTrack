dadosInstituicao = {};
datasetsDadosInstituicao = [];

// KPIs e Gráfico 2
mediaCPU = 0;
mediaRAM = 0;
qtd = 0;
qtdMaquinasManutencao = 0;

// Gráfico 1
valoresDisp = []
datasDisp = []
corDisp = "";

// Gráfico 3
mb = 0;
bom = 0;
reg = 0;
irreg = 0;

dadosCPU4 = [];
dadosRAM4 = [];
dadosDK4 = [];

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

function plotKPIs(){
    usoMedioCPU_span.innerHTML = mediaCPU.toFixed(2) + '%';
    color = "";
    if(mediaCPU < 40){
        color = "#008000";
    }else if(mediaCPU <= 60){
        color = "#ff0";
    }else if(mediaCPU <= 80){
        color = "#ff6600";
    }else{
        color = "#f00";
    }
    progCPU.setAttribute("style", `width: ${mediaCPU}%; background-color: ${color} !important`);
    cpuIcon.setAttribute("style", `color: ${color} !important`);

    usoMedioRAM_span.innerHTML = mediaRAM.toFixed(2) + '%';
    if(mediaRAM < 20){
        color = "#008000";
    }else if(mediaRAM <= 50){
        color = "#ff0";
    }else if(mediaRAM <= 80){
        color = "#ff6600";
    }else{
        color = "#f00";
    }
    progRAM.setAttribute("style", `width: ${mediaRAM}%; background-color: ${color} !important;`);
    ramIcon.setAttribute("style", `color: ${color} !important`);

    qtd_span.innerHTML = qtd;

    disp = (100 - ((qtdMaquinasManutencao * 100) / qtd)).toFixed(0)
    span_disponibilidade.innerHTML =   `${disp}%`;
    if(disp < 90){
        span_disponibilidade.style.color = 'red';
        span_subtotal.style.color = 'red';
        corDisp = 'red';
    }else if(disp < 95){
        span_disponibilidade.style.color = 'orange';
        span_subtotal.style.color = 'orange';
        corDisp = 'orange';
    }else if(disp < 100){
        span_disponibilidade.style.color = 'yellow';
        span_subtotal.style.color = 'yellow';
        corDisp = 'yellow';
    }else if(disp == 100){
        span_disponibilidade.style.color = 'green';
        span_subtotal.style.color = 'green';
        corDisp = 'green';
    }

    span_subtotal.innerHTML = `(${qtdMaquinasManutencao}/${qtd})`;
}

function plot1(){
    grafico = document.getElementById("grafico1")
    grafico.remove();

    x = document.createElement("canvas");
    x.setAttribute("style", "width:100%;max-width:900px;");
    x.setAttribute("id", "grafico1");
    grafico1pai.appendChild(x)
    grafico = document.getElementById("grafico1")

    chart1 = new Chart(grafico, {
        type: "line",
        data: {
        labels: datasDisp,
        datasets: [{ 
                data: valoresDisp,
                borderColor: corDisp,
                backgroundColor: corDisp,
                fill: false,
                yAxisID: 'A',
                label: 'Disponibilidade'
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
                }]
            },
            animation: 0,
            title: {
                display: false
            }
        }
    });
}

function plot2(){
    grafico2 = document.getElementById("grafico2")

    percent = (qtdMaquinasManutencao * 100 / qtd).toFixed(0);
    chart2 = new Chart(grafico2, {
        type: "doughnut",
        data: {
            labels: [
                'Disponível',
                'Em manutenção'
            ],
            datasets: [{ 
                data: [qtd-qtdMaquinasManutencao, qtdMaquinasManutencao],
                label: 'Disponibilidade',
                backgroundColor: [
                    'rgb(3, 172, 19)',
                    'rgb(210, 20, 04)'
                ],
                hoverOffset: 4
            }],
            animation: 0,
            title: {
                display: false
            }
        }
    });
}

function plot3(){
    grafico3 = document.getElementById("grafico3")

    chart3 = new Chart(grafico3, {
        type: "bar",
        data: {
            labels: [
                'Muito Bom',
                'Bom',
                'Regular',
                'Atenção'
            ],
            datasets: [{
                data: [3, 4, 2, 0],
                backgroundColor: [
                  'rgba(3, 172, 19, 0.3)',
                  'rgba(255, 205, 86, 0.3)',
                  'rgba(255, 159, 64, 0.3)',
                  'rgba(255, 99, 132, 0.3)'
                ],
                borderColor: [
                    'rgb(3, 172, 19)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 99, 132)'
                ],
                borderWidth: 1
            }],
            options: {
                plugins:{
                    legend: {
                        display: false
                    }
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 20
                        }
                    }]
                }
            }
        }
    });
}

function plot4(){
    grafico = document.getElementById("grafico4")
    grafico.remove();

    x = document.createElement("canvas");
    x.setAttribute("style", "width:100%;max-width:900px;");
    x.setAttribute("id", "grafico4");
    grafico4pai.appendChild(x)
    grafico = document.getElementById("grafico4")

    xValues = [];
    for(i = 0; i < dadosDK4.length; i++){
        xValues[i] = i+1;
    }

    chart1 = new Chart(grafico, {
        type: "line",
        data: {
        labels: xValues,
        datasets: [{ 
                data: dadosCPU4,
                borderColor: "red",
                fill: false,
                yAxisID: 'A',
                label: 'CPU (%)'
            }, { 
                data: dadosRAM4,
                borderColor: "green",
                fill: false,
                yAxisID: 'B',
                label: 'Memória RAM (GB)'
            }, { 
                data: dadosDK4,
                borderColor: "blue",
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
                // text: "Desempenho da máquina (Últimos 100 registros)"
            }
        }
    });    
}

// Auxílio - KPIs
function getMaquinasMonitoradas(){
    fetch("/medidas/getMaquinasMonitoradas", {
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
                qtd = json[0].qtd;
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

// Auxílio - KPIs
function getMediasInstituicao(){
    fetch("/medidas/getMediasInstituicao", {
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
                mediaCPU = json[0].mediaCPU.toFixed(2);
                mediaRAM = ((json[0].mediaRAM * 100) / 8).toFixed(2);
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

// Auxílio - Gráfico 1
function getHistoricoDisponibilidade(dias = 7){
    fetch("/medidas/getHistoricoDisponibilidade", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            diasServer: dias
        })
    }).then(function (resposta) {     
        if (resposta.ok) {
            resposta.json().then(json => {
                valoresDisp = [];
                datasDisp = [];

                for(i = json.length-1; i >= 0; i--){
                    valoresDisp.push(json[i]['valor']);
                    datasDisp.push(json[i]['dataRegistro']);
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

// Auxílio - Gráfico 1 (onChange)
function setDadosG1(dias){
    fetch("/medidas/getHistoricoDisponibilidade", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            diasServer: dias
        })
    }).then(function (resposta) {     
        if (resposta.ok) {
            resposta.json().then(json => {
                valoresDisp = [];
                datasDisp = [];

                for(i = json.length-1; i >= 0; i--){
                    valoresDisp.push(json[i]['valor']);
                    datasDisp.push(json[i]['dataRegistro']);
                }
                
                plot4();
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

// Auxílio - KPIs e Gráfico 2
function getDisponibilidade(){
    fetch("/medidas/getDisponibilidade", {
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
                qtdMaquinasManutencao = json[0].qtdManutencao;
            });

        } else {
            console.log("Houve um erro ao tentar se comunicar!");
            MediasEquipamentos
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })   
}

// Auxílio - KPIs
function getMedidasInstituicao(){
    fetch("/medidas/getMedidasInstituicao", {
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
                cpu = 0;
                cpuQtd = 0;
                ram = 0;
                ramQtd = 0;

                for(i = 0; i < json.length; i++){
                    if(json[i]["tipo"] == "Processador"){
                        cpu += json[i]["valor"];
                        cpuQtd++;
                    }else if(json[i]["tipo"] == "Memória RAM"){
                        ram += json[i]["valor"];
                        ramQtd++;
                    }
                }

                mediaCPU = cpu / cpuQtd;
                mediaRAM = (ram / ramQtd) * 100 / 8;
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

// Auxílio - Gráfico 4
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
                idEquipamento1 = json[0].idEquipamento;

                for(i = 0; i < json.length; i++){
                    x = document.createElement("option");
                    x.setAttribute("value", json[i].idEquipamento);
                    x.innerHTML = `${json[i].numeroPatrimonio} (${json[i].sala}) - ${json[i].modelo}`;
                    selectMaquinas.appendChild(x);
                }
                
                //setDadosG1(idEquipamento1);
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

span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
getHistoricoDisponibilidade();
getMedidasInstituicao();
getMaquinasMonitoradas();
getDisponibilidade();
getMaquinasInstituicao();

setTimeout(function() {

    setTimeout(function() {
        
        setTimeout(function() {
            
            setTimeout(function() {
                Chart.defaults.global.legend.display = false;
                plot3();
            },100)
            
            plot2();
        },100)

        plot1();
    },100)

    plotKPIs();
}, 2000);