import { Combobox, Portal, useFilter, useListCollection } from '@chakra-ui/react'
import * as Icons from 'lucide-react'
import { useState } from 'react'

import { Icon } from '../Icon/Icon'

export interface IconSelectProps {
  onChange?: (iconName: string | undefined) => void
  value?: string
}

const initialItems = Object.keys(Icons.icons)
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({ label: name, value: name }))

export function IconSelect({ onChange, value: controlledValue }: IconSelectProps) {
  const [value, setValue] = useState<string[]>(controlledValue ? [controlledValue] : [])

  const { contains } = useFilter({ sensitivity: 'base' })

  const { collection, filter } = useListCollection({
    filter: contains,
    initialItems,
  })

  const handleValueChange = (e: { value: string[] }) => {
    const selected = e.value[0] ?? null
    setValue(e.value)
    onChange?.(selected)
  }

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      onValueChange={handleValueChange}
      value={value}
    >
      <Combobox.Label>select icon</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>no icons found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label} <Icon name={item.value} />
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}
