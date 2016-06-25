import Sites from './containers/SitesContainer'
import Site from './containers/SiteContainer'
import MapView from './containers/MapViewContainer'

export default [{
  path: 'sites',
  component: Sites
}, {
  path: 'sites/:siteid',
  component: Site
}, {
  path: 'sites/:siteid/:viewid',
  component: MapView
}]
