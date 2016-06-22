import React from 'react'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MenuItem from 'material-ui/MenuItem'
import {defineMessages, intlShape} from 'react-intl'

const messages = defineMessages({
  spanish: {
    id: 'languageSelector.spanish',
    description: 'Select language',
    defaultMessage: 'Spanish'
  },
  english: {
    id: 'languageSelector.english',
    description: 'Select language',
    defaultMessage: 'English'
  },
  chinese: {
    id: 'languageSelector.chinese',
    description: 'Select language',
    defaultMessage: 'Chinese'
  }
})

export class Sidebar extends React.Component {
  static propTypes = {
    showSites: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    localeChange: React.PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    closeSidebar: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    // Set handler scope as es6 doesn't do this for us
    this.goSites = this.goSites.bind(this)
    this.signOut = this.signOut.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
  }

  goSites () {
    this.props.showSites()
    this.props.closeSidebar()
  }

  signOut () {
    this.props.logout()
    this.props.closeSidebar()
  }

  changeLanguage (locale) {
    this.props.localeChange(locale)
    this.props.closeSidebar()
  }

  render () {
    let {formatMessage, locale} = this.props.intl
    locale = locale.split('-')[0]
    const styles = {
      list: { WebkitAppearance: 'none' }
    }

    return (
      <Drawer {...this.props} >
        <MenuItem
          style={styles.list}
          primaryText='Sites'
          onTouchTap={this.goSites} />
        <Divider />
        <MenuItem
          style={styles.list}
          primaryText='Views'
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem style={styles.list} primaryText='View 1' />,
            <MenuItem style={styles.list} primaryText='View 2' />,
            <MenuItem style={styles.list} primaryText='View 3' />
          ]}
        />
        <Divider />
        <MenuItem
          style={styles.list}
          primaryText='Layers'
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem style={styles.list} primaryText='Satellite' insetChildren />
          ]}
        />
        <Divider />
        <MenuItem
          style={styles.list}
          primaryText='Language'
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem
              id='en'
              style={styles.list}
              primaryText={formatMessage(messages.english)}
              onTouchTap={() => this.changeLanguage('en')} // eslint-disable-line react/jsx-no-bind
              insetChildren
              checked={locale === 'en'} />,
            <MenuItem
              id='zh'
              style={styles.list}
              primaryText={formatMessage(messages.chinese)}
              onTouchTap={() => this.changeLanguage('zh')} // eslint-disable-line react/jsx-no-bind
              insetChildren
              checked={locale === 'zh'} />,
            <MenuItem
              id='es'
              style={styles.list}
              primaryText={formatMessage(messages.spanish)}
              onTouchTap={() => this.changeLanguage('es')} // eslint-disable-line react/jsx-no-bind
              insetChildren
              checked={locale === 'es'} />
          ]}
        />
        <Divider />
        <MenuItem
          style={styles.list}
          primaryText='Settings'
          onTouchTap={this.goSettings} />
        <Divider />
        <MenuItem
          style={styles.list}
          primaryText='Sign Out'
          onTouchTap={this.signOut}
        />
      </Drawer>
    )
  }
}

export default Sidebar

