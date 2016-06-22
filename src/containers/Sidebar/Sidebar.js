import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import { openSidebar, closeSidebar, setSidebar, toggleSidebar } from 'modules/sidebar'
import { showSites } from 'modules/sites'
import { logout } from 'modules/auth'
import { localeChange } from 'modules/locale'
import {injectIntl} from 'react-intl'

const mapStateToProps = (state) => ({})

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
