const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {

        let comentario = await prisma.comentarios.create({
            data: req.body
        })

        res.status(201).json(comentario).end()

    } catch (error) {
        res.status(404).send({ mensagem: "erro ao criar" }).end()
    }
}

const read = async (req, res) => {
    let comentario = await prisma.comentarios.findMany()
    res.status(200).json(comentario).end()
}

const readOne = async (req, res) => {
    let comentario = await prisma.comentarios.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (comentario != null) {
        res.status(200).json(comentario).end()
    } else {
        res.status(404).send({ mensagem: "não encontrado" }).end()
    }
}

const update = async (req, res) => {
    try {
        let comentario = await prisma.comentarios.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.status(200).send({ mensagem: `atualizado com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ mensagem: `Erro ` }).end()
    }
}

const del = async (req, res) => {
    try {
        let comentario = await prisma.comentarios.delete({
            where: {
                id: Number(req.params.id)
            },
        })
        res.status(200).send({ mensagem: `deletado com sucesso` }).end()
    } catch (error) {
        res.status(200).send({ mensagem: `Erro ` }).end()
    }
}

module.exports = {
    create,
    read,
    update,
    readOne,
    del
}