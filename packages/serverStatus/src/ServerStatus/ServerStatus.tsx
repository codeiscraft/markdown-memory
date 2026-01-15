import { Em, HoverCard, IconButton, Portal, Stack, Strong, Text } from '@chakra-ui/react'
import { Icon } from '@mdm/components'

import { useGetServerRoot } from '../useGetServerRoot/useGetServerRoot'
//import { useServerIdentity } from '../useServerIdentity/useServerIdentity'
//import { getColor, getIcon } from './ServerStatus.util'

export function ServerStatus() {
  const { data: connectDetails } = useGetServerRoot()
  // const result = useServerIdentity(connectDetails)
  //const { data: identity, isFetching } = result

  const identity = { product: 'Markdown Memory', version: '1.0.0' } // TODO remove mock
  const isFetching = true
  const icon = '' //getIcon(result)
  const color = '' //  getColor(result)

  return (
    <HoverCard.Root size="sm">
      <HoverCard.Trigger asChild>
        <IconButton color={color} loading={isFetching} size="sm" variant="outline">
          <Icon name={icon} />
        </IconButton>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow />
            {identity ? (
              <Stack>
                <Strong>{connectDetails?.serverRoot}</Strong>
                <Em>
                  {identity.product} v{identity.version}
                </Em>
              </Stack>
            ) : (
              <Text>please enter a valid markdown memory server address</Text>
            )}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}
