import type { ComponentType, FC } from 'react'
import { Provider } from 'react-redux'

import { store } from 'app/store'

export const withStore = <T extends object>(Component: ComponentType<T>): FC<T> => {
  const WithStoreWrapper: FC<T> = (props) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )
  }

  return WithStoreWrapper
}
