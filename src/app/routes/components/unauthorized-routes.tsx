import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from 'app/hooks/use-auth'
import { AUTHORIZED_PATHS } from 'app/routes/config/authorized-config'

export const UnauthorizedRoutes = () => {
  const { user } = useAuth()

  if (user) return <Navigate to={AUTHORIZED_PATHS.HOME} />
  return <Outlet />
}
