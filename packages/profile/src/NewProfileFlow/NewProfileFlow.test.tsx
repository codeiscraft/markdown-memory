import '@testing-library/jest-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'

import { NewProfileFlow } from './NewProfileFlow'

jest.mock('../ServerConnect/ServerConnect', () => ({
  ServerConnect: ({ setIsStepValid }: { setIsStepValid: (valid: boolean) => void }) => (
    <button onClick={() => setIsStepValid(true)} type="button">
      connect-step
    </button>
  ),
}))

jest.mock('../ProfileForm/ProfileForm', () => ({
  ProfileForm: ({ serverRoot }: { serverRoot: string }) => <div>profile-form:{serverRoot}</div>,
}))

const renderNewProfileFlow = (ui?: ReactNode) =>
  render(<ChakraProvider value={defaultSystem}>{ui ?? <NewProfileFlow />}</ChakraProvider>)

describe('NewProfileFlow', () => {
  test('renders the step titles', () => {
    renderNewProfileFlow()

    expect(screen.getByText('connect'))
    expect(screen.getByText('profile'))
    expect(screen.getByText('sets'))
    expect(screen.getByText('sync'))
  })

  test('disables next by default', () => {
    renderNewProfileFlow()

    expect(screen.getByRole('button', { name: 'next' })).toBeDisabled()
  })

  test('enables next when the current step becomes valid', () => {
    renderNewProfileFlow()

    fireEvent.click(screen.getByRole('button', { name: 'connect-step' }))

    expect(screen.getByRole('button', { name: 'next' })).toBeEnabled()
  })

  test('resets validity after moving to the next step', () => {
    renderNewProfileFlow()

    fireEvent.click(screen.getByRole('button', { name: 'connect-step' }))
    fireEvent.click(screen.getByRole('button', { name: 'next' }))

    const nextButton = screen.getByRole('button', { name: 'next' })
    waitFor(() => expect(nextButton).toHaveAttribute('data-disabled'))
  })
})
