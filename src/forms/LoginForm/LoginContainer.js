import { connect } from 'react-redux'
import { loginUser } from 'modules/auth'
import LoginForm from './LoginForm'
import {injectIntl} from 'react-intl'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component */

function login (values, dispatch) {
  dispatch(loginUser(values.username, values.password))
}

const mapActionCreators = {}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  errorText: state.auth.errorText,
  loggedOutText: state.auth.loggedOutText,
  onSubmit: login
})

export default injectIntl(connect(mapStateToProps, mapActionCreators)(LoginForm))
