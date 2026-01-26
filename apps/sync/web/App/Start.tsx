import { Box, Flex } from '@chakra-ui/react'
import { ProfileList } from '@mdm/profile'
import { useNavigate } from 'react-router-dom'

import { Header } from './Header'

export function Start() {
  const navigate = useNavigate()
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <ProfileList createProfile={() => navigate('/new')} />
      </Box>
    </Flex>
  )
}
