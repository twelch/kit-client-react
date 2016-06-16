import { connect } from 'react-redux'
import { localeChange } from 'modules/locale'
import Header from 'components/Header'
import { logoutAndRedirect } from 'routes/Login/modules/auth'

const mapActionCreators = {
  localeChange,
  logoutAndRedirect
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapActionCreators)(Header)
