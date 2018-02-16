import { connect } from 'react-redux'
import { actions } from '../modules/table'
import Table from '../components/Table'

const mapDispatchToProps = Object.assign({}, actions)

const mapStateToProps = (state) => ({
  logged: state.socketModule.logged,
  userType: state.socketModule.userType
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)
