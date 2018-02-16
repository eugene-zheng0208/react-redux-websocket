import * as socketActions from '../modules/socketModule'
import * as loginActions from '../../routes/Login/modules/login'
import * as tablesActions from '../../routes/Tables/modules/tables'

export default function socketMiddleware () {
  const SOCKET_URL = 'wss://js-assignment.evolutiongaming.com/ws_api'
  let socket = null
  const initSocket = (store) => {
    socket = new WebSocket(SOCKET_URL)
    socket.onmessage = onMessage(store)
    socket.onclose = onClose(store)
    socket.onopen = onOpen(store)
    socket.onerror = onError(store)
    store.dispatch(socketActions.socketsConnecting())
  }
  const isValidJsonString = (jsonString) => {
    try {
      JSON.parse(jsonString)
      return true
    } catch (e) {
      return false
    }
  }
  const onOpen = (store) => () => {
    store.dispatch(socketActions.socketsConnect())
    store.dispatch(socketActions.socketsPing(1))
  }
  const onClose = (store) => () => {
    store.dispatch(socketActions.socketsDisconnect())
  }
  const onMessage = (store) => event => {
    if (!isValidJsonString(event.data)) {
      store.dispatch(socketActions.socketsMessageReceiving(event.data))
    } else {
      let dataObj = JSON.parse(event.data)
      switch (dataObj.$type) {
        case 'login_failed':
          store.dispatch(loginActions.loginFailed(event.data))
          break
        case 'login_successful':
          store.dispatch(loginActions.loginSuccess(event.data))
          store.dispatch(socketActions.loginSuccess(event.data))
          break
        case 'table_list':
          store.dispatch(tablesActions.tablesSubscribed(event.data))
          break
        case 'removal_failed':
          store.dispatch(tablesActions.tableActionFailed(event.data))
          break
        case 'update_failed':
          store.dispatch(tablesActions.tableActionFailed(event.data))
          break
        case 'table_removed':
          store.dispatch(tablesActions.tableRemoved(event.data))
          break
        case 'table_added':
          store.dispatch(tablesActions.tableAdded(event.data))
          break
        case 'table_updated':
          store.dispatch(tablesActions.tableUpdated(event.data))
          break
      }
    }
  }
  const onError = (store) => error => {
    store.dispatch(socketActions.socketsError(error.message))
    // try to reconnect socket
    setTimeout(() => {
      initSocket(store)
    }, 3000)
  }

  return store => next => action => {
    switch (action.type) {
      case 'SOCKETS_INIT':
        if (socket !== null) {
          socket.close()
        }
        initSocket(store)
        break
      case 'SOCKETS_DISCONNECT':
        if (socket !== null) {
          socket.close()
        }
        socket = null
        break
      case 'SOCKETS_MESSAGE_SEND':
        if (!socket) {
          store.dispatch(socketActions.socketsNotReady('Socket not ready'))
          return
        }
        if (socket.readyState === 1) {
          socket.send(JSON.stringify(action.payload))
          store.dispatch(socketActions.socketsMessageSending(action.payload))
        } else {
          store.dispatch(socketActions.socketsNotReady('Socket not ready'))
        }
        break
      default:
        return next(action)
    }
  }
}
