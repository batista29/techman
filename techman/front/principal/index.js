var container = document.querySelector(".container")
var listaRead = document.querySelector(".read")
var readEquipamentos = document.querySelector(".readEquipamentos")

var divComentarios = document.querySelector('.divComentarios')
var comentarios = document.querySelector('.comentarios')

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
    let id = e.parentNode.parentNode.querySelector('.id').innerHTML
    console.log(id)

    let option2 = { method: 'DELETE' };

    fetch(`http://localhost:3000/deletarEquipamento/${id}`, option2)
        .then(response => response.json())
        .then(res => {
            console.log(res.mensagem)
            if (res.mensagem = 'deletado com sucesso') {
                alert("Sucesso")
                window.location.reload()
            } else {
                alert("Erro")
            }
        })
        .catch(err => console.error(err));
}

// function comentarios(e) {
//     let comentario = e.parentNode.parentNode.querySelector('.id').innerHTML
// }

function abrirModalComentario(e) {
    let modalAparecer = document.querySelector(".modalComentarios");
    modalAparecer.classList.add("modelModal")

    let id = e.parentNode.parentNode.querySelector('.id').innerHTML

    let options = { method: 'GET' };

    fetch(`http://localhost:3000/encontrarEquipamento/${id}`, options)
        .then(response => response.json())
        .then(res => {
            res.comentarios.forEach(dados => {

                let tabela = divComentarios.cloneNode(true)
                tabela.classList.remove("model")

                tabela.querySelector('.getPerfilEData').innerHTML = dados.perfilId.Perfil + ' - ' + dados.data
                tabela.querySelector('.getComentario').innerHTML = dados.comentario

                comentarios.appendChild(tabela)
            })
        })
        .catch(err => console.error(err));

}

function fecharModalComentario() {
    let modalAparecer = document.querySelector(".modalComentarios");
    modalAparecer.classList.remove("modelModal")
}

function addEquipamento(){
    let modalAparecer = document.querySelector(".modalAddNovoComentario");
    modalAparecer.classList.add("modelModal")
}

function fecharModalAddComentario() {
    let modalAparecer = document.querySelector(".modalAddNovoComentario");
    modalAparecer.classList.remove("modelModal")
}