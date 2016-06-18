import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import PinDrop from 'material-ui/svg-icons/maps/pin-drop'

export class SiteMenu extends React.Component {

  static propTypes = {
    token: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    fetchSites: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    sites: PropTypes.object
  }

  componentWillMount () {
    this.fetchData()
  }

  fetchData () {
    let token = this.props.token
    this.props.fetchSites(token)
  }

  render () {
    const { logout, isFetching, sites } = this.props

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

    let CurList = null
    if (isFetching) {
      CurList = <p>Loading sites...</p>
    } else {
      const siteItems = Object.keys(sites || {}).map((index) => {
        const site = sites[index]
        return (<ListItem
          key={index + 1}
          leftAvatar={<Avatar icon={<PinDrop />} />}
          primaryText={site.name}
          secondaryText={site.description}
          style={styles.list}
        />)
      })
      CurList = (
        <div style={styles.listcontainer}>
          <List>
            {siteItems}
          </List>
        </div>
      )
    }

    return (
      <div style={styles.root}>
        <div style={styles.sites}>
          <Toolbar>
            <ToolbarTitle text='Sites' />
            <ToolbarGroup lastChild >
              <FlatButton
                label='Sign Out'
                onTouchTap={logout} />
            </ToolbarGroup>
          </Toolbar>
          {CurList}
        </div>
      </div>
    )
  }
}

export default SiteMenu
