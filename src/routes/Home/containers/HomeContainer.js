import { connect } from 'react-redux'
import HomeView from '../components/HomeView'
import { logoutAndRedirect } from 'modules/auth'

const mapActionCreators = {
  logoutAndRedirect
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)