export const PROFILE_KEY_PREFIX = 'profile:'
export function createProfileKey(key: string) {
  return `${PROFILE_KEY_PREFIX}${key}`
}
