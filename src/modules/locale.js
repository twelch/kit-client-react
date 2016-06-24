// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_CHANGE = 'LOCALE_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
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

// Get browser language
let language = null
if (navigator.languages && navigator.language.length > 0) {
  language = navigator.languages[0]
} else {
  language = navigator.language || navigator.browserLanguage
}

const initialState = language
export default function localeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
