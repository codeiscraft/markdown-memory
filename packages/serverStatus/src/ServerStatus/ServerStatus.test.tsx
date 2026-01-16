import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { asMock } from '@mdm/testing-support/mocks'
import { DefinedUseQueryResult, UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { ConnectDetails } from '../types'
import { useGetConnectDetails } from '../useGetConnectDetails/useGetConnectDetails'
import { ServerIdentity, useServerIdentity } from '../useServerIdentity/useServerIdentity'
import { useSetConnectDetails } from '../useSetConnectDetails/useSetConnectDetails'
import { ServerStatus } from './ServerStatus'

jest.mock('../useSetConnectDetails/useSetConnectDetails')
jest.mock('../useGetConnectDetails/useGetConnectDetails')
jest.mock('../useServerIdentity/useServerIdentity')

const renderServerStatus = () =>
  render(
    <ChakraProvider value={defaultSystem}>
      <ServerStatus />
    </ChakraProvider>,
  )

const mockServerIdentity = ({
  data,
  isFetching,
  isSuccess,
}: Partial<DefinedUseQueryResult<ServerIdentity, unknown>>) =>
  ({
    data,
    isFetching,
    isSuccess,
  }) as unknown as UseQueryResult<ServerIdentity, Error>

const mockGetServerRoot = ({
  data,
  isFetching,
  isSuccess,
}: Partial<DefinedUseQueryResult<ConnectDetails, Error>>) =>
  ({
    data,
    isFetching,
    isSuccess,
  }) as unknown as DefinedUseQueryResult<ConnectDetails, Error>

const mockSetConnectDetails = (
  overrides?: Partial<UseMutationResult<ConnectDetails | null, Error>>,
) =>
  ({
    isPending: false,
    isSuccess: false,
    mutate: jest.fn(),
    ...overrides,
  }) as unknown as UseMutationResult<ConnectDetails | null, Error, ConnectDetails>

const serverRoot = 'http://localhost:8200'

describe('ServerStatus', () => {
  test('shows a prompt when identity is missing', () => {
    asMock(useGetConnectDetails).mockReturnValue(mockGetServerRoot({ data: { serverRoot } }))
    asMock(useSetConnectDetails).mockReturnValue(mockSetConnectDetails())
    asMock(useServerIdentity).mockReturnValue(
      mockServerIdentity({
        data: undefined,
        isFetching: false,
        isSuccess: false,
      }),
    )

    renderServerStatus()

    expect(screen.getByText('please enter a valid markdown memory server address'))
  })

  test('renders server root and identity when available', () => {
    asMock(useGetConnectDetails).mockReturnValue(mockGetServerRoot({ data: { serverRoot } }))
    asMock(useServerIdentity).mockReturnValue(
      mockServerIdentity({
        data: {
          apiVersion: '1',
          commit: 'abc123',
          product: 'Markdown Memory',
          version: '1.2.3',
        },
        isFetching: false,
        isSuccess: true,
      }),
    )

    renderServerStatus()

    expect(screen.getByText(serverRoot))
    expect(screen.getByText('Markdown Memory v1.2.3'))
  })

  test('marks the icon button as loading while fetching', () => {
    asMock(useGetConnectDetails).mockReturnValue(mockGetServerRoot({ data: { serverRoot } }))
    asMock(useServerIdentity).mockReturnValue(
      mockServerIdentity({
        data: undefined,
        isFetching: true,
        isSuccess: false,
      }),
    )

    renderServerStatus()

    const button = screen.getByRole('button')
    const isLoading =
      button.getAttribute('data-loading') !== null ||
      button.getAttribute('aria-busy') === 'true' ||
      button.hasAttribute('disabled')

    expect(isLoading).toBe(true)
  })
})
