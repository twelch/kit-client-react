import { connect } from 'react-redux'
import NotFound from '../../components/NotFound'
import {injectIntl} from 'react-intl'

const mapStateToProps = (state) => ({})

const mapActionCreators = {}

export default injectIntl(connect(
  mapStateToProps,
  mapActionCreators
)(NotFound))
