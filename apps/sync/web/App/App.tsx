import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@mdm/components/theme'
import { NewProfileFlow, Sources } from '@mdm/profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { getElectronApi } from '../../src/electron'
import { Sync } from '../Sync/Sync'

const queryClient = new QueryClient()

function App() {
  const verifyDirectoryExists = (source: Sources, directoryPath: string) =>
    getElectronApi().verifyDirectoryExists(source, directoryPath)

  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<Sync />} path="/" />
            <Route
              element={<NewProfileFlow verifyDirectoryExists={verifyDirectoryExists} />}
              path="/new"
            />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
