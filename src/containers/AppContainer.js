import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { connect, Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import * as messages from 'translations/'

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired
  }

  render () {
    const { history, routes, routerKey, store } = this.props

    const intlData = {
      locale: this.props.locale,
      messages: messages[this.props.locale]
    }

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <IntlProvider {...intlData}>
            <Router history={history} children={routes} key={routerKey} />
          </IntlProvider>
        </div>
      </Provider>
    )
  }
}

function mapStateToProps (state) {
  return { locale: state.locale }
}
export default connect(mapStateToProps)(AppContainer)
