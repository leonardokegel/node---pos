const express = require("express");
const app = express();
const port = process.env.PORT || 3333;

app.get("/", (request, response) => {
    return response.send("Hello World!");
});
app.listen(port, () => {
    console.info("App rodando na porta 3333");
});