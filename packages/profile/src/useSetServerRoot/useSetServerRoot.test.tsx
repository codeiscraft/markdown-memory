import { asMock } from '@mdm/testing-support/mocks'
import { testQueryWrapper as wrapper } from '@mdm/testing-support/query'
import { fetchLocal } from '@mdm/utils'
import { renderHook, waitFor } from '@testing-library/react'

import { useSetServerRoot } from './useSetServerRoot'

describe('useSetServerRoot', () => {
  test('sets server root in local storage', async () => {
    const { result } = renderHook(() => useSetServerRoot(), { wrapper })

    await result.current.mutate('newServerRoot')

    await waitFor(() => expect(result.current.isPending).toBeFalsy())

    expect(asMock(fetchLocal)).toHaveBeenCalledWith('mdm.serverRoot', 'set', 'newServerRoot')
  })
})
