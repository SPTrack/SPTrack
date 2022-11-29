span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;
idTarefa = window.location.search.split('?')[1];
isHide = 1;

function hide(){
    if(isHide){
        // Código para aparecer as máquinas
        btnShow.innerHTML = "Esconder as Máquinas";
        isHide = 0;
    }else{
        // Código para esconder as máquinas
        btnShow.innerHTML = "Mostrar as Máquinas";
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

getTarefa();