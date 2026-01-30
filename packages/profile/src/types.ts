import type { Source } from '@mdm/source/types'

import { EncryptionProfile } from '@mdm/utils'

export interface Profile {
  encryptionProfile?: EncryptionProfile
  name: string
  slug: string
  source?: Source
  sourceDirectory?: string
}
