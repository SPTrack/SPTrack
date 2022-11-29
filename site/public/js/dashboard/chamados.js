qtdTotal = 0
qtdConcluido = 0


  const ctx = document.getElementById('myChart');

 var grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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

                span_qtdConcluidos.innerHTML = qtdConcluido + " Chamados";
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