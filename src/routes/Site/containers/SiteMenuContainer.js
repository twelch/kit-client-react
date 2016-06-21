import { connect } from 'react-redux'
import SiteMenu from '../components/SiteMenu'
import { selectView } from 'modules/sites'
import { logout } from 'modules/auth'

const mapActionCreators = {
  selectView,
  logout
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isFetching: state.sites.isFetching,  
  sites: state.sites.configs
})

export default connect(mapStateToProps, mapActionCreators)(SiteMenu)
