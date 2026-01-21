import { BearSourceDetails } from '@mdm/sync-bear/types'

export type Source = 'bear' | 'file' | 'obsidian'

export interface SourceDirectoryDetails {
  bearDetails?: BearSourceDetails | null
  isValid: boolean
  sourcePath: string
}
