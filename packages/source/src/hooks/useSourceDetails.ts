import { useQuery } from '@tanstack/react-query'

import { useSource } from '../context/SourceContext'
import { Source } from '../types'

export function useSourceDetails(source?: Source, sourcePath?: string) {
  const { gatherSourceDetails } = useSource()
  const enabled = !!source && !!sourcePath

  return useQuery({
    enabled,
    queryFn: async () => gatherSourceDetails(source!, sourcePath!),
    queryKey: ['sourceDetails', source, sourcePath],
  })
}
