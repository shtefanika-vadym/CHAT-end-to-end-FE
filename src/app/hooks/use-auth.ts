import { useContext } from 'react'

import { AuthContext } from 'app/providers/auth/auth-provider'

export const useAuth = () => {
  return useContext(AuthContext)
}
