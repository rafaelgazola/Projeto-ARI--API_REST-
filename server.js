//Requisitando as bibliotecas necessariias para o projeto
const express = require('express');
const cors = require('cors');
const app = express();

//Informando as dependencias utilizadas
app.use(cors());
app.use(express.json());

//Criando um banco de dados local
let historicoSensores = [
    {id:1,temperatura:25, unidade:50,hora:"10:00"},
    {id:2,temperatura:40, umidade:60,hora:"11:00"},
    {id:3,temperatura:35, umidade:55,hora:"12:00"},
];

//Metodos GET
app.get('/api/dados', (req,res) => {
    res.json(historicoSensores);
});

//Metodo POST
app.post('/api/dados' , (req,res) => {
    const{temperatura,umidade,hora} = req.body;

    if(!temperatura || !umidade || !hora){
        return res.status(400).json({mensagem:"Dados incompletos! Verifique novamente!"});
    }
    const novosDados = {
        id: historicoSensores.length + 1,
        temperatura,
        umidade,
        hora
    }
    historicoSensores.push(novosDados);
    res.status(201).json({mensagem: "Dados enviados com sucesso!",dados:novosDados});
})

//definindo a Rota
const PORT = process.env.use || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("Servidor com metodo post e get")
})



