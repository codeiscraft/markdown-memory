const keySeparator = ':'

export const generateUserKey = (userId: string, prefix: string, key: string) =>
  `${userId}${keySeparator}${prefix}${keySeparator}${key}`

export const getLastKeySegment = (key: string) => key.split(keySeparator).pop() || ''
