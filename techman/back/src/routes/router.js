const express = require('express')
const router = express.Router()

const usuario = require('../controllers/controllerUsuario')

router.post('/criarUsuario', usuario.create)
router.post('/login', usuario.login)
router.get('/listarUsuarios', usuario.read)
router.get('/encontrarUsuario/:id', usuario.readOne)
router.get('/editarUsuario', usuario.update)

const equipamentos = require('../controllers/controllerEquipamentos')

router.post('/cadastrarEquipamento', equipamentos.create)
router.get('/listarEquipamentos', equipamentos.read)
router.get('/encontrarEquipamento/:id', equipamentos.readOne)
router.delete('/deletarEquipamento/:id', equipamentos.del)

const comentarios = require('../controllers/controllerComentario')

router.get('/listarComentarios', comentarios.read)
router.post('/criarComentario', comentarios.create)

module.exports = router