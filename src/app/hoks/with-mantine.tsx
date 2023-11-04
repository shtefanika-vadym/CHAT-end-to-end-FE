import type { ComponentType, FC } from 'react'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

export const withMantine = <T extends object>(Component: ComponentType<T>): FC<T> => {
  const WithMantineWrapper: FC<T> = (props) => {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <Component {...props} />
      </MantineProvider>
    )
  }

  return WithMantineWrapper
}
