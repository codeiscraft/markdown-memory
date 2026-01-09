import { fetchTyped } from './fetch'

const testResponse = { foo: 'bar' }
const setupFetchMock = (ok = true) => {
  const fetchMock = jest.fn()
  fetchMock.mockImplementation(() =>
    Promise.resolve({ json: jest.fn().mockResolvedValue(testResponse), ok }),
  )

  global.fetch = fetchMock
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
