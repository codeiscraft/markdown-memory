import { Response } from 'express'

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
