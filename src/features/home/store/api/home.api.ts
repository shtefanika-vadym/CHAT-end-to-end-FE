import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type { EndpointBuilder } from '@reduxjs/toolkit/src/query/endpointDefinitions'

import { baseQuery } from 'app/store/base-query'

import { REDUCER_NAMES } from 'common/constants'

export const homeApi = createApi({
  reducerPath: REDUCER_NAMES.HOME,
  baseQuery: baseQuery(),
  endpoints: (build: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getUsers: build.query({
      query: () => ({
        url: '/chats/users',
      }),
    }),

    getChats: build.query({
      query: () => ({
        url: `/chats`,
      }),
    }),

    createChat: build.mutation({
      query: (data) => ({
        data,
        url: `/chats`,
        method: 'POST',
      }),
    }),

    createMessage: build.mutation({
      query: ({ id, data }) => ({
        data,
        url: `/chats/${id}/messages`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateMessageMutation,
  useCreateChatMutation,
  useGetChatsQuery,
}: any = homeApi
