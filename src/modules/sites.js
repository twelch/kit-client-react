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
export function receiveSites (configs) {
  return {
    type: RECEIVE_SITES,
    payload: {
      configs
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
      if (error.response && error.response.status === 401) {
        dispatch(loginUserFailure(error))
        dispatch(push('/'))
      } else {
        throw error
      }
    })
  }
}

export function showSites () {
  return (dispatch, state) => {
    dispatch(push('/sites'))
  }
}

export function selectSite (siteid) {
  return (dispatch, state) => {
    dispatch(push('/sites/' + siteid))
  }
}

export function selectView (siteid, viewid) {
  return (dispatch, state) => {
    dispatch(push('/sites/' + siteid + '/' + viewid))
  }
}

export const actions = {
  receiveSites,
  fetchSitesRequest,
  fetchSites,
  showSites,
  selectSite,
  selectView
}

// ------------------------------------
// Selectors - calculate useful values from state
// ------------------------------------

export const getCurSite = (state, props) => {
  if (!state.sites ||
      !state.sites.configs ||
      !props.params ||
      !props.params.siteid) {
    return null
  }
  let site = null
  try {
    site = state.sites.configs[props.params.siteid]
  } catch (e) {
    return null
  }
  return site
}

export const getCurView = (state, props) => {
  if (!state.sites ||
      !state.sites.configs ||
      !props.params ||
      !props.params.siteid ||
      !props.params.viewid) {
    return null
  }
  let view = null
  try {
    let site = getCurSite(state, props)
    view = site.views.find(view => { return view.id === props.params.viewid })
  } catch (e) {
    return null
  }
  return view
}

export const numSites = (state) => {
  if (!state.sites || !state.sites.configs) {
    return null
  }
  return Object.keys(state.sites.configs).length
}

// ------------------------------------
// Reducers
// ------------------------------------

// Auth Reducers
const initialState = {
  configs: null,
  isFetching: false
}

const reducer = createReducer(initialState, {
  [RECEIVE_SITES]: (state, payload) => {
    return Object.assign({}, state, {
      configs: payload.configs,
      isFetching: false
    })
  },
  [FETCH_SITES_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  }
})

export default reducer
