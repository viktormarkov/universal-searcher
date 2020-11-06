import { chrome } from 'jest-chrome'
import options from '../../src/js/options.js'

beforeEach(() => {
  createHtmlPage()
  mockLocalStorage()
})

describe('creation of new search source', () => {
  beforeEach(() => {
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

  test('should create new html list item', () => {
    const list = document.getElementById("search_sources")
    expect(list.innerHTML).toMatch(/new_site/)
  })
})

describe('removing of a search source', () => {
  beforeEach(() => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
  })

  test('should remove item from storage', () => {
    const removeBtn = document.getElementsByTagName('li')[0].childNodes[1]
    removeBtn.dispatchEvent(new Event('click'))
    expect(chrome.contextMenus.remove).toBeCalled()
  })
})

describe('initialization', () => {
  beforeEach(() => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
  })

  test('should display existed sources', () => {
    const list = document.getElementById("search_sources")
    expect(list.children.length).toBe(1)
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
    <ul id="search_sources"></ul>
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