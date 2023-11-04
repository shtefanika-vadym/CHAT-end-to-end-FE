import type { SerializedError } from '@reduxjs/toolkit'
import type { BaseQueryError } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type { MutationDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export interface ITriggerResponse {
  data?: {
    status: boolean
    message: string
  }
  error?: {
    status: number
    data: string[] | string
  }
}

export interface IRequestResponse<T = any> {
  requestId: string
  data?: T
  error?:
    | SerializedError
    | (T extends MutationDefinition<any, infer BaseQuery, any, any>
        ? BaseQueryError<BaseQuery>
        : never)
  endpointName: string
  isError: boolean
  isFetching: boolean
  startedTimeStamp: number
  isLoading: boolean
  isSuccess: boolean
  isUninitialized: boolean
  originalArgs: any
  status: 'pending' | 'rejected' | 'fulfilled'
  refetch: () => void
}

export interface IRequestData<T> {
  items: T
  total_items?: number
  pagination?: {
    current_page: number
    first_page_url: string
    from: number
    next_page_url: number | null
    path: string
    per_page: number
    prev_page_url: number | null
    to: number
  }
}

export interface IRequestPagResponse<T> extends IRequestResponse<IRequestData<T>> {}

export type ITriggerRequest<T = void> = [
  (params?: any) => Promise<{
    data?: any
    error?: {
      status: number
      data: string[]
    }
  }>,
  IRequestResponse<T>,
]

export type ITriggerPagRequest<T> = [
  (params?: any) => Promise<{
    data?: any
    error?: {
      status: number
      data: string[]
    }
  }>,
  IRequestPagResponse<T>,
]

export type ApiResponse<T = any> = {
  data?: T
  error?: {
    status: number
    data: string[]
  }
}
