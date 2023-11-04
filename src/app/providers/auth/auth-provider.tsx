import type { ReactNode } from 'react'
import { createContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

import { useApiResponse } from 'app/hooks'
import { AUTHORIZED_PATHS } from 'app/routes/config/authorized-config'
import { UNAUTHORIZED_PATHS } from 'app/routes/config/unauthorized-config'

import { LOCALE_STORAGE_KEYS } from 'common/constants'
import type { ApiResponse, ITriggerRequest, IUser } from 'common/interfaces'

import type { IAuthLogin } from 'features/auth'
import { useLoginMutation } from 'features/auth'

interface IContextProps {
  user: IUser | null
  isLoading: boolean
  handleLogout: () => void
  handleLogin: (data: IAuthLogin) => Promise<void>
}

export const AuthContext = createContext<IContextProps | null>({} as any)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const { processApiResponse } = useApiResponse()
  const [doLogin, { isLoading }]: ITriggerRequest = useLoginMutation()
  const [user, setUser] = useLocalStorage<IUser>(LOCALE_STORAGE_KEYS.USER, null)

  const handleLogin = async (data: IAuthLogin) => {
    const response: ApiResponse = await doLogin(data)
    processApiResponse(response, {
      error: 'Login error',
      successCallback: () => {
        setUser(response.data)
        navigate(AUTHORIZED_PATHS.HOME, { replace: true })
      },
    })
  }

  const handleLogout = (): void => {
    window.localStorage.clear()
    setUser(null)
    navigate(UNAUTHORIZED_PATHS.LOGIN, { replace: true })
  }

  const value: IContextProps = useMemo(
    (): IContextProps => ({
      user,
      isLoading,
      handleLogin,
      handleLogout,
    }),
    [user, isLoading],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
