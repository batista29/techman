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
                console.log(dados)
                if (dados.ativo == true) {
                    let tabela = listaRead.cloneNode(true)
                    tabela.classList.remove("model")

                    tabela.querySelector(".id").innerHTML = dados.id
                    tabela.querySelector(".equipamento").innerHTML = dados.equipamento
                    tabela.querySelector(".imagem").src = './assets/' + dados.imagem
                    tabela.querySelector(".descricao").innerHTML = dados.descricao
                    tabela.querySelector(".ativo").innerHTML = dados.ativo
                    tabela.querySelector(".data").innerHTML = dados.data

                    container.appendChild(tabela)
                }
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
    console.log(id)

    localStorage.setItem("id", id);

    let options = { method: 'GET' };

    fetch(`http://localhost:3000/encontrarEquipamento/${id}`, options)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            res.comentarios.forEach(dados => {

                let tabela = divComentarios.cloneNode(true)
                tabela.classList.remove("model")

                tabela.querySelector('.getIdComentario').innerHTML = res.id
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

function addEquipamento() {
    let modalAparecer = document.querySelector(".modalAddNovoEquipamento");
    modalAparecer.classList.add("modelModal")
}

function fecharModalAddEquipamento() {
    let modalAparecer = document.querySelector(".modalAddNovoEquipamento");
    modalAparecer.classList.remove("modelModal")
}

function addNovoEquipamento() {

    let addNomeEquipamentoBtn = document.querySelector(".addNomeEquipamentoBtn").value
    let nomeDoEquipamentoSelectImg = document.querySelector(".nomeDoEquipamento").value
    let addDescricaoEquipamentoBtn = document.querySelector(".addDescricaoEquipamentoBtn").value
    let ativoSimOuNao = document.querySelector(".ativoSimOuNao").value
    let datetime = document.querySelector(".addDataEquipamentoBtn").value + ":00.000Z"

    if (ativoSimOuNao == 1) {
        var ativo = true
    } else {
        var ativo = false
    }

    let dados = {
        equipamento: addNomeEquipamentoBtn,
        imagem: nomeDoEquipamentoSelectImg,
        descricao: addDescricaoEquipamentoBtn,
        ativo: ativo,
        data: datetime
    }

    if (dados.equipamento && dados.imagem && dados.descricao && dados.ativo && dados.data !== "" || null) {
        if (dados.data.length < 23) {
            console.log(dados.data)
            alert("Data está vazia")
        } else {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            };

            fetch('http://localhost:3000/cadastrarEquipamento', options)
                .then(response => response.json())
                .then(res => {
                    if (res.mensagem = "ok") {
                        alert("Produto cadastrado com sucesso")
                        window.location.reload()
                    }
                })
                .catch(err => console.error(err));
        }
    } else {
        console.log("Errado", dados)
        alert("Insira os dados pedidos")
    }
}

function abrirModalCriarComentario() {
    let modalAparecer = document.querySelector(".modalAddNovoComentario");
    modalAparecer.classList.add("modelModal")
}

function fecharModalCriarComentario() {
    let modalAparecer = document.querySelector(".modalAddNovoComentario");
    modalAparecer.classList.remove("modelModal")
}

function addNovoComentario(e) {
    let id = localStorage.getItem("id");
    let comentario = document.querySelector('.inpNovoComentario').value

    // let dados = {
    //     comentario: "",
	// 	equipamento: "",
	// 	perfil: "",
	// 	data: ""
    // }

    // formato da data : "2020-05-04T10:30:00.000Z"

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    };

    fetch('http://localhost:3000/criarComentario', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}