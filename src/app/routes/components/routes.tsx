import { Route, Routes as ReactRoutes } from 'react-router-dom'

import { useRoutes } from 'app/hooks/use-routes'
import { AuthorizedRoutes } from 'app/routes/components/authorized-routes'
import { UnauthorizedRoutes } from 'app/routes/components/unauthorized-routes'

export const Routes = () => {
  const { unauthorized, authorized } = useRoutes()
  return (
    <ReactRoutes>
      <Route element={<UnauthorizedRoutes />}>
        {unauthorized.map(
          ({ element, path }): JSX.Element => (
            <Route key={path} path={path} element={element} />
          ),
        )}
      </Route>
      <Route element={<AuthorizedRoutes />}>
        {authorized.map(
          ({ element, path }): JSX.Element => (
            <Route key={path} path={path} element={element} />
          ),
        )}
      </Route>
    </ReactRoutes>
  )
}
