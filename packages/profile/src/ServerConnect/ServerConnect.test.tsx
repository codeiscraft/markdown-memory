import type { ConnectDetails } from '@mdm/server-status'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { useGetServerRoot, useSetServerRoot } from '@mdm/server-status'
import { asMock } from '@mdm/testing-support/mocks'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'

import { ServerConnect } from './ServerConnect'

let connectSuccessValue: boolean | null = null

jest.mock('@mdm/server-status', () => ({
  ServerStatus: ({ connectSuccess }: { connectSuccess: (connected: boolean) => void }) => {
    if (connectSuccessValue !== null) {
      connectSuccess(connectSuccessValue)
    }
    return null
  },
  useGetServerRoot: jest.fn(),
  useSetServerRoot: jest.fn(),
}))

const renderServerConnect = (setIsStepValid = jest.fn()) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <ServerConnect setIsStepValid={setIsStepValid} />
    </ChakraProvider>,
  )

const serverRoot = 'http://localhost:8200'

const mockGetServerRoot = (data: ConnectDetails | undefined) =>
  asMock(useGetServerRoot).mockReturnValue({
    data,
  } as unknown as UseQueryResult<ConnectDetails, Error>)

const mockSetServerRoot = (mutate = jest.fn()) => {
  asMock(useSetServerRoot).mockReturnValue({
    mutate,
  } as unknown as UseMutationResult<ConnectDetails | null, Error, ConnectDetails, unknown>)
}

describe('ServerConnect', () => {
  beforeEach(() => {
    connectSuccessValue = null
  })

  test('prefills the input when server root is available', async () => {
    mockGetServerRoot({ serverRoot })
    mockSetServerRoot()

    renderServerConnect()

    screen.findByDisplayValue(serverRoot)
  })

  test('calls setIsStepValid(false) on change', () => {
    const setIsStepValid = jest.fn()
    mockGetServerRoot({ serverRoot })
    mockSetServerRoot()

    renderServerConnect(setIsStepValid)

    fireEvent.change(
      screen.getByPlaceholderText('enter the address for your markdown memory server'),
      {
        target: { value: 'http://localhost:8300' },
      },
    )

    expect(setIsStepValid).toHaveBeenCalledWith(false)
  })

  test('calls mutate with a valid url', () => {
    const mutate = jest.fn()
    mockGetServerRoot({ serverRoot })
    mockSetServerRoot(mutate)

    renderServerConnect()

    fireEvent.change(
      screen.getByPlaceholderText('enter the address for your markdown memory server'),
      {
        target: { value: 'http://localhost:8301' },
      },
    )

    expect(mutate).toHaveBeenCalledWith({ serverRoot: 'http://localhost:8301' })
  })

  test('does not call mutate with an invalid url', () => {
    const mutate = jest.fn()
    mockGetServerRoot({ serverRoot: '' })
    mockSetServerRoot(mutate)

    renderServerConnect()

    fireEvent.change(
      screen.getByPlaceholderText('enter the address for your markdown memory server'),
      {
        target: { value: 'not-a-url' },
      },
    )

    expect(mutate).not.toHaveBeenCalled()
  })

  test('marks step valid when ServerStatus reports success', () => {
    const setIsStepValid = jest.fn()
    connectSuccessValue = true
    mockGetServerRoot({ serverRoot })
    mockSetServerRoot()

    renderServerConnect(setIsStepValid)

    expect(setIsStepValid).toHaveBeenCalledWith(true)
  })
})
