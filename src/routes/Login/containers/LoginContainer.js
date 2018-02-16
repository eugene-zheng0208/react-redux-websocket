import { connect } from 'react-redux'
import { actions } from '../modules/login'
import Login from '../components/Login'

const mapDispatchToProps = Object.assign({}, actions)

const mapStateToProps = (state) => ({
  messageFromSocket: state.login.messageFromSocket,
  showAlert: state.login.showAlert,
  logged: state.login.logged,
  userType: state.login.userType
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
