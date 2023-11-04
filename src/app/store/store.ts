import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import { StateUtils } from 'common/utils'

const rootReducer = combineReducers({
  ...StateUtils.getAppApiReducerList(),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(StateUtils.getAppMiddlewareList()),
})
