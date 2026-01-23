import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { asMock } from '@mdm/testing-support/mocks'
import { toSlug } from '@mdm/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'

import { NameForm } from './NameForm'

const renderNameForm = (ui?: ReactNode) => {
  const callback = jest.fn()
  render(
    <ChakraProvider value={defaultSystem}>
      {ui ?? <NameForm updateProfile={callback} />}
    </ChakraProvider>,
  )
  return callback
}

describe('NameForm', () => {
  test('generates a slug after the profile name is entered', () => {
    asMock(toSlug).mockReturnValue('a-generated-slug')
    renderNameForm()

    fireEvent.change(screen.getByPlaceholderText('provide a name for this profile'), {
      target: { value: 'testing profile' },
    })

    waitFor(() => {
      expect(screen.findByDisplayValue('a-generated-slug')).toBeInTheDocument()
    })
  })

  test('calls setName callback when name is updated', () => {
    const mockUpdateProfile = renderNameForm()

    fireEvent.change(screen.getByPlaceholderText('provide a name for this profile'), {
      target: { value: 'New Profile Name' },
    })
    expect(mockUpdateProfile).toHaveBeenCalledWith('New Profile Name')
  })
})
