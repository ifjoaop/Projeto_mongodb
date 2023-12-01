const express = require("express")
const route = express.Router()

const Produtos = require("../models/produtos")

//Essa rota permitira incluir um novo produto no banco
route.post("/", async (req, res) => {
    var recebido = req.body 
    console.log(recebido)
    var db = await Produtos.create( recebido )

    console.log(db)
})

//Essa rota permitirá trazer todos os produtos já inclusos no banco
route.get("/", async (req, res) => {

    var data = await Produtos.find()
    return res.send( data )
})

//Essa rota permitirá a alteração de produtos no banco
route.put("/", async (req, res) => {
    var { id, produto, preco, quantidade, categoria, ativo } = req.body

    if ( id == undefined)
        return res.send({ error: "Erro, pois o ID do produto a ser inserido não pode ser null, favor atribuir algum valor." })

    try {
        var data = await Produtos.findById( id )
        

        var dados = {
            produto,
            preco,
            quantidade,
            categoria,
            ativo
        }

        await Produtos.findByIdAndUpdate(
                                        id, 
                                        dados
                                    )

        return res.send( { mensagem: "Esse produto foi alterado com sucesso" } )

    }
    catch ( err ) {
        console.log( err )
        return res.send({ error: "Ocorreu" })
    }
})

route.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const produto = await Produtos.findById(id);

        if (!produto) {
            return res.status(404).send({ error: "Produto não encontrado" });
        }

        await Produtos.findByIdAndRemove(id);
        return res.send({ message: "Produto removido com sucesso" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Erro ao deletar produto" });
    }
});
route.post("/venda", async (req, res) => {
    const { id, quantidadeVendida } = req.body;

    if (!id || quantidadeVendida == undefined) {
        return res.status(400).send({ error: "ID do produto e quantidade são obrigatórios para esse requisição" });
    }

    try {
        const produto = await Produtos.findById(id);

        if (!produto) {
            return res.status(404).send({ error: "Produto não encontrado" });
        }

        if (quantidadeVendida > produto.quantidade) {
            return res.status(400).send({ error: "Quantidade vendida excede o estoque" });
        }

        produto.quantidade -= quantidadeVendida;

        await produto.save();

        return res.send({ message: "Venda registrada com sucesso", produto });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Erro ao registrar venda" });
    }
});

route.get("/categoria/:categoria", async (req, res) => {
    try {
        const produtos = await Produtos.find({ categoria: req.params.categoria });
        res.send(produtos);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Erro ao buscar produtos por categoria" });
    }
});


module.exports = app => app.use("/produtos", route)
