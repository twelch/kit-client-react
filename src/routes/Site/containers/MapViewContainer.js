import { connect } from 'react-redux'
import MapView from '../components/MapView'
import { getCurSite } from 'modules/sites'
import { makeSiteComponent } from '../components/SiteComponent'
import { requireAuthentication } from 'components/AuthenticatedComponent'

const mapActionCreators = {}

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  site: getCurSite(state, props) // Selector
})

export default requireAuthentication(makeSiteComponent(connect(mapStateToProps, mapActionCreators)(MapView)))
