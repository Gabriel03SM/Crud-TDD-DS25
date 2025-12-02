
const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const db = new sqlite3.Database(path.join(__dirname, "carros.db"))




function validateNonEmpty(value, field) {
  if (!value || String(value).trim() === "") {
    throw new Error(`${field} é obrigatório`);
  }
}




async function _reset() {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM carros", [], err => err ? reject(err) : resolve());
  });
}

async function list() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM carros", [], (err, rows) => {
      if (err) reject(err)
      resolve(rows.map(r => ({ ...r })))
    });
  });
}

async function get({ modelo, marca }) {
  validateNonEmpty(modelo, "modelo");
  validateNonEmpty(marca, "marca");

  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM carros WHERE modelo=? AND marca=? LIMIT 1",
      [modelo.trim(), marca.trim()],
      (err, row) => {
        if (err) reject(err);
        resolve(row ? { ...row } : null);
      }
    );
  });
}

async function create({ modelo, marca, ano, cor }) {
  validateNonEmpty(modelo, "modelo");
  validateNonEmpty(marca, "marca");
  validateNonEmpty(ano, "ano");
  validateNonEmpty(cor, "cor");

  const item = {
    modelo: modelo.trim(),
    marca: marca.trim(),
    ano: ano.toString().trim(),
    cor: cor.trim()
  };

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO carros (modelo, marca, ano, cor) VALUES (?, ?, ?, ?)",
      [item.modelo, item.marca, item.ano, item.cor],
      err => {
        if (err) reject(err);
        resolve({ ...item });
      }
    );
  });
}

async function update(match, patch) {
  validateNonEmpty(match.modelo, "modelo");
  validateNonEmpty(match.marca, "marca");

  const found = await get(match);
  if (!found) throw new Error("não encontrado");

  const updated = {
    modelo: patch.modelo ? patch.modelo.trim() : found.modelo,
    marca: patch.marca ? patch.marca.trim() : found.marca,
    ano: patch.ano ? patch.ano.toString().trim() : found.ano,
    cor: patch.cor ? patch.cor.trim() : found.cor,
  };

  validateNonEmpty(updated.modelo, "modelo");
  validateNonEmpty(updated.marca, "marca");
  validateNonEmpty(updated.ano, "ano");
  validateNonEmpty(updated.cor, "cor");




  
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE carros SET modelo=?, marca=?, ano=?, cor=? WHERE modelo=? AND marca=?",
      [
        updated.modelo, updated.marca, updated.ano, updated.cor,
        match.modelo.trim(), match.marca.trim()
      ],
      err => {
        if (err) reject(err);
        resolve({ ...updated });
      }
    );
  });
}

async function del({ modelo, marca }) {
  validateNonEmpty(modelo, "modelo");
  validateNonEmpty(marca, "marca");

  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM carros WHERE modelo=? AND marca=?",
      [modelo.trim(), marca.trim()],
      function (err) {
        if (err) reject(err);
        resolve(this.changes > 0);
      }
    );
  });
}

module.exports = { _reset, list, get, create, update, del };
