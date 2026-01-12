export const fetchTyped = async <T>(url: string, headers?: HeadersInit): Promise<T> => {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`failed to fetch: ${res.status} ${res.statusText}`)
  }
  const result = await res.json()

  return result as T
}

export const fetchLocal = async <T>(
  key: string,
  operation: 'get' | 'set',
  value?: T,
): Promise<null | T> => {
  if (operation === 'get') {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  }
  if (operation === 'set' && value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value))
    return value
  }
  throw new Error('invalid operation')
}
