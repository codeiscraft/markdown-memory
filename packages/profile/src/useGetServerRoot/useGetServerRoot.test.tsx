import { asMock } from '@mdm/testing-support/mocks'
import { testQueryWrapper as wrapper } from '@mdm/testing-support/query'
import { fetchLocal } from '@mdm/utils'
import { renderHook, waitFor } from '@testing-library/react'

import { useGetServerRoot } from './useGetServerRoot'

jest.mock('@mdm/utils')

describe('useGetServerRoot', () => {
  test('retrieve server root from local storage', async () => {
    asMock(fetchLocal).mockResolvedValue('serverRoot')

    const { result } = renderHook(() => useGetServerRoot(), { wrapper })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isPending).toBeFalsy())
    expect(result.current.data).toEqual('serverRoot')
  })
})
