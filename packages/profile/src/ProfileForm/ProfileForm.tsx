import { Field, Input, SegmentGroup, Stack, Strong, Text } from '@chakra-ui/react'
import { PasswordInput } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-status'
import { toSlug } from '@mdm/utils'
import { ChangeEvent, useState } from 'react'

// TODO: move this into Bear Paackage
const bearRoot = '~/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data'

const getDirLabel = (source: string) => {
  if (source === 'bear') return 'bear data path'
  if (source === 'obsidian') return 'obsidian vault path'
  return 'markdown file path'
}

const sources = ['bear', 'obsidian', 'file']

export function ProfileForm() {
  const [source, setSource] = useState<null | string>()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [directory, setDirectory] = useState('')
  const [passphrase, setPassphrase] = useState('')

  const { data: connectDetails } = useGetConnectDetails()

  if (source === 'bear' && directory === '') {
    setDirectory(bearRoot)
  }

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    setSlug(toSlug(value))
  }
  const url = `${connectDetails?.serverRoot}/${slug}`

  return (
    <Stack>
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
        <SegmentGroup.Root onValueChange={(e) => setSource(e.value)} value={source}>
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={sources} />
        </SegmentGroup.Root>
      </Field.Root>
      {source && (
        <>
          <Field.Root required>
            <Field.Label>{getDirLabel(source)}</Field.Label>
            <Input onChange={(e) => setDirectory(e.target.value)} value={directory} />
          </Field.Root>
          <Field.Root required>
            <Field.Label>passphrase</Field.Label>
            <PasswordInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassphrase(e.target.value)}
              value={passphrase}
            />
            <Field.HelperText>
              <Stack direction="row">
                <Text>use a passphrase that is easy to remember but hard to guess.</Text>
              </Stack>
            </Field.HelperText>
          </Field.Root>
        </>
      )}
    </Stack>
  )
}
