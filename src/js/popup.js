import { createMenuItem } from './context_menu.js'
import { setSearchSource } from './storage.js'

function saveSearchSource(event) {
  const newSource = {
    title: event.target.title.value,
    url: event.target.url.value
  }

  setSearchSource(newSource, () => createMenuItem(newSource));
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add_search_source').addEventListener('submit', saveSearchSource)
})
