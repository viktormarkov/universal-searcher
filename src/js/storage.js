function getSearchSources(callback) {
  chrome.storage.local.get(['unversal_search_sources'], (result) => {
    var sources = result.unversal_search_sources
    sources = sources ? JSON.parse(sources) : []
    callback(sources)
  })
}

function setSearchSource(source, callback) {
  getSearchSources(function (sources) {
    sources.push(source)
    chrome.storage.local.set({ unversal_search_sources: JSON.stringify(sources) }, callback)
  })
}

export { getSearchSources, setSearchSource }