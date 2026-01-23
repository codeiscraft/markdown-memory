import { Em, HoverCard, IconButton, Portal, Stack, Strong, Text } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { useEffect } from 'react'

import { useGetConnectDetails } from '../useGetConnectDetails/useGetConnectDetails'
import { useServerIdentity } from '../useServerIdentity/useServerIdentity'
import { useSetConnectDetails } from '../useSetConnectDetails/useSetConnectDetails'
import { getColor, getIcon } from './ServerStatus.util'

export interface ServerStatusProps {
  profileSlug?: string
}

export function ServerStatus({ profileSlug }: ServerStatusProps) {
  const { isPending: setPending, mutate: setConnectDetails } = useSetConnectDetails(profileSlug)
  const { data: connectDetails } = useGetConnectDetails(profileSlug)
  const result = useServerIdentity(profileSlug, connectDetails)
  const { data: identity, isFetching, isSuccess: identitySuccess } = result

  useEffect(() => {
    if (!identitySuccess || !identity) return
    if (connectDetails?.lastConnected) return
    if (!connectDetails?.serverRoot) return
    if (!profileSlug) return
    if (setPending) return

    setConnectDetails({
      ...connectDetails,
      lastConnected: new Date().toISOString(),
    })
  }, [identitySuccess, identity, connectDetails, setPending, setConnectDetails, profileSlug])

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
