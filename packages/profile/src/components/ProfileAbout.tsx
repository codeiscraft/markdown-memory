import { Box, Stack, Text } from '@chakra-ui/react'

export const ProfileAbout = () => {
  return (
    <Box bg="bg.muted" borderRadius="md" mb={4} px={3} py={2}>
      <Stack>
        <Text textStyle="xs">A profile represents a related group of markdown notes.</Text>
        <Text textStyle="xs">
          For example, you might create one profile for work notes and another for personal notes
        </Text>
        <Text textStyle="xs">
          Within each profile, you can further organize your notes into sets — such as journal
          entries, project notes, or research.
        </Text>
        <Text textStyle="xs">
          Each profile also has its own passphrase, keeping your notes private and secure.
        </Text>
      </Stack>
    </Box>
  )
}
