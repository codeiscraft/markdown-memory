import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ConnectDetails, useGetConnectDetails, useSetConnectDetails } from '@mdm/server-status'
import { asMock } from '@mdm/testing-support/mocks'
import { mockGetDefinedQuery, mockMutationResult } from '@mdm/testing-support/query'
import { fireEvent, render, screen } from '@testing-library/react'

import { ServerConnect } from './ServerConnect'

const connectSuccessValue: boolean | null = null

jest.mock('@mdm/server-status', () => ({
  ServerStatus: ({ connectSuccess }: { connectSuccess: (connected: boolean) => void }) => {
    if (connectSuccessValue !== null) {
      connectSuccess(connectSuccessValue)
    }
    return null
  },
  useGetConnectDetails: jest.fn(),
  useSetConnectDetails: jest.fn(),
}))

const profile = {
  name: 'Test Profile',
  slug: 'test-profile',
}
const renderServerConnect = () =>
  render(
    <ChakraProvider value={defaultSystem}>
      <ServerConnect profile={profile} />
    </ChakraProvider>,
  )

const serverRoot = 'http://localhost:8200'

describe('ServerConnect', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  test('prefills the input when server root is available', async () => {
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery<ConnectDetails>({ data: { serverRoot } }),
    )
    asMock(useSetConnectDetails).mockReturnValue(mockMutationResult())

    renderServerConnect()

    screen.findByDisplayValue(serverRoot)
  })

  test('calls mutate with a valid url', () => {
    const mutate = jest.fn()
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery<ConnectDetails>({ data: { serverRoot } }),
    )
    asMock(useSetConnectDetails).mockReturnValue(mockMutationResult({ mutate }))

    renderServerConnect()
    fireEvent.change(
      screen.getByPlaceholderText('enter the address for your markdown memory server'),
      {
        target: { value: 'http://localhost:8301' },
      },
    )
    jest.runAllTimers()

    expect(mutate).toHaveBeenCalledWith({ serverRoot: 'http://localhost:8301' })
  })

  test('displays the url with the profile slug', () => {
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery<ConnectDetails>({ data: { serverRoot } }),
    )

    renderServerConnect()
    fireEvent.change(
      screen.getByPlaceholderText('enter the address for your markdown memory server'),
      {
        target: { value: 'http://localhost:8301' },
      },
    )
    jest.runAllTimers()

    expect(screen.getByText('http://localhost:8301/test-profile')).toBeInTheDocument()
  })
})
