const express = require('express')
const app = express()
const port = 3000;


const repo = require('./repository/repo.sqlite')

app.use(express.json());
app.use(express.static('public'));


app.get('/carros', async (req, res) => {
    try {
        const carros = await repo.list();
        res.json(carros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/carros/find', async (req, res) => {
    try {
        const { marca, modelo, ano, cor } = req.query;
        if (!marca || !modelo || !ano || !cor) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
        }
        const carro = await repo.get({ marca, modelo, ano: parseInt(ano), cor })
        if (!carro) {
            return res.status(404).json({ error: 'Carro não encontrado' })
        }
        res.json(carro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.post('/carros', async (req, res) => {
    try {
        const { marca, modelo, ano, cor } = req.body;
        const novoCarro = await repo.create({ marca, modelo, ano, cor });
        res.status(201).json(novoCarro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})




app.put('/carros', async (req, res) => {
    try {
        const { match, patch } = req.body;
        if (!match || !patch) {
            return res.status(400).json({ error: 'match e patch são obrigatórios' })
        }
        const carroAtualizado = await repo.update(match, patch)
        res.json(carroAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});




// delete de carros
app.delete('/carros', async (req, res) => {

    try {


        const { marca, modelo, ano, cor } = req.body;
        const removido = await repo.del({ marca, modelo, ano, cor })
        if (removido) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Nenhum carro encontrado para deletar' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});