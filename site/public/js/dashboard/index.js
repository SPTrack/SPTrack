span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

salasObj = {};
totalMaquinasPerSala = [];
totalMaquinasManutencaoPerSala = [];

function setDash(){
    for (var key in salasObj) {
        percent = 100 - (salasObj[key]['qtdManutencao'] * 100) / salasObj[key]['qtdMaquinas'];

        x = document.getElementById(`span_percent${salasObj[key]["id"]}`)
        x.innerHTML = `${percent}%`;

        y = document.getElementById(`progBar${salasObj[key]['id']}`);
        z = document.getElementById(`icon${salasObj[key]['id']}`);
        if(percent == 100){
            y.setAttribute("style", `width: ${percent}%;  background-color: green;`);
            z.setAttribute("class", "fas fa-laptop fa-2x");
            z.setAttribute("style", "color: green");
        }else if(percent >= 95){
            y.setAttribute("style", `width: ${percent}%;  background-color: yellow;`);
            z.setAttribute("class", "fas fa-laptop fa-2x");
            z.setAttribute("style", "color: yellow");
        }else if(percent >= 90){
            y.setAttribute("style", `width: ${percent}%;  background-color: orange;`)
            z.setAttribute("class", "fas fa-laptop fa-2x");
            z.setAttribute("style", "color: orange");
        }else{
            y.setAttribute("style", `width: ${percent}%;  background-color: red;`)
            z.setAttribute("class", "fas fa-laptop fa-2x");
            z.setAttribute("style", "color: red");
        }
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
                    salasObj[i] = {}
                    salasObj[i]['id'] = json[i]["idSala"];
                    salasObj[i]['qtdMaquinas'] = 0;
                    salasObj[i]['qtdManutencao'] = 0;
                    salasObj[i]['vtIdEquipamento'] = [];
                    salasObj[i]['vtIdEquipamentoManutencao'] = [];
                
                    divPai.innerHTML += 
                        `<div class="col-md-6 col-xl-3 mb-4">
                            <div class="card shadow border-start-info py-2">
                                <div class="card-body" onclick="window.open('maquinas/?${json[i]['idSala']}', '_self')" style="cursor:pointer;">
                                    <div class="row align-items-center no-gutters">
                                        <div class="col me-2">
                                            <div class="text-uppercase text-info fw-bold text-xs mb-1"><span style="padding-right: 0px;margin-bottom: -19px;color: #000000;">${json[i]['nome']}</span></div>
                                            <div class="row g-0 align-items-center">
                                                <div class="col-auto">
                                                    <div class="text-dark fw-bold h5 mb-0 me-3"><span id="span_percent${salasObj[i]['id']}">0%</span></div>
                                                </div>
                                                <div class="col">
                                                    <div class="progress progress-sm">
                                                        <div class="progress-bar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 0%;" id="progBar${salasObj[i]['id']}"><span class="visually-hidden">0%</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-auto"><i id="icon${salasObj[i]['id']}" class="fas fa-clipboard-list fa-2x text-gray-300"></i></div>
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
                console.log(json);
                
                for (var key in salasObj) {                
                    for(i = 0; i < json.length; i++){
                        if(salasObj[key]["id"] == json[i]["sala"]){
                            salasObj[key]['qtdMaquinas'] += 1;
                            salasObj[key]['vtIdEquipamento'].push(json[i]['idEquipamento']);
                        }
                    }
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

                for (var key in salasObj) {                
                    for(i = 0; i < json.length; i++){
                        if(salasObj[key]["id"] == json[i]["idSala"]){
                            salasObj[key]['qtdManutencao'] += 1;
                            salasObj[key]['vtIdEquipamentoManutencao'].push(json[i]['idEquipamento']);
                        }
                    }
                }

                setDash();
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
getMaquinasInstituicao();
getMaquinasManutencao();