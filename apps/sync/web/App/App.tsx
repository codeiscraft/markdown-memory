import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@mdm/components/theme'
import { ProfileFlow, Source } from '@mdm/profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { getElectronApi } from '../../src/electron'
import { Sync } from '../Sync/Sync'

const queryClient = new QueryClient()
const enableDevTools = false

function App() {
  const verifyDirectoryExists = (source: Source, directoryPath: string) =>
    getElectronApi().verifyDirectoryExists(source, directoryPath)

  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<Sync />} path="/" />
            <Route
              element={<ProfileFlow verifyDirectoryExists={verifyDirectoryExists} />}
              path="/new"
            />
          </Routes>
        </Router>
        {enableDevTools && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
