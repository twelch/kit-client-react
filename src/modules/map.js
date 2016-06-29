// ------------------------------------
// Constants
// ------------------------------------
export const SETTING_STYLE = 'SETTING_STYLE'
export const RECEIVED_STYLE = 'RECEIVED_STYLE'

// ------------------------------------
// Actions
// ------------------------------------
export function receivedStyle (value = 'false') {
  return {
    type: RECEIVED_STYLE,
    payload: value
  }
}

export function settingStyle (value = 'false') {
  return {
    type: SETTING_STYLE,
    payload: value
  }
}

export const actions = {
  settingStyle,
  receivedStyle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVED_STYLE]: (state, action) => {
    return Object.assign({}, state, {
      styleLoaded: true
    })
  },
  [SETTING_STYLE]: (state, action) => {
    return Object.assign({}, state, {
      styleLoaded: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  styleLoaded: false
}

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
