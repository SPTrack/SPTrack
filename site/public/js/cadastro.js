 function buscarDadosEmpresa() {
    var cnpj = document.getElementById('cnpj')
    cnpj = (cnpj.value).replaceAll("/","").replaceAll(".","").replaceAll("-","")
    if(cnpj.length == 14){
        $.ajax({
            'url': 'https://www.receitaws.com.br/v1/cnpj/'+cnpj,
            'type': 'GET',
            'dataType': 'jsonp',
            'success': function (res) {
                console.log(res)
                if(res.status == "ERROR"){
                    alert(res.message)
                    document.getElementById('cnpj').value = "";
                    document.getElementById('cnpj').focus()
                }else{
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
    }else{
        alert("CNPJ inválido")
    }
    
 }
 function cadastrar(){
     var nome = document.getElementById('nome').value
     var email = document.getElementById('email').value
     var senha = document.getElementById('senha').value
     var tipoUsuario = document.getElementById('tipoUsuario').value
     if(nome.length <= 2){
         alert("insira um nome válido")
     }else if(!email.includes("@")){
         alert('insira um email válido')
     }else if(senha.length<6){
         alert('Insira uma senha válida')
     }else if(tipoUsuario == '0'){
         alert("Selecione um tipo de usuário!")
     }else{
         alert("Ta tudo certo!")
     }
 }