import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Steps,
  Steps,
  Strong,
  Text,
} from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-connect'
import { useCallback, useEffect, useState } from 'react'

import { usePutProfile } from '../hooks/usePutProfile'
import { Profile, Source, SourceDirectoryDetails } from '../types'
import { NameForm } from './NameForm'
import { PassphraseForm } from './PassphraseForm'
import { ProfileAbout } from './ProfileAbout'
import { SourceForm } from './SourceForm'

interface ProfileFlowProps {
  cancelFlow?: () => void
  completeFlow?: (profileSlug: string) => void
  verifyDirectoryExists: (source: Source, path: string) => Promise<SourceDirectoryDetails>
}

export function ProfileFlow({ cancelFlow, completeFlow, verifyDirectoryExists }: ProfileFlowProps) {
  const [profile, setProfile] = useState<Profile | undefined>(undefined)
  const [step, setStep] = useState(0)
  const { data: connectDetails } = useGetConnectDetails()
  const updateProfile = useCallback(
    (nextProfile: Partial<Profile>) =>
      setProfile((prevProfile) => ({ ...prevProfile, ...nextProfile }) as Profile),
    [],
  )
  const { mutate: saveProfile } = usePutProfile(profile?.slug, connectDetails?.serverRoot)

  const isValid = () => {
    if (step === 0) {
      return profile && profile.name.length > 0
    }
    if (step === 1) {
      return Boolean(profile?.source && profile?.sourceDirectory)
    }
    if (step === 2) {
      return Boolean(profile?.encryptionProfile)
    }
    return true
  }

  const steps = [
    {
      content: <NameForm updateProfile={updateProfile} />,
      icon: 'FolderPen',
      title: 'name',
    },
    {
      content: (
        <SourceForm updateProfile={updateProfile} verifyDirectoryExists={verifyDirectoryExists} />
      ),
      icon: 'FolderOpen',
      title: 'markdown',
    },
    {
      content: <PassphraseForm profile={profile} updateProfile={updateProfile} />,
      icon: 'Lock',
      title: 'passphrase',
    },
  ]

  const allStepsComplete = step === steps.length
  useEffect(() => {
    if (allStepsComplete) {
      if (profile) {
        saveProfile(profile)
      }
    }
  }, [allStepsComplete, profile, saveProfile])

  return (
    <Stack>
      <Stack direction="row">
        <Heading size="sm">add a profile</Heading>
        <Spacer />
        <IconButton aria-label="close profile flow" onClick={cancelFlow} variant="ghost">
          <Icon name="X" size="lg" />
        </IconButton>
      </Stack>
      <ProfileAbout />
      <Steps.Root count={steps.length} onStepChange={(e) => setStep(e.step)} size="sm" step={step}>
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
        <Steps.Content index={step} key={step}>
          {steps[step] ? steps[step].content : null}
        </Steps.Content>
        <Steps.CompletedContent>
          <Stack>
            <Text textAlign="center" textStyle="sm">
              profile <Strong>{profile?.name}</Strong> added successfully!
            </Text>
            <Button
              onClick={() => {
                if (profile?.slug) {
                  completeFlow?.(profile.slug)
                }
              }}
              type="button"
            >
              view profile
            </Button>
          </Stack>
        </Steps.CompletedContent>
        {!allStepsComplete && (
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
        )}
      </Steps.Root>
    </Stack>
  )
}
