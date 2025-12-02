const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

const ready = open({
    filename: './database.sqlite',
    driver: sqlite3.Database
}).then(async (db) => {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS carros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            marca TEXT NOT NULL,
            modelo TEXT NOT NULL,
            ano INTEGER NOT NULL,
            cor TEXT NOT NULL
        )
    `)
    return db;
});

function validateNonEmpty(value, field) {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`${field} é obrigatório`)
    }
}

async function _reset() {
    const db = await ready;
    await db.exec('DELETE FROM carros;')
}

async function list() {
    const db = await ready;
    const rows = await db.all('SELECT marca, modelo, ano, cor FROM carros ORDER BY id;')
    return rows.map(row => ({ ...row }));
}

async function get({ marca, modelo, ano, cor }) {
    validateNonEmpty(marca, 'marca');
    validateNonEmpty(modelo, 'modelo');
    if (typeof ano !== 'number' || ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(cor, 'cor');

    const db = await ready;
    const row = await db.get(
        `SELECT marca, modelo, ano, cor FROM carros 
         WHERE marca = ? AND modelo = ? AND ano = ? AND cor = ? 
         ORDER BY id LIMIT 1`,
        marca.trim(), modelo.trim(), ano, cor.trim()
    );
    return row ? { ...row } : null;
}

async function create({ marca, modelo, ano, cor }) {
    validateNonEmpty(marca, 'marca');
    validateNonEmpty(modelo, 'modelo');
    if (typeof ano !== 'number' || ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(cor, 'cor');

    const db = await ready;
    await db.run(
        'INSERT INTO carros (marca, modelo, ano, cor) VALUES (?, ?, ?, ?)',
        marca.trim(), modelo.trim(), ano, cor.trim()
    );
    return { marca: marca.trim(), modelo: modelo.trim(), ano, cor: cor.trim() };
}

async function update(match, patch = {}) {
    validateNonEmpty(match.marca, 'marca');
    validateNonEmpty(match.modelo, 'modelo');
    if (typeof match.ano !== 'number' || match.ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(match.cor, 'cor');

    const db = await ready;

    const row = await db.get(
        `SELECT id, marca, modelo, ano, cor FROM carros 
         WHERE marca = ? AND modelo = ? AND ano = ? AND cor = ? 
         ORDER BY id LIMIT 1`,
        match.marca.trim(), match.modelo.trim(), match.ano, match.cor.trim()
    );

    if (!row) {
        throw new Error('Carro não encontrado');
    }

    let { marca: novaMarca, modelo: novoModelo, ano: novoAno, cor: novaCor } = row;

    if (patch.marca !== undefined) {
        validateNonEmpty(patch.marca, 'marca');
        novaMarca = patch.marca.trim();
    }
    if (patch.modelo !== undefined) {
        validateNonEmpty(patch.modelo, 'modelo');
        novoModelo = patch.modelo.trim();
    }
    if (patch.ano !== undefined) {
        if (typeof patch.ano !== 'number' || patch.ano <= 0) {
            throw new Error('ano deve ser um número positivo');
        }
        novoAno = patch.ano;
    }
    if (patch.cor !== undefined) {
        validateNonEmpty(patch.cor, 'cor');
        novaCor = patch.cor.trim();
    }

    await db.run(
        'UPDATE carros SET marca = ?, modelo = ?, ano = ?, cor = ? WHERE id = ?',
        novaMarca, novoModelo, novoAno, novaCor, row.id
    );

    return { marca: novaMarca, modelo: novoModelo, ano: novoAno, cor: novaCor };
}

async function del({ marca, modelo, ano, cor }) {
    validateNonEmpty(marca, 'marca');
    validateNonEmpty(modelo, 'modelo');
    if (typeof ano !== 'number' || ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(cor, 'cor');

    const db = await ready;
    const result = await db.run(
        'DELETE FROM carros WHERE marca = ? AND modelo = ? AND ano = ? AND cor = ?',
        marca.trim(), modelo.trim(), ano, cor.trim()
    );
    return result.changes > 0;
}

module.exports = {
    _reset,
    list,
    get,
    create,
    update,
    del
};