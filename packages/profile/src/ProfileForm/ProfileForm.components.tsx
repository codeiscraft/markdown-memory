import { Stack, Strong } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { BearSourceDir } from '@mdm/sync-bear/components'

import { Source, SourceDirectoryDetails } from '../types'

export interface SourceDetailsProps {
  source: Source
  sourceDetails: SourceDirectoryDetails
}

export function SourceDetails({ source, sourceDetails }: SourceDetailsProps) {
  if (!sourceDetails.isValid) {
    return (
      <Stack align="center" direction="row">
        <Icon color="red.600" name="AlertCircle" size="sm" />
        <Strong textStyle="xs">source directory invalid</Strong>
      </Stack>
    )
  }

  if (source === 'bear' && sourceDetails.bearDetails) {
    return <BearSourceDir bearDetails={sourceDetails.bearDetails} />
  }

  return (
    <div>
      {source}:{sourceDetails?.sourcePath} - {sourceDetails?.isValid ? 'Valid' : 'Invalid'}
    </div>
  )
}
