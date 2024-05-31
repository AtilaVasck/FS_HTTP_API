// const express = require('express');
// const app = express();
// app.use(express.json());
// const participantes = [];
// app.post('/participantes', (req, res) => {
//     const { nome, email, senha, idade, cidade } = req.body;
//     const participante = { id: participantes.length + 1, nome, email, senha, idade, cidade };
//     participantes.push(participante);
//     res.status(201).send(participante);
// });

//app.get('/participantes', (req, res) => {
    
    //     res.status(200).send(participantes);
    // });
    
    // app.get('/participantes/:id', (req, res) => {
    //     const participante = participantes.find(p => p.id === parseInt(req.params.id));
    //     if (!participante) return res.status(404).send('Participante não encontrado.');
    //     res.send(participante);
    // });
    
    // app.put('/participantes/:id', (req, res) => {
    //     const participante = participantes.find(p => p.id === parseInt(req.params.id));
    //     if (!participante) return res.status(404).send('Participante não encontrado.');
    
    //     const { nome, email, senha, idade, cidade } = req.body;
    //     participante.nome = nome;
    //     participante.email = email;
    //     participante.senha = senha;
    //     participante.idade = idade;
    //     participante.cidade = cidade;
    //     res.send(participante);
    // });
    
    // app.delete('/participantes/:id', (req, res) => {
    //     const participanteIndex = participantes.findIndex(p => p.id === parseInt(req.params.id));
    //     if (participanteIndex === -1) return res.status(404).send('Participante não encontrado.');
    
    //     participantes.splice(participanteIndex, 1);
    //     res.status(204).send();
    // });
    
    // const PORT = process.env.PORT || 3000;
    // app.listen(PORT, () => {
    //     console.log(`Servidor rodando na porta ${PORT}`);
    // });
    