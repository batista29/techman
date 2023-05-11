var container = document.querySelector(".container")
var listaRead = document.querySelector(".read")
var readEquipamentos = document.querySelector(".readEquipamentos")

function carregar() {
    let options = { method: 'GET' };

    fetch('http://localhost:3000/listarEquipamentos', options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {
                let tabela = listaRead.cloneNode(true)
                tabela.classList.remove("model")

                tabela.querySelector(".id").innerHTML = dados.id
                tabela.querySelector(".equipamento").innerHTML = dados.equipamento
                tabela.querySelector(".imagem").src = './assets/' + dados.imagem
                tabela.querySelector(".descricao").innerHTML = dados.descricao
                tabela.querySelector(".ativo").innerHTML = dados.ativo
                tabela.querySelector(".data").innerHTML = dados.data

                container.appendChild(tabela)
            });
        })
        .catch(err => console.error(err));
}

function logout() {
    alert('Desvinculando')
    window.location.href = '../login/index.html'
}

function deletar(e) {
    var id = e.parentNode.parentNode.querySelector('.id').innerHTML
    console.log(id)

    let option2 = { method: 'DELETE' };

    fetch(`http://localhost:3000/deletarEquipamento/${id}`, option2)
        .then(response => response.json())
        .then(res => {
            if (res.mensagem = 'deletado com sucesso') {
                alert("Sucesso")
            } else {
                alert("Erro")
            }
        })
        .catch(err => console.error(err));
}