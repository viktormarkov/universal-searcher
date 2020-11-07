function createMenuItem(source) {
  chrome.contextMenus.create({
    id: source.url,
    title: source.title,
    contexts: ['selection']
  })
}

function removeMenuItem(source, callback) {
  chrome.contextMenus.remove(source.url, callback)
}

function setMenuItemClickedListener(listener) {
  chrome.contextMenus.onClicked.addListener(listener)
}

export default { createMenuItem, removeMenuItem, setMenuItemClickedListener }