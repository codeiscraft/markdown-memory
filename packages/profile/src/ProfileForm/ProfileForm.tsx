import { Field, Input, SegmentGroup, Stack, Strong, Text } from '@chakra-ui/react'
import { PasswordInput } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-status'
import { BEAR_ROOT } from '@mdm/sync-bear/constants'
import { generateEncryptionProfile, generateUserSalt, toSlug } from '@mdm/utils'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { sources } from '../sources'
import { Source, SourceDirectoryDetails } from '../types'
import { SourceDetails } from './ProfileForm.components'

const getDirLabel = (source: null | string | undefined) => {
  if (source === 'bear') return 'bear data path'
  if (source === 'obsidian') return 'obsidian vault path'
  return 'source file path'
}

type ProfileFormProps = {
  verifyDirectoryExists: (source: Source, path: string) => Promise<SourceDirectoryDetails>
}

export function ProfileForm({ verifyDirectoryExists }: ProfileFormProps) {
  const [source, setSource] = useState<null | Source>()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [directory, setDirectory] = useState('')
  const [directoryDetails, setDirectoryDetails] = useState<null | SourceDirectoryDetails>(null)
  const [passphrase, setPassphrase] = useState('')
  const [salt] = useState(generateUserSalt())
  const { data: connectDetails } = useGetConnectDetails()

  const updateSource = (nextSource: null | Source) => {
    setSource(nextSource)
    if (nextSource === 'bear' && directory === '') {
      setDirectory(BEAR_ROOT)
    }
  }

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    setSlug(toSlug(value))
  }
  const url = `${connectDetails?.serverRoot}/${slug}`

  const updatePassphrase = (event: ChangeEvent<HTMLInputElement>) =>
    setPassphrase(event.target.value)

  const verifyDirectory = async () => {
    console.log('verifying directory', { directory, source })
    if (!verifyDirectoryExists || !directory || !source) {
      setDirectoryDetails(null)
      return
    }

    try {
      const details = await verifyDirectoryExists(source, directory)
      setDirectoryDetails(details)
    } catch {
      setDirectoryDetails({
        isValid: false,
        sourcePath: directory,
      })
    }
  }

  const handleSubmit = (event: FormEvent) => event.preventDefault()

  useEffect(() => {
    const deriveKey = async () => {
      if (passphrase && salt) {
        await generateEncryptionProfile(passphrase, salt)
        // TODO: save to cache along with other details
      }
    }
    deriveKey()
  }, [passphrase, salt])

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>name</Field.Label>
        <Input onChange={updateName} placeholder="provide a name for this profile" value={name} />
        <Field.HelperText>
          {slug && (
            <Stack direction="row">
              <Text>the url for this profile will be</Text>
              <Strong>{url}</Strong>
            </Stack>
          )}
        </Field.HelperText>
      </Field.Root>
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
          onBlur={verifyDirectory}
          onChange={(e) => setDirectory(e.target.value)}
          value={directory}
        />
        {source && directoryDetails && (
          <SourceDetails source={source} sourceDetails={directoryDetails} />
        )}
      </Field.Root>
      <Field.Root required>
        <Field.Label>passphrase</Field.Label>
        <PasswordInput
          onChange={updatePassphrase}
          placeholder="use a passphrase that is easy to remember but hard to guess."
          value={passphrase}
        />
      </Field.Root>
    </Stack>
  )
}
