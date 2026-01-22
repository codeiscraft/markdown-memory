import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { asMock } from '@mdm/testing-support/mocks'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'

import { SourceForm } from './SourceForm'

const profileName = 'test-profile'
const renderSourceForm = (ui?: ReactNode) => {
  const verifyDirectoryExists = jest.fn()
  render(
    <ChakraProvider value={defaultSystem}>
      {ui ?? <SourceForm profileName={profileName} verifyDirectoryExists={verifyDirectoryExists} />}
    </ChakraProvider>,
  )
  return verifyDirectoryExists
}

describe('SourceForm', () => {
  test('renders correctly', () => {
    renderSourceForm()
  })

  test('updates the field label for directory based on source selection', async () => {
    renderSourceForm()

    const user = userEvent.setup()
    await user.click(screen.getByRole('radio', { name: /bear/i }))

    waitFor(() => {
      expect(screen.getByLabelText('bear data path')).toBeInTheDocument()
    })
  })

  test('invokes the verifyDirectoryExists callback', async () => {
    const verifyDirectoryExists = renderSourceForm()

    const user = userEvent.setup()
    await user.click(screen.getByRole('radio', { name: /file/i }))

    const directoryInput = screen.getByLabelText(/source file path/i)
    await user.type(directoryInput, '/path/to/source')
    await user.tab() // blur to trigger verification

    expect(verifyDirectoryExists).toHaveBeenCalledWith('file', '/path/to/source')
  })

  test('renders the verified source details', async () => {
    const verifyDirectoryExists = renderSourceForm()
    asMock(verifyDirectoryExists).mockResolvedValueOnce({
      fileCount: 10,
      isValid: true,
      sourcePath: '/path/to/source',
    })

    const user = userEvent.setup()
    await user.click(screen.getByRole('radio', { name: /file/i }))

    const directoryInput = screen.getByLabelText(/source file path/i)
    await user.type(directoryInput, '/path/to/source')
    await user.tab() // blur to trigger verification

    expect(await screen.findByText(/file:\/path\/to\/source - Valid/i)).toBeInTheDocument()
  })

  test('renders a failure if the source is invalid', async () => {
    const verifyDirectoryExists = renderSourceForm()
    asMock(verifyDirectoryExists).mockResolvedValueOnce({
      fileCount: 10,
      isValid: false,
      sourcePath: '/path/to/source',
    })

    const user = userEvent.setup()
    await user.click(screen.getByRole('radio', { name: /file/i }))

    const directoryInput = screen.getByLabelText(/source file path/i)
    await user.type(directoryInput, '/path/to/source')
    await user.tab() // blur to trigger verification

    expect(await screen.findByText('source directory invalid')).toBeInTheDocument()
  })
})
