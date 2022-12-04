span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

fetch("/processo/getProcessos", {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify({

  })
}).then(function (resposta) {
  if (resposta.ok) {
      resposta.json().then(json => {
        for(i=0;i<json.length;i++){
          if (json[i]['tipoProcesso']=='whitelist') {
            printarProc1.innerHTML+=`<tr id="list${i}" onclick="change('${json[i]['idLeitura']}','${json[i]['so']}','${json[i]['arquivos']}','${json[i]['tipoProcesso']}')" style="cursor: pointer;"><td>${json[i]['arquivos']}</td> <td>${json[i]['so']}</td> </tr>`;            
          } else {
            printarProc2.innerHTML+=`<tr id="list${i}" onclick="change('${json[i]['idLeitura']}','${json[i]['so']}','${json[i]['arquivos']}','${json[i]['tipoProcesso']}')" style="cursor: pointer;"><td>${json[i]['arquivos']}</td><td>${json[i]['so']}</td></tr>`;    
          }
          console.log(json[i]['idLeitura'])

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

function change(idT,so,arquivo,tipoP){
  cad1.style.display="none";
  cad2.style.display="none";
  cad3.style.display="none";
  cad5.style.display="block";
  listar.style.display="none";
  trocaT.style.display="block";
  nameT.value=arquivo;
  soT.value=so;
  tipoT.value=tipoP
  idP.value=idT


}
function atualizaLista(){
  console.log(idP.value)
  console.log(tipoT.value)
  fetch("/processo/setCategoria", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      
      idServer : idP.value,
      tipoServer: tipoT.value
    })
}).then(function (resposta) {
    if (resposta.ok) { 
      location.href = "index.html";
    } else {
        console.log("Houve um erro ao tentar se comunicar!");
    
        resposta.text().then(texto => {
            console.log(texto)
        });
          Swal.fire(
             'Erro!',
             'Dados não alterados!',
             'error'
         ) 
    }
}).catch(function (erro) {
    console.log(erro);
})
}

function cadastro1(){
  cad2.style.display="block";
  cad1.style.display="none";
  cad3.style.display="none";
  listar.style.display="none";
  novo.style.display="block";
  titulo.innerHTML="Cadastro de novo processo";
  

}

function morto(){
  mortos.style.display="block"
  listar.style.display="none";
  cad3.style.display="none";
  cad2.style.display="none";
  cad1.style.display="none";
  cad4.style.display="block";
  titulo.innerHTML="Processos Mortos";
  
  
  fetch("/processo/getProcessosMortos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({

    })
}).then(function (resposta) {
    if (resposta.ok) {
        resposta.json().then(json => {
          for(i=0;i<json.length;i++){
            printarMortos.innerHTML+=`<tr><td>${json[i]['nome']}</td><td>${json[i]['horas'].slice(0,19).replace("T"," ")}</td></tr>`;

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
function voltar(){
  location.href = "index.html";
}

function cadastro2(){
   sisop = sisop.value;
   nameP = nameP.value;
   tipo = tipo.value;

    fetch("/processo/cadastrarProcesso", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

          sisopServer : sisop,
          namePServer: nameP,
          tipoServer: tipo
        })
    }).then(function (resposta) {
        if (resposta.ok) { 
          location.href = "index.html";
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
              Swal.fire(
                 'Erro!',
                 'Dados não cadastrados!',
                 'error'
             ) 
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}
