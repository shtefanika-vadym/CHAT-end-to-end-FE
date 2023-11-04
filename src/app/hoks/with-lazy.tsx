import type { ComponentType } from 'react'
import { lazy } from 'react'

import { withSuspense } from 'app/hoks/with-suspense'

export const withLazy = <T,>(
  factory: () => Promise<{ default: ComponentType<T> }>,
  fallback = false,
) => {
  const WithLazyWrapper = withSuspense(lazy(factory), fallback)
  return WithLazyWrapper
}
