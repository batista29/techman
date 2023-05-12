var buttons = document.querySelectorAll("#button")
var input = document.querySelector('#inputPin')

function buttonLimpar(e) {
   window.location.reload()
}

function buttonClick(event) {
    const value = event.target.value;
    input.value += value;
    carregar(input.value)
}

buttons.forEach(button => {
    button.addEventListener("click", buttonClick);
});

const valores = []

buttons.forEach(button => {
    valores.push(button.value)
})

function enviar() {
    let senha = input.value

    console.log(senha)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"senha":${senha}}`
    };

    fetch('http://localhost:3000/login', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if (response.mensagem !== 'Recusado') {
                console.log(response)
                let idPerfil = response.user.perfil
                localStorage.setItem("idPerfil", idPerfil = response.user.perfil);
                alert("Aceita")
                window.location.href = '../principal/index.html'
            } else if (response.mensagem == 'Recusado') {
                console.log(response)
                alert("Senha recusada")
                window.location.reload()
            }
        })
        .catch(err => console.error(err));
}

function carregar(e) {
    let senha = e
    let senhaFormatada = `${senha}`
    console.log(senhaFormatada)

    if (senhaFormatada.length <= 4 || senhaFormatada == 'undefined') {
        let btn = document.querySelector('.btnEntrar')
        btn.classList.add('desabilitarBtn')
    } else {
        let btn = document.querySelector('.btnEntrar')
        btn.classList.remove('desabilitarBtn')
    }
}