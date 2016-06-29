import { connect } from 'react-redux'
import MapGL from 'components/MapGL'
import { actions, settingStyle, receivedStyle } from 'modules/map'
import {injectIntl} from 'react-intl'

const mapActionCreators = {
  actions,
  settingStyle,
  receivedStyle
}

const mapStateToProps = (state, props) => ({

})

export default injectIntl(connect(mapStateToProps, mapActionCreators)(MapGL))
