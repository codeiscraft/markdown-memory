import { postTyped } from '@mdm/utils'
import { useMutation } from '@tanstack/react-query'

export function useSetHash<T>(hashKey: string) {
  const api = '/api/cache/hash'
  return useMutation({
    mutationFn: async (hash: T) => postTyped<T>(api, hash),
    mutationKey: ['setHash', hashKey],
  })
}
