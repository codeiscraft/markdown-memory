import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        retryDelay: 1,
      },
    },
  })

export const testQueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient()}>{children}</QueryClientProvider>
)
