import { connect } from 'react-redux'
import SiteMenu from '../components/SiteMenu'
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
  sites: state.sites.data
})

export default connect(mapStateToProps, mapActionCreators)(SiteMenu)
