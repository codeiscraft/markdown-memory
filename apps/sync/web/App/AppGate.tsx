import { CenteredSpinner } from '@mdm/components'
import { useGetConnectDetails } from '@mdm/server-connect'
import { Navigate, Outlet } from 'react-router-dom'

export function AppGate() {
  const { data: connectDetails, isPending } = useGetConnectDetails()

  if (isPending) {
    return <CenteredSpinner />
  }

  if (connectDetails === null) {
    return <Navigate replace to="/connect" />
  }

  return <Outlet />
}
