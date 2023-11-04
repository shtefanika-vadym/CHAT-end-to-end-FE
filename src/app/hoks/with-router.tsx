import type { ComponentType, FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = <T extends object>(Component: ComponentType<T>): FC<T> => {
  const WithRouterWrapper: FC<T> = (props) => {
    return (
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    )
  }

  return WithRouterWrapper
}
