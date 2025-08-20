// assets/js/auth.js
import { supabase, getSessionProfile } from './supabaseClient.js'

export async function requireAuth(redirectIfNoAuth = '/auth.html') {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) window.location.href = redirectIfNoAuth
  return session
}

export async function requireEditor(redirectIfNoEditor = '/') {
  const { session, profile } = await getSessionProfile()
  if (!session) window.location.href = '/auth.html'
  if (!profile || profile.role !== 'editor') window.location.href = redirectIfNoEditor
  return { session, profile }
}

export async function signOutAndRedirect() {
  await supabase.auth.signOut()
  window.location.href = '/'
}

export function initAuthLinks() {
  const loginLink = document.querySelector('[data-link-login]')
  const signupLink = document.querySelector('[data-link-signup]')
  const profileLink = document.querySelector('[data-link-profile]')
  const editorLink = document.querySelector('[data-link-editor]')
  const logoutLink = document.querySelector('[data-link-logout]')
  const authLinks = [loginLink, signupLink, profileLink, editorLink, logoutLink].filter(Boolean)

  supabase.auth.onAuthStateChange(async () => {
    const { session, profile } = await getSessionProfile()
    authLinks.forEach(el => el && (el.style.display = 'none'))
    if (!session) {
      loginLink && (loginLink.style.display = 'inline-flex')
      signupLink && (signupLink.style.display = 'inline-flex')
    } else {
      profileLink && (profileLink.style.display = 'inline-flex')
      logoutLink && (logoutLink.style.display = 'inline-flex')
      if (profile?.role === 'editor') editorLink && (editorLink.style.display = 'inline-flex')
    }
  })

  logoutLink && logoutLink.addEventListener('click', (e) => {
    e.preventDefault()
    signOutAndRedirect()
  })
}
