import { UseQueryResult } from '@tanstack/react-query'
import { CircleQuestionMark, CloudAlert, CloudCheck } from 'lucide-react'

import { ServerIdentity } from '../useServerIdentity/useServerIdentity'

export const getIcon = ({ isError, isSuccess }: UseQueryResult<ServerIdentity, Error>) => {
  if (isSuccess) {
    return <CloudCheck />
  }
  if (isError) {
    return <CloudAlert />
  }

  return <CircleQuestionMark />
}

export const getColor = ({ isError, isSuccess }: UseQueryResult<ServerIdentity, Error>) => {
  if (isError) {
    return 'red.500'
  }

  if (isSuccess) {
    return 'green.500'
  }

  return 'gray.500'
}
