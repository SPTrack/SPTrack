span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

idSala = window.location.search.split('?')[1];
xValues = [];

idTotal = [];
modelosTotal = [];
npTotal = [];

idManutencao = [];

dadosCPU = [];
dadosRAM = [];
dadosDK = [];

function setNomeSala(){
    fetch("/salas/getNomeSala", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            idSalaServer: idSala
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                h3_titulo.innerHTML = json[0]['nome'];
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

function getMaquinasManutencao(){
    fetch("/medidas/getMaquinasManutencao", {
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
                console.log(json)

                for(i = 0; i < json.length; i++){
                    idManutencao.push(json[i]['idEquipamento']);
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


function getMaquinasSala(){
    fetch("/salas/getMaquinasSala", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            idSalaServer: idSala
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                for(i = 0; i < json.length; i++){
                    idTotal.push(json[i]['idEquipamento']);
                    modelosTotal.push(json[i]['modelo']);
                    npTotal.push(json[i]['numeroPatrimonio']);

                    x = document.createElement("option");
                    x.setAttribute("value", `${json[i]['idEquipamento']}`);

                    if(idManutencao.indexOf(json[i]['idEquipamento']) === -1){
                        x.innerHTML = `${json[i]['numeroPatrimonio']} - ${json[i]['modelo']}`;
                    }else{
                        x.innerHTML = `${json[i]['numeroPatrimonio']} - ${json[i]['modelo']} (Em manutenção)`;
                    }

                    selectMaquina.appendChild(x);
                }

                setDadosG1(json[0]['idEquipamento']);
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

function setDadosG1(idEquipamento){
    fetch("/medidas/getDadosEquipamentoEspecifico", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEquipamentoServer: idEquipamento,
        })
    }).then(function (resposta) {     
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json)
                dadosCPU = [];
                dadosRAM = [];
                dadosDK = [];

                for(i = 0; i < json.length; i++){
                    if(json[i]['tipo'] == 'Processador'){
                        dadosCPU.push(((json[i]['valor'] * 100) / json[i]['capacidade']).toFixed(2));
                    }else if(json[i]['tipo'] == 'Memória RAM'){
                        dadosRAM.push(((json[i]['valor'] * 100) / json[i]['capacidade']).toFixed(2));
                    }else if(json[i]['tipo'] == 'Disco Rígido'){
                        dadosDK.push(((json[i]['valor']) * 100) / (json[i]['capacidade']).toFixed(2));
                    }
                }

                plotGrafico();
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

function plotGrafico(){
    grafico = document.getElementById("grafico1")
    
    for(i = 0; i < dadosCPU.length; i++){
        xValues[i] = i+1;
    }

    chart1 = new Chart(grafico, {
        type: "line",
        data: {
        labels: xValues,
        datasets: [{ 
                data: dadosCPU,
                backgroundColor: "brown",
                borderColor: "brown",
                fill: false,
                yAxisID: 'A',
                label: 'CPU (%)'
            }, { 
                data: dadosRAM,
                backgroundColor: "green",
                borderColor: 'green',
                fill: false,
                yAxisID: 'B',
                label: 'Memória RAM (GB)'
            }, { 
                data: dadosDK,
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
}

setNomeSala();
getMaquinasManutencao();
getMaquinasSala();