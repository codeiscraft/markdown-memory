import { Box, Flex } from '@chakra-ui/react'
import { ProfileFlow } from '@mdm/profile'
import { useNavigate } from 'react-router-dom'

import { Header } from '../components/Header'

export function ProfileNew() {
  const navigate = useNavigate()

  const cancelFlow = () => navigate('/')
  const completeFlow = (profileSlug: string) => navigate(`/profiles/${profileSlug}`)

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <ProfileFlow cancelFlow={cancelFlow} completeFlow={completeFlow} />
      </Box>
    </Flex>
  )
}
