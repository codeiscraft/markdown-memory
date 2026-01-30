import { createContext, useContext } from 'react'

import { GatherSourceDetails } from '../types'

const SourceContext = createContext<null | {
  gatherSourceDetails: GatherSourceDetails
}>(null)

interface SourceProviderProps {
  children: React.ReactNode
  gatherSourceDetails: GatherSourceDetails
}

export function SourceProvider({ children, gatherSourceDetails }: SourceProviderProps) {
  return <SourceContext.Provider value={{ gatherSourceDetails }}>{children}</SourceContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSource() {
  const ctx = useContext(SourceContext)
  if (!ctx) throw new Error('SourceProvider is missing')
  return ctx
}
