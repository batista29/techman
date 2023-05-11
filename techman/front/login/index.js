var buttons = document.querySelectorAll("#button")
var input = document.querySelector('#inputPin')

function buttonLimpar() {
    input.value = ""
}

function buttonClick(event) {
    const value = event.target.value;
    input.value += value;
}

buttons.forEach(button => {
    button.addEventListener("click", buttonClick);
});

const valores = []

buttons.forEach(button => {
    valores.push(button.value)
})

console.log(valores)

function enviar() {
    console.log(input.value)

    let senha = input.value

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"senha":${senha}}`
    };

    fetch('http://localhost:3000/login', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.mensagem)
            if (response.mensagem == "Aceito") {
                alert("Aceita")
                window.location.href = '../principal/index.html'
            } else if (response.mensagem == "Recusado") {
                alert("Senha recusada")
                window.location.reload()
            }
        })
        .catch(err => console.error(err));
}