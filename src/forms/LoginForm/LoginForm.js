import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { TextField, RaisedButton } from 'material-ui'
import validate from './validate'

export const fields = [ 'username', 'password' ]

type Props = {
  handleSubmit: Function,
  fields: Object
}

class Login extends React.Component {
  props: Props;

  defaultProps = {
    fields: {}
  }

  login (values, dispatch) {
    this.props.loginUser(values.username, values.password)
  }

  render () {
    const { fields: { username, password }, statusText, handleSubmit, isAuthenticating } = this.props

    const style = {
      bigError: {
        fontSize: '16px',
        lineHeight: '16px',
        color: 'rgb(244, 67, 54)',
        height: 30
      }
    }

    return (
      <form onSubmit={handleSubmit(this.login.bind(this))}>
        <div>
          <div>
            <TextField
              {...username}
              hintText='Username'
              errorText={username.touched && username.error && <div>{username.error}</div>} />
          </div>
        </div>
        <div>
          <TextField
            {...password}
            type='password'
            hintText='Password'
            errorText={password.touched && password.error && <div>{password.error}</div>} />
        </div>

        <div style={style.bigError}>{statusText}</div>
        <div>
          <RaisedButton
            type='submit'
            disabled={isAuthenticating}
            onTouchTap={this.handleTouchTap}
            label='Log In'
          />
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  statusText: PropTypes.string,
  isAuthenticating: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'Login',
  fields,
  validate
})(Login)
