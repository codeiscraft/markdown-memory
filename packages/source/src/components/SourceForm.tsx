import { Field, Input, SegmentGroup, Stack } from '@chakra-ui/react'
import { BEAR_ROOT } from '@mdm/sync-bear/constants'
import { FormEvent, useEffect, useState } from 'react'

import { useSourceDetails } from '../hooks/useSourceDetails'
import { Source } from '../types'
import { getDirLabel, sources } from '../utils'
import { SourceDetailsView } from './SourceDetailsView'

export interface SourceFormProps {
  update: (source: Source, sourceDirectory: string) => void
}

export function SourceForm({ update }: SourceFormProps) {
  const [source, setSource] = useState<Source | undefined>()
  const [directory, setDirectory] = useState('')
  const { data: sourceDetails, isPending } = useSourceDetails(source, directory)

  const updateSource = (nextSource: Source | undefined) => {
    setSource(nextSource)
    if (nextSource === 'bear' && directory === '') {
      setDirectory(BEAR_ROOT)
    }
  }

  useEffect(() => {
    if (source && directory && sourceDetails?.isValid) {
      update(source, directory)
    }
  }, [source, directory, sourceDetails, update])

  const handleSubmit = (event: FormEvent) => event.preventDefault()

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>markdown source</Field.Label>
        <SegmentGroup.Root
          autoFocus
          onValueChange={(e) => updateSource(e.value as Source)}
          value={source}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={sources} />
        </SegmentGroup.Root>
      </Field.Root>
      <Field.Root required>
        <Field.Label>{getDirLabel(source)}</Field.Label>
        <Input
          disabled={isPending}
          onChange={(e) => setDirectory(e.target.value)}
          value={directory}
        />
        <SourceDetailsView source={source} sourceDetails={sourceDetails} />
      </Field.Root>
    </Stack>
  )
}
