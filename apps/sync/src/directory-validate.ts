import type { SourceDirectoryDetails, Sources } from '@mdm/profile'
import type { BearSourceDetails } from '@mdm/sync-bear/types'

import { validateBearSourcePath } from '@mdm/sync-bear/backend'
import { IpcMainInvokeEvent } from 'electron'
import { constants } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import * as path from 'node:path'

export async function validateSourcePath(
  _event: IpcMainInvokeEvent,
  sourceType: Sources,
  directoryPath: string,
): Promise<BearSourceDetails | SourceDirectoryDetails> {
  try {
    console.log(
      `validateSourcePath: validating sourceType=${sourceType}, directoryPath=${directoryPath}`,
    )
    const resolvedPath = directoryPath.startsWith('~/')
      ? path.join(homedir(), directoryPath.slice(2))
      : directoryPath
    const stats = await stat(resolvedPath)
    await access(resolvedPath, constants.R_OK)
    const isDirectory = stats.isDirectory()

    console.log(`validateSourcePath: checked path ${resolvedPath}, isDirectory: ${isDirectory}`)
    if (sourceType === 'bear') {
      return validateBearSourcePath(resolvedPath)
    }

    // TODO: obsidian: display number of files in vault, size on disk
    return {
      directoryPath,
      isValid: isDirectory,
    }
  } catch (e) {
    console.log('ERROR!', e)
    return {
      directoryPath,
      isValid: false,
    }
  }
}
