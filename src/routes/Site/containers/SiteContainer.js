import { connect } from 'react-redux'
import SiteView from '../components/SiteView'
import { makeSiteComponent } from '../components/SiteComponent'
import { requireAuthentication } from 'components/AuthenticatedComponent'

const mapActionCreators = {}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  sites: state.sites.configs
})

export default requireAuthentication(makeSiteComponent(connect(mapStateToProps, mapActionCreators)(SiteView)))
