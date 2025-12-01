# CRUD de Carros — QTS 2025
trabalho desenvolvido para a matéria de QTS do curso de desenvolvimento de sistemas

### CRUD — Node.js + SQLite + TDD + Selenium + POM

Projeto de CRUD completo usando:
- Node.js (Express)
- SQLite
- Testes com Jest
- Selenium + Page Object Model
- TDD (Test Driven Development)


## 🎯 Tema do Sistema — Carros

Cada carro possui:
- `modelo` (string)
- `marca` (string)
- `ano` (string/number)
- `cor` (string)

# 🏗️ Estrutura

backend/
frontend/
selenium/

# 🚀 Como Executar

## 1️⃣ Instalar dependências
npm install

sql
Copy code

## 2️⃣ Criar tabela SQLite
Entre na pasta `backend/database` e execute:

CREATE TABLE carros (
  modelo TEXT NOT NULL,
  marca TEXT NOT NULL,
  ano TEXT NOT NULL,
  cor TEXT NOT NULL
);


rode o comando a seguir para testar:
npm test
