import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from 'app/hooks/use-auth'
import { UNAUTHORIZED_PATHS } from 'app/routes/config/unauthorized-config'

export const AuthorizedRoutes = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to={UNAUTHORIZED_PATHS.LOGIN} />

  return (
    <div className='application-layout__content'>
      <Outlet />
    </div>
  )
}
