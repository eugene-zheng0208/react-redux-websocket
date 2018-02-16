import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import './Tables.scss'
import Table from '../../Table/containers/TableContainer'

export class Tables extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scrollLeft: props.defaultScrollLeft,
      tablesListWidth: 0
    }

    this.onScroll = this.onScroll.bind(this)
  }
  componentDidMount () {
    if (!this.props.logged) {
      browserHistory.push('/')
    } else {
      this.props.subscribeTables()

      const node = this.refs.tablesList

      if (node) {
        const listWidth = node.offsetWidth
        const newState = { tablesListWidth: listWidth }
        this.setState(newState)
        this.refreshScrollState(
          this.props.scrollLeft,
          listWidth
        )
      }
    }
  }

  render () {
    const { itemWidth, logged, tables, failed, handleAlertDismiss } = this.props

    const { from, to } = this.state
    const style = Object.assign({}, this.props.style, { overflow: 'auto' })

    let tablesData = []
    let scrollWidth = 0
    if (tables) {
      tablesData = JSON.parse(tables).tables

      scrollWidth = tablesData.length * itemWidth
    }
    let componentLayout = ''
    if (logged) {
      componentLayout = (
        <div
          style={style}
          ref='tablesList'
          onScroll={this.onScroll}
        >
          <div className='tables-container' style={{ width: scrollWidth }}>
            {
              tablesData
                .slice(from, to)
                .map((item, index) => {
                  const realIndex = index + from
                  const translateCorrection = ((index + 1) * itemWidth) - itemWidth
                  const translateX = (realIndex * itemWidth) - translateCorrection

                  return (
                    <Table
                      itemWidth={itemWidth}
                      renderItem={JSON.stringify(item)}
                      key={`row-item-${index}`}
                      translateX={translateX}
                    />
                  )
                })
            }
          </div>
        </div>
      )
    }
    let alert = null
    if (failed) {
      alert = (
        <div className='alert alert-danger alert-dismissible fade show' role='alert'>
          <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={handleAlertDismiss}>
            <i className='fa fa-times' />
          </button>
          <strong>Failed { JSON.parse(failed).$type === 'removal_failed' ? 'remove' : 'update' }
            table id: { JSON.parse(failed).id }</strong>
        </div>
      )
    }
    return (
      <div style={{ width: '100%' }}>
        { componentLayout }
        { alert }
      </div>
    )
  }

  onScroll (event) {
    const scrollLeft = event.target.scrollLeft
    const { bufferStart, bufferEnd } = this.state
    if (scrollLeft + this.state.tablesListWidth >= bufferEnd || scrollLeft <= bufferStart) {
      this.refreshScrollState(scrollLeft)
    }
  }

  getRangeToRender ({ viewportWidth, itemWidth, scrollLeft, bufferSize = 4 }) {
    const noItemsToRender = Math.ceil(viewportWidth / itemWidth) + bufferSize
    const itemsBeforeScrollLeft = parseInt(scrollLeft / itemWidth, 10)
    const halfBufferSize = Math.ceil(bufferSize / 2)
    let from = itemsBeforeScrollLeft - halfBufferSize
    if (from < 0) {
      from = 0
    }
    const to = from + noItemsToRender
    return { from, to }
  }

  getBufferLimits ({ from, to, itemWidth }) {
    const bufferWidth = (to - from) * itemWidth
    const bufferStart = from * itemWidth
    const bufferEnd = bufferStart + bufferWidth
    return {
      start: bufferStart,
      end: bufferEnd
    }
  }

  getFromTo (scrollTo, listWidth) {
    const { itemWidth, bufferSize } = this.props

    const fromTo = this.getRangeToRender({
      viewportWidth: listWidth || this.state.tablesListWidth,
      itemWidth,
      scrollLeft: scrollTo || this.state.scrollLeft,
      bufferSize,
    })
    return fromTo
  }

  refreshScrollState (scrollLeft, listWidth) {
    const { from, to } = this.getFromTo(scrollLeft, listWidth)
    const { start: bufferStart, end: bufferEnd } = this.getBufferLimits({ from, to, itemWidth: this.props.itemWidth })
    this.setState({ from, to, bufferStart, bufferEnd, })
  }
}

Tables.defaultProps = {
  itemWidth: 150,
  bufferSize: 2,
  defaultScrollLeft: 0,
}

Tables.propTypes = {
  itemWidth: PropTypes.number,
  defaultScrollLeft: PropTypes.number,
  scrollLeft: PropTypes.number,
  bufferSize: PropTypes.number,
  style: PropTypes.object,
  logged: PropTypes.bool,
  tables: PropTypes.string,
  subscribeTables: PropTypes.func,
  failed: PropTypes.string,
  handleAlertDismiss: PropTypes.func
}

export default Tables
