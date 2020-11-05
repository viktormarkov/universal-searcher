import { createMenuItem, setMenuItemOnClickedListener } from './context_menu.js'
import { getSearchSources } from './storage.js'

function onMenuItemClickedCallback(info, tab) {
  chrome.tabs.create({ url: createSearchUrl(info.menuItemId, info.selectionText) })
}

function createSearchUrl(url, searchPhrase) {
  return url.replace('####', searchPhrase)
}

document.addEventListener('DOMContentLoaded', () => {
  setMenuItemOnClickedListener(onMenuItemClickedCallback)
  getSearchSources(sources => {
    sources.forEach(source => createMenuItem(source))
  })
})