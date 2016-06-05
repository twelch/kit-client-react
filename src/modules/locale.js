// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_CHANGE = 'LOCALE_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
// export const localeChange = createAction(LOCALE_CHANGE, (value) => value)
export function localeChange (value = 'en') {
  return {
    type: LOCALE_CHANGE,
    payload: value
  }
}

export const actions = {
  localeChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOCALE_CHANGE]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = navigator.language || navigator.browserLanguage
export default function localeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
