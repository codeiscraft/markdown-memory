import { validateBearSourcePath } from '@mdm/sync-bear/backend'
import { IpcMainInvokeEvent } from 'electron'
import { constants } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import * as path from 'node:path'

import type { BearSourceDetails, SourceDirectoryDetails, Sources } from './types'

export async function validateSourcePath(
  _event: IpcMainInvokeEvent,
  sourceType: Sources,
  directoryPath: string,
): Promise<BearSourceDetails | SourceDirectoryDetails> {
  try {
    const resolvedPath = directoryPath.startsWith('~/')
      ? path.join(homedir(), directoryPath.slice(2))
      : directoryPath
    const stats = await stat(resolvedPath)
    await access(resolvedPath, constants.R_OK)
    const isDirectory = stats.isDirectory()

    console.log(
      `Validated path for source type ${sourceType}: ${resolvedPath} (isDirectory: ${isDirectory})`,
    )
    if (sourceType === 'bear') {
      return validateBearSourcePath(resolvedPath)
    }

    // TODO: obsidian: display number of files in vault, size on disk
    return {
      directoryPath,
      isValid: isDirectory,
    }
  } catch {}
  return {
    directoryPath,
    isValid: false,
  }
}
