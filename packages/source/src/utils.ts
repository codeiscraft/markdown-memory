import { BEAR_SOURCE_LABEL } from '@mdm/sync-bear/constants'

import { Source, Source } from './types'

export const getDirLabel = (source: null | string | undefined) => {
  if (source === 'bear') return BEAR_SOURCE_LABEL
  if (source === 'obsidian') return 'obsidian vault path'
  return 'source file path'
}

export const sources: Source[] = ['bear', 'obsidian', 'file']
