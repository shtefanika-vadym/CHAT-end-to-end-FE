import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import { LOCALE_STORAGE_KEYS } from 'common/constants'

export const baseQuery =
  (): BaseQueryFn<{
    url: string
    data?: AxiosRequestConfig['data']
    method: AxiosRequestConfig['method']
    headers?: AxiosRequestConfig['headers']
  }> =>
  async (param) => {
    try {
      const user = localStorage.getItem(LOCALE_STORAGE_KEYS.USER)
        ? JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEYS.USER))
        : null

      const result = await axios({
        ...param,
        baseURL: `http://localhost:5000/`,
        headers: {
          ...param?.headers,
          Authorization: user ? `Bearer ${user.token}` : null,
        },
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      if (err.response?.status === 401) {
        localStorage.clear()
        window.location.assign('/login')
      }
      const errors = err.response?.data['error' as keyof object]
      return {
        error: {
          status: err.response?.status,
          data:
            typeof errors === 'object'
              ? Object.values(errors).flat()
              : [err.response.data['message' as keyof object]],
        },
      }
    }
  }
