export const generateUserSalt = () => crypto.getRandomValues(new Uint8Array(16))
export const base64ToBytes = (b64: string) =>
  new Uint8Array([...atob(b64)].map((c) => c.charCodeAt(0)))
export const bytesToBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes))
export const toArrayBuffer = (bytes: Uint8Array) => {
  const copy = new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  return copy.buffer
}
