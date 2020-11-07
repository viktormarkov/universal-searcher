import { chrome } from 'jest-chrome'
import popup from '../../src/js/popup.js'

beforeEach(() => {
  createHtmlPage()
})

describe('creation of new search source', () => {
  beforeEach(() => {
    mockLocalStorage()
    const form = document.getElementById("add_search_source")
    mockHtmlForm(form)
    document.dispatchEvent(new Event('DOMContentLoaded'));
    form.dispatchEvent(new Event('submit'))
  })

  test('should save new search source', () => {
    chrome.storage.local.set.mockImplementation((message, callback) => {
      expect(message).toStrictEqual({
        unversal_search_sources: '[{"title":"my_title","url":"www.example.com/search=####"},{"title":"new_site","url":"www.sample.com/q=####"}]'
      })
    })
  })

  test('should create new context menu item', () => {
    expect(chrome.contextMenus.create).toBeCalledWith({
      id: 'www.sample.com/q=####',
      title: 'new_site',
      contexts: ["selection"]
    })
  })
})

describe('options btn', () => {
  beforeEach(() => {
    chrome.runtime.openOptionsPage.mockImplementation(() => {})
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.getElementById("options_btn").click()
  })

  test('should open options page', () => {
    expect(chrome.runtime.openOptionsPage).toBeCalled()
  })
})

function mockLocalStorage() {
  chrome.storage.local.get.mockImplementation((message, callback) => {
    const mockedData = '[{"title":"new_site","url":"www.sample.com/q=####"}]'
    callback({ unversal_search_sources: mockedData })
  })
  chrome.storage.local.set.mockImplementation((message, callback) => callback())
}

function createHtmlPage() {
  document.body.innerHTML =
    `
    <form id="add_search_source">
    </form>
    <input id="options_btn" type="button"/>
    `
}

function mockHtmlForm(form) {
  form.addEventListener('submit', event => {
    Object.defineProperty(event, "target", {
      value: { title: { value: 'new_site' }, url: { value: 'www.sample.com/q=####' } },
      writable: false,
      configurable: false
    })

    return true
  })
}