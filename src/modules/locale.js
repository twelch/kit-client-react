// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_CHANGE = 'LOCALE_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
// export const localeChange = createAction(LOCALE_CHANGE, (value) => value)
export function localeChange (value: string = 'en'): Action {
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
  [LOCALE_CHANGE]: (state: string, action: {payload: string}): string => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = navigator.language || navigator.browserLanguage
export default function localeReducer (state: string = initialState, action: Action): string {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}