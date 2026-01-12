import type { ReactNode } from 'react'

import { asMock } from '@mdm/testing-support/mocks'
import { queryClient } from '@mdm/testing-support/query'
import { fetchLocal } from '@mdm/utils'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useSetServerRoot } from './useSetServerRoot'

describe('useSetServerRoot', () => {
  test('sets server root in local storage', async () => {
    const client = queryClient()
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )
    client.setQueryData(['serverRoot'], 'cachedServerRoot')
    const newData = { serverRoot: 'newServerRoot' }

    const { result } = renderHook(() => useSetServerRoot(), { wrapper })

    await result.current.mutate(newData)

    await waitFor(() => expect(result.current.isPending).toBeFalsy())

    expect(asMock(fetchLocal)).toHaveBeenCalledWith('mdm.serverRoot', 'set', newData)
    expect(client.getQueryData(['serverRoot'])).toBeUndefined()
  })
})
