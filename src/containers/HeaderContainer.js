import { connect } from 'react-redux'
import { localeChange } from 'modules/locale'
import Header from 'components/Header'

const mapActionCreators = {
  localeChange
}

const mapStateToProps = (state) => ({
  locale: state.locale
})

export default connect(mapStateToProps, mapActionCreators)(Header)
