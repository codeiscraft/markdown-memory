import { asMock } from '@mdm/testing-support/mocks'
import { fetchTyped } from '@mdm/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useServerIdentity } from './useServerIdentity'

jest.mock('@mdm/utils')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      retryDelay: 1,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const testIdentity = {
  apiVersion: '1',
  commit: 'abc123',
  product: 'markdown-memory',
  version: '0.0.2',
}

describe('useServerIdentity', () => {
  test('api/identity fetched and response returned', async () => {
    asMock(fetchTyped).mockResolvedValue(testIdentity)

    const { result } = renderHook(() => useServerIdentity('http://server-root:8000'), { wrapper })

    expect(result.current.isLoading).toBe(true)
    expect(fetchTyped).toHaveBeenCalledWith('http://server-root:8000/api/identity')

    await waitFor(() => expect(result.current.isPending).toBeFalsy())
    expect(result.current.data).toEqual(testIdentity)
  })
})
