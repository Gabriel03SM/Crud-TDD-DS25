const request = require('supertest')
const app = require('../../src/server')

describe('API de Carros', () => {
    beforeEach(async () => {

        const repo = require('../../src/repository/repo.sqlite')
        await repo._reset()
    })

    test('POST /carros cria um novo carro', async () => {
        const response = await request(app)
            .post('/carros')
            .send({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })
    })

    test('GET /carros retorna lista de carros', async () => {
        await request(app).post('/carros').send({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
        const response = await request(app).get('/carros');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
    })

    test('GET /carros/find retorna carro existente', async () => {
        await request(app).post('/carros').send({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
        const response = await request(app)
            .get('/carros/find?marca=Fiat&modelo=Uno&ano=2020&cor=Vermelho');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
    })

    test('PUT /carros atualiza um carro', async () => {
        await request(app).post('/carros').send({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
        const response = await request(app)
            .put('/carros')
            .send({
                match: { marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' },
                patch: { cor: 'Azul' }
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Azul' });
    })

    test('DELETE /carros remove carros', async () => {
        await request(app).post('/carros').send({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
        const response = await request(app)
            .delete('/carros')
            .send({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })
        expect(response.status).toBe(204);
    })
})