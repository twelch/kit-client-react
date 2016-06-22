import React from 'react'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MenuItem from 'material-ui/MenuItem'

export class Sidebar extends React.Component {
  static propTypes = {
    showSites: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    // Set handler scope as es6 doesn't do this for us
    this.goSites = this.goSites.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  goSites () {
    this.props.showSites()
    this.props.closeSidebar()
  }

  signOut () {
    this.props.logout()
    this.props.closeSidebar()
  } 

  render () {
    const styles = {
      list: { WebkitAppearance: 'none' }
    }
    return (
      <Drawer {...this.props} >
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
          primaryText='Language'
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem style={styles.list} primaryText='English' insetChildren checked />,
            <MenuItem style={styles.list} primaryText='Chinese' insetChildren />,
            <MenuItem style={styles.list} primaryText='Spanish' insetChildren />
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
    )
  }
}

export default Sidebar

