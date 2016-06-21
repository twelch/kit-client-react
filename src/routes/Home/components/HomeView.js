import React, { PropTypes } from 'react'
import LoginForm from 'forms/LoginForm/LoginContainer'
import { push } from 'react-router-redux'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

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
      <div style={styles.root} >
        {!isAuthenticated
          ? <LoginForm />
          : null
        }
      </div>
    )
  }
}

export default HomeView
