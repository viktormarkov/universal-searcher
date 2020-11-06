import contextMenu from './context_menu.js'
import storage from './storage.js'

var listOfSourcesElement = null
var sourceCreationFormElement = null

function saveSearchSource(event) {
  event.preventDefault()
  const newSource = {
    title: event.target.title.value,
    url: event.target.url.value
  }

  storage.setSearchSource(newSource, () => {
    contextMenu.createMenuItem(newSource)
    addSourceToHtmlList(listOfSourcesElement, newSource)
    sourceCreationFormElement.reset()
  });
}

function displaySearchSources() {
  storage.getSearchSources(sources => {
    sources.forEach(source => {
      addSourceToHtmlList(listOfSourcesElement, source)
    })
  })
}

function addSourceToHtmlList(list, source) { 
  list.appendChild(createListItemElement(source));
}

function createListItemElement(source) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${source.title} ${source.url}`

  const removeBtn = document.createElement('input')
  removeBtn.setAttribute('type', 'button')
  removeBtn.setAttribute('value', chrome.i18n.getMessage('remove'))
  removeBtn.setAttribute('style', 'display: block')
  removeBtn.addEventListener('click', event => removeSource(source, listItem))
  listItem.appendChild(removeBtn)

  return listItem
}

function removeSource(source, listItem) {
  storage.removeSearchSource(source, () => {
    contextMenu.removeMenuItem(source, () => {
      listItem.remove()
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  listOfSourcesElement = document.getElementById('search_sources')
  sourceCreationFormElement = document.getElementById('add_search_source')
  sourceCreationFormElement.addEventListener('submit', saveSearchSource)
  displaySearchSources()
})