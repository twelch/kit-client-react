import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import PinDrop from 'material-ui/svg-icons/maps/pin-drop'

const styles = {
  sites: {
    float: 'left',
    marginBottom: 24,
    marginRight: 24,
    width: 360
  },
  listcontainer: {
    border: 'solid 1px #d9d9d9',
    height: 300,
    overflow: 'scroll'
  },
  list: {
    WebkitAppearance: 'none'
  }
}

const SiteMenu = (props, context) => (
  <div style={styles.root}>
    <div style={styles.sites}>
      <Toolbar>
        <ToolbarTitle text='Sites' />
        <ToolbarGroup lastChild >
          <FlatButton
            label='Sign Out'
            onTouchTap={props.logout} />
        </ToolbarGroup>
      </Toolbar>
      <div style={styles.listcontainer}>
        <List>
          <ListItem
            leftAvatar={<Avatar icon={<PinDrop />} />}
            primaryText='Site 1'
            secondaryText='Portland, Oregon'
            style={styles.list}
          />
          <ListItem
            leftAvatar={<Avatar icon={<PinDrop />} />}
            primaryText='Site 2'
            secondaryText='Shanghai, China'
            style={styles.list}
          />
          <ListItem
            leftAvatar={<Avatar icon={<PinDrop />} />}
            primaryText='Site 3'
            secondaryText='Santiago, Chile'
            style={styles.list}
          />
        </List>
      </div>
    </div>
  </div>
)

SiteMenu.propTypes = {
  logout: PropTypes.func.isRequired
}

export default SiteMenu
