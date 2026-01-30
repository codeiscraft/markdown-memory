import { Flex, Heading, Spacer } from '@chakra-ui/react'
import { ServerStatus } from '@mdm/server-connect'
const HEADER_HEIGHT = '2.5rem'

export function Header() {
  return (
    <Flex
      align="center"
      bg="primary"
      borderBottom="1px solid"
      borderColor="gray.200"
      h={HEADER_HEIGHT}
      px={4}
    >
      <Heading color="white" size="sm">
        markdown memory | sync
      </Heading>
      <Spacer />
      <ServerStatus />
    </Flex>
  )
}
