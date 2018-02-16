// ------------------------------------
// Constants
// ------------------------------------
export const SOCKETS_MESSAGE_SEND = 'SOCKETS_MESSAGE_SEND'

// ------------------------------------
// Actions
// ------------------------------------
export function handleAddTable (data) {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: Object.assign({}, { $type: 'add_table' }, data)
  }
}

export function handleRemoveTable (data) {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: Object.assign({}, { $type: 'remove_table' }, data)
  }
}

export function handleUpdateTable (data) {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: Object.assign({}, { $type: 'update_table' }, data)
  }
}

export const actions = {
  handleAddTable,
  handleRemoveTable,
  handleUpdateTable,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function tableReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
