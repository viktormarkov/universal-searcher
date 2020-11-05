import { chrome } from 'jest-chrome'
import Popup from '../../src/js/popup.js'

describe('creation of new search source', () => {
  beforeEach(() => {
    chrome.storage.local.get.mockImplementation((message, callback) => {
      const mockedData = '[{"title":"new_site","url":"www.sample.com/q=####"}]'
      callback({ unversal_search_sources: mockedData })
    })
    chrome.storage.local.set.mockImplementation((message, callback) => callback())

    document.body.innerHTML =
      '<form id="add_search_source">' +
      '</form>'

    const form = document.getElementById("add_search_source")
    form.addEventListener('submit', event => {
      Object.defineProperty(event, "target", {
        value: { title: { value: 'new_site' }, url: { value: 'www.sample.com/q=####' } },
        writable: false,
        configurable: false
      })

      return true
    })

    document.dispatchEvent(new Event("DOMContentLoaded"));
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