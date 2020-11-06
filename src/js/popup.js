import contextMenu from './context_menu.js'
import storage from './storage.js'

function saveSearchSource(event) {
  const newSource = {
    title: event.target.title.value,
    url: event.target.url.value
  }

  storage.setSearchSource(newSource, () => contextMenu.createMenuItem(newSource));
  return false;
}

function goToOptions() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('../html/options.html'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add_search_source').addEventListener('submit', saveSearchSource)
  document.getElementById('options_btn').addEventListener('click', goToOptions)
})
