import { Box, Flex } from '@chakra-ui/react'
import { ServerConnect } from '@mdm/server-connect'
import { useNavigate } from 'react-router-dom'

import { Header } from './Header'

export function Connect() {
  const navigate = useNavigate()
  const connectSuccess = () => {
    console.log('Connect: connection successful, navigating to /')
    navigate('/')
  }
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <ServerConnect connectSuccess={connectSuccess} />
      </Box>
    </Flex>
  )
}
