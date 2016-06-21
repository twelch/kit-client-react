import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import PinDrop from 'material-ui/svg-icons/maps/pin-drop'
import { makeSiteComponent } from 'routes/Site/components/SiteComponent'

const SelectableList = MakeSelectable(List)

export class SiteMenu extends React.Component {

  static propTypes = {
    token: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    sites: PropTypes.object,
    selectView: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  viewSelected (event, viewid) {
    this.props.selectView(this.props.params.siteid, viewid)
  }

  render () {
    const { logout, sites, params } = this.props
    const siteid = params.siteid
    const views = sites[siteid].views

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

    const viewItems = views.map((view, index) => {
      return (<ListItem
        key={index + 1}
        value={index}
        leftAvatar={<Avatar icon={<PinDrop />} />}
        primaryText={view.name}
        secondaryText={view.name}
        style={styles.list}
      />)
    })
    const CurList = (
      <div style={styles.listcontainer}>
        <SelectableList onChange={this.viewSelected.bind(this)}>
          {viewItems}
        </SelectableList>
      </div>
    )

    return (
      <div style={styles.root}>
        <div style={styles.sites}>
          <Toolbar>
            <ToolbarTitle text='Views' />
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

export default makeSiteComponent(SiteMenu)
