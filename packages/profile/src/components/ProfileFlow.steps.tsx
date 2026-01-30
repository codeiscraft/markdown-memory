//import { SourceForm } from '@mdm/source'

import { Source, SourceDetails } from '../../../source/dist/types'
import { Profile } from '../types'
import { NameForm } from './NameForm'
import { PassphraseForm } from './PassphraseForm'

export interface StepsConfig {
  profile: Profile | undefined
  updateProfile: (nextProfile: Partial<Profile>) => void
  verifyDirectoryExists: (source: Source, path: string) => Promise<SourceDetails>
}

export const flowSteps = ({ profile, updateProfile }: StepsConfig) => [
  {
    content: <NameForm updateProfile={updateProfile} />,
    icon: 'FolderPen',
    title: 'name',
  },
  // {
  //   content: <SourceForm update={updateProfile} verifyDirectoryExists={verifyDirectoryExists} />,
  //   icon: 'FolderOpen',
  //   title: 'markdown',
  // },
  {
    content: <PassphraseForm profile={profile} updateProfile={updateProfile} />,
    icon: 'Lock',
    title: 'passphrase',
  },
]
