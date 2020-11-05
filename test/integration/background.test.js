import { chrome } from 'jest-chrome'
import Background from '../../src/js/background.js'

describe('initialization of context menu', () => {
  test('already existed search sources should be added as menu items', () => {
    chrome.storage.local.get.mockImplementation((message, callback) => {
      const mockedData = '[{"title":"my_title","url":"www.example.com/search=####"}]'
      callback({ unversal_search_sources: mockedData })
    })
    document.dispatchEvent(new Event('DOMContentLoaded'))

    expect(chrome.contextMenus.create).toBeCalledWith({
      id: 'www.example.com/search=####',
      title: 'my_title',
      contexts: ["selection"]
    });
  })
})

describe('search event handlers', () => {
  beforeAll(() => {
    document.dispatchEvent(new Event('DOMContentLoaded'))
  });

  test('context menu has click listener', () => {
    expect(chrome.contextMenus.onClicked.hasListeners()).toBe(true)
  })

  test('new tab with correct url will be opened by click on context menu item', () => {
    const listener = chrome.contextMenus.onClicked.getListeners().values().next().value
    listener.call(this, {
      menuItemId: 'www.example.com/search=####',
      selectionText: '123'
    })

    expect(chrome.tabs.create).toBeCalledWith({ url: 'www.example.com/search=123' })
  })
})
