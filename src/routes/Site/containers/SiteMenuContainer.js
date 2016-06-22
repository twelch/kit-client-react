import { connect } from 'react-redux'
import SiteMenu from '../components/SiteMenu'
import { getCurSite, selectView } from 'modules/sites'

const mapActionCreators = {
  selectView
}

const mapStateToProps = (state, props) => ({
  token: state.auth.token,
  isFetching: state.sites.isFetching,
  site: getCurSite(state, props) // Selector
})

export default connect(mapStateToProps, mapActionCreators)(SiteMenu)
