// ------------------------------------
// Constants
// ------------------------------------
export const SOCKETS_INIT = 'SOCKETS_INIT'
export const SOCKETS_CONNECTING = 'SOCKETS_CONNECTING'
export const SOCKETS_CONNECT = 'SOCKETS_CONNECT'
export const SOCKETS_DISCONNECTING = 'SOCKETS_DISCONNECTING'
export const SOCKETS_DISCONNECT = 'SOCKETS_DISCONNECT'
export const SOCKETS_PING = 'SOCKETS_PING'
export const SOCKETS_MESSAGE_SENDING = 'SOCKETS_MESSAGE_SENDING'
export const SOCKETS_MESSAGE_SEND = 'SOCKETS_MESSAGE_SEND'
export const SOCKETS_MESSAGE_RECEIVE = 'SOCKETS_MESSAGE_RECEIVE'
export const SOCKETS_ERROR = 'SOCKETS_ERROR'
export const SOCKETS_NOT_READY = 'SOCKETS_NOT_READY'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function socketsConnecting () {
  return {
    type: SOCKETS_CONNECTING
  }
}
export function socketsConnect () {
  return {
    type: SOCKETS_CONNECT
  }
}
export function socketsDisconnecting () {
  return {
    type: SOCKETS_DISCONNECTING
  }
}
export function socketsDisconnect () {
  return {
    type: SOCKETS_DISCONNECT
  }
}
export function socketsPing (seq) {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: {
      $type: 'ping',
      seq
    }
  }
}
export function socketsMessageSending (sendMessage) {
  return {
    type: SOCKETS_MESSAGE_SENDING,
    payload: sendMessage
  }
}
export function socketsMessageSend (sendMessage) {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: sendMessage
  }
}
export function socketsMessageReceiving (receiveMessage) {
  return {
    type: SOCKETS_MESSAGE_RECEIVE,
    payload: receiveMessage
  }
}
export function socketsError (error) {
  return {
    type: SOCKETS_ERROR,
    payload: error
  }
}
export function socketsNotReady (error) {
  return {
    type: SOCKETS_NOT_READY,
    payload: error
  }
}
export function loginSuccess (data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  }
}

export const actions = {
  socketsConnecting,
  socketsConnect,
  socketsDisconnecting,
  socketsDisconnect,
  socketsPing,
  socketsMessageSending,
  socketsMessageSend,
  socketsMessageReceiving,
  socketsError,
  socketsNotReady,
  loginSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SOCKETS_CONNECTING] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: 'Connecting...',
    connected: false
  }),
  [SOCKETS_CONNECT] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: 'Connect...',
    connected: true
  }),
  [SOCKETS_DISCONNECTING] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: 'Disconnecting...',
    connected: true
  }),
  [SOCKETS_DISCONNECT] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: 'Disconnect...',
    connected: false
  }),
  [SOCKETS_PING] : (state, action) => {
    return action.payload
  },
  [SOCKETS_MESSAGE_SENDING] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: 'Message sending...',
    messageToSocket: JSON.stringify(action.payload),
    connected: true
  }),
  [SOCKETS_MESSAGE_RECEIVE] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: 'Message receive...',
    messageFromSocket: action.payload,
    connected: true
  }),
  [SOCKETS_ERROR] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: `Socket Error: ${action.payload}`,
    connected: false
  }),
  [SOCKETS_NOT_READY] : (state, action) => Object.assign({}, state, {
    loaded: true,
    message: action.payload,
    connected: false
  }),
  [LOGIN_SUCCESS] : (state, action) => Object.assign({}, state, {
    logged: true,
    userType: JSON.parse(action.payload)['user_type']
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  message: 'Just created',
  messageFromSocket: '',
  connected: false,
  logged: false
}

export default function socketModuleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
