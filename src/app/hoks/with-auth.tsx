import type { ComponentType, FC } from 'react'

import { AuthProvider } from 'app/providers/auth/auth-provider'

export const withAuth = <T extends object>(Component: ComponentType<T>): FC<T> => {
  const WithAuthWrapper: FC<T> = (props) => {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    )
  }

  return WithAuthWrapper
}
