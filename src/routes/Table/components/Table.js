import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import './Table.scss'

export class Table extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showActions: false
    }

    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  componentDidMount () {
    if (!this.props.logged) {
      browserHistory.push('/')
    }
  }

  render () {
    const { logged, userType, handleAddTable, handleRemoveTable, handleUpdateTable,
      itemWidth, renderItem, translateX } = this.props
    let componentLayout = ''
    if (logged) {
      let data = JSON.parse(renderItem)
      let participantsData = Array.from('0'.repeat(12))

      const buttonAddTable = (
        <button type='button' className='btn btn-primary btn-sm btn-action' title='Add table after this'
          onClick={() => handleAddTable({
            after_id: data.id,
            table: {
              name: `table - ${new Date().getTime()}`,
              participants: Math.round(Math.random() * 12)
            }
          })}>
          <i className='fa fa-plus' />
        </button>
      )
      const buttonUpdateTable = (
        <button type='button' className='btn btn-primary btn-sm btn-action' title='Update this table'
          onClick={() => handleUpdateTable({
            table: {
              id: data.id,
              name: `updated - ${new Date().getTime()}`,
              participants: Math.round(Math.random() * 12)
            }
          })}>
          <i className='fa fa-refresh' />
        </button>
      )
      const buttonRemoveTable = (
        <button type='button' className='btn btn-danger btn-sm btn-action' title='Remove this table'
          onClick={() => handleRemoveTable({
            id: data.id
          })}>
          <i className='fa fa-trash' />
        </button>
      )

      componentLayout = (
        <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
          <div className='lobby-table'>
            <div className='title' title={data.name}>{data.name}</div>
            <div className='participants'>
              {
                participantsData
                  .map((item, index) => {
                    return (
                      <span key={`participant-item-${index}`}
                        className={index < data.participants ? 'user-active-icon' : 'user-inactive-icon'}>
                        <i className='fa fa-user fa-fw' aria-hidden='true' />
                      </span>
                    )
                  })
              }
            </div>
            {userType === 'admin' && this.state.showActions &&
            <div className='action-buttons'>
              {buttonAddTable}
              {buttonUpdateTable}
              {buttonRemoveTable}
            </div>
            }
          </div>
        </div>
      )
    }

    return (
      <div style={{ transform: `translateX(${translateX}px)`, width: itemWidth, margin: '0 7px' }}>
        { componentLayout }
      </div>
    )
  }

  onMouseEnter () {
    this.setState({ showActions: true })
  }

  onMouseLeave () {
    this.setState({ showActions: false })
  }
}

Table.propTypes = {
  logged: PropTypes.bool,
  renderItem: PropTypes.string,
  itemWidth: PropTypes.number,
  translateX: PropTypes.number,
  userType: PropTypes.string,
  handleAddTable: PropTypes.func,
  handleRemoveTable: PropTypes.func,
  handleUpdateTable: PropTypes.func,
}

export default Table
