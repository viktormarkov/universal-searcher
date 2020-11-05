function createMenuItem(source) {
  chrome.contextMenus.create({
    id: source.url,
    title: source.title,
    contexts: ['selection']
  })
}

function setMenuItemOnClickedListener(listener) {
  chrome.contextMenus.onClicked.addListener(listener)
}

export { createMenuItem, setMenuItemOnClickedListener }