import React, { PropTypes } from 'react'
import { makeSiteComponent } from 'routes/Site/components/SiteComponent'
import MapLayout from 'layouts/MapLayout'

class MapView extends React.Component {

  static propTypes = {
    site: PropTypes.object,
    view: PropTypes.object,
    params: PropTypes.object.isRequired
  }

  render () {
    const styles = {
      root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'lightblue'
      }
    }

    return (
      <MapLayout>
      </MapLayout>
    )
  }
}

export default makeSiteComponent(MapView)
