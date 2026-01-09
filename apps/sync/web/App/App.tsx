import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@mdm/components/theme'
import { NewProfileFlow } from '@mdm/profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Sync } from '../Sync/Sync'

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<Sync />} path="/" />
            <Route element={<NewProfileFlow />} path="/new" />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
