import { Code, Field, Stack } from '@chakra-ui/react'
import { PasswordInput } from '@mdm/components'
import { EncryptionProfile, generateEncryptionProfile, generateUserSalt } from '@mdm/utils'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { Profile } from '../types'

export interface PassphraseFormProps {
  profile?: Profile
  updateProfile?: (profile: Profile) => void
}

export function PassphraseForm({ updateProfile }: PassphraseFormProps) {
  const [passphrase, setPassphrase] = useState('')
  const [encryptionProfile, setEncryptionProfile] = useState<EncryptionProfile | null>(null)
  const [salt] = useState(generateUserSalt())

  const updatePassphrase = (event: ChangeEvent<HTMLInputElement>) =>
    setPassphrase(event.target.value)

  const handleSubmit = (event: FormEvent) => event.preventDefault()

  useEffect(() => {
    const deriveKey = async () => {
      if (passphrase && salt) {
        const encryptionProfile = await generateEncryptionProfile(passphrase, salt)
        updateProfile?.({ encryptionProfile } as Profile)
        setEncryptionProfile(encryptionProfile)
      }
    }
    deriveKey()
  }, [passphrase, salt, updateProfile])

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>passphrase</Field.Label>
        <PasswordInput
          autoFocus
          onChange={updatePassphrase}
          placeholder="use a passphrase that is easy to remember but hard to guess."
          value={passphrase}
        />
      </Field.Root>
      {encryptionProfile && (
        <Code p={2} variant="solid" whiteSpace="pre-wrap">
          {JSON.stringify(encryptionProfile, null, 2)}
        </Code>
      )}
    </Stack>
  )
}
