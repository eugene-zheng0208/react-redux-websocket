import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'tables',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Tables = require('./containers/TablesContainer').default
      const reducer = require('./modules/tables').default
      injectReducer(store, { key: 'tables', reducer })
      cb(null, Tables)
    }, 'tables')
  }
})
