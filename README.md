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

#### Fase RED (Teste falha)

#### Fase GREEN  
#### Fase REFACTOR (Melhorar o código)


# Instruções
instalar jest:

npm install --save-dev jest

npx jest

teste individual:
npx jest tests/carros.test.js


## Grupo: Gabriel e João Prado
Disciplina: Qualidade e Teste de Software
Professor: Prof. Ovídio J. Francisco
npm ou yarn
