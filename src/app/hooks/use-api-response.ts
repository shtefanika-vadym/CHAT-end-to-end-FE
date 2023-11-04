import { useCallback } from 'react'

import { RESPONSE_PROPERTY } from 'common/constants'
import { useNotification } from 'common/hooks'
import type { ApiResponse } from 'common/interfaces'

interface IProcessResponseProps {
  error?: string
  success?: string
  errorCallback?: () => void
  successCallback?: () => void
}

export const useApiResponse = () => {
  const { showNotification } = useNotification()
  const processApiResponse = useCallback(
    (
      response: ApiResponse,
      { success, successCallback, error, errorCallback }: IProcessResponseProps,
    ): void => {
      if (Object.hasOwn(response, RESPONSE_PROPERTY.SUCCESS)) {
        if (success)
          showNotification({
            title: success,
            message: response.data.message,
            type: RESPONSE_PROPERTY.SUCCESS,
          })
        if (successCallback) successCallback()
      } else {
        if (error)
          showNotification({
            title: error,
            message: response.error.data,
            type: RESPONSE_PROPERTY.ERROR,
          })
        if (errorCallback) errorCallback()
      }
    },
    [],
  )

  return { processApiResponse }
}
