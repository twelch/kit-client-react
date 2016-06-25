import React from 'react'
import {defineMessages, intlShape} from 'react-intl'

const messages = defineMessages({
  notfound: {
    id: 'notfound.notfound',
    description: 'Error message displayed when resource was not found',
    defaultMessage: 'Not Found'
  }
})

const styles = {
  container: {
    width: 360,
    textAlign: 'center'
  }
}

class NotFound extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired
  }

  render () {
    let {formatMessage} = this.props.intl

    return (
      <div style={styles.container} >
        <div>{formatMessage(messages.notfound)}</div>
      </div>
    )
  }
}

export default NotFound
