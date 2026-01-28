import { Box, Flex } from '@chakra-ui/react'
import { ProfileList, Source } from '@mdm/profile'
import { useNavigate } from 'react-router-dom'

import { getElectronApi } from '../../src/electron'
import { Header } from './Header'

export function Start() {
  const navigate = useNavigate()
  const verifySourceDirectory = (source: Source, directoryPath: string) =>
    getElectronApi().verifyDirectoryExists(source, directoryPath)

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <ProfileList
          createProfile={() => navigate('/new')}
          verifySourceDirectory={verifySourceDirectory}
        />
      </Box>
    </Flex>
  )
}
