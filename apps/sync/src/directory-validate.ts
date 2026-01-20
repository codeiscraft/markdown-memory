import type { SourceDirectoryDetails } from '@mdm/profile'

import { BearSourceDetails } from '@mdm/sync-bear'
import { IpcMainInvokeEvent } from 'electron'
import { constants } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import * as path from 'node:path'

export async function validateSourcePath(
  _event: IpcMainInvokeEvent,
  directoryPath: string,
): Promise<BearSourceDetails | SourceDirectoryDetails> {
  try {
    const resolvedPath = directoryPath.startsWith('~/')
      ? path.join(homedir(), directoryPath.slice(2))
      : directoryPath
    const stats = await stat(resolvedPath)
    await access(resolvedPath, constants.R_OK)
    const isDirectory = stats.isDirectory()

    // TODO: obsidian: display number of files in vault, size on disk
    return {
      directoryPath,
      isValid: isDirectory,
    }
  } catch {
    return {
      directoryPath,
      isValid: false,
    }
  }
}
