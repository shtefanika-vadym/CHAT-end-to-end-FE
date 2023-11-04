import compose from 'compose-function'

import { withAuth } from 'app/hoks/with-auth'
import { withErrorBoundary } from 'app/hoks/with-error-boundary'
import { withMantine } from 'app/hoks/with-mantine'
import { withRouter } from 'app/hoks/with-router'
import { withStore } from 'app/hoks/with-store'

export const withProviders = compose(
  withRouter,
  withStore,
  withAuth,
  withMantine,
  withErrorBoundary,
)
