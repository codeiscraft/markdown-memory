import { Em, HoverCard, IconButton, Portal, Stack, Strong, Text } from '@chakra-ui/react'

import { useGetServerRoot } from '../useGetServerRoot/useGetServerRoot'
import { useServerIdentity } from '../useServerIdentity/useServerIdentity'
import { getColor, getIcon } from './ServerStatus.util'

export interface ServerStatusProps {
  connectSuccess: (connected: boolean) => void
}

export function ServerStatus({ connectSuccess }: ServerStatusProps) {
  const { data: serverRoot } = useGetServerRoot()
  const result = useServerIdentity(serverRoot)
  const { data: identity, isFetching, isSuccess } = result

  const serverValid = Boolean(serverRoot) && isSuccess

  connectSuccess(serverValid)

  const icon = getIcon(result)
  const color = getColor(result)

  return (
    <HoverCard.Root size="sm">
      <HoverCard.Trigger asChild>
        <IconButton color={color} loading={isFetching} size="sm" variant="outline">
          {icon}
        </IconButton>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow />
            {identity ? (
              <Stack>
                <Strong>{serverRoot}</Strong>
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
