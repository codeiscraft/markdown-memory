import type { Source, SourceDetails } from '@mdm/source/types'

import {
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Steps,
  Strong,
  Text,
} from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-connect'
import { useCallback, useEffect, useState } from 'react'

import { usePutProfile } from '../hooks/usePutProfile'
import { Profile } from '../types'
import { ProfileAbout } from './ProfileAbout'
import { flowSteps } from './ProfileFlow.steps'
import { isStepValid } from './ProfileFlow.util'

export interface ProfileFlowProps {
  cancelFlow?: () => void
  completeFlow?: (profileSlug: string) => void
  verifyDirectoryExists: (source: Source, path: string) => Promise<SourceDetails>
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

  const steps = flowSteps({
    profile,
    updateProfile,
    verifyDirectoryExists,
  })
  const allStepsComplete = step === steps.length

  useEffect(() => {
    if (allStepsComplete && profile) {
      saveProfile(profile)
    }
  }, [allStepsComplete, profile, saveProfile])

  return (
    <Stack>
      <Stack align="center" direction="row">
        <Heading size="sm">add a profile</Heading>
        <Spacer />
        <IconButton aria-label="close profile flow" onClick={cancelFlow} size="xs" variant="ghost">
          <Icon name="X" />
        </IconButton>
      </Stack>
      {step === 0 && <ProfileAbout />}
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
              <Button disabled={!isStepValid(step, profile) || allStepsComplete} flex="1">
                next
              </Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        )}
      </Steps.Root>
    </Stack>
  )
}
