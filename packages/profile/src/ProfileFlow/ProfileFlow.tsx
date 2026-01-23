import { Box, Button, ButtonGroup, Heading, Stack, Steps } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-status'
import { useCallback, useState } from 'react'

import { NameForm } from '../NameForm/NameForm'
import { PassphraseForm } from '../PassphraseForm/PassphraseForm'
import { ServerConnect } from '../ServerConnect/ServerConnect'
import { SourceForm } from '../SourceForm/SourceForm'
import { Profile, Source, SourceDirectoryDetails } from '../types'

interface ProfileFlowProps {
  verifyDirectoryExists: (source: Source, path: string) => Promise<SourceDirectoryDetails>
}

export function ProfileFlow({ verifyDirectoryExists }: ProfileFlowProps) {
  const [profile, setProfile] = useState<Profile | undefined>(undefined)
  const [step, setStep] = useState(0)
  const { data: connectDetails } = useGetConnectDetails(profile?.slug)
  const updateProfile = useCallback((nextProfile: Partial<Profile>) => {
    setProfile((prevProfile) => ({ ...prevProfile, ...nextProfile }) as Profile)
  }, [])

  const isValid = () => {
    if (step === 0) {
      return profile && profile.name.length > 0
    }
    if (step === 1) {
      return Boolean(connectDetails?.serverRoot && connectDetails.lastConnected)
    }
    if (step === 2) {
      return Boolean(profile?.source && profile?.sourceDirectory)
    }
    if (step === 3) {
      return Boolean(profile?.encryptionProfile)
    }
    return true
  }

  const steps = [
    {
      content: <NameForm updateProfile={updateProfile} />,
      icon: 'FolderPen',
      title: 'profile name',
    },
    {
      content: <ServerConnect profile={profile} />,
      icon: 'Cloud',
      title: 'server connect',
    },
    {
      content: (
        <SourceForm updateProfile={updateProfile} verifyDirectoryExists={verifyDirectoryExists} />
      ),
      icon: 'FolderOpen',
      title: 'markdown source',
    },
    {
      content: <PassphraseForm profile={profile} updateProfile={updateProfile} />,
      icon: 'Lock',
      title: 'passphrase',
    },
  ]

  const allStepsComplete = step === steps.length

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
                <Steps.Indicator>
                  <Steps.Status
                    complete={<Icon name="Check" />}
                    incomplete={<Icon name={step.icon} />}
                  />
                </Steps.Indicator>
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
          <ButtonGroup display="flex" w="full">
            <Steps.PrevTrigger asChild>
              <Button flex="1">prev</Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button disabled={!isValid() || allStepsComplete} flex="1">
                next
              </Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </Steps.Root>
      </Stack>
    </Box>
  )
}
