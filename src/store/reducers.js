import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as form} from 'redux-form'
import locale from 'modules/locale'
import auth from 'modules/auth'
import sites from 'modules/sites'
import sidebar from 'modules/sidebar'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    locale,
    form,
    auth,
    sites,
    sidebar,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
