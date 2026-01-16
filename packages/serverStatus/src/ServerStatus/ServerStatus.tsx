import { Em, HoverCard, IconButton, Portal, Stack, Strong, Text } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { useEffect } from 'react'

import { useGetConnectDetails } from '../useGetConnectDetails/useGetConnectDetails'
import { useServerIdentity } from '../useServerIdentity/useServerIdentity'
import { useSetConnectDetails } from '../useSetConnectDetails/useSetConnectDetails'
import { getColor, getIcon } from './ServerStatus.util'

export function ServerStatus() {
  const { isPending: setPending, mutate: setConnectDetails } = useSetConnectDetails()
  const { data: connectDetails } = useGetConnectDetails()
  const result = useServerIdentity(connectDetails)
  const { data: identity, isFetching, isSuccess: identitySuccess } = result

  useEffect(() => {
    if (!identitySuccess || !identity) return
    if (connectDetails?.lastConnected) return
    if (setPending) return

    setConnectDetails({
      lastConnected: new Date().toISOString(),
      serverRoot: connectDetails?.serverRoot || '',
    })
  }, [
    identitySuccess,
    identity,
    connectDetails?.lastConnected,
    connectDetails?.serverRoot,
    setPending,
    setConnectDetails,
  ])

  const icon = getIcon(result)
  const color = getColor(result)

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
