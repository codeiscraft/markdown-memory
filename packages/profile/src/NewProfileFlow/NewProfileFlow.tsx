import { Box, Button, ButtonGroup, Heading, Stack, Steps } from '@chakra-ui/react'

import { ProfileForm } from '../ProfileForm/ProfileForm'

const steps = [
  {
    content: <ProfileForm serverRoot="https://mdm.dgwlab.net/" />,
    title: 'Basic Configuration',
  },
  {
    content: <ProfileForm />,
    title: 'Define Markdown Sets',
  },
  {
    content: <ProfileForm />,
    title: 'Sync',
  },
]

export function NewProfileFlow() {
  return (
    <Box maxW="container.md" mx="auto" px={{ base: 4, md: 6 }} py={6}>
      <Stack gap={6}>
        <Heading>Profile Configuration</Heading>
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
          <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

          <ButtonGroup>
            <Steps.PrevTrigger asChild>
              <Button>Prev</Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button>Next</Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Steps.Root>
      </Stack>
    </Box>
  )
}
