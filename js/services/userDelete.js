// AJAX FUNCTION TO RECEIVE DATA'S DATABASE
export function deleteById(id) {
    ajax({
        url: `http://localhost:8090/users/${id}`,
        method: "delete",
        sucesso() {
            alert("Usuário deletado")
        },
        erro(e) {
            const msg = document.createTextNode(`${e.code}: ${e.text}`)
            document.body.appendChild(msg)
        }
    })
};

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