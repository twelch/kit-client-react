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
  </div>
)

Header.propTypes = {
  localeChange: PropTypes.func.isRequired
}

export default Header
