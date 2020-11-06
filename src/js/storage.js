function getSearchSources(callback) {
  chrome.storage.local.get(['unversal_search_sources'], (result) => {
    var sources = result.unversal_search_sources
    sources = sources ? JSON.parse(sources) : []
    callback(sources)
  })
}

function setSearchSources(sources, callback) {
  chrome.storage.local.set({ unversal_search_sources: JSON.stringify(sources) }, callback)
}

function setSearchSource(source, callback) {
  getSearchSources(sources => {
    sources.push(source)
    setSearchSources(sources, callback)
  })
}

function removeSearchSource(source, callback) {
  getSearchSources(sources => {
    sources = sources.filter(val => val.url !== source.url)
    setSearchSources(sources, callback)
  })
}

export default { getSearchSources, setSearchSource, removeSearchSource }