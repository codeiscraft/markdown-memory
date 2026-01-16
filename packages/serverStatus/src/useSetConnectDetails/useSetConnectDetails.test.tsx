import type { ReactNode } from 'react'

import { asMock } from '@mdm/testing-support/mocks'
import { queryClient } from '@mdm/testing-support/query'
import { fetchLocal } from '@mdm/utils'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useSetConnectDetails } from './useSetConnectDetails'

describe('useSetConnectDetails', () => {
  test('sets connect details in local storage', async () => {
    const client = queryClient()
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )
    client.setQueryData(['connectDetails'], 'cachedConnectDetails')
    const newData = { connected: true, serverRoot: 'newConnectDetails' }

    const { result } = renderHook(() => useSetConnectDetails(), { wrapper })

    await result.current.mutate(newData)

    await waitFor(() => expect(result.current.isPending).toBeFalsy())

    expect(asMock(fetchLocal)).toHaveBeenCalledWith('mdm.connectDetails', 'set', newData)
  })
})
