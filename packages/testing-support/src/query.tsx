import {
  DefinedUseQueryResult,
  QueryClient,
  QueryClientProvider,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query'

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

export function mockGetDefinedQuery<T>(overrides?: Partial<DefinedUseQueryResult<T, Error>>) {
  return {
    isFetching: false,
    isSuccess: false,
    ...overrides,
  } as unknown as DefinedUseQueryResult<T, Error>
}

export function mockGetQuery<T>(overrides?: Partial<UseQueryResult<T, Error>>) {
  return {
    isFetching: false,
    isSuccess: false,
    ...overrides,
  } as unknown as UseQueryResult<T, Error>
}

export function mockMutationResult<T>(overrides?: Partial<UseMutationResult<null | T, Error>>) {
  return {
    isPending: false,
    isSuccess: false,
    mutate: jest.fn(),
    ...overrides,
  } as unknown as UseMutationResult<null | T, Error, T>
}
