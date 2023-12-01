const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")

require('dotenv/config')

const userMercado = require('../models/usuario')
const Usuario = require("../models/usuario")

route.post("/login", async (req, res) => {
    const { email, senha } = req.body

    if (!email)
        return res.send({ msg: "Erro! É necessário incluir um email para prosseguir"})

    if (!senha)
        return res.send({ msg: "Não é possível prosseguir com essa solicitação"})


    var usuario = await Usuario.findOne({ email })

    if (!usuario)
        return res.send({ msg: "Erro! As informações inseridas estão incorretas, favor verificar os caracteres inseridos"})

    
    if (senha != usuario.senha)
        return res.send({ msg: "Erro! As informações inseridas estão incorretas, favor verificar os caractéres inseridos"})

    
    var dados = {
        id: usuario.id,
        email: usuario.email
    }

    var chave = process.env.TOKEN_KEY

    
    var tempo = { expiresIn: 60 * 1000 } 
    
    var token = await jwt.sign(dados, chave, tempo)

    res.status(200).cookie('Session', token, {expire: 1000 + Date.now()}).json({auth: true, id_usu: usuario.id, token})
})

route.post("/register", async (req, res) => {
    const { email, senha } = req.body

    if (!email)
        return res.send({ msg: "Por favor! Esse campo é obrigatório"})

    var numero = [
        parseInt(Math.random() * 9),
        parseInt(Math.random() * 9),
        parseInt(Math.random() * 9),
        parseInt(Math.random() * 9),
        parseInt(Math.random() * 9),
        parseInt(Math.random() * 9)
    ]
    numero = numero.join('')
    
    var usuario = await Usuario.create({ email, senha, chave: numero })
    return res.send( usuario )
})

route.post("/alterarsenha", async (req, res) => {
    const { email, senha, confirma, chave } = req.body

    if (email == undefined) {
        return res.send({ msg: "Email nãoi pode ser nulo"})
    }
    //Outras condicoes
    
    
    if ( senha != confirma ) {
        return res.send({ msg: "Senha e confirma senha não são iguais"})
    }

    var dados = await Usuario.find({ email })


    if (chave != dados[0].chave) {
        return res.send({ msg: "A chave informa não é valida."})
    }

    var hash = await bcrypt.hash(senha, 10)

    dados[0].chave = null
    dados[0].senha = hash

    try {
        await dados[0].save()
        return res.send({ msg: "Senha alterada com sucesso."})
    } catch (err) {
        console.log(err)
        return res.send({ msg: "Ops! Ocorreu algum erro"})

    }

})

module.exports = app => app.use("/api", route)