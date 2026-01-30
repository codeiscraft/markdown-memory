import { Flex, Heading } from '@chakra-ui/react'
const HEADER_HEIGHT = '2rem'

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
    </Flex>
  )
}
