# 🚀 Integração Supabase - Guia de Configuração

## 1️⃣ Criar Conta no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **Sign Up** e faça login com GitHub
3. Crie um novo projeto:
   - Nome: `johnsongomes's Project`
   - Região: `South America (São Paulo)` 
   - Senha do banco: Guarde com segurança

## 2️⃣ Criar Tabela de Contatos

No painel do Supabase:

1. Vá para **SQL Editor** (ou crie uma tabela via interface)
2. Execute este SQL:

```sql
CREATE TABLE contatos (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mensagem TEXT NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar read/write para usuários anônimos
ALTER TABLE contatos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contacts"
  ON contatos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read contacts"
  ON contatos
  FOR SELECT
  TO authenticated
  USING (true);
```

## 3️⃣ Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. No painel do Supabase, vá em **Settings > API**

3. Copie as credenciais:
   - `Project URL` → Cole em `VITE_SUPABASE_URL`
   - `anon public` → Cole em `VITE_SUPABASE_ANON_KEY`

Seu `.env` deve ficar assim:
```
VITE_SUPABASE_URL=https://neyxzaqxwbhndgzurfna.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_VSiqjz91xYnkDwC3F-HPtg_Tl0WUhkE
```

## 4️⃣ Instalar Dependências

```bash
npm install
```

## 5️⃣ Usar o Projeto

Se estiver usando **Vite**:
```bash
npm run dev
```

Se estiver usando **Node.js puro**, você precisa de um bundler ou usar módulos ES6.

## 6️⃣ Testar o Formulário de Contato

1. Abra [http://localhost:5173/pages/contato.html](http://localhost:5173/pages/contato.html)
2. Preencha o formulário
3. Clique em "Enviar"
4. Veja os contatos salvos no Supabase em **Table Editor > contatos**

## 📝 Arquivos Criados/Modificados

- ✅ `Js/supabaseClient.js` - Cliente Supabase
- ✅ `Js/contato.js` - Lógica do formulário (reescrito)
- ✅ `.env.example` - Modelo de variáveis
- ✅ `pages/contato.html` - Adicionado script module
- ✅ `package.json` - Adicionada dependência @supabase/supabase-js

## 🔒 Segurança

**.env NÃO DEVE ser commitado!** 

Já está em `.gitignore`? Verifique:
```bash
echo ".env" >> .gitignore
```

## 🆘 Problemas Comuns

**"Cannot find module '@supabase/supabase-js'"**
- Execute: `npm install`

**"Variáveis de ambiente do Supabase não configuradas"**
- Verifique se `.env` existe e está preenchido corretamente
- Se usar Vite, reinicie o servidor

**"Erro ao salvar contato: No 'Authorization' header was passed"**
- Isso é normal em função anônima
- Verifique as RLS policies SQL acima

**"CORS Error"**
- No Supabase, vá em **Settings > API > CORS**
- Adicione seu domínio local: `http://localhost:5173`
