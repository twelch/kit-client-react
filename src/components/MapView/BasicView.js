import React, { PropTypes } from 'react'
import MapGL from 'components/MapGL'

class MapViewBasic extends React.Component {

  static propTypes = {
    view: PropTypes.object
  }

  constructor () {
    super()
    // Bind scope to handlers
    this._setupMap = this._setupMap.bind(this)
  }

  componentWillMount() {
  }

  _setMap(map) {
    this.map = map
  }

  _setupMap() {
    if (this.props.view.map.animateTo) {
      this.map.zoomTo(this.props.view.map.animateTo.zoom, {duration: this.props.view.map.animateTo.duration})
    }
  }

  render () {
    const view = this.props.view

    const mapStyle = {
      position: 'absolute',
      top:0,
      bottom:0,
      width:'100%'
    }
    
    return (
      <MapGL
      ref={(c) => this._setMap(c)}
      mapStyle={mapStyle}
      view={view.map.start}
      baselayer='streets'
      token={view.map.token}
      onStyleLoad={this._setupMap} />
    )
  }
}

export default MapViewBasic

