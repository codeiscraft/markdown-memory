import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'

import { Icon } from './Icon'

const renderWithChakra = (name: string) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <Icon name={name} />
    </ChakraProvider>,
  )

describe('Icon', () => {
  test('renders a known icon', () => {
    renderWithChakra('AlertCircle')

    expect(screen.getByTestId('IconAlertCircle'))
  })

  test('renders nothing for unknown icon', () => {
    renderWithChakra('NotARealIcon')

    // There should be no SVG or Lucide icon rendered
    expect(screen.queryByTestId(/^Icon/)).toBeNull()
  })
})
