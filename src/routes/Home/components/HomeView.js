import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'
import { defineMessages, FormattedMessage } from 'react-intl'

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    description: 'Welcome message',
    defaultMessage: 'Welcome!'
  }
})

export const HomeView = () => (
  <div>
    <h4><FormattedMessage {...messages.welcome} /></h4>
    <img
      alt='This is a duck, because Redux!'
      className={classes.duck}
      src={DuckImage} />
  </div>
)

export default HomeView
