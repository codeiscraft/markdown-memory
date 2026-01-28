export const fetchTyped = async <T>(url: string, headers?: HeadersInit): Promise<T> => {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`failed to fetch: ${res.status} ${res.statusText}`)
  }
  const result = await res.json()

  return result as T
}

export const postTyped = async <T>(url: string, body: T, headers?: HeadersInit): Promise<T> => {
  const res = await fetch(url, { body: JSON.stringify(body), headers, method: 'POST' })
  if (!res.ok) {
    throw new Error(`failed to fetch: ${res.status} ${res.statusText}`)
  }
  const result = await res.json()

  return result as T
}

export const putTyped = async <Req, Res>(
  url: string,
  body: Req,
  headers?: HeadersInit,
): Promise<Res> => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...(headers ?? {}) },
    method: 'PUT',
  })
  if (!res.ok) throw new Error(`failed to fetch: ${res.status} ${res.statusText}`)
  return (await res.json()) as Res
}

export const fetchLocal = <T>(key: string, operation: 'get' | 'set', value?: T): null | T => {
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
