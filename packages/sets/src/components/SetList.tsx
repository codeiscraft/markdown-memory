import type { LinkProps as RouterLinkProps } from 'react-router-dom'

import { Collapsible, IconButton, IconButtonProps, Stack, Strong } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { Link as RouterLink } from 'react-router-dom'

export interface SetListProps {
  defaultOpen?: boolean
  profileSlug: string
}

type RouterIconButtonProps = IconButtonProps & RouterLinkProps

const RouterIconButton = IconButton as unknown as React.FC<RouterIconButtonProps>

export function SetList({ defaultOpen = false, profileSlug }: SetListProps) {
  return (
    <Stack>
      <Collapsible.Root defaultOpen={defaultOpen}>
        <Collapsible.Trigger>
          <Stack align="center" cursor="pointer" direction="row">
            <Icon name="LibraryBig" size="sm" />
            <Strong textStyle="sm">sets</Strong>
          </Stack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Stack borderRadius="md" borderWidth="1px" color="fg.muted" mt="2" p="4">
            sets here
            <RouterIconButton
              aria-label="Add Profile"
              as={RouterLink}
              size="sm"
              to={`/profiles/${profileSlug}/sets/new`}
              variant="subtle"
            >
              <Icon name="Plus" />
            </RouterIconButton>
          </Stack>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  )
}
