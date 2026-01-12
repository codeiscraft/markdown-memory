import { asMock } from '@mdm/testing-support/mocks'

import { fetchLocal, fetchTyped } from './fetch'

const testResponse = { foo: 'bar' }
const setupFetchMock = (ok = true) => {
  const fetchMock = jest.fn()
  fetchMock.mockImplementation(() =>
    Promise.resolve({ json: jest.fn().mockResolvedValue(testResponse), ok }),
  )

  global.fetch = fetchMock
}

const setupLocalStorageMock = () => {
  jest.spyOn(Storage.prototype, 'setItem')
  jest.spyOn(Storage.prototype, 'getItem')
}

const testPath = 'http://path'
describe('fetchTyped', () => {
  test('returns JSON response if response OK', async () => {
    setupFetchMock()
    const result = await fetchTyped(testPath)

    expect(fetch).toHaveBeenCalledWith(testPath, { headers: undefined })
    expect(result).toEqual(testResponse)
  })

  test('throws error if response not OK', async () => {
    setupFetchMock(false)
    await expect(fetchTyped(testPath)).rejects.toThrow()
  })
})

describe('fetchLocal', () => {
  test('returns parsed result if match is found', async () => {
    setupLocalStorageMock()
    asMock(localStorage.getItem).mockReturnValueOnce(JSON.stringify({ key: 'value' }))

    const result = await fetchLocal('key', 'get')

    expect(localStorage.getItem).toHaveBeenCalledWith('key')
    expect(result).toEqual({ key: 'value' })
  })

  test('returns null if item undefined', async () => {
    setupLocalStorageMock()
    asMock(localStorage.getItem).mockReturnValueOnce(null)

    const result = await fetchLocal('key', 'get')

    expect(localStorage.getItem).toHaveBeenCalledWith('key')
    expect(result).toBeNull()
  })

  test('sets key with stringified value', async () => {
    setupLocalStorageMock()

    await fetchLocal('key', 'set', { key: 'value' })

    expect(localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify({ key: 'value' }))
  })

  test('throws errors if invalid operation', async () => {
    setupLocalStorageMock()

    await expect(
      fetchLocal('key', 'foo' as unknown as 'get' | 'set', { key: 'value' }),
    ).rejects.toThrow('invalid operation')
  })
})
