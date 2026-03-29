// server.js
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors()); // Permite requisições de qualquer origem
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve arquivos estáticos da pasta pai

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'usuarios',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function ensureContactsTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(30),
      email VARCHAR(50),
      mensagem TEXT,
      data DATETIME,
      payload JSON
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
  `);
}

ensureContactsTable().catch((error) => {
  console.error('Erro ao garantir tabela contatos MySQL:', error);
  process.exit(1);
});

app.post('/api/contato', async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;
    const data = new Date();

    // Salva no MySQL local
    const [result] = await pool.execute(
      'INSERT INTO contatos (nome, email, mensagem, data, payload) VALUES (?, ?, ?, ?, ?)',
      [nome || null, email || null, mensagem || null, data, JSON.stringify(req.body)]
    );

    return res.json({ ok: true, mysqlId: result.insertId });
  } catch (error) {
    console.error('Falha no endpoint /api/contato:', error);
    return res.status(500).json({ ok: false, message: 'Erro interno', error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Servidor iniciado em http://localhost:3001');
});