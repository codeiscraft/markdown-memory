import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@mdm/components/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Home } from '../pages'

const queryClient = new QueryClient()

function App() {
  return (
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<Home />} path="/" />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
