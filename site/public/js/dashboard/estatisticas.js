dadosInstituicao = {};
datasetsDadosInstituicao = [];
xValues = []
dadosCPU = []
dadosRAM = []
dadosDK = []
// setInterval(() => {
//      getDadosInstituicao()
// }, 1000);

function plot(){
    grafico = document.getElementById("grafico1")
    
    for(i = 0; i < dadosRAM.length; i++){
        dadosRAM[i] = (dadosRAM[i] * 100) / 8;
    }

    for(i = 0; i < dadosDK.length; i++){
        dadosDK[i] = (dadosDK[i] * 100) / 100000;
    }
    
            chart1 = new Chart(grafico, {
                type: "line",
                data: {
                labels: xValues,
                datasets: [{ 
                        data: dadosCPU,
                        borderColor: "red",
                        fill: false,
                        yAxisID: 'A',
                        label: 'CPU (%)'
                    }, { 
                        data: dadosRAM,
                        borderColor: "green",
                        fill: false,
                        yAxisID: 'B',
                        label: 'Memória RAM (GB)'
                    }, { 
                        data: dadosDK,
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

function getDadosInstituicao(){
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
                for(i = 0; i < json.length; i++){
                    if(json[i]['tipo'] == "Processador"){
                        dadosCPU.push(json[i]['valor']);
                    }else if(json[i]['tipo'] == "Memória RAM"){
                        dadosRAM.push(json[i]['valor']);
                    }else if(json[i]['tipo'] == "Disco Rígido"){
                        dadosDK.push(json[i]['valor']);
                    }
                }
            
            });

            for(i = 0; i < dadosRAM.length; i++){
                dadosRAM[i] = (dadosRAM[i] * 100) / 8;
            }
    
            for(i = 0; i < dadosDK.length; i++){
                dadosDK[i] = (dadosDK[i] * 100) / 100000;
            }

            for(i = 0; i < 100; i++){
                xValues.push(i)
            }

            // document.getElementById('grafico1').remove();
            // novoGraficoCPU = document.createElement('canvas');
            // novoGraficoCPU.setAttribute('id', 'grafico1');
            // novoGraficoCPU.setAttribute('style', 'width:100%;max-width:900px');
            // graficoBarraCPU.appendChild(novoGraficoCPU);

            // console.log(dadosCPU)
            // console.log(dadosRAM)
            // console.log(dadosDK)

            
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

getDadosInstituicao();
setTimeout(plot, 2000)