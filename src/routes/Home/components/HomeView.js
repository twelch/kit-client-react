import React, { PropTypes } from 'react'
import LoginForm from 'forms/LoginForm'
import SiteMenu from '../containers/SiteMenuContainer'
import { requireAuthentication } from 'components/AuthenticatedComponent/AuthenticatedComponent'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

const HomeView = (props, context) => {
  let CurComponent = null

  return (
    <div style={styles.root} >
      {props.isAuthenticated 
        ? <SiteMenu /> 
        : <LoginForm />
      }
    </div>
  )
}

HomeView.propTypes = {
  logoutAndRedirect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default HomeView
