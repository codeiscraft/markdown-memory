import { asMock } from '@mdm/testing-support/mocks'

import { mockRequest } from '../testing-support/request'
import { mockResponse } from '../testing-support/response'
import get from './get'
import { commit, version } from './util'

jest.mock('./util')

describe('GET /identity', () => {
  test('returns server identity', async () => {
    asMock(version).mockReturnValue('0.0.0')
    asMock(commit).mockReturnValue('abc123')
    const request = mockRequest()
    const response = mockResponse()

    const getFn = get()
    const result = await getFn(request, response)

    expect(response.status).not.toHaveBeenCalled()

    expect(result).toEqual({
      apiVersion: 1,
      commit: 'abc123',
      product: 'markdown-memory',
      version: '0.0.0',
    })
  })
})
