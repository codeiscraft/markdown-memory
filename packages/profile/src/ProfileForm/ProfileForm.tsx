import { Field, Input, Stack, Strong, Text } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'

export interface ProfileFormProps {
  serverRoot: string
}

export function ProfileForm({ serverRoot }: ProfileFormProps) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    setSlug(slug)
  }

  return (
    <Stack>
      <Field.Root required>
        <Field.Label>
          name <Field.RequiredIndicator />
        </Field.Label>
        <Input onChange={updateName} placeholder="provide a name for this profile" value={name} />
        <Field.HelperText>
          {slug && (
            <Stack direction="row">
              <Text>the url for this profile will be</Text>
              <Strong>
                {serverRoot}
                {slug}
              </Strong>
            </Stack>
          )}
        </Field.HelperText>
      </Field.Root>
    </Stack>
  )
}
