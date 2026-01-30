import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@mdm/components/theme'
import { SourceProvider } from '@mdm/source'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Source } from '../../../../packages/source/dist/types'
import { getElectronApi } from '../../src/electron'
import { Connect } from '../pages/Connect'
import { Dashboard } from '../pages/Dashboard'
import { Profile } from '../pages/Profile'
import { ProfileNew } from '../pages/ProfileNew'
import { AppGate } from './AppGate'
import { SetNew } from './SetNew'

const queryClient = new QueryClient()
const enableDevTools = true

function App() {
  return (
    <ChakraProvider value={system}>
      <SourceProvider
        gatherSourceDetails={(source: Source, sourcePath: string) =>
          getElectronApi().gatherSourceDetails(source, sourcePath)
        }
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route element={<AppGate />}>
                <Route element={<Dashboard />} path="/" />
                <Route element={<ProfileNew />} path="/profiles/new" />
                <Route element={<Profile />} path="/profiles/:profileSlug" />
                <Route element={<SetNew />} path="/profiles/:profileSlug/sets/new" />
              </Route>
              <Route element={<Connect />} path="/connect" />
            </Routes>
          </Router>
          {enableDevTools && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </SourceProvider>
    </ChakraProvider>
  )
}

export default App
