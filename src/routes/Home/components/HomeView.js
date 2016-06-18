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
  isAuthenticated: PropTypes.bool.isRequired
}

export default HomeView
