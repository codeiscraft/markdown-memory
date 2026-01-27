import { Box, Center, Spinner } from '@chakra-ui/react'

export function CenteredSpinner() {
  return (
    <Box
      aria-label="Please Wait"
      bg="bg/80"
      data-testid="centered-spinner"
      inset="0"
      pos="absolute"
    >
      <Center h="full">
        <Spinner animationDuration="1.2s" borderWidth="6px" size="lg" />
      </Center>
    </Box>
  )
}
