import React, { PropTypes } from 'react'
import PageLayout from 'layouts/PageLayout'
import LoginForm from 'forms/LoginForm/LoginContainer'
import { push } from 'react-router-redux'

class HomeView extends React.Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.checkAuth(this.props.isAuthenticated)
  }

  checkAuth (isAuthenticated) {
    if (isAuthenticated) {
      this.props.dispatch(push('/sites'))
    }
  }

  render () {
    const { isAuthenticated } = this.props
    return (
      <PageLayout>
        {!isAuthenticated
          ? <LoginForm />
          : null
        }
      </PageLayout>
    )
  }
}

export default HomeView
