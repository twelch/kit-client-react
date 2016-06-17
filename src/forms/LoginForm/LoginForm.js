import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { TextField, RaisedButton } from 'material-ui'
import Paper from 'material-ui/Paper'
import validate from './validate'

export const fields = [ 'username', 'password' ]

class Login extends React.Component {

  render () {
    const { fields: { username, password }, statusText, handleSubmit, isAuthenticating } = this.props
    const style = {
      bigError: {
        fontSize: '14px',
        lineHeight: '14px',
        color: '#F5A623'
      },
      container: {
        padding: 20
      }
    }

    return (
      <Paper style={style.container} zDepth={1} rounded={false} >
        <form onSubmit={handleSubmit}>
          <div style={style.bigError}>{statusText}</div>
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
          <div>
            <RaisedButton
              primary
              type='submit'
              disabled={isAuthenticating}
              onTouchTap={this.handleTouchTap}
              label='Sign In'
              style={{marginTop: 20, width: '100%'}}
            />
          </div>
        </form>
      </Paper>
    )
  }
}

Login.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  statusText: PropTypes.string,
  isAuthenticating: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'Login',
  fields,
  validate
})(Login)
