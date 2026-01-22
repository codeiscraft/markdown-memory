import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { asMock } from '@mdm/testing-support/mocks'
import { mockGetDefinedQuery, mockGetQuery, mockMutationResult } from '@mdm/testing-support/query'
import { render, screen } from '@testing-library/react'

import { useGetConnectDetails } from '../useGetConnectDetails/useGetConnectDetails'
import { ServerIdentity, useServerIdentity } from '../useServerIdentity/useServerIdentity'
import { useSetConnectDetails } from '../useSetConnectDetails/useSetConnectDetails'
import { ServerStatus } from './ServerStatus'

jest.mock('../useSetConnectDetails/useSetConnectDetails')
jest.mock('../useGetConnectDetails/useGetConnectDetails')
jest.mock('../useServerIdentity/useServerIdentity')

const profileName = 'test-profile'
const renderServerStatus = () =>
  render(
    <ChakraProvider value={defaultSystem}>
      <ServerStatus profileName={profileName} />
    </ChakraProvider>,
  )

const serverRoot = 'http://localhost:8200'

describe('ServerStatus', () => {
  test('shows a prompt when identity is missing', () => {
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery({ data: { profileName, serverRoot } }),
    )
    asMock(useSetConnectDetails).mockReturnValue(mockMutationResult())
    asMock(useServerIdentity).mockReturnValue(mockGetQuery<ServerIdentity>())

    renderServerStatus()

    expect(screen.getByText('please enter a valid markdown memory server address'))
  })

  test('renders server root and identity when available', () => {
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery({ data: { profileName, serverRoot } }),
    )
    asMock(useServerIdentity).mockReturnValue(
      mockGetQuery({
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
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery({ data: { profileName, serverRoot } }),
    )
    asMock(useServerIdentity).mockReturnValue(
      mockGetQuery<ServerIdentity>({
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
