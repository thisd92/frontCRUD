// IDENTIFY THE INPUTS
let nome = document.getElementById('fname')
let email = document.getElementById('femail')
let tel = document.getElementById('ftel')
let cep = document.getElementById('fcep')
let endereco = document.getElementById('fend')
let numero = document.getElementById('fnum')
let cidade = document.getElementById('fcidade')
let uf = document.getElementById('fUf')
let btnSubmit = document.getElementById("btnSubmit")

let elementId;

// AJAX FUNCTION TO SEND DATA TO DATABASE
export function createModal() {
    const modal = document.getElementById("myModal");
    const btnModal = document.querySelectorAll(".btnEdit")
    const span = document.querySelector(".close");

    btnModal.forEach(btn => {
        // ADD ONCLICK EVENT ON MODAL BUTTON
        btn.onclick = () => {
            modal.style.display = "block";
        }
    })

    span.addEventListener("click", () => {
        modal.style.display = "none"
    })

    // ADD EVENT THAT WHERE YOU CLICK, THE MODAL CLOSE
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }
    findById()
}

export function toUpdate(elementId, usuario) {
    usuario = {
        nome: nome.value,
        email: email.value,
        tel: tel.value,
        cep: cep.value,
        endereco: endereco.value,
        numero: numero.value,
        cidade: cidade.value,
        uf: uf.value
    }
    
    const xhr = new XMLHttpRequest();

    xhr.open("PUT",  `http://localhost:8090/users/${elementId}`)

    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send(JSON.stringify(usuario))
}

function findById() {
    const buttons = document.querySelectorAll('.btnEdit');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            ajax({
                url: `http://localhost:8090/users/${id}`,
                method: "get",
                sucesso(resposta) {
                    elementId = id;
                    const usuario = JSON.parse(resposta)
                    nome.value = usuario.nome;
                    email.value = usuario.email;
                    tel.value = usuario.tel;
                    cep.value = usuario.cep;
                    endereco.value = usuario.endereco;
                    numero.value = usuario.numero;
                    cidade.value = usuario.cidade;
                    uf.value = usuario.uf;
                    btnSubmit.addEventListener("click", () => toUpdate(elementId, usuario))
                },
                erro(e) {
                    const msg = document.createTextNode(`${e.code}: ${e.text}`)
                    document.body.appendChild(msg)
                }
            })
        });
    });
}

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