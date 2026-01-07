import { logError, logGet, logSet } from './logging'

describe('logging helpers', () => {
  test('logSet', () => {
    const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    logSet('theKey', 60)

    expect(logSpy).toHaveBeenCalledWith('set | key: theKey | ttl: 60')
  })

  test('logSet, no ttl', () => {
    const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    logSet('theKey')

    expect(logSpy).toHaveBeenCalledWith('set | key: theKey | ttl: none')
  })

  test('logGet', () => {
    const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    logGet('theKey', 'theType')

    expect(logSpy).toHaveBeenCalledWith('get theType | key: theKey')
  })

  test('logError', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const testError = new Error('test')
    logError(testError)

    expect(logSpy).toHaveBeenCalledWith(testError)
  })
})
