export const fetchTyped = async <T>(url: string, headers?: HeadersInit): Promise<T> => {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`failed to fetch: ${res.status} ${res.statusText}`)
  }
  const result = await res.json()

  return result as T
}
