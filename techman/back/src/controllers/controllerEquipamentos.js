const jwt = require('jsonwebtoken');
require('dotenv').config()
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    try {

        let equipamento = await prisma.Equipamentos.create({
            data: req.body
        })

        res.status(201).json(equipamento).end()

    } catch (error) {
        res.status(404).send({ mensagem: "erro ao criar" }).end()
    }
}

const read = async (req, res) => {
    let equipamento = await prisma.equipamentos.findMany({
        select: {
            id: true,
            equipamento: true,
            imagem: true,
            descricao: true,
            ativo: true,
            data: true,
            comentarios: {
                select: {
                    comentario: true,
                    equipamento: true,
                    perfil: true,
                    data: true,
                }
            }
        }
    })
    res.status(200).json(equipamento).end()
}

const readOne = async (req, res) => {
    let equipamento = await prisma.equipamentos.findUnique({
        select: {
            id: true,
            equipamento: true,
            imagem: true,
            descricao: true,
            ativo: true,
            data: true,
            comentarios: {
                select: {
                    comentario: true,
                    equipamento: true,
                    perfil: true,
                    data: true,
                    perfilId: {
                        select: {
                            Perfil: true
                        }
                    }
                }
            }
        },
        where: {
            id: Number(req.params.id)
        }
    })

    if (equipamento != null) {
        res.status(200).json(equipamento).end()
    } else {
        res.status(404).send({ mensagem: "não encontrado" }).end()
    }
}

const update = async (req, res) => {
    try {
        let equipamento = await prisma.equipamentos.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        res.status(200).send({ mensagem: `atualizado com sucesso` }).end()
    } catch (error) {
        res.status(404).send({ mensagem: `Erro ` }).end()
    }
}

const del = async (req, res) => {
    try {
        let equipamento = await prisma.equipamentos.delete({
            where: {
                id: Number(req.params.id)
            },
        })
        res.status(200).send({ mensagem: `deletado com sucesso` }).end()
    } catch (error) {
        res.status(404).send({ mensagem: `Erro` }).end()
    }
}

module.exports = {
    create,
    read,
    update,
    readOne,
    del
}