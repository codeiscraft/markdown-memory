import { Field, Stack } from '@chakra-ui/react'
import { PasswordInput } from '@mdm/components'
import { generateEncryptionProfile, generateUserSalt } from '@mdm/utils'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

export function PassphraseForm() {
  const [passphrase, setPassphrase] = useState('')
  const [salt] = useState(generateUserSalt())

  const updatePassphrase = (event: ChangeEvent<HTMLInputElement>) =>
    setPassphrase(event.target.value)

  const handleSubmit = (event: FormEvent) => event.preventDefault()

  useEffect(() => {
    const deriveKey = async () => {
      if (passphrase && salt) {
        await generateEncryptionProfile(passphrase, salt)
        // TODO: save to cache along with other details
      }
    }
    deriveKey()
  }, [passphrase, salt])

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>passphrase</Field.Label>
        <PasswordInput
          onChange={updatePassphrase}
          placeholder="use a passphrase that is easy to remember but hard to guess."
          value={passphrase}
        />
      </Field.Root>
    </Stack>
  )
}
