import { asMock } from '@mdm/testing-support/mocks'
import { testQueryWrapper as wrapper } from '@mdm/testing-support/query'
import { fetchLocal } from '@mdm/utils'
import { renderHook, waitFor } from '@testing-library/react'

import { useGetConnectDetails } from './useGetConnectDetails'

jest.mock('@mdm/utils')

describe('useGetConnectDetails', () => {
  test('retrieve server root from local storage', async () => {
    asMock(fetchLocal).mockReturnValue({ serverRoot: 'serverRoot' })

    const { result } = renderHook(() => useGetConnectDetails(), { wrapper })
    expect(fetchLocal).toHaveBeenCalledWith('mdm.connectDetails', 'get')
    await waitFor(() => expect(result.current.isPending).toBeFalsy())
    expect(result.current.data).toEqual({ serverRoot: 'serverRoot' })
  })

  test('handles missing value', async () => {
    asMock(fetchLocal).mockReturnValue(null)

    const { result } = renderHook(() => useGetConnectDetails(), { wrapper })

    expect(fetchLocal).toHaveBeenCalledWith('mdm.connectDetails', 'get')
    await waitFor(() => expect(result.current.isPending).toBeFalsy())
    expect(result.current.data).toBeNull()
  })
})
