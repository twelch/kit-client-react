import { connect } from 'react-redux'
import SiteMenu from '../components/SiteMenu'
import { getCurSite, selectView } from 'modules/sites'
import {injectIntl} from 'react-intl'

const mapActionCreators = {
  selectView
}

const mapStateToProps = (state, props) => ({
  token: state.auth.token,
  isFetching: state.sites.isFetching,
  site: getCurSite(state, props) // Selector
})

export default injectIntl(connect(mapStateToProps, mapActionCreators)(SiteMenu))
