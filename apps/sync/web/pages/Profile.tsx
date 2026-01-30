import { Flex } from '@chakra-ui/react'
import { ProfileView } from '@mdm/profile'
import { useParams } from 'react-router-dom'

import { Header } from '../components/Header'

export function Profile() {
  const { profileSlug } = useParams<{ profileSlug: string }>()

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <ProfileView profileSlug={profileSlug!} />
    </Flex>
  )
}
