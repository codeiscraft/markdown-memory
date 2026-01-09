export const version = () => process.env.npm_package_version ?? 'dev'
export const commit = () => process.env.GIT_SHA ?? undefined
