qtdTotal = 0
qtdConcluido = 0
qtdAbertos = 0
quantidadeChamadosTriagem = 0
quantidadeChamadosAtendimento = 0
quantidadeChamadosEscalar = 0
quantidadeChamadosArquivados = 0

  const ctx = document.getElementById('myChart');

  var grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Triagem', 'Em Atendimento', 'Escalar o Problema', 'Concluídos', 'Arquivados'],
      datasets: [{
        label: 'Quantidade de Chamados',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  

 

function get(){
    fetch("/medidas/pegarInfoChamado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                qtdTotal = json[0]['quantidadeChamados']  
                qtdConcluido = json[0]['quantidadeChamadosConcluidos']
                qtdAbertos = json[0]['quantidadeChamadosAbertos']  
                quantidadeChamadosTriagem = json[0]['quantidadeChamadosTriagem'] 
                quantidadeChamadosAtendimento = json[0]['quantidadeChamadosAtendimento'] 
                quantidadeChamadosEscalar = json[0]['quantidadeChamadosEscalar'] 
                quantidadeChamadosArquivados = json[0]['quantidadeChamadosArquivados']  

                grafico.data.datasets[0].data = [quantidadeChamadosTriagem, quantidadeChamadosAtendimento, quantidadeChamadosEscalar, qtdConcluido, quantidadeChamadosArquivados]
                grafico.update()

                span_qtdConcluidos.innerHTML = qtdConcluido + " Chamados";
                span_qtdAbertos.innerHTML = qtdAbertos + " Chamados";
                span_qtdTotal.innerHTML = qtdTotal + " Chamados";

                
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

get();

var i = 1;

function myLoop() {
  setTimeout(function() {
    get();
    i++;
    if (i < 99999999999) {
      myLoop(); 
    }
  }, 3000)
}

myLoop();   

function teste(){
    document.getElementById("wordcloud").innerHTML = "<img src='../../assets/img/wordclouds/wordcloudChamados.png' alt='wordcloudChamados'>"
}