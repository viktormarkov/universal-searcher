import { createMenuItem, setMenuItemOnClickedListener } from '../../src/js/context_menu.js'
import { chrome } from 'jest-chrome'

describe('#createMenuItem', () => {
  test('should call chrome api for menu item creation with valid params', () => {
    createMenuItem({ title: 'my_title', url: 'www.example.com/search=####' })
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
    setMenuItemOnClickedListener(() => {})
    expect(chrome.contextMenus.onClicked.hasListeners()).toBe(true)
  })
})
