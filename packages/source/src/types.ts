import { BearSourceDetails } from '@mdm/sync-bear/types'

export type GatherSourceDetails = (source: Source, path: string) => Promise<SourceDetails>

export type Source = 'bear' | 'file' | 'obsidian'

export interface SourceDetails {
  bearDetails?: BearSourceDetails | null
  isValid: boolean
  sourcePath: string
}
