import { Heading, Input, Stack, Text } from '@chakra-ui/react'

export function CreateProfile() {
  return (
    <Stack gap={2} p="2">
      <Stack>
        <Heading>create profile</Heading>
        <Text>
          A markdown memory profile allows you to configure a collection of markdown notes that will
          be available for syncing in the application.
        </Text>
      </Stack>
      <Stack>
        <Input placeholder="Name this profile" />
      </Stack>
    </Stack>
  )
}
