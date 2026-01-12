import { Request, Response } from 'express'

export const mockRequest = (overrides?: Partial<Request>) => {
  return {
    ...overrides,
  } as unknown as Request
}

export const mockResponse = () => {
  const json = jest.fn()
  const status = jest.fn()
  status.mockReturnValue({ json })
  json.mockImplementation((object: unknown) => object)
  return {
    json,
    status,
  } as unknown as Response
}
