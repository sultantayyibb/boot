// assets/js/ui.js
export function $(sel, root = document) { return root.querySelector(sel) }
export function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)) }

export function toast(msg, type = 'info') {
  const t = document.createElement('div')
  t.className = `toast ${type}`
  t.textContent = msg
  document.body.appendChild(t)
  requestAnimationFrame(() => t.classList.add('show'))
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 250) }, 3000)
}

export function spinner(on = true) {
  const id = 'global-spinner'
  let el = document.getElementById(id)
  if (on && !el) {
    el = document.createElement('div')
    el.id = id
    el.innerHTML = '<div class="lds"></div>'
    document.body.appendChild(el)
  } else if (!on && el) {
    el.remove()
  }
}

export function renderOptions(selectEl, items, get = (x) => [x.id, x.title]) {
  selectEl.innerHTML = '<option value="">Select...</option>'
  for (const item of items) {
    const [value, label] = get(item)
    const opt = document.createElement('option')
    opt.value = value
    opt.textContent = label
    selectEl.appendChild(opt)
  }
}
