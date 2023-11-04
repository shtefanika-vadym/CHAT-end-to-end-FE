import type { RouteProps } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { Home } from 'features/home'

enum AUTHORIZED_ROUTES {
  HOME = 'HOME',
}

export const AUTHORIZED_PATHS: Record<AUTHORIZED_ROUTES, string> = {
  [AUTHORIZED_ROUTES.HOME]: '/auth',
}

export const AUTHORIZED_ROUTE_CONFIG: RouteProps[] = [
  {
    path: AUTHORIZED_PATHS.HOME,
    element: <Home />,
  },
  {
    path: '*',
    element: <Navigate to={AUTHORIZED_PATHS.HOME} replace />,
  },
]
