import { Box, Button, ButtonGroup, Heading, Stack, Steps } from '@chakra-ui/react'
import { useGetServerRoot } from '@mdm/server-status'

import { ProfileForm } from '../ProfileForm/ProfileForm'
import { ServerConnect } from '../ServerConnect/ServerConnect'

const steps = [
  {
    content: <ServerConnect />,
    title: 'connect',
  },
  {
    content: <ProfileForm />,
    title: 'profile',
  },
  {
    content: <ProfileForm />,
    title: 'sets',
  },
  {
    content: <ProfileForm />,
    title: 'sync',
  },
]

export function NewProfileFlow() {
  const { data: connectDetails } = useGetServerRoot()

  const isStepValid = Boolean(connectDetails?.serverRoot)
  console.log('isStepValid', connectDetails)

  return (
    <Box maxW="container.md" mx="auto" px={{ base: 4, md: 6 }} py={6}>
      <Stack gap={6}>
        <Heading>configuration</Heading>
        <Steps.Root count={steps.length} size="sm">
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item index={index} key={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
          {steps.map((step, index) => (
            <Steps.Content index={index} key={index}>
              {step.content}
            </Steps.Content>
          ))}
          <ButtonGroup display="flex" w="full">
            <Steps.PrevTrigger asChild>
              <Button flex="1">prev</Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button disabled={!isStepValid} flex="1">
                next
              </Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Steps.Root>
      </Stack>
    </Box>
  )
}
