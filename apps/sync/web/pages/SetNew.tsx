import { Box, Flex } from '@chakra-ui/react'
import { SetFlow } from '@mdm/sets/components'
import { useNavigate } from 'react-router-dom'

import { Header } from '../components/Header'

export function SetNew() {
  const navigate = useNavigate()

  const cancelFlow = () => navigate('/')

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <SetFlow cancelFlow={cancelFlow} />
      </Box>
    </Flex>
  )
}
