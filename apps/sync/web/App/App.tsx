import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@mdm/components/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { AppGate } from './AppGate'
import { Connect } from './Connect'
import { Dashboard } from './Dashboard'
import { ProfileNew } from './ProfileNew'
import { ProfileView } from './ProfileView'
import { SetNew } from './SetNew'

const queryClient = new QueryClient()
const enableDevTools = false

function App() {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<AppGate />}>
              <Route element={<Dashboard />} path="/" />
              <Route element={<ProfileNew />} path="/profiles/new" />
              <Route element={<ProfileView />} path="/profiles/:profileSlug" />
              <Route element={<SetNew />} path="/profiles/:profileSlug/sets/new" />
            </Route>
            <Route element={<Connect />} path="/connect" />
          </Routes>
        </Router>
        {enableDevTools && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
