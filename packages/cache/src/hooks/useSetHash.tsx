import { postTyped } from '@mdm/utils'
import { useMutation } from '@tanstack/react-query'

import { HashSetRequest } from '../types'

export function useSetHash<T>(hashKey: string) {
  const api = 'http://127.0.0.1:8200/api/cache/hash'

  return useMutation({
    mutationFn: async (hash: T) => {
      const body = { key: hashKey, ttlSeconds: -1, value: hash }
      postTyped<HashSetRequest<T>>(api, body, { 'Content-Type': 'application/json' })
    },
    mutationKey: ['setHash', hashKey],
  })
}
