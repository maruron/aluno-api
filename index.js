const express = require('express');
const { create, update, remove, findAll, findOne } = require('./repositories/alunosRepository');

const app = express();
const port = 3000;

app.use(express.json());


app.post('/alunos', (req, res) => {
    const { nome, email, nome_curso } = req.body;
    const aluno = create({ nome, email, nome_curso });
    res.status(201).json(aluno);
});


app.get('/alunos', (req, res) => {
    const alunos = findAll();
    res.json(alunos);
});

app.get('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const aluno = findOne(id);
    if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json(aluno);
});


app.put('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, nome_curso } = req.body;
    const aluno = update(id, { nome, email, nome_curso });
    if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.json(aluno);
});


app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const success = remove(id);
    if (!success) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});