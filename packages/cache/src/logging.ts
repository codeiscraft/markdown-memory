export const logSet = (key: string, ttlSeconds?: number) =>
  console.info(`set | key: ${key} | ttl: ${ttlSeconds ?? 'none'}`)
export const logGet = (key: string, type: string) => console.info(`get ${type} | key: ${key}`)
export const logError = (e: Error) => console.error(e)
