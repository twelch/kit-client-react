import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Sidebar from 'containers/Sidebar'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import { toggleSidebar, setSidebar } from 'modules/sidebar'

class CoreLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render () {
    return (
      <div className='container'>
        <AppBar
          onLeftIconButtonTouchTap={this.props.toggleSidebar} />
        <Sidebar
          docked={false}
          width={200}
          open={this.props.sidebar}
          onRequestChange={this.props.setSidebar} />
        <div className={classes.mainContainer}>
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
