import type { Source } from '@mdm/source/types'

import { SourceForm } from '@mdm/source'

import { Profile } from '../types'
import { NameForm } from './NameForm'
import { PassphraseForm } from './PassphraseForm'

export interface StepsConfig {
  profile: Profile | undefined
  updateProfile: (nextProfile: Partial<Profile>) => void
  updateSource: (source: Source, sourceDirectory: string) => void
}

export const flowSteps = ({ profile, updateProfile, updateSource }: StepsConfig) => [
  {
    content: <NameForm updateProfile={updateProfile} />,
    icon: 'FolderPen',
    title: 'name',
  },
  {
    content: <SourceForm update={updateSource} />,
    icon: 'FolderOpen',
    title: 'markdown',
  },
  {
    content: <PassphraseForm profile={profile} updateProfile={updateProfile} />,
    icon: 'Lock',
    title: 'passphrase',
  },
]
