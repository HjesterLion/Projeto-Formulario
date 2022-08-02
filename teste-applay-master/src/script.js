let candidatos = [
  { id: "1", cpf: "426.046.108-76", nome: "Lucas Vieira Dias", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
  { id: "2", cpf: "426.046.108-76", nome: "Nelson Santana", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
];

let arr =[]

const form = document.getElementById('form')


form.addEventListener('submit', (e)=>{
  e.preventDefault()
  salvar()
})
function abrirModal(candidato) {
  if (candidato) {
    document.getElementById("id").value = candidato.id;
    document.getElementById("cpf").value = candidato.cpf;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("celular").value = candidato.celular;
    document.getElementById("email").value = candidato.email;
    if (candidato.sexo == 'Masculino') {
      document.getElementById("sexoMasculino").checked = true;
    } else {
      document.getElementById("sexoFeminino").checked = true;
    }
    document.getElementById("nascimento").value = candidato.nascimento.split('/').reverse().join('-');
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;
  }

  $('#candidatoModal').modal('show');
}



function fecharModal() {
  $('#candidatoModal').modal('hide');
  $('body').removeClass('modal-open');
  $('body').removeAttr('style');
  $('.modal-backdrop').remove();

  document.getElementById("id").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("sexoMasculino").checked = true;
  document.getElementById("nascimento").value = '';
  document.getElementById("skillHtml").checked = false;
  document.getElementById("skillCss").checked = false;
  document.getElementById("skillJs").checked = false;
}

function salvar() {
  let id = document.getElementById("id").value;
  let cpf = document.getElementById("cpf").value;
  let nome = document.getElementById("nome").value;
  let celular = document.getElementById("celular").value;
  let email = document.getElementById("email").value;
  let nascimento = document.getElementById("nascimento").value.split('-').reverse().join('/');
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;

  // Fazer validações aqui
  const mensagemDeErro = document.querySelector('.msg')



  function validarNome(nome) {
    nomeSobrenome = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;

    if (!(nomeSobrenome.test(nome))) {
      mensagemDeErro.textContent = "Nome e sobrenome"
      return false
    } else {
      mensagemDeErro.textContent = ""
      return true
    }
  }


  function validarIdade(nascimento) {
    const hoje = new Date()
    const diaNascimento = new Date(nascimento)


    let idade = hoje.getFullYear() - diaNascimento.getFullYear()
    let mes = hoje.getMonth() - diaNascimento.getMonth()

    if (mes < 0 || (mes === 0 && hoje.getDate() < diaNascimento.getDate())) {
      idade--
    }
    if (idade < 16) {
      mensagemDeErro.textContent = "Idade menor que 16"
      return idade
    } else {
      mensagemDeErro.textContent = ""
      return idade
    }
  }

  function validarCPF(cpf) {
    var Soma = 0
    var Resto

    var strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11) {
      return false

    }

    if ([
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ].indexOf(strCPF) !== -1) {
      mensagemDeErro.textContent = "cpf invalido"
      return false

    }

    for (i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
      Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10))) {
      mensagemDeErro.textContent = "cpf invalido"
      return false
    }

    Soma = 0

    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
      Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11))) {
      mensagemDeErro.textContent = "cpf invalido"
      return false

    }
    mensagemDeErro.textContent = ""
    return true
  }


  function validarCheckBox(html,css,js){
    if(html === true || css === true|| js === true){
      mensagemDeErro.textContent = ""
      return true
    }
    else{
      mensagemDeErro.textContent = "Necessario uma habilidade"
      return false
    }
  }


  if (validarCPF(cpf) && validarNome(nome) && validarIdade(nascimento) >= 16 && sexo !== "" && celular !== "" && validarCheckBox(skillHtml,skillCss,skillJs)) {
    // Fazer validações aqui

    let candidato = {
      id: id != '' ? id : new Date().getTime(),
      cpf: cpf,
      nome: nome,
      celular: celular,
      email: email,
      sexo: sexo ? 'Masculino' : 'Feminino',
      nascimento: nascimento,
      skills: {
        html: skillHtml,
        css: skillCss,
        js: skillJs
      }
    };
  
    
    if(id!=''){
      let checkCandidato = arr.find(e=>e.id == candidato.id);
      checkCandidato.cpf = candidato.cpf;
      checkCandidato.nome = candidato.nome;
      checkCandidato.celular = candidato.celular;
      checkCandidato.email = candidato.email;
      checkCandidato.sexo = candidato.sexo;
      checkCandidato.nascimento = candidato.nascimento;
      checkCandidato.skills = candidato.skills;
      localStorage.candidato = JSON.stringify(arr)
    }else{
      candidatos.push(candidato);
      if(localStorage.candidato  ){
        arr = JSON.parse(localStorage.getItem('candidato'))
      }
      let novoItem = candidato
      arr.push(novoItem)
      localStorage.candidato = JSON.stringify(arr)
    }
    //armazena localStorage

    fecharModal();
    listarCandidatos();

  }
}

