import { notifications } from '@mantine/notifications'
import { nanoid } from 'nanoid'

import { RESPONSE_PROPERTY } from 'common/constants'

interface IShowNotificationProps {
  title: string
  type: NOTIFICATION_TYPE
  message: string | string[]
}

type NOTIFICATION_TYPE = (typeof RESPONSE_PROPERTY)[keyof typeof RESPONSE_PROPERTY]
export const useNotification = () => {
  const showNotification = ({ title, message, type }: IShowNotificationProps) => {
    notifications.show({
      title,
      message,
      id: nanoid(),
      autoClose: 10000,
      withCloseButton: true,
      color: type === RESPONSE_PROPERTY.SUCCESS ? 'green' : 'red',
    })
  }

  return { showNotification }
}
