import { Box, Button, ButtonGroup, Heading, Stack, Steps } from '@chakra-ui/react'
import { useGetConnectDetails } from '@mdm/server-status'
import { useState } from 'react'

import { ProfileForm } from '../ProfileForm/ProfileForm'
import { ServerConnect } from '../ServerConnect/ServerConnect'

type NewProfileFlowProps = {
  verifyDirectoryExists?: (path: string) => Promise<boolean>
}

export function NewProfileFlow({ verifyDirectoryExists }: NewProfileFlowProps) {
  const [step, setStep] = useState(0)
  const { data: connectDetails } = useGetConnectDetails()
  const isValid = () => {
    if (step === 0) {
      return Boolean(connectDetails?.serverRoot && connectDetails.lastConnected)
    }
    return true
  }

  const steps = [
    {
      content: <ServerConnect />,
      title: 'connect',
    },
    {
      content: <ProfileForm verifyDirectoryExists={verifyDirectoryExists} />,
      title: 'profile',
    },
    {
      content: <ProfileForm verifyDirectoryExists={verifyDirectoryExists} />,
      title: 'sets',
    },
    {
      content: <ProfileForm verifyDirectoryExists={verifyDirectoryExists} />,
      title: 'sync',
    },
  ]

  return (
    <Box maxW="container.md" mx="auto" px={{ base: 4, md: 6 }} py={6}>
      <Stack gap={6}>
        <Heading>configuration</Heading>
        <Steps.Root
          count={steps.length}
          onStepChange={(e) => setStep(e.step)}
          size="sm"
          step={step}
        >
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
              <Button disabled={!isValid()} flex="1">
                next
              </Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Steps.Root>
      </Stack>
    </Box>
  )
}
