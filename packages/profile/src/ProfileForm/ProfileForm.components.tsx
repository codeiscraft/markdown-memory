import { BearSourceDir } from '@mdm/sync-bear/components'

import { Source, SourceDirectoryDetails } from '../types'

export interface SourceDetailsProps {
  source: Source
  sourceDetails: SourceDirectoryDetails
}

export function SourceDetails({ source, sourceDetails }: SourceDetailsProps) {
  if (source === 'bear' && sourceDetails.bearDetails) {
    return <BearSourceDir bearDetails={sourceDetails.bearDetails} />
  }

  return (
    <div>
      {source}:{sourceDetails?.sourcePath} - {sourceDetails?.isValid ? 'Valid' : 'Invalid'}
    </div>
  )
}
