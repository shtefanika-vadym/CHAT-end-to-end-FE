import { withLazy } from 'app/hoks/with-lazy'

export * from 'features/auth/schemas/auth.schema'
export { authApi, useLoginMutation } from 'features/auth/store/api/auth.api'
export const Auth = withLazy(() => import('features/auth/pages/auth/auth'))
