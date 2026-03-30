// supabaseClientPlain.js - Versão para HTML puro (sem Vite)
// Copie e cole suas credenciais aqui:

const SUPABASE_URL = 'https://neyxzaqxwbhndgzurfna.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_VSiqjz91xYnkDwC3F-HPtg_Tl0WUhkE'

// Importar Supabase do CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.38.0/+esm'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
