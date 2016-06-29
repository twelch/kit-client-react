import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Sidebar from 'containers/Sidebar'
import '../../styles/core.scss'
import { toggleSidebar, setSidebar } from 'modules/sidebar'

class CoreLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    toggleSidebar: React.PropTypes.func.isRequired,
    sidebar: React.PropTypes.bool.isRequired,
    setSidebar: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired
  }

  render () {
    const barStyle = {
      top: 0,
      left: 0,
      position: 'absolute',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 100%)',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }

    return (
      <div>
        <AppBar
          style={barStyle}
          onLeftIconButtonTouchTap={this.props.toggleSidebar} />
        <div>
          <Sidebar
            params={this.props.params}
            docked={false}
            width={280}
            open={this.props.sidebar}
            onRequestChange={this.props.setSidebar} />
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapActionCreators = {
  toggleSidebar,
  setSidebar
}

const mapStateToProps = (state, props) => ({
  sidebar: state.sidebar
})

export default connect(mapStateToProps, mapActionCreators)(CoreLayout)
