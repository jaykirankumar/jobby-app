import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isErrorMsgDisplayed: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 10})
    history.replace('/')
  }

  onFailureSubmit = errorMsg => {
    this.setState({isErrorMsgDisplayed: true, errorMsg})
  }

  onSubmitFrom = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      this.onSuccessSubmit(fetchedData.jwt_token)
    } else {
      this.onFailureSubmit(fetchedData.error_msg)
    }
  }

  render() {
    const {errorMsg, isErrorMsgDisplayed} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="login-form-container" onSubmit={this.onSubmitFrom}>
            <div className="input-label-card">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input"
                type="text"
                id="username"
                placeholder="USERNAME"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-label-card">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input"
                type="password"
                id="password"
                placeholder="PASSWORD"
                onChange={this.onChangePassword}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {isErrorMsgDisplayed && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
