import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { asMock } from '@mdm/testing-support/mocks'
import { DefinedUseQueryResult, UseQueryResult } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { ConnectDetails } from '../types'
import { useGetServerRoot } from '../useGetServerRoot/useGetServerRoot'
import { ServerIdentity, useServerIdentity } from '../useServerIdentity/useServerIdentity'
import { ServerStatus } from './ServerStatus'

jest.mock('../useGetServerRoot/useGetServerRoot')
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

const serverRoot = 'http://localhost:8200'

describe('ServerStatus', () => {
  test('shows a prompt when identity is missing', () => {
    asMock(useGetServerRoot).mockReturnValue(mockGetServerRoot({ data: { serverRoot } }))
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
    asMock(useGetServerRoot).mockReturnValue(mockGetServerRoot({ data: { serverRoot } }))
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
    asMock(useGetServerRoot).mockReturnValue(mockGetServerRoot({ data: { serverRoot } }))
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
