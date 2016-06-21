import Sites from './containers/SitesContainer'
import Site from './containers/SiteContainer'

export default [{
  path: 'sites',
  component: Sites
}, {
  path: 'sites/:siteid',
  component: Site
}]
