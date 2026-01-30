import { Box, Collapsible, Stack, Strong } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { BearSourceDir } from '@mdm/sync-bear/components'

import { Source, SourceDetails } from '../types'

export interface SourceDetailsProps {
  defaultOpen?: boolean
  source?: Source
  sourceDetails?: SourceDetails
}

export function SourceDetailsView({
  defaultOpen = true,
  source,
  sourceDetails,
}: SourceDetailsProps) {
  if (!source || !sourceDetails) {
    return null
  }

  if (!sourceDetails.isValid) {
    return (
      <Stack align="center" direction="row">
        <Icon color="red.600" name="AlertCircle" size="sm" />
        <Strong textStyle="xs">source directory invalid</Strong>
      </Stack>
    )
  }

  return (
    <Collapsible.Root defaultOpen={defaultOpen}>
      <Collapsible.Trigger>
        <Stack align="center" cursor="pointer" direction="row">
          <Icon name="FolderCheck" size="sm" />
          <Strong textStyle="sm">source details</Strong>
        </Stack>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Box borderRadius="md" borderWidth="1px" color="fg.muted" mt="2" p="4">
          {source === 'bear' ? (
            <BearSourceDir
              bearDetails={sourceDetails.bearDetails}
              sourceDirectory={sourceDetails.sourcePath}
            />
          ) : (
            <pre>{JSON.stringify(sourceDetails, null, 2)}</pre>
          )}
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
