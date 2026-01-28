import { Box, Flex } from '@chakra-ui/react'
import { ProfileFlow, Source } from '@mdm/profile'

import { getElectronApi } from '../../src/electron'
import { Header } from './Header'

export function NewProfile() {
  const verifyDirectoryExists = (source: Source, directoryPath: string) =>
    getElectronApi().verifyDirectoryExists(source, directoryPath)

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex="1" p={4}>
        <ProfileFlow verifyDirectoryExists={verifyDirectoryExists} />
      </Box>
    </Flex>
  )
}
