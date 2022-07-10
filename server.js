const express = require("express");
const app = express();
const port = process.env.PORT || 3333;

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
};

app.use(express.json());

app.use('*', function (req, res, next) {
    console.log(new Date().toDateString(), req.method, req.url, req.body, req.query);
    next();
});

app.listen(port, () => {
    console.info("App rodando na porta 3333");
});

app.get("/produtos", (req, res) => {
    return res.json(lista_produtos);
});