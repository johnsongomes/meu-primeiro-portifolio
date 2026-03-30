// contato.js - Salva contatos no Supabase
import { supabase } from './supabaseClient.js'

async function salvarContatoNoSupabase(novoContato) {
  try {
    // Adicionar timestamp
    novoContato.criado_em = new Date().toISOString()
    
    // Inserir na tabela 'contatos' do Supabase
    const { data, error } = await supabase
      .from('contatos')
      .insert([novoContato])

    if (error) {
      throw new Error(error.message)
    }

    console.log('✅ Contato salvo com sucesso no Supabase!', data)
    return { ok: true, data }
  } catch (error) {
    console.error('❌ Erro ao salvar contato:', error.message)
    return { ok: false, error: error.message }
  }
}

async function buscarContatos() {
  try {
    const { data, error } = await supabase
      .from('contatos')
      .select('*')
      .order('criado_em', { ascending: false })

    if (error) throw new Error(error.message)
    
    return { ok: true, data }
  } catch (error) {
    console.error('❌ Erro ao buscar contatos:', error.message)
    return { ok: false, error: error.message }
  }
}

// Inicializar o formulário quando página carregar
document.addEventListener('DOMContentLoaded', () => {
  const formContato = document.getElementById('form-contato')
  
  if (formContato) {
    formContato.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      // Mostrar que está processando
      const botao = formContato.querySelector('button[type="submit"]')
      const textoBotao = botao.textContent
      botao.disabled = true
      botao.textContent = 'Enviando...'

      const contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        mensagem: document.getElementById('mensagem').value
      }

      const resultado = await salvarContatoNoSupabase(contato)

      if (resultado.ok) {
        alert('✅ Mensagem enviada com sucesso!')
        formContato.reset()
      } else {
        alert('❌ Erro ao enviar: ' + resultado.error)
      }

      // Restaurar botão
      botao.disabled = false
      botao.textContent = textoBotao
    })
  }
})
