import { Source, SourceDetails } from '@mdm/source/types'
import { validateBearSourcePath } from '@mdm/sync-bear/backend'
import { isDirectoryWithReadAccess, resolveHomeDir } from '@mdm/utils/fs'
import { IpcMainInvokeEvent } from 'electron'

export async function gatherSourceDetails(
  _event: IpcMainInvokeEvent,
  sourceType: Source,
  sourcePath: string,
): Promise<SourceDetails> {
  console.log('gatherSourceDetails', sourceType, sourcePath)
  const resolvedPath = resolveHomeDir(sourcePath)
  const isValid = await isDirectoryWithReadAccess(resolvedPath)

  const bearDetails =
    isValid && sourceType === ('bear' as Source) ? await validateBearSourcePath(resolvedPath) : null

  return {
    bearDetails,
    isValid,
    sourcePath,
  }
}
