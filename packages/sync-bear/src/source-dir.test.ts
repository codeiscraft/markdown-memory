import { asMock } from '@mdm/testing-support/mocks'
import { directoryFileCount, fileStats } from '@mdm/utils/fs'

import { BEAR_FILES_FOLDER, BEAR_IMAGES_FOLDER } from './constants'
import { validateBearSourcePath } from './source-dir'

describe('source-dir', () => {
  test('happy path population of DB, images, and files', async () => {
    asMock(fileStats).mockResolvedValue({ isValid: true, lastModified: new Date(), sizeMb: '1.23' })
    asMock(directoryFileCount).mockResolvedValue({ assetCount: 10, isValid: true })

    const result = await validateBearSourcePath('/path/to/bear/source')

    expect(result.database).toEqual({
      file: 'database.sqlite',
      isValid: true,
      lastModified: expect.any(Date),
      path: '/path/to/bear/source/database.sqlite',
      sizeMb: '1.23',
    })

    expect(result.images).toEqual({
      assetCount: 10,
      assetsPath: BEAR_IMAGES_FOLDER,
      isValid: true,
    })

    expect(result.files).toEqual({
      assetCount: 10,
      assetsPath: BEAR_FILES_FOLDER,
      isValid: true,
    })
  })
})
