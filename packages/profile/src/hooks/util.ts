export const profileKey = (serverRoot?: string, profileSlug?: string) =>
  profileSlug ? ['profiles', serverRoot, profileSlug] : ['profiles', serverRoot]

export const apiUrl = (serverRoot: string, profileSlug?: string) =>
  profileSlug ? `${serverRoot}/api/profiles/${profileSlug}` : `${serverRoot}/api/profiles`
