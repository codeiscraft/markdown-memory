import { Box, Breadcrumb, Flex } from '@chakra-ui/react'
import { ProfileView } from '@mdm/profile'
import { useParams } from 'react-router-dom'

import { Header } from '../components/Header'

export function Profile() {
  const { profileSlug } = useParams<{ profileSlug: string }>()

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <Breadcrumb.Root mb={4} size="sm">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="#" textStyle="strong">
                profiles
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.CurrentLink>{profileSlug}</Breadcrumb.CurrentLink>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <ProfileView profileSlug={profileSlug!} />
      </Box>
    </Flex>
  )
}
