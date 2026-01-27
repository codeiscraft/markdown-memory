import { Box, Flex } from '@chakra-ui/react'
import { ServerConnect } from '@mdm/server-connect'

import { Header } from './Header'

export function Connect() {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <ServerConnect />
      </Box>
    </Flex>
  )
}
