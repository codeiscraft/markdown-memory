import { Profile, Source, SourceDirectoryDetails } from '../types'
import { NameForm } from './NameForm'
import { PassphraseForm } from './PassphraseForm'
import { SourceForm } from './SourceForm'

export interface StepsConfig {
  profile: Profile | undefined
  updateProfile: (nextProfile: Partial<Profile>) => void
  verifyDirectoryExists: (source: Source, path: string) => Promise<SourceDirectoryDetails>
}

export const flowSteps = ({ profile, updateProfile, verifyDirectoryExists }: StepsConfig) => [
  {
    content: <NameForm updateProfile={updateProfile} />,
    icon: 'FolderPen',
    title: 'name',
  },
  {
    content: (
      <SourceForm updateProfile={updateProfile} verifyDirectoryExists={verifyDirectoryExists} />
    ),
    icon: 'FolderOpen',
    title: 'markdown',
  },
  {
    content: <PassphraseForm profile={profile} updateProfile={updateProfile} />,
    icon: 'Lock',
    title: 'passphrase',
  },
]
