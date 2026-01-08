import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: '#27272a' },
        secondary: { value: '#173da6' },
      },
      fonts: {
        body: { value: 'Anonymous Pro' },
        heading: { value: 'Anonymous Pro' },
      },
    },
  },
})
