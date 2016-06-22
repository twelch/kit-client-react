import { createReducer } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_SIDEBAR = 'OPEN_SIDEBAR'
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const SET_SIDEBAR = 'SET_SIDEBAR'

// ------------------------------------
// Actions
// ------------------------------------
export function openSidebar () {
  return {
    type: OPEN_SIDEBAR
  }
}

export function closeSidebar () {
  return {
    type: CLOSE_SIDEBAR
  }
}

export function toggleSidebar () {
  return {
    type: TOGGLE_SIDEBAR
  }
}

export function setSidebar (value = false) {
  return {
    type: SET_SIDEBAR,
    payload: value
  }
}

// ------------------------------------
// Reducers
// ------------------------------------

const initialState = false
const reducer = createReducer(initialState, {
  [OPEN_SIDEBAR]: () => {
    return true
  },
  [CLOSE_SIDEBAR]: () => {
    return false
  },
  [SET_SIDEBAR]: (state, payload) => {
    return payload
  },
  [TOGGLE_SIDEBAR]: (state) => {
    return !state
  }
})

export default reducer
