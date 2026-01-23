import { BearSourceDetails } from '@mdm/sync-bear/types'
import { EncryptionProfile } from '@mdm/utils'

export interface Profile {
  encryptionProfile?: EncryptionProfile
  name: string
  slug: string
  source: Source
  sourceDirectory?: string
}

export type Source = 'bear' | 'file' | 'obsidian'

export interface SourceDirectoryDetails {
  bearDetails?: BearSourceDetails | null
  isValid: boolean
  sourcePath: string
}
