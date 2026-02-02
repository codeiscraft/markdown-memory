import { NoteSet } from '../types'

export const isStepValid = (step: number, set: NoteSet | undefined) => {
  console.log('validating step', step, set)
  if (
    step === 0 &&
    set &&
    set.name.length > 0 &&
    set.icon.length > 0 &&
    set.slug.length > 0 &&
    set.description &&
    set.description.length > 0
  ) {
    console.log('step 0 valid')
    return true
  }
  if (step === 1) {
    return true
  }
  if (step === 2) {
    return true
  }
  return false
}
