import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'app/store/base-query'

import { HTTP_METHODS, REDUCER_NAMES } from 'common/constants'

export const authApi = createApi({
  reducerPath: REDUCER_NAMES.AUTH,
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    login: build.mutation({
      query: (data) => ({
        data,
        url: '/auth/login',
        method: HTTP_METHODS.POST,
      }),
    }),
  }),
})

export const { useLoginMutation }: any = authApi
