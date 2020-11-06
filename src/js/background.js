import contextMenu from './context_menu.js'
import storage from './storage.js'

function onMenuItemClickedCallback(info, tab) {
  chrome.tabs.create({ url: createSearchUrl(info.menuItemId, info.selectionText) })
}

function createSearchUrl(url, searchPhrase) {
  return url.replace('####', searchPhrase)
}

document.addEventListener('DOMContentLoaded', () => {
  contextMenu.setMenuItemClickedListener(onMenuItemClickedCallback)
  storage.getSearchSources(sources => {
    sources.forEach(source => {
      contextMenu.createMenuItem(source)
    })
  })
})