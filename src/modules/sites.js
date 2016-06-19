import { checkHttpStatus, parseJSON, createReducer } from 'utils'
import { push } from 'react-router-redux'
import { loginUserFailure } from 'modules/auth'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SITES_REQUEST = 'FETCH_SITES_REQUEST'
export const RECEIVE_SITES = 'RECEIVE_SITES'
export const SELECT_SITE = 'SELECT_SITE'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveSites (data) {
  return {
    type: RECEIVE_SITES,
    payload: {
      data: data
    }
  }
}

export function fetchSitesRequest () {
  return {
    type: FETCH_SITES_REQUEST
  }
}

export function fetchSites (token) {
  return (dispatch, state) => {
    dispatch(fetchSitesRequest())
    return fetch('/api/sites', {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveSites(response))
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(loginUserFailure(error))
        dispatch(push('/'))
      }
    })
  }
}

export function selectSite (siteid) {
  return (dispatch, state) => {
    dispatch(setSite(siteid))
    dispatch(push('/sites/'+siteid))
  }
}

export function setSite (siteid) {
  return {
    type: SELECT_SITE,
    payload: {
      curSite: siteid
    }
  }
}

export const actions = {
  receiveSites,
  fetchSitesRequest,
  fetchSites,
  selectSite
}

// ------------------------------------
// Reducers
// ------------------------------------

// Auth Reducers
const initialState = {
  data: null,
  isFetching: false,
  curSite: null
}

const reducer = createReducer(initialState, {
  [RECEIVE_SITES]: (state, payload) => {
    return Object.assign({}, state, {
      data: payload.data,
      isFetching: false
    })
  },
  [FETCH_SITES_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [SELECT_SITE]: (state, payload) => {
    return Object.assign({}, state, {
      curSite: payload.curSite
    })
  }
})

export default reducer
