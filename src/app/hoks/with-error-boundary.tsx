import type { ComponentType, FC } from 'react'

import { ErrorBoundary } from 'app/providers/error-boundary/error-boundary'

export const withErrorBoundary = <T extends object>(Component: ComponentType<T>): FC<T> => {
  const WithErrorBoundaryWrapper: FC<T> = (props) => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  return WithErrorBoundaryWrapper
}