function listarCandidatos() {
  let tabela = document.getElementById("table-body");
  tabela.innerHTML = '';
  if(localStorage.candidato){
    arr = JSON.parse(localStorage.getItem('candidato'))
  }

    for(let candidato of arr){

      let linha = document.createElement("tr");
  
      let colunaCpf = document.createElement("td");
      let colunaNome = document.createElement("td");
      let colunaCelular = document.createElement("td");
      let colunaEmail = document.createElement("td");
      let colunaSexo = document.createElement("td");
      let colunaNascimento = document.createElement("td");
      let colunaSkills = document.createElement("td");
      let colunaEditar = document.createElement("td");
      let colunaRemover = document.createElement("td");
  
      // Funcionalidades botão editar
      let botaoEditar = document.createElement("button");
      botaoEditar.classList.add("btn")
      botaoEditar.classList.add("btn-primary")
      botaoEditar.insertAdjacentHTML('afterbegin', '<i class="fa fa-marker"></i>')
      botaoEditar.onclick = function () {
        console.log('editar');
        abrirModal(candidato);
      }
  
      // Funcionalidades botão remover
      let botaoRemover = document.createElement("button");
      botaoRemover.classList.add("btn")
      botaoRemover.classList.add("btn-danger")
      botaoRemover.insertAdjacentHTML('afterbegin', '<i class="fa fa-trash"></i>')
      botaoRemover.onclick = function () {
        console.log('remover')
        console.log(candidato)
        for(let i = 0; i< arr.length;i++){
          if(arr[i].id == candidato.id){
            arr.splice(i)
            localStorage.candidato =JSON.stringify(arr)
          }
        }
        location.reload();
              

      }
  
      let arrSkills = [];
      if (candidato.skills.html) {
        arrSkills.push('HTML');
      }
      if (candidato.skills.css) {
        arrSkills.push('CSS');
      }
      if (candidato.skills.js) {
        arrSkills.push('JS');
      }
      
      colunaCpf.appendChild(document.createTextNode(candidato.cpf));
      colunaNome.appendChild(document.createTextNode(candidato.nome));
      colunaCelular.appendChild(document.createTextNode(candidato.celular));
      colunaEmail.appendChild(document.createTextNode(candidato.email));
      colunaSexo.appendChild(document.createTextNode(candidato.sexo));
      colunaNascimento.appendChild(document.createTextNode(candidato.nascimento));
      colunaSkills.appendChild(document.createTextNode(arrSkills.join(', ')));
      colunaEditar.appendChild(botaoEditar);
      colunaRemover.appendChild(botaoRemover);
  
      linha.appendChild(colunaCpf);
      linha.appendChild(colunaNome);
      linha.appendChild(colunaCelular);
      linha.appendChild(colunaEmail);
      linha.appendChild(colunaSexo);
      linha.appendChild(colunaNascimento);
      linha.appendChild(colunaSkills);
      linha.appendChild(colunaEditar);
      linha.appendChild(colunaRemover);
  
      tabela.appendChild(linha);
      

    }  

}

listarCandidatos();


//Trecho resposável pelo filtro da tabela
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#candidatos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});


(() => {
  'use strict'


  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

$(document).ready(function () {
  $("#cpf").mask("000.000.000-00")
  $("#celular").mask("(00)00000-0000")
})