import { connect } from 'react-redux'
import SitesMenu from '../components/SitesMenu'
import { fetchSites, selectSite } from 'modules/sites'
import { logout } from 'modules/auth'

const mapActionCreators = {
  fetchSites,
  selectSite,
  logout
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.sites.isFetching,  
  sites: state.sites.configs
})

export default connect(mapStateToProps, mapActionCreators)(SitesMenu)
