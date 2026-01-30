import { validateBearSourcePath } from '@mdm/sync-bear/backend'
import { asMock } from '@mdm/testing-support/mocks'
import { isDirectoryWithReadAccess, resolveHomeDir } from '@mdm/utils/fs'

import { gatherSourceDetails } from './directory-validate'

const eventMock = {} as unknown as Electron.IpcMainInvokeEvent

describe('directory-validate', () => {
  test('resolve and validate directory path: success for file source', async () => {
    asMock(resolveHomeDir).mockReturnValue('/some/path/resolved')
    asMock(isDirectoryWithReadAccess).mockResolvedValue(true)

    const result = await gatherSourceDetails(eventMock, 'file', '/some/path')

    expect(resolveHomeDir).toHaveBeenCalledWith('/some/path')
    expect(isDirectoryWithReadAccess).toHaveBeenCalledWith('/some/path/resolved')
    expect(validateBearSourcePath).not.toHaveBeenCalled()

    expect(result).toEqual({
      bearDetails: undefined,
      isValid: true,
      sourcePath: '/some/path',
    })
  })

  test('resolve and validate directory path: failure for file source', async () => {
    asMock(resolveHomeDir).mockReturnValue('/some/path/resolved')
    asMock(isDirectoryWithReadAccess).mockResolvedValue(false)

    const result = await gatherSourceDetails(eventMock, 'file', '/some/path')

    expect(resolveHomeDir).toHaveBeenCalledWith('/some/path')
    expect(isDirectoryWithReadAccess).toHaveBeenCalledWith('/some/path/resolved')
    expect(validateBearSourcePath).not.toHaveBeenCalled()

    expect(result).toEqual({
      bearDetails: undefined,
      isValid: false,
      sourcePath: '/some/path',
    })
  })

  test('validateBearSourcePath invoked if sourceType is bear and directory is valid', async () => {
    asMock(resolveHomeDir).mockReturnValue('/some/path/resolved')
    asMock(isDirectoryWithReadAccess).mockResolvedValue(true)

    await gatherSourceDetails(eventMock, 'bear', '/some/path')

    expect(validateBearSourcePath).toHaveBeenCalledWith('/some/path/resolved')
  })
})
