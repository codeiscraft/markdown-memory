import { Button, ButtonGroup, Heading, IconButton, Spacer, Stack, Steps } from '@chakra-ui/react'
import { Icon } from '@mdm/components'
import { useCallback, useState } from 'react'

import { NoteSet } from '../types'
import { flowSteps } from './SetFlow.steps'
import { isStepValid } from './SetFlow.util'

export interface SetFlowProps {
  cancelFlow?: () => void
  completeFlow?: (profileSlug: string) => void
}

export function SetFlow({ cancelFlow }: SetFlowProps) {
  const [set, setSet] = useState<NoteSet | undefined>(undefined)
  const [step, setStep] = useState(0)

  const updateSet = useCallback((nextSet: Partial<NoteSet>) => {
    console.log('UPDATE SET', nextSet)
    setSet((prevSet) => ({ ...prevSet, ...nextSet }) as NoteSet)
  }, [])

  console.log('SET FLOW RENDER', set)

  const steps = flowSteps({ initialSet: set || {}, updateSet })
  const allStepsComplete = step === steps.length

  return (
    <Stack>
      <Stack align="center" direction="row">
        <Heading size="sm">add a set</Heading>
        <Spacer />
        <IconButton aria-label="close profile flow" onClick={cancelFlow} size="xs" variant="ghost">
          <Icon name="X" />
        </IconButton>
      </Stack>
      {/* {step === 0 && <ProfileAbout />} */}
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
          {/* <Stack>
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
          </Stack> */}
        </Steps.CompletedContent>
        {!allStepsComplete && (
          <ButtonGroup display="flex" w="full">
            <Steps.PrevTrigger asChild>
              <Button flex="1">prev</Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button disabled={!isStepValid(step, set) || allStepsComplete} flex="1">
                next
              </Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        )}
      </Steps.Root>
    </Stack>
  )
}
