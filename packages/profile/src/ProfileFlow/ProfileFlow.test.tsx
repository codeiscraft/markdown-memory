import '@testing-library/jest-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { useGetConnectDetails } from '@mdm/server-status'
import { asMock } from '@mdm/testing-support/mocks'
import { mockGetDefinedQuery } from '@mdm/testing-support/query'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import { ProfileFlow } from './ProfileFlow'

jest.mock('@mdm/server-status')
jest.mock('../ServerConnect/ServerConnect')
jest.mock('../ProfileForm/ProfileForm', () => ({
  ProfileForm: ({ serverRoot }: { serverRoot: string }) => <div>profile-form:{serverRoot}</div>,
}))

const profileName = 'test-profile'
const renderNewProfileFlow = (ui?: ReactNode) =>
  render(
    <ChakraProvider value={defaultSystem}>
      {ui ?? <ProfileFlow verifyDirectoryExists={jest.fn()} />}
    </ChakraProvider>,
  )

const serverRoot = 'http://localhost:8200'

describe('NewProfileFlow', () => {
  test('renders the step titles', () => {
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery({ data: { profileName, serverRoot } }),
    )

    renderNewProfileFlow()

    // expect(screen.getByText('connect'))
    // expect(screen.getByText('profile'))
  })

  test('disables next by default', () => {
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery({ data: { profileName, serverRoot: '' } }),
    )

    renderNewProfileFlow()

    expect(screen.getByRole('button', { name: 'next' })).toBeDisabled()
  })
})
