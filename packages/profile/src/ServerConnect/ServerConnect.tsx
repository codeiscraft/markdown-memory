import {
  Em,
  Field,
  Group,
  HoverCard,
  IconButton,
  Input,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useServerIdentity } from '@mdm/application'
import { Check, CircleQuestionMark } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useGetServerRoot } from '../useGetServerRoot/useGetServerRoot'
import { useSetServerRoot } from '../useSetServerRoot/useSetServerRoot'

export interface ServerConnectProps {
  setIsStepValid: (valid: boolean) => void
}

export function ServerConnect({ setIsStepValid }: ServerConnectProps) {
  const { data: serverRootStored } = useGetServerRoot()
  const { mutate: setServer } = useSetServerRoot()

  const [serverRoot, setServerRoot] = useState(serverRootStored || '')
  const isValid = serverRoot.length === 0 || /^https?:\/\/\S+$/.test(serverRoot)

  const {
    data: identity,
    isFetching,
    isSuccess,
  } = useServerIdentity(isValid ? serverRoot : undefined)
  const serverValid = isValid && isSuccess

  useEffect(() => {
    if (serverValid) {
      setServer(serverRoot)
      setIsStepValid(true)
    }
  }, [setServer, serverRoot, serverValid, setIsStepValid])

  const update = (event: ChangeEvent<HTMLInputElement>) => setServerRoot(event.target.value)

  const icon = serverValid ? <Check /> : <CircleQuestionMark />
  const color = serverValid ? 'green.500' : 'gray.500'
  const serverDetails =
    serverValid && identity ? (
      <Stack>
        <Em>{serverRoot}</Em>
        <Text>
          {identity.product} v{identity.version}
        </Text>
      </Stack>
    ) : (
      'please enter a valid markdown memory server address'
    )

  return (
    <Stack>
      <Field.Root invalid={!isValid} required>
        <Field.Label>server address</Field.Label>
        <Group attached w="full">
          <Input
            flex={1}
            onChange={update}
            placeholder="enter the address for your markdown memory server"
            size="sm"
            value={serverRoot}
          />
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
                  {serverDetails}
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal>
          </HoverCard.Root>
        </Group>
      </Field.Root>
    </Stack>
  )
}
