import React, { PropTypes } from 'react'
import mapviews from 'components/mapviews'
import MapGL from 'containers/MapGL'

class MapView extends React.Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    mapState: PropTypes.object.isRequired,
    site: PropTypes.object,
    view: PropTypes.object
  }

  constructor () {
    super()
    // Set handler scope as es6 doesn't do this for us
    this.getMap = this.getMap.bind(this)
    this.setMap = this.setMap.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // Rebuild map if view will change
    if (this.props.view.id !== nextProps.view.id) {
      this.tearDown()
      this.setup(nextProps)
    }
  }

  setup (props) {

  }

  tearDown () {

  }

  getMap () {
    return this.map
  }

  setMap (map) {
    this.map = map
  }

  render () {
    const view = this.props.view

    let mapview = React.createElement(mapviews[view.type], {
      key: view.id,
      view: view,
      getMap: this.getMap,
      loaded: this.props.mapState.styleLoaded
    })

    const mapStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    }

    return (
      <div>
        <MapGL
          mapStyle={mapStyle}
          view={view.map.start}
          baselayer='streets'
          token={view.map.token}
          onMapLoad={this.setMap} />
        {mapview}
      </div>
    )
  }
}

export default MapView

