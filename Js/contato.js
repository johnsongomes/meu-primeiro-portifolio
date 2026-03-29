// contato.js - Salva contatos direto no repositório do GitHub
const GITHUB_TOKEN = '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'; // Configure com um Personal Access Token
const REPO_OWNER = 'johnsongomes';
const REPO_NAME = 'meu-primeiro-portifolio';
const FILE_PATH = 'Js/contatos.json';

async function salvarContatoNoGitHub(novoContato) {
  try {
    // 1. Obter conteúdo atual
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+raw'
        }
      }
    );

    let contatos = [];
    let sha = null;

    if (response.ok) {
      const data = await response.json();
      contatos = JSON.parse(atob(data.content));
      sha = data.sha;
    }

    // 2. Adicionar novo contato
    novoContato.data = new Date().toISOString();
    contatos.push(novoContato);

    // 3. Fazer commit do arquivo atualizado
    const content = btoa(JSON.stringify(contatos, null, 2));
    
    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Novo contato salvo em ${new Date().toLocaleString('pt-BR')}`,
          content: content,
          sha: sha
        })
      }
    );

    if (updateResponse.ok) {
      console.log('✅ Contato salvo com sucesso no GitHub!');
      return { ok: true, total: contatos.length };
    } else {
      const error = await updateResponse.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('❌ Erro ao salvar contato:', error.message);
    return { ok: false, error: error.message };
  }
}

// Exemplo de uso no seu formulário:
// document.getElementById('form-contato').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const contato = {
//     nome: document.getElementById('nome').value,
//     email: document.getElementById('email').value,
//     mensagem: document.getElementById('mensagem').value
//   };
//   await salvarContatoNoGitHub(contato);
// });
