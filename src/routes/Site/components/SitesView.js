import React, { PropTypes } from 'react'
import SitesMenu from '../containers/SitesMenuContainer'
import { makeSiteComponent } from '../components/SiteComponent'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}

const SitesView = (props, context) => {
  return (
    <div style={styles.root} >
      <SitesMenu />
    </div>
  )
}

SitesView.propTypes = {}

export default SitesView
