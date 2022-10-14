function buscarDadosEmpresa() {
    var cnpj = document.getElementById('cnpj')
    cnpj = (cnpj.value).replaceAll("/", "").replaceAll(".", "").replaceAll("-", "")
    if (cnpj.length == 14) {
        $.ajax({
            'url': 'https://www.receitaws.com.br/v1/cnpj/' + cnpj,
            'type': 'GET',
            'dataType': 'jsonp',
            'success': function (res) {
                console.log(res)
                if (res.status == "ERROR") {
                    alert(res.message)
                    document.getElementById('cnpj').value = "";
                    document.getElementById('cnpj').focus()
                } else {
                    document.getElementById('razaoSocial').value = res.nome;
                    document.getElementById('nomeFantasia').value = res.fantasia
                    document.getElementById('cep').value = res.cep
                    document.getElementById('logradouro').value = res.logradouro
                    document.getElementById('nmr').value = res.numero
                    document.getElementById('complemento').value = res.complemento
                    document.getElementById('bairro').value = res.bairro
                    document.getElementById('cidade').value = res.municipio
                    document.getElementById('uf').value = res.uf
                }
            },


        })
    } else {
        alert("CNPJ inválido")
    }

}
function cadastrar() {
    var cnpj = document.getElementById("cnpj").value
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var senha = document.getElementById('senha').value
    var razaoSocial = document.getElementById('razaoSocial').value
    var nomeFantasia = document.getElementById('nomeFantasia').value
    var cep = document.getElementById('cep').value
    var logradouro = document.getElementById('logradouro').value
    var numero = document.getElementById('nmr').value
    var complemento = document.getElementById('complemento').value
    var bairro = document.getElementById('bairro').value
    var cidade = document.getElementById('cidade').value
    var uf = document.getElementById('uf').value
    if(cnpj.length<13){
        alert("Insira um CNPJ válido")
    }else if (nome.length <= 2) {
        alert("insira um nome válido")
    } else if (!email.includes("@")) {
        alert('insira um email válido')
    } else if (senha.length < 6) {
        alert('Insira uma senha válida')
    } else if (razaoSocial.length < 3) {
        alert("Insira a razão social")
    } else if (nomeFantasia.length < 3) {
        alert("Insira o nome fantasia")
    } else if (cep.length < 8) {
        alert("Insira em CEP")
    } else if (logradouro.length < 6) {
        alert("Insira o Logradouro")
    } else if (numero.length == 0) {
        alert("Insira o número")
    } else if (bairro.length < 2) {
        alert("Insira o bairro")
    } else if (cidade.length < 2) {
        alert("Insira a cidade")
    } else if (uf.length < 1) {
        alert("Insira o UF")
    } else {
        fetch("/instituicoes/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cnpjServer: cnpj,
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                razaoSocialServer: razaoSocial,
                nomeFantasiaServer: nomeFantasia,
                cepServer: cep,
                logradouroServer: logradouro,
                numeroServer: numero,
                complementoServer: complemento,
                bairroServer: bairro,
                cidadeServer: cidade,
                ufServer: uf

            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")
    
            if (resposta.ok) {
                
                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                   
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cadastro realizado com sucesso',
            showConfirmButton: false,
            timer: 1500
          })        
                    
                });
                setInterval(() => {
                    window.location.reload()
                  }, 3000);
            } else {
    
                throw Swal.fire({
                    position: 'center',
                    background: '#fff',
                    color:'#131313',
                    icon: 'error',
                    title: 'Opa,<br> houve um erro ao realizar cadastro.',
                    showConfirmButton: false,
                    timer: 1500
                  })
    
                resposta.text().then(texto => {
                    console.error(texto);
                    console.log(texto);
                });
            }
    
        }).catch(function (erro) {
            console.log(erro);
        })
    }
}