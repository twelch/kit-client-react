import React from 'react'
import SitesMenu from '../containers/SitesMenuContainer'

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

export default SitesView
