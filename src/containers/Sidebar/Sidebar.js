import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import { openSidebar, closeSidebar, setSidebar, toggleSidebar } from 'modules/sidebar'
import { showSites } from 'modules/sites'
import { logout } from 'modules/auth'
import { localeChange } from 'modules/locale'
import { getCurSite, numSites, selectSite, selectView } from 'modules/sites'
import {injectIntl} from 'react-intl'

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sites: state.sites.configs,
  numSites: numSites(state),
  site: getCurSite(state, props) // Selector
})

const mapActionCreators = {
  openSidebar,
  closeSidebar,
  setSidebar,
  toggleSidebar,
  showSites,
  logout,
  localeChange
}

let IntlSidebar = injectIntl(Sidebar)

export default connect(
  mapStateToProps,
  mapActionCreators
)(IntlSidebar)
