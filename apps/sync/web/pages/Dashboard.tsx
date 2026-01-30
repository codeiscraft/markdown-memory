import { Box, Breadcrumb, Flex } from '@chakra-ui/react'
import { ProfileList } from '@mdm/profile'
import { useNavigate } from 'react-router-dom'

import { Header } from '../components/Header'

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <Breadcrumb.Root mb={4} size="sm">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/">profiles</Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <ProfileList createProfile={() => navigate('/profiles/new')} />
      </Box>
    </Flex>
  )
}
