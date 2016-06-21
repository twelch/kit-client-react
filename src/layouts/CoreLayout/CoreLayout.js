import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MenuItem from 'material-ui/MenuItem'
import { logout } from 'modules/auth'
import { showSites } from 'modules/sites'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    logout: React.PropTypes.func.isRequired,
    showSites: React.PropTypes.func.isRequired,
    toggleSettings: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = {drawerOpen: false}
    // Set handler scope as es6 doesn't do this for us
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.setDrawer = this.setDrawer.bind(this)
    this.goSites = this.goSites.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  toggleDrawer () {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  setDrawer (open) {
    this.setState({drawerOpen: open})
  }

  goSites () {
    this.props.showSites()
    this.setDrawer(false)
  }

  toggleSettings () {
    this.props.toggleSettings()
    this.setDrawer(false)
  }

  signOut () {
    this.props.logout()
    this.setDrawer(false)
  }

  render () {
    const styles = {
      list: {
        WebkitAppearance: 'none'
      }
    }

    return (
      <div className='container'>
        <AppBar
          onLeftIconButtonTouchTap={this.toggleDrawer} />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={this.setDrawer} >
          <MenuItem
            style={styles.list}
            primaryText='Sites'
            onTouchTap={this.goSites} />
          <MenuItem
            style={styles.list}
            primaryText='Views'
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem style={styles.list} primaryText='View 1' />,
              <MenuItem style={styles.list} primaryText='View 2' />,
              <MenuItem style={styles.list} primaryText='View 3' />
            ]}
          />
          <Divider />
          <MenuItem
            style={styles.list}
            primaryText='Settings'
            onTouchTap={this.goSettings} />
          <MenuItem
            style={styles.list}
            primaryText='Sign Out'
            onTouchTap={this.signOut}
          />
        </Drawer>
        <div className={classes.mainContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapActionCreators = {
  showSites,
  logout
}

export default connect(null, mapActionCreators)(CoreLayout)
