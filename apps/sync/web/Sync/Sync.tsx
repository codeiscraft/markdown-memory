import { Box, Flex, Heading } from '@chakra-ui/react'
import { ProfileList } from '@mdm/profile'

const HEADER_HEIGHT = '2rem'

export function Sync() {
  return (
    <Flex direction="column" minH="100vh">
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
      <Box flex="1" p={4}>
        <ProfileList />
      </Box>
    </Flex>
  )
}
