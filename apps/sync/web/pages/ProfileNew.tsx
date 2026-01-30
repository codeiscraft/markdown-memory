import { Box, Flex } from '@chakra-ui/react'
import { ProfileFlow, Source } from '@mdm/profile'
import { useNavigate } from 'react-router-dom'

import { getElectronApi } from '../../src/electron'
import { Header } from '../components/Header'

export function ProfileNew() {
  const navigate = useNavigate()

  const verifyDirectoryExists = (source: Source, directoryPath: string) =>
    getElectronApi().verifyDirectoryExists(source, directoryPath)

  const cancelFlow = () => navigate('/')
  const completeFlow = (profileSlug: string) => navigate(`/profiles/${profileSlug}`)

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <ProfileFlow
          cancelFlow={cancelFlow}
          completeFlow={completeFlow}
          verifyDirectoryExists={verifyDirectoryExists}
        />
      </Box>
    </Flex>
  )
}
