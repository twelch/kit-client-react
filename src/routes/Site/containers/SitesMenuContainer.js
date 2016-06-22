import { connect } from 'react-redux'
import SitesMenu from '../components/SitesMenu'
import { fetchSites, selectSite } from 'modules/sites'

const mapActionCreators = {
  fetchSites,
  selectSite
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.sites.isFetching,
  sites: state.sites.configs
})

export default connect(mapStateToProps, mapActionCreators)(SitesMenu)
