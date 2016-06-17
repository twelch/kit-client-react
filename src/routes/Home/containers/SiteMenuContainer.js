import { connect } from 'react-redux'
import SiteMenu from '../components/SiteMenu'
import { fetchSites } from 'modules/sites'
import { logout } from 'modules/auth'

const mapActionCreators = {
  fetchSites,
  logout
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  sites: state.sites.data,
  isFetching: state.sites.isFetching
})

export default connect(mapStateToProps, mapActionCreators)(SiteMenu)
