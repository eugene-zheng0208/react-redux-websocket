import CoreLayout from '../layouts/PageLayout/PageLayout'
import LoginRoute from './Login'
import TablesRoute from './Tables'
import TableRoute from './Table'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : LoginRoute(store),
  childRoutes : [
    LoginRoute(store),
    TablesRoute(store),
    TableRoute(store)
  ]
})

export default createRoutes
