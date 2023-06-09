import { createModal } from './userUpdate.js'
import { deleteById } from './userDelete.js'

// AJAX FUNCTION TO RECEIVE DATA'S DATABASE
const read = () => {
    function ajax(config) {
        const xhr = new XMLHttpRequest()
        xhr.open(config.method, config.url, true)

        xhr.onload = e => {
            if (xhr.status === 200) {
                config.sucesso(xhr.response)
            } else if (xhr.status >= 400) {
                config.erro({
                    code: xhr.status,
                    text: xhr.statusText
                })
            }
        }
        xhr.send()
    }

    // CREATE TABLE'S ROWS ELEMENTS AND APPEND ON TABLE
    function criarTabela(usuarios) {
        const linhas = usuarios.map(usuario => {
            const tdId = document.createElement('td')
            tdId.classList.add('display-td')
            tdId.innerHTML = usuario.id

            const tdNome = document.createElement('td')
            tdNome.innerHTML = usuario.nome

            const tdEmail = document.createElement('td')
            tdEmail.innerHTML = usuario.email

            const tdTel = document.createElement('td')
            tdTel.classList.add('display-td')
            tdTel.innerHTML = usuario.tel

            const tdCep = document.createElement('td')
            tdCep.classList.add('display-td')
            tdCep.innerHTML = usuario.cep

            const tdEnd = document.createElement('td')
            tdEnd.innerHTML = usuario.endereco + ", " + usuario.numero

            const tdCidade = document.createElement('td')
            tdCidade.innerHTML = usuario.cidade

            const tdUF = document.createElement('td')
            tdUF.innerHTML = usuario.uf

            const tdIcon = document.createElement('td')
            tdIcon.classList.add("actions")
            tdIcon.innerHTML = `<button class="btn-action btnEdit" data-id=${usuario.id}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button class="btnDelete btn-action" data-id=${usuario.id}><i class="fa fa-trash-o" aria-hidden="true"</i></button>`

            const tr = document.createElement('tr')

            tr.appendChild(tdId)
            tr.appendChild(tdNome)
            tr.appendChild(tdEmail)
            tr.appendChild(tdTel)
            tr.appendChild(tdCep)
            tr.appendChild(tdEnd)
            tr.appendChild(tdCidade)
            tr.appendChild(tdUF)
            tr.appendChild(tdIcon)

            return tr
        })
        const tabela = document.getElementById('linhas')
        linhas.forEach(linha => tabela.appendChild(linha))

        const btnEdit = document.querySelectorAll(".btnEdit")
        btnEdit.forEach(btn => {
            btn.addEventListener("click", createModal)
        })
        const btnDelete = document.querySelectorAll(".btnDelete")
        btnDelete.forEach(btn => {
            const id = btn.dataset.id
            btn.addEventListener("click", () => deleteById(id))
        })

    }

    ajax({
        url: "http://localhost:8090/users",
        method: "get",
        sucesso(resposta) {
            // RESPONSE'S DATABASE ARE USED TO CREATE TABLE
            const usuarios = JSON.parse(resposta)
            const tdElement = document.querySelector('td')
            if (!tdElement)
                criarTabela(usuarios)
        },
        erro(e) {
            const msg = document.createTextNode(`${e.code}: ${e.text}`)
            document.body.appendChild(msg)
        }
    })
}

// HIDDEN TABLE'S COLUMNS WHEN RESIZE THE WINDOW
document.body.onresize = () => {
    const elTable = document.getElementsByClassName('display-td')
    if (document.body.clientWidth < 500) {
        for (let i = 0; i < elTable.length; i++) {
            elTable[i].classList.add('td-off')
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    read();
});