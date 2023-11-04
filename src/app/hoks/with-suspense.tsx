import type { ComponentType } from 'react'
import { Suspense } from 'react'

import { LoadingOverlay } from '@mantine/core'

export const withSuspense = <T,>(WrappedComponent: ComponentType<T>, fallback: boolean) => {
  const WithSuspenseWrapper = (props: T): JSX.Element => (
    <Suspense fallback={fallback ? <LoadingOverlay visible overlayBlur={2} /> : null}>
      <WrappedComponent {...props} />
    </Suspense>
  )

  return WithSuspenseWrapper
}
