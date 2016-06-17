import { connect } from 'react-redux'
import HomeView from '../components/HomeView'

const mapActionCreators = {}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
