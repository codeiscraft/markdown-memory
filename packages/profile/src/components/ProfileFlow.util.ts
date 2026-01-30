import { Profile } from '../types'

export const isStepValid = (step: number, profile: Profile | undefined) => {
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
