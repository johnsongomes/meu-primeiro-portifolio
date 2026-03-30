const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'usuarios',
      ssl: { rejectUnauthorized: false }
    });

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contatos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(30),
        email VARCHAR(50),
        mensagem TEXT,
        data DATETIME,
        payload JSON
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    const { nome, email, mensagem } = req.body;
    const data = new Date();

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ ok: false, message: 'nome, email e mensagem são obrigatórios' });
    }

    const [result] = await connection.execute(
      'INSERT INTO contatos (nome, email, mensagem, data, payload) VALUES (?, ?, ?, ?, ?)',
      [nome, email, mensagem, data, JSON.stringify(req.body)]
    );

    return res.status(200).json({ ok: true, mysqlId: result.insertId });
  } catch (error) {
    console.error('[API/contato] Erro:', error);
    return res.status(500).json({ ok: false, message: 'Erro interno', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
};
