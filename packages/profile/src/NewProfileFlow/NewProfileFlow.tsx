import { Box, Button, ButtonGroup, Heading, Stack, Steps } from '@chakra-ui/react'
import { useState } from 'react'

import { ProfileForm } from '../ProfileForm/ProfileForm'
import { ServerConnect } from '../ServerConnect/ServerConnect'

const steps = [
  {
    content: <ServerConnect />,
    title: 'Connect to Server',
  },
  {
    content: <ProfileForm serverRoot="https://mdm.dgwlab.net/" />,
    title: 'Basic Configuration',
  },
  {
    content: <ProfileForm serverRoot="https://mdm.dgwlab.net/" />,
    title: 'Define Markdown Sets',
  },
  {
    content: <ProfileForm serverRoot="https://mdm.dgwlab.net/" />,
    title: 'Sync',
  },
]

export function NewProfileFlow() {
  const [isStepValid, setIsStepValid] = useState(false)

  return (
    <Box maxW="container.md" mx="auto" px={{ base: 4, md: 6 }} py={6}>
      <Stack gap={6}>
        <Heading>Profile Configuration</Heading>
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

          <ButtonGroup>
            <Steps.PrevTrigger asChild>
              <Button>Prev</Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button disabled={!isStepValid}>Next</Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Steps.Root>
      </Stack>
    </Box>
  )
}
