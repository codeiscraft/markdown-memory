import { Box, Field, Input, SegmentGroup, Stack } from '@chakra-ui/react'
import { BEAR_ROOT, BEAR_SOURCE_LABEL } from '@mdm/sync-bear/constants'
import { FormEvent, useEffect, useState } from 'react'

import { sources } from '../sources'
import { Profile, Source, SourceDirectoryDetails } from '../types'
import { SourceDetails } from './SourceDetails'

export interface SourceFormProps {
  updateProfile: (profile: Partial<Profile>) => void
  verifyDirectoryExists: (source: Source, path: string) => Promise<SourceDirectoryDetails>
}

const getDirLabel = (source: null | string | undefined) => {
  if (source === 'bear') return BEAR_SOURCE_LABEL
  if (source === 'obsidian') return 'obsidian vault path'
  return 'source file path'
}

export function SourceForm({ updateProfile, verifyDirectoryExists }: SourceFormProps) {
  const [source, setSource] = useState<null | Source>()
  const [directory, setDirectory] = useState('')
  const [directoryDetails, setDirectoryDetails] = useState<null | SourceDirectoryDetails>(null)
  const [status, setStatus] = useState<'idle' | 'invalid' | 'valid' | 'verifying'>('idle')

  const updateSource = (nextSource: null | Source) => {
    setSource(nextSource)
    if (nextSource === 'bear' && directory === '') {
      setDirectory(BEAR_ROOT)
    }
  }

  useEffect(() => {
    if (!source || !directory) return

    const verify = async () => {
      try {
        setStatus('verifying')
        const details = await verifyDirectoryExists(source, directory)
        setStatus('valid')
        setDirectoryDetails(details)
      } catch {
        setStatus('invalid')
        setDirectoryDetails(null)
      }
    }

    const timeoutId = setTimeout(() => verify(), 500)

    return () => clearTimeout(timeoutId)
  }, [source, directory, verifyDirectoryExists])

  useEffect(() => {
    if (source && directory && directoryDetails && directoryDetails.isValid) {
      updateProfile({ source, sourceDirectory: directory })
    }
  }, [directoryDetails, updateProfile, source, directory])

  const handleSubmit = (event: FormEvent) => event.preventDefault()

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>markdown source</Field.Label>
        <SegmentGroup.Root onValueChange={(e) => updateSource(e.value as Source)} value={source}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={sources} />
        </SegmentGroup.Root>
      </Field.Root>
      <Field.Root invalid={directoryDetails?.isValid === false} required>
        <Field.Label>{getDirLabel(source)}</Field.Label>
        <Input
          disabled={status === 'verifying'}
          onChange={(e) => setDirectory(e.target.value)}
          value={directory}
        />
        {source && directoryDetails && (
          <Box border="1px solid" borderColor="gray.200" borderRadius="md" gap={4} p={4} w="full">
            <SourceDetails source={source} sourceDetails={directoryDetails} />
          </Box>
        )}
      </Field.Root>
    </Stack>
  )
}
