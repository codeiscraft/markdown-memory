import '@testing-library/jest-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'

import { BearSourceDetails } from '../types'
import { BearSourceDir } from './BearSourceDir'

const renderWithChakra = (bearDetails: BearSourceDetails) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <BearSourceDir bearDetails={bearDetails} />
    </ChakraProvider>,
  )

describe('BearSourceDir', () => {
  test('renders the summary header', () => {
    renderWithChakra({
      database: { file: 'db.sqlite', isValid: true, path: '/db', sizeMb: '2.50' },
      files: { assetCount: 10, assetsPath: 'files', isValid: true },
      images: { assetCount: 5, assetsPath: 'images', isValid: true },
    })

    expect(screen.getByText('source directory valid')).toBeInTheDocument()
  })

  test('renders database details', () => {
    const lastModified = new Date('2020-01-01T12:00:00Z')
    renderWithChakra({
      database: {
        file: 'db.sqlite',
        isValid: true,
        lastModified,
        path: '/db',
        sizeMb: '2.50',
      },
      files: { assetCount: 10, assetsPath: 'files', isValid: true },
      images: { assetCount: 5, assetsPath: 'images', isValid: true },
    })

    expect(screen.getByText('db.sqlite')).toBeInTheDocument()
    expect(
      screen.getByText((_, element) => element?.textContent === 'size: 2.50 MB'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        (_, element) => element?.textContent === `last modified: ${lastModified.toLocaleString()}`,
      ),
    ).toBeInTheDocument()
  })

  test('renders image and file stats', () => {
    renderWithChakra({
      database: { file: 'db.sqlite', isValid: true, path: '/db', sizeMb: '2.50' },
      files: { assetCount: 10, assetsPath: 'files', isValid: true },
      images: { assetCount: 5, assetsPath: 'images', isValid: true },
    })

    expect(screen.getByText('/images')).toBeInTheDocument()
    expect(
      screen.getByText((_, element) => element?.textContent === 'image count: 5'),
    ).toBeInTheDocument()
    expect(screen.getByText('/files')).toBeInTheDocument()
    expect(
      screen.getByText((_, element) => element?.textContent === 'file count: 10'),
    ).toBeInTheDocument()
  })

  test('handles missing optional details without crashing', () => {
    renderWithChakra({
      database: null,
      files: null,
      images: null,
    })

    expect(screen.getByText('source directory valid')).toBeInTheDocument()
    expect(screen.getByText(/size:/i)).toBeInTheDocument()
    expect(screen.getByText(/image count:/i)).toBeInTheDocument()
    expect(screen.getByText(/file count:/i)).toBeInTheDocument()
  })
})
