import contextMenu from '../../src/js/context_menu.js'
import { chrome } from 'jest-chrome'

describe('#createMenuItem', () => {
  test('should call chrome api for menu item creation', () => {
    contextMenu.createMenuItem({ title: 'my_title', url: 'www.example.com/search=####' })
    expect(chrome.contextMenus.create).toBeCalledWith({
      id: 'www.example.com/search=####',
      title: 'my_title',
      contexts: ["selection"]
    })
  })
})

describe('#setMenuItemOnClickedListener', () => {
  test('should call chrome api and set callback', () => {
    expect(chrome.contextMenus.onClicked.hasListeners()).toBe(false)
    contextMenu.setMenuItemClickedListener(() => {})
    expect(chrome.contextMenus.onClicked.hasListeners()).toBe(true)
  })
})

describe('#removeMenuItem', () => {
  test('should call chrome api for removing item', () => {
    const callback = () => {}
    contextMenu.removeMenuItem({ title: 'my_title', url: 'www.example.com/search=####' }, callback)
    expect(chrome.contextMenus.remove).toBeCalledWith('www.example.com/search=####', callback)
  })
})
