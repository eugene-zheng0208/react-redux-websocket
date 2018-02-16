// ------------------------------------
// Constants
// ------------------------------------
export const SOCKETS_INIT = 'SOCKETS_INIT'
export const SOCKETS_MESSAGE_SEND = 'SOCKETS_MESSAGE_SEND'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const HIDE_ALERT = 'HIDE_ALERT'

// ------------------------------------
// Actions
// ------------------------------------
export function socketsConnect () {
  return {
    type: SOCKETS_INIT
  }
}

export function socketSendMessage (username, password) {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: {
      $type: 'login',
      username,
      password
    }
  }
}

export function loginFailed (data) {
  return {
    type: LOGIN_FAILED,
    payload: data
  }
}

export function loginSuccess (data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export function handleAlertDismiss () {
  return {
    type: HIDE_ALERT
  }
}

export const actions = {
  socketsConnect,
  socketSendMessage,
  loginFailed,
  loginSuccess,
  handleAlertDismiss
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SOCKETS_INIT] : (state, action) => state,
  [SOCKETS_MESSAGE_SEND] : (state, action) => action.payload,
  [LOGIN_FAILED] : (state, action) => Object.assign({}, state, {
    messageFromSocket: action.payload,
    logged: false,
    showAlert: true
  }),
  [LOGIN_SUCCESS] : (state, action) => Object.assign({}, state, {
    messageFromSocket: action.payload,
    logged: true,
    userType: JSON.parse(action.payload)['user_type'],
    showAlert: false
  }),
  [HIDE_ALERT] : (state, action) => Object.assign({}, state, {
    logged: false,
    showAlert: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
