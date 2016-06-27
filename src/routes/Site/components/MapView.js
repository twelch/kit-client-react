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
    return (
      <MapLayout />
    )
  }
}

export default makeSiteComponent(MapView)
