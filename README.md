# Descrição do Projeto
Sistema completo para cadastro e consulta de registros de carros, implementando backend, API REST, interface web e testes automatizados seguindo práticas de TDD e Design Patterns.

 Tema: CRUD de Carros
Cada registro de carro possui 4 campos:

marca (string, obrigatório)
modelo (string, obrigatório)
ano (number, obrigatório, positivo)
cor (string, obrigatório)

##  Tecnologias Utilizadas
Backend: Node.js, Express

Banco de Dados: SQLite (com SQLite3)
Testes Unitários: Jest
Testes de API: Supertest

## Tipos de Testes Implementados
1. Testes Unitários (Jest)
Testes das operações CRUD no repositório

Validações de entrada de dados

Cobertura completa das funções: list(), get(), create(), update(), del()

2. Testes de Integração/API (Supertest)
Testes das rotas REST da API

Validação de respostas HTTP

Testes de casos de sucesso e erro

🔄 TDD na Prática
Seguimos rigorosamente o ciclo Red → Green → Refactor:


📝 Exemplo Concreto: Implementação da função create()
### Fase RED (Teste falha)

test('create cria um carro e persiste', async () => {
    const carro = { marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' };
    const criado = await repo.create(carro);
    expect(criado).toEqual({ marca: 'Fiat', modelo: 'Uno', ano: 2020, cor: 'Vermelho' });
    // ❌ Teste FALHA: função create não existe


### Fase GREEN

async function create({ marca, modelo, ano, cor }) {
    const novoCarro = { marca, modelo, ano, cor };
    _data.push(novoCarro);
    return novoCarro;
}
    // ✅ Teste PASSA: função básica implementada

    
### Fase REFACTOR (Melhorar o código)
javascript
async function create({ marca, modelo, ano, cor }) {
    // Adiciona validações
    validateNonEmpty(marca, 'marca');
    validateNonEmpty(modelo, 'modelo');
    if (typeof ano !== 'number' || ano <= 0) {
        throw new Error('ano deve ser um número positivo');
    }
    validateNonEmpty(cor, 'cor');
    
// Código refatorado com validações e tratamento


## Pré-requisitos para executar o projeto
Node.js (v14 ou superior)



## Grupo: Gabriel e João Prado
Disciplina: Qualidade e Teste de Software
Professor: Prof. Ovídio J. Francisco
npm ou yarn
