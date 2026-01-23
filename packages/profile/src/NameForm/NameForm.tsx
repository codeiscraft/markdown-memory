import { Field, Input, Stack, Strong, Text } from '@chakra-ui/react'
import { toSlug } from '@mdm/utils'
import { ChangeEvent, FormEvent, useState } from 'react'

import { Profile } from '../types'

export interface NameFormProps {
  updateProfile: (profile: Profile) => void
}

export function NameForm({ updateProfile }: NameFormProps) {
  const [name, setName] = useState('')
  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    updateProfile({ name: value, slug: toSlug(value) })
  }

  const handleSubmit = (event: FormEvent) => event.preventDefault()
  const slug = name ? toSlug(name) : undefined

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>name</Field.Label>
        <Input onChange={updateName} placeholder="provide a name for this profile" value={name} />
        <Field.HelperText>
          {slug && (
            <Stack direction="row">
              <Text textStyle="xs">
                <Strong>slug</Strong>
              </Text>
              <Text textStyle="xs">{slug}</Text>
            </Stack>
          )}
        </Field.HelperText>
      </Field.Root>
    </Stack>
  )
}
