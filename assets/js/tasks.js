const tarefas = document.querySelector('#tarefas')
const btnTarefa = document.querySelector('#btn-tarefa')
const inputTarefa = document.querySelector('#input-Tarefa')
const errorAcess = document.getElementsByClassName("errorAcess")
const btnSubmit = document.querySelector('#btnSubmit')
const btnSubmitLogin = document.querySelector('#btnlogin')

function Logar() {
    let nome = document.getElementById("username").value;
    let senha = document.getElementById("password").value;
    const chaves = Object.keys(localStorage);
    for (const chave of chaves) {
        const valorChaves = JSON.parse(localStorage.getItem(chave))
        if (valorChaves.Nome === nome && valorChaves.Senha === senha) {
            location.href = "tasks.html"
        }
    }
}
function ForgotPass() {
    let email = document.getElementById("email").value;
    const chaves = Object.keys(localStorage);

    for (const chave of chaves) {
        if (chave === email) {
            localStorage.setItem("ChangeEmail", JSON.stringify(email))
            location.href = "createPass.html"
        }
    }
}


function CreatePass() {
    const senhaNova = document.getElementById("passwordNew").value
    const senhaConfirmada = document.getElementById("passwordConfirm").value
    const email = JSON.parse(localStorage.getItem('ChangeEmail'))
    const chaves = Object.keys(localStorage);
    if (senhaNova === senhaConfirmada) {
        for (const chave of chaves) {
            if (chave === email) {
                const valorChaves = JSON.parse(localStorage.getItem(chave))
                let usuario = {
                    Nome: valorChaves.Nome,
                    Senha: senhaConfirmada,
                    Email: valorChaves.Email
                }
                localStorage.setItem(chave, JSON.stringify(usuario))
                localStorage.removeItem('ChangeEmail')
                location.href = "index.html"
            }
        }
    } else {
        alert("Insira senha iguias!")
    }

}
function FirstAcess() {
    let nome = document.getElementById("username").value;
    let senha = document.getElementById("password").value;
    let senhaSegund = document.getElementById("passwordSecond").value;
    let email = document.getElementById("email").value;

    let usuario = {
        Nome: nome,
        Senha: senha,
        Email: email
    }
    if (nome === '' || senha === '' || senhaSegund === '' || email === '') {
        alert("Insira todas as informações para realizar cadastro!")
    } else if (senha === senhaSegund) {
        salvarUsers(usuario)
        location.href = 'tasks.html'
    } else {
        alert("Insira senhas parecidas!")
    }

}

function salvarUsers(usuario) {
    if (localStorage) {
        usuarioPadrao = criarUsuarioPadrao()
        localStorage.setItem(usuarioPadrao.Email, JSON.stringify(usuarioPadrao))
    }
    const usuarioJSON = JSON.stringify(usuario)
    localStorage.setItem(usuario.Email, usuarioJSON)
}

function criarUsuarioPadrao() {
    return { Nome: "Admin", Senha: "Admin", Email: "admin@admin.com" }
}
inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return
        adicionarTarefa(inputTarefa.value)
    }
})

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return
    adicionarTarefa(inputTarefa.value)
})


document.addEventListener('click', function (e) {
    const el = e.target
    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvarTarefa()
    }
})

function limparInput() {
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criarLi() {
    const li = document.createElement('li')
    return li
}

function criarBotao(li) {
    li.innerText += '    '
    const butao = document.createElement('button')
    butao.innerText = 'Apagar'
    butao.setAttribute('id', 'apagar')
    butao.setAttribute('class', 'btn btn-danger')
    butao.setAttribute('title', 'Apagar esta tarefa')
    butao.classList.add('apagar')
    li.appendChild(butao)
}
function adicionarTarefa(tarefa) {
    const tarefaAdd = document.querySelector('#tarefas')
    const li = criarLi()
    li.innerHTML += tarefa
    li.setAttribute('class', 'list-group-item')
    tarefaAdd.appendChild(li)
    criarBotao(li)
    limparInput()
    salvarTarefa()
}
function salvarTarefa() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaText = tarefa.innerText
        tarefaText = tarefaText.replace('Apagar', '').trim()
        listaTarefas.push(tarefaText)
    }
    const tarefasJSON = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}
function pegarTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaTarefas = JSON.parse(tarefas)
    console.log(listaTarefas)
    for (const tarefas of listaTarefas) {
        adicionarTarefa(tarefas)
    }
}
pegarTarefasSalvas()