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
  },
  siteslabel: {
    id: 'sidebar.siteslabel',
    description: 'Button label to switch Sites, which are private areas for client/partner to access views.',
    defaultMessage: 'Sites'
  },
  viewslabel: {
    id: 'sidebar.viewslabel',
    description: 'Button label to switch Views.  Views include traffic views, parking views, etc.',
    defaultMessage: 'Views'
  },
  languagelabel: {
    id: 'sidebar.language',
    description: 'Button label to access language menu',
    defaultMessage: 'Language'
  },
  settingslabel: {
    id: 'sidebar.settings',
    description: 'Button label to access settings menu',
    defaultMessage: 'Settings'
  },
  signoutlabel: {
    id: 'sidebar.signout',
    description: 'Button label to sign out of user account',
    defaultMessage: 'Sign Out'
  },
  layerslabel: {
    id: 'sidebar.layerslabel',
    description: 'Button label to access map layers',
    defaultMessage: 'Layers'
  }
})

export class Sidebar extends React.Component {
  static propTypes = {
    showSites: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    localeChange: React.PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    closeSidebar: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    numSites: React.PropTypes.number,
    sites: React.PropTypes.object,
    site: React.PropTypes.object
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
    let { intl: {formatMessage, locale}, isAuthenticated, numSites, sites, site } = this.props
    locale = locale.split('-')[0]

    const styles = {
      list: { WebkitAppearance: 'none' }
    }

    return (
      <Drawer {...this.props} >
       
        {isAuthenticated && numSites > 1
          ? <MenuItem
              style={styles.list}
              primaryText={formatMessage(messages.siteslabel)}
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem style={styles.list} primaryText='Site 1' />,
                <MenuItem style={styles.list} primaryText='Site 2' />,
                <MenuItem style={styles.list} primaryText='Site 3' />
              ]}
              />
          : null
        }
        {isAuthenticated && numSites > 1
          ? <Divider />
          : null
        }        

        {isAuthenticated
          ? <MenuItem
              style={styles.list}
              primaryText={formatMessage(messages.viewslabel)}
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem style={styles.list} primaryText='View 1' />,
                <MenuItem style={styles.list} primaryText='View 2' />,
                <MenuItem style={styles.list} primaryText='View 3' />
              ]}
            />
          : null
        }
        {isAuthenticated
          ? <Divider />
          : null
        }
        
        {isAuthenticated
          ? <MenuItem
            style={styles.list}
            primaryText={formatMessage(messages.layerslabel)}
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem style={styles.list} primaryText='Satellite' insetChildren />
            ]}
          />
          : null
        }        
        {isAuthenticated
          ? <Divider />
          : null
        }

        <MenuItem
          style={styles.list}
          primaryText={formatMessage(messages.languagelabel)}
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

        {isAuthenticated
          ? <MenuItem
              style={styles.list}
              primaryText={formatMessage(messages.settingslabel)}
              onTouchTap={this.goSettings} />
          : null
        }
        {isAuthenticated
          ? <Divider />
          : null
        }

        {isAuthenticated 
          ? <MenuItem
              style={styles.list}
              primaryText={formatMessage(messages.signoutlabel)}
              onTouchTap={this.signOut}
            />
          : null
        }
        {isAuthenticated
          ? <Divider />
          : null
        } 
        
      </Drawer>
    )
  }
}

export default Sidebar

