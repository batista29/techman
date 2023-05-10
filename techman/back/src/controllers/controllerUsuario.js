const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {
        var info = req.body
        info.senha = await bcrypt.hash(req.body.senha.toString(), 10)
        console.log(info)

        let usuario = await prisma.Usuario.create({
            data: info
        })

        res.status(201).json(usuario).end()

    } catch (error) {

        res.status(404).send({ mensagem: "erro ao criar" }).end()

    }
}

const read = async (req, res) => {
    let usuario = await prisma.usuario.findMany()
    res.status(200).json(usuario).end()
}

const readOne = async (req, res) => {
    let usuario = await prisma.usuario.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (usuario != null) {
        res.status(200).json(usuario).end()
    } else {
        res.status(404).send({ mensagem: "usuario não encontrado" }).end()
    }
}

const update = async (req, res) => {
    try {
        let usuario = await prisma.usuario.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.status(200).send({ mensagem: `Usuario ${usuario.nome} foi atualizado com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ mensagem: `Erro ${error.code}, usuário não foi encontrado` }).end()
    }
}

const login = async (req, res) => {
    const user = await prisma.Usuario.findUnique({
        where: { perfil: req.body.perfil }

    }).catch(err => {
        console.log(err)
    })

    if (user) {

        //comparando a senha que o usuario digitou com a senha criptgrafada
        if (await bcrypt.compare(req.body.senha, user.senha)) {
            var result = user

            jwt.sign(result, process.env.KEY, { expiresIn: '10h' }, function (err, token) {

                if (err == null) {
                    // adicionando um token quando o usuário logar

                    result["token"] = token
                    res.status(200).json({ result }).end()
                } else {
                    res.status(404).json(err).end()
                }
            })
        } else {
            res.status(404).json({ "result": "senha incorreta" }).end()
        }
    } else {
        res.status(404).json({ "result": "usuario não encontrado" }).end()
    }
}
module.exports = {
    create,
    read,
    update,
    login,
    readOne
}