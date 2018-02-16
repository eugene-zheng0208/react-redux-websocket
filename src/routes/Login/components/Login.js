import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

export class Login extends React.Component {
  componentDidMount () {
    if (!this.props.logged) {
      this.props.socketsConnect()
    } else {
      browserHistory.push('/tables')
    }
  }
  render () {
    const { socketSendMessage, showAlert, logged, userType, handleAlertDismiss } = this.props
    let alert = null
    if (showAlert) {
      alert = (
        <div className='alert alert-danger alert-dismissible fade show' role='alert'>
          <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={handleAlertDismiss}>
            <i className='fa fa-times' />
          </button>
          <strong>Wrong Username or Password</strong>
        </div>
      )
    }
    if (logged) {
      browserHistory.push('/tables')
    }

    return (
      <div style={{ margin: '0 auto' }}>
        <div>
          <div className='form-group row justify-content-md-center'>
            <div className='col col-sm-4'>
              <div className='input-group margin-bottom-sm'>
                <span className='input-group-addon'><i className='fa fa-user-o fa-fw' /></span>
                <input type='text' className='form-control' ref='inputUserName' placeholder='User name'
                  defaultValue='user1234'
                  onKeyPress={(event) => {
                    if (event.nativeEvent.charCode === 13) {
                      socketSendMessage(this.refs.inputUserName.value, this.refs.inputPassword.value)
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className='form-group row justify-content-md-center'>
            <div className='col col-sm-4'>
              <div className='input-group margin-bottom-sm'>
                <span className='input-group-addon'><i className='fa fa-key fa-fw' /></span>
                <input type='password' className='form-control' ref='inputPassword' placeholder='Password'
                  defaultValue='password1234'
                  onKeyPress={(event) => {
                    if (event.nativeEvent.charCode === 13) {
                      socketSendMessage(this.refs.inputUserName.value, this.refs.inputPassword.value)
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className='form-group row justify-content-md-center'>
            <div className='col col-sm-4'>
              <button className='btn btn-primary btn-block'
                onClick={() => socketSendMessage(this.refs.inputUserName.value, this.refs.inputPassword.value)}>
                <i className='fa fa-sign-in' /> Login
              </button>
            </div>
          </div>
          <div className='form-group row justify-content-md-center'>
            <div className='col col-sm-4'>
              {alert}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  messageFromSocket: PropTypes.string,
  showAlert: PropTypes.bool,
  logged: PropTypes.bool,
  userType: PropTypes.string,
  socketsConnect: PropTypes.func,
  socketSendMessage: PropTypes.func,
  handleAlertDismiss: PropTypes.func
}

export default Login
