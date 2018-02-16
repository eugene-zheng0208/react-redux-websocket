import { connect } from 'react-redux'
import { actions } from '../modules/tables'
import Tables from '../components/Tables'

const mapDispatchToProps = Object.assign({}, actions)

const mapStateToProps = (state) => ({
  logged: state.socketModule.logged,
  tables: state.tables.tables,
  failed: state.tables.failed
})

export default connect(mapStateToProps, mapDispatchToProps)(Tables)
