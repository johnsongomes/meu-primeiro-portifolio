// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

const app = express();
app.use(express.json());

const GITHUB_TOKEN = process.env.GH_TOKEN;
const REPOSITORY = process.env.GITHUB_REPOSITORY || 'johnsongomes/meu-primeiro-portifolio';
const [OWNER, REPO] = REPOSITORY.split('/');

if (!GITHUB_TOKEN) {
  console.error('Erro: ambiente GH_TOKEN não configurado.');
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function triggerGitHubDispatch(contatos) {
  await octokit.repos.createDispatchEvent({
    owner: OWNER,
    repo: REPO,
    event_type: 'contato-salvo',
    client_payload: { contatos },
  });
}

app.post('/api/contato', async (req, res) => {
  try {
    const contatosPath = path.join(__dirname, 'contatos.json');
    const contatos = fs.existsSync(contatosPath)
      ? JSON.parse(fs.readFileSync(contatosPath, 'utf8'))
      : [];

    const novoContato = { ...req.body, data: new Date().toISOString() };
    contatos.push(novoContato);
    fs.writeFileSync(contatosPath, JSON.stringify(contatos, null, 2), 'utf8');

    await triggerGitHubDispatch(contatos);

    return res.json({ ok: true, total: contatos.length });
  } catch (error) {
    console.error('Falha no endpoint /api/contato:', error);
    return res.status(500).json({ ok: false, message: 'Erro interno', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});