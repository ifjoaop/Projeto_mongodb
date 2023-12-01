const express = require("express")
const route = express.Router()

const Usuario = require("../models/usuario")
const Mercadoria = require("../models/mercadoria")


route.get("/", async (req, res) => {

    var data = await Usuario.find()
    return res.send( data )
})

route.get("/mercusuario", async (req, res) => {
    const {id_usuario} = req.body

    var data = await Mercadoria.find({id_usuario: id_usuario})

    return res.send(data)
})

route.post("/mercusuario", async (req, res) => {
    var dados = req.body

    var data = await Mercadoria.create(dados)

    return res.send("criado")
})

route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const produto = await Produtos.findById(id);

        if (!produto) {
            return res.status(404).send({ error: "Estoque zero! Esse produto não se econtra no sistema" });
        }

        await Produtos.findByIdAndRemove(id);
        return res.send({ message: "Esse produto foi removido com sucesso" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Ocorreu um erro ao deletar esse produto, favor verificar as informações" });
    }
});

route.delete

module.exports = app => app.use("/clientes", route)
