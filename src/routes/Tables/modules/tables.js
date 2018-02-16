// ------------------------------------
// Constants
// ------------------------------------
export const SUBSCRIBE_TABLES = 'SUBSCRIBE_TABLES'
export const SOCKETS_MESSAGE_SEND = 'SOCKETS_MESSAGE_SEND'
export const TABLE_REMOVED = 'TABLE_REMOVED'
export const TABLE_ADDED = 'TABLE_ADDED'
export const TABLE_UPDATED = 'TABLE_UPDATED'
export const FAILED_ACTION = 'FAILED_ACTION'
export const HIDE_ALERT = 'HIDE_ALERT'

// ------------------------------------
// Actions
// ------------------------------------
export function subscribeTables () {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: {
      $type: 'subscribe_tables'
    }
  }
}

export function tablesSubscribed (data) {
  return {
    type: SUBSCRIBE_TABLES,
    payload: data
  }
}

export function unSubscribeTables () {
  return {
    type: SOCKETS_MESSAGE_SEND,
    payload: {
      $type: 'unsubscribe_tables'
    }
  }
}

export function tableRemoved (data) {
  return {
    type: TABLE_REMOVED,
    payload: data
  }
}

export function tableAdded (data) {
  return {
    type: TABLE_ADDED,
    payload: data
  }
}

export function tableUpdated (data) {
  return {
    type: TABLE_UPDATED,
    payload: data
  }
}

export function tableActionFailed (data) {
  return {
    type: FAILED_ACTION,
    payload: data
  }
}

export function handleAlertDismiss () {
  return {
    type: HIDE_ALERT
  }
}

export const actions = {
  subscribeTables,
  unSubscribeTables,
  tableRemoved,
  tableAdded,
  tableActionFailed,
  handleAlertDismiss
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SUBSCRIBE_TABLES] : (state, action) => {
    return Object.assign({}, state, {
      tables: action.payload,
      logged: true
    })
  },
  [TABLE_REMOVED] : (state, action) => {
    let removedId = JSON.parse(action.payload).id
    let tables = JSON.parse(state.tables).tables
    tables = tables.filter(table => table.id !== removedId)
    return Object.assign({}, state, {
      tables: JSON.stringify({
        $type:'table_list',
        tables
      })
    })
  },
  [TABLE_ADDED] : (state, action) => {
    let parsedPayload = JSON.parse(action.payload)
    let afterId = parsedPayload.after_id
    let addedTable = parsedPayload.table
    let tables = JSON.parse(state.tables).tables
    let addedTableIndex = tables.findIndex(table => {
      return table.id === afterId
    })
    if (addedTableIndex >= 0) {
      tables.splice(addedTableIndex + 1, 0, addedTable)
    }
    return Object.assign({}, state, {
      tables: JSON.stringify({
        $type:'table_list',
        tables
      })
    })
  },
  [TABLE_UPDATED] : (state, action) => {
    let parsedPayload = JSON.parse(action.payload)
    let updatedTable = parsedPayload.table
    let tables = JSON.parse(state.tables).tables
    let updatedTableIndex = tables.findIndex(table => {
      return table.id === updatedTable.id
    })
    if (updatedTableIndex >= 0) {
      tables[updatedTableIndex] = Object.assign({}, updatedTable)
    }
    return Object.assign({}, state, {
      tables: JSON.stringify({
        $type:'table_list',
        tables
      })
    })
  },
  [FAILED_ACTION] : (state, action) => Object.assign({}, state, {
    failed: action.payload,
  }),
  [HIDE_ALERT] : (state, action) => Object.assign({}, state, {
    failed: null
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function tablesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
