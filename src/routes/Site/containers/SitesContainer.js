import { connect } from 'react-redux'
import SitesView from '../components/SitesView'
import { requireAuthentication } from 'components/AuthenticatedComponent'

const mapActionCreators = {}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default requireAuthentication(connect(mapStateToProps, mapActionCreators)(SitesView))
