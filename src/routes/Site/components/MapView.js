import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { makeSiteComponent } from 'routes/Site/components/SiteComponent'
import { BasicView } from 'components/MapView'

class MapView extends React.Component {

  static propTypes = {
    site: PropTypes.object,
    view: PropTypes.object,
    params: PropTypes.object.isRequired,
    mapState  : React.PropTypes.object,
    viewSettings : React.PropTypes.object
  }

  render () {
    const view = this.props.view
    
    let SubView = null
    switch(view.type) {
      case 'map-basic':
        SubView = <BasicView view={view} />
        break
    }

    return (
      <div>
        {SubView}
      </div>
    )
  }
}

export default MapView

