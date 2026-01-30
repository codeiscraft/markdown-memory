import { useQuery } from '@tanstack/react-query'

import { useSource } from '../context/SourceContext'
import { Source } from '../types'

export function useSourceDetails(source: Source, sourcePath: string) {
  const { gatherSourceDetails } = useSource()

  return useQuery({
    enabled: !!source && !!sourcePath,
    queryFn: () => gatherSourceDetails(source!, sourcePath!),
    queryKey: ['sourceDetails', source, sourcePath],
  })
}
