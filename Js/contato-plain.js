// contato-plain.js - Versão para HTML puro (sem Vite)
import { supabase } from './supabaseClientPlain.js'

async function salvarContatoNoSupabase(novoContato) {
  try {
    console.log('📤 Enviando contato:', novoContato)
    
    // Adicionar timestamp
    novoContato.criado_em = new Date().toISOString()
    
    // Inserir na tabela 'contatos' do Supabase
    const { data, error } = await supabase
      .from('contatos')
      .insert([novoContato])

    if (error) {
      console.error('❌ Erro do Supabase:', error)
      throw new Error(error.message)
    }

    console.log('✅ Contato salvo com sucesso!', data)
    alert('✅ Mensagem enviada com sucesso!')
    return { ok: true, data }
  } catch (error) {
    console.error('❌ Erro ao salvar contato:', error.message)
    alert('❌ Erro ao enviar: ' + error.message)
    return { ok: false, error: error.message }
  }
}

// Inicializar quando página carregar
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Página carregada')
  
  const formContato = document.getElementById('form-contato')
  
  if (formContato) {
    console.log('✅ Formulário encontrado')
    
    formContato.addEventListener('submit', async (e) => {
      e.preventDefault()
      console.log('📝 Formulário submetido')
      
      const botao = formContato.querySelector('button[type="submit"]')
      const textoBotao = botao.textContent
      botao.disabled = true
      botao.textContent = 'Enviando...'

      const contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        mensagem: document.getElementById('mensagem').value
      }

      console.log('📋 Dados do contato:', contato)
      await salvarContatoNoSupabase(contato)

      formContato.reset()
      botao.disabled = false
      botao.textContent = textoBotao
    })
  } else {
    console.error('❌ Formulário não encontrado!')
  }
})
