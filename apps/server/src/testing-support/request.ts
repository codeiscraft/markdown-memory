import { Request } from 'express'

export const mockRequest = (overrides: Partial<Request>) => {
  return {
    ...overrides,
  } as unknown as Request
}
