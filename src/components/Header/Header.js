import React, { PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import LanguageSelector from 'components/LanguageSelector'
import { defineMessages, FormattedMessage } from 'react-intl'
import classes from './Header.scss'

const messages = defineMessages({
  apptitle: {
    id: 'header.apptitle',
    description: 'App title',
    defaultMessage: 'Demo App'
  },
  hometitle: {
    id: 'header.hometitle',
    description: 'Home nav title',
    defaultMessage: 'Home'
  },
  countertitle: {
    id: 'header.countertitle',
    description: 'Counter nav title',
    defaultMessage: 'Counter'
  },
  headerlogin: {
    id: 'header.headerlogin',
    description: 'Login header',
    defaultMessage: 'Login'
  }
})

const Header = (props) => (
  <div>
    <h1><FormattedMessage {...messages.apptitle} /></h1>
    <div>
      <LanguageSelector onChange={props.localeChange}>a</LanguageSelector>
    </div>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      <FormattedMessage {...messages.hometitle} />
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName={classes.activeRoute}>
      <FormattedMessage {...messages.countertitle} />
    </Link>
    {' · '}
    <Link to='/protected' activeClassName={classes.activeRoute}>Protected Content</Link>
    {' · '}
    {props.isAuthenticated
     ? <a href='#' onClick={props.logoutAndRedirect}>Logout</a>
     : <Link to='/login' activeClassName={classes.activeRoute}><FormattedMessage {...messages.headerlogin} /></Link>
    }
  </div>
)

Header.propTypes = {
  localeChange: PropTypes.func.isRequired,
  logoutAndRedirect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default Header
