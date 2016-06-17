import { connect } from 'react-redux'
import { loginUser } from 'modules/auth'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component */

import LoginForm from 'forms/LoginForm'

function login (values, dispatch) {
  dispatch(loginUser(values.username, values.password))
}

const mapActionCreators = {}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText,
  onSubmit: login
})

export default connect(mapStateToProps, mapActionCreators)(LoginForm)
