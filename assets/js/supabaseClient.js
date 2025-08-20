
// assets/js/supabaseClient.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = window.localStorage.getItem('SUPABASE_URL') || 'https://ovcungilpuhbzsfqaltr.supabase.co'
const SUPABASE_ANON_KEY = window.localStorage.getItem('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92Y3VuZ2lscHVoYnpzZnFhbHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDA3NzYsImV4cCI6MjA3MTExNjc3Nn0.3gM0PKhMHmD-EGt6ZbP4G8CdzADndwo1ieRluGSESTU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export async function getSessionProfile() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { session: null, profile: null }
  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
  if (error) return { session, profile: null }
  return { session, profile }
}
