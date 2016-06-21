import React from 'react'
import { defineMessages, FormattedMessage, FormattedNumber } from 'react-intl'
import NotFound from 'components/NotFound'

const messages = defineMessages({

})

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

export const NotFoundView = (props) => (
  <div style={styles.root} >
    <NotFound />
  </div>
)

NotFoundView.propTypes = {}

export default NotFoundView
