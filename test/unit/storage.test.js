import { getSearchSources, setSearchSource } from '../../src/js/storage.js'
import { chrome } from 'jest-chrome'

beforeEach(() => {
  chrome.storage.local.get.mockImplementation((message, callback) => {
    const mockedData = '[{"title":"my_title","url":"www.example.com/search=####"}]'
    callback({ unversal_search_sources: mockedData })
  })
});

describe('getSearchSources', () => {
  describe('with previosly saved search sources', () => {
    test('should return array of previosly saved search sources', () => {
      getSearchSources((sources) => {
        expect(sources).toStrictEqual([{ title: 'my_title', url: 'www.example.com/search=####' }])
      })
    })
  })

  describe('without previosly saved search sources', () => {
    beforeEach(() => {
      chrome.storage.local.get.mockImplementation((message, callback) => {
        callback({ unversal_search_sources: '[]' })
      })
    })

    test('should return empty array', () => {
      getSearchSources((sources) => expect(sources).toEqual([]))
    })
  })
})

describe('setSearchSource', () => {
  test('should add new source to the array of previosly saved search sources', () => {
    chrome.storage.local.set.mockImplementation((message, callback) => {
      expect(message).toStrictEqual({
        unversal_search_sources: '[{"title":"my_title","url":"www.example.com/search=####"},{"title":"new_title","url":"www.sample.com/q=####"}]'
      })
    })
    setSearchSource({ title: 'new_title', url: 'www.sample.com/q=####' }, () => {})
  })
})