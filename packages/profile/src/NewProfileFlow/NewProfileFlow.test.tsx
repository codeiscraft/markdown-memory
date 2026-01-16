import '@testing-library/jest-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ConnectDetails, useGetServerRoot } from '@mdm/server-status'
import { asMock } from '@mdm/testing-support/mocks'
import { DefinedUseQueryResult } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import { NewProfileFlow } from './NewProfileFlow'

jest.mock('@mdm/server-status')
jest.mock('../ServerConnect/ServerConnect')
jest.mock('../ProfileForm/ProfileForm', () => ({
  ProfileForm: ({ serverRoot }: { serverRoot: string }) => <div>profile-form:{serverRoot}</div>,
}))

const renderNewProfileFlow = (ui?: ReactNode) =>
  render(<ChakraProvider value={defaultSystem}>{ui ?? <NewProfileFlow />}</ChakraProvider>)

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

describe('NewProfileFlow', () => {
  test('renders the step titles', () => {
    asMock(useGetServerRoot).mockReturnValue(mockGetServerRoot({ data: { serverRoot } }))

    renderNewProfileFlow()

    expect(screen.getByText('connect'))
    expect(screen.getByText('profile'))
    expect(screen.getByText('sets'))
    expect(screen.getByText('sync'))
  })

  test('disables next by default', () => {
    asMock(useGetServerRoot).mockReturnValue(mockGetServerRoot({ data: { serverRoot: '' } }))

    renderNewProfileFlow()

    expect(screen.getByRole('button', { name: 'next' })).toBeDisabled()
  })
})
