// assets/js/api.js
import { supabase } from './supabaseClient.js'

export const Books = {
  list: async () => {
    const { data, error } = await supabase.from('books').select('*').order('order_index', { ascending: true })
    if (error) throw error
    return data
  },
  create: async (payload) => supabase.from('books').insert(payload).select().single(),
  update: async (id, patch) => supabase.from('books').update(patch).eq('id', id).select().single(),
  remove: async (id) => supabase.from('books').delete().eq('id', id)
}

export const Chapters = {
  listByBook: async (bookId) => {
    const { data, error } = await supabase.from('chapters').select('*').eq('book_id', bookId).order('order_index', { ascending: true })
    if (error) throw error
    return data
  },
  create: async (payload) => supabase.from('chapters').insert(payload).select().single(),
  update: async (id, patch) => supabase.from('chapters').update(patch).eq('id', id).select().single(),
  remove: async (id) => supabase.from('chapters').delete().eq('id', id)
}

export const Lessons = {
  listByChapter: async (chapterId) => {
    const { data, error } = await supabase.from('lessons').select('*').eq('chapter_id', chapterId).order('created_at', { ascending: true })
    if (error) throw error
    return data
  },
  create: async (payload) => supabase.from('lessons').insert(payload).select().single(),
  update: async (id, patch) => supabase.from('lessons').update(patch).eq('id', id).select().single(),
  remove: async (id) => supabase.from('lessons').delete().eq('id', id)
}

export const Questions = {
  listRandomByChapter: async (chapterId, count) => {
    // Prefer RPC if function exists; fallback to order('random()')
    const { data: rpc, error: rpcErr } = await supabase.rpc('get_random_questions', { p_chapter_id: chapterId, p_limit: count })
    if (!rpcErr && rpc) return rpc
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('chapter_id', chapterId)
      .order('random()')
      .limit(count)
    if (error) throw error
    return data
  },
  create: async (payload) => supabase.from('questions').insert(payload).select().single(),
  bulkInsert: async (rows) => supabase.from('questions').insert(rows),
  update: async (id, patch) => supabase.from('questions').update(patch).eq('id', id).select().single(),
  remove: async (id) => supabase.from('questions').delete().eq('id', id)
}

export const Attempts = {
  createAttempt: async (payload) => {
    const { data, error } = await supabase.from('quiz_attempts').insert(payload).select().single()
    if (error) throw error
    return data
  },
  completeAttempt: async (id, patch) => {
    const { data, error } = await supabase.from('quiz_attempts').update(patch).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  insertAnswers: async (rows) => {
    const { data, error } = await supabase.from('quiz_attempt_answers').insert(rows).select()
    if (error) throw error
    return data
  },
  listMine: async () => {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*, books(title), chapters(title)')
      .order('started_at', { ascending: false })
    if (error) throw error
    return data
  }
}
