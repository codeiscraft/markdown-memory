import { toSlug } from './strings'

describe('string utils', () => {
  test('toSlug converts strings to slugs', () => {
    expect(toSlug('Hello World!')).toBe('hello-world')
    expect(toSlug('  Leading and Trailing  ')).toBe('leading-and-trailing')
    expect(toSlug('Special #$&* Characters')).toBe('special--characters')
  })
})
