let _data = [];

function validateNonEmpty(value, field) {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`${field} é obrigatório`)
    }
}

async function _reset() {
    _data = []
}

async function list() {
    return _data.map(item => ({ ...item }))
}

async function get({ marca, modelo, ano, cor }) {
    validateNonEmpty(marca, 'marca');
    validateNonEmpty(modelo, 'modelo');
    if (typeof ano !== 'number' || ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(cor, 'cor');

    const item = _data.find(car => 
        car.marca === marca.trim() &&
        car.modelo === modelo.trim() &&
        car.ano === ano &&
        car.cor === cor.trim()
    );

    return item ? { ...item } : null;
}

async function create({ marca, modelo, ano, cor }) {
    validateNonEmpty(marca, 'marca');
    validateNonEmpty(modelo, 'modelo');
    if (typeof ano !== 'number' || ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(cor, 'cor');

    const novoCarro = {
        marca: marca.trim(),
        modelo: modelo.trim(),
        ano,
        cor: cor.trim()
    };

    _data.push(novoCarro);
    return { ...novoCarro };
}

async function update(match, patch = {}) {

    validateNonEmpty(match.marca, 'marca');
    validateNonEmpty(match.modelo, 'modelo');
    if (typeof match.ano !== 'number' || match.ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(match.cor, 'cor');

    const index = _data.findIndex(car => 
        car.marca === match.marca.trim() &&
        car.modelo === match.modelo.trim() &&
        car.ano === match.ano &&
        car.cor === match.cor.trim()
    );

    if (index === -1) {
        throw new Error('Carro não encontrado');
    }

    const carroAtual = _data[index];
    let { marca: novaMarca, modelo: novoModelo, ano: novoAno, cor: novaCor } = carroAtual;

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

    const carroAtualizado = { marca: novaMarca, modelo: novoModelo, ano: novoAno, cor: novaCor };
    _data[index] = carroAtualizado;

    return { ...carroAtualizado };
}

async function del({ marca, modelo, ano, cor }) {
    validateNonEmpty(marca, 'marca');
    validateNonEmpty(modelo, 'modelo');
    if (typeof ano !== 'number' || ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(cor, 'cor');

    const initialLength = _data.length;
    _data = _data.filter(car => 
        !(car.marca === marca.trim() &&
          car.modelo === modelo.trim() &&
          car.ano === ano &&
          car.cor === cor.trim())
    );

    return initialLength > _data.length;
}

module.exports = {
    _reset,
    list,
    get,
    create,
    update,
    del
};