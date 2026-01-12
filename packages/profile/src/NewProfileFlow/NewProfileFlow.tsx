import { Box, Button, ButtonGroup, Heading, Stack, Steps } from '@chakra-ui/react'
import { useState } from 'react'

import { ProfileForm } from '../ProfileForm/ProfileForm'
import { ServerConnect } from '../ServerConnect/ServerConnect'

const loadSteps = (setIsStepValid: (valid: boolean) => void) => [
  {
    content: <ServerConnect setIsStepValid={setIsStepValid} />,
    title: 'connect',
  },
  {
    content: <ProfileForm serverRoot="https://mdm.dgwlab.net/" />,
    title: 'profile',
  },
  {
    content: <ProfileForm serverRoot="https://mdm.dgwlab.net/" />,
    title: 'sets',
  },
  {
    content: <ProfileForm serverRoot="https://mdm.dgwlab.net/" />,
    title: 'sync',
  },
]

export function NewProfileFlow() {
  const [isStepValid, setIsStepValid] = useState(false)
  const steps = loadSteps(setIsStepValid)

  return (
    <Box maxW="container.md" mx="auto" px={{ base: 4, md: 6 }} py={6}>
      <Stack gap={6}>
        <Heading>configuration</Heading>
        <Steps.Root count={steps.length} onStepChange={() => setIsStepValid(false)} size="sm">
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
