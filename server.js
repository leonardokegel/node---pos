const express = require('express');
const app = express();
const port = process.env.PORT || 3333;

const lista_produtos = {
    produtos: [
        { id: 1, descricao: 'Arroz parboilizado 5Kg', valor: 25.00, marca: 'Tio João' },
        { id: 2, descricao: 'Maionese 250gr', valor: 7.20, marca: 'Helmans' },
        { id: 3, descricao: 'Iogurte Natural 200ml', valor: 2.50, marca: 'Itambé' },
        { id: 4, descricao: 'Batata Maior Palha 300gr', valor: 15.20, marca: 'Chipps' },
        { id: 5, descricao: 'Nescau 400gr', valor: 8.00, marca: 'Nestlé' },
    ]
};

app.use(express.json());

app.use('*', function (req, res, next) {
    console.log(new Date().toDateString(), req.method, req.url, req.body, req.query);
    next();
});

app.listen(port, () => {
    console.info('App rodando na porta 3333');
});


app.get('/', (req, res) => {
    return res.send('Leonardo Kegel Porto Testa');
});

app.get('/produtos', (req, res) => {
    return res.json(lista_produtos);
});

app.get('/produtos/:id', (req, res) => {
    let id = +req.params.id
    let produto = procuraProduto(id);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({
            mensagem: 'produto não encontrado'
        });
    }
});

app.post('/produtos', (req, res) => {

    if (!procuraProduto(req.body.id)) {
        if (trataBodyRequest(req.body, res)) {
            lista_produtos.produtos.push(req.body);
            res.json({
                mensagem: 'produto inserido com sucesso!',
                produto: req.body
            });
        }

    } else {
        res.status(400).json({
            mensagem: `produto com id ${req.body.id} já cadastrado na base. Por favor, inserir um id novo.`
        });
    }
});

app.put('/produtos/:id', (req, res) => {
    let id = +req.params.id
    let produto = procuraProduto(id);

    if (produto) {
        produto.descricao = req.body.descricao;
        produto.valor = req.body.descricao;
        produto.marca = req.body.marca
        res.json({
            mensagem: 'produto atualizado com sucesso!'
        });
    } else {
        res.status(400).json({
            mensagem: 'id não encontrado'
        })
    }
});

app.delete('/produtos/:id', (req, res) => {
    let id = +req.params.id
    let produto = lista_produtos.produtos.findIndex(e => e.id == id);

    if (produto > -1) {
        lista_produtos.produtos.splice(produto, 1);
        res.json({
            mensagem: 'produto removido!'
        });
    } else {
        res.status(404).json({
            mensagem: 'produto não encontrado'
        });
    }
});

function procuraProduto(id) {
    let idx = lista_produtos.produtos.find((e) => e.id == id);
    if (idx) {
        return idx;
    }
    return;
}

function trataBodyRequest(produto, res) {
    if (!produto.descricao) {
        res.status(400).json({
            mensagem: `campo descrição é obrigatório!`
        });
        return false;
    } else if (!produto.valor) {
        res.status(400).json({
            mensagem: `campo valor é obrigatório!`
        });
        return false;
    } else if (!produto.marca) {
        res.status(400).json({
            mensagem: `campo marca é obrigatório!`
        });
        return false;
    } else {
        return true;
    }
}
