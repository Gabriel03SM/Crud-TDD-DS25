const repo = require('../../src/db/repo.memory')

beforeEach(async () => {
    await repo._reset()
})

test('list começa vazio', async () => {
    const carros = await repo.list()
    expect(Array.isArray(carros)).toBe(true);
    expect(carros).toHaveLength(0)
})

test('create cria um carro e persiste', async () => {
    const carro = { marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' };
    const criado = await repo.create(carro);
    expect(criado).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })

    const todos = await repo.list();
    expect(todos).toContainEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
})

test('create valida campos obrigatórios', async () => {
    await expect(repo.create({ marca: '', modelo: 'Uno', ano: 2020, cor: 'Vermelho' }))
        .rejects.toThrow('marca é obrigatório');
    await expect(repo.create({ marca: 'Fiat', modelo: '', ano: 2020, cor: 'Vermelho' }))
        .rejects.toThrow('modelo é obrigatório');
    await expect(repo.create({ marca: 'Fiat', modelo: 'Uno', ano: -1, cor: 'Vermelho' }))
        .rejects.toThrow('ano deve ser um número positivo');
    await expect(repo.create({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: '' }))
        .rejects.toThrow('cor é obrigatório');
})


test('get retorna cópia do carro ou null', async () => {
    await repo.create({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
    const encontrado = await repo.get({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
    expect(encontrado).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });

    const naoEncontrado = await repo.get({ marca: 'Ford', modelo: 'Fiesta', ano: 2020, cor: 'Azul' })
    expect(naoEncontrado).toBeNull();
})

test('update atualiza o primeiro carro que casa', async () => {
    await repo.create({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })
    await repo.create({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })
    const atualizado = await repo.update(
        { marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' },
        { cor: 'Azul' }
    )
    expect(atualizado).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Azul' });

    const todos = await repo.list()

    expect(todos).toContainEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Azul' });
    expect(todos).toContainEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
})


test('del remove todos os carros que casam e retorna true/false', async () => {
    await repo.create({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })
    await repo.create({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })

    const removido = await repo.del({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' })
    expect(removido).toBe(true);

    const todos = await repo.list()
    expect(todos).toHaveLength(0)
    const removidoNovamente = await repo.del({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
    expect(removidoNovamente).toBe(false)
})