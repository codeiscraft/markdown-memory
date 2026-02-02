import { Field, Input, Stack, Strong, Text } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-connect'
import { toSlug } from '@mdm/utils'
import { ChangeEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { NoteSet } from '../types'

export interface SetNameFormProps {
  initialSet: Partial<NoteSet>
  updateSet: (set: Partial<NoteSet>) => void
}

export function SetNameForm({ initialSet = {}, updateSet }: SetNameFormProps) {
  const {
    description: initialDescription = '',
    icon: initialIcon = '',
    name: initialName = '',
    slug: initialSlug = '',
  } = initialSet
  const [name, setName] = useState(initialName)
  const [slug, setSlug] = useState(initialSlug)
  const [description, setDescription] = useState(initialDescription)
  const [slugDefault, setDefaultSlug] = useState('')
  const [icon, setIcon] = useState(initialIcon)

  const { data: connectDetails } = useGetConnectDetails()
  const { profileSlug } = useParams<{ profileSlug: string }>()

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    if (!slug) {
      setDefaultSlug(toSlug(value))
    }
  }

  useEffect(() => {
    updateSet({ description, icon, name, slug: slug || slugDefault })
  }, [name, slug, description, icon, updateSet, slugDefault])

  const handleSubmit = (event: React.SyntheticEvent) => event.preventDefault()
  const validSlug = (value: string) =>
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || value.length === 0
  const setUrl =
    connectDetails?.serverRoot && (slugDefault || slug)
      ? `${profileSlug}/${slug || slugDefault}`
      : undefined

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>name</Field.Label>
        <Input
          autoFocus
          onChange={updateName}
          placeholder="provide a name for this set"
          value={name}
        />
      </Field.Root>
      <Field.Root invalid={!validSlug(slug)}>
        <Field.Label>slug</Field.Label>
        <Input
          onChange={(event) => setSlug(event.target.value)}
          placeholder={slugDefault}
          value={slug}
        />
        <Field.HelperText>
          <Stack direction="row">
            <Text textStyle="xs">
              <Strong>set url</Strong>
            </Text>
            <Text textStyle="xs">{setUrl}</Text>
          </Stack>
        </Field.HelperText>
      </Field.Root>
      <Field.Root required>
        <Field.Label>description</Field.Label>
        <Input
          onChange={(event) => setDescription(event.target.value)}
          placeholder="provide a description for this set"
          value={description}
        />
      </Field.Root>
      <Field.Root required>
        <Field.Label>icon</Field.Label>
        <Input
          onChange={(event) => setIcon(event.target.value)}
          placeholder="select an icon for this set"
          value={icon}
        />
        <Field.HelperText>{icon && <Icon name={icon} />}</Field.HelperText>
      </Field.Root>
    </Stack>
  )
}
