import { checkHttpStatus, parseJSON, createReducer } from 'utils'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'
export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST'
export const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function loginUserSuccess (token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      user: user
    }
  }
}

export function loginUserFailure (error) {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout () {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER
  }
}

export function logoutAndRedirect () {
  return (dispatch, state) => {
    dispatch(logout())
    dispatch(push('/login'))
  }
}

export function loginUser (username, password, redirect = '/') {
  return function (dispatch) {
    dispatch(loginUserRequest())
    return fetch('/api/users/authenticate', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      let decoded = null
      try {
        decoded = jwtDecode(response.token)
      } catch (e) {
        console.log(e)
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }))
      }
      dispatch(loginUserSuccess(response.token, decoded))
      dispatch(push(redirect))
    })
    .catch(error => {
      console.log(error)
      dispatch(loginUserFailure({
        response: {
          status: 403,
          statusText: 'Login failed'
        }
      }))
    })
  }
}

export function receiveProtectedData (data) {
  return {
    type: RECEIVE_PROTECTED_DATA,
    payload: {
      data: data
    }
  }
}

export function fetchProtectedDataRequest () {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData (token) {
  return (dispatch, state) => {
    dispatch(fetchProtectedDataRequest())
    return fetch('http://localhost:3000/getData/', {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveProtectedData(response.data))
    })
    .catch(error => {
      if (error.response.status === 401) {
        dispatch(loginUserFailure(error))
        dispatch(push('/login'))
      }
    })
  }
}

export const actions = {
  loginUserSuccess,
  loginUserFailure,
  loginUserRequest,
  loginUser,
  receiveProtectedData,
  fetchProtectedDataRequest,
  fetchProtectedData
}

// ------------------------------------
// Reducers
// ------------------------------------

// Auth Reducers
const authInitialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

const authReducer = createReducer(authInitialState, {
  [LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'user': payload.user,
      'statusText': 'You have been successfully logged in.'
    })
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'user': null,
      'statusText': `${payload.statusText}. Try again`
    })
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'user': null,
      'statusText': 'You have been successfully logged out.'
    })
  }
})

export default authReducer
