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
}
