import { Field, Input, SegmentGroup, Stack, Strong, Text } from '@chakra-ui/react'
import { PasswordInput } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-status'
import { generateEncryptionProfile, generateUserSalt, toSlug } from '@mdm/utils'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// TODO: move this into Bear Paackage
const bearRoot = '~/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data'

const getDirLabel = (source: null | string | undefined) => {
  if (source === 'bear') return 'bear data path'
  if (source === 'obsidian') return 'obsidian vault path'
  return 'source file path'
}

const sources = ['file', 'bear', 'obsidian']

export function ProfileForm() {
  const [source, setSource] = useState<null | string>()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [directory, setDirectory] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [salt] = useState(generateUserSalt())
  const { data: connectDetails } = useGetConnectDetails()

  const updateSource = (nextSource: null | string) => {
    setSource(nextSource)
    if (nextSource === 'bear' && directory === '') {
      setDirectory(bearRoot)
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
        <SegmentGroup.Root onValueChange={(e) => updateSource(e.value)} value={source}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={sources} />
        </SegmentGroup.Root>
      </Field.Root>
      <Field.Root required>
        <Field.Label>{getDirLabel(source)}</Field.Label>
        <Input onChange={(e) => setDirectory(e.target.value)} value={directory} />
      </Field.Root>
      <Field.Root required>
        <Field.Label>passphrase</Field.Label>
        <PasswordInput onChange={updatePassphrase} value={passphrase} />
        <Field.HelperText>
          <Text>use a passphrase that is easy to remember but hard to guess.</Text>
        </Field.HelperText>
      </Field.Root>
    </Stack>
  )
}
