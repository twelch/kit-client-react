import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {

    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
      location: PropTypes.object.isRequired
    }

    componentWillMount () {
      this.checkAuth(this.props.isAuthenticated)
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated)
    }

    checkAuth (isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname
        this.props.dispatch(push(`/?next=${redirectAfterLogin}`))
      }
    }

    render () {
      return (
        <div>
        {this.props.isAuthenticated === true
          ? <Component {...this.props} />
          : null
        }
        </div>
        )
    }
  }

  const mapStateToProps = (state, context) => ({
    token: state.auth.token,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    location: context.location
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}
