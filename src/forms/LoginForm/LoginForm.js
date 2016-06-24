import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { TextField, RaisedButton } from 'material-ui'
import Paper from 'material-ui/Paper'
import validate from './validate'
import {defineMessages, intlShape} from 'react-intl'

export const fields = [ 'username', 'password' ]

const messages = defineMessages({
  username: {
    id: 'login.username',
    description: 'username lanel on login form',
    defaultMessage: 'Username'
  },
  password: {
    id: 'login.password',
    description: 'password label on login form',
    defaultMessage: 'Password'
  },
  signin: {
    id: 'login.signin',
    description: 'button to submit login form and sign into account',
    defaultMessage: 'Sign In'
  },
  autherror: {
    id: 'auth.autherror',
    description: 'sign in error messages',
    defaultMessage: 'Sign In failed'
  },
  loggedout: {
    id: 'auth.loggedout',
    description: 'successful sign out message',
    defaultMessage: 'You have been signed out'
  }
})

class Login extends React.Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errorText: PropTypes.bool.isRequired,
    loggedOutText: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    intl: intlShape.isRequired
  }

  render () {
    const { intl: {formatMessage, locale}, fields: { username, password }, errorText, loggedOutText, handleSubmit, isAuthenticating } = this.props
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
          {loggedOutText 
            ? <div style={style.bigError}>{formatMessage(messages.loggedout)}</div>
            : null
          }
          {errorText
            ? <div style={style.bigError}>{formatMessage(messages.autherror)}</div>
            : null
          }          
          <div>
            <div>
              <TextField
                {...username}
                hintText={formatMessage(messages.username)}
                errorText={username.touched && username.error && <div>{username.error}</div>} />
            </div>
          </div>
          <div>
            <TextField
              {...password}
              type='password'
              hintText={formatMessage(messages.password)}
              errorText={password.touched && password.error && <div>{password.error}</div>} />
          </div>
          <div>
            <RaisedButton
              primary
              type='submit'
              disabled={isAuthenticating}
              onTouchTap={this.handleTouchTap}
              label={formatMessage(messages.signin)}
              style={{marginTop: 20, width: '100%'}}
            />
          </div>
        </form>
      </Paper>
    )
  }
}

export default reduxForm({
  form: 'Login',
  fields,
  validate
})(Login)
