import { useMemo } from 'react'
import type { RouteProps } from 'react-router-dom'

import { AUTHORIZED_ROUTE_CONFIG } from 'app/routes/config/authorized-config'
import { UNAUTHORIZED_ROUTE_CONFIG } from 'app/routes/config/unauthorized-config'

interface IUseAppRoutesOut {
  authorized: RouteProps[]
  unauthorized: RouteProps[]
}

export const useRoutes = (): IUseAppRoutesOut => {
  const routes = useMemo(
    (): IUseAppRoutesOut => ({
      authorized: AUTHORIZED_ROUTE_CONFIG,
      unauthorized: UNAUTHORIZED_ROUTE_CONFIG,
    }),
    [],
  )
  return routes
}
