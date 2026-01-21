import type { BearSourceDetails } from '@mdm/sync-bear/types'

import { Source, SourceDirectoryDetails } from '@mdm/profile/types'
import { validateBearSourcePath } from '@mdm/sync-bear/backend'
import { IpcMainInvokeEvent } from 'electron'
import { constants } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import * as path from 'node:path'

export async function validateSourcePath(
  _event: IpcMainInvokeEvent,
  sourceType: Source,
  sourcePath: string,
): Promise<SourceDirectoryDetails> {
  try {
    // TODO: move to utils for easier mocking
    const resolvedPath = sourcePath.startsWith('~/')
      ? path.join(homedir(), sourcePath.slice(2))
      : sourcePath
    const stats = await stat(resolvedPath)
    await access(resolvedPath, constants.R_OK)
    const isDirectory = stats.isDirectory()

    const bearDetails =
      sourceType === ('bear' as Source) ? await validateBearSourcePath(resolvedPath) : null

    // TODO: obsidian: display number of files in vault, size on disk
    return {
      bearDetails,
      isValid: isDirectory,
      sourcePath,
    }
  } catch {}
  return {
    isValid: false,
    sourcePath,
  }
}
