import { UseQueryResult } from '@tanstack/react-query'

import { ServerIdentity } from '../useServerIdentity/useServerIdentity'
import { getColor, getIcon } from './ServerStatus.util'

const mockQueryResult = (isError: boolean, isSuccess: boolean) =>
  ({
    isError,
    isSuccess,
  }) as unknown as UseQueryResult<ServerIdentity, Error>

describe('getIcon', () => {
  test('error state returns CloudAlert icon', () => {
    const query = mockQueryResult(true, false)
    expect(getIcon(query)).toBe('CloudAlert')
  })
  test('success state returns CloudCheck icon', () => {
    const query = mockQueryResult(false, true)
    expect(getIcon(query)).toBe('CloudCheck')
  })
  test('unknown state returns CircleQuestionMark icon', () => {
    const query = mockQueryResult(false, false)
    expect(getIcon(query)).toBe('CircleQuestionMark')
  })
})

describe('getColor', () => {
  test('error state returns red.500 color', () => {
    const query = mockQueryResult(true, false)
    expect(getColor(query)).toBe('red.500')
  })
  test('success state returns green.500 color', () => {
    const query = mockQueryResult(false, true)
    expect(getColor(query)).toBe('green.500')
  })
  test('unknown state returns gray.500 color', () => {
    const query = mockQueryResult(false, false)
    expect(getColor(query)).toBe('gray.500')
  })
})
