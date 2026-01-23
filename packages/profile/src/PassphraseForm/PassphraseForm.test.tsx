import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ConnectDetails, useGetConnectDetails } from '@mdm/server-status'
import { asMock } from '@mdm/testing-support/mocks'
import { mockGetDefinedQuery } from '@mdm/testing-support/query'
import { generateEncryptionProfile, generateUserSalt } from '@mdm/utils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'

import { PassphraseForm } from './PassphraseForm'

jest.mock('@mdm/utils')

const profileName = 'test-profile'
const salt = 'fixed-salt-value' as unknown as ReturnType<typeof generateUserSalt>
const serverRoot = 'http://test-mdm'
const connectDetails = { data: { profileName, serverRoot } }

const renderPassphraseForm = (ui?: ReactNode) =>
  render(<ChakraProvider value={defaultSystem}>{ui ?? <PassphraseForm />}</ChakraProvider>)

describe('PassphraseForm', () => {
  beforeEach(() => {
    asMock(generateUserSalt).mockReturnValue(salt)
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery<ConnectDetails>(connectDetails),
    )
  })

  test('generates crypto once passphrase is entered', async () => {
    renderPassphraseForm()

    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/passphrase/i), 'secret')

    expect(generateEncryptionProfile).toHaveBeenCalledWith('secret', salt)
  })
})
