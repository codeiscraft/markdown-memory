import { Box, Flex, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { Header } from './Header'

export function ProfileView() {
  const { profileSlug } = useParams<{ profileSlug: string }>()

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <Heading textStyle="sm">profile {profileSlug}</Heading>
        TODO
      </Box>
    </Flex>
  )
}
