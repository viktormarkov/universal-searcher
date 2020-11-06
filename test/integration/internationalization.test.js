import { chrome } from 'jest-chrome'
import localization from '../../src/js/html_localization.js'

describe('internationalization', () => {
  beforeEach(() => {
    document.body.innerHTML =
    `
      <html>
      <label id="title_lable_id" for="title_id">__MSG_title_label__</label>
      <input id="title_id" placeholder="__MSG_title_placeholder__" />
      </html>
    `

    chrome.i18n.getMessage.mockImplementation(key => {
      switch(key) {
        case 'title_label':
          return 'localized_label'
        case 'title_placeholder':
          return 'localized_placeholder'
        default: 
          return ""  

      }
    })
  })

  test('should replace innerHTML keys by localized texts', () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const titleLabel = document.getElementById('title_lable_id')
    expect(titleLabel.innerHTML).toBe('localized_label')
  })

  test('should replace placeholder keys by localized texts', () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const titleInput = document.getElementById('title_id')
    expect(titleInput.placeholder).toBe('localized_placeholder')
  })
})