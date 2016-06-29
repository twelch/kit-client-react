import React, { PropTypes } from 'react'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import PinDrop from 'material-ui/svg-icons/maps/pin-drop'
import { makeSiteComponent } from 'routes/Site/components/SiteComponent'

const SelectableList = MakeSelectable(List)

export class SiteMenu extends React.Component {

  static propTypes = {
    token: PropTypes.string.isRequired,
    site: PropTypes.object,
    selectView: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor () {
    super()
    // Set handler scope as es6 doesn't do this for us
    this.viewSelected = this.viewSelected.bind(this)
  }

  viewSelected (event, viewid) {
    this.props.selectView(this.props.params.siteid, this.props.site.views[viewid].id)
  }

  render () {
    const { site } = this.props
    const views = site.views

    const styles = {
      sites: {
        float: 'left',
        width: 360
      },
      listcontainer: {
        border: 'solid 1px #d9d9d9',
        height: 300,
        overflow: 'scroll'
      },
      list: {
        WebkitAppearance: 'none'
      },
      header: {
        fontFamily: 'Roboto'
      }
    }

    const viewItems = views.map((view, index) => {
      return (<ListItem
        key={index + 1}
        value={index}
        leftAvatar={<Avatar icon={<PinDrop />} />}
        primaryText={view.name}
        secondaryText={view.description}
        style={styles.list}
      />)
    })
    const CurList = (
      <div style={styles.listcontainer}>
        <SelectableList onChange={this.viewSelected}>
          {viewItems}
        </SelectableList>
      </div>
    )

    return (
      <div style={styles.root}>
        <div style={styles.sites}>
          <Toolbar>
            <ToolbarTitle text={site.name} style={styles.header} />
          </Toolbar>
          {CurList}
        </div>
      </div>
    )
  }
}

export default makeSiteComponent(SiteMenu)
