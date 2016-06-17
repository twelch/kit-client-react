import React, { PropTypes } from 'react'
import LoginForm from 'forms/LoginForm'
import SiteMenu from '../containers/SiteMenuContainer'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

const HomeView = (props, context) => {
  let CurComponent = null
  if (props.isAuthenticated) {
    CurComponent = <SiteMenu logout={props.logoutAndRedirect} />
  } else {
    CurComponent = <LoginForm />
  }

  return (
    <div style={styles.root} >
      {CurComponent}
    </div>
  )
}

HomeView.propTypes = {
  logoutAndRedirect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default HomeView
