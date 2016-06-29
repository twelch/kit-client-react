// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVED_STYLE = 'RECEIVE_STYLE'

// ------------------------------------
// Actions
// ------------------------------------
export function receivedStyle (value = 'false') {
  return {
    type: RECEIVED_STYLE,
    payload: value
  }
}

export const actions = {
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
