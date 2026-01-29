import { useParams } from 'react-router-dom'

export function SetNew() {
  const { profileSlug } = useParams<{ profileSlug: string }>()

  return <div>New Set Page for profile: {profileSlug}</div>
}
