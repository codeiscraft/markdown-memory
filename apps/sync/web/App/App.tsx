import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@mdm/components/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { AppGate } from './AppGate'
import { Connect } from './Connect'
import { NewProfile } from './NewProfile'
import { Start } from './Start'

const queryClient = new QueryClient()
const enableDevTools = true

function App() {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<AppGate />}>
              <Route element={<Start />} path="/" />
              <Route element={<NewProfile />} path="/new" />
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
