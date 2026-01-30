import {
  Box,
  Field,
  Heading,
  Input,
  SegmentGroup,
  Stack,
  Strong,
  TagsInput,
  Text,
} from '@chakra-ui/react'
import { toSlug } from '@mdm/utils'
import { ChangeEvent, FormEvent, useState } from 'react'

import { getDateFilterLabels } from './util'

export interface SetFormProps {
  urlRoot?: string
}

export function SetForm({ urlRoot }: SetFormProps) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [slugDefault, setDefaultSlug] = useState('')
  const [allowTags, setAllowTags] = useState<string[]>([])
  const [blockTags, setBlockTags] = useState<string[]>([])
  const [dateFilterMode, updateDateFilterMode] = useState<string>(getDateFilterLabels()[0])

  const handleSubmit = (event: FormEvent) => event.preventDefault()

  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
    if (!slug) {
      setDefaultSlug(toSlug(value))
    }
  }

  const validSlug = (value: string) =>
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || value.length === 0

  const setUrl = urlRoot && (slugDefault || slug) ? `${urlRoot}/${slug || slugDefault}` : undefined

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Box borderWidth="1px" color="fg.muted" p={4} rounded="md">
        <Heading mb={4} size="sm">
          set basics
        </Heading>
        <Field.Root required>
          <Field.Label>name</Field.Label>
          <Input
            autoFocus
            onChange={updateName}
            placeholder="provide a name for this set"
            value={name}
          />
        </Field.Root>
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
        <Field.Root>
          <Field.Label>description</Field.Label>
          <Input onChange={(event) => setDescription(event.target.value)} value={description} />
        </Field.Root>
      </Box>
      <Box borderWidth="1px" color="fg.muted" p={4} rounded="md">
        <Heading mb={4} size="sm">
          set filters
        </Heading>
        <Field.Root required>
          <Field.Label>date filter mode</Field.Label>
          <SegmentGroup.Root
            autoFocus
            onValueChange={(e) => updateDateFilterMode(e.value as string)}
            orientation="vertical"
            value={dateFilterMode}
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items items={getDateFilterLabels()} />
          </SegmentGroup.Root>
        </Field.Root>
        <TagsInput.Root
          onValueChange={(details) => setAllowTags(details.value)}
          size="xs"
          value={allowTags}
        >
          <TagsInput.Label>allow tags</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="type a tag name and press enter" />
          </TagsInput.Control>
        </TagsInput.Root>
        <TagsInput.Root
          onValueChange={(details) => setBlockTags(details.value)}
          size="xs"
          value={blockTags}
        >
          <TagsInput.Label>block tags</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="type a tag name and press enter" />
          </TagsInput.Control>
        </TagsInput.Root>
      </Box>
    </Stack>
  )
}
