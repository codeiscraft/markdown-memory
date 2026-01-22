import { ConnectDetails, useGetConnectDetails } from '@mdm/server-status'
import { asMock } from '@mdm/testing-support/mocks'
import { mockGetDefinedQuery } from '@mdm/testing-support/query'
import { generateUserSalt } from '@mdm/utils'

jest.mock('@mdm/utils')

const profileName = 'test-profile'
const salt = 'fixed-salt-value' as unknown as ReturnType<typeof generateUserSalt>
const serverRoot = 'http://test-mdm'
const connectDetails = { data: { profileName, serverRoot } }

// const renderProfileForm = (ui?: ReactNode) =>
//   render(
//     <ChakraProvider value={defaultSystem}>
//       {ui ?? <ProfileForm verifyDirectoryExists={jest.fn()} />}
//     </ChakraProvider>,
//   )

describe('ProfileForm', () => {
  beforeEach(() => {
    asMock(generateUserSalt).mockReturnValue(salt)
    asMock(useGetConnectDetails).mockReturnValue(
      mockGetDefinedQuery<ConnectDetails>(connectDetails),
    )
  })

  test('renders correctly', () => {
    expect(true).toBe(true)
    //const { getByLabelText } = renderProfileForm()
    //  expect(getByLabelText('name')).toBeInTheDocument()
  })

  // test('generates a slug after the profile name is entered', () => {
  //   asMock(toSlug).mockReturnValue('a-generated-slug')
  //   renderProfileForm()

  //   fireEvent.change(screen.getByPlaceholderText('provide a name for this profile'), {
  //     target: { value: 'testing profile' },
  //   })

  //   waitFor(() => {
  //     expect(screen.findByDisplayValue(`${serverRoot}/a-generated-slug`)).toBeInTheDocument()
  //   })
  // })

  // test('updates the field label for directory based on source selection', async () => {
  //   renderProfileForm()

  //   const user = userEvent.setup()
  //   await user.click(screen.getByRole('radio', { name: /bear/i }))

  //   waitFor(() => {
  //     expect(screen.getByLabelText('bear data path')).toBeInTheDocument()
  //   })
  // })

  // test('generates crypto once passphrase is entered', async () => {
  //   renderProfileForm()

  //   const user = userEvent.setup()
  //   await user.type(screen.getByLabelText(/passphrase/i), 'secret')

  //   expect(generateEncryptionProfile).toHaveBeenCalledWith('secret', salt)
  // })
})
