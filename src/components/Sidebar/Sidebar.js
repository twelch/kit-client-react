import React from 'react'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import {Divider, Toggle} from 'material-ui'
import Done from 'material-ui/svg-icons/action/done'
import Pages from 'material-ui/svg-icons/social/pages'
import PinDrop from 'material-ui/svg-icons/maps/pin-drop'
import Layers from 'material-ui/svg-icons/maps/layers'
import Language from 'material-ui/svg-icons/action/language'
import Settings from 'material-ui/svg-icons/action/settings'
import Input from 'material-ui/svg-icons/action/input'
import {defineMessages, intlShape} from 'react-intl'

const SelectableList = MakeSelectable(List)

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
  },
  satlayer: {
    id: 'sidebar.satlayer',
    description: 'Satellite map layer',
    defaultMessage: 'Satellite'
  }
})

export class Sidebar extends React.Component {
  static propTypes = {
    selectSite: React.PropTypes.func.isRequired,
    selectView: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    localeChange: React.PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    closeSidebar: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired,
    numSites: React.PropTypes.number,
    sites: React.PropTypes.object,
    site: React.PropTypes.object,
    params: React.PropTypes.object.isRequired
  }

  constructor () {
    super()
    // Set handler scope as es6 doesn't do this for us
    this.signOut = this.signOut.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
    this.changeSite = this.changeSite.bind(this)
    this.changeView = this.changeView.bind(this)
  }

  signOut () {
    this.props.logout()
    this.props.closeSidebar()
  }

  changeLanguage (event, locale) {
    this.props.localeChange(locale)
  }

  changeSite (event, siteid) {
    this.props.selectSite(siteid)
  }

  changeView (event, viewid) {
    if (!this.props.params.siteid) {
      throw new Error()
    }
    this.props.selectView(this.props.params.siteid, viewid)
  }

  render () {
    let { intl: {formatMessage, locale}, isAuthenticated, numSites, sites, site } = this.props
    const curSiteID = this.props.params.siteid
    const curViewID = this.props.params.viewid
    locale = locale.split('-')[0]

    const languages = [
      {locale: 'en', name: formatMessage(messages.english)},
      {locale: 'es', name: formatMessage(messages.spanish)},
      {locale: 'zh', name: formatMessage(messages.chinese)}
    ]

    const styles = {
      list: {
        WebkitAppearance: 'none'
      },
      listChild: {
        WebkitAppearance: 'none',
        marginLeft: 20
      }
    }

    return (
      <Drawer {...this.props} >

        {isAuthenticated && numSites > 1
          ? <SelectableList
            value=''
            onChange={this.changeSite} >
            <ListItem
              leftIcon={<Pages />}
              primaryText={formatMessage(messages.siteslabel)}
              primaryTogglesNestedList
              style={styles.list}
              nestedItems={Object.keys(sites).map((siteid) => {
                return (
                  <ListItem
                    value={siteid}
                    primaryText={sites[siteid].name}
                    style={styles.list}
                    insetChildren={curSiteID !== siteid}
                    leftIcon={curSiteID === siteid ? <Done /> : null} />
                )
              })}
            />
          </SelectableList>
          : null
        }
        {isAuthenticated && numSites > 1
          ? <Divider />
          : null
        }

        {isAuthenticated && site && site.views
          ? <SelectableList
            value=''
            onChange={this.changeView} >
            <ListItem
              leftIcon={<PinDrop />}
              primaryText={formatMessage(messages.viewslabel)}
              primaryTogglesNestedList
              style={styles.list}
              nestedItems={site.views.map((view, index) => {
                return (
                  <ListItem
                    value={view.id}
                    primaryText={view.name}
                    style={styles.list}
                    insetChildren={curViewID !== view.id}
                    leftIcon={curViewID === view.id ? <Done /> : null} />
                )
              })}
            />
          </SelectableList>
          : null
        }
        {isAuthenticated
          ? <Divider />
          : null
        }

        {isAuthenticated && curViewID
          ? <SelectableList
            value=''
            onChange={this.changeLanguage} >
            <ListItem
              primaryText={formatMessage(messages.layerslabel)}
              leftIcon={<Layers />}
              primaryTogglesNestedList
              style={styles.list}
              nestedItems={[
                <ListItem
                  rightToggle={<Toggle />}
                  style={styles.list}
                  innerDivStyle={styles.listChild}
                  primaryText={formatMessage(messages.satlayer)}
                  value='en' />
              ]}
            />
          </SelectableList>
          : null
        }
        {isAuthenticated
          ? <Divider />
          : null
        }

        <SelectableList
          value=''
          onChange={this.changeLanguage} >
          <ListItem
            primaryText={formatMessage(messages.languagelabel)}
            leftIcon={<Language />}
            primaryTogglesNestedList
            style={styles.list}
            nestedItems={languages.map((lang) => {
              return (
                <ListItem
                  value={lang.locale}
                  primaryText={lang.name}
                  style={styles.list}
                  insetChildren={locale !== lang.locale}
                  leftIcon={locale === lang.locale ? <Done /> : null} />
              )
            })}
          />
        </SelectableList>
        <Divider />

        {isAuthenticated
          ? <SelectableList
            value=''
            onChange={this.goSettings} >
            <ListItem
              primaryText={formatMessage(messages.settingslabel)}
              leftIcon={<Settings />}
              primaryTogglesNestedList
              style={styles.list}
            />
          </SelectableList>
          : null
        }
        {isAuthenticated
          ? <Divider />
          : null
        }

        {isAuthenticated
          ? <List>
            <ListItem
              primaryText={formatMessage(messages.signoutlabel)}
              leftIcon={<Input />}
              onTouchTap={this.signOut}
              style={styles.list}
            />
          </List>
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

